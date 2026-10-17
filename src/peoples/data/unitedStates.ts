import type { PeopleNode } from '../types.ts'

/**
 * US ancestry and origin groups, drawn county by county from the largest group in
 * ACS 2020–2024 data. Americans often claim several ancestries, so these are the
 * plurality heritage of each county, not exclusive identities.
 */
export const unitedStates: PeopleNode[] = [
    /* ---------- Under "Americans (United States)" ---------- */
    {
        id: 'german-americans', parent: 'americans', name: 'German Americans',
        info: {
            summary: 'The largest self-reported ancestry in the US and the plurality heritage in about 1,250 counties, from Pennsylvania across the Midwest to the Plains and Mountain West.',
            population: '≈ 40–45 million claim German ancestry',
            homeland: 'The Midwest and Great Plains (Wisconsin, Iowa, Ohio, Indiana, Nebraska, the Dakotas), Pennsylvania, central Texas Hill Country',
            language: 'English; Pennsylvania Dutch (a German dialect) survives among the Amish and Mennonites. German was the second most spoken language in the US before 1917.',
            religion: 'Lutheran and Catholic, with Amish, Mennonite and other Anabaptist communities.',
            food: 'Hot dogs and hamburgers (named for Frankfurt and Hamburg), bratwurst, sauerkraut, pretzels, lager beer brewed by German immigrants such as Pabst, Busch and Miller.',
            etymology: 'See Germans.',
            history: 'About 7 million Germans emigrated to the US between 1820 and 1920. Anti-German hysteria in World War I led to bans on German in schools and newspapers, and German Americans largely stopped presenting themselves as a separate group.',
        },
    },
    {
        id: 'irish-americans', parent: 'americans', name: 'Irish Americans',
        info: {
            summary: 'Descendants of the Famine-era migration who became a pillar of American cities, politics and the Catholic Church; the plurality in Massachusetts, Rhode Island and parts of the Northeast.',
            population: '≈ 30–38 million claim Irish ancestry',
            homeland: 'Boston and New England, New York, Philadelphia, Chicago; scattered pluralities across the country',
            language: 'English.',
            religion: 'Mostly Catholic; Protestant "Scotch-Irish" are counted separately here.',
            food: 'Corned beef and cabbage (an Irish American adaptation of bacon and cabbage), soda bread, St. Patrick\'s Day traditions.',
            etymology: 'See Irish.',
            history: 'About 1.5 million Irish arrived during and after the Great Famine (1845–52), facing "No Irish Need Apply" discrimination. They later dominated urban political machines; John F. Kennedy became the first Irish Catholic president in 1961.',
        },
    },
    {
        id: 'english-americans', parent: 'americans', name: 'English Americans',
        info: {
            summary: 'Descendants of the colonial English settlers who founded most of the Thirteen Colonies; the plurality in Utah, Maine, Vermont, Idaho and much of the South.',
            population: '≈ 25–45 million claim English ancestry (many more have some)',
            homeland: 'Utah and Idaho (Mormon pioneers), northern New England, the coastal and Deep South',
            language: 'English.',
            religion: 'Protestant (Episcopal, Methodist, Baptist), and Latter-day Saints in Utah and Idaho.',
            food: 'Colonial roots of Thanksgiving turkey, pies, puddings and New England chowder.',
            etymology: 'See English.',
            history: 'Many Americans of English descent simply report "American", so this group is undercounted. In Utah and Idaho the plurality reflects 19th-century Mormon converts from England.',
        },
    },
    {
        id: 'upland-southerners', parent: 'americans', name: 'Upland Southerners ("American" and Scots-Irish)',
        info: {
            summary: 'Long-settled white Southerners, often of Scots-Irish and English descent, who now mostly write "American" when asked about ancestry; the plurality across Appalachia and the Upland South.',
            population: '≈ 20 million report "American" ancestry; about 10 million Scots-Irish or Scottish',
            homeland: 'Appalachia (Kentucky, Tennessee, West Virginia), the Ozarks, the Carolina Piedmont, north Alabama and Georgia, Oklahoma, east Texas',
            language: 'English, with Appalachian and Southern dialects.',
            religion: 'Evangelical Protestant (Baptist, Methodist, Pentecostal, Church of Christ).',
            food: 'Biscuits and gravy, cornbread, country ham, fried chicken, barbecue, moonshine.',
            etymology: '"Scotch-Irish" names Ulster Protestants of Scottish origin who emigrated in the 1700s; "American" is the answer many of their descendants now give.',
            history: 'About 200,000 Ulster Scots arrived in the 18th century and pushed into the Appalachian backcountry, clashing with the Cherokee and other nations. They shaped country music, Southern evangelical religion and frontier politics.',
        },
    },
    {
        id: 'italian-americans', parent: 'americans', name: 'Italian Americans',
        info: {
            summary: 'Mostly descendants of southern Italians who arrived between 1880 and 1920; the plurality in Connecticut, Rhode Island\'s Providence area, Long Island, Staten Island and the New Jersey suburbs.',
            population: '≈ 16 million',
            homeland: 'New York metro, New Jersey, Connecticut, Rhode Island, Pennsylvania',
            language: 'English; Italian dialects among older generations.',
            religion: 'Catholic.',
            food: 'Pizza (the US style was born in New York and New Jersey), spaghetti and meatballs, chicken parmigiana, cannoli; much of what Americans call Italian food is Italian American.',
            etymology: 'See Italians.',
            history: 'About 4 million Italians came in 1880–1920. They faced nativist prejudice, including the 1891 lynching of 11 Italians in New Orleans; the 1924 quota law sharply cut further immigration.',
        },
    },
    {
        id: 'nordic-americans', parent: 'americans', name: 'Scandinavian Americans',
        info: {
            summary: 'Descendants of Norwegian, Swedish, Danish and Finnish farmers who settled the northern prairies and forests; the plurality across much of Minnesota and North Dakota.',
            population: '≈ 10 million',
            homeland: 'Minnesota, North Dakota, northern Wisconsin, Michigan\'s Upper Peninsula, Washington State',
            language: 'English; Norwegian and Swedish survived into the 20th century.',
            religion: 'Lutheran.',
            food: 'Lutefisk and lefse at church suppers, Swedish meatballs, krumkake, hotdish casseroles.',
            etymology: 'See Scandinavians.',
            history: 'Proportionally, Norway lost more of its people to emigration than any country except Ireland. Minnesota\'s Swedish and Norwegian heritage still shapes its politics and culture.',
        },
    },
    {
        id: 'french-americans', parent: 'americans', name: 'Cajuns and Franco-Americans',
        info: {
            summary: 'Two distinct French-heritage groups: Cajuns of south Louisiana (descendants of Acadians expelled from Canada) and Franco-Americans of northern New England (descendants of Québécois mill workers).',
            population: '≈ 10 million claim French, French Canadian or Cajun ancestry',
            homeland: 'Acadiana (south Louisiana); northern Maine, New Hampshire and Vermont; parts of Connecticut',
            language: 'English; Louisiana French and Louisiana Creole survive, mostly among older people.',
            religion: 'Catholic.',
            food: 'Gumbo, jambalaya, boudin, crawfish étouffée (Cajun); tourtière and poutine (Franco-American).',
            etymology: '"Cajun" is an English rendering of Acadien.',
            history: 'Britain expelled about 11,500 Acadians from Nova Scotia in 1755–64 (the Grand Dérangement); many resettled in Spanish Louisiana. About 900,000 Québécois moved to New England mill towns between 1840 and 1930.',
        },
    },
    {
        id: 'african-americans', parent: 'americans', name: 'African Americans',
        info: {
            summary: 'Descendants of Africans enslaved in the US, plus recent African and Caribbean immigrants; the plurality across the "Black Belt" of the Deep South and in many big cities.',
            population: '≈ 47 million',
            homeland: 'The Black Belt (Mississippi, Alabama, Georgia, South Carolina, Louisiana), Washington DC, Baltimore, Detroit, Chicago, Atlanta, Memphis',
            language: 'English, including African American English; Gullah on the Sea Islands.',
            religion: 'Mostly Protestant; the Black church (Baptist, AME, Pentecostal) has been a center of community and civil rights.',
            food: 'Soul food: fried chicken, collard greens, black-eyed peas, cornbread, sweet potato pie, okra and gumbo, with West African roots.',
            etymology: '"African American" was popularized in the late 1980s.',
            history: 'About 390,000 enslaved Africans were brought to mainland North America; slavery ended in 1865, followed by Jim Crow segregation. The Great Migration (1910–70) moved about 6 million Black Southerners north and west; the civil rights movement ended legal segregation in the 1960s.',
        },
    },
    {
        id: 'asian-americans', parent: 'americans', name: 'Asian Americans',
        info: {
            summary: 'The fastest-growing US group, with Chinese, Indian, Filipino, Vietnamese, Korean and Japanese as the largest origins; the plurality in Hawaii and in Silicon Valley and San Francisco Bay counties.',
            population: '≈ 25 million',
            homeland: 'Hawaii, the San Francisco Bay Area, Los Angeles, Seattle, New York, northern Virginia, Atlanta\'s suburbs',
            language: 'English plus Chinese, Tagalog, Vietnamese, Korean, Hindi and other languages.',
            religion: 'Christian, Buddhist, Hindu, Muslim and non-religious, varying by origin.',
            food: 'Plate lunches and poke (Hawaii), American Chinese food, boba, banh mi, Korean barbecue, Indian and Filipino cuisines.',
            etymology: '"Asian American" was coined by student activists in 1968.',
            history: 'The 1882 Chinese Exclusion Act and the internment of about 120,000 Japanese Americans in 1942 mark early discrimination. The 1965 Immigration Act opened mass migration from Asia.',
        },
    },

    /* ---------- Under "Latin Americans" ---------- */
    {
        id: 'mexican-americans', parent: 'latin-americans', name: 'Mexican Americans (Chicanos)',
        info: {
            summary: 'The largest Hispanic group in the US, rooted both in lands that were Mexican before 1848 and in a century of migration; the plurality across most of the Southwest.',
            population: '≈ 37 million',
            homeland: 'California, Texas, Arizona, New Mexico, Nevada, Colorado, and Chicago, with growing communities in the South and Midwest',
            language: 'English and Spanish, often mixed.',
            religion: 'Catholic majority, with a growing evangelical share.',
            food: 'Tex-Mex (fajitas, chili con carne, nachos), Cal-Mex burritos, barbacoa, menudo, tamales at Christmas.',
            etymology: '"Chicano", from Mexica (pronounced "Meshica"), was adopted with pride in the 1960s civil rights movement.',
            history: 'Tejanos and Californios became US citizens overnight in 1848. Mass deportations in the 1930s and 1954 removed many US citizens; the Chicano movement and the farmworkers\' union of César Chávez fought for civil rights.',
        },
    },
    {
        id: 'hispanic-americans', parent: 'latin-americans', name: 'Hispanos, Cuban and other Hispanic Americans',
        info: {
            summary: 'Hispanic Americans of non-Mexican origin: Cuban Miami, Puerto Rican central Florida, Central Americans in northern Virginia and New Jersey, and the Hispanos of northern New Mexico and southern Colorado.',
            population: '≈ 27 million (non-Mexican Hispanic Americans)',
            homeland: 'Miami-Dade, Osceola County (Florida), northern New Mexico and the San Luis Valley (Colorado), Lawrence (Massachusetts), parts of New Jersey',
            language: 'Spanish and English; northern New Mexico preserves a distinct colonial Spanish.',
            religion: 'Catholic, with Penitente brotherhoods in New Mexico.',
            food: 'Cuban sandwiches and café cubano, mofongo, pupusas, and New Mexican red and green chile.',
            etymology: '"Hispano" refers to descendants of Spanish colonists who settled New Mexico from 1598.',
            history: 'Hispano families lived in New Mexico for 250 years before US annexation. About 1 million Cubans arrived after 1959; Puerto Ricans, US citizens since 1917, moved to the mainland in large numbers after Hurricane Maria (2017).',
        },
    },

    /* ---------- Native nations ---------- */
    {
        id: 'us-native-nations', parent: 'indigenous-americas', name: 'Native nations of the United States',
        info: {
            summary: 'The 574 federally recognized tribes of the lower 48 states, shown where Native Americans are the largest group in a county: mostly on large reservations in the Southwest and northern Plains, and in eastern Oklahoma.',
            population: '≈ 3.7 million identify as American Indian alone; ≈ 9.7 million including mixed ancestry',
            homeland: 'Reservations and trust lands across the West and Plains; most Native Americans now live in cities',
            language: 'English; about 170 Native languages are still spoken, led by Navajo (about 170,000 speakers), Yupik and Dakota/Lakota.',
            religion: 'Christianity, traditional ceremonies, and the Native American Church (peyote).',
            food: 'Frybread (a product of reservation-era rations), corn, beans and squash (the "Three Sisters"), wild rice, bison, salmon.',
            etymology: '"Indians" comes from Columbus\'s mistaken belief he had reached the Indies; many prefer their own nation\'s name.',
            history: 'Treaties, the 1830 Indian Removal Act, the reservation system and boarding schools reduced Native land from the whole continent to about 2% of the US. Tribes retain sovereignty as "domestic dependent nations".',
        },
    },
    {
        id: 'southwest-nations', parent: 'us-native-nations', name: 'Diné (Navajo), Apache and Southwest nations',
        info: {
            summary: 'The largest US reservation, the Navajo Nation (about 71,000 km², larger than West Virginia), plus the Apache, Hopi, Pueblo and Tohono O\'odham peoples.',
            population: '≈ 400,000 Navajo citizens; ≈ 100,000 Apache',
            homeland: 'Navajo Nation (Arizona, New Mexico, Utah), Fort Apache and San Carlos (Arizona), the Rio Grande Pueblos',
            language: 'Navajo (Diné bizaad), Apache, Hopi, Keres, Tewa, Zuni and O\'odham.',
            religion: 'Traditional ceremonies (the Navajo Blessingway, Hopi kachina rites), Catholicism, and the Native American Church.',
            food: 'Mutton stew, blue corn mush, Navajo tacos on frybread, piki bread (Hopi), roasted green chile.',
            etymology: 'Navajo from a Tewa word for cultivated fields; their own name is Diné, "the people". Apache possibly from a Zuni word for "enemy".',
            history: 'The 1864 "Long Walk" forced about 9,000 Navajo to a camp at Bosque Redondo, where many died. Navajo Code Talkers used their language as an unbreakable code in World War II. The Pueblo Revolt of 1680 drove the Spanish out of New Mexico for 12 years.',
        },
    },
    {
        id: 'plains-nations', parent: 'us-native-nations', name: 'Lakota, Dakota and northern Plains nations',
        info: {
            summary: 'The Oceti Sakowin (Great Sioux Nation) and their neighbours, the Blackfeet, Crow, Cheyenne, Omaha, Ojibwe and Menominee, on reservations across the Dakotas, Montana, Nebraska, Minnesota and Wisconsin.',
            population: '≈ 170,000 Lakota/Dakota/Nakota; several hundred thousand across these nations',
            homeland: 'Pine Ridge, Rosebud, Standing Rock and Cheyenne River (Dakotas); Blackfeet, Crow and Fort Peck (Montana); White Earth (Minnesota); Menominee (Wisconsin)',
            language: 'Lakota, Dakota, Blackfoot, Crow, Ojibwe and others; revitalization programs are growing.',
            religion: 'The Sun Dance and sweat lodge ceremonies, Catholicism and Episcopalianism.',
            food: 'Bison, wojapi (berry sauce), wild rice (Ojibwe), frybread, wasna (pemmican).',
            etymology: '"Sioux" comes via French from an Ojibwe word sometimes glossed as "little snakes"; Lakota means "allies" or "friends".',
            history: 'The Lakota defeated Custer at the Little Bighorn in 1876; the US seized the sacred Black Hills in 1877 and killed about 250 Lakota at Wounded Knee in 1890. The Supreme Court ruled the Black Hills taking illegal in 1980; the Lakota refuse the money and demand the land back. Standing Rock led the 2016 Dakota Access Pipeline protests.',
        },
    },
    {
        id: 'oklahoma-nations', parent: 'us-native-nations', name: 'Cherokee, Choctaw, Muscogee and Oklahoma nations',
        info: {
            summary: 'Nations forcibly moved to Indian Territory from the Southeast and elsewhere; Oklahoma has 39 tribes and the second-largest Native population of any state.',
            population: '≈ 450,000 Cherokee Nation citizens; ≈ 230,000 Choctaw; ≈ 100,000 Muscogee (Creek)',
            homeland: 'Eastern and western Oklahoma',
            language: 'Cherokee (with its own syllabary invented by Sequoyah around 1821), Choctaw, Muscogee and others; all endangered.',
            religion: 'Mostly Baptist and Methodist Christianity, with stomp dance ceremonial grounds.',
            food: 'Grape dumplings, wild onions with eggs, hominy and sofkey, frybread.',
            etymology: 'Oklahoma is Choctaw for "red people".',
            history: 'The Trail of Tears (1830s) removed about 100,000 people from the Southeast; thousands died. In McGirt v. Oklahoma (2020) the Supreme Court ruled that much of eastern Oklahoma remains reservation land.',
        },
    },
    {
        id: 'great-basin-nations', parent: 'us-native-nations', name: 'Paiute, Shoshone and Washoe (Great Basin)',
        info: {
            summary: 'Peoples of the desert basins and the Sierra Nevada, shown where they are the largest group in Mineral County, Nevada, and Alpine County, California.',
            population: '≈ 50,000',
            homeland: 'Nevada, eastern California, Utah, Idaho, eastern Oregon',
            language: 'Northern Paiute, Shoshone, Washoe and others.',
            religion: 'Traditional faith; the 1889 Ghost Dance began with the Northern Paiute prophet Wovoka.',
            food: 'Pine nuts (pinyon), cui-ui fish, rabbit, wild seeds.',
            etymology: 'Mostly self-names; Shoshone may mean "high-growing grass".',
            history: 'Mining and ranching took most of their land in the 1850s–60s; the Western Shoshone still contest US claims under the 1863 Treaty of Ruby Valley.',
        },
    },
    {
        id: 'eastern-nations', parent: 'us-native-nations', name: 'Lumbee and eastern nations',
        info: {
            summary: 'Native peoples of the eastern US, shown where the Lumbee are the largest group in Robeson County, North Carolina.',
            population: '≈ 55,000 Lumbee; eastern nations together several hundred thousand',
            homeland: 'Robeson County (North Carolina); also Cherokee in western North Carolina, Haudenosaunee in New York, Seminole and Miccosukee in Florida',
            language: 'English (Lumbee English is a distinct dialect); Cherokee and Iroquoian languages elsewhere.',
            religion: 'Baptist and Methodist Christianity.',
            food: 'Collards, cornbread, chicken bog and other Southern dishes.',
            etymology: 'Lumbee is from the Lumber River.',
            history: 'The Lumbee drove the Ku Klux Klan out of Robeson County in the 1958 Battle of Hayes Pond, and have sought full federal recognition for decades.',
        },
    },
    {
        id: 'alaska-natives', parent: 'arctic-north', name: 'Alaska Natives (Yup\'ik, Iñupiat, Athabascan)',
        info: {
            summary: 'The Yup\'ik, Iñupiat, Athabascan, Aleut (Unangax̂), Tlingit and other peoples, the majority across much of western and northern Alaska.',
            population: '≈ 120,000 alone; about a fifth of Alaskans including mixed ancestry',
            homeland: 'The Yukon-Kuskokwim Delta, the North Slope, the Northwest Arctic, the Aleutians and the interior',
            language: 'Central Yup\'ik (about 10,000 speakers, the strongest Native language in Alaska), Iñupiaq, Athabascan languages, Tlingit, Unangam Tunuu.',
            religion: 'Russian Orthodox (from 18th-century missions), Moravian and Catholic Christianity with traditional practice.',
            food: 'Salmon, seal oil, whale (muktuk), caribou, akutaq ("Eskimo ice cream" of fat and berries).',
            etymology: 'Alaska from Unangax̂ alaxsxaq, "the mainland".',
            history: 'Russia sold Alaska to the US in 1867. The 1971 Alaska Native Claims Settlement Act created regional Native corporations instead of reservations, now among Alaska\'s largest businesses.',
        },
    },
]
