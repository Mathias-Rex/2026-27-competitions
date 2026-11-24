# 2026/27 versenyidővonal

Egyetlen oldalas, statikus weboldal (`index.html`, Tailwind CDN + vanília JS, build nélkül), amely a Radnóti HACK & CODE, a Neumann János Informatikai Verseny és az Árpád-kupa 2026/2027-es fordulóit mutatja közös idővonalon. Publikálás: GitHub Pages a `main` ágról (`.nojekyll`).

## Felépítés

- `index.html`: az oldal és minden adat. A versenyek a `competitions` tömbben vannak (`details` + `events`), a megjelenítés a `render*` függvényekben.
- `inputs/`: új PDF-ek érkezési helye (feldolgozás után kiürül, nem verziókezelt).
- `data/`: a PDF-ekből készült Markdownok.
- `downloads/`: a feldolgozott PDF-ek, az oldalról letölthetők (publikus).
- `.claude/skills/pdf-intake/`: a PDF-feldolgozó skill és szkriptje.

## Szabályok

- A nyelv magyar, a meglévő hangnemben. **Címekben ne legyen gondolatjel** (a user nem szereti), pl. „Pályamunka workshop (7-es csapat)”.
- Az események pontos időpontját mindig rögzítsd (kezdés, órával megadott határidő, éjfél/24:00). A `displayDate` csak a dátum, az időpont a `displayTime` mezőbe kerül, **zárójel nélkül**, intervallumnál is (`'9:00–16:00'`); az oldal a dátum alatt, külön sorban mutatja. A címekbe se írj zárójeles időpontot. Ha a forrás nem ad időpontot, vagy későbbi tájékoztatást ígér, azt is írd az esemény `description` mezőjébe. Kezdet és vég ismeretében add meg a `startTime` és `endTime` (`'HH:MM'`) mezőt, ettől lesz a naptár gomb időponttal mentve. Végidőt ne találj ki.
- Esemény felvétele: `id`, `date` (ISO), `displayDate`, `shortLabel`, `title`, `description`, `location`, `laneOffset` (-1/1 váltakozva, hogy az idővonali feliratok ne érjenek össze), időrendben. Hivatalos fordulónál a `details.roundsSummary`-ba is.
- Ütköző forrásadatot ne válassz csendben, jelezd a usernek (jelenleg nyitott: a Neumann-döntő szállása felhívás szerint max. 2, szabályzat szerint max. 3 fő).
- A weboldal naptár menüje (Google, Outlook, `.ics`) az események adatából dolgozik, ahol nincs `startTime`/`endTime`, ott egész napos esemény lesz.
- Sötét mód: a versenyszíneknél a `dark` paletta, semleges színeknél az `nc()` függvény gondoskodik róla. Új szín ne kerüljön be ezek nélkül.
- Az idővonal szándékosan széles (2200 px asztali gépen) és vízszintesen görgethető, mert a feliratok sűrűek.

## PDF-ek feldolgozása

Új PDF az `inputs/` mappába kerül, majd a `/pdf-intake` skill dolgozza fel (részletek: `.claude/skills/pdf-intake/SKILL.md`):

1. `scan`: SHA-256 alapján csak az új tartalmat dolgozza fel, a Markdown a `data/` mappába kerül. Üres `inputs/` esetén nem történik semmi.
2. A fontos (de nem túl részletes) információ bekerül az `index.html`-be, az időpontokkal együtt.
3. `mark --comp <verseny> --title ... --desc ...`: a PDF az `inputs/`-ból a `downloads/`-ba kerül, az ujjlenyomat a memory fájlba (`pdf-intake-fingerprints.md`), és az oldal versenyenkénti dokumentum-kártyái frissülnek.

A `PDF-DOWNLOADS` jelölők közötti HTML-blokkot és a memory fájlt csak a szkript írja, kézzel ne szerkeszd. A `downloads/` publikus: személyes adatot tartalmazó PDF-et ne tegyél az `inputs/`-ba.

## Git

A `main` ágra dolgozunk; commit és push csak a user kérésére. Az `inputs/` mappát ne commitold.
