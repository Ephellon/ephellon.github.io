// Web to Plex - Shana Project Plugin
// Aurthor(s) - @ephellon (2018)

let plugin = {
    "url": "*://*.shanaproject.com/*",

    "init": () => {
        let title = document.querySelector('#header_big h2'),
            year = title.nextElementSibling(),
            image = document.querySelector('#header_big .header_display_box').style['background-image'].trim().replace(/url\((.+)\)/i, '$1');

        title = title.textContent.trim();
        year  = +year.textContent.trim();

        return { type: 'show', title, year, image };
    }
};
