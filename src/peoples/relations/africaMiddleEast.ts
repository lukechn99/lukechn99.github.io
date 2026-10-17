import type { RelationsMap } from './types.ts'

export const africaMiddleEastRelations: RelationsMap = {
    'afro-asiatic': [
        { with: 'indo-european', text: 'From the Persian–Arab wars to crusades and European colonialism, the longest-running cross-family rivalry in the Old World.' },
        { with: 'niger-congo', text: 'Along the Sahel, Arab and Berber herders and traders met Black African farmers through trade, Islam and the trans-Saharan slave trade.' },
        { with: 'turkic', text: 'The Ottomans ruled most Arab lands from 1516 to 1918.' },
    ],
    'semitic': [
        { with: 'iranian', text: 'Arab–Persian rivalry, now framed as Saudi Arabia versus Iran.' },
        { with: 'cushitic', text: 'Ethiopia\'s Semitic highlanders long ruled Cushitic Oromo and Somali lowlands.' },
    ],
    'arabs': [
        { with: 'persians', text: 'Rivalry since the Arab conquest of Iran, sharpened by the Sunni–Shia split and today\'s Saudi–Iran contest.' },
        { with: 'jews', text: 'The Arab–Israeli conflict since 1948, including the Palestinian question; some Arab states have normalized ties since 2020.' },
        { with: 'kurds', text: 'Arabization campaigns in Iraq and Syria targeted Kurdish areas.' },
        { with: 'berbers', text: 'Most North Africans are Arabized Berbers; Amazigh activists push for recognition.' },
    ],
    'gulf-arabs': [
        { with: 'persians', text: 'Rivalry across the Gulf over power and religion; Saudi Arabia and Iran restored ties in 2023.' },
        { with: 'malayalis', text: 'Migrant workers from South Asia, often under the restrictive kafala system, outnumber citizens in several Gulf states.' },
        { label: 'each other', text: 'Rival monarchies: Saudi Arabia and its allies blockaded Qatar from 2017 to 2021; Yemen\'s war pits the Houthis against a Saudi-led coalition.' },
    ],
    'levantine-arabs': [
        { with: 'jews', text: 'The Israeli–Palestinian conflict, from 1948 to the Gaza war that began in October 2023.' },
        { with: 'kurds', text: 'Syria denied citizenship to many Kurds; Kurdish-led forces ran the northeast after 2012.' },
        { with: 'turks', text: 'Türkiye hosted about 3 million Syrian refugees and backs factions in northern Syria.' },
        { label: 'Alawites and Druze', text: 'After Assad\'s fall in December 2024, sectarian killings of Alawites and Druze in 2025 raised fears about minority safety.' },
    ],
    'mesopotamian-arabs': [
        { with: 'kurds', text: 'Disputes over Kirkuk, oil revenue and the 2017 Kurdish independence referendum.' },
        { with: 'persians', text: 'The 1980–88 Iran–Iraq war killed hundreds of thousands; Iran now has great influence among Iraqi Shia.' },
        { label: 'Sunni and Shia Arabs', text: 'Sectarian civil war after 2003 and the rise of ISIS in Sunni areas in 2014.' },
    ],
    'egyptians': [
        { with: 'jews', text: 'Four wars with Israel, then the 1979 peace treaty, the first between Israel and an Arab state.' },
        { with: 'nubians', text: 'Nubians displaced by the Aswan High Dam still seek to return to their land along Lake Nasser.' },
        { with: 'amhara', text: 'A tense dispute with Ethiopia over the Grand Ethiopian Renaissance Dam on the Nile.' },
    ],
    'maghrebis': [
        { with: 'french', text: 'The Algerian war of independence (1954–62) killed hundreds of thousands; migration and memory still strain relations.' },
        { with: 'amazigh', text: 'Shared ancestry; Arabization policies after independence sidelined Berber languages until recent recognition.' },
        { label: 'Sahrawis', text: 'Morocco and the Polisario Front dispute Western Sahara; Algeria backs Polisario, keeping Morocco–Algeria relations frozen.' },
    ],
    'sudanic-arabs': [
        { with: 'darfur', text: 'Arab militias (Janjaweed, then the RSF) waged campaigns against non-Arab Darfuris in 2003 and since 2023.' },
        { with: 'nilotes-sudan', text: 'Two civil wars (1955–72, 1983–2005) with the south led to South Sudan\'s independence in 2011.' },
        { with: 'sara', text: 'Chad\'s Arab and northern groups and the southern Sara have fought for control of the state.' },
    ],
    'jews': [
        { with: 'levantine-arabs', text: 'The central conflict over the same land; Arab citizens of Israel are about a fifth of its population.' },
        { with: 'germans', text: 'Holocaust memory and reparations led to close postwar relations.' },
        { with: 'persians', text: 'Iran was an ally before 1979; since then a sworn enemy, culminating in direct strikes in 2024 and 2025.' },
    ],
    'ethio-semitic': [
        { with: 'cushitic', text: 'Highland empires expanded south and east in the late 19th century, ruling Oromo, Somali and southern peoples.' },
    ],
    'amhara': [
        { with: 'oromo', text: 'Oromo nationalism grew against Amhara-led imperial rule; land disputes and killings continue in border areas.' },
        { with: 'tigrinya', text: 'Allied against Tigray\'s forces in the 2020–22 war, and in dispute over western Tigray.' },
        { with: 'egyptians', text: 'Ethiopia\'s Nile dam is a point of national pride and a dispute with Egypt.' },
    ],
    'tigrinya': [
        { with: 'amhara', text: 'Rivals for control of Ethiopia; Tigrayan leaders dominated the government from 1991 to 2018.' },
        { label: 'Eritreans and Tigrayans', text: 'Same language, but the 1998–2000 border war and Eritrean troops\' role in the Tigray war divide them.' },
    ],
    'maltese': [
        { with: 'italians', text: 'Close cultural ties to Sicily; Italian was an official language until 1934.' },
        { with: 'maghrebis', text: 'The language is Arabic in origin, but Maltese identity is firmly Catholic and European.' },
    ],
    'berbers': [
        { with: 'arabs', text: 'Arabization over 13 centuries; the Amazigh cultural movement has won official recognition in Morocco and Algeria.' },
    ],
    'amazigh': [
        { with: 'maghrebis', text: 'Kabyle protests in 1980 and 2001 against Arabization; Morocco made Tamazight official in 2011.' },
        { with: 'french', text: 'Many Kabyles migrated to France; colonial "Kabyle myth" policies tried to set Berbers against Arabs.' },
    ],
    'tuareg': [
        { with: 'mande', text: 'Repeated rebellions against Mali\'s southern-led government, most recently 2012 and renewed fighting since 2023.' },
        { with: 'songhai-zarma', text: 'Old rivalry along the Niger bend, sometimes violent.' },
        { label: 'Jihadist groups', text: 'Some Tuareg factions allied with, then fought, al-Qaeda-linked groups in northern Mali.' },
    ],
    'cushitic': [
        { with: 'ethio-semitic', text: 'Incorporated into the Ethiopian empire in the late 1800s; ethnic federalism since 1995 gave them regions of their own.' },
    ],
    'somalis': [
        { with: 'amhara', text: 'Ethiopia and Somalia fought the 1977–78 Ogaden War over Somali lands inside Ethiopia.' },
        { with: 'oromo', text: 'Clashes over pasture and the border between Oromia and the Somali region displaced about a million people in 2017.' },
        { with: 'east-african-bantu', text: 'Kenya\'s Somali northeast, and al-Shabaab attacks inside Kenya, strain relations.' },
    ],
    'oromo': [
        { with: 'amhara', text: 'Grievances over imperial conquest and land; violence in Oromia continues with the Oromo Liberation Army insurgency.' },
        { with: 'somalis', text: 'Rival claims to land along their regional border.' },
    ],
    'afar': [
        { with: 'tigrinya', text: 'Afar areas were invaded during the Tigray war.' },
        { with: 'somalis', text: 'Disputes over grazing land and villages along the Afar–Somali regional border.' },
    ],
    'beja': [
        { with: 'sudanic-arabs', text: 'Beja feel marginalized by Khartoum; a 2020 blockade of Port Sudan protested a peace deal.' },
    ],
    'southern-ethiopians': [
        { with: 'amhara', text: 'Southern peoples were conquered in the 1880s–90s; ethnic federalism has since produced new regions.' },
        { with: 'oromo', text: 'Border disputes between Oromo and southern groups such as the Gedeo displaced about a million people in 2018.' },
    ],
    'hausa': [
        { with: 'fulani', text: 'Fulani jihadists conquered the Hausa states in 1804; elites intermarried into a "Hausa-Fulani" aristocracy.' },
        { with: 'yoruba', text: 'Rivals for national power; Nigeria\'s presidency often alternates between north and south.' },
        { with: 'igbo', text: 'Anti-Igbo pogroms in the north in 1966 helped trigger the Biafran war.' },
        { with: 'middle-belt', text: 'Christian Middle Belt peoples resist northern Muslim political dominance.' },
    ],

    'niger-congo': [
        { with: 'afro-asiatic', text: 'The Sahel meeting zone: centuries of trade and Islamization, and today\'s farmer–herder and jihadist violence.' },
        { with: 'nilo-saharan', text: 'Bantu and Nilotic peoples intermingle across East Africa.' },
    ],
    'bantu': [
        { with: 'khoe-san', text: 'Expanding Bantu farmers absorbed or displaced Khoe-San foragers; Nguni languages borrowed their clicks.' },
        { with: 'nilotes-east', text: 'Bantu and Nilotic peoples share Kenya, Uganda and Tanzania, sometimes clashing over land.' },
    ],
    'southern-bantu': [
        { with: 'afrikaners', text: 'Colonial conquest and apartheid; land ownership remains highly unequal.' },
    ],
    'nguni': [
        { with: 'sotho-tswana', text: 'The 1820s Mfecane wars scattered peoples across the region; today they share South Africa.' },
        { with: 'shona', text: 'In Zimbabwe, Mugabe\'s Gukurahundi massacres (1983–87) killed thousands of Ndebele.' },
        { with: 'afrikaners', text: 'Apartheid\'s legacy shapes politics, land and economics.' },
        { label: 'Xhosa and Zulu', text: 'Rival political traditions (ANC vs. Inkatha) fought a low-level war in the early 1990s.' },
    ],
    'sotho-tswana': [
        { with: 'nguni', text: 'Lesotho formed as a refuge from Zulu-era wars.' },
        { with: 'afrikaners', text: 'Basotho and Boers fought over the Free State\'s farmland in the 19th century.' },
    ],
    'shona': [
        { with: 'nguni', text: 'Ndebele raids in the 19th century and the 1980s Gukurahundi left mistrust.' },
        { with: 'english', text: 'Rhodesia\'s white-minority rule ended after the 1964–79 bush war; land seizures from white farmers followed in 2000.' },
    ],
    'tsonga': [
        { with: 'nguni', text: 'Many Tsonga migrated to South African mines; they faced xenophobic attacks in 2008.' },
        { with: 'savanna-bantu', text: 'Mozambique\'s 1977–92 civil war broadly pitted the southern-based government against the central regions.' },
    ],
    'central-bantu': [
        { with: 'ubangian', text: 'Bantu and Ubangian peoples meet along the northern Congo basin.' },
        { label: 'Belgians and Portuguese', text: 'Leopold II\'s Congo Free State and Portuguese Angola were among the most brutal colonial regimes.' },
    ],
    'equatorial-bantu': [
        { label: 'Forest foragers (Batwa, BaAka, Mbuti)', text: 'Bantu villagers often treat forest peoples as inferior; foragers face land loss and discrimination.' },
        { with: 'grassfields', text: 'In Cameroon, Beti-dominated government faces the Anglophone separatist conflict in the Grassfields.' },
    ],
    'savanna-bantu': [
        { with: 'equatorial-bantu', text: 'Congo\'s politics often pit eastern and southern Katanga against western elites in Kinshasa.' },
        { label: 'Lunda and Chokwe', text: 'Old empires that both cooperated and fought over trade routes.' },
    ],
    'kongo': [
        { with: 'southwest-bantu', text: 'Kongo backed the FNLA in Angola\'s civil war, against the Mbundu MPLA.' },
        { label: 'Portuguese', text: 'The Kongo kingdom allied with Portugal, then was devastated by the slave trade it enabled.' },
    ],
    'southwest-bantu': [
        { label: 'Ovimbundu and Mbundu', text: 'Angola\'s 27-year civil war mapped onto these groups, killing about 500,000.' },
        { with: 'khoe-san', text: 'Herero and Nama both suffered the 1904–08 German genocide in Namibia; Germany formally recognized it in 2021.' },
    ],
    'grassfields': [
        { with: 'equatorial-bantu', text: 'The Anglophone crisis since 2016 pits separatists against Cameroon\'s Francophone-led state.' },
        { with: 'fulani', text: 'Mbororo Fulani herders and Grassfields farmers clash over land.' },
    ],
    'eastern-bantu': [
        { with: 'nilotes-east', text: 'Kenyan politics is shaped by alliances among Kikuyu, Luo, Kalenjin and Luhya.' },
    ],
    'great-lakes': [
        { label: 'Hutu and Tutsi', text: 'The 1994 genocide in Rwanda and repeated massacres in Burundi; conflict spread into eastern Congo.' },
        { with: 'equatorial-bantu', text: 'Rwandan-backed rebels (most recently M23) have fought in eastern Congo for decades.' },
        { with: 'nilotes-east', text: 'In Uganda, southern Bantu and northern Nilotic groups have alternated in power, often violently.' },
    ],
    'east-african-bantu': [
        { with: 'nilotes-east', text: 'Kikuyu–Kalenjin and Kikuyu–Luo rivalries erupted in the 2007–08 election violence that killed about 1,200.' },
        { with: 'gulf-arabs', text: 'Omani Arabs ruled Zanzibar until the 1964 revolution, in which thousands of Arabs were killed.' },
        { with: 'somalis', text: 'Kenya has fought al-Shabaab in Somalia since 2011.' },
    ],
    'volta-niger': [
        { with: 'hausa', text: 'Nigeria\'s north–south divide shapes national politics.' },
    ],
    'yoruba': [
        { with: 'hausa', text: 'Rivals for power in Nigeria; Fulani herders in Yoruba farmland are a recent flashpoint.' },
        { with: 'igbo', text: 'Commercial and political rivals; in Lagos, Igbo traders and Yoruba politicians sometimes clash.' },
        { with: 'gbe', text: 'The Oyo Empire and Dahomey fought for regional dominance in the 18th century.' },
    ],
    'igbo': [
        { with: 'hausa', text: 'The 1966 northern massacres and the 1967–70 Biafran war; Biafran separatism has revived through IPOB.' },
        { with: 'yoruba', text: 'Long competition in politics and business.' },
        { with: 'delta-cross', text: 'Minority delta peoples resented Igbo dominance in old Eastern Nigeria.' },
    ],
    'delta-cross': [
        { with: 'hausa', text: 'Delta peoples argue that oil revenue enriches the north and Abuja while their land is polluted.' },
        { with: 'english', text: 'Britain\'s 1897 sack of Benin City took the Benin Bronzes, some now being returned.' },
    ],
    'middle-belt': [
        { with: 'fulani', text: 'Farmer–herder violence in Plateau and Benue has killed thousands since 2010.' },
        { with: 'hausa', text: 'Resist northern Muslim political dominance.' },
    ],
    'atlantic': [
        { with: 'mande', text: 'Wolof, Fula and Mande states have competed and intermarried across Senegambia for centuries.' },
    ],
    'senegambians': [
        { with: 'mande', text: 'Senegal\'s Casamance (Jola) conflict since 1982 is partly about marginalization from Wolof-dominated Dakar.' },
        { with: 'fulani', text: 'Close neighbours; Wolof is the lingua franca of Senegal.' },
        { with: 'french', text: 'Dakar was the capital of French West Africa; Senegalese soldiers fought for France in both world wars.' },
    ],
    'fulani': [
        { with: 'hausa', text: 'Conquerors and partners of the Hausa in the Sokoto Caliphate.' },
        { with: 'middle-belt', text: 'Herder–farmer conflicts in Nigeria\'s Middle Belt are among Africa\'s deadliest.' },
        { label: 'Dogon', text: 'In central Mali, Dogon militias and Fulani communities have committed massacres against each other since 2016.' },
        { with: 'mande', text: 'Many Fulani are suspected of jihadist sympathies by Mande-led states, fueling abuses by armies.' },
    ],
    'mande': [
        { with: 'tuareg', text: 'Mali\'s southern-dominated government has fought northern Tuareg rebellions since 1963.' },
        { with: 'fulani', text: 'Old partners in the Mali Empire, now tense amid jihadist insurgency.' },
        { with: 'senegambians', text: 'Close historic ties; Mandinka kingdoms once ruled the Gambia valley.' },
    ],
    'kwa': [
        { with: 'gur', text: 'Coastal Akan and Gbe peoples and northern Gur peoples share Ghana, Togo and Benin; the north is poorer.' },
    ],
    'akan': [
        { with: 'gur', text: 'Ashanti raided the north for slaves in the 18th–19th centuries; northern migrants now live across southern Ghana.' },
        { with: 'kru', text: 'In Côte d\'Ivoire, the Baoulé, Bété and northern groups fought for power in the 2002–11 crises.' },
        { with: 'english', text: 'Britain conquered the Ashanti in a series of wars ending in 1900.' },
    ],
    'gbe': [
        { with: 'yoruba', text: 'Dahomey and Oyo were rivals; Vodun shares deities with Yoruba orisha worship.' },
        { with: 'gur', text: 'Togo\'s northern Kabye-led government and southern Ewe have long been at odds.' },
    ],
    'gur': [
        { with: 'akan', text: 'The poorer north versus the cocoa-rich south in Ghana and Côte d\'Ivoire.' },
        { with: 'fulani', text: 'Jihadist violence in Burkina Faso since 2015 has displaced about 2 million, with reprisals against Fulani civilians.' },
    ],
    'kru': [
        { with: 'akan', text: 'Rivals of the Baoulé in Ivorian politics; President Gbagbo was Bété.' },
        { with: 'mande', text: 'Clashes with northern Dioula migrants over land in western Côte d\'Ivoire.' },
    ],
    'ubangian': [
        { label: 'Muslim northerners (Séléka)', text: 'The CAR war since 2013 pitted largely Muslim Séléka rebels against Christian anti-balaka militias.' },
        { with: 'nilotes-sudan', text: 'Zande and Dinka have clashed in South Sudan\'s Western Equatoria.' },
    ],

    'nilo-saharan': [
        { with: 'afro-asiatic', text: 'The Arab–African divide in Sudan and Chad.' },
        { with: 'niger-congo', text: 'Nilotic and Bantu peoples interlace across East Africa.' },
    ],
    'nilotes-sudan': [
        { with: 'sudanic-arabs', text: 'Decades of north–south war and slave raiding before South Sudan\'s independence.' },
        { label: 'Dinka and Nuer', text: 'Old cattle-raiding rivals whose leaders\' split in 2013 started a civil war that killed about 400,000.' },
    ],
    'nilotes-east': [
        { with: 'east-african-bantu', text: 'Luo–Kikuyu and Kalenjin–Kikuyu rivalries dominate Kenyan elections.' },
        { with: 'great-lakes', text: 'Northern Ugandans (Acholi) suffered heavily under Museveni\'s war against the Lord\'s Resistance Army.' },
        { label: 'Maasai and conservation', text: 'Maasai have been evicted from land in Tanzania for game reserves and hunting concessions.' },
    ],
    'kanuri-teda': [
        { with: 'hausa', text: 'Kanem-Bornu and the Hausa states were rival Sahelian powers.' },
        { label: 'Boko Haram', text: 'The insurgency, born in Kanuri Maiduguri, has killed about 35,000 people in combat and displaced millions.' },
    ],
    'songhai-zarma': [
        { with: 'tuareg', text: 'Competition over the Niger valley, with Songhai militias forming during Mali\'s 1990s rebellion.' },
        { with: 'hausa', text: 'Niger\'s two main peoples; politics balances between them.' },
    ],
    'darfur': [
        { with: 'sudanic-arabs', text: 'Two genocidal campaigns (2003–05 and since 2023) by Arab militias against Fur, Masalit and Zaghawa.' },
        { label: 'Zaghawa in Chad', text: 'Chad\'s ruling family is Zaghawa, linking Darfur\'s conflict to Chadian politics.' },
    ],
    'nubians': [
        { with: 'egyptians', text: 'Displaced by the Aswan dams; a demand to return to ancestral land is now written into Egypt\'s constitution.' },
        { with: 'sudanic-arabs', text: 'Many Nubians in Sudan have shifted to Arabic, but a distinct identity remains.' },
    ],
    'sara': [
        { with: 'sudanic-arabs', text: 'Southern Christians dominated Chad\'s early government; northern rebels took over after 1979.' },
    ],

    'khoe-san': [
        { with: 'bantu', text: 'Bantu farmers displaced many Khoe-San but also intermarried.' },
        { with: 'afrikaners', text: 'Dutch colonists took Khoekhoe land from the 1650s; many Khoekhoe became part of the Coloured community.' },
        { with: 'sotho-tswana', text: 'In Botswana, San were evicted from the Central Kalahari reserve; a 2006 court victory restored some rights.' },
    ],
}
