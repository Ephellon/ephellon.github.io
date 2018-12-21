function log() {
    // window.console && ("function" == typeof console.log.apply ? console.log.apply(console, arguments) : console.log(Array.prototype.slice.call(arguments)))
}
function getUrlParam(t) {
    var e = new RegExp("[?|&]" + t + "=([^&;]+?)(&|#|;|$)")
        .exec(window.location.search);
    if(e) {
        var n = decodeURIComponent(e[1]);
        return log(t + ": " + n), n
    }
}
function sendAnalyticsEvent(t, e, n) {
//     n = n || host, ga("send", "event", t, e, n)
}
function findBestConnection(t) {
    timestamp = (new Date)
        .getTime();
    var e = $.Deferred(),
        n = t.split(","),
        r = {
            pendingRequests: {},
            success: !1,
            deferred: e
        };
    for(var i in n) createImageRequest(r, n[i]);
    return 0 == n.length && r.deferred.reject(), r.deferred.promise()
}
function createCorsRequest(t, e) {
    var n = "http://" + e + "/security";
    t.pendingRequests[e] = $.ajax({
        type: "GET",
        timeout: 4e3,
        accepts: "application/xml",
        url: n,
        success: function () {
            t.deferred.resolve(e), t.success = !0, delete t.pendingRequests[e];
            for(var n in t.pendingRequests) t.pendingRequests[n].abort()
        },
        error: function () {
            delete t.pendingRequests[e], 0 == t.success && $.isEmptyObject(t.pendingRequests) && t.deferred.reject()
        }
    })
}
function createImageRequest(t, e) {
    var n = "http://" + e + "/web/img/blank.png?t=" + timestamp,
        r = new Image;
    r.onload = function () {
        t.deferred.resolve(e), t.success = !0, delete t.pendingRequests[e];
        for(var n in t.pendingRequests) {
            var r = t.pendingRequests[n];
            r.onload = r.onerror = r.onabort = $.noop, r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", delete r
        }
        t.pendingRequests = {}
    }, r.onabort = r.onerror = function () {
        r.onload = r.onabort = r.onerror = $.noop, delete t.pendingRequests[e], !t.success && $.isEmptyObject(t.pendingRequests) && t.deferred.reject()
    }, r.src = n, t.pendingRequests[e] = r
}(function () {
    var t = this,
        e = t._,
        n = {},
        r = Array.prototype,
        i = Object.prototype,
        s = Function.prototype,
        o = r.push,
        a = r.slice,
        u = r.concat,
        c = i.toString,
        l = i.hasOwnProperty,
        h = r.forEach,
        f = r.map,
        d = r.reduce,
        p = r.reduceRight,
        v = r.filter,
        g = r.every,
        m = r.some,
        y = r.indexOf,
        b = r.lastIndexOf,
        w = Array.isArray,
        _ = Object.keys,
        x = s.bind,
        k = function (t) {
            return t instanceof k ? t : this instanceof k ? void(this._wrapped = t) : new k(t)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = k), exports._ = k) : t._ = k, k.VERSION = "1.4.4";
    var E = k.each = k.forEach = function (t, e, r) {
        if(null != t)
            if(h && t.forEach === h) t.forEach(e, r);
            else if(t.length === +t.length) {
            for(var i = 0, s = t.length; i < s; i++)
                if(e.call(r, t[i], i, t) === n) return
        } else
            for(var o in t)
                if(k.has(t, o) && e.call(r, t[o], o, t) === n) return
    };
    k.map = k.collect = function (t, e, n) {
        var r = [];
        return null == t ? r : f && t.map === f ? t.map(e, n) : (E(t, function (t, i, s) {
            r[r.length] = e.call(n, t, i, s)
        }), r)
    };
    var T = "Reduce of empty array with no initial value";
    k.reduce = k.foldl = k.inject = function (t, e, n, r) {
        var i = arguments.length > 2;
        if(null == t && (t = []), d && t.reduce === d) return r && (e = k.bind(e, r)), i ? t.reduce(e, n) : t.reduce(e);
        if(E(t, function (t, s, o) {
                i ? n = e.call(r, n, t, s, o) : (n = t, i = !0)
            }), !i) throw new TypeError(T);
        return n
    }, k.reduceRight = k.foldr = function (t, e, n, r) {
        var i = arguments.length > 2;
        if(null == t && (t = []), p && t.reduceRight === p) return r && (e = k.bind(e, r)), i ? t.reduceRight(e, n) : t.reduceRight(e);
        var s = t.length;
        if(s !== +s) {
            var o = k.keys(t);
            s = o.length
        }
        if(E(t, function (a, u, c) {
                u = o ? o[--s] : --s, i ? n = e.call(r, n, t[u], u, c) : (n = t[u], i = !0)
            }), !i) throw new TypeError(T);
        return n
    }, k.find = k.detect = function (t, e, n) {
        var r;
        return A(t, function (t, i, s) {
            if(e.call(n, t, i, s)) return r = t, !0
        }), r
    }, k.filter = k.select = function (t, e, n) {
        var r = [];
        return null == t ? r : v && t.filter === v ? t.filter(e, n) : (E(t, function (t, i, s) {
            e.call(n, t, i, s) && (r[r.length] = t)
        }), r)
    }, k.reject = function (t, e, n) {
        return k.filter(t, function (t, r, i) {
            return !e.call(n, t, r, i)
        }, n)
    }, k.every = k.all = function (t, e, r) {
        e || (e = k.identity);
        var i = !0;
        return null == t ? i : g && t.every === g ? t.every(e, r) : (E(t, function (t, s, o) {
            if(!(i = i && e.call(r, t, s, o))) return n
        }), !!i)
    };
    var A = k.some = k.any = function (t, e, r) {
        e || (e = k.identity);
        var i = !1;
        return null == t ? i : m && t.some === m ? t.some(e, r) : (E(t, function (t, s, o) {
            if(i || (i = e.call(r, t, s, o))) return n
        }), !!i)
    };
    k.contains = k.include = function (t, e) {
        return null != t && (y && t.indexOf === y ? t.indexOf(e) != -1 : A(t, function (t) {
            return t === e
        }))
    }, k.invoke = function (t, e) {
        var n = a.call(arguments, 2),
            r = k.isFunction(e);
        return k.map(t, function (t) {
            return(r ? e : t[e])
                .apply(t, n)
        })
    }, k.pluck = function (t, e) {
        return k.map(t, function (t) {
            return t[e]
        })
    }, k.where = function (t, e, n) {
        return k.isEmpty(e) ? n ? null : [] : k[n ? "find" : "filter"](t, function (t) {
            for(var n in e)
                if(e[n] !== t[n]) return !1;
            return !0
        })
    }, k.findWhere = function (t, e) {
        return k.where(t, e, !0)
    }, k.max = function (t, e, n) {
        if(!e && k.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.max.apply(Math, t);
        if(!e && k.isEmpty(t)) return -(1 / 0);
        var r = {
            computed: -(1 / 0),
            value: -(1 / 0)
        };
        return E(t, function (t, i, s) {
            var o = e ? e.call(n, t, i, s) : t;
            o >= r.computed && (r = {
                value: t,
                computed: o
            })
        }), r.value
    }, k.min = function (t, e, n) {
        if(!e && k.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.min.apply(Math, t);
        if(!e && k.isEmpty(t)) return 1 / 0;
        var r = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return E(t, function (t, i, s) {
            var o = e ? e.call(n, t, i, s) : t;
            o < r.computed && (r = {
                value: t,
                computed: o
            })
        }), r.value
    }, k.shuffle = function (t) {
        var e, n = 0,
            r = [];
        return E(t, function (t) {
            e = k.random(n++), r[n - 1] = r[e], r[e] = t
        }), r
    };
    var $ = function (t) {
        return k.isFunction(t) ? t : function (e) {
            return e[t]
        }
    };
    k.sortBy = function (t, e, n) {
        var r = $(e);
        return k.pluck(k.map(t, function (t, e, i) {
                return {
                    value: t,
                    index: e,
                    criteria: r.call(n, t, e, i)
                }
            })
            .sort(function (t, e) {
                var n = t.criteria,
                    r = e.criteria;
                if(n !== r) {
                    if(n > r || void 0 === n) return 1;
                    if(n < r || void 0 === r) return -1
                }
                return t.index < e.index ? -1 : 1
            }), "value")
    };
    var P = function (t, e, n, r) {
        var i = {},
            s = $(e || k.identity);
        return E(t, function (e, o) {
            var a = s.call(n, e, o, t);
            r(i, a, e)
        }), i
    };
    k.groupBy = function (t, e, n) {
        return P(t, e, n, function (t, e, n) {
            (k.has(t, e) ? t[e] : t[e] = [])
            .push(n)
        })
    }, k.countBy = function (t, e, n) {
        return P(t, e, n, function (t, e) {
            k.has(t, e) || (t[e] = 0), t[e]++
        })
    }, k.sortedIndex = function (t, e, n, r) {
        n = null == n ? k.identity : $(n);
        for(var i = n.call(r, e), s = 0, o = t.length; s < o;) {
            var a = s + o >>> 1;
            n.call(r, t[a]) < i ? s = a + 1 : o = a
        }
        return s
    }, k.toArray = function (t) {
        return t ? k.isArray(t) ? a.call(t) : t.length === +t.length ? k.map(t, k.identity) : k.values(t) : []
    }, k.size = function (t) {
        return null == t ? 0 : t.length === +t.length ? t.length : k.keys(t)
            .length
    }, k.first = k.head = k.take = function (t, e, n) {
        if(null != t) return null == e || n ? t[0] : a.call(t, 0, e)
    }, k.initial = function (t, e, n) {
        return a.call(t, 0, t.length - (null == e || n ? 1 : e))
    }, k.last = function (t, e, n) {
        if(null != t) return null == e || n ? t[t.length - 1] : a.call(t, Math.max(t.length - e, 0))
    }, k.rest = k.tail = k.drop = function (t, e, n) {
        return a.call(t, null == e || n ? 1 : e)
    }, k.compact = function (t) {
        return k.filter(t, k.identity)
    };
    var j = function (t, e, n) {
        return E(t, function (t) {
            k.isArray(t) ? e ? o.apply(n, t) : j(t, e, n) : n.push(t)
        }), n
    };
    k.flatten = function (t, e) {
        return j(t, e, [])
    }, k.without = function (t) {
        return k.difference(t, a.call(arguments, 1))
    }, k.uniq = k.unique = function (t, e, n, r) {
        k.isFunction(e) && (r = n, n = e, e = !1);
        var i = n ? k.map(t, n, r) : t,
            s = [],
            o = [];
        return E(i, function (n, r) {
            (e ? r && o[o.length - 1] === n : k.contains(o, n)) || (o.push(n), s.push(t[r]))
        }), s
    }, k.union = function () {
        return k.uniq(u.apply(r, arguments))
    }, k.intersection = function (t) {
        var e = a.call(arguments, 1);
        return k.filter(k.uniq(t), function (t) {
            return k.every(e, function (e) {
                return k.indexOf(e, t) >= 0
            })
        })
    }, k.difference = function (t) {
        var e = u.apply(r, a.call(arguments, 1));
        return k.filter(t, function (t) {
            return !k.contains(e, t)
        })
    }, k.zip = function () {
        for(var t = a.call(arguments), e = k.max(k.pluck(t, "length")), n = new Array(e), r = 0; r < e; r++) n[r] = k.pluck(t, "" + r);
        return n
    }, k.object = function (t, e) {
        if(null == t) return {};
        for(var n = {}, r = 0, i = t.length; r < i; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
        return n
    }, k.indexOf = function (t, e, n) {
        if(null == t) return -1;
        var r = 0,
            i = t.length;
        if(n) {
            if("number" != typeof n) return r = k.sortedIndex(t, e), t[r] === e ? r : -1;
            r = n < 0 ? Math.max(0, i + n) : n
        }
        if(y && t.indexOf === y) return t.indexOf(e, n);
        for(; r < i; r++)
            if(t[r] === e) return r;
        return -1
    }, k.lastIndexOf = function (t, e, n) {
        if(null == t) return -1;
        var r = null != n;
        if(b && t.lastIndexOf === b) return r ? t.lastIndexOf(e, n) : t.lastIndexOf(e);
        for(var i = r ? n : t.length; i--;)
            if(t[i] === e) return i;
        return -1
    }, k.range = function (t, e, n) {
        arguments.length <= 1 && (e = t || 0, t = 0), n = arguments[2] || 1;
        for(var r = Math.max(Math.ceil((e - t) / n), 0), i = 0, s = new Array(r); i < r;) s[i++] = t, t += n;
        return s
    }, k.bind = function (t, e) {
        if(t.bind === x && x) return x.apply(t, a.call(arguments, 1));
        var n = a.call(arguments, 2);
        return function () {
            return t.apply(e, n.concat(a.call(arguments)))
        }
    }, k.partial = function (t) {
        var e = a.call(arguments, 1);
        return function () {
            return t.apply(this, e.concat(a.call(arguments)))
        }
    }, k.bindAll = function (t) {
        var e = a.call(arguments, 1);
        return 0 === e.length && (e = k.functions(t)), E(e, function (e) {
            t[e] = k.bind(t[e], t)
        }), t
    }, k.memoize = function (t, e) {
        var n = {};
        return e || (e = k.identity),
            function () {
                var r = e.apply(this, arguments);
                return k.has(n, r) ? n[r] : n[r] = t.apply(this, arguments)
            }
    }, k.delay = function (t, e) {
        var n = a.call(arguments, 2);
        return setTimeout(function () {
            return t.apply(null, n)
        }, e)
    }, k.defer = function (t) {
        return k.delay.apply(k, [t, 1].concat(a.call(arguments, 1)))
    }, k.throttle = function (t, e) {
        var n, r, i, s, o = 0,
            a = function () {
                o = new Date, i = null, s = t.apply(n, r)
            };
        return function () {
            var u = new Date,
                c = e - (u - o);
            return n = this, r = arguments, c <= 0 ? (clearTimeout(i), i = null, o = u, s = t.apply(n, r)) : i || (i = setTimeout(a, c)), s
        }
    }, k.debounce = function (t, e, n) {
        var r, i;
        return function () {
            var s = this,
                o = arguments,
                a = function () {
                    r = null, n || (i = t.apply(s, o))
                },
                u = n && !r;
            return clearTimeout(r), r = setTimeout(a, e), u && (i = t.apply(s, o)), i
        }
    }, k.once = function (t) {
        var e, n = !1;
        return function () {
            return n ? e : (n = !0, e = t.apply(this, arguments), t = null, e)
        }
    }, k.wrap = function (t, e) {
        return function () {
            var n = [t];
            return o.apply(n, arguments), e.apply(this, n)
        }
    }, k.compose = function () {
        var t = arguments;
        return function () {
            for(var e = arguments, n = t.length - 1; n >= 0; n--) e = [t[n].apply(this, e)];
            return e[0]
        }
    }, k.after = function (t, e) {
        return t <= 0 ? e() : function () {
            if(--t < 1) return e.apply(this, arguments)
        }
    }, k.keys = _ || function (t) {
        if(t !== Object(t)) throw new TypeError("Invalid object");
        var e = [];
        for(var n in t) k.has(t, n) && (e[e.length] = n);
        return e
    }, k.values = function (t) {
        var e = [];
        for(var n in t) k.has(t, n) && e.push(t[n]);
        return e
    }, k.pairs = function (t) {
        var e = [];
        for(var n in t) k.has(t, n) && e.push([n, t[n]]);
        return e
    }, k.invert = function (t) {
        var e = {};
        for(var n in t) k.has(t, n) && (e[t[n]] = n);
        return e
    }, k.functions = k.methods = function (t) {
        var e = [];
        for(var n in t) k.isFunction(t[n]) && e.push(n);
        return e.sort()
    }, k.extend = function (t) {
        return E(a.call(arguments, 1), function (e) {
            if(e)
                for(var n in e) t[n] = e[n]
        }), t
    }, k.pick = function (t) {
        var e = {},
            n = u.apply(r, a.call(arguments, 1));
        return E(n, function (n) {
            n in t && (e[n] = t[n])
        }), e
    }, k.omit = function (t) {
        var e = {},
            n = u.apply(r, a.call(arguments, 1));
        for(var i in t) k.contains(n, i) || (e[i] = t[i]);
        return e
    }, k.defaults = function (t) {
        return E(a.call(arguments, 1), function (e) {
            if(e)
                for(var n in e) null == t[n] && (t[n] = e[n])
        }), t
    }, k.clone = function (t) {
        return k.isObject(t) ? k.isArray(t) ? t.slice() : k.extend({}, t) : t
    }, k.tap = function (t, e) {
        return e(t), t
    };
    var S = function (t, e, n, r) {
        if(t === e) return 0 !== t || 1 / t == 1 / e;
        if(null == t || null == e) return t === e;
        t instanceof k && (t = t._wrapped), e instanceof k && (e = e._wrapped);
        var i = c.call(t);
        if(i != c.call(e)) return !1;
        switch(i) {
        case "[object String]":
            return t == String(e);
        case "[object Number]":
            return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
        case "[object Date]":
        case "[object Boolean]":
            return +t == +e;
        case "[object RegExp]":
            return t.source == e.source && t.global == e.global && t.multiline == e.multiline && t.ignoreCase == e.ignoreCase
        }
        if("object" != typeof t || "object" != typeof e) return !1;
        for(var s = n.length; s--;)
            if(n[s] == t) return r[s] == e;
        n.push(t), r.push(e);
        var o = 0,
            a = !0;
        if("[object Array]" == i) {
            if(o = t.length, a = o == e.length)
                for(; o-- && (a = S(t[o], e[o], n, r)););
        } else {
            var u = t.constructor,
                l = e.constructor;
            if(u !== l && !(k.isFunction(u) && u instanceof u && k.isFunction(l) && l instanceof l)) return !1;
            for(var h in t)
                if(k.has(t, h) && (o++, !(a = k.has(e, h) && S(t[h], e[h], n, r)))) break;
            if(a) {
                for(h in e)
                    if(k.has(e, h) && !o--) break;
                a = !o
            }
        }
        return n.pop(), r.pop(), a
    };
    k.isEqual = function (t, e) {
        return S(t, e, [], [])
    }, k.isEmpty = function (t) {
        if(null == t) return !0;
        if(k.isArray(t) || k.isString(t)) return 0 === t.length;
        for(var e in t)
            if(k.has(t, e)) return !1;
        return !0
    }, k.isElement = function (t) {
        return !(!t || 1 !== t.nodeType)
    }, k.isArray = w || function (t) {
        return "[object Array]" == c.call(t)
    }, k.isObject = function (t) {
        return t === Object(t)
    }, E(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (t) {
        k["is" + t] = function (e) {
            return c.call(e) == "[object " + t + "]"
        }
    }), k.isArguments(arguments) || (k.isArguments = function (t) {
        return !(!t || !k.has(t, "callee"))
    }), "function" != typeof /./ && (k.isFunction = function (t) {
        return "function" == typeof t
    }), k.isFinite = function (t) {
        return isFinite(t) && !isNaN(parseFloat(t))
    }, k.isNaN = function (t) {
        return k.isNumber(t) && t != +t
    }, k.isBoolean = function (t) {
        return t === !0 || t === !1 || "[object Boolean]" == c.call(t)
    }, k.isNull = function (t) {
        return null === t
    }, k.isUndefined = function (t) {
        return void 0 === t
    }, k.has = function (t, e) {
        return l.call(t, e)
    }, k.noConflict = function () {
        return t._ = e, this
    }, k.identity = function (t) {
        return t
    }, k.times = function (t, e, n) {
        for(var r = Array(t), i = 0; i < t; i++) r[i] = e.call(n, i);
        return r
    }, k.random = function (t, e) {
        return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
    };
    var C = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    C.unescape = k.invert(C.escape);
    var R = {
        escape: new RegExp("[" + k.keys(C.escape)
            .join("") + "]", "g"),
        unescape: new RegExp("(" + k.keys(C.unescape)
            .join("|") + ")", "g")
    };
    k.each(["escape", "unescape"], function (t) {
        k[t] = function (e) {
            return null == e ? "" : ("" + e)
                .replace(R[t], function (e) {
                    return C[t][e]
                })
        }
    }), k.result = function (t, e) {
        if(null == t) return null;
        var n = t[e];
        return k.isFunction(n) ? n.call(t) : n
    }, k.mixin = function (t) {
        E(k.functions(t), function (e) {
            var n = k[e] = t[e];
            k.prototype[e] = function () {
                var t = [this._wrapped];
                return o.apply(t, arguments), H.call(this, n.apply(k, t))
            }
        })
    };
    var O = 0;
    k.uniqueId = function (t) {
        var e = ++O + "";
        return t ? t + e : e
    }, k.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var I = /(.)^/,
        N = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\t": "t",
            " ": "u2028",
            " ": "u2029"
        },
        q = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    k.template = function (t, e, n) {
        var r;
        n = k.defaults({}, n, k.templateSettings);
        var i = new RegExp([(n.escape || I)
                .source, (n.interpolate || I)
                .source, (n.evaluate || I)
                .source].join("|") + "|$", "g"),
            s = 0,
            o = "__p+='";
        t.replace(i, function (e, n, r, i, a) {
            return o += t.slice(s, a)
                .replace(q, function (t) {
                    return "\\" + N[t]
                }), n && (o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), r && (o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), i && (o += "';\n" + i + "\n__p+='"), s = a + e.length, e
        }), o += "';\n", n.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
        try {
            r = new Function(n.variable || "obj", "_", o)
        } catch(t) {
            throw t.source = o, t
        }
        if(e) return r(e, k);
        var a = function (t) {
            return r.call(this, t, k)
        };
        return a.source = "function(" + (n.variable || "obj") + "){\n" + o + "}", a
    }, k.chain = function (t) {
        return k(t)
            .chain()
    };
    var H = function (t) {
        return this._chain ? k(t)
            .chain() : t
    };
    k.mixin(k), E(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (t) {
        var e = r[t];
        k.prototype[t] = function () {
            var n = this._wrapped;
            return e.apply(n, arguments), "shift" != t && "splice" != t || 0 !== n.length || delete n[0], H.call(this, n)
        }
    }), E(["concat", "join", "slice"], function (t) {
        var e = r[t];
        k.prototype[t] = function () {
            return H.call(this, e.apply(this._wrapped, arguments))
        }
    }), k.extend(k.prototype, {
        chain: function () {
            return this._chain = !0, this
        },
        value: function () {
            return this._wrapped
        }
    })
})
.call(this),
    function () {
        var t, e = this,
            n = e.Backbone,
            r = [],
            i = r.push,
            s = r.slice,
            o = r.splice;
        t = "undefined" != typeof exports ? exports : e.Backbone = {}, t.VERSION = "1.0.0";
        var a = e._;
        a || "undefined" == typeof require || (a = require("underscore")), t.$ = e.jQuery || e.Zepto || e.ender || e.$, t.noConflict = function () {
            return e.Backbone = n, this
        }, t.emulateHTTP = !1, t.emulateJSON = !1;
        var u = t.Events = {
                on: function (t, e, n) {
                    if(!l(this, "on", t, [e, n]) || !e) return this;
                    this._events || (this._events = {});
                    var r = this._events[t] || (this._events[t] = []);
                    return r.push({
                        callback: e,
                        context: n,
                        ctx: n || this
                    }), this
                },
                once: function (t, e, n) {
                    if(!l(this, "once", t, [e, n]) || !e) return this;
                    var r = this,
                        i = a.once(function () {
                            r.off(t, i), e.apply(this, arguments)
                        });
                    return i._callback = e, this.on(t, i, n)
                },
                off: function (t, e, n) {
                    var r, i, s, o, u, c, h, f;
                    if(!this._events || !l(this, "off", t, [e, n])) return this;
                    if(!t && !e && !n) return this._events = {}, this;
                    for(o = t ? [t] : a.keys(this._events), u = 0, c = o.length; u < c; u++)
                        if(t = o[u], s = this._events[t]) {
                            if(this._events[t] = r = [], e || n)
                                for(h = 0, f = s.length; h < f; h++) i = s[h], (e && e !== i.callback && e !== i.callback._callback || n && n !== i.context) && r.push(i);
                            r.length || delete this._events[t]
                        }
                    return this
                },
                trigger: function (t) {
                    if(!this._events) return this;
                    var e = s.call(arguments, 1);
                    if(!l(this, "trigger", t, e)) return this;
                    var n = this._events[t],
                        r = this._events.all;
                    return n && h(n, e), r && h(r, arguments), this
                },
                stopListening: function (t, e, n) {
                    var r = this._listeners;
                    if(!r) return this;
                    var i = !e && !n;
                    "object" == typeof e && (n = this), t && ((r = {})[t._listenerId] = t);
                    for(var s in r) r[s].off(e, n, this), i && delete this._listeners[s];
                    return this
                }
            },
            c = /\s+/,
            l = function (t, e, n, r) {
                if(!n) return !0;
                if("object" == typeof n) {
                    for(var i in n) t[e].apply(t, [i, n[i]].concat(r));
                    return !1
                }
                if(c.test(n)) {
                    for(var s = n.split(c), o = 0, a = s.length; o < a; o++) t[e].apply(t, [s[o]].concat(r));
                    return !1
                }
                return !0
            },
            h = function (t, e) {
                var n, r = -1,
                    i = t.length,
                    s = e[0],
                    o = e[1],
                    a = e[2];
                switch(e.length) {
                case 0:
                    for(; ++r < i;)(n = t[r])
                        .callback.call(n.ctx);
                    return;
                case 1:
                    for(; ++r < i;)(n = t[r])
                        .callback.call(n.ctx, s);
                    return;
                case 2:
                    for(; ++r < i;)(n = t[r])
                        .callback.call(n.ctx, s, o);
                    return;
                case 3:
                    for(; ++r < i;)(n = t[r])
                        .callback.call(n.ctx, s, o, a);
                    return;
                default:
                    for(; ++r < i;)(n = t[r])
                        .callback.apply(n.ctx, e)
                }
            },
            f = {
                listenTo: "on",
                listenToOnce: "once"
            };
        a.each(f, function (t, e) {
            u[e] = function (e, n, r) {
                var i = this._listeners || (this._listeners = {}),
                    s = e._listenerId || (e._listenerId = a.uniqueId("l"));
                return i[s] = e, "object" == typeof n && (r = this), e[t](n, r, this), this
            }
        }), u.bind = u.on, u.unbind = u.off, a.extend(t, u);
        var d = t.Model = function (t, e) {
                var n, r = t || {};
                e || (e = {}), this.cid = a.uniqueId("c"), this.attributes = {}, a.extend(this, a.pick(e, p)), e.parse && (r = this.parse(r, e) || {}), (n = a.result(this, "defaults")) && (r = a.defaults({}, r, n)), this.set(r, e), this.changed = {}, this.initialize.apply(this, arguments)
            },
            p = ["url", "urlRoot", "collection"];
        a.extend(d.prototype, u, {
            changed: null,
            validationError: null,
            idAttribute: "id",
            initialize: function () {},
            toJSON: function () {
                return a.clone(this.attributes)
            },
            sync: function () {
                return t.sync.apply(this, arguments)
            },
            get: function (t) {
                return this.attributes[t]
            },
            escape: function (t) {
                return a.escape(this.get(t))
            },
            has: function (t) {
                return null != this.get(t)
            },
            set: function (t, e, n) {
                var r, i, s, o, u, c, l, h;
                if(null == t) return this;
                if("object" == typeof t ? (i = t, n = e) : (i = {})[t] = e, n || (n = {}), !this._validate(i, n)) return !1;
                s = n.unset, u = n.silent, o = [], c = this._changing, this._changing = !0, c || (this._previousAttributes = a.clone(this.attributes), this.changed = {}), h = this.attributes, l = this._previousAttributes, this.idAttribute in i && (this.id = i[this.idAttribute]);
                for(r in i) e = i[r], a.isEqual(h[r], e) || o.push(r), a.isEqual(l[r], e) ? delete this.changed[r] : this.changed[r] = e, s ? delete h[r] : h[r] = e;
                if(!u) {
                    o.length && (this._pending = !0);
                    for(var f = 0, d = o.length; f < d; f++) this.trigger("change:" + o[f], this, h[o[f]], n)
                }
                if(c) return this;
                if(!u)
                    for(; this._pending;) this._pending = !1, this.trigger("change", this, n);
                return this._pending = !1, this._changing = !1, this
            },
            unset: function (t, e) {
                return this.set(t, void 0, a.extend({}, e, {
                    unset: !0
                }))
            },
            clear: function (t) {
                var e = {};
                for(var n in this.attributes) e[n] = void 0;
                return this.set(e, a.extend({}, t, {
                    unset: !0
                }))
            },
            hasChanged: function (t) {
                return null == t ? !a.isEmpty(this.changed) : a.has(this.changed, t)
            },
            changedAttributes: function (t) {
                if(!t) return !!this.hasChanged() && a.clone(this.changed);
                var e, n = !1,
                    r = this._changing ? this._previousAttributes : this.attributes;
                for(var i in t) a.isEqual(r[i], e = t[i]) || ((n || (n = {}))[i] = e);
                return n
            },
            previous: function (t) {
                return null != t && this._previousAttributes ? this._previousAttributes[t] : null
            },
            previousAttributes: function () {
                return a.clone(this._previousAttributes)
            },
            fetch: function (t) {
                t = t ? a.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
                var e = this,
                    n = t.success;
                return t.success = function (r) {
                    return !!e.set(e.parse(r, t), t) && (n && n(e, r, t), void e.trigger("sync", e, r, t))
                }, H(this, t), this.sync("read", this, t)
            },
            save: function (t, e, n) {
                var r, i, s, o = this.attributes;
                if(null == t || "object" == typeof t ? (r = t, n = e) : (r = {})[t] = e, r && (!n || !n.wait) && !this.set(r, n)) return !1;
                if(n = a.extend({
                        validate: !0
                    }, n), !this._validate(r, n)) return !1;
                r && n.wait && (this.attributes = a.extend({}, o, r)), void 0 === n.parse && (n.parse = !0);
                var u = this,
                    c = n.success;
                return n.success = function (t) {
                    u.attributes = o;
                    var e = u.parse(t, n);
                    return n.wait && (e = a.extend(r || {}, e)), !(a.isObject(e) && !u.set(e, n)) && (c && c(u, t, n), void u.trigger("sync", u, t, n))
                }, H(this, n), i = this.isNew() ? "create" : n.patch ? "patch" : "update", "patch" === i && (n.attrs = r), s = this.sync(i, this, n), r && n.wait && (this.attributes = o), s
            },
            destroy: function (t) {
                t = t ? a.clone(t) : {};
                var e = this,
                    n = t.success,
                    r = function () {
                        e.trigger("destroy", e, e.collection, t)
                    };
                if(t.success = function (i) {
                        (t.wait || e.isNew()) && r(), n && n(e, i, t), e.isNew() || e.trigger("sync", e, i, t)
                    }, this.isNew()) return t.success(), !1;
                H(this, t);
                var i = this.sync("delete", this, t);
                return t.wait || r(), i
            },
            url: function () {
                var t = a.result(this, "urlRoot") || a.result(this.collection, "url") || q();
                return this.isNew() ? t : t + ("/" === t.charAt(t.length - 1) ? "" : "/") + encodeURIComponent(this.id)
            },
            parse: function (t) {
                return t
            },
            clone: function () {
                return new this.constructor(this.attributes)
            },
            isNew: function () {
                return null == this.id
            },
            isValid: function (t) {
                return this._validate({}, a.extend(t || {}, {
                    validate: !0
                }))
            },
            _validate: function (t, e) {
                if(!e.validate || !this.validate) return !0;
                t = a.extend({}, this.attributes, t);
                var n = this.validationError = this.validate(t, e) || null;
                return !n || (this.trigger("invalid", this, n, a.extend(e || {}, {
                    validationError: n
                })), !1)
            }
        });
        var v = ["keys", "values", "pairs", "invert", "pick", "omit"];
        a.each(v, function (t) {
            d.prototype[t] = function () {
                var e = s.call(arguments);
                return e.unshift(this.attributes), a[t].apply(a, e)
            }
        });
        var g = t.Collection = function (t, e) {
                e || (e = {}), e.url && (this.url = e.url), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, a.extend({
                    silent: !0
                }, e))
            },
            m = {
                add: !0,
                remove: !0,
                merge: !0
            },
            y = {
                add: !0,
                merge: !1,
                remove: !1
            };
        a.extend(g.prototype, u, {
            model: d,
            initialize: function () {},
            toJSON: function (t) {
                return this.map(function (e) {
                    return e.toJSON(t)
                })
            },
            sync: function () {
                return t.sync.apply(this, arguments)
            },
            add: function (t, e) {
                return this.set(t, a.defaults(e || {}, y))
            },
            remove: function (t, e) {
                t = a.isArray(t) ? t.slice() : [t], e || (e = {});
                var n, r, i, s;
                for(n = 0, r = t.length; n < r; n++) s = this.get(t[n]), s && (delete this._byId[s.id], delete this._byId[s.cid], i = this.indexOf(s), this.models.splice(i, 1), this.length--, e.silent || (e.index = i, s.trigger("remove", s, this, e)), this._removeReference(s));
                return this
            },
            set: function (t, e) {
                e = a.defaults(e || {}, m), e.parse && (t = this.parse(t, e)), a.isArray(t) || (t = t ? [t] : []);
                var n, r, s, u, c, l = e.at,
                    h = this.comparator && null == l && e.sort !== !1,
                    f = a.isString(this.comparator) ? this.comparator : null,
                    d = [],
                    p = [],
                    v = {};
                for(n = 0, r = t.length; n < r; n++)(s = this._prepareModel(t[n], e)) && ((u = this.get(s)) ? (e.remove && (v[u.cid] = !0), e.merge && (u.set(s.attributes, e), h && !c && u.hasChanged(f) && (c = !0))) : e.add && (d.push(s), s.on("all", this._onModelEvent, this), this._byId[s.cid] = s, null != s.id && (this._byId[s.id] = s)));
                if(e.remove) {
                    for(n = 0, r = this.length; n < r; ++n) v[(s = this.models[n])
                        .cid] || p.push(s);
                    p.length && this.remove(p, e)
                }
                if(d.length && (h && (c = !0), this.length += d.length, null != l ? o.apply(this.models, [l, 0].concat(d)) : i.apply(this.models, d)), c && this.sort({
                        silent: !0
                    }), e.silent) return this;
                for(n = 0, r = d.length; n < r; n++)(s = d[n])
                    .trigger("add", s, this, e);
                return c && this.trigger("sort", this, e), this
            },
            reset: function (t, e) {
                e || (e = {});
                for(var n = 0, r = this.models.length; n < r; n++) this._removeReference(this.models[n]);
                return e.previousModels = this.models, this._reset(), this.add(t, a.extend({
                    silent: !0
                }, e)), e.silent || this.trigger("reset", this, e), this
            },
            push: function (t, e) {
                return t = this._prepareModel(t, e), this.add(t, a.extend({
                    at: this.length
                }, e)), t
            },
            pop: function (t) {
                var e = this.at(this.length - 1);
                return this.remove(e, t), e
            },
            unshift: function (t, e) {
                return t = this._prepareModel(t, e), this.add(t, a.extend({
                    at: 0
                }, e)), t
            },
            shift: function (t) {
                var e = this.at(0);
                return this.remove(e, t), e
            },
            slice: function (t, e) {
                return this.models.slice(t, e)
            },
            get: function (t) {
                if(null != t) return this._byId[null != t.id ? t.id : t.cid || t]
            },
            at: function (t) {
                return this.models[t]
            },
            where: function (t, e) {
                return a.isEmpty(t) ? e ? void 0 : [] : this[e ? "find" : "filter"](function (e) {
                    for(var n in t)
                        if(t[n] !== e.get(n)) return !1;
                    return !0
                })
            },
            findWhere: function (t) {
                return this.where(t, !0)
            },
            sort: function (t) {
                if(!this.comparator) throw new Error("Cannot sort a set without a comparator");
                return t || (t = {}), a.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(a.bind(this.comparator, this)), t.silent || this.trigger("sort", this, t), this
            },
            sortedIndex: function (t, e, n) {
                e || (e = this.comparator);
                var r = a.isFunction(e) ? e : function (t) {
                    return t.get(e)
                };
                return a.sortedIndex(this.models, t, r, n)
            },
            pluck: function (t) {
                return a.invoke(this.models, "get", t)
            },
            fetch: function (t) {
                t = t ? a.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
                var e = t.success,
                    n = this;
                return t.success = function (r) {
                    var i = t.reset ? "reset" : "set";
                    n[i](r, t), e && e(n, r, t), n.trigger("sync", n, r, t)
                }, H(this, t), this.sync("read", this, t)
            },
            create: function (t, e) {
                if(e = e ? a.clone(e) : {}, !(t = this._prepareModel(t, e))) return !1;
                e.wait || this.add(t, e);
                var n = this,
                    r = e.success;
                return e.success = function (i) {
                    e.wait && n.add(t, e), r && r(t, i, e)
                }, t.save(null, e), t
            },
            parse: function (t) {
                return t
            },
            clone: function () {
                return new this.constructor(this.models)
            },
            _reset: function () {
                this.length = 0, this.models = [], this._byId = {}
            },
            _prepareModel: function (t, e) {
                if(t instanceof d) return t.collection || (t.collection = this), t;
                e || (e = {}), e.collection = this;
                var n = new this.model(t, e);
                return n._validate(t, e) ? n : (this.trigger("invalid", this, t, e), !1)
            },
            _removeReference: function (t) {
                this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this)
            },
            _onModelEvent: function (t, e, n, r) {
                ("add" !== t && "remove" !== t || n === this) && ("destroy" === t && this.remove(e, r), e && t === "change:" + e.idAttribute && (delete this._byId[e.previous(e.idAttribute)], null != e.id && (this._byId[e.id] = e)), this.trigger.apply(this, arguments))
            }
        });
        var b = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
        a.each(b, function (t) {
            g.prototype[t] = function () {
                var e = s.call(arguments);
                return e.unshift(this.models), a[t].apply(a, e)
            }
        });
        var w = ["groupBy", "countBy", "sortBy"];
        a.each(w, function (t) {
            g.prototype[t] = function (e, n) {
                var r = a.isFunction(e) ? e : function (t) {
                    return t.get(e)
                };
                return a[t](this.models, r, n)
            }
        });
        var _ = t.View = function (t) {
                this.cid = a.uniqueId("view"), this._configure(t || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
            },
            x = /^(\S+)\s*(.*)$/,
            k = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
        a.extend(_.prototype, u, {
            tagName: "div",
            $: function (t) {
                return this.$el.find(t)
            },
            initialize: function () {},
            render: function () {
                return this
            },
            remove: function () {
                return this.$el.remove(), this.stopListening(), this
            },
            setElement: function (e, n) {
                return this.$el && this.undelegateEvents(), this.$el = e instanceof t.$ ? e : t.$(e), this.el = this.$el[0], n !== !1 && this.delegateEvents(), this
            },
            delegateEvents: function (t) {
                if(!t && !(t = a.result(this, "events"))) return this;
                this.undelegateEvents();
                for(var e in t) {
                    var n = t[e];
                    if(a.isFunction(n) || (n = this[t[e]]), n) {
                        var r = e.match(x),
                            i = r[1],
                            s = r[2];
                        n = a.bind(n, this), i += ".delegateEvents" + this.cid, "" === s ? this.$el.on(i, n) : this.$el.on(i, s, n)
                    }
                }
                return this
            },
            undelegateEvents: function () {
                return this.$el.off(".delegateEvents" + this.cid), this
            },
            _configure: function (t) {
                this.options && (t = a.extend({}, a.result(this, "options"), t)), a.extend(this, a.pick(t, k)), this.options = t
            },
            _ensureElement: function () {
                if(this.el) this.setElement(a.result(this, "el"), !1);
                else {
                    var e = a.extend({}, a.result(this, "attributes"));
                    this.id && (e.id = a.result(this, "id")), this.className && (e["class"] = a.result(this, "className"));
                    var n = t.$("<" + a.result(this, "tagName") + ">")
                        .attr(e);
                    this.setElement(n, !1)
                }
            }
        }), t.sync = function (e, n, r) {
            var i = E[e];
            a.defaults(r || (r = {}), {
                emulateHTTP: t.emulateHTTP,
                emulateJSON: t.emulateJSON
            });
            var s = {
                type: i,
                dataType: "json"
            };
            if(r.url || (s.url = a.result(n, "url") || q()), null != r.data || !n || "create" !== e && "update" !== e && "patch" !== e || (s.contentType = "application/json", s.data = JSON.stringify(r.attrs || n.toJSON(r))), r.emulateJSON && (s.contentType = "application/x-www-form-urlencoded", s.data = s.data ? {
                    model: s.data
                } : {}), r.emulateHTTP && ("PUT" === i || "DELETE" === i || "PATCH" === i)) {
                s.type = "POST", r.emulateJSON && (s.data._method = i);
                var o = r.beforeSend;
                r.beforeSend = function (t) {
                    if(t.setRequestHeader("X-HTTP-Method-Override", i), o) return o.apply(this, arguments)
                }
            }
            "GET" === s.type || r.emulateJSON || (s.processData = !1), "PATCH" !== s.type || !window.ActiveXObject || window.external && window.external.msActiveXFilteringEnabled || (s.xhr = function () {
                return new ActiveXObject("Microsoft.XMLHTTP")
            });
            var u = r.xhr = t.ajax(a.extend(s, r));
            return n.trigger("request", n, u, r), u
        };
        var E = {
            create: "POST",
            update: "PUT",
            patch: "PATCH",
            "delete": "DELETE",
            read: "GET"
        };
        t.ajax = function () {
            return t.$.ajax.apply(t.$, arguments)
        };
        var T = t.Router = function (t) {
                t || (t = {}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
            },
            A = /\((.*?)\)/g,
            $ = /(\(\?)?:\w+/g,
            P = /\*\w+/g,
            j = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        a.extend(T.prototype, u, {
            initialize: function () {},
            route: function (e, n, r) {
                a.isRegExp(e) || (e = this._routeToRegExp(e)), a.isFunction(n) && (r = n, n = ""), r || (r = this[n]);
                var i = this;
                return t.history.route(e, function (s) {
                    var o = i._extractParameters(e, s);
                    r && r.apply(i, o), i.trigger.apply(i, ["route:" + n].concat(o)), i.trigger("route", n, o), t.history.trigger("route", i, n, o)
                }), this
            },
            navigate: function (e, n) {
                return t.history.navigate(e, n), this
            },
            _bindRoutes: function () {
                if(this.routes) {
                    this.routes = a.result(this, "routes");
                    for(var t, e = a.keys(this.routes); null != (t = e.pop());) this.route(t, this.routes[t])
                }
            },
            _routeToRegExp: function (t) {
                return t = t.replace(j, "\\$&")
                    .replace(A, "(?:$1)?")
                    .replace($, function (t, e) {
                        return e ? t : "([^/]+)"
                    })
                    .replace(P, "(.*?)"), new RegExp("^" + t + "$")
            },
            _extractParameters: function (t, e) {
                var n = t.exec(e)
                    .slice(1);
                return a.map(n, function (t) {
                    return t ? decodeURIComponent(t) : null
                })
            }
        });
        var S = t.History = function () {
                this.handlers = [], a.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
            },
            C = /^[#\/]|\s+$/g,
            R = /^\/+|\/+$/g,
            O = /msie [\w.]+/,
            I = /\/$/;
        S.started = !1, a.extend(S.prototype, u, {
            interval: 50,
            getHash: function (t) {
                var e = (t || this)
                    .location.href.match(/#(.*)$/);
                return e ? e[1] : ""
            },
            getFragment: function (t, e) {
                if(null == t)
                    if(this._hasPushState || !this._wantsHashChange || e) {
                        t = this.location.pathname;
                        var n = this.root.replace(I, "");
                        t.indexOf(n) || (t = t.substr(n.length))
                    } else t = this.getHash();
                return t.replace(C, "")
            },
            start: function (e) {
                if(S.started) throw new Error("Backbone.history has already been started");
                S.started = !0, this.options = a.extend({}, {
                    root: "/"
                }, this.options, e), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                var n = this.getFragment(),
                    r = document.documentMode,
                    i = O.exec(navigator.userAgent.toLowerCase()) && (!r || r <= 7);
                this.root = ("/" + this.root + "/")
                    .replace(R, "/"), i && this._wantsHashChange && (this.iframe = t.$('<iframe src="javascript:0" tabindex="-1" />')
                        .hide()
                        .appendTo("body")[0].contentWindow, this.navigate(n)), this._hasPushState ? t.$(window)
                    .on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !i ? t.$(window)
                    .on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = n;
                var s = this.location,
                    o = s.pathname.replace(/[^\/]$/, "$&/") === this.root;
                return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !o ? (this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0) : (this._wantsPushState && this._hasPushState && o && s.hash && (this.fragment = this.getHash()
                    .replace(C, ""), this.history.replaceState({}, document.title, this.root + this.fragment + s.search)), this.options.silent ? void 0 : this.loadUrl())
            },
            stop: function () {
                t.$(window)
                    .off("popstate", this.checkUrl)
                    .off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), S.started = !1
            },
            route: function (t, e) {
                this.handlers.unshift({
                    route: t,
                    callback: e
                })
            },
            checkUrl: function () {
                var t = this.getFragment();
                return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))), t !== this.fragment && (this.iframe && this.navigate(t), void(this.loadUrl() || this.loadUrl(this.getHash())))
            },
            loadUrl: function (t) {
                var e = this.fragment = this.getFragment(t),
                    n = a.any(this.handlers, function (t) {
                        if(t.route.test(e)) return t.callback(e), !0
                    });
                return n
            },
            navigate: function (t, e) {
                if(!S.started) return !1;
                if(e && e !== !0 || (e = {
                        trigger: e
                    }), t = this.getFragment(t || ""), this.fragment !== t) {
                    this.fragment = t;
                    var n = this.root + t;
                    if(this._hasPushState) this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, n);
                    else {
                        if(!this._wantsHashChange) return this.location.assign(n);
                        this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open()
                            .close(), this._updateHash(this.iframe.location, t, e.replace))
                    }
                    e.trigger && this.loadUrl(t)
                }
            },
            _updateHash: function (t, e, n) {
                if(n) {
                    var r = t.href.replace(/(javascript:|#).*$/, "");
                    t.replace(r + "#" + e)
                } else t.hash = "#" + e
            }
        }), t.history = new S;
        var N = function (t, e) {
            var n, r = this;
            n = t && a.has(t, "constructor") ? t.constructor : function () {
                return r.apply(this, arguments)
            }, a.extend(n, r, e);
            var i = function () {
                this.constructor = n
            };
            return i.prototype = r.prototype, n.prototype = new i, t && a.extend(n.prototype, t), n.__super__ = r.prototype, n
        };
        d.extend = g.extend = T.extend = _.extend = S.extend = N;
        var q = function () {
                throw new Error('A "url" property or function must be specified')
            },
            H = function (t, e) {
                var n = e.error;
                e.error = function (r) {
                    n && n(t, r, e), t.trigger("error", t, r, e)
                }
            }
    }.call(this);
var dispatcher = _.clone(Backbone.Events),
    timestamp = 0,
    node = {
        fetchMetadata: function (t, e) {
            return $.support.cors || 0 === PLEXIT.nodeUrl.indexOf(protocol) ? void $.ajax({
                type: "GET",
                url: PLEXIT.nodeUrl + "?url=" + encodeURIComponent(t.url),
                dataType: "xml",
                success: function (e, n, r) {
                    node.success(t, e, r)
                },
                error: function (e) {
                    node.error(t, e)
                },
                complete: function (n) {
                    e(t, n)
                }
            }) : (t.lookupStatus = "success", e(t, 200, null))
        },
        success: function (t, e, n) {
            var r = _.find(e.documentElement.childNodes, function (t) {
                return t.nodeName && "video" === t.nodeName.toLowerCase()
            });
            return r ? (t.lookupStatus = "success", t.url = r.getAttribute("url"), t.name = r.getAttribute("title"), t.thumb = r.getAttribute("thumb"), "/" == t.thumb[0] && (t.thumb = PLEXIT.nodeHost + t.thumb), t.description = r.getAttribute("summary"), t.mediaObjectXML = n.responseText, log("node success"), void log(t)) : void(t.lookupStatus = "error")
        },
        error: function (t, e) {
            t.lookupStatus = "error", t.lookupError = e.responseText, log("node error")
        }
    },
    myPlex = {
        resolveUrl: function (t) {
            if(/^\w+:\/\//.test(t)) return t;
            var e, n = PLEXIT.myPlexUrl;
            return e = t ? n + ("/" === t[0] ? t : "/" + t) : n, PLEXIT.token ? (e += e.indexOf("?") > 0 ? "&" : "?", e += "X-Plex-Token=" + PLEXIT.token) : e
        }
    };
! function () {
    var t = Backbone.sync;
    Backbone.sync = function (e, n, r) {
        return !r.url && n.url && (r.url = _.isFunction(n.url) ? n.url() : n.url), !r.dataType && n.dataType && (r.dataType = n.dataType), _.defaults(r, {
            url: "",
            dataType: "xml",
            timeout: 2e4
        }), !r.data && n && ("create" === e || "update" === e || "patch" === e), r.url = myPlex.resolveUrl(r.url), t(e, n, r)
    }
}();
var CloseButtonView = Backbone.View.extend({
        className: "close-container",
        tpl: _.template($("#closebutton-template")
            .html()),
        events: {
            click: "onCloseClick"
        },
        render: function () {
            return this.$el.html(this.tpl()), this
        },
        onCloseClick: function (t) {
            t.preventDefault(), app.close()
        }
    }),
    EmptyView = Backbone.View.extend({
        className: "page active",
        tpl: _.template($("#empty-template")
            .html()),
        render: function () {
            return this.$el.html(this.tpl()), this
        }
    }),
    HeaderView = Backbone.View.extend({
        className: "header",
        tpl: _.template($("#header-template")
            .html()),
        events: {
            "click .queue-btn": "onQueueClick",
            "click .recommend-btn": "onRecommendClick",
            "click .play-btn": "onPlayClick"
        },
        render: function () {
            return this.$el.html(this.tpl()), this
        },
        loadThumb: function (t) {
            this.model = t;
            var e = $.Deferred(),
                n = (t.get("thumb"), this.$(".thumb")),
                r = function () {
                    n.off("load", i), n.off("error", s)
                },
                i = function () {
                    r(), e.resolve()
                },
                s = function () {
                    r(), e.reject()
                };
            return n.on("load", i), n.on("error", s), n.attr("src", t.get("thumb")), this.$(".thumb-overlay")
                .text(t.get("name")), e
        },
        deselect: function () {
            this.$("button")
                .removeClass("active")
        },
        onQueueClick: function (t) {
            var e = $(t.currentTarget);
            e.hasClass("active") || (dispatcher.trigger("navigate:queue"), this.deselect(), e.addClass("active"))
        },
        onRecommendClick: function (t) {
            var e = $(t.currentTarget);
            e.hasClass("active") || (dispatcher.trigger("navigate:recommend"), this.deselect(), e.addClass("active"))
        },
        onPlayClick: function (t) {
            var e = $(t.currentTarget);
            e.hasClass("active") || (dispatcher.trigger("navigate:play"), this.deselect(), e.addClass("active"))
        }
    }),
    LookingView = Backbone.View.extend({
        className: "page active",
        tpl: _.template($("#looking-template")
            .html()),
        render: function () {
            return this.$el.html(this.tpl()), this
        }
    }),
    SunsetView = Backbone.View.extend({
        className: "page minimal-scrollbar",
        tpl: _.template($("#sunset-template")
            .html()),
        render: function () {
            return this.$el.html(this.tpl({})), this
        }
    }),
    AppView = Backbone.View.extend({
        className: "container",
        mouseover: !1,
        pending: !1,
        active: !0,
        closeDuration: 1e4,
        closeTimeout: null,
        events: {
            mouseenter: "onMouseEnter",
            mouseleave: "onMouseLeave"
        },
        initialize: function () {
            this.headerView = new HeaderView, this.currentView = new EmptyView, this.listenTo(dispatcher, "navigate:looking", this.onNavigateLooking), this.listenTo(dispatcher, "navigate:sunset", this.onNavigateSunset), this.listenTo(dispatcher, "change:active", this.onActiveChange)
        },
        render: function () {
            return this.$el.empty(), this.$el.append(this.headerView.render()
                .el), this.$el.append(this.currentView.render()
                .el), this
        },
        close: function () {
            return this.mouseover ? void(this.pending = !0) : void window.parent.postMessage("close", "*")
        },
        transition: function (t) {
            var e = this.currentView;
            e.$el.removeClass("active")
                .addClass("inactive"), this.$el.append(t.render()
                    .el), this.currentView = t, _.defer(function () {
                    t.$el.addClass("active")
                }), _.delay(function () {
                    e.remove()
                }, 500)
        },
        onNavigateSunset: function () {
            this.transition(new SunsetView)
        },
        onNavigateLooking: function () {
            dispatcher.trigger("navigate:sunset")
        },
        onActiveChange: function (t) {
            this.active = t, t && this.closeTimeout ? (clearTimeout(this.closeTimeout), this.closeTimeout = null, this.pending = !1) : t || this.closeTimeout || (this.closeTimeout = setTimeout(_.bind(this.close, this), this.closeDuration))
        },
        onMouseEnter: function () {
            this.mouseover = !0
        },
        onMouseLeave: function () {
            this.mouseover = !1, this.pending && (this.pending = !1, this.closeTimeout = setTimeout(_.bind(this.close, this), this.closeDuration))
        }
    }),
    source, app = new AppView,
    closeButton = new CloseButtonView,
    url = getUrlParam("url"),
    host = getUrlParam("host"),
    protocol = getUrlParam("protocol"),
    search = getUrlParam("search"),
    title = getUrlParam("title"),
    plex = "true" === getUrlParam("plex"),
    isHttp = "http:" === protocol || "https:" === protocol,
    isPrivateHost = /(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)|(^169\.254\.)|(^localhost)|(\.local$)/.test(host),
    hasPlexToken = /X\-Plex\-Token=/.test(search),
    isPlexWeb = "Plex/Web" === title || "Plex Media Manager" === title,
    ignore = !1;
isHttp && !isPrivateHost || (sendAnalyticsEvent("Error", "Private Host"), ignore = !0, window.alert("The bookmarklet works only on publicly accessible http(s) URLs.")), (plex || hasPlexToken || isPlexWeb) && (sendAnalyticsEvent("Error", "Plex Property"), window.alert("The bookmarklet is correctly installed. Try clicking it while on a video page, such as YouTube or Vimeo."), ignore = !0), $.ajaxPrefilter(function (t, e, n) {
        if("POST" === t.type && t.url && 0 === t.url.lastIndexOf(PLEXIT.myPlexUrl, 0)) {
            var r = $('meta[name="csrf-token"]')
                .attr("content");
            r && n.setRequestHeader("X-CSRF-TOKEN", r)
        }
    }), $(window)
    .on("message", function (t) {
        if(source = t.originalEvent.data, !/^<html>/.test(source)) return void sendAnalyticsEvent("Error", "Not HTML");
        dispatcher.trigger("change:active", !0);
        var e = {
            url: url,
            name: title,
            referrer: url,
            hint: source
        };
        node.fetchMetadata(e, function (t) {
            "success" === t.lookupStatus ? dispatcher.trigger("navigate:queue", t) : (dispatcher.trigger("change:active", !1), dispatcher.trigger("navigate:notfound", t))
        })
    }), $(document)
    .ready(function () {
        sendAnalyticsEvent("Start", protocol), ignore || (window.parent.postMessage("open", "*"), dispatcher.trigger("change:active", !0), $("body")
            .prepend(closeButton.render()
                .el, app.render()
                .el), dispatcher.trigger("navigate:looking"))
    });
