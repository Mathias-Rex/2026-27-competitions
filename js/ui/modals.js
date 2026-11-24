/* Felugró ablakok a createModal komponenssel: az esemény részletei és az Újdonságok ablak. */

// Esemény részletei (az idővonalon rákattintva)
let eventModalFocus = null;
function openEventModal(id) {
    const found = findEventById(id);
    if (!found) return;
    eventModalFocus = document.activeElement;

    // minden megnyitáskor új ablak készül az aktuális eseménnyel
    document.getElementById('eventModal-portal')?.remove();
    document.getElementById('eventModal-close-btn')?.remove();
    const portal = B.createModal(
        { modalTitle: 'Kiválasztott esemény', body: { tag: 'div', attrs: { id: 'eventModalBody' } } },
        { closeAction: () => { if (eventModalFocus && eventModalFocus.focus) eventModalFocus.focus(); } },
        { id: 'eventModal', width: 448, footer: false, closeOnBackdrop: true, closeOnEscape: true }
    );
    buildEventDetail(portal.querySelector('#eventModalBody'), found.comp, found.ev, 'modal');
    B.openModal('eventModal');
    document.getElementById('eventModal-close-btn')?.focus();
}

// Újdonságok ablak: a changelog.js bejegyzései, a "Rendben, értem" gomb az elfogadott verziót megjegyzi
function initWhatsNew() {
    const KEY = 'whatsNewAccepted';
    if (typeof CHANGELOG === 'undefined' || !CHANGELOG.length) return;

    // "1.10.0" > "1.2.0": számonként hasonlítunk, nem szövegesen
    const compareVersions = (a, b) => {
        const pa = String(a).split('.').map(Number);
        const pb = String(b).split('.').map(Number);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            const d = (pa[i] || 0) - (pb[i] || 0);
            if (d !== 0) return d;
        }
        return 0;
    };
    const entries = CHANGELOG.slice().sort((x, y) => compareVersions(y.version, x.version));
    const latest = entries[0].version;

    let accepted = null;
    try {
        const saved = JSON.parse(localStorage.getItem(KEY));
        if (saved && typeof saved.version === 'string') accepted = saved.version;
    } catch (e) { /* localStorage nem elérhető vagy sérült: minden betöltéskor megjelenik */ }

    const unseen = accepted === null ? entries : entries.filter(c => compareVersions(c.version, accepted) > 0);
    if (!unseen.length) return;

    let lastFocus = null;
    const dismiss = () => { if (lastFocus && lastFocus.focus) lastFocus.focus(); };
    const portal = B.createModal(
        { modalTitle: 'Újdonságok az oldalon', body: { tag: 'div', attrs: { id: 'whatsNewBody' } } },
        { closeAction: dismiss },
        { id: 'whatsNew', width: 512, footer: false, closeOnBackdrop: true, closeOnEscape: true }
    );

    const body = portal.querySelector('#whatsNewBody');
    B.createParagraph({ parent: body, id: uid('p'), class: 'cmp-whatsnew-sub', text: `Ezek változtak legutóbbi látogatásod óta. Verzió ${latest}` });
    unseen.forEach(entry => {
        const group = E({ tag: 'section', attrs: { class: 'cmp-whatsnew-group' }, parent: body });
        if (unseen.length > 1) E({ tag: 'h3', attrs: { class: 'cmp-whatsnew-ver' }, text: `${entry.version} · ${entry.date}`, parent: group });
        B.createUnorderedList(entry.items, { parent: group, id: uid('ul'), class: 'cmp-whatsnew-list' });
    });
    const actions = E({ tag: 'div', attrs: { class: 'cmp-whatsnew-actions' }, parent: body });
    B.createButton({
        parent: actions, id: 'whatsNewOk', text: 'Rendben, értem', class: 'cmp-primary',
        click: () => {
            try {
                localStorage.setItem(KEY, JSON.stringify({ version: latest, acceptedAt: new Date().toISOString() }));
            } catch (e) { /* nincs mentés */ }
            B.closeModal('whatsNew');
            dismiss();
        }
    });

    lastFocus = document.activeElement;
    B.openModal('whatsNew');
    document.getElementById('whatsNewOk').focus();
}
