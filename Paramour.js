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

  var self,
      backup = input,
      exps = [],
      errors = /(\s*var\s*;|[\b])/g,
      reserved = /\b(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|undefined|var|void|volatile|while|with|yield|[\-\+\~]>)\b/,
      operators = "~!?/%^&|*-+=<>:".split(""),
      oprs = {
        "~": "Tilde_",
        "!": "Exclamation_",
        "?": "Question_Mark_",
        "/": "Division_",
        "%": "Percent_",
        "^": "Caret_",
        "&": "And_",
        "|": "Or_",
        "*": "Asterik_",
        "-": "Subtraction_",
        "+": "Addition_",
        "=": "Equals_",
        "<": "Less_Than_",
        ">": "Greater_Than_",
        ":": "Colon_"
      },
      MULTI_LINE = [],
      SINGLE_LINE = [],
      REGEXP = [],
      DOUBLE_QUOTE = [],
      SINGLE_QUOTE = [],
      QUASI = [],
      PAREN = [],
      BRACK = [],
      BRACE = [],
      TUPLE = [],
      EMUS = [],
      PHANTOMS = [],
      patterns = {
        "DOUBLE_QUOTE": /("[^"\n\r]*?")/,
        "SINGLE_QUOTE": /('[^'\n\r]*?')/,
        "REGEXP": /(\/.*?\/[igmuy]*)/, // // -> /(?:)/
        "QUASI": /(`[^`]*?`)/,
        "MULTI_LINE": /###([\s\S]*?)###/,
        "EMUS": /#\s*@([\d\.]+)/,
        "PHANTOMS": /#\s*\$(.+)/,
        "SINGLE_LINE": /#(.*)/,
        "PAREN": /(\([^\(\)]*?\))/,
        "TUPLE": /\{\{\s*([^;]*?)\s*\}\}/,
        "BRACK": /(\[[^\[\]]*?\])/,
        "BRACE": /(\{[^\{\}]*?\})/
      };

  PHANTOMS.kids = [];

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
    return y.join(',')
  };

  Paramour.pull = function(func) {
    return Paramour.dockets[func]
  };

  Paramour.push = function(func, args) {
    for(var k = /(^\s*|,\s*)([a-z\$-][\w\$]*\.{0,3})\s*(,|$)/i; k.test(args);)
      args = args.replace(k, "$1* $2$3");
    func = func.name || func;
    Paramour.dockets[func] = (Paramour.dockets[func] === undefined || Paramour.dockets[func].length === undefined || Paramour.dockets[func].length === 0)? []: Paramour.dockets[func];
    return Paramour.dockets[func].push(args.replace(/(\*|\.{3}|[a-z\$_][\w\$]*)\s+([a-z\$_][\w\$]*\.{0,3})/gi, "$1").split(/,\s*/));
  };

  var Tuple =
  window.Tuple =
  Paramour.Tuple =
  function() {
    Tuple.__defineGetter__("constructor", function() {
      return Tuple
    });
    var c = {
      'index': 0,
      'arguments': [],
      'TupleArray': []
    };
    Tuple.tuples = Tuple.tuples || [];
    Tuple.__defineGetter__("constructor", function() {
      return Function
    });

    for(var x = 0; x < arguments.length; x++) {
      c['TupleArray'].push(arguments[x]);
      c['arguments'].push(arguments[x].constructor.name || arguments.constructor);
    }
    c['arguments'] = c['TupleArray'];

    if(Tuple['tuples'][c.arguments] !== undefined)
      return Tuple['tuples'][c.arguments].TupleIterator;

    var TupleItem = c, TupleIndex = c.index;

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

  var Operator =
  window.Operator =
  Paramour.Operator =
  function(o, t, f, n, r) {
    Operator.__defineGetter__("constructor", function() {
      return Operator
    });
    Operator.kids = Operator.kids || {};
    Operator.kids[o] = {
      "operator": o,
      "argument-types": t,
      "fix": f,
      "function": n,
      "BRACE": r
    };
  }

  for(var x = /(\n\r\t)/; x.test(input);)
    input = input.replace(x, function(e) {
      return "\\" + ({
        "\n": "n",
        "\r": "r",
        "\t": "t"
      }[e])
    });

  for(var pattern in patterns)
    exps.push(pattern);

  function argify(args, types) {
    types = (types || []).join(",").replace(/\s/g, "").split(",");
    if(typeof args == 'string')
      args = args.split(',');
    for(var x = 0, y = []; x < args.length; x++)
      y.push(args[x]
             .replace(/^\s*([a-z\$_][\w\$]*)\s*\=\s*(.*)$/i, (types[x] === "Spread"? "$1 = [].slice.call(null\b0x2c\b arguments).slice(" + x + "\b0x2c\b arguments.length - 1) || $2": "$1 = arguments[" + x + "] || $2"))
             .replace(/^\s*([a-z\$_][\w\$]*)\s*$/i, (types[x] === "Spread"? "$1 = [].slice.call(null\b0x2c\b arguments).slice(" + x + "\b0x2c\b arguments.length - 1)": "$1 = arguments[" + x + "]"))
            .replace(/\$/g, "\b$\b"));
    return y.join(',')
  }

  // get rid of everything before staring Paramour
  function unhandle(string, type) {
    if(type === undefined)
      type = exps;
    else if(typeof type === "string")
      type = type.split(/\s|,/);
    for(var pattern in patterns) {
      if(RegExp(type.join("|")).test(pattern)) {
        for(var l, k = patterns[pattern]; k.test(string);) {
          l = (eval("(window." + pattern + " = " + pattern + ")")).push(RegExp.$1) - 1;
          string = string.replace(k, pattern + "." + l);
        }
      }
    }
    return string
  }

  input = unhandle(input);

  for(var x = /\\([^\d\$])/; x.test(input);)
    input = input.replace(x, function(e, a) {
      return "\b0x" + a.charCodeAt(0).toString(16) + "\b"
    });

  for(var x = /([\$\\])([\d\$])/; x.test(input);)
    input = input.replace(x, function(e, a, b) {
      return a + "\b0x" + b.charCodeAt(0).toString(16) + "\b"
    });

  for(var x = 0; x < EMUS.length; x++)
    runtime.emulate(EMUS[x]);

  function handle(type, index) {
    var spil = eval(type)[index].replace(/\$/g, "\b$\b");
    switch(type) {
      case 'MULTI_LINE':
        return '/*' + spil + '*/';
        break;
      case 'EMUS':
        return '// JavaScript Emulation from "' + runtime.original + '" to "' + spil + '"'
        break;
      case 'PHANTOMS':
        var r = /\->/, s = /\=>/, o = {};
        var R = spil.replace(/[\b]/g, "").split(/\s*\->\s*/), S = spil.replace(/[\b]/g, "").split(/\s*\=>\s*/);
        if(r.test(spil))
          PHANTOMS.kids.push((o[R[0]] = R[1], o));
        else if(s.test(spil))
          PHANTOMS.kids.push((o[S[0]] = eval(S[1]), o));
        return '// ' + spil;
        break;
      case 'SINGLE_LINE':
        return '//' + spil;
        break;
      case 'QUASI':
        return runtime.has("1.6")?
          spil:
        "'" + spil.replace(/[\b]\$[\b]\{([^\{\}`]*)\}/g, "' + ($1) + '").replace(/\b0x(.+?)\b/g, "\b\\0x$1\b").replace(/\n/g, "").replace(/^`|`$/g, "").replace(/^''\s*\+|\+\s*''$/g, "").replace(/'/g, "\\'") + "'";
        break;
      case 'TUPLE':
        return "Tuple(" + spil + ")";
        break;
      case 'REGEXP':
        return spil.replace(/\b0x(.+?)\b/g, "\b\\0x$1\b").replace(/^\/\/$/, "/(?:)/");
        break;
      case 'SINGLE_QUOTE':
        return spil.replace(/[\b]\$[\b]\{([^\{\}']*)\}/g, "' + ($1) + '").replace(/^''\s*\+|\+\s*''$/g, "").replace(/\b0x(.+?)\b/g, "\b\\0x$1\b");
        break;
      case 'DOUBLE_QUOTE':
        return spil.replace(/[\b]\$[\b]\{([^\{\}"]*)\}/g, '" + ($1) + "').replace(/^""\s*\+|\+\s*""$/g, "").replace(/\b0x(.+?)\b/g, "\b\\0x$1\b");
        break;
      default:
        return compile(spil);
        break;
    }
    return input;
  }

  function decompile(input, expressions, all) {
    var max = Infinity;
    if(typeof all === "number")
      max = all;
    expressions =
      (expressions === undefined || all === true)?
      exps:
    (expressions.constructor === Array)?
      expressions:
    [expressions];
    for(var expression = RegExp("(" + expressions.join("|") + ")\\.(\\d+)"); expression.test(input) && max > 0; max--)
      input = input.replace(expression, handle(RegExp.$1, +RegExp.$2));
    return input
  }

  function strip(string) {
    return (string || "").replace(/^\(|\)/g, "")
  }

  function hand(string, def) {
    var o, m = ["", "Double_", "Triple_", "Quadruple_"], l = oprs,
        n = function(v, t) {
          if(+v + "" !== "NaN") {
            return m[v] + t
          } else if(/^([~\!\?\/%\^\&\|\*\-\+\=<>\:])\1*$/.test(v)) {
            v = v.length - 1;
            return m[v] + t
          } else {
            if(v == undefined)
              return;
            v = v.split("");
            v.push("");
            for(var x = 0, y = {}; x < v.length; x++) {
              y[v[x]] = y[v[x]] == undefined && v[x] != ""? 0: y[v[x]];
              if(v[x] === v[x + 1]) {
                y[v[x]]++;
                continue
              }
            }
            var z = [];
            for(var o in y)
              z.push(n(y[o], l[o]));
            return z.join("");
          }
        };
    for(var s in l)
      if(RegExp("^([\\" + s + "][~\\!\\?\\/%\\^\\&\\|\\*\\-\\+\\=<>\\:]{0,3})").test(string))
        string = string.replace(RegExp("^\\" + (o = RegExp.$1) + "(.*)$"), n(o, l[s]) + "Prefix_Operator($1)");
      else if(RegExp("([\\" + s + "][~\\!\\?\\/%\\^\\&\\|\\*\\-\\+\\=<>\\:]{0,3})$").test(string))
        string = string.replace(RegExp("^(.*)\\" + (o = RegExp.$1) + "$"), n(o, l[s]) + "Suffix_Operator($1)");
      else if(RegExp("([\\" + s + "][~\\!\\?\\/%\\^\\&\\|\\*\\-\\+\\=<>\\:]{0,3})").test(string))
        string = string.replace(RegExp("^(.*)\\" + (o = RegExp.$1) + "(.*)$"), n(o, l[s]) + "Operator($1, $2)");
    if(def !== undefined && /(prefix|suffix|media)-/.test(def)) {
      def.replace(/^(\w)/, "");
      def = def.replace(/^(\w)/, RegExp.$1.toUpperCase()).replace(/-$/, "_");
      string = string.replace(/(Pre|Suf)fix_/, (def != "Media_")? def: "");
    }
    return string.replace(/[~\!\?\/%\^\&\|\*\-\+\=<>\:]/g, "")
  }

  function compile(input, args) {
    var patterns = {
      // rehandlers
      "class#(\\j)\\s*(BRACE)\\.(\\d+)": function(e, a, b, c) {
        return "function \b" + a + "()\b " + eval(b)[+c]
          .replace(/<init>\s*(PAREN\.\d+)?\s*(BRACE\.\d+)/, function(e, _a, _b) {
          return "constructor#" + a + " [" + _a + "] [true] " + _b
        })
          .replace(/([a-z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/gi, "prototype#" + a + ":$1 [$2] $3")
          .replace(/(\s*)\}$/, "\n  " + a + ".this <get constructor> BRACE." + (BRACE.push("{\n    -> " + a + ";\n  }") - 1) + "\n  " + a + ".this <set constructor> BRACE." + (BRACE.push("{\n    -> " + a + ", constructor;\n  }") - 1) + "\n  -> " + a + ".this;\n}")
      },
      "extends#(\\j)\\:(\\j)\\s*(BRACE)\\.(\\d+)": function(e, a, b, c, d) {
        return "function \b" + b + "()\b " + eval(c)[+d]
          .replace(/<init>\s*(PAREN\.\d+)\s*(BRACE\.\d+)/, function(_e, _a, _b) {
          return "constructor#" + b + " [" + _a + "] [false] " + _b
        })
          .replace(/\{(\s*)/, "{$1" + b + ".super = " + a + ";$1" + b + ".this = " + a + ".apply(null, arguments) || {};$1")
          .replace(/([a-z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/gi, "prototype#" + b + ":$1 [$2] $3")
          .replace(/(\s*)\}$/, "\n  " + b + ".this <get constructor> BRACE." + (BRACE.push("{\n    -> " + b + ";\n  }") - 1) + "\n  " + b + ".this <set constructor> BRACE." + (BRACE.push("{\n    -> " + b + ", constructor;\n  }") - 1) + "\n  -> " + b + ".this;\n}")
      },
      "constructor#(\\j)\\s*\\[(PAREN\\.\\d+)?\\]\\s*\\[(true|false)\\]\\s*(BRACE\\.\\d+)": function(e, a, b, c, d) {
        b = b != undefined? strip(decompile(b, 'PAREN')): "";
        return (eval(c)? a + ".this = {};\n  ": "") + a + ".constructor = function() " + decompile(d, 'BRACE').replace(/\{(\s*)/, (b == "")? "{$1": "{$1var " + argify(strip(decompile(b, 'PAREN'))) + ";$1").replace(/\b(@|this|super)\b/g, a + ".$1") + ";\n  " + a + ".constructor.apply(null, arguments);"
      },
      "prototype#(\\j)\\:(\\j)\\s*\\[(.*)\\]\\s*(BRACE\\.\\d+)": function(e, a, b, c, d) {
        c = strip(decompile(c, 'PAREN'));
        return a + ".this." + b + " = function() " + decompile(d, 'BRACE').replace(/\{(\s*)/, "{$1var " + argify(strip(decompile(c, 'PAREN'))) + ";$1")
      },
      "arrow#\\[(.*)\\]\\s*\\[(.*)\\]\\s*(BRACE\\.\\d+|\\j\\#?)": function(e, a, b, c, d) {
        if(/^BRACE\.\d+/.test(c))
          return a + "function() " + decompile(c, 'BRACE').replace(/\{(\s*)/, "{$1var " + argify(strip(decompile(b, 'PAREN'))) + ";$1return\b ");
        else
          return a + "function() {var " + argify(strip(decompile(b, 'PAREN'))) + "; return " + decompile(c).replace(d, "") + "}";
      },
      // reserved words
      // statement {}
      "\\b(do|else|finally|return|try|typeof|while)\\s*(BRACE\\.\\d+)": function(e, a, b) {
        return "\b" + a + "\b \b" + b + "\b"
      },
      // statement () {}
      "\\b(catch|for|function|if|switch|while|with|\\.\\j)\\s*(PAREN\\.\\d+)": function(e, a, b) {
        return "\b" + a + "\b" + b + "\b"
      },
      "(\\s*)case\\s*(PAREN\\.\\d+)\\s*(BRACE\\.\\d+)": function(e, a, b, c) {
        var f = [a || ""];
        b = strip(decompile(b, 'PAREN')).split(/,|\s+/);
        for(var x = 0; x < b.length; x++)
          if(!/^\s*$/.test(b[x]))
            f.push(a + "case " + b[x] + ":");
        return f.join("") + decompile(c, 'BRACE').replace(/^\{/, "").replace(/\}$/, a + "  break;")
      },
      "(\\s*)default\\s*(PAREN\\.\\d+)?\\s*(BRACE\\.\\d+)": function(e, a, b, c) {
        var f = [a || ""];
        b = strip(decompile(b, 'PAREN')).split(/,|\s+/);
        for(var x = 0; x < b.length; x++)
          if(!/^\s*$/.test(b[x]))
            f.push(a + "case " + b[x] + ":");
        f.push(a + "default:");
        return f.join("") + decompile(c, 'BRACE').replace(/^\{/, "").replace(/\}$/, a + "  break;")
      },
      // functions
      "(\\j\\s*[\\:\\=]?\\s*)(PAREN\\.\\d+)\\s*(BRACE\\.\\d+)": function(e, a, b, c) {
        var r = /(\*|\.{3}|[a-z\$_][\w\$]*)\s+([a-z\$_][\w\$]*\.{0,3})/gi, s, t, x;
        b = strip(decompile(b, 'PAREN')).replace(/[\b]/g, "").replace(/^(.*)\(/, "").replace(/\)(.*)$/, "");
        if(r.test(b)) {
          x = Paramour.push(a, b) - 1;
          s = Paramour.pull(a)[x].join('_').replace(/\s+/g, "").replace(/\*/g, "Any").replace(/\.{3}/g, "Spread");
          t = Paramour.pull(a)[x].join(',').replace(/\s+/g, "").replace(/\*/g, "Any").replace(/\.{3}/g, "Spread").split(',');
          return "function " + a + "__" + s.replace(/([a-z\$_][\w\$]*).*$/i, "$1") + "() " + decompile(c, 'BRACE').replace(/\{(\s*)/, (/^\s*$/.test(b)? "{$1": "{$1var " + argify(b.replace(r, "$2"), t).split(/,\s*/).join(',$1    ') + ";$1"));
        }
        return /[\:\=]/.test(a)?
          a + "function() " + decompile(c, 'BRACE').replace(/\{(\s*)/, (b == ""? "{$1": "{$1var " + argify(strip(decompile(b, 'PAREN'))) + ";$1")):
        "function " + a + "() " + decompile(c, 'BRACE').replace(/\{(\s*)/, (b == ""? "{$1": "{$1var " + argify(strip(decompile(b, 'PAREN')))) + ";$1")
      },
      // classes
      "(\\j)\\.(\\j)\\s*(BRACE\\.\\d+)": function(e, a, b, c) {
        if(runtime.has("1.6")) {
          c = unhandle(strip(decompile(c, 'BRACE')));
          for(var k = /function\s+([a-z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/i; k.test(c);) {
            c = c.replace(k, function(_e, _a, _b, _c) {
              return "\b" + _a + "\b" + _b + " \b" + _c + "\b"
            })
          }
          return "class " + b + " extends " + a + " {" + c + "}"
        }
        return compile("extends#" + a + ":" + b + " " + c);
      },
      "(\\j)\\s*(BRACE\\.\\d+)": function(e, a, b) {
        var d = a;
        if(runtime.has("1.6")) {
          b = unhandle(decompile(b, 'BRACE').replace(/^\{|\}$/g, ""));
          for(var k = /function\s+([a-z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/i; k.test(b);) {
            b = b.replace(k, function(_e, _a, _b, _c) {
              return "\b" + _a + "\b" + _b + " \b" + _c + "\b"
            })
          }
          return "class " + a + " {" + (b) + "}"
        }
        return compile("class#" + a + " " + b, [a]);
      },
      // <thans>
      "<init>\\s*(BRACE\\.\\d+)": function(e, a) {
        return runtime.has("1.6")?
          "constructor() " + decompile(a, 'BRACE'):
        "constructor = function() " + decompile(a, 'BRACE')
      },
      "<init>\\s*(PAREN\\.\\d+)\\s*(BRACE\\.\\d+)": function(e, a, b) {
        a = strip(decompile(a, 'PAREN'));
        return runtime.has("1.6")?
          "constructor() " + decompile(b, 'BRACE').replace(/\{(\s*)/, "{$1var " + argify(strip(decompile(a, 'PAREN'))) + ";$1"):
        "constructor = function() " + decompile(b, 'BRACE').replace(/\{(\s*)/, "{$1var " + argify(strip(decompile(a, 'PAREN'))) + ";$1")
      },
      "(\\j)\\s*<proto\\s+(\\j)>\\s*(BRACE\\.\\d+)": function(e, a, b, c) {
        return a + ".prototype." + b + " = function() " + c
      },
      "(\\j)\\s*<get\\s+(\\j)>\\s*(BRACE\\.\\d+)": function(e, a, b, c) {
        return a + ".__defineGetter__(\"" + b + "\", function() " + c + ")"
      },
      "(\\j)\\s*<get\\?\\s*(\\j)>": function(e, a, b) {
        return a + ".__lookupGetter__(\"" + b + "\")"
      },
      "(\\j)\\s*<set\\s+(\\j)>\\s*(BRACE\\.\\d+)": function(e, a, b, c) {
        return a + ".__defineSetter__(\"" + b + "\", function(" + b + ") " + c + ")"
      },
      "(\\j)\\s*<set\\?\\s*(\\j)>": function(e, a, b) {
        return a + ".__lookupSetter__(\"" + b + "\")"
      },
      "<(prefix-|suffix-|media-)?operator\\s+([~\\!\\?\\/%\\^\\&\\|\\*\\-\\+\\=<>\\:]{1,4}|\\j)\\s*(BRACK\\.\\d+)?>\\s*(BRACE\\.\\d+)": function(e, a, b, c, d) {
        a = a || "media-";
        c = decompile(c, 'BRACK');
        var r = /[a-z\$_][\w\$]*/i.test(b), s = "";
        switch(a) {
          case "prefix-":
            c = c || "Any";
            s = "Prefix_";
            break;
          case "media-":
            c = c || "Any, Any";
            break;
          case "suffix-":
            c = c || "Any";
            s = "Suffix_";
            break;
        }
        // ~!?/%^&|*-+=<>:

        var n = [], f = "", g = [];
        c = c.replace(/^\[\s*|\s*\]$/g, "").split(/;/);

        n.push(hand(b, a).replace(/\(\)$/, ""));

        if(c.length > 1)
          for(var x = 0; x < c.length; x++)
            g.push(c[x].split(/,\s*/));
        else
          g.push(c[0].split(/,\s*/));

        for(var x = 0; x < g.length; x++) {
          for(var y = 0; y < g[x].length; y++)
            g[x][y] = g[x][y].replace(/^\s*(\*|\.{3}|[a-z\$\_][\w\$]*)/i, "$1 \b$\b" + (y + 1));
          g[x] = g[x].join(", ")
        }

        f = n.join("") + "PAREN." + (PAREN.push("(" + (g.join(", ")) + ")") - 1) + " " + d;
        Operator(b, c, a, decompile(f), r);
        return compile(f)
      },
      "\\->": function(e) {
        return "return"
      },
      "~>": function(e) {
        return "throw"
      },
      "\\+>": function(e) {
        return "throw new"
      },
      "(\\j)?\\s*\\=>\\s*([~\\!\\?\\/%\\^\\&\\|\\*\\-\\+\\=<>\\:]+)?\\s*(PAREN\\.\\d+)\\s*([~\\!\\?\\/%\\^\\&\\|\\*\\-\\+\\=<>\\:]+)?": function(e, a, b, c, d) {
        var history = [];
        a = a || "";

        for(var k = /^(.*)(PAREN\.\d+|[~\!\?\/%\^\&\|\*\-\+\=<>\:]+)(.*)$/, j; k.test(c);) {
          j = c.replace(k, function(e, _a, _b, _c) {
            c = unhandle(decompile(_b, 'PAREN').replace(/^\(|\)$/g, ""), 'PAREN');
            c.replace(/([~\!\?\/%\^\&\|\*\-\+\=<>\:]+)/);
            var _d = RegExp.$1, _e;
            if(Operator.kids !== undefined && (_e = Operator.kids[_d]) !== undefined)
              history.push(c = _a + hand(c, _e.fix) + _c);
            else {
              for(var p = RegExp("(\\" + _d[0] + ")"); p.test(c);)
                c = c.replace(p, "\b0x" + RegExp.$1.charCodeAt(0).toString(16) + "\b");
              history.push(c = _a + c + _c);
            }
            return c
          });
        }

        return (a == ""? "": reserved.test(a)? a + " ": a + " = ") + hand((b || "") + history.reverse()[0] + (d || ""))
      },
      "\\b(un)?defined\\s+(\\j)": function(e, a, b) {
        return (a == "un")?
          "(" + b + " === undefined || " + b + " === null)":
        "(" + b + " !== undefined && " + b + " !== null)"
      },
      // (parenthesis)
      "(\\j\\s*[\\:\\=]\\s*)?(PAREN\\.\\d+)\\s*\\=>\\s*(BRACE\\.\\d+|\\j\\#?)": function(e, a, b, c, d) {
        a = a || "";
        return runtime.has("1.6")?
          a + "(" + strip(decompile(b, 'PAREN')) + ") => " + compile(decompile(c).replace(d, "")):
        compile("arrow#[" + a + "] [" + b + "] " + unhandle(decompile(c).replace(d, "")))
      },
      // custom operators
      "(\\j\\#?)(\\s+)(\\j\\#?)": function(e, a, b, c, d, f) {
        var o, p, r = "prefix-", s = "suffix-";
        if(reserved.test(a) || reserved.test(d))
          return decompile(a).replace(b, "") + "\b" + c + "\b" + compile(decompile(d).replace(f, ""));
        if(Operator.kids !== undefined)
          if((o = Operator.kids[a]) !== undefined || (p = Operator.kids[d]) !== undefined)
            if(o.fix == s || p.fix == r)
              return a + "(" + d + ")";
            else if(o.fix == r || p.fix == s)
              return d + "(" + a + ")";
        return decompile(a).replace(b, "") + "(" + compile(decompile(d).replace(f, "")) + ")"
      },
      "(\\j\\#?)(\\s+)(\\j)(\\s+)(\\j\\#?)": function(e, a, b, c, d, f, g, h) {
        var o, p, q, r = "prefix-", s = "suffix-", t = "media-";
        if(reserved.test(a) || reserved.test(d) || reserved.test(g))
          return decompile(a).replace(b, "") + c + "\b" + d + "\b" + f + compile(decompile(g).replace(h, ""));
        if(Operator.kids !== undefined)
          if((o = Operator.kids[a]) !== undefined || (p = Operator.kids[d]) !== undefined || (q = Operator.kids[g]) !== undefined)
            if(o.fix == s || q.fix == r)
              return a + "(" + d + ", " + g + ")";
            else if(o.fix == r || q.fix == s)
              return g + "(" + a + ", " + d + ")";
            else if(p.fix == t)
              return d + "(" + a + ", " + g + ")";
        return decompile(a).replace(b, "") + c + "\b" + d + "\b" + f + compile(decompile(g).replace(h, ""))
      },
      // variables
      "var\\s*(PAREN\\.\\d+)([\\x20\\t]*[\\:\\=][\\x20\\t]*.+)?": function(e, a, b) {
        var c;
        b = b || "";
        b = b.replace(/;$/, "").replace(/^\s*([\:\=])\s*/, "");
        c = RegExp.$1;
        return (c == ":"? "const ": "var ") + strip(decompile(a, 'PAREN')).replace(/(^\s*|,\s*)([a-z\$_][\w\$]*)(\s*,|\s*$)/gi, b == ""? "$1$2$3": "$1$2 = " + b + "$3").replace(/(^\s*|,\s*)([a-z\$_][\w\$]*)(\s*,|\s*$)/gi, b == ""? "$1$2$3": "$1$2 = " + b + "$3") + ";"
      },
      // statements and handlers
      "@(\\j)\\#?": function(e, a, b) {
        if(b != undefined && /^[A-Z]+$/.test(b))
          return "this" + a + b
        else if(b != undefined)
          return "this." + a + b
        else
          return "this." + a
      },
      "@": function(e, a) {
        return "this"
      },
      "(\\j)\\s*(PAREN\\.\\d+)": function(e, a, b) {
        return a + decompile(b, 'PAREN')
      }
    };

    for(var pattern in patterns) {
      var reg = pattern
      .replace(/\\j/g, "[a-zA-Z\\$_][\\w\\$]*")
      .replace(/\\s/g, "[\\x20\\t ]")
      .replace(/\\#/g, "(\\.\\d+)");
      for(var k = /\$\{([^\}]+?)\}/; k.test(reg);)
        reg = reg.replace(k, function(e, a) {
          return eval(a)
        });
      input = unhandle(input, 'DOUBLE_QUOTE SINGLE_QUOTE REGEXP QUASI MULTI_LINE EMUS PHANTOMS SINGLE_LINE');
      for(reg = RegExp(reg); reg.test(input);) {
        // ((self.caller || function(){}).name || "anonymous", RegExp.$_)
        input = input.replace(reg, (self = patterns[pattern], self.name = pattern, self))
        // console.log(self.name, ((self.caller || function(){}).name || "anonymous"), RegExp.$_)
      }
    }

    return input
  }

  input = compile(input);

  input = decompile(input, undefined, true);

  for(var x = /[\b]0x([0-9a-f]{1,2})[\b]/; x.test(input);)
    input = input.replace(x, String.fromCharCode(eval("0x" + RegExp.$1)));
  for(var x = /[\b]([0-9a-f]{1,2})[\b]/; x.test(input);)
    input = input.replace(x, String.fromCharCode(eval("0x" + RegExp.$1)));

  for(var x = 0; x < PHANTOMS.kids.length; x++)
    for(var kid in PHANTOMS.kids[x])
      input = input.replace(RegExp("(\\W)[\\b]\\$[\\b]" + kid + "(\\W)", "g"), "$1" + (PHANTOMS.kids[x][kid] + "").replace(/\$/g, "\b$\b") + "$2");

  for(var docket in Paramour.dockets) {
    input +=
      "\nfunction \\docket() {\n" +
      "  var args = arguments, types = Paramour.types.apply(null, arguments);\n" +
      "  switch(types) {\n";
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
              return "' + types.slice(" + e + ", args.length - 1) + '"
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
      "      throw TypeError('" + docket + " (' + types + ') is undefined')\n" +
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