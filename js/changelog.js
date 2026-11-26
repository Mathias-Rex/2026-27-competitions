/*
 * Az "Újdonságok" ablak szövegei.
 *
 * Új, a szülőknek is látható változásnál ide kerül egy új bejegyzés a LISTA ELEJÉRE,
 * a legutóbbinál MAGASABB version értékkel (major.minor.patch):
 *   - patch (1.0.1): kisebb javítás, pontosított adat, új esemény vagy dokumentum
 *   - minor (1.1.0): új funkció az oldalon
 *   - major (2.0.0): jelentős átalakítás
 *
 * Az ablak minden olyan bejegyzést megmutat, amelynek a verziója magasabb a látogató
 * által utoljára elfogadottnál. A "Rendben, értem" gomb az elfogadott verziót megjegyzi
 * (lásd whats-new.js), az X csak bezárja az ablakot.
 */
const CHANGELOG = [
    {
        version: '1.2.1',
        date: '2026. nov. 26.',
        items: [
            'A csapatok logója megjelent a „Csapataink” listában (Radnóti HACK & CODE) és a „Workshop projektek” kártyákon.'
        ]
    },
    {
        version: '1.2.0',
        date: '2026. nov. 26.',
        items: [
            'Új „Workshop projektek” doboz az oldal alján: az Ocean Cat (7-es csapat, Code Trio) és a Recycling Centre Tycoon (8-asok, 0xd15ea5ed) rövid ismertetője, a workshop időpontja és a hozzájuk tartozó letölthető dokumentumok.'
        ]
    },
    {
        version: '1.1.1',
        date: '2026. nov. 26.',
        items: [
            'Javítva a nyolcadikos csapat neve: 0xd15ea5ed (a hexadecimális szám előtagja 0x, nem x0).'
        ]
    },
    {
        version: '1.1.0',
        date: '2026. nov. 26.',
        items: [
            'A workshopok eseményeinél (az idővonalon rákattintva és a részletező dobozban) letölthető dokumentumok: megnézés és letöltés gombbal.',
            'A 7-es csapat (nov. 28.): Ocean Cat workshop kézikönyv. A 8-asok (dec. 5.): Recycling Centre Tycoon kézikönyv.',
            'Mindkét csapatnak: otthoni felkészülési útmutató (telepítés, kb. 45 perc, érdemes a workshop előtt elvégezni) és szülői nyilatkozat (kitöltve, aláírva kell hozni).'
        ]
    },
    {
        version: '1.0.0',
        date: '2026. nov. 24.',
        items: [
            'Új események: pályamunka workshop a 7-es csapatnak (nov. 28.) és a 8-asoknak (dec. 5.), 9:00–16:00, NanoworX Kft., Vadász utca 79.',
            'Radnóti, I. forduló: új feladat a „Zöld Küldetés” játékkészítés (AI segítségével, böngészős játék), leadás dec. 11-ig 23:59-kor.',
            '„Naptárba” gomb minden eseménynél: Google Naptár, Outlook vagy letölthető naptárfájl (Apple Naptár is).',
            'Új „Letölthető dokumentumok” szekció: a versenykiírások és szabályzatok PDF-jei versenyenként, megnézés és letöltés gombbal.',
            'Pontosabb időpontok az eseményeknél (pl. Árpád-kupa döntő: 14:00), az idő a dátum alatt látszik.',
            'Az idővonal asztali gépen is oldalra görgethető (egérrel megfogva, húzással is), és induláskor a mai napra ugrik.',
            'Javítva a nyolcadikos csapat neve: 0xd15ea5ed (hexadecimális írásmóddal a „diseased” szó).'
        ]
    }
];
