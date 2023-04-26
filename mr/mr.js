// The following is just shared logic
    // $(selector:string, container:Node?, multiple:boolean?) → Array|Element
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
        for(let _ = +_1; _ <= _0; _ += +skip)
            field[c+_] = field.push(c+_);

    return field;
}

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

        let generate = $('#generate');

        generate.disabled = !RAMPOD || !UPLOAD;
    },

    generate(event) {
        let [Day, Mon, day, year, time, offset] = (new Date + '').split(' ', 6);
        let today = [day, Mon, year].join('-');

        // Load master-book (the one the user dropped in)
        let [report] = $('#report').files;
        let reader = new FileReader;

        reader.onload = event => {
            const meta = event.target?.result;

            let masterbook = XLSX.read(meta, { type: 'binary' });

            // Get reports...
            fetch(`<RAMPOD URL>`).then(response => response.text()).then(html => (new DOMParser).parseFromString(html, 'text/html'))
                .then(DOM => {
                    // Modify a single cell → https://stackoverflow.com/a/51442854/4211612
                    let name = '24hr Prod';
                    let table = $(`table`, DOM);
                    let sheet = XLSX.utils.table_to_sheet(table);
                    let mastersheet = masterbook.Sheets[name];

                    // Append to the sheet
                    let json = XLSX.utils.sheet_to_json(mastersheet),
                        copy = [...json],
                        data = XLSX.utils.sheet_to_json(sheet);

                    // It's the 1st. Reset the sheet
                    if(today == yesterday) {
                        json = [];

                        for(let cell of copy)
                            if(cell.__rowNum__ in range('A1:M2'))
                                json.push(cell);
                    }

                    // Append data to the sheet...
                    json.push(...data);

                    masterbook.Sheets[name] = XLSX.utils.json_to_sheet(json);
                });

            // Then append to respective sheet(s)
            XLSX.writeFile(masterbook, `Avionics Morning Report (${ today }).xlsx`);
        };

        reader.onerror = error => console.error(error);

        reader.readAsBinaryString(report);
    },
};
