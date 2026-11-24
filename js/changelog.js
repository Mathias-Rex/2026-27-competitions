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
        version: '1.0.0',
        date: '2026. nov. 24.',
        items: [
            'Új események: pályamunka workshop a 7-es csapatnak (nov. 28.) és a 8-asoknak (dec. 5.), 9:00–16:00, NanoworX Kft., Vadász utca 79.',
            'Radnóti, I. forduló: új feladat a „Zöld Küldetés” játékkészítés (AI segítségével, böngészős játék), leadás dec. 11-ig 23:59-kor.',
            '„Naptárba” gomb minden eseménynél: Google Naptár, Outlook vagy letölthető naptárfájl (Apple Naptár is).',
            'Új „Letölthető dokumentumok” szekció: a versenykiírások és szabályzatok PDF-jei versenyenként, megnézés és letöltés gombbal.',
            'Pontosabb időpontok az eseményeknél (pl. Árpád-kupa döntő: 14:00), az idő a dátum alatt látszik.',
            'Az idővonal asztali gépen is oldalra görgethető, és induláskor a mai napra ugrik.',
            'Javítva a nyolcadikos csapat neve: x0d15ea5ed (hexadecimális írásmóddal a „diseased” szó).'
        ]
    }
];
