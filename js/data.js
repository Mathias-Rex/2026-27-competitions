/* Dátumkezelés, időtengely határok és a versenyek teljes adatmodellje. */

// =========================================================================
// 1. DINAMIKUS DÁTUM KEZELÉS (new Date() alapján) & IDŐTENGELY HATÁROK
// =========================================================================
const HU_MONTHS_SHORT = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'];

function getTodayInfo() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const isoStr = `${yyyy}-${mm}-${dd}`;
    const shortHu = `${HU_MONTHS_SHORT[now.getMonth()]} ${now.getDate()}.`;
    const fullHu = `${yyyy}. ${shortHu}`;
    return { now, isoStr, shortHu, fullHu };
}

const TODAY_INFO = getTodayInfo();
const TODAY_STR = TODAY_INFO.isoStr;

// Egységes vízszintes időtengely: 2026. november – 2027. április
const TIMELINE_START = new Date('2026-10-28T00:00:00');
const TIMELINE_END   = new Date('2027-04-18T23:59:59');

// =========================================================================
// 2. VERSENYEK TELJES ADATMODELLJE
// =========================================================================
// Workshop-dokumentumok (downloads/ mappa), az esemény ablakában és a részletező panelen jelennek meg
const WORKSHOP_DOCS = {
    oceanCat: { title: 'Ocean Cat workshop kézikönyv', desc: 'A 7-es csapat (Code Trio) napja: menetrend, feladatok, munkamódszer.', file: 'downloads/ocean-cat-workshop-kezikonyv.pdf', size: '1,2 MB' },
    recycling: { title: 'Recycling Centre Tycoon kézikönyv', desc: 'A 8-as csapat napja: menetrend, feladatok, munkamódszer.', file: 'downloads/recycling-centre-tycoon-kezikonyv.pdf', size: '1,2 MB' },
    home: { title: 'Otthoni felkészülés', desc: 'Telepítés otthon (kb. 45 perc): programok, GitHub- és Trello-fiók, AI-eszközök, próba.', file: 'downloads/otthoni-telepitesi-utmutato.pdf', size: '339 KB' },
    consent: { title: 'Szülői nyilatkozat', desc: 'Hozzájáruló nyilatkozat a workshopon való részvételhez és az online fiókokhoz, adatkezelési tájékoztató.', file: 'downloads/szuloi-nyilatkozat.pdf', size: '116 KB' }
};

// A workshopokon készülő játékprojektek (az oldal alján, a dokumentumok szekció után jelennek meg)
const WORKSHOP_PROJECTS = [
    {
        id: 'ocean-cat',
        title: 'Ocean Cat',
        team: 'Code Trio',
        logo: 'img/code-trio.jpg',
        teamInfo: '7. osztály, 3 fős csapat',
        eventId: 'radnoti-ws1',
        date: '2026. nov. 28., 9:00–16:00',
        summary: 'Egy úszó macska a tengeri műanyag szemetet tolja egy gyűjtőhelyre, miközben az óra ketyeg. A gyerekek megtervezik és ellenőrzik a játékot, az AI építi meg.',
        docs: [WORKSHOP_DOCS.oceanCat, WORKSHOP_DOCS.home, WORKSHOP_DOCS.consent]
    },
    {
        id: 'recycling-centre-tycoon',
        title: 'Recycling Centre Tycoon',
        team: '0xd15ea5ed',
        logo: 'img/0xd15ea5ed.png',
        teamInfo: '8. osztály, 4 fős csapat',
        eventId: 'radnoti-ws2',
        date: '2026. dec. 5., 9:00–16:00',
        summary: 'Egy újrahasznosító központ vezetése: a szalagon érkező hulladékot a négy konténerbe kell sorolni, a bevételből fejleszteni lehet. A gyerekek megtervezik és ellenőrzik a játékot, az AI építi meg.',
        docs: [WORKSHOP_DOCS.recycling, WORKSHOP_DOCS.home, WORKSHOP_DOCS.consent]
    }
];

const competitions = [
    {
        id: 'radnoti',
        name: 'Radnóti HACK & CODE a bolygóért',
        shortName: 'Radnóti HACK & CODE',
        organizer: 'Baranya Vármegyei SZC Radnóti Miklós Közgazdasági Technikum',
        address: '7633 Pécs, Esztergár L. út 6.',
        targetGroup: '7–8. évfolyamos diákok (2–4 fős csapatok)',
        color: '#16A34A',        // Zöld
        dark: { color: '#16a34a', bgLight: '#12301f', bgBar: 'rgba(74, 222, 128, 0.20)', borderColor: '#166534', textDark: '#86efac' },
        bgLight: '#DCFCE7',
        bgBar: 'rgba(22, 163, 74, 0.16)',
        borderColor: '#86EFAC',
        textDark: '#14532D',
        active: true,
        details: {
            participants: '7–8. évfolyamos tanulókból álló 2–4 fős csapatok. Egy iskolából tetszőleges számú csapat nevezhető; a regisztrációt a felkészítő tanár végzi, és minden tanulónak kötelező a szülői nyilatkozat leadása.',
            theme: '„Egy élhetőbb jövő – technológiai megoldások a globális felmelegedés kihívásaira."',
            roundsSummary: [
                '2026. nov. 6.: Nevezési határidő (ingyenes, előzetes regisztrációhoz kötött)',
                '2026. nov. 16.: I. online forduló kezdete (informatikai, logikai és kreatív feladatok)',
                '2026. dec. 11.: I. forduló feladatainak leadási határideje (a „Zöld Küldetés” játékkészítési feladaté 23:59-ig)',
                '2026. dec. 18.: I. forduló kiértékelése és a továbbjutók értesítése',
                '2027. jan. 8.: II. személyes forduló Pécsen (1. rész: 30 perces szabadulószoba-kihívás; 2. rész: 60 perces Scratch-programozás; 3. rész: 30 perces iskolaismereti játék)',
                '2027. jan. 15.: II. forduló kiértékelése és a döntősök értesítése',
                '2027. febr. 5.: III. forduló – Döntő (komplex projekt prezentálása szakmai zsűri előtt)'
            ],
            ourTeams: [
                { name: 'Code Trio', size: '3 fős', grade: 'csak hetedikesek', logo: 'img/code-trio.jpg' },
                { name: '0xd15ea5ed', size: '4 fős', grade: 'csak nyolcadikosok', logo: 'img/0xd15ea5ed.png' }
            ],
            prizes: 'Oklevél minden döntősnek, értékes vásárlási utalványok az 1–3. helyezett csapatoknak, a felkészítő pedagógusok külön jutalmazása, valamint az I. helyezett csapat tagjainak felvételi lehetőség az iskolába.',
            contacts: 'Verseny e-mail: pecsiradnoti.verseny@gmail.com | Titkárság: titkar@radnoti-pecs.hu | Tel: 72/257-859',
            links: [
                { label: 'Regisztrációs űrlap (Google Forms)', url: 'https://forms.gle/eR3HK92LVR8pH4cw5', primary: true },
                { label: 'Iskola honlapja (radnoti-pecs.hu)', url: 'http://www.radnoti-pecs.hu', primary: false }
            ]
        },
        events: [
            {
                id: 'radnoti-1',
                date: '2026-11-06',
                displayDate: '2026. nov. 6.',
                shortLabel: 'Nevezés',
                title: 'Nevezési határidő',
                description: 'Ingyenes, előzetes regisztrációhoz kötött nevezés: a regisztrációs űrlapot a felkészítő tanár tölti ki, és minden tanulónak kötelező a szülői nyilatkozat leadása.',
                location: 'Online (Google Űrlap)',
                linkUrl: 'https://forms.gle/eR3HK92LVR8pH4cw5',
                linkLabel: 'Regisztrációs űrlap',
                isFinal: false,
                laneOffset: -1
            },
            {
                id: 'radnoti-2',
                date: '2026-11-16',
                displayDate: '2026. nov. 16.',
                shortLabel: 'I. ford. rajt',
                title: 'I. online forduló kezdete',
                description: 'Informatikai, logikai és kreatív feladatok megoldása az „Egy élhetőbb jövő – technológiai megoldások a globális felmelegedés kihívásaira” témakörben.',
                location: 'Online',
                linkUrl: 'http://www.radnoti-pecs.hu',
                linkLabel: 'Iskola honlapja',
                isFinal: false,
                laneOffset: 1
            },
            {
                id: 'radnoti-ws1',
                date: '2026-11-28',
                displayDate: '2026. nov. 28.',
                displayTime: '9:00–16:00',
                startTime: '09:00',
                endTime: '16:00',
                shortLabel: 'Workshop (7-esek)',
                title: 'Pályamunka workshop (7-es csapat)',
                description: 'Tervezett workshop a pályamunka elkészítéséhez, 9:00–16:00. Mindenki hozzon notebookot és okostelefont (ha nincs, jelezzétek, és kikérjük az iskolától), valamint rágcsát, üdítőt és készpénzt az ebédre. Ebédszünet: 12:00–12:30; ha valaki elviszi a gyermeket ebédszünetre, megvárjuk. Előtte otthon érdemes elvégezni a telepítést (kb. 45 perc, lásd az otthoni felkészülési útmutatót), a kitöltött útmutatót és az aláírt szülői nyilatkozatot hozzátok magatokkal.',
                location: 'NanoworX Kft. tárgyaló, Vadász utca 79.',
                documents: [WORKSHOP_DOCS.oceanCat, WORKSHOP_DOCS.home, WORKSHOP_DOCS.consent],
                isFinal: false,
                laneOffset: -1
            },
            {
                id: 'radnoti-ws2',
                date: '2026-12-05',
                displayDate: '2026. dec. 5.',
                displayTime: '9:00–16:00',
                startTime: '09:00',
                endTime: '16:00',
                shortLabel: 'Workshop (8-asok)',
                title: 'Pályamunka workshop (8-asok)',
                description: 'Tervezett workshop a pályamunka elkészítéséhez, 9:00–16:00. Mindenki hozzon notebookot és okostelefont (ha nincs, jelezzétek, és kikérjük az iskolától), valamint rágcsát, üdítőt és készpénzt az ebédre. Ebédszünet: 12:00–12:30; ha valaki elviszi a gyermeket ebédszünetre, megvárjuk. Előtte otthon érdemes elvégezni a telepítést (kb. 45 perc, lásd az otthoni felkészülési útmutatót), a kitöltött útmutatót és az aláírt szülői nyilatkozatot hozzátok magatokkal.',
                location: 'NanoworX Kft. tárgyaló, Vadász utca 79.',
                documents: [WORKSHOP_DOCS.recycling, WORKSHOP_DOCS.home, WORKSHOP_DOCS.consent],
                isFinal: false,
                laneOffset: 1
            },
            {
                id: 'radnoti-3',
                date: '2026-12-11',
                displayDate: '2026. dec. 11.',
                shortLabel: 'I. ford. leadás',
                title: 'I. forduló feladatainak leadási határideje',
                description: 'Az I. online forduló informatikai, logikai és kreatív feladatmegoldásainak végleges beküldése. A 2. rész, a „Zöld Küldetés” (böngészőben futó, HTML/CSS/JavaScript alapú, környezetvédelmi témájú játék, AI eszközzel készítve) leadási határideje 23:59. Mellékelni kell az AI-generált eredeti forráskódot és médiaelemeket, a kész játék teljes forráskódját és felhasználói dokumentációt; tömörítve e-mailben, nagy fájlnál Google Drive linkkel.',
                location: 'Online',
                linkUrl: 'http://www.radnoti-pecs.hu',
                linkLabel: 'Iskola honlapja',
                isFinal: false,
                laneOffset: -1
            },
            {
                id: 'radnoti-4',
                date: '2026-12-18',
                displayDate: '2026. dec. 18.',
                shortLabel: 'I. eredmény',
                title: 'I. forduló kiértékelése és továbbjutók értesítése',
                description: 'Az I. online forduló kiértékelése és a II. személyes fordulóba jutó csapatok értesítése.',
                location: 'E-mail értesítés',
                isFinal: false,
                laneOffset: 1
            },
            {
                id: 'radnoti-5',
                date: '2027-01-08',
                displayDate: '2027. jan. 8.',
                shortLabel: 'II. ford. (Pécs)',
                title: 'II. személyes forduló Pécsen',
                description: '1. rész: 30 perces szabadulószoba-kihívás; 2. rész: 60 perces Scratch-programozás; 3. rész: 30 perces iskolaismereti játék. A kezdés pontos időpontjáról az I. fordulóból továbbjutott csapatokat előzetesen tájékoztatják.',
                location: '7633 Pécs, Esztergár L. út 6.',
                isFinal: false,
                laneOffset: -1
            },
            {
                id: 'radnoti-6',
                date: '2027-01-15',
                displayDate: '2027. jan. 15.',
                shortLabel: 'II. eredmény',
                title: 'II. forduló kiértékelése és döntősök értesítése',
                description: 'A személyes forduló kiértékelése és a III. fordulóba (döntőbe) jutott csapatok értesítése.',
                location: 'E-mail értesítés',
                isFinal: false,
                laneOffset: 1
            },
            {
                id: 'radnoti-7',
                date: '2027-02-05',
                displayDate: '2027. febr. 5.',
                shortLabel: 'III. ford. DÖNTŐ',
                title: 'III. forduló – Döntő',
                description: 'Komplex projekt prezentálása szakmai zsűri előtt (a kezdés időpontja a kiírásban még nincs megadva). Díjazás: oklevél minden döntősnek, vásárlási utalványok az 1–3. helyezetteknek, felvételi lehetőség az I. helyezettnek.',
                location: '7633 Pécs, Esztergár L. út 6.',
                isFinal: true,
                laneOffset: -1
            }
        ]
    },
    {
        id: 'neumann',
        name: '23. Neumann János Kárpát-medencei Informatikai Programtermék Verseny',
        shortName: 'Neumann János Verseny',
        organizer: 'Szekszárdi I. Béla Gimnázium & NJSzT',
        address: 'Szekszárdi I. Béla Gimnázium (döntő helyszíne), 7100 Szekszárd, Kadarka u. 25–27.',
        targetGroup: 'Általános és középiskolások (20 év alatt, egyéni vagy csapat)',
        color: '#2563EB',        // Kék
        dark: { color: '#3b82f6', bgLight: '#1a2a52', bgBar: 'rgba(96, 165, 250, 0.20)', borderColor: '#1e40af', textDark: '#93c5fd' },
        bgLight: '#DBEAFE',
        bgBar: 'rgba(37, 99, 235, 0.16)',
        borderColor: '#93C5FD',
        textDark: '#1E3A8A',
        active: true,
        details: {
            participants: 'Általános és középiskolás diákok (akik 2027. március 18-ig még nem töltötték be a 20. életévüket), egyénileg vagy csapatban (csoportos pályázat esetén max. 2 főnek biztosítanak szállást). Nevezési díj nincs.',
            categories: [
                '1. Alkalmazói programok (oktatóprogramok, webalkalmazások, felhasználói problémát megoldó alkalmazások)',
                '2. Játékprogramok (saját készítésű játékok)',
                '3. Megépített (digitális) automata berendezés (hardver) és vezérlése (szoftver) – osztatlan kategória',
                '4. Számítógépes grafika (kép, portré, karikatúra stb.) – osztatlan kategória, versenyzőnként legfeljebb 5 pályamű',
                '5. Animáció (számítógéppel előállított animáció) – versenyzőnként legfeljebb 2 pályamű, egyenként max. 5 perc',
                '6. Számítógéppel támogatott tervezés (CAD programokkal szerkesztett tárgyak, objektumok)'
            ],
            roundsSummary: [
                '2027. febr. 14. 24:00: Online nevezési határidő regisztráció után (kötelező max. 10 perces bemutató videó mellékelése)',
                '2027. febr. 22.: Előzsűri értesítése a döntőbe jutóknak (max. 80 fő jut a döntőbe)',
                '2027. márc. 18–19.: Döntő Szekszárdon (max. 10 perces személyes bemutató; pontozás: újszerűség 30%, kidolgozottság 30%, összetettség 20%, előadás 20%)'
            ],
            prizes: 'A kategóriák 1–3. helyezettjei és a döntősök a támogatók által felajánlott értékes díjakban részesülnek; a rendező szállást biztosít a döntősöknek.',
            contacts: 'E-mail: neumann.ibela@gmail.com',
            links: [
                { label: 'Online nevezési felület (neumannverseny.hu)', url: 'https://neumannverseny.hu', primary: true },
                { label: 'Verseny információk (ibela.edu.hu/neumann)', url: 'http://ibela.edu.hu/neumann', primary: false }
            ]
        },
        events: [
            {
                id: 'neumann-1',
                date: '2026-11-02',
                displayDate: '2026. nov. 2.',
                shortLabel: 'Kiírás',
                title: 'Verseny meghirdetése (6 kategóriában)',
                description: 'A 23. Neumann János Kárpát-medencei Informatikai Programtermék Verseny meghirdetése 6 kategóriában (nevezési díj nincs).',
                location: 'neumannverseny.hu',
                linkUrl: 'https://neumannverseny.hu',
                linkLabel: 'Online nevezési felület',
                isFinal: false,
                laneOffset: -1
            },
            {
                id: 'neumann-2',
                date: '2027-02-14',
                displayDate: '2027. febr. 14.',
                displayTime: '24:00',
                shortLabel: 'Nevezés (+videó)',
                title: 'Online nevezési határidő',
                description: 'Online nevezési határidő regisztráció után a neumannverseny.hu felületén, kötelező max. 10 perces bemutató videó mellékelésével.',
                location: 'Online (neumannverseny.hu)',
                linkUrl: 'https://neumannverseny.hu',
                linkLabel: 'Online nevezési felület',
                isFinal: false,
                laneOffset: 1
            },
            {
                id: 'neumann-3',
                date: '2027-02-22',
                displayDate: '2027. febr. 22.',
                shortLabel: 'Értesítés',
                title: 'Előzsűri értesítése a döntőbe jutóknak',
                description: 'Az előzsűri értesítést küld a döntőbe jutó versenyzőknek (max. 80 fő jut a döntőbe).',
                location: 'E-mail értesítés',
                isFinal: false,
                laneOffset: -1
            },
            {
                id: 'neumann-4',
                date: '2027-03-18',
                endDate: '2027-03-19',
                displayDate: '2027. márc. 18–19.',
                shortLabel: 'DÖNTŐ (Szekszárd)',
                title: 'Döntő Szekszárdon',
                description: 'Személyes bemutatók és nyilvános zsűrizés a Szekszárdi I. Béla Gimnáziumban, pénteki távozással (pontos kezdési időpont a kiírásban nincs megadva) (a rendező szállást biztosít, csoportos pályázat esetén max. 2 főnek; az étkezést egyénileg kell megoldani). Online bemutatás indokolt esetben lehetséges, ezt legalább 7 nappal korábban jelezni kell.',
                location: 'Szekszárdi I. Béla Gimnázium, 7100 Szekszárd, Kadarka u. 25–27.',
                linkUrl: 'http://ibela.edu.hu/neumann',
                linkLabel: 'Verseny információk',
                isFinal: true,
                laneOffset: 1
            }
        ]
    },
    {
        id: 'arpad',
        name: '„Árpád-kupa” Digitális Kultúra Verseny',
        shortName: 'Árpád-kupa',
        organizer: 'Pécsi Árpád Fejedelem Gimnázium és Általános Iskola',
        address: '7632 Pécs, Aidinger János út 41.',
        targetGroup: '7–8. évfolyamos tanulók (2 fős csapatok)',
        color: '#EA580C',        // Narancssárga
        dark: { color: '#ea580c', bgLight: '#3a1d0c', bgBar: 'rgba(251, 146, 60, 0.20)', borderColor: '#9a3412', textDark: '#fdba74' },
        bgLight: '#FFEDD5',
        bgBar: 'rgba(234, 88, 12, 0.16)',
        borderColor: '#FDBA74',
        textDark: '#7C2D12',
        active: true,
        details: {
            participants: '7–8. évfolyamos tanulókból álló 2 fős csapatok (vegyesen 7. és 8. osztályos tagok is alkothatnak csapatot; a megye általános és középiskoláiból).',
            theme: 'Témakörök és eszközök: Matematikai, logikai feladatok, grafika, szövegszerkesztés, prezentáció, táblázatkezelés, micro:bit programozása (használható programok: Microsoft Office programcsomag, képszerkesztő program).',
            roundsSummary: [
                '2026. nov. 20. éjfél: Regisztrációs határidő',
                '2026. dec. 19.: 1. forduló – online tesztmegoldás',
                '2027. febr. 19.: 1. forduló – online beadandó feladat beküldése',
                '2027. ápr. 6. 14:00: 2. forduló – Döntő Pécsen (az online fordulók után az 5 legjobban teljesítő csapat kap meghívást e-mailben; micro:bit-tel megoldandó szabadulószoba)'
            ],
            prizes: 'A döntőben résztvevők jutalomban részesülnek.',
            contacts: 'Verseny e-mail: arpad-kupa@arpad-pecs.hu | Iskola e-mail: afg@arpad-pecs.hu | Tel: 72/450-351',
            links: [
                { label: 'Regisztrációs űrlap (Microsoft Forms)', url: 'https://forms.office.com/e/cxF0cqnv8M?origin=lprLink', primary: true },
                { label: 'Iskola honlapja (arpad-pecs.hu)', url: 'https://www.arpad-pecs.hu', primary: false },
                { label: 'Facebook oldal (facebook.com/arpad.pecs)', url: 'https://www.facebook.com/arpad.pecs', primary: false }
            ]
        },
        events: [
            {
                id: 'arpad-1',
                date: '2026-11-20',
                displayDate: '2026. nov. 20.',
                displayTime: 'éjfél',
                shortLabel: 'Regisztráció',
                title: 'Regisztrációs határidő',
                description: '2 fős csapatok (7–8. évfolyam, vegyesen is) jelentkezése az online regisztrációs űrlap beküldésével.',
                location: 'Online (Microsoft Forms)',
                linkUrl: 'https://forms.office.com/e/cxF0cqnv8M?origin=lprLink',
                linkLabel: 'Regisztrációs űrlap',
                isFinal: false,
                laneOffset: -1
            },
            {
                id: 'arpad-2',
                date: '2026-12-19',
                displayDate: '2026. dec. 19.',
                shortLabel: '1. ford. teszt',
                title: '1. forduló – online tesztmegoldás',
                description: 'Online forduló tesztmegoldása: matematikai, logikai feladatok és digitális kultúra tananyag.',
                location: 'Online',
                linkUrl: 'https://www.arpad-pecs.hu',
                linkLabel: 'Iskola honlapja',
                isFinal: false,
                laneOffset: 1
            },
            {
                id: 'arpad-3',
                date: '2027-02-19',
                displayDate: '2027. febr. 19.',
                shortLabel: '1. ford. beadandó',
                title: '1. forduló – online beadandó feladat beküldése',
                description: 'Digitális kultúra beadandó feladat beküldése (grafika, szövegszerkesztés, prezentáció, táblázatkezelés – Microsoft Office és képszerkesztő használatával).',
                location: 'Online',
                linkUrl: 'https://www.arpad-pecs.hu',
                linkLabel: 'Iskola honlapja',
                isFinal: false,
                laneOffset: -1
            },
            {
                id: 'arpad-4',
                date: '2027-04-06',
                displayDate: '2027. ápr. 6.',
                displayTime: '14:00',
                startTime: '14:00',
                endTime: '15:30',
                endEstimated: true,
                shortLabel: '2. ford. DÖNTŐ',
                title: '2. forduló – Döntő Pécsen',
                description: 'A döntő 14:00-kor kezdődik. Az online fordulók után az 5 legjobban teljesítő csapat kap meghívást e-mailben: micro:bit-tel megoldandó szabadulószoba.',
                location: '7632 Pécs, Aidinger János út 41.',
                linkUrl: 'https://www.arpad-pecs.hu',
                linkLabel: 'Iskola honlapja',
                isFinal: true,
                laneOffset: 1
            }
        ]
    }
];
