import type { RelationsMap } from './types.ts'

export const europeRelations: RelationsMap = {
    'basques': [
        { with: 'castilians', text: 'Centuries of local self-rule (the fueros) gave way to strong Spanish centralization. Franco banned Basque in public life, which fed ETA\'s campaign; today the region has the widest tax and policing autonomy in Spain.' },
        { with: 'french', text: 'French Basques are more assimilated: Basque has no official status in France, and nationalism there has stayed small.' },
    ],

    'slavic': [
        { label: "Indo-European family", text: "Part of the Indo-European family: their language and those of most of Europe, Iran and northern India descend from Proto-Indo-European, spoken on the steppe north of the Black Sea about 6,000 years ago. The family is linguistic, not a shared identity or ancestry. Slavic is closest to the Baltic languages. Russian brat and mat′ match English brother and mother, Latin frater and mater, and Sanskrit bhrātṛ and mātṛ." },
        { with: 'germanic', text: 'A thousand-year frontier of eastward German settlement, Teutonic crusades, Prussian partitions of Poland, and the Nazi war of annihilation in the East.' },
        { with: 'turkic', text: 'Rus\' fought steppe nomads, lived under the Mongol-Turkic Golden Horde, then conquered the Volga, Crimea and Central Asia.' },
        { with: 'romance', text: 'Romanians sit between South and East Slavs, sharing Orthodoxy but not language.' },
    ],
    'east-slavic': [
        { with: 'west-slavic', text: 'Poland–Lithuania ruled Ukraine and Belarus for centuries, leaving Catholic and Greek Catholic communities and lasting rivalry with Russia.' },
        { with: 'finnic', text: 'Russians absorbed many Finnic tribes in the north; the Finns broke away in 1917 and fought the USSR in 1939–44.' },
        { with: 'kipchak', text: 'Russians and Kazakhs mixed through Soviet settlement of the steppe; northern Kazakhstan is still heavily Russian.' },
    ],
    'russians': [
        { with: 'ukrainians', text: 'Closely related, but Russian nationalism often denies Ukraine is a separate nation. The 2014 annexation of Crimea and the 2022 invasion turned most Ukrainians sharply against Russia.' },
        { with: 'belarusians', text: 'The closest of the three; Belarus is in a "Union State" with Russia and most Belarusians speak Russian daily.' },
        { with: 'volga-turks', text: 'Tatars and Russians have lived side by side since Kazan fell in 1552; mixed marriages are common, though Tatarstan has resisted cuts to Tatar-language schooling.' },
        { with: 'chechens-ingush', text: 'Two brutal wars (1994–96, 1999–2009) and Stalin\'s 1944 deportation define the relationship; Chechnya is now ruled by a Kremlin-loyal strongman.' },
        { with: 'estonians', text: 'Soviet-era Russian settlers make up about a quarter of Estonia; language and citizenship rules remain contested.' },
    ],
    'ukrainians': [
        { with: 'russians', text: 'Centuries of Russian imperial rule, the Holodomor famine, and Russia\'s 2022 invasion have made independence from Russia central to Ukrainian identity.' },
        { with: 'poles', text: 'A painful history, including the 1943 Volhynia massacres of Poles; yet Poland took in over a million Ukrainian refugees after 2022.' },
        { label: 'Crimean Tatars', text: 'Deported en masse by Stalin in 1944, they returned to Crimea after 1989 and largely sided with Kyiv against the 2014 annexation.' },
    ],
    'belarusians': [
        { with: 'russians', text: 'Heavy Russification since the 19th century; most Belarusians are bilingual and the state is closely tied to Moscow.' },
        { with: 'poles', text: 'Western Belarus was Polish between the wars; a Polish minority remains around Grodno.' },
        { with: 'lithuanians', text: 'Both claim the Grand Duchy of Lithuania as their heritage, whose early chancery language was close to Old Belarusian.' },
    ],
    'west-slavic': [
        { with: 'germans', text: 'German settlers lived across Bohemia, Silesia and Pomerania for centuries until the expulsions of 1945–47.' },
        { with: 'hungarians', text: 'Slovakia was part of Hungary for about a thousand years; a Hungarian minority remains in the south.' },
    ],
    'poles': [
        { with: 'germans', text: 'From Prussian partition to Nazi occupation, Germany was Poland\'s deadliest neighbour; postwar reconciliation has made it Poland\'s biggest trading partner.' },
        { with: 'russians', text: 'Partition, the 1940 Katyn massacre and Soviet domination leave deep distrust.' },
        { with: 'lithuanians', text: 'Allied for four centuries in the Commonwealth, then bitter rivals over Vilnius between the wars.' },
    ],
    'czechs': [
        { with: 'slovaks', text: 'Shared a state from 1918 to 1993 and split peacefully; relations remain warm.' },
        { with: 'germans', text: 'Sudeten Germans formed a third of Bohemia\'s population; Hitler annexed the Sudetenland in 1938 and about 3 million Germans were expelled after 1945.' },
    ],
    'slovaks': [
        { with: 'czechs', text: 'Close and friendly since the 1993 divorce; the languages are mutually intelligible.' },
        { with: 'hungarians', text: 'Centuries of Hungarian rule and Magyarization; language laws for the Hungarian minority still spark disputes.' },
    ],
    'south-slavic': [
        { with: 'turks', text: 'Ottoman rule lasted up to five centuries; it produced the Bosniak Muslims and a lasting "Turk" image in Serbian and Bulgarian national stories.' },
        { with: 'albanians', text: 'The sharpest modern conflict is between Serbs and Albanians over Kosovo.' },
        { with: 'germans', text: 'Habsburg rule shaped Slovenia, Croatia and Vojvodina; Nazi Germany occupied Yugoslavia in 1941.' },
    ],
    'serbs': [
        { with: 'albanians', text: 'Kosovo is the core dispute: the medieval Serbian heartland now has an Albanian majority. Serbia does not recognize Kosovo\'s independence.' },
        { with: 'croats', text: 'The fascist Ustaše state killed hundreds of thousands of Serbs in World War II; the 1991–95 war saw Serbs expelled from Krajina. Relations remain tense but functional.' },
        { with: 'bosniaks', text: 'The 1992–95 Bosnian war, including the Srebrenica genocide, still divides Bosnia into two entities.' },
        { with: 'russians', text: 'Orthodox and Slavic kinship makes Russia popular in Serbia.' },
    ],
    'croats': [
        { with: 'serbs', text: 'Wartime massacres in the 1940s and the 1990s war leave mutual suspicion despite near-identical language.' },
        { with: 'bosniaks', text: 'Allies against Serbs, then enemies in the 1993–94 Croat–Bosniak war over Herzegovina; still uneasy partners in the Bosnian Federation.' },
        { with: 'slovenes', text: 'Friendly neighbours, with a long-running dispute over the Piran Bay sea border.' },
    ],
    'bosniaks': [
        { with: 'serbs', text: 'The war and Srebrenica genocide make Republika Srpska\'s secessionist talk a constant worry.' },
        { with: 'croats', text: 'Share the Federation entity, but Croats push for more autonomy in Herzegovina.' },
        { with: 'turks', text: 'Türkiye is seen by many Bosniaks as a cultural and religious protector.' },
    ],
    'montenegrins': [
        { with: 'serbs', text: 'Identity is split: many in Montenegro call themselves Serbs, and the Serbian Orthodox Church is a political flashpoint.' },
        { with: 'albanians', text: 'Albanians are about 5% of Montenegro and have generally been part of governing coalitions.' },
    ],
    'slovenes': [
        { with: 'italians', text: 'Trieste and Istria were contested after both world wars; a Slovene minority lives in Italy and an Italian one on the Slovene coast.' },
        { with: 'germans', text: 'Under Austrian rule for about 600 years; a Slovene minority remains in Austrian Carinthia.' },
    ],
    'bulgarians': [
        { with: 'turks', text: 'Five centuries of Ottoman rule; in 1989 the communist regime\'s forced renaming campaign drove about 300,000 Bulgarian Turks to Türkiye.' },
        { with: 'macedonians', text: 'Bulgaria regards Macedonian as a Bulgarian dialect and has used this to hold up North Macedonia\'s EU accession.' },
        { with: 'greeks', text: 'Rivals in the Balkan Wars (1912–13), now friendly EU and NATO partners.' },
    ],
    'macedonians': [
        { with: 'albanians', text: 'Albanians are about a quarter of North Macedonia; a brief 2001 insurgency ended with the Ohrid Agreement granting language and power-sharing rights.' },
        { with: 'greeks', text: 'Greece objected to the name "Macedonia" until the 2018 Prespa deal added "North".' },
        { with: 'bulgarians', text: 'Disputes over history and language continue to slow EU membership talks.' },
    ],

    'germanic': [
        { label: "Indo-European family", text: "Part of the Indo-European family: their language and those of most of Europe, Iran and northern India descend from Proto-Indo-European, spoken on the steppe north of the Black Sea about 6,000 years ago. The family is linguistic, not a shared identity or ancestry. A regular sound shift (Grimm's law) turned p into f, so Latin pater, piscis and pes became English father, fish and foot, German Vater, Fisch and Fuß." },
        { with: 'romance', text: 'Germanic tribes conquered the Western Roman Empire; the France–Germany rivalry drove three wars between 1870 and 1945, and its reconciliation founded the EU.' },
        { with: 'slavic', text: 'The East was colonized, partitioned and devastated by German states; today Germany and Poland are close EU partners.' },
        { with: 'celtic', text: 'English expansion conquered Wales, Ireland and Scotland.' },
    ],
    'west-germanic': [
        { with: 'gallo-romance', text: 'The language line between Dutch/German and French runs through Belgium, Luxembourg, Lorraine and Switzerland.' },
    ],
    'germans': [
        { with: 'french', text: 'Hereditary enemies from 1870 to 1945; the 1963 Élysée Treaty made them the core partnership of the EU.' },
        { with: 'poles', text: 'Germany\'s World War II occupation killed about a fifth of Poland\'s population; reconciliation has been real but reparations claims resurface.' },
        { with: 'jews', text: 'German-speaking Jews were deeply integrated until the Holocaust; Germany treats responsibility for it as a core of national identity.' },
        { with: 'turks', text: 'About 3 million people of Turkish origin live in Germany, mostly descended from 1960s guest workers.' },
    ],
    'dutch': [
        { with: 'french', text: 'Belgium\'s Flemish and Walloons share a state uneasily; language disputes have repeatedly stalled government formation.' },
        { with: 'germans', text: 'Close economic ties; memories of the 1940–45 occupation fuel long-running friendly rivalry, especially in football.' },
        { with: 'javanese', text: 'The Dutch ruled Indonesia for about 300 years; the 1945–49 war of independence was violent, and the Netherlands apologized in 2022.' },
    ],
    'english': [
        { with: 'scots', text: 'Separate kingdoms until 1707; the union is strong economically, but Scottish independence remains a live debate.' },
        { with: 'irish', text: 'Eight centuries of conquest, plantation and famine; independence in 1922 and the Northern Ireland peace process have made relations mostly warm.' },
        { with: 'welsh', text: 'Conquered in 1283 and annexed in 1536; Welsh language revival since the 1960s is a source of pride.' },
        { with: 'french', text: 'Centuries of wars from 1066 to 1815, then allies in both world wars.' },
    ],
    'afrikaners': [
        { with: 'english', text: 'Britain\'s war against the Boer republics (1899–1902), with its concentration camps, fed Afrikaner nationalism.' },
        { with: 'nguni', text: 'Apartheid (1948–94) subordinated Black South Africans; land reform and crime remain divisive issues.' },
        { with: 'khoe-san', text: 'Coloured Afrikaans speakers carry much Khoekhoe ancestry; Dutch settlers dispossessed the Khoekhoe from the 1650s.' },
    ],
    'anglosphere': [
        { with: 'indigenous-americas', text: 'Settlement displaced Native peoples through war, treaties and forced removal; land claims and treaty rights remain live issues.' },
        { with: 'aboriginal-australians', text: 'Colonization brought dispossession and child removal; formal apologies came in 2008 (Australia).' },
    ],
    'americans': [
        { with: 'mexicans', text: 'The US took half of Mexico in 1848; today they are each other\'s top trading partners, with tension over immigration and the border.' },
        { with: 'anglo-canadians', text: 'The world\'s longest undefended border and very close cultural ties.' },
        { with: 'indigenous-americas', text: 'Treaties, the Trail of Tears and the reservation system shaped relations with Native nations, which retain limited sovereignty.' },
    ],
    'anglo-canadians': [
        { with: 'quebecois', text: 'Two founding peoples with recurring tension; Quebec voted narrowly against independence in 1995.' },
        { with: 'inuit', text: 'Residential schools and relocations left deep scars; Nunavut was created in 1999 as a partial remedy.' },
        { with: 'americans', text: 'Close allies, though Canadians define themselves partly by not being American.' },
    ],
    'australians-nzers': [
        { with: 'aboriginal-australians', text: 'Dispossession, the Stolen Generations and the failed 2023 Voice referendum.' },
        { with: 'polynesians', text: 'New Zealand is bound to Māori by the Treaty of Waitangi; Auckland has the world\'s largest Polynesian population.' },
        { with: 'papuans', text: 'Australia ruled Papua New Guinea until 1975 and is still its main aid donor.' },
    ],
    'anglo-caribbeans': [
        { with: 'english', text: 'Britain ruled most islands until the 1960s–80s; the "Windrush" generation migrated to Britain from 1948.' },
        { with: 'caribbean-hispanics', text: 'Close regional ties; Jamaicans and Cubans share a history of labor migration.' },
        { label: 'Indo-Caribbeans', text: 'In Trinidad and Guyana, Afro- and Indo-descended communities form the basis of rival political parties.' },
    ],
    'north-germanic': [
        { with: 'finnic', text: 'Sweden ruled Finland for six centuries; Swedish remains co-official there.' },
        { with: 'celtic', text: 'Viking raids from 793 led to Norse kingdoms in Ireland, Scotland and the Isle of Man.' },
    ],
    'swedes': [
        { with: 'danes', text: 'Fought more than a dozen wars between 1500 and 1814; now friendly rivals.' },
        { with: 'finns', text: 'Finland was Swedish for about 600 years; Finland-Swedes are a protected minority.' },
        { with: 'russians', text: 'Sweden lost its Baltic empire to Russia in 1721; worry about Russia drove Sweden into NATO in 2024.' },
    ],
    'norwegians': [
        { with: 'danes', text: 'Under the Danish crown for over 400 years; Norwegian Bokmål grew out of written Danish.' },
        { with: 'swedes', text: 'Peacefully dissolved their union in 1905.' },
        { label: 'Sámi', text: 'Norway once pursued harsh "Norwegianization" of the Sámi; it now has a Sámi parliament.' },
    ],
    'danes': [
        { with: 'germans', text: 'Lost Schleswig-Holstein to Prussia in 1864; a 1920 vote set today\'s border, with minorities on both sides.' },
        { with: 'inuit', text: 'Greenland has been Danish since the 18th century; a forced contraception scandal of the 1960s–70s is now under investigation.' },
    ],
    'icelanders': [
        { with: 'danes', text: 'Ruled from Copenhagen until 1918 (full independence 1944); Danish is still taught in schools.' },
        { with: 'english', text: 'Three "Cod Wars" (1958–76) with Britain over fishing limits.' },
    ],
    'faroese': [
        { with: 'danes', text: 'Self-governing since 1948 but still in the Danish realm; independence is a recurring debate.' },
    ],

    'romance': [
        { label: "Indo-European family", text: "Part of the Indo-European family: their language and those of most of Europe, Iran and northern India descend from Proto-Indo-European, spoken on the steppe north of the Black Sea about 6,000 years ago. The family is linguistic, not a shared identity or ancestry. Romance languages descend from Latin: pater, mater and frater became Spanish padre, madre and fraile (friar) and French père, mère and frère, the same words as English father, mother and brother." },
        { with: 'germanic', text: 'From Roman frontier battles to two world wars, the Romance–Germanic line was Europe\'s main fault line.' },
        { with: 'indigenous-americas', text: 'Spain and Portugal conquered the Americas, mixing with and dominating Indigenous peoples.' },
        { with: 'arabs', text: 'Al-Andalus, the Crusades and the colonization of North Africa link the Latin and Arab worlds.' },
    ],
    'iberian': [
        { with: 'maghrebis', text: 'Moorish rule (711–1492) left a deep Arab-Berber legacy; Morocco and Spain now argue over Ceuta, Melilla and migration.' },
        { with: 'french', text: 'The Pyrenees long separated Iberia from France; Napoleon\'s 1808 invasion triggered the Peninsular War.' },
    ],
    'castilians': [
        { with: 'catalans', text: 'Recurring tension: the Catalan revolt of 1640, defeat in 1714, Franco\'s suppression of Catalan, and the 2017 independence crisis.' },
        { with: 'basques', text: 'ETA\'s violence ended in 2011; the Basque Country keeps strong fiscal autonomy.' },
        { with: 'portuguese', text: 'Briefly united (1580–1640) but historically wary; now close partners.' },
        { with: 'latin-americans', text: 'Former empire; Spanish America shares language and culture, with mixed feelings about conquest.' },
    ],
    'catalans': [
        { with: 'castilians', text: 'A long struggle over autonomy and language that peaked with the 2017 referendum.' },
        { with: 'french', text: 'Northern Catalonia (Roussillon) passed to France in 1659.' },
    ],
    'galicians': [
        { with: 'portuguese', text: 'Share a medieval language and maintain close cultural ties.' },
        { with: 'castilians', text: 'Galician nationalism is milder than Catalan or Basque.' },
    ],
    'portuguese': [
        { with: 'castilians', text: 'Portugal fought off Castile at Aljubarrota (1385) and regained independence in 1640.' },
        { with: 'brazilians', text: 'Brazil is now far bigger; Brazilians are the largest immigrant group in Portugal.' },
        { with: 'english', text: 'The 1386 Treaty of Windsor is the world\'s oldest alliance still in force.' },
    ],
    'gallo-romance': [
        { with: 'west-germanic', text: 'The Franco-German language line runs through Belgium, Switzerland and Alsace.' },
    ],
    'french': [
        { with: 'germans', text: 'Three wars from 1870 to 1945, then the core partnership of the EU.' },
        { with: 'english', text: 'The Hundred Years\' War and a long imperial rivalry, followed by the 1904 Entente Cordiale.' },
        { with: 'maghrebis', text: 'France ruled Algeria (1830–1962) and protectorates in Tunisia and Morocco; about 5 million French have Maghrebi roots, and the Algerian war still strains relations.' },
        { with: 'bretons', text: 'Breton and other regional languages were suppressed in schools for over a century.' },
    ],
    'quebecois': [
        { with: 'anglo-canadians', text: 'Language laws (Bill 101) and two referendums show a nation defending French in an English-speaking continent.' },
        { label: 'First Nations (Cree, Innu, Mohawk)', text: 'Hydroelectric projects and the 1990 Oka crisis caused major conflicts; the James Bay Agreement of 1975 was a landmark deal with the Cree.' },
    ],
    'romance-creoles': [
        { with: 'french', text: 'Martinique and Guadeloupe are part of France; slavery reparations and economic inequality are recurring issues.' },
        { with: 'caribbean-hispanics', text: 'Haiti and the Dominican Republic share Hispaniola uneasily: the 1937 Parsley Massacre killed thousands of Haitians, and Dominican deportations continue.' },
    ],
    'italians': [
        { with: 'germans', text: 'Allies and enemies in turn; South Tyrol\'s German speakers won autonomy after a 1960s bombing campaign.' },
        { with: 'slovenes', text: 'Fascist Italianization and postwar killings (the foibe) still shape memory in the northeast.' },
        { label: 'Libyans and Ethiopians', text: 'Italy\'s colonial wars in Libya and Ethiopia used poison gas; Italy apologized to Libya in 2008.' },
    ],
    'romanians': [
        { with: 'hungarians', text: 'Transylvania was Hungarian until 1920; its 1.2 million Hungarians push for autonomy in Székely Land.' },
        { with: 'russians', text: 'Russia took Bessarabia (Moldova) in 1812 and again in 1940; Moldova is still split over East versus West.' },
        { label: 'Roma', text: 'Romania has Europe\'s largest Roma population, enslaved until 1856 and still widely discriminated against.' },
    ],
    'latin-americans': [
        { with: 'americans', text: 'US interventions from 1898 onward and heavy migration north shape relations.' },
        { with: 'indigenous-americas', text: 'Indigenous peoples were conquered and mixed with; racism toward them persists, though Indigenous movements gained ground since the 1990s.' },
    ],
    'mexicans': [
        { with: 'americans', text: 'Lost Texas and the Southwest in 1836–48; today deeply integrated economies with tension over migration and cartels.' },
        { with: 'maya', text: 'The 1994 Zapatista uprising in Chiapas protested the marginalization of Maya peoples.' },
        { with: 'central-americans', text: 'Mexico is both a destination and transit route for Central American migrants.' },
    ],
    'central-americans': [
        { with: 'maya', text: 'In Guatemala, a ladino (mestizo) elite dominated Maya majorities; the civil war\'s army massacres were overwhelmingly against Maya villages.' },
        { with: 'americans', text: 'US-backed coups (Guatemala 1954) and the Contra war shaped the region; millions now live in the US.' },
    ],
    'caribbean-hispanics': [
        { with: 'americans', text: 'Puerto Rico is a US territory; Cuba\'s 1959 revolution led to six decades of US embargo.' },
        { with: 'romance-creoles', text: 'Dominicans and Haitians share the island of Hispaniola with long-standing mutual suspicion.' },
    ],
    'colombians-venezuelans': [
        { label: 'each other', text: 'Twin nations of Gran Colombia; about 3 million Venezuelans have resettled in Colombia since 2015.' },
        { with: 'amazonian', text: 'Indigenous Amazonian territories face illegal mining and armed groups.' },
    ],
    'andean-mestizos': [
        { with: 'quechua', text: 'Lima-based elites long marginalized the Quechua highlands; the Shining Path war and the 2022–23 protests exposed the divide.' },
        { with: 'aymara', text: 'Bolivia\'s lowland Santa Cruz mestizos clashed politically with the Aymara-led Morales government.' },
        { with: 'chileans', text: 'Peru and Bolivia lost coastal land to Chile in the War of the Pacific (1879–84); Bolivia is still landlocked.' },
    ],
    'chileans': [
        { label: 'Mapuche', text: 'The Mapuche resisted conquest until the 1880s; land conflict in Araucanía continues today.' },
        { with: 'rioplatenses', text: 'Nearly went to war with Argentina over the Beagle Channel in 1978; now close partners.' },
        { with: 'andean-mestizos', text: 'Rivalry with Peru and Bolivia since the War of the Pacific.' },
    ],
    'rioplatenses': [
        { with: 'english', text: 'Argentina lost the 1982 Falklands (Malvinas) War against Britain and still claims the islands.' },
        { with: 'brazilians', text: 'Historic rivals for influence in the River Plate, now Mercosur partners and fierce football rivals.' },
        { with: 'paraguayans', text: 'Argentina, Brazil and Uruguay devastated Paraguay in the 1864–70 war.' },
    ],
    'paraguayans': [
        { with: 'rioplatenses', text: 'The War of the Triple Alliance against Argentina, Brazil and Uruguay killed perhaps half of Paraguay\'s people.' },
        { with: 'andean-mestizos', text: 'Fought Bolivia in the Chaco War (1932–35) and won most of the disputed territory.' },
        { with: 'brazilians', text: 'Many Brazilian farmers ("brasiguayos") own land in eastern Paraguay.' },
    ],
    'brazilians': [
        { with: 'portuguese', text: 'Former colonizer; the Portuguese royal court moved to Rio in 1808.' },
        { with: 'amazonian', text: 'Deforestation, mining and ranching put pressure on Indigenous territories; the Yanomami suffered a humanitarian crisis in 2023.' },
        { with: 'rioplatenses', text: 'Friendly rivals, especially in football.' },
    ],

    'celtic': [
        { label: "Indo-European family", text: "Part of the Indo-European family: their language and those of most of Europe, Iran and northern India descend from Proto-Indo-European, spoken on the steppe north of the Black Sea about 6,000 years ago. The family is linguistic, not a shared identity or ancestry. Celtic lost the initial p, so Irish athair (father) matches Latin pater; Irish máthair and bráthair match English mother and brother, and Welsh tri matches three." },
        { with: 'germanic', text: 'Anglo-Saxons, Vikings and Normans pushed the Celts to the western edges of Britain and France.' },
    ],
    'irish': [
        { with: 'english', text: 'Centuries of conquest, penal laws and the Famine, then independence; relations are now warm despite Brexit strains.' },
        { with: 'scots', text: 'Close Gaelic kin; Scottish Protestant settlers in Ulster are the ancestors of Northern Ireland\'s unionists.' },
        { with: 'americans', text: 'About 30 million Americans claim Irish ancestry, a strong political bond.' },
    ],
    'scots': [
        { with: 'english', text: 'Wars of independence (1296–1357), union in 1707, and a 2014 referendum that kept Scotland in the UK.' },
        { with: 'irish', text: 'Gaelic cousins; sectarian Catholic–Protestant rivalry still echoes in Glasgow football.' },
    ],
    'welsh': [
        { with: 'english', text: 'Conquered in the 13th century; devolution since 1999 and a revived Welsh language define modern Wales.' },
        { with: 'bretons', text: 'Linguistic cousins; Breton and Welsh are partly mutually understandable.' },
    ],
    'bretons': [
        { with: 'french', text: 'The French state banned Breton in schools for generations; a revival movement now runs Diwan immersion schools.' },
        { with: 'welsh', text: 'Their ancestors came from Britain in the 5th–6th centuries; strong cultural ties persist.' },
    ],

    'greeks': [
        { label: "Indo-European family", text: "Part of the Indo-European family: their language and those of most of Europe, Iran and northern India descend from Proto-Indo-European, spoken on the steppe north of the Black Sea about 6,000 years ago. The family is linguistic, not a shared identity or ancestry. Greek forms its own branch: patēr, mētēr and treis match Latin pater, mater and tres, and Sanskrit pitṛ, mātṛ and trayas." },
        { with: 'turks', text: 'Four centuries of Ottoman rule, the 1821 independence war, the 1923 population exchange, and the 1974 Cyprus division; tension over the Aegean persists.' },
        { with: 'macedonians', text: 'A long name dispute settled in 2018.' },
        { with: 'albanians', text: 'Hundreds of thousands of Albanians migrated to Greece after 1991; a Greek minority lives in southern Albania.' },
    ],
    'albanians': [
        { label: "Indo-European family", text: "Part of the Indo-European family: their language and those of most of Europe, Iran and northern India descend from Proto-Indo-European, spoken on the steppe north of the Black Sea about 6,000 years ago. The family is linguistic, not a shared identity or ancestry. Albanian is a branch of its own, with no close relatives. Its words still fit the pattern: natë (night) matches Latin nox and English night, and motër (sister) comes from the old word for mother." },
        { with: 'serbs', text: 'Kosovo is the central conflict, from the 1998–99 war to today\'s unresolved recognition.' },
        { with: 'macedonians', text: 'Power-sharing since the 2001 Ohrid Agreement.' },
        { with: 'greeks', text: 'Large migration to Greece; disputes over Cham Albanians expelled from Greece in 1944–45.' },
        { with: 'italians', text: 'Italy invaded in 1939; the Arbëreshë are Albanians who settled in southern Italy in the 15th century.' },
    ],
    'baltic': [
        { label: "Indo-European family", text: "Part of the Indo-European family: their language and those of most of Europe, Iran and northern India descend from Proto-Indo-European, spoken on the steppe north of the Black Sea about 6,000 years ago. The family is linguistic, not a shared identity or ancestry. Lithuanian is famous for keeping very old forms: sūnus (son) and dievas (god) are almost identical to Sanskrit sūnu and deva. The nearest relatives are the Slavic languages." },
        { with: 'russians', text: 'Annexed by the USSR in 1940 with mass deportations; Russian minorities and Russian pressure remain major concerns.' },
        { with: 'germans', text: 'Baltic German nobles dominated Latvia and Estonia for seven centuries until 1939.' },
    ],
    'lithuanians': [
        { with: 'poles', text: 'United for centuries, then rivals over Vilnius; a Polish minority of about 6% remains.' },
        { with: 'belarusians', text: 'Shared Grand Duchy heritage; Lithuania hosts Belarusian opposition exiles.' },
        { with: 'russians', text: 'Soviet deportations and the 1991 Vilnius crackdown, when Soviet troops killed 14 civilians.' },
    ],
    'latvians': [
        { with: 'russians', text: 'Russians are about a quarter of Latvia; many lacked citizenship after 1991, and Russian-language schools are being phased out.' },
        { with: 'estonians', text: 'Close neighbours despite unrelated languages.' },
    ],
    'armenians': [
        { label: "Indo-European family", text: "Part of the Indo-European family: their language and those of most of Europe, Iran and northern India descend from Proto-Indo-European, spoken on the steppe north of the Black Sea about 6,000 years ago. The family is linguistic, not a shared identity or ancestry. Armenian is a branch of its own: hayr, mayr and eġbayr (father, mother, brother) are regular descendants of the same words as Latin pater, mater and frater." },
        { with: 'turks', text: 'The 1915 genocide, which Türkiye denies, defines the relationship; the border has been closed since 1993.' },
        { with: 'azerbaijanis', text: 'Wars over Nagorno-Karabakh (1988–94, 2020, 2023) ended with the flight of its Armenian population.' },
        { with: 'georgians', text: 'Friendly Christian neighbours; an Armenian minority lives in southern Georgia.' },
        { with: 'persians', text: 'Iran is a friendly neighbour with an old Armenian community in Isfahan.' },
    ],

    'iranian': [
        { label: "Indo-European family", text: "Part of the Indo-European family: their language and those of most of Europe, Iran and northern India descend from Proto-Indo-European, spoken on the steppe north of the Black Sea about 6,000 years ago. The family is linguistic, not a shared identity or ancestry. Iranian is the sister branch of Indo-Aryan: Persian pedar, mādar and barādar (father, mother, brother) match Sanskrit pitṛ, mātṛ and bhrātṛ, and English father, mother and brother." },
        { with: 'arabs', text: 'The 7th-century Arab conquest Islamized Iran; the modern Saudi–Iran rivalry adds a Sunni–Shia layer.' },
        { with: 'turkic', text: 'Turkic dynasties ruled Iran for about 900 years, and Azerbaijanis are deeply woven into Iranian society.' },
        { with: 'indo-aryan', text: 'Persian was the court language of Mughal India for three centuries.' },
    ],
    'persians': [
        { with: 'arabs', text: 'An old rivalry, from the Arab conquest to the 1980–88 Iran–Iraq war and today\'s competition with Saudi Arabia.' },
        { with: 'azerbaijanis', text: 'Iran\'s largest minority is well integrated (the Supreme Leader is part-Azeri), but language rights are a sore point.' },
        { with: 'kurds', text: 'Iranian Kurds face repression; Kurdish areas led the 2022 "Woman, Life, Freedom" protests after Mahsa Amini\'s death.' },
        { with: 'baloch', text: 'Sistan-Baluchestan is Iran\'s poorest province, with a Sunni insurgency and heavy executions.' },
        { with: 'tajiks', text: 'Share language and culture; Tajiks see Persian poets like Rumi and Ferdowsi as their own.' },
    ],
    'kurds': [
        { with: 'turks', text: 'Türkiye denied Kurdish identity for decades; the PKK insurgency since 1984 has killed about 40,000. The PKK announced its dissolution in 2025.' },
        { with: 'mesopotamian-arabs', text: 'Saddam\'s Anfal campaign killed tens of thousands; Iraqi Kurdistan has been autonomous since 1991, with disputes over Kirkuk and oil.' },
        { with: 'persians', text: 'Repression of Kurdish parties in Iran; Kurds were central to the 2022 protests.' },
        { with: 'levantine-arabs', text: 'In Syria, Kurdish-led forces ran the northeast after 2012 and fought ISIS; their future under the new Syrian government is contested.' },
    ],
    'pashtuns': [
        { with: 'tajiks', text: 'The main rivalry in Afghan politics: Pashtun kings and the Taliban versus the Tajik-led Northern Alliance.' },
        { with: 'hazaras', text: 'Pashtun rulers seized Hazara lands in the 1890s; the Taliban killed Hazaras in 1998 and Hazaras face renewed persecution.' },
        { with: 'punjabis', text: 'In Pakistan, Pashtuns resent Punjabi-dominated military operations in the tribal areas.' },
    ],
    'tajiks': [
        { with: 'pashtuns', text: 'Long contest for power in Afghanistan; Tajiks led resistance against the Taliban.' },
        { with: 'uzbeks', text: 'Samarkand and Bukhara are historically Tajik-speaking but were given to Uzbekistan in 1924; relations warmed after 2016.' },
        { with: 'kyrgyz', text: 'Border clashes in 2021 and 2022 killed about 100 people; a 2025 border treaty eased tensions.' },
    ],
    'baloch': [
        { with: 'punjabis', text: 'Baloch nationalists accuse the Punjabi-led state of exploiting their gas and minerals; insurgents attack Punjabi workers and Chinese projects.' },
        { with: 'persians', text: 'Iranian Baloch are a repressed Sunni minority.' },
        { with: 'pashtuns', text: 'Share Pakistan\'s Balochistan province, with competition over power and land.' },
    ],
    'lurs': [
        { with: 'persians', text: 'Closely related and largely integrated into Iranian national life.' },
        { with: 'kurds', text: 'Some Lurs are considered Kurds by Kurdish nationalists; Lurs themselves mostly reject this.' },
    ],
    'hazaras': [
        { with: 'pashtuns', text: 'Persecuted under Abdur Rahman in the 1890s and by the Taliban, who blew up the Bamiyan Buddhas in Hazara country in 2001.' },
        { with: 'persians', text: 'Many fled to Iran, where Hazara refugees face discrimination.' },
    ],
    'ossetians': [
        { with: 'georgians', text: 'South Ossetia broke from Georgia in 1991–92; the 2008 war ended with Russian recognition of its independence.' },
        { with: 'chechens-ingush', text: 'North Ossetia and Ingushetia fought over the Prigorodny district in 1992; the 2004 Beslan school siege took place in North Ossetia.' },
        { with: 'russians', text: 'Strongly pro-Russian, with deep ties to the Russian army.' },
    ],

    'indo-aryan': [
        { label: "Indo-European family", text: "Part of the Indo-European family: their language and those of most of Europe, Iran and northern India descend from Proto-Indo-European, spoken on the steppe north of the Black Sea about 6,000 years ago. The family is linguistic, not a shared identity or ancestry. Hindi bhāī (brother) and nām (name) come from Sanskrit bhrātṛ and nāman, the same words as English brother and name; Sanskrit's resemblance to Latin and Greek is how the family was discovered in the 1780s." },
        { with: 'dravidian', text: 'North–south tensions over Hindi imposition and federal funding; Tamil Nadu has resisted Hindi since the 1960s.' },
        { with: 'iranian', text: 'Persian and Central Asian dynasties ruled north India for centuries.' },
        { with: 'tibeto-burman-hills', text: 'Northeast India\'s hill peoples have long resisted rule from Delhi.' },
    ],
    'hindustanis': [
        { with: 'tamils', text: 'Tamil Nadu has resisted Hindi as a national language since the 1965 anti-Hindi riots.' },
        { with: 'bengalis', text: 'Bengal\'s intellectual tradition and the Hindi belt\'s political dominance are a long-running rivalry within India.' },
        { label: 'Indian Muslims', text: 'Hindu–Muslim relations, shaped by Partition and riots such as Gujarat 2002, are the deepest fault line in the Hindi heartland.' },
    ],
    'bengalis': [
        { with: 'punjabis', text: 'West Pakistan\'s Punjabi-dominated army killed hundreds of thousands in 1971, leading to Bangladesh\'s independence.' },
        { with: 'assamese', text: 'Migration from Bangladesh into Assam has caused violence and citizenship disputes.' },
        { with: 'burmans', text: 'About 1 million Rohingya refugees from Myanmar live in camps in Bangladesh.' },
    ],
    'punjabis': [
        { with: 'bengalis', text: 'The 1971 war split Pakistan; Bangladesh still seeks an apology for wartime atrocities.' },
        { with: 'sindhis', text: 'Sindhis resent Punjabi control of Indus water and the army.' },
        { with: 'hindustanis', text: 'Sikh separatism in the 1980s ended with Operation Blue Star (1984) and anti-Sikh riots in Delhi that killed thousands.' },
    ],
    'marathis': [
        { with: 'gujaratis', text: 'Bombay State was split into Maharashtra and Gujarat in 1960 after protests; Mumbai went to Maharashtra.' },
        { with: 'kannadigas', text: 'A long-running border dispute over Belagavi.' },
        { with: 'hindustanis', text: 'Nativist parties like the Shiv Sena have campaigned against migrants from the north.' },
    ],
    'gujaratis': [
        { with: 'marathis', text: 'Partners and rivals in Mumbai\'s business world.' },
        { with: 'sindhis', text: 'Kutch and Sindh share trading links across the India–Pakistan border.' },
    ],
    'odias': [
        { with: 'telugus', text: 'Border disputes over villages in the Kotia hills.' },
        { with: 'bengalis', text: 'Odia identity grew partly in reaction to Bengali cultural dominance in the 19th century.' },
    ],
    'sindhis': [
        { with: 'punjabis', text: 'Disputes over water, dams and power within Pakistan.' },
        { label: 'Muhajirs', text: 'Urdu-speaking migrants from India dominate Karachi, a source of ethnic politics and 1990s violence.' },
    ],
    'assamese': [
        { with: 'bengalis', text: 'The 1979–85 Assam Movement against migrants, and the 2019 citizenship register that excluded about 1.9 million people.' },
        { with: 'kuki-chin-naga', text: 'Border disputes with Nagaland and Mizoram, including a deadly police clash in 2021.' },
    ],
    'nepalis': [
        { with: 'hindustanis', text: 'Open border with India; Nepal\'s plains people (Madhesis) share culture with Bihar, and a 2015 Indian blockade angered Nepal.' },
        { with: 'tibetans', text: 'Sherpas and other highland groups are of Tibetan origin; Nepal hosts Tibetan refugees but limits their activism under Chinese pressure.' },
        { label: 'Lhotshampa', text: 'Bhutan expelled about 100,000 Nepali-speaking Lhotshampa in the early 1990s.' },
    ],
    'sinhalese': [
        { with: 'tamils', text: 'Sinhala nationalism and Tamil separatism fueled the 1983–2009 civil war; reconciliation remains incomplete.' },
        { label: 'Sri Lankan Muslims', text: 'Anti-Muslim riots in 2014 and 2018 and backlash after the 2019 Easter bombings.' },
    ],
    'dardic': [
        { with: 'hindustanis', text: 'India revoked Jammu and Kashmir\'s autonomy in 2019; the valley has faced insurgency and heavy security since 1989.' },
        { with: 'punjabis', text: 'Pakistan controls Azad Kashmir and Gilgit-Baltistan and backs militants in Indian Kashmir, by India\'s account.' },
        { with: 'tibetans', text: 'Muslim Kashmiris and Buddhist Ladakhis were split into separate territories in 2019.' },
    ],
}
