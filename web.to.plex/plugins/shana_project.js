// Web to Plex - Shana Project Plugin
// Aurthor(s) - @ephellon (2018)

let plugin = {
    "url": "*://*.shanaproject.com/*",

    "init": () => {
        let title = document.querySelector('#header_big .header_info_block').textContent.trim(),
            year = +document.querySelector('#header_big .header_info_block + *').textContent.trim().replace(/^.*(\d{4}).*$/m, '$1'),
            image = document.querySelector('#header_big .header_display_box').style['background-image'].trim().replace(/url\((.+)\)/i, '$1');

        return { type: 'show', title, year, image };
    }
};
