import type { RelationsMap } from './types.ts'

export const unitedStatesRelations: RelationsMap = {
    'german-americans': [
        { with: 'english-americans', text: 'Benjamin Franklin worried in 1751 that Germans would "Germanize" Pennsylvania; World War I pressure led to rapid assimilation into the English-speaking mainstream.' },
        { with: 'irish-americans', text: 'Both arrived in great numbers in the 1840s–50s and were targets of the nativist Know-Nothing movement; German Catholics and Irish Catholics vied for control of the US Catholic Church.' },
        { with: 'plains-nations', text: 'German and Scandinavian homesteaders settled the Plains on land taken from the Lakota and other nations after 1862.' },
    ],
    'irish-americans': [
        { with: 'english-americans', text: 'Protestant Anglo-American elites long met Catholic Irish newcomers with hostility; anti-Irish riots hit Philadelphia in 1844.' },
        { with: 'african-americans', text: 'Competition for jobs fed violence such as the 1863 New York draft riots; Boston\'s 1970s school busing crisis pitted Irish neighbourhoods against Black families.' },
        { with: 'italian-americans', text: 'Fellow Catholics who shared, and competed over, parishes, unions and city politics in the Northeast.' },
    ],
    'english-americans': [
        { with: 'upland-southerners', text: 'Tidewater English planters and backcountry Scots-Irish formed two distinct Southern cultures, often at odds politically.' },
        { with: 'german-americans', text: 'English became the dominant language as German faded after 1917.' },
        { with: 'southwest-nations', text: 'Mormon settlers and the Diné and Ute shared and fought over land in Utah and the Four Corners.' },
    ],
    'upland-southerners': [
        { with: 'oklahoma-nations', text: 'Backcountry settlers pressed into Cherokee and Creek lands, leading to Removal in the 1830s; many white Southern families claim a Cherokee ancestor.' },
        { with: 'african-americans', text: 'The Upland South had fewer enslaved people than the Black Belt; Appalachia was divided in the Civil War, and West Virginia split from Virginia in 1863.' },
        { with: 'english-americans', text: 'Old-stock Southerners of English and Scots-Irish origin largely merged into one "American" identity.' },
    ],
    'italian-americans': [
        { with: 'irish-americans', text: 'Rivals for city jobs and church leadership in the Northeast, later intermarried widely.' },
        { with: 'english-americans', text: 'Nativist prejudice peaked with the Sacco and Vanzetti case (executed 1927) and the 1924 quota laws.' },
        { with: 'african-americans', text: 'Urban neighbourhood tensions in New York and New Jersey in the 1970s–80s, including the 1989 killing of Yusuf Hawkins in Bensonhurst.' },
    ],
    'nordic-americans': [
        { with: 'plains-nations', text: 'The 1862 US–Dakota War in Minnesota broke out on land promised to the Dakota; 38 Dakota men were hanged at Mankato, the largest mass execution in US history.' },
        { with: 'german-americans', text: 'Neighbouring Lutheran farmers across the Upper Midwest.' },
    ],
    'french-americans': [
        { with: 'english-americans', text: 'Louisiana schools punished children for speaking French until the 1960s; CODOFIL now promotes French. Franco-Americans in New England faced Ku Klux Klan hostility in the 1920s.' },
        { with: 'african-americans', text: 'South Louisiana\'s Creole culture blends French, African and Caribbean roots; zydeco grew from Black Creole music.' },
    ],
    'african-americans': [
        { with: 'english-americans', text: 'Slavery, Jim Crow and the civil rights movement define the relationship with the white South.' },
        { with: 'mexican-americans', text: 'Coalitions and competition over jobs, schools and city politics, especially in Los Angeles and Texas.' },
        { with: 'oklahoma-nations', text: 'The Five Tribes held Black people in slavery; their descendants, the Freedmen, have fought for tribal citizenship (the Cherokee Nation restored it in 2017).' },
    ],
    'asian-americans': [
        { with: 'polynesians', text: 'Asian plantation workers became Hawaii\'s largest group; Native Hawaiians are a minority in their homeland.' },
        { with: 'english-americans', text: 'Chinese exclusion (1882–1943) and Japanese internment; anti-Asian incidents rose during the Covid-19 pandemic.' },
    ],
    'mexican-americans': [
        { with: 'english-americans', text: 'Anglo settlers took Texas and the Southwest; segregation of Mexican Americans persisted until court rulings such as Hernandez v. Texas (1954).' },
        { with: 'southwest-nations', text: 'Hispanic and Native communities of the Southwest share centuries of mixing, trade and conflict.' },
        { with: 'mexicans', text: 'Family ties across the border; remittances to Mexico exceed $60 billion a year.' },
    ],
    'hispanic-americans': [
        { with: 'southwest-nations', text: 'Hispano villages and the Pueblos have lived side by side since 1598, through the Pueblo Revolt and centuries of intermarriage.' },
        { with: 'mexican-americans', text: 'New Mexico\'s Hispanos often distinguish their colonial Spanish roots from later Mexican immigration.' },
        { with: 'african-americans', text: 'In Miami, Cuban American political power and Black communities have had a tense relationship.' },
    ],
    'us-native-nations': [
        { with: 'anglosphere', text: 'Hundreds of treaties, most broken; tribes are sovereign but under federal trust authority.' },
        { with: 'mexican-americans', text: 'Many Mexican Americans have Indigenous ancestry; the border divides the Tohono O\'odham, Yaqui and Kickapoo.' },
    ],
    'southwest-nations': [
        { label: 'Hopi', text: 'A long Navajo–Hopi land dispute led Congress to relocate about 10,000 Navajo from 1974.' },
        { with: 'mexican-americans', text: 'Apache raids and Spanish and Mexican slave raids marked the colonial era.' },
        { with: 'english-americans', text: 'Uranium mining on the Navajo Nation left hundreds of abandoned mines; a third of Navajo homes lacked running water as of the 2020s.' },
    ],
    'plains-nations': [
        { with: 'german-americans', text: 'Homesteaders and railroads took the Plains after the buffalo were destroyed.' },
        { with: 'nordic-americans', text: 'The 1862 Dakota War and mass hanging at Mankato.' },
        { label: 'United States', text: 'The Black Hills claim and the 2016 Standing Rock pipeline protests.' },
    ],
    'oklahoma-nations': [
        { with: 'upland-southerners', text: 'Removal from the Southeast and later loss of land through allotment and the 1889 land runs.' },
        { with: 'african-americans', text: 'The Freedmen citizenship disputes; also the 1921 Tulsa massacre took place on land once part of the Creek Nation.' },
    ],
    'great-basin-nations': [
        { with: 'english-americans', text: 'The 1860 Pyramid Lake War and loss of land to miners and Mormon settlers.' },
    ],
    'eastern-nations': [
        { with: 'african-americans', text: 'In segregated Robeson County, Lumbee, Black and white residents had separate schools.' },
        { label: 'Ku Klux Klan', text: 'The Lumbee routed a Klan rally at Hayes Pond in 1958.' },
    ],
    'alaska-natives': [
        { label: 'Russians', text: 'Russian fur traders enslaved and killed many Aleuts in the 18th century; Russian Orthodoxy took root nonetheless.' },
        { with: 'english-americans', text: 'Oil development on the North Slope and land claims shaped the 1971 settlement.' },
        { with: 'inuit', text: 'Iñupiat and Yup\'ik are close kin of the Canadian Inuit and Greenlanders.' },
    ],
}
