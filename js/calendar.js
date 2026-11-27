/* Naptárba mentés: Google, Outlook és .ics adatok (a menü felülete: js/ui/calendar-menu.js). */

// Eltérés jelzés: a badge tooltipje a korábbi információt mutatja (egyszerű szöveg)
function prevInfoText(ev) {
    return 'Korábbi információ: ' + String(ev.discrepancy);
}

// Naptárba mentés (Google, Outlook, .ics letöltés Apple/Outlook asztali számára)
const CAL_TZ = 'Europe/Budapest';

function calData(ev) {
    const compact = d => d.replace(/-/g, '');
    const addDay = d => {
        const dt = new Date(d + 'T12:00:00Z');
        dt.setUTCDate(dt.getUTCDate() + 1);
        return dt.toISOString().slice(0, 10);
    };
    const timed = !!(ev.startTime && ev.endTime);
    const lastDay = ev.endDate || ev.date;
    const text = ev.description
        + (ev.endEstimated ? '\n\nA befejezés időpontja nem ismert, az 1,5 órás időtartam csak becslés.' : '')
        + (ev.linkUrl ? '\n\n' + ev.linkUrl : '');
    return {
        title: ev.title,
        text,
        location: ev.location || '',
        timed,
        // all-day: end exclusive
        startDay: ev.date,
        endDay: timed ? ev.date : addDay(lastDay),
        startTime: ev.startTime,
        endTime: ev.endTime,
        c: compact
    };
}

function googleCalUrl(ev) {
    const d = calData(ev);
    const dates = d.timed
        ? `${d.c(d.startDay)}T${d.startTime.replace(':', '')}00/${d.c(d.endDay)}T${d.endTime.replace(':', '')}00`
        : `${d.c(d.startDay)}/${d.c(d.endDay)}`;
    const p = new URLSearchParams({ action: 'TEMPLATE', text: d.title, dates, details: d.text, location: d.location });
    if (d.timed) p.set('ctz', CAL_TZ);
    return 'https://calendar.google.com/calendar/render?' + p.toString();
}

function outlookCalUrl(ev, base) {
    const d = calData(ev);
    const p = new URLSearchParams({
        path: '/calendar/action/compose',
        rru: 'addevent',
        subject: d.title,
        body: d.text,
        location: d.location,
        startdt: d.timed ? `${d.startDay}T${d.startTime}:00` : d.startDay,
        enddt: d.timed ? `${d.endDay}T${d.endTime}:00` : d.endDay
    });
    if (!d.timed) p.set('allday', 'true');
    return base + '/calendar/0/deeplink/compose?' + p.toString();
}

function buildIcs(ev) {
    const d = calData(ev);
    const esc = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    const when = d.timed
        ? [`DTSTART;TZID=${CAL_TZ}:${d.c(d.startDay)}T${d.startTime.replace(':', '')}00`,
           `DTEND;TZID=${CAL_TZ}:${d.c(d.endDay)}T${d.endTime.replace(':', '')}00`]
        : [`DTSTART;VALUE=DATE:${d.c(d.startDay)}`, `DTEND;VALUE=DATE:${d.c(d.endDay)}`];
    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Versenyidovonal//HU',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VTIMEZONE',
        `TZID:${CAL_TZ}`,
        'BEGIN:STANDARD',
        'DTSTART:19701025T030000',
        'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
        'TZOFFSETFROM:+0200',
        'TZOFFSETTO:+0100',
        'TZNAME:CET',
        'END:STANDARD',
        'BEGIN:DAYLIGHT',
        'DTSTART:19700329T020000',
        'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
        'TZOFFSETFROM:+0100',
        'TZOFFSETTO:+0200',
        'TZNAME:CEST',
        'END:DAYLIGHT',
        'END:VTIMEZONE',
        'BEGIN:VEVENT',
        `UID:${ev.id}@versenyidovonal`,
        `DTSTAMP:${stamp}`,
        ...when,
        `SUMMARY:${esc(d.title)}`,
        `DESCRIPTION:${esc(d.text)}`,
        d.location ? `LOCATION:${esc(d.location)}` : null,
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `DESCRIPTION:${esc(d.title)}`,
        'TRIGGER:-P1D',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].filter(Boolean);
    // RFC 5545: max 75 oktetes sorok, folytatósor szóközzel
    const enc = new TextEncoder();
    const folded = lines.map(line => {
        if (enc.encode(line).length <= 75) return line;
        const out = [];
        let cur = '';
        let len = 0;
        for (const ch of line) {
            const l = enc.encode(ch).length;
            if (len + l > (out.length ? 74 : 75)) { out.push(cur); cur = ''; len = 0; }
            cur += ch; len += l;
        }
        out.push(cur);
        return out.join('\r\n ');
    });
    return folded.join('\r\n') + '\r\n';
}

function downloadIcs(evId) {
    const found = findEventById(evId);
    if (!found) return;
    const blob = new Blob([buildIcs(found.ev)], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${evId}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
