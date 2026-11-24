/* Esemény részletei (oldalsó panel és felugró ablak), időrendi lista. Komponensek: createBadge, createTitle,
 * createParagraph, createLink, createButton. */

// Az esemény részletező tartalma (az oldalsó panel és a felugró ablak közös tartalma)
function buildEventDetail(parent, comp, ev, where) {
    const past = isPast(ev.date);
    const box = E({ tag: 'div', attrs: { class: 'cmp-detail', style: compVars(comp) }, parent });

    const head = E({ tag: 'div', parent: box });
    B.createBadge({ parent: head, id: uid('b'), text: comp.shortName, class: 'cmp-tag is-lg' });
    B.createTitle({ parent: head, id: uid('t'), text: `${ev.isFinal ? '🏆 ' : ''}${ev.title}`, class: 'cmp-detail-title' }, 4);

    E({
        tag: 'div', attrs: { class: 'cmp-infobox' }, parent: box, children: [
            h('div', 'cmp-infobox-row', undefined, [
                h('span', '', 'Időpont:'),
                h('span', '', undefined, [
                    { tag: 'span', text: ev.displayDate },
                    ...(ev.displayTime ? [{ tag: 'br' }, { tag: 'span', text: ev.displayTime }] : [])
                ])
            ]),
            h('div', 'cmp-infobox-row', undefined, [
                h('span', '', 'Helyszín / Forma:'),
                h('span', '', ev.location)
            ])
        ]
    });

    if (ev.endEstimated) {
        B.createParagraph({ parent: box, id: uid('p'), class: 'cmp-note', text: '⏱ A befejezés időpontja nem ismert, a naptárban 1,5 órás becslés szerepel.' });
    }
    if (ev.discrepancy) {
        const warn = B.createBadge({ parent: box, id: uid('b'), text: '⚠ Eltérés a korábbi információtól', class: 'cmp-tag is-warn' });
        warn.title = prevInfoText(ev);
        warn.tabIndex = 0;
        warn.style.width = 'fit-content';
    }

    const desc = E({ tag: 'div', parent: box });
    B.createTitle({ parent: desc, id: uid('t'), text: 'Teendő és tudnivalók', class: 'cmp-label' }, 5);
    B.createParagraph({ parent: desc, id: uid('p'), class: 'cmp-text', text: ev.description });

    if (ev.linkUrl) ctaLink(box, `🔗 ${ev.linkLabel || 'Hivatkozás megnyitása'}`, ev.linkUrl, 'solid');
    if (!past) calendarButton(box, ev.id, where, 'cmp-cta');
    return box;
}

// Részletező panel (bal oldali doboz)
function renderEventDetail() {
    const panel = mount('eventDetailPanel');
    const badge = document.getElementById('detailStatusBadge');
    const found = findEventById(selectedEventId);

    if (!found) {
        B.createParagraph({ parent: panel, id: uid('p'), class: 'cmp-hint', text: 'Válassz ki egy eseményt az idővonalon vagy a listából!' });
        badge.className = 'badge cmp-pill';
        badge.textContent = 'Részletek';
        return;
    }
    const { comp, ev } = found;
    if (isPast(ev.date)) {
        badge.className = 'badge cmp-pill';
        badge.textContent = 'Már elmúlt';
    } else {
        badge.className = 'badge cmp-pill is-ok';
        badge.textContent = formatRelativeDays(ev.date);
    }
    buildEventDetail(panel, comp, ev, 'detail');
}

// Időrendi teendőlista
function renderChronologicalList() {
    const list = mount('chronologicalList');
    let items = [];
    competitions.filter(c => c.active).forEach(comp => comp.events.forEach(ev => items.push({ comp, ev })));
    if (timeFilter === 'upcoming') items = items.filter(i => !isPast(i.ev.date));
    items.sort((a, b) => a.ev.date.localeCompare(b.ev.date));

    document.getElementById('listSubtitle').textContent = `${items.length} megjelenített esemény időrendi sorrendben`;

    if (items.length === 0) {
        E({
            tag: 'div', attrs: { class: 'cmp-empty' }, parent: list, children: [
                h('strong', '', 'Nincs megjeleníthető esemény a jelenlegi szűréssel.'),
                h('span', '', 'Kapcsold be a versenyeket fent, vagy válts az „Összes” nézetre.')
            ]
        });
        return;
    }

    items.forEach(({ comp, ev }) => {
        const past = isPast(ev.date);
        const item = E({
            tag: 'div',
            attrs: {
                class: `cmp-item${past ? ' is-past' : ''}${ev.id === selectedEventId ? ' is-selected' : ''}`,
                style: compVars(comp)
            },
            parent: list
        });
        item.addEventListener('click', () => { selectedEventId = ev.id; updateAll(); });

        const main = E({ tag: 'div', attrs: { class: 'cmp-item-main' }, parent: item });
        E({
            tag: 'div', attrs: { class: `cmp-datebox${ev.isFinal ? ' is-final' : ''}` }, parent: main, children: [
                h('span', 'd', shortDate(ev.displayDate)),
                ...(ev.displayTime ? [h('span', 't', ev.displayTime)] : []),
                h('span', 'y', ev.date.slice(0, 4))
            ]
        });

        const body = E({ tag: 'div', parent: main });
        const tags = E({ tag: 'div', attrs: { class: 'cmp-tags' }, parent: body });
        B.createBadge({ parent: tags, id: uid('b'), text: comp.shortName, class: 'cmp-tag' });
        if (ev.isFinal) B.createBadge({ parent: tags, id: uid('b'), text: '🏆 DÖNTŐ', class: 'cmp-tag is-final' });
        if (ev.discrepancy) {
            const warn = B.createBadge({ parent: tags, id: uid('b'), text: '⚠ Eltérés a korábbi információtól', class: 'cmp-tag is-warn' });
            warn.title = prevInfoText(ev);
        }
        B.createTitle({ parent: body, id: uid('t'), text: ev.title, class: 'cmp-item-title' }, 4);
        B.createParagraph({ parent: body, id: uid('p'), text: ev.description, class: 'cmp-item-desc' });

        const side = E({ tag: 'div', attrs: { class: 'cmp-item-side' }, parent: item });
        B.createBadge({
            parent: side, id: uid('b'), text: past ? 'Lejárt' : formatRelativeDays(ev.date),
            class: `cmp-pill${past ? '' : ' is-ok'}`
        });
        E({ tag: 'span', attrs: { class: 'cmp-loc' }, text: `📍 ${ev.location}`, parent: side });
        if (ev.linkUrl) {
            const link = B.createLink({
                parent: side, id: uid('lnk'), text: `🔗 ${ev.linkLabel || 'Megnyitás'}`, href: ev.linkUrl,
                target: '_blank', class: 'cmp-mini', click: e => e.stopPropagation()
            });
            link.rel = 'noopener noreferrer';
        }
        if (!past) calendarButton(side, ev.id, 'list', 'cmp-mini');
    });
}
