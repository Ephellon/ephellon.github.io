function parse(text, ...values) {
  var date = new Date(parse.date),
      year = date.getFullYear(), // year
      dayo = date.getDate(),     // day of month
      mont = date.getMonth(),    // month
      hour = date.getHours(),    // hour
      mins = date.getMinutes(),  // minutes

      tomo = new Date(+date + 86400000),
      Year = tomo.getFullYear(), // year
      Dayo = tomo.getDate(),     // day of month
      Mont = tomo.getMonth(),    // month
      Hour = tomo.getHours(),    // hour
      Mins = tomo.getMinutes(),  // minutes

      dawn = new Date(year, mont, dayo, 6),
      dusk = new Date(Year, Mont, Dayo, 3),

      YEAR = dusk.getFullYear(), // year
      DAYO = dusk.getDate(),     // day of month
      MONT = dusk.getMonth(),    // month

      HOUR = date.getHours()   - dusk.getHours(),   // hours
      MINS = date.getMinutes() - dusk.getMinutes(), // minutes
      SECS = date.getSeconds() - dusk.getSeconds(); // seconds

  var O = {
    z: (n, p) => `00${ n + (p | 0) }`.slice(-2)
  };

  return parse.date = +new Date, (text.raw || [text])
    .map((value, index) => value
      .replace(/\#\{([^\{\}]+?)\}/g, ($0, $1, $_, $$) => {
        var children = [];

        for(var child in O)
          children.push(child);

        return eval($1.replace( RegExp(`\\b(${ children.join('|') })\\b`, 'g'), 'O["$1"]' ));
      }) + ( /^(\d+|false|null)$/.test(values[index] + '')? values[index]: '' ));
};

$(document).ready(event => {

  let act = parse.date = +SynQ.get('act') || +new Date;

  setInterval(function() {
    $('#time h1')
      .text(parse `#{ z(23 - HOUR) }:#{ z(59 - MINS) }:#{ z(59 - SECS) }`);
  }, 500);

  $('#act .date')
    .attr('time', act = act || +new Date)
    .html(parse `#{ z(mont, 1) } / #{ z(--dayo, 1) } / #{ year }<br/>#{ z(hour) } : #{ z(mins) }`);

  $('#exp .date')
    .attr('time', parse `#{ dusk }`)
    .html(parse `#{ z(MONT, 1) } / #{ z(--DAYO, 1) } / #{ YEAR }<br/>03 : 00`);

  SynQ.set('act', act);
  SynQ();
});

$('#vend').contextmenu(event => {
  event.preventDefault(true);

  let act = parse.date = +new Date;

  $('#act .date')
    .attr('time', act)
    .html(parse `#{ z(mont, 1) } / #{ z(dayo, 1) } / #{ year }<br/>#{ z(hour) } : #{ z(mins) }`);

  SynQ.set('act', act);

  navigator.vibrate(1000);
});

$('#tid').text(parse `#{ (+date || +new Date).toString(36) }`);

$('#auth').on('touchstart', event => {
  event.preventDefault(true);

  let auth = event.target;

  auth = (auth.id == 'auth')? auth: auth.parentElement;
  $(auth).attr('class', 'focus');
});

$('#auth').on('touchend', event => {
  event.preventDefault(true);

  let auth = event.target;

  auth = (auth.id == 'auth')? auth: auth.parentElement;
  $(auth).attr('class', '');
});

setInterval(() => {
  $('#app-container')
    .attr('class', (screen.width < screen.height? 'portrait': 'landscape'))
}, 1);
