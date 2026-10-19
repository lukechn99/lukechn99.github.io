import type { RelationsMap } from './types.ts'

export const asiaRelations: RelationsMap = {
    'han': [
        { label: "Sino-Tibetan family", text: "Chinese, Tibetan and Burmese descend from a common Sino-Tibetan ancestor, probably spoken in northern China over 6,000 years ago; they are no longer mutually intelligible. Basic words still line up: 'five' is wǔ in Mandarin (Old Chinese *ŋaʔ) and lnga in written Tibetan, 'fish' is yú (Old Chinese *ŋa) and nya, and Burmese uses ngá for both." },
        { with: 'tibetans', text: 'China took control of Tibet in 1950; Han migration, restrictions on religion and boarding schools fuel resentment.' },
        { with: 'uyghurs', text: 'Han settlement and mass internment since 2017 define the relationship in Xinjiang.' },
        { with: 'mongols', text: 'The Great Wall was built against northern nomads, and Mongols ruled all of China as the Yuan dynasty (1271–1368). Han now outnumber Mongols about 4 to 1 in Inner Mongolia; cuts to Mongolian-language schooling sparked protests in 2020.' },
        { with: 'turkic', text: 'Chinese dynasties fought and traded with Turkic steppe empires for 1,500 years, from the Göktürk khaganates to the Tang dynasty\'s alliance with the Uyghur Khaganate, and shared the trade along the Silk Road.' },
        { with: 'koreans', text: 'Korea and Vietnam absorbed Chinese script and Confucian statecraft while resisting Chinese rule; China saved North Korea in the Korean War (1950–53).' },
        { with: 'japanese', text: 'Japan\'s invasion (1937–45), including the Nanjing Massacre, still shapes Chinese views of Japan.' },
        { label: 'Overseas Chinese and Southeast Asians', text: 'Chinese commercial minorities have faced periodic violence, notably in Indonesia in 1965 and 1998.' },
    ],
    'han-mandarin': [
        { with: 'han-yue', text: 'Putonghua (Mandarin) is pushed in schools and media at the expense of Cantonese and other regional languages.' },
        { with: 'uyghurs', text: 'Han migration to Xinjiang, encouraged by the state, changed its demographics from about 6% Han in 1949 to about 42% today.' },
    ],
    'han-wu': [
        { with: 'han-mandarin', text: 'Shanghai\'s distinct culture and wealth sit alongside heavy migration from other provinces; few young Shanghainese now speak Wu fluently.' },
    ],
    'han-yue': [
        { with: 'han-mandarin', text: 'Hong Kong\'s Cantonese identity, and its 2019 protests, contrast with Beijing\'s push for national integration.' },
        { label: 'Zhuang', text: 'Guangxi\'s Zhuang minority is largely assimilated with Cantonese and Mandarin speakers.' },
        { with: 'english', text: 'Britain ruled Hong Kong from 1842 to 1997, shaping a distinct identity.' },
    ],
    'han-min': [
        { with: 'han-mandarin', text: 'Many Taiwanese identify as Taiwanese rather than Chinese; Beijing claims Taiwan and threatens force.' },
        { label: 'Taiwanese Indigenous peoples', text: 'Hokkien and Hakka settlers took Taiwan\'s plains from Austronesian peoples over the 17th–19th centuries.' },
        { with: 'malays', text: 'Hokkien and Teochew merchants are central to commerce in Malaysia and Singapore.' },
    ],
    'han-xiang-gan': [
        { with: 'han-mandarin', text: 'Fully part of mainstream Han China; Hunan produced many Communist leaders, including Mao.' },
    ],
    'tibetans': [
        { label: "Sino-Tibetan family", text: "Chinese, Tibetan and Burmese descend from a common Sino-Tibetan ancestor, probably spoken in northern China over 6,000 years ago; they are no longer mutually intelligible. Written Tibetan lnga (five), nya (fish) and gsum (three) match Burmese ngá (five, and also fish) and thóun, and Old Chinese *ŋaʔ, *ŋa and *sum." },
        { with: 'han', text: 'The 1959 uprising, the Cultural Revolution\'s destruction of monasteries, and today\'s tight control; the Dalai Lama\'s succession is a looming flashpoint.' },
        { with: 'mongols', text: 'Mongols adopted Tibetan Buddhism; the title "Dalai Lama" is Mongolian ("ocean").' },
        { with: 'nepalis', text: 'Trade across the Himalaya for centuries; Nepal hosts about 20,000 Tibetan refugees.' },
    ],
    'burmans': [
        { label: "Sino-Tibetan family", text: "Chinese, Tibetan and Burmese descend from a common Sino-Tibetan ancestor, probably spoken in northern China over 6,000 years ago; they are no longer mutually intelligible. Burmese is closest to the other Tibeto-Burman languages; ngá (both five and fish) and thóun (three) match Tibetan lnga, nya and gsum." },
        { with: 'karen', text: 'The army has fought Karen forces since 1949, burning villages and creating refugee camps in Thailand.' },
        { with: 'shan', text: 'Shan princes, who joined Burma at the 1947 Panglong conference, lost autonomy after the 1962 coup; several Shan armies still fight or bargain with the junta.' },
        { label: 'Rohingya', text: 'Burman nationalists deny the Muslim Rohingya are a native people; the army\'s 2017 clearance operations drove about 700,000 into Bangladesh.' },
        { with: 'thai', text: 'Burma destroyed the Thai capital Ayutthaya in 1767, a lasting memory in Thailand.' },
    ],
    'tibeto-burman-hills': [
        { label: "Sino-Tibetan family", text: "Chinese, Tibetan and Burmese descend from a common Sino-Tibetan ancestor, probably spoken in northern China over 6,000 years ago; they are no longer mutually intelligible. Karen, Kachin, Chin, Naga and the other hill languages belong to the Tibeto-Burman branch with Burmese and Tibetan, and share old roots: 'five' is panga in Mizo and manga in Kachin, built on the same root as Burmese ngá." },
        { with: 'burmans', text: 'Most hill peoples have fought the Burman-led army; since 2021 many have joined the wider resistance.' },
        { with: 'hindustanis', text: 'Northeast India\'s hill states have their own insurgencies and special laws such as AFSPA.' },
    ],
    'karen': [
        { with: 'burmans', text: 'One of the world\'s longest-running civil conflicts.' },
        { with: 'thai', text: 'Thailand hosts about 90,000 refugees, mostly Karen, in border camps.' },
    ],
    'kachin': [
        { with: 'burmans', text: 'A 1994 ceasefire collapsed in 2011; fighting over jade mines and autonomy continues.' },
        { with: 'han-mandarin', text: 'China is the main market for Kachin jade, rare earths and timber, and brokers ceasefires.' },
    ],
    'kuki-chin-naga': [
        { label: 'Meitei', text: 'Ethnic clashes between Meitei and Kuki-Zo in Manipur since 2023 have killed over 250 people and displaced about 60,000.' },
        { with: 'burmans', text: 'Chin State rose against the junta after 2021; tens of thousands of Chin refugees fled to Mizoram, India.' },
        { with: 'assamese', text: 'Nagaland, Mizoram and Assam have deadly border disputes.' },
    ],

    'turkic': [
        { with: 'iranian', text: 'Turkic and Persian cultures fused for a millennium; Turkic dynasties ruled Iran, and Persian was their court language.' },
        { with: 'slavic', text: 'From steppe raids to the Golden Horde to Russian conquest, the Turkic–Slavic frontier swung both ways.' },
        { with: 'han', text: 'Turkic empires and China traded and fought along the Silk Road.' },
    ],
    'oghuz': [
        { with: 'iranian', text: 'Azerbaijanis are deeply intertwined with Persians; Turks and Iranians are long rivals for influence.' },
        { with: 'arabs', text: 'The Ottomans ruled the Arab world for four centuries; Arab nationalism rose partly against Turkish rule.' },
    ],
    'turks': [
        { with: 'kurds', text: 'Decades of denial of Kurdish identity and PKK conflict; peace efforts resumed after the PKK announced its dissolution in 2025.' },
        { with: 'greeks', text: 'From 1453 to the 1923 population exchange and Cyprus 1974, a deep but now mostly peaceful rivalry.' },
        { with: 'armenians', text: 'Türkiye denies the 1915 genocide; the border has been closed since 1993.' },
        { with: 'azerbaijanis', text: '"One nation, two states": Türkiye backed Azerbaijan militarily in the 2020 Karabakh war.' },
    ],
    'azerbaijanis': [
        { with: 'armenians', text: 'Decades of conflict over Nagorno-Karabakh, which Azerbaijan fully retook in 2023.' },
        { with: 'persians', text: 'Two-thirds of Azerbaijanis live in Iran; Baku and Tehran trade accusations of stirring each other\'s populations.' },
        { with: 'turks', text: 'The closest of allies.' },
    ],
    'turkmen': [
        { with: 'persians', text: 'Turkmen raids on Iran for slaves were notorious until Russia\'s 1881 conquest; Iranian Turkmen are a Sunni minority.' },
        { with: 'uzbeks', text: 'Share the Amu Darya and Khorezm oasis, with occasional water disputes.' },
    ],
    'kipchak': [
        { with: 'slavic', text: 'Russia conquered the Kazakh steppe and the Volga khanates; Soviet policies devastated nomadic life.' },
        { with: 'karluk', text: 'Steppe nomads (Kazakhs, Kyrgyz) and oasis farmers (Uzbeks) have long traded and clashed.' },
    ],
    'kazakhs': [
        { with: 'russians', text: 'Russians were once nearly as numerous as Kazakhs in Kazakhstan; many left after 1991, and Kazakh is gradually replacing Russian.' },
        { with: 'han', text: 'About 1.5 million Kazakhs live in Xinjiang, and some have been caught up in internment camps.' },
        { with: 'uzbeks', text: 'Friendly neighbours with a large Uzbek minority in southern Kazakhstan.' },
    ],
    'kyrgyz': [
        { with: 'uzbeks', text: 'The 1990 and 2010 Osh clashes over land and power killed hundreds, mostly Uzbeks.' },
        { with: 'tajiks', text: 'Deadly border clashes in 2021–22 over water and enclaves; a border treaty followed in 2025.' },
        { with: 'han', text: 'Chinese trade and debt are growing; Kyrgyz in Xinjiang have faced internment.' },
    ],
    'volga-turks': [
        { with: 'russians', text: 'Coexistence since 1552, but Moscow has rolled back Tatar language rights and Tatarstan\'s special status.' },
        { label: 'Crimean Tatars', text: 'Volga Tatars feel kinship with Crimean Tatars, deported by Stalin in 1944.' },
    ],
    'karluk': [
        { with: 'iranian', text: 'Turkic Uzbeks and Persian-speaking Tajiks share cities like Samarkand and Bukhara, mixing for centuries.' },
        { with: 'han', text: 'Uyghurs face Chinese assimilation campaigns; Uzbekistan stays quiet on the issue.' },
        { label: "Silk Road oases", text: "Kashgar, Turpan, Samarkand and Bukhara grew rich as caravan stops along the Silk Road, where Turkic, Sogdian, Persian and Chinese traders met." },
    ],
    'uzbeks': [
        { with: 'tajiks', text: 'Rival claims to Samarkand and Bukhara\'s heritage; relations have improved since 2016.' },
        { with: 'kyrgyz', text: 'The 2010 Osh violence displaced hundreds of thousands of Uzbeks.' },
        { with: 'russians', text: 'Millions of Uzbek migrant workers send money home from Russia.' },
        { with: 'persians', text: "Timur made Samarkand his capital at the crossroads of the Silk Road, filling it with craftsmen taken from Persia, India and beyond." },
    ],
    'uyghurs': [
        { with: 'han', text: 'Riots in Ürümqi in 2009 were followed by sweeping surveillance and internment since 2017.' },
        { with: 'kazakhs', text: 'Close cousins; many Uyghurs live in Kazakhstan.' },
        { with: 'turks', text: 'Türkiye hosts a large Uyghur diaspora.' },
        { label: "Kashgar and Turpan", text: "Uyghur oasis towns were key stations along the Silk Road; the Uyghur Khaganate traded horses for Chinese silk in the 8th–9th centuries." },
    ],
    'siberian-turks': [
        { with: 'russians', text: 'Sakha cooperate with Moscow but guard their diamond wealth and language; Tuva joined the USSR only in 1944.' },
        { with: 'mongols', text: 'Tuvans share Buddhism and nomadic culture with Mongols.' },
    ],

    'finnic': [
        { label: "Uralic family", text: "Part of the Uralic family with Hungarian and the Sámi, Mari and Komi of Russia. Finnish and Hungarian split 4,000+ years ago and are not intelligible, but basic words match: kala and hal (fish), käsi and kéz (hand), vesi and víz (water)." },
        { with: 'germanic', text: 'Swedish and German elites ruled Finland and Estonia for centuries.' },
        { with: 'east-slavic', text: 'Karelia was partly lost to the USSR in 1940–44; Karelians in Russia are now a small minority.' },
    ],
    'finns': [
        { with: 'russians', text: 'The 1939–40 Winter War and the loss of Karelia; Finland joined NATO in 2023 after Russia\'s invasion of Ukraine.' },
        { with: 'swedes', text: 'Close ties, with Swedish an official language in Finland.' },
        { label: 'Sámi', text: 'Disputes over reindeer land, mining and recognition of Sámi rights continue in Lapland.' },
    ],
    'estonians': [
        { with: 'russians', text: 'Soviet deportations and Russification; today\'s large Russian minority and Russian threats remain the central issue.' },
        { with: 'finns', text: 'Close linguistic kin; many Estonians work in Finland.' },
        { with: 'latvians', text: 'Close partners despite unrelated languages.' },
    ],
    'hungarians': [
        { label: "Uralic family", text: "Hungarian is Uralic, related to Finnish and Estonian and most closely to the Khanty and Mansi of western Siberia, not to its Slavic, German or Romanian neighbours. Shared words: hal and kala (fish), kéz and käsi (hand), víz and vesi (water)." },
        { with: 'romanians', text: 'Transylvania changed hands in 1920 and 1940; Hungarian minority rights remain a regular dispute.' },
        { with: 'slovaks', text: 'Language laws and the 1945–47 expulsions of Hungarians still cause friction.' },
        { with: 'germans', text: 'The Habsburg partnership (Austria-Hungary, 1867–1918) and allies in both world wars.' },
    ],

    'mongols': [
        { with: 'han', text: 'Chinese dynasties built the Great Wall against Mongol and earlier steppe raiders. Mongols ruled China, then were ruled by the Manchu Qing; Mongolia broke away in 1911, while Inner Mongolia stayed Chinese.' },
        { with: 'russians', text: 'Mongolia was a Soviet satellite from 1924 to 1990; Russia remains its main fuel supplier.' },
        { with: 'kazakhs', text: 'Kazakhs form a minority of about 4% in western Mongolia.' },
        { with: 'persians', text: "The Mongols sacked Baghdad in 1258 and ruled Iran as the Ilkhanate, but their peace also reopened trade along the Silk Road, the route Marco Polo took." },
    ],

    'georgians': [
        { label: "Caucasus neighbours", text: "Caucasus neighbours, not relatives: Georgian (Kartvelian), Chechen and Avar (Northeast Caucasian), and Circassian and Abkhaz (Northwest Caucasian) belong to three separate language families with no proven link. What they share is mountain culture: codes of hospitality and blood feud, elaborate toasting at feasts, and centuries between Persian, Ottoman and Russian empires. Georgian's own small family, Kartvelian, includes Mingrelian, Laz and Svan." },
        { with: 'russians', text: 'Annexed in 1801; the 2008 war and Russian troops in Abkhazia and South Ossetia leave deep hostility.' },
        { with: 'circassians-abkhaz', text: 'The 1992–93 war in Abkhazia expelled about 200,000 Georgians.' },
        { with: 'ossetians', text: 'South Ossetia broke away with Russian support.' },
        { with: 'armenians', text: 'Friendly Christian neighbours.' },
    ],
    'nakh-dagestanian': [
        { label: "Caucasus neighbours", text: "Caucasus neighbours, not relatives: Georgian (Kartvelian), Chechen and Avar (Northeast Caucasian), and Circassian and Abkhaz (Northwest Caucasian) belong to three separate language families with no proven link. What they share is mountain culture: codes of hospitality and blood feud, elaborate toasting at feasts, and centuries between Persian, Ottoman and Russian empires. Chechen and Ingush form the Nakh branch; Dagestan's Avar, Lezgin, Dargin and dozens more make up the rest of Northeast Caucasian." },
        { with: 'russians', text: 'The longest resistance to Russian conquest, from Imam Shamil to the Chechen wars.' },
        { with: 'azerbaijanis', text: 'Lezgins and Avars live on both sides of the Russia–Azerbaijan border.' },
    ],
    'chechens-ingush': [
        { with: 'russians', text: 'Deportation in 1944 and two wars; Chechen units now fight for Russia in Ukraine under Ramzan Kadyrov.' },
        { with: 'ossetians', text: 'The 1992 Ingush–Ossetian conflict displaced tens of thousands of Ingush.' },
        { label: 'each other', text: 'Chechens and Ingush are close kin; a 2018 border deal between their republics sparked protests in Ingushetia.' },
    ],
    'dagestanis': [
        { with: 'russians', text: 'Insurgency in the 2000s–2010s and a 2023 riot at the Makhachkala airport targeting a flight from Israel.' },
        { with: 'azerbaijanis', text: 'Lezgins are divided by the border.' },
    ],
    'circassians-abkhaz': [
        { label: "Caucasus neighbours", text: "Caucasus neighbours, not relatives: Georgian (Kartvelian), Chechen and Avar (Northeast Caucasian), and Circassian and Abkhaz (Northwest Caucasian) belong to three separate language families with no proven link. What they share is mountain culture: codes of hospitality and blood feud, elaborate toasting at feasts, and centuries between Persian, Ottoman and Russian empires. Circassian (Adyghe and Kabardian) and Abkhaz belong to Northwest Caucasian, known for huge consonant inventories (the extinct Ubykh had about 80) and only two or three vowels." },
        { with: 'russians', text: 'The 1864 expulsion, called a genocide by many Circassians, is commemorated every May 21.' },
        { with: 'georgians', text: 'Abkhazia\'s breakaway and the expulsion of Georgians in 1993.' },
        { with: 'turks', text: 'Several million Turkish citizens are of Circassian descent.' },
    ],

    'dravidian': [
        { with: 'indo-aryan', text: 'Resistance to Hindi and northern political dominance; the south is wealthier and pays more federal tax than it receives.' },
        { with: 'sinhalese', text: 'The Tamil–Sinhalese conflict in Sri Lanka.' },
    ],
    'tamils': [
        { with: 'sinhalese', text: 'Discrimination after 1956, the 1983 Black July pogrom, and the civil war that ended in 2009 with mass civilian deaths.' },
        { with: 'hindustanis', text: 'Fierce resistance to Hindi since the 1960s; Tamil Nadu\'s Dravidian parties have ruled the state since 1967.' },
        { with: 'kannadigas', text: 'A bitter dispute over the Kaveri river\'s water, with riots as recently as 2016.' },
    ],
    'telugus': [
        { with: 'tamils', text: 'Andhra State was carved out of Madras in 1953 after a hunger strike.' },
        { label: 'Hyderabadi Muslims', text: 'Hyderabad\'s Muslim-ruled princely state was annexed by India in 1948 in a military operation with heavy loss of life.' },
    ],
    'kannadigas': [
        { with: 'tamils', text: 'Long-running Kaveri water dispute.' },
        { with: 'marathis', text: 'Border dispute over Belagavi.' },
    ],
    'malayalis': [
        { with: 'tamils', text: 'Disputes over the Mullaperiyar dam; close cultural ties.' },
        { with: 'gulf-arabs', text: 'About 2 million Malayalis work in the Gulf, sending home remittances that transformed Kerala.' },
    ],

    'vietnamese': [
        { label: "Austroasiatic family", text: "Vietnamese belongs to the Austroasiatic family with Khmer, Mon, Khasi and the Munda languages of India. Its huge Chinese vocabulary hides this, but the numbers show it: một, ba, bốn (one, three, four) match Khmer muŏy, bei, buŏn." },
        { with: 'han', text: 'A thousand years of Chinese rule, a 1979 border war, and disputes in the South China Sea.' },
        { with: 'khmer', text: 'Vietnam absorbed the Mekong delta from Cambodia; Vietnam ended the Khmer Rouge in 1979 but occupied Cambodia until 1989.' },
        { label: 'Cham', text: 'The Hindu, then Muslim Cham kingdom of central Vietnam was conquered by 1832.' },
        { with: 'french', text: 'French colonial rule ended at Dien Bien Phu in 1954.' },
    ],
    'khmer': [
        { label: "Austroasiatic family", text: "Khmer belongs to the Austroasiatic family with Vietnamese, Mon, Khasi and India's Munda languages. Its numbers match Vietnamese: muŏy, bei, buŏn and một, ba, bốn (one, three, four)." },
        { with: 'vietnamese', text: 'Fear of Vietnamese domination runs deep, from the loss of the Mekong delta to the 1979–89 occupation.' },
        { with: 'thai', text: 'Thailand ruled western Cambodia at times; a 2008–11 dispute over Preah Vihear temple turned deadly, and border fighting broke out again in 2025.' },
    ],
    'mon': [
        { label: "Austroasiatic family", text: "Mon belongs to the Austroasiatic family with Khmer, Vietnamese and Khasi; Mon and Khmer are its two oldest written languages, both with inscriptions from the 6th–7th centuries." },
        { with: 'burmans', text: 'Mon kingdoms were conquered by Burmans in the 1750s; a Mon armed group has fought for autonomy.' },
        { with: 'thai', text: 'Many Mon fled to Siam after Burmese conquest; Mon culture influenced Thai Buddhism.' },
    ],
    'khasi': [
        { label: "Austroasiatic family", text: "Khasi belongs to the Austroasiatic family, making it a distant relative of Khmer and Vietnamese and of the Munda languages (such as Santali) spoken elsewhere in India." },
        { with: 'bengalis', text: 'Tension over migration from Bangladesh.' },
        { with: 'assamese', text: 'Meghalaya was split from Assam in 1972; border disputes continue.' },
    ],

    'tai-kadai': [
        { with: 'khmer', text: 'Tai migrants moved into Khmer and Mon lands from about 1000 CE.' },
        { with: 'han', text: 'The Zhuang and other Tai peoples remained in southern China.' },
    ],
    'thai': [
        { with: 'shan', text: 'Close cousins: Shan (Tai Yai) culture and language are near to northern Thai. Many Shan work in Thailand as migrants, often undocumented, and Thailand quietly tolerates Shan armed groups on the border.' },
        { with: 'lao', text: 'Bangkok ruled Laos in the 19th century; Thais sometimes look down on Lao and Isan people, while Isan identity has grown in pride.' },
        { with: 'malays', text: 'Insurgency in the Malay-Muslim south since 2004 has killed over 7,000.' },
        { with: 'khmer', text: 'Border disputes over temples; occasional nationalist clashes.' },
        { with: 'burmans', text: 'Historic enemies since Burma destroyed the Thai capital Ayutthaya in 1767; millions of Myanmar migrants now work in Thailand.' },
    ],
    'lao': [
        { with: 'thai', text: 'The Thai-Lao relationship is close but unequal; Isan Lao in Thailand are a large but politically marginal population.' },
        { with: 'vietnamese', text: 'Laos is closely aligned with Vietnam\'s Communist Party.' },
        { label: 'Hmong', text: 'Hmong who fought for the US in Laos faced reprisals after 1975; many fled to Thailand and the US.' },
    ],
    'shan': [
        { with: 'thai', text: 'Kin in language and culture; Thailand is the main destination for Shan migrants and refugees.' },
        { with: 'burmans', text: 'Shan leaders joined Burma at the 1947 Panglong conference, and the 1947 constitution gave Shan State a right to secede after 10 years. The 1962 coup ended that promise and fueled decades of insurgency.' },
        { with: 'kachin', text: 'Shared resistance to the military, with occasional clashes between armed groups.' },
    ],

    'japonic': [
        { with: 'koreans', text: 'Japan colonized Korea (1910–45); disputes over wartime forced labor and "comfort women" still strain relations.' },
        { with: 'han', text: 'War memories and island disputes overshadow deep economic ties.' },
    ],
    'japanese': [
        { with: 'koreans', text: 'Colonial rule, forced labor and wartime sexual slavery remain sore points; pop culture exchange flourishes.' },
        { with: 'han', text: 'The 1937–45 war, including the Nanjing Massacre, and the Senkaku islands dispute.' },
        { with: 'ryukyuans', text: 'Okinawa was sacrificed in the 1945 battle to delay an invasion of the main islands; Okinawans resent bearing most US bases in Japan.' },
        { label: 'Ainu', text: 'Assimilation policies nearly erased Ainu language; Japan recognized the Ainu as Indigenous in 2019.' },
    ],
    'ryukyuans': [
        { with: 'japanese', text: 'Annexed in 1879, sacrificed in the 1945 battle, under US rule until 1972; resentment over military bases is strong.' },
        { with: 'han', text: 'The old Ryukyu kingdom paid tribute to China; China still disputes nearby islands.' },
    ],
    'koreans': [
        { with: 'japanese', text: 'Colonial rule (1910–45) remains the main grievance despite strong cultural exchange.' },
        { with: 'han', text: 'Korea was a Chinese tributary for centuries; China saved North Korea in the Korean War.' },
        { label: 'each other', text: 'North and South have been divided since 1945 and formally still at war.' },
    ],
}
