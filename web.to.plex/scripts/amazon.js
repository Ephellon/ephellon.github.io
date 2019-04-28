// Web to Plex - Toloka Plugin
// Aurthor(s) - @ephellon (2019)

/* Minimal Required Layout *
  script {
    url:  string,
    init: function => ({ type:string, title:string, year:number|null|undefined })
  }
*/

// REQUIRED [script:object]: The script object
let script = {
    // PREFERRED [script.ready]: a function to determine that the page is indeed ready
    "ready": () => !$('[data-automation-id="imdb-rating-badge"], #most-recent-reviews-content > *:first-child').empty,

    // REQUIRED [script.init]: it will always be fired after the page and Web to Plex have been loaded
    // OPTIONAL [ready]: if using script.ready, Web to Plex will pass a boolean of the ready state
    "init": (ready) => {
        let Y, R = RegExp;

        let title = $('[data-automation-id="title"], #aiv-content-title, .dv-node-dp-title')
                    .first.textContent
                    .replace(/(?:\(.+?\)|(\d+)|\d+\s+seasons?\s+(\d+))\s*$/gi, '')
                    .trim(),
                // REQUIRED [title:string]
                // you have access to the exposed "helper.js" file within the extension
            year = !(Y = $('[data-automation-id="release-year-badge"], .release-year')).empty?
                        Y.first.textContent.trim():
                    +(R.$1 || R.$2 || YEAR),
                // PREFERRED [year:number, null, undefined]
            image = getComputedStyle(
                        $('.av-bgimg__div, div[style*="sgp-catalog-images"]').first
                    ).backgroundImage,
                // the rest of the code is up to you, but should be limited to a layout similar to this
            type = script.getType();

        // REQUIRED [{ type:'movie', 'show'; title:string; year:number }]
        // PREFERRED [{ image:string; IMDbID:string; TMDbID:string, number; TVDbID:string, number }]
        return { type, title, year, image };
    },

    // OPTIONAL: the rest of this code is purely for functionality
    "getType": () => {
        return !$('[data-automation-id*="seasons"], [class*="seasons"], [class*="episodes"], [class*="series"]').empty?
            'tv':
        'movie'
    },
};
