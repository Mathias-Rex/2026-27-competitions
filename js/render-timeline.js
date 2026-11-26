/* Fejléc, versenykapcsolók és a közös idővonal megjelenítése. */

// =========================================================================
// 4. RENDERELŐ FÜGGVÉNYEK
// =========================================================================

// 4.0 Fejléc és jelmagyarázat mai dátumának beállítása
function renderTodayBadges() {
    const headerText = document.getElementById('headerTodayText');
    const legendText = document.getElementById('legendTodayText');
    const legendItem = document.getElementById('legendTodayItem');

    headerText.textContent = `Mai nap: ${TODAY_INFO.fullHu}`;
    if (isTodayWithinTimeline()) {
        legendItem.classList.remove('hidden');
        legendText.textContent = `Ma (${TODAY_INFO.shortHu})`;
    } else {
        legendItem.classList.add('hidden');
    }
}

// 4.1 Verseny kapcsolókártyák (Toggle switches)
function renderFilterCards() {
    const container = document.getElementById('filterCardsContainer');
    container.innerHTML = '';

    competitions.forEach(comp => {
        const upcomingCount = comp.events.filter(e => !isPast(e.date)).length;
        const card = document.createElement('div');
        card.className = `rounded-2xl border-2 p-4 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
            comp.active
                ? 'bg-white shadow-sm'
                : 'bg-slate-100/70 border-slate-200 opacity-65 hover:opacity-90'
        }`;
        if (comp.active) {
            card.style.borderColor = cc(comp, 'color');
        }

        card.innerHTML = `
            <div class="flex items-start justify-between gap-3">
                <div class="flex items-start gap-3">
                    <span class="w-4 h-4 rounded-full mt-1 shrink-0 shadow-inner" style="background-color: ${cc(comp, 'color')};"></span>
                    <div>
                        <h2 class="font-bold text-sm sm:text-base text-slate-900 leading-snug">${comp.name}</h2>
                        <p class="text-xs text-slate-500 mt-0.5">${comp.targetGroup}</p>
                    </div>
                </div>

                <!-- Toggle Switch -->
                <button type="button" role="switch" aria-checked="${comp.active}" aria-label="${comp.name} ki/bekapcsolása"
                    class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                    style="background-color: ${comp.active ? cc(comp, 'color') : nc('#cbd5e1')};">
                    <span class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        comp.active ? 'translate-x-5' : 'translate-x-0'
                    }"></span>
                </button>
            </div>

            <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span class="text-slate-500 truncate max-w-[62%]" title="${comp.organizer}">📍 ${comp.organizer}</span>
                <span class="font-semibold px-2 py-0.5 rounded-md text-center" style="background-color: ${comp.active ? cc(comp, 'bgLight') : nc('#e2e8f0')}; color: ${comp.active ? cc(comp, 'textDark') : nc('#475569')};">
                    ${upcomingCount} hátralévő esemény
                </span>
            </div>
        `;

        card.addEventListener('click', () => {
            comp.active = !comp.active;
            updateAll();
        });

        container.appendChild(card);
    });
}

// 4.2 Közös Idővonal-diagram (Az első verzió tiszta vízszintes Gantt / Timeline elrendezése)
function renderTimeline() {
    const wrapper = document.getElementById('timelineWrapper');
    const activeComps = competitions.filter(c => c.active);

    if (activeComps.length === 0) {
        wrapper.innerHTML = `
            <div class="py-16 text-center text-slate-400">
                <p class="text-base font-semibold text-slate-600">Nincs kiválasztott verseny</p>
                <p class="text-xs mt-1">Kapcsold be legalább az egyik versenyt a fenti kártyákon az idővonal megjelenítéséhez!</p>
            </div>
        `;
        return;
    }

    // Havi osztások meghatározása (2026. nov. – 2027. ápr.)
    const months = [
        { label: '2026. nov.', date: '2026-11-01' },
        { label: '2026. dec.', date: '2026-12-01' },
        { label: '2027. jan.', date: '2027-01-01' },
        { label: '2027. febr.', date: '2027-02-01' },
        { label: '2027. márc.', date: '2027-03-01' },
        { label: '2027. ápr.', date: '2027-04-01' }
    ];

    // A "Mai nap" buborék a hónapfeliratok FÖLÖTT kap helyet (külön sáv), ha a mai nap látszik
    const todayVisible = isTodayWithinTimeline();
    const bubbleZonePx = todayVisible ? 28 : 0;

    // Rács fejléc (hónapok) – a piros vonal fölött jelenik meg (z-10)
    let gridHeaderHtml = `
        ${todayVisible ? `<div style="height: ${bubbleZonePx}px;"></div>` : ''}
        <div class="grid grid-cols-[104px_1fr] lg:grid-cols-[190px_1fr] items-end border-b border-slate-200">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 pr-3 lg:mt-[calc(var(--ext)*-1)] lg:pt-[var(--ext)] lg:-mb-px lg:border-b lg:border-slate-200 lg:sticky lg:left-0 lg:z-[60] lg:bg-slate-50 lg:shadow-[8px_0_8px_-8px_rgba(15,23,42,0.18)] lg:-ml-5 lg:pl-5 lg:self-stretch lg:flex lg:items-end" style="--ext: ${bubbleZonePx + 20}px;">Verseny</div>
            <div class="relative z-10 h-6 mb-2">
    `;

    months.forEach(m => {
        const pct = getPercentPosition(m.date);
        gridHeaderHtml += `
            <div class="absolute top-0 -translate-x-1/2 text-xs font-semibold text-slate-600 whitespace-nowrap bg-white px-1" style="left: ${pct}%;">
                ${m.label}
            </div>
        `;
    });

    gridHeaderHtml += `</div></div>`;

    // Függőleges segédvonalak + dinamikus MA vonal réteg
    let gridLinesHtml = `<div class="grid grid-cols-[104px_1fr] lg:grid-cols-[190px_1fr] absolute inset-0 pointer-events-none px-5 pb-0" style="padding-top: ${44 + bubbleZonePx}px;">
        <div></div>
        <div class="relative h-full">
    `;

    months.forEach(m => {
        const pct = getPercentPosition(m.date);
        gridLinesHtml += `
            <div class="absolute top-0 bottom-0 border-l border-slate-200/80" style="left: ${pct}%;"></div>
        `;
    });

    gridLinesHtml += `</div></div>`;

    // Dinamikus piros "Mai nap" réteg: a vonal a feliratok és kártyák ALATT fut (z-index: 1),
    // a buborék a hónapfeliratok fölött, külön sávban áll.
    if (todayVisible) {
        const todayPct = getPercentPosition(TODAY_STR);
        gridLinesHtml += `
            <div class="grid grid-cols-[104px_1fr] lg:grid-cols-[190px_1fr] absolute inset-0 pointer-events-none px-5 pt-5 pb-0">
                <div></div>
                <div class="relative h-full">
                    <div class="absolute top-2 bottom-0 border-l-2 border-dashed border-red-500" style="left: ${todayPct}%; z-index: 1;"></div>
                    <span class="absolute top-0 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap z-10" style="left: ${todayPct}%;">
                        Ma (${TODAY_INFO.shortHu})
                    </span>
                </div>
            </div>
        `;
    }


    // Versenysávok (Sávonként egy sor)
    let rowsHtml = `<div class="divide-y divide-slate-100 relative z-10">`;

    activeComps.forEach((comp, compIdx) => {
        const firstDate = comp.events[0].date;
        const lastEvent = comp.events[comp.events.length - 1];
        const lastDate = lastEvent.endDate || lastEvent.date;

        const startPct = getPercentPosition(firstDate);
        const endPct = getPercentPosition(lastDate);
        const barWidth = Math.max(2, endPct - startPct);

        rowsHtml += `
            <div class="grid grid-cols-[104px_1fr] lg:grid-cols-[190px_1fr] items-center min-h-[128px]">
                <!-- Bal oldali verseny név -->
                <div class="py-4 pr-4 ${compIdx === activeComps.length - 1 ? 'lg:-mb-5 lg:pb-9' : ''} ${compIdx > 0 ? 'lg:-mt-px lg:border-t lg:border-slate-100' : ''} lg:sticky lg:left-0 lg:z-[60] lg:bg-slate-50 lg:shadow-[8px_0_8px_-8px_rgba(15,23,42,0.18)] lg:-ml-5 lg:pl-5 lg:self-stretch lg:flex lg:flex-col lg:justify-center">
                    <div class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full shrink-0" style="background-color: ${cc(comp, 'color')};"></span>
                        <span class="font-bold text-sm text-slate-800 leading-tight">${comp.shortName}</span>
                    </div>
                    <span class="text-[11px] text-slate-400 block mt-1 pl-5">
                        ${comp.events[0].displayDate} – ${lastEvent.displayDate}
                    </span>
                </div>

                <!-- Jobb oldali idővonal sáv -->
                <div class="relative h-24 my-4 flex items-center">
                    <!-- Háttér sáv (teljes időtartam) -->
                    <div class="absolute h-3.5 rounded-full transition-all"
                        style="left: ${startPct}%; width: ${barWidth}%; background-color: ${cc(comp, 'bgBar')}; border: 1px solid ${cc(comp, 'borderColor')};">
                    </div>
        `;

        // Mérföldkövek elhelyezése
        comp.events.forEach(ev => {
            const pct = getPercentPosition(ev.date);
            const past = isPast(ev.date);
            const isSelected = ev.id === selectedEventId;
            const isAbove = ev.laneOffset === -1;

            // Összekötő vonal a pont és a címke között
            const connectorClass = isAbove
                ? 'bottom-1/2 mb-2 h-4'
                : 'top-1/2 mt-2 h-4';

            // Címke pozíció
            const labelPosClass = isAbove
                ? 'bottom-1/2 mb-6'
                : 'top-1/2 mt-6';

            // Döntő kiemelése
            const badgeStyle = ev.isFinal
                ? `background-color: ${nc('#FEF3C7')}; border-color: ${nc('#D97706')}; color: ${nc('#78350F')};`
                : `background-color: ${past ? nc('#F8FAFC') : nc('#FFFFFF')}; border-color: ${past ? nc('#CBD5E1') : cc(comp, 'color')}; color: ${past ? nc('#64748B') : nc('#0F172A')};`;

            const activeRing = isSelected ? 'ring-2 ring-offset-1 ring-slate-900 shadow-md scale-105 z-30' : 'shadow-sm hover:z-30';

            const compactDate = ev.displayDate
                .replace('2026. ', '')
                .replace('2027. ', '');

            rowsHtml += `
                <!-- Függőleges összekötő -->
                <div class="absolute w-px ${connectorClass} -translate-x-1/2 pointer-events-none"
                    style="left: ${pct}%; background-color: ${past ? nc('#CBD5E1') : cc(comp, 'color')};">
                </div>

                <!-- Címke kártya -->
                <button type="button" data-event-id="${ev.id}"
                    class="timeline-event-trigger absolute ${labelPosClass} -translate-x-1/2 px-2 py-1 rounded-lg border text-[11px] leading-tight text-center whitespace-nowrap cursor-pointer transition ${activeRing}"
                    style="left: ${pct}%; ${badgeStyle}">
                    <span class="font-bold block">${compactDate}</span>
                    ${ev.discrepancy ? `<span class="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-400 text-amber-950 text-[10px] font-extrabold flex items-center justify-center shadow" title="${prevInfoTitle(ev)}">!</span>` : ''}
                    ${ev.displayTime ? `<span class="block font-semibold opacity-80">${ev.displayTime}</span>` : ''}
                    <span class="font-medium ${ev.isFinal ? 'font-extrabold' : ''}">${ev.shortLabel}</span>
                </button>

                <!-- Mérföldkő pont vagy gyémánt (Döntő) -->
                ${ev.isFinal ? `
                    <button type="button" data-event-id="${ev.id}" title="${ev.title}"
                        class="timeline-event-trigger diamond-dot ${isSelected ? 'active' : ''} absolute top-1/2 w-4 h-4 bg-amber-400 border-2 border-amber-800 shadow cursor-pointer z-20"
                        style="left: ${pct}%;">
                    </button>
                ` : `
                    <button type="button" data-event-id="${ev.id}" title="${ev.title}"
                        class="timeline-event-trigger milestone-dot ${isSelected ? 'active' : ''} absolute top-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow cursor-pointer z-20"
                        style="left: ${pct}%; background-color: ${past ? nc('#94A3B8') : cc(comp, 'color')};">
                    </button>
                `}
            `;
        });

        rowsHtml += `</div></div>`;
    });

    rowsHtml += `</div>`;

    wrapper.innerHTML = gridLinesHtml + gridHeaderHtml + rowsHtml;

    // Eseménykezelők csatolása az idővonal elemeihez (kattintás és rámutatás)
    wrapper.querySelectorAll('.timeline-event-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedEventId = btn.dataset.eventId;
            updateAll();
            openEventModal(btn.dataset.eventId);
        });
        btn.addEventListener('mouseenter', () => {
            selectedEventId = btn.dataset.eventId;
            renderEventDetail();
        });
    });
}
