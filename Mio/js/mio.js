var Mio   = window.Mio   = Mio   || {power: 8},
    UTF8 = window.UTF8 = UTF8 || {
      bksl: function Backslash(character) {
        // table of character substitutions
        var meta = {
            '\b': 'b',
            '\f': 'f',
            '\n': 'n',
            '\r': 'r',
            '\t': 't',
            '\v': 'v',
            '\\': ''
        };

        return meta[character]?
          "\\" + meta[character]:
        character;
      },

      esc: function Escape(string) {
        string = string.replace(/~/g, "~\u0000");

        for(var illegal = /([^\u0000-\u007E])/, counter = 0, length = string.length; illegal.test(string) & counter < length; counter++)
          string = string.replace(illegal, function($0, $1, $$, $_) {
            var code      = $1.charCodeAt(0),
                signature = String.fromCharCode(Math.floor(code / 127)),
                character = String.fromCharCode(code % 127);

            // console.log($1, [code, signature, character]);

            return "~" + UTF8.bksl(signature) + UTF8.bksl(character);
          });

        return string;
      },

      unesc: function Unescape(string) {
        for(var escaped = /~([\u0001-\uFFFF]{2})/; escaped.test(string);)
          string = string.replace(escaped, function($0, $1, $$, $_) {
            var signature = $1.charCodeAt(0),
                character = $1.charCodeAt(1),
                code      = (signature * 127) + character;

            // console.log($1, [code, signature, character]);

            return String.fromCharCode(code);
          });

        return string.replace(/~\u0000/g, "~");
      }
    },
    atob, btoa;

// Base64 RegExp
(atob || {}).regexp = /^[a-z\d\+\/]+[\=]{0,2}$/i;
(atob || {}).characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/=";

// Encode (Compress)
Mio.Mi =
Mio.enc =
// String: String[, Boolean[, Boolean]]
function Mi(input, hybrid, unbloat) {
  input = LZW_Wrap(LZW_Encode(input));

  return (
  (btoa && !hybrid)?
    (!unbloat)?
      Mio.unbloat(btoa(input)):
    btoa(input):
  input
  );
};

// Decode (Decompress)
Mio.Mo =
Mio.dec =
// String: String
function Mo(input) {
  var media = Mio.bloat(input),
      test  = [atob.regexp.test(media), atob.regexp.test(input)];

  return (
    (atob && test[0])?
      LZW_Decode(LZW_Unwrap(atob(media))):
    (atob && test[1])?
      LZW_Decode(LZW_Unwrap(atob(input))):
    LZW_Decode(LZW_Unwrap(input))
  );
};

// Base64 string -> Unbloated string
Mio.unbloat =
// String: String
function unbloat(string) {
  var characters = atob.characters,
      list       = {},
      media      = [],
      output     = [];

  if(atob.regexp.test(string))
    for(var index = 0, length = characters.length, character, code, next; index < length; index++)
      list[( character = characters[index] )] = list[character] || (
        (character == characters[64])?
          "00":
        ("000000" + index.toString(2)).slice(-6)
      );
  else
    return string;

  for(index = 0, length = string.length; index < length; index++)
    media.push(list[string[index]]);
  media = media.join("").split(/([01]{8})/).join(",").replace(/^,|,$/g, "").split(/,,?/);

  for(index = 0, length = media.length; index < length; index++)
    if(( code = media[index], next = media[index + 1] ) != "00" || next == void 0)
      output.push(String.fromCharCode(+( "0b" + code )));

  return output.join("");
}

// Unbloated string -> Base64 string
Mio.bloat =
// String: String
function bloat(string) {
  var characters = atob.characters,
      list       = {},
      media      = [],
      output     = [];

  for(var index = 0, length = characters.length, character, code, next; index < length; index++)
    list[code = (index < 64? ("000000" + index.toString(2)).slice(-6): "00")] = list[code] || characters[index];
  list["0000"] = list["00"] + list["00"];

  for(index = 0, length = string.length; index < length; index++)
    media.push(( "00000000" + string.charCodeAt(index).toString(2) ).slice(-8));
  media = media.join("").split(/([01]{6})/).join(",").replace(/^,|,$/g, "").split(/,,?/);

  for(index = 0, length = media.length; index < length; index++)
    if(( code = media[index] ).length == 6)
      output.push(characters[+("0b" + code)]);
    else
      output.push(list[code]);

  return output.join("");
}

// LZW from [JSFiddle](https://jsfiddle.net/ryanoc/fpMM6/)
// LZW-compress a string
function LZW_Encode(string) {
  var dictionary = {},
      phrases = (string + ""),
      output = [],
      media = [],
      character,
      phrase = phrases[0],
      index = 256;

  for(var i = 1; i < phrases.length; i++)
    if(dictionary[phrase + (character = phrases[i])] != void 0)
      phrase += character;
    else
      media.push(phrase.length > 1 ? dictionary[phrase] : phrase.charCodeAt(0)),
      dictionary[phrase + character] = index,
      index++,
      phrase = character;

    media.push(phrase.length > 1?
      dictionary[phrase]:
    phrase.charCodeAt(0));

  for(i = 0; i < media.length; i++)
    output.push(String.fromCharCode(media[i]));

  return output.join("");
};

// Decompress an LZW-encoded string
function LZW_Decode(string) {
  var dictionary = {},
      phrases = (string + ""),
      character = phrases[0],
      oldPhrase = character,
      output = [character],
      index = 256,
      phrase;

    for(var i = 1, currCode; i < phrases.length; i++) {
      currCode = phrases.charCodeAt(i);

      if(currCode < 256)
        phrase = phrases[i];
      else
        phrase = dictionary[currCode]?
          dictionary[currCode]:
        oldPhrase + character;

      output.push(phrase);
      character = phrase.charAt(0);
      dictionary[index] = oldPhrase + character;
      index++;
      oldPhrase = phrase;
    }

    return output.join("");
};
  
/** LZW Wrappers
 * These allow base64 compression to be applied
 * They also adapt to the returned LZW string
 */

function LZW_Wrap(input) {
  var output = [], media = [], pow = Mio.power, uni = Math.pow(2, pow).toString(16), R = RegExp;
  function f(n) {
    return n = (n.length <= 4? "0".repeat(4 - n.length): "") + n;
  };
  uni = f(uni);

  if(R("([^\\u0000-\\u" + uni + "]+)").test(input))
    Mio.power = pow = (uni = R.$_.split("").sort()[R.$_.length - 1]).charCodeAt(0).toString(2).length;

  // console.warn("[Mi/o]: Set Mio.power to " + pow + " for '" + uni + "', '\\u" + f(uni.charCodeAt(0).toString(16)) + "'");

  for(var i = 0, j; i < input.length; i++)
    media.push(
      "0".repeat(pow - (j = input.charCodeAt(i).toString(2)).length) +
      j
    );

  media = media.join("").split(/([01]{8})/);

  for(i = 0; i < media.length; i++)
    if((j = media[i]) != "" && j.length == 8)
      output.push(String.fromCharCode(+("0b" + j)));
    else if(j != "")
      output.push(String.fromCharCode(+("0b" + j + "0".repeat(8 - j.length))));

  return String.fromCharCode(pow) + output.join("");
};

function LZW_Unwrap(input) {
  var output = [], media = [], pow = Mio.power = input.charCodeAt(0);

  for(var i = 1, j; i < input.length; i++)
    media.push("0".repeat(8 - (j = input.charCodeAt(i).toString(2)).length) + j);

  media = media.join("").split(RegExp("([01]{" + pow + "})"));

  for(i = 0; i < media.length; i++)
    if((j = media[i]) != "" && j.length == pow)
      output.push(String.fromCharCode(+("0b" + j)));

  return output.join("");
};
