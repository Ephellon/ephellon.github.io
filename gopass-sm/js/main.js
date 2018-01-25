var window, document, console;

// Global types
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

// Polyfills
Object.values = Object.values || function values(object) {
  var values = [];

  for(var key in object)
    if(object.hasOwnProperty(key) && object.propertyIsEnumerable(key))
      values.push(object[key]);

  return values;
};

// defined variable
window.defined =
// Boolean: Object*
function defined(variable) {
  return ((variable != undefined) && (variable != null));
};

// toogle the full screen status of the document
window.toggleFullScreen =
// Void: [Boolean]
function toggleFullScreen(state) {
  var doc = document, docEl = doc.documentElement,
      request = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen,
      cancel  = doc.exitFullscreen      || doc.mozCancelFullScreen    || doc.webkitExitFullscreen      || doc.msExitFullscreen,
      isFull  = doc.fullscreenElement   || doc.mozFullScreenElement   || doc.webkitFullscreenElement   || doc.msFullscreenElement;

  state = defined(state)?
    state:
  isFull;

  if(defined(request) && (!isFull | state))
    request.call(docEl);
  else if(defined(cancel) && (isFull | !state))
    cancel.call(doc);
  else if(!defined(request) | !defined(cancel))
    Toss(new Error("Full Screen API is not supported."), !1),
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

  function f(n){return("00"+n).slice(-2)};

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
  left  = defined(left)?   left: 0;
  right = defined(right)? right: 1;

  var number = left + (Math.random() * right);

  return (integer)?
    (number | 0):
  number;
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
    u = "https://bwipjs-api.metafloor.com/?bcid=azteccode&text=";

window.initial = {
  "get": g,
  "format": f,
  "barcode_api_url": u
};

// Global variables
var now  = window.now  = (new Date),

    // Dawn of the current day should be ~6 AM
    dawn = window.dawn = new Date(now[g.FY], now[g.M], now[g.D], 6, 0, random(0, 59, !0), random(0, 59, !0)),

    // Dusk of the next day should be 3 AM
    dusk = window.dusk = new Date(now[g.FY], now[g.M], now[g.D] + 1, 3, 0, 0, 0),

    // the code for the Aztec barcode should be 77 digits long
    code = window.code = random().toString().replace(/[0\.]/g, "").repeat(77).slice(-77);

// Parse Mustache templates
window.parseMST =
// Void: String, Object<Element>[, String]
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

// Void: [String[, String[, Number[, String]]]]
// handle the price information from [prices.js]
function getPrice(agency, locale, disability, ticket) {
  var list = [];

  if(defined(agency))
    if(defined(locale))
      if(defined(disability))
        if(defined(ticket))
          return prices[agency][locale][disability][ticket];
        else
          return Object.values(prices[agency][locale][disability]);
      else
        return Object.values(prices[agency][locale][!1]);
    else
      for(locale in prices[agency])
        list.push( getPrice(prices[agency][locale]) );

  return list;
};

// Add the [onswipe] events to the document
// swipehorizontal, swipevertical
(function(d) {
  var ce = function(e, n) {
    var a = d.createEvent("CustomEvent");
    a.initCustomEvent(n, !0, !0, e.target);
    e.target.dispatchEvent(a);
    a = null;
    return !1;
  },
      nm = !0,
      sp = {x :0, y: 0},
      ep = {x: 0, y: 0},
      touch = {
        touchstart: function(e) {sp = {x: e.touches[0].pageX, y: e.touches[0].pageY}},
        touchmove: function(e) {nm = !1; ep = {x: e.touches[0].pageX, y: e.touches[0].pageY}},
        touchend: function(e) {if(nm) ce(e, "touch"); else var x = ep.x - sp.x, xr = Math.abs(x), y = ep.y - sp.y, yr = Math.abs(y), nm = (ce(e, "swipe" + (Math.max(xr, yr) > 50? xr > yr? "horizontal": "vertical": "")), !0);},
        touchcancel: function(e) {nm = !1}
      };

  for(var a in touch) d.addEventListener(a, touch[a], !1);
})(document);