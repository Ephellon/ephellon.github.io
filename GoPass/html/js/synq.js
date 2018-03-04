/** Ephellon Dantzler - 2015, 2018
  * How to use ([...] is optional):
  * Simply call on SynQ([attribute-name]), and that's it
  * FAQ:
  * Q1) What if I don't want to update elements, just some data?
  * A2) Use SynQ.push(string:name, string:data[, string:password]),
        SynQ.pull(string:name[, string:password]),
        OR SynQ.pop(string:name[, string:password])
  * Q2) What if I'd like to get rid of all of my data (in SynQ)?
  * A2) Use SynQ.clear()**
  * Q3) What if I'd like to synchronize across my entire domain?
  * A3) Set the use_global_synq_token to a defined value
  * Q4) How do I check on the status of my data?
  * A4) You can use SynQ.data([boolean:show-private]) to show your data
  * Q5) What about the other things I see under SynQ?
  * A6) Those are for future technologies, but you can use them as you see fit.
  *
  * ** SynQ.clear will only remove local*** items if the "use_global_synq_token" isn't set
  * *** By "local" I mean for a unique page identifier (URL), e.g. "https://example.com/page-1" won't share "local" data with ".../page-2"
  */

var NO_NAME = "Resource name is missing.",
    use_global_synq_token;

// IE and Edge?
if(!("addEventListener" in window))
  window.addEventListener = window.attachEvent;

// The main function
function SynQ(name) {
  name = name || SynQ.syn.join("],[");

  var messages = [],
      uuids    = [],
      copies   = {},
      query    = document.querySelectorAll("[" + name + "]");

  function fetch(e) {
    var a = e.attributes,
        n =
    ("synq-data" in a)?
      ("value" in e)?
        "value":
      "innerText":
    ("synq-text" in a)?
      "innerHTML":
    "outerHTML";

    return e[n];
  }

  for(var index = 0, element, uuid, value, info, id; index < query.length; index++) {
    // Element information
    copies[info] |= 0;
    element       = query[index];
    info          = element.tagName;
    id            = element.attributes.id;

    // Add copies of elements for the UUID to work properly
    info += (id != undefined && id != null)?
      "#" + id:
    ":nth-child(" + (++copies[info]) + ")";

    // Push the element's UUID
    uuid = SynQ.sign(info, 1);
    uuids.push(uuid);

    // Set the element's UUID for future references
    element.setAttribute("uuid", uuid);

    // Push the messages
    value = fetch(element);
    messages.push(value);
    SynQ.push(".values#" + uuid, value);
  }

  SynQ.push(".values", messages.join(SynQ.esc));
  SynQ.push(".uuids", uuids.join(","));

  SynQ.eventlistener("SynQ.");
};

SynQ.syn = "synq-data synq-text synq-html".split(" ");
  // change this accordingly; this is the syncronizing attribute for your elements
  // synq-data: .innerText OR .value
  // synq-text: .innerHTML
  // synq-html: .outerHTML
SynQ.esc  = "<!-- synq-delimeter -->";
  // change to your liking; this is the list delimeter

// The event-listener
SynQ.eventlistener = function(event) {
  var query = document.querySelectorAll("[" + SynQ.syn.join("],[") + "]");

  function write(e, m) {
    var a = e.attributes,
        n =
    ("synq-data" in a)?
      ("value" in e)?
        "value":
      "innerText":
    ("synq-text" in a)?
      "innerHTML":
    "outerHTML";

    e[n] = m;
  }

  update:
  for(var index = 0, values, value, uuids, uuid, element; index < query.length; index++) {
    element = query[index];
    values  = SynQ.pull(".values");

    if(values == undefined || values == null)
      break update;
    values = values.split(SynQ.esc);

    // UUID is set
    // Write confidently, even if the HTML document has changed
    if(element.uuid != undefined && element.uuid != null)
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

  for(item in localStorage)
    if(regexp.test(item))
      array[item] = localStorage[item];

  return array;
};

// Push (set) a resource
SynQ.push = function(name, data, key) {
  SynQ.prevent(name, [undefined, null], NO_NAME);

  if(key != undefined && key != null)
    data = SynQ.lock(data, key),
    key  = ".";
  else
    key = "";

  localStorage.setItem(SynQ.signature + key + name, data);

  return data;
};

// Pull (get) a resource
SynQ.pull = function(name, key) {
  SynQ.prevent(name, [undefined, null], NO_NAME);

  var data;

  if(key != undefined && key != null)
    data = SynQ.unlock(localStorage.getItem(SynQ.signature + "." + name), key);
  else
    data = localStorage.getItem(SynQ.signature + name);

  return data;
};

// Remove a resource
SynQ.pop = function(name, key) {
  SynQ.prevent(name, [undefined, null, ""], NO_NAME);

  var data = SynQ.pull(name, key);

  if(key != undefined && key != null)
    localStorage.removeItem(SynQ.signature + "." + name);
  else
    localStorage.removeItem(SynQ.signature + name);

  return data;
};

// The "clear all" option
SynQ.clear = function() {
  var regexp = RegExp("^" + SynQ.signature.replace(/(\W)/g, "\\$1") + "$");

  for(item in localStorage)
    if(regexp.test(item))
      localStorage.removeItem(item);
};

// Lock and unlock data (weak security)
SynQ.lock = function(data, key) {
  key = SynQ.salt(key);

  for(var index = 0, salted = []; index < data.length; index++)
    salted.push(String.fromCharCode(
      data.charCodeAt(index) ^ key.charCodeAt(index % 256)
    ));

  return salted.join("");
};

SynQ.unlock = function(data, key) {
  return SynQ.lock(data, key);
};

// KSA algorithm
SynQ.salt = function(text) {
  for(var index = 0, exdex = 0, swap = 0, salted = []; index < 256; index++)
    salted[index] = index;

  for(index = 0; index < 256; index++)
    exdex = (exdex + salted[index] + text.charCodeAt(index % text.length)) % 256,
    salted[swap]  = salted[index],
    salted[index] = salted[exdex],
    salted[exdex] = salted[swap];

  for(index = 0; index < 256; index++)
    salted[index] = String.fromCharCode( salted[index] );

  return salted.join("");
};

// The hash/signature function
// From my Mi/o project
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

// Auto-update & run
if(use_global_synq_token == undefined)
  SynQ.signature = "synq://" + SynQ.sign(location, 1) + "/";
else
  SynQ.signature = "synq://" + SynQ.sign(location.origin, 1) + "/";

SynQ.eventlistener("SynQ initializer.");
window.addEventListener("storage", window.onstorage = SynQ.eventlistener, false);
