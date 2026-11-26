/* Részletező panel, időrendi lista és versenykártyák. */

// Az eseményhez tartozó letölthető dokumentumok (megnézés új lapon + letöltés)
function eventDocumentsHtml(docs) {
    return `
        <div>
            <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Dokumentumok</h5>
            <ul class="space-y-2.5 bg-slate-50 rounded-xl p-3 border border-slate-200/80">${docRowsHtml(docs)}</ul>
        </div>
    `;
}

// A dokumentumlista közös elemei (eseményablak és projektkártya)
function docRowsHtml(docs) {
    const btn = 'inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition';
    const eye = '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
    const down = '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v12"/><path d="m6 11 6 6 6-6"/><path d="M5 20h14"/></svg>';
    return docs.map(d => `
        <li class="flex items-start justify-between gap-3">
            <div class="min-w-0">
                <span class="block text-sm font-semibold text-slate-800 leading-snug">${d.title}</span>
                <span class="block text-xs text-slate-500 leading-snug mt-0.5">${d.desc}</span>
                <span class="block text-[11px] text-slate-400 mt-0.5">PDF, ${d.size}</span>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
                <a href="${d.file}" target="_blank" rel="noopener noreferrer" class="${btn}" title="Megnézés" aria-label="Megnézés: ${d.title}">${eye}</a>
                <a href="${d.file}" download class="${btn}" title="Letöltés" aria-label="Letöltés: ${d.title}">${down}</a>
            </div>
        </li>
    `).join('');
}

// Workshop projektek doboz (az oldal alján)
function renderWorkshopProjects() {
    const box = document.getElementById('workshopProjects');
    if (!box) return;
    const comp = competitions.find(c => c.id === 'radnoti');
    box.innerHTML = WORKSHOP_PROJECTS.map(p => `
        <article class="rounded-xl border border-slate-200 bg-white p-4 border-l-4 flex flex-col gap-3" style="border-left-color: ${cc(comp, 'color')};">
            <div class="flex items-center gap-3">
                <img src="${p.logo}" alt="${p.team} csapat logója" width="56" height="56" class="w-14 h-14 rounded-full shrink-0">
                <div class="min-w-0">
                <h3 class="text-base font-extrabold text-slate-900 leading-snug">${p.title}</h3>
                <p class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                    <span class="inline-flex items-center gap-1.5 font-bold px-2 py-0.5 rounded-lg" style="background-color: ${cc(comp, 'bgLight')}; color: ${cc(comp, 'textDark')};">${p.team}</span>
                    <span class="text-slate-500">${p.teamInfo}</span>
                </p>
                </div>
            </div>
            <p class="text-sm text-slate-700 leading-relaxed">${p.summary}</p>
            <p class="text-xs text-slate-500">Workshop: <button type="button" class="font-semibold underline decoration-dotted hover:text-slate-900" onclick="openEventModal('${p.eventId}')">${p.date}</button></p>
            <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Letölthető dokumentumok</h4>
                <ul class="space-y-2.5 bg-slate-50 rounded-xl p-3 border border-slate-200/80">${docRowsHtml(p.docs)}</ul>
            </div>
        </article>
    `).join('');
}

// Az esemény részletező HTML-je (az oldalsó panel és a felugró ablak közös tartalma)
function eventDetailHtml(comp, ev, where) {
    const past = isPast(ev.date);
    // az eseményhez tartozó csapatok logói (ev.teams: a verseny ourTeams neve)
    const teamLogos = (ev.teams || []).map(n => (comp.details.ourTeams || []).find(t => t.name === n)).filter(t => t && t.logo)
        .map(t => `<img src="${t.logo}" alt="${t.name} csapat logója" title="${t.name}" width="56" height="56" class="w-14 h-14 rounded-full shrink-0">`).join('');
    return `
        <div class="space-y-4">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <span class="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg mb-2"
                    style="background-color: ${cc(comp, 'bgLight')}; color: ${cc(comp, 'textDark')};">
                    <span class="w-2 h-2 rounded-full" style="background-color: ${cc(comp, 'color')};"></span>
                    ${comp.shortName}
                </span>
                <h4 class="text-lg font-extrabold text-slate-900 leading-snug">
                    ${ev.isFinal ? '🏆 ' : ''}${ev.title}
                </h4>
              </div>
              ${teamLogos ? `<div class="flex gap-1.5 shrink-0">${teamLogos}</div>` : ''}
            </div>

            <div class="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-2 text-xs">
                <div class="flex items-center justify-between gap-2">
                    <span class="text-slate-500 font-medium">Időpont:</span>
                    <span class="font-bold text-slate-900 text-right">${ev.displayDate}${ev.displayTime ? `<br>${ev.displayTime}` : ''}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                    <span class="text-slate-500 font-medium">Helyszín / Forma:</span>
                    <span class="font-semibold text-slate-800 text-right">${ev.location}</span>
                </div>
            </div>
            ${ev.endEstimated ? `<p class="text-xs text-slate-500 leading-snug">⏱ A befejezés időpontja nem ismert, a naptárban 1,5 órás becslés szerepel.</p>` : ''}
            ${ev.discrepancy ? `
                <span tabindex="0" class="inline-flex w-fit text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300 cursor-help" title="${prevInfoTitle(ev)}">
                    ⚠ Eltérés a korábbi információtól
                </span>
            ` : ''}


            <div>
                <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Teendő és tudnivalók</h5>
                <p class="text-sm text-slate-700 leading-relaxed">
                    ${ev.description}
                </p>
            </div>

            ${ev.documents && ev.documents.length ? eventDocumentsHtml(ev.documents) : ''}

            ${ev.linkUrl ? `
                <div class="pt-1">
                    <a href="${ev.linkUrl}" target="_blank" rel="noopener noreferrer"
                       class="inline-flex items-center justify-center gap-1.5 w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition hover:opacity-90"
                       style="background-color: ${cc(comp, 'color')};">
                        <span>🔗 ${ev.linkLabel || 'Hivatkozás megnyitása'}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                </div>
            ` : ''}

            ${past ? '' : `
                <div class="${ev.linkUrl ? '' : 'pt-1'}">
                    ${calButtonHtml(ev.id, where, 'inline-flex items-center justify-center gap-1.5 w-full px-3.5 py-2.5 rounded-xl text-xs font-bold border border-slate-300 text-slate-800 bg-white shadow-sm transition hover:bg-slate-50')}
                </div>
            `}
        </div>
    `;
}

// 4.3 Részletező panel (Bal oldali doboz, beágyazott linkkel)
function renderEventDetail() {
    const panel = document.getElementById('eventDetailPanel');
    const badge = document.getElementById('detailStatusBadge');
    const found = findEventById(selectedEventId);

    if (!found) {
        panel.innerHTML = `<p class="text-sm text-slate-500">Válassz ki egy eseményt az idővonalon vagy a listából!</p>`;
        badge.className = 'text-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600';
        badge.textContent = 'Részletek';
        return;
    }

    const { comp, ev } = found;
    const past = isPast(ev.date);
    const relText = formatRelativeDays(ev.date);

    if (past) {
        badge.className = 'text-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500';
        badge.textContent = 'Már elmúlt';
    } else {
        badge.className = 'text-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200';
        badge.textContent = relText;
    }

    panel.innerHTML = eventDetailHtml(comp, ev, 'detail');
}

// 4.4 Időrendi teendőlista (Jobb oldali szekció, beágyazott linkekkel)
function renderChronologicalList() {
    const listContainer = document.getElementById('chronologicalList');
    const subtitle = document.getElementById('listSubtitle');

    // Aktív versenyek eseményeinek összegyűjtése és rendezése
    let allEvents = [];
    competitions.filter(c => c.active).forEach(comp => {
        comp.events.forEach(ev => {
            allEvents.push({ comp, ev });
        });
    });

    if (timeFilter === 'upcoming') {
        allEvents = allEvents.filter(item => !isPast(item.ev.date));
    }

    allEvents.sort((a, b) => a.ev.date.localeCompare(b.ev.date));

    subtitle.textContent = `${allEvents.length} megjelenített esemény időrendi sorrendben`;

    if (allEvents.length === 0) {
        listContainer.innerHTML = `
            <div class="py-10 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p class="text-sm font-medium text-slate-600">Nincs megjeleníthető esemény a jelenlegi szűréssel.</p>
                <p class="text-xs mt-1">Kapcsold be a versenyeket fent, vagy válts az „Összes” nézetre.</p>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = '';

    allEvents.forEach(({ comp, ev }) => {
        const past = isPast(ev.date);
        const isSelected = ev.id === selectedEventId;
        const relText = formatRelativeDays(ev.date);

        const item = document.createElement('div');
        item.className = `p-4 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isSelected
                ? 'bg-slate-50 border-slate-900 ring-1 ring-slate-900'
                : past
                    ? 'bg-slate-50/50 border-slate-200/70 opacity-70 hover:opacity-100'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
        }`;

        const shortDisplayDate = ev.displayDate
            .replace('2026. ', '')
            .replace('2027. ', '');

        item.innerHTML = `
            <div class="flex items-start gap-3.5">
                <!-- Dátum jelvény -->
                <div class="w-28 shrink-0 rounded-xl px-2.5 py-2 text-center border"
                    style="background-color: ${ev.isFinal ? nc('#FEF3C7') : (past ? nc('#F1F5F9') : cc(comp, 'bgLight'))}; border-color: ${ev.isFinal ? nc('#F59E0B') : (past ? nc('#CBD5E1') : cc(comp, 'borderColor'))};">
                    <span class="block text-xs font-extrabold ${ev.isFinal ? 'text-amber-900' : (past ? 'text-slate-500' : 'text-slate-900')}">
                        ${shortDisplayDate}
                    </span>
                    ${ev.displayTime ? `<span class="block text-[11px] font-bold mt-0.5 ${past ? 'text-slate-400' : 'text-slate-700'}">${ev.displayTime}</span>` : ''}
                    <span class="block text-[10px] font-semibold mt-0.5 ${past ? 'text-slate-400' : 'text-slate-600'}">
                        ${ev.date.slice(0, 4)}
                    </span>
                </div>

                <!-- Tartalom -->
                <div>
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="text-[11px] font-bold px-2 py-0.5 rounded-md"
                            style="background-color: ${cc(comp, 'bgLight')}; color: ${cc(comp, 'textDark')};">
                            ${comp.shortName}
                        </span>
                        ${ev.isFinal ? `
                            <span class="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300">
                                🏆 DÖNTŐ
                            </span>
                        ` : ''}
                        ${ev.discrepancy ? `
                            <span class="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300 cursor-help" title="${prevInfoTitle(ev)}">
                                ⚠ Eltérés a korábbi információtól
                            </span>
                        ` : ''}
                    </div>
                    <h4 class="font-bold text-sm text-slate-900 mt-1 ${past ? 'line-through decoration-slate-400' : ''}">
                        ${ev.title}
                    </h4>
                    <p class="text-xs text-slate-600 mt-0.5 line-clamp-2">${ev.description}</p>
                </div>
            </div>

            <!-- Jobb oldali státusz és link -->
            <div class="sm:text-right shrink-0 flex flex-wrap sm:flex-nowrap sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 gap-1">
                <span class="w-28 shrink-0 text-center text-xs font-semibold px-2 py-1 rounded-lg ${
                    past
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }">
                    ${past ? 'Lejárt' : relText}
                </span>
                <span class="text-[11px] text-slate-400">📍 ${ev.location}</span>
                ${ev.linkUrl ? `
                    <a href="${ev.linkUrl}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();"
                       class="basis-full sm:basis-auto text-left sm:text-right text-[11px] font-bold underline hover:opacity-80 mt-0.5"
                       style="color: ${cc(comp, 'color')};">
                        🔗 ${ev.linkLabel || 'Megnyitás'}
                    </a>
                ` : ''}
                ${past ? '' : calButtonHtml(ev.id, 'list', 'basis-full sm:basis-auto text-left sm:text-right text-[11px] font-bold underline hover:opacity-80 mt-0.5 text-slate-700')}
            </div>
        `;

        item.addEventListener('click', () => {
            selectedEventId = ev.id;
            updateAll();
        });

        listContainer.appendChild(item);
    });
}

// 4.5 Versenykiírások, Feltételek és Linkek kártyák (4. szekció)
function renderDetailedInfoCards() {
    const container = document.getElementById('detailedInfoCardsContainer');
    const activeComps = competitions.filter(c => c.active);

    if (activeComps.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-10 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p class="text-sm font-medium text-slate-600">Nincs megjeleníthető versenykiírás.</p>
                <p class="text-xs mt-1">Kapcsold be a versenyeket az oldal tetején a részletes kiírások megtekintéséhez!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    activeComps.forEach(comp => {
        const d = comp.details;
        const card = document.createElement('article');
        card.className = 'bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between';

        // Kategóriák vagy Témakörök blokk
        let topicOrCategoryHtml = '';
        if (d.categories) {
            topicOrCategoryHtml = `
                <div>
                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">6 versenykategória</h4>
                    <ul class="space-y-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        ${d.categories.map(cat => `<li class="leading-snug">${cat}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else if (d.theme) {
            topicOrCategoryHtml = `
                <div>
                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Téma és feladatok</h4>
                    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">${d.theme}</p>
                </div>
            `;
        }

        // Fordulók összefoglalója
        const roundsHtml = `
            <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Fordulók és dátumok</h4>
                <ul class="space-y-1 text-xs text-slate-700 bg-slate-50/80 p-3 rounded-xl border border-slate-100 list-disc list-inside">
                    ${d.roundsSummary.map(r => `<li class="leading-snug">${r}</li>`).join('')}
                </ul>
            </div>
        `;

        // Kattintható linkek
        const linksHtml = d.links.map(link => {
            if (link.primary) {
                return `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer"
                       class="inline-flex items-center justify-center gap-1.5 w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition hover:opacity-90"
                       style="background-color: ${cc(comp, 'color')};">
                        <span>🔗 ${link.label}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                `;
            }
            return `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center justify-center gap-1.5 w-full px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition">
                    <span>🌐 ${link.label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 shrink-0 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            `;
        }).join('');

        card.innerHTML = `
            <div>
                <!-- Színes fejléc sáv -->
                <div class="px-5 py-4 border-b border-slate-100" style="background-color: ${cc(comp, 'bgLight')};">
                    <div class="flex items-center gap-2 mb-1.5">
                        <span class="w-3 h-3 rounded-full shrink-0" style="background-color: ${cc(comp, 'color')};"></span>
                        <span class="text-xs font-extrabold uppercase tracking-wider" style="color: ${cc(comp, 'textDark')};">
                            ${comp.shortName}
                        </span>
                    </div>
                    <h3 class="text-base font-extrabold text-slate-900 leading-snug">${comp.name}</h3>
                    <p class="text-xs text-slate-700 mt-1.5 font-medium">🏛️ ${comp.organizer}</p>
                    <p class="text-xs text-slate-600 mt-0.5">📍 ${comp.address}</p>
                </div>

                <!-- Tartalmi blokkok -->
                <div class="p-5 space-y-4">
                    <div>
                        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Kiknek szól &amp; feltételek</h4>
                        <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">${d.participants}</p>
                    </div>

                    ${d.ourTeams ? `
                    <div class="rounded-xl p-3 border" style="background-color: ${cc(comp, 'bgLight')}; border-color: ${cc(comp, 'borderColor')};">
                        <h4 class="text-xs font-bold uppercase tracking-wider mb-2" style="color: ${cc(comp, 'textDark')};">Csapataink (${d.ourTeams.length} csapat)</h4>
                        <ul class="space-y-1.5">
                            ${d.ourTeams.map(t => `
                                <li class="flex items-center justify-between gap-3 bg-white/80 rounded-lg px-2.5 py-1.5 border border-white">
                                    <div class="min-w-0 space-y-1">
                                        <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                                            <span class="text-sm font-extrabold text-slate-900">${t.name}</span>
                                            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-md" style="background-color: ${cc(comp, 'bgLight')}; color: ${cc(comp, 'textDark')};">${t.size}</span>
                                        </div>
                                        <div><span class="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">${t.grade}</span></div>
                                    </div>
                                    ${t.logo ? `<div class="shrink-0"><img src="${t.logo}" alt="${t.name} csapat logója" width="40" height="40" class="w-10 h-10 rounded-full"></div>` : ''}
                                </li>`).join('')}
                        </ul>
                    </div>` : ''}

                    ${topicOrCategoryHtml}

                    ${roundsHtml}

                    <div>
                        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Díjazás</h4>
                        <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">${d.prizes}</p>
                    </div>
                </div>
            </div>

            <!-- Alsó linkek és elérhetőségek -->
            <div class="px-5 pb-5 pt-3 border-t border-slate-100 bg-slate-50/50 space-y-2.5">
                <div class="space-y-2">
                    ${linksHtml}
                </div>
                <p class="text-[11px] text-slate-500 leading-relaxed pt-1">
                    ✉️ ${d.contacts}
                </p>
            </div>
        `;

        container.appendChild(card);
    });
}
