var loaded = false, stats = "Press the 'Download' button to generate stats.";

(function($) {
// The Navigation Menu
// Mustache + jQuery

function loadMenu() {
  var base_url  = "https://ephellon.github.io/Mio/",
      menu_data =
{
      acc_menu: [
        { title: "Compression",
        items: [
          {title: "Compress",   href: base_url + "com/"},
          {title: "Decompress", href: base_url + "dec/"}
        ]},
        { title: "Signatures",
        items: [
          {title: "Generating Signatures (hashes)", href: base_url + "sign/"}
        ]}
      ]
},
      template, rendered;
  $.get(base_url + "mst/menu.mst", function(file_contents) {
    template = file_contents || $("#template").html();
    rendered = Mustache.render(template, menu_data);
    $("#target").html(rendered); // #template for testing purposes

    $(".devsite-nav-item > a[track-type='leftNav']")
    .click(function(event) {
      $(event.target)
      // .siblings("a[track-type='leftNav']")
        .toggleClass("devsite-nav-toggle-expanded")
        .toggleClass("devsite-nav-toggle-collapsed")
      .siblings("ul")
        .toggleClass("devsite-nav-section-expanded")
        .toggleClass("devsite-nav-section-collapsed");
    });
  });
};

function loadToolbar() {
  var base_url  = "https://ephellon.github.io/Mio/",
      menu_data = {},
      template, rendered;
  $.get(base_url + "mst/toolbar.mst", function(file_contents) {
    template = file_contents || $("#toolbar-template").html();
    rendered = Mustache.render(template, menu_data);
    $("#toolbar-target").html(rendered); // #toolbar-template for testing purposes

    $("#docs-toolbar").html(rendered);
  });
}

loadMenu();
loadToolbar();
loaded = true;

  var loading =
  setInterval(function($) {
  $ = jQuery;

  devsite.devsite.Init($, {'FULL_SITE_SEARCH_ENABLED': 1, 'ENABLE_BLOCKED_VIDEO_PLACEHOLDER': 0, 'VERSION_HASH': '0000000000', 'SITE_NAME': 'Mio', 'HISTORY_ENABLED': 1, 'SUBPATH': '', 'ENABLE_BLOCKED_LINK_TOOLTIP': 0, 'ALLOWED_HOSTS': ['.github.io'], 'BLOCK_RSS_FEEDS': 0, 'SCRIPTSAFE_DOMAIN': '.github.io'},
  '[]', 'en',
  true, '',
  {"00000000000000000000000000000000": false},
  '/',
  'https://ephellon.github.io/Mio/');

  // Main.js

    var timer, blink = false, last = {}, ltr = $("html").css(["writing-mode"]), isPlainText = true,
        swapicon = $("#swapButton span > div.docs-icon-redo, #swapButton span > div.docs-icon-undo"),
        runicons = $("#runButton div.docs-icon-run, #runButton div.docs-icon-debug"),
        icons = {
          swap: ["docs-icon-undo", "docs-icon-redo"],
          run: ["docs-icon-run", "docs-icon-debug"]
        },
        last_active, display, tinyurl;

    ltr = (ltr == "" || ltr == "vertical-lr");
    tinyurl = tinyurl || window.tinyurl;

    function swapIcons(element, pack, bool) {
      bool = bool || false;
      return element
        .toggleClass(icons[pack][0], bool)
        .toggleClass(icons[pack][1], !bool);
    }

    function encodeHTML(string) {
      return string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/(\n[\r\f]?|\r[\n\f]?)/g, "<br>");
    }

    function decodeHTML(string) {
      return string.replace(/<br>/g, "\n").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    }

    function getCurrent(index) {
      return last_active = (last_active == undefined)?
        $(".pretty-input > textarea.active, .pretty-input > textarea.last-active, .pretty-input > textarea").slice(0, 1):
      (last_active instanceof $)?
        last_active:
      $(last_active),
        display = last_active.siblings(".prettyprint"),
        (index != undefined && index != null)? (display = display[index], last_active[index]): last_active;
    }

    function updateCursor() {
      var textarea  = getCurrent(0),
          start     = textarea.selectionStart,
          end       = textarea.selectionEnd,
          value     = textarea.value || "",
          length    = value.length,
          direction = textarea.selectionDirection,
          e         = encodeHTML;

      if(direction == undefined || direction == null)
        direction = ((last.start > start || end < last.end) && ltr)? "left": "right";
      else
        direction = (direction != "forward" && ltr)? "left": "right";

      if((last.start = start) == (last.end = end))
        return e(value.slice(0, start)) +
          '<span class="cursor ' + direction + ' nocode"></span>' +
          e(value.slice(end, length));
      else
        return e(value.slice(0, start)) +
          '<span class="cursor ' + direction + ' nocode">' +
          e(value.slice(start, end)) +
          '</span>' +
          e(value.slice(end, length));
    }

    function updateDisplay() {
      return updateCursor() + "<br>";
    }

    function updateHTML() {
      clearTimeout(timer);
      timer = setTimeout(function() {
        getCurrent();
        display.html(updateDisplay);
        prettyPrint();
      }, 100);
    }

    $(".pretty-input > textarea")
    .on("keyup", function(event) {
      updateHTML();
    })
    .on("mousemove", updateHTML)
    .on("mousedown", updateHTML)
    .on("scroll", function(event) {
      var T = "scrollTop", L = "scrollLeft",
          t = getCurrent(0), s = display,
          a = t[T], b = t[L], o = {};

      if(a == (last[t]||o)[T] && b == (last[t]||o)[L])
        return;
      else
        s[T] = a, s[L] = b;

      if(a > s[T])
        last[T] = t[T] = s[T] - 1;
      if(b > s[L])
        last[L] = t[L] = s[L] - 1;
    })
    .on("focus", function(event) {
      $(last_active = event.target).toggleClass("active", true);
    })
    .on("blur", function(event) {
      $(".pretty-input > textarea.last-active")
        .toggleClass("last-active", false);
      $(event.target)
        .toggleClass("active", false)
        .toggleClass("last-active", true);
    });

    $("#saveButton").click(function(event) {
      if(!isPlainText)
        $("#swapButton").click();

      var zip = new JSZip(), name = "Mio." + (+new Date).toString(36),
          textarea   = getCurrent(),
          original   = textarea.val(),
          hybrid     = Mio.Mi(original, !1),
          compressed = Mio.Mi(original, !0),
          ol         = original.length,
          hl         = hybrid.length,
          cl         = compressed.length,
          q          = 1;

      function si(n) {
        for(var k = "\bKMGTPEZY", n = Math.abs(+n), m = 1024; n >= m && k.length > 1; n /= m)
          k = k.slice(1, k.length);
        return (n + "").replace(/\.(\d{3}).*/, ".$1") + k[0].replace(/[\b]$/, "") + "B";
      }

      function sz(n, m) {
        return (100 - (100 * (n / m)));
      }

      zip.file("README.md",
  "# Mi/o - " + (name) + ".zip\n" +
  "_This document details the statistics of " + (name) + ".zip_.\n" +
  "\n" +
  "_For more information, see [Mi/o](https://Ephellon.github.io/mio/)._\n" +
  "\n" +
  "----\n" +
  "\n" +
  (stats = "### Space Used\n" +
  "  - [Original  ](" + (name) + ".org.txt): " + (si(ol))   + "\n" +
  "  - [Hybrid    ](" + (name) + ".hyb.txt): " + (si(hl))     + "\n" +
  "  - [Compressed](" + (name) + ".cmp.txt): " + (si(cl)) + "\n" +
  "\n" +
  "  - Space " + (cl <= ol? "saved": "lost") + " (using [compressed](" + (name) + ".cmp.txt)): " +
    (si(cl - ol)) + " (" + sz(cl, ol) + "%)" + "\n" +
  "  - Space " + (hl <= ol? "saved": "lost") + " (using [hybrid    ](" + (name) + ".hyb.txt)): " +
    (si(hl - ol)) + " (" + sz(hl, ol) + "%)") + "\n\n" +
  "### Signatures (`fidelity = " + q + "`)\n" +
  "  - Orignal:    " + Mio.sign(original, q) + "\n" +
  "  - Hybrid:     " + Mio.sign(hybrid, q)   + "\n" +
  "  - Compressed: " + Mio.sign(compressed, q));

      zip.file(name + ".org.txt", original);
      zip.file(name + ".hyb.txt", hybrid);
      zip.file(name + ".cmp.txt", compressed);

      zip.generateAsync({type: "blob"})
      .then(function(blob) {         // 1) generate the zip file
        saveAs(blob, name + ".zip"); // 2) trigger the download
      }, function(error) {
        $("#blob").text(error);
      });
    });

    $("#runButton").click(function(event) {
      var self = $(event.target), textarea = getCurrent(), value = textarea.val();

      try {
        eval(value);
        last.error = undefined;
        if(isPlainText) $("#swapButton").click();
        self.attr("title", "Run");
      } catch(error) {
        value = textarea.val();
        last.error = error;
        if(!isPlainText) $("#swapButton").click();
        self.attr("title", "Uncaught: " + error.message);
        alert(error);
        console.error(error);
      }

      textarea.val(value);

      $("#swapButton").click();
    });

    $("#linkButton").click(function(event) {
      if(!tinyurl)
        throw Error("The tinyurl API is not loaded.");

      if(!isPlainText) $("#swapButton").click();

      var textarea = getCurrent(),
          url      = "https://ephellon.github.io/Mio/?input=" + Mio.enc(textarea.val()),
          self     = $(event.target);
      tinyurl(url, function() {
        var url = tinyurl.url;
        try {
          alert("The URL [" + url + "] was " + (document.execCommand("copy", false, url)? "": "not ") + "copied to the clipboard.");
        } catch(e) {
          alert("The URL [" + url + "] cannot be copied to the clipboard.");
        }
      });
    });

    $("#helpButton").click(function(event) {
      // window.open("https://ephellon.github.io/Mio/help/", "blank_");
      alert(stats);
    });

    $("#swapButton").click(function(event) {
      var textarea = getCurrent(0), value = textarea.value;

      swapIcons(swapicon, "swap", isPlainText);

      if(isPlainText)
        try {
          textarea.value = Mio.Mi(last.hold = value);
        } catch(e) {
          swapIcons(swapicon, "swap", isPlainText);
          return alert(e), console.warn(e);
        }
      else
        textarea.value = last.hold = last.hold || value;

      event.target.setAttribute("title", "View " + ((isPlainText)? "original": "compressed") + " text");

      updateHTML();
      isPlainText = !isPlainText;
    });

    last_active = getCurrent(), display.html(last_active.val());

    setInterval(function() {
      $(".cursor").css({"border-color": (blink = !blink)? "#ffffff": "#212121"});
    }, 500);

    if(loaded)
      clearInterval(loading);
  }, 10);
})(jQuery);

devsite.localInit = function() {};
