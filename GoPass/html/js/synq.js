/** Ephellon Dantzler - 2015
  * You call on SynQ() and that's it
  * If you don't want to update element's, just some data, then use SynQ.push, SynQ.pull or SynQ.pop
  * If youd like to get rid of all of your data (for one site) then use SynQ.clear
  * If you'd like to synchronize across your entire domain, then set the use_global_synq_token to a defined value
  */

var SynQName = "synq-data synq-text synq-html".split(" "),
      // change this accordingly; this is the syncronizing attribute for your elements
      // synq-data: .innerText OR .value
      // synq-text: .innerHTML
      // synq-html: .outerHTML
    SynQESC  = "<!-- synq-delimeter -->",
      // change to your liking; this is the list delimeter
    doc      = document,
    win      = window,
    los      = localStorage,
    noname   = "Resource name is missing.",
    sig, use_global_synq_token;

doc.Qy = doc.querySelectorAll;

// IE and Edge?
if(!("addEventListener" in win))
  win.addEventListener = win.attachEvent;

// The main function
function SynQ(name) {
  name = name || SynQName.join("],[");

  var messages = [],
      uuids    = [],
      copies   = {},
      query    = doc.Qy("[" + name + "]");

  function fetch(e) {
    var n, a = e.attributes;

    if("synq-data" in a)
      if("value" in e)
        n = "value";
      else
        n = "innerText";
    else if("synq-text" in a)
      n = "innerHTML";
    else
      n = "outerHTML";

    return e[n];
  }

  for(var index = 0, element, uuid, value, info; index < query.length; index++)
    // Element information
    info = (element = query[index]).tagName,
    // Add copies of elements for the UUID to work properly
    info += ((element.attributes.id)?
      "#" + element.attributes.id:
    ":nth-child(" + (copies[info] |= 0, ++copies[info]) + ")"),
    // Push the element's UUID
    uuids.push(uuid = SynQ.sign(info, 1)),
    // Set the element's UUID for future references
    element.setAttribute("uuid", uuid),
    // Push the messages
    messages.push(value = fetch(element)),
    SynQ.push(".values#" + uuid, value);

  SynQ.push(".values", messages.join(SynQESC));
  SynQ.push(".uuids", uuids.join(","));

  SynQ.eventlistener("SynQ.");
};

// The event-listener
SynQ.eventlistener = function(event) {
  var query = doc.Qy("[" + SynQName.join("],[") + "]");

  function write(e, m) {
    var n, a = e.attributes;

    if("synq-data" in a)
      if("value" in e)
        n = "value";
      else
        n = "innerText";
    else if("synq-text" in a)
      n = "innerHTML";
    else
      n = "outerHTML";

    e[n] = m;
  }

  update:
  for(var index = 0, values, value, uuids, uuid, element; index < query.length; index++) {
    element = query[index];
    values  = SynQ.pull(".values");

    if(values == undefined || values == null)
      break update;
    values = values.split(SynQESC);

    // UUID is set
    // Write confidently, even if the HTML document has changed
    if(element.uuid)
      value = SynQ.pull(".values#" + element.uuid) || values[index],
      write(element, value);
    // UUID isn't set
    // Write, assuming the HTML document hasn't changed
    else
      value = values[index],
      write(element, value);
  }
};

// Parse all URL types (even unconventional ones)
SynQ.parseURL = function(url) {
    var data = url.match(/^(([^:\/?#]+):)?\/{2}([^:\/?#]*)?(:\d+)?([^?#]*)(\?[^#]*)?(#.*)?/), i = 0;

    return {
        href:     data[i++],
        protocol: data[i++],
        scheme:   data[i++],
        host:     data[i++],
        port:     data[i++],
        path:     data[i++],
        search:   data[i++],
        hash:     data[i++]
    };
};

// URI encoder/decoder
SynQ.enocdeURL = function(url) {
  for(var index = 0, characters = "% \"<>[\\]^`{|}"; index < characters.length; index++)
    url = url.replace(RegExp( "\\" + characters[index], "g" ), "%" + characters.charCodeAt(index).toString(16));

  return url;
};

SynQ.decodeURL = function(url) {
  for(var regexp = /%(\d{2})/; regexp.test(url);)
    url = url.replace(regexp, function($0, $1, $_) {
      return String.fromCharCode(+("0x" + $1)) + "\r\f"; // prevent intentional %code from being removed
    });

  return url.replace(/(% "<>\[\\\]\^`\{\|\})\r\f/g, "$1");
};

// List all of the current SynQ's data (paths)
SynQ.data = function(all) {
  var regexp = RegExp("^(" +
                 ("synq://" + SynQ.sign(location, 1) + "/").replace(/(\W)/g, "\\$1") +
                 "|" +
                 ("synq://" + SynQ.sign(location.origin, 1) + "/").replace(/(\W)/g, "\\$1")
               + ")" + (all? ".+": "[^\\.].+") + "$"),
      array  = {};

  for(item in los)
    if(regexp.test(item))
      array[item] = los[item];

  return array;
};

// Push (set) a resource
SynQ.push = function(name, data, key) {
  SynQ.prevent(name, [undefined, null], noname);

  if(key != undefined)
    data = SynQ.lock(data, key),
    key  = ".";
  else
    key = "";

  los.setItem(sig + key + name, data);

  return data;
};

// Pull (get) a resource
SynQ.pull = function(name, key) {
  SynQ.prevent(name, [undefined, null], noname);

  var data;

  if(key != undefined)
    data = SynQ.unlock(los.getItem(sig + "." + name), key);
  else
    data = los.getItem(sig + name);

  return data;
};

// Remove a resource
SynQ.pop = function(name, key) {
  SynQ.prevent(name, [undefined, null, ""], noname);

  var data = SynQ.pull(name, key);

  if(key != undefined)
    los.removeItem(sig + "." + name);
  else
    los.removeItem(sig + name);

  return data;
};

// The "clear all" option
SynQ.clear = function() {
  var regexp = RegExp("^" + sig.replace(/(\W)/g, "\\$1") + "$");

  for(item in los)
    if(regexp.test(item))
      los.removeItem(item);
};

// Lock and unlock data (weak security)
SynQ.lock = function(data, key) {
  key = SynQ.salt(key);

  for(var i = 0, S = []; i < data.length; i++)
    S.push(String.fromCharCode(
      data.charCodeAt(i) ^ key.charCodeAt(i % 256)
    ));

  return S.join("");
};

SynQ.unlock = function(data, key) {
  return SynQ.lock(data, key);
};

SynQ.salt = function(text) {
  for(var i = 0, j = 0, k = 0, S = []; i < 256; i++)
    S[i] = i;

  for(i = 0; i < 256; i++)
    j = (j + S[i] + text.charCodeAt(i % text.length)) % 256,
    S[k] = S[i],
    S[i] = S[j],
    S[j] = S[k];

  for(i = 0; i < 256; i++)
    S[i] = String.fromCharCode( S[i] );

  return S.join("");
};

// The hash/signature function
SynQ.sign = function(string, fidelity) {
  var array = (string + "").split(/([^]{16})/),
      gamma = 0,
      method;

  fidelity = 18 - Math.floor((fidelity || 0) * 16);
  method = function(s) {
    return (s != undefined)? s.charCodeAt(0): s;
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

  result.forEach(function(value, index, self) {
    return self.splice(index, 1, (value ^ gamma).toString((gamma % 20) + 16));
  });

  return result.join("").slice(0, 256);
};

// Handle errors
SynQ.prevent = function(variable, failures, message) {
  for(var index = 0, length = failures.length; index < length; index++)
    if(variable == failures[index])
      throw new Error(message);
};

// Auto-update
if(use_global_synq_token == undefined)
  sig = "synq://" + SynQ.sign(location, 1) + "/";
else
  sig = "synq://" + SynQ.sign(location.origin, 1) + "/";

SynQ.eventlistener("SynQ initializer.");
win.addEventListener("storage", win.onstorage = SynQ.eventlistener, false);
