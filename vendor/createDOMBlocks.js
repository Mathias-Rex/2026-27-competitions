(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CreateDOMBlocks"] = factory();
	else
		root["CreateDOMBlocks"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/buttons/createButton.ts"
/*!*************************************!*\
  !*** ./src/buttons/createButton.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createButton: () => (/* binding */ createButton)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");


const TICK_MS = 100;
/**
 * Letiltja a gombot `ms` ideig, a jobb felső sarokban visszaszámláló badge-dzsel.
 * Lejáratkor `onDone` hívódik.
 */
function startCountdown(button, ms, onDone) {
    const badge = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "span", attrs: { class: "btn-countdown-badge", "aria-hidden": "true" } });
    const end = Date.now() + ms;
    const render = () => { badge.textContent = (Math.max(0, end - Date.now()) / 1000).toFixed(1); };
    button.disabled = true;
    button.classList.add("is-counting");
    button.appendChild(badge);
    render();
    const timer = setInterval(() => {
        if (Date.now() < end) {
            render();
            return;
        }
        clearInterval(timer);
        badge.remove();
        button.classList.remove("is-counting");
        button.disabled = false;
        onDone?.();
    }, TICK_MS);
}
function createButton(params) {
    const handleEvent = [];
    if (params.click) {
        const click = params.click;
        if (params.throttle && params.throttle > 0) {
            const ms = params.throttle;
            handleEvent.push({
                event: "click",
                cb: (e) => {
                    click(e);
                    startCountdown(e.currentTarget, ms);
                },
            });
        }
        else if (params.debounce && params.debounce > 0) {
            const ms = params.debounce;
            handleEvent.push({
                event: "click",
                cb: (e) => {
                    startCountdown(e.currentTarget, ms, () => click(e));
                },
            });
        }
        else {
            handleEvent.push({ event: "click", cb: click });
        }
    }
    if (params.handleEvent)
        handleEvent.push(...(0,_utils__WEBPACK_IMPORTED_MODULE_1__.toArray)(params.handleEvent));
    const attrs = {
        class: `btn${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        attrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        parent: params.parent,
        tag: "button",
        attrs,
        text: params.text,
        style: params.style,
        handleEvent: handleEvent.length > 0 ? handleEvent : undefined,
    });
}


/***/ },

/***/ "./src/buttons/createButtonInput.ts"
/*!******************************************!*\
  !*** ./src/buttons/createButtonInput.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createButtonInput: () => (/* binding */ createButtonInput)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");


function createButtonInput(params) {
    // a felirat a value attribútum: lehet nyelvfüggő szöveg (tr() / függvény) is
    const base = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createInputElem)("input", { ...params, type: "button", value: undefined });
    const label = params.text ?? params.value;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        ...base,
        attrs: { ...base.attrs, ...(label != null ? { value: label } : {}) },
        parent: params.parent,
    });
}


/***/ },

/***/ "./src/buttons/createResetInput.ts"
/*!*****************************************!*\
  !*** ./src/buttons/createResetInput.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createResetInput: () => (/* binding */ createResetInput)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");


function createResetInput(params) {
    // a felirat a value attribútum: lehet nyelvfüggő szöveg (tr() / függvény) is
    const base = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createInputElem)("input", { ...params, type: "reset", value: undefined });
    const label = params.text ?? params.value;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        ...base,
        attrs: { ...base.attrs, ...(label != null ? { value: label } : {}) },
        parent: params.parent,
    });
}


/***/ },

/***/ "./src/buttons/createSubmitInput.ts"
/*!******************************************!*\
  !*** ./src/buttons/createSubmitInput.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSubmitInput: () => (/* binding */ createSubmitInput)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");


function createSubmitInput(params) {
    // a felirat a value attribútum: lehet nyelvfüggő szöveg (tr() / függvény) is
    const base = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createInputElem)("input", { ...params, type: "submit", value: undefined });
    const label = params.text ?? params.value;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        ...base,
        attrs: { ...base.attrs, ...(label != null ? { value: label } : {}) },
        parent: params.parent,
    });
}


/***/ },

/***/ "./src/buttons/index.ts"
/*!******************************!*\
  !*** ./src/buttons/index.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createButton: () => (/* reexport safe */ _createButton__WEBPACK_IMPORTED_MODULE_0__.createButton),
/* harmony export */   createButtonInput: () => (/* reexport safe */ _createButtonInput__WEBPACK_IMPORTED_MODULE_1__.createButtonInput),
/* harmony export */   createResetInput: () => (/* reexport safe */ _createResetInput__WEBPACK_IMPORTED_MODULE_3__.createResetInput),
/* harmony export */   createSubmitInput: () => (/* reexport safe */ _createSubmitInput__WEBPACK_IMPORTED_MODULE_2__.createSubmitInput)
/* harmony export */ });
/* harmony import */ var _createButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createButton */ "./src/buttons/createButton.ts");
/* harmony import */ var _createButtonInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createButtonInput */ "./src/buttons/createButtonInput.ts");
/* harmony import */ var _createSubmitInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createSubmitInput */ "./src/buttons/createSubmitInput.ts");
/* harmony import */ var _createResetInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createResetInput */ "./src/buttons/createResetInput.ts");






/***/ },

/***/ "./src/components/asyncImage.ts"
/*!**************************************!*\
  !*** ./src/components/asyncImage.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asyncImage: () => (/* binding */ asyncImage)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function asyncImage(params) {
    const attrs = {
        src: params.src,
        alt: params.alt || "",
        class: `async-image${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.lazy)
        attrs.loading = "lazy";
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "img",
        parent: params.parent,
        attrs,
    });
}


/***/ },

/***/ "./src/components/calendar-helper.ts"
/*!*******************************************!*\
  !*** ./src/components/calendar-helper.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildMonthCalendar: () => (/* binding */ buildMonthCalendar),
/* harmony export */   createCalendarHeader: () => (/* binding */ createCalendarHeader),
/* harmony export */   createDayCell: () => (/* binding */ createDayCell),
/* harmony export */   createDayGrid: () => (/* binding */ createDayGrid),
/* harmony export */   createDayNamesHeader: () => (/* binding */ createDayNamesHeader),
/* harmony export */   createEmptyDay: () => (/* binding */ createEmptyDay),
/* harmony export */   dayNames: () => (/* binding */ dayNames),
/* harmony export */   formatDateStr: () => (/* binding */ formatDateStr),
/* harmony export */   getDaysInMonth: () => (/* binding */ getDaysInMonth),
/* harmony export */   getFirstDayOfMonth: () => (/* binding */ getFirstDayOfMonth),
/* harmony export */   getISOWeek: () => (/* binding */ getISOWeek),
/* harmony export */   getWeeksInMonth: () => (/* binding */ getWeeksInMonth),
/* harmony export */   monthNames: () => (/* binding */ monthNames),
/* harmony export */   monthNamesShort: () => (/* binding */ monthNamesShort),
/* harmony export */   setupCalendarCloseHandler: () => (/* binding */ setupCalendarCloseHandler),
/* harmony export */   toggleCalendar: () => (/* binding */ toggleCalendar)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");


/** A tömb kiszámítása az aktuális nyelven (Intl); a naptárak minden megnyitáskor / lapozáskor újraszámolják. */
function intlNames(opts, dates) {
    let fmt;
    try {
        fmt = new Intl.DateTimeFormat((0,_i18n__WEBPACK_IMPORTED_MODULE_1__.getLocale)(), opts);
    }
    catch {
        fmt = new Intl.DateTimeFormat("en", opts);
    }
    return dates.map((d) => {
        const name = fmt.format(d);
        return name.charAt(0).toUpperCase() + name.slice(1);
    });
}
/** Hónapnevek (január … december) az aktuális nyelven */
function monthNames() {
    return intlNames({ month: "long" }, Array.from({ length: 12 }, (_, i) => new Date(2021, i, 1)));
}
/** Rövid hónapnevek az aktuális nyelven */
function monthNamesShort() {
    return intlNames({ month: "short" }, Array.from({ length: 12 }, (_, i) => new Date(2021, i, 1)));
}
/** Hétköznapnevek hétfővel kezdve, rövidítve (max. 3 betű) az aktuális nyelven */
function dayNames() {
    // 2024-01-01 hétfő
    return intlNames({ weekday: "short" }, Array.from({ length: 7 }, (_, i) => new Date(2024, 0, 1 + i))).map((n) => n.replace(/\./g, "").slice(0, 3));
}
/** Format a date as YYYY-MM-DD */
function formatDateStr(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
/** Get the number of days in a given month */
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
/** A hónap első napjának helye a (hétfővel kezdődő) hétben: 0 = hétfő … 6 = vasárnap */
function getFirstDayOfMonth(year, month) {
    return (new Date(year, month, 1).getDay() + 6) % 7;
}
/** Create calendar month/year header with prev/next navigation */
function createCalendarHeader(title, onPrev, onNext) {
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        attrs: { class: "calendar-header" },
        children: [
            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                tag: "button",
                text: "\u25C0",
                attrs: { class: "calendar-nav-btn" },
                handleEvent: { event: "click", cb: (e) => { e.stopPropagation(); onPrev(); } },
            }),
            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "span", text: title, attrs: { class: "calendar-title" } }),
            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                tag: "button",
                text: "\u25B6",
                attrs: { class: "calendar-nav-btn" },
                handleEvent: { event: "click", cb: (e) => { e.stopPropagation(); onNext(); } },
            }),
        ],
    });
}
/** Create the day names header row */
function createDayNamesHeader() {
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        attrs: { class: "calendar-days-header" },
        children: dayNames().map((d) => (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "span", text: d, attrs: { class: "calendar-day-name" } })),
    });
}
/** Create an empty day cell */
function createEmptyDay() {
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "span", attrs: { class: "calendar-day empty" } });
}
/** Create a day cell with optional selected/disabled styling and click handler */
function createDayCell(day, extraClass, onClick) {
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "span",
        text: String(day),
        attrs: { class: `calendar-day${extraClass}` },
        handleEvent: onClick ? { event: "click", cb: onClick } : undefined,
    });
}
/** Build a full day grid for a month (empty cells + day cells) */
function createDayGrid(year, month, dayCellBuilder) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const grid = [];
    for (let i = 0; i < firstDay; i++) {
        grid.push(createEmptyDay());
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = formatDateStr(year, month, day);
        grid.push(dayCellBuilder(day, dateStr));
    }
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "div", attrs: { class: "calendar-grid" }, children: grid });
}
/** Build a full month calendar layout: header + day names + day grid */
function buildMonthCalendar(year, month, onPrev, onNext, dayCellBuilder) {
    return [
        createCalendarHeader(`${monthNames()[month]} ${year}`, onPrev, onNext),
        createDayNamesHeader(),
        createDayGrid(year, month, dayCellBuilder),
    ];
}
/** Register a document click handler to close a calendar element */
function setupCalendarCloseHandler(calendarEl) {
    document.addEventListener("click", () => {
        calendarEl.style.display = "none";
    });
}
/** Toggle calendar visibility and re-render */
function toggleCalendar(calendarEl, rerender) {
    const isVisible = calendarEl.style.display !== "none";
    calendarEl.style.display = isVisible ? "none" : "block";
    if (!isVisible)
        rerender();
}
/** Get ISO week number for a date */
function getISOWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
/** Get list of ISO week numbers in a month */
function getWeeksInMonth(year, month) {
    const weeks = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstWeek = getISOWeek(firstDay);
    const lastWeek = getISOWeek(lastDay);
    for (let w = firstWeek; w <= lastWeek; w++)
        weeks.push(w);
    return weeks;
}


/***/ },

/***/ "./src/components/createAccordion.ts"
/*!*******************************************!*\
  !*** ./src/components/createAccordion.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAccordion: () => (/* binding */ createAccordion)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function buildAccordionItem(item, multiple) {
    const content = Array.isArray(item.content) ? item.content : [item.content];
    return {
        tag: "div",
        attrs: {
            class: `accordion-item${item.open ? " open" : ""}`,
            "data-accordion-item": item.id,
        },
        children: [
            {
                tag: "button",
                attrs: {
                    class: "accordion-header",
                    "data-accordion-toggle": item.id,
                    "aria-expanded": item.open ? "true" : "false",
                },
                children: [
                    { tag: "span", text: item.title, attrs: { class: "accordion-title" } },
                    { tag: "span", text: "\u25BC", attrs: { class: "accordion-icon" } },
                ],
                handleEvent: {
                    event: "click",
                    cb: (e) => {
                        const button = e.currentTarget;
                        const accordionItem = button.closest(".accordion-item");
                        if (!accordionItem)
                            return;
                        const isOpen = accordionItem.classList.contains("open");
                        if (!multiple) {
                            const accordion = accordionItem.closest(".accordion");
                            accordion?.querySelectorAll(".accordion-item.open").forEach((el) => {
                                el.classList.remove("open");
                                el.querySelector(".accordion-header")?.setAttribute("aria-expanded", "false");
                            });
                        }
                        accordionItem.classList.toggle("open", !isOpen);
                        button.setAttribute("aria-expanded", (!isOpen).toString());
                    },
                },
            },
            {
                tag: "div",
                attrs: {
                    class: `accordion-content${item.open ? " open" : ""}`,
                    "data-accordion-content": item.id,
                },
                children: content,
            },
        ],
    };
}
function createAccordion(params) {
    const rootAttrs = { class: `accordion${params.class ? ` ${params.class}` : ""}` };
    if (params.id)
        rootAttrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: rootAttrs,
        children: params.items.map((item) => buildAccordionItem(item, params.multiple || false)),
    });
}


/***/ },

/***/ "./src/components/createAlert.ts"
/*!***************************************!*\
  !*** ./src/components/createAlert.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAlert: () => (/* binding */ createAlert)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");


function createAlert(params) {
    const children = [];
    if (params.title) {
        children.push({ tag: "strong", text: params.title, attrs: { class: "alert-title" } });
    }
    children.push({ tag: "span", text: params.message, attrs: { class: "alert-message" } });
    if (params.dismissible) {
        children.push({
            tag: "button",
            text: "\u00D7",
            attrs: { class: "alert-close", "aria-label": (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("alert.close", "Close") },
            handleEvent: {
                event: "click",
                cb: (e) => {
                    const alert = e.currentTarget.closest(".alert");
                    if (alert)
                        alert.style.display = "none";
                    params.onDismiss?.();
                },
            },
        });
    }
    const rootAttrs = {
        class: `alert alert-${params.type || "info"}${params.class ? ` ${params.class}` : ""}`,
        role: "alert",
    };
    if (params.id)
        rootAttrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "div", parent: params.parent, attrs: rootAttrs, children });
}


/***/ },

/***/ "./src/components/createAvatar.ts"
/*!****************************************!*\
  !*** ./src/components/createAvatar.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAvatar: () => (/* binding */ createAvatar)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createAvatar(params) {
    const children = [];
    if (params.src) {
        children.push({
            tag: "img",
            attrs: { src: params.src, alt: params.name || "Avatar", class: "avatar-image" },
        });
    }
    else if (params.name) {
        const initials = params.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
        children.push({ tag: "span", text: initials, attrs: { class: "avatar-initials" } });
    }
    const rootAttrs = {
        class: `avatar avatar-${params.size || "md"} avatar-${params.shape || "circle"}${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        rootAttrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "div", parent: params.parent, attrs: rootAttrs, children });
}


/***/ },

/***/ "./src/components/createBadge.ts"
/*!***************************************!*\
  !*** ./src/components/createBadge.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBadge: () => (/* binding */ createBadge)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createBadge(params) {
    const rootAttrs = { class: `badge badge-${params.type || "neutral"}${params.class ? ` ${params.class}` : ""}` };
    if (params.id)
        rootAttrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "span", parent: params.parent, attrs: rootAttrs, text: params.text });
}


/***/ },

/***/ "./src/components/createBlockquote.ts"
/*!********************************************!*\
  !*** ./src/components/createBlockquote.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBlockquote: () => (/* binding */ createBlockquote)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");


function createBlockquote(params) {
    const children = [];
    children.push({ tag: "p", text: params.text, attrs: { class: "blockquote-text" } });
    if (params.author) {
        children.push({
            tag: "footer",
            attrs: { class: "blockquote-author" },
            children: [{ tag: "cite", text: typeof params.author === "string" ? `\u2014 ${params.author}` : () => `\u2014 ${(0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(params.author)}` }],
        });
    }
    const rootAttrs = { class: `blockquote${params.class ? ` ${params.class}` : ""}` };
    if (params.id)
        rootAttrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "blockquote", parent: params.parent, attrs: rootAttrs, children });
}


/***/ },

/***/ "./src/components/createBreadcrumb.ts"
/*!********************************************!*\
  !*** ./src/components/createBreadcrumb.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBreadcrumb: () => (/* binding */ createBreadcrumb)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createBreadcrumb(params) {
    const separator = params.separator || "/";
    const children = [];
    params.items.forEach((item, index) => {
        if (index > 0) {
            children.push({ tag: "span", text: separator, attrs: { class: "breadcrumb-separator" } });
        }
        const isLast = index === params.items.length - 1;
        if (item.href && !isLast) {
            children.push({
                tag: "a",
                text: item.text,
                attrs: { href: item.href, class: "breadcrumb-link" },
                handleEvent: item.click ? { event: "click", cb: item.click } : undefined,
            });
        }
        else {
            children.push({
                tag: "span",
                text: item.text,
                attrs: { class: isLast ? "breadcrumb-current" : "breadcrumb-link" },
                handleEvent: item.click ? { event: "click", cb: item.click } : undefined,
            });
        }
    });
    const rootAttrs = { class: `breadcrumb${params.class ? ` ${params.class}` : ""}` };
    if (params.id)
        rootAttrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "nav",
        parent: params.parent,
        attrs: rootAttrs,
        children: [
            {
                tag: "ol",
                attrs: { class: "breadcrumb-list" },
                children: children.map((child) => ({
                    tag: "li",
                    attrs: { class: "breadcrumb-item" },
                    children: [child],
                })),
            },
        ],
    });
}


/***/ },

/***/ "./src/components/createCard.ts"
/*!**************************************!*\
  !*** ./src/components/createCard.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCard: () => (/* binding */ createCard)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createCard(params) {
    const children = [];
    if (params.title) {
        children.push({
            tag: "div",
            attrs: { class: "card-header" },
            children: [{ tag: "h3", text: params.title }],
        });
    }
    if (params.body) {
        const bodyItems = Array.isArray(params.body) ? params.body : [params.body];
        children.push({
            tag: "div",
            attrs: { class: "card-body" },
            children: bodyItems,
        });
    }
    if (params.footer) {
        const footerItems = Array.isArray(params.footer) ? params.footer : [params.footer];
        children.push({
            tag: "div",
            attrs: { class: "card-footer" },
            children: footerItems,
        });
    }
    const rootAttrs = { class: `card${params.class ? ` ${params.class}` : ""}` };
    if (params.id)
        rootAttrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: rootAttrs,
        children,
    });
}


/***/ },

/***/ "./src/components/createCarousel.ts"
/*!******************************************!*\
  !*** ./src/components/createCarousel.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCarousel: () => (/* binding */ createCarousel)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");


function buildSlide(slide) {
    const children = [];
    if (slide.icon) {
        children.push({ tag: "div", text: slide.icon, attrs: { class: "carousel-slide-icon" } });
    }
    if (slide.title) {
        children.push({ tag: "span", text: slide.title, attrs: { class: "carousel-slide-title" } });
    }
    if (slide.description) {
        children.push({ tag: "span", text: slide.description, attrs: { class: "carousel-slide-desc" } });
    }
    if (slide.content) {
        const contentItems = Array.isArray(slide.content) ? slide.content : [slide.content];
        children.push({ tag: "div", attrs: { class: "carousel-slide-content" }, children: contentItems });
    }
    if (slide.cta) {
        const ctaAttrs = { class: "carousel-slide-cta" };
        if (slide.cta.href)
            ctaAttrs.href = slide.cta.href;
        children.push({
            tag: slide.cta.href ? "a" : "button",
            text: slide.cta.text,
            attrs: ctaAttrs,
            ...(slide.cta.click ? { handleEvent: { event: "click", cb: slide.cta.click } } : {}),
        });
    }
    const slideAttrs = {
        class: `carousel-slide${slide.class ? ` ${slide.class}` : ""}`,
        role: "group",
        "aria-roledescription": "slide",
    };
    if (slide.id)
        slideAttrs.id = slide.id;
    return {
        tag: "div",
        attrs: slideAttrs,
        children,
    };
}
function createCarousel(params) {
    const labels = params.labels ?? {};
    const rootAttrs = {
        class: `carousel-wrap${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        rootAttrs.id = params.id;
    const showArrows = params.showArrows !== false;
    const showDots = params.showDots !== false;
    const navChildren = [];
    if (showArrows) {
        navChildren.push({
            tag: "button",
            text: "\u25C0",
            attrs: { type: "button", class: "carousel-arrow carousel-prev", "aria-label": labels.prev ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("carousel.prev", "Previous") },
        });
    }
    if (showDots) {
        navChildren.push({ tag: "div", attrs: { class: "carousel-dots", role: "group" } });
    }
    if (showArrows) {
        navChildren.push({
            tag: "button",
            text: "\u25B6",
            attrs: { type: "button", class: "carousel-arrow carousel-next", "aria-label": labels.next ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("carousel.next", "Next") },
        });
    }
    const carousel = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: rootAttrs,
        children: [
            {
                tag: "div",
                attrs: {
                    class: "carousel-stage",
                    role: "region",
                    "aria-roledescription": "carousel",
                    "aria-label": labels.stage ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("carousel.stage", "Carousel"),
                    tabindex: "0",
                },
                children: params.slides.map((s) => buildSlide(s)),
            },
            { tag: "div", attrs: { class: "carousel-nav", role: "group", "aria-label": labels.nav ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("carousel.nav", "Carousel navigation") }, children: navChildren },
        ],
    });
    if (params.slideWidth)
        carousel.style.setProperty("--carousel-slide-w", params.slideWidth);
    if (params.height)
        carousel.style.setProperty("--carousel-height", params.height);
    initCarouselLogic(carousel, params);
    return carousel;
}
const FOCUSABLE = "a, button, input, select, textarea, [tabindex]";
/** Csak az aktív slide vesz részt a tab sorrendben; az eredeti tabindex a data-tabindex-ben marad. */
function setSlideFocus(slide, active) {
    slide.setAttribute("aria-hidden", active ? "false" : "true");
    slide.querySelectorAll(FOCUSABLE).forEach((el) => {
        if (active) {
            const orig = el.dataset.tabindex;
            if (orig === undefined)
                return;
            if (orig === "")
                el.removeAttribute("tabindex");
            else
                el.setAttribute("tabindex", orig);
        }
        else {
            if (el.dataset.tabindex === undefined)
                el.dataset.tabindex = el.getAttribute("tabindex") ?? "";
            el.setAttribute("tabindex", "-1");
        }
    });
}
function mod(n, m) {
    return ((n % m) + m) % m;
}
function initCarouselLogic(root, params) {
    const stage = root.querySelector(".carousel-stage");
    if (!stage)
        return;
    const slides = Array.from(stage.querySelectorAll(":scope > .carousel-slide"));
    const dotsWrap = root.querySelector(".carousel-dots");
    const prevBtn = root.querySelector(".carousel-prev");
    const nextBtn = root.querySelector(".carousel-next");
    const N = slides.length;
    if (N === 0)
        return;
    let current = 0;
    const dots = [];
    const dotLabel = (n) => (params.labels?.dot ? params.labels.dot(n) : (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.t)("cdb.carousel.dot", { n }, "Slide {n}"));
    // nyelvváltáskor a pöttyök feliratai is frissülnek
    (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.watchLocale)(root, () => dots.forEach((d, i) => d.setAttribute("aria-label", dotLabel(i + 1))));
    if (dotsWrap) {
        for (let i = 0; i < N; i++) {
            const d = document.createElement("button");
            d.type = "button";
            d.className = "carousel-dot";
            d.setAttribute("aria-label", dotLabel(i + 1));
            d.addEventListener("click", () => goTo(i));
            dotsWrap.appendChild(d);
            dots.push(d);
        }
    }
    function goTo(idx) {
        const previous = current;
        current = mod(idx, N);
        const prev = mod(current - 1, N);
        const next = mod(current + 1, N);
        slides.forEach((slide, i) => {
            let state;
            if (i === current)
                state = "active";
            else if (i === prev)
                state = "prev";
            else if (i === next)
                state = "next";
            else
                state = mod(i - current, N) <= Math.floor(N / 2) ? "hidden-next" : "hidden-prev";
            slide.dataset.state = state;
            setSlideFocus(slide, state === "active");
        });
        dots.forEach((d, i) => {
            d.classList.toggle("active", i === current);
            d.setAttribute("aria-current", String(i === current));
        });
        if (previous !== current)
            params.onChange?.(current);
    }
    prevBtn?.addEventListener("click", () => goTo(current - 1));
    nextBtn?.addEventListener("click", () => goTo(current + 1));
    // A szomszédos slide-ra kattintva arra lép; az aktív slide saját vezérlői működnek.
    stage.addEventListener("click", (e) => {
        const slide = e.target.closest(".carousel-slide");
        if (!slide)
            return;
        const state = slide.dataset.state;
        if (state === "prev" || state === "next") {
            e.preventDefault();
            e.stopPropagation();
            goTo(current + (state === "next" ? 1 : -1));
        }
    });
    // Húzás / swipe Pointer Events-szel; a függőleges görgetés a böngészőé (touch-action: pan-y).
    let slideW = 210;
    const measure = () => {
        slideW = slides[0].offsetWidth || slideW;
    };
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
    const drag = { active: false, startX: 0, startY: 0, moved: false, suppress: false };
    stage.addEventListener("pointerdown", (e) => {
        if (drag.active)
            return;
        if (e.pointerType === "mouse" && e.button !== 0)
            return;
        measure();
        drag.active = true;
        drag.startX = e.clientX;
        drag.startY = e.clientY;
        drag.moved = false;
        drag.suppress = false;
        // Itt még nincs pointer capture: egy sima koppintás clickjét a stage-hez irányítaná.
    });
    stage.addEventListener("pointermove", (e) => {
        if (!drag.active)
            return;
        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;
        if (!drag.moved) {
            if (Math.abs(dx) < 6 && Math.abs(dy) < 6)
                return;
            if (Math.abs(dy) > Math.abs(dx)) {
                drag.active = false;
                return;
            }
            drag.moved = true;
            stage.classList.add("is-dragging");
            try {
                stage.setPointerCapture(e.pointerId);
            }
            catch {
                /* szintetikus pointer */
            }
        }
        if (Math.abs(dx) > 8)
            drag.suppress = true;
        stage.style.setProperty("--carousel-drag", `${clamp(dx, -slideW * 0.5, slideW * 0.5)}px`);
    });
    stage.addEventListener("pointerup", (e) => {
        if (!drag.active)
            return;
        const dx = e.clientX - drag.startX;
        drag.active = false;
        stage.classList.remove("is-dragging");
        if (!drag.moved)
            return;
        stage.style.setProperty("--carousel-drag", "0px");
        if (Math.abs(dx) >= Math.max(40, slideW * 0.18))
            goTo(dx < 0 ? current + 1 : current - 1);
    });
    stage.addEventListener("pointercancel", () => {
        if (!drag.active)
            return;
        drag.active = false;
        stage.classList.remove("is-dragging");
        stage.style.setProperty("--carousel-drag", "0px");
    });
    // A húzást záró clicket (link, gomb, szomszédos slide) elnyeli.
    stage.addEventListener("click", (e) => {
        if (drag.suppress) {
            e.preventDefault();
            e.stopPropagation();
            drag.suppress = false;
        }
    }, true);
    stage.addEventListener("dragstart", (e) => e.preventDefault());
    // Billentyűzet: csak ha maga a stage vagy egy nyíl fókuszált (a slide-ban lévő vezérlők nyilait nem veszi el).
    const onKey = (e) => {
        if (e.target !== stage && e.target !== prevBtn && e.target !== nextBtn)
            return;
        if (e.key === "ArrowRight")
            goTo(current + 1);
        else if (e.key === "ArrowLeft")
            goTo(current - 1);
        else if (e.key === "Home")
            goTo(0);
        else if (e.key === "End")
            goTo(N - 1);
        else
            return;
        e.preventDefault();
    };
    [stage, prevBtn, nextBtn].forEach((el) => el?.addEventListener("keydown", onKey));
    goTo(params.startIndex ?? 0);
}


/***/ },

/***/ "./src/components/createCodeBlock.ts"
/*!*******************************************!*\
  !*** ./src/components/createCodeBlock.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCodeBlock: () => (/* binding */ createCodeBlock)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _highlighter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./highlighter */ "./src/components/highlighter.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");



function createCodeBlock(params) {
    const children = [];
    const copyable = params.copyable !== false;
    const hasLanguage = !!params.language;
    // Header row: language label + copy button
    if (hasLanguage || copyable) {
        const headerChildren = [];
        if (hasLanguage) {
            headerChildren.push({
                tag: "span",
                text: params.language.toUpperCase(),
                attrs: { class: "code-language" },
            });
        }
        if (copyable) {
            headerChildren.push({
                tag: "button",
                attrs: {
                    class: "code-copy-btn",
                    type: "button",
                    "data-code": params.code,
                },
                text: (0,_i18n__WEBPACK_IMPORTED_MODULE_2__.builtin)("codeblock.copy", "Copy"),
                handleEvent: {
                    event: "click",
                    cb: (e) => {
                        const btn = e.currentTarget;
                        const code = btn.getAttribute("data-code") || "";
                        navigator.clipboard.writeText(code).then(() => {
                            btn.textContent = (0,_i18n__WEBPACK_IMPORTED_MODULE_2__.resolveText)((0,_i18n__WEBPACK_IMPORTED_MODULE_2__.builtin)("codeblock.copied", "Copied!"));
                            setTimeout(() => {
                                btn.textContent = (0,_i18n__WEBPACK_IMPORTED_MODULE_2__.resolveText)((0,_i18n__WEBPACK_IMPORTED_MODULE_2__.builtin)("codeblock.copy", "Copy"));
                            }, 2000);
                        }).catch(() => {
                            /* clipboard write failed — silently ignore */
                        });
                    },
                },
            });
        }
        children.push({
            tag: "div",
            attrs: { class: "code-header" },
            children: headerChildren,
        });
    }
    const highlighted = (0,_highlighter__WEBPACK_IMPORTED_MODULE_1__.highlightCode)(params.code, params.language);
    children.push({
        tag: "pre",
        attrs: { class: "code-pre" },
        children: [
            {
                tag: "code",
                content: highlighted,
                attrs: { class: `code-content${params.language ? ` language-${params.language}` : ""}` },
            },
        ],
    });
    const rootAttrs = {
        class: `code-block${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        rootAttrs.id = params.id;
    const opts = {
        tag: "div",
        attrs: rootAttrs,
        children,
    };
    if (params.parent)
        opts.parent = params.parent;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)(opts);
}


/***/ },

/***/ "./src/components/createContainer.ts"
/*!*******************************************!*\
  !*** ./src/components/createContainer.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createContainer: () => (/* binding */ createContainer)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createContainer(params) {
    const rootAttrs = { class: `container${params.class ? ` ${params.class}` : ""}` };
    if (params.id)
        rootAttrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "div", parent: params.parent, attrs: rootAttrs, children: params.children });
}


/***/ },

/***/ "./src/components/createCustomDatePicker.ts"
/*!**************************************************!*\
  !*** ./src/components/createCustomDatePicker.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCustomDatePicker: () => (/* binding */ createCustomDatePicker)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");
/* harmony import */ var _calendar_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar-helper */ "./src/components/calendar-helper.ts");



function createCustomDatePicker(params) {
    let selectedDate = params.value || "";
    const rootAttrs = {
        class: `custom-date-picker${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        rootAttrs.id = params.id;
    const input = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "input",
        attrs: {
            type: "text",
            readonly: "true",
            class: "custom-date-picker-input",
            placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("picker.date", "Válassz dátumot…"),
            ...(params.id ? { id: `${params.id}-input` } : {}),
            ...(selectedDate ? { value: selectedDate } : {}),
        },
        handleEvent: {
            event: "click",
            cb: (e) => {
                e.stopPropagation();
                (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.toggleCalendar)(calendarEl, () => {
                    const y = selectedDate ? parseInt(selectedDate.split("-")[0]) : new Date().getFullYear();
                    const m = selectedDate ? parseInt(selectedDate.split("-")[1]) - 1 : new Date().getMonth();
                    calendarEl.replaceChildren(...renderCalendar(y, m));
                });
            },
        },
    });
    const calendarEl = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        attrs: { class: "custom-date-picker-calendar" },
        style: { display: "none" },
    });
    function renderCalendar(year, month) {
        return (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.buildMonthCalendar)(year, month, 
        // prev
        () => {
            const prev = month === 0 ? 11 : month - 1;
            const prevYear = month === 0 ? year - 1 : year;
            calendarEl.replaceChildren(...renderCalendar(prevYear, prev));
        }, 
        // next
        () => {
            const next = month === 11 ? 0 : month + 1;
            const nextYear = month === 11 ? year + 1 : year;
            calendarEl.replaceChildren(...renderCalendar(nextYear, next));
        }, 
        // day cell builder
        (day, dateStr) => {
            const isSelected = dateStr === selectedDate;
            const isDisabled = (params.min && dateStr < params.min) || (params.max && dateStr > params.max);
            return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                tag: "span",
                text: String(day),
                attrs: { class: `calendar-day${isSelected ? " selected" : ""}${isDisabled ? " disabled" : ""}` },
                handleEvent: isDisabled ? undefined : {
                    event: "click",
                    cb: (e) => {
                        e.stopPropagation();
                        selectedDate = dateStr;
                        input.value = dateStr;
                        calendarEl.style.display = "none";
                        params.onChange?.(dateStr);
                    },
                },
            });
        });
    }
    calendarEl.append(...renderCalendar(new Date().getFullYear(), new Date().getMonth()));
    (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.setupCalendarCloseHandler)(calendarEl);
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: rootAttrs,
        children: [
            ...(params.labelText
                ? [(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "label", text: params.labelText, attrs: { class: "custom-date-picker-label" } })]
                : []),
            { tag: "div", attrs: { class: "custom-date-picker-wrapper" }, children: [input, calendarEl] },
        ],
    });
}


/***/ },

/***/ "./src/components/createCustomDateRangePicker.ts"
/*!*******************************************************!*\
  !*** ./src/components/createCustomDateRangePicker.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCustomDateRangePicker: () => (/* binding */ createCustomDateRangePicker)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");
/* harmony import */ var _calendar_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar-helper */ "./src/components/calendar-helper.ts");



function createCustomDateRangePicker(params) {
    let startDate = params.startValue || "";
    let endDate = params.endValue || "";
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let selectingStart = true;
    const rootAttrs = {
        class: `custom-date-range-picker${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        rootAttrs.id = params.id;
    const startInput = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "input",
        attrs: {
            type: "text", readonly: "true", class: "custom-date-range-picker-input",
            placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("picker.rangeStart", "Kezdet…"),
            ...(startDate ? { value: startDate } : {}),
        },
    });
    const endInput = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "input",
        attrs: {
            type: "text", readonly: "true", class: "custom-date-range-picker-input",
            placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("picker.rangeEnd", "Vég…"),
            ...(endDate ? { value: endDate } : {}),
        },
    });
    const calendarEl = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div", attrs: { class: "custom-date-range-picker-calendar" }, style: { display: "none" },
    });
    function renderCalendar() {
        return (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.buildMonthCalendar)(currentYear, currentMonth, 
        // prev
        () => {
            currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            if (currentMonth === 11)
                currentYear--;
            calendarEl.replaceChildren(...renderCalendar());
        }, 
        // next
        () => {
            currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
            if (currentMonth === 0)
                currentYear++;
            calendarEl.replaceChildren(...renderCalendar());
        }, 
        // day cell builder
        (day, dateStr) => {
            const isStart = dateStr === startDate;
            const isEnd = dateStr === endDate;
            const inRange = startDate && endDate && dateStr > startDate && dateStr < endDate;
            return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                tag: "span", text: String(day),
                attrs: { class: `calendar-day${isStart ? " range-start" : ""}${isEnd ? " range-end" : ""}${inRange ? " in-range" : ""}` },
                handleEvent: {
                    event: "click",
                    cb: (e) => {
                        e.stopPropagation();
                        if (selectingStart) {
                            startDate = dateStr;
                            endDate = "";
                            selectingStart = false;
                        }
                        else {
                            if (dateStr < startDate) {
                                endDate = startDate;
                                startDate = dateStr;
                            }
                            else {
                                endDate = dateStr;
                            }
                            selectingStart = true;
                        }
                        startInput.value = startDate;
                        endInput.value = endDate;
                        calendarEl.replaceChildren(...renderCalendar());
                        params.onChange?.(startDate, endDate);
                    },
                },
            });
        });
    }
    calendarEl.append(...renderCalendar());
    const wrapper = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div", attrs: { class: "custom-date-range-picker-wrapper" },
        children: [
            startInput,
            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "span", text: " \u2013 ", attrs: { class: "range-separator" } }),
            endInput,
            calendarEl,
        ],
    });
    [startInput, endInput].forEach((inp) => {
        inp.addEventListener("click", (e) => {
            e.stopPropagation();
            calendarEl.style.display = calendarEl.style.display === "none" ? "block" : "none";
        });
    });
    (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.setupCalendarCloseHandler)(calendarEl);
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div", parent: params.parent, attrs: rootAttrs,
        children: [
            ...(params.labelText ? [(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "label", text: params.labelText, attrs: { class: "custom-date-range-picker-label" } })] : []),
            wrapper,
        ],
    });
}


/***/ },

/***/ "./src/components/createCustomDateTimePicker.ts"
/*!******************************************************!*\
  !*** ./src/components/createCustomDateTimePicker.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCustomDateTimePicker: () => (/* binding */ createCustomDateTimePicker)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");
/* harmony import */ var _calendar_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar-helper */ "./src/components/calendar-helper.ts");



function createCustomDateTimePicker(params) {
    let selectedDate = params.value || "";
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let selectedTime = "12:00";
    const rootAttrs = {
        class: `custom-datetime-picker${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        rootAttrs.id = params.id;
    const timeInput = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "input",
        attrs: { type: "time", class: "custom-datetime-picker-time", value: selectedTime },
        handleEvent: {
            event: "change",
            cb: (e) => {
                selectedTime = e.target.value;
                if (selectedDate) {
                    const datePart = selectedDate.split("T")[0];
                    selectedDate = `${datePart}T${selectedTime}`;
                    input.value = selectedDate;
                    params.onChange?.(selectedDate);
                }
            },
        },
    });
    const input = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "input",
        attrs: {
            type: "text", readonly: "true", class: "custom-datetime-picker-input",
            placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("picker.datetime", "Válassz dátumot és időt…"),
            ...(params.id ? { id: `${params.id}-input` } : {}),
            ...(selectedDate ? { value: selectedDate } : {}),
        },
        handleEvent: {
            event: "click",
            cb: (e) => {
                e.stopPropagation();
                (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.toggleCalendar)(calendarEl, () => calendarEl.replaceChildren(...renderCalendar()));
            },
        },
    });
    const calendarEl = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div", attrs: { class: "custom-datetime-picker-calendar" }, style: { display: "none" },
    });
    function renderCalendar() {
        return (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.buildMonthCalendar)(currentYear, currentMonth, 
        // prev
        () => {
            currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            if (currentMonth === 11)
                currentYear--;
            calendarEl.replaceChildren(...renderCalendar());
        }, 
        // next
        () => {
            currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
            if (currentMonth === 0)
                currentYear++;
            calendarEl.replaceChildren(...renderCalendar());
        }, 
        // day cell builder
        (day, dateStr) => {
            const datePart = selectedDate.split("T")[0];
            return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                tag: "span", text: String(day),
                attrs: { class: `calendar-day${datePart === dateStr ? " selected" : ""}` },
                handleEvent: {
                    event: "click",
                    cb: (e) => {
                        e.stopPropagation();
                        selectedDate = `${dateStr}T${selectedTime}`;
                        input.value = selectedDate;
                        calendarEl.style.display = "none";
                        params.onChange?.(selectedDate);
                    },
                },
            });
        });
    }
    calendarEl.append(...renderCalendar());
    (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.setupCalendarCloseHandler)(calendarEl);
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div", parent: params.parent, attrs: rootAttrs,
        children: [
            ...(params.labelText ? [(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "label", text: params.labelText, attrs: { class: "custom-datetime-picker-label" } })] : []),
            { tag: "div", attrs: { class: "custom-datetime-picker-wrapper" }, children: [input, calendarEl, timeInput] },
        ],
    });
}


/***/ },

/***/ "./src/components/createCustomMonthPicker.ts"
/*!***************************************************!*\
  !*** ./src/components/createCustomMonthPicker.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCustomMonthPicker: () => (/* binding */ createCustomMonthPicker)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");
/* harmony import */ var _calendar_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar-helper */ "./src/components/calendar-helper.ts");



function createCustomMonthPicker(params) {
    let selectedMonth = params.value || "";
    let currentYear = new Date().getFullYear();
    const rootAttrs = {
        class: `custom-month-picker${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        rootAttrs.id = params.id;
    const calendarEl = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        attrs: { class: "custom-month-picker-calendar" },
        style: { display: "none" },
    });
    function render() {
        return [
            (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.createCalendarHeader)(String(currentYear), () => { currentYear--; calendarEl.replaceChildren(...render()); }, () => { currentYear++; calendarEl.replaceChildren(...render()); }),
            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                tag: "div",
                attrs: { class: "month-grid" },
                children: (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.monthNames)().map((m, i) => {
                    const monthStr = `${currentYear}-${String(i + 1).padStart(2, "0")}`;
                    const isSelected = monthStr === selectedMonth;
                    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                        tag: "span",
                        text: (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.monthNamesShort)()[i],
                        attrs: { class: `month-item${isSelected ? " selected" : ""}` },
                        handleEvent: {
                            event: "click",
                            cb: (e) => {
                                e.stopPropagation();
                                selectedMonth = monthStr;
                                input.value = `${m} ${currentYear}`;
                                calendarEl.style.display = "none";
                                params.onChange?.(monthStr);
                            },
                        },
                    });
                }),
            }),
        ];
    }
    calendarEl.append(...render());
    const input = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "input",
        attrs: {
            type: "text",
            readonly: "true",
            class: "custom-month-picker-input",
            placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("picker.month", "Válassz hónapot…"),
            ...(params.id ? { id: `${params.id}-input` } : {}),
            ...(selectedMonth ? { value: selectedMonth } : {}),
        },
        handleEvent: {
            event: "click",
            cb: (e) => {
                e.stopPropagation();
                (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.toggleCalendar)(calendarEl, () => calendarEl.replaceChildren(...render()));
            },
        },
    });
    (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.setupCalendarCloseHandler)(calendarEl);
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: rootAttrs,
        children: [
            ...(params.labelText ? [(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "label", text: params.labelText, attrs: { class: "custom-month-picker-label" } })] : []),
            { tag: "div", attrs: { class: "custom-month-picker-wrapper" }, children: [input, calendarEl] },
        ],
    });
}


/***/ },

/***/ "./src/components/createCustomSelect.ts"
/*!**********************************************!*\
  !*** ./src/components/createCustomSelect.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCustomSelect: () => (/* binding */ createCustomSelect)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");


function createCustomSelect(params) {
    let selectedValue = params.value;
    let isOpen = false;
    const rootAttrs = {
        class: `custom-select${params.class ? ` ${params.class}` : ""}`,
        "data-value": selectedValue != null ? String(selectedValue) : "",
    };
    if (params.id)
        rootAttrs.id = params.id;
    /** A trigger felirata: a kiválasztott opció szövege, különben a placeholder (az aktuális nyelven) */
    const triggerText = () => (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(params.options.find((o) => o.value === selectedValue)?.text ?? params.placeholder);
    const displayLabel = triggerText();
    const selectedAttrs = { class: "custom-select-trigger" };
    const optionsListAttrs = { class: "custom-select-options" };
    const optionElements = params.options.map((opt) => {
        const optAttrs = {
            class: `custom-select-option${opt.value === selectedValue ? " selected" : ""}`,
            "data-value": String(opt.value),
        };
        return {
            tag: "div",
            text: opt.text,
            attrs: optAttrs,
            handleEvent: {
                event: "click",
                cb: () => {
                    selectedValue = opt.value;
                    root.setAttribute("data-value", String(opt.value));
                    triggerSpan.textContent = triggerText();
                    triggerSpan.classList.remove("placeholder");
                    root.querySelectorAll(".custom-select-option").forEach((el) => {
                        el.classList.remove("selected");
                    });
                    optionElements.find((_, i) => params.options[i].value === opt.value)?.attrs?.class?.includes("selected");
                    const allOpts = root.querySelectorAll(".custom-select-option");
                    allOpts.forEach((el) => {
                        if (el.getAttribute("data-value") === String(opt.value)) {
                            el.classList.add("selected");
                        }
                        else {
                            el.classList.remove("selected");
                        }
                    });
                    isOpen = false;
                    root.classList.remove("open");
                    optionsList.style.display = "none";
                    params.onChange?.(opt.value);
                },
            },
        };
    });
    const triggerSpan = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "span",
        text: displayLabel,
        attrs: { class: `custom-select-trigger${!displayLabel ? " placeholder" : ""}` },
    });
    const optionsList = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        attrs: optionsListAttrs,
        children: optionElements,
        style: { display: "none" },
    });
    const root = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: rootAttrs,
        children: [
            ...(params.labelText
                ? [{ tag: "label", text: params.labelText, attrs: { class: "custom-select-label", for: params.id } }]
                : []),
            {
                tag: "div",
                attrs: { class: "custom-select-trigger-wrapper" },
                children: [triggerSpan, { tag: "span", text: "\u25BC", attrs: { class: "custom-select-arrow" } }],
                handleEvent: {
                    event: "click",
                    cb: () => {
                        isOpen = !isOpen;
                        root.classList.toggle("open", isOpen);
                        optionsList.style.display = isOpen ? "block" : "none";
                    },
                },
            },
            optionsList,
        ],
    });
    const closeHandler = (e) => {
        if (!root.contains(e.target)) {
            isOpen = false;
            root.classList.remove("open");
            optionsList.style.display = "none";
        }
    };
    document.addEventListener("click", closeHandler);
    // nyelvváltáskor a trigger felirata az aktuális kiválasztás szerint frissül
    (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.watchLocale)(root, () => {
        triggerSpan.textContent = triggerText();
        triggerSpan.classList.toggle("placeholder", !triggerSpan.textContent);
    });
    return root;
}


/***/ },

/***/ "./src/components/createCustomWeekPicker.ts"
/*!**************************************************!*\
  !*** ./src/components/createCustomWeekPicker.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCustomWeekPicker: () => (/* binding */ createCustomWeekPicker)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");
/* harmony import */ var _calendar_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar-helper */ "./src/components/calendar-helper.ts");



function createCustomWeekPicker(params) {
    let selectedWeek = params.value || "";
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    const rootAttrs = {
        class: `custom-week-picker${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        rootAttrs.id = params.id;
    const input = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "input",
        attrs: {
            type: "text",
            readonly: "true",
            class: "custom-week-picker-input",
            placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("picker.week", "Válassz hetet…"),
            ...(params.id ? { id: `${params.id}-input` } : {}),
            ...(selectedWeek ? { value: selectedWeek } : {}),
        },
        handleEvent: {
            event: "click",
            cb: (e) => {
                e.stopPropagation();
                (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.toggleCalendar)(calendarEl, () => calendarEl.replaceChildren(...render()));
            },
        },
    });
    const calendarEl = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        attrs: { class: "custom-week-picker-calendar" },
        style: { display: "none" },
    });
    function render() {
        const weeks = (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.getWeeksInMonth)(currentYear, currentMonth);
        return [
            (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.createCalendarHeader)(`${(0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.monthNames)()[currentMonth]} ${currentYear}`, () => {
                currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                if (currentMonth === 11)
                    currentYear--;
                calendarEl.replaceChildren(...render());
            }, () => {
                currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
                if (currentMonth === 0)
                    currentYear++;
                calendarEl.replaceChildren(...render());
            }),
            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                tag: "div",
                attrs: { class: "week-list" },
                children: weeks.map((w) => {
                    const weekStr = `${currentYear}-W${String(w).padStart(2, "0")}`;
                    const isSelected = weekStr === selectedWeek;
                    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                        tag: "span",
                        text: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.tr)("cdb.picker.week.label", { n: w }, "{n}. hét"),
                        attrs: { class: `week-item${isSelected ? " selected" : ""}` },
                        handleEvent: {
                            event: "click",
                            cb: (e) => {
                                e.stopPropagation();
                                selectedWeek = weekStr;
                                input.value = weekStr;
                                calendarEl.style.display = "none";
                                params.onChange?.(weekStr);
                            },
                        },
                    });
                }),
            }),
        ];
    }
    calendarEl.append(...render());
    (0,_calendar_helper__WEBPACK_IMPORTED_MODULE_2__.setupCalendarCloseHandler)(calendarEl);
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: rootAttrs,
        children: [
            ...(params.labelText ? [(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "label", text: params.labelText, attrs: { class: "custom-week-picker-label" } })] : []),
            { tag: "div", attrs: { class: "custom-week-picker-wrapper" }, children: [input, calendarEl] },
        ],
    });
}


/***/ },

/***/ "./src/components/createDivider.ts"
/*!*****************************************!*\
  !*** ./src/components/createDivider.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDivider: () => (/* binding */ createDivider)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createDivider(params) {
    const rootAttrs = { class: `divider${params.class ? ` ${params.class}` : ""}` };
    if (params.id)
        rootAttrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "hr", parent: params.parent, attrs: rootAttrs });
}


/***/ },

/***/ "./src/components/createDragAndDropFileInput.ts"
/*!******************************************************!*\
  !*** ./src/components/createDragAndDropFileInput.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDragAndDropFileInput: () => (/* binding */ createDragAndDropFileInput)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");


function formatSize(bytes) {
    if (bytes < 1024)
        return bytes + " B";
    if (bytes < 1024 * 1024)
        return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
function getFileIcon(name) {
    const ext = name.split(".").pop()?.toLowerCase() || "";
    const iconMap = {
        pdf: "\uD83D\uDCC4", jpg: "\uD83D\uDDBC", jpeg: "\uD83D\uDDBC",
        png: "\uD83D\uDDBC", gif: "\uD83C\uDFAC", svg: "\uD83D\uDD8C",
        doc: "\uD83D\uDCDD", docx: "\uD83D\uDCDD", xls: "\uD83D\uDCCA", xlsx: "\uD83D\uDCCA",
        zip: "\uD83D\uDCE6", rar: "\uD83D\uDCE6", "7z": "\uD83D\uDCE6",
        mp4: "\uD83C\uDFA5", mov: "\uD83C\uDFA5", mp3: "\uD83C\uDFB5",
        json: "{ }", ts: "TS", js: "JS", css: "CSS", html: "HTML",
    };
    return iconMap[ext] || "\uD83D\uDCC1";
}
function createDragAndDropFileInput(params) {
    let files = [];
    const rootAttrs = {
        class: `drag-and-drop${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        rootAttrs.id = params.id;
    const fileListAttrs = { class: "dd-file-list" };
    function renderFileList() {
        if (files.length === 0)
            return [];
        return files.map((file, i) => (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
            tag: "div",
            attrs: { class: "dd-file-item" },
            children: [
                (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "span", text: getFileIcon(file.name), attrs: { class: "dd-file-icon" } }),
                (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                    tag: "div",
                    attrs: { class: "dd-file-info" },
                    children: [
                        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "span", text: file.name, attrs: { class: "dd-file-name" } }),
                        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "span", text: formatSize(file.size), attrs: { class: "dd-file-size" } }),
                    ],
                }),
                (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                    tag: "button",
                    text: "\u00D7",
                    attrs: { class: "dd-file-remove" },
                    handleEvent: {
                        event: "click",
                        cb: (e) => {
                            e.stopPropagation();
                            files.splice(i, 1);
                            fileListEl.replaceChildren(...renderFileList());
                            params.onFiles?.(files);
                        },
                    },
                }),
            ],
        }));
    }
    const fileListEl = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "div", attrs: fileListAttrs });
    fileListEl.append(...renderFileList());
    const hiddenInput = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "input",
        attrs: {
            type: "file",
            class: "dd-hidden-input",
            ...(params.multiple ? { multiple: "true" } : {}),
            ...(params.accept ? { accept: params.accept.join(",") } : {}),
        },
        handleEvent: {
            event: "change",
            cb: (e) => {
                const inputEl = e.target;
                if (inputEl.files) {
                    const newFiles = Array.from(inputEl.files);
                    if (params.maxFiles) {
                        const allowed = params.maxFiles - files.length;
                        files.push(...newFiles.slice(0, allowed));
                    }
                    else {
                        files.push(...newFiles);
                    }
                    fileListEl.replaceChildren(...renderFileList());
                    params.onFiles?.(files);
                    inputEl.value = "";
                }
            },
        },
    });
    const dropIcon = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "div", text: "\u2B06", attrs: { class: "dd-drop-icon" } });
    const dropText = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        attrs: { class: "dd-drop-text" },
        children: [
            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "span", text: params.dropText || (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("dropzone.title", "Húzd ide a fájlokat"), attrs: { class: "dd-drop-title" } }),
            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "span", text: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("dropzone.sub", "vagy kattints a tallózáshoz"), attrs: { class: "dd-drop-sub" } }),
        ],
    });
    const dropHint = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        attrs: { class: "dd-drop-hint" },
        text: params.accept
            ? (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.tr)("cdb.dropzone.accepted", { types: `.${params.accept.join(", .")}` }, "{types} fájlok")
            : (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("dropzone.any", "Bármilyen fájl támogatott"),
    });
    const dropzone = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        attrs: { class: "dd-dropzone" },
        children: [dropIcon, dropText, dropHint, fileListEl],
    });
    dropzone.addEventListener("click", () => {
        hiddenInput.click();
    });
    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add("dd-drag-over");
    });
    dropzone.addEventListener("dragenter", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add("dd-drag-over");
    });
    dropzone.addEventListener("dragleave", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!dropzone.contains(e.relatedTarget)) {
            dropzone.classList.remove("dd-drag-over");
        }
    });
    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove("dd-drag-over");
        if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files);
            if (params.maxFiles) {
                const allowed = params.maxFiles - files.length;
                files.push(...newFiles.slice(0, allowed));
            }
            else {
                files.push(...newFiles);
            }
            fileListEl.replaceChildren(...renderFileList());
            params.onFiles?.(files);
        }
    });
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div", parent: params.parent, attrs: rootAttrs,
        children: [
            ...(params.labelText
                ? [(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "label", text: params.labelText, attrs: { class: "dd-label" } })]
                : []),
            dropzone,
            hiddenInput,
        ],
    });
}


/***/ },

/***/ "./src/components/createDrawer.ts"
/*!****************************************!*\
  !*** ./src/components/createDrawer.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeDrawer: () => (/* binding */ closeDrawer),
/* harmony export */   createDrawer: () => (/* binding */ createDrawer),
/* harmony export */   openDrawer: () => (/* binding */ openDrawer)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");
/* harmony import */ var _createMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createMenu */ "./src/components/createMenu.ts");



function createDrawer(params) {
    const id = params.id;
    const defaultState = params.defaultState || "closed";
    const hasOverlay = params.hasOverlay ?? false;
    const mode = params.mode || "overlay";
    let overlay = null;
    if (hasOverlay) {
        overlay = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
            tag: "div",
            attrs: { class: "drawer-overlay", id: `${id}-overlay` },
            handleEvent: {
                event: "click",
                cb: () => closeDrawer(id),
            },
        });
    }
    // Backward compatibility: if items is provided (without children), wrap in createMenu
    const drawerChildren = params.children
        ? params.children
        : params.items
            ? [(0,_createMenu__WEBPACK_IMPORTED_MODULE_2__.createMenu)({ id, items: params.items })]
            : [];
    const sidebar = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        attrs: {
            class: `drawer-sidebar${mode === "push" ? " drawer-push" : ""}`,
            id: `${id}-sidebar`,
            "data-drawer-mode": mode,
        },
        children: [
            {
                tag: "div",
                attrs: { class: "drawer-header" },
                children: [
                    {
                        tag: "span",
                        text: params.title || (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("drawer.title", "Menu"),
                        attrs: { class: "drawer-title" },
                    },
                    {
                        tag: "button",
                        text: "\u00D7",
                        attrs: { class: "drawer-close-btn" },
                        handleEvent: {
                            event: "click",
                            cb: () => closeDrawer(id),
                        },
                    },
                ],
            },
            ...drawerChildren,
        ],
    });
    if (overlay)
        document.body.appendChild(overlay);
    document.body.appendChild(sidebar);
    if (defaultState === "open") {
        openDrawer(id);
    }
    return sidebar;
}
function openDrawer(id = "sidebar-drawer") {
    const sidebar = document.getElementById(`${id}-sidebar`);
    if (!sidebar)
        return;
    const mode = sidebar.dataset.drawerMode || "overlay";
    const openedBefore = sidebar.dataset.drawerOpenedBefore === "true";
    if (openedBefore) {
        document.body.classList.add("drawer-transition");
    }
    else {
        sidebar.dataset.drawerOpenedBefore = "true";
    }
    const overlay = document.getElementById(`${id}-overlay`);
    if (overlay)
        overlay.classList.add("open");
    sidebar.classList.add("open");
    if (mode === "push") {
        document.body.classList.add("drawer-push-open");
    }
}
function closeDrawer(id = "sidebar-drawer") {
    const sidebar = document.getElementById(`${id}-sidebar`);
    if (!sidebar)
        return;
    const openedBefore = sidebar.dataset.drawerOpenedBefore === "true";
    if (openedBefore) {
        document.body.classList.add("drawer-transition");
    }
    const overlay = document.getElementById(`${id}-overlay`);
    if (overlay)
        overlay.classList.remove("open");
    sidebar.classList.remove("open");
    // A tartalom eltolása csak akkor szűnik meg, ha már egyetlen push módú drawer sincs nyitva
    if (!document.querySelector(".drawer-sidebar.drawer-push.open")) {
        document.body.classList.remove("drawer-push-open");
    }
}


/***/ },

/***/ "./src/components/createForm.ts"
/*!**************************************!*\
  !*** ./src/components/createForm.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createForm: () => (/* binding */ createForm)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");
/* harmony import */ var _inputs_createTextInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/createTextInput */ "./src/inputs/createTextInput.ts");
/* harmony import */ var _inputs_createTelInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../inputs/createTelInput */ "./src/inputs/createTelInput.ts");
/* harmony import */ var _inputs_createUrlInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../inputs/createUrlInput */ "./src/inputs/createUrlInput.ts");
/* harmony import */ var _inputs_createSearchInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../inputs/createSearchInput */ "./src/inputs/createSearchInput.ts");
/* harmony import */ var _inputs_createEmailInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../inputs/createEmailInput */ "./src/inputs/createEmailInput.ts");
/* harmony import */ var _inputs_createPasswordInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../inputs/createPasswordInput */ "./src/inputs/createPasswordInput.ts");
/* harmony import */ var _inputs_createNumberInput__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../inputs/createNumberInput */ "./src/inputs/createNumberInput.ts");
/* harmony import */ var _inputs_createDateInput__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../inputs/createDateInput */ "./src/inputs/createDateInput.ts");
/* harmony import */ var _inputs_createDatetimeInput__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../inputs/createDatetimeInput */ "./src/inputs/createDatetimeInput.ts");
/* harmony import */ var _inputs_createTimeInput__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../inputs/createTimeInput */ "./src/inputs/createTimeInput.ts");
/* harmony import */ var _inputs_createMonthInput__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../inputs/createMonthInput */ "./src/inputs/createMonthInput.ts");
/* harmony import */ var _inputs_createWeekInput__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../inputs/createWeekInput */ "./src/inputs/createWeekInput.ts");
/* harmony import */ var _inputs_createCheckbox__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../inputs/createCheckbox */ "./src/inputs/createCheckbox.ts");
/* harmony import */ var _inputs_createColorInput__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../inputs/createColorInput */ "./src/inputs/createColorInput.ts");
/* harmony import */ var _inputs_createFileInput__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../inputs/createFileInput */ "./src/inputs/createFileInput.ts");
/* harmony import */ var _inputs_createRangeInput__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../inputs/createRangeInput */ "./src/inputs/createRangeInput.ts");
/* harmony import */ var _inputs_createHiddenInput__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../inputs/createHiddenInput */ "./src/inputs/createHiddenInput.ts");
/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../buttons */ "./src/buttons/index.ts");
/* harmony import */ var _selection_createSelect__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../selection/createSelect */ "./src/selection/createSelect.ts");
/* harmony import */ var _selection_createRadio__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../selection/createRadio */ "./src/selection/createRadio.ts");
/* harmony import */ var _createTextarea__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./createTextarea */ "./src/components/createTextarea.ts");


/** Gomb-felirat: a megadott érték (szöveg / tr() / szám), különben az alapértelmezett */
const txt = (v, fallback) => v == null || v === "" ? fallback : typeof v === "number" ? String(v) : v;





















function cast(input) {
    return input;
}
function getInputFactory(type) {
    const map = {
        text: (p, i) => (0,_inputs_createTextInput__WEBPACK_IMPORTED_MODULE_2__.createTextInput)({ ...cast(i), parent: p, type: "text" }),
        tel: (p, i) => (0,_inputs_createTelInput__WEBPACK_IMPORTED_MODULE_3__.createTelInput)({ ...cast(i), parent: p, type: "tel" }),
        url: (p, i) => (0,_inputs_createUrlInput__WEBPACK_IMPORTED_MODULE_4__.createUrlInput)({ ...cast(i), parent: p, type: "url" }),
        search: (p, i) => (0,_inputs_createSearchInput__WEBPACK_IMPORTED_MODULE_5__.createSearchInput)({ ...cast(i), parent: p, type: "search" }),
        email: (p, i) => (0,_inputs_createEmailInput__WEBPACK_IMPORTED_MODULE_6__.createEmailInput)({ ...cast(i), parent: p, type: "email" }),
        password: (p, i) => (0,_inputs_createPasswordInput__WEBPACK_IMPORTED_MODULE_7__.createPasswordInput)({ ...cast(i), parent: p, type: "password" }),
        number: (p, i) => (0,_inputs_createNumberInput__WEBPACK_IMPORTED_MODULE_8__.createNumberInput)({ ...cast(i), parent: p, type: "number" }),
        date: (p, i) => (0,_inputs_createDateInput__WEBPACK_IMPORTED_MODULE_9__.createDateInput)({ ...cast(i), parent: p, type: "date" }),
        "datetime-local": (p, i) => (0,_inputs_createDatetimeInput__WEBPACK_IMPORTED_MODULE_10__.createDatetimeInput)({ ...cast(i), parent: p, type: "datetime-local" }),
        time: (p, i) => (0,_inputs_createTimeInput__WEBPACK_IMPORTED_MODULE_11__.createTimeInput)({ ...cast(i), parent: p, type: "time" }),
        month: (p, i) => (0,_inputs_createMonthInput__WEBPACK_IMPORTED_MODULE_12__.createMonthInput)({ ...cast(i), parent: p, type: "month" }),
        week: (p, i) => (0,_inputs_createWeekInput__WEBPACK_IMPORTED_MODULE_13__.createWeekInput)({ ...cast(i), parent: p, type: "week" }),
        checkbox: (p, i) => (0,_inputs_createCheckbox__WEBPACK_IMPORTED_MODULE_14__.createCheckbox)({ ...cast(i), parent: p, type: "checkbox" }),
        color: (p, i) => (0,_inputs_createColorInput__WEBPACK_IMPORTED_MODULE_15__.createColorInput)({ ...cast(i), parent: p, type: "color" }),
        file: (p, i) => (0,_inputs_createFileInput__WEBPACK_IMPORTED_MODULE_16__.createFileInput)({ ...cast(i), parent: p, type: "file" }),
        range: (p, i) => (0,_inputs_createRangeInput__WEBPACK_IMPORTED_MODULE_17__.createRangeInput)({ ...cast(i), parent: p, type: "range" }),
        hidden: (p, i) => (0,_inputs_createHiddenInput__WEBPACK_IMPORTED_MODULE_18__.createHiddenInput)({ ...cast(i), parent: p, type: "hidden" }),
        select: (p, i) => (0,_selection_createSelect__WEBPACK_IMPORTED_MODULE_20__.createSelect)({ ...cast(i), parent: p, options: i.options || [] }),
        radio: (p, i) => (0,_selection_createRadio__WEBPACK_IMPORTED_MODULE_21__.createRadio)({ ...cast(i), parent: p, options: (i.options || []) }),
        textarea: (p, i) => (0,_createTextarea__WEBPACK_IMPORTED_MODULE_22__.createTextarea)({ ...cast({ ...i, type: "textarea" }), parent: p }),
        button: (p, i) => (0,_buttons__WEBPACK_IMPORTED_MODULE_19__.createButtonInput)({ ...cast(i), parent: p, type: "button", text: txt(i.value ?? i.placeholder, "") }),
        submit: (p, i) => (0,_buttons__WEBPACK_IMPORTED_MODULE_19__.createSubmitInput)({ ...cast(i), parent: p, type: "submit", text: txt(i.value ?? i.placeholder, (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("form.submit", "Küldés")) }),
        reset: (p, i) => (0,_buttons__WEBPACK_IMPORTED_MODULE_19__.createResetInput)({ ...cast(i), parent: p, type: "reset", text: txt(i.value ?? i.placeholder, (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("form.reset", "Visszaállítás")) }),
    };
    return map[type] || null;
}
function createForm(params) {
    const formAttrs = {};
    if (params.id)
        formAttrs.id = params.id;
    if (params.class)
        formAttrs.class = params.class;
    if (params.action)
        formAttrs.action = params.action;
    if (params.method)
        formAttrs.method = params.method;
    const form = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "form",
        parent: params.parent,
        attrs: formAttrs,
        handleEvent: params.onSubmit
            ? [{ event: "submit", cb: (e) => { e.preventDefault(); params.onSubmit(e); } }]
            : undefined,
    });
    for (const input of params.inputs) {
        const factory = getInputFactory(input.type);
        if (factory) {
            factory(form, input);
        }
    }
    return form;
}


/***/ },

/***/ "./src/components/createGantt.ts"
/*!***************************************!*\
  !*** ./src/components/createGantt.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGantt: () => (/* binding */ createGantt)
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");

function parseDate(v) {
    if (v instanceof Date)
        return { y: v.getFullYear(), m: v.getMonth(), d: v.getDate() };
    const match = /^\s*(\d{4})-(\d{1,2})(?:-(\d{1,2}))?/.exec(v);
    if (match)
        return { y: Number(match[1]), m: Number(match[2]) - 1, d: match[3] ? Number(match[3]) : null };
    const date = new Date(v);
    if (isNaN(date.getTime()))
        throw new Error(`createGantt: érvénytelen dátum: "${String(v)}"`);
    return { y: date.getFullYear(), m: date.getMonth(), d: date.getDate() };
}
const daysIn = (y, m) => new Date(y, m + 1, 0).getDate();
/**
 * Tört hónap-szám az időtengelyen (év*12 + hónap + a hónapon belüli hányad).
 * `start`: a hónap / nap eleje, `end`: a hónap / nap vége (befejezett időszaknál), `mid`: a közepe.
 */
function monthPos(p, edge) {
    const base = p.y * 12 + p.m;
    if (p.d === null)
        return base + (edge === "start" ? 0 : edge === "end" ? 1 : 0.5);
    const dim = daysIn(p.y, p.m);
    return base + (edge === "start" ? p.d - 1 : edge === "end" ? p.d : p.d - 0.5) / dim;
}
const DEFAULT_COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#06b6d4", "#e05aab", "#8b5cf6", "#ff7024", "#ef4444"];
const states = new WeakMap();
function assignColors(state, rows) {
    for (const r of rows) {
        if (!state.colors.has(r.id))
            state.colors.set(r.id, DEFAULT_COLORS[state.colors.size % DEFAULT_COLORS.length]);
    }
}
function el(tag, className, text) {
    const e = document.createElement(tag);
    if (className)
        e.className = className;
    if (text !== undefined)
        e.textContent = text;
    return e;
}
const pctStr = (n) => `${Math.round(n * 1000) / 1000}%`;
/** A még tartó sáv vége: a mai nap + `ongoingDays` */
function ongoingEndPos(params) {
    const t = parseDate(params.today ?? new Date());
    const d = new Date(t.y, t.m, t.d ?? 1);
    d.setDate(d.getDate() + (params.ongoingDays ?? 30));
    return monthPos(parseDate(d), "start");
}
function computeLayout(state) {
    const { params, rows } = state;
    const today = parseDate(params.today ?? new Date());
    const todayAbs = monthPos(today, "mid");
    const ongoingEnd = ongoingEndPos(params);
    const values = [];
    for (const r of rows) {
        values.push(monthPos(parseDate(r.start), "start"));
        values.push(r.end ? monthPos(parseDate(r.end), "end") : ongoingEnd);
        for (const m of r.milestones ?? [])
            values.push(monthPos(parseDate(m.date), "mid"));
    }
    let from = params.from ? Math.floor(monthPos(parseDate(params.from), "start")) : NaN;
    let to = params.to ? Math.ceil(monthPos(parseDate(params.to), "end")) : NaN;
    if (isNaN(from))
        from = values.length ? Math.floor(Math.min(...values)) : Math.floor(todayAbs);
    if (isNaN(to))
        to = values.length ? Math.ceil(Math.max(...values)) : from + 12;
    if (to <= from)
        to = from + 1;
    const total = to - from;
    const monthWidth = params.monthWidth ?? 20;
    return {
        from,
        to,
        total,
        pct: (abs) => ((abs - from) / total) * 100,
        todayAbs,
        fit: monthWidth <= 0,
        trackWidth: total * monthWidth,
    };
}
function formatMonthYear(p) {
    const date = new Date(p.y, p.m, p.d ?? 1);
    const opts = p.d === null ? { year: "numeric", month: "short" } : { year: "numeric", month: "short", day: "numeric" };
    return new Intl.DateTimeFormat((0,_i18n__WEBPACK_IMPORTED_MODULE_0__.getLocale)(), opts).format(date);
}
function periodText(row) {
    if (row.periodLabel !== undefined)
        return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(row.periodLabel);
    const start = formatMonthYear(parseDate(row.start));
    const end = row.end ? formatMonthYear(parseDate(row.end)) : (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)((0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("gantt.ongoing", "jelenleg"));
    return `${start} – ${end}`;
}
function buildAxis(state, layout) {
    const { params } = state;
    const { from, to, total, pct } = layout;
    const monthWidth = params.monthWidth ?? 20;
    const mode = params.axis && params.axis !== "auto"
        ? params.axis
        : layout.fit
            ? total <= 18 ? "months" : "quarters"
            : monthWidth >= 36 ? "months" : "quarters";
    const axis = el("div", "gantt-axis");
    const years = el("div", "gantt-years");
    const sub = el("div", "gantt-sub");
    const lines = [];
    for (let y = Math.floor(from / 12); y <= Math.floor((to - 1) / 12); y++) {
        const a = Math.max(from, y * 12);
        const b = Math.min(to, (y + 1) * 12);
        const cell = el("div", "gantt-year", String(y));
        cell.style.left = pctStr(pct(a));
        cell.style.width = pctStr(pct(b) - pct(a));
        years.appendChild(cell);
    }
    const step = mode === "months" ? 1 : 3;
    const monthFmt = new Intl.DateTimeFormat((0,_i18n__WEBPACK_IMPORTED_MODULE_0__.getLocale)(), { month: "short" });
    for (let s = Math.floor(from / step) * step; s < to; s += step) {
        const a = Math.max(from, s);
        const b = Math.min(to, s + step);
        const label = mode === "months" ? monthFmt.format(new Date(2000, ((s % 12) + 12) % 12, 1)) : `Q${(((s % 12) + 12) % 12) / 3 + 1}`;
        const cell = el("div", "gantt-tick", label);
        cell.style.left = pctStr(pct(a));
        cell.style.width = pctStr(pct(b) - pct(a));
        sub.appendChild(cell);
        if (s > from) {
            const line = el("div", `gantt-line${s % 12 === 0 ? " is-year" : ""}`);
            line.style.left = pctStr(pct(s));
            lines.push(line);
        }
    }
    axis.append(years, sub);
    return { axis, lines };
}
function buildMilestone(state, row, ms, idx, layout, track) {
    const abs = monthPos(parseDate(ms.date), "mid");
    const left = pctStr(layout.pct(abs));
    const placement = ms.placement ?? "inside";
    const label = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(ms.label);
    const past = !!state.params.dimPast && abs < layout.todayAbs;
    const color = ms.color;
    const picked = ms.id !== undefined && ms.id === state.selectedMs ? " is-selected" : "";
    const mark = el("button", `gantt-mark is-${ms.shape ?? "dot"}${past ? " is-past" : ""}${picked}`);
    mark.type = "button";
    if (ms.id !== undefined)
        mark.dataset.msId = ms.id;
    mark.dataset.row = row.id;
    mark.dataset.ms = String(idx);
    mark.style.left = left;
    mark.setAttribute("aria-label", label);
    if (color)
        mark.style.setProperty("--gantt-ms-color", color);
    if (placement === "inside") {
        mark.title = label;
        mark.appendChild(el("span", "gantt-tip", label));
        track.appendChild(mark);
        return;
    }
    const line = el("span", `gantt-ms-line is-${placement}${past ? " is-past" : ""}`);
    line.style.left = left;
    if (color)
        line.style.setProperty("--gantt-ms-color", color);
    const card = el("button", `gantt-card is-${placement}${past ? " is-past" : ""}${ms.shape === "diamond" ? " is-final" : ""}${picked}`);
    card.type = "button";
    if (ms.id !== undefined)
        card.dataset.msId = ms.id;
    card.dataset.row = row.id;
    card.dataset.ms = String(idx);
    card.style.left = left;
    if (color)
        card.style.setProperty("--gantt-ms-color", color);
    if (ms.caption !== undefined)
        card.appendChild(el("span", "gantt-card-caption", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(ms.caption)));
    card.appendChild(el("span", "gantt-card-label", label));
    if (ms.meta !== undefined)
        card.appendChild(el("span", "gantt-card-meta", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(ms.meta)));
    if (ms.flag) {
        const flag = el("span", "gantt-flag", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(ms.flag.text));
        if (ms.flag.title !== undefined)
            flag.title = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(ms.flag.title);
        card.appendChild(flag);
    }
    track.append(line, card, mark);
}
function buildRow(state, row, layout) {
    const { params } = state;
    const hasCards = (row.milestones ?? []).some((m) => m.placement === "above" || m.placement === "below");
    const height = hasCards ? params.cardRowHeight ?? 128 : params.rowHeight ?? 60;
    const color = row.color ?? state.colors.get(row.id) ?? DEFAULT_COLORS[0];
    const period = periodText(row);
    const title = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(row.label);
    const rowEl = el("div", `gantt-row${hasCards ? " has-cards" : ""}${state.selected === row.id ? " is-active" : ""}`);
    rowEl.dataset.id = row.id;
    rowEl.style.height = `${height}px`;
    rowEl.style.setProperty("--gantt-color", color);
    const label = el("div", "gantt-label");
    label.tabIndex = 0;
    label.setAttribute("role", "button");
    label.setAttribute("aria-pressed", String(state.selected === row.id));
    label.setAttribute("aria-label", period ? `${title}, ${period}` : title);
    if (params.draggableRows)
        label.draggable = true;
    label.appendChild(el("div", "gantt-label-title", title));
    if (row.sublabel !== undefined)
        label.appendChild(el("div", "gantt-label-sub", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(row.sublabel)));
    if (period)
        label.appendChild(el("div", "gantt-label-period", period));
    const track = el("div", "gantt-track");
    const startPct = Math.max(0, layout.pct(monthPos(parseDate(row.start), "start")));
    const ongoing = !row.end;
    const endAbs = row.end ? monthPos(parseDate(row.end), "end") : ongoingEndPos(params);
    const endPct = Math.min(100, layout.pct(endAbs));
    const bar = el("div", `gantt-bar${ongoing ? " is-current" : ""}`);
    bar.dataset.row = row.id;
    bar.tabIndex = 0;
    bar.setAttribute("role", "button");
    bar.setAttribute("aria-label", `${period ? `${title}, ${period}` : title}${ongoing ? `, ${(0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)((0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("gantt.current", "folyamatban"))}` : ""}`);
    bar.style.left = pctStr(startPct);
    bar.style.width = pctStr(Math.max(0.4, endPct - startPct));
    if (!hasCards || params.barStyle !== "thin") {
        const text = row.barLabel !== undefined ? (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(row.barLabel) : [title, row.sublabel !== undefined ? (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(row.sublabel) : ""].filter(Boolean).join(" · ");
        bar.appendChild(el("span", "gantt-bar-text", params.barStyle === "thin" ? "" : text));
    }
    track.appendChild(bar);
    (row.milestones ?? []).forEach((ms, i) => buildMilestone(state, row, ms, i, layout, track));
    rowEl.append(label, track);
    return rowEl;
}
function orderedSections(state) {
    const groups = state.params.groups ?? [];
    const known = new Set(groups.map((g) => g.id));
    const sections = [];
    const loose = state.rows.filter((r) => !r.group || !known.has(r.group));
    if (loose.length)
        sections.push({ group: null, rows: loose });
    for (const g of groups) {
        const rows = state.rows.filter((r) => r.group === g.id);
        if (rows.length)
            sections.push({ group: g, rows });
    }
    return sections;
}
function render(root) {
    const state = states.get(root);
    if (!state)
        return;
    const { params } = state;
    const prevScroll = root.querySelector(".gantt-scroll")?.scrollLeft;
    const layout = computeLayout(state);
    const labelWidth = params.labelWidth ?? 220;
    root.classList.toggle("is-fit", layout.fit);
    root.classList.toggle("is-thin", params.barStyle === "thin");
    root.classList.toggle("is-dragscroll", !!params.dragScroll);
    root.style.setProperty("--gantt-label-w", `${labelWidth}px`);
    root.style.setProperty("--gantt-track-w", layout.fit ? "480px" : `${layout.trackWidth}px`);
    if (state.rows.length === 0) {
        root.replaceChildren(el("div", "gantt-empty", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(params.emptyText ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("gantt.empty", "Nincs megjeleníthető sor"))));
        return;
    }
    const showToday = params.showToday !== false && layout.todayAbs >= layout.from && layout.todayAbs <= layout.to;
    const showBubble = showToday && params.todayLabel !== false;
    const scroll = el("div", "gantt-scroll");
    const chart = el("div", "gantt-chart");
    const head = el("div", `gantt-head${showBubble ? " has-today" : ""}`);
    const corner = el("div", "gantt-corner", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(params.labelHeader ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("gantt.task", "Feladat")));
    const { axis, lines } = buildAxis(state, layout);
    head.append(corner, axis);
    chart.appendChild(head);
    const body = el("div", "gantt-body");
    let n = 0;
    for (const section of orderedSections(state)) {
        if (section.group) {
            const g = el("div", "gantt-group");
            g.append(el("div", "gantt-group-label", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(section.group.label)), el("div", "gantt-group-track"));
            body.appendChild(g);
        }
        for (const row of section.rows) {
            const r = buildRow(state, row, layout);
            if (n++ % 2 === 1)
                r.classList.add("is-alt");
            body.appendChild(r);
        }
    }
    chart.appendChild(body);
    const overlay = el("div", "gantt-overlay");
    overlay.setAttribute("aria-hidden", "true");
    const grid = el("div", "gantt-grid");
    lines.forEach((l) => grid.appendChild(l));
    overlay.appendChild(grid);
    if (showToday) {
        const now = el("div", "gantt-today");
        now.style.left = pctStr(layout.pct(layout.todayAbs));
        const date = new Intl.DateTimeFormat((0,_i18n__WEBPACK_IMPORTED_MODULE_0__.getLocale)(), { month: "short", day: "numeric" }).format((() => {
            const t = parseDate(params.today ?? new Date());
            return new Date(t.y, t.m, t.d ?? 1);
        })());
        now.title = date;
        if (showBubble) {
            now.appendChild(el("span", "gantt-today-bubble", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(params.todayLabel === undefined || params.todayLabel === false ? (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("gantt.today", "Ma") : params.todayLabel)));
        }
        overlay.appendChild(now);
    }
    chart.appendChild(overlay);
    scroll.appendChild(chart);
    // az új tartalom egyben cserél: ha a felépítés közben hiba van, a korábbi tartalom megmarad
    root.replaceChildren(scroll);
    if (prevScroll !== undefined)
        scroll.scrollLeft = prevScroll;
}
/* ===== Viselkedés ===== */
function applySelection(root) {
    const state = states.get(root);
    if (!state)
        return;
    root.querySelectorAll(".gantt-row").forEach((r) => {
        const active = r.dataset.id === state.selected;
        r.classList.toggle("is-active", active);
        r.querySelector(".gantt-label")?.setAttribute("aria-pressed", String(active));
    });
}
function select(root, id, notify) {
    const state = states.get(root);
    if (!state)
        return;
    const row = id === null ? null : state.rows.find((r) => r.id === id) ?? null;
    state.selected = row ? row.id : null;
    applySelection(root);
    if (notify)
        state.params.onSelect?.(row);
}
function selectMilestone(root, id) {
    const state = states.get(root);
    if (!state)
        return;
    state.selectedMs = id;
    root.querySelectorAll(".gantt-mark, .gantt-card").forEach((m) => {
        m.classList.toggle("is-selected", id !== null && m.dataset.msId === id);
    });
}
function moveRow(root, id, targetId, after) {
    const state = states.get(root);
    if (!state || id === targetId)
        return;
    const from = state.rows.findIndex((r) => r.id === id);
    const target = state.rows.find((r) => r.id === targetId);
    if (from < 0 || !target || state.rows[from].group !== target.group)
        return;
    const [moved] = state.rows.splice(from, 1);
    const to = state.rows.findIndex((r) => r.id === targetId);
    state.rows.splice(after ? to + 1 : to, 0, moved);
    render(root);
    state.params.onReorder?.(state.rows.map((r) => r.id));
}
function scrollToToday(root, mode = "today") {
    const scroll = root.querySelector(".gantt-scroll");
    const state = states.get(root);
    if (!scroll || !state)
        return;
    if (mode === "start") {
        scroll.scrollLeft = 0;
        return;
    }
    if (mode === "end") {
        scroll.scrollLeft = scroll.scrollWidth;
        return;
    }
    const layout = computeLayout(state);
    const labelWidth = state.params.labelWidth ?? 220;
    const trackWidth = Math.max(0, scroll.scrollWidth - labelWidth);
    const x = (layout.pct(layout.todayAbs) / 100) * trackWidth - 0.35 * Math.max(0, scroll.clientWidth - labelWidth);
    scroll.scrollLeft = Math.max(0, x);
}
function wire(root) {
    const lookup = (target) => {
        const state = states.get(root);
        const msEl = target.closest(".gantt-mark, .gantt-card");
        if (!state || !msEl || !root.contains(msEl))
            return null;
        const row = state.rows.find((r) => r.id === msEl.dataset.row);
        const ms = row?.milestones?.[Number(msEl.dataset.ms)];
        return row && ms ? { row, ms } : null;
    };
    // rámutatás / fókusz egy mérföldkőre
    let hovered = null;
    const hover = (e) => {
        const state = states.get(root);
        const hit = lookup(e.target);
        const key = hit ? `${hit.row.id}:${hit.row.milestones?.indexOf(hit.ms)}` : null;
        if (key === hovered)
            return;
        hovered = key;
        if (hit)
            state?.params.onMilestoneHover?.(hit.ms, hit.row);
    };
    root.addEventListener("mouseover", hover);
    root.addEventListener("focusin", hover);
    root.addEventListener("mouseleave", () => {
        hovered = null;
    });
    // egérrel húzható görgetés
    let dragMoved = false;
    root.addEventListener("mousedown", (e) => {
        const state = states.get(root);
        const target = e.target;
        const scroller = target.closest(".gantt-scroll");
        if (!state?.params.dragScroll || e.button !== 0 || !scroller || target.closest("button, a, .gantt-label, .gantt-bar"))
            return;
        const startX = e.clientX;
        const startLeft = scroller.scrollLeft;
        dragMoved = false;
        e.preventDefault();
        const move = (ev) => {
            const dx = ev.clientX - startX;
            if (!dragMoved && Math.abs(dx) < 3)
                return;
            dragMoved = true;
            root.classList.add("is-grabbing");
            scroller.scrollLeft = startLeft - dx;
        };
        const up = () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
            root.classList.remove("is-grabbing");
        };
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
    });
    root.addEventListener("click", (e) => {
        if (dragMoved) {
            e.stopPropagation();
            dragMoved = false;
        }
    }, true);
    root.addEventListener("click", (e) => {
        const state = states.get(root);
        if (!state)
            return;
        const target = e.target;
        const msEl = target.closest(".gantt-mark, .gantt-card");
        if (msEl && root.contains(msEl)) {
            const row = state.rows.find((r) => r.id === msEl.dataset.row);
            const ms = row?.milestones?.[Number(msEl.dataset.ms)];
            if (row && ms)
                state.params.onMilestoneClick?.(ms, row);
            return;
        }
        const hit = target.closest(".gantt-label, .gantt-bar");
        if (!hit || !root.contains(hit))
            return;
        const id = hit.closest("[data-id]")?.dataset.id ?? hit.dataset.row;
        const row = state.rows.find((r) => r.id === id);
        if (!row)
            return;
        if (state.params.selectable !== false)
            select(root, state.selected === row.id ? null : row.id, true);
        state.params.onRowClick?.(row);
    });
    root.addEventListener("keydown", (e) => {
        const state = states.get(root);
        const target = e.target;
        if (!state)
            return;
        const label = target.closest(".gantt-label");
        if (label && state.params.draggableRows && e.altKey && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
            e.preventDefault();
            const id = label.closest("[data-id]")?.dataset.id;
            if (!id)
                return;
            const sameGroup = state.rows.filter((r) => r.group === state.rows.find((x) => x.id === id)?.group);
            const i = sameGroup.findIndex((r) => r.id === id);
            const neighbour = sameGroup[i + (e.key === "ArrowUp" ? -1 : 1)];
            if (neighbour) {
                moveRow(root, id, neighbour.id, e.key === "ArrowDown");
                root.querySelector(`.gantt-row[data-id="${CSS.escape(id)}"] .gantt-label`)?.focus();
            }
            return;
        }
        if ((e.key === "Enter" || e.key === " ") && target.matches(".gantt-label, .gantt-bar")) {
            e.preventDefault();
            target.click();
        }
    });
    // húzásos átrendezés (csoporton belül)
    root.addEventListener("dragstart", (e) => {
        const state = states.get(root);
        const label = e.target.closest(".gantt-label");
        if (!state || !state.params.draggableRows || !label)
            return;
        state.dragged = label.closest("[data-id]")?.dataset.id ?? null;
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", state.dragged ?? "");
        }
        label.closest(".gantt-row")?.classList.add("is-dragging");
    });
    const clearOver = () => root.querySelectorAll(".is-drag-over-before, .is-drag-over-after").forEach((x) => x.classList.remove("is-drag-over-before", "is-drag-over-after"));
    root.addEventListener("dragend", () => {
        const state = states.get(root);
        if (state)
            state.dragged = null;
        clearOver();
        root.querySelectorAll(".is-dragging").forEach((x) => x.classList.remove("is-dragging"));
    });
    root.addEventListener("dragover", (e) => {
        const state = states.get(root);
        if (!state || !state.dragged)
            return;
        const rowEl = e.target.closest(".gantt-row");
        const target = rowEl && state.rows.find((r) => r.id === rowEl.dataset.id);
        const dragged = state.rows.find((r) => r.id === state.dragged);
        if (!rowEl || !target || !dragged || target.id === dragged.id || target.group !== dragged.group)
            return;
        e.preventDefault();
        clearOver();
        const rect = rowEl.getBoundingClientRect();
        const after = e.clientY > rect.top + rect.height / 2;
        rowEl.classList.add(after ? "is-drag-over-after" : "is-drag-over-before");
    });
    root.addEventListener("drop", (e) => {
        const state = states.get(root);
        if (!state || !state.dragged)
            return;
        const rowEl = e.target.closest(".gantt-row");
        if (!rowEl || !rowEl.dataset.id)
            return;
        e.preventDefault();
        const after = rowEl.classList.contains("is-drag-over-after");
        const dragged = state.dragged;
        state.dragged = null;
        moveRow(root, dragged, rowEl.dataset.id, after);
    });
}
/**
 * Gantt-diagram: sorok (idősávok) bal oldali feliratokkal, hónap / negyedév időtengellyel,
 * mérföldkövekkel (pötty, gyémánt vagy kártya), mai nap vonallal, csoportokkal, kijelöléssel és
 * húzással átrendezhető sorokkal. Nyelvváltáskor a feliratok, hónapnevek és időszakok frissülnek,
 * a kijelölés, a sorrend és a görgetés megmarad.
 */
function createGantt(params) {
    const root = el("div", `gantt${params.class ? ` ${params.class}` : ""}`);
    root.id = params.id;
    root.setAttribute("role", "group");
    if (params.ariaLabel !== undefined)
        root.setAttribute("aria-label", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(params.ariaLabel));
    root.style.setProperty("--gantt-row-h", `${params.rowHeight ?? 60}px`);
    const state = {
        params,
        rows: [...params.rows],
        selected: params.selectedId ?? null,
        colors: new Map(),
        dragged: null,
        selectedMs: params.selectedMilestoneId ?? null,
    };
    assignColors(state, state.rows);
    states.set(root, state);
    root.setRows = (rows) => {
        state.rows = [...rows];
        assignColors(state, state.rows);
        if (state.selected && !state.rows.some((r) => r.id === state.selected))
            state.selected = null;
        render(root);
    };
    root.getRows = () => [...state.rows];
    root.select = (id) => select(root, id, false);
    root.selectMilestone = (id) => selectMilestone(root, id);
    root.getSelected = () => state.selected;
    root.getOrder = () => state.rows.map((r) => r.id);
    root.scrollToToday = () => scrollToToday(root, "today");
    wire(root);
    render(root);
    const parent = typeof params.parent === "string" ? document.getElementById(params.parent) : params.parent;
    parent?.appendChild(root);
    scrollToToday(root, params.initialScroll ?? "today");
    (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.watchLocale)(root, (e) => {
        if (e instanceof HTMLElement && states.has(e))
            render(e);
    });
    if (params.ariaLabel !== undefined && typeof params.ariaLabel !== "string") {
        (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.watchLocale)(root, (e) => e.setAttribute("aria-label", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(params.ariaLabel)));
    }
    return root;
}


/***/ },

/***/ "./src/components/createGrid.ts"
/*!**************************************!*\
  !*** ./src/components/createGrid.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGrid: () => (/* binding */ createGrid)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createGrid(params) {
    const style = { display: "grid", gap: params.gap || "1rem" };
    if (params.columns) {
        style.gridTemplateColumns = `repeat(${params.columns}, 1fr)`;
    }
    else if (params.minItemWidth) {
        style.gridTemplateColumns = `repeat(auto-fill, minmax(min(${params.minItemWidth}, 100%), 1fr))`;
    }
    const attrs = { class: `grid${params.class ? ` ${params.class}` : ""}` };
    if (params.id)
        attrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "div", parent: params.parent, attrs, style, children: params.children });
}


/***/ },

/***/ "./src/components/createImage.ts"
/*!***************************************!*\
  !*** ./src/components/createImage.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createImage: () => (/* binding */ createImage)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _createSpinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSpinner */ "./src/components/createSpinner.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");



function toElement(n) {
    return n instanceof HTMLElement ? n : (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ ...n, append: false });
}
/**
 * Önállóan töltő kép: betöltés alatt spinner (injektálható), siker esetén a kép,
 * hiba esetén fallback újrapróbálás gombbal. A figure `data-state` attribútuma
 * (loading / loaded / error) stílushoz használható.
 */
function createImage(params) {
    const strategy = params.strategy ?? "image";
    const retries = params.retries ?? 0;
    const base = params.id || "image";
    const img = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "img",
        append: false,
        attrs: {
            class: "image-element",
            alt: params.alt || "",
            decoding: "async",
            ...(params.width ? { width: String(params.width) } : {}),
            ...(params.height ? { height: String(params.height) } : {}),
        },
    });
    const layer = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "div", append: false, attrs: { class: "image-layer" } });
    // A keret már betöltés / hiba alatt is akkora, mint amekkora a kép lesz (ha a méret ismert)
    const css = (v) => (typeof v === "number" ? `${v}px` : v);
    const frameStyle = {};
    if (params.width)
        frameStyle.width = css(params.width);
    if (params.height)
        frameStyle.height = css(params.height);
    if (typeof params.width === "number" && typeof params.height === "number") {
        // számmal megadott méretnél az arány megmarad, ha a konténer keskenyebb
        frameStyle.aspectRatio = `${params.width} / ${params.height}`;
        frameStyle.height = "auto";
    }
    const sized = !!params.width && !!params.height;
    const frame = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        append: false,
        attrs: { class: "image-frame" },
        style: frameStyle,
        children: [img, layer],
    });
    const children = [frame];
    if (params.caption) {
        children.push({ tag: "figcaption", text: params.caption, attrs: { class: "image-caption" } });
    }
    const rootAttrs = {
        class: `image-container${sized ? " has-size" : ""}${params.class ? ` ${params.class}` : ""}`,
        "data-state": "loading",
    };
    if (params.id)
        rootAttrs.id = params.id;
    const root = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "figure", parent: params.parent, attrs: rootAttrs, children });
    let src = params.src;
    let state = "";
    let token = 0;
    let controller = null;
    let blobUrl = null;
    const setState = (s) => {
        if (s === state)
            return;
        state = s;
        root.dataset.state = s;
        root.setAttribute("aria-busy", String(s === "loading"));
        params.onStateChange?.(s);
    };
    const showLayer = (el) => {
        layer.textContent = "";
        if (el)
            layer.appendChild(el);
    };
    const releaseBlob = () => {
        if (blobUrl)
            URL.revokeObjectURL(blobUrl);
        blobUrl = null;
    };
    const showSpinner = () => {
        const s = params.spinner;
        if (s === false)
            return showLayer(null);
        if (s === undefined) {
            layer.textContent = "";
            (0,_createSpinner__WEBPACK_IMPORTED_MODULE_1__.createSpinner)({ parent: layer, id: `${base}-spinner`, size: "md" });
            return;
        }
        showLayer(toElement(typeof s === "function" ? s() : s));
    };
    const retry = () => void load();
    function fail(error) {
        setState("error");
        img.removeAttribute("src");
        const fb = params.fallback;
        if (fb === undefined) {
            showLayer((0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                tag: "div",
                append: false,
                attrs: { class: "image-error", role: "alert" },
                children: [
                    { tag: "span", text: params.errorText ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_2__.builtin)("image.error", "A kép nem tölthető be") },
                    {
                        tag: "button",
                        text: params.retryText ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_2__.builtin)("image.retry", "Újra"),
                        attrs: { type: "button", class: "image-retry" },
                        handleEvent: { event: "click", cb: retry },
                    },
                ],
            }));
        }
        else {
            showLayer(toElement(typeof fb === "function" ? fb(error, retry) : fb));
        }
        params.onError?.(error);
    }
    function viaImage(url, signal) {
        return new Promise((resolve, reject) => {
            const probe = new Image();
            const cleanup = () => {
                probe.onload = probe.onerror = null;
                signal.removeEventListener("abort", onAbort);
            };
            const onAbort = () => {
                cleanup();
                probe.src = "";
                reject(new DOMException("Aborted", "AbortError"));
            };
            signal.addEventListener("abort", onAbort);
            probe.onload = () => {
                cleanup();
                resolve(url);
            };
            probe.onerror = () => {
                cleanup();
                reject(new Error(`Failed to load image: ${url}`));
            };
            probe.src = url;
        });
    }
    async function viaFetch(url, signal) {
        const response = await fetch(url, { ...params.fetchInit, signal });
        if (!response.ok)
            throw new Error(`HTTP ${response.status} for ${url}`);
        const blob = await response.blob();
        if (blob.type && !blob.type.startsWith("image/"))
            throw new Error(`Not an image (${blob.type}): ${url}`);
        releaseBlob();
        blobUrl = URL.createObjectURL(blob);
        return blobUrl;
    }
    async function load(attempt = 0) {
        const mine = ++token;
        controller?.abort();
        controller = new AbortController();
        const { signal } = controller;
        let timer;
        let timedOut = false;
        if (params.timeout) {
            timer = setTimeout(() => {
                timedOut = true;
                controller?.abort();
            }, params.timeout);
        }
        if (attempt === 0) {
            setState("loading");
            showSpinner();
        }
        try {
            const shown = await (strategy === "fetch" ? viaFetch(src, signal) : viaImage(src, signal));
            if (mine !== token)
                return;
            img.src = shown;
            showLayer(null);
            setState("loaded");
            params.onLoad?.(img);
        }
        catch (e) {
            if (mine !== token)
                return;
            const error = timedOut
                ? new Error(`Timed out loading image: ${src}`)
                : e instanceof Error
                    ? e
                    : new Error(String(e));
            if (attempt < retries)
                return load(attempt + 1);
            fail(error);
        }
        finally {
            if (timer)
                clearTimeout(timer);
        }
    }
    if (params.lazy && typeof IntersectionObserver !== "undefined") {
        setState("loading");
        showSpinner();
        const observer = new IntersectionObserver((entries) => {
            if (entries.some((en) => en.isIntersecting)) {
                observer.disconnect();
                void load();
            }
        });
        observer.observe(root);
    }
    else {
        void load();
    }
    return root;
}


/***/ },

/***/ "./src/components/createLink.ts"
/*!**************************************!*\
  !*** ./src/components/createLink.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createLink: () => (/* binding */ createLink)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createLink(params) {
    const rootAttrs = {
        class: `link${params.class ? ` ${params.class}` : ""}`,
        href: params.href,
    };
    if (params.id)
        rootAttrs.id = params.id;
    if (params.target)
        rootAttrs.target = params.target;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "a",
        parent: params.parent,
        text: params.text,
        attrs: rootAttrs,
        handleEvent: params.click ? { event: "click", cb: params.click } : undefined,
    });
}


/***/ },

/***/ "./src/components/createLists.ts"
/*!***************************************!*\
  !*** ./src/components/createLists.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOrderedList: () => (/* binding */ createOrderedList),
/* harmony export */   createUnorderedList: () => (/* binding */ createUnorderedList)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createUnorderedList(data, params) {
    const attrs = {
        class: `unsorted-list${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        attrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        parent: params.parent,
        tag: "ul",
        attrs,
        children: data.map((item, index) => ({
            tag: "li",
            text: item,
            attrs: { id: `${params.id}-${index}`, class: "list-elem" },
        })),
    });
}
function createOrderedList(data, params) {
    const attrs = {
        class: `ordered-list${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        attrs.id = params.id;
    if (params.start != null)
        attrs.start = params.start;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        parent: params.parent,
        tag: "ol",
        attrs,
        children: data.map((item, index) => ({
            tag: "li",
            text: item,
            attrs: { id: `${params.id}-${index}`, class: "list-elem" },
        })),
    });
}


/***/ },

/***/ "./src/components/createMenu.ts"
/*!**************************************!*\
  !*** ./src/components/createMenu.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMenu: () => (/* binding */ createMenu)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

const normalize = (p) => p.replace(/\/index\.html$/, "/").replace(/\/+$/, "") || "/";
/** Az adott href az aktuális oldalra mutat-e */
function isCurrent(href) {
    if (!href || href.startsWith("#") || typeof location === "undefined")
        return false;
    try {
        return normalize(new URL(href, location.href).pathname) === normalize(location.pathname);
    }
    catch {
        return false;
    }
}
/** Az elem vagy bármely leszármazottja az aktuális oldal-e */
function containsCurrent(item) {
    return isCurrent(item.href) || (item.children?.some(containsCurrent) ?? false);
}
let uid = 0;
function buildMenuItem(item, collapsible) {
    const children = [];
    const hasChildren = !!item.children && item.children.length > 0;
    const foldable = collapsible && hasChildren;
    const open = foldable && (item.open ?? containsCurrent(item));
    const submenuId = `drawer-submenu-${++uid}`;
    if (foldable) {
        children.push({
            tag: "button",
            attrs: {
                type: "button",
                class: "drawer-link drawer-link-header drawer-toggle",
                "aria-expanded": String(open),
                "aria-controls": submenuId,
            },
            children: [
                { tag: "span", text: item.label },
                { tag: "span", attrs: { class: "drawer-chevron", "aria-hidden": "true" } },
            ],
            handleEvent: {
                event: "click",
                cb: (e) => {
                    const btn = e.currentTarget;
                    const wrapper = btn.closest(".drawer-item");
                    const nowOpen = !wrapper.classList.contains("is-open");
                    wrapper.classList.toggle("is-open", nowOpen);
                    btn.setAttribute("aria-expanded", String(nowOpen));
                },
            },
        });
    }
    else if (item.href) {
        const current = isCurrent(item.href);
        children.push({
            tag: "a",
            text: item.label,
            attrs: { href: item.href, class: `drawer-link${current ? " active" : ""}`, ...(current ? { "aria-current": "page" } : {}) },
        });
    }
    else {
        children.push({
            tag: "span",
            text: item.label,
            attrs: { class: "drawer-link drawer-link-header" },
        });
    }
    if (hasChildren) {
        children.push({
            tag: "div",
            attrs: { class: "drawer-submenu", id: submenuId },
            children: item.children.map((child) => ({
                tag: "div",
                attrs: { class: "drawer-subitem" },
                children: [buildMenuItem(child, collapsible)],
            })),
        });
    }
    return {
        tag: "div",
        attrs: { class: `drawer-item${foldable ? " is-foldable" : ""}${open ? " is-open" : ""}` },
        children,
    };
}
function createMenu(params) {
    const collapsible = params.collapsible ?? false;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "nav",
        attrs: { class: "drawer-nav", id: `${params.id}-nav` },
        children: params.items.map((item) => buildMenuItem(item, collapsible)),
    });
}


/***/ },

/***/ "./src/components/createModal.ts"
/*!***************************************!*\
  !*** ./src/components/createModal.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   createModal: () => (/* binding */ createModal),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _buttons_createButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../buttons/createButton */ "./src/buttons/createButton.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");



function openModal(id) {
    const portal = document.getElementById(`${id}-portal`);
    if (portal) {
        document.body.appendChild(portal);
        portal.style.display = "flex";
        portal.style.opacity = "1";
        portal.classList.remove("hidden");
    }
}
function closeModal(id) {
    const portal = document.getElementById(`${id}-portal`);
    if (portal) {
        portal.classList.add("hidden");
        portal.style.opacity = "0";
        portal.addEventListener("transitionend", () => {
            portal.style.display = "none";
        }, { once: true });
    }
}
const toCss = (v) => (typeof v === "number" ? `${v}px` : v);
function createModal(content, actions, params) {
    const bodyChildren = Array.isArray(content.body) ? content.body : [content.body];
    const modal = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        attrs: {
            class: "modal-portal hidden",
            id: `${params.id}-portal`,
        },
        style: {
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: "0",
            left: "0",
            background: "rgba(0,0,0,0.5)",
            zIndex: "9999",
            transition: "opacity 0.3s ease-in-out",
            display: "none",
            opacity: "0",
            justifyContent: "center",
            alignItems: "center",
        },
        children: [{
                tag: "div",
                style: {
                    background: "var(--bg)",
                    color: "var(--text)",
                    padding: "1.5rem",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-lg)",
                    minWidth: params.width !== undefined ? "0" : "320px",
                    ...(params.width !== undefined ? { width: toCss(params.width) } : {}),
                    maxWidth: toCss(params.maxWidth ?? "90vw"),
                    maxHeight: "90vh",
                    overflow: "auto",
                },
                attrs: {
                    class: `modal${params.class ? ` ${params.class}` : ""}`,
                    id: params.id,
                },
                children: [
                    {
                        tag: "div",
                        attrs: { class: "modal-title-container" },
                        style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" },
                        children: [
                            {
                                tag: "h2",
                                attrs: { class: "modal-title" },
                                text: content.modalTitle,
                                style: { margin: 0, fontSize: "1.25rem" },
                            },
                            (0,_buttons_createButton__WEBPACK_IMPORTED_MODULE_1__.createButton)({
                                id: `${params.id}-close-btn`,
                                class: "modal-close-btn",
                                parent: document.body,
                                text: "\u00D7",
                                style: { fontSize: "1.5rem", cursor: "pointer", background: "none", border: "none", padding: "0.25rem", lineHeight: 1 },
                                click: () => {
                                    closeModal(params.id);
                                    actions.closeAction?.();
                                },
                            }),
                        ],
                    },
                    {
                        tag: "div",
                        attrs: { class: "modal-body" },
                        children: bodyChildren,
                    },
                    ...(params.footer === false ? [] : [{
                            tag: "div",
                            attrs: { class: "modal-footer" },
                            style: { display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem", borderTop: "1px solid var(--border)", paddingTop: "1rem" },
                            children: [
                                (0,_buttons_createButton__WEBPACK_IMPORTED_MODULE_1__.createButton)({
                                    id: `${params.id}-cancel-btn`,
                                    parent: document.body,
                                    class: "modal-cancel-btn",
                                    click: () => { actions.cancelAction?.(); closeModal(params.id); },
                                    text: params.labels?.cancel ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_2__.builtin)("modal.cancel", "Mégse"),
                                }),
                                (0,_buttons_createButton__WEBPACK_IMPORTED_MODULE_1__.createButton)({
                                    id: `${params.id}-ok-btn`,
                                    parent: document.body,
                                    class: "modal-ok-btn",
                                    click: () => { actions.okAction?.(); closeModal(params.id); },
                                    text: params.labels?.ok ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_2__.builtin)("modal.ok", "OK"),
                                }),
                            ],
                        }]),
                ],
            }],
    });
    document.body.appendChild(modal);
    if (params.closeOnBackdrop) {
        modal.addEventListener("click", (e) => {
            if (e.target !== modal)
                return;
            closeModal(params.id);
            actions.closeAction?.();
        });
    }
    if (params.closeOnEscape) {
        const onKey = (e) => {
            if (!modal.isConnected) {
                document.removeEventListener("keydown", onKey);
                return;
            }
            if (e.key !== "Escape" || modal.classList.contains("hidden") || modal.style.display === "none")
                return;
            closeModal(params.id);
            actions.closeAction?.();
        };
        document.addEventListener("keydown", onKey);
    }
    return modal;
}


/***/ },

/***/ "./src/components/createMusicPlayer.ts"
/*!*********************************************!*\
  !*** ./src/components/createMusicPlayer.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMusicPlayer: () => (/* binding */ createMusicPlayer)
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");

const svg = (path) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">${path}</svg>`;
const ICONS = {
    play: svg('<path d="M8 5v14l11-7z"/>'),
    pause: svg('<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>'),
    prev: svg('<path d="M6 6h2v12H6zM9.5 12 18 18V6z"/>'),
    next: svg('<path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z"/>'),
    volume: svg('<path d="M3 9v6h4l5 5V4L7 9zM16.5 12A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z"/>'),
    muted: svg('<path d="M3 9v6h4l5 5V4L7 9zM16 9.4 17.4 8 19.5 10.1 21.6 8 23 9.4 20.9 11.5 23 13.6 21.6 15 19.5 12.9 17.4 15 16 13.6 18.1 11.5z"/>'),
    repeat: svg('<path d="M7 7h10v3l4-4-4-4v3H5v6h2zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2z"/>'),
    repeatOne: svg('<path d="M7 7h10v3l4-4-4-4v3H5v6h2zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2zm-4-2V9h-1l-2 1v1h1.5v4z"/>'),
    note: svg('<path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z"/>'),
};
function fmt(sec) {
    if (!isFinite(sec) || sec < 0)
        return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
}
function el(tag, className, attrs = {}) {
    const e = document.createElement(tag);
    if (className)
        e.className = className;
    for (const [k, v] of Object.entries(attrs))
        e.setAttribute(k, v);
    return e;
}
/**
 * Egyedi zenelejátszó: lejátszás / szünet, előző / következő, léptethető időcsík,
 * hangerő, ismétlés és lejátszási lista. A gyökérelem `data-state` attribútuma
 * (paused / playing / loading / error) stílushoz használható.
 */
function createMusicPlayer(params) {
    // Feliratok: a paraméterből, különben a beépített (nyelvváltáskor frissülő) katalógusból
    const L = {
        play: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.play", "Lejátszás"),
        pause: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.pause", "Szünet"),
        prev: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.prev", "Előző szám"),
        next: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.next", "Következő szám"),
        seek: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.seek", "Pozíció"),
        volume: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.volume", "Hangerő"),
        mute: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.mute", "Némítás"),
        unmute: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.unmute", "Némítás feloldása"),
        playlist: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.playlist", "Lejátszási lista"),
        error: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.error", "A szám nem játszható le"),
        ...params.labels,
    };
    const LOOP = {
        none: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.loopOff", "Ismétlés: ki"),
        all: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.loopAll", "Ismétlés: lista"),
        one: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.loopOne", "Ismétlés: szám"),
    };
    const tracks = params.tracks;
    const multi = tracks.length > 1;
    let index = Math.min(Math.max(params.startIndex ?? 0, 0), Math.max(tracks.length - 1, 0));
    let loop = params.loop ?? "none";
    let state = "paused";
    let seeking = false;
    const audio = el("audio", "music-audio", { preload: "metadata" });
    audio.volume = Math.min(Math.max(params.volume ?? 1, 0), 1);
    const root = el("div", `music-player${params.class ? ` ${params.class}` : ""}`, {
        role: "group",
        "data-state": "paused",
    });
    if (params.id)
        root.id = params.id;
    // --- fejléc: borító + cím ---
    const cover = el("div", "music-cover");
    const coverImg = el("img", "music-cover-img", { alt: "", decoding: "async" });
    const coverFallback = el("span", "music-cover-fallback");
    coverFallback.innerHTML = ICONS.note;
    cover.append(coverImg, coverFallback);
    const title = el("div", "music-title");
    const artist = el("div", "music-artist");
    const status = el("div", "music-status", { role: "status", "aria-live": "polite" });
    const meta = el("div", "music-meta");
    meta.append(title, artist, status);
    const head = el("div", "music-head");
    head.append(cover, meta);
    // --- időcsík ---
    const seek = el("input", "music-seek", { type: "range", min: "0", max: "1000", step: "1", value: "0" });
    const cur = el("span", "music-time music-current");
    cur.textContent = "0:00";
    const dur = el("span", "music-time music-duration");
    dur.textContent = "0:00";
    const progress = el("div", "music-progress");
    progress.append(cur, seek, dur);
    // --- vezérlők ---
    // az aria-label-eket a refreshLabels() állítja (állapot- és nyelvfüggők)
    const btn = (cls, _label, icon) => {
        const b = el("button", `music-btn ${cls}`, { type: "button" });
        b.innerHTML = icon;
        return b;
    };
    const prevBtn = btn("music-prev", L.prev, ICONS.prev);
    const playBtn = btn("music-play", L.play, ICONS.play);
    const nextBtn = btn("music-next", L.next, ICONS.next);
    const loopBtn = btn("music-loop", LOOP.none, ICONS.repeat);
    const muteBtn = btn("music-mute", L.mute, ICONS.volume);
    const vol = el("input", "music-volume", { type: "range", min: "0", max: "1", step: "0.01" });
    vol.value = String(audio.volume);
    const transport = el("div", "music-transport");
    if (multi)
        transport.append(prevBtn);
    transport.append(playBtn);
    if (multi)
        transport.append(nextBtn);
    const volumeBox = el("div", "music-volume-box");
    volumeBox.append(muteBtn, vol);
    const controls = el("div", "music-controls");
    controls.append(loopBtn, transport, params.showVolume === false ? el("span") : volumeBox);
    root.append(audio, head, progress, controls);
    // --- lejátszási lista ---
    let playlistEl = null;
    const items = [];
    const itemTitles = [];
    if (multi && params.showPlaylist !== false) {
        playlistEl = el("ul", "music-playlist");
        tracks.forEach((t, i) => {
            const li = el("li", "music-playlist-item");
            const b = el("button", "music-playlist-btn", { type: "button" });
            const n = el("span", "music-playlist-index");
            n.textContent = String(i + 1);
            const tt = el("span", "music-playlist-title");
            itemTitles.push(tt);
            const ar = el("span", "music-playlist-artist");
            ar.textContent = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(t.artist);
            b.append(n, tt, ar);
            b.addEventListener("click", () => {
                setTrack(i);
                void play();
            });
            li.appendChild(b);
            playlistEl.appendChild(li);
            items.push(b);
        });
        root.appendChild(playlistEl);
    }
    /** Minden nyelv- és állapotfüggő felirat (aria-label, hibaüzenet, számcímek) újraszámolása */
    function refreshLabels() {
        const playing = state === "playing" || state === "loading";
        root.setAttribute("aria-label", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)((0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.group", "Zenelejátszó")));
        seek.setAttribute("aria-label", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(L.seek));
        vol.setAttribute("aria-label", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(L.volume));
        prevBtn.setAttribute("aria-label", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(L.prev));
        nextBtn.setAttribute("aria-label", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(L.next));
        playBtn.setAttribute("aria-label", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(playing ? L.pause : L.play));
        muteBtn.setAttribute("aria-label", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(audio.muted ? L.unmute : L.mute));
        loopBtn.setAttribute("aria-label", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(LOOP[loop]));
        playlistEl?.setAttribute("aria-label", (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(L.playlist));
        status.textContent = state === "error" ? (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(L.error) : "";
        itemTitles.forEach((node, i) => {
            node.textContent = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(tracks[i].title) || (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)((0,_i18n__WEBPACK_IMPORTED_MODULE_0__.tr)("cdb.music.track", { n: i + 1 }, "Szám {n}"));
        });
    }
    // --- állapot ---
    const setState = (s) => {
        if (s === state)
            return;
        state = s;
        root.dataset.state = s;
        root.setAttribute("aria-busy", String(s === "loading"));
        const playing = s === "playing" || s === "loading";
        playBtn.innerHTML = playing ? ICONS.pause : ICONS.play;
        playBtn.setAttribute("aria-pressed", String(playing));
        refreshLabels();
        params.onStateChange?.(s);
    };
    function renderTrack() {
        const t = tracks[index];
        title.textContent = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(t?.title) || (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)((0,_i18n__WEBPACK_IMPORTED_MODULE_0__.builtin)("music.unknownTrack", "Ismeretlen szám"));
        artist.textContent = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.resolveText)(t?.artist);
        if (t?.cover) {
            coverImg.src = t.cover;
            cover.classList.add("has-cover");
        }
        else {
            coverImg.removeAttribute("src");
            cover.classList.remove("has-cover");
        }
        items.forEach((b, i) => {
            const on = i === index;
            b.classList.toggle("is-active", on);
            if (on)
                b.setAttribute("aria-current", "true");
            else
                b.removeAttribute("aria-current");
        });
        if (!multi)
            return;
        prevBtn.disabled = loop !== "all" && index === 0;
        nextBtn.disabled = loop !== "all" && index === tracks.length - 1;
    }
    function setTrack(i, silent = false) {
        if (!tracks.length)
            return;
        index = (i + tracks.length) % tracks.length;
        const t = tracks[index];
        audio.src = t.src;
        seek.value = "0";
        cur.textContent = "0:00";
        dur.textContent = "0:00";
        setState("paused");
        renderTrack();
        audio.load();
        if (!silent)
            params.onTrackChange?.(t, index);
    }
    async function play() {
        try {
            setState("loading");
            await audio.play();
        }
        catch (e) {
            // a play() megszakítása (pl. gyors számváltás) nem hiba
            if (e instanceof DOMException && e.name === "AbortError")
                return;
            setState(e instanceof DOMException && e.name === "NotAllowedError" ? "paused" : "error");
        }
    }
    function goNext(auto = false) {
        if (index < tracks.length - 1) {
            setTrack(index + 1);
            void play();
        }
        else if (loop === "all") {
            setTrack(0);
            void play();
        }
        else if (auto) {
            setState("paused");
            params.onEnded?.();
        }
    }
    // --- események ---
    playBtn.addEventListener("click", () => {
        if (audio.paused)
            void play();
        else
            audio.pause();
    });
    prevBtn.addEventListener("click", () => {
        if (audio.currentTime > 3 || (index === 0 && loop !== "all")) {
            audio.currentTime = 0;
            return;
        }
        const wasPlaying = !audio.paused;
        setTrack(index - 1);
        if (wasPlaying)
            void play();
    });
    nextBtn.addEventListener("click", () => {
        const wasPlaying = !audio.paused;
        if (index < tracks.length - 1)
            setTrack(index + 1);
        else if (loop === "all")
            setTrack(0);
        else
            return;
        if (wasPlaying)
            void play();
    });
    loopBtn.addEventListener("click", () => {
        loop = loop === "none" ? "all" : loop === "all" ? "one" : "none";
        loopBtn.innerHTML = loop === "one" ? ICONS.repeatOne : ICONS.repeat;
        loopBtn.classList.toggle("is-active", loop !== "none");
        refreshLabels();
        audio.loop = loop === "one";
        renderTrack();
    });
    muteBtn.addEventListener("click", () => {
        audio.muted = !audio.muted;
    });
    vol.addEventListener("input", () => {
        audio.volume = Number(vol.value);
        audio.muted = false;
    });
    seek.addEventListener("input", () => {
        seeking = true;
        if (audio.duration)
            cur.textContent = fmt((Number(seek.value) / 1000) * audio.duration);
    });
    seek.addEventListener("change", () => {
        if (audio.duration)
            audio.currentTime = (Number(seek.value) / 1000) * audio.duration;
        seeking = false;
    });
    audio.addEventListener("play", () => {
        setState("playing");
        params.onPlay?.(tracks[index], index);
    });
    audio.addEventListener("pause", () => {
        if (state !== "error" && !audio.ended) {
            setState("paused");
            params.onPause?.(tracks[index], index);
        }
    });
    audio.addEventListener("waiting", () => {
        if (!audio.paused)
            setState("loading");
    });
    audio.addEventListener("playing", () => setState("playing"));
    audio.addEventListener("loadedmetadata", () => {
        dur.textContent = fmt(audio.duration);
    });
    audio.addEventListener("durationchange", () => {
        dur.textContent = fmt(audio.duration);
    });
    audio.addEventListener("timeupdate", () => {
        if (seeking || !audio.duration)
            return;
        seek.value = String(Math.round((audio.currentTime / audio.duration) * 1000));
        cur.textContent = fmt(audio.currentTime);
    });
    audio.addEventListener("volumechange", () => {
        muteBtn.innerHTML = audio.muted || audio.volume === 0 ? ICONS.muted : ICONS.volume;
        refreshLabels();
        if (!audio.muted)
            vol.value = String(audio.volume);
    });
    audio.addEventListener("ended", () => {
        if (loop === "one")
            return; // a natív loop kezeli
        goNext(true);
    });
    audio.addEventListener("error", () => {
        setState("error");
    });
    audio.loop = loop === "one";
    loopBtn.classList.toggle("is-active", loop !== "none");
    loopBtn.innerHTML = loop === "one" ? ICONS.repeatOne : ICONS.repeat;
    if (params.parent) {
        const parent = typeof params.parent === "string" ? document.getElementById(params.parent) : params.parent;
        parent?.appendChild(root);
    }
    refreshLabels();
    // nyelvváltáskor a feliratok és a számcímek frissülnek, a lejátszás állapota (pozíció, hangerő, lista) megmarad
    (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.watchLocale)(root, () => {
        refreshLabels();
        renderTrack();
    });
    if (tracks.length) {
        setTrack(index, true);
        if (params.autoplay)
            void play();
    }
    else {
        renderTrack();
        playBtn.disabled = true;
    }
    return root;
}


/***/ },

/***/ "./src/components/createNav.ts"
/*!*************************************!*\
  !*** ./src/components/createNav.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNav: () => (/* binding */ createNav)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function buildNavItem(item) {
    const children = [];
    if (item.href) {
        const linkAttrs = { href: item.href };
        if (item.active)
            linkAttrs.class = "active";
        children.push({
            tag: "a",
            text: item.text,
            attrs: linkAttrs,
            handleEvent: item.click ? { event: "click", cb: item.click } : undefined,
        });
    }
    else {
        const spanAttrs = {};
        if (item.active)
            spanAttrs.class = "active";
        children.push({
            tag: "span",
            text: item.text,
            attrs: spanAttrs,
            handleEvent: item.click ? { event: "click", cb: item.click } : undefined,
        });
    }
    if (item.children && item.children.length > 0) {
        children.push({
            tag: "ul",
            attrs: { class: "nav-dropdown" },
            children: item.children.map((child) => ({
                tag: "li",
                children: [buildNavItem(child)],
            })),
        });
    }
    return {
        tag: "li",
        attrs: { class: item.active ? "nav-item active" : "nav-item" },
        children,
    };
}
function createNav(params) {
    const navAttrs = { class: `nav${params.class ? ` ${params.class}` : ""}` };
    if (params.id)
        navAttrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "nav",
        parent: params.parent,
        attrs: navAttrs,
        children: [
            {
                tag: "ul",
                attrs: { class: "nav-list" },
                children: params.items.map((item) => buildNavItem(item)),
            },
        ],
    });
}


/***/ },

/***/ "./src/components/createParagraph.ts"
/*!*******************************************!*\
  !*** ./src/components/createParagraph.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createParagraph: () => (/* binding */ createParagraph)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createParagraph(params) {
    const attrs = {};
    if (params.id)
        attrs.id = params.id;
    if (params.class)
        attrs.class = params.class;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "p",
        text: params.text,
        parent: params.parent,
        attrs,
    });
}


/***/ },

/***/ "./src/components/createProgressBar.ts"
/*!*********************************************!*\
  !*** ./src/components/createProgressBar.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createProgressBar: () => (/* binding */ createProgressBar)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createProgressBar(params) {
    const max = params.max || 100;
    const percentage = Math.min(Math.max((params.value / max) * 100, 0), 100);
    const children = [];
    if (params.label) {
        children.push({ tag: "div", attrs: { class: "progress-label" }, text: params.label });
    }
    children.push({
        tag: "div",
        attrs: { class: "progress-track" },
        children: [
            {
                tag: "div",
                attrs: { class: "progress-fill" },
                style: {
                    width: `${percentage}%`,
                    backgroundColor: params.color || "#3b82f6",
                    height: "100%",
                    borderRadius: "inherit",
                    transition: "width 0.3s ease",
                },
                text: params.showPercentage ? `${Math.round(percentage)}%` : undefined,
            },
        ],
    });
    const rootAttrs = {
        class: `progress-bar${params.class ? ` ${params.class}` : ""}`,
        role: "progressbar",
        "aria-valuenow": params.value,
        "aria-valuemin": 0,
        "aria-valuemax": max,
    };
    if (params.id)
        rootAttrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: rootAttrs,
        children,
    });
}


/***/ },

/***/ "./src/components/createSpinner.ts"
/*!*****************************************!*\
  !*** ./src/components/createSpinner.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSpinner: () => (/* binding */ createSpinner)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");


function createSpinner(params) {
    const sizeMap = { sm: "1rem", md: "2rem", lg: "3rem" };
    const size = sizeMap[params.size || "md"];
    const rootAttrs = {
        class: `spinner spinner-${params.size || "md"}${params.class ? ` ${params.class}` : ""}`,
        role: "status",
        "aria-label": (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("spinner.loading", "Loading"),
    };
    if (params.id)
        rootAttrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: rootAttrs,
        style: {
            width: size,
            height: size,
            border: `3px solid ${params.color || "#ccc"}`,
            borderTopColor: params.color || "#333",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
        },
    });
}


/***/ },

/***/ "./src/components/createTable.ts"
/*!***************************************!*\
  !*** ./src/components/createTable.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTable: () => (/* binding */ createTable)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");


const cellText = (c) => (typeof c === "number" ? String(c) : (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(c));
const DEFAULT_LABELS = {
    filter: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("table.filter", "Szűrés…"),
    filterAria: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("table.filterAria", "Táblázat szűrése"),
    prev: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("table.prev", "Előző"),
    next: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("table.next", "Következő"),
    page: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("table.page", "Oldal"),
    rowsPerPage: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("table.rowsPerPage", "Sor / oldal"),
    all: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("table.all", "Mind"),
    noResults: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("table.noResults", "Nincs találat"),
    sortAsc: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("table.sortAsc", "növekvő"),
    sortDesc: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("table.sortDesc", "csökkenő"),
    info: undefined,
};
/** Számokat számként, szöveget természetes sorrendben (magyar ábécé szerint) hasonlít össze */
function compareCells(a, b) {
    const ta = cellText(a);
    const tb = cellText(b);
    const na = typeof a === "number" ? a : Number(ta);
    const nb = typeof b === "number" ? b : Number(tb);
    if (ta !== "" && tb !== "" && !Number.isNaN(na) && !Number.isNaN(nb))
        return na - nb;
    return ta.localeCompare(tb, (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.getLocale)(), { numeric: true, sensitivity: "base" });
}
/** Oldalszámok kompakt listája: 1 … 4 5 6 … 20 */
function pageList(current, total) {
    if (total <= 7)
        return Array.from({ length: total }, (_, i) => i + 1);
    const set = new Set([1, total, current - 1, current, current + 1]);
    if (current <= 3)
        [2, 3, 4].forEach((n) => set.add(n));
    if (current >= total - 2)
        [total - 3, total - 2, total - 1].forEach((n) => set.add(n));
    const sorted = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
    const out = [];
    sorted.forEach((n, i) => {
        if (i > 0 && n - sorted[i - 1] > 1)
            out.push("…");
        out.push(n);
    });
    return out;
}
function createTable(data, params) {
    const server = params.serverSide;
    const p = {
        ...params,
        showHeader: params.showHeader ?? true,
        // szerveroldali lapozásnál az összegek csak az aktuális oldalra szólnának, ezért nincs lábléc
        showFooter: server ? false : params.showFooter ?? true,
        dataIsArray: Array.isArray(data[0]),
    };
    const cellNames = {
        sum: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("table.sum", "Sum"),
        total: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("table.total", "Total"),
        rowNr: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("table.rowNr", "Row #"),
        ...p.cellNames,
    };
    const L = { ...DEFAULT_LABELS, ...params.labels };
    let headers;
    let rawRows;
    /** Az objektum-sorok kulcsai (setData-hoz); tömbös adatnál nincs */
    let objectKeys = null;
    if (p.dataIsArray) {
        const arrData = data;
        p.hasHeader = true;
        headers = p.hasHeader
            ? arrData.shift()
            : arrData[0].map((_, index) => `Column #${index}`);
        rawRows = arrData;
    }
    else {
        const objData = data;
        headers = Object.keys(objData[0] ?? {});
        objectKeys = [...headers];
        rawRows = objData.map((row) => Object.values(row));
    }
    const footers = Array(headers.length).fill(0);
    if (p.hasFooter && p.showFooter) {
        rawRows.forEach((row) => row.forEach((cell, cellIdx) => {
            footers[cellIdx] = footers[cellIdx] + parseFloat(cellText(cell));
        }));
    }
    if (p.sumRowValues) {
        if (p.hasHeader || !p.dataIsArray)
            headers.push(cellNames.sum);
        const total = footers.reduce((acc, cell) => acc + (Number.isNaN(cell) ? 0 : cell), 0);
        footers.push(total);
    }
    if (p.addRowNumbers) {
        if (p.hasHeader)
            headers.unshift(cellNames.rowNr);
        footers.unshift(0);
    }
    /** Számított oszlopok (összeg, sorszám) hozzáadása; az offset a szerveroldali oldalak miatt kell */
    const decorate = (raw, offset = 0) => raw.map((row, i) => {
        const r = [...row];
        if (p.sumRowValues)
            r.push(row.reduce((acc, cell) => acc + Number(cell), 0));
        if (p.addRowNumbers)
            r.unshift(offset + i + 1);
        return r;
    });
    const footerRow = footers.map((val, idx) => {
        if (val === 0 && headers[idx] !== cellNames.total)
            return headers[idx];
        return val;
    });
    // ---- nézet: szűrés + rendezés + lapozás ----
    const sortable = p.sortable ?? false;
    const filterable = p.filterable ?? false;
    // Oldalméret-választó: a megadott sorrendben, `"all"` = az összes sor egy oldalon
    const sizeOptions = Array.from(new Set((p.pageSizeOptions ?? []).filter((n) => n === "all" || (typeof n === "number" && n > 0))));
    const firstNumeric = sizeOptions.find((n) => typeof n === "number");
    const initialSize = p.pageSize && p.pageSize > 0
        ? p.pageSize
        : sizeOptions.includes("all") && firstNumeric === undefined
            ? "all"
            : firstNumeric ?? 0;
    const paged = initialSize === "all" || initialSize > 0;
    const view = {
        sortCol: -1,
        sortDir: "none",
        query: "",
        page: Math.max(1, server?.page ?? 1),
        pageSize: initialSize,
    };
    // A táblázat tényleges sorai: kliens módban az összes, szerver módban az aktuális oldal
    const initialOffset = server && typeof view.pageSize === "number" ? (view.page - 1) * view.pageSize : 0;
    let rows = decorate(rawRows, initialOffset);
    let serverTotal = server ? server.total : 0;
    let loading = false;
    const visibleRows = () => {
        if (server)
            return rows; // a szűrést / rendezést a szerver végezte
        let list = rows;
        const q = view.query.trim().toLowerCase();
        if (q)
            list = list.filter((row) => row.some((cell) => cellText(cell).toLowerCase().includes(q)));
        if (view.sortDir !== "none" && view.sortCol >= 0) {
            const dir = view.sortDir === "asc" ? 1 : -1;
            const c = view.sortCol;
            list = [...list].sort((a, b) => dir * compareCells(a[c], b[c]));
        }
        return list;
    };
    const buildRow = (row, rowInd) => (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "tr",
        append: false,
        attrs: { class: `table-row-${rowInd}` },
        children: row.map((col, colIdx) => (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
            tag: p.addRowNumbers && colIdx === 0 ? "th" : "td",
            text: typeof col === "number" ? String(col) : col,
            attrs: { class: `table-col-${colIdx}` },
        })),
    });
    const tableChildren = [];
    const sortButtons = [];
    const headCells = [];
    if (p.showHeader) {
        tableChildren.push((0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
            tag: "thead",
            children: [(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                    tag: "tr",
                    attrs: { class: "header-row" },
                    children: headers.map((col, index) => {
                        const th = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                            tag: "th",
                            attrs: { class: `table-col-${index}`, ...(sortable ? { "aria-sort": "none" } : {}) },
                            ...(sortable ? {} : { text: typeof col === "number" ? String(col) : col }),
                        });
                        if (sortable) {
                            const btn = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                                tag: "button",
                                text: typeof col === "number" ? String(col) : col,
                                parent: th,
                                attrs: { type: "button", class: "table-sort-btn" },
                                handleEvent: { event: "click", cb: () => toggleSort(index) },
                            });
                            sortButtons.push(btn);
                        }
                        headCells.push(th);
                        return th;
                    }),
                })],
        }));
    }
    const tbody = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "tbody", children: rows.map(buildRow) });
    tableChildren.push(tbody);
    if (p.showFooter) {
        tableChildren.push((0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
            tag: "tfoot",
            children: [(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                    tag: "tr",
                    attrs: { class: "footer-row" },
                    children: footerRow.map((col, index) => (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                        tag: "th",
                        text: typeof col === "number" ? String(col) : col,
                        attrs: { class: `table-col-${index}` },
                    })),
                })],
        }));
    }
    const rootAttrs = { class: `table${params.class ? ` ${params.class}` : ""}` };
    if (params.id)
        rootAttrs.id = params.id;
    // Egyik extra funkció sincs bekapcsolva: marad az egyszerű <table>
    if (!sortable && !filterable && !paged && !server) {
        return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ parent: params.parent, tag: "table", attrs: rootAttrs, children: tableChildren });
    }
    const table = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "table", attrs: rootAttrs, children: tableChildren });
    // ---- vezérlők ----
    const info = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "span", append: false, attrs: { class: "table-info", "aria-live": "polite" } });
    const pager = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "nav", append: false, attrs: { class: "table-pager", "aria-label": L.page } });
    const toolbar = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "div", append: false, attrs: { class: "table-toolbar" } });
    /** Változás után: kliens módban újrarajzol, szerver módban lekérdezést kér a hívótól */
    let filterTimer;
    const changed = (opts = {}) => {
        if (!server)
            return render();
        const wait = server.filterDebounce ?? 300;
        if (opts.debounce && wait > 0) {
            clearTimeout(filterTimer);
            filterTimer = setTimeout(requestServer, wait);
            render();
            return;
        }
        clearTimeout(filterTimer);
        requestServer();
    };
    if (filterable) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
            tag: "input",
            parent: toolbar,
            attrs: { type: "search", class: "table-filter", placeholder: L.filter, "aria-label": L.filterAria },
            handleEvent: {
                event: "input",
                cb: (e) => {
                    view.query = e.target.value;
                    view.page = 1;
                    changed({ debounce: true });
                },
            },
        });
    }
    if (paged && sizeOptions.length > 0) {
        const label = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "label", parent: toolbar, attrs: { class: "table-size" }, children: [{ tag: "span", text: L.rowsPerPage }] });
        const select = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
            tag: "select",
            parent: label,
            attrs: { class: "table-size-select", "aria-label": L.rowsPerPage },
            handleEvent: {
                event: "change",
                cb: (e) => {
                    const v = e.target.value;
                    view.pageSize = v === "all" ? "all" : Number(v);
                    view.page = 1;
                    changed();
                },
            },
        });
        // ha a kezdő méret nincs a listában, megjelenik az elején, hogy a select helyes értéket mutasson
        const shown = sizeOptions.includes(view.pageSize) ? sizeOptions : [view.pageSize, ...sizeOptions];
        shown.forEach((n) => {
            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "option", parent: select, text: n === "all" ? L.all : String(n), attrs: { value: String(n) } });
        });
        select.value = String(view.pageSize);
    }
    const container = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        parent: params.parent,
        tag: "div",
        attrs: { class: "table-container" },
        children: [
            ...(toolbar.childElementCount ? [toolbar] : []),
            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "div", attrs: { class: "table-scroll" }, children: [table] }),
            ...(paged || filterable ? [(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "div", attrs: { class: "table-footer-bar" }, children: [info, ...(paged ? [pager] : [])] })] : []),
        ],
    });
    function toggleSort(col) {
        if (view.sortCol !== col) {
            view.sortCol = col;
            view.sortDir = "asc";
        }
        else {
            view.sortDir = view.sortDir === "asc" ? "desc" : view.sortDir === "desc" ? "none" : "asc";
        }
        view.page = 1;
        changed();
    }
    function currentQuery() {
        const active = view.sortCol >= 0 && view.sortDir !== "none";
        return {
            page: view.page,
            pageSize: view.pageSize,
            filter: view.query.trim(),
            sort: active ? { column: cellText(headers[view.sortCol]), index: view.sortCol, direction: view.sortDir } : null,
        };
    }
    function setLoading(on) {
        loading = on;
        container.classList.toggle("is-loading", on);
        container.setAttribute("aria-busy", String(on));
    }
    function requestServer() {
        if (!server)
            return;
        setLoading(true);
        render();
        server.onChange(currentQuery());
    }
    function pageButton(label, page, opts = {}) {
        return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
            tag: "button",
            append: false,
            text: label,
            attrs: {
                type: "button",
                class: `table-page-btn${opts.current ? " is-current" : ""}`,
                ...(opts.aria ? { "aria-label": opts.aria } : {}),
                ...(opts.current ? { "aria-current": "page" } : {}),
                ...(opts.disabled || loading ? { disabled: "" } : {}),
            },
            handleEvent: {
                event: "click",
                cb: () => {
                    view.page = page;
                    changed();
                },
            },
        });
    }
    function render() {
        const list = visibleRows();
        const total = server ? serverTotal : list.length;
        const size = view.pageSize === "all" ? Math.max(total, 1) : view.pageSize;
        const pages = paged ? Math.max(1, Math.ceil(total / size)) : 1;
        view.page = Math.min(Math.max(view.page, 1), pages);
        const start = paged ? (view.page - 1) * size : 0;
        // szerver módban a sorok már az aktuális oldal sorai
        const slice = paged && !server ? list.slice(start, start + size) : list;
        tbody.textContent = "";
        if (slice.length) {
            slice.forEach((row, i) => tbody.appendChild(buildRow(row, i)));
        }
        else {
            const cols = Math.max(headers.length, 1);
            tbody.appendChild((0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                tag: "tr",
                append: false,
                attrs: { class: "table-empty" },
                children: [{ tag: "td", text: L.noResults, attrs: { colspan: String(cols) } }],
            }));
        }
        // fejléc rendezési állapot
        headCells.forEach((th, i) => {
            const active = view.sortCol === i && view.sortDir !== "none";
            th.setAttribute("aria-sort", active ? (view.sortDir === "asc" ? "ascending" : "descending") : "none");
            th.classList.toggle("is-sorted", active);
            const btn = sortButtons[i];
            if (btn)
                btn.setAttribute("title", active ? (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(view.sortDir === "asc" ? L.sortAsc : L.sortDesc) : "");
        });
        // info + lapozó
        const from = total === 0 ? 0 : start + 1;
        const to = start + slice.length;
        const all = server ? serverTotal : rawRows.length;
        info.textContent = L.info
            ? L.info({ from, to, total, all })
            : paged
                ? `${from}–${to} / ${total}`
                : `${total} / ${all}`;
        pager.textContent = "";
        if (paged) {
            pager.hidden = pages <= 1;
            pager.appendChild(pageButton(`‹ ${(0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(L.prev)}`, view.page - 1, { disabled: view.page === 1, aria: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(L.prev) }));
            pageList(view.page, pages).forEach((n) => {
                if (n === "…") {
                    pager.appendChild((0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "span", append: false, text: "…", attrs: { class: "table-page-gap", "aria-hidden": "true" } }));
                }
                else {
                    pager.appendChild(pageButton(String(n), n, { current: n === view.page, aria: `${(0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(L.page)} ${n}` }));
                }
            });
            pager.appendChild(pageButton(`${(0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(L.next)} ›`, view.page + 1, { disabled: view.page === pages, aria: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(L.next) }));
        }
    }
    render();
    // nyelvváltáskor a cellák, feliratok és a (nyelvfüggő) rendezés is újraszámolódik; az állapot (oldal, szűrő) megmarad
    (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.watchLocale)(container, () => render());
    if (!server)
        return container;
    // ---- szerveroldali vezérlő ----
    const controller = container;
    controller.setData = (newData, opts = {}) => {
        const incoming = newData;
        const raw = incoming.map((row) => Array.isArray(row) ? row : (objectKeys ?? Object.keys(row)).map((k) => row[k] ?? ""));
        if (opts.total !== undefined)
            serverTotal = opts.total;
        if (opts.page !== undefined)
            view.page = Math.max(1, opts.page);
        const size = view.pageSize === "all" ? 0 : view.pageSize;
        rows = decorate(raw, size ? (view.page - 1) * size : 0);
        setLoading(false);
        render();
    };
    controller.setLoading = (on = true) => {
        setLoading(on);
        render();
    };
    controller.getQuery = currentQuery;
    controller.reload = () => requestServer();
    return controller;
}


/***/ },

/***/ "./src/components/createTabs.ts"
/*!**************************************!*\
  !*** ./src/components/createTabs.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTabs: () => (/* binding */ createTabs)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

/**
 * Tabok a WAI-ARIA tabs minta szerint: roving tabindex, nyilak (körbeér), Home / End,
 * a fókusz aktivál.
 */
function createTabs(params) {
    const activeId = params.tabs.some((t) => t.id === params.activeTab) ? params.activeTab : params.tabs[0]?.id;
    const base = params.id || "tabs";
    const tabButtons = params.tabs.map((tab) => {
        const on = tab.id === activeId;
        return {
            tag: "button",
            text: tab.label,
            attrs: {
                type: "button",
                class: `tab-button${on ? " active" : ""}`,
                role: "tab",
                id: `${base}-tab-${tab.id}`,
                "aria-controls": `${base}-panel-${tab.id}`,
                "aria-selected": String(on),
                tabindex: on ? "0" : "-1",
                "data-tab": tab.id,
            },
        };
    });
    const tabPanels = params.tabs.map((tab) => {
        const on = tab.id === activeId;
        const content = Array.isArray(tab.content) ? tab.content : [tab.content];
        return {
            tag: "div",
            attrs: {
                class: `tab-panel${on ? " active" : ""}`,
                role: "tabpanel",
                id: `${base}-panel-${tab.id}`,
                "aria-labelledby": `${base}-tab-${tab.id}`,
                tabindex: "0",
                "data-tab-panel": tab.id,
            },
            children: content,
        };
    });
    const rootAttrs = { class: `tabs${params.class ? ` ${params.class}` : ""}` };
    if (params.id)
        rootAttrs.id = params.id;
    const listAttrs = { class: "tab-buttons", role: "tablist" };
    if (params.ariaLabel)
        listAttrs["aria-label"] = params.ariaLabel;
    const root = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: rootAttrs,
        children: [
            { tag: "div", attrs: listAttrs, children: tabButtons },
            { tag: "div", attrs: { class: "tab-panels" }, children: tabPanels },
        ],
    });
    const buttons = Array.from(root.querySelectorAll(".tab-button"));
    const panels = Array.from(root.querySelectorAll(".tab-panel"));
    function select(btn, focus) {
        const id = btn.dataset.tab;
        const changed = !btn.classList.contains("active");
        buttons.forEach((b) => {
            const on = b === btn;
            b.classList.toggle("active", on);
            b.setAttribute("aria-selected", String(on));
            b.tabIndex = on ? 0 : -1;
        });
        panels.forEach((p) => p.classList.toggle("active", p.dataset.tabPanel === id));
        if (focus)
            btn.focus();
        if (changed)
            params.onChange?.(id);
    }
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => select(btn, false));
        btn.addEventListener("keydown", (e) => {
            const i = buttons.indexOf(btn);
            let next;
            if (e.key === "ArrowRight")
                next = buttons[(i + 1) % buttons.length];
            else if (e.key === "ArrowLeft")
                next = buttons[(i - 1 + buttons.length) % buttons.length];
            else if (e.key === "Home")
                next = buttons[0];
            else if (e.key === "End")
                next = buttons[buttons.length - 1];
            else
                return;
            e.preventDefault();
            select(next, true);
        });
    });
    return root;
}


/***/ },

/***/ "./src/components/createTextarea.ts"
/*!******************************************!*\
  !*** ./src/components/createTextarea.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTextarea: () => (/* binding */ createTextarea)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createTextarea(params) {
    const events = [];
    if (params.onChange)
        events.push({ event: "change", cb: params.onChange });
    if (params.click)
        events.push({ event: "click", cb: params.click });
    if (params.handleEvent)
        events.push(...(Array.isArray(params.handleEvent) ? params.handleEvent : [params.handleEvent]));
    const taAttrs = {
        id: params.id,
        name: params.name || params.id,
        class: `textarea-input${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.placeholder)
        taAttrs.placeholder = params.placeholder;
    if (params.rows != null)
        taAttrs.rows = params.rows;
    if (params.cols != null)
        taAttrs.cols = params.cols;
    const textareaEl = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "textarea",
        text: params.value != null ? String(params.value) : undefined,
        attrs: taAttrs,
        handleEvent: events.length > 0 ? events : undefined,
    });
    const containerAttrs = { class: `textarea-wrapper${params.class ? ` ${params.class}` : ""}` };
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: containerAttrs,
        children: params.labelText
            ? [(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "label", text: params.labelText, attrs: { for: params.id, class: `textarea-label${params.class ? ` ${params.class}` : ""}` } }), textareaEl]
            : [textareaEl],
    });
}


/***/ },

/***/ "./src/components/createTimeline.ts"
/*!******************************************!*\
  !*** ./src/components/createTimeline.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTimeline: () => (/* binding */ createTimeline)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function buildItem(item) {
    const head = [{ tag: "span", text: item.period, attrs: { class: "timeline-period" } }];
    if (item.badge)
        head.push({ tag: "span", text: item.badge, attrs: { class: "timeline-badge" } });
    const card = [
        { tag: "div", attrs: { class: "timeline-head" }, children: head },
        { tag: "h3", text: item.title, attrs: { class: "timeline-title" } },
    ];
    if (item.subtitle)
        card.push({ tag: "div", text: item.subtitle, attrs: { class: "timeline-subtitle" } });
    if (item.description)
        card.push({ tag: "p", text: item.description, attrs: { class: "timeline-desc" } });
    return {
        tag: "div",
        attrs: { class: "timeline-item", role: "listitem" },
        children: [
            { tag: "span", attrs: { class: "timeline-dot", "aria-hidden": "true" } },
            { tag: "div", attrs: { class: "timeline-card" }, children: card },
        ],
    };
}
/**
 * Függőleges idővonal, váltakozó oldalú kártyákkal (keskeny képernyőn egy oszlop).
 * Kompakt nézetben a leírások rejtettek: az `is-compact` osztály kapcsolásával váltható.
 */
function createTimeline(params) {
    const attrs = {
        class: `timeline${params.compact ? " is-compact" : ""}${params.class ? ` ${params.class}` : ""}`,
        role: "list",
    };
    if (params.id)
        attrs.id = params.id;
    if (params.ariaLabel)
        attrs["aria-label"] = params.ariaLabel;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs,
        children: params.items.map(buildItem),
    });
}


/***/ },

/***/ "./src/components/createTitle.ts"
/*!***************************************!*\
  !*** ./src/components/createTitle.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTitle: () => (/* binding */ createTitle)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];
function createTitle(params, level = 1) {
    const index = Math.max(1, Math.min(6, Math.abs(level))) - 1;
    const attrs = {};
    if (params.id)
        attrs.id = params.id;
    if (params.class)
        attrs.class = params.class;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: HEADINGS[index],
        text: params.text,
        parent: params.parent,
        attrs,
    });
}


/***/ },

/***/ "./src/components/createToast.ts"
/*!***************************************!*\
  !*** ./src/components/createToast.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createToast: () => (/* binding */ createToast)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");


/** Cache for toast containers keyed by position */
const containerCache = new Map();
function getContainer(position, width) {
    const existing = containerCache.get(position);
    if (existing && document.body.contains(existing))
        return existing;
    const attrs = { class: `toast-container toast-container-${position}` };
    if (width) {
        attrs.style = `width: ${width}; max-width: ${width}`;
    }
    const container = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: "body",
        attrs,
    });
    containerCache.set(position, container);
    return container;
}
function removeToast(toast) {
    toast.style.opacity = "0";
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}
function createToast(params) {
    const duration = params.duration || 3000;
    const position = params.position || "top-right";
    const container = getContainer(position, params.width);
    const rootAttrs = {
        class: `toast toast-${params.type || "info"}${params.class ? ` ${params.class}` : ""}`,
        role: "status",
        "aria-live": "polite",
    };
    if (params.id)
        rootAttrs.id = params.id;
    const toast = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: container,
        attrs: rootAttrs,
        children: [
            { tag: "span", text: params.message, attrs: { class: "toast-message" } },
            {
                tag: "button",
                text: "\u00D7",
                attrs: { class: "toast-close", "aria-label": (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("toast.close", "Close") },
                handleEvent: {
                    event: "click",
                    cb: (e) => {
                        const t = e.currentTarget.closest(".toast");
                        if (t)
                            removeToast(t);
                    },
                },
            },
        ],
    });
    setTimeout(() => removeToast(toast), duration);
    return toast;
}


/***/ },

/***/ "./src/components/createTooltip.ts"
/*!*****************************************!*\
  !*** ./src/components/createTooltip.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTooltip: () => (/* binding */ createTooltip)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");


function createTooltip(params) {
    const rootAttrs = {
        class: `tooltip-wrapper${params.class ? ` ${params.class}` : ""}`,
        "data-tooltip": params.text,
        "data-tooltip-position": params.position || "top",
    };
    if (params.id)
        rootAttrs.id = params.id;
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: rootAttrs,
        children: [
            {
                tag: "span",
                attrs: { class: "tooltip-trigger" },
                children: [
                    { tag: "span", text: "\u24D8", attrs: { class: "tooltip-icon" } },
                    { tag: "span", text: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("tooltip.info", "Info"), attrs: { class: "tooltip-trigger-text" } },
                ],
            },
            { tag: "span", attrs: { class: "tooltip-content" }, text: params.text },
        ],
        handleEvent: params.trigger === "click"
            ? { event: "click", cb: (e) => { e.currentTarget.classList.toggle("tooltip-active"); } }
            : undefined,
    });
}


/***/ },

/***/ "./src/components/createVideo.ts"
/*!***************************************!*\
  !*** ./src/components/createVideo.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createVideo: () => (/* binding */ createVideo)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _createSpinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSpinner */ "./src/components/createSpinner.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");



function toElement(n) {
    return n instanceof HTMLElement ? n : (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ ...n, append: false });
}
const EXT_TYPES = {
    mp4: "video/mp4",
    m4v: "video/mp4",
    webm: "video/webm",
    ogv: "video/ogg",
    ogg: "video/ogg",
    mov: "video/quicktime",
};
function guessType(src) {
    const ext = src.split(/[?#]/)[0].split(".").pop()?.toLowerCase();
    return ext ? EXT_TYPES[ext] : undefined;
}
/**
 * Önállóan töltő videó (mp4, webm, ogg ...): betöltés alatt spinner (injektálható),
 * siker esetén a lejátszó, hiba esetén fallback újrapróbálás gombbal. Ugyanúgy viselkedik,
 * mint a `createImage`: a keret a megadott méretű már betöltés és hiba alatt is.
 * A figure `data-state` attribútuma (loading / loaded / error) stílushoz használható.
 */
function createVideo(params) {
    const retries = params.retries ?? 0;
    const base = params.id || "video";
    const preload = params.preload ?? "metadata";
    const autoplay = params.autoplay ?? false;
    const muted = params.muted ?? autoplay; // az autoplay a böngészőkben némítást igényel
    const video = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "video",
        append: false,
        attrs: {
            class: "image-element video-element",
            preload,
            ...(params.controls === false ? {} : { controls: "" }),
            ...(params.loop ? { loop: "" } : {}),
            ...(params.poster ? { poster: params.poster } : {}),
            ...(params.ariaLabel ? { "aria-label": params.ariaLabel } : {}),
            ...(params.width ? { width: String(params.width) } : {}),
            ...(params.height ? { height: String(params.height) } : {}),
        },
    });
    video.muted = muted;
    video.autoplay = autoplay;
    if (params.playsInline !== false)
        video.setAttribute("playsinline", "");
    const layer = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "div", append: false, attrs: { class: "image-layer" } });
    // A keret már betöltés / hiba alatt is akkora, mint amekkora a videó lesz (ha a méret ismert)
    const css = (v) => (typeof v === "number" ? `${v}px` : v);
    const frameStyle = {};
    if (params.width)
        frameStyle.width = css(params.width);
    if (params.height)
        frameStyle.height = css(params.height);
    if (typeof params.width === "number" && typeof params.height === "number") {
        frameStyle.aspectRatio = `${params.width} / ${params.height}`;
        frameStyle.height = "auto";
    }
    const sized = !!params.width && !!params.height;
    const frame = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        append: false,
        attrs: { class: "image-frame" },
        style: frameStyle,
        children: [video, layer],
    });
    const children = [frame];
    if (params.caption) {
        children.push({ tag: "figcaption", text: params.caption, attrs: { class: "image-caption" } });
    }
    const rootAttrs = {
        class: `image-container video-container${sized ? " has-size" : ""}${params.class ? ` ${params.class}` : ""}`,
        "data-state": "loading",
    };
    if (params.id)
        rootAttrs.id = params.id;
    const root = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ tag: "figure", parent: params.parent, attrs: rootAttrs, children });
    const sources = (Array.isArray(params.src) ? params.src : [{ src: params.src, type: undefined }]).map((s) => ({
        src: s.src,
        type: s.type ?? guessType(s.src),
    }));
    const lastSrc = sources[sources.length - 1].src;
    let state = "";
    let token = 0;
    let cleanup = null;
    const setState = (s) => {
        if (s === state)
            return;
        state = s;
        root.dataset.state = s;
        root.setAttribute("aria-busy", String(s === "loading"));
        params.onStateChange?.(s);
    };
    const showLayer = (el) => {
        layer.textContent = "";
        if (el)
            layer.appendChild(el);
    };
    const showSpinner = () => {
        const s = params.spinner;
        if (s === false)
            return showLayer(null);
        if (s === undefined) {
            layer.textContent = "";
            (0,_createSpinner__WEBPACK_IMPORTED_MODULE_1__.createSpinner)({ parent: layer, id: `${base}-spinner`, size: "md" });
            return;
        }
        showLayer(toElement(typeof s === "function" ? s() : s));
    };
    const retry = () => load();
    function fail(error) {
        cleanup?.();
        cleanup = null;
        setState("error");
        video.pause();
        video.textContent = "";
        video.removeAttribute("src");
        const fb = params.fallback;
        if (fb === undefined) {
            showLayer((0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                tag: "div",
                append: false,
                attrs: { class: "image-error", role: "alert" },
                children: [
                    { tag: "span", text: params.errorText ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_2__.builtin)("video.error", "A videó nem tölthető be") },
                    {
                        tag: "button",
                        text: params.retryText ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_2__.builtin)("video.retry", "Újra"),
                        attrs: { type: "button", class: "image-retry" },
                        handleEvent: { event: "click", cb: retry },
                    },
                ],
            }));
        }
        else {
            showLayer(toElement(typeof fb === "function" ? fb(error, retry) : fb));
        }
        params.onError?.(error);
    }
    function attachSources() {
        video.pause();
        video.textContent = "";
        video.removeAttribute("src");
        if (sources.length === 1) {
            video.src = sources[0].src;
        }
        else {
            for (const s of sources) {
                const el = document.createElement("source");
                el.src = s.src;
                if (s.type)
                    el.type = s.type;
                video.appendChild(el);
            }
        }
        video.load();
    }
    // Több <source> esetén csak az utolsó hibája végleges (előtte a böngésző a következőre lép)
    const isFinalError = (e) => {
        const t = e.target;
        return !(t instanceof HTMLSourceElement) || t === video.lastElementChild;
    };
    function load(attempt = 0) {
        const mine = ++token;
        cleanup?.();
        if (attempt === 0) {
            setState("loading");
            showSpinner();
        }
        let timer;
        const detach = () => {
            if (timer)
                clearTimeout(timer);
            video.removeEventListener("loadedmetadata", onReady);
            video.removeEventListener("loadeddata", onReady);
            video.removeEventListener("error", onError, true);
        };
        const onLateError = (e) => {
            if (mine !== token || !isFinalError(e))
                return;
            fail(new Error(`Failed to play video: ${lastSrc}`));
        };
        function onReady() {
            if (mine !== token)
                return;
            detach();
            showLayer(null);
            setState("loaded");
            params.onLoad?.(video);
            // betöltés utáni (pl. lejátszás közbeni) hiba is fallbackre vált
            video.addEventListener("error", onLateError, true);
            cleanup = () => video.removeEventListener("error", onLateError, true);
        }
        function onError(e) {
            if (mine !== token || !isFinalError(e))
                return;
            detach();
            if (attempt < retries)
                return load(attempt + 1);
            fail(new Error(`Failed to load video: ${lastSrc}`));
        }
        video.addEventListener("loadedmetadata", onReady);
        video.addEventListener("loadeddata", onReady);
        video.addEventListener("error", onError, true);
        cleanup = detach;
        if (params.timeout) {
            timer = setTimeout(() => {
                if (mine !== token)
                    return;
                detach();
                if (attempt < retries)
                    return load(attempt + 1);
                fail(new Error(`Timed out loading video: ${sources[0].src}`));
            }, params.timeout);
        }
        attachSources();
        // preload="none": a böngésző nem tölt semmit lejátszásig, ezért azonnal készre jelentjük
        if (preload === "none")
            onReady();
    }
    if (params.lazy && typeof IntersectionObserver !== "undefined") {
        setState("loading");
        showSpinner();
        const observer = new IntersectionObserver((entries) => {
            if (entries.some((en) => en.isIntersecting)) {
                observer.disconnect();
                load();
            }
        });
        observer.observe(root);
    }
    else {
        load();
    }
    return root;
}


/***/ },

/***/ "./src/components/highlighter.ts"
/*!***************************************!*\
  !*** ./src/components/highlighter.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   highlightCode: () => (/* binding */ highlightCode)
/* harmony export */ });
const JS_KEYWORDS = new Set([
    "abstract", "arguments", "async", "await", "boolean", "break", "byte",
    "case", "catch", "char", "class", "const", "continue", "debugger",
    "default", "delete", "do", "double", "else", "enum", "export",
    "extends", "false", "final", "finally", "float", "for", "from",
    "function", "goto", "if", "implements", "import", "in", "instanceof",
    "int", "interface", "let", "long", "native", "new", "null", "of",
    "package", "private", "protected", "public", "return", "short",
    "static", "super", "switch", "synchronized", "this", "throw",
    "throws", "transient", "true", "try", "typeof", "undefined", "var",
    "void", "volatile", "while", "with", "yield",
]);
const TS_KEYWORDS = new Set([
    ...JS_KEYWORDS,
    "any", "constructor", "declare", "enum", "keyof", "module", "namespace",
    "never", "object", "readonly", "require", "set", "get",
    "string", "symbol", "type", "unique", "unknown", "as",
]);
const PY_KEYWORDS = new Set([
    "False", "None", "True", "and", "as", "assert", "async", "await",
    "break", "class", "continue", "def", "del", "elif", "else", "except",
    "finally", "for", "from", "global", "if", "import", "in", "is",
    "lambda", "nonlocal", "not", "or", "pass", "raise", "return",
    "try", "while", "with", "yield", "self", "cls",
]);
const BASH_KEYWORDS = new Set([
    "if", "then", "else", "elif", "fi", "case", "esac", "for", "while",
    "until", "do", "done", "in", "function", "return", "exit", "local",
    "export", "source", "alias", "unalias", "declare", "typeset",
    "readonly", "shift", "trap", "wait", "eval", "exec", "set", "unset",
]);
const BASH_BUILTINS = new Set([
    "echo", "printf", "read", "test", "cd", "pwd", "ls", "cp", "mv", "rm",
    "mkdir", "rmdir", "cat", "head", "tail", "grep", "find", "sed", "awk",
    "sort", "uniq", "wc", "curl", "wget", "chmod", "chown", "ln", "touch",
    "tar", "gzip", "gunzip", "ssh", "scp", "git", "npm", "node", "npx",
    "export", "source", "alias", "history", "env", "which", "type",
]);
const PS_KEYWORDS = new Set([
    "begin", "break", "catch", "class", "continue", "data", "do", "dynamicparam",
    "else", "elseif", "end", "exit", "filter", "finally", "for", "foreach",
    "from", "function", "if", "in", "inlinescript", "param", "process",
    "return", "switch", "throw", "trap", "try", "until", "using", "while",
    "workflow", "where", "foreach", "hidden", "static", "abstract",
]);
const PS_BUILTINS = new Set([
    "Write-Host", "Write-Output", "Write-Error", "Write-Warning", "Write-Verbose",
    "Get-ChildItem", "Set-Location", "Get-Location", "Copy-Item", "Move-Item",
    "Remove-Item", "New-Item", "Get-Content", "Set-Content", "Test-Path",
    "Select-String", "ForEach-Object", "Where-Object", "Sort-Object",
    "Import-Csv", "Export-Csv", "Invoke-Command", "Get-Help", "Get-Command",
    "Out-Null", "Out-File", "Select-Object", "Measure-Object", "Group-Object",
    "ForEach-Object", "Where-Object", "Sort-Object", "Compare-Object",
]);
const JS_BUILTINS = new Set([
    "console", "document", "window", "Math", "JSON", "Array", "Object",
    "String", "Number", "Boolean", "Date", "RegExp", "Error", "Promise",
    "Map", "Set", "WeakMap", "WeakSet", "Symbol", "Proxy", "Reflect",
    "parseInt", "parseFloat", "isNaN", "isFinite", "setTimeout",
    "setInterval", "clearTimeout", "clearInterval", "fetch", "alert",
    "confirm", "prompt", "require", "module", "exports",
]);
const TS_BUILTINS = new Set([
    ...JS_BUILTINS,
    "Record", "Partial", "Required", "Readonly", "Pick", "Omit",
    "Exclude", "Extract", "NonNullable", "ReturnType", "Parameters",
    "HTMLElement", "Event", "NodeList",
]);
const PY_BUILTINS = new Set([
    "print", "len", "range", "int", "str", "float", "list", "dict",
    "set", "tuple", "bool", "type", "input", "open", "super", "property",
    "staticmethod", "classmethod", "enumerate", "zip", "map", "filter",
    "sorted", "reversed", "abs", "max", "min", "sum", "any", "all",
    "isinstance", "issubclass", "hasattr", "getattr", "setattr", "delattr",
    "repr", "id", "hash", "callable", "iter", "next",
]);
function getLanguagePatterns(lang) {
    const patterns = [];
    if (lang === "bash") {
        patterns.push({ regex: /#.*$/gm, className: "hl-comment" });
        patterns.push({ regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, className: "hl-string" });
        patterns.push({ regex: /\$\{?[\w]+\}?/g, className: "hl-variable" });
        patterns.push({ regex: /\b\d+\b/g, className: "hl-number" });
        patterns.push({ regex: /[|&;><]+/g, className: "hl-operator" });
        patterns.push({
            regex: new RegExp(`\\b(?:${Array.from(BASH_KEYWORDS).join("|")})\\b`, "g"),
            className: "hl-keyword",
        });
        patterns.push({
            regex: new RegExp(`\\b(?:${Array.from(BASH_BUILTINS).join("|")})\\b`, "g"),
            className: "hl-builtin",
        });
        return patterns;
    }
    if (lang === "powershell") {
        patterns.push({ regex: /#.*$/gm, className: "hl-comment" });
        patterns.push({ regex: /<#[\s\S]*?#>/g, className: "hl-comment" });
        patterns.push({ regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, className: "hl-string" });
        patterns.push({ regex: /\$[\w]+/g, className: "hl-variable" });
        patterns.push({ regex: /\b\d+\b/g, className: "hl-number" });
        patterns.push({
            regex: new RegExp(`\\b(?:${Array.from(PS_KEYWORDS).join("|")})\\b`, "g"),
            className: "hl-keyword",
        });
        patterns.push({
            regex: new RegExp(`(?:${Array.from(PS_BUILTINS).join("|")})`, "g"),
            className: "hl-builtin",
        });
        return patterns;
    }
    if (lang === "html") {
        patterns.push({ regex: /&lt;!--[\s\S]*?--&gt;/g, className: "hl-comment" });
        patterns.push({ regex: /&lt;\/?[\w-]+/g, className: "hl-keyword" });
        patterns.push({ regex: /&gt;/g, className: "hl-keyword" });
        patterns.push({ regex: /[\w-]+=/g, className: "hl-attr" });
        patterns.push({ regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, className: "hl-string" });
        return patterns;
    }
    if (lang === "css") {
        patterns.push({ regex: /\/\*[\s\S]*?\*\//g, className: "hl-comment" });
        patterns.push({ regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, className: "hl-string" });
        patterns.push({ regex: /\b\d+\.?\d*(?:px|em|rem|%|vh|vw|s|ms)?\b/g, className: "hl-number" });
        patterns.push({ regex: /#[\da-fA-F]{3,8}\b/g, className: "hl-number" });
        patterns.push({ regex: /[\w-]+(?=\s*:)/g, className: "hl-attr" });
        patterns.push({ regex: /:[\w-]+/g, className: "hl-keyword" });
        return patterns;
    }
    const keywords = lang === "python" ? PY_KEYWORDS : lang === "typescript" ? TS_KEYWORDS : JS_KEYWORDS;
    const builtins = lang === "python" ? PY_BUILTINS : lang === "typescript" ? TS_BUILTINS : JS_BUILTINS;
    // Python triple-quoted strings — must come before generic strings
    if (lang === "python") {
        patterns.push({ regex: /"""[\s\S]*?"""|'''[\s\S]*?'''/g, className: "hl-string" });
    }
    // Generic strings before comments — so // inside URLs isn't treated as a comment
    patterns.push({ regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g, className: "hl-string" });
    if (lang === "python") {
        patterns.push({ regex: /#.*$/gm, className: "hl-comment" });
    }
    else {
        patterns.push({ regex: /\/\/.*$/gm, className: "hl-comment" });
        patterns.push({ regex: /\/\*[\s\S]*?\*\//g, className: "hl-comment" });
    }
    if (lang === "python") {
        patterns.push({ regex: /\b(?:0x[\da-fA-F]+|0o[0-7]+|0b[01]+|\d+\.?\d*(?:e[+-]?\d+)?)\b/g, className: "hl-number" });
    }
    else {
        patterns.push({ regex: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g, className: "hl-number" });
    }
    patterns.push({ regex: /[=!<>&|+\-*/%]+/g, className: "hl-operator" });
    patterns.push({
        regex: new RegExp(`\\b(?:${Array.from(keywords).join("|")})\\b`, "g"),
        className: "hl-keyword",
    });
    patterns.push({
        regex: new RegExp(`\\b(?:${Array.from(builtins).join("|")})\\b`, "g"),
        className: "hl-builtin",
    });
    if (lang === "typescript") {
        patterns.push({ regex: /\b(?:string|number|boolean|any|void|never|null|undefined|unknown|object|symbol|bigint)\b/g, className: "hl-type" });
    }
    if (lang === "python") {
        patterns.push({ regex: /\b(?:class|def)\s+(\w+)/g, className: "hl-function" });
    }
    else {
        patterns.push({ regex: /\b(?:function|class)\s+(\w+)/g, className: "hl-function" });
        patterns.push({ regex: /(\w+)\s*(?=\()/g, className: "hl-function" });
    }
    return patterns;
}
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
function highlightCode(code, language) {
    if (!language)
        return escapeHtml(code);
    const lang = language.toLowerCase();
    const validLangs = ["javascript", "typescript", "python", "bash", "powershell", "html", "css"];
    if (!validLangs.includes(lang)) {
        return escapeHtml(code);
    }
    const patterns = getLanguagePatterns(lang);
    const tokens = [];
    for (const pattern of patterns) {
        const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
        let match;
        while ((match = regex.exec(code)) !== null) {
            const start = match.index;
            const end = start + match[0].length;
            const overlap = tokens.some((t) => start < t.end && end > t.start);
            if (!overlap) {
                tokens.push({ start, end, className: pattern.className });
            }
        }
    }
    tokens.sort((a, b) => a.start - b.start);
    let result = "";
    let lastEnd = 0;
    for (const token of tokens) {
        if (token.start > lastEnd) {
            result += escapeHtml(code.slice(lastEnd, token.start));
        }
        result += `<span class="${token.className}">${escapeHtml(code.slice(token.start, token.end))}</span>`;
        lastEnd = token.end;
    }
    if (lastEnd < code.length) {
        result += escapeHtml(code.slice(lastEnd));
    }
    return result;
}


/***/ },

/***/ "./src/components/index.ts"
/*!*********************************!*\
  !*** ./src/components/index.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asyncImage: () => (/* reexport safe */ _asyncImage__WEBPACK_IMPORTED_MODULE_38__.asyncImage),
/* harmony export */   closeDrawer: () => (/* reexport safe */ _createDrawer__WEBPACK_IMPORTED_MODULE_28__.closeDrawer),
/* harmony export */   closeModal: () => (/* reexport safe */ _createModal__WEBPACK_IMPORTED_MODULE_32__.closeModal),
/* harmony export */   createAccordion: () => (/* reexport safe */ _createAccordion__WEBPACK_IMPORTED_MODULE_18__.createAccordion),
/* harmony export */   createAlert: () => (/* reexport safe */ _createAlert__WEBPACK_IMPORTED_MODULE_6__.createAlert),
/* harmony export */   createAvatar: () => (/* reexport safe */ _createAvatar__WEBPACK_IMPORTED_MODULE_20__.createAvatar),
/* harmony export */   createBadge: () => (/* reexport safe */ _createBadge__WEBPACK_IMPORTED_MODULE_8__.createBadge),
/* harmony export */   createBlockquote: () => (/* reexport safe */ _createBlockquote__WEBPACK_IMPORTED_MODULE_16__.createBlockquote),
/* harmony export */   createBreadcrumb: () => (/* reexport safe */ _createBreadcrumb__WEBPACK_IMPORTED_MODULE_4__.createBreadcrumb),
/* harmony export */   createCard: () => (/* reexport safe */ _createCard__WEBPACK_IMPORTED_MODULE_0__.createCard),
/* harmony export */   createCarousel: () => (/* reexport safe */ _createCarousel__WEBPACK_IMPORTED_MODULE_39__.createCarousel),
/* harmony export */   createCodeBlock: () => (/* reexport safe */ _createCodeBlock__WEBPACK_IMPORTED_MODULE_15__.createCodeBlock),
/* harmony export */   createContainer: () => (/* reexport safe */ _createContainer__WEBPACK_IMPORTED_MODULE_1__.createContainer),
/* harmony export */   createCustomDatePicker: () => (/* reexport safe */ _createCustomDatePicker__WEBPACK_IMPORTED_MODULE_22__.createCustomDatePicker),
/* harmony export */   createCustomDateRangePicker: () => (/* reexport safe */ _createCustomDateRangePicker__WEBPACK_IMPORTED_MODULE_26__.createCustomDateRangePicker),
/* harmony export */   createCustomDateTimePicker: () => (/* reexport safe */ _createCustomDateTimePicker__WEBPACK_IMPORTED_MODULE_25__.createCustomDateTimePicker),
/* harmony export */   createCustomMonthPicker: () => (/* reexport safe */ _createCustomMonthPicker__WEBPACK_IMPORTED_MODULE_24__.createCustomMonthPicker),
/* harmony export */   createCustomSelect: () => (/* reexport safe */ _createCustomSelect__WEBPACK_IMPORTED_MODULE_21__.createCustomSelect),
/* harmony export */   createCustomWeekPicker: () => (/* reexport safe */ _createCustomWeekPicker__WEBPACK_IMPORTED_MODULE_23__.createCustomWeekPicker),
/* harmony export */   createDivider: () => (/* reexport safe */ _createDivider__WEBPACK_IMPORTED_MODULE_17__.createDivider),
/* harmony export */   createDragAndDropFileInput: () => (/* reexport safe */ _createDragAndDropFileInput__WEBPACK_IMPORTED_MODULE_27__.createDragAndDropFileInput),
/* harmony export */   createDrawer: () => (/* reexport safe */ _createDrawer__WEBPACK_IMPORTED_MODULE_28__.createDrawer),
/* harmony export */   createForm: () => (/* reexport safe */ _createForm__WEBPACK_IMPORTED_MODULE_31__.createForm),
/* harmony export */   createGantt: () => (/* reexport safe */ _createGantt__WEBPACK_IMPORTED_MODULE_41__.createGantt),
/* harmony export */   createGrid: () => (/* reexport safe */ _createGrid__WEBPACK_IMPORTED_MODULE_2__.createGrid),
/* harmony export */   createImage: () => (/* reexport safe */ _createImage__WEBPACK_IMPORTED_MODULE_11__.createImage),
/* harmony export */   createLink: () => (/* reexport safe */ _createLink__WEBPACK_IMPORTED_MODULE_14__.createLink),
/* harmony export */   createMenu: () => (/* reexport safe */ _createMenu__WEBPACK_IMPORTED_MODULE_29__.createMenu),
/* harmony export */   createModal: () => (/* reexport safe */ _createModal__WEBPACK_IMPORTED_MODULE_32__.createModal),
/* harmony export */   createMusicPlayer: () => (/* reexport safe */ _createMusicPlayer__WEBPACK_IMPORTED_MODULE_13__.createMusicPlayer),
/* harmony export */   createNav: () => (/* reexport safe */ _createNav__WEBPACK_IMPORTED_MODULE_3__.createNav),
/* harmony export */   createOrderedList: () => (/* reexport safe */ _createLists__WEBPACK_IMPORTED_MODULE_35__.createOrderedList),
/* harmony export */   createParagraph: () => (/* reexport safe */ _createParagraph__WEBPACK_IMPORTED_MODULE_33__.createParagraph),
/* harmony export */   createProgressBar: () => (/* reexport safe */ _createProgressBar__WEBPACK_IMPORTED_MODULE_10__.createProgressBar),
/* harmony export */   createSpinner: () => (/* reexport safe */ _createSpinner__WEBPACK_IMPORTED_MODULE_9__.createSpinner),
/* harmony export */   createTable: () => (/* reexport safe */ _createTable__WEBPACK_IMPORTED_MODULE_36__.createTable),
/* harmony export */   createTabs: () => (/* reexport safe */ _createTabs__WEBPACK_IMPORTED_MODULE_5__.createTabs),
/* harmony export */   createTextarea: () => (/* reexport safe */ _createTextarea__WEBPACK_IMPORTED_MODULE_30__.createTextarea),
/* harmony export */   createTimeline: () => (/* reexport safe */ _createTimeline__WEBPACK_IMPORTED_MODULE_40__.createTimeline),
/* harmony export */   createTitle: () => (/* reexport safe */ _createTitle__WEBPACK_IMPORTED_MODULE_34__.createTitle),
/* harmony export */   createToast: () => (/* reexport safe */ _createToast__WEBPACK_IMPORTED_MODULE_7__.createToast),
/* harmony export */   createTooltip: () => (/* reexport safe */ _createTooltip__WEBPACK_IMPORTED_MODULE_19__.createTooltip),
/* harmony export */   createUnorderedList: () => (/* reexport safe */ _createLists__WEBPACK_IMPORTED_MODULE_35__.createUnorderedList),
/* harmony export */   createVideo: () => (/* reexport safe */ _createVideo__WEBPACK_IMPORTED_MODULE_12__.createVideo),
/* harmony export */   newLine: () => (/* reexport safe */ _newLine__WEBPACK_IMPORTED_MODULE_37__.newLine),
/* harmony export */   openDrawer: () => (/* reexport safe */ _createDrawer__WEBPACK_IMPORTED_MODULE_28__.openDrawer),
/* harmony export */   openModal: () => (/* reexport safe */ _createModal__WEBPACK_IMPORTED_MODULE_32__.openModal)
/* harmony export */ });
/* harmony import */ var _createCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createCard */ "./src/components/createCard.ts");
/* harmony import */ var _createContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createContainer */ "./src/components/createContainer.ts");
/* harmony import */ var _createGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createGrid */ "./src/components/createGrid.ts");
/* harmony import */ var _createNav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createNav */ "./src/components/createNav.ts");
/* harmony import */ var _createBreadcrumb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createBreadcrumb */ "./src/components/createBreadcrumb.ts");
/* harmony import */ var _createTabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createTabs */ "./src/components/createTabs.ts");
/* harmony import */ var _createAlert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createAlert */ "./src/components/createAlert.ts");
/* harmony import */ var _createToast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./createToast */ "./src/components/createToast.ts");
/* harmony import */ var _createBadge__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./createBadge */ "./src/components/createBadge.ts");
/* harmony import */ var _createSpinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createSpinner */ "./src/components/createSpinner.ts");
/* harmony import */ var _createProgressBar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createProgressBar */ "./src/components/createProgressBar.ts");
/* harmony import */ var _createImage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./createImage */ "./src/components/createImage.ts");
/* harmony import */ var _createVideo__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./createVideo */ "./src/components/createVideo.ts");
/* harmony import */ var _createMusicPlayer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./createMusicPlayer */ "./src/components/createMusicPlayer.ts");
/* harmony import */ var _createLink__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./createLink */ "./src/components/createLink.ts");
/* harmony import */ var _createCodeBlock__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./createCodeBlock */ "./src/components/createCodeBlock.ts");
/* harmony import */ var _createBlockquote__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./createBlockquote */ "./src/components/createBlockquote.ts");
/* harmony import */ var _createDivider__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./createDivider */ "./src/components/createDivider.ts");
/* harmony import */ var _createAccordion__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./createAccordion */ "./src/components/createAccordion.ts");
/* harmony import */ var _createTooltip__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./createTooltip */ "./src/components/createTooltip.ts");
/* harmony import */ var _createAvatar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./createAvatar */ "./src/components/createAvatar.ts");
/* harmony import */ var _createCustomSelect__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./createCustomSelect */ "./src/components/createCustomSelect.ts");
/* harmony import */ var _createCustomDatePicker__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./createCustomDatePicker */ "./src/components/createCustomDatePicker.ts");
/* harmony import */ var _createCustomWeekPicker__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./createCustomWeekPicker */ "./src/components/createCustomWeekPicker.ts");
/* harmony import */ var _createCustomMonthPicker__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./createCustomMonthPicker */ "./src/components/createCustomMonthPicker.ts");
/* harmony import */ var _createCustomDateTimePicker__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./createCustomDateTimePicker */ "./src/components/createCustomDateTimePicker.ts");
/* harmony import */ var _createCustomDateRangePicker__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./createCustomDateRangePicker */ "./src/components/createCustomDateRangePicker.ts");
/* harmony import */ var _createDragAndDropFileInput__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./createDragAndDropFileInput */ "./src/components/createDragAndDropFileInput.ts");
/* harmony import */ var _createDrawer__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./createDrawer */ "./src/components/createDrawer.ts");
/* harmony import */ var _createMenu__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./createMenu */ "./src/components/createMenu.ts");
/* harmony import */ var _createTextarea__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./createTextarea */ "./src/components/createTextarea.ts");
/* harmony import */ var _createForm__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./createForm */ "./src/components/createForm.ts");
/* harmony import */ var _createModal__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./createModal */ "./src/components/createModal.ts");
/* harmony import */ var _createParagraph__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./createParagraph */ "./src/components/createParagraph.ts");
/* harmony import */ var _createTitle__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./createTitle */ "./src/components/createTitle.ts");
/* harmony import */ var _createLists__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./createLists */ "./src/components/createLists.ts");
/* harmony import */ var _createTable__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./createTable */ "./src/components/createTable.ts");
/* harmony import */ var _newLine__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./newLine */ "./src/components/newLine.ts");
/* harmony import */ var _asyncImage__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./asyncImage */ "./src/components/asyncImage.ts");
/* harmony import */ var _createCarousel__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./createCarousel */ "./src/components/createCarousel.ts");
/* harmony import */ var _createTimeline__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./createTimeline */ "./src/components/createTimeline.ts");
/* harmony import */ var _createGantt__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./createGantt */ "./src/components/createGantt.ts");












































/***/ },

/***/ "./src/components/newLine.ts"
/*!***********************************!*\
  !*** ./src/components/newLine.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newLine: () => (/* binding */ newLine)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function newLine(parent) {
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({ parent, tag: "br" });
}


/***/ },

/***/ "./src/dom.ts"
/*!********************!*\
  !*** ./src/dom.ts ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDOMElem: () => (/* binding */ createDOMElem),
/* harmony export */   setElementText: () => (/* binding */ setElementText)
/* harmony export */ });
/* harmony import */ var domelemjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! domelemjs */ "./node_modules/domelemjs/dist/index.js");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ "./src/i18n.ts");


const TOKEN = "data-cdb-i18n";
let seq = 0;
/**
 * Szöveg beállítása úgy, hogy az elem gyerek-elemei (pl. egy gombban lévő ikon) megmaradjanak:
 * csak az első szövegcsomópont cserélődik.
 */
function setElementText(el, text) {
    if (el.children.length === 0) {
        el.textContent = text;
        return;
    }
    const node = [...el.childNodes].find((n) => n.nodeType === 3);
    if (node)
        node.nodeValue = text;
    else
        el.insertBefore(document.createTextNode(text), el.firstChild);
}
function prepare(opts, bindings) {
    const out = { ...opts };
    let binding;
    if (opts.text !== undefined && typeof opts.text !== "string") {
        binding = { attrs: {} };
        binding.text = opts.text;
        out.text = (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(opts.text);
    }
    if (opts.content !== undefined && typeof opts.content !== "string") {
        binding ?? (binding = { attrs: {} });
        binding.content = opts.content;
        out.content = (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(opts.content);
    }
    if (opts.attrs) {
        const list = Array.isArray(opts.attrs) ? opts.attrs : [opts.attrs];
        const resolved = list.map((rec) => {
            const r = {};
            for (const [k, v] of Object.entries(rec)) {
                if ((0,_i18n__WEBPACK_IMPORTED_MODULE_1__.isReactiveText)(v)) {
                    binding ?? (binding = { attrs: {} });
                    binding.attrs[k] = v;
                    r[k] = (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(v);
                }
                else {
                    r[k] = v;
                }
            }
            return r;
        });
        out.attrs = resolved;
    }
    if (opts.children) {
        out.children = opts.children.map((c) => (c instanceof HTMLElement ? c : prepare(c, bindings)));
    }
    if (binding) {
        const token = String(++seq);
        bindings.set(token, binding);
        out.attrs = [...(out.attrs ?? []), { [TOKEN]: token }];
    }
    return out;
}
/**
 * `createDOMElem` nyelvesítéssel: a `text` és az attribútumok `tr()` hivatkozást vagy függvényt is
 * elfogadnak, ezeket az elem nyelvváltáskor automatikusan újraszámolja.
 */
function createDOMElem(options) {
    const bindings = new Map();
    const root = (0,domelemjs__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)(prepare(options, bindings));
    if (bindings.size === 0)
        return root;
    const tagged = [root, ...root.querySelectorAll(`[${TOKEN}]`)].filter((el) => el.hasAttribute(TOKEN));
    for (const el of tagged) {
        const binding = bindings.get(el.getAttribute(TOKEN));
        el.removeAttribute(TOKEN);
        if (!binding)
            continue;
        const { text, content, attrs } = binding;
        // a closure csak a forrás-szövegeket tartja, az elemet paraméterként kapja (gyenge hivatkozás)
        (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.watchLocale)(el, (e) => {
            if (text !== undefined)
                setElementText(e, (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(text));
            if (content !== undefined)
                e.innerHTML = (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(content);
            for (const [name, source] of Object.entries(attrs))
                e.setAttribute(name, (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(source));
        });
    }
    return root;
}


/***/ },

/***/ "./src/helpers.ts"
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createInputChildren: () => (/* binding */ createInputChildren),
/* harmony export */   createInputContainer: () => (/* binding */ createInputContainer),
/* harmony export */   createInputElem: () => (/* binding */ createInputElem)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.ts");

function createInputElem(elemType, params) {
    const events = [];
    if (params.onChange)
        events.push({ event: "change", cb: params.onChange });
    if (params.click)
        events.push({ event: "click", cb: params.click });
    if (params.handleEvent) {
        events.push(...(Array.isArray(params.handleEvent) ? params.handleEvent : [params.handleEvent]));
    }
    const attrs = {
        name: params.name || params.id,
        class: `${params.type || elemType}-input${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        attrs.id = params.id;
    if (params.value != null)
        attrs.value = params.value;
    if (params.type)
        attrs.type = params.type;
    if (params.checked != null)
        attrs.checked = params.checked;
    if (params.placeholder)
        attrs.placeholder = params.placeholder;
    if (params.min != null)
        attrs.min = params.min;
    if (params.max != null)
        attrs.max = params.max;
    if (params.step != null)
        attrs.step = params.step;
    if (params.rows != null)
        attrs.rows = params.rows;
    if (params.cols != null)
        attrs.cols = params.cols;
    if (params.start != null)
        attrs.start = params.start;
    return {
        tag: elemType,
        text: params.value != null ? String(params.value) : undefined,
        attrs,
        handleEvent: events.length > 0 ? events : undefined,
    };
}
function createInputChildren(elemType, params) {
    const inputOpts = createInputElem(elemType, params);
    const inputEl = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)(inputOpts);
    if (!params.labelText)
        return [inputEl];
    const labelEl = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "label",
        text: params.labelText,
        attrs: {
            for: params.id,
            class: `${elemType}-label${params.class ? ` ${params.class}` : ""}`,
        },
    });
    return params.labelfirst !== false ? [labelEl, inputEl] : [inputEl, labelEl];
}
function createInputContainer(params, children) {
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: {
            class: `${params.type || "text"}-input${params.class ? ` ${params.class}` : ""}`,
        },
        children,
    });
}


/***/ },

/***/ "./src/i18n.ts"
/*!*********************!*\
  !*** ./src/i18n.ts ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   builtin: () => (/* binding */ builtin),
/* harmony export */   defineMessages: () => (/* binding */ defineMessages),
/* harmony export */   flattenMessages: () => (/* binding */ flattenMessages),
/* harmony export */   getFallbackLocale: () => (/* binding */ getFallbackLocale),
/* harmony export */   getLocale: () => (/* binding */ getLocale),
/* harmony export */   getLocales: () => (/* binding */ getLocales),
/* harmony export */   isReactiveText: () => (/* binding */ isReactiveText),
/* harmony export */   isTextRef: () => (/* binding */ isTextRef),
/* harmony export */   loadMessages: () => (/* binding */ loadMessages),
/* harmony export */   onLocaleChange: () => (/* binding */ onLocaleChange),
/* harmony export */   registerMessages: () => (/* binding */ registerMessages),
/* harmony export */   registerTranslations: () => (/* binding */ registerTranslations),
/* harmony export */   resolveText: () => (/* binding */ resolveText),
/* harmony export */   setFallbackLocale: () => (/* binding */ setFallbackLocale),
/* harmony export */   setLocale: () => (/* binding */ setLocale),
/* harmony export */   t: () => (/* binding */ t),
/* harmony export */   tr: () => (/* binding */ tr),
/* harmony export */   watchLocale: () => (/* binding */ watchLocale)
/* harmony export */ });
/**
 * Nyelvesítés (i18n) a komponensekhez.
 *
 * - Üzenetkatalógusok: `registerMessages(locale, { kulcs: "szöveg" })`, `loadMessages(locale, url)`
 * - Aktuális nyelv: `setLocale("en")`, `getLocale()`; változáskor minden `TextValue`-val létrehozott szöveg
 *   magától frissül (nem kell újra létrehozni a komponenseket, az állapotuk megmarad).
 * - Fordítás: `t(kulcs, paraméterek)` azonnali szöveget ad; `tr(kulcs, paraméterek)` "élő" hivatkozást,
 *   amit a komponensek bármelyik szöveges paramétere elfogad, és nyelvváltáskor újraszámol.
 */
const catalogs = new Map();
let locale = "hu";
let fallbackLocale = "hu";
const PLURAL_CATEGORIES = new Set(["zero", "one", "two", "few", "many", "other"]);
function isPluralNode(node) {
    const keys = Object.keys(node);
    return keys.length > 0 && "other" in node && keys.every((k) => PLURAL_CATEGORIES.has(k) && typeof node[k] !== "object");
}
/**
 * Egymásba ágyazott objektumból lapos `kulcs → szöveg` térkép (a `registerMessages` ezt automatikusan elvégzi).
 * @example flattenMessages({ form: { name: "Név" }, items: { one: "{count} elem", other: "{count} elem" } })
 *          // { "form.name": "Név", "items_one": "{count} elem", "items_other": "{count} elem" }
 */
function flattenMessages(tree, prefix = "") {
    const out = {};
    for (const [key, value] of Object.entries(tree)) {
        if (value == null)
            continue;
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof value === "object") {
            if (isPluralNode(value)) {
                for (const [cat, text] of Object.entries(value))
                    out[`${path}_${cat}`] = String(text);
            }
            else {
                Object.assign(out, flattenMessages(value, path));
            }
        }
        else {
            out[path] = String(value);
        }
    }
    return out;
}
/** Üzenetek hozzáadása egy nyelvhez (a meglévő kulcsok felülíródnak). Lapos és egymásba ágyazott objektumot is elfogad. Nem vált nyelvet. */
function registerMessages(lang, messages) {
    catalogs.set(lang, { ...(catalogs.get(lang) ?? {}), ...flattenMessages(messages) });
}
/**
 * Több nyelv egyszerre egyetlen objektumból: `{ hu: { ... }, en: { ... } }`. A `prefix` minden kulcs elé kerül.
 * @example registerTranslations({ hu: { form: { save: "Mentés" } }, en: { form: { save: "Save" } } });
 */
function registerTranslations(translations, options = {}) {
    for (const [lang, tree] of Object.entries(translations)) {
        registerMessages(lang, options.prefix ? flattenMessages(tree, options.prefix) : tree);
    }
}
function buildRefs(trees, prefix) {
    const out = {};
    const keys = new Set(trees.flatMap((t) => Object.keys(t)));
    for (const key of keys) {
        const path = prefix ? `${prefix}.${key}` : key;
        const nodes = trees.map((t) => t[key]).filter((v) => v != null);
        const objects = nodes.filter((v) => typeof v === "object");
        if (objects.length && objects.every(isPluralNode)) {
            // többes számú csomópont: egyetlen kulcs (a count paraméter választ kategóriát)
            out[key] = tr(path);
        }
        else if (objects.length) {
            out[key] = buildRefs(objects, path);
        }
        else {
            out[key] = tr(path);
        }
    }
    return out;
}
/**
 * Egyetlen hívással: regisztrálja az összes nyelv üzeneteit, és visszaadja a kulcsokra mutató, **típusos** `tr()`
 * hivatkozások fáját. Nem kell kulcs-stringeket gépelni, az IDE kiegészít, az elgépelés fordítási hiba.
 *
 * @example
 * const m = defineMessages({
 *   hu: { form: { name: "Név", save: "Mentés" } },
 *   en: { form: { name: "Name", save: "Save" } },
 * });
 * createTextInput({ parent, id: "n", labelText: m.form.name });   // nyelvváltáskor frissül
 * createButtonInput({ parent, id: "s", text: m.form.save });
 */
function defineMessages(translations, options = {}) {
    registerTranslations(translations, options);
    return buildRefs(Object.values(translations), options.prefix ?? "");
}
/**
 * Üzenetek betöltése JSON URL-ről vagy aszinkron függvényből, majd regisztrálása.
 * @example await loadMessages("de", "/locales/de.json"); setLocale("de");
 */
async function loadMessages(lang, source, init) {
    let messages;
    if (typeof source === "function") {
        messages = await source();
    }
    else {
        const res = await fetch(source, init);
        if (!res.ok)
            throw new Error(`Failed to load messages for "${lang}": HTTP ${res.status} (${source})`);
        messages = (await res.json());
    }
    registerMessages(lang, messages);
}
/** A regisztrált nyelvek kódjai */
function getLocales() {
    return [...catalogs.keys()];
}
function getLocale() {
    return locale;
}
/** Visszaeső nyelv: ennek a katalógusából pótoljuk a hiányzó kulcsokat (alapból "hu") */
function setFallbackLocale(lang) {
    fallbackLocale = lang;
    notify();
}
function getFallbackLocale() {
    return fallbackLocale;
}
function lookup(key, params) {
    const plural = params && typeof params.count === "number" ? pluralSuffix(params.count) : null;
    for (const lang of [locale, locale.split("-")[0], fallbackLocale]) {
        const dict = catalogs.get(lang);
        if (!dict)
            continue;
        if (plural && `${key}_${plural}` in dict)
            return dict[`${key}_${plural}`];
        if (key in dict)
            return dict[key];
    }
    return undefined;
}
function pluralSuffix(count) {
    try {
        return new Intl.PluralRules(locale).select(count);
    }
    catch {
        return count === 1 ? "one" : "other";
    }
}
function interpolate(text, params) {
    if (!params)
        return text;
    return text.replace(/\{(\w+)\}/g, (m, name) => (name in params ? String(params[name]) : m));
}
/**
 * Azonnali fordítás az aktuális nyelven. Hiányzó kulcsnál a visszaeső nyelv, majd a `fallback`, végül a kulcs.
 * Figyelem: az eredmény sima szöveg, nyelvváltáskor nem frissül; komponens-paraméterbe `tr()`-t vagy `() => t(...)`-t adj.
 */
function t(key, params, fallback) {
    return interpolate(lookup(key, params) ?? fallback ?? key, params);
}
/** "Élő" fordítási hivatkozás: bármelyik komponens-szöveg paraméterbe adható, nyelvváltáskor frissül. */
function tr(key, params, fallback) {
    return { kind: "tr", key, params, fallback };
}
function isTextRef(v) {
    return typeof v === "object" && v !== null && v.kind === "tr" && typeof v.key === "string";
}
/** Igaz, ha az érték nyelvváltáskor újraszámolódik (TextRef vagy függvény) */
function isReactiveText(v) {
    return typeof v === "function" || isTextRef(v);
}
/** A szöveg aktuális értéke (üres string, ha nincs megadva) */
function resolveText(v) {
    if (v == null)
        return "";
    if (typeof v === "string")
        return v;
    if (typeof v === "function")
        return String(v());
    return t(v.key, v.params, v.fallback);
}
const watchers = new Set();
const listeners = new Set();
const weak = (el) => typeof WeakRef === "function" ? new WeakRef(el) : { deref: () => el };
/**
 * Egy elem frissítése nyelvváltáskor. A hivatkozás gyenge (az elem eldobható); a `run` függvény ne tartson
 * erős hivatkozást az elemre kívülről, az elemet paraméterként kapja. A DOM-ból két egymást követő
 * nyelvváltáskor is kimaradt elemeket a rendszer elfelejti.
 */
function watchLocale(el, run) {
    watchers.add({ ref: weak(el), run: run, strikes: 0 });
}
/** Nyelvváltás figyelése (pl. saját állapot frissítéséhez). Visszaadja a leiratkozó függvényt. */
function onLocaleChange(cb) {
    listeners.add(cb);
    return () => listeners.delete(cb);
}
function notify() {
    for (const w of [...watchers]) {
        const el = w.ref.deref();
        if (!el) {
            watchers.delete(w);
            continue;
        }
        // A DOM-ból kimaradt elemet is frissítjük (később visszakerülhet), de két kör után elfelejtjük
        if (el.isConnected)
            w.strikes = 0;
        else if (++w.strikes > 2) {
            watchers.delete(w);
            continue;
        }
        try {
            w.run(el);
        }
        catch (e) {
            console.error("[createDOMBlocks] i18n update failed", e);
        }
    }
    for (const cb of [...listeners])
        cb(locale);
}
/**
 * Nyelv váltása: frissíti az összes szöveget, amit `tr()`-rel / függvénnyel adtál át, a beépített feliratokat,
 * és beállítja a `<html lang>` attribútumot. Ha a katalógus még nincs betöltve, előbb hívd a `loadMessages`-t.
 */
function setLocale(lang, options = {}) {
    if (lang === locale)
        return;
    locale = lang;
    if (options.updateHtmlLang !== false && typeof document !== "undefined")
        document.documentElement.lang = lang;
    notify();
}
/** Beépített szöveg segéd: `cdb.<kulcs>` a könyvtár katalógusából, alapból a megadott (magyar) szöveggel */
function builtin(key, fallback) {
    return tr(`cdb.${key}`, undefined, fallback);
}


/***/ },

/***/ "./src/inputs/createCheckbox.ts"
/*!**************************************!*\
  !*** ./src/inputs/createCheckbox.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCheckbox: () => (/* binding */ createCheckbox)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createCheckbox(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "checkbox" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createColorInput.ts"
/*!****************************************!*\
  !*** ./src/inputs/createColorInput.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createColorInput: () => (/* binding */ createColorInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createColorInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "color" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createDateInput.ts"
/*!***************************************!*\
  !*** ./src/inputs/createDateInput.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDateInput: () => (/* binding */ createDateInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createDateInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "date" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createDatetimeInput.ts"
/*!*******************************************!*\
  !*** ./src/inputs/createDatetimeInput.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDatetimeInput: () => (/* binding */ createDatetimeInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createDatetimeInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "datetime-local" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createEmailInput.ts"
/*!****************************************!*\
  !*** ./src/inputs/createEmailInput.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createEmailInput: () => (/* binding */ createEmailInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createEmailInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "email" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createFileInput.ts"
/*!***************************************!*\
  !*** ./src/inputs/createFileInput.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createFileInput: () => (/* binding */ createFileInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createFileInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "file" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createHiddenInput.ts"
/*!*****************************************!*\
  !*** ./src/inputs/createHiddenInput.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHiddenInput: () => (/* binding */ createHiddenInput)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");


function createHiddenInput(params) {
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        ...(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createInputElem)("input", { ...params, type: "hidden" }),
        parent: params.parent,
    });
}


/***/ },

/***/ "./src/inputs/createMonthInput.ts"
/*!****************************************!*\
  !*** ./src/inputs/createMonthInput.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMonthInput: () => (/* binding */ createMonthInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createMonthInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "month" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createNumberInput.ts"
/*!*****************************************!*\
  !*** ./src/inputs/createNumberInput.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNumberInput: () => (/* binding */ createNumberInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createNumberInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "number" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createPasswordInput.ts"
/*!*******************************************!*\
  !*** ./src/inputs/createPasswordInput.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPasswordInput: () => (/* binding */ createPasswordInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/i18n.ts");


const EYE = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
function createPasswordInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "password" };
    const container = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
    if (params.showToggle === false)
        return container;
    const input = container.querySelector("input");
    const showLabel = params.showLabel ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("password.show", "Jelszó megjelenítése");
    const hideLabel = params.hideLabel ?? (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.builtin)("password.hide", "Jelszó elrejtése");
    const field = document.createElement("div");
    field.className = "password-field";
    input.replaceWith(field);
    field.appendChild(input);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "password-toggle";
    btn.id = `${params.id}-toggle`;
    const render = (visible) => {
        input.type = visible ? "text" : "password";
        btn.innerHTML = visible ? EYE_OFF : EYE;
        btn.setAttribute("aria-label", (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText)(visible ? hideLabel : showLabel));
        btn.setAttribute("aria-pressed", String(visible));
    };
    render(false);
    // nyelvváltáskor a gomb felirata frissül, a láthatóság állapota megmarad
    (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.watchLocale)(btn, () => render(input.type === "text"));
    btn.addEventListener("click", () => {
        render(input.type === "password");
        input.focus();
    });
    field.appendChild(btn);
    return container;
}


/***/ },

/***/ "./src/inputs/createRangeInput.ts"
/*!****************************************!*\
  !*** ./src/inputs/createRangeInput.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRangeInput: () => (/* binding */ createRangeInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createRangeInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "range" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createSearchInput.ts"
/*!*****************************************!*\
  !*** ./src/inputs/createSearchInput.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSearchInput: () => (/* binding */ createSearchInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createSearchInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "search" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createTelInput.ts"
/*!**************************************!*\
  !*** ./src/inputs/createTelInput.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTelInput: () => (/* binding */ createTelInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createTelInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "tel" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createTextInput.ts"
/*!***************************************!*\
  !*** ./src/inputs/createTextInput.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTextInput: () => (/* binding */ createTextInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createTextInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "text" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createTimeInput.ts"
/*!***************************************!*\
  !*** ./src/inputs/createTimeInput.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTimeInput: () => (/* binding */ createTimeInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createTimeInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "time" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createUrlInput.ts"
/*!**************************************!*\
  !*** ./src/inputs/createUrlInput.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createUrlInput: () => (/* binding */ createUrlInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createUrlInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "url" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/inputs/createWeekInput.ts"
/*!***************************************!*\
  !*** ./src/inputs/createWeekInput.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWeekInput: () => (/* binding */ createWeekInput)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function createWeekInput(params) {
    const conf = { ...params, labelfirst: params.labelfirst ?? true, type: "week" };
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputContainer)(conf, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createInputChildren)("input", conf));
}


/***/ },

/***/ "./src/locales.ts"
/*!************************!*\
  !*** ./src/locales.ts ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   en: () => (/* binding */ en),
/* harmony export */   hu: () => (/* binding */ hu)
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n */ "./src/i18n.ts");

/**
 * A könyvtár beépített feliratai (a `cdb.` előtagú kulcsok). Minden komponens ezekből veszi az alapértelmezett
 * szövegeit, ezért nyelvváltáskor ezek is átváltanak. Egy kulcs felülírható a saját katalógusodban, egy konkrét
 * komponensen pedig a `labels` / szöveges paraméterekkel.
 *
 * Új nyelv hozzáadása: `registerMessages("de", { "cdb.table.noResults": "Keine Treffer", ... })`.
 * A hiányzó kulcsok a visszaeső nyelvről (alapból magyar) pótlódnak.
 */
const hu = {
    "cdb.table.filter": "Szűrés…",
    "cdb.table.filterAria": "Táblázat szűrése",
    "cdb.table.prev": "Előző",
    "cdb.table.next": "Következő",
    "cdb.table.page": "Oldal",
    "cdb.table.rowsPerPage": "Sor / oldal",
    "cdb.table.all": "Mind",
    "cdb.table.noResults": "Nincs találat",
    "cdb.gantt.today": "Ma",
    "cdb.gantt.task": "Feladat",
    "cdb.gantt.ongoing": "jelenleg",
    "cdb.gantt.empty": "Nincs megjeleníthető sor",
    "cdb.gantt.current": "folyamatban",
    "cdb.gantt.milestone": "Mérföldkő",
    "cdb.table.sortAsc": "növekvő",
    "cdb.table.sortDesc": "csökkenő",
    "cdb.table.sum": "Összeg",
    "cdb.table.total": "Összesen",
    "cdb.table.rowNr": "Sor #",
    "cdb.password.show": "Jelszó megjelenítése",
    "cdb.password.hide": "Jelszó elrejtése",
    "cdb.modal.cancel": "Mégse",
    "cdb.modal.ok": "OK",
    "cdb.modal.close": "Bezárás",
    "cdb.image.error": "A kép nem tölthető be",
    "cdb.image.retry": "Újra",
    "cdb.video.error": "A videó nem tölthető be",
    "cdb.video.retry": "Újra",
    "cdb.music.group": "Zenelejátszó",
    "cdb.music.play": "Lejátszás",
    "cdb.music.pause": "Szünet",
    "cdb.music.prev": "Előző szám",
    "cdb.music.next": "Következő szám",
    "cdb.music.seek": "Pozíció",
    "cdb.music.volume": "Hangerő",
    "cdb.music.mute": "Némítás",
    "cdb.music.unmute": "Némítás feloldása",
    "cdb.music.playlist": "Lejátszási lista",
    "cdb.music.error": "A szám nem játszható le",
    "cdb.music.loopOff": "Ismétlés: ki",
    "cdb.music.loopAll": "Ismétlés: lista",
    "cdb.music.loopOne": "Ismétlés: szám",
    "cdb.music.unknownTrack": "Ismeretlen szám",
    "cdb.music.track": "Szám {n}",
    "cdb.carousel.stage": "Carousel",
    "cdb.carousel.nav": "Carousel navigáció",
    "cdb.carousel.prev": "Előző",
    "cdb.carousel.next": "Következő",
    "cdb.carousel.dot": "{n}. dia",
    "cdb.codeblock.copy": "Másolás",
    "cdb.codeblock.copied": "Másolva!",
    "cdb.drawer.title": "Menü",
    "cdb.drawer.close": "Bezárás",
    "cdb.form.submit": "Küldés",
    "cdb.form.reset": "Visszaállítás",
    "cdb.spinner.loading": "Betöltés…",
    "cdb.picker.date": "Válassz dátumot…",
    "cdb.picker.datetime": "Válassz dátumot és időt…",
    "cdb.picker.month": "Válassz hónapot…",
    "cdb.picker.week": "Válassz hetet…",
    "cdb.picker.rangeStart": "Kezdet…",
    "cdb.picker.rangeEnd": "Vég…",
    "cdb.picker.week.label": "{n}. hét",
    "cdb.dropzone.title": "Húzd ide a fájlokat",
    "cdb.dropzone.sub": "vagy kattints a tallózáshoz",
    "cdb.dropzone.any": "Bármilyen fájl támogatott",
    "cdb.dropzone.accepted": "{types} fájlok",
    "cdb.dropzone.remove": "Eltávolítás",
    "cdb.tooltip.info": "Infó",
    "cdb.alert.close": "Bezárás",
    "cdb.toast.close": "Bezárás",
};
const en = {
    "cdb.table.filter": "Filter…",
    "cdb.table.filterAria": "Filter table",
    "cdb.table.prev": "Previous",
    "cdb.table.next": "Next",
    "cdb.table.page": "Page",
    "cdb.table.rowsPerPage": "Rows / page",
    "cdb.table.all": "All",
    "cdb.table.noResults": "No results",
    "cdb.gantt.today": "Today",
    "cdb.gantt.task": "Task",
    "cdb.gantt.ongoing": "present",
    "cdb.gantt.empty": "Nothing to show",
    "cdb.gantt.current": "ongoing",
    "cdb.gantt.milestone": "Milestone",
    "cdb.table.sortAsc": "ascending",
    "cdb.table.sortDesc": "descending",
    "cdb.table.sum": "Sum",
    "cdb.table.total": "Total",
    "cdb.table.rowNr": "Row #",
    "cdb.password.show": "Show password",
    "cdb.password.hide": "Hide password",
    "cdb.modal.cancel": "Cancel",
    "cdb.modal.ok": "OK",
    "cdb.modal.close": "Close",
    "cdb.image.error": "The image could not be loaded",
    "cdb.image.retry": "Retry",
    "cdb.video.error": "The video could not be loaded",
    "cdb.video.retry": "Retry",
    "cdb.music.group": "Music player",
    "cdb.music.play": "Play",
    "cdb.music.pause": "Pause",
    "cdb.music.prev": "Previous track",
    "cdb.music.next": "Next track",
    "cdb.music.seek": "Position",
    "cdb.music.volume": "Volume",
    "cdb.music.mute": "Mute",
    "cdb.music.unmute": "Unmute",
    "cdb.music.playlist": "Playlist",
    "cdb.music.error": "This track cannot be played",
    "cdb.music.loopOff": "Repeat: off",
    "cdb.music.loopAll": "Repeat: playlist",
    "cdb.music.loopOne": "Repeat: track",
    "cdb.music.unknownTrack": "Unknown track",
    "cdb.music.track": "Track {n}",
    "cdb.carousel.stage": "Carousel",
    "cdb.carousel.nav": "Carousel navigation",
    "cdb.carousel.prev": "Previous",
    "cdb.carousel.next": "Next",
    "cdb.carousel.dot": "Slide {n}",
    "cdb.codeblock.copy": "Copy",
    "cdb.codeblock.copied": "Copied!",
    "cdb.drawer.title": "Menu",
    "cdb.drawer.close": "Close",
    "cdb.form.submit": "Submit",
    "cdb.form.reset": "Reset",
    "cdb.spinner.loading": "Loading…",
    "cdb.picker.date": "Select a date…",
    "cdb.picker.datetime": "Select date and time…",
    "cdb.picker.month": "Select a month…",
    "cdb.picker.week": "Select a week…",
    "cdb.picker.rangeStart": "Start…",
    "cdb.picker.rangeEnd": "End…",
    "cdb.picker.week.label": "Week {n}",
    "cdb.dropzone.title": "Drop files here",
    "cdb.dropzone.sub": "or click to browse",
    "cdb.dropzone.any": "Any file is supported",
    "cdb.dropzone.accepted": "{types} files",
    "cdb.dropzone.remove": "Remove",
    "cdb.tooltip.info": "Info",
    "cdb.alert.close": "Close",
    "cdb.toast.close": "Close",
};
(0,_i18n__WEBPACK_IMPORTED_MODULE_0__.registerMessages)("hu", hu);
(0,_i18n__WEBPACK_IMPORTED_MODULE_0__.registerMessages)("en", en);


/***/ },

/***/ "./src/selection/createRadio.ts"
/*!**************************************!*\
  !*** ./src/selection/createRadio.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRadio: () => (/* binding */ createRadio)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createRadio(params) {
    const radioOptions = params.options.map((option, index) => {
        const checked = typeof params.value === "string"
            ? option.text === params.value
            : typeof params.value === "number"
                ? params.value === index + 1
                : false;
        const children = [
            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                tag: "input",
                attrs: { type: "radio", id: `${params.id}-${option.value}`, name: params.name || params.id, value: option.value, checked },
            }),
            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
                tag: "label",
                text: option.text,
                attrs: { for: `${params.id}-${option.value}` },
            }),
        ];
        if (params.labelfirst === true)
            children.reverse();
        return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
            tag: "div",
            attrs: { class: "radio-option" },
            children,
        });
    });
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: { class: `radio-group${params.class ? ` ${params.class}` : ""}` },
        children: radioOptions,
    });
}


/***/ },

/***/ "./src/selection/createSelect.ts"
/*!***************************************!*\
  !*** ./src/selection/createSelect.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSelect: () => (/* binding */ createSelect)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.ts");

function createSelect(params) {
    const optionChildren = params.options.map((opt) => {
        const optAttrs = { value: opt.value };
        if (params.value != null && params.value === opt.value)
            optAttrs.selected = true;
        return { tag: "option", text: opt.text, attrs: optAttrs };
    });
    const events = [];
    if (params.onChange)
        events.push({ event: "change", cb: params.onChange });
    if (params.click)
        events.push({ event: "click", cb: params.click });
    if (params.handleEvent)
        events.push(...(Array.isArray(params.handleEvent) ? params.handleEvent : [params.handleEvent]));
    const selectAttrs = {
        name: params.name || params.id,
        class: `select-input${params.class ? ` ${params.class}` : ""}`,
    };
    if (params.id)
        selectAttrs.id = params.id;
    const selectElem = {
        tag: "select",
        text: params.value != null ? String(params.value) : undefined,
        attrs: selectAttrs,
        children: optionChildren,
        handleEvent: events.length > 0 ? events : undefined,
    };
    const selectChildren = params.labelText
        ? [{
                tag: "label",
                text: params.labelText,
                attrs: { for: params.id, class: `select-label${params.class ? ` ${params.class}` : ""}` },
            }, selectElem]
        : [selectElem];
    if (params.labelfirst === false)
        selectChildren.reverse();
    const containerAttrs = {
        class: `select-input${params.class ? ` ${params.class}` : ""}`,
    };
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createDOMElem)({
        tag: "div",
        parent: params.parent,
        attrs: containerAttrs,
        children: selectChildren,
    });
}


/***/ },

/***/ "./src/utils.ts"
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeEventHandlerArray: () => (/* binding */ makeEventHandlerArray),
/* harmony export */   toArray: () => (/* binding */ toArray)
/* harmony export */ });
function toArray(value) {
    if (value == null)
        return [];
    return Array.isArray(value) ? value : [value];
}
function makeEventHandlerArray(onChange, click, handleEvent) {
    const events = [];
    if (onChange)
        events.push({ event: "change", cb: onChange });
    if (click)
        events.push({ event: "click", cb: click });
    if (handleEvent)
        events.push(...toArray(handleEvent));
    return events;
}


/***/ },

/***/ "./node_modules/domelemjs/dist/index.js"
/*!**********************************************!*\
  !*** ./node_modules/domelemjs/dist/index.js ***!
  \**********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOMElem: () => (/* binding */ p),
/* harmony export */   HTML_TAGS: () => (/* binding */ L),
/* harmony export */   createDOMElem: () => (/* binding */ m)
/* harmony export */ });
function u(n){return n.split("-").map((e,t)=>t>0?e.charAt(0).toUpperCase()+e.slice(1):e).join("")}function d(n){return n==null?[]:Array.isArray(n)?n:[n]}function f(n,e=!1){let t={\u00E1:"a",\u00E9:"e",\u00ED:"i",\u00F3:"o",\u00F6:"o",\u0151:"o",\u00FA:"u",\u00FC:"u",\u0171:"u",\u00C1:"A",\u00C9:"E",\u00CD:"I",\u00D3:"O",\u00D6:"O",\u0150:"O",\u00DA:"U",\u00DC:"U",\u0170:"U",\u00E0:"a",\u00E8:"e",\u00EC:"i",\u00F2:"o",\u00F9:"u",\u00E2:"a",\u00EA:"e",\u00EE:"i",\u00F4:"o",\u00FB:"u",\u0103:"a",\u0115:"e",\u012D:"i",\u014F:"o",\u016D:"u",\u0101:"a",\u0113:"e",\u012B:"i",\u014D:"o",\u016B:"u",\u01CE:"a",\u011B:"e",\u01D0:"i",\u01D2:"o",\u01D4:"u",\u00E4:"a",\u00EB:"e",\u00EF:"i",\u00E5:"a",\u00F8:"o",\u00E3:"a",\u00F5:"o",\u00E6:"ae",\u00E7:"c",\u011F:"g",\u0142:"l",\u00F1:"n",\u0111:"d",\u00DF:"ss",\u010F:"d",\u0165:"t",\u0148:"n",\u0159:"r",\u0161:"s",\u017E:"z",\u0158:"R",\u0160:"S",\u017D:"Z",\u00C7:"C",\u015E:"S",\u011E:"G",\u0141:"L",\u00D1:"N",\u0110:"D",\u013E:"l",\u0155:"r",\u013A:"l"},r=n;for(let[i,o]of Object.entries(t))r=r.split(i).join(o);return e?r.toLowerCase():r}var v=["class","id"];function y(n){if(n instanceof HTMLElement)return n;let e=null;return n.charAt(0)==="#"||n.charAt(0)==="."?e=document.querySelector(n):e=document.querySelector(`#${n}`)||document.querySelector(`.${n}`)||document.querySelector(n),e||(console.warn(`[DOMElemJS] Parent element not found for selector: "${n}". Falling back to document.body.`),document.body)}function g(n,e,t){for(let r of d(e))for(let[i,o]of Object.entries(r))if(o!=null)if(i==="checked")n.checked=!!o;else if(i==="dataset"&&typeof o=="object"&&!Array.isArray(o))Object.assign(n.dataset,o);else{let a=(Array.isArray(o)?o:[o]).map(c=>t&&v.includes(i)?f(String(c)):String(c));n.setAttribute(i,a.join(" "))}}function b(n,e){d(e).map(r=>typeof r=="object"&&r!==null?Object.entries(r).map(([i,o])=>`${i}: ${o}`).join("; "):d(r).join("; ")).join("; ").split(";").filter(Boolean).forEach(r=>{let i=r.indexOf(":");if(i===-1)return;let o=r.slice(0,i).trim(),l=r.slice(i+1).trim();if(o){let a=u(o);n.style[a]=l}})}function M(n,e){for(let t of e)t instanceof HTMLElement?n.appendChild(t):n.appendChild(m(t))}function O(n,e){for(let t of d(e))t?.event&&t?.cb&&n.addEventListener(t.event,t.cb)}function m(n){let{tag:e,content:t,text:r,attrs:i,style:o,children:l,parent:a,handleEvent:c,append:h=!0,stripDiacritics:E=!0}=n;t&&r&&console.warn(`[DOMElemJS] Both "content" and "text" provided for <${e}>. "text" takes precedence \u2014 "content" will be ignored.`);let s=document.createElement(e);return r?s.textContent=r:t&&(s.innerHTML=t),i&&g(s,i,E),o&&b(s,o),l&&M(s,l),c&&O(s,c),h&&(a?y(a):document.body).appendChild(s),s}var p=class{constructor(e){this._listeners=new Map;if(this.options=e,this.elem=m(e),e.handleEvent){let t=Array.isArray(e.handleEvent)?e.handleEvent:[e.handleEvent];for(let r of t)this._trackListener(r.event,r.cb)}}addEventListener(e,t){return this.elem.addEventListener(e,t),this._trackListener(e,t),this}removeEventListener(e,t){return this.elem.removeEventListener(e,t),this._untrackListener(e,t),this}removeAllListeners(){for(let[e,t]of this._listeners)for(let r of t)this.elem.removeEventListener(e,r);this._listeners.clear()}_trackListener(e,t){this._listeners.has(e)||this._listeners.set(e,new Set),this._listeners.get(e).add(t)}_untrackListener(e,t){this._listeners.get(e)?.delete(t)}};var L=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","video","wbr"];
//# sourceMappingURL=index.js.map

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asyncImage: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.asyncImage),
/* harmony export */   closeDrawer: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.closeDrawer),
/* harmony export */   closeModal: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.closeModal),
/* harmony export */   createAccordion: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createAccordion),
/* harmony export */   createAlert: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createAlert),
/* harmony export */   createAvatar: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createAvatar),
/* harmony export */   createBadge: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createBadge),
/* harmony export */   createBlockquote: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createBlockquote),
/* harmony export */   createBreadcrumb: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createBreadcrumb),
/* harmony export */   createButton: () => (/* reexport safe */ _buttons_createButton__WEBPACK_IMPORTED_MODULE_20__.createButton),
/* harmony export */   createButtonInput: () => (/* reexport safe */ _buttons_createButtonInput__WEBPACK_IMPORTED_MODULE_21__.createButtonInput),
/* harmony export */   createCard: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createCard),
/* harmony export */   createCarousel: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createCarousel),
/* harmony export */   createCheckbox: () => (/* reexport safe */ _inputs_createCheckbox__WEBPACK_IMPORTED_MODULE_15__.createCheckbox),
/* harmony export */   createCodeBlock: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createCodeBlock),
/* harmony export */   createColorInput: () => (/* reexport safe */ _inputs_createColorInput__WEBPACK_IMPORTED_MODULE_16__.createColorInput),
/* harmony export */   createContainer: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createContainer),
/* harmony export */   createCustomDatePicker: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createCustomDatePicker),
/* harmony export */   createCustomDateRangePicker: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createCustomDateRangePicker),
/* harmony export */   createCustomDateTimePicker: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createCustomDateTimePicker),
/* harmony export */   createCustomMonthPicker: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createCustomMonthPicker),
/* harmony export */   createCustomSelect: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createCustomSelect),
/* harmony export */   createCustomWeekPicker: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createCustomWeekPicker),
/* harmony export */   createDateInput: () => (/* reexport safe */ _inputs_createDateInput__WEBPACK_IMPORTED_MODULE_10__.createDateInput),
/* harmony export */   createDatetimeInput: () => (/* reexport safe */ _inputs_createDatetimeInput__WEBPACK_IMPORTED_MODULE_11__.createDatetimeInput),
/* harmony export */   createDivider: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createDivider),
/* harmony export */   createDragAndDropFileInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createDragAndDropFileInput),
/* harmony export */   createDrawer: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createDrawer),
/* harmony export */   createEmailInput: () => (/* reexport safe */ _inputs_createEmailInput__WEBPACK_IMPORTED_MODULE_7__.createEmailInput),
/* harmony export */   createFileInput: () => (/* reexport safe */ _inputs_createFileInput__WEBPACK_IMPORTED_MODULE_17__.createFileInput),
/* harmony export */   createForm: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createForm),
/* harmony export */   createGantt: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createGantt),
/* harmony export */   createGrid: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createGrid),
/* harmony export */   createHiddenInput: () => (/* reexport safe */ _inputs_createHiddenInput__WEBPACK_IMPORTED_MODULE_19__.createHiddenInput),
/* harmony export */   createImage: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createImage),
/* harmony export */   createLink: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createLink),
/* harmony export */   createLocalizedElem: () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.createDOMElem),
/* harmony export */   createMenu: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createMenu),
/* harmony export */   createModal: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createModal),
/* harmony export */   createMonthInput: () => (/* reexport safe */ _inputs_createMonthInput__WEBPACK_IMPORTED_MODULE_13__.createMonthInput),
/* harmony export */   createMusicPlayer: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createMusicPlayer),
/* harmony export */   createNav: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createNav),
/* harmony export */   createNumberInput: () => (/* reexport safe */ _inputs_createNumberInput__WEBPACK_IMPORTED_MODULE_9__.createNumberInput),
/* harmony export */   createOrderedList: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createOrderedList),
/* harmony export */   createParagraph: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createParagraph),
/* harmony export */   createPasswordInput: () => (/* reexport safe */ _inputs_createPasswordInput__WEBPACK_IMPORTED_MODULE_8__.createPasswordInput),
/* harmony export */   createProgressBar: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createProgressBar),
/* harmony export */   createRadio: () => (/* reexport safe */ _selection_createRadio__WEBPACK_IMPORTED_MODULE_25__.createRadio),
/* harmony export */   createRangeInput: () => (/* reexport safe */ _inputs_createRangeInput__WEBPACK_IMPORTED_MODULE_18__.createRangeInput),
/* harmony export */   createResetInput: () => (/* reexport safe */ _buttons_createResetInput__WEBPACK_IMPORTED_MODULE_23__.createResetInput),
/* harmony export */   createSearchInput: () => (/* reexport safe */ _inputs_createSearchInput__WEBPACK_IMPORTED_MODULE_6__.createSearchInput),
/* harmony export */   createSelect: () => (/* reexport safe */ _selection_createSelect__WEBPACK_IMPORTED_MODULE_24__.createSelect),
/* harmony export */   createSpinner: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createSpinner),
/* harmony export */   createSubmitInput: () => (/* reexport safe */ _buttons_createSubmitInput__WEBPACK_IMPORTED_MODULE_22__.createSubmitInput),
/* harmony export */   createTable: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createTable),
/* harmony export */   createTabs: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createTabs),
/* harmony export */   createTelInput: () => (/* reexport safe */ _inputs_createTelInput__WEBPACK_IMPORTED_MODULE_4__.createTelInput),
/* harmony export */   createTextInput: () => (/* reexport safe */ _inputs_createTextInput__WEBPACK_IMPORTED_MODULE_3__.createTextInput),
/* harmony export */   createTextarea: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createTextarea),
/* harmony export */   createTimeInput: () => (/* reexport safe */ _inputs_createTimeInput__WEBPACK_IMPORTED_MODULE_12__.createTimeInput),
/* harmony export */   createTimeline: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createTimeline),
/* harmony export */   createTitle: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createTitle),
/* harmony export */   createToast: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createToast),
/* harmony export */   createTooltip: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createTooltip),
/* harmony export */   createUnorderedList: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createUnorderedList),
/* harmony export */   createUrlInput: () => (/* reexport safe */ _inputs_createUrlInput__WEBPACK_IMPORTED_MODULE_5__.createUrlInput),
/* harmony export */   createVideo: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.createVideo),
/* harmony export */   createWeekInput: () => (/* reexport safe */ _inputs_createWeekInput__WEBPACK_IMPORTED_MODULE_14__.createWeekInput),
/* harmony export */   defineMessages: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.defineMessages),
/* harmony export */   enMessages: () => (/* reexport safe */ _locales__WEBPACK_IMPORTED_MODULE_0__.en),
/* harmony export */   flattenMessages: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.flattenMessages),
/* harmony export */   getFallbackLocale: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.getFallbackLocale),
/* harmony export */   getLocale: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.getLocale),
/* harmony export */   getLocales: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.getLocales),
/* harmony export */   huMessages: () => (/* reexport safe */ _locales__WEBPACK_IMPORTED_MODULE_0__.hu),
/* harmony export */   isReactiveText: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.isReactiveText),
/* harmony export */   loadMessages: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.loadMessages),
/* harmony export */   newLine: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.newLine),
/* harmony export */   onLocaleChange: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.onLocaleChange),
/* harmony export */   openDrawer: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.openDrawer),
/* harmony export */   openModal: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.openModal),
/* harmony export */   registerMessages: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.registerMessages),
/* harmony export */   registerTranslations: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.registerTranslations),
/* harmony export */   resolveText: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.resolveText),
/* harmony export */   setFallbackLocale: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.setFallbackLocale),
/* harmony export */   setLocale: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.setLocale),
/* harmony export */   t: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.t),
/* harmony export */   tr: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.tr),
/* harmony export */   watchLocale: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_1__.watchLocale)
/* harmony export */ });
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locales */ "./src/locales.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ "./src/i18n.ts");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/dom.ts");
/* harmony import */ var _inputs_createTextInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inputs/createTextInput */ "./src/inputs/createTextInput.ts");
/* harmony import */ var _inputs_createTelInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./inputs/createTelInput */ "./src/inputs/createTelInput.ts");
/* harmony import */ var _inputs_createUrlInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./inputs/createUrlInput */ "./src/inputs/createUrlInput.ts");
/* harmony import */ var _inputs_createSearchInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./inputs/createSearchInput */ "./src/inputs/createSearchInput.ts");
/* harmony import */ var _inputs_createEmailInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./inputs/createEmailInput */ "./src/inputs/createEmailInput.ts");
/* harmony import */ var _inputs_createPasswordInput__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./inputs/createPasswordInput */ "./src/inputs/createPasswordInput.ts");
/* harmony import */ var _inputs_createNumberInput__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./inputs/createNumberInput */ "./src/inputs/createNumberInput.ts");
/* harmony import */ var _inputs_createDateInput__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./inputs/createDateInput */ "./src/inputs/createDateInput.ts");
/* harmony import */ var _inputs_createDatetimeInput__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./inputs/createDatetimeInput */ "./src/inputs/createDatetimeInput.ts");
/* harmony import */ var _inputs_createTimeInput__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./inputs/createTimeInput */ "./src/inputs/createTimeInput.ts");
/* harmony import */ var _inputs_createMonthInput__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./inputs/createMonthInput */ "./src/inputs/createMonthInput.ts");
/* harmony import */ var _inputs_createWeekInput__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./inputs/createWeekInput */ "./src/inputs/createWeekInput.ts");
/* harmony import */ var _inputs_createCheckbox__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./inputs/createCheckbox */ "./src/inputs/createCheckbox.ts");
/* harmony import */ var _inputs_createColorInput__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./inputs/createColorInput */ "./src/inputs/createColorInput.ts");
/* harmony import */ var _inputs_createFileInput__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./inputs/createFileInput */ "./src/inputs/createFileInput.ts");
/* harmony import */ var _inputs_createRangeInput__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./inputs/createRangeInput */ "./src/inputs/createRangeInput.ts");
/* harmony import */ var _inputs_createHiddenInput__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./inputs/createHiddenInput */ "./src/inputs/createHiddenInput.ts");
/* harmony import */ var _buttons_createButton__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./buttons/createButton */ "./src/buttons/createButton.ts");
/* harmony import */ var _buttons_createButtonInput__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./buttons/createButtonInput */ "./src/buttons/createButtonInput.ts");
/* harmony import */ var _buttons_createSubmitInput__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./buttons/createSubmitInput */ "./src/buttons/createSubmitInput.ts");
/* harmony import */ var _buttons_createResetInput__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./buttons/createResetInput */ "./src/buttons/createResetInput.ts");
/* harmony import */ var _selection_createSelect__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./selection/createSelect */ "./src/selection/createSelect.ts");
/* harmony import */ var _selection_createRadio__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./selection/createRadio */ "./src/selection/createRadio.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components */ "./src/components/index.ts");
// Nyelvesítés: a beépített feliratok (hu, en) regisztrálása, majd a nyilvános i18n API





























})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map