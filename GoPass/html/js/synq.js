/** Ephellon Dantzler - 2015, 2018
  * How to use ([...] is optional):
  * Simply call on SynQ([attribute-name]), and that's it
  * For in depth help, use SynQ.help([string:item-name])
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
  * A4)   You can use SynQ.list([boolean:show-private]) to show your data
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
  * A8)   Use SynQ.available([boolean:synq-data-only])
  *
  * Notes:
  * 1) SynQ.clear will only remove "local" {See note #2} items if the "use_global_synq_token" isn't set
  * 2) By "local" I mean per the unique page identifier (URL),
       i.e. "https://example.com/page-1" won't share data with ".../page-2"
  * 3) Data units are given in Bytes (1B = 8b [0000 0000]), with no regard to encoding.
       E.g. if SynQ.available() returns "16" it means 16 Bytes (i.e. 16 UTF-8 characters)
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

// Helper functions not under SynQ
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

/* The event-listeners */
// eventlistener target
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

// add listener
SynQ.addEventListener = function(event, action) {
  SynQ.prevent([event, action], [undefined, null, ""], "Failed to add event listener '" + event + "', please see SynQ.help('addEventListener').");
  var i = '[[InternalAccess]]';

  if(SynQ[i])
    return action;
  else
    SynQ[i] = true;

  var event  = SynQ.eventName + '/' + event + '/#',
      events = (SynQ.pull(event + 0) || "").split(','),
      name   = SynQ.parseFunction(action)[2];

  name = (name != ""? name: events.length);

  if(events.indexOf(name) < 0)
    events.push(name);

  SynQ.push(event + 0, events);
  SynQ.push(event + name, action);
  SynQ[i] = false;

  return events.length - 1;
};

// remove listener
SynQ.removeEventListener = function(name, parent) {
  SynQ.prevent(name, [undefined, null, ""], "Failed to remove event listener '" + (parent || '*') + "." + name + "', please see SynQ.help('removeEventListener').");
  var i = '[[InternalAccess]]';

  if(SynQ[i])
    return action;
  else
    SynQ[i] = true;

  if(parent)
    return SynQ[i] = false, SynQ.pop(SynQ.eventName + '/' + parent + '/#' + name);

  var name = SynQ.eventName + '/' + events[index] + '/#',
      events = SynQ.events.split(' '),
      popped = [];

  for(var index = 0; index < array.length; index++)
    for(var s = SynQ.pop(name + 0).split(','), i = 0, l = sub.length; i < l; i++)
      popped.push(SynQ.pop(name + s[i]));

  return SynQ[i] = false, popped;
};

// trigger listener
SynQ.triggerEvent = function(event, data) {
  SynQ.prevent(event, [undefined, null, ""], "Failed to trigger event '" + event + "', please see SynQ.help('triggerEvent').");
  var i = '[[InternalAccess]]';

  if(SynQ[i])
    return data;
  else
    SynQ[i] = true;

  var event  = SynQ.eventName + '/' + event + '/#',
      events = (SynQ.pull(event + 0) || "").split(',');

  for(var index = 1, head, body, fn; index < events.length; index++) {
    fn = SynQ.parseFunction(SynQ.pull(event + events[index]));
    head = fn[0];
    body = fn[1];
    new Function(head, body).call(null, data);
  }

  return SynQ[i] = false, data;
};

/* The URL-oriented functions */
// URI encoder
SynQ.enocdeURL = function(url) {
  for(var index = 0, characters = "% \"<>[\\]^`{|}", url = url.toString(); index < characters.length; index++)
    url = url.replace(RegExp( "\\" + characters[index], "g" ), "%" + characters.charCodeAt(index).toString(16));

  return url;
};

// URI decoder
SynQ.decodeURL = function(url) {
  for(var regexp = /%(\d{2})/, url = url.toString(); regexp.test(url);)
    url = url.replace(regexp, function($0, $1, $_) {
      return String.fromCharCode(+("0x" + $1)) + "\r\f"; // prevent intentional %code from being removed
    });

  return url.replace(/(% "<>\[\\\]\^`\{\|\})\r\f/g, "$1");
};

/* The storage-oriented functions */
// List all of the current SynQ's data (paths)
SynQ.list = function(all) {
  var regexp = RegExp("^(" +
                 ("synq://localhost:(443|80)\/.*") +
                 "|" +
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

  return SynQ.triggerEvent('clear', undefined);
};

// Push (set) a resource
SynQ.push = function(name, data, key) {
  SynQ.prevent(name, [undefined, null], NO_NAME_ERROR);

  data = data.toString();

  var UTF8 = use_utf8_synq_token != undefined;

  if(UTF8)
    SynQ.prevent(data, /[^\u0000-\u00ff]/, UTF8_ONLY_ERROR);

  if(key != undefined && key != null)
    data = SynQ.lock(data, key),
    key  = ".";
  else
    key = "";

  if(UTF8 && data) {
    for(var index = 0, length = data.length, array = []; index < length;)
      array.push(SynQ.pack16(data[index++], data[index++]));

    data = array.join("");
  }

  storage.setItem(SynQ.signature + key + name, data);

  SynQ.last.push(name);

  return SynQ.triggerEvent('push', data);
};

// Pull (get) a resource
SynQ.pull = function(name, key) {
  SynQ.prevent(name, [undefined, null], NO_NAME_ERROR);

  var data, UTF8 = use_utf8_synq_token != undefined;

  if(UTF8)
    SynQ.prevent(data, /[^\u0000-\u00ff]/, UTF8_ONLY_ERROR);

  if(key != undefined && key != null)
    data = storage.getItem(SynQ.signature + "." + name);
  else
    data = storage.getItem(SynQ.signature + name);

  if(UTF8 && data) {
    for(var index = 0, length = data.length, array = []; index < length;)
      array.push(SynQ.unpack16(data[index++]));

    for(data = [], array = array.join("").split(/([01]{8})/), index = 0, length = array.length; index < length; index++)
      if(array[index] != "")
        data.push(String.fromCharCode(+("0b" + array[index])));

    data = data.join("");
  }

  if(key != undefined && key != null)
    data = SynQ.unlock(data, key);

  return SynQ.triggerEvent('pull', data);
};

// Remove a resource
SynQ.pop = function(name, key) {
  name = name || SynQ.last.pop();

  SynQ.prevent(name, [undefined, null, ""], NO_NAME_ERROR);

  var data = SynQ.pull(name, key);

  if(key != undefined && key != null)
    storage.removeItem(SynQ.signature + "." + name);
  else
    storage.removeItem(SynQ.signature + name);

  return SynQ.triggerEvent('pop', data);
};

// Broadcast to a global storage
SynQ.broadcast = function(name, data, key) {
  SynQ.prevent(name, [undefined, null], NO_NAME_ERROR);

  data = data.toString();

  var UTF8 = use_utf8_synq_token != undefined;

  if(UTF8)
    SynQ.prevent(data, /[^\u0000-\u00ff]/, UTF8_ONLY_ERROR);

  if(key != undefined && key != null)
    data = SynQ.lock(data, key),
    key  = ".";
  else
    key = "";

  if(UTF8 && data) {
    for(var index = 0, length = data.length, array = []; index < length;)
      array.push(SynQ.pack16(data[index++], data[index++]));

    data = array.join("");
  }

  // ".name" and "name" won't be interchangeable
  name = key + SynQ.sign(key + name)
    .replace(/(.{1,4})(.{1,2})?(.{1,2})?(.{1,2})?(.{1,6})?(.{1,12})?/, "$1-$2-$3-$4-$5:$6")
    .replace(/[\-\:]+$/, "");

  storage.setItem('synq://localhost:' + (key.length? 443: 80) + '/' + name, data);

  SynQ.last.push(name);

  return SynQ.triggerEvent('broadcast', name);
};

// Retrieve a global item
SynQ.retrieve = function(name, key) {
  SynQ.prevent(name, [undefined, null], NO_NAME_ERROR);

  var data, UTF8 = use_utf8_synq_token != undefined;

  if(UTF8)
    SynQ.prevent(data, /[^\u0000-\u00ff]/, UTF8_ONLY_ERROR);

  if(key != undefined && key != null)
    data = storage.getItem('synq://localhost:443/' + name);
  else
    data = storage.getItem('synq://localhost:80/' + name);

  if(UTF8 && data) {
    for(var index = 0, length = data.length, array = []; index < length;)
      array.push(SynQ.unpack16(data[index++]));

    for(data = [], array = array.join("").split(/([01]{8})/), index = 0, length = array.length; index < length; index++)
      if(array[index] != "")
        data.push(String.fromCharCode(+("0b" + array[index])));

    data = data.join("");
  }

  if(key != undefined && key != null)
    data = SynQ.unlock(data, key);

  return SynQ.triggerEvent('retrieve', data);
};

// Remove a global resource
SynQ.cage = function(name, key) {
  SynQ.prevent(name, [undefined, null, ""], NO_NAME_ERROR);

  var data = SynQ.retrieve(name, key);

  if(key != undefined && key != null)
    storage.removeItem('synq://localhost:443/' + name);
  else
    storage.removeItem('synq://localhost:80/' + name);

  return SynQ.triggerEvent('cage', data);
};

/* The space-oriented functions */
// Test data limits (in Bytes -> iB) or return an SI formated value
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

// How much space is in use?
SynQ.available = function(exclusive) {
  var size = 0;

  for(var item in storage)
    if(storage.hasOwnProperty(item))
      if(exclusive && RegExp(SynQ.signature.replace(/(\W)/g, "\\$1")).test(item))
        size += storage[item].length | 0;
      else if(!exclusive)
        size += storage[item].length | 0;

  return size * 2;
};

// Return a number from an SI formatted string
SynQ.parseSize = function(size, base, symbol) {
  base = base || 1024;
  symbol = symbol || "iB";
  size = size
    .replace(/^\s*([\d\. ]+[zafpn\u00b5mkMGTPEZY]|[\d\., ]+).*/, "$1")
    .replace(/[^\w\.]/g, "")
    .replace(symbol, "")
    .replace(/(\d+)?(\.\d+)?/, function($0, $1, $2, $_) {
      $1 = $1 || ""; $2 = $2 || "";
      return $1 + $2.replace(/\./g, "");
    });

  var sizes = "zafpn\u00b5m kMGTPEZY",
      tail  = size.replace((size = parseInt(size)), "");

  return size * Math.pow(base, sizes.indexOf(tail) - 7);
};

/* The "security" oritned functions */
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

// The hash/signature function (from Mi/o, by me)
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

// Helpers under SynQ

// Parse a function (returns a "head" and "body")
SynQ.parseFunction = function(fn) {
  SynQ.prevent(fn, [undefined, null, ""], "Failed to parse empty function.");

  fn = fn.toString().replace(/(?:\bfunction(\s+[a-zA-Z\$_]\w*)?)?\s*(\(.*?\))\s*(\{[^]*\})/, "$2 => $3");

  var name = (RegExp.$1 || "").replace(/\s+/g, "");

  fn = fn.split(/\s*\=>\s*/, 2);

  return [fn[0].replace(/^\(|\)$/g, ""), fn[1].replace(/^\{|\}$/g, ""), name];
};

// Parse all URL types (even unconventional ones)
SynQ.parseURL = function(url) {
    var url  = url.toString(),
        data = url.match(/^(([^:\/?#]+):)?\/{2}([^:\/?#]*)?(:\d+)?([^?#]*)(\?[^#]*)?(#.*)?$/),
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

// Pack UTF8 characters
SynQ.pack16 = function(a, b) {
  var s = function(c) {return ("00000000" + c.charCodeAt(0).toString(2)).slice(-8)};
  return String.fromCharCode(+("0b" + s(a) + (b? s(b): "")));
};

// Unpack UTF16 characters
SynQ.unpack16 = function(a) {
  var b, s = function(c) {return (((b = c.charCodeAt(0)) < 0xff? "": "00000000") + b.toString(2)).slice(-16)};
  return s(a);
};

// Help
SynQ.help = function(item) {
  if(item == undefined || item == null)
    item = "help";

  item = item.replace(/[^a-z\d]|\bsynq\./gi, "");

  var m, i = item.toLowerCase();

  switch(i) {
    case 'addeventlistener':
      m = "Adds an event listener to SynQ's push, pull, pop, or clear method./~Usage: $.@(event-name, action)/~Arguments: String, Function/~Returns: Number//event-name: {events}./return: the number of events attached";
      break;

    case 'available':
      m = "Returns the number of bytes (1B = 8b) in use./~Usage: $.@([synq-only])/~Arguments: [Boolean]/~Returns: Integer//synq-only: when set to true, will ony return the amount of owned space $ is using."
      break;

    case 'broadcast':
      m = "Adds data to the global storage item (see also, '$.retrieve')./~Usage: $.@(name, data)/~Arguments: String, String/~Returns: String//return: a UUID for the data.";
      break;

    case 'cage':
      m = "Removes data from the global storage item (similar to '$.pop')./~Usage: $.@(name[, key])/~Arguments: String[, String]/~Returns: String//key: the password to unlock the data with.";
      break;

    case 'clear':
      m = "Removes all owned items from storage (related to $)./~Usage: $.@([remove-all])/~Arguments: [Boolean]/~Returns: Undefined//remove-all: if set to true, will remove all private items too."
      break;

    case 'decodeurl':
      m = "Decodes a URL string./~Usage: $.@(URL)/~Arguments: String/~Returns: String"
      break;

    case 'encodeurl':
      m = "Encodes a URL string./~Usage: $.@(URL)/~Arguments: String/~Returns: String"
      break;

    case 'esc':
      m = "The list delimeter for SynQ to use when storing element values./~Usage: $.@ = delimeter/~Types: String"
      break;

    case 'eventlistener':
      m = "The Event Listener for $ (fires automatically from $)./~Usage: $.@(event)/~Arguments: Object/~Returns: Undefined"
      break;

    case 'help':
      m = "Displays help messages./~Usage: $.@(item-name)/~Arguments: String/~Returns: String"
      break;

    case 'isnan':
      m = "Tests to see if an object is a number or not./~Usage: @(object)/~Arguments: */~Returns: Boolean"
      break;

    case 'last':
      m = "An array that's used to hold each item's name in the order they're created./~Usage: $.@ = ['name-1', 'name-2'...]/~Types: Array"
      break;

    case 'list':
      m = "Returns the currently owned storage items./~Usage: $.@([show-all])/~Arguments: Boolean/~Returns: Object//show-all: when set to true, will return private items as well."
      break;

    case 'lock':
    case 'unlock':
      m = "Locks and unlocks a string./~Usage: $.@(data, key)/~Arguments: String, String/~Returns: String"
      break;

    case 'pack16':
      m = "Packs (encodes) a UTF-16 character, by using two UTF-8 characters./~Usage: $.@(character[, character])/~Arguments: Character[, Character]/~Returns: String//return: if the second character is missing, then the first character will be returned.";
      break;

    case 'parsefloat':
    case 'parsparseint':
      m = "Returns a number from an object./~Usage: @(object)/~Arguments: */~Returns: Number | NaN"
      break;

    case 'parsefunction':
      m = "Returns an array of function data./~Usage: $.@(function-string)/~Arguments: String/~Returns: Array => {0: [function parameters], 1: [function statements], 2: [function name], length: 3}";
      break;

    case 'parsesize':
      m = "Returns a number* from an SI formatted** string./~Usage: $.@(number)/~Arguments: String/~Returns: Number//* Does not recognize 'd' (deci), 'h' (hecto) or 'c' (centi)/** Such as '1GB' or '500km'."
      break;

    case 'parseurl':
      m = "Returns a URL object./~Usage: $.@(URL)/~Arguments: String/~Returns: Object => {href, protocol, scheme, host, port, path, search, searchParameters}"
      break;

    case 'pop':
      m = "Removes, and returns the item from storage./~Usage: $.@([name[, key]])/~Argumments: [String[, String]]/~Returns: String//name: the name of the item to fetch. If left empty, will use the name of the last item created./key: the password to unlock the data with."
      break;

    case 'prevent':
      m = "Used to prevent a value from being used./~Usage: $.@(variable, illegal-values, error-message)/~Arguments: (Array|String), (Array|RegExp), String/~Returns: Undefined/~Throws: Error(message)"
      break;

    case 'pull':
      m = "Returns the item from the storage./~Usage: $.@(name[, key])/~Arguments: String[, String]/~Returns: String//key: the password to unlock the data with."
      break;

    case 'push':
      m = "Adds the item to the storage./~Usage: $.@(name, data[, key])/~Arguments: String, String[, String]/~Returns: <data>//key: the password to lock the data with."
      break;

    case 'removeeventlistener':
      m = "Removes a(n) event listener(s)./~Usage: $.@(function-name[, event-name])/~Arguments: String[, String]/~Returns: Array | String//event-name: {events}.";
      break;

    case 'retrieve':
      m = "Retruns data from the global storage item (see also, '$.broadcast')./~Usage: $.@(name[, key])/~Arguments: String[, String]/~Returns: String//key: the password to unlock the data with.";
      break;

    case 'salt':
      m = "Salts (encrypts) a string, usually a password./~Usage: $.@(string)/~Arguments: String/~Returns: String"
      break;

    case 'sign':
      m = "Hashes a string (think of SHA, or MD5)./~Usage: $.@(string[, fidelity-level])/~Arguments: String[, Float]/~Returns: String//fidelity-level: determines the size of the returned string. The closer to 1 the level is, the shorter the string."
      break;

    case 'size':
      m = "1. Returns the maximum amount of space for the storage (in bytes; 1B = 8b)/~Usage: $.@()/~Arguments: NONE/~Returns: Integer//2. Returns the SI formatted version of the given number./~Usage: $.@(number[base, [symbol]])/~Arguments: Number[, Number[, String]]/~Returns: String//base: the base to use, e.g. 1000; default is 1024./symbol: the symbol to append to the returned string, default is 'iB'."
      break;

    case 'syn':
      m = "The attribute name(s) for elements to update./~Usage: $.@ = ['name-1', 'name-2'...]/~Types: Array, String"
      break;

    case 'synq':
      m = "The main function and container. Updates the storage, while also updating all 'attached' elements./~Usage: $([attribute-name])/~Arguments: String/~Returns: Undefined//attribute-name: if you want to use multiple names, then set the SynQ.syn property."
      break;

    case 'triggerEvent':
      m = "Triggers all event listeners for an event./~Usage: $.@(event-name[, data])/~Arguments: String[, *]/~Returns: <data>//data: the argument (single array) to pass onto each listener.";
      break;

    case 'unpack16':
      m = "Unpacks (decodes) a UTF-16 character into two UTF-8 characters./~Usage: $.@(character)/~Arguments: Character/~Returns: String/return: automatically handles UTF-8 characters, and returns the character iteslf.";
      break;

    case 'useglobalsynqtoken':
      m = "Used to determine if $ should use a local* or global** name.//* $ will save all data for the current URL only, i.e. http:github.com\\page-1 will not have access to http:github.com\\page-2./** $ will save all data for the current host, i.e. http:github.com will be used by $, instead of http:github.com\\page-n."
      break;

    case 'useutf8synqtoken':
      m = "Used to instruct SynQ to save data as UTF-16 streams. E.g. 'acdf' will be combined into 'be' (as an example). It does this by combining UTF-8 characters (\u0000 - \u00ff), and generating a UTF-16 character (\u0100 - \uffff)."
      break;

    case '':
    case '*':
      m = "Help is available for the following items://isNaN/$/$.addEventListener/$.available/$.broadcast/$.cage/$.clear/$.decodeURL/$.encodeURL/$.esc/$.eventlistener/$.last/$.list/$.lock/$.parseFloat/$.parseFunction/$.parseInt/$.parseSize/$.parseURL/$.pop/$.prevent/$.pull/$.push/$.removeEventListener/$.retrieve/$.salt/$.sign/$.syn/$.triggerEvent/use_global_synq_token/use_utf8_synq_token"
      break;

    default:
      m = "Sorry, couldn't find '@'; try $.help('*') to list all items that have help messages."
      break;
  }

  m = ("/" + m + "/")
    .replace(/\//g, "\n")
    .replace(/~/g, "\t")
    .replace(/\$/g, "SynQ")
    .replace(/@/g, item)
    .replace(/\\/g, "/")
    .replace(/http(s)?\:/g, "http$1://")
    .replace(/\{events\}/gi, SynQ.events.split(' ').join(', ').replace(/(.+),\s*(.+?)$/, "$1, or $2"));

  return m;
};

/* Polyfills */
// localStorage - Mozilla
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

storage = window.localStorage;

/* Setup and auto-management */
// Auto-update & run
if(use_global_synq_token == undefined)
  SynQ.signature = "synq://" + SynQ.sign(location, 1) + "/";
else
  SynQ.signature = "synq://" + SynQ.sign(location.origin, 1) + "/";

SynQ.eventName = '.events';
SynQ.events = "push pull pop clear broadcast retrieve cage";
SynQ.last = [];

SynQ.eventlistener("SynQ initializer.");
window.addEventListener("storage", window.onstorage = SynQ.eventlistener, false);
