// Builds public/peoples/shapes.json: real outlines for the geography overlay and for
// event areas and borders, so they are drawn from Natural Earth data instead of
// hand-typed circles and polylines.
//
//   npm run build:shapes
//
// Natural Earth files are downloaded once into scripts/peoples/.ne-cache (gitignored).
// Each entry is keyed "geo:<feature id>" or "event:<event id>" and holds { polys?, lines? }.
// At runtime, real polygons replace an item's hand-drawn areas and real lines replace its
// hand-drawn lines; hand-placed points (labels such as "Deir ez-Zor") are always kept.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { feature as topoFeature } from 'topojson-client'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', '..')
const cache = join(here, '.ne-cache')
const NE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/'

async function load(name) {
    mkdirSync(cache, { recursive: true })
    const file = join(cache, `${name}.geojson`)
    if (!existsSync(file)) {
        console.log(`downloading ${name}…`)
        const res = await fetch(`${NE}${name}.geojson`)
        if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`)
        writeFileSync(file, Buffer.from(await res.arrayBuffer()))
    }
    return JSON.parse(readFileSync(file, 'utf8')).features
}

const [regions, rivers, marine, lakes, borders, admin1, admin0] = await Promise.all([
    load('ne_10m_geography_regions_polys'),
    load('ne_10m_rivers_lake_centerlines'),
    load('ne_10m_geography_marine_polys'),
    load('ne_10m_lakes'),
    load('ne_10m_admin_0_boundary_lines_land'),
    load('ne_10m_admin_1_states_provinces'),
    load('ne_10m_admin_0_map_units'),
])
const counties = (() => {
    const topo = JSON.parse(readFileSync(join(root, 'node_modules/us-atlas/counties-10m.json'), 'utf8'))
    return topoFeature(topo, topo.objects.counties).features
})()

/* ---------------- What to take for each item ---------------- */

// regions/marine/lakes/admin0: exact NAME; rivers: name (+ optional lon range); admin1: [country, names];
// borders: predicate on properties (+ optional latitude filter); counties: FIPS codes.
const SPECS = {
    // Geography overlay
    'geo:pyrenees': { regions: ['PYRENEES'] },
    'geo:alps': { regions: ['ALPS'] },
    'geo:rhine': { rivers: ['Rhine'] },
    'geo:danube': { rivers: ['Danube'] },
    'geo:carpathians': { regions: ['CARPATHIAN MOUNTAINS', 'Transylvanian Alps'] },
    'geo:dinaric-alps': { regions: ['Dinaric Alps'] },
    'geo:pannonian-plain': { regions: ['Alföld'] },
    'geo:scandinavian-mountains': { regions: ['KJØLEN MOUNTAINS'] },
    'geo:english-channel': { marine: ['English Channel'] },
    'geo:bosporus': { marine: ['Bosporus', 'Dardanelles', 'Sea of Marmara'] },
    'geo:eurasian-steppe': { regions: ['PONTIC STEPPE', 'KAZAKH STEPPE'] },
    'geo:urals': { regions: ['URAL MOUNTAINS'] },
    'geo:caucasus': { regions: ['CAUCASUS MTS.', 'Lesser Caucasus'] },
    'geo:zagros': { regions: ['ZAGROS MOUNTAINS'] },
    'geo:mesopotamia': { rivers: ['Tigris', 'Euphrates'] },
    'geo:arabian-desert': { regions: ['RUB’ AL KHALI'] },
    'geo:hindu-kush': { regions: ['HINDU KUSH'] },
    'geo:himalaya': { regions: ['HIMALAYAS'] },
    'geo:tibetan-plateau': { regions: ['PLATEAU OF TIBET'] },
    'geo:indus': { rivers: ['Indus'] },
    'geo:ganges': { rivers: ['Ganges'] },
    'geo:tian-shan': { regions: ['TIAN SHAN', 'PAMIRS'] },
    'geo:taklamakan': { regions: ['TAKLIMAKAN DESERT'] },
    'geo:gobi': { regions: ['GOBI DESERT'] },
    'geo:yellow-river': { rivers: ['Huang'] },
    'geo:yangtze': { rivers: ['Yangtze', 'Chang Jiang'] },
    'geo:nanling': { regions: ['Nan Ling Mts.'] },
    'geo:zomia': { regions: ['SHAN PLATEAU', 'YUNGUI PLATEAU'] },
    'geo:mekong': { rivers: ['Mekong'] },
    'geo:strait-of-malacca': { marine: ['Strait of Malacca'] },
    'geo:taiwan-strait': { marine: ['Taiwan Strait'] },
    'geo:atlas': { regions: ['ATLAS MOUNTAINS', 'HAUT ATLAS', 'Moyen Atlas', 'Anti Atlas', 'ATLAS SAHARIEN', 'Atlas Tellien'] },
    'geo:sahara': { regions: ['SAHARA'] },
    'geo:sahel': { regions: ['SAHEL'] },
    'geo:nile': { rivers: ['Nile', 'Victoria Nile', 'Albert Nile'] },
    'geo:ethiopian-highlands': { regions: ['ETHIOPIAN HIGHLANDS'] },
    'geo:congo-rainforest': { regions: ['CONGO BASIN'] },
    'geo:lake-victoria': { lakes: ['Lake Victoria'] },
    'geo:kalahari': { regions: ['KALAHARI DESERT'] },
    'geo:rockies': { regions: ['ROCKY MOUNTAINS'] },
    'geo:mississippi': { rivers: ['Mississippi'] },
    'geo:appalachians': { regions: ['APPALACHIAN MTS.'] },
    'geo:rio-grande': { rivers: [['Rio Grande', -110, -96]] },
    'geo:darien-gap': { regions: ['Darien Gap'] },
    'geo:andes': { regions: ['ANDES'] },
    'geo:altiplano': { regions: ['ALTIPLANO'], lakes: ['Lago Titicaca'] },
    'geo:amazon': { regions: ['AMAZON BASIN'], rivers: ['Amazonas'] },
    'geo:oaxaca-mountains': { regions: ['Sierra Madre del Sur'] },
    'geo:new-guinea-highlands': { regions: ['NEW GUINEA HIGHLANDS'] },

    // Event areas, from provinces and countries
    'event:holodomor': { admin0: ['Ukraine'] },
    'event:volhynia': { admin1: [['UKR', ['Volyn', 'Rivne']]] },
    'event:sudetenland': { admin1: [['CZE', ['Karlovarský', 'Ústecký', 'Liberecký']]] },
    'event:trianon': { admin1: [['ROU', ['Alba', 'Arad', 'Bihor', 'Bistrita-Nasaud', 'Brasov', 'Caras-Severin', 'Cluj', 'Covasna', 'Harghita', 'Hunedoara', 'Maramures', 'Mures', 'Salaj', 'Satu Mare', 'Sibiu', 'Timis']]] },
    'event:krajina': { admin1: [['HRV', ['Licko-Senjska', 'Šibensko-Kninska', 'Zadarska', 'Sisacko-Moslavacka', 'Karlovacka']]] },
    'event:armenian-genocide': { admin1: [['TUR', ['Erzurum', 'Erzincan', 'Bayburt', 'Van', 'Bitlis', 'Mus', 'Bingöl', 'Elazig', 'Tunceli', 'Malatya', 'Diyarbakir', 'Batman', 'Siirt', 'Hakkari', 'Sivas', 'Agri']]] },
    'event:nagorno-karabakh': { admin1: [['AZE', ['Stepanakert', 'Xocalı', 'Xocavənd', 'Şuşa']]] },
    'event:irish-famine': { admin0: ['Ireland'], admin1: [['GBR', null, 'Northern Ireland']] },
    'event:gaza': { admin1: [['PSX', ['Gaza Strip']]] },
    'event:biafra': { admin1: [['NGA', ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo', 'Rivers', 'Bayelsa', 'Akwa Ibom', 'Cross River']]] },
    'event:ogaden-war': { admin1: [['ETH', ['Somali']]] },
    'event:darfur': { admin1: [['SDN', ['Central Darfur', 'Eastern Darfur', 'North Darfur', 'Southern Darfur', 'Western Darfur']]] },
    'event:congo-free-state': { admin0: ['Dem. Rep. Congo'] },
    'event:gukurahundi': { admin1: [['ZWE', ['Matabeleland North', 'Matabeleland South', 'Midlands', 'Bulawayo']]] },
    'event:war-of-the-pacific': { admin1: [['CHL', ['Antofagasta', 'Tarapacá', 'Arica y Parinacota']]] },
    'event:chaco-war': { admin1: [['PRY', ['Boquerón', 'Alto Paraguay', 'Presidente Hayes']]] },
    'event:mexican-cession': { admin1: [['USA', ['California', 'Nevada', 'Utah', 'Arizona', 'New Mexico', 'Colorado']]] },
    'event:black-hills': { counties: ['46081', '46103', '46033', '56011', '56045'] },

    // Event borders, from Natural Earth boundary lines
    'event:korean-dmz': { borders: [p => p.NAME === 'Military Demarcation Line 1953'] },
    'event:cyprus-green-line': { borders: [p => p.ADM0_LEFT === 'Cyprus No Mans Area' && p.ADM0_RIGHT === 'Northern Cyprus'] },
    'event:kashmir-loc': { borders: [p => p.ADM0_LEFT === 'India' && p.ADM0_RIGHT === 'Pakistan' && /Line of control/.test(p.FEATURECLA)] },
    'event:partition': {
        borders: [
            [p => [p.ADM0_LEFT, p.ADM0_RIGHT].sort().join() === 'India,Pakistan' && /International/.test(p.FEATURECLA), 29.5],
            p => [p.ADM0_LEFT, p.ADM0_RIGHT].sort().join() === 'Bangladesh,India',
        ],
    },
    'event:iran-iraq-war': { borders: [p => [p.ADM0_LEFT, p.ADM0_RIGHT].sort().join() === 'Iran,Iraq'] },
    'event:schleswig-1920': { borders: [p => [p.ADM0_LEFT, p.ADM0_RIGHT].sort().join() === 'Denmark,Germany'] },
    'event:parsley-massacre': { borders: [p => [p.ADM0_LEFT, p.ADM0_RIGHT].sort().join() === 'Dominican Republic,Haiti'] },
    'event:kaveri': { rivers: ['Cauvery'] },
}

/* ---------------- Collect raw features ---------------- */

const startLon = g => (g.type === 'LineString' ? g.coordinates[0][0] : g.coordinates[0][0][0])
/** Split a line into the runs of points at or north of a latitude. */
function clipNorth(f, lat) {
    const parts = f.geometry.type === 'LineString' ? [f.geometry.coordinates] : f.geometry.coordinates
    const runs = []
    for (const part of parts) {
        let run = []
        for (const c of part) {
            if (c[1] >= lat) run.push(c)
            else { if (run.length > 1) runs.push(run); run = [] }
        }
        if (run.length > 1) runs.push(run)
    }
    return runs.length ? { ...f, geometry: { type: 'MultiLineString', coordinates: runs } } : null
}

const polys = [], lines = [], missing = []
const take = (key, list, kind) => { for (const f of list) (kind === 'line' ? lines : polys).push({ type: 'Feature', properties: { key }, geometry: f.geometry }) }

for (const [key, spec] of Object.entries(SPECS)) {
    let found = 0
    const byName = (src, names, field) => {
        for (const n of names) {
            const hit = src.filter(f => (f.properties[field] ?? f.properties[field.toLowerCase()]) === n)
            if (!hit.length) missing.push(`${key}: ${n}`)
            found += hit.length
            take(key, hit, 'poly')
        }
    }
    if (spec.regions) byName(regions, spec.regions, 'NAME')
    if (spec.marine) byName(marine, spec.marine, 'name')
    if (spec.lakes) byName(lakes, spec.lakes, 'name')
    if (spec.admin0) byName(admin0, spec.admin0, 'NAME')
    for (const [iso, names, geonunit] of spec.admin1 ?? []) {
        const hit = admin1.filter(f => f.properties.adm0_a3 === iso &&
            (names ? names.includes(f.properties.name) : f.properties.geonunit === geonunit))
        const got = new Set(hit.map(f => f.properties.name))
        for (const n of names ?? []) if (!got.has(n)) missing.push(`${key}: ${iso} ${n}`)
        found += hit.length
        take(key, hit, 'poly')
    }
    if (spec.counties) {
        const hit = counties.filter(f => spec.counties.includes(String(f.id)))
        found += hit.length
        take(key, hit, 'poly')
    }
    for (const r of spec.rivers ?? []) {
        const [name, lo, hi] = Array.isArray(r) ? r : [r, -180, 180]
        const hit = rivers.filter(f => f.properties.name === name && startLon(f.geometry) >= lo && startLon(f.geometry) <= hi)
        if (!hit.length) missing.push(`${key}: river ${name}`)
        found += hit.length
        take(key, hit, 'line')
    }
    for (const b of spec.borders ?? []) {
        const [pred, aboveLat] = Array.isArray(b) ? b : [b, -90]
        // Keep only the parts north of aboveLat (e.g. the Punjab section of the India–Pakistan border).
        const hit = borders.filter(f => pred(f.properties)).map(f => clipNorth(f, aboveLat)).filter(Boolean)
        if (!hit.length) missing.push(`${key}: border`)
        found += hit.length
        take(key, hit, 'line')
    }
    if (!found) missing.push(`${key}: NOTHING`)
}
if (missing.length) { console.error('Missing sources:\n  ' + missing.join('\n  ')); process.exit(1) }

/* ---------------- Merge and simplify with mapshaper ---------------- */

// One item at a time: mapshaper treats a layer as a planar map, so items that overlap
// (the Himalaya inside the Tibetan Plateau, Volhynia inside Ukraine) must not share a run.
const mapshaper = (await import('mapshaper')).default
async function simplify(features, cmds) {
    const input = { 'in.json': { type: 'FeatureCollection', features } }
    const out = await mapshaper.applyCommands(`-i in.json ${cmds} -o out.json format=geojson precision=0.001`, input)
    const fc = JSON.parse(out['out.json'])
    return fc.features.find(f => f.geometry)?.geometry ?? null
}
const shapes = {}
for (const key of Object.keys(SPECS)) {
    const p = polys.filter(f => f.properties.key === key)
    const l = lines.filter(f => f.properties.key === key)
    const entry = {}
    if (p.length) entry.polys = await simplify(p, '-clean -dissolve2 key -simplify interval=3km weighted keep-shapes -filter-slivers min-area=20km2')
    if (l.length) entry.lines = await simplify(l, '-dissolve key -simplify interval=2km')
    for (const k of Object.keys(entry)) if (!entry[k]) delete entry[k]
    if (!Object.keys(entry).length) { console.error(`${key}: empty after simplifying`); process.exit(1) }
    shapes[key] = entry
}

const out = join(root, 'public/peoples/shapes.json')
writeFileSync(out, JSON.stringify(shapes))
console.log(`wrote ${Object.keys(shapes).length} shapes to public/peoples/shapes.json (${(readFileSync(out).length / 1024).toFixed(0)} KB)`)
