import type { GeoFeature } from './types.ts'

/** Africa, the Americas and Oceania. */
export const southernFeatures: GeoFeature[] = [
    {
        id: 'atlas', name: 'Atlas Mountains', kind: 'mountains',
        shapes: [{ line: [[30.5, -9.5], [31.5, -7.0], [33.0, -4.5], [34.5, -1.0], [35.8, 3.0], [36.5, 6.0], [36.8, 9.5]] }],
        summary: 'A 2,500 km range across Morocco, Algeria and Tunisia, separating the Mediterranean coast from the Sahara.',
        importance: 'When Arab armies and later Arabic culture spread across the coastal plains, the Atlas and the Rif and Kabylie massifs stayed Berber-speaking, refuges for the Amazigh language and way of life.',
        peoples: {
            'amazigh': 'Berber speech survives mainly in the mountains: Tashelhit in the High Atlas, Tarifit in the Rif, Kabyle in Kabylie.',
            'maghrebis': 'Arabic-speaking cities and plains lie on the coastal side of the range, with the desert on the other.',
        },
    },
    {
        id: 'sahara', name: 'Sahara', kind: 'desert',
        shapes: [{ area: [23.0, 10.0], km: 1600 }],
        summary: 'The world\'s largest hot desert, about the size of the United States, from the Atlantic to the Red Sea.',
        importance: 'The Sahara both divides and connects: it separates North Africa from the rest of the continent, yet camel caravans carried gold, salt, slaves, books and Islam across it for a thousand years. It was green as recently as about 6,000 years ago.',
        peoples: {
            'berbers': 'Berbers were the original masters of the desert routes, and Saharan oases are still Berber-speaking in many places.',
            'tuareg': 'The Tuareg are the Sahara\'s great nomads, who guided and taxed the caravans; their culture is built around desert life.',
            'maghrebis': 'North Africa faces the Mediterranean and Middle East rather than the south because the desert stands behind it.',
            'kanuri-teda': 'The Teda (Tubu) of the Tibesti mountains are among the most desert-adapted peoples anywhere.',
            'songhai-zarma': 'The Songhai Empire grew rich at Gao and Timbuktu, where caravans from the north met the Niger River.',
        },
    },
    {
        id: 'sahel', name: 'Sahel', kind: 'plain',
        at: [14.0, 5.0],
        shapes: [{ line: [[15.5, -16.0], [14.8, -5.0], [13.8, 5.0], [13.3, 15.0], [13.8, 25.0], [14.5, 33.0]] }],
        summary: 'A belt of semi-arid grassland along the southern edge of the Sahara, from Senegal to Sudan.',
        importance: 'Sahel means "shore" in Arabic: the edge of the desert sea, where caravan cities grew and herders and farmers met. Its great empires, Ghana, Mali, Songhai and Kanem-Bornu, rose here, and so does much of today\'s farmer–herder and jihadist violence.',
        peoples: {
            'fulani': 'Fulani herders follow the rains across the whole Sahel, the most widely spread people in West Africa.',
            'hausa': 'The Hausa city-states, Kano, Katsina and Zaria, were Sahel trade centres linking the forest and the desert.',
            'songhai-zarma': 'The Songhai and Zarma live along the Niger bend in the heart of the Sahel.',
            'kanuri-teda': 'Kanem-Bornu ruled the Lake Chad basin for a thousand years from the Sahel.',
            'darfur': 'Darfur lies at the Sahel\'s eastern end, where drought and competition for land fed the 2003 war.',
            'mande': 'The Mali Empire of Sundiata and Mansa Musa grew rich on Sahel gold and trade.',
        },
    },
    {
        id: 'nile', name: 'Nile', kind: 'river',
        shapes: [{ line: [[31.5, 31.2], [30.0, 31.2], [27.0, 31.0], [24.0, 32.9], [21.0, 31.0], [18.0, 33.5], [15.6, 32.5], [12.0, 32.7], [9.5, 30.5], [4.8, 31.6], [2.3, 31.4], [0.4, 33.2]] }],
        summary: 'The world\'s longest river by most measures, about 6,650 km from Lake Victoria and the Ethiopian Highlands to the Mediterranean.',
        importance: 'Egypt is "the gift of the Nile": its yearly flood made a desert green and allowed one of the first states. Further south the river linked Egypt to Nubia and to the Nilotic peoples of the swamps named after it.',
        peoples: {
            'egyptians': 'Almost all Egyptians live within a few kilometres of the Nile or its delta, on about 5% of the country\'s land.',
            'nubians': 'Nubians lived for millennia along the middle Nile, building the kingdom of Kush whose pharaohs once ruled Egypt.',
            'nilotes-sudan': 'The Dinka, Nuer and Shilluk herd cattle in the Sudd, the vast Nile swamps; linguists named them Nilotes after the river.',
            'sudanic-arabs': 'Khartoum stands where the White and Blue Niles meet, the centre of Sudanese Arab life.',
            'great-lakes': 'Lake Victoria, the Nile\'s main source, is in the Great Lakes region; the Baganda kingdom grew on its shores.',
        },
    },
    {
        id: 'ethiopian-highlands', name: 'Ethiopian Highlands', kind: 'plateau',
        shapes: [{ area: [10.5, 38.5], km: 450 }],
        summary: 'A massive volcanic plateau, much of it above 1,500 m, cut by deep gorges, in Ethiopia and Eritrea.',
        importance: 'The highlands\' cool climate and natural fortress walls sheltered a Christian kingdom from the 4th century and helped Ethiopia defeat Italy at Adwa in 1896, the only African state never colonized (apart from the Italian occupation of 1936–41).',
        peoples: {
            'amhara': 'The Amhara are highland farmers of teff and barley, heirs of the Solomonic empire ruled from the plateau.',
            'tigrinya': 'Tigray and highland Eritrea hold Aksum, the plateau\'s first great kingdom.',
            'oromo': 'The Oromo moved into the central and southern highlands in the 16th century and are now Ethiopia\'s largest people.',
            'afar': 'The Afar live below the highlands in the Danakil depression, one of the hottest places on Earth, a world apart from the plateau.',
        },
    },
    {
        id: 'congo-rainforest', name: 'Congo Rainforest', kind: 'forest',
        shapes: [{ area: [-0.5, 22.0], km: 850 }],
        summary: 'The world\'s second-largest tropical rainforest, covering the Congo River basin.',
        importance: 'The forest was the home of foraging peoples like the Mbuti and BaAka long before Bantu farmers arrived about 3,000 years ago, moving along its rivers. Its rivers were the region\'s highways, and its wealth in rubber and minerals drew brutal colonial exploitation.',
        peoples: {
            'equatorial-bantu': 'The Mongo, Fang and other forest Bantu adapted farming to the forest and still live closely with forager neighbours.',
            'central-bantu': 'The Congo River and its tributaries carried Bantu languages across central Africa.',
            'ubangian': 'Ubangian peoples live along the forest\'s northern edge, on the Ubangi River.',
        },
    },
    {
        id: 'lake-victoria', name: 'Lake Victoria', kind: 'water',
        shapes: [{ area: [-1.0, 33.0], km: 140 }],
        summary: 'Africa\'s largest lake, shared by Uganda, Kenya and Tanzania, and the main source of the White Nile.',
        importance: 'Its fertile, rainy shores support some of Africa\'s densest farming populations and were the base of the great lakes kingdoms; Bantu and Nilotic peoples meet around it.',
        peoples: {
            'great-lakes': 'The kingdom of Buganda, which gave Uganda its name, grew on the lake\'s northern shore.',
            'nilotes-east': 'The Luo of Kenya live around the Winam Gulf on its eastern side, fishing and farming.',
            'east-african-bantu': 'The Sukuma of Tanzania, the country\'s largest people, farm and herd south of the lake.',
        },
    },
    {
        id: 'kalahari', name: 'Kalahari', kind: 'desert',
        shapes: [{ area: [-23.0, 22.0], km: 450 }],
        summary: 'A semi-arid sandy savanna covering most of Botswana and parts of Namibia and South Africa.',
        importance: 'Too dry for Bantu farming, the Kalahari remained a refuge for San foragers, whose knowledge of water and plants let them live where others could not.',
        peoples: {
            'khoe-san': 'The San are the Kalahari\'s oldest inhabitants; their hunting and tracking skills are legendary.',
            'sotho-tswana': 'The Tswana herded cattle on its eastern fringe, and Botswana is largely Kalahari.',
            'southwest-bantu': 'The Herero and Ovambo live on its western margins in Namibia.',
        },
    },
    {
        id: 'rockies', name: 'Rocky Mountains', kind: 'mountains',
        shapes: [{ line: [[59.0, -128.0], [55.0, -122.0], [50.0, -116.0], [46.0, -113.0], [43.0, -110.0], [40.0, -106.0], [36.0, -105.5]] }],
        summary: 'The great range of western North America, 4,800 km from British Columbia to New Mexico.',
        importance: 'The Rockies divided Plains peoples from Great Basin and Plateau peoples and were the last great barrier to westward expansion, crossed by trappers and the Oregon Trail in the 1840s.',
        peoples: {
            'plains-nations': 'The Lakota, Cheyenne and Crow hunted buffalo on the plains east of the range; the Black Hills are an outlying island of mountains.',
            'great-basin-nations': 'West of the Rockies, Shoshone and Paiute adapted to the dry basins and ranges.',
            'americans': 'Crossing the Rockies opened Oregon and California to American settlement and later the transcontinental railroad.',
        },
    },
    {
        id: 'mississippi', name: 'Mississippi River', kind: 'river',
        shapes: [{ line: [[47.2, -95.2], [44.9, -93.2], [41.5, -90.5], [38.6, -90.2], [35.1, -90.0], [32.3, -90.9], [30.4, -91.2], [29.9, -90.1], [29.2, -89.3]] }],
        summary: 'North America\'s great river system, draining 40% of the continental US to the Gulf of Mexico.',
        importance: 'The Mississippi was the highway of the continent, from the Mississippian mound-builders of Cahokia to French explorers, steamboats and the cotton trade. The 1803 Louisiana Purchase gave the US the whole basin.',
        peoples: {
            'americans': 'Mark Twain\'s river is a symbol of the American heartland, dividing East from West in the national imagination.',
            'french-americans': 'French explorers claimed the basin as Louisiana; Cajuns and Creoles keep French heritage near its mouth.',
            'african-americans': 'The Mississippi Delta was the heart of cotton slavery and later the birthplace of the blues; the Great Migration ran up the river to Chicago.',
        },
    },
    {
        id: 'appalachians', name: 'Appalachian Mountains', kind: 'mountains',
        shapes: [{ line: [[47.0, -68.0], [44.0, -71.5], [42.0, -74.0], [40.5, -77.0], [38.0, -80.0], [36.0, -82.5], [34.0, -85.0]] }],
        summary: 'An ancient, worn-down range running 2,400 km from Newfoundland to Alabama.',
        importance: 'For a century the Appalachians held English settlers to the coast; the British even banned settlement beyond them in 1763. Its isolated valleys developed a distinct culture of music, speech and independence.',
        peoples: {
            'upland-southerners': 'Appalachia is the heart of the Upland South, settled largely by Scots-Irish families; bluegrass and country music came from its hollows.',
            'english-americans': 'The Tidewater English colonies grew on the coastal plain east of the range.',
            'oklahoma-nations': 'The southern Appalachians were the Cherokee homeland until Removal in the 1830s.',
        },
    },
    {
        id: 'rio-grande', name: 'Rio Grande', kind: 'river',
        shapes: [{ line: [[37.8, -107.5], [35.1, -106.6], [32.3, -106.8], [31.7, -106.4], [29.5, -104.4], [29.8, -101.4], [27.5, -99.5], [25.9, -97.2]] }],
        summary: 'A 3,000 km river from Colorado to the Gulf of Mexico, forming the border between Texas and Mexico.',
        importance: 'Since 1848 the river has marked the US–Mexico border, but for centuries before that it was the spine of Spanish New Mexico and of the Pueblo world.',
        peoples: {
            'mexican-americans': 'Border towns from El Paso to Brownsville are bilingual and bicultural; families live on both banks.',
            'mexicans': 'Mexicans call it the Río Bravo; it became the border after Mexico lost the war of 1846–48.',
            'hispanic-americans': 'New Mexico\'s Hispano villages, founded from 1598, line the upper river valley.',
            'southwest-nations': 'The Rio Grande Pueblos, such as Taos and Santa Clara, have farmed its valley for centuries.',
        },
    },
    {
        id: 'darien-gap', name: 'Darién Gap', kind: 'forest',
        shapes: [{ area: [8.2, -77.4], km: 80 }],
        summary: 'A roadless stretch of rainforest and swamp between Panama and Colombia.',
        importance: 'The only break in the Pan-American Highway from Alaska to Argentina; it has long separated Central and South America, and in the early 2020s was crossed on foot by hundreds of thousands of migrants a year.',
        peoples: {
            'central-americans': 'Panama\'s isthmus faces Central America and the canal rather than South America because of the gap.',
            'colombians-venezuelans': 'Panama was part of Colombia until 1903; the Darién is one reason the two drifted apart.',
        },
    },
    {
        id: 'andes', name: 'Andes', kind: 'mountains',
        shapes: [{ line: [[10.5, -71.5], [4.5, -75.5], [0.0, -78.2], [-5.0, -79.0], [-10.0, -77.0], [-15.0, -71.5], [-20.0, -68.0], [-25.0, -68.2], [-33.0, -70.0], [-40.0, -71.5], [-47.0, -73.0], [-53.0, -72.0]] }],
        summary: 'The world\'s longest continental range, 7,000 km down western South America.',
        importance: 'High Andean valleys supported the Inca Empire, linked by 40,000 km of roads, and its peoples domesticated the potato, llama and alpaca. Altitude still divides the continent: Indigenous highlands from mestizo coasts and lowlands.',
        peoples: {
            'quechua': 'Quechua speakers farm terraced valleys at 2,500–4,000 m, heirs to the Inca capital at Cusco.',
            'aymara': 'The Aymara live on the high plateau (Altiplano) around Lake Titicaca.',
            'andean-mestizos': 'In Peru and Ecuador the coast–highland divide is also a mestizo–Indigenous divide in politics and wealth.',
            'chileans': 'The Andes are Chile\'s eastern wall, making the country a 4,300 km ribbon between mountains and sea.',
            'colombians-venezuelans': 'Bogotá, Medellín and Caracas sit in Andean valleys, giving both countries highland heartlands.',
        },
    },
    {
        id: 'altiplano', name: 'Altiplano and Lake Titicaca', kind: 'plateau',
        shapes: [{ area: [-16.5, -68.8], km: 220 }],
        summary: 'A high plateau averaging 3,750 m, shared by Bolivia and Peru, with Lake Titicaca at its north.',
        importance: 'The Tiwanaku civilization flourished here before the Inca, and the plateau remains the heart of Aymara culture; La Paz is the world\'s highest capital.',
        peoples: {
            'aymara': 'Most Aymara live on the Altiplano, herding llamas and farming potatoes and quinoa at altitude.',
            'quechua': 'In Inca myth, the founders of the empire emerged from Lake Titicaca.',
        },
    },
    {
        id: 'amazon', name: 'Amazon River and rainforest', kind: 'forest',
        at: [-3.3, -62.0],
        shapes: [{ line: [[-4.5, -73.5], [-3.7, -70.0], [-3.3, -64.7], [-3.1, -60.0], [-2.5, -55.5], [-1.5, -52.0], [-0.1, -50.0]] }, { area: [-4.0, -62.0], km: 1100 }],
        summary: 'The world\'s largest river by volume and largest rainforest, covering much of northern South America.',
        importance: 'The Amazon holds hundreds of Indigenous peoples speaking some 300 languages, including some of the last uncontacted groups. Its rivers were the only routes in, and loggers, miners and ranchers now follow new roads.',
        peoples: {
            'amazonian': 'Forest peoples\' knowledge of rivers, plants and soils, including human-made fertile soils (terra preta), shows the forest was long managed by people.',
            'brazilians': 'Most of the Amazon is in Brazil; its settlement and protection are among Brazil\'s most heated political questions.',
        },
    },
    {
        id: 'oaxaca-mountains', name: 'Sierra Madre del Sur (Oaxaca)', kind: 'mountains',
        shapes: [{ area: [17.0, -96.5], km: 160 }],
        summary: 'The rugged mountains of southern Mexico around the valley of Oaxaca.',
        importance: 'Broken terrain divided Oaxaca into isolated communities, which is why it has more Indigenous languages than any other Mexican state, and helped them keep self-government.',
        peoples: {
            'zapotec-mixtec': 'Zapotecs built Monte Albán above the valley; Zapotec and Mixtec split into dozens of mutually unintelligible varieties across the mountains.',
        },
    },
    {
        id: 'new-guinea-highlands', name: 'New Guinea Highlands', kind: 'mountains',
        shapes: [{ line: [[-4.0, 138.0], [-5.0, 141.0], [-5.8, 144.0], [-6.5, 146.5]] }],
        summary: 'A chain of high valleys and mountains along the spine of New Guinea, reaching 4,800 m.',
        importance: 'Steep valleys cut people off from each other, giving New Guinea some 1,000 languages, the most of any place on Earth. The highlands were also one of the world\'s independent birthplaces of farming, about 10,000 years ago.',
        peoples: {
            'papuans': 'Highland Papuans, unknown to outsiders until the 1930s, farm sweet potatoes and pigs in valleys that may each speak a different language.',
        },
    },
    {
        id: 'polynesian-triangle', name: 'Polynesian Triangle', kind: 'water',
        at: [-15.0, -150.0],
        shapes: [{ line: [[21.3, -157.8], [-36.8, 174.8], [-27.1, -109.4], [21.3, -157.8]], straight: true }],
        summary: 'The vast ocean region between Hawaiʻi, New Zealand (Aotearoa) and Rapa Nui (Easter Island).',
        importance: 'Polynesians settled this whole triangle, the largest area ever settled by one culture before modern times, by voyaging canoe and star navigation, most of it between about 1000 and 1300 CE.',
        peoples: {
            'polynesians': 'The ocean is not a barrier but a road: Māori, Hawaiians, Samoans and Tahitians share related languages and gods across thousands of kilometres.',
            'micronesians': 'Micronesian navigators of the Carolines kept the wayfinding knowledge that helped Hawaiians revive voyaging in the 1970s.',
        },
    },
]
