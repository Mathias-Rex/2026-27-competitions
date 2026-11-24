/*
 * A nézet (index.html YAML) számára származtatott adatok.
 *
 * A forrás-állapot kicsi: active (versenykapcsolók), timeFilter, selectedId, detailsOpen, menuOpen, theme.
 * Ebből számoljuk a kész szövegeket és listákat, amelyeket a YAML `${...}` kifejezésekkel jelenít meg.
 */

// A megjelenített listák elemeinek azonossága megmarad, ha a tartalom nem változott
// (így az each csak a ténylegesen módosult elemeket építi újra). Az előző érték az állapottárból jön.
function stable(prev, next) {
    const old = new Map((Array.isArray(prev) ? prev : []).map(i => [i.id, i]));
    return next.map(item => {
        const o = old.get(item.id);
        return o && JSON.stringify(o) === JSON.stringify(item) ? o : item;
    });
}

const activeComps = () => competitions.filter(c => c.active);

function compSummary(comp) {
    const upcoming = comp.events.filter(e => !isPast(e.date)).length;
    return {
        id: comp.id,
        name: comp.name,
        targetGroup: comp.targetGroup,
        organizer: '📍 ' + comp.organizer,
        active: !!comp.active,
        cls: 'cmp-filter' + (comp.active ? '' : ' is-off'),
        count: `${upcoming} hátralévő esemény`,
        vars: compVars(comp)
    };
}

function ganttRows() {
    return activeComps().map(comp => {
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
            milestones: comp.events.map(ev => ({
                id: ev.id,
                date: ev.date,
                label: ev.shortLabel,
                caption: shortDate(ev.displayDate),
                meta: ev.displayTime || undefined,
                placement: ev.laneOffset === -1 ? 'above' : 'below',
                shape: ev.isFinal ? 'diamond' : 'dot',
                flag: ev.discrepancy ? { text: '!', title: prevInfoText(ev) } : undefined
            }))
        };
    });
}

function eventItem(comp, ev, selectedId) {
    const past = isPast(ev.date);
    return {
        id: ev.id,
        vars: compVars(comp),
        cls: 'cmp-item' + (past ? ' is-past' : '') + (ev.id === selectedId ? ' is-selected' : ''),
        dateCls: 'cmp-datebox' + (ev.isFinal ? ' is-final' : ''),
        date: shortDate(ev.displayDate),
        hasTime: !!ev.displayTime,
        time: ev.displayTime || '',
        year: ev.date.slice(0, 4),
        isFinal: !!ev.isFinal,
        shortName: comp.shortName,
        discrepancy: !!ev.discrepancy,
        discrepancyTitle: ev.discrepancy ? prevInfoText(ev) : '',
        title: ev.title,
        description: ev.description,
        pill: past ? 'Lejárt' : formatRelativeDays(ev.date),
        pillCls: 'badge cmp-pill' + (past ? '' : ' is-ok'),
        location: '📍 ' + ev.location,
        hasLink: !!ev.linkUrl,
        linkUrl: ev.linkUrl || '',
        linkLabel: '🔗 ' + (ev.linkLabel || 'Megnyitás'),
        canCalendar: !past
    };
}

function eventDetail(selectedId) {
    const found = findEventById(selectedId);
    if (!found) return null;
    const { comp, ev } = found;
    const past = isPast(ev.date);
    return {
        id: ev.id,
        vars: compVars(comp),
        shortName: comp.shortName,
        title: (ev.isFinal ? '🏆 ' : '') + ev.title,
        date: ev.displayDate,
        hasTime: !!ev.displayTime,
        time: ev.displayTime || '',
        location: ev.location,
        endEstimated: !!ev.endEstimated,
        discrepancy: !!ev.discrepancy,
        discrepancyTitle: ev.discrepancy ? prevInfoText(ev) : '',
        description: ev.description,
        hasLink: !!ev.linkUrl,
        linkUrl: ev.linkUrl || '',
        linkLabel: '🔗 ' + (ev.linkLabel || 'Hivatkozás megnyitása'),
        canCalendar: !past,
        status: past ? 'Már elmúlt' : formatRelativeDays(ev.date),
        statusCls: 'badge cmp-pill' + (past ? '' : ' is-ok')
    };
}

function infoCard(comp) {
    const d = comp.details;
    return {
        id: comp.id,
        vars: compVars(comp),
        shortName: comp.shortName,
        name: comp.name,
        organizer: '🏛️ ' + comp.organizer,
        address: '📍 ' + comp.address,
        participants: d.participants,
        hasTeams: !!d.ourTeams,
        teamsTitle: d.ourTeams ? `Csapataink (${d.ourTeams.length} csapat)` : '',
        teams: d.ourTeams || [],
        hasCategories: !!d.categories,
        categories: d.categories || [],
        hasTheme: !d.categories && !!d.theme,
        theme: d.theme || '',
        rounds: d.roundsSummary,
        prizes: d.prizes,
        links: d.links.map(l => ({
            label: l.label,
            icon: l.primary ? '🔗' : '🌐',
            cls: 'cmp-cta ' + (l.primary ? 'is-solid' : 'is-quiet')
        })).map((l, i) => ({ ...l, url: d.links[i].url })),
        contacts: '✉️ ' + d.contacts
    };
}

/** A forrás-állapotból számolt, megjelenítésre kész adatok. */
function derive(src, prev = {}) {
    const active = activeComps();
    let events = [];
    active.forEach(comp => comp.events.forEach(ev => events.push({ comp, ev })));
    if (src.timeFilter === 'upcoming') events = events.filter(i => !isPast(i.ev.date));
    events.sort((a, b) => a.ev.date.localeCompare(b.ev.date));

    return {
        themeLabel: src.theme === 'dark' ? '☀️ Világos mód' : '🌙 Sötét mód',
        todayInRange: isTodayWithinTimeline(),
        comps: stable(prev.comps, competitions.map(compSummary)),
        ganttRows: ganttRows(),
        events: stable(prev.events, events.map(i => eventItem(i.comp, i.ev, src.selectedId))),
        listSubtitle: `${events.length} megjelenített esemény időrendi sorrendben`,
        detail: eventDetail(src.selectedId),
        infoCards: stable(prev.infoCards, active.map(infoCard)),
        noEvents: events.length === 0,
        noInfo: active.length === 0
    };
}

/** Az "Újdonságok" ablak adatai: a látogató által még nem látott bejegyzések. */
function whatsNewData() {
    const out = { show: false, version: '', multi: false, entries: [] };
    if (typeof CHANGELOG === 'undefined' || !CHANGELOG.length) return out;
    const cmp = (a, b) => {
        const pa = String(a).split('.').map(Number), pb = String(b).split('.').map(Number);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            const d = (pa[i] || 0) - (pb[i] || 0);
            if (d !== 0) return d;
        }
        return 0;
    };
    const entries = CHANGELOG.slice().sort((x, y) => cmp(y.version, x.version));
    let accepted = null;
    try {
        const saved = JSON.parse(localStorage.getItem('whatsNewAccepted'));
        if (saved && typeof saved.version === 'string') accepted = saved.version;
    } catch (e) { /* localStorage nem elérhető vagy sérült: minden betöltéskor megjelenik */ }
    const unseen = accepted === null ? entries : entries.filter(c => cmp(c.version, accepted) > 0);
    return { show: unseen.length > 0, version: entries[0].version, multi: unseen.length > 1, entries: unseen };
}
