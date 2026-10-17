// Builds public/peoples/leaves.topo.json: one polygon per leaf people group,
// made by dissolving Natural Earth admin-1 units (US: Census counties), sharing arcs so parent
// groups can be merged cheaply in the browser with topojson-client.
//
// Usage (needs ~45 MB download once):
//   curl -L -o scripts/peoples/ne_admin1.geojson \
//     https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson
//   node --experimental-strip-types scripts/peoples/build-geo.mjs [path-to-admin1.geojson]

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mapshaper from 'mapshaper'
import { COUNTRY_DEFAULT, OVERRIDES, fieldRule } from './assignments.mjs'
import { usCountyFeatures } from './usCounties.mjs'
import { PEOPLE_NODES, childrenOf } from '../../src/peoples/index.ts'

const here = path.dirname(fileURLToPath(import.meta.url))
const input = process.argv[2] ?? path.join(here, 'ne_admin1.geojson')
const outDir = path.join(here, '../../public/peoples')
const outFile = path.join(outDir, 'leaves.topo.json')

const leafIds = new Set(PEOPLE_NODES.filter(n => childrenOf(n.id).length === 0).map(n => n.id))

const src = JSON.parse(fs.readFileSync(input, 'utf8'))
const unknownCountries = new Map()
const badLeaves = new Set()
const usedLeaves = new Set()
const unusedOverrides = new Map(Object.entries(OVERRIDES).map(([a3, o]) => [a3, new Set(Object.keys(o))]))

const features = []
for (const f of src.features) {
    const p = f.properties
    const a3 = p.adm0_a3
    if (a3 === 'USA') continue // replaced by county-level data below
    let leaf = fieldRule(p)
    const ov = OVERRIDES[a3]
    if (ov && Object.prototype.hasOwnProperty.call(ov, p.name)) {
        leaf = ov[p.name]
        unusedOverrides.get(a3)?.delete(p.name)
    }
    if (leaf === undefined) leaf = COUNTRY_DEFAULT[a3]
    if (leaf === undefined) {
        unknownCountries.set(`${a3} ${p.admin}`, (unknownCountries.get(`${a3} ${p.admin}`) ?? 0) + 1)
        continue
    }
    if (leaf === null) continue
    if (!leafIds.has(leaf)) { badLeaves.add(leaf); continue }
    usedLeaves.add(leaf)
    features.push({ type: 'Feature', properties: { leaf }, geometry: f.geometry })
}

for (const f of usCountyFeatures(here)) {
    if (!leafIds.has(f.properties.leaf)) { badLeaves.add(f.properties.leaf); continue }
    usedLeaves.add(f.properties.leaf)
    features.push(f)
}

if (badLeaves.size) throw new Error(`Assignments reference unknown or non-leaf ids: ${[...badLeaves].join(', ')}`)
console.log('Dropped (no country default):', [...unknownCountries.keys()].join('; ') || 'none')
for (const [a3, names] of unusedOverrides) if (names.size) console.warn(`Unmatched overrides for ${a3}:`, [...names].join(', '))
const missing = [...leafIds].filter(id => !usedLeaves.has(id))
if (missing.length) console.warn('Leaves with no territory (info only, not drawn):', missing.join(', '))

const tmp = path.join(here, '.assigned.geojson')
fs.writeFileSync(tmp, JSON.stringify({ type: 'FeatureCollection', features }))
fs.mkdirSync(outDir, { recursive: true })

await mapshaper.runCommands([
    `-i "${tmp}" name=leaves`,
    '-clean',
    '-dissolve2 leaf',
    '-filter-islands min-area=800km2 remove-empty',
    '-simplify interval=2.5km weighted keep-shapes',
    `-o "${outFile}" format=topojson quantization=40000`,
].join(' '))

fs.unlinkSync(tmp)
console.log(`Wrote ${outFile} (${(fs.statSync(outFile).size / 1024).toFixed(0)} KB), ${usedLeaves.size} leaf groups`)
