// the barcode holder
var barcode = window.barcode = $("#barcode"),
    barcode_ = window.barcode_ = $("#barcode-copy"),
    flip = $(".flip-container");

// local variables
var H = $("#H b"),
    M = $("#M b"),
    S = $("#S b"),
    date = {
      activation: $(".front-face .date"),
      expiration: $(".back-face .date")
    },
    id = $(".front-face #ticket-id"),
    no = $(".back-face .phone-no");

id.html(code);

date.activation.html(format(dawn));
date.expiration.html(format(dusk));

$(".front-face > .return").click(function() {
  flip.toggleClass("active", true);
});

$(".back-face > .return").click(function() {
  flip.toggleClass("active", false);

  barcode.src = barcode_.src = barcode_api_url + random(100000000000000000000, 999999999999999999999);

  barcode.click(function() {
    barcode_.css({
      display: "initial"
    });
  });
  barcode_.click(function() {
    barcode_.css({
      display: "none"
    });
  });

  barcode.on("error", function() {
    barcode.src = barcode_.src = "img/bu." + ((barcode.index |= 0) < 5? barcode.index: 0) + ".png";
  });
});

setInterval(function() {
  var now = new Date,
      h = 23 + (dusk.getHours() - now.getHours()),
      m = 59 + (dusk.getMinutes() - now.getMinutes()),
      s = 59 + (dusk.getSeconds() - now.getSeconds()),
      z = "00";

  H.html(h > 0? h: 0);
  M.html(m > 0? (z + m).slice(-2): z);
  S.html(s > 0? (z + s).slice(-2): z);
});