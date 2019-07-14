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

document.body.onload = event => {
    let data = SynQ.get('login-data');

    if(data) {
        data = decodeURIComponent(data);
        data = atob(data);
        data = SynQ.inflate(data);

        /* Main Page */
        if(data.apikey && data.country)
            return open(`index.html${location.search||''}`, '_self');
    }
};

$('#login').onmouseup = async event => {
    let apikey = $('#apikey:valid:not(:placeholder-shown)'),
        country = $('#country:valid:not(:placeholder-shown)');

    if(!apikey)
        return alert('An API key is required to use this site');
    if(!country)
        country = 'US';
    else
        country = country.value.toUpperCase();

    apikey = apikey.value;

    await fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=${apikey}`, { method: 'GET' })
        .then(r => r.json())
        .then(json => {
            if(json.status_message) {
                $('#apikey').setAttribute('valid', false);
                alert(json.status_message);
                throw json.status_message;
            }

            json.filter(object => object.iso_3166_1 === country);

            if(!json.length) {
                let error = `Invalid country code "${country}"`;

                alert(error);

                throw error;
            }
        })
        .catch(error => { throw error });

    let data = SynQ.deflate({ apikey, country });
    data = encodeURIComponent(btoa(data));

    SynQ.set('login-data', data);

    /* Main Page */
    open(`index.html${location.search||''}`, '_self');
};

$('#help').onmouseup = event => open('https://developers.themoviedb.org/3', '_blank');

// todo: add synq for wasier caching
