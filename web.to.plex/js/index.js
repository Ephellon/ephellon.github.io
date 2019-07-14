var use_global_synq_token = true;

let $ = selector => document.querySelector(selector),
    R = RegExp,
    apikey, country,
    genres  = {
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

function modify({ type, title, year, info }) {
    let object = { title, year, ...info };

    $('#info').setAttribute('type', type);

    $('#movie').removeAttribute('active');
    $('#tv-show').removeAttribute('active');

    $(`#${ type }`).setAttribute('active', true);

    let element;
    for(let key in object)
        if(element = $(`#${ key }`))
            element.innerHTML = object[key] || "";

    let poster = `https://image.tmdb.org/t/p/original${ object.poster }`;
    $('#body').setAttribute('style', `background-image: url("${ poster }")`);
    $('#poster').setAttribute('src', poster);

    let { imdb, tmdb, tvdb } = object,
        ids = { imdb, tmdb, tvdb };

    for(let id in ids)
        $(`#${ id }`).setAttribute('href', (
            id == 'tmdb'?
                `https://www.youtube.com/embed/${ object[id.toUpperCase()] }`:
            `blank.html`
        ));
}

async function as(type, id) {
    open(`blank.html`, 'frame');

    let data = {};
    await fetch(`https://api.themoviedb.org/3/${ type }/${ id }?api_key=${ apikey }`, { method: 'GET' })
        .then(r => r.json())
        .then(json => {
            let poster = json.backdrop_path,
                title  = json[type == 'tv'? 'original_name': 'title'],
                releaseDate = json[type == 'tv'? 'first_air_date': 'release_date'],
                year   = parseInt(releaseDate),
                genre  = json.genres.map(g => g.name).sort().join(' / '),
                imdb   = json.imdb_id,
                description = json.overview,
                runtime = (m => {let h=0;for(;m>=60;m-=60,h++);return [h,m>9?m:'0'+m]})(+json.runtime).join(':');
        
            data = {
                type, title, year,
                'info': {
                    runtime, genre, poster,
                    'release-date': `${ releaseDate.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, ($0, $1, $2, $3, $$, $_) => `${['January','February','March','May','June','July','August','September','October','November','December'][(+$2)-1]} ${$3}, ${$1}`) } (${ country })`,

                    'imdb': imdb,
                    'tmdb': id,
                },
            };
        });

    // Content Rating
    await fetch(`https://api.themoviedb.org/3/${ type }/${ id }/${ type == 'tv'? 'content_ratings': 'release_dates' }?api_key=${ apikey }`, { method: 'GET' })
        .then(r => r.json())
        .then(json => {
            if(json.results && json.results.length)
                data.info.rating = json.results.filter(result => result.iso_3166_1 === country)[0].release_dates.filter(o => o[type == 'tv'? 'rating': 'certification'])[0][type == 'tv'? 'rating': 'certification'];
        });

    // Trailer Links
    await fetch(`https://api.themoviedb.org/3/${ type }/${ id }/videos?api_key=${ apikey }`, { method: 'GET' })
        .then(r => r.json())
        .then(json => {
            if(json.results && json.results.length)
                data.info.TMDB = json.results.filter(result => result.iso_3166_1 === country)[0].key,
                data.info.TVDB = (type == 'tv'? data.info.TMDB: null);
        });

    // Similar Content
    await fetch(`https://api.themoviedb.org/3/${ type }/${ id }/similar?api_key=${ apikey }`, { method: 'GET' })
        .then(r => r.json())
        .then(json => {
            if(json && json.length)
                data.similar = json;
        });

    console.log(data);

    return modify(data);
}

async function popular(type) {
    type = type.replace(/(-show)?$/, '');

    fetch(`https://api.themoviedb.org/3/${type}/popular?api_key=${apikey}`, { method: 'GET' })
        .then(r => r.json())
        .then(json => {
            let { results } = json,
                length = results.length;

            let item = results[(Math.random()*length)|0];

            return as(type, item.id);
        });
}

document.querySelectorAll('#movie, #tv-show').forEach(element => {
    element.onmouseup = event => {
        let self = event.target;

        popular(self.id);
    };
});

document.querySelectorAll('[target="frame"]').forEach(element => {
    let body = document.body,
        frame = $('#frame'),
        loading = $('#loading');

    element.onmouseup = event => {
        loading.setAttribute('loading', true);
        loading.removeAttribute('style');
    }

    frame.onload = frame.onerror = event => {
        loading.setAttribute('loading', false);
        setTimeout(() => loading.setAttribute('style', 'display:none'), 500);
    }
});

document.body.onload = event => {
    let data = SynQ.get('login-data');

    if(data) {
        data = decodeURIComponent(data);
        data = atob(data);
        data = SynQ.inflate(data);

        apikey = data.apikey;
        country = data.country;
    } else {
        /* Login Page */
        return open('login.html', '_self');
    }

    /\?(movie|tv-show)(?:=(\d+))?/i.test(location.search)?
        as(R.$1, R.$2):
    popular(['movie','tv-show'][+(Math.random>0.5)]);
};
