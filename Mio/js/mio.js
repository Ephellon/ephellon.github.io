var printable = "\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
    library   = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    atob, btoa,
    folded = /^[a-z\d\+\/]+\={0,2}$/i,
    UTF8   = /^[\u0000-\u00ff]+$/i,
    encodeUTF8, decodeUTF8;

atob = atob || unfold;
btoa = btoa || fold;

encodeUTF8 = string =>
  unescape(encodeURIComponent(string));

decodeUTF8 = string =>
  decodeURIComponent(escape(string));

/** Benchmark
 * S0 = primeNumbers([2, 99991]).join(',')
 * S1 = Mio.enc(S0, true)
 * S2 = Mio.enc(S1, true, true)
 *
 * S0.length = 56,125
 * S1.length = 17,068
 * S2.length = 45,565
 *
 * S1 / S0 = 30.41% (saved 69.58%)
 * S2 / S0 = 81.18% (saved 18.81%)
 */

var Mio = Mio || {
  /** Encodes a string using three different methods
   * 1) (String) => Base64 [A-Z, a-z, 0-9, +/=]
   *    Returns a Base64 string
   * 2) (String, Boolean) => LZW [\u0010 - \uffff]
   *    Returns a compressed LZW string
   * 3) (String, Boolean, Boolean) => UTF8 [\u0000 - \u00ff]
   *    Returns a UTF-8 friendly, compressed LZW string (i.e. no character is over \u00ff)
   */
  enc: (
  (string, shrink, UTF8) =>
    (string = fold(encodeUTF8(string)), shrink)?
      (string = compress(string), UTF8)?
        encodeUTF8(string):
      string:
    string
  ), // :enc

  dec: (
  (string) =>
    decodeUTF8(unfold(
      (folded.test(string))?
        string:
      (UTF8.test(string))?
        decompress(decodeUTF8(string)):
      decompress(string)
    ))
  ), // :dec

  sign: (string, fidelity, method) =>
    sign(string, fidelity, method) // :sign
};

/** Base-64 encoding/decoding
  * Function fold: String => String
  * Function unfold: String => String
  */

// String -> Base-64 String
// String: String
var fold = (string) => {
  var list = {}, media = [], output = [], z6 = "000000", z8 = z6 + "00", pd = library[library.length - 1];

  for(var index = 0, length = library.length, code; index < length; index++)
    list[
      code = (z6 + index.toString(2)).slice(-6)
    ] = list[code] || library[index];

  for(index = 0, length = string.length; index < length; index++)
    media.push(
      (z8 + string.charCodeAt(index).toString(2)).slice(-8)
    );
  media = media.join("").split(/([01]{6})/).join(";").replace(/^;|;$/g, "").split(/;+/);

  for(index = 0, length = media.length; index < length; index++)
    output.push(
      library[+("0b" + (media[index] + z6).slice(0, 6))]
    );

  // output.push(pd.repeat( 3 - ((output.length - 1) % 4) ));

  return output.join("");
},

// Base-64 String -> String
// String: String
unfold = (string) => {
  var list = {}, media = [], output = [], code, z6 = "000000", z8 = z6 + "00";

  if(folded.test(string))
    for(var index = 0, length = library.length, character; index < length; index++)
      list[
        (character = library[index])
      ] = list[character] || (z6 + index.toString(2)).slice(-6);
  else
    return string;

  for(index = 0, length = string.length; index < length; index++)
    media.push(list[string[index]]);
  media = media.join("").split(/([01]{8})/).join(";").replace(/^;|;$/g, "").split(/;+/);

  for(index = 0, length = media.length; index < length; index++)
    if((code = media[index]).length == 8)
      output.push(String.fromCharCode(+("0b" + code)));

  return output.join("");
},

/** LZW (de)compression
  * Function compress: String => String
  * Function decompress: String => String
  */

// Base-64 String -> COM-64 String
// String: String
compress = (string) => {
  var dictionary = {},
      paragraph  = string + "",  // phrases
      word       = paragraph[0], // phrase
      media      = [],
      output     = [],
      index      = 255,
      character;

  let item = (w = word, p = printable, d = dictionary) =>
    (w.length > 1)?
      d['_' + w]:
    w.charCodeAt(0);

  for(var i = 1, l = paragraph.length, c, d; i < l; i++)
    if(dictionary['_' + word + (character = paragraph[i])] != undefined)
      word += character;
    else
      media.push(item(word)),
      dictionary['_' + word + character] = index++,
      word = character;

  media.push(item(word));

  for(i = 0, l = media.length, d = printable.charCodeAt(printable.length - 1); i < l; i++)
    output.push(String.fromCharCode(media[i]));

  return output.join("");
},

// COM-64 String -> Base-64 String
// String: String
decompress = (string) => {
  var dictionary = {},
      paragraph  = string + "", // phrases,
      character  = paragraph[0],
      word       = {
              now: "",          // phrase
             last: character    // old-phrase
      },
      output     = [character],
      index      = 255;

  for(var i = 1, l = paragraph.length, code, pass; i < l; i++) {
    code = paragraph.charCodeAt(i);

    if(code < 255)
      word.now = paragraph[i];
    else if((word.now = dictionary['_' + code]) == undefined)
      word.now = word.last + character;

    output.push(word.now);
    character = word.now[0];
    dictionary['_' + index++] = word.last + character;
    word.last = word.now;
  }

  return output.join("");
},

/** Hashing/signature function
  * Function sign: String[, Number @Float] => String
  */

// String -> Salted Hash Signature
// String: String[, Number @Float{0...1}[, Boolean]]
sign = (string, fidelity, method) => {
  var array = (string = string + "").split(/([^]{16})/),
      gamma = 0;

  fidelity = 18 - Math.floor((fidelity || 0) * 16);
  method |= false;

  if(!method)
    method = function(s) {
      return (s != undefined)? s.charCodeAt(0): s;
    };
  else
    method = function(s) {
      return (s != undefined)? printable.indexOf(s): s;
    };

  array.forEach(function(value, index, self) {
    return (value == "")?
      self.splice(index, 1):
    gamma += value.charCodeAt(0);
  });

  for(var index = 0, length = array.length, last = length - 1, result = []; index < length; index++)
    for(var self = array[index], next = (array[index + 1] || ""), mirror = array[last], a, b, c, d, e, f, g = gamma, i = 0, j = self.length, k = mirror.length, l = length, m = k - 1, q = fidelity; i < j; ++i, --m, g = gamma += a + b + c + d + e + f)
      a = method(self[i])         | 0,
      b = method(self[j - i - 1]) | 0,
      c = method(mirror[m])       | 0,
      d = method(mirror[k - m])   | 0,
      e = method(next[i])         | 0,
      f = method(next[m])         | 0,
      result.push(Math.abs(
        (((a ^ ~b) << (i + k)) |  (j & e) | g) ^
        (((b | -c) ^  (m + j)) |  (j & f) | g) ^
        (((c & ~d) << (e - k)) >> (k ^ q) + g) ^
        (((d << a) ^  (f - j)) >> (k ^ q) + g) ^

        ((a & b | c ^ d) ^ e - f) << (q & e & f)
      ));

  result.splice(fidelity, result.length - fidelity);

  result.forEach((value, index, self) => {
    return self.splice(index, 1, (value ^ gamma).toString((gamma % 20) + 16));
  });

  return result.join("").slice(0, 256);
};
