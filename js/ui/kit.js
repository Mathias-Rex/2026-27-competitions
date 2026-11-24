/*
 * Közös eszközök az oldal felületéhez. A teljes felület a createDOMBlocks (vendor/createDOMBlocks.js)
 * komponenseiből épül: createCard, createBadge, createButton, createLink, createCheckbox,
 * createTitle, createParagraph, createUnorderedList, createGantt, createModal.
 * A komponensek közti váz (header, main, section) a könyvtár createLocalizedElem függvényével készül.
 */
const B = window.CreateDOMBlocks;
const E = B.createLocalizedElem;

let uidSeq = 0;
// A komponensek egyedi azonosítót kérnek
const uid = prefix => `${prefix}-${++uidSeq}`;

// Egy tároló kiürítése és visszaadása újrarajzoláshoz
function mount(id) {
    const node = document.getElementById(id);
    node.textContent = '';
    return node;
}

// Kis segéd: DOMOptions elem
const h = (tag, cls, text, children, extra) => ({ tag, attrs: { class: cls }, text, children, ...extra });

// Beágyazott SVG ikonok (statikus, megbízható)
const ICONS = {
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    menu: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
    close: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"></line><line x1="18" y1="6" x2="6" y2="18"></line></svg>',
    external: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
    eye: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    download: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v12"/><path d="m6 11 6 6 6-6"/><path d="M5 20h14"/></svg>'
};

// Ikon beszúrása egy meglévő elembe (a komponens szövege megmarad)
function addIcon(el, name, cls) {
    E({ tag: 'span', attrs: { class: cls || 'cmp-ext', 'aria-hidden': 'true' }, content: ICONS[name], parent: el });
    return el;
}

// Külső hivatkozás gomb (a verseny színével kitöltve vagy halványan): createLink + ikon
function ctaLink(parent, text, href, variant, extraClass) {
    const link = B.createLink({
        parent, id: uid('lnk'), text, href, target: '_blank',
        class: `cmp-cta is-${variant}${extraClass ? ' ' + extraClass : ''}`
    });
    link.rel = 'noopener noreferrer';
    return addIcon(link, 'external', 'cmp-ext');
}
