var Mio = window.Mio = Mio || {power: 8},
    fn = function(input){return input},
    atob_regexp = /^[a-z\d\+\/]+[\=]{0,2}$/i,
    atob, btoa;

// Encode
Mio.Mi =
Mio.enc =
// String: String[, Boolean]
function Mi(input, hybrid_only) {
  return (!hybrid_only && btoa? btoa: fn)(LZW_Wrap(LZW_Encode(input)));
};

// Decode
Mio.Mo =
Mio.dec =
// String: String
function Mo(input) {
  return LZW_Decode(LZW_Unwrap((atob && atob_regexp.test(input)? atob: fn)(input)));
};

// LZW from [JSFiddle](https://jsfiddle.net/ryanoc/fpMM6/)
// LZW-compress a string
function LZW_Encode(string) {
  var dictionary = {},
      phrases = (string + "").split(""),
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

    media.push(phrase.length > 1 ? dictionary[phrase] : phrase.charCodeAt(0));

  for(i = 0; i < media.length; i++)
    output.push(String.fromCharCode(media[i]));

  return output.join("");
};

// Decompress an LZW-encoded string
function LZW_Decode(string) {
  var dictionary = {},
      phrases = (string + "").split(""),
      character = phrases[0],
      oldPhrase = character,
      output = [character],
      index = 256,
      phrase;

    for(var i = 1, currCode; i < phrases.length; i++) {
      currCode = phrases[i].charCodeAt(0);

      if(currCode < 256)
        phrase = phrases[i];
      else
        phrase = dictionary[currCode] ? dictionary[currCode] : (oldPhrase + character);

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
