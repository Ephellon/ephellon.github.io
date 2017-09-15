(function($) {
// The Navigation Menu
// Mustache + jQuery

function loadMenu() {
  var base_url  = "https://ephellon.github.io/Paramour/",
      menu_data =
  {
    new_menu: [
      { title: "Overview",        date: "08/22/2017 01:20 CST", href: base_url },
      { title: "Executable .JAR", date: "08/22/2017 01:20 CST", href: base_url + "extras/Paramour.zip" },
      { title: "Change Log",      date: "08/22/2017 01:20 CST", href: base_url + "changelog.md" }
    ],
    acc_menu: [
      { title: "5-Minute Demos",
        items: [
          {title: "99 Bottles of Beer", href: base_url + "extras/#99"},
          {title: "Pyramid Class",      href: base_url + "extras/#Pyramid"},
          {title: "Toggle Class",       href: base_url + "extras/#Toggle"},
          {title: "String Radix Suite", href: base_url + "extras/#String Radii"}
        ]},

        { title: "Comments",
        items: [
          {title: "Basic Comments",      href: base_url + "comments/"},
          {title: "Phantoms",            href: base_url + "comments/phantoms/"},
          {title: "Docstrings",          href: base_url + "comments/docstrings/"},
          {title: "Type Annotations",    href: base_url + "comments/type-annotations/"},
          {title: "Version Controlling", href: base_url + "comments/version-control/"},
          {title: "Version Querying",    href: base_url + "comments/version-query/"}
        ]},

        { title: "Keywords",
        items: [
          {title: "Reserved Words",               href: base_url + "keywords/"},
          {title: "Type Controlled Declarations", href: base_url + "keywords/type-declarations/"},
          {title: "Case & Default Statements",    href: base_url + "keywords/case-and-default/"}
        ]},

        { title: "Functions",
        items: [
          {title: "Basic Functions",           href: base_url + "functions/"},
          {title: "Generators",                href: base_url + "functions/generators/"},
          {title: "Type Controlled Functions", href: base_url + "functions/type-functions/"}
        ]},

        { title: "Objects",
        items: [
          {title: "Tuples",  href: base_url + "objects/tuples/"},
          {title: "Arrays",  href: base_url + "objects/arrays/"},
          {title: "RegExps", href: base_url + "objects/regexps/"},
          {title: "Strings", href: base_url + "objects/strings/"}
        ]},

        { title: "Classes",
        items: [
          {title: "Basic Classes",     href: base_url + "classes/tuples/"},
          {title: "Static Methods",    href: base_url + "classes/static/"},
          {title: "Prototype Methods", href: base_url + "classes/prototype/"}
        ]},

        { title: "JS Unit",
        items: [
          {title: "Basic Tests",      href: base_url + "js-unit/"},
          {title: "@Before & @After", href: base_url + "js-unit/before-and-after/"},
          {title: "Advance Tests",    href: base_url + "js-unit/advance/"}
        ]},

        { title: "Help",
        items: [
          {title: "Paramour inside a browser",  href: base_url + "help/in-browser/"},
          {title: "Paramour outside a browser", href: base_url + "help/out-browser/"},
          {title: "Change Log",                 href: base_url + "changelog.md"}
        ]}
    ]},
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
  var base_url  = "https://ephellon.github.io/Paramour/",
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
})(jQuery);

(function($) {
devsite.devsite.Init($, {'FULL_SITE_SEARCH_ENABLED': 1, 'ENABLE_BLOCKED_VIDEO_PLACEHOLDER': 0, 'VERSION_HASH': '0000000000', 'SITE_NAME': 'Paramour', 'HISTORY_ENABLED': 1, 'SUBPATH': '', 'ENABLE_BLOCKED_LINK_TOOLTIP': 0, 'ALLOWED_HOSTS': ['.github.io'], 'BLOCK_RSS_FEEDS': 0, 'SCRIPTSAFE_DOMAIN': '.github.io'},
'[]', 'en',
true, '',
{"00000000000000000000000000000000": false},
'/',
'https://ephellon.github.io/Paramour/');

// Main.js

  var timer, blink = false, last = {}, ltr = $("html").css(["writing-mode"]), isJS = false,
      swapicon = $("#swapButton span > div.docs-icon-redo, #swapButton span > div.docs-icon-undo"),
      runicons = $("#runButton div.docs-icon-run, #runButton div.docs-icon-debug"),
      icons = {
        swap: ["docs-icon-undo", "docs-icon-redo"],
        run: ["docs-icon-run", "docs-icon-debug"]
      },
      last_active, display, tinyurl, Paramour = Paramour || window.Paramour;

  if(Paramour == undefined)
    Paramour = function(string){return string};

  ltr = (ltr == "" || ltr == "vertical-lr");
  tinyurl = tinyurl || window.tinyurl;

  function swapIcons(element, pack, bool) {
    bool = bool || false;
    return element
      .toggleClass(icons[pack][0], bool)
      .toggleClass(icons[pack][1], !bool);
  }

  function encodeHTML(string) {
    return string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function decodeHTML(string) {
    return string.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
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
        direction = textarea.selectionDirection;

    if(direction == undefined || direction == null)
      direction = ((last.start > start || end < last.end) && ltr)? "left": "right";
    else
      direction = (direction != "forward" && ltr)? "left": "right";

    if((last.start = start) == (last.end = end))
      return encodeHTML(value.slice(0, start)) +
        '<span class="cursor ' + direction + ' nocode"></span>' +
        encodeHTML(value.slice(end, length));
    else
      return encodeHTML(value.slice(0, start)) +
        '<span class="cursor ' + direction + ' nocode">' +
        encodeHTML(value.slice(start, end)) +
        '</span>' +
        encodeHTML(value.slice(end, length));
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
    if(!isJS)
      $("#swapButton").click();

    var zip = new JSZip(), name = "Paramour - " + (+(new Date)).toString(36),
        textarea = getCurrent(), value = textarea.val(), output = Paramour(value);

    zip.file(name + ".par", value);
    zip.file(name + ".js", output);

    zip.generateAsync({type: "blob"})
    .then(function(blob) {         // 1) generate the zip file
      saveAs(blob, name + ".zip"); // 2) trigger the download
    }, function(err) {
      $("#blob").text(err);
    });
  });

  $("#runButton").click(function(event) {
    var self = $(event.target), textarea = getCurrent(), value = textarea.val();

    try {
      eval(value = Paramour(value));
      last.error = undefined;
      if(!isJS) $("#swapButton").click();
      self.attr("title", "Run");
      display.toggleClass("lang-paramour", false).toggleClass("lang-javascript", true);
    } catch(error) {
      value = textarea.val();
      last.error = error;
      if(isJS) $("#swapButton").click();
      self.attr("title", "Uncaught: " + error.message);
      display.toggleClass("lang-paramour", true).toggleClass("lang-javascript", false);
      alert(error);
    }

    swapIcons(runicons, "run", !isJS);
    textarea.val(value);

    $("#swapButton").click();
  });

  $("#linkButton").click(function(event) {
    if(!tinyurl)
      throw Error("The tinyurl API is not loaded.");

    if(isJS) $("#swapButton").click();

    var textarea = getCurrent(),
        url      = "https://ephellon.github.io/Paramour/extras/?code=" + Mio.enc(textarea.val()),
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
    window.open("https://ephellon.github.io/Paramour/help/", "blank_");
  });

  $("#swapButton").click(function(event) {
    var textarea = getCurrent(0), value = textarea.value;

    swapIcons(swapicon, "swap", isJS = !isJS);

    if(isJS)
      try {
        textarea.value = Paramour(last.hold = value);
      } catch(e) {
        swapIcons(swapicon, "swap", isJS = !isJS);
        return alert(e);
      }
    else
      textarea.value = last.hold = last.hold || value;

    event.target.setAttribute("title", "View " + ((!isJS)? "JavaScript": "Paramour"));

    updateHTML();
  });

  last_active = getCurrent(), display.html(last_active.val());

  setInterval(function() {
    $(".cursor").css({"border-color": (blink = !blink)? "#ffffff": "#212121"});
  }, 500);

})(jQuery);
devsite.localInit = function() {};
