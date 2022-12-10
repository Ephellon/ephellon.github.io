/** Peer Assessment
 * 1) Rank each category by importance
 * 2) Rank each person by relevance to each category
 * 3) Display results
 */
/***
 *       _____
 *      / ____|
 *     | |     ___  _ __ ___
 *     | |    / _ \| '__/ _ \
 *     | |___| (_) | | |  __/
 *      \_____\___/|_|  \___|
 *
 *
 */
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

// Returns whether a value is nullish or not
    // nullish(value:any?) → boolean
function nullish(value) {
    return value === undefined || value === null;
}

// Returns whether a value is nullish or not
    // defined(value:any?) → boolean
function defined(value) {
    return !nullish(value);
}

// Create elements
    // furnish(tagname:string?, attributes:object?, ...children<Element>) → Element
function furnish(tagname = 'div', attributes = null, ...children) {
    let options = (attributes ??= {}).is === true? { is: true }: null;

    delete attributes.is;

    let esc = false,
        name = '',
        value = '';

    let context, climate, element;

    parsing:
    for(let index = 0, length = tagname?.length | 0; index <= length; ++index) {
        let char = tagname[index] || '',
            last = index == length;

        if(last || (climate != context)) {
            if((defined(context) && nullish(climate)) || (context?.startsWith?.(climate) === false)) {
                name = '';
                value = '';
            }

            climate = context;
        }

        switch(context) {
            case 'attribute': {
                if(char == '=') {
                    context = 'attribute-value';
                    continue;
                } else if(char == ']') {
                    attributes[name] = value;

                    context = null;
                    continue;
                }

                name += char;

                if(last)
                    attributes[name] = value;
            } break;

            case 'attribute-value': {
                if(esc || char == '\\') {
                    esc = !esc;

                    if(esc)
                        continue;
                } else if(!esc) {
                    if(char == ']') {
                        attributes[name] = value;

                        context = null;
                        continue;
                    } else if(char == '"') {
                        if(value.length > 0) {
                            attributes[name] = value;

                            context = 'attribute';
                        }

                        continue;
                    }
                }

                value += char;

                if(last)
                    attributes[name] = value;
            } break;

            case 'class': {
                if(esc || char == '\\') {
                    esc = !esc;

                    if(esc)
                        continue;
                } else if(!esc) {
                    if(char == '#') {
                        element.classList.add(value.trim());

                        context = 'id';
                        continue;
                    } if(char == '.') {
                        element.classList.add(value.trim());

                        value = '';
                        continue;
                    } if(char == '[') {
                        element.classList.add(value.trim());

                        context = 'attribute';
                        continue;
                    }
                }

                value += char;

                if(last)
                    element.classList.add(value.trim());
            } break;

            case 'id': {
                if(esc || char == '\\') {
                    esc = !esc;

                    if(esc)
                        continue;
                } else if(!esc) {
                    if(char == '.') {
                        element.setAttribute(context, value.trim());

                        context = 'class';
                        continue;
                    } if(char == '[') {
                        element.setAttribute(context, value.trim());

                        context = 'attribute';
                        continue;
                    }
                }

                value += char;

                if(last)
                    element.setAttribute(context, value.trim());
            } break;

            default: {
                if(nullish(element)) {
                    // https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-tag-name
                    if(/[0-9a-zA-Z]/.test(char)) {
                        name += char;
                    } else {
                        if(char == '#')
                            context = 'id';
                        if(char == '.')
                            context = 'class';
                        if(char == '[')
                            context = 'attribute';

                        if(last || defined(context))
                            element = document.createElement((name || 'div'), options);
                    }
                } else {
                    if(char == '#')
                        context = 'id';
                    if(char == '.')
                        context = 'class';
                    if(char == '[')
                        context = 'attribute';
                }
            } break;
        }
    }

    Object.entries(attributes)
        .filter(([name, value]) => name?.length)
        .forEach(([name, value]) => {
            name = name?.trim();

            return (/^(@|data-|on|(?:(?:inner|outer)(?:HTML|Text)|textContent|class(?:List|Name)|value)$)/.test(name) || typeof value == 'function')?
                (/^on/.test(name))?
                    element.addEventListener(name.replace(/^on/, ''), value):
                (/^(@|data-)/.test(name))?
                    element.dataset[name.replace(/^(@|data-)/, '').replace(/-(\w)/g, ($0, $1, $$, $_) => $1.toUpperCase())] = value:
                element[name] = value:
            element.setAttribute(name, value);
    });

    children
        .filter(defined)
        .forEach(child => element.append(child));

    /* furnish('div').and('figure').with('svg').and('figure').with('svg') → div > figure > svg ~ figure > svg */
    Object.defineProperties(element, {
        // Add a child; chains down the tree
        // Returns the last accessed child
        and: {
            value: function(...children) {
                let last;
                for(let child of children)
                    this.append(last = child);

                return last;
            },

            writable: false,
            enumerable: true,
            configurable: false,
        },

        // Shorthand to set the element's innerHTML
        html: {
            value: function(innerHTML) {
                if(nullish(innerHTML))
                    return this.outerHTML;
                this.innerHTML = innerHTML;

                return this;
            },

            writable: false,
            enumerable: true,
            configurable: false,
        },

        // Shorthand to set the element's innerText
        text: {
            value: function(innerText) {
                if(nullish(innerText))
                    return this.innerText;
                this.innerText = innerText;

                return this;
            },

            writable: false,
            enumerable: true,
            configurable: false,
        },

        // Add a child; immediately after the root `this`
        // Returns `this`
        with: {
            value: function(...children) {
                for(let child of children)
                    this.append(child);

                return this;
            },

            writable: false,
            enumerable: true,
            configurable: false,
        },
    });

    element.and?.bind?.(element);
    element.with?.bind?.(element);

    return element;
}

// Convert milliseconds into a human-readable string
    // toTimeString(milliseconds:number?, format:string?) → string
function toTimeString(milliseconds = 0, format = 'natural') {
    let second = 1000,
        minute = 60 * second,
        hour   = 60 * minute,
        day    = 24 * hour,
        year   = 365 * day;

    let time = [],
        times = new Map([
            ['year'  ,   year],
            ['day'   ,    day],
            ['hour'  ,   hour],
            ['minute', minute],
            ['second', second],
        ]),
        result;

    let joining_symbol = ' ',
        sign = (milliseconds < 0? '-': ''),
        originalTime = milliseconds;

    milliseconds = Math.abs(milliseconds);

    switch(format) {
        case 'natural': {
            for(let [name, value] of times)
                if(milliseconds >= value) {
                    let amount = (milliseconds / value) | 0;

                    time.push(`${ amount } ${ name + (amount == 1? '': 's') }`);

                    milliseconds -= amount * value;
                }

            if(time.length > 1)
                time.splice(-1, 0, 'and');

            result = time;
        } break;

        case 'clock':
            format = '!hour:!minute:!second';

        default: {
            joining_symbol = '';

            for(let [name, value] of times)
                if(milliseconds >= value) {
                    let amount = (milliseconds / value) | 0;

                    time.push(time[name] = (amount + '').padStart(2, '00'));

                    milliseconds -= amount * value;
                }

            times.set('millisecond', milliseconds);

            result = format
                // Replace the text
                .split(/([\!\?](?:year|day|hour|minute|(?:milli)?second))s?(?:\b|_)/g)
                .map($1 => {
                    let [command, ...argument] = $1;

                    argument = argument.join('');

                    // Syntax `!hour:!minutes:!seconds → ?hour → ?minutes → ?seconds` → `01:00:00 → 1 → 60 → 3600`
                    switch(command) {
                        // Total amount
                        case '?': {
                            for(let [name, value] of times)
                                if(argument == 'millisecond')
                                    return milliseconds;
                                else if(argument == name)
                                    return Math.round(originalTime / times.get(name));
                        } break;

                        // Radix amount (left over)
                        case '!': {
                            for(let [name, value] of times)
                                if(argument == 'millisecond')
                                    return milliseconds;
                                else if(argument == name)
                                    return time[name] ?? '00';
                        } break;
                    }

                    return $1;
                });
        } break;
    }

    return sign + result.join(joining_symbol);
}

/***
 *      __  __             _
 *     |  \/  |           (_)
 *     | \  / | __ _  __ _ _  ___
 *     | |\/| |/ _` |/ _` | |/ __|
 *     | |  | | (_| | (_| | | (__
 *     |_|  |_|\__,_|\__, |_|\___|
 *                    __/ |
 *                   |___/
 */
location.hash = -1;

let opts = {
    delay: 150,
    delayOnTouchOnly: true,
    touchStartThreshold: 5,

    animation: 150,
    draggable: 'li',
    easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`,
    filter: '.ignore',
};

let cats = new Sortable($('#cats'), opts);

let peers = [
    'Alexander',
    'Burkholder',
    'Cain',
    'Chase',
    'Fountain',
    'Grey',
    'Julius',
    'LaPlante',
    'Matt',
    'Nail',
    'Richards',
    'Rogers',
    'Saez',
    'Scott',
    'Sweeney',
    'Yeager',
];

$('#name').append(
    ...peers.map((name, value) => furnish('option').with(name))
);

$('#start').addEventListener('mouseup', event => {
    peers = peers.filter((v,i,a) => i != $('#name').selectedIndex);

    $('header').remove();
});

let lists = new Map;

$('#next').addEventListener('mouseup', event => {
    let ind = +location.hash.slice(1);

    if(isNaN(ind))
        return;

    let f = furnish;
    if(ind < 0) {
        $.all('section ~ section:not(#_)').map(sect => sect.remove());

        [...cats.el.children].map((kid, index, kids) => {
            let name = kid.textContent,
                tip = $('[tip]', kid).getAttribute('tip') || '';

            let list = f('ul', {
                top: `Most ${ name.toLowerCase() }`,
            }).with(
                ...peers.map(peer => f('li')
                    .with(peer)
                    .with(f('button', {
                        onmouseup(event) {
                            this.closest('li').remove();
                        },
                    }))
            ));

            let sect = f(`section#${ index }`).with(
                f('h1').with(`Arrange your peers based on how `, f('span', { style: 'text-decoration:2px underline' }).with(name.toLowerCase()), ` they are.`),
                f('h4').with(tip),
                list,
            );

            $('#fill').insertAdjacentElement('beforebegin', sect);

            lists.set(name, new Sortable(list, opts));
        });

        ++ind;
        $('section').id = -1;
    } else {
        let len = cats.el.children.length;

        if(ind < len) {
            ++ind;
        } if(ind == len) {
            ind = '_';

            // Tally
            let points = {};
            let max = lists.size;

            for(let [cat, list] of lists) {
                let kids = [...list.el.children],
                    pts = kids.length;

                for(let kid of kids) {
                    points[kid.textContent] |= 0;
                    points[kid.textContent] += max * pts;

                    --pts;
                }

                --max;
            }

            points = Object.entries(points).sort(([,a], [,b]) => b - a);

            $('#_ ol')?.remove();

            $('#_').append(
                f('ol').with(
                    ...points.map(([name, points]) => f('li', { points }).with(`${ name } \u2012 ${ points } \u20a7`))
                )
            );
        }
    }

    location.hash = `#${ ind }`;
    $('footer').dataset.step = (isNaN(ind)? 10: ind) + 2;
});

$('#prev').addEventListener('mouseup', event => {
    let ind = +location.hash.slice(1);

    if(isNaN(ind))
        ind = cats.el.children.length;
    else if(ind < 0)
        return;

    location.hash = `#${ --ind }`;
    $('footer').dataset.step = ind + 2;
});

setInterval(due => {
    due.innerText = toTimeString(new Date('Dec 12 2022 08:00:00 GMT-0700') - new Date);
}, 100, $('#due'));
