// US counties (us-atlas, Census cartographic boundaries) coloured by their plurality
// ancestry / origin group from scripts/peoples/us-county-plurality.txt.

import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { feature } from 'topojson-client'

const require = createRequire(import.meta.url)

const LETTER_TO_LEAF = {
    g: 'german-americans', i: 'irish-americans', e: 'english-americans', o: 'upland-southerners',
    t: 'italian-americans', n: 'nordic-americans', f: 'french-americans', b: 'african-americans',
    s: 'asian-americans', m: 'mexican-americans', h: 'hispanic-americans', p: 'polynesians',
}

/** Native-plurality counties are split by region (state FIPS). */
function nativeLeaf(stateFips) {
    if (stateFips === '02') return 'alaska-natives'
    if (['04', '35', '49'].includes(stateFips)) return 'southwest-nations'
    if (stateFips === '40') return 'oklahoma-nations'
    if (['06', '32'].includes(stateFips)) return 'great-basin-nations'
    if (stateFips === '37') return 'eastern-nations'
    if (stateFips === '15') return 'polynesians'
    return 'plains-nations'
}

/**
 * The ACS release uses Connecticut's 2022 planning regions and Alaska's 2019
 * Chugach / Copper River split; us-atlas still has the older units.
 */
const OLD_UNIT_LETTERS = {
    '09001': 't', // Fairfield ≈ Western CT
    '09003': 'i', // Hartford ≈ Capitol
    '09005': 'i', // Litchfield ≈ Northwest Hills
    '09007': 't', // Middlesex ≈ Lower CT River Valley
    '09009': 't', // New Haven ≈ South Central
    '09011': 'i', // New London ≈ Southeastern
    '09013': 'i', // Tolland ≈ Capitol
    '09015': 'f', // Windham ≈ Northeastern
    '02261': 'g', // Valdez-Cordova (Chugach majority of population)
}

export function usCountyFeatures(here) {
    const text = fs.readFileSync(path.join(here, 'us-county-plurality.txt'), 'utf8')
    const codes = text.split('\n').filter(l => l && !l.startsWith('#')).join('')
    const letterByFips = new Map()
    for (let i = 0; i < codes.length; i += 6) letterByFips.set(codes.slice(i, i + 5), codes[i + 5])
    for (const [fips, letter] of Object.entries(OLD_UNIT_LETTERS)) letterByFips.set(fips, letter)

    const topo = require('us-atlas/counties-10m.json')
    const counties = feature(topo, topo.objects.counties).features
    const out = []
    const unmatched = []
    for (const c of counties) {
        const fips = String(c.id).padStart(5, '0')
        const state = fips.slice(0, 2)
        if (Number(state) > 56) continue // Puerto Rico and territories come from Natural Earth
        const letter = letterByFips.get(fips)
        if (!letter) { unmatched.push(fips); continue }
        const leaf = letter === 'a' ? nativeLeaf(state) : LETTER_TO_LEAF[letter]
        out.push({ type: 'Feature', properties: { leaf }, geometry: c.geometry })
    }
    if (unmatched.length) console.warn('US counties without data:', unmatched.join(' '))
    return out
}
