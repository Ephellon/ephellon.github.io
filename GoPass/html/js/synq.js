/** Ephellon Dantzler - 2015, 2018
  * How to use ([...] is optional):
  * Simply call on SynQ([attribute-name]), and that's it
  * FAQ:
  * Q1) What if I don't want to update elements, just some data?
  * A2)   Use SynQ.push(string:name, string:data[, string:password]),
          SynQ.pull(string:name[, string:password]),
          SynQ.pop(string:name[, string:password])
  * Q2) What if I'd like to get rid of all of my data (in SynQ)?
  * A2)   Use SynQ.clear([boolean:clear-all]) {See note #1}
  * Q3) What if I'd like to synchronize across my entire domain?
  * A3)   Set the [use_global_synq_token] variable to a defined value
  * Q4) How do I check on the status of my data?
  * A4)   You can use SynQ.data([boolean:show-private]) to show your data
  * Q5) What about the other things I see under SynQ?
  * A5)   Those are for future technologies, but you can use them as you see fit.
  * Q6) How much space {See note #3} do I have?
  * A6)   It depends on the browser {See note #4} but you can use SynQ.size() to find the current maximum.
          The highest is 5 MiB (5,242,880 b, with UTF-16 enabled) because JS uses UTF-16 characters {See note #4} by default.
          SynQ.size([number:value[, number:base[, string:symbol]]]) also converts "value" in a SI foramatted string,
          e.g. SynQ.size(8214, 1000, "m") returns "8.214km"
  * Q7) What if I want more space {See note #3}?
  * A7)   Set the [use_utf8_synq_token] variable to a defined value (SynQ will then force UTF-8 data strings);
          the available space will be doubled, max being 10 MiB (10,485,760 b, with UTF-16 disabled).
  * Q8) How can I see how much space I am using?
  * A8)   Use SynQ.check([boolean:synq-data-only])
  *
  * Notes:
  * 1) SynQ.clear will only remove "local" {See note #2} items if the "use_global_synq_token" isn't set
  * 2) By "local" I mean per the unique page identifier (URL),
       i.e. "https://example.com/page-1" won't share data with ".../page-2"
  * 3) Data units are given in Bytes (1B = 8b [0000 0000]), with no regard to encoding.
       E.g. if SynQ.check() returns "16" it means 16 Bytes (i.e. 16 UTF-8 characters)
  * 4) According to [Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage),
       pretty sure they know what they're talking about
  */

var NO_NAME_ERROR   = "The resource name is missing.",
    UTF8_ONLY_ERROR = "Only UTF-8 characters are allowed.",
    IE              = {
      "addEventListener": "attachEvent",
      "dispatchEvent":    "fireEvent"
    },
    use_global_synq_token, use_utf8_synq_token, localStorage, sessionStorage, storage;

// IE and Edge?
for(var property in IE)
  if(IE.hasOwnProperty(property) && !(property in window))
    window[ property ] = window[ IE[property] ];

// Helpers
isNaN = isNaN || function(number) {
  return !(+number < Infinity);
};

parseInt = parseInt || function(number) {
  return +((number + "").replace(/^\s*(\d+).+/, "$1"));
};

parseFloat = parseFloat || function(number) {
  return +((number + "").replace(/^\s*(\d+\.\d*|\d*\.\d+).+/, "$1"));
};

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
    element       = query[index];
    info          = element.tagName;
    id            = element.attributes.id;
    copies[info] |= 0;

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
    var data = url.match(/^(([^:\/?#]+):)?\/{2}([^:\/?#]*)?(:\d+)?([^?#]*)(\?[^#]*)?(#.*)?$/),
        i    = 0;

    return {
        href:             data[i++],
        protocol:         data[i++],
        scheme:           data[i++],
        host:             data[i++],
        port:             data[i++],
        path:             data[i++],
        search:           data[i++],
        searchParameters: (function(sd) {
          parsing:
          for(var i = 0, s = {}, d = (sd = sd || "").slice(1, sd.length).split("&"), n, p, c; i < d.length; i++) {
            c = d[i].split("=", 2);
            n = c[0] || "";

            if(n == "")
              continue parsing;

            p = c[1] || "";
            s[n] = p;
          }

          return s;
        })(data[i - 1]),
        hash:             data[i++]
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

  for(item in storage)
    if(regexp.test(item))
      array[item] = storage[item];

  return array;
};

// Push (set) a resource
SynQ.push = function(name, data, key) {
  SynQ.prevent(name, [undefined, null], NO_NAME_ERROR);

  var UTF8 = use_utf8_synq_token != undefined;

  if(UTF8)
    SynQ.prevent(data, /[^\u0000-\u00ff]/, UTF8_ONLY_ERROR);

  if(key != undefined && key != null)
    data = SynQ.lock(data, key),
    key  = ".";
  else
    key = "";

  if(UTF8 && data) {
    var to_utf16 = function(a, b) {
      var s = function(c) {return ("00000000" + c.charCodeAt(0).toString(2)).slice(-8)};
      return String.fromCharCode(+("0b" + s(a) + (b? s(b): "")));
    };

    for(var index = 0, length = data.length, array = []; index < length;)
      array.push(to_utf16(data[index++], data[index++]));

    data = array.join("");
  }

  storage.setItem(SynQ.signature + key + name, data);

  return data;
};

// Pull (get) a resource
SynQ.pull = function(name, key) {
  SynQ.prevent(name, [undefined, null], NO_NAME_ERROR);

  var data, UTF8 = use_utf8_synq_token != undefined;

  if(UTF8)
    SynQ.prevent(data, /[^\u0000-\u00ff]/, UTF8_ONLY_ERROR);

  if(key != undefined && key != null)
    data = SynQ.unlock(storage.getItem(SynQ.signature + "." + name), key);
  else
    data = storage.getItem(SynQ.signature + name);

  if(UTF8 && data) {
    var from_utf16 = function(a) {
      var b, s = function(c) {return (((b = c.charCodeAt(0)) < 0xff? "": "00000000") + b.toString(2)).slice(-16)};
      return s(a);
    };

    for(var index = 0, length = data.length, array = []; index < length;)
      array.push(from_utf16(data[index++]));

    for(data = [], array = array.join("").split(/([01]{8})/), index = 0, length = array.length; index < length; index++)
      if(array[index] != "")
        data.push(String.fromCharCode(+("0b" + array[index])));

    data = data.join("");
  }

  return data;
};

// Remove a resource
SynQ.pop = function(name, key) {
  SynQ.prevent(name, [undefined, null, ""], NO_NAME_ERROR);

  var data = SynQ.pull(name, key);

  if(key != undefined && key != null)
    storage.removeItem(SynQ.signature + "." + name);
  else
    storage.removeItem(SynQ.signature + name);

  return data;
};

// The "clear all" option
SynQ.clear = function(all) {
  var regexp = RegExp("^(" +
                 ("synq://" + SynQ.sign(location, 1) + "/").replace(/(\W)/g, "\\$1") +
                 "|" +
                 ("synq://" + SynQ.sign(location.origin, 1) + "/").replace(/(\W)/g, "\\$1")
               + ")" + (all? ".+": "[^\\.].+") + "$");

  for(item in storage)
    if(regexp.test(item))
      storage.removeItem(item);
};

// How much space is in use?
SynQ.check = function(exclusive) {
  var size = 0;

  for(var item in storage)
    if(storage.hasOwnProperty(item))
      if(exclusive && RegExp(SynQ.signature.replace(/(\W)/g, "\\$1")).test(item))
        size += storage[item].length | 0;
      else if(!exclusive)
        size += storage[item].length | 0;

  return size * 2;
};

// Test data limits (in Bytes -> iB)
// or return an SI formated value
SynQ.size = function(number, base, symbol) {
  var backup = {},
      size   = function(n, b, s) {
        b = b || 1024; s = s || "iB";

        if(n < b && n > -b)
          for(var k = "m\u00b5npfaz", x = 0, g = k.length; (x < g) && (n < 1); x++)
            n *= b;
        else
          for(var k = "kMGTPEZY", x = 0, g = k.length; (x < g) && (n > b); x++)
            n /= b;

        return n + (k[x - 1] || "") + s;
      };

  for(var n in storage)
    backup[n] = storage[n];

  storage.clear();

  _1MiB: // 1 MiB
  for(var s = "_", i = 1, j, l = 1024 * 1024, p = true, m; i <= l; i *= 2)
    try {
      storage.setItem("$_TEST_$", s.repeat(i));
    } catch(e) {
      m = size(i);
      p = false;

      break _1MiB;
    };

  _64MiB: // 64 MiB
  for(j = l, l *= 10; p && i <= l; i += j)
    try {
      storage.setItem("$_TEST_$", s.repeat(i));
    } catch(e) {
      m = size(i);

      break _64MiB;
    };

  storage.clear();

  for(var n in backup)
    storage[n] = backup[n];

  SynQ.size = function(number, base, symbol) {
    return (number == undefined || number == null)?
      SynQ.size.max || "0B":
    SynQ.size.convert(+number, base, symbol)
  };

  SynQ.size.convert = size;
  SynQ.size.max = i *= 2;

  if(number != undefined && number != null)
    return SynQ.size(number, base, symbol);

  return i;
};

SynQ.parseSize = function(size, base) {
  size = size
    .replace(/.*([\d\. ]+[kMGTPEZY]|[\d\., ]+).*/, "$1")
    .replace(/[^\w\.]/g, "")
    .replace(/(\d*\.)(\d*)/, function($0, $1, $2, $_) {
      return $1 + $2.replace(/\./g, "");
    });
  base = base || 1024;

  var sizes = "kMGTPEZY",
      tail  = size.replace((size = parseInt(size)), "");

  return size * Math.pow(base, sizes.indexOf(tail) + 1);
};

// Lock and unlock data (weak security)
SynQ.lock = function(data, key) {
  key = SynQ.salt(SynQ.sign(key, 0));

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
  function prevent(a, b, c) {
    if(a == b)
      throw new Error(c);
  };

  // Array, *, *
  if(variable instanceof Array)
    for(var index = 0, length = variable.length; index < length; index++)
      SynQ.prevent(variable[index], failures, message);
  // *, Function, *
  else if(failures instanceof RegExp)
    prevent(failures.test(variable), true, message);
  // *, Array, *
  else if(failures instanceof Array)
    for(var index = 0, length = failures.length; index < length; index++)
      prevent(variable, failures[index], message);
};

// Polyfill - Mozilla
if(!("localStorage" in window))
  Object.defineProperty(window, "localStorage", new(function() {
    var keys          = [],
        StorageObject = {},
        onstorage     = new Event("storage", {bubbles: false, cancelable: false, composed: true});

    Object.defineProperty(StorageObject, "getItem", {
      value: function(key) {
        return (key)?
          this[key]:
        null;
      },
      writable:     false,
      configurable: false,
      enumerable:   false
    });

    Object.defineProperty(StorageObject, "key", {
      value: function(keyID) {
        return keys[keyID];
      },
      writable:     false,
      configurable: false,
      enumerable:   false
    });

    Object.defineProperty(StorageObject, "setItem", {
      value: function(key, value) {
        if(key == undefined || key == null)
          return;

        document.cookie = escape(key) + "=" + escape(value) + "; expires=Thu, Dec 31 2099 23:59:59 GMT; path=/";
        window.dispatchEvent(onstorage);
      },
      writable:     false,
      configurable: false,
      enumerable:   false
    });

    Object.defineProperty(StorageObject, "length", {
      get: function() {
        return keys.length;
      },
      configurable: false,
      enumerable:   false
    });

    Object.defineProperty(StorageObject, "removeItem", {
      value: function(key) {
        if(key == undefined || key == null)
          return;

        document.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        window.dispatchEvent(onstorage);
      },
      writable:     false,
      configurable: false,
      enumerable:   false
    });
    
    Object.defineProperty(StorageObject, "clear", {
      value: function() {
        if(keys.length == undefined || key.slength == null)
          return;

        for(var key in keys)
          document.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

        window.dispatchEvent(onstorage);
      },
      writable:     false,
      configurable: false,
      enumerable:   false
    });

    Object.defineProperty(StorageObject, "cookie", {
      value:        true,
      writable:     false,
      configurable: false,
      enumerable:   false
    });

    this.get = function() {
      var index;

      for(var key in StorageObject) {
        index = keys.indexOf(key);
        if(index == -1)
          StorageObject.setItem(key, StorageObject[key]);
        else
          keys.splice(index, 1);
        delete StorageObject[key];
      }

      for(keys; keys.length > 0; keys.splice(0, 1))
        StorageObject.removeItem(keys[0]);

      for(var cookie, key, index = 0, cookies = document.cookie.split(/\s*;\s*/); index < cookies.length; index++) {
        cookie = cookies[index].split(/\s*=\s*/);
        if(cookie.length > 1)
          key = unescape(cookie[0]),
          StorageObject[key] = unescape(cookie[1]),
          keys.push(key);
      }

      return StorageObject;
    };

    this.configurable = false;
    this.enumerable   = true;
  })());

// Auto-update & run
if(use_global_synq_token == undefined)
  SynQ.signature = "synq://" + SynQ.sign(location, 1) + "/";
else
  SynQ.signature = "synq://" + SynQ.sign(location.origin, 1) + "/";

storage = window.localStorage;

SynQ.eventlistener("SynQ initializer.");
window.addEventListener("storage", window.onstorage = SynQ.eventlistener, false);
