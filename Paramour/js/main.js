(function($) {
    devsite.devsite.Init($, {'FULL_SITE_SEARCH_ENABLED': 1, 'ENABLE_BLOCKED_VIDEO_PLACEHOLDER': 0, 'VERSION_HASH': '1d7f5dcee3', 'SITE_NAME': 'devsite', 'HISTORY_ENABLED': 1, 'SUBPATH': '', 'ENABLE_BLOCKED_LINK_TOOLTIP': 0, 'ALLOWED_HOSTS': ['.github.io'], 'BLOCK_RSS_FEEDS': 0, 'SCRIPTSAFE_DOMAIN': '.github.io'},
    '[]', 'en',
    true, '',
    {"f62218c009ec029abef196bba5aa34cf": false, "039e5d84b87fd75807ffb37b7f1bbf2c": true, "098dafe57affddc137df300142652cfd": false, "cb025a64a50094835616312f4774a53d": true, "51470233c56fc1fde50f00b73c52b216": false, "752953480de00a336d911a46966cc16d": false, "700def1a83e356c06c0925afb05de4b0": false, "6749dcb526ce9bde6993550c7d928d24": true},
    '/',
    'https://ephellon.github.io/Paramour/');

    var timer, blink = false, last = {}, ltr = $("html").css(["writing-mode"]);
      ltr = (ltr == "" || ltr == "vertical-lr");

      function updateCursor(textarea) {
        var start = textarea.selectionStart,
            end = textarea.selectionEnd,
            value = textarea.value,
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

      $(".pretty-input > textarea")
      .on("keydown", function(event) {
        var textarea = event.target, display = $(textarea).siblings();

        clearTimeout(timer);
        timer = setTimeout(function() {
          display.html(function() {
            return updateCursor(textarea);
          });

          prettyPrint();
        }, 100);
      })
      .on("mousemove", function(event) {
        $(event.target).keydown();
      })
      .on("mousedown", function(event) {
        $(event.target).mousemove();
      });

      setInterval(function() {
        $(".cursor")
        .css({"border-color": (blink = !blink)? "#ffffff": "#212121"});
      }, 500);

      var siblings =
          $(".pretty-input > textarea")
          .siblings();
      siblings
      .html(function(index, value) {
        return updateCursor($(siblings).siblings()[index]) + "<br>";
      });

    })(jQuery);
    devsite.localInit = function() {};
