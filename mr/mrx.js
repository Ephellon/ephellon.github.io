// XLSX.js imported from GitHub; see API reference here → https://docs.sheetjs.com/docs/api/
// The following is just shared logic
function defined(value) {
    return !nullish(value);
}

function nullish(value) {
    return value === null || value === undefined;
}

function parseBool(value = null) {
    let stringified;
    try {
        stringified = JSON.stringify(value);
    } catch(error) {
        stringified = value.toString();
    }

    stringified = (stringified || typeof stringified).trim().replace(/^"([^"]*?)"$/, '$1');

    switch(stringified) {
        case undefined:
        case 'false':
        case 'null':
        case '[]':
        case '{}':
        case '0':
        case '':
            return false;

        default:
            return (["bigint","number"].contains(typeof value)? !Number.isNaN(value): true);
    }
}

async function when(callback, ms = 100, ...args) {
    return new Promise((resolve, reject) => {
        let interval = setInterval(async args => {
            let value = await callback.apply(null, args);

            if(parseBool(value) !== false) {
                clearInterval(interval);
                resolve(
                    (value === when.false)?
                        false:
                    (value === when.true)?
                        true:
                    value
                );
            }
        }, ms, Array.from(args));
    });
}

try {
    Object.defineProperties(when, {
        "false": { value: Symbol(false) },
        "true": { value: Symbol(true) },

        "null": { value: Symbol(null) },
        "void": { value: Symbol(void undefined) },
        "undefined": { value: Symbol(undefined) },

        "defined": {
            value:
            // https://levelup.gitconnected.com/how-to-turn-settimeout-and-setinterval-into-promises-6a4977f0ace3
            // Makes a Promised setInterval
                // when.defined(callback:function<any>, ms:number<integer>?) → Promise<any>
            async function(callback, ms = 100, ...args) {
                return new Promise((resolve, reject) => {
                    let interval = setInterval(async args => {
                        let value = await callback.apply(null, args);

                        if(defined(value)) {
                            clearInterval(interval);
                            resolve(
                                (value === when.null)?
                                    null:
                                (value === when.void)?
                                    void undefined:
                                (value === when.undefined)?
                                    undefined:
                                value
                            );
                        }
                    }, ms, Array.from(args));
                });
            },
        },

        "nullish": {
            value:
            // https://levelup.gitconnected.com/how-to-turn-settimeout-and-setinterval-into-promises-6a4977f0ace3
            // Makes a Promised setInterval
                // when.nullish(callback:function<any>, ms:number<integer>?) → Promise<any>
            async function(callback, ms = 100, ...args) {
                return new Promise((resolve, reject) => {
                    let interval = setInterval(async args => {
                        let value = await callback.apply(null, args);

                        if(nullish(value)) {
                            clearInterval(interval);
                            resolve(value);
                        }
                    }, ms, Array.from(args));
                });
            },
        },

        "empty": {
            value:
            // https://levelup.gitconnected.com/how-to-turn-settimeout-and-setinterval-into-promises-6a4977f0ace3
            // Makes a Promised setInterval
                // when.empty(callback:function<@@iterable>, ms:number<integer>?) → Promise<any>
            async function(callback, ms = 100, ...args) {
                return new Promise((resolve, reject) => {
                    let interval = setInterval(async args => {
                        let array = await callback.apply(null, args);

                        if(array?.length < 1) {
                            clearInterval(interval);
                            resolve(array);
                        }
                    }, ms, Array.from(args));
                });
            },
        },

        "sated": {
            value:
            // https://levelup.gitconnected.com/how-to-turn-settimeout-and-setinterval-into-promises-6a4977f0ace3
            // Makes a Promised setInterval
                // when.sated(callback:function<@@iterable>, ms:number<integer>?) → Promise<any>
            async function(callback, ms = 100, ...args) {
                return new Promise((resolve, reject) => {
                    let interval = setInterval(async args => {
                        let array = await callback.apply(null, args);

                        if(array?.length > 0) {
                            clearInterval(interval);
                            resolve(array);
                        }
                    }, ms, Array.from(args));
                });
            },
        },
    });
} catch(error) {
    /* Ignore the error... */
}

function $(selector, container = document, multiple = false) {
    return multiple?
        [...container?.querySelectorAll(selector)]:
    container?.querySelector(selector);
}

Object.defineProperties($, {
    html: {
        value: document.documentElement,

        writable: false,
        enumerable: false,
        configurable: false,
    },

    head: {
        value: document.head,

        writable: false,
        enumerable: false,
        configurable: false,
    },

    body: {
        value: document.body,

        writable: false,
        enumerable: false,
        configurable: false,
    },

    on: {
        value: function on(type, listener, options = null) {
            return document.addEventListener(type, listener, options);
        },

        writable: false,
        enumerable: false,
        configurable: false,
    },

    defined: {
        value: (selector, container = document, multiple = false) => multiple? $(selector, container, true).length > 0: defined($(selector, container)),

        writable: false,
        enumerable: false,
        configurable: false,
    },

    nullish: {
        value: (selector, container = document, multiple = false) => multiple? $(selector, container, true).length < 1: nullish($(selector, container)),

        writable: false,
        enumerable: false,
        configurable: false,
    },

    all: {
        value: (selector, container = document) => $(selector, container, true),

        writable: false,
        enumerable: false,
        configurable: false,
    },
});

function parseURL(url) {
    if(nullish(url))
        return {};

    url = url.toString();

    let {
        href = '',
        origin = '',
        protocol = '',
        scheme = '',
        username = '',
        password = '',
        host = '',
        hostname = '',
        port = '',
        pathname = '',
        search = '',
        hash = '',
    } = parseURL.pattern
        .exec(url)
        ?.groups ?? {};

    if(href.length < 2)
        return {};

    origin += host;

    return {
        href, origin, protocol, scheme, username, password, host, hostname, port, pathname, search, hash,

        domainPath: hostname.split('.').reverse(),
        searchParameters: (data => {
            let results = {};

            parsing:
            for(let query of data) {
                let [name, value] = query.split('=', 2);

                if(nullish(name || value))
                    continue;
                name ??= '';
                value ??= '';

                results[name] = (
                    defined(results[name])?
                        results[name] instanceof Array?
                            results[name].concat(value):
                        [results[name], value]:
                    value
                );
            }

            return results;
        })(search.slice(1).split('&')),

        addSearch(parameters, overwrite = false) {
            if(typeof url == 'string')
                url = parseURL(url);

            let { href, searchParameters } = url;

            if(overwrite)
                searchParameters = Object.entries({ ...searchParameters, ...parameters });
            else
                searchParameters = [searchParameters, parameters].map(Object.entries).flat();

            return parseURL(href.replace(/(?:\?[^#]*)?(#.*)?$/, `?${ searchParameters.map(parameter => parameter.join('=')).join('&') }$1`));
        },

        delSearch(parameters) {
            if(typeof url == 'string')
                url = parseURL(url);

            let { href, searchParameters } = url;

            for(let parameter of parameters)
                delete searchParameters[parameter];

            return parseURL(href.replace(/(?:\?[^#]*)?(#.*)?$/, `?${ Object.entries({ ...searchParameters }).map(parameter => parameter.join('=')).join('&') }$1`));
        },
    };
}

Object.defineProperties(parseURL, {
    pattern: {
        value: /(?<href>(?<origin>(?<protocol>(?<scheme>[a-z][\w\-]{2,}):)?\/\/)?(?:(?<username>[^:\s]*):(?<password>[^@\s]*)@)?(?<host>(?<hostname>\w{2,}(?:\.[^:\/?#\s]+|(?=\/))|\B\.{1,2}\B)(?:\:(?<port>\d+))?)(?<pathname>\/[^?#\s]*)?(?<search>\?[^#\s]*)?(?<hash>#[^\s]*)?)/i
    },
});

let encode = encodeURIComponent;

// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //

let RAMPOD = /RAMPOD/i.test(location.hostname) && location.hostname.endsWith('.af.mil'),
    UPLOAD = false;

// System/network
let A10 = 22439,
    B1B = 533,
    B2 = 6395,
    F15 = 531,
    F16 = 6228;

// Location
let AL_UDEID = 194,
    DYESS = 524,
    ELLSWORTH = 513,
    ROBINS_MXS = 528,
    ROBINS_WRALC = 145,
    TINKER = 530;

// Workcenter
let ALL = 'ALL', ANY = 0,
    A2SPC = 5665,
    AAAIS = 584,
    AACRD = 38550,
    AAGE1 = 5458,
    AASMU = 4874,
    AAVAI = 6333,
    AAVTS = 6512,
    ACATS = 583,
    ACCRD = 29312,
    ACCRW = 33087,
    ACRDD = 595,
    ACREW = 46751,
    ACRRD = 27737,
    ACRRW = 594,
    ACRTS = 596,
    ACRWW = 34179,
    AEEC7 = 32972,
    AELME = 5571,
    AEMCC = 5024,
    AEMSR = 5054,
    AFAIS = 6513,
    AIATS = 599,
    AISDA = 597,
    AISFS = 598,
    ALUD1 = 6403,
    AMETT = 6577,
    AMEWS = 581,
    AMVFO = 582,
    AMXPC = 45624,
    AMXWR = 42115,
    AOAS7 = 4886,
    ARSPC = 5070,
    ASTMT = 5766,
    ATECH = 5814,
    B1DEP = 6363,
    B2DEP = 24989,
    BATTS = 6492,
    CAATS = 6502,
    EAISI = 23291,
    EAUTS = 6819,
    GAISM = 5352,
    HAISS = 6592,
    KIAIS = 6486,
    LAIS1 = 22521,
    LMTCH = 44424,
    LRAGE = 45071,
    MIFIB = 3575,
    OCALC = 5060,
    WRALC = 534,
    XAISS = 7811;

let ON = 'ON', OFF = 'OFF';

const GLOBAL_EYE = 'https://rampod4.robins.af.mil/ReportsGen2/GlobalEye2';
const PARTS_PRODUCED = `${GLOBAL_EYE}/parts_produced.cfm`;
const RECEIVED_PARTS = `${GLOBAL_EYE}/received_reports.cfm`;
const STATUS_SUMMARY = `${GLOBAL_EYE}/status_summary.cfm`;

let [Day, Mon, day, year, time, offset] = (new Date + '').split(' ', 6);
let today = [day, Mon, year].join('-');
let yesterday = [(day < 2? day: Day == 'Sun'? day - 2:day - 1), Mon, year].join('-');

// Ellsworth → parts = partsProduced().then(r => r.text()).then(@@<HTML>).then(html => html.queryselector('#offEquip')).then(@@<table>)...
function partsProduced(location = ELLSWORTH, workCenter = ANY) {
    let url = parseURL(PARTS_PRODUCED)
        .addSearch({
            system: B1B,
            location,
            workCenter,
            crewman: ALL,
            partno: 0,
            stationType: ALL,
            lru: '',
            status: ALL,
            submitRange: 'Submit',
            startDate2: yesterday,
            endDate2: today,
            shiftStartTime: encode('00:01'),
            shiftEndTime: encode('23:59'),
            squad: '',
            acft: '',
        }).href;

    let frame = document.createElement('iframe');
    frame.src = url;
    frame.dataset.location = ['parts-produced', workCenter, location].join('/');

    document.body.append(frame);

    return when.defined(frame => $('.bodycontainer', frame.contentDocument), 100, frame);
}

// Ellsworth → parts = partsReceived().then(r => r.text()).then(@@<HTML>).then(html => html.queryselector('#receivedReport')).then(@@<table>)...
function partsReceived(location = ELLSWORTH, workCenter = ANY) {
    let url = parseURL(RECEIVED_PARTS)
        .addSearch({
            loc_id: location,
            wc: workCenter,
            sys_id: B1B,
            startDate: yesterday,
            endDate: today,
            shiftStartTime: encode('00:01'),
            shiftEndTime: encode('23:59'),
            acft: '',
            status: '',
            jobType: OFF,
            type: 'R',
            lru: '',
        }).href;

    let frame = document.createElement('iframe');
    frame.src = url;
    frame.dataset.location = ['received-parts', workCenter, location].join('/');

    document.body.append(frame);

    return when.defined(frame => $('.bodycontainer', frame.contentDocument), 100, frame);
}

// Ellsworth → parts = statusSummary().then(r => r.text()).then(@@<HTML>).then(html => html.queryselector('#statusSummary')).then(@@<table>)...
function statusSummary(location = ELLSWORTH, workCenter = ANY) {
    let url = parseURL(STATUS_SUMMARY)
        .addSearch({
            loc_id: ELLSWORTH, // ← FIX-ME: not seen, change later
            wc: workCenter,
        }).href;

    let frame = document.createElement('iframe');
    frame.src = url;
    frame.dataset.location = ['status-summary', workCenter, location].join('/');

    document.body.append(frame);

    return when.defined(frame => $('.bodycontainer', frame.contentDocument), 100, frame);
}

// Load master-book (the one the user dropped in)
let Book = XLSX.utils.book_new(),
    { table_to_sheet, book_append_sheet } = XLSX.utils;

Object.defineProperties(top, {
    REPORT_STATUS: {
        set(value = '') {
            let [text, color = 'whtie'] = value.split('|>', 2),
                status = $('#report-status');

            status.style.color = `var(--${ color })`;
            status.innerHTML = text;
        },
    },
});

REPORT_STATUS = 'Loading reports...|>yellow';

Promise.allSettled([
    // 1. 24hr Prod
    // 2. E Pro
    partsProduced(ELLSWORTH, AISFS)
        .then(body => [table_to_sheet($('#offEquip', body)), '24hr Prod', 'E Pro']),

    // 3. 24hr Recd
    partsReceived(ELLSWORTH, ALL)
        .then(body => [table_to_sheet($('#receivedReport', body)), '24hr Recd']),

    // 4. Status Summary EAFB
    statusSummary(ELLSWORTH, ALL)
        .then(body => [table_to_sheet($('#statusSummary', body)), 'Status Summary EAFB']),

    // 5. D Pro
    partsProduced(DYESS, ALL)
        .then(body => [table_to_sheet($('#offEquip', body)), 'D Pro']),

    // 6. Status Summary Dyess*
    statusSummary(DYESS, ALL)
        .then(body => [table_to_sheet($('#statusSummary', body)), 'Status Summary Dyess']),
])
    // 7. Add to new book
    .then((sheets = []) => sheets.map(sheet => sheet.value))
    .then(sheets => {
        // Then append to respective sheet(s)
        for(let [sheet, ...names] of sheets)
            for(let name of names)
                book_append_sheet(Book, sheet, name);

        REPORT_STATUS = 'Saving reports...|>green';

        XLSX.writeFile(Book, `Morning Report Changes (${ today }).xlsx`);
    })
    .then(() => REPORT_STATUS = 'Complete.|>green');
