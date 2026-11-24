/*
 * Újdonságok ablak (a szövegek a changelog.js-ben vannak).
 *
 * - "Rendben, értem": a böngésző megjegyzi az elfogadott verziót (localStorage), az ennél
 *   újabb verziójú bejegyzések viszont a következő betöltéskor megjelennek.
 * - X, Esc, háttérre kattintás: csak bezárja, semmit nem jegyez meg, így a következő
 *   oldalbetöltéskor az ablak újra feljön.
 */
(function () {
    const KEY = 'whatsNewAccepted';
    const modal = document.getElementById('whatsNewModal');
    if (!modal || typeof CHANGELOG === 'undefined' || !CHANGELOG.length) return;

    // "1.10.0" > "1.2.0": számonként hasonlítunk, nem szövegesen
    function compareVersions(a, b) {
        const pa = String(a).split('.').map(Number);
        const pb = String(b).split('.').map(Number);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            const d = (pa[i] || 0) - (pb[i] || 0);
            if (d !== 0) return d;
        }
        return 0;
    }

    const entries = CHANGELOG.slice().sort((x, y) => compareVersions(y.version, x.version));
    const latest = entries[0].version;

    // Az utoljára elfogadott verzió
    let accepted = null;
    try {
        const saved = JSON.parse(localStorage.getItem(KEY));
        if (saved && typeof saved.version === 'string') accepted = saved.version;
    } catch (e) { /* localStorage nem elérhető vagy sérült: minden betöltéskor megjelenik */ }

    const unseen = accepted === null ? entries : entries.filter(c => compareVersions(c.version, accepted) > 0);
    if (!unseen.length) return;

    const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    document.getElementById('whatsNewVersion').textContent = 'Verzió ' + latest;
    document.getElementById('whatsNewBody').innerHTML = unseen.map(c => `
        <section>
            ${unseen.length > 1 ? `<h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">${esc(c.version)} · ${esc(c.date)}</h3>` : ''}
            <ul class="space-y-2 list-disc pl-5 marker:text-slate-400">
                ${c.items.map(i => `<li class="leading-snug">${esc(i)}</li>`).join('')}
            </ul>
        </section>`).join('');

    let lastFocus = null;
    function open() {
        lastFocus = document.activeElement;
        modal.classList.remove('hidden');
        document.getElementById('whatsNewOk').focus();
    }
    function dismiss() {
        modal.classList.add('hidden');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function accept() {
        try {
            localStorage.setItem(KEY, JSON.stringify({ version: latest, acceptedAt: new Date().toISOString() }));
        } catch (e) { /* nincs mentés */ }
        dismiss();
    }

    document.getElementById('whatsNewClose').addEventListener('click', dismiss);
    document.getElementById('whatsNewOk').addEventListener('click', accept);
    modal.addEventListener('click', e => { if (e.target === modal) dismiss(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) dismiss();
    });
    open();
})();
