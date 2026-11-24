---
name: pdf-intake
description: Az inputs/ mappában lévő új PDF-eket Markdownná alakítja (data/ mappa), kivonatolja a fontos (de nem túl részletes) tartalmukat az index.html-be, és a feldolgozott PDF-eket átteszi a downloads/ mappába, ahonnan letölthetők az oldalról. SHA-256 ujjlenyomattal tartja nyilván a memory fájlban, mely PDF-et dolgozta fel már, azt nem csinálja újra. Ha az inputs/ üres, nem történik semmi. Használd, ha új versenykiírás, szabályzat vagy más PDF került az inputs mappába, vagy ha a user "dolgozd fel a PDF-eket" jellegű kérést ad.
---

# pdf-intake

A projekt gyökeréből dolgozz (ahol az `index.html` és az `inputs/` van). A szkript: `.claude/skills/pdf-intake/scripts/pdf_intake.py` (Python + PyMuPDF).

Mappák:
- `inputs/`: ide érkeznek az új PDF-ek. Feldolgozás után **kiürül**.
- `data/`: a PDF-ekből készült Markdownok (`<slug>.md`).
- `downloads/`: a feldolgozott PDF-ek, az oldalról letölthetők.
- `inputs/_duplicates/`: az már feldolgozott tartalommal azonos fájlok (nem törlünk semmit).

## Folyamat

1. **Keresés és konverzió**
   ```
   python .claude/skills/pdf-intake/scripts/pdf_intake.py scan
   ```
   - Ha az `inputs/` nem tartalmaz PDF-et, a kimenet `nothing_to_do`. **Ilyenkor semmit ne csinálj**: ne nyúlj az `index.html`-hez, a `data/`, `downloads/` mappákhoz és a memory fájlhoz sem, csak jelezd a usernek, hogy nincs feldolgozandó.
   - Különben a szkript minden PDF SHA-256 ujjlenyomatát összeveti a memory fájllal
     (`~/.claude/projects/<projekt>/memory/pdf-intake-fingerprints.md`):
     - `duplicate`: a tartalom már feldolgozott (vagy ugyanabban a körben kétszer szerepel), a fájl az `inputs/_duplicates/` mappába kerül. Nincs vele teendő.
     - `new`: elkészül a `data/<slug>.md`. A PDF még az `inputs/`-ban marad.

2. **Tartalom feldolgozása** (csak a `new` fájlokra)
   - Olvasd el a Markdownt. Ha `needs_visual_read` igaz (szkennelt vagy képes PDF, pl. plakát), vagy a Markdown láthatóan hiányos (táblázatok, oszlopok összekeveredtek), nyisd meg magát a PDF-et a Read eszközzel (`pages` paraméterrel). A kinyert szöveget írd vissza a `data/<slug>.md` fájlba is, hogy a Markdown ne maradjon üres.
   - Gyűjtsd ki a **fontos, de nem túl részletes** információt: ki indulhat, határidők és időpontok, helyszín, forduló-szerkezet, díjazás, kapcsolat, nevezési link, kötelező dokumentumok. A teljes szabályzatot, jogi szöveget és részletes pontozást ne másold be, azokra a letölthető PDF van.
   - **Pontos időpontokat mindig rögzíts** (kezdés, leadási határidő órával, éjfél vagy 24:00, távozás napja). Ha egy eseménynél a PDF nem ad időpontot, vagy kifejezetten későbbi tájékoztatást ígér, azt is írd az esemény leírásába (pl. „a kezdés pontos időpontjáról a továbbjutókat előzetesen tájékoztatják” vagy „a kezdési időpont a kiírásban még nincs megadva”), hogy az oldalról látszódjon, mi hiányzik. A `displayDate` csak a dátumot tartalmazza; az időpont a külön `displayTime` mezőbe kerül zárójel nélkül (pl. `'14:00'`, `'9:00–16:00'`, `'éjfél'`, `'24:00'`), az oldal ezt a dátum alá törve mutatja; ha az eseménynek kezdete és vége is ismert, add meg a `startTime` és `endTime` mezőt (`'HH:MM'`), így a naptár gomb időponttal menti. Ha csak a kezdés ismert, ne találj ki végidőt.
   - Ütköző adatnál (pl. két dokumentum más határidőt ad) ne válassz csendben: jelezd a usernek.

3. **index.html frissítése** (a meglévő adatmodell és stílus szerint)
   - Új határidők, fordulók: a megfelelő verseny `events` tömbjébe (`id`, `date`, `displayDate`, `shortLabel`, `title`, `description`, `location`, `laneOffset` váltakozva -1/1, időrendben), és a `details.roundsSummary` listába, ha hivatalos forduló.
   - Általános infók (résztvevők, téma, díjak, kapcsolat, linkek): a verseny `details` objektumába.
   - Új verseny csak akkor kerül be, ha a PDF tényleg új versenyről szól; ilyenkor kérdezz rá a színre és a csapatokra.
   - Ha egy PDF módosított változata érkezik (új tartalom, hasonló név), a HTML-ben a régi adatot **javítsd**, ne duplikáld, és a régi értéket ne hagyd az oldalon.
   - Már meglévő adatot ne duplikálj; ha a PDF csak megerősít valamit, hagyd békén.
   - Magyar nyelven, a meglévő hangnemben írj. A user nem szereti a gondolatjeles címeket, kerüld őket.

4. **Lezárás**
   ```
   python .claude/skills/pdf-intake/scripts/pdf_intake.py mark --comp <verseny-id> --title "<cím>" --desc "<ismertető>" "<fájlnév.pdf>"
   ```
   Az oldalon **nem a fájlnév** látszik, hanem egy rövid, olvasható cím és egy egymondatos ismertető (mellette szem ikon a megnézéshez új lapon, és lefelé nyíl a letöltéshez). Minden PDF-hez adj `--title` és `--desc` értéket a tartalma alapján (pl. cím: „Versenyfelhívás”, „Versenyszabályzat”, „Verseny plakát”; ismertető: mit találni benne, pl. „Határidők, témakörök, nevezés és a döntő menete.”). A címben ne legyen gondolatjel. A kapcsolók csak egyetlen fájl mellett használhatók; több fájlnál egyenként hívd a `mark`-ot, vagy utólag a `describe`-ot. Utólagos módosítás: `describe "<eredeti fájlnév>" --title "..." --desc "..."` (ez is frissíti az oldalt). Cím nélkül a fájlnév kerül ki.
   A `--comp` az `index.html` `competitions` tömbjének versenyazonosítója (a `scan` kimenetének `competitions` listája mutatja, pl. `radnoti`, `neumann`, `arpad`), vagy `altalanos`, ha a PDF nem egy versenyhez tartozik. Több versenyhez tartozó PDF-eknél versenyenként külön `mark` hívás kell. A versenyt a PDF tartalma alapján döntsd el; ha bizonytalan, kérdezz rá.
   A `mark` fájlonként: átmozgatja a PDF-et az `inputs/`-ból a `downloads/`-ba, rögzíti az ujjlenyomatot és a versenyt a memory fájlban (és a `MEMORY.md` mutatót), a végén **automatikusan újragenerálja** az `index.html` `<!-- PDF-DOWNLOADS:START -->` és `<!-- PDF-DOWNLOADS:END -->` közötti letöltési kártyáit: versenyenként egy kártya (a verseny színével), az „Általános dokumentumok” kártya csak akkor jelenik meg, ha van ilyen PDF. Ezt a blokkot kézzel ne szerkeszd.
   Ha később kiderül, hogy egy PDF rossz versenyhez került: `assign --comp <verseny-id> "<eredeti fájlnév>"`.
   **Csak azután hívd a `mark`-ot, hogy az információ már bekerült a HTML-be**, különben a fájl feldolgozottnak számítana úgy, hogy nem volt az.

5. **Ellenőrzés és összegzés**
   - Futtasd le újra a `scan`-t: `nothing_to_do` a helyes eredmény, azaz az `inputs/` kiürült.
   - Nézd meg, hogy az `index.html` script blokkjai szintaktikailag rendben vannak-e (pl. `new Function` Node-ban), és hogy a letöltési lista minden `downloads/` PDF-et tartalmaz.
   - Röviden írd le a usernek, mely PDF-ből mi került az oldalra, mi maradt ki szándékosan, és mi igényel döntést. Ne commitolj, amíg a user nem kéri.

## Szabályok

- Ujjlenyomat = a fájl tartalmának SHA-256-ja. Átnevezett, de azonos fájlt nem dolgozol fel újra; megváltozott tartalmú fájl új ujjlenyomatot kap, és újra feldolgozandó (a régi bejegyzés és PDF megmarad).
- Az `inputs/` PDF-jeit csak a szkript mozgatja (`mark` a `downloads/`-ba, `scan` a duplikátumokat az `_duplicates/`-ba). Törölni soha ne törölj.
- A memory fájlt csak a szkripten keresztül írd.
- A `downloads/` mappa az oldallal együtt publikálódik (GitHub Pages), ezért csak olyan PDF kerülhet az `inputs/`-ba, amit a user nyilvánosan is megoszthat. Ha egy fájl személyes adatot tartalmazni látszik (név-, cím- vagy telefonlista, kitöltött szülői nyilatkozat), kérdezz rá, mielőtt a `mark` lefut.
