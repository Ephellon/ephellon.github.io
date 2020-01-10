var use_global_synq_token = true;

let $ = selector => document.querySelector(selector),
    R = RegExp,
    apikey, country,
    genres = {
        28:    "Action",
        12:    "Adventure",
        16:    "Animation",
        35:    "Comedy",
        80:    "Crime",
        99:    "Documentary",
        18:    "Drama",
        10751: "Family",
        14:    "Fantasy",
        36:    "History",
        27:    "Horror",
        10402: "Music",
        9648:  "Mystery",
        10749: "Romance",
        878:   "Science Fiction",
        10770: "TV Movie",
        53:    "Thriller",
        10752: "War",
        37:    "Western",

        10759: "Action & Adventure",
        10762: "Kids",
        10763: "News",
        10764: "Reality",
        10765: "Sci-Fi & Fantasy",
        10766: "Soap Opera",
        10767: "Talk",
        10768: "War & Politics",
    };

function comify(number = 0) {
    number = (number + '')
        .split('')
        .reverse()
        .join('')
        .replace(/(\d{3})/g, '$1,')
        .split('')
        .reverse()
        .join('')
        .replace(/,+/g, ',')
        .replace(/^,+|,+$/g, '');

    return number;
}

function modify({ type, title, year, similar, info }) {
    let object = { title, year, ...info };

    document.title = `Web to Plex | ${title} (${year})`;

    $('#info').setAttribute('type', type);
    $('#movie').removeAttribute('active');
    $('#tv').removeAttribute('active');
    $(`#${ type }`).setAttribute('active', true);
    $('#yutb').innerHTML = `<img class=icon src="img/youtube.png"/>${object.trailer || 'not found'}`;
    $('#yutb').setAttribute('href', !object.trailer? 'blankt.html': `https://www.youtube.com/embed/${ object.trailer }`);

    let element;
    for(let key in object)
        if(element = $(`#${ key }`))
            if(/^[it]mdb$/i.test(key))
                element.innerHTML = `<img class=icon src="img/${key}.png" />${object[key] || ''}`;
            else
                element.innerHTML = object[key] || '';

    let poster = `https://image.tmdb.org/t/p/original${ object.poster[0] }`;
    $('body').setAttribute('style', `background: url("img/noise.png") fixed, url("${ poster }") fixed center / cover no-repeat;`);
    $('#body').setAttribute('description', object.description || 'No description availabe');
    $('#poster').setAttribute('src', `https://image.tmdb.org/t/p/original${object.poster[1]||'/'}`);

    let { imdb, tmdb } = object,
        ids = { imdb, tmdb },
        tv = type == 'tv';

    for(let id in ids)
        $(`#${ id }`).setAttribute('href', (
            object[id]?
                id == 'tmdb'?
                    `https://www.themoviedb.org/${type}/${object[id]}`:
                `https://www.imdb.com/title/${object[id]}`:
            ($(`#${ id }`).target = 'frame', 'blank.html')
        ));

    $('#similar').innerHTML = '';

    if(similar && similar.length)
        similar.map(item => $('#similar').innerHTML += `<li>\u2023 <a href="?${type}=${item.id}">${item[tv?`${/^u[sk]$/i.test(country)?'':'original_'}name`:'title']} (${item[tv?'first_air_date':'release_date'].slice(0,4)})</a></li>`);
}

async function as(type, id) {
    open(`blank.html`, 'frame');

    let data = {},
        tv = type == 'tv';
    await fetch(`https://api.themoviedb.org/3/${ type }/${ id }?api_key=${ apikey }`, { method: 'GET' })
        .then(r => r.json())
        .then(json => {
            let poster = [json.backdrop_path, json.poster_path],
                title  = json[tv? `${/^u[sk]$/i.test(country)?'':'original_'}name`: 'title'],
                releaseDate = json[tv? 'first_air_date': 'release_date'],
                year   = parseInt(releaseDate),
                genre  = json.genres.map(g => g.name).sort().join(' / '),
                imdb   = json.imdb_id,
                description = json.overview,
                runtime = (m => {let h=0;for(;m>=60;m-=60,h++);return [h,('0'+m).slice(-2)]})(json[tv?'episode_run_time':'runtime']|0).join(':')+(tv?'/Eps':''),
                { vote_average, vote_count } = json;

            data = {
                type, title, year,
                'info': {
                    runtime, genre, poster, description,
                    'release-date': `${ releaseDate.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, ($0, $1, $2, $3, $$, $_) => `${['January','February','March','April','May','June','July','August','September','October','November','December'][(+$2)-1]} ${$3}, ${$1}`) } (${ country })`,
                    'votes': `${(vote_average * 10)|0}% (${comify(vote_count||0)} votes)`,

                    'imdb': imdb,
                    'tmdb': id,
                },
            };
        });

    // Content Rating
    await fetch(`https://api.themoviedb.org/3/${ type }/${ id }/${ tv? 'content_ratings': 'release_dates' }?api_key=${ apikey }`, { method: 'GET' })
        .then(r => r.json())
        .then(json => {
            if(json.results && json.results.length) {
                let results = json.results.filter(result => result.iso_3166_1 === country)[0] || json.results.filter(results => results.iso_3166_1)[0];

                if(tv)
                    data.info.rating = results.rating;
                else
                    data.info.rating = results.release_dates.filter(o => o.certification)[0],
                    data.info.rating = (data.info.rating? data.info.rating.certification: 'NR');
            }
        });

    // Trailer Links
    await fetch(`https://api.themoviedb.org/3/${ type }/${ id }/videos?api_key=${ apikey }`, { method: 'GET' })
        .then(r => r.json())
        .then(json => {
            if(json.results && json.results.length)
                data.info.trailer = json.results.filter(result => result.iso_3166_1 === country)[0].key;
        });

    // Similar Content
    await fetch(`https://api.themoviedb.org/3/${ type }/${ id }/similar?api_key=${ apikey }`, { method: 'GET' })
        .then(r => r.json())
        .then(async json => {
            let { results } = json;

            if(results && results.length)
                data.similar = results;
            else
                await fetch(`https://api.themoviedb.org/3/${type}/popular?api_key=${apikey}&page=${((Math.random()*10)|0)||1}`, { method: 'GET' })
                    .then(r => r.json())
                    .then(json => {
                        let { results } = json;

                        if(results && results.length)
                            data.similar = results;
                    });
        });

    console.log(data);

    return modify(data), data;
}

async function popular(type) {
    return await fetch(`https://api.themoviedb.org/3/${type}/popular?api_key=${apikey}&page=${((Math.random()*50)|0)||1}`, { method: 'GET' })
        .then(r => r.json())
        .then(json => {
            let { results } = json,
                length = results.length;

            let item = results[(Math.random()*length)|0];

            return as(type, item.id);
        });
}

document.querySelectorAll('#back, #movie, #tv, #similar a').forEach(element => {
    element.onmousedown = async event => {
        let title = $('#title').textContent,
            year  = $('#year').textContent;

        SynQ.set('last-item', location.search);
        SynQ.set('last-title', `${ title } (${ year })`);
    };
});

document.querySelectorAll('#movie, #tv').forEach(element => {
    element.onmouseup = async event => {
        let self = event.target;
        let data = await popular(self.id);

        location.search = `?${self.id}=${data.info.tmdb}`;
    };
});

document.querySelectorAll('[target="frame"]').forEach(element => {
    let body = document.body,
        frame = $('#frame'),
        loading = $('#loading');

    element.onmouseup = event => {
        frame.setAttribute('loading', true);
        loading.setAttribute('loading', true);
        loading.removeAttribute('style');
    }

    frame.onload = frame.onerror = event => {
        frame.setAttribute('loading', false);
        loading.setAttribute('loading', false);
        setTimeout(() => loading.setAttribute('style', 'display:none'), 500);
    }
});

document.body.onload = event => {
    let data = SynQ.get('login-data'),
        last_item = SynQ.get('last-item') || '?',
        last_title = SynQ.get('last-title') || '...';

    if(last_title) {
        $('#back').setAttribute('title', `Back to "${ last_title }"`);
        $('#back').onmouseup = event => open(last_item, '_self');
    }

    if(data) {
        data = decodeURIComponent(data);
        data = atob(data);
        data = SynQ.inflate(data);

        apikey = data.apikey;
        country = data.country;
    } else {
        /* Login Page */
        return open(`login.html${location.search||''}`, '_self');
    }

    /\?(movie|tv)(?:\=(\d+))?/i.test(location.search)?
        as(R.$1, R.$2):
    (async() => {
        let data = await popular(['movie','tv'][+(Math.random>0.5)]);

        location.search = `?${data.type}=${data.info.tmdb}`;
    })();
};

let searching;
$('#search').addEventListener('keyup', event => {
    if(searching)
        clearTimeout(searching);

    let type = $('#info').getAttribute('type'),
        query = $('#search').value;

    searching = setTimeout(async() => {
        $('#results').innerHTML = '';

        await fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${apikey}&query=${encodeURIComponent(query)}`)
            .then(r => r.json())
            .then(json => {
                let { results } = json,
                    valid = !!(results && results.length);

                $('#search').setAttribute('valid', valid? true: results? false: '');

                if(valid)
                    for(let index = 0, length = results.length; index < length; index++) {
                        let { title, year, name, id, release_date, first_air_date, vote_average, vote_count, genre_ids, adult, poster_path, overview } = results[index];

						year = (release_date||first_air_date||'').slice(0,4);
						genre_ids = genre_ids.map(i=>genres[i]).join('/');

                        $('#results').innerHTML += index < 5?
`<a href="?${type}=${id}" title="${vote_average}/10 rating (${comify(vote_count)} votes)" style="background: url(https://image.tmdb.org/t/p/original${poster_path}) center right/contain no-repeat; height: 100px;">
    <span class="rating">${adult?'XXX':''}</span> \u2023 <span>${name||title} ${year?`(${year}) `:''}${genre_ids?'&bullet; ':''}${genre_ids}</span>
    <div class="overview">${overview}</div>
</a>`:

`<a href="?${type}=${id}" title="${vote_average}/10 rating (${comify(vote_count)} votes)">
    <span class="rating">${adult?'XXX':''}</span> \u2023 <span>${name||title} ${year?`(${year}) `:''}${genre_ids?'&bullet; ':''}${genre_ids}</span>
</a>`;
                    }
            })
            .then(u => clearTimeout(searching));
    }, 500);
});

$('#logout').onmouseup = event => {
    SynQ.clear();

    open(location.search || '', '_self');
};

if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/web.to.plex/service-worker.js', { scope: '.' })
            .then(worker => {
                // Success
                console.log(`Service Worker registered [${ worker.scope }]:`, worker);
            }, error => {
                // Error
                console.error(`Service Worker not registered:`, error)
            });
    });
}
