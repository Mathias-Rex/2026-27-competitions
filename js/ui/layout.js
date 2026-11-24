/* Az oldal váza, a fejléc, a versenykapcsolók és a közös idővonal (createGantt). */

let gantt = null;

// Az oldal vázának felépítése (egyszer, induláskor)
function buildPage() {
    const app = document.getElementById('app');
    app.textContent = '';

    buildHeader(app);
    const main = E({ tag: 'main', attrs: { class: 'cmp-main' }, parent: app });

    // 1. Versenykapcsolók
    E({ tag: 'section', attrs: { id: 'filterCardsContainer', class: 'cmp-filters', 'aria-label': 'Versenyek szűrése' }, parent: main });

    // 2. Közös idővonal
    const timeline = E({ tag: 'section', attrs: { class: 'cmp-panel' }, parent: main });
    const thead = E({ tag: 'div', attrs: { class: 'cmp-panel-head' }, parent: timeline });
    const ttext = E({ tag: 'div', parent: thead });
    B.createTitle({ parent: ttext, id: uid('t'), text: 'Közös időtengely és mérföldkövek', class: 'cmp-h2' }, 2);
    B.createParagraph({ parent: ttext, id: uid('p'), text: 'Kattints bármelyik pontra a részletes teendők megtekintéséhez!', class: 'cmp-hint' });
    E({
        tag: 'div', attrs: { class: 'cmp-legend' }, parent: thead, children: [
            h('span', 'cmp-legend-item', undefined, [h('span', 'cmp-legend-dot'), { tag: 'span', text: 'Forduló / Határidő' }]),
            h('span', 'cmp-legend-item is-final', undefined, [h('span', 'cmp-legend-diamond'), { tag: 'span', text: 'Döntő' }]),
            h('span', 'cmp-legend-item is-today', undefined, [h('span', 'cmp-legend-line'), { tag: 'span', attrs: { id: 'legendTodayText' }, text: 'Mai nap' }], { attrs: { id: 'legendTodayItem', class: 'cmp-legend-item is-today' } })
        ]
    });
    E({ tag: 'div', attrs: { id: 'timelineContainer' }, parent: timeline });

    // 3. Kiválasztott esemény + időrendi lista
    const split = E({ tag: 'div', attrs: { class: 'cmp-split' }, parent: main });
    const aside = E({ tag: 'aside', attrs: { class: 'cmp-panel cmp-aside' }, parent: split });
    const ahead = E({ tag: 'div', attrs: { class: 'cmp-aside-head' }, parent: aside });
    B.createTitle({ parent: ahead, id: uid('t'), text: 'Kiválasztott esemény', class: 'cmp-aside-title' }, 3);
    B.createBadge({ parent: ahead, id: 'detailStatusBadge', text: 'Részletek', class: 'cmp-pill' });
    E({ tag: 'div', attrs: { id: 'eventDetailPanel' }, parent: aside });

    const listPanel = E({ tag: 'section', attrs: { class: 'cmp-panel cmp-list-panel' }, parent: split });
    const lhead = E({ tag: 'div', attrs: { class: 'cmp-list-head' }, parent: listPanel });
    const ltext = E({ tag: 'div', parent: lhead });
    B.createTitle({ parent: ltext, id: uid('t'), text: 'Időrendi teendők és dátumok', class: 'cmp-section-title' }, 3);
    B.createParagraph({ parent: ltext, id: 'listSubtitle', text: 'Az aktív versenyek összes eseménye időrendben', class: 'cmp-hint' });
    const segment = E({ tag: 'div', attrs: { class: 'cmp-segment', role: 'group', 'aria-label': 'Időszűrő' }, parent: lhead });
    [['all', 'Összes'], ['upcoming', 'Csak hátralévő']].forEach(([value, text]) => {
        const btn = B.createButton({
            parent: segment, id: `timefilter-${value}`, text, class: 'cmp-seg-btn',
            click: () => { timeFilter = value; applyTimeFilterUI(); renderChronologicalList(); saveState(); }
        });
        btn.dataset.timefilter = value;
    });
    E({ tag: 'div', attrs: { id: 'chronologicalList', class: 'cmp-list' }, parent: listPanel });

    // 4. Versenykiírások (összecsukható)
    const info = E({ tag: 'section', attrs: { class: 'cmp-panel', 'aria-label': 'Versenykiírások, Feltételek és Linkek' }, parent: main });
    const ihead = E({ tag: 'div', attrs: { class: 'cmp-panel-head' }, parent: info });
    const itext = E({ tag: 'div', parent: ihead });
    B.createTitle({ parent: itext, id: uid('t'), text: 'Versenykiírások, Feltételek és Linkek', class: 'cmp-h2 cmp-h2-lg' }, 2);
    B.createParagraph({ parent: itext, id: uid('p'), text: 'A bekapcsolt versenyek részletes kiírása, kategóriái, díjazása és hivatalos elérhetőségei', class: 'cmp-hint' });
    B.createButton({
        parent: ihead, id: 'toggleDetailsSectionBtn', text: 'Részletek elrejtése', class: 'cmp-toggle-btn',
        click: () => { isDetailsSectionOpen = !isDetailsSectionOpen; applyDetailsSectionUI(); saveState(); }
    });
    E({ tag: 'div', attrs: { id: 'detailedInfoCardsContainer', class: 'cmp-info-grid' }, parent: info });

    // 5. Letölthető dokumentumok
    const downloads = E({ tag: 'section', attrs: { 'aria-label': 'Letölthető dokumentumok' }, parent: main });
    B.createTitle({ parent: downloads, id: uid('t'), text: 'Letölthető dokumentumok', class: 'cmp-h2' }, 2);
    B.createParagraph({ parent: downloads, id: uid('p'), text: 'A versenykiírások és szabályzatok eredeti PDF-jei versenyenként.', class: 'cmp-hint', style: 'margin-bottom:0.75rem' });
    E({ tag: 'div', attrs: { id: 'downloadsContainer', class: 'cmp-dl-grid' }, parent: downloads });

    E({
        tag: 'footer', attrs: { class: 'cmp-footer' }, parent: app,
        text: 'Összesített verseny-idővonal • Radnóti HACK & CODE • Neumann János Informatikai Verseny • Árpád-kupa'
    });
}

// Fejléc: márka, mai nap jelvény, téma váltó, hamburger menü (mobil)
function buildHeader(app) {
    const header = E({ tag: 'header', attrs: { class: 'cmp-header' }, parent: app });
    const inner = E({ tag: 'div', attrs: { class: 'cmp-header-inner' }, parent: header });

    const brand = E({ tag: 'div', attrs: { class: 'cmp-brand' }, parent: inner });
    E({ tag: 'span', attrs: { class: 'cmp-brand-icon' }, content: ICONS.calendar, parent: brand });
    const names = E({ tag: 'div', attrs: { style: 'min-width:0' }, parent: brand });
    B.createTitle({ parent: names, id: 'pageTitle', text: 'Mátyás király utcai Általános Iskola versenycsapatok versenyei', class: 'cmp-title' }, 1);
    B.createParagraph({ parent: names, id: uid('p'), text: '2026. november – 2027. április', class: 'cmp-subtitle' });

    const menuBtn = B.createButton({
        parent: inner, id: 'menuToggleBtn', text: '', class: 'cmp-menu-btn',
        click: () => {
            const controls = document.getElementById('headerControls');
            const open = controls.classList.toggle('is-open');
            menuBtn.setAttribute('aria-expanded', String(open));
            menuBtn.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
            menuBtn.innerHTML = open ? ICONS.close : ICONS.menu;
        }
    });
    menuBtn.innerHTML = ICONS.menu;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-controls', 'headerControls');
    menuBtn.setAttribute('aria-label', 'Menü megnyitása');

    const controls = E({ tag: 'div', attrs: { id: 'headerControls', class: 'cmp-controls' }, parent: inner });
    B.createBadge({ parent: controls, id: 'headerTodayBadge', text: `Mai nap: ${TODAY_INFO.fullHu}`, class: 'cmp-today-badge' });
    const themeBtn = B.createButton({
        parent: controls, id: 'themeToggleBtn', text: '', class: 'cmp-theme-btn',
        click: () => {
            const next = isDark() ? 'light' : 'dark';
            try { localStorage.setItem('theme', next); } catch (e) { /* nincs mentés */ }
            applyTheme(next);
        }
    });
    themeBtn.title = 'Világos / sötét mód';
    themeBtn.setAttribute('aria-label', 'Téma váltása');
}

// A mai nap jelmagyarázata
function renderTodayLegend() {
    const item = document.getElementById('legendTodayItem');
    item.hidden = !isTodayWithinTimeline();
    document.getElementById('legendTodayText').textContent = `Ma (${TODAY_INFO.shortHu})`;
}

// Versenykapcsoló kártyák (createCard + createCheckbox kapcsoló)
function renderFilterCards() {
    const container = mount('filterCardsContainer');
    competitions.forEach(comp => {
        const upcoming = comp.events.filter(e => !isPast(e.date)).length;
        const card = B.createCard({
            parent: container,
            id: `filter-${comp.id}`,
            class: `cmp-filter${comp.active ? '' : ' is-off'}`,
            title: comp.name,
            body: [],
            footer: []
        });
        card.setAttribute('style', compVars(comp));
        card.addEventListener('click', e => {
            if (e.target.closest('.cmp-switch')) return;
            comp.active = !comp.active;
            updateAll();
        });

        B.createParagraph({ parent: card.querySelector('.card-body'), id: uid('p'), text: comp.targetGroup });
        const sw = B.createCheckbox({
            parent: card.querySelector('.card-body'), id: `switch-${comp.id}`,
            labelText: `${comp.name} ki/bekapcsolása`, checked: comp.active,
            onChange: e => { comp.active = e.target.checked; updateAll(); }
        });
        sw.classList.add('cmp-switch');

        const footer = card.querySelector('.card-footer');
        E({ tag: 'span', attrs: { class: 'cmp-filter-org', title: comp.organizer }, text: `📍 ${comp.organizer}`, parent: footer });
        E({ tag: 'span', attrs: { class: 'cmp-filter-count' }, text: `${upcoming} hátralévő esemény`, parent: footer });
    });
}

// A versenyek sávjai a közös idővonalon
function ganttRows() {
    return competitions.filter(c => c.active).map(comp => {
        const first = comp.events[0];
        const last = comp.events[comp.events.length - 1];
        return {
            id: comp.id,
            label: comp.shortName,
            sublabel: `${first.displayDate} – ${last.displayDate}`,
            periodLabel: '',
            color: cc(comp, 'color'),
            start: first.date,
            end: last.endDate || last.date,
            data: comp,
            milestones: comp.events.map(ev => ({
                id: ev.id,
                date: ev.date,
                label: ev.shortLabel,
                caption: shortDate(ev.displayDate),
                meta: ev.displayTime || undefined,
                placement: ev.laneOffset === -1 ? 'above' : 'below',
                shape: ev.isFinal ? 'diamond' : 'dot',
                flag: ev.discrepancy ? { text: '!', title: prevInfoText(ev) } : undefined,
                data: ev
            }))
        };
    });
}

// Közös idővonal: egyszer jön létre, utána csak a sorait cseréli (a görgetés megmarad)
function renderTimeline() {
    if (!gantt) {
        const wide = window.innerWidth >= 1024;
        gantt = B.createGantt({
            parent: 'timelineContainer',
            id: 'timeline',
            ariaLabel: 'Versenyek közös idővonala',
            rows: ganttRows(),
            from: '2026-11',
            to: '2027-04',
            axis: 'months',
            monthWidth: wide ? 380 : 260,
            labelWidth: wide ? 190 : 104,
            barStyle: 'thin',
            dimPast: true,
            selectable: false,
            dragScroll: true,
            today: TODAY_STR,
            todayLabel: `Ma (${TODAY_INFO.shortHu})`,
            labelHeader: 'Verseny',
            emptyText: 'Nincs kiválasztott verseny. Kapcsold be legalább az egyik versenyt a fenti kártyákon az idővonal megjelenítéséhez!',
            selectedMilestoneId: selectedEventId || undefined,
            onMilestoneHover: ms => {
                selectedEventId = ms.id;
                gantt.selectMilestone(ms.id);
                renderEventDetail();
            },
            onMilestoneClick: ms => {
                selectedEventId = ms.id;
                updateAll();
                openEventModal(ms.id);
            }
        });
        return;
    }
    gantt.setRows(ganttRows());
    gantt.selectMilestone(selectedEventId);
}
