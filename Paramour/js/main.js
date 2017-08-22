(function($) {
devsite.devsite.Init($, {'FULL_SITE_SEARCH_ENABLED': 1, 'ENABLE_BLOCKED_VIDEO_PLACEHOLDER': 0, 'VERSION_HASH': '1d7f5dcee3', 'SITE_NAME': 'devsite', 'HISTORY_ENABLED': 1, 'SUBPATH': '', 'ENABLE_BLOCKED_LINK_TOOLTIP': 0, 'ALLOWED_HOSTS': ['.github.io'], 'BLOCK_RSS_FEEDS': 0, 'SCRIPTSAFE_DOMAIN': '.github.io'},
'[]', 'en',
true, '',
{"f62218c009ec029abef196bba5aa34cf": false, "039e5d84b87fd75807ffb37b7f1bbf2c": true, "098dafe57affddc137df300142652cfd": false, "cb025a64a50094835616312f4774a53d": true, "51470233c56fc1fde50f00b73c52b216": false, "752953480de00a336d911a46966cc16d": false, "700def1a83e356c06c0925afb05de4b0": false, "6749dcb526ce9bde6993550c7d928d24": true},
'/',
'https://ephellon.github.io/Paramour/');

  var timer, blink = false, last = {}, ltr = $("html").css(["writing-mode"]), isJS = false,
      swapicon = $("#swapButton span > div.docs-icon-redo, #swapButton span > div.docs-icon-undo"),
      runicons = $("#runButton div.docs-icon-run, #runButton div.docs-icon-debug"),
      icons = {
        swap: ["docs-icon-redo", "docs-icon-undo"],
        run: ["docs-icon-run", "docs-icon-debug"]
      },
      input, output, last_active, display, tinyurl, Paramour = Paramour || window.Paramour;

  if(Paramour == undefined)
    Paramour = function(string){return string};

  ltr = (ltr == "" || ltr == "vertical-lr");
  tinyurl = tinyurl || window.tinyurl;

  function swapIcons(element, pack, bool) {
    bool = bool == undefined? true: bool;
    return element
      .toggleClass(icons[pack][0], bool)
      .toggleClass(icons[pack][1], bool = !bool),
      bool;
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
        direction = textarea.selectionDirection;

    if(direction == undefined || direction == null)
      direction = ((last.start > start || end < last.end) && ltr)? "left": "right";
    else
      direction = (direction != "forward" && ltr)? "left": "right";

    if((last.start = start) == (last.end = end))
      return encodeHTML(value.slice(0, start)) +
        '<span class="cursor ' + direction + ' nocode"></span>' +
        encodeHTML(value.slice(end, value.length));
    else
      return encodeHTML(value.slice(0, start)) +
        '<span class="cursor ' + direction + ' nocode">' +
        encodeHTML(value.slice(start, end)) +
        '</span>' +
        encodeHTML(value.slice(end, value.length));
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
    last["in"] = input = ($(event.target).val() || "");
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
    
  });

  $("#runButton").click(function(event) {
    var self = $(event.target), textarea = getCurrent();

    try {
      eval(last["out"] = output = Paramour(input));
      last.error = undefined;
      swapIcons(runicons, "run", isJS = true);
      self.attr("title", "Run");
      display.toggleClass("lang-paramour", false).toggleClass("lang-javascript", true);
    } catch(error) {
      last.error = error;
      swapIcons(runicons, "run", isJS = false);
      self.attr("title", "Uncaught: " + error.message);
      display.toggleClass("lang-paramour", true).toggleClass("lang-javascript", false);
      return alert(error);
    }

    isJS = false;
    $("#swapButton").click();
  });

  $("#linkButton").click(function(event) {
    if(!tinyurl)
      throw Error("The tinyurl API is not loaded.");
    isJS = true;
    $("#swapButton").click();
    var textarea = getCurrent(),
        url      = "https://ephellon.github.io/Paramour/extras/?code=" + encodeURIComponent(textarea.val()),
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
    var textarea = getCurrent();

    isJS = swapIcons(swapicon, "swap", isJS);

    event.target.setAttribute("title", "Switch to " + (!isJS? "JavaScript": "Paramour"));

    last["out"] = output = Paramour(input);

    if(!isJS)
      textarea.val(input);
    else
      textarea.val(output);

    updateHTML();
  });

  last_active = getCurrent(), display.html(last_active.val());
  input = last_active.val() || "";

  setInterval(function() {
    $(".cursor").css({"border-color": (blink = !blink)? "#ffffff": "#212121"});
  }, 500);

// The Navigation Menu
// Mustache + jQuery

function loadMenu() {
  var base_url = "https://ephellon.github.io/Paramour/",
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
  $.get("https://ephellon.github.io/Paramour/mst/menu.mst", function(file_contents) {
    template = file_contents || $("#template").html();
    rendered = Mustache.render(template, menu_data);
    $("#target, #template").html(rendered); // #template for testing purposes
  });
};

  loadMenu();

})(jQuery);
      devsite.localInit = function() {};
