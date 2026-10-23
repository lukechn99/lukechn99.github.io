import type { PeopleEvent } from './types.ts'

/** Sub-Saharan Africa, the Pacific and Australia. */
export const africaPacificEvents: PeopleEvent[] = [
    {
        id: 'benin-1897', name: 'Sack of Benin City', date: '1897', kind: 'conflict',
        summary: 'A British punitive expedition burned the capital of the Benin Kingdom and looted thousands of bronzes and ivories, now scattered across Western museums.',
        match: ["Britain's 1897 sack of Benin City"],
        shapes: [{ point: [6.335, 5.627] }],
    },
    {
        id: 'biafra', name: 'Biafran War', date: '1967–70', kind: 'conflict',
        summary: 'After pogroms against Igbo in the north, the southeast seceded as Biafra; blockade-induced famine killed perhaps 1–2 million before Biafra surrendered.',
        match: ['the 1967–70 Biafran war', 'helped trigger the Biafran war'],
        shapes: [{ area: [5.8, 7.4], km: 180 }],
    },
    {
        id: 'sokoto', name: 'Sokoto Caliphate', date: '1804–1903', kind: 'conflict',
        summary: 'Usman dan Fodio’s Fulani-led jihad overthrew the Hausa kings and built one of Africa’s largest states, until British conquest in 1903.',
        match: ['Fulani jihadists conquered the Hausa states in 1804', 'in the Sokoto Caliphate'],
        shapes: [{ point: [13.06, 5.24] }],
    },
    {
        id: 'oyo-dahomey', name: 'Oyo Empire and Dahomey', date: '1700s', kind: 'conflict',
        summary: 'Oyo’s cavalry forced Dahomey to pay tribute from the 1730s; both grew rich from the Atlantic slave trade before Oyo collapsed in the 1830s.',
        match: ['The Oyo Empire and Dahomey fought', 'Dahomey and Oyo were rivals'],
        shapes: [{ point: [8.95, 4.38], label: 'Oyo-Ile' }, { point: [7.18, 1.99], label: 'Abomey' }],
    },
    {
        id: 'maiduguri', name: 'Maiduguri and Boko Haram', date: 'since 2009', kind: 'conflict',
        summary: 'Boko Haram began as a Maiduguri sect and launched its insurgency in 2009; it spread into Niger, Chad and Cameroon and kidnapped the Chibok schoolgirls in 2014.',
        match: ['born in Kanuri Maiduguri'],
        shapes: [{ point: [11.83, 13.15] }],
    },
    {
        id: 'anglophone-crisis', name: 'Anglophone crisis', date: 'since 2016', kind: 'conflict',
        summary: 'Protests by English-speaking lawyers and teachers turned into an armed separatist war for “Ambazonia” in Cameroon’s two western regions.',
        match: ['the Anglophone separatist conflict', 'The Anglophone crisis since 2016'],
        shapes: [{ point: [5.96, 10.15], label: 'Bamenda' }],
    },
    {
        id: 'ogaden-war', name: 'Ogaden War', date: '1977–78', kind: 'conflict',
        summary: 'Somalia invaded Ethiopia’s Somali-inhabited Ogaden; Soviet and Cuban support for Ethiopia turned the war and Somalia withdrew.',
        match: ['the 1977–78 Ogaden War'],
        shapes: [{ area: [7.0, 44.0], km: 300 }],
    },
    {
        id: 'tigray-war', name: 'Tigray war', date: '2020–22', kind: 'conflict',
        summary: 'Ethiopia’s federal army, Eritrea and Amhara forces fought the TPLF; famine and massacres killed hundreds of thousands before a truce in Pretoria.',
        match: ['the 2020–22 war', 'the Tigray war'],
        shapes: [{ point: [13.497, 39.475], label: 'Mekelle' }],
    },
    {
        id: 'gerd', name: 'Grand Ethiopian Renaissance Dam', date: '2011–25', kind: 'place',
        summary: 'Africa’s largest hydroelectric dam, on the Blue Nile near Sudan; Egypt fears for its water supply, Ethiopia sees it as a national triumph.',
        match: ['Grand Ethiopian Renaissance Dam', "Ethiopia's Nile dam"],
        shapes: [{ point: [11.215, 35.09] }],
    },
    {
        id: 'darfur', name: 'Darfur', date: '2003–05, since 2023', kind: 'conflict',
        summary: 'Janjaweed militias backed by Khartoum killed and displaced non-Arab Darfuris from 2003; their successor, the RSF, massacred Masalit in El Geneina in 2023.',
        match: ['Arab militias (Janjaweed, then the RSF)', 'Two genocidal campaigns'],
        shapes: [{ area: [13.5, 24.5], km: 330 }, { point: [13.45, 22.44], label: 'El Geneina' }],
    },
    {
        id: 'south-sudan-2011', name: 'South Sudan independence', date: '2011', kind: 'treaty',
        summary: 'After the 2005 peace deal, southerners voted almost unanimously to secede; South Sudan became independent on 9 July 2011 with Juba as capital.',
        match: ["led to South Sudan's independence in 2011"],
        shapes: [{ point: [4.85, 31.58], label: 'Juba' }],
    },
    {
        id: 'zanzibar-1964', name: 'Zanzibar Revolution', date: '1964', kind: 'conflict',
        summary: 'African revolutionaries overthrew the Omani-descended sultan; thousands of Arabs and South Asians were killed, and Zanzibar soon merged with Tanganyika as Tanzania.',
        match: ['the 1964 revolution'],
        shapes: [{ point: [-6.165, 39.2] }],
    },
    {
        id: 'rwanda-1994', name: 'Rwandan genocide', date: '1994', kind: 'conflict',
        summary: 'Over about 100 days, Hutu extremists killed some 500,000–800,000 Tutsi and moderate Hutu, until the Tutsi-led RPF took Kigali.',
        match: ['The 1994 genocide in Rwanda'],
        shapes: [{ point: [-1.944, 30.06], label: 'Kigali' }],
    },
    {
        id: 'congo-free-state', name: 'Congo Free State', date: '1885–1908', kind: 'conflict',
        summary: 'King Leopold II’s private colony forced people to gather rubber through hostage-taking and mutilation; millions died before Belgium took it over.',
        match: ["Leopold II's Congo Free State"],
        shapes: [{ area: [-2.5, 23.5], km: 900 }],
    },
    {
        id: 'herero-nama', name: 'Herero and Nama genocide', date: '1904–08', kind: 'conflict',
        summary: 'After the Battle of Waterberg, German troops drove the Herero into the desert and interned survivors in camps; most Herero and about half the Nama died.',
        match: ['the 1904–08 German genocide in Namibia'],
        shapes: [{ point: [-20.5, 17.24], label: 'Waterberg' }],
    },
    {
        id: 'gukurahundi', name: 'Gukurahundi', date: '1983–87', kind: 'conflict',
        summary: 'Mugabe’s North Korean–trained Fifth Brigade killed an estimated 20,000 Ndebele civilians in Matabeleland and the Midlands.',
        match: ['Gukurahundi'],
        shapes: [{ area: [-20.0, 28.0], km: 220 }],
    },
    {
        id: 'central-kalahari', name: 'Central Kalahari Game Reserve', date: '1997–2006', kind: 'place',
        summary: 'Botswana moved most San out of their ancestral reserve; the High Court ruled in 2006 that the evictions were unconstitutional.',
        match: ['evicted from the Central Kalahari reserve'],
        shapes: [{ poly: [[-20.9, 23.0], [-20.9, 24.6], [-21.8, 25.0], [-22.9, 24.9], [-23.0, 23.6], [-22.4, 22.6], [-21.4, 22.7]] }],
    },
    {
        id: 'waitangi', name: 'Treaty of Waitangi', date: '1840', kind: 'treaty',
        summary: 'Signed by the British Crown and over 500 Māori chiefs; its English and Māori texts differ on sovereignty, and its breaches are redressed by the Waitangi Tribunal.',
        match: ['the Treaty of Waitangi'],
        shapes: [{ point: [-35.27, 174.08] }],
    },
    {
        id: 'mabo', name: 'Mabo decision', date: '1992', kind: 'treaty',
        summary: 'Eddie Mabo’s case for Mer (Murray Island) led the High Court to overturn terra nullius and recognize native title in Australian law.',
        match: ['the 1992 Mabo decision'],
        shapes: [{ point: [-9.92, 144.05], label: 'Mer' }],
    },
    {
        id: 'hawaii-1893', name: 'Overthrow of the Hawaiian Kingdom', date: '1893', kind: 'conflict',
        summary: 'American businessmen, backed by US Marines, deposed Queen Liliʻuokalani at ʻIolani Palace; the US annexed Hawaiʻi in 1898 and apologized in 1993.',
        match: ['the 1893 overthrow'],
        shapes: [{ point: [21.307, -157.859], label: 'ʻIolani Palace' }],
    },
    {
        id: 'bougainville', name: 'Bougainville conflict', date: '1988–98', kind: 'conflict',
        summary: 'Anger at the Panguna copper mine sparked a secessionist war with Papua New Guinea; a 2019 referendum voted 98% for independence, still pending.',
        match: ["Bougainville's war against Papua New Guinea"],
        shapes: [{ point: [-6.32, 155.49], label: 'Panguna mine' }],
    },
    {
        id: 'makassan-trade', name: 'Makassan trepang voyages', date: 'c. 1700–1907', kind: 'migration',
        summary: 'Each monsoon, fleets from Makassar sailed to Arnhem Land to harvest sea cucumber for China, leaving words, art and families among the Yolŋu.',
        match: ['Makassan sailors from Sulawesi'],
        shapes: [
            { line: [[-5.14, 119.42], [-6.5, 120.5], [-8.3, 123.5], [-9.0, 126.5], [-10.0, 129.5], [-11.0, 132.0], [-11.6, 134.5], [-12.25, 136.89]] },
            { point: [-12.25, 136.89], label: 'Arnhem Land' },
        ],
    },
    {
        id: 'moruroa', name: 'Moruroa nuclear tests', date: '1966–96', kind: 'place',
        summary: 'France detonated 193 nuclear weapons at Moruroa and Fangataufa atolls; in 2021 it acknowledged a “debt” to French Polynesia.',
        match: ['France tested nuclear weapons in French Polynesia'],
        shapes: [{ point: [-21.83, -138.88] }],
    },
    {
        id: 'bikini', name: 'Bikini Atoll tests', date: '1946–58', kind: 'place',
        summary: 'The US tested nuclear weapons in the Marshall Islands, including the 1954 Castle Bravo blast; Bikini’s people were moved and still cannot safely return.',
        match: ['nuclear test damage is unresolved'],
        shapes: [{ point: [11.58, 165.38] }],
    },
]
