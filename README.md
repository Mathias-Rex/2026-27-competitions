# 2026/27 versenyidővonal

Közös idővonal és teendőlista három informatikai versenyhez a 2026/2027-es tanévre:

- **Radnóti HACK & CODE a bolygóért** (Pécs, 7–8. évfolyam, 2–4 fős csapatok)
- **23. Neumann János Kárpát-medencei Informatikai Programtermék Verseny** (Szekszárd)
- **Árpád-kupa** digitális kultúra verseny (Pécs, 7–8. évfolyam, 2 fős csapatok)

## Mit tud az oldal

- Közös, vízszintesen görgethető idővonal a versenyek mérföldköveivel, a mai napra görgetve.
- Időrendi teendőlista és részletező panel eseményenként (időpont, helyszín, tudnivalók, link).
- **Naptárba mentés** minden eseményhez: Google Naptár, Outlook.com, Microsoft 365, vagy `.ics` fájl (Apple Naptár, Outlook asztali).
- Versenyenkénti kiírási összefoglaló: résztvevők, témák, fordulók, díjak, kapcsolat, nevezési linkek.
- **Letölthető dokumentumok** versenyenként: az eredeti kiírások és szabályzatok PDF-jei rövid ismertetővel, megnézés és letöltés gombbal.
- **Újdonságok ablak:** betöltéskor felsorolja a legutóbbi változásokat (`js/changelog.js`, verziózva). A „Rendben, értem” gomb megjegyzi az elfogadott verziót, ennél újabb változásnál az ablak újra feljön. Az X-szel bezárva a következő betöltéskor is megjelenik.
- Világos és sötét téma, mobilbarát megjelenés.

## Futtatás

Build nincs. Az `index.html` közvetlenül megnyitható a böngészőben (a `css/` és `js/` mappa tartozik hozzá), vagy kiszolgálható bármilyen statikus szerverrel:

```
python -m http.server 8000
```

A publikálás GitHub Pages-szel történik a `main` ágról.

## Felépítés

| Hely | Tartalom |
|---|---|
| `index.html` | Meta, téma-előbetöltő és az oldal szerkezete YAML leírásként (createDOMBlocks `buildUI`) |
| `css/theme.css` | Az oldal témája (a createDOMBlocks CSS-változói), sötét mód |
| `vendor/` | A createDOMBlocks helyi buildje (`node scripts/sync-domblocks.mjs`) |
| `js/data.js` | Az összes adat (`competitions` tömb: versenyek, események) |
| `js/derive.js`, `js/app.js` | Származtatott adatok, állapot és eseménykezelők (a nézet a YAML-ben van) |
| `js/*.js` | Adatok, naptár, segédek |
| `js/changelog.js` | Az újdonságok ablak verziózott szövegei |
| `downloads/` | Feldolgozott, letölthető PDF-ek |
| `data/` | A PDF-ekből készült Markdownok |
| `inputs/` | Új PDF-ek érkezési helye (nem verziókezelt) |
| `.claude/skills/pdf-intake/` | PDF-feldolgozó Claude Code skill és szkript |
| `CLAUDE.md` | Munkaszabályok Claude Code számára |

## Új PDF feldolgozása

1. Tedd a PDF-et az `inputs/` mappába.
2. Claude Code-ban futtasd: `/pdf-intake`.

A skill SHA-256 ujjlenyomattal tartja nyilván, melyik fájlt dolgozta már fel, így az azonos tartalmú PDF-et nem csinálja újra. A PDF-ből Markdown készül a `data/` mappába, a fontos információk (határidők, időpontok, helyszín, fordulók, díjak, kapcsolat) bekerülnek a `js/data.js`-be, a PDF pedig a `downloads/` mappába kerül, és megjelenik a letölthető dokumentumok között. Ha az `inputs/` mappa üres, nem történik semmi.

Működéséhez Python 3 és a PyMuPDF (`pip install pymupdf`) szükséges. A feldolgozott fájlok ujjlenyomatai Claude memory fájljában vannak (`pdf-intake-fingerprints.md`).

## Esemény felvétele kézzel

A `js/data.js` `competitions` tömbjének megfelelő versenyénél az `events` listába:

```js
{
    id: 'radnoti-ws1',
    date: '2026-11-28',
    displayDate: '2026. nov. 28.',
    displayTime: '9:00–16:00', // opcionális, a dátum alatt jelenik meg
    startTime: '09:00',      // opcionális, a naptár gombhoz
    endTime: '16:00',        // opcionális; ha csak a kezdés ismert: kezdés + 1,5 óra és endEstimated: true
    // discrepancy: '…',    // opcionális: a korábbi információ, a ⚠ badge tooltipjében látszik
    shortLabel: 'Workshop (7-esek)',
    title: 'Pályamunka workshop (7-es csapat)',
    description: '…',
    location: 'NanoworX Kft. tárgyaló, Vadász utca 79.',
    isFinal: false,
    laneOffset: -1           // -1 felül, 1 alul, a feliratok szétválasztására
}
```

Időpont nélküli eseményből egész napos naptárbejegyzés lesz.
