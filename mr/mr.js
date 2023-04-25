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
            const data = event.target?.result;

            let masterbook = XLSX.read(data, { type: 'binary' });

            // Get reports...
            fetch(`<RAMPOD URL>`).then(response => response.text()).then(html => (new DOMParser).parseFromString(html, 'text/html'))
                .then(DOM => {
                    let table = $(`table`, DOM);
                    let sheet = XLSX.utils.table_to_sheet(table);

                    XLSX.utils.book_append_sheet(masterbook, sheet, 'Outside');
                });

            // Then append to respective sheet(s)
            XLSX.writeFile(masterbook, `Avionics Morning Report ${ today }.xlsx`);
        };

        reader.onerror = error => console.error(error);

        reader.readAsBinaryString(report);
    },
};
