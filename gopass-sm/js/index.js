function $(query) {
  return document.querySelector(query);
}

function format(date, string) {
  return string
  .replace(/Y{4}/g, date.getFullYear())
  .replace(/Y{2}/g, (date.getFullYear() + "").slice(2, 2))
  .replace(/M{2}/g, date.getMonth() + 1)
  .replace(/D{2}/g, date.getDate())
  .replace(/h{2}/g, date.getHours())
  .replace(/h/g, date.getHours() % 12)
  .replace(/m{2}/g, (date.getMinutes() + "").replace(/^(\d)$/, "0$1"))
  .replace(/s{2}/g, (date.getSeconds() + "").replace(/^(\d)$/, "0$1"));
}

var now = (new Date),
    dawn = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0, 0),
    dusk = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 3, 0, 0, 0),
    H = $("#H b"),
    M = $("#M b"),
    S = $("#S b"),
    A = $(".A .date"),
    B = $(".B .date"),
    C = $(".A .ticket-id"),
    D = $(".B .phone"),
    code = Math.random().toString().replace(/0\./g, "").repeat(77).slice(0, 77),
    time;

A.innerHTML = format(dawn, "MM/DD/YYYY<br>hh:mm");
B.innerHTML = format(dusk, "MM/DD/YYYY<br>hh:mm");

$("#ticket-id").innerHTML = (+code).toString(16).slice(0, 8).toUpperCase();

setInterval(function() {
  now = (new Date);
  var h = 23 + (dusk.getHours() - now.getHours()),
      m = 59 + (dusk.getMinutes() - now.getMinutes()),
      s = 59 + (dusk.getSeconds() - now.getSeconds());
  H.innerHTML = (h > 0)? h: "0";
  M.innerHTML = (m > 0)? (m + "").replace(/^(\d)$/, "0$1"): "00";
  S.innerHTML = (s > 0)? (s + "").replace(/^(\d)$/, "0$1"): "00";
}, 1000);

$(".front").addEventListener("swipehorizontal",
$(".front > .return").onclick = function() {
  $(".flip-container").classList = "flip-container hover";
});

$(".back").addEventListener("swipehorizontal",
$(".back > .return").onclick = function() {
  $(".flip-container").classList = "flip-container";
  $("#aztec").src = $("#aztec-copy").src = "http://bwipjs-api.metafloor.com/?bcid=azteccode&text=" + Math.random().toString().replace(/0\./g, "").repeat(77).slice(0, 77);
});

$("#aztec").onclick = function() {
  $("#aztec-copy").style.display = "initial";
}

$("#aztec-copy").onclick = function() {
  $("#aztec-copy").style.display = "none";
}

$("body").onclick = function() {
  $("#header").setAttribute("class", "");
  $("#footer").setAttribute("class", "");

  clearTimeout(time);

  time =
  setTimeout(function() {
    $("#header").setAttribute("class", "hidden");
    $("#footer").setAttribute("class", "hidden");
  }, 20000);
};

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