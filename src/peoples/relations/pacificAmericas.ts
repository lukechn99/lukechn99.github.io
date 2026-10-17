import type { RelationsMap } from './types.ts'

export const pacificAmericasRelations: RelationsMap = {
    'malayic': [
        { label: "Austronesian family", text: "Part of the Austronesian family, which spread by sea from Taiwan about 5,000 years ago to Madagascar, Indonesia, the Philippines and the Pacific. Basic words still match across 15,000 km: 'eye' is mata in Malay and Tagalog, maka in Hawaiian, maso in Malagasy; 'five' is lima in Malay, Tagalog and Hawaiian, dimy in Malagasy. Malay and Indonesian are close to Javanese, Sundanese and the languages of Borneo, where Malagasy also originated." },
        { with: 'han', text: 'Chinese commercial minorities have faced riots and discrimination; Malaysia\'s affirmative action favors Malays over Chinese.' },
        { with: 'dutch', text: 'Dutch rule (about 1600–1949) and the brutal independence war.' },
    ],
    'javanese': [
        { label: 'Outer islanders', text: 'Government "transmigration" moved millions of Javanese to Sumatra, Kalimantan and Papua, causing resentment and conflict.' },
        { with: 'sundanese', text: 'Close neighbours on the same island, with distinct languages and court cultures.' },
        { with: 'papuans', text: 'Many Papuans see Javanese migration and Jakarta\'s military presence as occupation.' },
    ],
    'sundanese': [
        { with: 'javanese', text: 'A Sundanese–Javanese rivalry dates to the 1357 Bubat incident, when a Sundanese royal party was killed by Majapahit forces.' },
    ],
    'malays': [
        { label: 'Malaysian Chinese and Indians', text: 'The 1969 race riots led to pro-Malay economic policies; ethnic politics still dominate Malaysia.' },
        { with: 'thai', text: 'Malay Muslims in southern Thailand have fought an insurgency since 2004.' },
        { with: 'javanese', text: 'Malaysia and Indonesia share language and religion but compete over culture, from batik to rendang.' },
    ],
    'sumatrans': [
        { with: 'javanese', text: 'Aceh fought Jakarta from 1976 to 2005; the 2004 tsunami helped bring peace and autonomy.' },
        { with: 'malays', text: 'Minangkabau migrants (merantau) are found across Malaysia and Indonesia.' },
    ],
    'balinese': [
        { with: 'javanese', text: 'A Hindu enclave next to Muslim Java; the 2002 Bali bombings by Islamists killed 202.' },
        { label: 'Tourists', text: 'Mass tourism dominates the economy and strains water and land.' },
    ],
    'bornean': [
        { with: 'eastern-indonesians', text: 'Dayak–Madurese violence in Kalimantan in 1997 and 2001 killed hundreds of migrants.' },
        { with: 'malays', text: 'Sabah and Sarawak resent Malay-dominated federal politics and seek more autonomy.' },
    ],
    'sulawesi': [
        { label: 'Christians and Muslims', text: 'The 1998–2001 Poso conflict in Central Sulawesi killed over 1,000.' },
        { with: 'malays', text: 'Bugis seafarers settled widely in Malaysia; some Malaysian sultanates have Bugis lineage.' },
    ],
    'eastern-indonesians': [
        { label: 'Christians and Muslims', text: 'The 1999–2002 Maluku sectarian conflict killed about 5,000.' },
        { with: 'javanese', text: 'Indonesia\'s 1975–99 occupation of East Timor killed perhaps 100,000–180,000 Timorese.' },
    ],
    'philippine': [
        { label: "Austronesian family", text: "Part of the Austronesian family, which spread by sea from Taiwan about 5,000 years ago to Madagascar, Indonesia, the Philippines and the Pacific. Basic words still match across 15,000 km: 'eye' is mata in Malay and Tagalog, maka in Hawaiian, maso in Malagasy; 'five' is lima in Malay, Tagalog and Hawaiian, dimy in Malagasy. Tagalog, Cebuano and Ilocano are close relatives of each other; 'two' is dalawa in Tagalog and duha in Cebuano, dua in Malay and rua in Māori." },
        { label: 'Spain and the US', text: 'Three centuries of Spanish rule and the brutal 1899–1902 Philippine–American War.' },
        { with: 'han', text: 'Disputes with China in the South China Sea; Chinese Filipinos are prominent in business.' },
    ],
    'tagalog': [
        { with: 'visayans', text: 'Visayans resent "Imperial Manila" and the choice of Tagalog as the basis of Filipino.' },
        { with: 'moros', text: 'Manila-based governments fought Moro separatists for decades.' },
    ],
    'ilocano': [
        { with: 'tagalog', text: 'The "Solid North" has backed Ilocano politicians, especially the Marcos family.' },
        { label: 'Igorot', text: 'Cordillera highlanders resisted Spanish rule and seek autonomy.' },
    ],
    'visayans': [
        { with: 'tagalog', text: 'Cultural rivalry over language and political power.' },
        { with: 'moros', text: 'Christian Visayan settlers moved into Mindanao in the 20th century, displacing Moros and Lumad peoples.' },
    ],
    'bikolanos': [
        { with: 'tagalog', text: 'Close neighbours; many Bikolanos work in Manila.' },
    ],
    'moros': [
        { with: 'visayans', text: 'Christian settlement of Mindanao fueled the separatist war that killed about 120,000 people.' },
        { with: 'tagalog', text: 'Peace deals in 2014 and 2019 created the Bangsamoro region.' },
        { with: 'malays', text: 'Sulu sultans once ruled Sabah, still claimed by the Philippines.' },
    ],
    'malagasy': [
        { label: "Austronesian family", text: "Part of the Austronesian family, which spread by sea from Taiwan about 5,000 years ago to Madagascar, Indonesia, the Philippines and the Pacific. Basic words still match across 15,000 km: 'eye' is mata in Malay and Tagalog, maka in Hawaiian, maso in Malagasy; 'five' is lima in Malay, Tagalog and Hawaiian, dimy in Malagasy. Malagasy's closest relative is Ma'anyan, spoken in southern Borneo, 7,000 km away; settlers sailed across the Indian Ocean about 1,500 years ago." },
        { label: 'Merina and côtiers', text: 'Highland Merina and coastal peoples are rivals rooted in the 19th-century Merina kingdom.' },
        { with: 'french', text: 'France suppressed the 1947 uprising, killing tens of thousands.' },
    ],
    'oceanic': [
        { label: "Austronesian family", text: "Part of the Austronesian family, which spread by sea from Taiwan about 5,000 years ago to Madagascar, Indonesia, the Philippines and the Pacific. Basic words still match across 15,000 km: 'eye' is mata in Malay and Tagalog, maka in Hawaiian, maso in Malagasy; 'five' is lima in Malay, Tagalog and Hawaiian, dimy in Malagasy. Polynesian languages are so close that Hawaiian, Māori, Tahitian and Samoan speakers can recognise many words: 'two' is lua, rua, piti (rua in old Tahitian) and lua." },
        { with: 'papuans', text: 'Melanesians blend Austronesian and Papuan ancestry.' },
        { with: 'anglosphere', text: 'Australia, New Zealand and the US dominate aid and security; many islanders migrate there.' },
    ],
    'melanesians': [
        { with: 'french', text: 'Kanak independence: three referendums (2018–21) kept New Caledonia French, and 2024 unrest left 14 dead.' },
        { label: 'Indo-Fijians', text: 'Coups in 1987 and 2000 aimed to keep iTaukei Fijians in power over the Indian-descended community.' },
        { with: 'papuans', text: 'Bougainville\'s war against Papua New Guinea (1988–98) killed up to 20,000.' },
    ],
    'polynesians': [
        { with: 'australians-nzers', text: 'Māori and the Crown dispute land and treaty rights; Pacific Islanders are a fifth of Auckland.' },
        { with: 'americans', text: 'Native Hawaiians seek redress for the 1893 overthrow; tourism and housing costs push many out.' },
        { with: 'french', text: 'France tested nuclear weapons in French Polynesia from 1966 to 1996.' },
    ],
    'micronesians': [
        { with: 'americans', text: 'Compacts of Free Association give the US military rights and Micronesians the right to live in the US; nuclear test damage is unresolved.' },
        { with: 'japanese', text: 'Japan ruled Micronesia between the world wars; the islands were battlefields in World War II.' },
    ],
    'papuans': [
        { with: 'javanese', text: 'Indonesia took Papua in a disputed 1969 vote; separatist conflict and military abuses continue.' },
        { with: 'australians-nzers', text: 'Australia governed Papua New Guinea until 1975.' },
        { label: 'each other', text: 'Highland clan warfare has escalated with guns, especially in Enga province.' },
    ],
    'aboriginal-australians': [
        { with: 'australians-nzers', text: 'Frontier massacres, removal of children and land loss; native title rights since the 1992 Mabo decision.' },
        { label: 'Makassan trepangers', text: 'Before Europeans, Makassan sailors from Sulawesi traded with Yolŋu people in Arnhem Land for centuries.' },
    ],

    'indigenous-americas': [
        { with: 'romance', text: 'Spanish and Portuguese conquest, forced labor and mestizaje (mixing).' },
        { with: 'anglosphere', text: 'Treaties, removal and reservations in the US and Canada.' },
    ],
    'andean': [
        { with: 'andean-mestizos', text: 'Highland Indigenous peoples have long been excluded by coastal elites; Bolivia\'s 2009 constitution made it a "plurinational" state.' },
    ],
    'quechua': [
        { with: 'andean-mestizos', text: 'Marginalization and racism toward highland Quechua speakers; the 2022–23 protests saw dozens killed in the south.' },
        { with: 'aymara', text: 'Neighbours and partners around Lake Titicaca, with a friendly rivalry.' },
        { with: 'castilians', text: 'Pizarro\'s conquest of the Inca and colonial forced labor at the Potosí silver mines.' },
    ],
    'aymara': [
        { with: 'andean-mestizos', text: 'Aymara movements led the 2003 "gas war" and brought Evo Morales to power; lowland Santa Cruz elites opposed him.' },
        { with: 'quechua', text: 'Close neighbours who share many customs.' },
    ],
    'mesoamerican': [
        { with: 'mexicans', text: 'Mexico celebrates its Aztec past while Indigenous people remain among its poorest.' },
    ],
    'maya': [
        { with: 'central-americans', text: 'Guatemala\'s ladino-led army committed genocide against the Maya in the early 1980s; ex-dictator Ríos Montt was convicted in 2013 (later overturned).' },
        { with: 'mexicans', text: 'The 1994 Zapatista rebellion in Chiapas, and the 19th-century Caste War of Yucatán.' },
    ],
    'zapotec-mixtec': [
        { with: 'mexicans', text: 'Oaxaca\'s communities govern by "usos y costumbres" (customary law); the 2006 Oaxaca uprising pitted teachers and Indigenous groups against the state.' },
    ],
    'amazonian': [
        { with: 'brazilians', text: 'Loggers, miners and ranchers invade Indigenous land; the Yanomami suffered a humanitarian emergency from illegal gold mining.' },
        { with: 'colombians-venezuelans', text: 'Armed groups and illegal mining in the Colombian and Venezuelan Amazon threaten Indigenous communities.' },
    ],
    'arctic-north': [
        { with: 'anglo-canadians', text: 'Land claims agreements since the 1970s give northern peoples substantial self-government.' },
    ],
    'inuit': [
        { with: 'danes', text: 'Greenland is moving toward independence; Danish colonial policies, including forced contraception, are under scrutiny.' },
        { with: 'anglo-canadians', text: 'Forced relocations in the 1950s and residential schools; Canada apologized for the High Arctic relocation in 2010.' },
        { with: 'americans', text: 'US interest in buying or controlling Greenland was renewed in 2025.' },
    ],
    'dene': [
        { with: 'anglo-canadians', text: 'Residential schools and resource extraction; modern treaties give Dene nations land and self-government.' },
        { with: 'inuit', text: 'Historically distrustful neighbours along the treeline; now partners in northern politics.' },
    ],
}
