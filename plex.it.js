/*jshint strict:true, undef:true, noarg:true, immed:true, trailing:true, expr:true */
/*global browser:true, console:true */

(function () {
	'use strict';

	var on = window.addEventListener ? 'addEventListener' : 'attachEvent';
	var off = window.addEventListener ? 'removeEventListener' : 'detachEvent';
	var onmessage = (on === 'attachEvent') ? 'onmessage' : 'message';

	var frameId = 'plexit-bookmarklet-frame';
	var frame = document.getElementById(frameId);

 	var master = document.querySelector('.web-to-plex-button');

	// If the frame is already in the document, the user clicked the bookmarklet
	// multiple times, but we do not want to open another frame no top of it, so
	// return immediately.

	if (frame)
		return;

	var el = {
		css3Prefixes: '-webkit-|-moz-|-ms-|-o-|'.split('|'),

		transition: function (element, property, duration) {
			duration = duration / 1000;
			el.addCSS3Properties(element, 'transition: ' + property + ' ' + duration + 's');
		},

		addCSS3Properties: function (element, property) {
			var rules = [];

			for (var i = 0, len = el.css3Prefixes.length; i < len; i++)
				rules.push(el.css3Prefixes[i] + property);

			element.style.cssText += ';' + rules.join(';') + ';';
		}
	};

	var sidebar = {
		width: 280,
		slideDuration: 500,

		create: function () {
			// Frame URL:
			var url = "https://ephellon.github.io/plex.it/";

			url += '?url=' + encodeURIComponent(window.location.href);
			url += '&host=' + encodeURIComponent(window.location.host);
			url += '&protocol=' + encodeURIComponent(window.location.protocol);
			url += '&search=' + encodeURIComponent(window.location.search);
			url += '&title=' + encodeURIComponent(document.title);
			// Token used to make sure the bookmarklet matches the user
			url += '&queue_email=';
			url += '&plex=' + !!window.IAMPLEX;

			var element = document.createElement('iframe');
			element.id = frameId;
			element.src = url;
            		element.style.display = 'block';
			element.style.position = 'fixed';
			element.style.top = '0';
			element.style.left = sidebar.width * -1 + 'px';
			element.style.width = sidebar.width + 'px';
			element.style.height = '100%';
			element.style.zIndex = '99999999';
			element.style.border = 'none';
			element.style.visibility = 'hidden';

			return element;
		},

		open: function () {
			frame.style.visibility = 'visible';

			el.transition(frame, 'left', sidebar.slideDuration);
			frame.style.left = '0';

			el.transition(document.body, 'margin-left', sidebar.slideDuration);
			document.body.style.marginLeft = sidebar.width + 'px';
		},

		close: function () {
			window[off](onmessage, sidebar.onMessage);

			frame.style.left = sidebar.width * -1 + 'px';
			document.body.style.marginLeft = '0';

			// Wait for the transition to finish before attempting to remove
			// the sidebar from the document.

			setTimeout(function () {
				document.body.removeChild(frame);
			}, sidebar.slideDuration);
		},

		onMessage: function (event) {
			switch (event.data) {
				case 'open':
					sidebar.open();
					break;

				case 'ready':
					// NOTE: On modern browsers Plex It! just works if both URLs are secure.
					frame.contentWindow.postMessage('<html>' + document.documentElement.innerHTML + '</html>', 'https://plex.tv');
					break;

				case 'close':
					sidebar.close();
					break;
			}
		}
	};

	// Listen for postMessage events so we know when we should pass data back
	// or close the sidebar.

	window[on](onmessage, sidebar.onMessage, false);

	// Create the frame and append it to the document. This will kick
	// everything off.

	frame = sidebar.create();
	document.body.insertBefore(frame, master);
})();
