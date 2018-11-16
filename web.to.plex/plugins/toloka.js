/* Web to Plex - Toloka Plugin
* Aurthor(s) - @chmez (2017)
*/
// REQUIRED [plugin:object]: The plugin object
const plugin = {
    // REQUIRED [plugin.url]: this is what you ask Web to Plex access to; currently limited to a single domain
    url: "https://toloka.to/",

    // OPTIONAL: this is purely for your code functionality
    getID: () => {
        let links = document.querySelectorAll('.postlink'),
            regex = /^https?\:\/\/(?:w{3}\.)?imdb\.com\/title\/(tt\d+)/i;

        for(let link in links)
            if(regex.test(links[link]))
                return RegExp.$1;
    },

    // REQUIRED [plugin.init]: this is what Web to Plex will call on when the url is detected
    // it will always be fired after the page and Web to Plex have been loaded
    init: (IMDbID) => {
        let title = document.querySelector('.maintitle').textContent.replace(/^[^\/]+\/\s+([^\(]+)\(([\d]{4})/, '$1').trim(),
                // REQUIRED [title:string]
            year = RegExp.$2,
                // PREFERRED [year:number, null, undefined]
            image = document.querySelector('.postbody img').src;
                // OPTIONAL [image:string]

        // REQUIRED [{ type:'movie', 'show'; title:string; year:number; target:'web-to-plex' }]
        // PREFERRED [{ image:string; IMDbID:string; TMDbID:string, number; TVDbID:string, number }]
        return { type: 'movie', title, year, image, IMDbID, url, target: 'web-to-plex' };
    }
};

// the rest of the code is up to you, but should be limited to a layout similar to this
let id = plugin.getID();

if(id)
    return plugin.init(id);
