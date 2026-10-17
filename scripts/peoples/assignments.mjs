// Maps every Natural Earth admin-1 unit (state / province / region) to the leaf
// people group that forms its majority (or clear plurality). Countries map to a
// default leaf; OVERRIDES pick out subdivisions where another group dominates.
// Units whose country is not listed (Antarctica, uninhabited islands) are dropped.

export const COUNTRY_DEFAULT = {
    // Europe
    RUS: 'russians', UKR: 'ukrainians', BLR: 'belarusians',
    POL: 'poles', CZE: 'czechs', SVK: 'slovaks',
    SRB: 'serbs', HRV: 'croats', BIH: 'bosniaks', MNE: 'montenegrins', SVN: 'slovenes',
    BGR: 'bulgarians', MKD: 'macedonians',
    DEU: 'germans', AUT: 'germans', CHE: 'germans', LIE: 'germans', LUX: 'germans',
    NLD: 'dutch', BEL: 'dutch',
    GBR: 'english', IMN: 'english', JEY: 'english', GGY: 'english', GIB: 'english', FLK: 'english', SHN: 'english',
    IRL: 'irish',
    SWE: 'swedes', ALD: 'swedes', NOR: 'norwegians', DNK: 'danes', ISL: 'icelanders', FRO: 'faroese',
    FIN: 'finns', EST: 'estonians', HUN: 'hungarians',
    LTU: 'lithuanians', LVA: 'latvians',
    ESP: 'castilians', PRT: 'portuguese', AND: 'catalans',
    FRA: 'french', MCO: 'french', SPM: 'french',
    ITA: 'italians', SMR: 'italians', VAT: 'italians',
    ROU: 'romanians', MDA: 'romanians',
    GRC: 'greeks', CYP: 'greeks', ESB: 'greeks', WSB: 'greeks', CYN: 'turks',
    ALB: 'albanians', KOS: 'albanians',
    MLT: 'maltese',

    // Caucasus, Middle East, Iranian plateau
    GEO: 'georgians', ARM: 'armenians', AZE: 'azerbaijanis',
    TUR: 'turks', IRN: 'persians', IRQ: 'mesopotamian-arabs',
    SYR: 'levantine-arabs', LBN: 'levantine-arabs', JOR: 'levantine-arabs', PSX: 'levantine-arabs',
    ISR: 'jews',
    SAU: 'gulf-arabs', YEM: 'gulf-arabs', OMN: 'gulf-arabs', ARE: 'gulf-arabs', QAT: 'gulf-arabs',
    BHR: 'gulf-arabs', KWT: 'gulf-arabs',
    AFG: 'pashtuns', PAK: 'punjabis',

    // Central Asia
    KAZ: 'kazakhs', KAB: 'kazakhs', KGZ: 'kyrgyz', UZB: 'uzbeks', TKM: 'turkmen', TJK: 'tajiks',
    MNG: 'mongols',

    // South Asia
    IND: 'hindustanis', BGD: 'bengalis', NPL: 'nepalis', BTN: 'tibetans', LKA: 'sinhalese', MDV: 'sinhalese',

    // East Asia
    CHN: 'han-mandarin', TWN: 'han-min', HKG: 'han-yue', MAC: 'han-yue',
    JPN: 'japanese', KOR: 'koreans', PRK: 'koreans',

    // Southeast Asia
    VNM: 'vietnamese', KHM: 'khmer', LAO: 'lao', THA: 'thai', MMR: 'burmans',
    IDN: 'javanese', MYS: 'malays', BRN: 'malays', SGP: 'han-min', TLS: 'eastern-indonesians',
    PHL: 'tagalog',

    // North Africa and Horn
    EGY: 'egyptians',
    LBY: 'maghrebis', TUN: 'maghrebis', DZA: 'maghrebis', MAR: 'maghrebis', MRT: 'maghrebis', SAH: 'maghrebis',
    SDN: 'sudanic-arabs', SDS: 'nilotes-sudan',
    ETH: 'amhara', ERI: 'tigrinya', DJI: 'somalis', SOM: 'somalis', SOL: 'somalis',

    // West Africa
    NGA: 'hausa', NER: 'hausa', MLI: 'mande', BFA: 'gur', SEN: 'senegambians', GMB: 'mande',
    GNB: 'senegambians', GIN: 'mande', SLE: 'mande', LBR: 'mande', CIV: 'akan', GHA: 'akan',
    TGO: 'gbe', BEN: 'gbe', TCD: 'sudanic-arabs', CPV: 'romance-creoles',

    // Central Africa
    CMR: 'equatorial-bantu', CAF: 'ubangian', GAB: 'equatorial-bantu', GNQ: 'equatorial-bantu',
    COG: 'equatorial-bantu', COD: 'equatorial-bantu', AGO: 'southwest-bantu', STP: 'romance-creoles',

    // East Africa
    KEN: 'east-african-bantu', TZA: 'east-african-bantu', UGA: 'great-lakes', RWA: 'great-lakes',
    BDI: 'great-lakes', COM: 'east-african-bantu', SYC: 'romance-creoles', MUS: 'hindustanis',
    MDG: 'malagasy',

    // Southern Africa
    ZAF: 'nguni', SWZ: 'nguni', LSO: 'sotho-tswana', BWA: 'sotho-tswana', NAM: 'southwest-bantu',
    ZWE: 'shona', ZMB: 'savanna-bantu', MWI: 'savanna-bantu', MOZ: 'savanna-bantu',

    // North America
    CAN: 'anglo-canadians', GRL: 'inuit', BMU: 'anglo-caribbeans',
    MEX: 'mexicans',

    // Central America and Caribbean
    GTM: 'central-americans', BLZ: 'central-americans', HND: 'central-americans', SLV: 'central-americans',
    NIC: 'central-americans', CRI: 'central-americans', PAN: 'central-americans',
    CUB: 'caribbean-hispanics', DOM: 'caribbean-hispanics', PRI: 'caribbean-hispanics', USG: 'caribbean-hispanics',
    HTI: 'romance-creoles', BLM: 'romance-creoles', MAF: 'romance-creoles',
    JAM: 'anglo-caribbeans', TTO: 'anglo-caribbeans', BHS: 'anglo-caribbeans', BRB: 'anglo-caribbeans',
    ATG: 'anglo-caribbeans', DMA: 'anglo-caribbeans', GRD: 'anglo-caribbeans', KNA: 'anglo-caribbeans',
    LCA: 'anglo-caribbeans', VCT: 'anglo-caribbeans', AIA: 'anglo-caribbeans', CYM: 'anglo-caribbeans',
    TCA: 'anglo-caribbeans', VGB: 'anglo-caribbeans', VIR: 'anglo-caribbeans', MSR: 'anglo-caribbeans',
    ABW: 'anglo-caribbeans', CUW: 'anglo-caribbeans', SXM: 'anglo-caribbeans',
    GUY: 'anglo-caribbeans', SUR: 'anglo-caribbeans',

    // South America
    COL: 'colombians-venezuelans', VEN: 'colombians-venezuelans', ECU: 'andean-mestizos',
    PER: 'andean-mestizos', BOL: 'andean-mestizos', CHL: 'chileans', ARG: 'rioplatenses',
    URY: 'rioplatenses', PRY: 'paraguayans', BRA: 'brazilians',

    // Oceania
    AUS: 'australians-nzers', NZL: 'australians-nzers', NFK: 'australians-nzers',
    PNG: 'papuans', FJI: 'melanesians', SLB: 'melanesians', VUT: 'melanesians', NCL: 'melanesians',
    WSM: 'polynesians', TON: 'polynesians', PYF: 'polynesians', COK: 'polynesians', NIU: 'polynesians',
    TUV: 'polynesians', ASM: 'polynesians', WLF: 'polynesians', PCN: 'polynesians',
    FSM: 'micronesians', KIR: 'micronesians', MHL: 'micronesians', PLW: 'micronesians', GUM: 'micronesians',
    MNP: 'micronesians', NRU: 'micronesians',
}

/** Per-country overrides, keyed by the admin-1 unit's `name` field. */
export const OVERRIDES = {
    RUS: {
        'Tatarstan': 'volga-turks', 'Bashkortostan': 'volga-turks', 'Chuvash': 'volga-turks',
        'Chechnya': 'chechens-ingush', 'Ingush': 'chechens-ingush', 'Dagestan': 'dagestanis',
        'Kabardin-Balkar': 'circassians-abkhaz', 'Karachay-Cherkess': 'circassians-abkhaz',
        'North Ossetia': 'ossetians', 'Kalmyk': 'mongols',
        'Sakha (Yakutia)': 'siberian-turks', 'Tuva': 'siberian-turks',
    },
    EST: { 'Ida-Viru': 'russians' },
    KAZ: { 'North Kazakhstan': 'russians' },
    ROU: { 'Harghita': 'hungarians', 'Covasna': 'hungarians' },
    BGR: { 'Kardzhali': 'turks' },
    BIH: {
        'West Herzegovina': 'croats', 'Herzegovina-Neretva': 'croats', 'Posavina': 'croats', 'West Bosnia': 'croats',
        'Trebinje': 'serbs', 'Foča': 'serbs', 'Banja Luka': 'serbs', 'Doboj': 'serbs', 'Bijeljina': 'serbs',
        'Vlasenica': 'serbs', 'Sarajevo-romanija': 'serbs',
    },
    KOS: { 'Leposavić': 'serbs', 'Zvečan': 'serbs', 'Zubin Potok': 'serbs', 'Štrpce': 'serbs' },
    MKD: Object.fromEntries([
        'Struga', 'Debar', 'Gostivar', 'Vrapcište', 'Tetovo', 'Bogovinje', 'Tearce', 'Želino', 'Lipkovo',
        'Aračinovo', 'Saraj', 'Čair', 'Studeničani', 'Zajas', 'Oslomej', 'Jegunovce',
    ].map(n => [n, 'albanians'])),
    BEL: {
        'Hainaut': 'french', 'Namur': 'french', 'Luxembourg': 'french', 'Liege': 'french',
        'Walloon Brabant': 'french', 'Brussels': 'french',
    },
    CHE: {
        'Genève': 'french', 'Vaud': 'french', 'Neuchâtel': 'french', 'Jura': 'french',
        'Fribourg': 'french', 'Valais': 'french', 'Ticino': 'italians',
    },
    GBR: {}, // handled by geonunit below
    ESP: {}, // handled by region below
    FRA: {
        'Finistère': 'bretons', "Côtes-d'Armor": 'bretons', 'Morbihan': 'bretons', 'Ille-et-Vilaine': 'bretons',
        'Guyane française': 'romance-creoles', 'Martinique': 'romance-creoles', 'Guadeloupe': 'romance-creoles',
        'La Réunion': 'romance-creoles', 'Mayotte': 'east-african-bantu',
    },
    ITA: { 'Bozen': 'germans' },
    GEO: { 'Abkhazia': 'circassians-abkhaz' },
    TUR: Object.fromEntries([
        'Hakkari', 'Sirnak', 'Mardin', 'Batman', 'Siirt', 'Diyarbakir', 'Bitlis', 'Mus', 'Van', 'Agri',
        'Bingöl', 'Tunceli', 'Sanliurfa', 'Adiyaman',
    ].map(n => [n, 'kurds'])),
    IRQ: { 'Dihok': 'kurds', 'Arbil': 'kurds', 'As-Sulaymaniyah': 'kurds' },
    SYR: { 'Hasaka (Al Haksa)': 'kurds' },
    ISR: { 'HaZafon': 'levantine-arabs' },
    IRN: {
        'Kordestan': 'kurds', 'Kermanshah': 'kurds', 'Ilam': 'kurds',
        'West Azarbaijan': 'azerbaijanis', 'East Azarbaijan': 'azerbaijanis', 'Ardebil': 'azerbaijanis', 'Zanjan': 'azerbaijanis',
        'Sistan and Baluchestan': 'baloch',
        'Lorestan': 'lurs', 'Kohgiluyeh and Buyer Ahmad': 'lurs', 'Chahar Mahall and Bakhtiari': 'lurs',
    },
    AFG: {
        'Badakhshan': 'tajiks', 'Takhar': 'tajiks', 'Baghlan': 'tajiks', 'Kabul': 'tajiks', 'Parwan': 'tajiks',
        'Kapisa': 'tajiks', 'Hirat': 'tajiks', 'Ghor': 'tajiks', 'Balkh': 'tajiks', 'Samangan': 'tajiks', 'Badghis': 'tajiks',
        'Jawzjan': 'uzbeks', 'Faryab': 'uzbeks', 'Sari Pul': 'uzbeks',
        'Bamyan': 'hazaras',
        'Nuristan': 'dardic',
    },
    PAK: {
        'Sind': 'sindhis', 'K.P.': 'pashtuns', 'F.A.T.A.': 'pashtuns', 'Baluchistan': 'baloch', 'Northern Areas': 'dardic',
    },
    IND: {
        'West Bengal': 'bengalis', 'Tripura': 'bengalis', 'Andaman and Nicobar': 'bengalis',
        'Punjab': 'punjabis', 'Chandigarh': 'punjabis',
        'Gujarat': 'gujaratis', 'Dadra and Nagar Haveli and Daman and Diu': 'gujaratis',
        'Maharashtra': 'marathis', 'Goa': 'marathis',
        'Odisha': 'odias', 'Assam': 'assamese', 'Sikkim': 'nepalis',
        'Jammu and Kashmir': 'dardic', 'Ladakh': 'tibetans',
        'Arunachal Pradesh': 'kuki-chin-naga', 'Nagaland': 'kuki-chin-naga', 'Manipur': 'kuki-chin-naga', 'Mizoram': 'kuki-chin-naga',
        'Meghalaya': 'khasi',
        'Tamil Nadu': 'tamils', 'Puducherry': 'tamils',
        'Kerala': 'malayalis', 'Lakshadweep': 'malayalis',
        'Karnataka': 'kannadigas',
        'Andhra Pradesh': 'telugus', 'Telangana': 'telugus',
    },
    LKA: {
        'Yāpanaya': 'tamils', 'Kilinŏchchi': 'tamils', 'Mannārama': 'tamils', 'Mulativ': 'tamils',
        'Vavuniyāva': 'tamils', 'Maḍakalapuva': 'tamils', 'Nuvara Ĕliya': 'tamils',
    },
    CHN: {
        'Xinjiang': 'uyghurs', 'Xizang': 'tibetans',
        'Shanghai': 'han-wu', 'Zhejiang': 'han-wu',
        'Guangdong': 'han-yue', 'Guangxi': 'han-yue',
        'Fujian': 'han-min', 'Hainan': 'han-min',
        'Hunan': 'han-xiang-gan', 'Jiangxi': 'han-xiang-gan',
        'Paracel Islands': null,
    },
    JPN: { 'Okinawa': 'ryukyuans' },
    MMR: {
        'Shan': 'shan', 'Kachin': 'kachin', 'Chin': 'kuki-chin-naga', 'Kayin': 'karen', 'Kayah': 'karen', 'Mon': 'mon',
    },
    THA: {
        ...Object.fromEntries([
            'Loei', 'Bueng Kan', 'Nong Khai', 'Udon Thani', 'Nong Bua Lam Phu', 'Sakon Nakhon', 'Nakhon Phanom',
            'Mukdahan', 'Kalasin', 'Khon Kaen', 'Maha Sarakham', 'Roi Et', 'Yasothon', 'Amnat Charoen',
            'Ubon Ratchathani', 'Si Sa Ket', 'Buri Ram', 'Chaiyaphum',
        ].map(n => [n, 'lao'])),
        'Surin': 'khmer',
        'Pattani': 'malays', 'Yala': 'malays', 'Narathiwat': 'malays',
    },
    IDN: {
        'Jawa Barat': 'sundanese', 'Banten': 'sundanese',
        'Riau': 'malays', 'Kepulauan Riau': 'malays', 'Jambi': 'malays', 'Sumatera Selatan': 'malays',
        'Bengkulu': 'malays', 'Bangka-Belitung': 'malays', 'Kalimantan Selatan': 'malays',
        'Sumatera Barat': 'sumatrans', 'Sumatera Utara': 'sumatrans', 'Aceh': 'sumatrans',
        'Bali': 'balinese',
        'Kalimantan Barat': 'bornean', 'Kalimantan Tengah': 'bornean', 'Kalimantan Timur': 'bornean',
        'Sulawesi Selatan': 'sulawesi', 'Sulawesi Barat': 'sulawesi', 'Sulawesi Tenggara': 'sulawesi',
        'Sulawesi Tengah': 'sulawesi', 'Sulawesi Utara': 'sulawesi', 'Gorontalo': 'sulawesi',
        'Nusa Tenggara Barat': 'eastern-indonesians', 'Nusa Tenggara Timur': 'eastern-indonesians',
        'Maluku': 'eastern-indonesians', 'Maluku Utara': 'eastern-indonesians',
        'Papua': 'papuans', 'Papua Barat': 'papuans',
    },
    MYS: { 'Sabah': 'bornean', 'Sarawak': 'bornean', 'Labuan': 'bornean' },
    PHL: {}, // handled by region below
    ETH: {
        'Oromiya': 'oromo', 'Tigray': 'tigrinya', 'Afar': 'afar', 'Somali': 'somalis',
        'Southern Nations, Nationalities and Peoples': 'southern-ethiopians',
        'Gambela Peoples': 'nilotes-sudan', 'Benshangul-Gumaz': 'nilotes-sudan',
        'Harari People': 'oromo', 'Dire Dawa': 'oromo',
    },
    KEN: { 'Nyanza': 'nilotes-east', 'Rift Valley': 'nilotes-east', 'North-Eastern': 'somalis' },
    UGA: {}, // handled by region below
    SDN: {
        'Central Darfur': 'darfur', 'Southern Darfur': 'darfur', 'North Darfur': 'darfur',
        'Western Darfur': 'darfur', 'Eastern Darfur': 'darfur',
        'Northern': 'nubians', 'Red Sea': 'beja', 'Kassala': 'beja',
    },
    SDS: { 'Western Equatoria': 'ubangian' },
    TCD: {
        'Lac': 'kanuri-teda', 'Kanem': 'kanuri-teda', 'Borkou': 'kanuri-teda', 'Tibesti': 'kanuri-teda',
        'Ennedi': 'kanuri-teda', 'Barh El Gazel': 'kanuri-teda',
        'Ouaddaï': 'darfur', 'Wadi Fira': 'darfur', 'Sila': 'darfur',
        'Logone Occidental': 'sara', 'Logone Oriental': 'sara', 'Moyen-Chari': 'sara', 'Mandoul': 'sara',
        'Tandjilé': 'sara', 'Mayo-Kebbi Est': 'sara', 'Mayo-Kebbi Ouest': 'sara',
    },
    NGA: {
        'Borno': 'kanuri-teda', 'Yobe': 'kanuri-teda',
        'Lagos': 'yoruba', 'Ogun': 'yoruba', 'Oyo': 'yoruba', 'Osun': 'yoruba', 'Ondo': 'yoruba',
        'Ekiti': 'yoruba', 'Kwara': 'yoruba',
        'Anambra': 'igbo', 'Enugu': 'igbo', 'Imo': 'igbo', 'Abia': 'igbo', 'Ebonyi': 'igbo',
        'Delta': 'delta-cross', 'Edo': 'delta-cross', 'Rivers': 'delta-cross', 'Bayelsa': 'delta-cross',
        'Cross River': 'delta-cross', 'Akwa Ibom': 'delta-cross',
        'Plateau': 'middle-belt', 'Benue': 'middle-belt', 'Nassarawa': 'middle-belt', 'Kogi': 'middle-belt',
        'Niger': 'middle-belt', 'Taraba': 'middle-belt', 'Adamawa': 'middle-belt',
        'Federal Capital Territory': 'middle-belt',
    },
    NER: {
        'Agadez': 'tuareg', 'Diffa': 'kanuri-teda',
        'Tillabéri': 'songhai-zarma', 'Dosso': 'songhai-zarma', 'Niamey': 'songhai-zarma',
    },
    MLI: { 'Kidal': 'tuareg', 'Gao': 'songhai-zarma', 'Timbuktu': 'songhai-zarma', 'Mopti': 'fulani' },
    BFA: {}, // handled by region below
    SEN: { 'Matam': 'fulani', 'Kolda': 'fulani' },
    GIN: {}, // handled by region below
    SLE: { 'Northern': 'senegambians', 'Western': 'senegambians' },
    CIV: {
        'Savanes': 'gur', 'Zanzan': 'gur',
        'Denguélé': 'mande', 'Worodougou': 'mande', 'Bafing': 'mande', 'Dix-Huit Montagnes': 'mande',
        'Cavally': 'kru', 'Bas-Sassandra': 'kru', 'Haut-Sassandra': 'kru', 'Fromager': 'kru',
    },
    GHA: { 'Northern': 'gur', 'Upper East': 'gur', 'Upper West': 'gur', 'Volta': 'gbe' },
    TGO: { 'Centre': 'gur', 'Kara': 'gur', 'Savanes': 'gur' },
    BEN: { 'Alibori': 'gur', 'Borgou': 'gur', 'Atakora': 'gur', 'Donga': 'gur', 'Plateau': 'yoruba' },
    CMR: {
        'Extrême-Nord': 'fulani', 'Nord': 'fulani', 'Adamaoua': 'fulani',
        'Nord-Ouest': 'grassfields', 'Sud-Ouest': 'grassfields', 'Ouest': 'grassfields',
    },
    COD: {
        'Kinshasa City': 'kongo', 'Bas-Congo': 'kongo',
        'Nord-Kivu': 'great-lakes', 'Sud-Kivu': 'great-lakes', 'Maniema': 'great-lakes',
        'Katanga': 'savanna-bantu', 'Kasaï-Occidental': 'savanna-bantu', 'Kasaï-Oriental': 'savanna-bantu',
    },
    COG: {
        'Pool': 'kongo', 'Brazzaville': 'kongo', 'Bouenza': 'kongo', 'Niari': 'kongo', 'Kouilou': 'kongo',
        'Lékoumou': 'kongo', 'Pointe Noire': 'kongo',
    },
    AGO: {
        'Cabinda': 'kongo', 'Zaire': 'kongo', 'Uíge': 'kongo',
        'Lunda Norte': 'savanna-bantu', 'Lunda Sul': 'savanna-bantu', 'Moxico': 'savanna-bantu',
    },
    NAM: { 'Karas': 'khoe-san', 'Hardap': 'khoe-san', 'Caprivi': 'savanna-bantu' },
    ZAF: {
        'Western Cape': 'afrikaners', 'Northern Cape': 'afrikaners',
        'Free State': 'sotho-tswana', 'North West': 'sotho-tswana', 'Limpopo': 'sotho-tswana',
    },
    ZWE: { 'Matabeleland North': 'nguni', 'Matabeleland South': 'nguni', 'Bulawayo': 'nguni' },
    MOZ: { 'Maputo': 'tsonga', 'Gaza': 'tsonga', 'Inhambane': 'tsonga' },
    DZA: {
        'Tizi Ouzou': 'amazigh', 'Béjaïa': 'amazigh', 'Bouira': 'amazigh',
        'Batna': 'amazigh', 'Khenchela': 'amazigh', 'Oum el Bouaghi': 'amazigh',
        'Tamanghasset': 'tuareg', 'Illizi': 'tuareg',
    },
    MAR: { 'Souss - Massa - Draâ': 'amazigh' },
    CAN: { 'Québec': 'quebecois', 'Nunavut': 'inuit', 'Northwest Territories': 'dene' },
    MEX: { 'Yucatán': 'maya', 'Oaxaca': 'zapotec-mixtec' },
    GTM: Object.fromEntries([
        'Totonicapán', 'Sololá', 'Quiché', 'Alta Verapaz', 'Chimaltenango', 'Huehuetenango', 'Baja Verapaz',
        'Quezaltenango',
    ].map(n => [n, 'maya'])),
    PER: Object.fromEntries(['Cusco', 'Puno', 'Ayacucho', 'Apurímac', 'Huancavelica'].map(n => [n, 'quechua'])),
    BOL: {
        'Potosí': 'quechua', 'Chuquisaca': 'quechua', 'Cochabamba': 'quechua',
        'La Paz': 'aymara', 'Oruro': 'aymara',
    },
    ECU: { 'Napo': 'quechua', 'Morona Santiago': 'amazonian' },
    COL: { 'Vaupés': 'amazonian', 'Guainía': 'amazonian' },
    VEN: { 'Amazonas': 'amazonian' },
    AUS: { 'Northern Territory': 'aboriginal-australians', 'Macquarie Island': null },
    NZL: {
        'Tokelau': 'polynesians', 'Auckland Islands': null, 'Campbell Islands': null, 'Antipodes Islands': null,
        'The Snares': null, 'Three Kings Islands': null, 'Kermadec Islands': null,
    },
    PNG: {
        'North Solomons': 'melanesians', 'West New Britain': 'melanesians', 'East New Britain': 'melanesians',
        'New Ireland': 'melanesians', 'Manus': 'melanesians', 'Milne Bay': 'melanesians',
    },
}

/** Rules that use other admin-1 fields. Return a leaf id, null to drop, or undefined to fall through. */
export function fieldRule(p) {
    if (p.adm0_a3 === 'GBR') {
        return { England: 'english', Scotland: 'scots', Wales: 'welsh', 'Northern Ireland': 'irish' }[p.geonunit]
    }
    if (p.adm0_a3 === 'ESP') {
        if (['Cataluña', 'Valenciana', 'Islas Baleares'].includes(p.region)) return 'catalans'
        if (p.region === 'Galicia') return 'galicians'
        if (p.region === 'País Vasco') return 'basques'
        return undefined
    }
    if (p.adm0_a3 === 'PHL') {
        const r = p.region || ''
        if (r.startsWith('Ilocos') || r.startsWith('Cagayan Valley') || r.startsWith('Cordillera')) return 'ilocano'
        if (r.startsWith('Bicol')) return 'bikolanos'
        if (r.startsWith('Autonomous Region in Muslim Mindanao')) return 'moros'
        if (/Visayas|Mindanao|Davao|Zamboanga|SOCCSKSARGEN|Dinagat/.test(r)) return 'visayans'
        return 'tagalog'
    }
    if (p.adm0_a3 === 'UGA') return p.region === 'Northern' ? 'nilotes-east' : 'great-lakes'
    if (p.adm0_a3 === 'BFA') return p.region === 'Sahel' ? 'fulani' : 'gur'
    if (p.adm0_a3 === 'GIN') return ['Labé', 'Mamou'].includes(p.region) ? 'fulani' : 'mande'
    return undefined
}
