function parse(text, ...values) {
  var date = new Date(),
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

  return (text.raw || [text])
    .map((value, index) => value
      .replace(/\#\{([^\{\}]+?)\}/g, ($0, $1, $_, $$) => {
        var children = [];

        for(var child in O)
          children.push(child);

        return eval($1.replace( RegExp(`\\b(${ children.join('|') })\\b`, 'g'), 'O["$1"]' ));
      }) + (values[index] || '')
    );
};

$(document).ready(event => {

  setInterval(function() {    
    $('#time h1')
      .text(parse `#{ z(23 - HOUR) }:#{ z(59 - MINS) }:#{ z(59 - SECS) }`);
  }, 500);

  $('#act .date')
    .attr('time', +new Date)
    .html(parse `#{ z(mont, 1) } / #{ z(dayo, 1) } / #{ year }<br/>#{ z(hour) } : #{ z(mins) }`);

  $('#exp .date')
    .attr('time', parse `#{ dusk }`)
    .html(parse `#{ z(MONT, 1) } / #{ z(DAYO, 1) } / #{ YEAR }<br/>03 : 00`);

  SynQ();
});

$('#vend').contextmenu(event => {
  event.preventDefault(true);

  $('#act .date')
    .attr('time', +new Date)
    .html(parse `#{ z(mont, 1) } / #{ z(dayo, 1) } / #{ year }<br/>#{ z(hour) } : #{ z(mins) }`);

  navigator.vibrate(1000);
});

$('#tid').text(parse `#{ (+date).toString(36) }`);

setInterval(() => {
  $('#app-container')
    .attr('class', (screen.width < screen.height? 'portrait': 'landscape'))
}, 1);
