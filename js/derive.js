/*
 * A nézet (index.html YAML) számára származtatott adatok.
 *
 * A forrás-állapot kicsi: active (versenykapcsolók), timeFilter, selectedId, detailsOpen, menuOpen, theme.
 * Ebből számoljuk a kész szövegeket és listákat, amelyeket a YAML `${...}` kifejezésekkel jelenít meg.
 *
 * Az itt használt mezőnevek (pl. `event.colorStyle`, `competition.cssClass`) a YAML-ben ugyanígy szerepelnek,
 * ezért a nevek szándékosan teljesek és beszédesek.
 */

// A megjelenített listák elemeinek azonossága megmarad, ha a tartalom nem változott
// (így az each csak a ténylegesen módosult elemeket építi újra). Az előző érték az állapottárból jön.
function stable(previousList, nextList) {
    const previousById = new Map((Array.isArray(previousList) ? previousList : []).map(item => [item.id, item]));
    return nextList.map(item => {
        const previous = previousById.get(item.id);
        return previous && JSON.stringify(previous) === JSON.stringify(item) ? previous : item;
    });
}

/** Egy letölthető dokumentum sora (workshop dokumentumok, js/data.js WORKSHOP_DOCS). */
function documentRow(doc) {
    return { title: doc.title, description: doc.desc, href: doc.file, sizeText: 'PDF, ' + doc.size };
}

const activeCompetitions = () => competitions.filter(competition => competition.active);

/** Egy versenykapcsoló kártya adatai. */
function competitionSummary(competition) {
    const upcomingCount = competition.events.filter(event => !isPast(event.date)).length;
    return {
        id: competition.id,
        name: competition.name,
        targetGroup: competition.targetGroup,
        organizer: '📍 ' + competition.organizer,
        active: !!competition.active,
        cssClass: 'cmp-filter' + (competition.active ? '' : ' is-off'),
        upcomingText: `${upcomingCount} hátralévő esemény`,
        colorStyle: compVars(competition)
    };
}

/** Az idővonal sorai: versenyenként egy sáv, az eseményekből mérföldkövekkel. */
function timelineRows() {
    return activeCompetitions().map(competition => {
        const first = competition.events[0];
        const last = competition.events[competition.events.length - 1];
        return {
            id: competition.id,
            label: competition.shortName,
            sublabel: `${first.displayDate} – ${last.displayDate}`,
            periodLabel: '',
            color: cc(competition, 'color'),
            start: first.date,
            end: last.endDate || last.date,
            milestones: competition.events.map(event => ({
                id: event.id,
                date: event.date,
                label: event.shortLabel,
                caption: shortDate(event.displayDate),
                meta: event.displayTime || undefined,
                placement: event.laneOffset === -1 ? 'above' : 'below',
                shape: event.isFinal ? 'diamond' : 'dot',
                flag: event.discrepancy ? { text: '!', title: prevInfoText(event) } : undefined
            }))
        };
    });
}

/** Egy elem az időrendi listában. */
function eventListItem(competition, event, selectedId) {
    const isOver = isPast(event.date);
    return {
        id: event.id,
        colorStyle: compVars(competition),
        cssClass: 'cmp-item' + (isOver ? ' is-past' : '') + (event.id === selectedId ? ' is-selected' : ''),
        dateBoxClass: 'cmp-datebox' + (event.isFinal ? ' is-final' : ''),
        date: shortDate(event.displayDate),
        hasTime: !!event.displayTime,
        time: event.displayTime || '',
        year: event.date.slice(0, 4),
        isFinal: !!event.isFinal,
        competitionName: competition.shortName,
        hasDiscrepancy: !!event.discrepancy,
        discrepancyNote: event.discrepancy ? prevInfoText(event) : '',
        title: event.title,
        description: event.description,
        statusText: isOver ? 'Lejárt' : formatRelativeDays(event.date),
        statusClass: 'badge cmp-pill' + (isOver ? '' : ' is-ok'),
        location: '📍 ' + event.location,
        hasLink: !!event.linkUrl,
        linkUrl: event.linkUrl || '',
        linkLabel: '🔗 ' + (event.linkLabel || 'Megnyitás'),
        canAddToCalendar: !isOver
    };
}

/** A kiválasztott esemény részletei (az oldalsó panelben és a felugró ablakban). */
function selectedEventDetails(selectedId) {
    const found = findEventById(selectedId);
    if (!found) return null;
    const { comp: competition, ev: event } = found;
    const isOver = isPast(event.date);
    return {
        id: event.id,
        colorStyle: compVars(competition),
        competitionName: competition.shortName,
        title: (event.isFinal ? '🏆 ' : '') + event.title,
        date: event.displayDate,
        hasTime: !!event.displayTime,
        time: event.displayTime || '',
        location: event.location,
        isEndEstimated: !!event.endEstimated,
        hasDiscrepancy: !!event.discrepancy,
        discrepancyNote: event.discrepancy ? prevInfoText(event) : '',
        description: event.description,
        hasDocuments: !!(event.documents && event.documents.length),
        documents: (event.documents || []).map(documentRow),
        hasLink: !!event.linkUrl,
        linkUrl: event.linkUrl || '',
        linkLabel: '🔗 ' + (event.linkLabel || 'Hivatkozás megnyitása'),
        canAddToCalendar: !isOver,
        statusText: isOver ? 'Már elmúlt' : formatRelativeDays(event.date),
        statusClass: 'badge cmp-pill' + (isOver ? '' : ' is-ok')
    };
}

/** Egy versenykiírás-kártya (kiknek szól, csapatok, fordulók, díjazás, linkek). */
function competitionInfo(competition) {
    const details = competition.details;
    return {
        id: competition.id,
        colorStyle: compVars(competition),
        competitionName: competition.shortName,
        name: competition.name,
        organizer: '🏛️ ' + competition.organizer,
        address: '📍 ' + competition.address,
        participants: details.participants,
        hasTeams: !!details.ourTeams,
        teamsTitle: details.ourTeams ? `Csapataink (${details.ourTeams.length} csapat)` : '',
        teams: details.ourTeams || [],
        hasCategories: !!details.categories,
        categories: details.categories || [],
        hasTopic: !details.categories && !!details.theme,
        topic: details.theme || '',
        rounds: details.roundsSummary,
        prizes: details.prizes,
        links: details.links.map(link => ({
            label: link.label,
            icon: link.primary ? '🔗' : '🌐',
            cssClass: 'cmp-cta ' + (link.primary ? 'is-solid' : 'is-quiet'),
            url: link.url
        })),
        contacts: '✉️ ' + details.contacts
    };
}

/** A „Workshop projektek” kártyák adatai (js/data.js WORKSHOP_PROJECTS), a Radnóti versenyszínével. */
function workshopProjectCards() {
    const competition = competitions.find(c => c.id === 'radnoti');
    return WORKSHOP_PROJECTS.map(project => ({
        id: project.id,
        colorStyle: compVars(competition),
        title: project.title,
        team: project.team,
        teamInfo: project.teamInfo,
        summary: project.summary,
        eventId: project.eventId,
        dateText: project.date,
        documents: project.docs.map(documentRow)
    }));
}

/** A forrás-állapotból számolt, megjelenítésre kész adatok (a YAML ezeket olvassa). */
function derive(source, previous = {}) {
    const visibleEvents = [];
    activeCompetitions().forEach(competition => competition.events.forEach(event => visibleEvents.push({ competition, event })));
    const filtered = source.timeFilter === 'upcoming' ? visibleEvents.filter(item => !isPast(item.event.date)) : visibleEvents;
    filtered.sort((a, b) => a.event.date.localeCompare(b.event.date));

    return {
        themeLabel: source.theme === 'dark' ? '☀️ Világos mód' : '🌙 Sötét mód',
        todayInRange: isTodayWithinTimeline(),
        competitions: stable(previous.competitions, competitions.map(competitionSummary)),
        timelineRows: timelineRows(),
        events: stable(previous.events, filtered.map(item => eventListItem(item.competition, item.event, source.selectedId))),
        listSubtitle: `${filtered.length} megjelenített esemény időrendi sorrendben`,
        selectedEvent: selectedEventDetails(source.selectedId),
        competitionInfos: stable(previous.competitionInfos, activeCompetitions().map(competitionInfo)),
        noEvents: filtered.length === 0,
        noCompetitionInfo: activeCompetitions().length === 0
    };
}

/** Az "Újdonságok" ablak adatai: a látogató által még nem látott bejegyzések. */
function whatsNewData() {
    const empty = { show: false, version: '', hasMultipleEntries: false, entries: [] };
    if (typeof CHANGELOG === 'undefined' || !CHANGELOG.length) return empty;
    const compareVersions = (a, b) => {
        const left = String(a).split('.').map(Number), right = String(b).split('.').map(Number);
        for (let i = 0; i < Math.max(left.length, right.length); i++) {
            const diff = (left[i] || 0) - (right[i] || 0);
            if (diff !== 0) return diff;
        }
        return 0;
    };
    const entries = CHANGELOG.slice().sort((x, y) => compareVersions(y.version, x.version));
    let acceptedVersion = null;
    try {
        const saved = JSON.parse(localStorage.getItem('whatsNewAccepted'));
        if (saved && typeof saved.version === 'string') acceptedVersion = saved.version;
    } catch (e) { /* localStorage nem elérhető vagy sérült: minden betöltéskor megjelenik */ }
    const unseen = acceptedVersion === null ? entries : entries.filter(entry => compareVersions(entry.version, acceptedVersion) > 0);
    return { show: unseen.length > 0, version: entries[0].version, hasMultipleEntries: unseen.length > 1, entries: unseen };
}
