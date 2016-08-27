/* Paramour 1.0
  author: Ephellon Dantzler
  A majority of the language was built in just 48h!
  What wasn't built within the 48h:
    custom operators (still looking into that)
*/

var window = (window === undefined || window === null)? {}: window;

var Paramour =
window.Paramour =
function(input) {

  switch(typeof input) {
    case "string":
      break;
    case "object":
      if(input.value != undefined)
        input = input.value;
      else if(input.innerText != undefined)
        input = input.innerText;
      else if(input.innerHTML != undefined)
        input = input.innerHTML;
      else if(input.constructor == Array)
        input = input.join("");
      break;
    default:
      try {
        input = input.toString()
      } catch(error) {
        throw error
      }
      break;
  };

  input = "\b" + input;

  var runtime = {
    /*
      ECMAScript features
      (All info. provided by the MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript)
    */
    is: function(e) {
      switch (e + "") {
        case "*":
          return runtime.is("1.8.5");
          break;

        case "1.8.5":
          if (undefined === Object.create || null === Object.create)
            return runtime.is("1.8.1");
          /* JavaScript 1.8.5
            Objects:
              Proxy
            Methods:
              Object:
                create, defineProperty, defineProperties, getOwnPropertyDescriptor, keys, getOwnPropertyNames, preventExtensions, isExpandable, seal, isSealed, freeze, isFrozen, isArray
              Date.prototype:
                toJSON
              Function.prototype:
                bind
            Operators:
              get
              set
            */
          break;

        case "1.8.1":
          if (undefined === Object.getPrototypeOf || null === Object.getPrototypeOf)
            return runtime.is("1.8");
          /* JavaScript 1.8.1
            Methods:
              Object:
                getProtototypeOf
              "native" JSON
              String.prototype:
                trim, trimLeft, trimRight, statrsWith
            */
          break;

          // ^ ECMAScript 7
        case "1.8":
          if (undefined === Array.prototype.reduce || null === Array.prototype.reduce)
            return runtime.is("1.7");
          /* JavaScript 1.8
            Methods:
              Array.prototype:
                reduce, reduceRight
            Deprecated:
              "destructing" to NUL
            */
          break;

          // ^ ECMAScript 6
        case "1.7":
          if (undefined !== Array.prototype.indexOf && null !== Array.prototype.indexOf && undefined === Array.prototype.reduce || null === Array.prototype.reduce)
            return runtime.is("1.6");
          /* JavaScript 1.7
            Et Cetra:
              "destructing" @ {
                [a, b, c, ...] = ["abc", 123, "xyz", ...]
                {a, b, c, ...} = {a: "abc", b: 123, c: "xyz", ...}
              }
            */
          break;

        case "1.6":
          if (undefined === Array.prototype.indexOf || null === Array.prototype.indexOf)
            return runtime.is("1.5");
          /* JavaScript 1.6
            Methods:
              Array:
                indexOf, lastIndexOf, every, filter, forEach, map, some
            Statements:
              for each...in
            Et Cetra:
              XML support
            */
          break;

          // ^ ECMAScript 5
        case "1.5":
          if (undefined === Number.prototype.toExponential || null === Number.prototype.toExponential)
            return runtime.is("1.4");
          /* JavaScript 1.5
            Methods:
              Number.prototype:
                toExponential, toFixed, toPrecision
            Statements:
              const
            Improved:
              \\(catch)+/ in try...catch
            */
          break;

        case "1.4":
          if (undefined === Function.prototype.length || null === Function.prototype.length)
            return runtime.is("1.3");
          /* JavaScript 1.4
            Operators:
              in
              instanceof
            Statements:
              throw
              try...catch
            Deprecated:
              Function.arity to Function.length
            */
          break;

        case "1.3":
          if (undefined === Function.prototype.apply || null === Function.prototype.apply)
            return runtime.is("1.2");
          /* JavaScript 1.3
            Globals:
              NaN
              Infinity
              undefined
            Methods:
              isFinite
              Function.prototype:
                apply, call
              Date: *
            Et Cetra:
              ===
              !==
            */
          break;

        case "1.2":
          if (undefined === Array.prototype.concat || null === Array.prototype.concat)
            return runtime.is("1.1");
          /* JavaScript 1.2
            Objects:
              arguments
            Properties:
              Function:
                arity
            Methods:
              Array.prototype:
                concat, slice
              String.prototype:
                charCodeAt, concat, fromCharCode, match, replace, search, slice, substr
            Operators
              delete
              ==
              !=
            Statements:
              "label" @ {
                label_name:
                  statement
              }
              switch
              do...while
              import
              export
            Et Cetra:
              RegExp
            */
          break;

        default:
          return "1.1";
      }
      return e
    },
    has: function(e) {
      if (Paramour.support != undefined)
        return Paramour.support.indexOf(e) > -1;
      var r = [ "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.8.1", "1.8.5" ], t = 0;
      return t = r.slice(0, r.indexOf(runtime.is("*")) + 1),
        Paramour.runtime = t[t.length - 1],
        (Paramour.support = t).indexOf(e) > -1;
    },
    emulate: function(e) {
      var r = [ "*", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.8.1", "1.8.5" ];
      return Paramour.support = r.slice(0, (r.indexOf(e) || r.indexOf(runtime.is("*"))) + 1),
        Paramour.runtime = Paramour.support[Paramour.support.length - 1] + ".*",
        Paramour.support
    },
    original: null
  };

  Paramour.runtime = runtime.original = runtime.is("*");
  window.navigator = window.navigator || {};
  window.navigator.__defineGetter__("runtime", function() {
    return runtime.original
  });
  window.navigator.__defineGetter__("paramour", function() {
    return true
  });

  Paramour.dockets = {};

  Paramour.types = function() {
    var args = [].slice.call(arguments);
    for(var x = 0, y = []; x < args.length; x++)
      if(args[x].name !== undefined && args[x].constructor === Function)
        y.push(args[x].name);
      else if(args[x].constructor.name !== undefined)
        y.push(args[x].constructor.name)
        else
          y.push(typeof args[x]);
    return y.join(', ')
  };

  Paramour.pull = function(func) {
    return Paramour.dockets[func]
  };

  Paramour.push = function(func, args) {
    for(var k = /(^\s*|,\s*)([a-z\$-][\w\$]*\.{0,3})\s*(,|$)/i; k.test(args);)
      args = args.replace(k, "$1* $2$3");
    Paramour.dockets[func] = (Paramour.dockets[func] === undefined)? []: Paramour.dockets[func];
    return Paramour.dockets[func].push(args.replace(/(\*|\.{3}|[a-z\$_][\w\$]*)\s+([a-z\$_][\w\$]*\.{0,3})/gi, "$1").split(','));
  };

  window.Tuple =
  Paramour.Tuple =
  function Tuple() {
    var c = {
      'index': 0,
      'arguments': [],
      'TupleArray': []
    };
    Tuple.tuples = Tuple.tuples || [];

    for(var x = 0; x < arguments.length; x++) {
      c['TupleArray'].push(arguments[x]);
      c['arguments'].push(arguments[x].constructor.name || arguments.constructor);
    }
    c['arguments'] = c['TupleArray'];

    if(Tuple['tuples'][c.arguments] !== undefined)
      return Tuple['tuples'][c.arguments].TupleIterator;

    var TupleItem = c, TupleIndex = c.index;

    Tuple.__defineGetter__("constructor", function() {
      return Tuple
    });

    c.__defineGetter__('every', function() {
      return function(_function) { for(var iterator = 0, TupleArray = this.TupleArray, response = true; iterator < TupleArray.length && response; iterator++) response = _function.call(null, TupleArray[iterator]); return response }
    });

    c.__defineGetter__('forEach', function() {
      return function(_function) { for(var iterator = 0, TupleArray = this.TupleArray, response; iterator < TupleArray.length; iterator++) response = _function.call(null, TupleArray[iterator]); return response }
    });

    c.__defineGetter__('join', function() {
      return function(symbols) { return this.TupleArray.join(symbols) }
    });

    c.__defineGetter__('length', function(){
      return c['TupleArray'].length
    });

    c.__defineGetter__('next', function(){
      return function() { return this.TupleIterator }
    });

    c.__defineGetter__('toString', function() {
      return function() { return this.TupleArray.toString() }
    });

    c.__defineGetter__('TupleIterator', function(){
      return c['TupleArray'][c.index++]
    });

    return Tuple['tuples'][c.arguments] = c
  };

  function argify(args, types) {
    types = (types || []).join(",").replace(/\s/g, "").split(",");
    if(typeof args == 'string')
      args = args.split(',');
    for(var x = 0, y = []; x < args.length; x++)
      y.push(args[x].replace(/^\s*([a-z\$_][\w\$]*)\s*\=\s*(.*)$/i, (types[x] == "..."? "$1 = arguments.slice(" + x + "," + (args.length - x) + ") || $2": "$1 = arguments[" + x + "] || $2")).replace(/^\s*([a-z\$_][\w\$]*)\s*$/i, (types[x] == "..."? "$1 = arguments.slice(" + x + "," + (args.length - x) + ")": "$1 = arguments[" + x + "]") ));
    return y.join(',')
  }

  var backup = input,
      exps = [],
      errors = /(\s*var\s*;|[\b])/g,
      reserved = /\b(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|undefined|var|void|volatile|while|with|yield)\b/,
      multi_line = [],
      single_line = [],
      regexp = [],
      double_quote = [],
      single_quote = [],
      quasi = [],
      brace = [],
      tuple = [],
      emus = [],
      caches = [],
      patterns = {
        "double_quote": /("[^"\n\r]*?")/,
        "single_quote": /('[^'\n\r]*?')/,
        "regexp": /(\/.*?\/[igmuy]*)/, // // -> /(?:)/
        "quasi": /(`[^`]*?`)/,
        "multi_line": /###([\s\S]*?)###/,
        "emus": /#\s*@([\d\.]+)/,
        "caches": /#\s*\$(.+)/,
        "single_line": /#(.*)/,
        "tuple": /\{\{\s*([^;]*?)\s*\}\}/,
        "brace": /(\{[^\{\}]*?\})/
      };

  caches.kids = [];

  for(var x = /(\n\r\t)/; x.test(input);)
    input = input.replace(x, function(e) {
      return "\\" + ({
        "\n": "n",
        "\r": "r",
        "\t": "t"
      }[e])
    });

  for(var x = /\\(.)/; x.test(input);)
    input = input.replace(x, function(e, a) {
      return "\b0x" + a.charCodeAt(0).toString(16) + "\b"
    });

  // get rid of everything before staring Paramour
  for(var pattern in patterns) {
    exps.push(pattern);
    for(var l, k = patterns[pattern]; k.test(input);) {
      l = (eval("(window." + pattern + " = " + pattern + ")")).push(RegExp.$1) - 1;
      input = input.replace(k, pattern + "." + l);
    }
  }

  for(var x = 0; x < emus.length; x++)
    runtime.emulate(emus[x]);

  function handle(type, index) {
    var spil = eval(type)[index];
    switch(type) {
      case 'multi_line':
        return '/*' + spil + '*/';
        break;
      case 'emus':
        return '// JavaScript Emulation from "' + runtime.original + '" to "' + spil + '"'
        break;
      case 'caches':
        var r = /\->/, s = /\=>/, o = {};
        var R = spil.split(/\s*\->\s*/), S = spil.split(/\s*\=>\s*/);
        if(r.test(spil))
          caches.kids.push((o[R[0]] = R[1], o));
        else if(s.test(spil))
          caches.kids.push((o[S[0]] = eval(S[1]), o));
        return '// ' + spil;
        break;
      case 'single_line':
        return '//' + spil;
        break;
      case 'quasi':
        return runtime.has("1.6")?
          spil:
        "'" + spil.replace(/\n/g, "").replace(/^`|`$/g, "").replace(/'/g, "\\'") + "'";
        break;
      case 'tuple':
        return "Tuple\b28" + spil + "\b29";
        break;
      case 'regexp':
        return spil.replace(/^\/\/$/, "/(?:)/");
        break;
      case 'single_quote':
      case 'double_quote':
        return spil;
        break;
      default:
        return compile(spil);
        break;
    }
    return input;
  }

  function decompile(input, expressions, all) {
    expressions =
      (expressions === undefined || all)?
      exps:
    (expressions.constructor === Array)?
      expressions:
    [expressions];
    for(var expression = RegExp("(" + expressions.join("|") + ")\\.(\\d+)"); expression.test(input);)
      input = input.replace(expression, handle(RegExp.$1, +RegExp.$2));
    return input
  }

  function compile(input, args) {
    var patterns = {
      // rehandlers
      "class#(\\j)\\s*(brace)\\.(\\d+)": function(e, a, b, c) {
        var d = a;
        return "function " + a + "\b28\b29 " + eval(b)[c]
          .replace(/<init>\s*(\(.*\))?\s*(brace\.\d+)/, function(e, a, b) {
          return "constructor#" + d + " [" + a + "] [true] " + b
        })
          .replace(/([a-z\$_][\w\$]*)\s*\((.*)\)\s*(brace\.\d+)/gi, "prototype#" + a + ":$1 [$2] $3")
          .replace(/(\s*)\}$/, "\n  " + a + ".this <get constructor> brace." + (brace.push("{\n    -> " + a + ";\n  }") - 1) + "\n  " + a + ".this <set constructor> brace." + (brace.push("{\n    -> " + a + ", constructor;\n  }") - 1) + "\n  return " + a + ".this;\n}")
      },
      "extends#(\\j)\\:(\\j)\\s*(brace\\.\\d+)": function(e, a, b, c) {
        var d = b;
        return "function " + b + (brace[c.replace(/.*(\d+)/, "$1")])
          .replace(/<init>\s*\((.*)\)\s*(brace\.\d+)/, function(e, a, b) {
          return "constructor#" + d + " [" + a + "] [false] " + b
        })
          .replace(/\{(\s*)/, "\b28\b29 {$1" + b + ".super = " + a + ";$1" + b + ".this = " + a + ".apply(null, arguments) || {};$1")
          .replace(/([a-z\$_][\w\$]*)\s*\((.*)\)\s*(brace\.\d+)/gi, "prototype#" + b + ":$1 [$2] $3")
          .replace(/(\s*)\}$/, "\n  " + b + ".this <get constructor> brace." + (brace.push("{\n    -> " + b + ";\n  }") - 1) + "\n  " + b + ".this <set constructor> brace." + (brace.push("{\n    -> " + b + ", constructor;\n  }") - 1) + "\n  return " + b + ".this;\n}")
      },
      "constructor#(\\j)\\s*\\[([^\\[\\]]*?)\\]\\s*\\[(true|false)\\]\\s*(brace\\.\\d+)": function(e, a, b, c, d) {
        return (eval(c)? a + ".this = {};\n  ": "") + a + ".constructor = function\b28\b29 " + decompile(d, 'brace').replace(/\{(\s*)/, (b === "undefined")? "{$1": "{$1" + argify(b) + ";$1").replace(/\b(@|this|super)\b/g, a + ".$1") + ";\n  " + a + ".constructor.apply\b28null, arguments\b29;\n  "
      },
      "prototype#(\\j)\\:(\\j)\\s*\\[([^\\[\\]]*?)\\]\\s*(brace\\.\\d+)": function(e, a, b, c, d) {
        return a + ".this." + b + " = function\b28\b29 " + decompile(d, 'brace').replace(/\{(\s*)/, "{$1var " + argify(c) + ";$1")
      },
      "arrow#\\[(.*)\\]\\s*\\[([^\\[\\]]*?)\\]\\s*(brace\\.\\d+)": function(e, a, b, c) {
        return (a == "undefined"? "": a) + "function\b28\b29 " + decompile(c, 'brace').replace(/\{(\s*)/, "{$1var " + argify(b) + ";$1return\b ")
      },
      "arrow#\\[(.*)\\]\\s*\\[([^\\[\\]]*?)\\]\\s*(\\j)": function(e, a, b, c) {
        return (a == "undefined"? "": a) + "function\b28\b29 {var " + argify(b) + "; return " + c + "}"
      },
      // reserved words
      // statement {}
      "\\b(do|else|finally|return|try|typeof|while)\\b\\s*(brace\\.\\d+)": function(e, a, b) {
        return "\b" + a + "\b \b" + b + "\b"
      },
      // statement () {}
      "\\b(catch|for|function|if|switch|while|with|\\.\\j)\\b\\s*\\((.*)\\)": function(e, a, b) {
        return "\b" + a + "\b \b28" + (b || " ").replace(/\(/g, "\b28").replace(/\)/g, "\b29") + "\b29"
      },
      // functions
      "(\\j\\s*[\\:\\=]?\\s*)\\(([^\\(\\)\\n\\r]*?)\\)\\s*(brace\\.\\d+)": function(e, a, b, c) {
        var r = /(\*|\.{3}|[a-z\$_][\w\$]*)\s+([a-z\$_][\w\$]*\.{0,3})/gi, x;
        if(r.test(b)) {
          x = Paramour.push(a, b) - 1;
          return "function " + a + "__" + Paramour.pull(a)[x].join('_').replace(/\s+/g, "").replace(/\*/g, "Any").replace(/\.{3}/g, "Spread").replace(/([a-z\$_][\w\$]*).*$/i, "$1") + "\b28\b29 " + decompile(c, 'brace').replace(/\{(\s*)/, (b == ""? "{$1": "{$1var " + argify(b.replace(r, "$2"), Paramour.pull(a)[x]).split(',').join(',$1    ') + ";$1"));
        }
        return /[\:\=]/.test(a)?
          a + "function\b28\b29 " + decompile(c, 'brace').replace(/\{(\s*)/, (b == ""? "{$1": "{$1var " + argify(b) + ";$1")):
        "function " + a + "\b28\b29 " + decompile(c, 'brace').replace(/\{(\s*)/, (b == ""? "{$1": "{$1var " + argify(b)) + ";$1")
      },
      // classes
      "(\\j)\\.(\\j)\\s*(brace\\.\\d+)": function(e, a, b, c) {
        var d = b;
        return runtime.has("1.6")?
          "class " + b + " extends " + a + " " + decompile(c, 'brace')
          .replace(/([a-z\$_][\w\$]*)\s*\((.*)\)\s*(brace\.\d+)/gi, function(e, a, b, c) {
          return d + "." + a + " = function\b28\b29 " + decompile(c, 'brace').replace(/\{(\s*)/, (b == ""? "{$1": "{$1var " + argify(b) + ";$1"))
        }):
        compile("extends#" + a + ":" + b + " " + c, [a, b]);
      },
      "(\\j)\\s*(brace\\.\\d+)": function(e, a, b) {
        var d = a;
        return runtime.has("1.6")?
          "class " + a + decompile(b, 'brace')
          .replace(/([a-z\$_][\w\$]*)\s*\((.*)\)\s*(brace\.\d+)/gi, function(e, a, b, c) {
          return d + "." + a + " = function\b28\b29 " + decompile(c, 'brace').replace(/\{(\s*)/, (b == ""? "{$1": "{$1var " + argify(b) + ";$1"))
        }):
        compile("class#" + a + " " + b, [a]);
      },
      // <thans>
      "<init>\\s*(brace\\.\\d+)": function(e, a) {
        return runtime.has("1.6")?
          "constructor\b28\b29 " + decompile(a, 'brace'):
        "constructor = function\b28\b29 " + decompile(a, 'brace')
      },
      "<init>\\s*\\((.*)\\)\\s*(brace\\.\\d+)": function(e, a, b) {
        return runtime.has("1.6")?
          "constructor\b28\b29 " + decompile(b, 'brace').replace(/\{(\s*)/, "{$1var " + argify(a) + ";$1"):
        "constructor = function\b28\b29 " + decompile(b, 'brace').replace(/\{(\s*)/, "{$1var " + argify(a) + ";$1")
      },
      "(\\j)\\s*<get\\s+(\\j)>\\s*(brace\\.\\d+)": function(e, a, b, c) {
        return a + ".__defineGetter__\b28\"" + b + "\", function\b28\b29 " + c + "\b29"
      },
      "(\\j)\\s*<get\\?\\s*(\\j)>": function(e, a, b) {
        return a + ".__lookupGetter__\b28\"" + b + "\"\b29"
      },
      "(\\j)\\s*<set\\s+(\\j)>\\s*(brace\\.\\d+)": function(e, a, b, c) {
        return a + ".__defineSetter__\b28\"" + b + "\", function\b28" + b + "\b29 " + c + "\b29"
      },
      "(\\j)\\s*<set\\?\\s*(\\j)>": function(e, a, b) {
        return a + ".__lookupSetter__\b28\"" + b + "\"\b29"
      },
      // (parenthesis)
      "(\\j\\s*[\\:\\=]\\s*)?\\(([^\\(\\)\\n\\r]*?)\\)\\s*\\=>\\s*(\\j|brace\\.\\d+)": function(e, a, b, c) {
        a = a || "";
        b = b || "";
        return runtime.has("1.6")?
          a + "\b28" + b + "\b29 => " + c:
        compile("arrow#[" + a + "] [" + b + "] " + c)
      },
      "\\((!?)(\\s*\\j\\s*)\\)\\s*\\=\\s*([^;]+);": function(e, a, b, c) {
        return (a == "!"? "const ": "var ") + b.replace(/\(/g, "\b28").replace(/\)/g, "\b29").replace(/([a-z\$_][\w\$]*)/i, "$1 = " + c) + ";"
      },
      "\\((!?)(\\s*\\j.*?\\s*)\\)\\s*\\=\\s*([^;]+);": function(e, a, b, c) {
        return (a == "!"? "const ": "var ") + b.replace(/\(/g, "\b28").replace(/\)/g, "\b29").replace(/([a-z\$_][\w\$]*)(\s*,|\s*$)/gi, "$1 = " + c + "$2") + ";"
      },
      "(\\W)\\((!?)([^;]*)\\);": function(e, a, b, c) {
        return a + (b == "!"? "const ": "var ") + c.replace(/\(/g, "\b28").replace(/\)/g, "\b29") + ";"
      },
      // statements and handlers
      "->": function(e) {
        return "return"
      },
      "~>": function(e) {
        return "throw"
      },
      "@(\\j)": function(e, a) {
        return "this." + a
      },
      "@": function(e, a) {
        return "this"
      }
      /*,
      "\\bvar\\b\\s+(\\j\\s+\\j.*;)": function(e, a) {
        a = a.replace(/;/g, "").split(",");
        for(var b = [], c = [], d = [], e = "", f = 0; f < a.length; f++)
          (e = a[f].replace(/^\s+|\s+$/g, "").split(/\s/)).length > 1?
            (b.push(e[0]), c.push(e[1])):
            d.push(e[0]);

        for(var e = 0, f = []; e < b.length; e++)
          f.push(c[e] + " = \b28" + c[e] + ".constructor === " + b[e] + " || " + c[e] + ".constructor === " + b[e] + ".constructor\b29? " + c[e] + ": undefined");

        return "var " + f.join(",\n    ") + d.join(",\n    ") + ";"
      },
      "\\bvar\\b(.*\\.\\.\\..*)": function(e, a) {
        a = a.split(",");
        if(a.length == 1)
          return a.join("")
            .replace(/^\.\.\.$/, "")
            .replace(/([a-z\$_][\w\$]*)(\s+[a-z\$_][\w\$]*)\.\.\./, "var $2 = \b28$2.construstor === $1 || $2.constructor === $1.constructor\b29? $2: undefined;")
            .replace(/\.\.\.([a-z\$_][\w\$]*)(\s+[a-z\$_][\w\$]*)/, "var $2 = \b28$2.construstor === $1 || $2.constructor === $1.constructor\b29? $2: undefined;")
            .replace(/([a-z\$_][\w\$]*)?\.\.\.([a-z\$_][\w\$]*)?/, "var $1$2 = [].slice.apply(null, arguments)");

        for(var x = 0; x < a.length; x++)
          a[x] = a[x]
            .replace(/([a-z\$_][\w\$]*)(\s+[a-z\$_][\w\$]*)\.\.\./, "var $2 = \b28$2.construstor === $1 || $2.constructor === $1.constructor\b29? [].slice.apply\b28null, arguments\b29.slice\b28" + x + ", " + (a.length - x) + "\b29: undefined;")
            .replace(/\.\.\.([a-z\$_][\w\$]*)(\s+[a-z\$_][\w\$]*)/, "var $2 = \b28$2.construstor === $1 || $2.constructor === $1.constructor\b29? [].slice.apply\b28null, arguments\b29.slice\b280, " + x + "\b29: undefined;")
            .replace(/([a-z\$_][\w\$]*)\.\.\./i, "var $1 = [].slice.apply\b28null, arguments\b29.slice\b28" + x + ", " + (a.length - x) + "\b29")
            .replace(/\.\.\.([a-z\$_][\w\$]*)/i, "var $1 = [].slice.apply\b28null, arguments\b29.slice\b280, " + x + "\b29");
        return a.join(",");
      }
      */
    };

    for(var pattern in patterns)
      for(var reg = RegExp(pattern.replace(/\\j/g, "[a-zA-Z\\$_][\\w\\$]*")); reg.test(input);)
        input = input.replace(reg, patterns[pattern]);

    return input
  }

  input = compile(input);

  input = decompile(input, undefined, true);

  for(var x = 0; x < caches.kids.length; x++)
    for(var kid in caches.kids[x])
      input = input.replace(RegExp("(\\W)\\$" + kid + "(\\W)", "g"), "$1" + caches.kids[x][kid] + "$2");

  for(var x = /[\b]0x([0-9a-f]{2})[\b]/; x.test(input);)
    input = input.replace(x, "\\" + String.fromCharCode(eval("0x" + RegExp.$1)));
  for(var x = /[\b]([0-9a-f]{2})/; x.test(input);)
    input = input.replace(x, String.fromCharCode(eval("0x" + RegExp.$1)));

  for(var docket in Paramour.dockets) {
    input +=
      "\nfunction \\docket() {\n" +
      "  var args = arguments, types = Paramour.types.apply(null, arguments);\n" +
      "  switch(Paramour.types.apply(null, args)) {\n";
    for(var x = 0; x < Paramour.dockets[docket].length; x++) {
      var h, g = (function(s){
        h = s.join('_').replace(/\s+/g, "").replace(/\*/g, "Any").replace(/\.{3}/g, "Spread").replace(/([a-z\$_][\w\$]*).*$/i, "$1");
        for(var e = 0; e < s.length; e++)
          s[e] = s[e]
            .replace(/([a-z\$_][\w\$]*).*$/i, "$1")
            .replace(/\*/, function() {
              return "' + types[" + e + "] + '"
            })
            .replace(/\.{3}/, function() {
              return "' + types.slice(" + e + ", " + s.length + ") + '"
            });
        return s
      })(Paramour.pull(docket)[x]);

      input +=
        "    case '" + g + "':\n" +
        "      return " + docket + "__" + h + ".apply(null, args);\n" +
        "      break;\n";
    }
    input +=
      "    default:\n" +
      "      throw TypeError('" + docket + " (' + Paramour.types.apply(null, args) + ') is undefined')\n" +
      "      break;\n" +
      "  }\n" +
      "}\n";
    input = input.replace(/\\docket/, docket)
  }

  input += "\n// JavaScript: " + Paramour.runtime;

  input = input.replace(/\.(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|undefined|var|void|volatile|while|with|yield)\b/g, "[\"$1\"]")

  input = input.replace(errors, "");

  var p = {
    version: "1.0",
    get: {
      form: {
        data: function() {
          var e = 0, r = window.location.search + "";
          if (/\?/.test(r) === !1) return !1;
          r = r
            .replace("?", "")
            .replace(/\\("|')/g, "\\\\\\$1")
            .replace(/[^\\]("|')/g, "\\$1");
          if (!r || "" === r) return !1;
          for (var t = encodeURI(r)
               .replace(/=/g, '":"').split("&"), _ = '{"'; e < t.length - 1; e++) _ += t[e] + '","';
          _ += t[e] + '"}';
          _ = (_ + "")
            .replace(",\n", ",");
          _ = /\:/.test(_) ? _ : _.replace("}", ':""}');
          return JSON.parse(decodeURI(_));
        }
      }
    },
    storage: {
      set: function() {
        for (var e = 0, r = !1; e < arguments.length; ) {
          if (undefined !== Storage) {
            localStorage.setItem(arguments[e], arguments[e + 1]);
            e += 2;
            r = !0;
          }
          e += 2;
        }
        return r;
      },
      check: function(e) {
        return !!paramour.storage.get(e);
      },
      get: function(e) {
        return localStorage.getItem(e);
      },
      "delete": function(e) {
        localStorage.setItem(e, null);
        return !paramour.storage.check(e);
      }
    },
    attr: function(e, r, t) {
      if (e) if (!t) return e.getAttribute(r); else return "!" != t ? e.setAttribute(r, t) : e.getAttribute(r);
    },
    id: function(e, r, t) {
      if ("!" != e && e) {
        var _ = document.getElementById(e) || document.getElementById(e + " ");
        if (t) return paramour.attr(_, r, t);
        if (r) if ("$html" != r) _.innerHTML = r; else return _.innerHTML;
        return _;
      }
    },
    "class": function(e, r, t, _) {
      if ("!" != e && e) {
        var a = document.getElementsByClassName(e);
        if (!_) {
          if (t) if ("$html" != t) a[r].innerHTML = t; else return a[r].innerHTML;
          return a;
        } else paramour.attr(a[r], t, _);
      }
    },
    tag: function(e, r, t, _) {
      if ("!" != e && e) {
        var a = document.getElementsByTagName(e);
        if (!_) {
          if (t) if ("$html" != t) a[r].innerHTML = t; else return a[r].innerHTML;
          return a;
        } else paramour.attr(a[r], t, _);
      }
    },
    ele: function(e, r, t, _) {
      if ("!" != e && e) {
        var a = document.querySelectorAll(e);
        if (a.length < 2) r = 0;
        if (!_) {
          if (t) if ("$html" != t) a[r].innerHTML = t; else return a[r].innerHTML;
          return a;
        } else paramour.attr(a[r], t, _);
      }
    },
    save: function(e, r) {
      var t = window.location.pathname + "";
      r = r || t.substring(t.lastIndexOf("/") + 1, t.length) + ".cache";
      paramour.storage.set(r, e);
      return paramour.storage.check(r);
    },
    load: function(e, r) {
      e = r ? encodeURI(e) : e;
      var t = window.location.pathname + "";
      e = e || t.substring(t.lastIndexOf("/") + 1, t.length) + ".cache";
      return paramour.storage.get(e);
    },
    "delete": function(e) {
      var r = window.location.pathname + "";
      e = e || r.substring(r.lastIndexOf("/") + 1, r.length) + ".cache";
      return paramour.storage["delete"](name);
    },
    "typeof": function(e) {
      if (arguments.length > 1)
        return paramour.typeOf.apply(null, arguments);
      var r = "";
      switch (typeof e) {
        case typeof Boolean():
          r = "";
          break;

        case typeof Function():
          r = "";
          break;

        case typeof Number():
          r = "";
          break;

        case typeof Object():
          switch (e.constructor) {
            case RegExp:
              r = "";
              break;

            case Array:
              r = "[]";
              break;

            default:
              r = "{}";
          }
          break;

        case typeof String():
          r = '""';
          break;

        case typeof Symbol():
          r = [ "(@@", ")" ];
          e = e.toString();
          break;

        case "object":
          r = "";
          break;

        case "undefined":
          r = "";
          break;

        default:
          r = "";
      }
      return (r[0] || "") + e + (r[1] || "");
    },
    typeOf: function() {
      for(var e = [], r = 0; r < arguments.length && undefined !== arguments[r] && null !== arguments[r]; r++) e.push(arguments[r].__proto__.constructor.name || arguments[r].constructor.name);
      return (e + "")
        .replace(/\*/g, "ANY").toUpperCase();
    },
    random: function() {
      return Boolean(Math.round(Math.random()));
    }
  };

  for(var o in p)
    Paramour[o] = p[o];

  return input
};

println(Paramour(JAVA_STRING) + "\n/* Ephellon Dantzler - 2016 */");