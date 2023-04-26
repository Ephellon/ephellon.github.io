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

// https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element#utility_functions
function wait(delay = 100, value) {
    return new Promise(resolve => setTimeout(resolve, delay, value));
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

function range(range = 'A1') {
    let field = [];
    let [start, stop = start, skip = 1] = range.toUpperCase().split(':', 3),
        [[_a, _1], [_z, _0]] = [start, stop].map(s => s.split(/(\d+)/, 2)),
        library = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let A = 0, Z = 0, i = 0, j = 0;
    for(let c of _a)
        A += ++i * -~library.indexOf(c);

    for(let c of _z)
        Z += ++j * -~library.indexOf(c);

    for(let a = A - 1, c = library[a]; a < Z; c = library[++a])
        for(let _ = +(_1 == '*'? _0 == '*'? 999: _0: _1); _ <= _0; _ += +skip)
            field[c+_] = field.push(c+_);

    return field;
}

function parseHTML(html = '') {
    return (new DOMParser).parseFromString(html, 'text/html');
}

let encode = encodeURIComponent;

// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //

let RAMPOD = false,
    UPLOAD = false;

let ELLSWORTH = 513,
    DYESS = 524,
    SYSTEM = 533;

let ALL = 'ALL',
    ANY = 0,
    ON = 'ON',
    OFF = 'OFF',
    AISFS = 598;

const PARTS_PRODUCED = 'https://rampod4.robins.af.mil/ReportsGen2/GlobalEye2/parts_produced.cfm';
const RECEIVED_PARTS = 'https://rampod4.robins.af.mil/ReportsGen2/GlobalEye2/received_reports.cfm';
const STATUS_SUMMARY = 'https://rampod4.robins.af.mil/ReportsGen2/GlobalEye2/status_summary.cfm';

let [Day, Mon, day, year, time, offset] = (new Date + '').split(' ', 6);
let today = [day, Mon, year].join('-');
let yesterday = [(day < 2? day: day - 1), Mon, year].join('-');

// Ellsworth → parts = partsProduced().then(r => r.text()).then(@@<HTML>).then(html => html.queryselector('#offEquip')).then(@@<table>)...
function partsProduced(location = ELLSWORTH, workCenter = AISFS) {
    let url = parseURL(PARTS_PRODUCED)
        .addSearch({
            system: SYSTEM,
            location,
            workCenter,
            crewman: ALL,
            partno: 0,
            stationType: ALL,
            lru: encode('%'),
            status: ALL,
            submitRange: 'Submit',
            startDate2: yesterday,
            endDate2: today,
            shiftStartTime: encode('00:00'),
            shiftEndTime: encode('23:59'),
            squad: '',
            acft: '',
        }).href;

    return fetch(url);
}

// Ellsworth → parts = partsReceived().then(r => r.text()).then(@@<HTML>).then(html => html.queryselector('#receivedReport')).then(@@<table>)...
function partsReceived(location = ELLSWORTH, workCenter = ALL) {
    let url = parseURL(RECEIVED_PARTS)
        .addSearch({
            loc_id: location,
            wc: workCenter,
            sys_id: SYSTEM,
            startDate: yesterday,
            endDate: today,
            shiftStartTime: encode('00:00'),
            shiftEndTime: encode('23:59'),
            jobType: OFF,
            type: 'R',
            acft: '',
            status: '',
            lru: encode('%'),
        }).href;

    return fetch(url);
}

// Ellsworth → parts = statusSummary().then(r => r.text()).then(@@<HTML>).then(html => html.queryselector('#statusSummary')).then(@@<table>)...
function statusSummary(location = ELLSWORTH, workCenter = ALL) {
    let url = parseURL(STATUS_SUMMARY)
        .addSearch({
            wc: workCenter,
        }).href;

    return fetch(url);
}

// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // //

let handle = {
    drop(event) {
        event.preventDefault();

        let modifyReport = $('#modify-report');
        let [report] = $('#report').files;
        let generate = $('#generate');

        UPLOAD = report?.size > 0;

        modifyReport.dataset.name = report?.name;
        modifyReport.disabled = !UPLOAD;

        generate.disabled = !RAMPOD || !UPLOAD;
    },

    dragover(event) {
        event.preventDefault();
    },

    login(event) {
        // Open RAMPOD Reports link (should prompt login)
        RAMPOD = true;

        open(`https://rampod4.robins.af.mil/ReportsGen2/GlobalEye2/`, '_blank');

        let generate = $('#generate');

        generate.disabled = !RAMPOD || !UPLOAD;
    },

    generate(event) {
        // Load master-book (the one the user dropped in)
        let [report] = $('#report').files;
        let reader = new FileReader;
        let steps = 6;

        reader.onload = event => {
            const meta = event.target?.result;
            const masterbook = XLSX.read(meta, { type: 'binary' });

            // Push table to bottom of sheet
            function appendTable(table, where = 'A*', ...names) {
                // Modify a single cell → https://stackoverflow.com/a/51442854/4211612
                for(let name of names) {
                    let mastersheet = masterbook.Sheets[name];
                    let sheet = XLSX.utils.table_to_sheet(table);

                    // Append to the sheet
                    let json = XLSX.utils.sheet_to_json(mastersheet),
                        data = XLSX.utils.sheet_to_json(sheet),
                        move = {};

                    where = where.replace(/\*/g, json.length);

                    // Keep headers and extra data...
                    for(let cell in mastersheet)
                      if(!cell in range(where))
                          move[cell] = cell;

                    // Append data to the sheet...
                    for(let cell in sheet)
                        if(cell in range(where))
                            move[cell] = cell;

                    masterbook.Sheets[name] = XLSX.utils.json_to_sheet(move);
                }
            }

            // Overwrite table onto sheet
            function layerTable(table, where = 'A1', ...names) {
                for(let name of names) {
                    let mastersheet = masterbook.Sheets[name];
                    let sheet = XLSX.utils.table_to_sheet(table);

                    // Append to the sheet
                    let json = XLSX.utils.sheet_to_json(mastersheet),
                        data = XLSX.utils.sheet_to_json(sheet),
                        move = {};

                    where = where.replace(/\*/g, json.length);

                    // Keep headers and extra data...
                    for(let cell in mastersheet)
                      if(!cell in range(where))
                          move[cell] = cell;

                    // Append data to the sheet...
                    for(let cell in sheet)
                        if(cell in range(where))
                            move[cell] = cell;

                    masterbook.Sheets[name] = XLSX.utils.json_to_sheet(move);
                }
            }

            // 1. 24hr Prod
            // 2. E Pro
            partsProduced(ELLSWORTH, AISFS).then(response => response.text()).then(parseHTML)
                .then(DOM => {
                    let table = DOM.querySelector('#offEquip');

                    layerTable(table, 'A2:O*', '24hr Prod');
                    appendTable(table, 'A*', 'E Pro');
                }).then(() => --steps);

            // 3. 24hr Recd
            partsReceived(ELLSWORTH, ALL).then(response => response.text()).then(parseHTML)
                .then(DOM => {
                    let table = DOM.querySelector('#receivedReport');

                    layerTable(table, 'A2:N*', '24hr Recd');
                }).then(() => --steps);

            // 4. Status Summary EAFB
            statusSummary(ELLSWORTH, ALL).then(response => response.text()).then(parseHTML)
                .then(DOM => {
                    let table = DOM.querySelector('#statusSummary');

                    layerTable(table, 'A2:O*', 'Status Summary EAFB');
                }).then(() => --steps);

            // 5. D Pro
            partsProduced(DYESS, ALL).then(response => response.text()).then(parseHTML)
                .then(DOM => {
                    let table = DOM.querySelector('#offEquip');

                    layerTable(table, 'A7:O*', 'D Pro');
                }).then(() => --steps);

            // 6. Status Summary Dyess*
            statusSummary(DYESS, ALL).then(response => response.text()).then(parseHTML)
                .then(DOM => {
                    /* NOT USED. REMOVED `return` to run. */
                    /* NOT USED. REMOVED `return` to run. */
                    /* NOT USED. REMOVED `return` to run. */
                                 return;
                    /* NOT USED. REMOVED `return` to run. */
                    /* NOT USED. REMOVED `return` to run. */
                    /* NOT USED. REMOVED `return` to run. */

                    let table = DOM.querySelector('#statusSummary');

                    layerTable(table, 'A2:O*', 'Status Summary Dyess');
                }).then(() => --steps);

            when(() => steps < 1).then(() => {
                // Then append to respective sheet(s)
                XLSX.writeFile(masterbook, `Avionics Morning Report (${ today }).xlsx`);
            });
        };

        reader.onerror = error => console.error(error);

        reader.readAsBinaryString(report);
    },
};

// Event listeners
$('#old-report').addEventListener('drop', handle.drop);
$('#old-report').addEventListener('dragover', handle.dragover);
$('#report').addEventListener('change', handle.drop);
$('#login').addEventListener('mouseup', handle.login);
$('#generate').addEventListener('mouseup', handle.generate);
