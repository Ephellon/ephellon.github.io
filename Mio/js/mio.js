var Mio = window.Mio = Mio || {power: 8},
    atob, btoa;

// Encode (Compress)
Mio.Mi =
Mio.enc =
Mio.com =
// String: String[, Boolean]
function Mi(input, bloated) {
  input = btoa(LZW_Wrap(LZW_Encode(input)));

  return (!bloated)? Mio.unbloat(input): input;
};

// Decode (Decompress)
Mio.Mo =
Mio.dec =
// String: String
function Mo(input) {
  return LZW_Decode(LZW_Unwrap(atob((!atob.regexp.test(input))? Mio.bloat(input): input)));
};

// Base64 string -> Unbloated string
Mio.unbloat =
// String: String
function unbloat(string) {
  var characters = atob.characters,
      list       = {},
      media      = [],
      output     = [],
      z6         = "000000",
      z8         = "00000000";

  if(atob.regexp.test(string))
    for(var index = 0, length = characters.length, character, code, next; index < length; index++)
      list[( character = characters[index] )] = list[character] || (z6 + index.toString(2)).slice(-6);
  else
    return string;

  for(index = 0, length = string.length; index < length; index++)
    media.push(list[string[index]]);
  media = media.join("").split(/([01]{8})/).join(",").replace(/^,|,$/g, "").split(/,,?/);

  for(index = 0, length = media.length; index < length; index++)
    if((code = media[index]).length == 8)
      output.push(String.fromCharCode(+( "0b" + code )));

  return output.join("");
};
atob = atob || Mio.unbloat;

// Base64 RegExp
atob.regexp = Mio.unbloat.regexp = /^[a-z\d\+\/]+[\=]{0,2}$/i;
atob.characters = Mio.unbloat.characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

// Unbloated string -> Base64 string
Mio.bloat =
// String: String
function bloat(string) {
  var characters = atob.characters,
      list       = {},
      media      = [],
      output     = [],
      z6         = "000000",
      z8         = "00000000";

  for(var index = 0, length = characters.length, character, code, next; index < length; index++)
    list[code = (z6 + index.toString(2)).slice(-6)] = list[code] || characters[index];

  for(index = 0, length = string.length; index < length; index++)
    media.push(( z8 + string.charCodeAt(index).toString(2) ).slice(-8));
  media = media.join("").split(/([01]{6})/).join(",").replace(/^,|,$/g, "").split(/,,?/);

  for(index = 0, length = media.length; index < length; index++)
    output.push(characters[+("0b" + (media[index] + z6).slice(0, 6))]);

  return output.join("");
};
btoa = btoa || Mio.bloat;

// Generate a hash signature
Mio.sign =
// String: String[, Number]
function sign(string, fidelity) {
  var array = (string + "").split(/([^]{16})/),
      gamma = 0;

  fidelity = 18 - Math.floor((fidelity || 0) * 16);

  array.forEach(function(value, index, self) {
    return (value == "")?
      self.splice(index, 1):
    gamma += value.charCodeAt(0);
  });

  for(var index = 0, length = array.length, last = length - 1, result = [], code = "charCodeAt"; index < length; index++)
    for(var self = array[index], next = (array[index + 1] || ""), mirror = array[last], a, b, c, d, e, f, g = gamma, i = 0, j = self.length, k = mirror.length, l = length, m = k - 1, q = fidelity; i < j; ++i, --m, g = gamma += a + b + c + d + e + f)
      a = self[code](i)         | 0,
      b = self[code](j - i - 1) | 0,
      c = mirror[code](m)       | 0,
      d = mirror[code](k - m)   | 0,
      e = next[code](i)         | 0,
      f = next[code](m)         | 0,
      result.push(Math.abs(
        (((a ^ ~b) << (i + k)) |  (j & e) | g) ^
        (((b | -c) ^  (m + j)) |  (j & f) | g) ^
        (((c & ~d) << (e - k)) >> (k ^ q) + g) ^
        (((d << a) ^  (f - j)) >> (k ^ q) + g) ^

        ((a & b | c ^ d) ^ e - f) << (q & e & f)
      ));

  result.splice(fidelity, result.length - fidelity);

  result.forEach(function(value, index, self) {
    return self.splice(index, 1, (value ^ gamma).toString((gamma % 20) + 16));
  });

  return result.join("").slice(0, 128);
};

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
    if(dictionary[phrase + (character = phrases[i])] != undefined)
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
    media.push("0".repeat(pow - (j = input.charCodeAt(i).toString(2)).length) + j);

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
