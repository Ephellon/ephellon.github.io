var window, document, console;

// GLobal types
window.icon = "i";
window.logo = "l";
window.bttn = "b";

// Error reporting
window.Throw =
function Throw(error, breaks) {
  console.error(error);

  if(breaks)
    throw error;
};

window.Toss =
function Toss(error) {
  console.warn(error);
};

window.Hand =
function Hand(error) {
  console.log(error);
};

// defined variable
window.defined =
// Boolean: Object*
function defined(variable) {
  return variable != undefined && variable != null;
};

// toogle the full screen status of the document
window.toggleFullScreen =
// Void: [Boolean]
function toggleFullScreen(state) {
  var doc = document, docEl = doc.documentElement,
      request = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen,
      cancel  = doc.exitFullscreen      || doc.mozCancelFullScreen    || doc.webkitExitFullscreen      || doc.msExitFullscreen,
      isFull  = doc.fullscreenElement   || doc.mozFullScreenElement   || doc.webkitFullscreenElement   || doc.msFullscreenElement;

  state = defined(state)? state: isFull;

  if(defined(request) && (!isFull | state))
    request.call(docEl);
  else if(defined(cancel) && (isFull | !state))
    cancel.call(doc);
  else if(!defined(request) | !defined(cancel))
    console.warn(new Error("Full Screen API not supported.")),
    scrollTo(0, 1);
};

// format a date using a "format" string
window.format =
// String: Date[, String]
function format(date, string) {
  var year  = date.getFullYear() + "",
      month = date.getMonth(),
      day   = date.getDate(),
      hour  = date.getHours(),
      mins  = date.getMinutes() + "",
      secs  = date.getSeconds() + "";

  string = string || "MM/DD/YYYY<br>hh:mm";

  function f(n){return("00"+n).slice(-2)}

  return string
    .replace(/Y{3,4}/g, year)
    .replace(/Y{1,2}/g, year.slice(2, 2))
    .replace(/M{1,2}/g, month + 1)
    .replace(/D{1,2}/g, day)
    .replace(/H{1,2}/g, f(hour % 12))
    .replace(/h{1,2}/g, hour)
    .replace(/m{1,2}/g, f(mins))
    .replace(/s{1,2}/g, f(secs));
};

// return a random number
window.random =
// Number: [Number[, Number[, Boolean]]]
function random(left, right, integer) {
  left = defined(left)? left: 0;
  right = defined(right)? right: 1;

  var number = left + (Math.random() * right);

  return (integer)? Math.round(number): number;
};

var g = {
  FY: "getFullYear",
  M:  "getMonth",
  D:  "getDate",
  JSON: function(d) {
    var n = d[0], d = d.slice(1, d.length), s = [];

    d.forEach(function(v, i, a) {
      s.push('"' + i + '": {"' + n + '": ' + JSON.stringify(v) + '}');
    });

    return JSON.parse('{"' + n + '": {' + s + '}}')
  }
},
    f = "MM/DD/YYYY<br>hh:mm",
    u = "https://api-bwipjs.rhcloud.com/?bcid=azteccode&text=";

window.initial = {
  "get": g,
  "format": f,
  "barcode_api_url": u
};

var now  = window.now  = (new Date),
    // Dawn of the current day should be ~6 AM
    dawn = window.dawn = new Date(now[g.FY], now[g.M], now[g.D], 6, 0, random(0, 59, true), random(0, 59, true)),
    // Dusk of the next day should be 3 AM
    dusk = window.dusk = new Date(now[g.FY], now[g.M], now[g.D] + 1, 3, 0, 0, 0),
    // the code for the Aztec barcode should be 77 digits long
    code = window.code = random().toString().replace(/[0\.]/g, "").repeat(77).slice(-77);

window.parseMST =
// Void: String, Object<Element>
function parseMST(target, data, file) {
  var t = $(target), d = data, f = file, M = Mustache;

  if(d instanceof Array)
    d = g.JSON(d);

  if(!defined(f))
    t.html(M.render(t.html(), d));
  else
    $.get(f, function(contents) {
      t.html(M.render(contents, d));
    });
};