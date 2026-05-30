/*!
 * GD Company — Georgian Wine & Brandy
 * Front-end behaviour: i18n, catalogue rendering, scroll reveals.
 * Vanilla ES2015+, no dependencies.
 */
'use strict';

(function () {
const PRODUCTS = [{
    id: 'kindzmarauli',
    cat: 'red',
    cap: '#5b2350',
    glass: 'red',
    alc: '12%',
    serve: '14–16°C',
    meta2: 'serve',
    name: {en: 'Kindzmarauli', ru: 'Киндзмараули'},
    style: {en: 'Red · Semisweet', ru: 'Красное · Полусладкое'},
    pair: {en: 'Fruit & desserts', ru: 'Фрукты и десерты'},
    desc: {
        en: 'Bearing the name of its place of origin, made of selected Saperavi grapes grown in the Kindzmarauli micro-zone of Kakheti.',
        ru: 'Названное по происхождению, произведено из отборного винограда Саперави, выращенного в зоне Киндзмараули в Кахетии.'
    }
}, {
    id: 'saperavi',
    cat: 'red',
    cap: '#171410',
    glass: 'red',
    alc: '13%',
    serve: '16–18°C',
    meta2: 'serve',
    name: {en: 'Saperavi', ru: 'Саперави'},
    style: {en: 'Red · Dry', ru: 'Красное · Сухое'},
    pair: {en: 'Meat dishes', ru: 'Блюда из мяса'},
    desc: {
        en: 'Made of Saperavi grapes from Kakheti. A dark, ruby wine with vivid aromas of red fruit and black berries — cherry and blackberry.',
        ru: 'Из грузинского сорта Саперави. Ярко-рубиновый цвет с фиолетовым оттенком, ягодный вкус малины и ноты фиалки.'
    }
}, {
    id: 'khvanchkara',
    cat: 'red',
    cap: '#b21f2a',
    glass: 'red',
    alc: '12%',
    serve: '14–16°C',
    meta2: 'serve',
    name: {en: 'Khvanchkara', ru: 'Хванчкара'},
    style: {en: 'Red · Semisweet', ru: 'Красное · Полусладкое'},
    pair: {en: 'Fruit & desserts', ru: 'Фрукты и десерты'},
    desc: {
        en: 'A celebrated Georgian classic — a deep, rounded semisweet red with a harmonious, generous character.',
        ru: 'Прославленная грузинская классика — глубокое, гармоничное красное полусладкое с щедрым характером.'
    }
}, {
    id: 'alazani-red',
    cat: 'red',
    cap: '#7a1f1f',
    glass: 'red',
    alc: '11.5%',
    serve: '12–14°C',
    meta2: 'serve',
    name: {en: 'Alazani Valley · Red', ru: 'Алазанская долина · Красное'},
    style: {en: 'Red · Semisweet', ru: 'Красное · Полусладкое'},
    pair: {en: 'Cheese, vegetables, seafood', ru: 'Сыры, овощи, морепродукты'},
    desc: {
        en: 'Made of Saperavi grapes grown in the Alazani Valley. Dark red in colour and distinguished by full, velvety aromas.',
        ru: 'Из винограда Саперави, выращенного в Алазанской долине. Тёмно-красный цвет и полный бархатный вкус.'
    }
}, {
    id: 'kvareli',
    cat: 'red',
    cap: '#283a6b',
    glass: 'red',
    alc: '12.5%',
    serve: '12–14°C',
    meta2: 'serve',
    name: {en: 'Kvareli', ru: 'Кварели'},
    style: {en: 'Red · Dry', ru: 'Красное · Сухое'},
    pair: {en: 'Veal, steak, meat', ru: 'Телятина, стейк, мясо'},
    desc: {
        en: 'Budeshuri Saperavi from the Kvareli micro-zone. Deep pomegranate colour with berries, plum and notes of vanilla and clove.',
        ru: 'Из сорта Будешури Саперави, микрозона Кварели. Тёмный гранатовый цвет, букет ягод, сливы, тона ванили и гвоздики.'
    }
}, {
    id: 'alazani-white',
    cat: 'white',
    cap: '#6b7a2f',
    glass: 'white',
    alc: '11.5%',
    serve: '10–12°C',
    meta2: 'serve',
    name: {en: 'Alazani Valley · White', ru: 'Алазанская долина · Белое'},
    style: {en: 'White · Semisweet', ru: 'Белое · Полусладкое'},
    pair: {en: 'Desserts & light cakes', ru: 'Десерты и лёгкая выпечка'},
    desc: {
        en: 'Made of Rkatsiteli, Mtsvane and other white varieties. A straw-coloured wine with a velvety taste and pleasant aromas.',
        ru: 'Из Ркацители, Мцване и других белых сортов. Соломенный цвет, бархатный вкус и приятный аромат.'
    }
}, {
    id: 'tsinandali',
    cat: 'white',
    cap: '#2f6b3a',
    glass: 'white',
    alc: '13%',
    serve: '10–12°C',
    meta2: 'serve',
    name: {en: 'Tsinandali', ru: 'Цинандали'},
    style: {en: 'White · Dry', ru: 'Белое · Сухое'},
    pair: {en: 'Poultry & seafood', ru: 'Птица и морепродукты'},
    desc: {
        en: 'Bearing the name of its origin — Rkatsiteli and Mtsvane from the Tsinandali micro-zone, with a golden-straw hue.',
        ru: 'Названное по происхождению — Ркацители и Мцване из микрозоны Цинандали, ярко-бежевый цвет.'
    }
}, {
    id: 'rkatsiteli',
    cat: 'white',
    cap: '#8a9a4a',
    glass: 'white',
    alc: '13%',
    serve: '10–12°C',
    meta2: 'serve',
    name: {en: 'Rkatsiteli', ru: 'Ркацители'},
    style: {en: 'White · Dry', ru: 'Белое · Сухое'},
    pair: {en: 'Fish & seafood', ru: 'Рыба и морепродукты'},
    desc: {
        en: 'Made of the Rkatsiteli variety grown in Kakheti. A crisp white wine of light straw colour.',
        ru: 'Из винограда сорта Ркацители, выращенного в Кахетии. Свежее белое вино светло-соломенного цвета.'
    }
}, {
    id: 'special-reserve',
    cat: 'red',
    cap: '#7a1f2a',
    glass: 'red',
    alc: '12%',
    serve: '14–16°C',
    meta2: 'serve',
    name: {en: 'Special Reserve', ru: 'Спешл Резерв'},
    style: {en: 'Red · Semisweet', ru: 'Красное · Полусладкое'},
    pair: {en: 'Fruit & desserts', ru: 'Фрукты и десерты'},
    desc: {
        en: 'A premium semisweet red of selected Saperavi — soft, rounded and generous, dressed in the house Special Reserve label.',
        ru: 'Премиальное красное полусладкое из отборного Саперави — мягкое, округлое и щедрое, в фирменной этикетке Special Reserve.'
    }
}, {
    id: 'saperavi-reserve',
    cat: 'red',
    cap: '#3a1d33',
    glass: 'red',
    alc: '13%',
    serve: '16–18°C',
    meta2: 'serve',
    name: {en: 'Saperavi · Réserve', ru: 'Саперави · Резерв'},
    style: {en: 'Red · Dry', ru: 'Красное · Сухое'},
    pair: {en: 'Meat dishes', ru: 'Блюда из мяса'},
    desc: {
        en: 'A dry Saperavi reserve from Kakheti — deep ruby, with vivid black-fruit aromas of cherry and blackberry and a firm, lasting finish.',
        ru: 'Сухой резерв Саперави из Кахетии — глубокий рубиновый цвет, яркие ароматы вишни и ежевики и долгое послевкусие.'
    }
}, {
    id: 'alazani-reserve',
    cat: 'white',
    cap: '#8a9a4a',
    glass: 'white',
    alc: '11.5%',
    serve: '10–12°C',
    meta2: 'serve',
    name: {en: 'Alazani Valley · Réserve', ru: 'Алазанская долина · Резерв'},
    style: {en: 'White · Semisweet', ru: 'Белое · Полусладкое'},
    pair: {en: 'Desserts & light cakes', ru: 'Десерты и лёгкая выпечка'},
    desc: {
        en: 'A reserve white of Rkatsiteli and Mtsvane from the Alazani Valley — bright amber-straw, velvety and gently sweet.',
        ru: 'Резервное белое из Ркацители и Мцване Алазанской долины — янтарно-соломенный цвет, бархатный и мягко-сладкий вкус.'
    }
}, {
    id: 'alazani-estate-white',
    cat: 'white',
    cap: '#1f5a2f',
    glass: 'white',
    alc: '11.5%',
    serve: '10–12°C',
    meta2: 'serve',
    name: {en: 'Alazani Valley · Estate', ru: 'Алазанская долина · Эстейт'},
    style: {en: 'White · Semisweet', ru: 'Белое · Полусладкое'},
    pair: {en: 'Cheese, vegetables, seafood', ru: 'Сыры, овощи, морепродукты'},
    desc: {
        en: 'The estate-label white — Georgian white varieties bottled in Kakheti, straw-gold with a soft, fragrant sweetness.',
        ru: 'Белое в фирменной этикетке Эстейт — грузинские белые сорта, разлито в Кахетии, золотисто-соломенный цвет и мягкая сладость.'
    }
}, {
    id: 'rkatsiteli-estate',
    cat: 'white',
    cap: '#1f5a2f',
    glass: 'white',
    alc: '13%',
    serve: '10–12°C',
    meta2: 'serve',
    name: {en: 'Rkatsiteli · Estate', ru: 'Ркацители · Эстейт'},
    style: {en: 'White · Dry', ru: 'Белое · Сухое'},
    pair: {en: 'Fish & seafood', ru: 'Рыба и морепродукты'},
    desc: {
        en: 'A dry estate Rkatsiteli grown in Kakheti — light straw colour, crisp and clean with a fresh, mineral character.',
        ru: 'Сухое Ркацители Эстейт из Кахетии — светло-соломенный цвет, свежий и чистый вкус с минеральным характером.'
    }
}, {
    id: 'alazani-estate-red',
    cat: 'red',
    cap: '#7a1f1f',
    glass: 'red',
    alc: '11.5%',
    serve: '12–14°C',
    meta2: 'serve',
    name: {en: 'Alazani Valley · Estate Red', ru: 'Алазанская долина · Эстейт Красное'},
    style: {en: 'Red · Semisweet', ru: 'Красное · Полусладкое'},
    pair: {en: 'Cheese & light meats', ru: 'Сыры и лёгкое мясо'},
    desc: {
        en: 'The estate-label red — Saperavi from the Alazani Valley, dark and velvety with a rounded semisweet character.',
        ru: 'Красное в фирменной этикетке Эстейт — Саперави Алазанской долины, тёмное и бархатное, округлое полусладкое.'
    }
}, {
    id: 'saperavi-estate',
    cat: 'red',
    cap: '#5a1416',
    glass: 'red',
    alc: '13%',
    serve: '16–18°C',
    meta2: 'serve',
    name: {en: 'Saperavi · Estate', ru: 'Саперави · Эстейт'},
    style: {en: 'Red · Dry', ru: 'Красное · Сухое'},
    pair: {en: 'Meat dishes', ru: 'Блюда из мяса'},
    desc: {
        en: 'A dry estate Saperavi bottled in Georgia — deep, dark ruby with ripe black fruit and a long, structured finish.',
        ru: 'Сухое Саперави Эстейт, разлито в Грузии — глубокий тёмно-рубиновый цвет, спелые тёмные ягоды и долгое послевкусие.'
    }
}, {
    id: 'kakhetian-legends',
    cat: 'brandy',
    cap: '#2a1d12',
    glass: 'brandy',
    alc: '40%',
    serve: {en: '3–7 yrs · oak', ru: '3–7 лет · дуб'},
    meta2: 'aged',
    name: {en: 'Kakhetian Legends', ru: 'Легенды Кахети'},
    style: {en: 'Georgian Brandy · 3★ 5★ 7★', ru: 'Грузинский коньяк · 3★ 5★ 7★'},
    pair: {en: 'Neat, or with dark chocolate', ru: 'В чистом виде или с тёмным шоколадом'},
    desc: {
        en: 'A classic line of Georgian brandy aged three, five and seven years in oak — warm amber with a long, resinous finish.',
        ru: 'Классическая линия грузинского коньяка выдержки три, пять и семь лет в дубе — тёплый янтарь и долгое послевкусие.'
    }
}, {
    id: 'king-david',
    cat: 'brandy',
    cap: '#171410',
    glass: 'brandyred',
    alc: '40%',
    serve: {en: 'VS · VSOP · XO', ru: 'VS · VSOP · XO'},
    meta2: 'aged',
    name: {en: 'King David', ru: 'Кинг Давид'},
    style: {en: 'Georgian Brandy · Prestige', ru: 'Грузинский коньяк · Престиж'},
    pair: {en: 'Digestif, after dinner', ru: 'Дижестив, после ужина'},
    desc: {
        en: 'A regal Georgian brandy in a sculpted decanter — offered as VS, VSOP and XO, deep amber-red with refined warmth.',
        ru: 'Королевский грузинский коньяк в фигурном графине — VS, VSOP и XO, глубокий янтарно-красный с изысканной мягкостью.'
    }
}, {
    id: 'tellessy',
    cat: 'brandy',
    cap: '#171410',
    glass: 'brandy',
    alc: '40%',
    serve: {en: 'VS · VSOP · XO', ru: 'VS · VSOP · XO'},
    meta2: 'aged',
    name: {en: 'Tellessy', ru: 'Теллеси'},
    style: {en: 'Prestige Cognac-style', ru: 'Престижный коньячный стиль'},
    pair: {en: 'Neat or on the rocks', ru: 'В чистом виде или со льдом'},
    desc: {
        en: 'A prestige brandy in the cognac tradition, presented as VS, VSOP and XO in a softly sculpted flask.',
        ru: 'Престижный коньяк в классической традиции — VS, VSOP и XO в мягко изогнутой бутылке.'
    }
}, {
    id: 'didgori',
    cat: 'brandy',
    cap: '#171410',
    glass: 'brandy',
    alc: '40%',
    serve: {en: '3★ · 5★ · 7★', ru: '3★ · 5★ · 7★'},
    meta2: 'aged',
    name: {en: 'Didgori', ru: 'Дидгори'},
    style: {en: 'Georgian Brandy', ru: 'Грузинский коньяк'},
    pair: {en: 'Neat', ru: 'В чистом виде'},
    desc: {
        en: 'Named for a Georgian victory — a flask-shaped brandy in three, five and seven-star expressions.',
        ru: 'Названный в честь грузинской победы — коньяк во фигурной бутылке, выдержки 3, 5 и 7 звёзд.'
    }
}, {
    id: 'suli',
    cat: 'brandy',
    cap: '#2a3a6b',
    glass: 'brandy',
    alc: '40%',
    serve: {en: 'VS · VSOP', ru: 'VS · VSOP'},
    meta2: 'aged',
    name: {en: 'Suli', ru: 'Сули'},
    style: {en: 'Georgian Brandy', ru: 'Грузинский коньяк'},
    pair: {en: 'Neat', ru: 'В чистом виде'},
    desc: {
        en: 'A modern Georgian brandy with a flowing wave label, offered as VS and VSOP.',
        ru: 'Современный грузинский коньяк с волнистой этикеткой — VS и VSOP.'
    }
}, {
    id: 'venus',
    cat: 'brandy',
    cap: '#7a1f1f',
    glass: 'brandyred',
    alc: '40%',
    serve: {en: 'V.S.O.P', ru: 'V.S.O.P'},
    meta2: 'aged',
    name: {en: 'Venus', ru: 'Венус'},
    style: {en: 'Blended Brandy · VSOP', ru: 'Купажированный коньяк · VSOP'},
    pair: {en: 'Neat or in cocktails', ru: 'В чистом виде или в коктейлях'},
    desc: {
        en: 'A blended brandy crafted with the technology of cognac — a deep ruby-amber spirit in an elegant decanter.',
        ru: 'Купажированный коньяк, созданный по технологии коньяка — глубокий рубиново-янтарный напиток в элегантном графине.'
    }
}, {id:"cv-alazani-red-gold",cat:"red",cap:"#7a1f1f",glass:"red",alc:"12%",serve:"12–14°C",meta2:"serve",name:{en:"Alazani Valley · Red · Gold",ru:"Алазанская долина · Красное · Gold"},style:{en:"Red · Semisweet · Gold",ru:"Красное · Полусладкое · Gold"},pair:{en:"Cheese, vegetables, seafood",ru:"Сыры, овощи, морепродукты"},desc:{en:"Made of Saperavi grapes grown in the Alazani Valley — dark red, with full velvety aromas and a rounded semisweet character.",ru:"Из винограда Саперави Алазанской долины — тёмно-красное, с полным бархатным ароматом и округлым полусладким характером."}},
{id:"cv-saperavi-gold",cat:"red",cap:"#171410",glass:"red",alc:"13%",serve:"16–18°C",meta2:"serve",name:{en:"Saperavi · Gold",ru:"Саперави · Gold"},style:{en:"Red · Dry · Gold",ru:"Красное · Сухое · Gold"},pair:{en:"Meat dishes",ru:"Блюда из мяса"},desc:{en:"Made of Saperavi grapes from Kakheti — a dark, ruby red with vivid aromas of cherry and blackberry and a firm finish.",ru:"Из грузинского сорта Саперави — тёмно-рубиновое с яркими ароматами вишни и ежевики и плотным послевкусием."}},
{id:"cv-kvareli-gold",cat:"red",cap:"#283a6b",glass:"red",alc:"12.5%",serve:"12–14°C",meta2:"serve",name:{en:"Kvareli · Gold",ru:"Кварели · Gold"},style:{en:"Red · Dry · Gold",ru:"Красное · Сухое · Gold"},pair:{en:"Veal, steak, meat",ru:"Телятина, стейк, мясо"},desc:{en:"Budeshuri Saperavi from the Kvareli micro-zone — deep pomegranate colour with berries, plum and a harmonic trail.",ru:"Из сорта Будешури Саперави, микрозона Кварели — гранатовый цвет, ягоды, слива и гармоничный шлейф."}},
{id:"cv-kindzmarauli-gold",cat:"red",cap:"#5b2350",glass:"red",alc:"12%",serve:"14–16°C",meta2:"serve",name:{en:"Kindzmarauli · Gold",ru:"Киндзмараули · Gold"},style:{en:"Red · Semisweet · Gold",ru:"Красное · Полусладкое · Gold"},pair:{en:"Fruit & desserts",ru:"Фрукты и десерты"},desc:{en:"Selected Saperavi grapes from the Kindzmarauli micro-zone of Kakheti — a celebrated red semisweet, deep and generous.",ru:"Из отборного Саперави микрозоны Киндзмараули — прославленное красное полусладкое, глубокое и щедрое."}},
{id:"cv-khvanchkara-gold",cat:"red",cap:"#b21f2a",glass:"red",alc:"12%",serve:"14–16°C",meta2:"serve",name:{en:"Khvanchkara · Gold",ru:"Хванчкара · Gold"},style:{en:"Red · Semisweet · Gold",ru:"Красное · Полусладкое · Gold"},pair:{en:"Fruit & desserts",ru:"Фрукты и десерты"},desc:{en:"A celebrated Georgian classic — a deep, rounded semisweet red with a harmonious, generous character.",ru:"Прославленная грузинская классика — глубокое, гармоничное красное полусладкое с щедрым характером."}},
{id:"cv-alazani-red-classic",cat:"red",cap:"#7a1f1f",glass:"red",alc:"12%",serve:"12–14°C",meta2:"serve",name:{en:"Alazani Valley · Red · Classic",ru:"Алазанская долина · Красное · Classic"},style:{en:"Red · Semisweet · Classic",ru:"Красное · Полусладкое · Classic"},pair:{en:"Cheese, vegetables, seafood",ru:"Сыры, овощи, морепродукты"},desc:{en:"Made of Saperavi grapes grown in the Alazani Valley — dark red, with full velvety aromas and a rounded semisweet character.",ru:"Из винограда Саперави Алазанской долины — тёмно-красное, с полным бархатным ароматом и округлым полусладким характером."}},
{id:"cv-khvanchkara-classic",cat:"red",cap:"#b21f2a",glass:"red",alc:"12%",serve:"14–16°C",meta2:"serve",name:{en:"Khvanchkara · Classic",ru:"Хванчкара · Classic"},style:{en:"Red · Semisweet · Classic",ru:"Красное · Полусладкое · Classic"},pair:{en:"Fruit & desserts",ru:"Фрукты и десерты"},desc:{en:"A celebrated Georgian classic — a deep, rounded semisweet red with a harmonious, generous character.",ru:"Прославленная грузинская классика — глубокое, гармоничное красное полусладкое с щедрым характером."}},
{id:"cv-kindzmarauli-classic",cat:"red",cap:"#5b2350",glass:"red",alc:"12%",serve:"14–16°C",meta2:"serve",name:{en:"Kindzmarauli · Classic",ru:"Киндзмараули · Classic"},style:{en:"Red · Semisweet · Classic",ru:"Красное · Полусладкое · Classic"},pair:{en:"Fruit & desserts",ru:"Фрукты и десерты"},desc:{en:"Selected Saperavi grapes from the Kindzmarauli micro-zone of Kakheti — a celebrated red semisweet, deep and generous.",ru:"Из отборного Саперави микрозоны Киндзмараули — прославленное красное полусладкое, глубокое и щедрое."}},
{id:"cv-kvareli-classic",cat:"red",cap:"#283a6b",glass:"red",alc:"12.5%",serve:"12–14°C",meta2:"serve",name:{en:"Kvareli · Classic",ru:"Кварели · Classic"},style:{en:"Red · Dry · Classic",ru:"Красное · Сухое · Classic"},pair:{en:"Veal, steak, meat",ru:"Телятина, стейк, мясо"},desc:{en:"Budeshuri Saperavi from the Kvareli micro-zone — deep pomegranate colour with berries, plum and a harmonic trail.",ru:"Из сорта Будешури Саперави, микрозона Кварели — гранатовый цвет, ягоды, слива и гармоничный шлейф."}},
{id:"cv-saperavi-classic",cat:"red",cap:"#171410",glass:"red",alc:"13%",serve:"16–18°C",meta2:"serve",name:{en:"Saperavi · Classic",ru:"Саперави · Classic"},style:{en:"Red · Dry · Classic",ru:"Красное · Сухое · Classic"},pair:{en:"Meat dishes",ru:"Блюда из мяса"},desc:{en:"Made of Saperavi grapes from Kakheti — a dark, ruby red with vivid aromas of cherry and blackberry and a firm finish.",ru:"Из грузинского сорта Саперави — тёмно-рубиновое с яркими ароматами вишни и ежевики и плотным послевкусием."}},
{id:"cv-alazani-red-export",cat:"red",cap:"#7a1f1f",glass:"red",alc:"12%",serve:"12–14°C",meta2:"serve",name:{en:"Alazani Valley · Red · Export",ru:"Алазанская долина · Красное · Export"},style:{en:"Red · Semisweet · Export",ru:"Красное · Полусладкое · Export"},pair:{en:"Cheese, vegetables, seafood",ru:"Сыры, овощи, морепродукты"},desc:{en:"Made of Saperavi grapes grown in the Alazani Valley — dark red, with full velvety aromas and a rounded semisweet character.",ru:"Из винограда Саперави Алазанской долины — тёмно-красное, с полным бархатным ароматом и округлым полусладким характером."}},
{id:"cv-khvanchkara-export",cat:"red",cap:"#b21f2a",glass:"red",alc:"12%",serve:"14–16°C",meta2:"serve",name:{en:"Khvanchkara · Export",ru:"Хванчкара · Export"},style:{en:"Red · Semisweet · Export",ru:"Красное · Полусладкое · Export"},pair:{en:"Fruit & desserts",ru:"Фрукты и десерты"},desc:{en:"A celebrated Georgian classic — a deep, rounded semisweet red with a harmonious, generous character.",ru:"Прославленная грузинская классика — глубокое, гармоничное красное полусладкое с щедрым характером."}},
{id:"cv-kindzmarauli-export",cat:"red",cap:"#5b2350",glass:"red",alc:"12%",serve:"14–16°C",meta2:"serve",name:{en:"Kindzmarauli · Export",ru:"Киндзмараули · Export"},style:{en:"Red · Semisweet · Export",ru:"Красное · Полусладкое · Export"},pair:{en:"Fruit & desserts",ru:"Фрукты и десерты"},desc:{en:"Selected Saperavi grapes from the Kindzmarauli micro-zone of Kakheti — a celebrated red semisweet, deep and generous.",ru:"Из отборного Саперави микрозоны Киндзмараули — прославленное красное полусладкое, глубокое и щедрое."}},
{id:"cv-saperavi-export",cat:"red",cap:"#171410",glass:"red",alc:"13%",serve:"16–18°C",meta2:"serve",name:{en:"Saperavi · Export",ru:"Саперави · Export"},style:{en:"Red · Dry · Export",ru:"Красное · Сухое · Export"},pair:{en:"Meat dishes",ru:"Блюда из мяса"},desc:{en:"Made of Saperavi grapes from Kakheti — a dark, ruby red with vivid aromas of cherry and blackberry and a firm finish.",ru:"Из грузинского сорта Саперави — тёмно-рубиновое с яркими ароматами вишни и ежевики и плотным послевкусием."}},
{id:"cv-kvareli-export",cat:"red",cap:"#283a6b",glass:"red",alc:"12.5%",serve:"12–14°C",meta2:"serve",name:{en:"Kvareli · Export",ru:"Кварели · Export"},style:{en:"Red · Dry · Export",ru:"Красное · Сухое · Export"},pair:{en:"Veal, steak, meat",ru:"Телятина, стейк, мясо"},desc:{en:"Budeshuri Saperavi from the Kvareli micro-zone — deep pomegranate colour with berries, plum and a harmonic trail.",ru:"Из сорта Будешури Саперави, микрозона Кварели — гранатовый цвет, ягоды, слива и гармоничный шлейф."}},
{id:"cv-pirosmani-red-tile",cat:"red",cap:"#1c3a5e",glass:"red",alc:"11%",serve:"16–18°C",meta2:"serve",name:{en:"Pirosmani · Red · Tile",ru:"Пиросмани · Красное · Tile"},style:{en:"Red · Semi-dry",ru:"Красное · Полусухое"},pair:{en:"Grilled meat & cheeses",ru:"Мясо на гриле и сыры"},desc:{en:"Made of selected Saperavi grapes grown in the Kakheti region.",ru:"Изготовлено из отборного винограда сорта Саперави, выращенного в регионе Кахетия."}},
{id:"cv-pirosmani-white-tile",cat:"white",cap:"#6b7a2f",glass:"white",alc:"11%",serve:"10–12°C",meta2:"serve",name:{en:"Pirosmani · White · Tile",ru:"Пиросмани · Белое · Tile"},style:{en:"White · Semi-dry",ru:"Белое · Полусухое"},pair:{en:"Light salads, fish & fruits",ru:"Легкие салаты, рыба и фрукты"},desc:{en:"Made of selected Rkatsiteli and Mtsvane grapes grown in Kakheti.",ru:"Изготовлено из отборного винограда сортов Ркацители и Мцване, выращенного в Кахетии."}},
{id:"cv-kakhetian-legends-georgian-alco-7star",cat:"brandy",cap:"#2a1d12",glass:"brandy",alc:"40%",serve:"3★ · 5★ · 7★",meta2:"aged",name:{en:"Kakhetian Legends · Georgian Alco",ru:"Легенды Кахети · Georgian Alco"},style:{en:"Georgian Brandy",ru:"Грузинский коньяк"},pair:{en:"Neat, or with dark chocolate",ru:"В чистом виде или с тёмным шоколадом"},desc:{en:"A classic line of Georgian brandy aged in oak — warm amber with a long, resinous finish.",ru:"Классическая линия грузинского коньяка, выдержанного в дубе — тёплый янтарь и долгое смолистое послевкусие."}},
{id:"cv-kakhetian-legends-classic-7star",cat:"brandy",cap:"#2a1d12",glass:"brandy",alc:"40%",serve:"3★ · 5★ · 7★",meta2:"aged",name:{en:"Kakhetian Legends · Classic",ru:"Легенды Кахети · Classic"},style:{en:"Georgian Brandy",ru:"Грузинский коньяк"},pair:{en:"Neat, or with dark chocolate",ru:"В чистом виде или с тёмным шоколадом"},desc:{en:"A classic line of Georgian brandy aged in oak — warm amber with a long, resinous finish.",ru:"Классическая линия грузинского коньяка, выдержанного в дубе — тёплый янтарь и долгое смолистое послевкусие."}},
{id:"cv-kakhetian-legends-imperial-vsop",cat:"brandy",cap:"#2a1d12",glass:"brandy",alc:"40%",serve:"VS · VSOP",meta2:"aged",name:{en:"Kakhetian Legends · Imperial",ru:"Легенды Кахети · Imperial"},style:{en:"Georgian Brandy",ru:"Грузинский коньяк"},pair:{en:"Neat, or with dark chocolate",ru:"В чистом виде или с тёмным шоколадом"},desc:{en:"A classic line of Georgian brandy aged in oak — warm amber with a long, resinous finish.",ru:"Классическая линия грузинского коньяка, выдержанного в дубе — тёплый янтарь и долгое смолистое послевкусие."}},
{id:"cv-kakhetian-legends-imperial-gold-vsop",cat:"brandy",cap:"#2a1d12",glass:"brandy",alc:"40%",serve:"VSOP",meta2:"aged",name:{en:"Kakhetian Legends · Imperial Gold",ru:"Легенды Кахети · Imperial Gold"},style:{en:"Georgian Brandy",ru:"Грузинский коньяк"},pair:{en:"Neat, or with dark chocolate",ru:"В чистом виде или с тёмным шоколадом"},desc:{en:"A classic line of Georgian brandy aged in oak — warm amber with a long, resinous finish.",ru:"Классическая линия грузинского коньяка, выдержанного в дубе — тёплый янтарь и долгое смолистое послевкусие."}},
{id:"cv-kakhetian-legends-ribbon-7star",cat:"brandy",cap:"#2a1d12",glass:"brandy",alc:"40%",serve:"3★ · 7★",meta2:"aged",name:{en:"Kakhetian Legends · Ribbon",ru:"Легенды Кахети · Ribbon"},style:{en:"Georgian Brandy",ru:"Грузинский коньяк"},pair:{en:"Neat, or with dark chocolate",ru:"В чистом виде или с тёмным шоколадом"},desc:{en:"A classic line of Georgian brandy aged in oak — warm amber with a long, resinous finish.",ru:"Классическая линия грузинского коньяка, выдержанного в дубе — тёплый янтарь и долгое смолистое послевкусие."}},
{id:"cv-kakhetian-legends-crimson-7star",cat:"brandy",cap:"#2a1d12",glass:"brandy",alc:"40%",serve:"3★ · 5★ · 7★",meta2:"aged",name:{en:"Kakhetian Legends · Crimson",ru:"Легенды Кахети · Crimson"},style:{en:"Georgian Brandy",ru:"Грузинский коньяк"},pair:{en:"Neat, or with dark chocolate",ru:"В чистом виде или с тёмным шоколадом"},desc:{en:"A classic line of Georgian brandy aged in oak — warm amber with a long, resinous finish.",ru:"Классическая линия грузинского коньяка, выдержанного в дубе — тёплый янтарь и долгое смолистое послевкусие."}},
{id:"cv-kakhetian-legends-sapphire-7star",cat:"brandy",cap:"#2a1d12",glass:"brandy",alc:"40%",serve:"7★",meta2:"aged",name:{en:"Kakhetian Legends · Sapphire",ru:"Легенды Кахети · Sapphire"},style:{en:"Georgian Brandy",ru:"Грузинский коньяк"},pair:{en:"Neat, or with dark chocolate",ru:"В чистом виде или с тёмным шоколадом"},desc:{en:"A classic line of Georgian brandy aged in oak — warm amber with a long, resinous finish.",ru:"Классическая линия грузинского коньяка, выдержанного в дубе — тёплый янтарь и долгое смолистое послевкусие."}},
{id:"cv-kakhetian-legends-olive-5star",cat:"brandy",cap:"#2a1d12",glass:"brandy",alc:"40%",serve:"5★",meta2:"aged",name:{en:"Kakhetian Legends · Olive",ru:"Легенды Кахети · Olive"},style:{en:"Georgian Brandy",ru:"Грузинский коньяк"},pair:{en:"Neat, or with dark chocolate",ru:"В чистом виде или с тёмным шоколадом"},desc:{en:"A classic line of Georgian brandy aged in oak — warm amber with a long, resinous finish.",ru:"Классическая линия грузинского коньяка, выдержанного в дубе — тёплый янтарь и долгое смолистое послевкусие."}},
{id:"cv-kakhetian-legends-ivory-3star",cat:"brandy",cap:"#2a1d12",glass:"brandy",alc:"40%",serve:"3★",meta2:"aged",name:{en:"Kakhetian Legends · Ivory",ru:"Легенды Кахети · Ivory"},style:{en:"Georgian Brandy",ru:"Грузинский коньяк"},pair:{en:"Neat, or with dark chocolate",ru:"В чистом виде или с тёмным шоколадом"},desc:{en:"A classic line of Georgian brandy aged in oak — warm amber with a long, resinous finish.",ru:"Классическая линия грузинского коньяка, выдержанного в дубе — тёплый янтарь и долгое смолистое послевкусие."}},
{id:"cv-didgori-classic-5star",cat:"brandy",cap:"#171410",glass:"brandy",alc:"40%",serve:"3★ · 5★",meta2:"aged",name:{en:"Didgori",ru:"Дидгори"},style:{en:"Georgian Brandy",ru:"Грузинский коньяк"},pair:{en:"Neat",ru:"В чистом виде"},desc:{en:"Named for a Georgian victory — a flask-shaped Georgian brandy, warm and rounded.",ru:"Названный в честь грузинской победы — коньяк в фигурной бутылке, тёплый и округлый."}},
{id:"cv-king-david-prestige-xo",cat:"brandy",cap:"#171410",glass:"brandyred",alc:"40%",serve:"VS · VSOP · XO",meta2:"aged",name:{en:"King David",ru:"Кинг Давид"},style:{en:"Georgian Brandy · Prestige",ru:"Грузинский коньяк · Престиж"},pair:{en:"Digestif, after dinner",ru:"Дижестив, после ужина"},desc:{en:"A regal Georgian brandy in a sculpted decanter — deep amber-red with refined warmth.",ru:"Королевский грузинский коньяк в фигурном графине — глубокий янтарно-красный с изысканной мягкостью."}},
{id:"cv-tellessy-prestige-xo",cat:"brandy",cap:"#171410",glass:"brandy",alc:"40%",serve:"XO",meta2:"aged",name:{en:"Tellessy · XO",ru:"Теллеси · XO"},style:{en:"Prestige Cognac-style",ru:"Престижный коньячный стиль"},pair:{en:"Neat or on the rocks",ru:"В чистом виде или со льдом"},desc:{en:"A prestige brandy in the cognac tradition, in a softly sculpted flask.",ru:"Престижный коньяк в классической традиции, в мягко изогнутой бутылке."}},
{id:"cv-tellessy-prestige-vsop",cat:"brandy",cap:"#171410",glass:"brandy",alc:"40%",serve:"VSOP",meta2:"aged",name:{en:"Tellessy · VSOP",ru:"Теллеси · VSOP"},style:{en:"Prestige Cognac-style",ru:"Престижный коньячный стиль"},pair:{en:"Neat or on the rocks",ru:"В чистом виде или со льдом"},desc:{en:"A prestige brandy in the cognac tradition, in a softly sculpted flask.",ru:"Престижный коньяк в классической традиции, в мягко изогнутой бутылке."}},];

/* ============================================================
   I18N
============================================================ */
const T = {
    en: {
        'nav.about': 'About',
        'nav.collection': 'Collection',
        'nav.brandy': 'Brandy',
        'nav.heritage': 'Heritage',
        'nav.contact': 'Contact',
        'nav.gallery': 'Gallery',
        'hero.eyebrow': 'Wine · Winery · Distillery',
        'hero.title': 'Georgian wine,<br><em>bottled heritage</em>',
        'hero.sub': 'For Georgians the vine is the source of life — and the life of the vine begins in Georgia. GD Company carries that inheritance into every bottle.',
        'hero.cta': 'Explore the collection',
        'hero.cta2': 'Our story',
        'hero.scroll': 'Scroll',
        'cin.chapter': 'Chapter I — Kakheti',
        'cin.story': 'Step inside the<br><em>valley of wine</em>.',
        'cin.storyp': 'Eight thousand years of winemaking, held in a single valley — sheltered by the Caucasus, ripened by a long and gentle sun.',
        'about.eyebrow': 'About the house',
        'about.title': 'Old traditions,<br><em>modern hands</em>',
        'about.p1': 'Georgia is a country that boasts an extraordinary history and culture — one that is inseparable from wine. GD Company preserves the ancient, unmistakable taste of Georgian wine while shaping its own incomparable style.',
        'about.p2': 'By uniting modern technology with the oldest traditions of winemaking, the house brings together a premium line of wine and a classic line of brandy. Each release carries its own history, origin, character and appearance.',
        'about.pull': '“For Georgians the vine is the source of life, while the life of the vine starts from Georgia.”',
        'about.tagk': 'Kakheti, Georgia',
        'about.tagv': 'The cradle of wine',
        'coll.eyebrow': 'The collection',
        'coll.title': 'Wines &amp; brandy of <em>Kakheti</em>',
        'coll.sub': 'A catalogue drawn from selected Georgian varietals — each with its own origin, character and table.',
        'filter.all': 'All',
        'filter.red': 'Red Wines',
        'filter.white': 'White Wines',
        'filter.brandy': 'Brandy',
        'meta.alc': 'Alcohol',
        'meta.serve': 'Serve',
        'meta.aged': 'Range',
        'meta.pair': '',
        'br.eyebrow': 'The distillery',
        'br.title': 'A classic line of <em>Georgian brandy</em>',
        'br.p1': 'From the cellars of Kakheti, GD Company ages its spirits in oak to craft a classic line in the tradition of cognac — warm amber, long resinous finishes, and bottles dressed for the occasion.',
        'br.p2': 'Two houses lead the range — Kakhetian Legends, matured three to seven years, and King David, a regal Georgian brandy offered as VS, VSOP and XO.',
        'br.more': '+ Prestige range',
        'her.eyebrow': 'Georgian heritage',
        'her.title': 'Eight thousand years <em>under the vine</em>',
        'her.sub': 'The story of Georgian wine is the story of a people — written across the valleys of Kakheti, in clay vessels buried beneath the earth.',
        'her.a.t': 'The Alazani Valley',
        'her.a.p': 'Sheltered by the Caucasus, the vineyards of Kakheti ripen under a long warm sun — the heartland of Georgian viticulture.',
        'her.b.t': 'Born of Saperavi',
        'her.b.p': 'The deep, teinturier Saperavi grape gives Georgia its great reds — from dry Saperavi to the celebrated semisweet Kindzmarauli.',
        'her.c.t': 'The Kvevri',
        'her.c.p': 'Fermented and aged in clay vessels — a UNESCO-recognised method thousands of years old.',
        'her.d.t': 'Oak & time',
        'her.d.p': 'Brandies rest for years in oak casks, drawing out colour, warmth and a long harmonic trail.',
        'her.e.t': 'For the world',
        'her.e.p': 'Bottled in Georgia and carried abroad — heritage made for the tables of the world.',
        'st.eyebrow': 'The house in numbers',
        'st.title': 'Winery &amp; <em>distillery</em>',
        'st.l1': 'Signature wines',
        'st.l2': 'Brandy lines',
        'st.l3': 'Region — Kakheti',
        'st.l4': 'Of wine tradition',
        'st.u4': 'yrs',
        'ga.eyebrow': 'The visual archive',
        'ga.title': 'From vine <em>to vessel</em>',
        'co.eyebrow': 'Export inquiries',
        'co.title': 'Let us share <em>Georgia</em>',
        'co.lead': 'We welcome distributors, restaurateurs and partners interested in the wines and brandies of GD Company.',
        'co.k1': 'Address',
        'co.v1': 'Georgia, 1510, Gurjaani municipality, Kachreti village, 3rd street, building 82',
        'co.k2': 'Email',
        'co.k3': 'Phone',
        'co.k4': 'Online',
        'co.f.name': 'Name',
        'co.f.company': 'Company',
        'co.f.email': 'Email',
        'co.f.country': 'Country',
        'co.f.msg': 'Message',
        'co.f.send': 'Send inquiry',
        'co.f.ok': 'Thank you — your inquiry has been noted. We will be in touch soon.',
        'ft.about': 'Production of alcoholic beverages — winery and distillery. Premium Georgian wine and brandy, rooted in the traditions of Kakheti.',
        'ft.explore': 'Explore',
        'ft.contact': 'Contact',
        'ft.rights': 'All rights reserved.',
        'ft.resp': 'Please enjoy responsibly.',
        'ga.cap1': 'Vineyards of Kakheti',
        'ga.cap2': 'Oak cellar',
        'ga.cap3': 'The harvest',
        'ga.cap4': 'Bottled in Georgia',
        'ga.cap5': 'Saperavi grapes',
        'ga.cap6': 'The kvevri'
    }, ru: {
        'nav.about': 'О нас',
        'nav.collection': 'Коллекция',
        'nav.brandy': 'Коньяк',
        'nav.heritage': 'Наследие',
        'nav.contact': 'Контакты',
        'nav.gallery': 'Галерея',
        'hero.eyebrow': 'Вино · Винодельня · Дистиллерия',
        'hero.title': 'Грузинское вино,<br><em>наследие в бутылке</em>',
        'hero.sub': 'Для грузин виноградная лоза — источник жизни, а жизнь лозы начинается в Грузии. GD Company переносит это наследие в каждую бутылку.',
        'hero.cta': 'Смотреть коллекцию',
        'hero.cta2': 'Наша история',
        'hero.scroll': 'Листайте',
        'cin.chapter': 'Глава I — Кахетия',
        'cin.story': 'Войдите в<br><em>долину вина</em>.',
        'cin.storyp': 'Восемь тысяч лет виноделия в одной долине — под защитой Кавказа, под долгим и мягким солнцем.',
        'about.eyebrow': 'О компании',
        'about.title': 'Старые традиции,<br><em>современные руки</em>',
        'about.p1': 'Грузия — страна с удивительной историей и культурой, неотделимой от вина. GD Company сохраняет древний, неповторимый вкус грузинского вина и создаёт собственный, ни с чем не сравнимый стиль.',
        'about.p2': 'Объединяя современные технологии с древнейшими традициями виноделия, компания соединяет премиальную линию вина и классическую линию коньяка. Каждый напиток несёт свою историю, происхождение, характер и облик.',
        'about.pull': '«Для грузин лоза — источник жизни, а жизнь лозы начинается в Грузии».',
        'about.tagk': 'Кахетия, Грузия',
        'about.tagv': 'Колыбель вина',
        'coll.eyebrow': 'Коллекция',
        'coll.title': 'Вино и коньяк <em>Кахетии</em>',
        'coll.sub': 'Каталог из отборных грузинских сортов — у каждого своё происхождение, характер и стол.',
        'filter.all': 'Все',
        'filter.red': 'Красные вина',
        'filter.white': 'Белые вина',
        'filter.brandy': 'Коньяк',
        'meta.alc': 'Алкоголь',
        'meta.serve': 'Подача',
        'meta.aged': 'Линейка',
        'meta.pair': '',
        'br.eyebrow': 'Дистиллерия',
        'br.title': 'Классическая линия <em>грузинского коньяка</em>',
        'br.p1': 'Из погребов Кахетии GD Company выдерживает свои напитки в дубе, создавая классическую линию в традициях коньяка — тёплый янтарь, долгое смолистое послевкусие и бутылки, достойные особого случая.',
        'br.p2': 'Линейку возглавляют две марки — «Легенды Кахети» выдержки от трёх до семи лет и «Кинг Давид», королевский грузинский коньяк в категориях VS, VSOP и XO.',
        'br.more': '+ Престижная линейка',
        'her.eyebrow': 'Грузинское наследие',
        'her.title': 'Восемь тысяч лет <em>под лозой</em>',
        'her.sub': 'История грузинского вина — это история народа, записанная в долинах Кахетии и в глиняных сосудах под землёй.',
        'her.a.t': 'Алазанская долина',
        'her.a.p': 'Под защитой Кавказа виноградники Кахетии созревают под долгим тёплым солнцем — сердце грузинского виноделия.',
        'her.b.t': 'Рождённое Саперави',
        'her.b.p': 'Глубокий красящий сорт Саперави даёт Грузии её великие красные вина — от сухого Саперави до прославленной полусладкой Киндзмараули.',
        'her.c.t': 'Квеври',
        'her.c.p': 'Брожение и выдержка в глиняных сосудах — метод, признанный ЮНЕСКО, которому тысячи лет.',
        'her.d.t': 'Дуб и время',
        'her.d.p': 'Коньяки годами отдыхают в дубовых бочках, обретая цвет, тепло и долгий гармоничный шлейф.',
        'her.e.t': 'Для мира',
        'her.e.p': 'Разлито в Грузии и отправлено за рубеж — наследие для столов всего мира.',
        'st.eyebrow': 'Дом в цифрах',
        'st.title': 'Винодельня и <em>дистиллерия</em>',
        'st.l1': 'Авторских вин',
        'st.l2': 'Линий коньяка',
        'st.l3': 'Регион — Кахетия',
        'st.l4': 'Винной традиции',
        'st.u4': 'лет',
        'ga.eyebrow': 'Визуальный архив',
        'ga.title': 'От лозы <em>к сосуду</em>',
        'co.eyebrow': 'Экспортные запросы',
        'co.title': 'Поделимся <em>Грузией</em>',
        'co.lead': 'Мы рады дистрибьюторам, рестораторам и партнёрам, заинтересованным в винах и коньяках GD Company.',
        'co.k1': 'Адрес',
        'co.v1': 'Грузия, 1510, Гурджаанский муниципалитет, село Качрети, 3-я улица, здание 82',
        'co.k2': 'Эл. почта',
        'co.k3': 'Телефон',
        'co.k4': 'Сайт',
        'co.f.name': 'Имя',
        'co.f.company': 'Компания',
        'co.f.email': 'Эл. почта',
        'co.f.country': 'Страна',
        'co.f.msg': 'Сообщение',
        'co.f.send': 'Отправить запрос',
        'co.f.ok': 'Спасибо — ваш запрос принят. Мы скоро свяжемся с вами.',
        'ft.about': 'Производство алкогольных напитков — винодельня и дистиллерия. Премиальное грузинское вино и коньяк в традициях Кахетии.',
        'ft.explore': 'Разделы',
        'ft.contact': 'Контакты',
        'ft.rights': 'Все права защищены.',
        'ft.resp': 'Пейте ответственно.',
        'ga.cap1': 'Виноградники Кахетии',
        'ga.cap2': 'Дубовый погреб',
        'ga.cap3': 'Сбор урожая',
        'ga.cap4': 'Разлито в Грузии',
        'ga.cap5': 'Виноград Саперави',
        'ga.cap6': 'Квеври'
    }
};

let LANG = 'en';

/* ============================================================
   SVG FACTORIES
============================================================ */
function logoSVG() {
    return `<svg viewBox="0 0 64 76" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M32 8 C20 8 14 16 14 30 C14 46 24 56 32 60 C40 56 50 46 50 30 C50 16 44 8 32 8Z"/>
    <path d="M26 6 Q24 2 20 4 M38 6 Q40 2 44 4"/>
    <path d="M19 24 q-5 -3 -8 1 M45 24 q5 -3 8 1"/>
    <g stroke-width="1.1">
      <circle cx="16" cy="50" r="2"/><circle cx="20" cy="53" r="2"/><circle cx="18" cy="56" r="2"/>
      <circle cx="48" cy="50" r="2"/><circle cx="44" cy="53" r="2"/><circle cx="46" cy="56" r="2"/>
    </g>
    <text x="32" y="40" text-anchor="middle" font-family="Fraunces,serif" font-size="20" fill="currentColor" stroke="none" font-weight="500" letter-spacing="-1">GD</text>
    <text x="32" y="71" text-anchor="middle" font-family="Manrope,sans-serif" font-size="6" fill="currentColor" stroke="none" letter-spacing="3" font-weight="700">COMPANY</text>
  </svg>`;
}

/* engraved vineyard landscape (reusable) */
function landscapeSVG() {
    let rows = '';
    // perspective rows from vanishing point
    for (let i = -8; i <= 8; i++) {
        const xb = 300 + i * 42;
        rows += `<line x1="300" y1="158" x2="${xb}" y2="300"/>`;
    }
    // curved horizontal rows, denser near horizon
    for (let k = 1; k <= 6; k++) {
        const y = 158 + k * k * 3.6;
        rows += `<path d="M40 ${y} Q300 ${y - 8} 560 ${y}"/>`;
    }
    return `<svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMax slice" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" aria-hidden="true">
    <g opacity=".55" stroke-width=".8">
      <path d="M0 90 Q150 70 300 86 T600 80"/>
      <path d="M0 110 Q180 96 360 108 T600 104"/>
    </g>
    <circle cx="470" cy="70" r="26" opacity=".5"/>
    <g opacity=".55"><path d="M444 70 h-14 M496 70 h14 M470 44 v-14 M470 96 v14 M452 52 l-10 -10 M488 52 l10 -10"/></g>
    <path d="M0 150 Q120 120 230 142 Q330 162 430 134 Q520 110 600 140 L600 320 L0 320Z" fill="currentColor" opacity=".06" stroke="none"/>
    <path d="M0 150 Q120 120 230 142 Q330 162 430 134 Q520 110 600 140" opacity=".7"/>
    <g opacity=".5">${rows}</g>
    <g opacity=".7" stroke-width="1.1">
      <path d="M150 150 v-16 M150 134 q-7 -2 -9 -8 M150 138 q7 -2 9 -8"/>
      <path d="M420 146 v-18 M420 128 q-7 -2 -9 -8 M420 132 q7 -2 9 -8"/>
      <rect x="318" y="128" width="22" height="16"/><path d="M316 128 l11 -9 l13 9"/>
    </g>
  </svg>`;
}

/* Bottle photography (optimised WebP, with intrinsic size to avoid layout shift). */
const BOTTLE_IMG = {
    'kindzmarauli':      {src: 'images/2022_p11_x113_649x1660.webp', w: 360, h: 900},
    'saperavi':          {src: 'images/2022_p12_x120_649x1660.webp', w: 360, h: 900},
    'khvanchkara':       {src: 'images/2022_p19_x183_638x1660.webp', w: 354, h: 900},
    'alazani-red':       {src: 'images/2022_p13_x127_649x1660.webp', w: 360, h: 900},
    'kvareli':           {src: 'images/2022_p14_x134_649x1660.webp', w: 360, h: 900},
    'alazani-white':     {src: 'images/2022_p15_x141_649x1660.webp', w: 360, h: 900},
    'tsinandali':        {src: 'images/2022_p16_x148_649x1660.webp', w: 360, h: 900},
    'rkatsiteli':        {src: 'images/2022_p17_x153_649x1660.webp', w: 220, h: 900},
    'kakhetian-legends': {src: 'images/2022_p28_x278_391x1221.webp', w: 204, h: 900},
    'king-david':        {src: 'images/2022_p32_x320_560x974.webp',  w: 493, h: 900},
    'tellessy':          {src: 'images/2022_p26_x258_482x1033.webp', w: 426, h: 900},
    'didgori':           {src: 'images/2022_p31_x307_667x1171.webp', w: 520, h: 900},
    'suli':              {src: 'images/2022_p27_x269_488x1780.webp', w: 189, h: 900},
    'venus':             {src: 'images/2022_p34_x340_790x1406.webp', w: 512, h: 900},
    'special-reserve':      {src: 'images/special-reserve.webp',      w: 248, h: 538},
    'saperavi-reserve':     {src: 'images/saperavi-reserve.webp',     w: 191, h: 548},
    'alazani-reserve':      {src: 'images/alazani-reserve.webp',      w: 200, h: 540},
    'alazani-estate-white': {src: 'images/alazani-estate-white.webp', w: 153, h: 605},
    'rkatsiteli-estate':    {src: 'images/rkatsiteli-estate.webp',    w: 151, h: 602},
    'alazani-estate-red':   {src: 'images/alazani-estate-red.webp',   w: 142, h: 603},
    'saperavi-estate':      {src: 'images/saperavi-estate.webp',      w: 153, h: 605},
"cv-alazani-red-gold": {src: 'images/cv-alazani-red-gold.webp', w: 208, h: 892},
    "cv-saperavi-gold": {src: 'images/cv-saperavi-gold.webp', w: 205, h: 894},
    "cv-kvareli-gold": {src: 'images/cv-kvareli-gold.webp', w: 200, h: 892},
    "cv-kindzmarauli-gold": {src: 'images/cv-kindzmarauli-gold.webp', w: 200, h: 892},
    "cv-khvanchkara-gold": {src: 'images/cv-khvanchkara-gold.webp', w: 205, h: 900},
    "cv-alazani-red-classic": {src: 'images/cv-alazani-red-classic.webp', w: 212, h: 900},
    "cv-khvanchkara-classic": {src: 'images/cv-khvanchkara-classic.webp', w: 210, h: 898},
    "cv-kindzmarauli-classic": {src: 'images/cv-kindzmarauli-classic.webp', w: 210, h: 898},
    "cv-kvareli-classic": {src: 'images/cv-kvareli-classic.webp', w: 200, h: 893},
    "cv-saperavi-classic": {src: 'images/cv-saperavi-classic.webp', w: 206, h: 900},
    "cv-alazani-red-export": {src: 'images/cv-alazani-red-export.webp', w: 209, h: 891},
    "cv-khvanchkara-export": {src: 'images/cv-khvanchkara-export.webp', w: 206, h: 895},
    "cv-kindzmarauli-export": {src: 'images/cv-kindzmarauli-export.webp', w: 199, h: 890},
    "cv-saperavi-export": {src: 'images/cv-saperavi-export.webp', w: 199, h: 890},
    "cv-kvareli-export": {src: 'images/cv-kvareli-export.webp', w: 206, h: 900},
    "cv-pirosmani-red-tile": {src: 'images/cv-pirosmani-red-tile.webp', w: 160, h: 712},
    "cv-pirosmani-white-tile": {src: 'images/cv-pirosmani-white-tile.webp', w: 165, h: 712},
    "cv-kakhetian-legends-georgian-alco-7star": {src: 'images/cv-kakhetian-legends-georgian-alco-7star.webp', w: 197, h: 863},
    "cv-kakhetian-legends-classic-7star": {src: 'images/cv-kakhetian-legends-classic-7star.webp', w: 175, h: 849},
    "cv-kakhetian-legends-imperial-vsop": {src: 'images/cv-kakhetian-legends-imperial-vsop.webp', w: 154, h: 834},
    "cv-kakhetian-legends-imperial-gold-vsop": {src: 'images/cv-kakhetian-legends-imperial-gold-vsop.webp', w: 157, h: 851},
    "cv-kakhetian-legends-ribbon-7star": {src: 'images/cv-kakhetian-legends-ribbon-7star.webp', w: 176, h: 852},
    "cv-kakhetian-legends-crimson-7star": {src: 'images/cv-kakhetian-legends-crimson-7star.webp', w: 174, h: 849},
    "cv-kakhetian-legends-sapphire-7star": {src: 'images/cv-kakhetian-legends-sapphire-7star.webp', w: 175, h: 850},
    "cv-kakhetian-legends-olive-5star": {src: 'images/cv-kakhetian-legends-olive-5star.webp', w: 176, h: 847},
    "cv-kakhetian-legends-ivory-3star": {src: 'images/cv-kakhetian-legends-ivory-3star.webp', w: 175, h: 846},
    "cv-didgori-classic-5star": {src: 'images/cv-didgori-classic-5star.webp', w: 396, h: 863},
    "cv-king-david-prestige-xo": {src: 'images/cv-king-david-prestige-xo.webp', w: 394, h: 735},
    "cv-tellessy-prestige-xo": {src: 'images/cv-tellessy-prestige-xo.webp', w: 367, h: 802},
    "cv-tellessy-prestige-vsop": {src: 'images/cv-tellessy-prestige-vsop.webp', w: 364, h: 795}
};

function escapeAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function bottleSVG(item, scale, cls) {
    const img = BOTTLE_IMG[item.id];
    if (!img) return '';
    const name = (item.name && item.name[LANG]) ? item.name[LANG] : '';
    const klass = cls ? 'bottle ' + cls : 'bottle';
    return `<img class="${klass}" src="${img.src}" alt="${escapeAttr(name)}" width="${img.w}" height="${img.h}" style="height:${scale}px;width:auto" loading="lazy" decoding="async">`;
}

/* heritage decorative motifs */
function grapesSVG() {
    return `<svg viewBox="0 0 120 140" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M60 10 q14 6 18 22"/><path d="M60 10 q-8 4 -10 14"/>
  ${[[40, 46], [60, 46], [80, 46], [30, 66], [50, 66], [70, 66], [90, 66], [40, 86], [60, 86], [80, 86], [50, 106], [70, 106], [60, 124]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="11"/>`).join('')}
  <path d="M84 26 q14 -4 22 6 q-10 8 -22 2" /><path d="M80 30 q2 8 6 12"/></svg>`;
}

function kvevriSVG() {
    return `<svg viewBox="0 0 90 120" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M36 8 h18 l-3 14 q22 12 22 46 q0 44 -28 44 q-28 0 -28 -44 q0 -34 22 -46 Z"/>
  <path d="M22 60 q23 10 46 0 M26 84 q19 8 38 0"/></svg>`;
}

function barrelSVG() {
    return `<svg viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M30 18 q30 -8 60 0 q14 32 0 64 q-30 8 -60 0 q-14 -32 0 -64Z"/>
  <path d="M26 38 q34 8 68 0 M26 60 q34 8 68 0"/><line x1="60" y1="14" x2="60" y2="86"/></svg>`;
}

function bottleIconSVG() {
    return `<svg viewBox="0 0 60 120" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M24 6 h12 v34 q8 6 8 20 v48 q0 8 -8 8 h-12 q-8 0 -8 -8 V60 q0 -14 8 -20 Z"/>
  <rect x="16" y="74" width="28" height="26"/></svg>`;
}

/* stat & contact icons */
const IC = {
    wine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3h12l-1 7a5 5 0 0 1-10 0Z"/><path d="M12 17v4M8 21h8"/></svg>',
    brandy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 3h6v4l3 4v6a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-6l3-4Z"/><path d="M6 13h12"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    vine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v8M8 7c-3 1-5 4-5 8M16 7c3 1 5 4 5 8"/><circle cx="6" cy="17" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="18" cy="17" r="2"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="1" fill="currentColor"/></svg>'
};

/* small inline glass icon used in each product card's pairing row */
const PAIR_ICON = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 3h12l-1 7a5 5 0 0 1-10 0Z"/><path d="M12 17v4M8 21h8"/></svg>';

/* gallery scenes */
function galleryScene(type) {
    const grapes = (color) => `<svg class="scene scene-inner" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="background:${color}">
    <g fill="none" stroke="rgba(246,241,232,.55)" stroke-width="2">
      ${Array.from({length: 40}).map(() => {
        const x = Math.random() * 400, y = Math.random() * 300, r = 10 + Math.random() * 8;
        return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(0)}"/>`;
    }).join('')}
    </g></svg>`;
    switch (type) {
        case 'vineyard':
            return `<div class="scene-inner" style="background:linear-gradient(160deg,#2c3a2a,#18211a);color:rgba(246,241,232,.6)">${landscapeSVG()}</div>`;
        case 'cellar':
            return `<svg class="scene scene-inner" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="background:linear-gradient(160deg,#3a2a1c,#211610);color:rgba(201,146,90,.7)">
      <g fill="none" stroke="currentColor" stroke-width="2">${[40, 140, 240, 340].map(x => `<path d="M${x} 90 q34 -10 68 0 q12 50 0 110 q-34 10 -68 0 q-12 -50 0 -110Z"/><path d="M${x - 4} 120 q38 10 76 0 M${x - 4} 170 q38 10 76 0"/>`).join('')}</g></svg>`;
        case 'harvest':
            return grapes('linear-gradient(160deg,#4a5a2a,#2c3618)');
        case 'bottle':
            return `<svg class="scene scene-inner" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="background:radial-gradient(circle at 50% 30%,#7a2233,#3a0d15);color:rgba(246,241,232,.7)">
      <g fill="none" stroke="currentColor" stroke-width="2" transform="translate(150,40)">${bottleIconSVG().replace('<svg viewBox="0 0 60 120" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">', '<g transform="scale(1.7)">').replace('</svg>', '</g>')}</g></svg>`;
        case 'saperavi':
            return grapes('linear-gradient(160deg,#3a2548,#1c1226)');
        case 'kvevri':
            return `<svg class="scene scene-inner" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="background:linear-gradient(160deg,#5a4632,#2e2316);color:rgba(246,241,232,.6)">
      <g transform="translate(150,40) scale(1.6)">${kvevriSVG().replace('<svg viewBox="0 0 90 120" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">', '<g>').replace('</svg>', '</g>')}</g></svg>`;
    }
}

/* ============================================================
   RENDER
============================================================ */
function renderCards(filter = 'all') {
    const grid = document.getElementById('grid');
    if (!grid) return;
    const tr = T[LANG];
    grid.innerHTML = PRODUCTS.map(p => {
        const show = filter === 'all' || p.cat === filter;
        const meta2val = typeof p.serve === 'object' ? p.serve[LANG] : p.serve;
        const meta2lbl = p.meta2 === 'aged' ? tr['meta.aged'] : tr['meta.serve'];
        return `
      <article class="card reveal${show ? '' : ' hide'}" data-cat="${p.cat}">
      <div class="bottle-stage">
        <span class="tag-cat">${p.style[LANG]}</span>
        ${bottleSVG(p, 248)}
      </div>
      <div class="body">
        <h3>${p.name[LANG]}</h3>
        <div class="style">${p.style[LANG]}</div>
        <p class="desc">${p.desc[LANG]}</p>
        <div class="meta">
          <div class="m"><div class="lbl">${tr['meta.alc']}</div><div class="val">${p.alc}</div></div>
          <div class="m"><div class="lbl">${meta2lbl}</div><div class="val">${meta2val}</div></div>
        </div>
        <div class="pairing">${PAIR_ICON}<span>${p.pair[LANG]}</span></div>
      </div></article>`;
    }).join('');
    observeReveals();
}

function renderBrandyStage() {
    const stage = document.getElementById('brandyStage');
    if (!stage) return;
    const legends = PRODUCTS.find(p => p.id === 'kakhetian-legends');
    const king = PRODUCTS.find(p => p.id === 'king-david');
    const venus = PRODUCTS.find(p => p.id === 'venus');
    if (!legends || !king || !venus) return;
    stage.innerHTML =
        bottleSVG(venus, 330, 'b2') +
        bottleSVG(king, 380, 'b1') +
        bottleSVG(legends, 330, 'b3');
}

function renderGallery() {
    const gmas = document.getElementById('gmas');
    if (!gmas) return; // gallery section is optional / may be disabled in markup
    const items = [{type: 'vineyard', cap: 'ga.cap1', cls: 'g-wide'}, {
        type: 'saperavi', cap: 'ga.cap5', cls: 'g-tall'
    }, {type: 'cellar', cap: 'ga.cap2', cls: 'g-sq'}, {type: 'harvest', cap: 'ga.cap3', cls: 'g-wide'}, {
        type: 'kvevri', cap: 'ga.cap6', cls: 'g-tall'
    }, {type: 'bottle', cap: 'ga.cap4', cls: 'g-sq'},];
    gmas.innerHTML = '';
    items.forEach((it, i) => {
        const d = document.createElement('figure');
        d.className = 'gphoto ' + it.cls + ' reveal' + (i % 3 ? (' d' + (i % 3)) : '');
        d.innerHTML = `<div class="${it.cls}">${galleryScene(it.type)}</div><figcaption class="cap" data-i18n="${it.cap}">${T[LANG][it.cap]}</figcaption>`;
        gmas.appendChild(d);
    });
    observeReveals();
}

/* ============================================================
   I18N APPLY
============================================================ */
function applyI18n() {
    document.documentElement.lang = LANG;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (T[LANG][k] !== undefined) el.textContent = T[LANG][k];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const k = el.getAttribute('data-i18n-html');
        if (T[LANG][k] !== undefined) el.innerHTML = T[LANG][k];
    });
    document.querySelectorAll('.lang button, .mlang button').forEach(b => b.classList.toggle('active', b.dataset.lang === LANG));
}

function setLang(l) {
    LANG = l;
    applyI18n();
    renderCards(currentFilter);
    renderGallery();
}

/* ============================================================
   REVEAL HOOK
   The motion layer (animations.js, GSAP) owns scroll reveals when
   the document has the `.anim` flag. Here we just notify it that
   (re)rendered content is ready. Without `.anim` (reduced motion or
   no JS-motion), CSS keeps everything visible — nothing to do.
============================================================ */
function observeReveals() {
    document.dispatchEvent(new CustomEvent('content:rendered'));
}

/* ============================================================
   INIT
============================================================ */
let currentFilter = 'all';

const $ = (id) => document.getElementById(id);

function setHTML(id, html) {
    const el = $(id);
    if (el) el.innerHTML = html;
}

function init() {
    // brand marks (hero/about/heritage scenes are real photos in the markup)
    setHTML('logoMark', logoSVG());
    setHTML('logoMarkFoot', logoSVG());
    setHTML('stIc1', IC.wine);
    setHTML('stIc2', IC.brandy);
    setHTML('stIc3', IC.pin);
    setHTML('stIc4', IC.vine);
    setHTML('coIc1', IC.pin);
    setHTML('coIc2', IC.mail);
    setHTML('coIc3', IC.phone);
    const yr = $('yr');
    if (yr) yr.textContent = String(new Date().getFullYear());

    // dynamic content
    renderCards();
    renderBrandyStage();
    renderGallery();
    applyI18n();
    observeReveals();

    // sticky nav state on scroll
    const nav = $('nav');
    if (nav) {
        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, {passive: true});
    }

    // language switch
    document.querySelectorAll('.lang button, .mlang button').forEach(b => {
        b.addEventListener('click', () => setLang(b.dataset.lang));
    });

    // mobile menu
    const burger = $('burger');
    if (burger) {
        burger.addEventListener('click', () => document.body.classList.toggle('menu-open'));
    }
    document.querySelectorAll('#mobileMenu a').forEach(a => {
        a.addEventListener('click', () => document.body.classList.remove('menu-open'));
    });

    // collection filters
    const filters = $('filters');
    if (filters) {
        filters.addEventListener('click', e => {
            const b = e.target.closest('button');
            if (!b) return;
            filters.querySelectorAll('button').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            currentFilter = b.dataset.filter;
            renderCards(currentFilter);
        });
    }

    // contact form (client-side acknowledgement)
    const sendBtn = $('sendBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const f = $('cform');
            if (!f) return;
            const name = f.querySelector('[name=name]');
            const email = f.querySelector('[name=email]');
            if (name && !name.value.trim()) { name.focus(); return; }
            if (email && !email.value.trim()) { email.focus(); return; }
            f.classList.add('sent');
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
})();
