(function($) {
devsite.devsite.Init($, {'FULL_SITE_SEARCH_ENABLED': 1, 'ENABLE_BLOCKED_VIDEO_PLACEHOLDER': 0, 'VERSION_HASH': '0000000000', 'SITE_NAME': 'Mi/o', 'HISTORY_ENABLED': 1, 'SUBPATH': '', 'ENABLE_BLOCKED_LINK_TOOLTIP': 0, 'ALLOWED_HOSTS': ['.github.io'], 'BLOCK_RSS_FEEDS': 0, 'SCRIPTSAFE_DOMAIN': '.github.io'},
'[]', 'en',
true, '',
{"00000000000000000000000000000000": false},
'/',
'https://ephellon.github.io/mio/');

  var timer, blink = false, last = {}, ltr = $("html").css(["writing-mode"]), is_plain_text = true,
      swapicon = $("#swapButton span > div.docs-icon-redo, #swapButton span > div.docs-icon-undo"),
      runicons = $("#runButton div.docs-icon-run, #runButton div.docs-icon-debug"),
      icons = {
        swap: ["docs-icon-redo", "docs-icon-undo"],
        run: ["docs-icon-run", "docs-icon-debug"]
      },
      last_active, display;

  ltr = (ltr == "" || ltr == "vertical-lr");

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
    last["in"] = ($(event.target).val() || "");
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
    if(!is_plain_text)
      $("#swapButton").click();

    var textarea = getCurrent(), value = textarea.val(),
        zip = new JSZip(),
        def = (+new Date).toString(36),
        name = "Mio." + def,
        output = Mio.Mi(value),
        hybrid = atob(output),
        length = [value.length, output.length, hybrid.length];

    length.push((100 * (length[1] / length[0])) - 100);

    function si(n) {
      for(var k = "\bKMGTPEZY".split(""), n = Math.abs(+n), m = 1024; n >= m && k.length > 1; n /= m)
        k.splice(0, 1);
      return (n + "").replace(/\.(\d{3}).*/, ".$1") + k[0].replace(/[\b]/, "") + "b"
    }

    zip.file("README.md",
"# Mi/o - " + (name) + ".zip\n" +
"_This document details the statistics of " + (name) + ".zip_.\n" +
"\n" +
"_For more information, see [Mi/o](https://Ephellon.github.io/mio/)._\n" +
"\n" +
"----\n" +
"\n" +
"### Space Used\n" +
"  - [Original  ](" + (name) + ".org.txt): " + (si(length[0])) + "\n" +
"  - [Hybrid    ](" + (name) + ".hyb.txt): " + (si(length[2])) + "\n" +
"  - [Compressed](" + (name) + ".cmp.txt): " + (si(length[1])) + "\n" +
"  - Space " + (length[1] <= length[0]? "saved": "lost") + ": " + (si(length[1] - length[0])) + " (" + (-length[3]) + "%)"
);
    zip.file(name + ".org.txt", value);
    zip.file(name + ".hyb.txt", hybrid);
    zip.file(name + ".cmp.txt", output);

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
      value = Mio.Mi(value);
      last.error = undefined;
      swapIcons(runicons, "run", is_plain_text = true);
      self.attr("title", "Run");
    } catch(error) {
      value = textarea.val();
      last.error = error;
      swapIcons(runicons, "run", is_plain_text = false);
      self.attr("title", "Uncaught: " + error.message);
      return alert(error);
    }

    textarea.val(value);

    is_plain_text = false;
    $("#swapButton").click();
  });

  $("#linkButton").click(function(event) {});

  $("#helpButton").click(function(event) {});

  $("#swapButton").click(function(event) {
    var textarea = getCurrent(0), value = textarea.value;

    if(is_plain_text)
      textarea.value = Mio.Mi(value);
    else
      textarea.value = Mio.Mo(value);

    swapIcons(swapicon, "swap", is_plain_text);

    event.target.setAttribute("title", "Switch to " + ((is_plain_text = !is_plain_text)? "compressed": "plain") + " text");

    updateHTML();
  });

  last_active = getCurrent(), display.html(last_active.val());

  setInterval(function() {
    $(".cursor").css({"border-color": (blink = !blink)? "#ffffff": "#212121"});
  }, 500);

})(jQuery);
    devsite.localInit = function() {};
