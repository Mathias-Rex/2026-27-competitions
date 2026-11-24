/* "Naptárba" gomb és a lenyíló menü (Google, Outlook, .ics): createButton + createLink komponensekből. */

function closeCalMenu() {
    const menu = document.getElementById('calMenu');
    if (menu) menu.remove();
}

function openCalMenu(evId, anchor) {
    const found = findEventById(evId);
    if (!found) return;
    const key = evId + '|' + (anchor.dataset.calAnchor || '');
    const existing = document.getElementById('calMenu');
    const reopen = existing && existing.dataset.ev === key;
    closeCalMenu();
    if (reopen) return;

    const menu = B.createContainer({ parent: document.body, id: 'calMenu', class: 'cmp-cal-menu' });
    menu.dataset.ev = key;
    menu.removeAttribute('style');
    const item = (text, href) => {
        const link = B.createLink({ parent: menu, id: uid('cal'), text, href, target: '_blank' });
        link.rel = 'noopener noreferrer';
        return link;
    };
    item('📅 Google Naptár', googleCalUrl(found.ev));
    item('📧 Outlook.com', outlookCalUrl(found.ev, 'https://outlook.live.com'));
    item('🏢 Outlook (Microsoft 365)', outlookCalUrl(found.ev, 'https://outlook.office.com'));
    B.createButton({ parent: menu, id: uid('cal'), text: '🍎 Apple Naptár / Outlook asztali (.ics)', click: () => downloadIcs(evId) });

    menu.addEventListener('click', e => {
        e.stopPropagation();
        if (e.target.closest('a, button')) closeCalMenu();
    });

    // a gomb alá (vagy ha nem fér el, fölé) igazítjuk
    const r = anchor.getBoundingClientRect();
    const w = menu.offsetWidth, hgt = menu.offsetHeight;
    const left = Math.min(Math.max(8, r.right - w), window.innerWidth - w - 8);
    let top = r.bottom + 6;
    if (top + hgt > window.innerHeight - 8) top = Math.max(8, r.top - hgt - 6);
    menu.style.left = left + 'px';
    menu.style.top = top + 'px';
}

document.addEventListener('click', closeCalMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCalMenu(); });
window.addEventListener('scroll', closeCalMenu, true);
window.addEventListener('resize', closeCalMenu);

// "Naptárba" gomb egy eseményhez (a menü a gomb alatt nyílik)
function calendarButton(parent, evId, where, cls) {
    const btn = B.createButton({
        parent,
        id: uid('calbtn'),
        text: '📅 Naptárba',
        class: cls,
        click: e => {
            e.stopPropagation();
            openCalMenu(evId, e.currentTarget);
        }
    });
    btn.dataset.calAnchor = where;
    return btn;
}
