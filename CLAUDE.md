# 2026/27 versenyidővonal

Egyetlen oldalas, statikus weboldal (`index.html` + `css/` + `js/` + `vendor/`, vanília JS, build és modulrendszer nélkül, `file://` alól is működik), amely a Radnóti HACK & CODE, a Neumann János Informatikai Verseny és az Árpád-kupa 2026/2027-es fordulóit mutatja közös idővonalon. **A teljes felület a createDOMBlocks komponenseiből épül** (nincs Tailwind; az `index.html` csak egy üres `#app`-ot tartalmaz); a könyvtár a helyi buildje, nem az npm csomag. Publikálás: GitHub Pages a `main` ágról (`.nojekyll`).

## Felépítés

- `index.html`: a fejléc (meta, téma-előbetöltő szkript, stíluslapok) és **az oldal teljes szerkezete egyetlen YAML leírásban** (`<script type="text/yaml" id="page">`, createDOMBlocks `buildUI`). Kisbetűs név = nyers HTML elem, nagybetűs = komponens; a `${...}` kifejezések az állapotból olvasnak, a `"@név"` kezelők a `js/app.js` `handlers` térképében vannak, a `$név` az ott átadott `data` objektumra mutat. A leírás új szerkezeti elemeit (szekció, kártya, lista) itt kell felvenni, nem JavaScriptben.
- `vendor/createDOMBlocks.js` + `.css` + `.schema.json`: a createDOMBlocks **helyi buildje** (globális `CreateDOMBlocks`), a séma a YAML szerkesztői kiegészítéséhez (`# yaml-language-server: $schema=...`). Frissítés: `node scripts/sync-domblocks.mjs [--build] [--src <mappa>]` (alapból a `../createDOMBlocks`). A fájlokat verziókezelve tartjuk (GitHub Pages).
- `css/theme.css`: az oldal témája a könyvtár CSS-változóira építve (slate paletta, Inter, kártyák, versenyszínek) és a sötét mód: `<html data-theme="light|dark">`. Új szín csak ide, a változók mellé kerüljön.
- `js/`: klasszikus, sorrendfüggő szkriptek (az `index.html` ebben a sorrendben tölti be őket, globális változókkal):
  - `data.js`: a mai dátum, az időtengely határai és a `competitions` tömb (`details` + `events`), az összes adat,
  - `downloads.js`: a letölthető dokumentumok adata (`DOWNLOADS`), a pdf-intake skill generálja,
  - `changelog.js`: az újdonságok ablak szövegei (verziózva),
  - `helpers.js`: a könyvtár (`B`), témasegédek (`isDark`, `cc`, `compVars`), dátum- és eseménysegédek,
  - `calendar.js`: naptár-adatok (Google, Outlook, `.ics`) és az eltérés-tooltip szövege,
  - `derive.js`: a nézet számára származtatott adatok (`derive`): a forrás-állapotból (versenykapcsolók, időszűrő, kiválasztott esemény, téma) kész szövegek és listák; a listaelemek azonossága megmarad, ha a tartalom nem változott,
  - `icons.js`: az SVG ikonok, `calendar-menu.js`: a „Naptárba” menü,
  - `app.js`: a forrás-állapot (`ui.state`), az eseménykezelők, a mentés (localStorage) és az indítás (csak egyszer fut).
- `inputs/`: új PDF-ek érkezési helye (feldolgozás után kiürül, nem verziókezelt).
- `data/`: a PDF-ekből készült Markdownok.
- `downloads/`: a feldolgozott PDF-ek, az oldalról letölthetők (publikus).
- `.claude/skills/pdf-intake/`: a PDF-feldolgozó skill és szkriptje.

## Szabályok

- A nyelv magyar, a meglévő hangnemben. **Címekben ne legyen gondolatjel** (a user nem szereti), pl. „Pályamunka workshop (7-es csapat)”.
- Az események pontos időpontját mindig rögzítsd (kezdés, órával megadott határidő, éjfél/24:00). A `displayDate` csak a dátum, az időpont a `displayTime` mezőbe kerül, **zárójel nélkül**, intervallumnál is (`'9:00–16:00'`); az oldal a dátum alatt, külön sorban mutatja. A címekbe se írj zárójeles időpontot. Ha a forrás nem ad időpontot, vagy későbbi tájékoztatást ígér, azt is írd az esemény `description` mezőjébe. Kezdet és vég ismeretében add meg a `startTime` és `endTime` (`'HH:MM'`) mezőt, ettől lesz a naptár gomb időponttal mentve. Végidőt ne találj ki.
- Esemény felvétele: `id`, `date` (ISO), `displayDate`, `shortLabel`, `title`, `description`, `location`, `laneOffset` (-1/1 váltakozva, hogy az idővonali feliratok ne érjenek össze), időrendben. Hivatalos fordulónál a `details.roundsSummary`-ba is.
- Végidő nélküli kezdési időpontnál `endTime` = kezdés + 1,5 óra és `endEstimated: true` (az oldal és a naptár jelzi, hogy ez becslés, a befejezés nem ismert).
- Ha egy új forrás eltér egy esemény korábbi dátumától/időpontjától, az új érték kerül be, a régi a `discrepancy` mezőbe (forrással együtt). Az oldal „⚠ Eltérés a korábbi információtól” badge-et mutat, a tooltipben a korábbi információval. Törölni csak a user jóváhagyásával szabad.
- Ütköző forrásadatot ne válassz csendben, jelezd a usernek (jelenleg nyitott: a Neumann-döntő szállása felhívás szerint max. 2, szabályzat szerint max. 3 fő).
- **Újdonságok ablak:** minden, a szülőknek is releváns változásnál (új vagy módosított esemény, új dokumentum, új funkció) vegyél fel egy bejegyzést a `js/changelog.js` `CHANGELOG` tömbjének **elejére**: a legutóbbinál magasabb `version` (major.minor.patch: patch kisebb javításra, pontosított adatra, új eseményre vagy dokumentumra; minor új funkcióra; major jelentős átalakításra), `date`, érthető, rövid, magyar `items` mondatok. Az ablak azokat a bejegyzéseket mutatja, amelyek verziója magasabb a látogató által utoljára elfogadottnál. A „Rendben, értem” gomb az elfogadott verziót a böngésző `localStorage`-ába menti (`whatsNewAccepted`: `{version, acceptedAt}`), az X, az Esc és a háttérre kattintás csak bezárja, ilyenkor a következő betöltéskor újra feljön. Az új látogató az összes bejegyzést látja, ezért a listát tartsd rövidre (régi bejegyzést a tömb végéről törölhetsz).
- A weboldal naptár menüje (Google, Outlook, `.ics`) az események adatából dolgozik, ahol nincs `startTime`/`endTime`, ott egész napos esemény lesz.
- Sötét mód: a versenyszíneknél a `dark` paletta, semleges színeknél a `css/theme.css` változói gondoskodnak róla (`cc()` a versenyszínekhez). Új szín ne kerüljön be ezek nélkül.
- Az idővonal szándékosan széles (2200 px asztali gépen) és vízszintesen görgethető, mert a feliratok sűrűek.

## PDF-ek feldolgozása

Új PDF az `inputs/` mappába kerül, majd a `/pdf-intake` skill dolgozza fel (részletek: `.claude/skills/pdf-intake/SKILL.md`):

1. `scan`: SHA-256 alapján csak az új tartalmat dolgozza fel, a Markdown a `data/` mappába kerül. Üres `inputs/` esetén nem történik semmi.
2. A fontos (de nem túl részletes) információ bekerül a `js/data.js`-be, az időpontokkal együtt.
3. `mark --comp <verseny> --title ... --desc ...`: a PDF az `inputs/`-ból a `downloads/`-ba kerül, az ujjlenyomat a memory fájlba (`pdf-intake-fingerprints.md`), és az oldal versenyenkénti dokumentum-kártyái frissülnek.

A `js/downloads.js` `PDF-DOWNLOADS` jelölők közötti adatblokkját és a memory fájlt csak a szkript írja, kézzel ne szerkeszd (a memory fájl a fő munkamappa alatt van, git worktree-ből futtatva is ugyanaz). A `downloads/` publikus: személyes adatot tartalmazó PDF-et ne tegyél az `inputs/`-ba.

## Git

A `main` ágra dolgozunk; commit és push csak a user kérésére. Az `inputs/` mappát ne commitold.
