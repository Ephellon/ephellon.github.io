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
      input, output, last_active, display, tinyurl;

  ltr = (ltr == "" || ltr == "vertical-lr");
  tinyurl = tinyurl || window.tinyurl;

  function swapIcons(element, pack, bool) {
    bool = bool == undefined? true: bool;
    return element
      .toggleClass(icons[pack][0], bool)
      .toggleClass(icons[pack][1], bool = !bool),
      bool;
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
      return value.slice(0, start) +
        '<span class="cursor ' + direction + ' nocode"></span>' +
        value.slice(end, value.length);
    else
      return value.slice(0, start) +
        '<span class="cursor ' + direction + ' nocode">' +
        value.slice(start, end) +
        '</span>' +
        value.slice(end, value.length);
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
  .on("keydown", updateHTML)
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

    if(last["in"] != input || input == undefined)
        last["in"] = input = textarea.val();

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
    if(last.error != undefined)
      return alert("Cannot convert code: [" + last["error"] + "]; please press \"Debug.\"");

    var textarea = getCurrent();

    isJS = swapIcons(swapicon, "swap", isJS);

    event.target.setAttribute("title", "Switch to " + (!isJS? "JavaScript": "Paramour"));

    if(last["in"] != input || input == undefined)
        $("#runButton").click();
    else if(!isJS)
      textarea.val(input);
    else
      textarea.val(output);

    updateHTML();
  });

  last_active = getCurrent(), display.html(last_active.val());

  setInterval(function() {
    $(".cursor").css({"border-color": (blink = !blink)? "#ffffff": "#212121"});
  }, 500);

})(jQuery);
devsite.localInit = function() {};
