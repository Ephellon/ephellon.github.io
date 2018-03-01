/** Ephellon Dantzler - 2015
  * You call on SynQ() and that's it
  * If you don't want to update element's, just some data, then use SynQ.push, SynQ.pull or SynQ.pop
  * If youd like to get rid of all of your data (for one site) then use SynQ.clear
  * If you'd like to synchronize across your entire domain, then set the use_global_synq_token to a defined value
  */

var SynQName = 'synq-data',               // change this accordingly; this is the syncronizing attribute for your elements
    SynQESC  = '<!-- synq-delimeter -->', // change to your liking; this is the list delimeter
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
  name = name || SynQName;
  var messages = [],
      uuids    = [],
      query    = doc.Qy("[" + name + "]"),
      copies   = {};

  for(var index = 0, element, uuid, value, info; index < query.length; index++)
    // Element information
    info = [(element = query[index]).tagName, element.id].join("#"),
    // Add copies of elements for the UUID to work properly
    copies[info] |= 0,
    info += ":nth-child(" + (++copies[info]) + ")",
    // Push the element's UUID
    uuids.push(
     uuid = SynQ.sign(info, 1)
    ),
    // Set the element's UUID for future references
    element.setAttribute("uuid", uuid),
    // Push the messages
    messages.push(value =
      (element.value != undefined)?
        query[index].value:
      query[index].innerText),
    SynQ.push(".values#" + uuid, value);

  SynQ.push(".values", messages.join(SynQESC));
  SynQ.push(".uuids", uuids.join(","));
};

// The event-listener
SynQ.eventlistener = function(event) {
  var query = doc.Qy("[" + SynQName + "]");

  function write(e, m) {if(e.value) e.value = m; else e.innerText = m;}

  update:
  for(var index = 0, values, value, uuids, uuid, element; index < query.length; index++) {
    element = query[index];
    values  = SynQ.pull(".values");

    if(values != undefined)
      values = values.split(SynQESC);
    else
      break update;

    uuids = SynQ.pull(".uuids").split(",");
    uuid  = uuids[index];

    // UUID is set
    // Write confidently, even if the HTML document has changed
    if(element.getAttribute("uuid") == uuid)
      value = SynQ.pull(".values#" + uuid) || values[index],
      write(element, value);
    // UUID isn't set
    // Write, assuming the HTML document hasn't changed
    else
      value = values[index],
      write(element, value);
  }
};
win.addEventListener("storage", SynQ.eventlistener, false);

// Push (set) a resource
SynQ.push = function(name, data) {
  SynQ.prevent(name, [undefined, null], noname);

  return los.setItem(sig + name, data);
};

// Pull (get) a resource
SynQ.pull = function(name) {
  SynQ.prevent(name, [undefined, null], noname);

  return los.getItem(sig + name);
};

// Remove a resource
SynQ.pop = function(name) {
  SynQ.prevent(name, [undefined, null, ""], noname);

  var item = SynQ.pull(name);
  los.removeItem(sig + name);

  return item;
};

// The "clear all" option
SynQ.clear = function() {
  var regexp = RegExp("^" + sig.replace(/(\W)/g, "\\$1"));

  for(item in los)
    if(regexp.test(item))
      los.removeItem(item);
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

SynQ.eventlistener({});
