<!-- forrás: Otthoni-Telepitesi-Utmutato.pdf | sha256: 85b392dee9a2271432cbdaa4511e965d4de2196254c3c15a3f9fcea87ba35091 -->

<!-- oldal 1 -->

R E C Y C L I N G C E N T R E T Y C O O N · O C E A N C AT · O T T H O N I F E L K É S Z Ü L É S

# Telepítsd fel otthon — 45 perc

Ez a lap azért van, hogy a workshop napján ne telepítéssel teljen az idő.

Otthon megcsinálod, a napon már csak játszunk.

Kinek szól: a „0xd15ea5ed” (8. osztály) és a „Code Trio” (7. osztály) csapat minden tagjának. Mit hozz: ezt a kitöltött lapot. Ha valami nem sikerült, az sem baj — a helyszínen megoldjuk.

## 1. Mit kell otthon megcsinálnod?

Öt dolog van a listán. Sorrendben haladj, mert a későbbiek épülnek az előbbiekre. Aztán pipáld ki, és

hozd magaddal ezt a lapot.

### # Mit Mennyi Miért kell a napon

1. Node.js + VS Code + Live Server 15 perc Ebben nyitjuk meg a játékot; a Live Server nélkül a játék nem indul el.

2. GitHub-fiók (a sajátod) 8 perc A kódod a te neveden lesz, és otthon is visszatalálsz hozzá.

3. Trello-fiók (a sajátod) 5 perc A feladatok a közös táblán lesznek, a felelős a te neved.

4. Három AI-eszköz (Codex, Freebuff,

15 perc Ezek közül választunk a napon. Mind a három a terminálban fut.

Kilo)

5. Próba: minden működik-e 3 perc Ha itt zöld, a napon nem veszítünk 20 percet.

### HA NINCS OTTHON SZÁMÍTÓGÉPED, VAGY NEM ENGED TELEPÍTENI

Ne aggódj, és ne erőltesd. Írd rá erre a lapra, hogy „nincs gép”, és a napon iskolai gépen dolgozol. A

fiókokat (GitHub, Trello) viszont otthon is meg tudod csinálni telefonon is — a jelszót írd fel a füzetbe.

### AZ EGYETLEN SZABÁLY, AMI MINDENNÉL FONTOSABB

A fiókokat a szülőd tudtával hozod létre. A GitHubnál ez 13 éves kortól, a Trellónál 16 éves kortól engedett — ezért a szülői nyilatkozatban szerepel, hogy a fiók létrehozásához hozzájárul. Ha a szülő azt

mondja, hogy erre még várjunk, akkor a napon tanári segítséggel, közösen oldjuk meg.

<!-- oldal 2 -->

## 2. Amit először telepíteni kell

Ez a négy program kell ahhoz, hogy a játék fusson. A napon ezekre épül minden.

### Program Honnan Telepítés után ellenőrizd

Google Chrome google.com/chrome Megnyílik, és az F12 lenyomására

előjön a konzol.

Visual Studio Code code.visualstudio.com Elindul, és meg tudsz nyitni egy

mappát (File → Open Folder).

Live Server (VS Code-on

VS Code → Extensions → keresd: Live Server → a

Egy index.html-re jobb klikk →

belül)

Ritwick Dey féle → Install

Open with Live Server.

Node.js LTS nodejs.org Terminálban: node -v → valami

ilyet ír: v22. vagy v24.

### MIÉRT A NODE.JS A LEGFONTOSABB?

A három AI-eszköz mind a Node.js-en keresztül települ (a npm parancs miatt). Ha a node -v működik, a többi már csak pár perc.

### Hogyan nyitod meg a terminált?

### Rendszer Így

Windows Start menü → írd be: Terminal (vagy PowerShell) → Enter. Egy sötét ablak jön elő, ahová lehet írni.

macOS Cmd + Szóköz → írd be: Terminal → Enter.

## 3. A GitHub-fiókod

A GitHub az a hely, ahol a kódod tárolódik. A saját fiókod kell, mert a napon a te neveden lesznek a

mentések (commitok).

1 Nyisd meg: github.com/signup

Az e-mail cím lehet a sajátod vagy a szülőé. Ha a szülőét használod, a megerősítő levelet majd ő nyitja

meg.

2 Válassz felhasználónevet — ez lesz látható a többieknek is.

Jó: tycoon-viki, ocean-trió-01. Ne legyen benne a teljes neved, az iskolád vagy az osztályod. A repó

ugyanis nyilvános lesz.

3 Jelszó: írd fel a füzetbe vagy a szülő jelszókezelőjébe. Ne a böngésző „emlékezz rám” gombjára bízd,

mert a napon másik gépen ülsz.

4 Erősítsd meg az e-mailt. A levélben lévő linkre kattints. E nélkül a napon nem fog menni a feltöltés

(push) — ez a leggyakoribb reggeli elakadás.

5 Kész? Jelentkezz be, és nézd meg a saját profilodat. Ha látod a saját felhasználónevedet, kész vagy.

<!-- oldal 3 -->

### AMIT SOHA NE TEGYÉL A GITHUBRA

Ne írd be a lakcímedet, a telefonszámodat, az iskoládat, és ne tölts fel fényképet magadról. A repó

nyilvános: bárki láthatja. Csak a csapatnév, a játék neve és a kód kerüljön bele.

## 4. A Trello-fiókod

A Trello egy tábla, amire kártyákat pakolunk. Minden kártya egy feladat, és minden kártyán egy név áll: a

felelősé. A napon a te neved is ott lesz.

1 Nyisd meg: trello.com/signup, és regisztrálj e-mail címmel.

2 Név: a keresztneved elég (pl. „Viki”). A teljes nevet nem kell megadni.

3 Erősítsd meg az e-mailt, majd jelentkezz be. Ha a főoldalon látod a saját boardjaidat (egyelőre üres),

kész.

4 A táblára meghívót kapsz. A tanár a nap előtt meghívja a saját felhasználónevedet a közös táblára. A meghívót e-mailben vagy a Trello jobb felső harang ikonjánál találod — kattints az Accept-re.

### HA NEM JÖN MEGHÍVÓ

Nem baj. A napon a tanár újra elküldi, vagy a helyszínen egy közös gépen megnézzük együtt. A fiók megléte a fontos, a meghívó 30 másodperc.

## 5. Mi az a „CLI”, és miért használjuk?

A CLI nem varázsszó: egy program, amit szöveges ablakból irányítasz. A grafikus programokban

kattintasz, itt beírsz egy parancsot, és Entert nyomsz.

A napon három ilyen eszközt nézünk meg. Mind a három ugyanazt tudja alap szinten: megnézi a mappádat,

megírja a kódot, lefuttatja a tesztet. Abban különböznek, ki fizeti a mögötte lévő AI-t, és milyen nyelven

„beszél”.

### Eszköz Parancs, amivel indítod Mire jó a napon

### ChatGPT Codex

codex Ha van a családban ChatGPT Plus/Pro előfizetés, ez a legerősebb. Óvatos: a ChatGPT ingyenes csomagjában a Codex nem feltétlenül elérhető a terminálból.

### CLI

Freebuff CLI freebuff Ingyenes, fiók és bankkártya nélkül. Ez a biztonsági tartalék, ha a másik kettő nem működik.

Kilo Code CLI kilo Sokféle AI-modell közül lehet választani. Kilo-fiókkal vagy saját kulccsal működik.

### NEM KELL MIND A HÁROM!

Elég, ha egy működik. A napon a csapat kiválasztja, melyikkel dolgozik. Ha otthon csak a Freebuffot

sikerül feltenni, az teljesen rendben van — a többit a helyszínen, közösen nézzük meg.

<!-- oldal 4 -->

## 6. A három eszköz telepítése

Mind a három ugyanígy települ: megnyitod a terminált, beírsz egy sort, Enter. Utána ellenőrzöd, hogy

tényleg ott van.

### 6.1 ChatGPT Codex CLI

npm install -g @openai/codex

Ellenőrzés: codex --version — ha kiír egy verziószámot, kész.

Első indítás és bejelentkezés (a terminálban, a saját mappádban):

cd Dokumentumok\sajat-mappa # Windows cd ~/Documents/sajat-mappa # macOS codex

Induláskor válaszd a Sign in with ChatGPT lehetőséget, és jelentkezz be a böngészőben. Ha a ChatGPT-

fiókod nem tartalmaz Codex-hozzáférést, ezt a program meg fogja írni — akkor lépj tovább a 6.2-re, és ne

fizess semmiért.

### 6.2 Freebuff CLI

npm install -g freebuff

Ellenőrzés: freebuff -v

Indítás (a saját mappádban): freebuff

Nem kell hozzá fiók, API-kulcs vagy bankkártya: elindul, és kérdez. A mappában dolgozik, amelyikben

elindítottad — ezért mindig a projekt mappájában indítsd.

### 6.3 Kilo Code CLI

npm install -g @kilocode/cli

Ellenőrzés: kilo --version · Indítás: kilo

Az első indítás után írd be a /connect parancsot, és jelentkezz be Kilo-fiókkal (vagy add meg a saját API-

kulcsodat, ha van). A napon ezt közösen nézzük meg, otthon csak a telepítés a cél.

### HA MACOS-EN VAGY LINUXON „EACCES” HIBÁT ÍR KI

A telepítés jogosultság miatt akadt el. Ne írd elé, hogy sudo. Írd be ezt a két sort, majd indítsd újra a

terminált, és próbáld újra a telepítést:

mkdir -p ~/.npm-global npm config set prefix ~/.npm-global

Utána a ~/.zshrc fájl végére ez kell: export PATH="$HOME/.npm-global/bin:$PATH". Ha ez túl bonyolult,

hagyd a helyszínre — nem ez a nap lényege.

<!-- oldal 5 -->

## 7. Ellenőrző lista — ezt hozd magaddal

Olvasd végig, és pipáld ki, ami kész. Ami nem kész, azt írd mellé, mi történt. A napon ezzel kezdünk.

A Chrome megnyílik, és az F12-re látszik a konzol. ☐

A VS Code elindul, és meg tudok nyitni egy mappát. ☐

A Live Server kiterjesztés telepítve van a VS Code-ban. ☐

A terminálban a node -v kiír egy verziószámot (22 vagy újabb). ☐

Van saját GitHub-fiókom, és az e-mail meg van erősítve. ☐

Emlékszem a GitHub-felhasználónevemre: ______________________ ☐

Van saját Trello-fiókom, és be tudok jelentkezni. ☐

A codex --version működik nem kötelező ☐

A freebuff -v működik ez a tartalék, próbáld meg ☐

A kilo --version működik nem kötelező ☐

### A MINIMUM, AMIVEL MÁR JÓ VAGY

Chrome + VS Code + Live Server + Node.js + GitHub-fiók + Trello-fiók. Ha ezek megvannak, a nap 100%-

ban teljesíthető. A három CLI közül elég egy, és azt is meg tudjuk oldani a helyszínen.

## 8. Szabályok, amiket otthon is tarts be

Ne adj meg személyes adatot. Sem a fiókokban, sem az AI-nak írt szövegben. Az AI-asszisztens elolvassa a mappádat, amiben dolgozik — ezért ne legyen ott semmi magánjellegű.

Az AI nem tévedhetetlen. Ha valamit nem értesz, kérdezz vissza: „miért ezt írtad?” A napon pont ezt fogjuk gyakorolni.

Ne futtass olyan parancsot, amit nem értesz. Ha a terminálban valami ijesztőt írnak ki (törlés, letöltés, jelszó), állj meg, és kérdezd meg a szülőt vagy a foglalkozásvezetőt.

Jelszót nem osztunk meg. Sem baráttal, sem a tanárral, sem az AI-val. Ha elfelejtetted, „Elfelejtett jelszó”

— nem új fiók.

A fiók a tiéd. A nap végén is a saját neveden marad, otthon is beléphetsz, és folytathatod a játékot.

<!-- oldal 6 -->

## 9. Ha valami nem megy

### Amit látsz Mit tegyél

node: command not found /

A Node.js nem települt, vagy a terminált a telepítés előtt nyitottad meg. Indítsd újra a

terminált (vagy a gépet), és próbáld újra.

'node' is not recognized

npm ERR! EACCES Jogosultsági hiba. Lásd a 6.3 alatti dobozt, vagy hagyd a helyszínre.

npm ERR! 404 a telepítésnél Elgépelted a csomag nevét. Codex: @openai/codex, Freebuff: freebuff, Kilo:

@kilocode/cli.

A Codex nem enged bejelentkezni A ChatGPT-fiókod nem tartalmaz Codex-hozzáférést. Ez nem hiba nálad — használd a Freebuffot.

A GitHub megerősítő levél nem jön Nézd meg a spam mappát. Ha 10 perc után sincs, a GitHubon kérj újraküldést. A napon

ez nem akadályoz meg semmit, a commit lokálisan megmarad.

A Trello nem enged regisztrálni Írj a foglalkozásvezetőnek (bozzay.viktor@gmail.com), és a napon közösen

megoldjuk.

Nem tudom, mit írjak a terminálba Semmit. A telepítéshez csak a fenti sorok kellenek, más nem. A többit a napon mutatjuk.

## 10. Szülőknek — 8 sorban

Mit telepítünk? A gyerek saját gépére három, terminálból vezérelhető AI-kódsegédet (OpenAI Codex CLI, Freebuff CLI, Kilo Code CLI), valamint a játék futtatásához szükséges ingyenes programokat (Chrome, VS

Code, Live Server, Node.js).

Melyik ingyenes? A Freebuff ingyenes, fiók és bankkártya nélkül. A Codex a ChatGPT Plus/Pro

előfizetéshez tartozik, a Kilo saját fiókkal vagy API-kulccsal működik — egyikhez sem kérünk előfizetést, a nap egy ingyenes eszközzel is teljesíthető.

Milyen adat megy ki? Az eszközök a megnyitott projekt kódját és a gyerek által beírt szöveget küldik a

szolgáltatónak. Ezért kérjük, hogy a projekten kívül semmilyen személyes adat, fotó vagy dokumentum ne

legyen abban a mappában, és a fiókokban se szerepeljen lakcím, telefon, iskola.

Ki felügyel? A foglalkozás idején a foglalkozásvezető (Bozzay Viktor, a Mátyás Király Utcai Általános

Iskola szerződött önkéntese) van jelen. A foglalkozásról fénykép-, videó- és hangfelvétel nem készül. A fiókok létrehozásához a szülői nyilatkozat ad hozzájárulást.

Otthoni felkészülési útmutató · Recycling Centre Tycoon (0xd15ea5ed) és Ocean Cat (Code Trio) · v1.0 · 2026. november 27. Kérdés esetén: bozzay.viktor@gmail.com · A telepítési parancsok a szolgáltatók hivatalos dokumentációjából származnak (2026.

november); ha a jövőben változnak, a hivatalos oldal az irányadó.
