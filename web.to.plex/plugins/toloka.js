/* Web to Plex - Toloka Plugin
 * Aurthor(s) - @chmez (2017)
 */

const plugin = {
    url: "https://toloka.to/t*",
    getID: () => {
        let links = document.querySelectorAll('.postlink'),
            regex = /^https?:\/\/(?:w{3}\.)?imdb\.com\/title\/(tt\d+)/;

        for(let link in links)
            if(regex.test(links[link]))
                return RegExp.$1;
    },
    init: (IMDbID) => {
        let name = document.querySelector('.maintitle').textContent.replace(/^[^\/]+\/\s+([^\(]+)\(([\d]{4})/, '$1').trim(),
            year = RegExp.$2;

        window.postMesage({ type: 'movie', title, year, IMDbID, target: 'web-to-plex' }, '*');
    }
};

let id = plugin.getID();

if(id)
    plugin.init(id);
