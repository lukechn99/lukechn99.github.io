/**
 * What each shared event meant for each group that links to it: shown on the event card
 * for the group being viewed. Keys: event id → group id → one or two sentences.
 */
export const PERSPECTIVES: Record<string, Record<string, string>> = {
    "fall-of-kazan": {
        "russians": "The first conquest of a Muslim khanate, celebrated with St Basil's Cathedral on Red Square; it turned Muscovy into a multi-ethnic empire.",
        "volga-turks": "The end of Tatar independence; Tatars mark 15 October as a day of remembrance for the city's defenders.",
    },
    "crimean-tatar-deportation": {
        "ukrainians": "Ukraine recognizes the deportation as genocide, and Crimean Tatars became Kyiv's allies against the 2014 annexation.",
        "volga-turks": "A shared Tatar trauma; Volga Tatars, spared mass deportation, remember it as a warning of what Moscow could do.",
    },
    "chechen-deportation": {
        "russians": "Officially a punishment for alleged collaboration with Germany; in Russian memory it is rarely discussed.",
        "chechens-ingush": "Ardakh, \"the exile\": the defining trauma of modern Chechen and Ingush identity, commemorated every 23 February.",
    },
    "sudetenland": {
        "west-slavic": "The 1938 Munich deal sacrificed Czechoslovakia; the postwar expulsions ended seven centuries of German settlement among the West Slavs.",
        "czechs": "Munich is remembered as betrayal by the Western allies; the expulsions, ordered by the Beneš decrees, are still debated.",
        "germans": "Expellees and their descendants became a political force in West Germany; Germany and Czechia formally reconciled in 1997.",
    },
    "auschwitz": {
        "poles": "Built on occupied Polish soil, where the Nazis also murdered tens of thousands of non-Jewish Poles; the camp is now a state museum.",
        "germans": "The centre of German remembrance: Holocaust education is mandatory, and 27 January, the camp's liberation, is a day of commemoration.",
        "jews": "The largest site of the Shoah, in which about a third of the world's Jews were murdered; it shaped the founding of Israel and Jewish life since.",
    },
    "trianon": {
        "romanians": "The completion of national unification, celebrated on 1 December, Romania's national day.",
        "hungarians": "A national trauma: 4 June is the Day of National Unity, and maps of \"Greater Hungary\" are still common.",
    },
    "srebrenica": {
        "serbs": "Serbia's parliament condemned the crime in 2010, but many Serbs reject the word genocide, and convicted commanders are honoured by some.",
        "bosniaks": "The core of Bosniak memory; the dead are buried at the Potočari memorial, with new remains interred every 11 July.",
    },
    "ohrid": {
        "macedonians": "Accepted to end the fighting, though many Macedonians saw it as concessions under pressure.",
        "albanians": "Won Albanian official status, university education and a share of power in North Macedonia.",
    },
    "prespa": {
        "macedonians": "Opened the way to NATO and EU talks, at the price of the name \"North Macedonia\", which many resented.",
        "greeks": "Divisive in Greece, where many felt the name Macedonia belongs to Greek heritage; the government that signed it lost the next election.",
    },
    "trieste": {
        "slovenes": "Slovenes remember Fascist persecution and the loss of Trieste, a city with a large Slovene population.",
        "italians": "Italy marks 10 February, the Day of Remembrance, for the foibe victims and the 250,000–350,000 Italians who left Istria and Dalmatia.",
    },
    "constantinople-1453": {
        "greeks": "The end of Byzantium and the start of four centuries of Ottoman rule; Tuesday is still considered an unlucky day.",
        "turks": "A founding triumph: Mehmed II became \"the Conqueror\" and Istanbul the imperial capital; 29 May is celebrated in Türkiye.",
    },
    "population-exchange": {
        "greeks": "Refugees from Asia Minor doubled some cities, brought rebetiko music and dishes from Smyrna, and ended 3,000 years of Greek life in Anatolia.",
        "turks": "Muslims from Greece resettled in Anatolia helped build the new republic; many families still recall villages in Thessaloniki or Crete.",
    },
    "cyprus-green-line": {
        "greeks": "Remembered as invasion and occupation; about 160,000 Greek Cypriots lost their homes in the north.",
        "turks": "Remembered as a peace operation that protected Turkish Cypriots; only Türkiye recognizes the northern republic.",
    },
    "armenian-genocide": {
        "armenians": "Medz Yeghern, \"the Great Crime\", commemorated every 24 April; it scattered Armenians into a worldwide diaspora.",
        "turks": "Türkiye accepts that many Armenians died but rejects the term genocide, calling it wartime deportation and mutual suffering.",
        "levantine-arabs": "Syrian and Lebanese towns sheltered survivors, and Arab Bedouin sometimes rescued children from the death marches.",
    },
    "nagorno-karabakh": {
        "armenians": "Artsakh was a historic Armenian heartland; its loss in 2023 and the flight of its people are felt as a national catastrophe.",
        "turks": "Türkiye backed Azerbaijan with drones and political support, seeing the victory as its own.",
        "azerbaijanis": "The return of internationally recognized territory and of about 600,000 people displaced in the 1990s, celebrated as Victory Day.",
    },
    "war-2008": {
        "ossetians": "Celebrated as liberation by Russia, which recognized South Ossetia's independence.",
        "georgians": "Remembered as a Russian invasion; a fifth of Georgia's territory remains outside its control.",
    },
    "abkhazia-war": {
        "georgians": "About 200,000 Georgians were driven from Abkhazia and most remain displaced.",
        "circassians-abkhaz": "Celebrated by Abkhaz as their war of independence, won with help from North Caucasus volunteers.",
    },
    "hastings": {
        "english": "The Normans replaced the English elite and flooded English with French words; it was the last successful invasion of England.",
        "french": "A Norman duke became king of England, beginning centuries in which English kings also ruled lands in France.",
    },
    "conquest-of-wales": {
        "english": "Edward I added Wales to the English crown and made his son the first English Prince of Wales.",
        "welsh": "The end of Welsh independence; Edward's castles became symbols of conquest, and later World Heritage Sites.",
    },
    "union-1707": {
        "english": "Secured the northern border and created Great Britain, the base of the British Empire.",
        "scots": "Gave Scots access to imperial trade but ended their parliament, \"bought and sold for English gold\" in Burns's phrase; Scotland's parliament returned in 1999.",
    },
    "irish-famine": {
        "english": "Many British officials saw it as a natural disaster; London's slow, ideological response is now widely judged a failure.",
        "irish": "An Gorta Mór, \"the Great Hunger\", halved the population through death and emigration and fed a century of nationalism.",
    },
    "fall-of-granada": {
        "romance": "Completed the Christian conquest of Iberia and, in the same year, launched Columbus toward the Americas.",
        "iberian": "The end of the Reconquista, a founding myth of Spain; al-Andalus also left thousands of Arabic words in Spanish and Portuguese.",
        "maghrebis": "Andalusi refugees settled in Fez, Tetouan, Tlemcen and Tunis, bringing music, cuisine and family names still proud of their origin.",
        "jews": "Followed within months by the expulsion of Spain's Jews, the end of Sephardi life in Spain and the start of its diaspora.",
    },
    "winter-war": {
        "east-slavic": "For the USSR a costly war against a small neighbour that exposed the Red Army's weakness.",
        "finns": "The \"Winter War spirit\" of national unity is a founding memory; Finland kept its independence at the price of Karelia.",
    },
    "kirkuk": {
        "kurds": "Called \"the Kurdish Jerusalem\"; Saddam's Arabization drove Kurds out, and the 2017 loss of the city was a bitter blow.",
        "mesopotamian-arabs": "Baghdad sees Kirkuk and its oil as Iraqi, and Arab residents resist Kurdish rule.",
    },
    "iran-iraq-war": {
        "persians": "The \"Sacred Defence\": Iran repelled the invasion at enormous cost, and the war's martyrs are honoured everywhere.",
        "mesopotamian-arabs": "Saddam presented it as an Arab war against Persia; Iraqi Shia were forced to fight fellow Shia.",
    },
    "gaza": {
        "levantine-arabs": "For Palestinians, the deadliest war in their history and a new Nakba; most of Gaza's people were displaced.",
        "jews": "For Israelis, 7 October was the deadliest day for Jews since the Holocaust; the war has divided Israel and its allies.",
    },
    "aswan-dam": {
        "egyptians": "Nasser's symbol of modern Egypt: it ended the Nile's floods and brought electricity.",
        "nubians": "Flooded Old Nubia and forced about 100,000 Nubians to resettle; the right to return is a long-standing demand.",
    },
    "algerian-war": {
        "french": "For decades \"the events in Algeria\"; France officially called it a war only in 1999 and still debates torture and the harkis.",
        "maghrebis": "Algeria's war of independence, said to have cost \"a million and a half martyrs\", is the foundation of the Algerian state.",
    },
    "silk-road": {
        "persians": "Persian became the trade language of the routes, and Iranian cities like Nishapur and Rey grew rich on the caravan trade.",
        "tajiks": "Their Sogdian ancestors were the Silk Road's great middlemen, and Sogdian was its lingua franca before Persian.",
        "han": "Silk, paper and porcelain went west, while Buddhism, horses and grapes came east; the route is now the namesake of China's Belt and Road.",
        "turkic": "Turkic khaganates controlled and taxed the steppe routes and moved west along them toward Anatolia.",
        "karluk": "Their oasis cities were the caravan stops, which is why the Karluk Turks are town-dwellers rather than nomads.",
        "uzbeks": "Samarkand, Bukhara and Khiva are Silk Road cities, now the centre of Uzbekistan's heritage and tourism.",
        "uyghurs": "Kashgar, Turpan and Khotan were key oasis stops, where Buddhism and later Islam reached the Uyghurs.",
        "mongols": "The Mongol Empire put the whole route under one rule for a century, the Pax Mongolica.",
    },
    "great-wall": {
        "han": "A symbol of Chinese civilization and endurance; the national anthem calls on the people to build \"a new Great Wall\" with their flesh and blood.",
        "mongols": "Built to keep their ancestors out; it largely failed, since Mongols and later the Manchus ruled all of China.",
    },
    "partition": {
        "hindustanis": "Delhi took in hundreds of thousands of refugees from Punjab; Partition shaped Hindu–Muslim politics ever since.",
        "bengalis": "Divided Bengal for the second time, after a failed British split in 1905; the east became Pakistan, then Bangladesh.",
        "punjabis": "Punjab bore the worst of the killing; families on both sides still tell of villages left behind.",
        "sindhis": "Most Sindhi Hindus left for India, and Urdu-speaking refugees transformed Karachi.",
    },
    "bangladesh-1971": {
        "bengalis": "The Liberation War, remembered for the killing of Bengali intellectuals and the language-based nationalism that won independence.",
        "punjabis": "For Pakistan, the loss of its east wing and its largest military defeat, rarely discussed openly.",
    },
    "kutupalong": {
        "bengalis": "Bangladesh took in about a million Rohingya; the camps strain the Cox's Bazar area, and repatriation has stalled.",
        "burmans": "Myanmar's army calls the 2017 operations counter-insurgency; the UN and others call them ethnic cleansing.",
    },
    "kaveri": {
        "tamils": "The river feeds the Tamil delta's rice fields; Tamil Nadu depends on water released upstream.",
        "kannadigas": "Bangalore and Karnataka's farms rely on the same water, and court rulings to release it spark protests.",
    },
    "black-july": {
        "sinhalese": "A dark episode that drove many Tamils to the insurgency; Sri Lankan governments have since acknowledged it.",
        "tamils": "The trigger for mass emigration and the Tamil diaspora; remembered every July.",
    },
    "samarkand-bukhara": {
        "tajiks": "Historic centres of Persian-speaking culture, now inside Uzbekistan; many Tajiks feel they were taken in 1924.",
        "karluk": "Their great cities, where Turkic and Persian cultures fused under the Samanids and Timurids.",
        "uzbeks": "Jewels of Uzbekistan's heritage, and Timur's Samarkand is the heart of Uzbek national pride.",
    },
    "osh": {
        "kyrgyz": "The Kyrgyz government blamed outside provocation and Uzbek separatism; few were held accountable.",
        "uzbeks": "Uzbeks suffered most of the deaths and destroyed homes, and many left Kyrgyzstan afterward.",
    },
    "nanjing": {
        "han": "A central symbol of Japan's wartime aggression, commemorated on 13 December as a national memorial day.",
        "japanese": "Officially acknowledged, but the death toll and scale are contested by Japanese nationalists, a recurring diplomatic sore point.",
    },
    "okinawa-1945": {
        "japanese": "Remembered as a heroic last stand that delayed invasion of the main islands.",
        "ryukyuans": "Remembered as Okinawa sacrificed for Tokyo, with civilians pushed into mass suicide; Okinawa marks 23 June as Memorial Day.",
    },
    "korean-dmz": {
        "han": "China calls its role \"the War to Resist America and Aid Korea\" and treats it as a victory.",
        "koreans": "Divided families and a peninsula still technically at war; the DMZ is the scar of the Korean War.",
    },
    "ayutthaya": {
        "burmans": "A high point of Konbaung military power, though Burma held Siam only briefly.",
        "thai": "The great national trauma, and the reason Bangkok became the capital; Thai films and textbooks still cast Burma as the old enemy.",
    },
    "dien-bien-phu": {
        "french": "A humiliating defeat that ended French Indochina and hastened decolonization elsewhere, including Algeria.",
        "vietnamese": "A national triumph of General Võ Nguyên Giáp, celebrated on 7 May as proof a colonized people could win.",
    },
    "preah-vihear": {
        "khmer": "A sacred symbol of Khmer civilization, confirmed as Cambodian by the World Court.",
        "thai": "Many Thais believe the temple was wrongly given away; nationalist protests helped cause the 2008 clashes.",
    },
    "panglong": {
        "burmans": "Celebrated as Union Day, 12 February, the founding of a united Burma.",
        "shan": "Remembered as a promise of equality and the right to secede that the military broke.",
    },
    "biafra": {
        "hausa": "For northern Nigerians, a war to keep the country together after the 1966 coups.",
        "igbo": "A genocide in Igbo memory, with famine killing children by the hundreds of thousands; it still shapes Igbo politics.",
    },
    "sokoto": {
        "hausa": "The Hausa states became emirates under Fulani rulers, and Islam and Hausa culture spread together across the north.",
        "fulani": "Usman dan Fodio's jihad is the Fulani's founding achievement; the Sultan of Sokoto remains Nigeria's Muslim leader.",
    },
    "oyo-dahomey": {
        "yoruba": "Oyo was the greatest Yoruba state, and its fall in the 1830s led to wars that sent many Yoruba into the slave trade.",
        "gbe": "Dahomey paid tribute to Oyo for nearly a century before throwing it off; its armies included the famous women soldiers.",
    },
    "anglophone-crisis": {
        "equatorial-bantu": "For Cameroon's Francophone-led government, a separatist threat to national unity.",
        "grassfields": "For Anglophones, the result of decades of marginalization since the 1961 union; thousands killed and hundreds of thousands displaced.",
    },
    "ogaden-war": {
        "amhara": "Ethiopia's defence of its territory, with Soviet and Cuban help.",
        "somalis": "A failed attempt to unite Greater Somalia; the defeat helped bring down Siad Barre's regime and the Somali state.",
    },
    "tigray-war": {
        "amhara": "Amhara forces took western Tigray, which they consider historically Amhara land.",
        "tigrinya": "Tigrayans suffered siege, famine and massacres; many call it genocide.",
        "afar": "Fighting spread into the Afar region, displacing hundreds of thousands.",
    },
    "gerd": {
        "egyptians": "Seen as an existential threat to the Nile, which supplies nearly all of Egypt's water.",
        "amhara": "Built with public bonds and celebrated as Ethiopia's path out of poverty.",
    },
    "darfur": {
        "sudanic-arabs": "Arab militias were recruited by Khartoum; many Darfuri Arabs themselves were also poor herders drawn into the war.",
        "darfur": "For the Fur, Masalit and Zaghawa, two genocides within twenty years.",
    },
    "gukurahundi": {
        "nguni": "The Ndebele still demand acknowledgement and justice for the massacres in Matabeleland.",
        "shona": "Carried out by a Shona-dominated army under Mugabe, it is rarely discussed in the Shona heartland.",
    },
    "waitangi": {
        "australians-nzers": "Called New Zealand's founding document; 6 February, Waitangi Day, is the national day.",
        "polynesians": "For Māori, a partnership the Crown broke; Waitangi Tribunal settlements have returned land and money.",
    },
    "trail-of-tears": {
        "americans": "Andrew Jackson's removal policy opened the Southeast to cotton farming and slavery.",
        "upland-southerners": "Their ancestors moved onto Cherokee and Creek land; many Southern families claim a Cherokee ancestor.",
        "oklahoma-nations": "The founding trauma of the Oklahoma nations, which rebuilt their governments in Indian Territory.",
    },
    "dakota-war": {
        "nordic-americans": "Several hundred settlers, many of them Scandinavian and German immigrants, were killed in the first weeks of fighting.",
        "plains-nations": "Ended with the mass hanging and the Dakota's expulsion from Minnesota.",
    },
    "mexican-cession": {
        "americans": "Manifest Destiny fulfilled: California, the Southwest and its gold made the US a continental power.",
        "mexicans": "The loss of half the national territory, remembered with the Niños Héroes who died defending Chapultepec.",
        "mexican-americans": "\"We didn't cross the border, the border crossed us\": the origin of Mexican Americans as a people.",
    },
    "zapatista": {
        "mexicans": "A shock to the government on NAFTA's first day that forced Indigenous rights onto the national agenda.",
        "maya": "Maya communities in Chiapas won autonomy and worldwide attention.",
    },
    "guatemala-genocide": {
        "central-americans": "Guatemala's truth commission found the army responsible for most of the 200,000 deaths of the civil war.",
        "maya": "Over 600 Maya villages were destroyed; survivors have pursued justice through the courts.",
    },
    "war-of-the-pacific": {
        "andean-mestizos": "Peru's defeat and the occupation of Lima are a national wound.",
        "chileans": "A victory that gave Chile its nitrate and copper wealth; 21 May, the Battle of Iquique, is a national holiday.",
        "aymara": "Bolivia lost its coast and became landlocked; the claim to the sea is in its constitution.",
    },
    "triple-alliance": {
        "rioplatenses": "Argentina and Uruguay joined Brazil against Paraguay; the war is little remembered in Argentina today.",
        "paraguayans": "A near-annihilation in which a large share of the population died; Mariscal López is a national hero.",
        "brazilians": "Brazil fought most of the war; it boosted the army's role in politics, leading to the 1889 republic.",
    },
}
