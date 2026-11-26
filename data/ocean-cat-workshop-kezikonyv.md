<!-- forrás: Ocean-Cat-Workshop-Kezikonyv.pdf | sha256: ff1bcdf1b1175ec2cc87a0f5f8c85c6d23d008366b72f0a3c5eb5ae4844f0e5d -->

<!-- oldal 1 -->

W O R K S H O P K É Z I K Ö N Y V · F O G L A L K O Z Á S V E Z E T Ő I P É L D Á N Y

# Ocean Cat

# Egy nap, egy csapat, egy specifikáció — és egy AI által legyártott, ember által elfogadott játék.

AI-POWERED PROJECT MANAGEMENT · EGY ÖTLETTŐL A MŰKÖDŐ TERMÉKIG

### Időpont

09:00–16:00 (egy tanítási nap)

### Résztvevők

7. osztály · Code Trio csapat (3 fő)

### Helyszín

tanterem / informatika terem, saját notebookokkal

### Technológia

Phaser 3.86.0 (CDN) + natív JavaScript ES modulok — bundler nélkül

### Módszer

Discovery → Freeze → Dark Factory (TDD) → Acceptance

### Dokumentum

v1.0 · 2026. november

Nyomtatva: foglalkozásvezetői ellenőrző példány · Terjedelme: 40 oldal · A nap menetrendje a 6. fejezetben

# 🫧

<!-- oldal 2 -->

# 0. Hogyan használd ezt a kézikönyvet

## Ez a dokumentum nem tananyag a gyerekeknek, hanem a te vezérlőpultod. A foglalkozás napján

## négyféleképpen fogod használni.

### Fejezet Mikor nyitod ki Mire való

1–3. Célok, technológia, előkészületek

A foglalkozás előtti napokban

Eldöntöd a kereteket, összeállítod a pendrive-ot, előkészíted a Dark Factory- t és a Trello-táblát.

4–5. Telepítés, projektstruktúra

Reggel, a telepítési blokkban

Kivetíthető lépéssorrend, linkek, hibaelhárítás, működő alap projekt.

6–14. Órarend és műhelyek

0–16 óra között végig Blokkonként a percbeosztás, a kivetíthető kérdések, az elvárt eredmény és a checkpoint.

15–20. Munkafolyamat, sablonok, linkek

Folyamatosan, ill. a nap végén

Trello/GitHub szabályok, promptok, sablonok, értékelőlap, B-tervek.

### A DOKUMENTUM JELÖLÉSEI

CHECKPOINT azt jelenti, hogy itt meg kell állni és ellenőrizni kell egy konkrét, látható eredményt. Ha nincs meg, nem lépsz tovább, hanem a B-tervhez nyúlsz.

IDŐKERET a blokk tervezett hossza. A percek a tapasztalat szerint 10–15%-kal tágulnak, ezért a napban szándékosan van 2 rövid szünet és 1 puffer.

EREDMÉNY a blokk végén keletkező, mások számára is látható artefaktum (fájl, Trello-kártya, commit, demó).

B-TERV az a lépés, amit akkor teszel, ha a technika vagy az idő nem enged.

## A nap egy mondatban

A gyerekek délelőtt terméktulajdonosok és specifikációírók, ebéd közben egy előkészített AI-fejlesztősor („Dark Factory”) legyártja a terméket a specifikációból, délután pedig ők maguk döntenek arról, hogy a termék megfelel-e a saját követelményeiknek.

## A nap öt kulcspontja — ha csak ezt az ötöt tartod be, a nap sikeres

1. 10:05-re minden gépen fut a játék, működik a Live Server, és minden gyerek be van jelentkezve a saját GitHub-fiókjába. A telepítés nem viszi el a délelőttöt.

2. 12:30-ra kész a lezárt specifikáció (docs/PRODUCT_SPEC.md + tesztterv), és ez van commitolva.

3. 12:30-kor elindul a Dark Factory, és 13:00-ra van egy futtatható játék, nem „majdnem kész”.

4. 13:00 után a gyerekek nem kódot írnak, hanem ellenőriznek a saját acceptance criteria-jük ellen.

5. 15:25-re minden csapatnak van megnyitható, játszható linkje vagy ZIP-je, és 3 percben el tudja mondani, mit tervezett és mi valósult meg.

<!-- oldal 3 -->

### A LEGFONTOSABB PEDAGÓGIAI SZABÁLY

Ne engedd, hogy a nap a telepítésről vagy a szintaxisról szóljon. A gyerekek akkor tanulják meg a módszert, ha a nap 80%-a döntésről, bontásról, ellenőrzésről és kommunikációról szól. A kódot az AI írja; a felelősséget az ember viseli.

<!-- oldal 4 -->

# 1. A nap célja és a tanulási eredmények

## Nem programozókat képzünk egy nap alatt. Egy olyan munkamódszert adunk át, amit a gyerekek

## bármely iskolai projektben, versenyen vagy későbbi munkahelyen használni tudnak.

## 1.1 A hét megtanítandó képesség

### # Képesség Mit lát tőle a foglalkozásvezető (megfigyelhető viselkedés)

1. Probléma megértése A csapat saját szavakkal meg tudja fogalmazni, mit és kinek készít, és mit nem készít el.

2. Problémabontás A nagy ötletből 10–15 kisebb, önállóan megvalósítható egységet (epic → user story → task) tud alkotni.

3. Priorizálás és függőségek Meg tudja mondani, mi az első feladat és miért; felismeri, hogy a pontszám nem előzheti meg a mozgást.

4. Együttműködés és felelősség Minden kártyának van felelőse, és a szerepek a nap során cserélődnek.

5. AI-val való együttműködés Nem „csinálj egy játékot” típusú promptot ír, hanem egyetlen ellenőrizhető részfeladatot, mellékelve a feltételt és az ellenőrzés módját.

6. Iteratív munkavégzés Képes a „kész → kipróbál → hiba → javítás” ciklust önállóan végigvinni, és a hibát reprodukálhatóan leírni.

7. Eredmény bemutatása 3 percben el tudja magyarázni, mit tervezett, mi valósult meg, mi maradt ki és miért.

## 1.2 A tanított munkamódszer: a hét lépés

### UNDERSTAND → DECOMPOSE → PLAN → ASSIGN → EXECUTE → VERIFY →

### REFLECT

### Lépés Gyereknyelven Melyik blokkban tanítjuk meg

UNDERSTAND „Értsük meg, mi a probléma.” 10:15–10:50 Product Discovery

DECOMPOSE „Bontsuk részekre.” 10:50–11:30 Problémabontás

PLAN „Tervezzük meg a sorrendet.” 10:50–11:30 prioritás + függőség

ASSIGN „Osszuk el, ki miért felel.” 11:30 Trello-kártyák felelősökkel

EXECUTE „Valósítsuk meg kis lépésekben.” 12:30–13:00 Dark Factory + 14:25–15:05 javítás

VERIFY „Ellenőrizzük, tényleg jó-e.” 13:00–14:10 termékátvétel és triage

REFLECT „Tanuljunk belőle.” 15:50–16:00 retro

## 1.3 A nap központi üzenete

### HUMAN-DEFINED · AI-BUILT · HUMAN-VERIFIED

Az AI gyorsan tud megoldást előállítani. Az ember felelőssége eldönteni, mit kell megoldani, és meggyőződni arról, hogy a megoldás valóban jó-e. Ez a mondat legyen kinn a táblán egész nap.

<!-- oldal 5 -->

## 1.4 Amit a gyerekek hazavisznek

Egy közös GitHub-repót (vagy ZIP-et) a saját specifikációval és a belőle készült játékkal.

Egy kitöltött projekttervezési munkalapot és egy 12 követelményből álló, azonosítókkal ellátott specifikációt.

Egy Trello-tábla pillanatképét (backlog → done), ami a nap során végigkövette a munkát.

Egy 3 perces bemutatót, ami a saját döntéseikről szól, nem a kódjukról.

Egy rövid reflexiót: mi volt jó kérdés, mi volt félreérthető a saját specifikációjukban.

# 2. Technológiai döntés — és miért nem használunk bundlert

A döntés: Phaser 3.86.0 CDN-ről betöltve + natív JavaScript ES modulok + statikus HTML. Nincs Vite, nincs Webpack, nincs npm-függőség a játékhoz. A Node.js csak a tesztekhez kell.

## 2.1 Miért ez a helyes választás ehhez a projekthez

### Szempont Következmény a foglalkozásra

Egyetlen böngészős játék, egyetlen könyvtárral

Nincs mit csomagolni, nincs build-lépés, nincs „miért nem fordul le” hiba.

Nincs React/Vue/TypeScript/asset pipeline

Nincs szükség transpilációra vagy optimalizálásra a 800×600-as játéknál.

GitHub Pagesre publikálunk A statikus fájlok közvetlenül publikálhatók, nincs build artifact kérdés.

Az AI közvetlenül fájlokat módosít

A Claude Code ugyanazt a .js fájlt látja, amit a böngésző futtat — nincs forrás/kimenet kettősség.

A gyerekek 12–13 évesek, egy napjuk van

Minden plusz réteg (bundler, plugin, config) magyarázatot és hibalehetőséget hoz, tanulási hasznot nem.

### A VITE MELLETTI ŐSZINTE ÉRV — ÉS MIÉRT NEM ÉL VELE A PROJEKT

A Vite valódi előnye a fejlesztői szerver, a hot reload és az optimalizált production build. Ezek egyike sem szükséges itt: a Live Server kiváltja a fejlesztői szervert, a játék 1–2 MB, a nap végén pedig egy statikus mappa megy fel a GitHub Pagesre. A Vite-ot akkor vezetnénk be, ha sok függőség, TypeScript vagy nagy asset pipeline lenne — most nincs. A döntés tehát: marad a CDN + ESM.

## 2.2 A végleges eszközlista

### Eszköz Döntés Szerep a napon

Phaser 3.86.0 IGEN CDN Játékmotor. A verzió rögzített, hogy ne törjön el egy frissítéstől.

Natív JS ES modulok IGEN import/export a saját fájlok között, böngészőben.

VS Code + Live Server IGEN Szerkesztő + statikus HTTP-szerver. Nem bundler.

Node.js LTS CSAK TESZTHEZ

node --test a tiszta logikára. A játék Node nélkül is fut.

Git + GitHub Desktop IGEN Verziókezelés grafikusan, commit és push.

GitHub + GitHub Pages IGEN Központi repó és publikus játék-link.

<!-- oldal 6 -->

Trello IGEN Feladattábla, prioritás, állapotkövetés.

Claude Code + saját Phaser 3 Skill

IGEN A Dark Factory végrehajtója.

Playwright OPCIONÁLIS Böngészős füstteszt a factory oldalán. Ha nincs, manuális teszt.

Vite / Webpack / Rollup NEM Nincs build-lépés.

Vitest / Jest NEM A Node beépített test runnere elég.

## 2.3 Két technikai következmény, amit előre kezelni kell

### 1. A CDN INTERNETET IGÉNYEL

### 2. A FILE:// NEM MŰKÖDIK

A Phaser a cdn.jsdelivr.net-ről töltődik. Ha a terem Wi-Fi-je instabil, a játék nem indul el. Ezért a repóban ott van a assets/phaser.min.js helyi másolat, és az index.html-ben egy sor átírásával offline is fut.

A böngészők biztonsági okból nem töltenek ES modult file:// alól. Ezért kell a Live Server (vagy bármilyen statikus szerver). Ez nem plusz telepítés: a VS Code kiterjesztése.

### NE ENGEDD EZT A KÉT HIBÁT A NAP SORÁN

1) Ne nyissátok meg az index.html-t dupla kattintással. 2) Ne generáltass a Claude Code-dal „majd én összecsomagolom” típusú build-rendszert. A CLAUDE.md-ben tiltva van az új függőség és a bundler — ezt a 11. fejezet sablonja tartalmazza.

# 3. A foglalkozásvezető előkészületei — neked mit kell megtenned

Ez a fejezet a te munkalistád. Az előkészítés három időablakra oszlik: egy héttel előtte, egy nappal előtte, és a foglalkozás reggelén 08:45-ig. Az ID-k (E-01…) a 17. fejezet napi checklistáján is visszaköszönnek.

## 3.1 Egy héttel előtte — döntések és keretek

### ID Feladat Részletek / elfogadási feltétel

E-01 Létszám és csapatbeosztás rögzítése

A Code Trio csapat (7. osztály, 3 fő): névsor és szerepek írásban, szerepváltási tervvel. A 3 fő miatt a product owner és a spec felelős összevont szerep.

E-02 Notebookok operációs rendszerének felmérése

Körlevél: Windows 10/11, macOS vagy Linux. Ebből derül ki, hány telepítési útmutatót kell nyomtatni és mennyi segítő kell.

E-03 Rendszergazdai jogosultság ellenőrzése

Kérd meg a szülőket: a gyerek tudjon telepíteni (Windowson admin fiók, macen jelszó). Ez a leggyakoribb reggeli elakadás.

E-04 Hálózat és áram biztosítása Wi-Fi jelszó kinn a táblán; 1 elosztó / 2 gép; a tanári gép vezetékes vagy elsődleges hálózaton.

E-05 Felnőtt segítő szervezése Ideális esetben 1 technikai segítő 8–10 géphez. Nélküle a telepítési blokk 40 helyett 70 perc.

E-06 Főkok és életkori feltételek előkészítése

Minden gyerek saját GitHub- és Trello-fiókot regisztrál, szülői hozzájárulással (GitHub 13+, Atlassian 16+ feltétellel). Szükséges: aláírt szülői nyilatkozat, mködő

<!-- oldal 7 -->

e-mail cím, és a tanári meghívólista a csapatrepóhoz és a Trello-táblához (lásd 4.5– 4.6).

E-07 Szülői tájékoztató és hozzájárulás kiküldése

Egy A4: mi készül, milyen eszközök, milyen adat nem kerül fel (név, arc, hang), mit kell otthon előtelepíteni.

## 3.2 Telepítési csomag összeállítása (pendrive + megosztható mappa)

### ID Feladat Elfogadási feltétel

E-08 Telepítők letöltése minden érintett OS-re

VS Code (Win/mac/Linux), Node.js LTS, Git, GitHub Desktop, Chrome. Legalább 2 példányban (pendrive + tanári gép).

E-09 Próbagépen végigcsinálni a teljes telepítést

Üres gépen, stopperrel: VS Code + Live Server + Chrome + Git + GitHub Desktop. Mérd az időt — ez lesz a blokk valós hossza.

E-10 Működő kezdőprojekt ZIP-be zárása

ocean-cat-starter.zip: index.html, style.css, src/, assets/ (macska, szemét, háttér, helyi phaser.min.js), docs/ sablonok. Kipróbálva Live Serverrel.

E-11 „Kész” referenciajáték ZIP-be zárása

ocean-cat-reference.zip: a nap végére elvárt működő játék. Csak B-tervhez és összehasonlításhoz.

E-12 Offline tartalék beállítása A index.html-ben a CDN sor mellett kikommentelve a helyi assets/phaser.min.js. Internet nélkül is indul.

## 3.3 Tanári munkaterületek előkészítése

### Munkaterület Mit kell létrehozni előre

### Product workspace

Egy „OCEAN CAT – GAME JAM” tábla: BACKLOG / NEXT / DOING / TESTING / PASS / FAIL / NEEDS INVESTIGATION / DONE oszlopok. 12 előre felvitt kártya REQ-001…REQ-012 azonosítóval, mindegyiken felelős mező és „Kész, ha:” mező. Nyomtatott projekttervezési munkalap csapatonként.

Trello + sablonok

Development workspace GitHub + Claude Code

Tanári GitHub-szervezet és benne ocean-cat-game repó, benne a kezdőprojekt, a docs/ sablonok, CLAUDE.md, .claude/skills/phaser3-game/SKILL.md, működő tests/unit minta. Claude Code telepítve és bejelentkezve a tanári gépen, a repóban egyszer lefuttatva.

Quality workspace Tesztek, checklisták

ACCEPTANCE_CHECKLIST.md nyomtatva csapatonként, BUG_REPORT sablon (5 mező), severity- táblázat kivetítve, egy működő node --test futtatás a mintán.

### GitHub műhely

A tanári GitHub-fiók és -szervezet kész: a csapatrepók létrehozása és a gyerekek meghívása egy próbarepón kipróbálva, a Pages bekapcsolása ellenőrizve. A tanári gép GitHub Desktopja bejelentkezve.

tanári gép

## 3.4 A Dark Factory előkészítése (a nap legkockázatosabb eleme)

A factory akkor működik 30 perc alatt, ha nem kell aznap konfigurálni semmit. Előre kell elkészülnie:

## Claude Code telepítve a tanári gépen, bejelentkezve, a repóban elindítva, legalább egy sikeres próbafuttatással. ☐

## CLAUDE.md kész: technológiai tilalmak, fájlstruktúra, „ne írj bundlert”, „ne módosítsd a tesztet”, „kérdezz, ha a specifikáció kétértelmű”. ☐

.claude/skills/phaser3-game/SKILL.md kész: Phaser 3.86 Arcade Physics, ESM, CDN, magyar UI, asset- nevek, tesztelési minta. Ne a nyilvánosan található Phaser 4-es skillt használd. ☐

## Kész tests/unit minta (pl. calculateScore) és működő package.json ("type":"module"), hogy a TDD első RED állapota tényleg lefusson. ☐

## Kész docs/ sablonok: PRODUCT_SPEC, ACCEPTANCE_CRITERIA, TEST_PLAN, TASK_BREAKDOWN, GAME_DESIGN. ☐

<!-- oldal 8 -->

## Kész, előre bemásolható factory vezérlőprompt (11.4) és 3 előre begyakorolt „javítsd ezt a hibát” prompt. ☐

## Egy száraz próba: egy korábbi specifikációból 20–30 perc alatt fusson le a teljes ciklus. Ha 25 perc alatt megvan a futtatható játék, jó vagy. ☐

### REÁLIS ÍGÉRET

A 30 perces ebédszünetben egy szűk, jól specifikált MVP készül el (tenger, macska, mozgás, szemét, ütközés, pontszám). A teljes 12 követelményes specifikáció minden pontja nem garantálható. Ezt a gyerekeknek is mondd ki a nap elején: „a factory a minimumot szállítja, a többit délután közösen javítjuk”. Így a délután nem kudarcélmény, hanem a nap lényege.

## 3.5 Nyomtatandók (csapatonként 1 példány + 1 tanári)

### Dokumentum Példány Forrás

Projekttervezési munkalap (1 oldal) 1 / csapat 20.1 sablon

REQ-lista (12 követelmény, üres acceptance criteria mezőkkel)

1 / csapat 20.2 sablon

Acceptance checklist (PASS/FAIL) 2 / csapat 20.3 sablon

Bug report jegyzetlap (5 mező) 4 / csapat 20.4 sablon

Telepítési lépéskártya (kivetítéshez is) 1 / gép 4. fejezet

Napi menetrend A4 (kivetítésre) 1 6. fejezet

### HA CSAK EGY DOLGOT TUDSZ ELŐRE MEGTENNI

Akkor a működő starter ZIP-et és a kipróbált factory repót készítsd el. A nap akkor sem borul fel, ha a telepítés lassabb — de akkor igen, ha a specifikációból nem lesz működő játék.

<!-- oldal 9 -->

# 4. Telepítési és regisztrációs útmutató

## A cél: 10:05-re minden gépen fusson a játék, és minden gyereknek legyen saját GitHub- és Trello-

## fiókja. A sorrend nem véletlen — először azt telepítjük, ami a játékhoz kell, utána azt, ami a munkafolyamathoz. A Node.js és a Git csak a második körben jön.

## 4.1 Telepítési sorrend és időigény (kivetíthető)

### # Program Idő Kötelező? Miért pont ő

1. Google Chrome 3 perc Igen A játék futtatása és a konzol (F12) hibakeresés.

2. Visual Studio Code 6 perc Igen Kódszerkesztő; ebben nyitjuk a projektet.

3. Live Server kiterjesztés 3 perc Igen Helyi HTTP-szerver. E nélkül az ES modulok nem töltődnek be.

4. Node.js LTS 5 perc Ajánlott Csak a tesztekhez (node --test). A játék enélkül is fut.

5. Git 4 perc Igen Verziókezelés; a GitHub Desktop Windows alatt hozza, de külön telepítés biztosabb.

6. GitHub Desktop 5 perc Igen Commit/push grafikusan, terminál nélkül.

7. GitHub + Trello fiók 12 perc Igen Minden gyerek saját fiókot hoz létre (szülői hozzájárulással); a tanár közben meghívja a repóba és a táblára.

ÖSSZESEN kb. 38 perc akkor, ha a telepítők helyben vannak (ebből 12 perc fiókregisztráció). Internetről letöltve 50–65 perc — ezért van pendrive, és ezért indul a blokk 09:15-kor.

## 4.2 Hivatalos letöltési linkek

### Eszköz Link

Google Chrome https://www.google.com/chrome/

Visual Studio Code https://code.visualstudio.com/download

Live Server (VS Code) https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

Node.js LTS https://nodejs.org/en/download

Git https://git-scm.com/downloads

GitHub Desktop https://desktop.github.com/download/

GitHub fiók https://github.com/signup

Trello https://trello.com/signup

Claude Code https://docs.claude.com/en/docs/claude-code/overview

Phaser 3.86.0 (CDN) https://cdn.jsdelivr.net/npm/phaser@3.86.0/dist/phaser.min.js

Phaser letöltés / dokumentáció

https://phaser.io/download

Node.js test runner https://nodejs.org/api/test.html

Playwright https://playwright.dev/docs/intro

GitHub Pages https://docs.github.com/en/pages

<!-- oldal 10 -->

## 4.3 VS Code + Live Server — a legfontosabb 9 perc

1. Telepítő indítása → Next / I accept → Install. Windows alatt hagyd bekapcsolva a „Add to PATH” opciót.

2. VS Code elindítása → bal oldali Extensions ikon (vagy Ctrl/Cmd + Shift + X).

3. Keresés: Live Server → a Ritwick Dey féle kiterjesztés → Install.

4. Ellenőrzés: nyisd meg a projekt index.html-jét, jobb klikk → Open with Live Server. A böngésző a

http://127.0.0.1:5500 címen nyitja meg.

### KÉSZ, HA

A böngésző címében 127.0.0.1:5500 látszik (nem file:///…), és az oldal nem üres. Ez a nap legfontosabb technikai állapota.

## 4.4 Node.js, Git, GitHub Desktop — a második kör

### Lépés Teendő Ellenőrzés

Node.js LTS telepítő, alapértelmezett beállítások. Windows alatt a „Tools for Native Modules” pipa nem kell.

Terminál: node -v → pl. v22.x

Git Telepítő, alapértelmezett beállítások. A „Git from the command line” opció maradjon bekapcsolva.

Terminál: git --version

GitHub Desktop Telepítés után indítsd el, és jelentkezz be a gyerek saját GitHub- fiókjával (File → Options → Accounts → Sign in).

Az app elindul, a fiók be van jelentkezve, és a File → Add local repository menü használható.

## 4.5 GitHub: minden gyerek saját fiókot hoz létre

A GitHub személyes fiókhoz legalább 13 évet ír elő, ezért a fiókot a gyerek a szülő tudtával és hozzájárulásával hozza létre (a szülői nyilatkozat ezt tartalmazza). A napon minden résztvevő saját fiókkal dolgozik: a commitok a saját felhasználónevük alatt jelennek meg, és otthon is visszatalálnak a munkájukhoz.

### Lépés Ki csinálja Mit kell tudni

### Regisztráció

A gyerek, szülői hozzájárulással

E-mail: saját vagy szülői cím. Felhasználónév: csapatnév + keresztnév, teljes név nélkül. Jelszó: írjátok fel a füzetbe vagy jelszókezelőbe.

github.com/signup

E-mail megerősítés A gyerek / a szülő A megerősítő levélre kattintás nélkül a push nem működik. Ez a leggyakoribb reggeli elakadás.

Csapatrepó A tanár hozza létre A repó a tanári szervezetben él; a tanár a gyerekeket collaboratorként hívja meg. Így a commit a gyereké, a repó a tanáré.

### GitHub Desktop bejelentkezés

A gyerek File → Options → Accounts → Sign in. Ezután a push a saját fiókkal megy, nem a tanáréval.

GitHub Pages A tanár kapcsolja be A publikálás a repó tulajdonosának joga; a linket a tanár írja fel a táblára.

### SZABÁLYOK, AMIKET MONDJ KI A NAP ELEJÉN

① Ne hozzatok létre fiókot hamis születési dátummal. ② A felhasználónév ne tartalmazzon teljes nevet, osztályt vagy iskolát. ③ Ne írjatok személyes adatot a repóba, a commit üzenetbe vagy a promptba. ④ A saját jelszavatokat senkinek nem adjátok oda, és nem írjátok a táblára. ⑤ A repó publikus lesz — ezért csak csapatnév és játéknév szerepel benne.

<!-- oldal 11 -->

## 4.6 Trello: minden gyerek saját fiókkal a közös táblán

Az Atlassian felhőszolgáltatásának feltételei 16 éves korhatárt tartalmaznak, ezért a fiókot a gyerek a szülő tudtával hozza létre, és a tanár hívja meg a közös táblára. Mindenki a saját fiókjában dolgozik; ha a regisztráció elakad (megerősítő e-mail, jelszó), a segítő a helyszínen oldja meg, és a kártyák felelőse mindig a gyerek saját felhasználója.

Egy közös tábla („OCEAN CAT – GAME JAM”): a tulajdonos a tanár, a gyerekek tagok.

Minden kártyán a gyerek saját Trello-felhasználója a felelős — így a felelősség látszik.

A tanár kivetíti a táblát, de a gyerekek a saját gépükön is látják és mozgatják a kártyákat.

Nap végén a táblát exportáljuk (JSON/nyomtatás) — a munka így is megmarad.

## 4.7 Telepítési ellenőrző lista gépenként (nyomtatható)

## Chrome elindul, és a F12 konzol megnyílik. ☐

## VS Code elindul, a projektmappa megnyitva. ☐

## Live Server kiterjesztés telepítve, és az index.html jobb klikkből megnyílik. ☐

## A böngésző címsorában 127.0.0.1:5500 áll, nem file://. ☐

## A játéktér (kék téglalap) látszik a böngészőben. ☐

## A konzolban nincs piros hibaüzenet. ☐

## node -v működik (ha kértük). ☐

## git --version működik. ☐

## GitHub Desktop elindul, be van jelentkezve a gyerek saját fiókjával, és helyi repót tud hozzáadni. ☐

## A projektmappa a saját Dokumentumok alatt van (nem a letöltésekben, nem asztalon lógó ZIP-ben). ☐

## 4.8 A tíz leggyakoribb hiba — és a válasz

### Tünet Ok Megoldás

Üres fehér oldal, konzolban CORS vagy module hiba

file://-ról nyitották meg Live Server használata.

Phaser is not defined A CDN script nem töltődött be (nincs net, vagy elgépelt verzió)

Helyi assets/phaser.min.js átírása az index.html-ben; verzió ellenőrzése.

Cannot use import statement outside a module

Hiányzik a type="module" A script tag javítása: <script type="module" src="./src/main.js">.

Nem találja a fájlt (404) Nagybetű/ékezet vagy rossz mappa a fájlnévben Fájlnév pontosan egyezzen; minden asset neve ékezet nélküli, kisbetűs.

A macska nem mozdul Nincs update(), vagy nem arcade body van a sprite-on

Ellenőrizni: this.physics.add.existing(), setCollideWorldBounds(true).

A szemét nem mozdul, csak átfedés van

Nincs collider, csak távolságellenőrzés this.physics.add.collider(cat, trashGroup).

A gép nem enged telepíteni Nincs admin jog B-terv: pendrive-os portable VS Code vagy a tanári tartalék gép.

A Wi-Fi lassú, a CDN nem tölt Hálózat Helyi phaser.min.js, illetve a starter ZIP használata.

<!-- oldal 12 -->

A GitHub Desktop nem tud pusholni

Nincs bejelentkezve, vagy a meghívás nincs elfogadva

Jelentkezzetek be a saját fiókkal, fogadjátok el a repó meghívását, és ellenőrizzétek az e-mail megerősítést. A commit addig is megmarad lokálisan.

A gyerek a rossz mappát nyitotta meg

ZIP-ből futtatás A ZIP-et kibontani, és a kibontott mappát megnyitni VS Code-ban.

# 5. A projekt felépítése és futtatása

## Minden csapat ugyanazt a kipróbált vázt kapja. Nem nulláról indítunk — a nap nem arról szól, hogy ki tudja megjegyezni a mappaneveket.

## 5.1 Mappastruktúra

ocean-cat/ ├── index.html # belépési pont: Phaser CDN + main.js

├── style.css ├── src/ │ ├── main.js # Phaser config, játék indítása │ ├── scenes/ │ │ ├── MenuScene.js │ │ └── GameScene.js │ ├── entities/

│ │ ├── Cat.js │ │ └── Trash.js │ └── systems/ │ ├── ScoringSystem.js # tiszta logika — Node-dal tesztelhető │ └── CollisionSystem.js ├── assets/ │ ├── images/ (cat.png, ocean.png, bottle.png, bag.png, can.png)

│ ├── audio/ │ └── phaser.min.js # offline tartalék ├── tests/ │ └── unit/scoring.test.js ├── docs/ │ ├── PRODUCT_SPEC.md │ ├── ACCEPTANCE_CRITERIA.md

│ ├── TEST_PLAN.md │ ├── TASK_BREAKDOWN.md │ └── GAME_DESIGN.md ├── .claude/skills/phaser3-game/SKILL.md ├── CLAUDE.md ├── package.json # csak "type": "module" és a test script └── README.md

<!-- oldal 13 -->

## 5.2 index.html — a teljes belépési pont

<!DOCTYPE html> <html lang="hu"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Ocean Cat</title>

<link rel="stylesheet" href="./style.css"> </head> <body> <div id="game"></div>

<!-- 1) normál eset: CDN --> <script src="https://cdn.jsdelivr.net/npm/phaser@3.86.0/dist/phaser.min.js"></script>

<!-- 2) B-terv offline: ezt a sort használd, ha nincs internet --> <!-- <script src="./assets/phaser.min.js"></script> -->

<script type="module" src="./src/main.js"></script> </body> </html>

## 5.3 src/main.js — a játék indítása

import { GameScene } from './scenes/GameScene.js';

const config = { type: Phaser.AUTO, width: 800, height: 600, parent: 'game', physics: {

default: 'arcade', arcade: { debug: false } // tanításkor kapcsold true-ra: látszanak a testek }, scene: [GameScene] };

new Phaser.Game(config);

### MIÉRT FONTOS, HOGY A LOGIKA KÜLÖN FÁJLBAN LEGYEN

A ScoringSystem.js nem importál Phasert, ezért Node-dal tesztelhető. A Phaser-függő viselkedést (mozgás, ütközés) böngészőben, Playwrighttal vagy manuálisan ellenőrizzük. Ez a kettős tesztelési modell teszi lehetővé, hogy bundler nélkül is legyen valódi TDD a napon.

## 5.4 Futtatás és a napi munkaciklus

1. VS Code-ban File → Open Folder → a kibontott ocean-cat mappa.

2. index.html jobb klikk → Open with Live Server.

3. Módosítás → Ctrl/Cmd + S mentés → a böngészőben F5 (a Live Server automatikusan is frissíthet).

4. Hiba esetén F12 → Console: a piros sor első sora a valódi hiba.

<!-- oldal 14 -->

### HA NINCS INTERNET

Cseréld ki a CDN script sort a helyi assets/phaser.min.js-re. A Live Server ugyanúgy működik, mert az helyi. Ez a teljes offline mód, bundle nélkül.

<!-- oldal 15 -->

# 6. A nap ütemterve percre bontva

## A táblázat a foglalkozásvezető órája. A „Kinek” oszlop megmondja, ki vezet; az „Eredmény” pedig az,

## amit a blokk végén fel tudsz mutatni.

### Idő Blokk Mit csinálunk Kinek Eredmény / checkpoint

08:45–09:00 Érkezés, előkészítés Gépek bekapcsolása, Wi-Fi, konnektorok, névkitűzők, csapatok helye. Aki korán jön, elkezdheti a telepítést.

FV Minden gép bootolt, a starter ZIP minden gépen a Dokumentumokban.

09:00–09:15 Nyitány A nap íve a táblán: délelőtt specifikáció, ebéd alatt Dark Factory, délután átvétel. Szabályok, szerepek, a 7 lépés bemutatása.

FV Mindenki el tudja mondani, mi készül 16 órára.

09:15–10:05 Telepítés és fiókok Kivetített lépéskártya: Chrome → VS Code → Live Server → Node → Git → GitHub Desktop → GitHub- és Trello- regisztráció. Párhuzamos segítői sáv, a starter ZIP kibontása, a tanár közben meghívja a gyerekeket a repóba és a táblára.

FV + segítő CHECKPOINT Minden

gépen 127.0.0.1:5500, kék játéktér, és minden gyerek be van jelentkezve a GitHub Desktopba. Aki nincs kész: starter ZIP + tanári gép.

10:05–10:15 Szünet 10 perc. A segítő közben megjavítja a maradék 1–2 gépet és lezárja a fiókregisztrációt; a tanári gépen elindul a Dark Factory próba (száraz futás).

— Minden gép zöld.

### 10:15–10:50 1. műhely — Product Discovery

Problémafelvetés, célközönség, játékosélmény. Csapatmunka a munkalapon: Product Vision 5 kérdésre.

FV EREDMÉNY Product

Vision + „Mi nincs benne” lista.

### 10:50–11:30 2. műhely — Problémabontás

Epic → User Story → Task. Feladatfa a táblán, majd Trello-kártyák felelősökkel és „Kész, ha:” mezővel.

FV CHECKPOINT 10–15

kártya a BACKLOGban, mindegyiken felelős és elfogadási feltétel.

11:30–12:05 3. műhely — Specifikáció REQ-001…REQ-012 kitöltése, acceptance criteria írása, majd AI- review: hiányzó és ellentmondó követelmények keresése.

FV + AI EREDMÉNY

PRODUCT_SPEC.md + ACCEPTANCE_CRITERIA.md első verziója.

### 12:05–12:25 4. műhely — Tesztterv és lezárás

Minden REQ-hez teszteset (lépés, elvárt eredmény). Traceability tábla. Git commit + push a publish stationön, Trello-állapotok frissítése.

FV CHECKPOINT

TEST_PLAN.md kész, commit üzenet: Add product specification v1.0.

12:25–12:30 Specification Freeze A verzió lezárása (v1.0), a factory bemenetének összeállítása, a vezérlőprompt elindítása. A gyerekek ezt látják kivetítve 2 percig.

FV CHECKPOINT A factory

fut, a specifikáció „befagyasztva”.

12:30–13:00 Ebéd — Dark Factory fut A gyerekek ebédelnek. A tanári gépen TDD ciklusokban épül a játék. A folyamat naplója (commitok, teszteredmények) kivetítve marad.

AI + FV EREDMÉNY 13:00-ra

futtatható játék a main ágon.

<!-- oldal 16 -->

13:00–13:30 Termékátvétel #1 Minden csapat megkapja a játékot. Végigjátsszák, és a saját acceptance checklistjükön PASS / FAIL / NEEDS INVESTIGATION jelölést adnak.

Csapatok EREDMÉNY Kitöltött

checklist + első hibalista.

13:30–14:10 Bug triage és priorizálás Hibák összegyűjtése, reprodukálási lépések, súlyosság (Critical/High/Medium/Low), sorrend. Trello FAIL oszlop.

FV CHECKPOINT Top 3

javítandó hiba konszenzussal kiválasztva.

14:10–14:25 Szünet 15 perc. A tanár a top 3 hibát előkészíti a javítási promptokhoz.

— —

14:25–15:05 Javítás AI-val, TDD-ben Hibánként: reprodukáló teszt → bukik → javítás → zöld → commit. A csapatok adják a promptokat, a tanár futtatja.

Csapatok + AI

EREDMÉNY Legalább 2

hiba javítva, teszttel bizonyítva.

15:05–15:25 Release és publikálás Utolsó tesztkör, verziócímke, release notes, GitHub Pages bekapcsolása, link kiosztása.

FV CHECKPOINT Minden

csapatnak van működő linkje vagy ZIP-je.

15:25–15:50 Csapatbemutatók Csapatonként 3 perc: mit terveztünk, mi valósult meg, mi maradt ki, mit tanultunk. Kérdés: „melyik követelmény volt rosszul megfogalmazva?”

Csapatok EREDMÉNY Bemutató +

közös visszajelzés.

15:50–16:00 Retro és zárás Értékelőlap, díjak, közös fotó, „mit vinnél haza ebből a módszerből” kérdés.

FV Értékelés lezárva, projekt mentve.

### IDŐPUFFEREK, AMIKET NE OSSZ EL ELŐRE

A 10:05-i szünet, a 14:10-i szünet és a 12:25-i 5 perc azért van, hogy a csúszást ne a délutáni átvétel és a bemutató rovására tudd levenni. Ha a telepítés 20 perccel tovább tart, a 2. műhelyt rövidítsd (a kártyák számát 10-re), ne a termékátvételt.

<!-- oldal 17 -->

# 7. 1. műhely — Product Discovery (10:15–10:50)

## A blokk célja, hogy a csapat saját szavakkal megfogalmazza, mit épít és mit nem. Itt még egyetlen sor

## kód nem készül.

## 7.1 Nyitó szöveg (2 perc, szó szerint is elmondható)

„A tenger tele van műanyag hulladékkal. A feladatotok: készítsetek egy játékot, amelyben egy úszó macska segít megtisztítani a tengert. A játékot nem ti fogjátok leprogramozni — ti fogjátok megtervezni és ellenőrizni. Egy AI fogja megépíteni, abból, amit ti leírtok. Ha a leírás pontatlan, a játék is pontatlan lesz. Ezért ez a délelőtt a legfontosabb része a napnak.”

## 7.2 A 40 perc beosztása

### Idő Tevékenység Forma

10:15–10:20 Problémafelvetés, a játékötlet bemutatása

Frontális, kivetítve

10:20–10:28 Ötletroham: „Mitől lesz ez szórakoztató?” — minden csapat 3 ötlete

Csapatmunka, poszt-it

10:28–10:42 A munkalap 1–2. pontja: cél és célközönség, Product Vision 3 mondatban

Csapatmunka, írásban

10:42–10:50 Csapatonként 1 perc bemutatás + „mi nincs benne” lista közösítése

Plenáris

## 7.3 Az öt kérdés, amit minden csapatnak meg kell válaszolnia

1. Mi a játék célja? Egy mondat, amit egy 8 éves is megért. („Tisztítsd meg a tengert, mielőtt elfogy az idő.”)

2. Kinek készül? Konkrét játékos, nem „mindenki”. („Olyan 10–12 éves, aki 5 percet játszik szünetben.”)

3. Mit csinál a játékos percről percre? Irányít, ütközik, tol, gyűjt, pontot szerez.

4. Mitől lesz szórakoztató? A macska vicces? Nehéz tolni a szemetet? Van időnyomás?

5. Mikor tekinthető sikeresnek a játék? Ez lesz a későbbi acceptance criteria alapja.

## 7.4 Product Vision sablon (a munkalapra)

### Mező Kitöltendő

Termék neve Ocean Cat — csapatverzió

Egy mondatos lényeg „Egy macska eltolja a tengeri szemetet egy gyűjtőhelyre, miközben az óra ketyeg.”

Kinek 10–12 éves, rövid szünetekben játszó gyerekek

Miért jó Azonnal érthető, fizikai játékérzet, saját grafika

Siker definíció „Egy idegen 2 perc alatt kipróbálja, és nem kell neki elmagyarázni.”

Mi nincs benne (out of scope)

Multiplayer, mentés, szintek, mobil irányítás, hangeffekt a zenén kívül

<!-- oldal 18 -->

### A „NINCS BENNE” LISTA A LEGFONTOSABB

Amikor a csapat először mondja azt, hogy „legyen benne multi”, írd fel a táblára, hogy NINCS BENNE, és magyarázd el: a jó projekt nem attól lesz jó, hogy mindent beleteszünk, hanem hogy a keveset befejezzük. Ez a scope-kezelés első leckéje, és a nap végén a retroban vissza fog térni.

## 7.5 A foglalkozásvezető szerepe ebben a blokkban

Ne adj kész válaszokat. Kérdezz vissza: „Ez hogyan látszana a képernyőn?”

Ha egy csapat elakad, adj egy választási lehetőséget: „A macska lassú és erős, vagy gyors és ügyetlen?” — a döntés az övék.

Jegyezd fel a falra a visszatérő ötleteket (időkorlát, hang, szintek) — ezekből lesz a „ha marad idő” lista a Trellón.

# 8. 2. műhely — Problémabontás és tervezés (10:50–11:30)

## Itt születik meg a feladatfa. A cél, hogy a gyerekek lássák: egy nagy feladat nem varázslat, hanem 10–15

## kicsi, ellenőrizhető lépés.

## 8.1 A három szint: Epic → User Story → Task

### Szint Mit jelent Példa a játékból

Epic Nagy funkcionális terület, akár több nap munka

„A macska irányítása”

User Story Egy játékos által igényelt képesség, egy mondatban

„Játékosként szeretném, hogy a macska minden irányba mozogjon.”

Task Konkrét, pár perc alatt megvalósítható munka

„Nyílbillentyűk bekötése a macska sebességére.”

## 8.2 A feladatfa, amit közösen felrajzolunk a táblára

OCEAN CAT (cél) ├── 1. Játékvilág → tenger háttér, korall, buborék

├── 2. Karakter → macska megjelenik, 4 irányba mozog, nem hagyja el a pályát ├── 3. Hulladék → 5 szemét, mindegyik fizikai testtel ├── 4. Fizika → ütközés, eltolás, pályán belül maradás ├── 5. Játékmenet → gyűjtőzóna, pontszám, új szemét └── 6. Befejezés → időkorlát, győzelmi képernyő, újrakezdés

## 8.3 A 12 követelmény (REQ) — közös kiinduló lista

A csapatok ezt a listát használják, de a szöveget maguk pontosítják. Az azonosítók nem változnak, mert a traceability (követhetőség) ezen alapul.

### ID Követelmény Prioritás Elfogadási feltétel röviden

REQ-001 A játék elindul böngészőben Must Live Serveren megnyitva 800×600-as játéktér, konzolhiba nélkül.

REQ-002 Tenger alatti háttér látszik Must Kék/korallos háttér a teljes játéktéren.

REQ-003 A macska megjelenik a játéktér közepén

Must Indításkor (400,300) környékén látható a sprite.

<!-- oldal 19 -->

REQ-004 A macska négy irányban mozgatható

Must Nyílbillentyűkre x/y változik, átlósan is mozog.

REQ-005 A macska nem hagyja el a játékteret

Must A szélen megáll, nem tűnik el.

REQ-006 Legalább 3 hulladék jelenik meg Must Különböző pozíciókban, mindegyiknek van fizikai teste.

REQ-007 A macska fizikailag eltolja a hulladékot

Must Ütközéskor a hulladék pozíciója megváltozik (valódi collider).

REQ-008 A hulladék a pályán belül marad Must Nem csúszik ki a játéktérről.

REQ-009 Van gyűjtőzóna Must Jól látható terület a pálya egyik sarkában.

REQ-010 A zónába tolt hulladék eltűnik és pontot ad

Must A szemét eltűnik, a pontszám +10.

REQ-011 Pontszám látszik a képernyőn Must Szöveg a bal felső sarokban, gyűjtéskor frissül.

REQ-012 Játék újraindítható Should Újrakezdés gomb vagy R billentyű, pontszám nullázódik.

## 8.4 Priorizálás: mit kell először megcsinálni?

Rajzold fel a függőségi láncot, és kérdezd meg: „Meg tudjuk-e csinálni a pontszámot, ha a macska nem mozog?” A válasz mindig az, hogy nem. A helyes sorrend:

### 1. Váz + háttér → 2. Macska megjelenik → 3. Mozgás + határok → 4. Hulladékok →

### 5. Ütközés + eltolás → 6. Gyűjtőzóna + pont → 7. Finomítás

## 8.5 Trello-kártyák feltöltése

Minden user storyból kártya lesz a BACKLOG oszlopban. A kártya kötelező mezői:

## Cím: rövid, igével kezdődik („Macska mozgatása nyilakkal”). ☐

## Leírás: 1–2 mondat, mit szeretnénk látni. ☐

## Kész, ha: az elfogadási feltétel (ellenőrizhető!). ☐

## Felelős: egy név, nem „mindenki”. ☐

## REQ-hivatkozás: REQ-004. ☐

## Állapot: BACKLOG → DOING → TESTING → PASS/FAIL → DONE. ☐

### A KÉT LEGGYAKORIBB HIBA, AMIT ITT JAVÍTANI KELL

① „Macska megcsinálása” — nem ellenőrizhető. Javítás: „A macska a nyilakkal mind a négy irányba mozog, és a pályán belül marad.” ② Mindenki felelős — az azt jelenti, hogy senki. Javítás: írjatok be egy nevet, és a szerepváltásnál írjátok át.

# 9. 3. műhely — A specifikáció megírása (11:30–12:05)

## A délelőtt végterméke egy olyan dokumentum, amiből egy idegen — vagy egy AI — meg tudja építeni a

## játékot. A mérce: „Ha ezt odaadom valakinek, aki nem volt itt, meg tudja csinálni?”

<!-- oldal 20 -->

## 9.1 A PRODUCT_SPEC.md szerkezete

### # Fejezet Mit kell eldönteni benne

1. Product vision Miért készül, kinek, egy mondatban.

2. Target audience Ki játszik vele, mennyi ideig, milyen eszközön.

3. Core gameplay Mit csinál a játékos másodpercről másodpercre.

4. Game world Háttér, színek, elemek, képernyőméret.

5. Game mechanics Mozgás sebessége, ütközés, eltolás, gyűjtőzóna működése.

6. Game rules Pontozás, időkorlát, győzelem/vereség, újrakezdés.

7. UI / UX Mi látszik a képernyőn és hol (pontszám, idő, utasítás).

8. User stories US-001…US-012, a REQ-ekhez kapcsolva.

9. Acceptance criteria Mindegyik REQ-hez 2–4 ellenőrizhető állítás.

10. Technical constraints Phaser 3.86 CDN, ESM, nincs bundler, 800×600, Arcade Physics.

11. Out of scope Amit tudatosan nem építünk meg.

12. Test scenarios Konkrét lépések és elvárt eredmények.

## 9.2 Egy követelmény, ahogy kinéznie kell

### REQ-007 — A HULLADÉK FIZIKAI ELTOLÁSA MUST

User story: Játékosként szeretném, hogy a macska fizikailag el tudja tolni a tengeri hulladékokat, hogy össze tudjam gyűjteni őket.

### Elfogadási feltételek:

A macska és a hulladék külön fizikai objektum (külön test).

A macska nekiütközhet a hulladéknak anélkül, hogy átmenne rajta.

Az ütközés hatására a hulladék pozíciója megváltozik.

A hulladék nem tűnik el pusztán az érintéstől.

A hulladék a játéktér határain belül marad.

Technikai megkötés: Phaser Arcade Physics collider, nem távolságellenőrzés.

Teszt: indítás → macska a palack felé → ütközés → a palack x/y koordinátája megváltozott → a palack a pályán belül van.

## 9.3 A „kész” fogalma — három szinten

### Megfogalmazás Minőség Miért

„Macska megcsinálása” ROSSZ Nem lehet eldönteni, hogy kész van-e.

„A macska megjelenik a játék közepén.”

OK Ellenőrizhető, de kevés.

„A macska a nyílbillentyűkkel mind a négy irányban mozgatható, a játékteret nem

JÓ Ellenőrizhető, mérhető, egyértelmű.

<!-- oldal 21 -->

hagyhatja el, és a mozgás sebessége 200 px/s.”

## 9.4 AI-review: a specifikáció átvizsgálása (10 perc)

Nem az AI írja a specifikációt — az AI ellenőrzi. Ezt a promptot használd kivetítve, csapatonként egy-egy bekezdéssel:

Te egy termékmenedzser vagy, aki egy 12 évesekből álló csapat specifikációját vizsgálja felül. Ne írj új játékötleteket.

Az alábbi specifikációhoz keresd meg:

1. Mely követelmények nem ellenőrizhetők (nincs mérhető feltétel)? 2. Hol mond ellent egymásnak két követelmény? 3. Melyik követelmény hiányzik ahhoz, hogy a játék végigjátszható legyen? 4. Melyik követelmény túl nagy ahhoz, hogy egy lépésben megvalósuljon? 5. Melyik követelmény függ egy másiktól, és melyik az, amelyik még hiányzik?

Minden pontnál idézd a kérdéses követelmény azonosítóját, és

egy mondatban indokold a problémát. Ne írj kódot.

[IDE ILLESZD BE A CSAPAT SPECIFIKÁCIÓJÁT]

### AMIT A GYEREKEK EBBŐL MEGTANULNAK

Az AI nem helyettük dönt, hanem olyan kérdéseket tesz fel, amiket ők maguk is feltehettek volna. A válaszok alapján 2–3 követelményt javítanak — ez a „spec review” mint munkalépés.

## 9.5 Mit kell 12:05-re késznek lennie

## docs/PRODUCT_SPEC.md — a 12 fejezettel, legalább 8–10 kitöltött REQ-val. ☐

## docs/ACCEPTANCE_CRITERIA.md — minden Must REQ-hoz 2–4 ellenőrizhető feltétel. ☐

## docs/TASK_BREAKDOWN.md — sorrend és függőségek. ☐

## docs/GAME_DESIGN.md — színek, karakterek, képernyőelemek (akár rajzzal). ☐

## A Trello BACKLOG / NEXT oszlopok kitöltve, felelősökkel. ☐

# 10. 4. műhely — Tesztterv és Specification Freeze (12:05–12:30)

## A specifikáció csak akkor ér valamit, ha meg lehet mérni, hogy teljesült-e. Ez a blokk rövid, de a délután

## egésze ezen fog állni.

## 10.1 Teszteset-sablon (minden Must REQ-hoz egy)

### Mező Kitöltés

Teszt azonosító

TEST-001 …

Kapcsolódó REQ

REQ-004

Előfeltétel A játék elindult, a macska középen van.

Lépések 1. Nyomd meg a jobbra nyilat 1 másodpercig. 2. Engedd el.

<!-- oldal 22 -->

Elvárt eredmény

A macska x koordinátája nagyobb lett, és nem lépte át a jobb szélt.

Eredmény PASS / FAIL

## 10.2 Traceability tábla — a nap gerince

Ez a táblázat köti össze a problémát, a követelményt, a feladatot, a tesztet és a commitot. Készítsd el a Trello leírásában vagy a TEST_PLAN.md végén:

### REQ Task Test Implementáció (commit) Állapot

REQ-001 TASK-001 TEST-001 scaffold phaser scene

PASS

REQ-004 TASK-004 TEST-004 add cat movement PASS

REQ-007 TASK-007 TEST-007 add arcade collider

FAIL → javítás

REQ-010 TASK-010 TEST-010 implement collector zone

NEEDS INVESTIGATION

## 10.3 Specification Freeze protokoll (5 perc)

1. Verzió: minden dokumentum tetejére v1.0 — 12:25.

2. Lezárás: a további ötletek nem kerülnek be, hanem a BACKLOG (v2) oszlopba.

3. Commit: GitHub Desktop → Summary: Add product specification v1.0 → Commit → Push (a gyerek saját GitHub-fiókjával).

4. Átadás a factory-nak: a négy dokumentum egy mappába kerül, a vezérlőprompt elindul.

5. Kihirdetés: „A specifikáció lezárva. Mostantól a termék épül, nem a terv változik.”

### MIÉRT KELL KIMONDANI A FREEZE-T?

Ez a nap legfontosabb projektmenedzsment-tapasztalata: a követelmények változtatása a fejlesztés közben nem ingyen van. Ha a gyerekek délután új ötlettel állnak elő, a válasz: „Ez egy v2-es ötlet. Írd fel a backlogra, és nézzük meg, belefér-e.” Így megtanulják a scope-kezelést a saját bőrükön.

## 10.4 A factory bemenete — mit kap az AI pontosan

### Fájl Szerepe a factory-ban

docs/PRODUCT_SPEC.md Az igazság forrása: mit kell építeni.

docs/ACCEPTANCE_CRITERIA.md Mikor számít egy követelmény teljesítettnek.

docs/TEST_PLAN.md Milyen teszteseteket kell létrehozni és lefuttatni.

docs/TASK_BREAKDOWN.md Milyen sorrendben, milyen függőségekkel dolgozzon.

CLAUDE.md Technológiai tilalmak és munkaszabályok (11.2).

.claude/skills/phaser3- game/SKILL.md

Phaser 3-szakértelem és minták (11.3).

<!-- oldal 23 -->

# 11. 12:30–13:00 — A Dark Factory

## A gyerekek ebédelnek, a specifikáció pedig bekerül egy előkészített, ellenőrzött fejlesztősorba. A factory

## nem varázslat: egy szigorú munkarend, amit a Claude Code hajt végre a projekt szabályai szerint.

## 11.1 A folyamat öt állomása

### SPEC INPUT → TERV → RED → GREEN → REFACTOR → VALIDÁLÁS →

### COMMIT

A Claude Code először elolvassa a négy dokumentumot, majd tervet ír (melyik REQ melyik fájlban, milyen sorrendben), és csak utána kezd el dolgozni — követelményenként egy RED → GREEN → REFACTOR ciklussal.

## 11.2 CLAUDE.md — a projekt állandó szabályai

# Ocean Cat — projekt szabályok

## Technológia (nem módosítható)
- Phaser 3.86.0, CDN-ről betöltve az index.html-ben.
- Natív JavaScript ES modulok. NINCS bundler, NINCS Vite, NINCS npm függőség.

- NINCS TypeScript, NINCS frontend framework, NINCS build lépés.
- Játéktér: 800×600. Fizika: Phaser Arcade Physics.

## Architektúra
- src/main.js csak a config és az indítás.
- Jelenetek: src/scenes/*.js. Entitások: src/entities/*.js.
- Tiszta logika (pontozás, szabályok) a src/systems/*.js-ben,

és NEM importálhat Phasert, hogy Node-dal tesztelhető legyen.
- Asset nevek: kisbetű, ékezet nélkül (cat.png, bottle.png).

## Munkaszabályok
- Egy ciklusban egy követelmény. Ne generálj "kész játékot" egyszerre.
- Minden viselkedéshez először teszt, aztán kód (RED → GREEN → REFACTOR).
- Tesztet nem törölni, nem gyengíteni, nem kihagyni.
- Ha a specifikáció kétértelmű: állj meg, írd le a kérdést a

docs/OPEN_QUESTIONS.md fájlba, és ne dönts helyette.
- Ne vezess be új könyvtárat, ha nem szerepel a specifikációban.
- Ne módosítsd a docs/ alatti jóváhagyott specifikációt.

## Minőség
- `node --test tests/unit` minden ciklus végén zöld.
- A böngésző konzolja hibamentes.

- Kész = az acceptance criteria teljesül ÉS teszt bizonyítja.

## 11.3 SKILL.md — a Phaser 3 szaktudás

A nyilvánosan elérhető Phaser-skill-ek egy része Phaser 4-re készült, ezért nem használhatók. Saját, rövid skill kell a .claude/skills/phaser3-game/SKILL.md alatt:

<!-- oldal 24 -->

--- name: phaser3-game

description: Phaser 3.86 Arcade Physics játékminták bundler nélküli, ES modulos, CDN-es projekthez. Akkor használd, ha jelenetet, sprite-ot, ütközést vagy pontozást kell implementálni. ---

# Phaser 3.86 — biztonságos minták

## Jelenet váz export class GameScene extends Phaser.Scene { constructor() { super('GameScene'); } preload() { this.load.image('cat', 'assets/images/cat.png'); } create() { this.cat = this.physics.add.sprite(400, 300, 'cat'); this.cat.setCollideWorldBounds(true);

} update() { /* input kezelése */ } }

## Ütközés (kötelező minta) this.trashGroup = this.physics.add.group(); this.physics.add.collider(this.cat, this.trashGroup);

## Tiltott minták
- TILOS: távolságellenőrzés (Math.distance) ütközés helyett.
- TILOS: setImmediate / setTimeout alapú "fizika".
- TILOS: új Phaser verzió vagy plugin.
- TILOS: asset betöltés külső URL-ről (minden asset helyi).

## Tesztelhető logika A pontozás és a szabályok tiszta függvényekben legyenek (src/systems/), Phaser-import nélkül.

<!-- oldal 25 -->

## 11.4 A Dark Factory vezérlőprompt (bemásolható)

You are the autonomous implementation agent for the Ocean Cat project. Work strictly according to the approved specification in /docs.

SOURCE OF TRUTH
- docs/PRODUCT_SPEC.md
- docs/ACCEPTANCE_CRITERIA.md

- docs/TEST_PLAN.md
- docs/TASK_BREAKDOWN.md
Also obey CLAUDE.md and the phaser3-game skill.
Do not invent gameplay features that are not in the specification.

MANDATORY WORKFLOW 1. Read all four specification documents and CLAUDE.md.

2. Inspect the existing project structure and the Phaser 3 skill. 3. Write an implementation plan ordered by dependencies. Print it. 4. Identify every testable requirement (REQ-xxx) and map it to a test. 5. Implement with strict Red-Green-Refactor, ONE requirement per cycle: a. Write one failing test (or one browser-checkable criterion). b. Run it and confirm it fails for the expected reason. c. Write the minimum implementation.

d. Run the test and confirm it passes. e. Refactor without breaking existing tests. 6. Run the full unit test suite: node --test tests/unit 7. Verify the game loads in the browser (Live Server) with no console errors. 8. Commit after each green cycle with a descriptive message.

CONSTRAINTS

- Phaser 3.86.0 via CDN, native ES modules, NO bundler, NO new dependencies.
- Real Arcade Physics colliders. Never replace collision with distance checks.
- Do not delete, weaken or skip tests to get green.
- Do not silently change approved requirements.
- If a requirement is ambiguous, write it to docs/OPEN_QUESTIONS.md and continue
with the next independent requirement.

DELIVERABLES
- Working game implementation.
- Automated tests.
- Test execution report.
- Requirement-to-test traceability table.
- List of incomplete requirements and known issues.

DEFINITION OF DONE A requirement is done only when its acceptance criteria are implemented AND verified by an executable test or a documented browser check. A successful build alone does not mean the product is complete.

## 11.5 A 30 perc reális beosztása

### Idő Mi történik Mit figyelj

12:30–12:34 Spec olvasás, terv nyomtatása Ha a tervben nincs REQ-hivatkozás, állítsd meg és kérj újat.

12:34–12:40 Első ciklus: váz + háttér + macska (REQ-001…003)

Itt már látszania kell valaminek a böngészőben.

12:40–12:48 Mozgás és határok (REQ-004, 005) Ez a leglátványosabb siker a gyerekeknek.

12:48–12:55 Hulladékok és ütközés (REQ-006, 007) Ellenőrizd, hogy valódi collider van-e, ne distance check.

12:55–13:00 Gyűjtőzóna és pontszám (REQ- 009…011) Ha csúszik, ez a blokk maradhat nyitva a délutánra.

<!-- oldal 26 -->

### HA 13:00-RA NINCS JÁTSZHATÓ JÁTÉK

Ne engedd tovább a factory-t „majd kész lesz” alapon. Állj meg, és használd a reference ZIP-et a termékátvételhez. A délután így is teljes értékű: a gyerekek a referenciajátékot értékelik a saját specifikációjuk ellen, és a hibákat a saját repójukban javítják tovább.

## 11.6 Milyen naplót mutass a gyerekeknek ebéd után

A commitok listáját (5–8 commit, mindegyik egy REQ-hez köthető).

A tesztek eredményét: hány teszt, hány zöld, mi bukott.

A traceability táblát: melyik REQ van kész, melyik nyitott.

Az OPEN_QUESTIONS.md tartalmát — ez a legjobb tananyag: a saját specifikációjuk hiányosságai.

<!-- oldal 27 -->

# 12. 13:00–14:10 — Termékátvétel és bug triage

## A gyerekek most nem fejlesztők, hanem terméktulajdonosok és tesztelők. A kérdés nem az, hogy „szép-

## e a játék”, hanem hogy „azt kaptuk-e, amit megrendeltünk”.

## 12.1 Az átvétel menete (13:00–13:30)

1. Indítás (3 perc): minden csapat megnyitja a játékot a saját gépén (Live Server vagy a kapott link).

2. Végigjátszás (7 perc): először szabadon, hogy legyen élmény. Utána jön a tesztelés.

3. Checklist (12 perc): REQ-onként PASS / FAIL / NEEDS INVESTIGATION. A megfigyelést mindig a tesztlépéshez írják, ne az érzéshez.

4. Hibalista (8 perc): minden FAIL-hez egy bug report lap (20.4).

## 12.2 A három állapot, amit használunk

### Állapot Jelentése Példa

PASS A teszteset lefutott, az elvárt eredmény teljesült. „A macska mind a négy irányba mozog.”

FAIL Lefutott, de nem azt kaptuk, amit a specifikáció kér. „A szemét nem mozdul, a macska átmegy rajta.”

NEEDS INVESTIGATION Nem tudjuk eldönteni: hiányzik a feltétel, vagy nem reprodukálható.

„Néha beszorul a szemét a sarokba — nem mindig.”

### A LEGFONTOSABB TANÍTANDÓ KÜLÖNBSÉG

„Nem tetszik” ≠ „hibás”. A „legyen szebb a háttér” nem FAIL, hanem új igény — a v2-es backlogra kerül. A FAIL mindig egy vállalt követelmény nem teljesülése. Ezt a különbséget írd ki a táblára.

## 12.3 Prioritás: melyik hibát javítsuk először?

### Súlyosság Jelentés Példa a játékból

Critical A játék használhatatlan, a fő funkció nem működik.

A macska nem mozog; a játék nem indul el.

High A fő játékmenet sérül, de a játék játszható.

Nincs fizikai ütközés; nem lehet pontot szerezni.

Medium Zavaró, de van megkerülő megoldás.

A pontszám nem frissül azonnal; a szemét a sarokba szorul.

Low Kozmetikai vagy kényelmi. A háttér nem elég szép; a buborék túl gyors.

Szabály: egy Critical és egy High javítás többet ér, mint öt Low. A csapatok szavazzanak, de a tanárnak vétójoga van a sorrendre.

## 12.4 Bug report — öt mező, ennyi elég

### Mező Példa

Mi történt A macska nekiütközik a palacknak, de átmegy rajta.

Mit vártunk A palack elmozdul (REQ-007).

<!-- oldal 28 -->

Reprodukálás Indítás → jobbra 2 mp → ütközés a palackkal. Mindig.

Súlyosság High

Kapcsolódó REQ REQ-007 / TEST-007

## 12.5 Triage megbeszélés (13:50–14:10)

Vezesd végig a csapatokat három kérdéssel:

1. Ez valóban hiba, vagy hiányzó követelmény? Ha a specifikáció nem írta le, az a specifikáció hibája — ez a legjobb tanulság.

2. Mi a legkisebb javítás, amitől ez PASS lesz? Ne a teljes újratervezés legyen a válasz.

3. Melyik REQ-t adjuk fel, hogy ez működjön? Időkeret van, nem lehet mindent.

# 13. 14:25–15:25 — Javítás AI-val, majd release

A délutáni TDD ugyanaz a ciklus, mint a factoryé, csak most a gyerekek adják a bemenetet. Ez a nap legfontosabb gyakorlati része: ők irányítják az AI-t, nem fordítva.

## 13.1 A javítási prompt — ezt a mintát tanítsd meg

A REQ-007 követelmény nem teljesül. Elvárt: a macska ütközésekor a palack elmozdul (Arcade Physics collider). Tapasztalt: a macska átmegy a palackon, a palack nem mozdul. Reprodukálás: indítás → jobbra nyíl 2 mp → ütközés. Mindig.

Kérlek: 1. Mondd meg, mi az okozója a legvalószínűbb hiba. 2. Írj egy tesztet, ami ezt a hibát kimutatja (először bukjon el). 3. Javítsd a lehető legkisebb változtatással. 4. Futtasd a teszteket, és mutasd az eredményt. Ne módosíts más működő funkciót.

## 13.2 A ciklus, amit a táblán is kövessetek

### # Lépés Mit lát a csapat

1. Hiba kiválasztása (Trello FAIL) Egyértelmű, reprodukálható hiba, REQ-hivatkozással.

2. Reprodukáló teszt A teszt piros (RED) — bizonyíték, hogy a hiba létezik.

3. Minimális javítás A teszt zöld (GREEN).

4. Teljes tesztkör + böngészős ellenőrzés

Semmi más nem tört el.

5. Commit Fix REQ-007 trash collision

6. Trello: FAIL → PASS A traceability tábla frissül.

### MIT MONDJ A GYEREKEKNEK, HA AZ AI ROSSZ MEGOLDÁST AD

„Ez a legjobb pillanat a napon. Az AI nem tévedhetetlen — most ti vagytok a minőségbiztosítók. Mondjátok meg neki pontosan, mi nem jó, és kérjetek másik megoldást.” Ez a kritikus AI-használat lényege.

<!-- oldal 29 -->

## 13.3 Release (15:05–15:25)

1. Utolsó tesztkör: a Must REQ-ok checklistje újra, gyorsan.

2. Verzió: v1.0 a README-ben, a dátumsal.

3. Release notes (5 sor): mi működik, mi nem, mi csúszott a v2-re.

4. Publikálás: tanári GitHub-fiók → a csapat repója → Settings → Pages → a main ág / root. A linket felírod a táblára. (A push a gyerekek saját fiókjával történt.)

5. Mentés: ZIP a tanári gépre és pendrive-ra, csapatonkénti mappába.

### HA A GITHUB PAGES NEM MŰKÖDIK 5 PERCEN BELÜL

Ne rontsd el vele a bemutatót. A B-terv: a játék a tanári gépen fut Live Serverrel, kivetítve; a ZIP a csapatoknál marad; a linket utólag küldöd ki. A publikálás nem cél, hanem eszköz.

# 14. 15:25–16:00 — Bemutató, értékelés, retro

## A bemutató nem arról szól, kié szebb. Arról szól, ki tudja megmagyarázni a saját döntéseit.

## 14.1 A 3 perces bemutató szerkezete

### Idő Kérdés Mit várunk

0:00–0:30 Mit építettetek és kinek? Egy mondat, a Product Visionból.

0:30–1:30 Mutasd meg a játékot! Élő játék, 2–3 gyűjtés.

1:30–2:15 Melyik követelmény teljesült, melyik nem?

A traceability tábla alapján, nem érzésből.

2:15–2:45 Mi volt a legnehezebb döntés?

Priorizálás, scope, hiba.

2:45–3:00 Mit csinálnátok másképp?

Egy konkrét változtatás.

## 14.2 Értékelőlap (100 pont)

### Szempont Pont Mire adod

A probléma megértése 15 Világos cél, valós célközönség, tudatos scope.

Értelmes problémabontás 20 10–15 önálló, ellenőrizhető egység; nem maradt ki kulcsfontosságú rész.

Prioritások és tervezés 15 Helyes sorrend, felismert függőségek, valós időbecslés.

Trello használata 10 Kártyák felelőssel, állapotok követve, nem utólag töltötték ki.

AI tudatos használata 15 Egy funkció / prompt, ellenőrzés, a hibás válasz felismerése.

Tesztelés és hibajavítás 15 Reprodukálható hibák, PASS/FAIL, javítás teszttel.

Együttműködés és bemutató 10 Mindenki megszólal, szerepek cserélődtek, érthető előadás.

<!-- oldal 30 -->

### A PONTOZÁS ALAPELVE

Egy kevésbé látványos, de jól megtervezett és következetesen végigvitt projekt mindig előzze meg a látványos, egyetlen prompttal generált játékot. Ezt mondd is ki a nap elején, hogy ne a látványért versenyezzenek.

## 14.3 Retro — öt kérdés, írásban is kitölthető

1. Melyik követelményünket sikerült jól megfogalmazni, és miért?

2. Melyik volt félreérthető? Mit írnánk másképp?

3. Milyen hibát nem vettünk észre a specifikációban?

4. Miben segített az AI, és hol akadályozott?

5. Mit csinálnánk másképp egy következő projektben?

# 15. Trello és GitHub — a két munkamódszer-eszköz

## Ugyanaz a projekt, két különböző kérdésre válaszol. Ezt a különbséget érdemes külön kihangsúlyozni: a gyerekek hajlamosak összemosni a kettőt.

### Eszköz Kérdés Tartalom

Trello Mit kell csinálnunk? Feladatok, felelősök, prioritás, állapot, haladás.

GitHub Mit csináltunk? Változatok, commitok, visszaállíthatóság, közös eredmény.

A Trello a közös munkanaplónk és feladattáblánk. A GitHub a közös műhelyünk, ahol a munka megőrződik.

## 15.1 A Trello-tábla felépítése

### Oszlop Mit tartalmaz Mikor mozdul

BACKLOG Minden tervezett feladat, priorizálva Reggel, a bontás után

NEXT A következő 2–3 feladat Triage után

DOING Amin éppen dolgozunk (max. 2 kártya) Munka közben

TESTING Elkészült, ellenőrzésre vár Factory után

### PASS / FAIL / NEEDS INVESTIGATION

Az átvétel eredménye 13:00–14:10

DONE Elfogadott, teszttel bizonyított Release előtt

BACKLOG (v2) Amit tudatosan kihagytunk Freeze után minden új ötlet

<!-- oldal 31 -->

## 15.2 Kártyasablon

Cím:       Macska mozgatása nyilakkal
Leírás:    A macska mind a négy irányba mozogjon, átlósan is.
Kész, ha:  - négy nyíl működik
- a macska nem hagyja el a játékteret
- a sebesség 200 px/s
Felelős:   Bence

REQ: REQ-004 Állapot: BACKLOG → DOING → TESTING → PASS

## 15.3 A napi GitHub-ciklus (terminál nélkül)

1. A csapat a saját gépén dolgozik egy helyi repóban (GitHub Desktop: Add local repository).

2. Változtatás után a GitHub Desktop bal oldalán látszanak a módosított fájlok.

3. Summary: rövid, igés üzenet, pl. Add trash collider. Leírás: miért.

4. Commit to main — ez helyi művelet, fiók nélkül is működik.

5. A push a gyerek saját fiókjával megy (GitHub Desktopban bejelentkezve); a tanár a repó tulajdonosaként már meghívta a csapatot, és a nap végén bekapcsolja a Pages-t.

## 15.4 Jó és rossz commit üzenetek

### Jó Miért

Add product specification v1.0 Megmondja, mi változott és miért van verzió.

Add cat movement with arrow keys Egy funkció, egy commit.

Fix REQ-007 trash collision Követelményhez köthető.

Add collector zone scoring Érthető a történelemből.

Kerülendő: update, fix, asd, final2, minden. Ha a commit üzenet nem mondja meg, mit csináltunk, a következő ember (vagy a jövőbeli énünk) nem tudja visszakeresni.

## 15.5 Ki mit lát a GitHubon — és mit nem

### ADATVÉDELEM

A repó publikus lesz. Ezért: nincs benne teljes név, osztály, iskola, e-mail, telefonszám, arc- vagy hangfelvétel. A csapatnév és a játék neve elég. A commit szerzője a gyerek saját GitHub-felhasználóneve — ezért ne tartalmazzon teljes nevet.

# 16. Csapatok és szerepek

## A Code Trio 3 fős csapata. A szerep nem díszítés: minden szerephez tartozik egy látható felelősség, amit a Trello-kártyán be kell tölteni.

### Szerep Felelősség Látható nyoma a napon

Product owner A „miért” és a „kinek” kérdése; a scope védelme; a bemutató eleje.

Product Vision, out-of-scope lista, döntés a v2-ről.

<!-- oldal 32 -->

Spec felelős A REQ-ek és acceptance criteria megfogalmazása; a dokumentum írása.

PRODUCT_SPEC.md, ACCEPTANCE_CRITERIA.md.

Tesztelő Tesztesetek, végigjátszás, PASS/FAIL, bug reportok.

TEST_PLAN.md, kitöltött checklist.

Git / Trello felelős Kártyák állapota, commit üzenetek, repó és tábla rendben tartása.

Commitok, Trello-oszlopok, release notes.

AI-kapitány (mindenki

A promptok megfogalmazása, az AI válaszának értékelése.

Promptnapló (3–5 bevált prompt).

kipróbálja)

## 16.1 Szerepváltás

Két váltás van: 11:30-kor (specifikáció írásakor) és 14:10-kor (javítás előtt). A váltás 60 másodperc: a régi felelős egy mondatban átadja az állapotot, és a Trellón átírják a felelős nevét. Így mindenki belekerül legalább egyszer a döntéshozó szerepbe.

### A CODE TRIO 3 FŐS BEOSZTÁSA

A product owner és a spec felelős összevont szerep, a tesztelő és a Git/Trello felelős külön marad, mert a nap végén egyszerre kell tesztelni és publikálni. Az AI-kapitányt mindenki sorban kipróbálja, így mindenki belekerül a promptolásba.

# 17. Ellenőrző listák a naphoz

## 17.1 Foglalkozásvezetői napi checklist (nyomtasd ki és pipáld)

### Reggel, 08:45-ig

## Terem berendezve: csapatonként egy asztal, konnektorok, hosszabbítók. ☐

## Wi-Fi jelszó a táblán; a tanári gép hálózata tesztelve. ☐

## Starter ZIP és reference ZIP minden gépen / pendrive-on. ☐

## Telepítők elérhetők (pendrive + tanári gép). ☐

## Nyomtatott munkalapok, REQ-lista, checklist, bug lapok csapatonként. ☐

## Trello-tábla kivetítve, 12 kártya előkészítve. ☐

## Claude Code bejelentkezve, a repó megnyitva, a skill betöltve. ☐

## node --test tests/unit lefut a tanári gépen (minta zöld). ☐

## „Human-defined · AI-built · Human-verified” felírva a táblára. ☐

### 09:00–10:00

## Mindenki tudja, mi készül 16 órára. ☐

## Minden gépen 127.0.0.1:5500 és kék játéktér. ☐

## A segítő átvette a maradék 1–2 gépet. ☐

## Product Vision elkezdve (munkalap 1–2. pont). ☐

<!-- oldal 33 -->

### 10:00–12:30

## Csapatonként 10–15 kártya, felelőssel és „Kész, ha” mezővel. ☐

## Minden Must REQ-hoz tartozik legalább 2 acceptance criterion. ☐

## AI-review lefutott, 2–3 követelmény javítva. ☐

## TEST_PLAN.md kész, traceability tábla kitöltve. ☐

## Commit: Add product specification v1.0. ☐

## Freeze kihirdetve, a factory vezérlőprompt elindítva. ☐

### 12:30–14:10

## A factory legalább a REQ-001…007-et teljesítette (vagy reference ZIP bevetve). ☐

## Minden csapat kitöltötte a checklistjét PASS/FAIL/NI jelöléssel. ☐

## Minden FAIL-hez van reprodukálási lépés. ☐

## Top 3 hiba kiválasztva, súlyossággal. ☐

## Az OPEN_QUESTIONS.md átnézve a csapatokkal. ☐

### 14:10–16:00

## Legalább 2 hiba javítva, teszttel bizonyítva (RED → GREEN). ☐

## Minden csapatnak van működő linkje vagy ZIP-je. ☐

## Release notes 5 sorban, v1.0 a README-ben. ☐

## Minden csapat bemutatott 3 percben, mindenki megszólalt. ☐

## Értékelőlap kitöltve, retro kérdések megválaszolva. ☐

## Projekt mentve (ZIP + pendrive), közös fotó elkészült. ☐

## 17.2 Csapat készültségi lista (kivetíthető)

### Állapot Feladat

☐ Van csapatnevünk és egy mondatos célunk.

☐ Tudjuk, mi NINCS benne a játékban.

☐ 12 követelményünk van azonosítóval.

☐ Minden követelményhez van „Kész, ha” feltétel.

☐ Minden kártyának van felelőse.

☐ Van teszttervünk lépésekkel és elvárt eredménnyel.

☐ A specifikáció commitolva van.

☐ Végigjátszottuk a játékot és kitöltöttük a checklistet.

☐ Minden hibához van reprodukálási lépés.

☐ Javítottunk legalább 2 hibát.

☐ Van release notes és működő link / ZIP.

☐ Felkészültünk a 3 perces bemutatóra.

<!-- oldal 34 -->

# 18. Letöltési és forráslista egy oldalon

## Ez az az oldal, amit érdemes kinyomtatva a tanári asztalra tenni. Minden link hivatalos forrás.

## 18.1 Telepítők

### Eszköz Link

Google Chrome https://www.google.com/chrome/

Visual Studio Code https://code.visualstudio.com/download

Live Server (VS Code) https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

Node.js LTS https://nodejs.org/en/download

Git https://git-scm.com/downloads

GitHub Desktop https://desktop.github.com/download/

## 18.2 Fiókok és szolgáltatások

### Szolgáltatás Link Megjegyzés

GitHub regisztráció https://github.com/signup 13+; minden gyerek saját fiókot hoz létre

GitHub feltételek https://docs.github.com/en/site-policy/github- terms/github-terms-of-service

Életkor ellenőrzése

Trello https://trello.com/signup tanári tábla

Atlassian feltételek https://www.atlassian.com/legal/cloud-terms-of-service 16+ / szervezeti keret

GitHub Pages https://docs.github.com/en/pages publikálás

## 18.3 Fejlesztés és tesztelés

### Erőforrás Link

Phaser 3.86.0 CDN https://cdn.jsdelivr.net/npm/phaser@3.86.0/dist/phaser.min.js

Phaser letöltés https://phaser.io/download

Phaser dokumentáció https://docs.phaser.io/

Phaser Arcade Physics https://docs.phaser.io/phaser/concepts/physics/arcade

Node.js test runner https://nodejs.org/api/test.html

Playwright https://playwright.dev/docs/intro

Claude Code https://docs.claude.com/en/docs/claude-code/overview

Claude Code skillek https://docs.claude.com/en/docs/claude-code/skills

## 18.4 Grafika és hang (előre letöltve, assets mappába)

### Forrás Link Mire használjuk

Kenney Game Assets https://kenney.nl/assets kész sprite-csomagok, ingyenes licenc

<!-- oldal 35 -->

OpenGameArt https://opengameart.org háttér, hangok (licencet ellenőrizni)

Pixabay https://pixabay.com tengeri háttér, illusztrációk

CraftPix ingyenes https://craftpix.net/freebies/ tengerfenék, szemét ikonok

### ASSET-SZABÁLY

Minden fájl neve ékezet nélküli, kisbetűs: cat.png, ocean.png, bottle.png, bag.png, can.png, collect.wav. Minden csapat ugyanazt a csomagot kapja, hogy a factory és a starter projekt azonnal működjön.

# 19. Prompttár — előre begyakorolt szövegek

## A nap során ezeket a promptokat használod kivetítve. A cél, hogy a gyerekek lássák a mintát: szerep +

## kontextus + egyetlen feladat + ellenőrzési mód.

## 19.1 Specifikáció-review

Te termékmenedzser vagy. Az alábbi specifikációt vizsgáld felül.

Ne találj ki új játékötleteket. Keresd meg: (1) nem ellenőrizhető követelmények, (2) ellentmondások, (3) hiányzó követelmények a végigjátszhatósághoz, (4) túl nagy követelmények, (5) függőségek. Minden pontnál idézd a REQ-azonosítót. [SPEC]

## 19.2 Tesztesetek generálása

Az alábbi acceptance criteria-hoz írj teszteseteket a TEST_PLAN.md formátumában (előfeltétel, lépések, elvárt eredmény). Csak olyan tesztet írj, amit egy 12 éves kézzel is végre tud hajteni

a böngészőben. Ne írj kódot. [ACCEPTANCE CRITERIA]

## 19.3 Implementáció egy követelményre

Valósítsd meg a REQ-004 követelményt a specifikáció szerint, egyetlen lépésben. Először írd le, mely fájlokat fogod módosítani és miért. Utána írj egy tesztet, ami most elbukik, futtasd le, majd implementálj. A végén futtasd a teljes tesztkészletet, és mutasd az eredményt. Ne módosíts más, már működő funkciót.

## 19.4 Hibajavítás (délutáni minta)

A REQ-007 nem teljesül. Elvárt: [elvárt működés]

Tapasztalt: [tényleges működés] Reprodukálás: [lépések] Kérlek: (1) mondd meg a legvalószínűbb okot, (2) írj reprodukáló tesztet, (3) javíts minimálisan, (4) futtasd a teszteket.

<!-- oldal 36 -->

## 19.5 „Miért nem működik?” — tanuló prompt

Ez a hibaüzenet jelent meg: [üzenet]. Magyarázd el 12 éves szinten: mit jelent, mi okozta, és hogyan lehet megtalálni a hiba helyét. Ne javítsd ki, csak magyarázd el.

## 19.6 Scope-védelem (amikor a csapat új ötlettel jön)

Ez egy új ötlet: [ötlet]. Hasonlítsd össze a jelenlegi specifikációval. Mondd meg, hogy beilleszthető-e a mostani verzióba, vagy a v2 backlogra való. Indokold egy mondatban, és ne írj kódot.

### AZ ÖT KÉRDÉS MINDEN AI-VÁLASZ UTÁN

1. Megértettem, amit az AI javasolt?

2. Valóban a mi problémánkra válaszolt?

3. Hogyan tudom ellenőrizni?

4. Mi történik, ha nem működik?

5. Mit tanultam belőle?

<!-- oldal 37 -->

# 20. Nyomtatható sablonok

## 20.1 Projekttervezési munkalap (1 oldal / csapat)

### Kérdés Válasz

Csapat neve

Tagok és szerepek

Mi a célunk egy mondatban?

Kinek készül?

Mitol lesz szórakoztató?

Mi nincs benne? (out of scope)

Melyik az első feladat, és miért?

Honnan tudjuk, hogy kész?

## 20.2 REQ-lista (12 követelmény)

### ID Követelmény Kész, ha… Prioritás

REQ- 001 A játék elindul Must

REQ- 002 Tengeri háttér Must

REQ- 003 Macska megjelenik Must

REQ- 004 Mozgás négy irányba Must

REQ- 005 Nem hagyja el a pályát Must

REQ- 006 Legalább 3 hulladék Must

REQ- 007 Fizikai eltolás Must

REQ- 008 Hulladék a pályán belül Must

REQ- 009 Gyűjtőzóna Must

REQ- 010 Gyűjtés pontot ad Must

<!-- oldal 38 -->

REQ- 011 Pontszám látszik Must

REQ- 012 Újraindítás Should

## 20.3 Acceptance checklist

### REQ Tesztlépés Elvárt PASS FAIL NI

REQ- 001 Live Server megnyitása játéktér látszik ☐ ☐ ☐

REQ- 004 Jobbra nyíl 1 mp x nő, nem lép ki ☐ ☐ ☐

REQ- 007 Nekiütközés a palacknak palack elmozdul ☐ ☐ ☐

REQ- 010 Palack a zónába tolva eltűnik, +10 pont ☐ ☐ ☐

Megjegyzés / megfigyelés:

## 20.4 Bug report lap

### Mező Kitöltés

Mi történt

Mit vártunk

Reprodukálás lépései

Súlyosság Critical / High / Medium / Low

Kapcsolódó REQ

## 20.5 Retro lap

1. Melyik követelményünk volt jól megfogalmazva, és miért?

2. Melyik volt félreérthető? Hogyan írnánk újra?

3. Milyen hibát nem vettünk észre a specifikációban?

4. Miben segített az AI, és hol akadályozott?

5. Mit csinálnánk másképp egy következő projektben?

<!-- oldal 39 -->

# A. Függelék — fogalmak, kockázatok, B-tervek

## A.1 Fogalomtár a gyerekeknek

### Fogalom Egy mondatban

Specifikáció Írásos megállapodás arról, mit kell elkészíteni és mit nem.

Acceptance criteria Ellenőrizhető feltétel: honnan tudjuk, hogy kész.

User story Egy játékos igénye egy mondatban: „Játékosként szeretném…”

Epic Nagyobb funkcionális terület, sok user storyval.

Task Konkrét, rövid munka, ami egy user storyhoz kell.

Backlog A tervezett feladatok listája, fontossági sorrendben.

Sprint / ciklus Egy rövid, befejezett munkaszakasz (itt: egy REQ).

TDD Teszt előbb, kód utána: RED → GREEN → REFACTOR.

Commit Egy mentett, megnevezett változat a projekt történetében.

Push A helyi változatok feltöltése a közös tárolóba.

Repo A projekt mappája verziókezeléssel.

Freeze A specifikáció lezárása: innentől nem változtatunk rajta.

Triage A hibák súlyosság szerinti sorba állítása.

Traceability Követelmény → feladat → teszt → commit → elfogadás nyomon követése.

## A.2 Kockázatok és B-tervek

### Kockázat B-terv Mit ne tegyél

A telepítés 60 percnél tovább tart

Starter ZIP + Live Server csak az egyik gépen; a csapat a tanári gépen dolgozik

Ne a termékátvételt rövidítsd.

Nincs internet / lassú Wi-Fi Helyi assets/phaser.min.js; a GitHub-műveleteket elhalasztod

Ne a felhőre épülő lépéseket erőltesd.

A factory nem ad játszható játékot 13:00-ra

Reference ZIP bevetése; a gyerekek ezt értékelik a saját specifikációjuk ellen

Ne kezdj el te kódot írni a gyerekek előtt.

Egy csapat lemarad Csökkentsd a Must REQ- ok számát 8-ra; a többit v2-be

Ne engedd, hogy a bemutató elmaradjon.

GitHub Pages nem működik Helyi Live Server + ZIP; a linket utólag küldöd

Ne a publikálás legyen a nap fénypontja.

Egy gyerek elveszíti a munkáját

Commit minden 10 percben; ZIP a pendrive-ra

Ne a „majd a végén mentünk” elvre hagyatkozz.

Az AI olyan kódot ad, ami nem fut

Konzol-hiba visszamásolása; kisebb

Ne fogadd el a „majdnem jó” választ ellenőrzés nélkül.

<!-- oldal 40 -->

lépésre bontás

## A.3 A nap záró gondolata — amit a gyerekeknek mondj

### EGY MONDAT, AMIT VIGYENEK HAZA

„Ma nem programozni tanultatok meg egy nap alatt, hanem azt, hogyan kell egy nagy feladatot szétvágni, sorba rakni, megcsináltatni és ellenőrizni. Ez a készség akkor is működik, ha az AI holnap teljesen máshogy néz ki.”

Ocean Cat workshop kézikönyv · v1.0 · Készült a foglalkozás napjára, 09:00–16:00 · Technológia: Phaser 3.86.0 (CDN) + natív JavaScript ES modulok, bundler nélkül · A dokumentum nyomtatható A4 méretben, a fejezetek oldaltöréssel indulnak.
