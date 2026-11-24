/* Versenykiírások, feltételek és linkek kártyái, valamint a letölthető dokumentumok (createCard alapon). */

// Bekapcsolt versenyek részletes kártyái
function renderDetailedInfoCards() {
    const container = mount('detailedInfoCardsContainer');
    const active = competitions.filter(c => c.active);

    if (active.length === 0) {
        E({
            tag: 'div', attrs: { class: 'cmp-empty' }, parent: container, children: [
                h('strong', '', 'Nincs megjeleníthető versenykiírás.'),
                h('span', '', 'Kapcsold be a versenyeket az oldal tetején a részletes kiírások megtekintéséhez!')
            ]
        });
        return;
    }

    active.forEach(comp => {
        const d = comp.details;
        const card = B.createCard({
            parent: container,
            id: uid('info'),
            class: 'cmp-info',
            title: comp.name,
            body: [],
            footer: []
        });
        card.setAttribute('style', compVars(comp));

        // fejléc: színes kis felirat a cím fölött, szervező és cím alatta
        const header = card.querySelector('.card-header');
        const kicker = E({ tag: 'span', attrs: { class: 'cmp-info-kicker' }, text: comp.shortName, parent: header });
        header.insertBefore(kicker, header.firstChild);
        B.createParagraph({ parent: header, id: uid('p'), class: 'cmp-info-meta', text: `🏛️ ${comp.organizer}` });
        B.createParagraph({ parent: header, id: uid('p'), class: 'cmp-info-meta', text: `📍 ${comp.address}` });

        const body = card.querySelector('.card-body');
        const block = (label, fill) => {
            const wrap = E({ tag: 'div', parent: body });
            B.createTitle({ parent: wrap, id: uid('t'), text: label, class: 'cmp-label' }, 4);
            fill(wrap);
            return wrap;
        };
        const text = (parent, value) => B.createParagraph({ parent, id: uid('p'), class: 'cmp-block-text', text: value });

        block('Kiknek szól & feltételek', w => text(w, d.participants));

        if (d.ourTeams) {
            const teams = E({ tag: 'div', attrs: { class: 'cmp-teams' }, parent: body });
            B.createTitle({ parent: teams, id: uid('t'), text: `Csapataink (${d.ourTeams.length} csapat)`, class: 'cmp-label' }, 4);
            d.ourTeams.forEach(t => {
                const row = E({ tag: 'div', attrs: { class: 'cmp-team' }, parent: teams });
                E({ tag: 'strong', text: t.name, parent: row });
                B.createBadge({ parent: row, id: uid('b'), text: t.size, class: 'cmp-tag' });
                B.createBadge({ parent: row, id: uid('b'), text: t.grade, class: 'cmp-tag is-neutral' });
            });
        }

        if (d.categories) {
            block('6 versenykategória', w => B.createUnorderedList(d.categories, { parent: w, id: uid('ul'), class: 'cmp-bullets is-plain' }));
        } else if (d.theme) {
            block('Téma és feladatok', w => text(w, d.theme));
        }

        block('Fordulók és dátumok', w => B.createUnorderedList(d.roundsSummary, { parent: w, id: uid('ul'), class: 'cmp-bullets' }));
        block('Díjazás', w => text(w, d.prizes));

        const footer = card.querySelector('.card-footer');
        d.links.forEach(link => ctaLink(footer, `${link.primary ? '🔗' : '🌐'} ${link.label}`, link.url, link.primary ? 'solid' : 'quiet'));
        B.createParagraph({ parent: footer, id: uid('p'), class: 'cmp-contacts', text: `✉️ ${d.contacts}` });
    });
}

// Letölthető dokumentumok: a js/downloads.js (DOWNLOADS) alapján, versenyenként egy kártya
function renderDownloads() {
    const grid = mount('downloadsContainer');
    DOWNLOADS.forEach(group => {
        const card = B.createCard({ parent: grid, id: uid('dl'), class: 'cmp-dl', title: group.name, body: [] });
        card.setAttribute('style', `--c-color:${group.color}`);
        const body = card.querySelector('.card-body');
        group.docs.forEach(doc => {
            const row = E({ tag: 'div', attrs: { class: 'cmp-doc' }, parent: body });
            const info = E({ tag: 'div', attrs: { class: 'cmp-doc-info' }, parent: row, style: 'min-width:0' });
            E({ tag: 'span', attrs: { class: 'cmp-doc-title' }, text: doc.title, parent: info });
            if (doc.desc) E({ tag: 'span', attrs: { class: 'cmp-doc-desc' }, text: doc.desc, parent: info });
            E({ tag: 'span', attrs: { class: 'cmp-doc-size' }, text: `PDF, ${doc.size} KB`, parent: info });

            const actions = E({ tag: 'div', attrs: { class: 'cmp-doc-actions' }, parent: row });
            const view = B.createLink({
                parent: actions, id: uid('lnk'), text: '', href: doc.href, target: '_blank', class: 'cmp-icon-btn'
            });
            view.rel = 'noopener noreferrer';
            view.title = 'Megnézés';
            view.setAttribute('aria-label', `Megnézés: ${doc.title}`);
            addIcon(view, 'eye', 'cmp-icon');
            const dl = B.createLink({ parent: actions, id: uid('lnk'), text: '', href: doc.href, class: 'cmp-icon-btn' });
            dl.setAttribute('download', '');
            dl.title = 'Letöltés';
            dl.setAttribute('aria-label', `Letöltés: ${doc.title}`);
            addIcon(dl, 'download', 'cmp-icon');
        });
    });
}
