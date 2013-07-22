/*!
 * jQuery JavaScript Library v1.6.4
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Sep 12 18:54:48 2011 -0400
 */
(function (ba, M) {
    var at = ba.document,
        bt = ba.navigator,
        bk = ba.location;
    var b = (function () {
        var bE = function (b0, b1) {
            return new bE.fn.init(b0, b1, bC)
        }, bU = ba.jQuery,
            bG = ba.$,
            bC, bY = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
            bM = /\S/,
            bI = /^\s+/,
            bD = /\s+$/,
            bH = /\d/,
            bz = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
            bN = /^[\],:{}\s]*$/,
            bW = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            bP = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            bJ = /(?:^|:|,)(?:\s*\[)+/g,
            bx = /(webkit)[ \/]([\w.]+)/,
            bR = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            bQ = /(msie) ([\w.]+)/,
            bS = /(mozilla)(?:.*? rv:([\w.]+))?/,
            bA = /-([a-z]|[0-9])/ig,
            bZ = /^-ms-/,
            bT = function (b0, b1) {
                return (b1 + "").toUpperCase()
            }, bX = bt.userAgent,
            bV, bB, e, bL = Object.prototype.toString,
            bF = Object.prototype.hasOwnProperty,
            by = Array.prototype.push,
            bK = Array.prototype.slice,
            bO = String.prototype.trim,
            bu = Array.prototype.indexOf,
            bw = {};
        bE.fn = bE.prototype = {
            constructor: bE,
            init: function (b0, b4, b3) {
                var b2, b5, b1, b6;
                if (!b0) {
                    return this
                }
                if (b0.nodeType) {
                    this.context = this[0] = b0;
                    this.length = 1;
                    return this
                }
                if (b0 === "body" && !b4 && at.body) {
                    this.context = at;
                    this[0] = at.body;
                    this.selector = b0;
                    this.length = 1;
                    return this
                }
                if (typeof b0 === "string") {
                    if (b0.charAt(0) === "<" && b0.charAt(b0.length - 1) === ">" && b0.length >= 3) {
                        b2 = [null, b0, null]
                    } else {
                        b2 = bY.exec(b0)
                    } if (b2 && (b2[1] || !b4)) {
                        if (b2[1]) {
                            b4 = b4 instanceof bE ? b4[0] : b4;
                            b6 = (b4 ? b4.ownerDocument || b4 : at);
                            b1 = bz.exec(b0);
                            if (b1) {
                                if (bE.isPlainObject(b4)) {
                                    b0 = [at.createElement(b1[1])];
                                    bE.fn.attr.call(b0, b4, true)
                                } else {
                                    b0 = [b6.createElement(b1[1])]
                                }
                            } else {
                                b1 = bE.buildFragment([b2[1]], [b6]);
                                b0 = (b1.cacheable ? bE.clone(b1.fragment) : b1.fragment).childNodes
                            }
                            return bE.merge(this, b0)
                        } else {
                            b5 = at.getElementById(b2[2]);
                            if (b5 && b5.parentNode) {
                                if (b5.id !== b2[2]) {
                                    return b3.find(b0)
                                }
                                this.length = 1;
                                this[0] = b5
                            }
                            this.context = at;
                            this.selector = b0;
                            return this
                        }
                    } else {
                        if (!b4 || b4.jquery) {
                            return (b4 || b3).find(b0)
                        } else {
                            return this.constructor(b4).find(b0)
                        }
                    }
                } else {
                    if (bE.isFunction(b0)) {
                        return b3.ready(b0)
                    }
                } if (b0.selector !== M) {
                    this.selector = b0.selector;
                    this.context = b0.context
                }
                return bE.makeArray(b0, this)
            },
            selector: "",
            jquery: "1.6.4",
            length: 0,
            size: function () {
                return this.length
            },
            toArray: function () {
                return bK.call(this, 0)
            },
            get: function (b0) {
                return b0 == null ? this.toArray() : (b0 < 0 ? this[this.length + b0] : this[b0])
            },
            pushStack: function (b1, b3, b0) {
                var b2 = this.constructor();
                if (bE.isArray(b1)) {
                    by.apply(b2, b1)
                } else {
                    bE.merge(b2, b1)
                }
                b2.prevObject = this;
                b2.context = this.context;
                if (b3 === "find") {
                    b2.selector = this.selector + (this.selector ? " " : "") + b0
                } else {
                    if (b3) {
                        b2.selector = this.selector + "." + b3 + "(" + b0 + ")"
                    }
                }
                return b2
            },
            each: function (b1, b0) {
                return bE.each(this, b1, b0)
            },
            ready: function (b0) {
                bE.bindReady();
                bB.done(b0);
                return this
            },
            eq: function (b0) {
                return b0 === -1 ? this.slice(b0) : this.slice(b0, +b0 + 1)
            },
            first: function () {
                return this.eq(0)
            },
            last: function () {
                return this.eq(-1)
            },
            slice: function () {
                return this.pushStack(bK.apply(this, arguments), "slice", bK.call(arguments).join(","))
            },
            map: function (b0) {
                return this.pushStack(bE.map(this, function (b2, b1) {
                    return b0.call(b2, b1, b2)
                }))
            },
            end: function () {
                return this.prevObject || this.constructor(null)
            },
            push: by,
            sort: [].sort,
            splice: [].splice
        };
        bE.fn.init.prototype = bE.fn;
        bE.extend = bE.fn.extend = function () {
            var b9, b2, b0, b1, b6, b7, b5 = arguments[0] || {}, b4 = 1,
                b3 = arguments.length,
                b8 = false;
            if (typeof b5 === "boolean") {
                b8 = b5;
                b5 = arguments[1] || {};
                b4 = 2
            }
            if (typeof b5 !== "object" && !bE.isFunction(b5)) {
                b5 = {}
            }
            if (b3 === b4) {
                b5 = this;
                --b4
            }
            for (; b4 < b3; b4++) {
                if ((b9 = arguments[b4]) != null) {
                    for (b2 in b9) {
                        b0 = b5[b2];
                        b1 = b9[b2];
                        if (b5 === b1) {
                            continue
                        }
                        if (b8 && b1 && (bE.isPlainObject(b1) || (b6 = bE.isArray(b1)))) {
                            if (b6) {
                                b6 = false;
                                b7 = b0 && bE.isArray(b0) ? b0 : []
                            } else {
                                b7 = b0 && bE.isPlainObject(b0) ? b0 : {}
                            }
                            b5[b2] = bE.extend(b8, b7, b1)
                        } else {
                            if (b1 !== M) {
                                b5[b2] = b1
                            }
                        }
                    }
                }
            }
            return b5
        };
        bE.extend({
            noConflict: function (b0) {
                if (ba.$ === bE) {
                    ba.$ = bG
                }
                if (b0 && ba.jQuery === bE) {
                    ba.jQuery = bU
                }
                return bE
            },
            isReady: false,
            readyWait: 1,
            holdReady: function (b0) {
                if (b0) {
                    bE.readyWait++
                } else {
                    bE.ready(true)
                }
            },
            ready: function (b0) {
                if ((b0 === true && !--bE.readyWait) || (b0 !== true && !bE.isReady)) {
                    if (!at.body) {
                        return setTimeout(bE.ready, 1)
                    }
                    bE.isReady = true;
                    if (b0 !== true && --bE.readyWait > 0) {
                        return
                    }
                    bB.resolveWith(at, [bE]);
                    if (bE.fn.trigger) {
                        bE(at).trigger("ready").unbind("ready")
                    }
                }
            },
            bindReady: function () {
                if (bB) {
                    return
                }
                bB = bE._Deferred();
                if (at.readyState === "complete") {
                    return setTimeout(bE.ready, 1)
                }
                if (at.addEventListener) {
                    at.addEventListener("DOMContentLoaded", e, false);
                    ba.addEventListener("load", bE.ready, false)
                } else {
                    if (at.attachEvent) {
                        at.attachEvent("onreadystatechange", e);
                        ba.attachEvent("onload", bE.ready);
                        var b0 = false;
                        try {
                            b0 = ba.frameElement == null
                        } catch (b1) {}
                        if (at.documentElement.doScroll && b0) {
                            bv()
                        }
                    }
                }
            },
            isFunction: function (b0) {
                return bE.type(b0) === "function"
            },
            isArray: Array.isArray || function (b0) {
                return bE.type(b0) === "array"
            },
            isWindow: function (b0) {
                return b0 && typeof b0 === "object" && "setInterval" in b0
            },
            isNaN: function (b0) {
                return b0 == null || !bH.test(b0) || isNaN(b0)
            },
            type: function (b0) {
                return b0 == null ? String(b0) : bw[bL.call(b0)] || "object"
            },
            isPlainObject: function (b2) {
                if (!b2 || bE.type(b2) !== "object" || b2.nodeType || bE.isWindow(b2)) {
                    return false
                }
                try {
                    if (b2.constructor && !bF.call(b2, "constructor") && !bF.call(b2.constructor.prototype, "isPrototypeOf")) {
                        return false
                    }
                } catch (b1) {
                    return false
                }
                var b0;
                for (b0 in b2) {}
                return b0 === M || bF.call(b2, b0)
            },
            isEmptyObject: function (b1) {
                for (var b0 in b1) {
                    return false
                }
                return true
            },
            error: function (b0) {
                throw b0
            },
            parseJSON: function (b0) {
                if (typeof b0 !== "string" || !b0) {
                    return null
                }
                b0 = bE.trim(b0);
                if (ba.JSON && ba.JSON.parse) {
                    return ba.JSON.parse(b0)
                }
                if (bN.test(b0.replace(bW, "@").replace(bP, "]").replace(bJ, ""))) {
                    return (new Function("return " + b0))()
                }
                bE.error("Invalid JSON: " + b0)
            },
            parseXML: function (b2) {
                var b0, b1;
                try {
                    if (ba.DOMParser) {
                        b1 = new DOMParser();
                        b0 = b1.parseFromString(b2, "text/xml")
                    } else {
                        b0 = new ActiveXObject("Microsoft.XMLDOM");
                        b0.async = "false";
                        b0.loadXML(b2)
                    }
                } catch (b3) {
                    b0 = M
                }
                if (!b0 || !b0.documentElement || b0.getElementsByTagName("parsererror").length) {
                    bE.error("Invalid XML: " + b2)
                }
                return b0
            },
            noop: function () {},
            globalEval: function (b0) {
                if (b0 && bM.test(b0)) {
                    (ba.execScript || function (b1) {
                        ba["eval"].call(ba, b1)
                    })(b0)
                }
            },
            camelCase: function (b0) {
                return b0.replace(bZ, "ms-").replace(bA, bT)
            },
            nodeName: function (b1, b0) {
                return b1.nodeName && b1.nodeName.toUpperCase() === b0.toUpperCase()
            },
            each: function (b3, b6, b2) {
                var b1, b4 = 0,
                    b5 = b3.length,
                    b0 = b5 === M || bE.isFunction(b3);
                if (b2) {
                    if (b0) {
                        for (b1 in b3) {
                            if (b6.apply(b3[b1], b2) === false) {
                                break
                            }
                        }
                    } else {
                        for (; b4 < b5;) {
                            if (b6.apply(b3[b4++], b2) === false) {
                                break
                            }
                        }
                    }
                } else {
                    if (b0) {
                        for (b1 in b3) {
                            if (b6.call(b3[b1], b1, b3[b1]) === false) {
                                break
                            }
                        }
                    } else {
                        for (; b4 < b5;) {
                            if (b6.call(b3[b4], b4, b3[b4++]) === false) {
                                break
                            }
                        }
                    }
                }
                return b3
            },
            trim: bO ? function (b0) {
                return b0 == null ? "" : bO.call(b0)
            } : function (b0) {
                return b0 == null ? "" : b0.toString().replace(bI, "").replace(bD, "")
            },
            makeArray: function (b3, b1) {
                var b0 = b1 || [];
                if (b3 != null) {
                    var b2 = bE.type(b3);
                    if (b3.length == null || b2 === "string" || b2 === "function" || b2 === "regexp" || bE.isWindow(b3)) {
                        by.call(b0, b3)
                    } else {
                        bE.merge(b0, b3)
                    }
                }
                return b0
            },
            inArray: function (b2, b3) {
                if (!b3) {
                    return -1
                }
                if (bu) {
                    return bu.call(b3, b2)
                }
                for (var b0 = 0, b1 = b3.length; b0 < b1; b0++) {
                    if (b3[b0] === b2) {
                        return b0
                    }
                }
                return -1
            },
            merge: function (b4, b2) {
                var b3 = b4.length,
                    b1 = 0;
                if (typeof b2.length === "number") {
                    for (var b0 = b2.length; b1 < b0; b1++) {
                        b4[b3++] = b2[b1]
                    }
                } else {
                    while (b2[b1] !== M) {
                        b4[b3++] = b2[b1++]
                    }
                }
                b4.length = b3;
                return b4
            },
            grep: function (b1, b6, b0) {
                var b2 = [],
                    b5;
                b0 = !! b0;
                for (var b3 = 0, b4 = b1.length; b3 < b4; b3++) {
                    b5 = !! b6(b1[b3], b3);
                    if (b0 !== b5) {
                        b2.push(b1[b3])
                    }
                }
                return b2
            },
            map: function (b0, b7, b8) {
                var b5, b6, b4 = [],
                    b2 = 0,
                    b1 = b0.length,
                    b3 = b0 instanceof bE || b1 !== M && typeof b1 === "number" && ((b1 > 0 && b0[0] && b0[b1 - 1]) || b1 === 0 || bE.isArray(b0));
                if (b3) {
                    for (; b2 < b1; b2++) {
                        b5 = b7(b0[b2], b2, b8);
                        if (b5 != null) {
                            b4[b4.length] = b5
                        }
                    }
                } else {
                    for (b6 in b0) {
                        b5 = b7(b0[b6], b6, b8);
                        if (b5 != null) {
                            b4[b4.length] = b5
                        }
                    }
                }
                return b4.concat.apply([], b4)
            },
            guid: 1,
            proxy: function (b4, b3) {
                if (typeof b3 === "string") {
                    var b2 = b4[b3];
                    b3 = b4;
                    b4 = b2
                }
                if (!bE.isFunction(b4)) {
                    return M
                }
                var b0 = bK.call(arguments, 2),
                    b1 = function () {
                        return b4.apply(b3, b0.concat(bK.call(arguments)))
                    };
                b1.guid = b4.guid = b4.guid || b1.guid || bE.guid++;
                return b1
            },
            access: function (b0, b8, b6, b2, b5, b7) {
                var b1 = b0.length;
                if (typeof b8 === "object") {
                    for (var b3 in b8) {
                        bE.access(b0, b3, b8[b3], b2, b5, b6)
                    }
                    return b0
                }
                if (b6 !== M) {
                    b2 = !b7 && b2 && bE.isFunction(b6);
                    for (var b4 = 0; b4 < b1; b4++) {
                        b5(b0[b4], b8, b2 ? b6.call(b0[b4], b4, b5(b0[b4], b8)) : b6, b7)
                    }
                    return b0
                }
                return b1 ? b5(b0[0], b8) : M
            },
            now: function () {
                return (new Date()).getTime()
            },
            uaMatch: function (b1) {
                b1 = b1.toLowerCase();
                var b0 = bx.exec(b1) || bR.exec(b1) || bQ.exec(b1) || b1.indexOf("compatible") < 0 && bS.exec(b1) || [];
                return {
                    browser: b0[1] || "",
                    version: b0[2] || "0"
                }
            },
            sub: function () {
                function b0(b3, b4) {
                    return new b0.fn.init(b3, b4)
                }
                bE.extend(true, b0, this);
                b0.superclass = this;
                b0.fn = b0.prototype = this();
                b0.fn.constructor = b0;
                b0.sub = this.sub;
                b0.fn.init = function b2(b3, b4) {
                    if (b4 && b4 instanceof bE && !(b4 instanceof b0)) {
                        b4 = b0(b4)
                    }
                    return bE.fn.init.call(this, b3, b4, b1)
                };
                b0.fn.init.prototype = b0.fn;
                var b1 = b0(at);
                return b0
            },
            browser: {}
        });
        bE.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (b1, b0) {
            bw["[object " + b0 + "]"] = b0.toLowerCase()
        });
        bV = bE.uaMatch(bX);
        if (bV.browser) {
            bE.browser[bV.browser] = true;
            bE.browser.version = bV.version
        }
        if (bE.browser.webkit) {
            bE.browser.safari = true
        }
        if (bM.test("\xA0")) {
            bI = /^[\s\xA0]+/;
            bD = /[\s\xA0]+$/
        }
        bC = bE(at);
        if (at.addEventListener) {
            e = function () {
                at.removeEventListener("DOMContentLoaded", e, false);
                bE.ready()
            }
        } else {
            if (at.attachEvent) {
                e = function () {
                    if (at.readyState === "complete") {
                        at.detachEvent("onreadystatechange", e);
                        bE.ready()
                    }
                }
            }
        }

        function bv() {
            if (bE.isReady) {
                return
            }
            try {
                at.documentElement.doScroll("left")
            } catch (b0) {
                setTimeout(bv, 1);
                return
            }
            bE.ready()
        }
        return bE
    })();
    var a = "done fail isResolved isRejected promise then always pipe".split(" "),
        aH = [].slice;
    b.extend({
        _Deferred: function () {
            var bw = [],
                bx, bu, bv, e = {
                    done: function () {
                        if (!bv) {
                            var bz = arguments,
                                bA, bD, bC, bB, by;
                            if (bx) {
                                by = bx;
                                bx = 0
                            }
                            for (bA = 0, bD = bz.length; bA < bD; bA++) {
                                bC = bz[bA];
                                bB = b.type(bC);
                                if (bB === "array") {
                                    e.done.apply(e, bC)
                                } else {
                                    if (bB === "function") {
                                        bw.push(bC)
                                    }
                                }
                            }
                            if (by) {
                                e.resolveWith(by[0], by[1])
                            }
                        }
                        return this
                    },
                    resolveWith: function (bz, by) {
                        if (!bv && !bx && !bu) {
                            by = by || [];
                            bu = 1;
                            try {
                                while (bw[0]) {
                                    bw.shift().apply(bz, by)
                                }
                            } finally {
                                bx = [bz, by];
                                bu = 0
                            }
                        }
                        return this
                    },
                    resolve: function () {
                        e.resolveWith(this, arguments);
                        return this
                    },
                    isResolved: function () {
                        return !!(bu || bx)
                    },
                    cancel: function () {
                        bv = 1;
                        bw = [];
                        return this
                    }
                };
            return e
        },
        Deferred: function (bu) {
            var e = b._Deferred(),
                bw = b._Deferred(),
                bv;
            b.extend(e, {
                then: function (by, bx) {
                    e.done(by).fail(bx);
                    return this
                },
                always: function () {
                    return e.done.apply(e, arguments).fail.apply(this, arguments)
                },
                fail: bw.done,
                rejectWith: bw.resolveWith,
                reject: bw.resolve,
                isRejected: bw.isResolved,
                pipe: function (by, bx) {
                    return b.Deferred(function (bz) {
                        b.each({
                            done: [by, "resolve"],
                            fail: [bx, "reject"]
                        }, function (bB, bE) {
                            var bA = bE[0],
                                bD = bE[1],
                                bC;
                            if (b.isFunction(bA)) {
                                e[bB](function () {
                                    bC = bA.apply(this, arguments);
                                    if (bC && b.isFunction(bC.promise)) {
                                        bC.promise().then(bz.resolve, bz.reject)
                                    } else {
                                        bz[bD + "With"](this === e ? bz : this, [bC])
                                    }
                                })
                            } else {
                                e[bB](bz[bD])
                            }
                        })
                    }).promise()
                },
                promise: function (by) {
                    if (by == null) {
                        if (bv) {
                            return bv
                        }
                        bv = by = {}
                    }
                    var bx = a.length;
                    while (bx--) {
                        by[a[bx]] = e[a[bx]]
                    }
                    return by
                }
            });
            e.done(bw.cancel).fail(e.cancel);
            delete e.cancel;
            if (bu) {
                bu.call(e, e)
            }
            return e
        },
        when: function (bz) {
            var bu = arguments,
                bv = 0,
                by = bu.length,
                bx = by,
                e = by <= 1 && bz && b.isFunction(bz.promise) ? bz : b.Deferred();

            function bw(bA) {
                return function (bB) {
                    bu[bA] = arguments.length > 1 ? aH.call(arguments, 0) : bB;
                    if (!(--bx)) {
                        e.resolveWith(e, aH.call(bu, 0))
                    }
                }
            }
            if (by > 1) {
                for (; bv < by; bv++) {
                    if (bu[bv] && b.isFunction(bu[bv].promise)) {
                        bu[bv].promise().then(bw(bv), e.reject)
                    } else {
                        --bx
                    }
                }
                if (!bx) {
                    e.resolveWith(e, bu)
                }
            } else {
                if (e !== bz) {
                    e.resolveWith(e, by ? [bz] : [])
                }
            }
            return e.promise()
        }
    });
    b.support = (function () {
        var bE = at.createElement("div"),
            bL = at.documentElement,
            bx, bM, bF, bv, bD, by, bB, bu, bC, bG, bA, bK, bI, bw, bz, bH, bN;
        bE.setAttribute("className", "t");
        bE.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        bx = bE.getElementsByTagName("*");
        bM = bE.getElementsByTagName("a")[0];
        if (!bx || !bx.length || !bM) {
            return {}
        }
        bF = at.createElement("select");
        bv = bF.appendChild(at.createElement("option"));
        bD = bE.getElementsByTagName("input")[0];
        bB = {
            leadingWhitespace: (bE.firstChild.nodeType === 3),
            tbody: !bE.getElementsByTagName("tbody").length,
            htmlSerialize: !! bE.getElementsByTagName("link").length,
            style: /top/.test(bM.getAttribute("style")),
            hrefNormalized: (bM.getAttribute("href") === "/a"),
            opacity: /^0.55$/.test(bM.style.opacity),
            cssFloat: !! bM.style.cssFloat,
            checkOn: (bD.value === "on"),
            optSelected: bv.selected,
            getSetAttribute: bE.className !== "t",
            submitBubbles: true,
            changeBubbles: true,
            focusinBubbles: false,
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true
        };
        bD.checked = true;
        bB.noCloneChecked = bD.cloneNode(true).checked;
        bF.disabled = true;
        bB.optDisabled = !bv.disabled;
        try {
            delete bE.test
        } catch (bJ) {
            bB.deleteExpando = false
        }
        if (!bE.addEventListener && bE.attachEvent && bE.fireEvent) {
            bE.attachEvent("onclick", function () {
                bB.noCloneEvent = false
            });
            bE.cloneNode(true).fireEvent("onclick")
        }
        bD = at.createElement("input");
        bD.value = "t";
        bD.setAttribute("type", "radio");
        bB.radioValue = bD.value === "t";
        bD.setAttribute("checked", "checked");
        bE.appendChild(bD);
        bu = at.createDocumentFragment();
        bu.appendChild(bE.firstChild);
        bB.checkClone = bu.cloneNode(true).cloneNode(true).lastChild.checked;
        bE.innerHTML = "";
        bE.style.width = bE.style.paddingLeft = "1px";
        bC = at.getElementsByTagName("body")[0];
        bA = at.createElement(bC ? "div" : "body");
        bK = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        };
        if (bC) {
            b.extend(bK, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            })
        }
        for (bH in bK) {
            bA.style[bH] = bK[bH]
        }
        bA.appendChild(bE);
        bG = bC || bL;
        bG.insertBefore(bA, bG.firstChild);
        bB.appendChecked = bD.checked;
        bB.boxModel = bE.offsetWidth === 2;
        if ("zoom" in bE.style) {
            bE.style.display = "inline";
            bE.style.zoom = 1;
            bB.inlineBlockNeedsLayout = (bE.offsetWidth === 2);
            bE.style.display = "";
            bE.innerHTML = "<div style='width:4px;'></div>";
            bB.shrinkWrapBlocks = (bE.offsetWidth !== 2)
        }
        bE.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
        bI = bE.getElementsByTagName("td");
        bN = (bI[0].offsetHeight === 0);
        bI[0].style.display = "";
        bI[1].style.display = "none";
        bB.reliableHiddenOffsets = bN && (bI[0].offsetHeight === 0);
        bE.innerHTML = "";
        if (at.defaultView && at.defaultView.getComputedStyle) {
            by = at.createElement("div");
            by.style.width = "0";
            by.style.marginRight = "0";
            bE.appendChild(by);
            bB.reliableMarginRight = (parseInt((at.defaultView.getComputedStyle(by, null) || {
                marginRight: 0
            }).marginRight, 10) || 0) === 0
        }
        bA.innerHTML = "";
        bG.removeChild(bA);
        if (bE.attachEvent) {
            for (bH in {
                submit: 1,
                change: 1,
                focusin: 1
            }) {
                bz = "on" + bH;
                bN = (bz in bE);
                if (!bN) {
                    bE.setAttribute(bz, "return;");
                    bN = (typeof bE[bz] === "function")
                }
                bB[bH + "Bubbles"] = bN
            }
        }
        bA = bu = bF = bv = bC = by = bE = bD = null;
        return bB
    })();
    b.boxModel = b.support.boxModel;
    var aO = /^(?:\{.*\}|\[.*\])$/,
        ay = /([A-Z])/g;
    b.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (b.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: true,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: true
        },
        hasData: function (e) {
            e = e.nodeType ? b.cache[e[b.expando]] : e[b.expando];
            return !!e && !U(e)
        },
        data: function (bw, bu, by, bx) {
            if (!b.acceptData(bw)) {
                return
            }
            var bz, bB, bC = b.expando,
                bA = typeof bu === "string",
                bD = bw.nodeType,
                e = bD ? b.cache : bw,
                bv = bD ? bw[b.expando] : bw[b.expando] && b.expando;
            if ((!bv || (bx && bv && (e[bv] && !e[bv][bC]))) && bA && by === M) {
                return
            }
            if (!bv) {
                if (bD) {
                    bw[b.expando] = bv = ++b.uuid
                } else {
                    bv = b.expando
                }
            }
            if (!e[bv]) {
                e[bv] = {};
                if (!bD) {
                    e[bv].toJSON = b.noop
                }
            }
            if (typeof bu === "object" || typeof bu === "function") {
                if (bx) {
                    e[bv][bC] = b.extend(e[bv][bC], bu)
                } else {
                    e[bv] = b.extend(e[bv], bu)
                }
            }
            bz = e[bv];
            if (bx) {
                if (!bz[bC]) {
                    bz[bC] = {}
                }
                bz = bz[bC]
            }
            if (by !== M) {
                bz[b.camelCase(bu)] = by
            }
            if (bu === "events" && !bz[bu]) {
                return bz[bC] && bz[bC].events
            }
            if (bA) {
                bB = bz[bu];
                if (bB == null) {
                    bB = bz[b.camelCase(bu)]
                }
            } else {
                bB = bz
            }
            return bB
        },
        removeData: function (bx, bv, by) {
            if (!b.acceptData(bx)) {
                return
            }
            var bz, bA = b.expando,
                bB = bx.nodeType,
                bu = bB ? b.cache : bx,
                bw = bB ? bx[b.expando] : b.expando;
            if (!bu[bw]) {
                return
            }
            if (bv) {
                bz = by ? bu[bw][bA] : bu[bw];
                if (bz) {
                    if (!bz[bv]) {
                        bv = b.camelCase(bv)
                    }
                    delete bz[bv];
                    if (!U(bz)) {
                        return
                    }
                }
            }
            if (by) {
                delete bu[bw][bA];
                if (!U(bu[bw])) {
                    return
                }
            }
            var e = bu[bw][bA];
            if (b.support.deleteExpando || !bu.setInterval) {
                delete bu[bw]
            } else {
                bu[bw] = null
            } if (e) {
                bu[bw] = {};
                if (!bB) {
                    bu[bw].toJSON = b.noop
                }
                bu[bw][bA] = e
            } else {
                if (bB) {
                    if (b.support.deleteExpando) {
                        delete bx[b.expando]
                    } else {
                        if (bx.removeAttribute) {
                            bx.removeAttribute(b.expando)
                        } else {
                            bx[b.expando] = null
                        }
                    }
                }
            }
        },
        _data: function (bu, e, bv) {
            return b.data(bu, e, bv, true)
        },
        acceptData: function (bu) {
            if (bu.nodeName) {
                var e = b.noData[bu.nodeName.toLowerCase()];
                if (e) {
                    return !(e === true || bu.getAttribute("classid") !== e)
                }
            }
            return true
        }
    });
    b.fn.extend({
        data: function (bx, bz) {
            var by = null;
            if (typeof bx === "undefined") {
                if (this.length) {
                    by = b.data(this[0]);
                    if (this[0].nodeType === 1) {
                        var e = this[0].attributes,
                            bv;
                        for (var bw = 0, bu = e.length; bw < bu; bw++) {
                            bv = e[bw].name;
                            if (bv.indexOf("data-") === 0) {
                                bv = b.camelCase(bv.substring(5));
                                a4(this[0], bv, by[bv])
                            }
                        }
                    }
                }
                return by
            } else {
                if (typeof bx === "object") {
                    return this.each(function () {
                        b.data(this, bx)
                    })
                }
            }
            var bA = bx.split(".");
            bA[1] = bA[1] ? "." + bA[1] : "";
            if (bz === M) {
                by = this.triggerHandler("getData" + bA[1] + "!", [bA[0]]);
                if (by === M && this.length) {
                    by = b.data(this[0], bx);
                    by = a4(this[0], bx, by)
                }
                return by === M && bA[1] ? this.data(bA[0]) : by
            } else {
                return this.each(function () {
                    var bC = b(this),
                        bB = [bA[0], bz];
                    bC.triggerHandler("setData" + bA[1] + "!", bB);
                    b.data(this, bx, bz);
                    bC.triggerHandler("changeData" + bA[1] + "!", bB)
                })
            }
        },
        removeData: function (e) {
            return this.each(function () {
                b.removeData(this, e)
            })
        }
    });

    function a4(bw, bv, bx) {
        if (bx === M && bw.nodeType === 1) {
            var bu = "data-" + bv.replace(ay, "-$1").toLowerCase();
            bx = bw.getAttribute(bu);
            if (typeof bx === "string") {
                try {
                    bx = bx === "true" ? true : bx === "false" ? false : bx === "null" ? null : !b.isNaN(bx) ? parseFloat(bx) : aO.test(bx) ? b.parseJSON(bx) : bx
                } catch (by) {}
                b.data(bw, bv, bx)
            } else {
                bx = M
            }
        }
        return bx
    }

    function U(bu) {
        for (var e in bu) {
            if (e !== "toJSON") {
                return false
            }
        }
        return true
    }

    function bg(bx, bw, bz) {
        var bv = bw + "defer",
            bu = bw + "queue",
            e = bw + "mark",
            by = b.data(bx, bv, M, true);
        if (by && (bz === "queue" || !b.data(bx, bu, M, true)) && (bz === "mark" || !b.data(bx, e, M, true))) {
            setTimeout(function () {
                if (!b.data(bx, bu, M, true) && !b.data(bx, e, M, true)) {
                    b.removeData(bx, bv, true);
                    by.resolve()
                }
            }, 0)
        }
    }
    b.extend({
        _mark: function (bu, e) {
            if (bu) {
                e = (e || "fx") + "mark";
                b.data(bu, e, (b.data(bu, e, M, true) || 0) + 1, true)
            }
        },
        _unmark: function (bx, bw, bu) {
            if (bx !== true) {
                bu = bw;
                bw = bx;
                bx = false
            }
            if (bw) {
                bu = bu || "fx";
                var e = bu + "mark",
                    bv = bx ? 0 : ((b.data(bw, e, M, true) || 1) - 1);
                if (bv) {
                    b.data(bw, e, bv, true)
                } else {
                    b.removeData(bw, e, true);
                    bg(bw, bu, "mark")
                }
            }
        },
        queue: function (bu, e, bw) {
            if (bu) {
                e = (e || "fx") + "queue";
                var bv = b.data(bu, e, M, true);
                if (bw) {
                    if (!bv || b.isArray(bw)) {
                        bv = b.data(bu, e, b.makeArray(bw), true)
                    } else {
                        bv.push(bw)
                    }
                }
                return bv || []
            }
        },
        dequeue: function (bw, bv) {
            bv = bv || "fx";
            var e = b.queue(bw, bv),
                bu = e.shift(),
                bx;
            if (bu === "inprogress") {
                bu = e.shift()
            }
            if (bu) {
                if (bv === "fx") {
                    e.unshift("inprogress")
                }
                bu.call(bw, function () {
                    b.dequeue(bw, bv)
                })
            }
            if (!e.length) {
                b.removeData(bw, bv + "queue", true);
                bg(bw, bv, "queue")
            }
        }
    });
    b.fn.extend({
        queue: function (e, bu) {
            if (typeof e !== "string") {
                bu = e;
                e = "fx"
            }
            if (bu === M) {
                return b.queue(this[0], e)
            }
            return this.each(function () {
                var bv = b.queue(this, e, bu);
                if (e === "fx" && bv[0] !== "inprogress") {
                    b.dequeue(this, e)
                }
            })
        },
        dequeue: function (e) {
            return this.each(function () {
                b.dequeue(this, e)
            })
        },
        delay: function (bu, e) {
            bu = b.fx ? b.fx.speeds[bu] || bu : bu;
            e = e || "fx";
            return this.queue(e, function () {
                var bv = this;
                setTimeout(function () {
                    b.dequeue(bv, e)
                }, bu)
            })
        },
        clearQueue: function (e) {
            return this.queue(e || "fx", [])
        },
        promise: function (bC, bv) {
            if (typeof bC !== "string") {
                bv = bC;
                bC = M
            }
            bC = bC || "fx";
            var e = b.Deferred(),
                bu = this,
                bx = bu.length,
                bA = 1,
                by = bC + "defer",
                bz = bC + "queue",
                bB = bC + "mark",
                bw;

            function bD() {
                if (!(--bA)) {
                    e.resolveWith(bu, [bu])
                }
            }
            while (bx--) {
                if ((bw = b.data(bu[bx], by, M, true) || (b.data(bu[bx], bz, M, true) || b.data(bu[bx], bB, M, true)) && b.data(bu[bx], by, b._Deferred(), true))) {
                    bA++;
                    bw.done(bD)
                }
            }
            bD();
            return e.promise()
        }
    });
    var aM = /[\n\t\r]/g,
        ad = /\s+/,
        aQ = /\r/g,
        g = /^(?:button|input)$/i,
        F = /^(?:button|input|object|select|textarea)$/i,
        n = /^a(?:rea)?$/i,
        am = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        bd, aX;
    b.fn.extend({
        attr: function (e, bu) {
            return b.access(this, e, bu, true, b.attr)
        },
        removeAttr: function (e) {
            return this.each(function () {
                b.removeAttr(this, e)
            })
        },
        prop: function (e, bu) {
            return b.access(this, e, bu, true, b.prop)
        },
        removeProp: function (e) {
            e = b.propFix[e] || e;
            return this.each(function () {
                try {
                    this[e] = M;
                    delete this[e]
                } catch (bu) {}
            })
        },
        addClass: function (bx) {
            var bz, bv, bu, bw, by, bA, e;
            if (b.isFunction(bx)) {
                return this.each(function (bB) {
                    b(this).addClass(bx.call(this, bB, this.className))
                })
            }
            if (bx && typeof bx === "string") {
                bz = bx.split(ad);
                for (bv = 0, bu = this.length; bv < bu; bv++) {
                    bw = this[bv];
                    if (bw.nodeType === 1) {
                        if (!bw.className && bz.length === 1) {
                            bw.className = bx
                        } else {
                            by = " " + bw.className + " ";
                            for (bA = 0, e = bz.length; bA < e; bA++) {
                                if (!~by.indexOf(" " + bz[bA] + " ")) {
                                    by += bz[bA] + " "
                                }
                            }
                            bw.className = b.trim(by)
                        }
                    }
                }
            }
            return this
        },
        removeClass: function (by) {
            var bz, bv, bu, bx, bw, bA, e;
            if (b.isFunction(by)) {
                return this.each(function (bB) {
                    b(this).removeClass(by.call(this, bB, this.className))
                })
            }
            if ((by && typeof by === "string") || by === M) {
                bz = (by || "").split(ad);
                for (bv = 0, bu = this.length; bv < bu; bv++) {
                    bx = this[bv];
                    if (bx.nodeType === 1 && bx.className) {
                        if (by) {
                            bw = (" " + bx.className + " ").replace(aM, " ");
                            for (bA = 0, e = bz.length; bA < e; bA++) {
                                bw = bw.replace(" " + bz[bA] + " ", " ")
                            }
                            bx.className = b.trim(bw)
                        } else {
                            bx.className = ""
                        }
                    }
                }
            }
            return this
        },
        toggleClass: function (bw, bu) {
            var bv = typeof bw,
                e = typeof bu === "boolean";
            if (b.isFunction(bw)) {
                return this.each(function (bx) {
                    b(this).toggleClass(bw.call(this, bx, this.className, bu), bu)
                })
            }
            return this.each(function () {
                if (bv === "string") {
                    var bz, by = 0,
                        bx = b(this),
                        bA = bu,
                        bB = bw.split(ad);
                    while ((bz = bB[by++])) {
                        bA = e ? bA : !bx.hasClass(bz);
                        bx[bA ? "addClass" : "removeClass"](bz)
                    }
                } else {
                    if (bv === "undefined" || bv === "boolean") {
                        if (this.className) {
                            b._data(this, "__className__", this.className)
                        }
                        this.className = this.className || bw === false ? "" : b._data(this, "__className__") || ""
                    }
                }
            })
        },
        hasClass: function (e) {
            var bw = " " + e + " ";
            for (var bv = 0, bu = this.length; bv < bu; bv++) {
                if (this[bv].nodeType === 1 && (" " + this[bv].className + " ").replace(aM, " ").indexOf(bw) > -1) {
                    return true
                }
            }
            return false
        },
        val: function (bw) {
            var e, bu, bv = this[0];
            if (!arguments.length) {
                if (bv) {
                    e = b.valHooks[bv.nodeName.toLowerCase()] || b.valHooks[bv.type];
                    if (e && "get" in e && (bu = e.get(bv, "value")) !== M) {
                        return bu
                    }
                    bu = bv.value;
                    return typeof bu === "string" ? bu.replace(aQ, "") : bu == null ? "" : bu
                }
                return M
            }
            var bx = b.isFunction(bw);
            return this.each(function (bz) {
                var by = b(this),
                    bA;
                if (this.nodeType !== 1) {
                    return
                }
                if (bx) {
                    bA = bw.call(this, bz, by.val())
                } else {
                    bA = bw
                } if (bA == null) {
                    bA = ""
                } else {
                    if (typeof bA === "number") {
                        bA += ""
                    } else {
                        if (b.isArray(bA)) {
                            bA = b.map(bA, function (bB) {
                                return bB == null ? "" : bB + ""
                            })
                        }
                    }
                }
                e = b.valHooks[this.nodeName.toLowerCase()] || b.valHooks[this.type];
                if (!e || !("set" in e) || e.set(this, bA, "value") === M) {
                    this.value = bA
                }
            })
        }
    });
    b.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var bu = e.attributes.value;
                    return !bu || bu.specified ? e.value : e.text
                }
            },
            select: {
                get: function (e) {
                    var bz, bx = e.selectedIndex,
                        bA = [],
                        bB = e.options,
                        bw = e.type === "select-one";
                    if (bx < 0) {
                        return null
                    }
                    for (var bu = bw ? bx : 0, by = bw ? bx + 1 : bB.length; bu < by; bu++) {
                        var bv = bB[bu];
                        if (bv.selected && (b.support.optDisabled ? !bv.disabled : bv.getAttribute("disabled") === null) && (!bv.parentNode.disabled || !b.nodeName(bv.parentNode, "optgroup"))) {
                            bz = b(bv).val();
                            if (bw) {
                                return bz
                            }
                            bA.push(bz)
                        }
                    }
                    if (bw && !bA.length && bB.length) {
                        return b(bB[bx]).val()
                    }
                    return bA
                },
                set: function (bu, bv) {
                    var e = b.makeArray(bv);
                    b(bu).find("option").each(function () {
                        this.selected = b.inArray(b(this).val(), e) >= 0
                    });
                    if (!e.length) {
                        bu.selectedIndex = -1
                    }
                    return e
                }
            }
        },
        attrFn: {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true
        },
        attrFix: {
            tabindex: "tabIndex"
        },
        attr: function (bz, bw, bA, by) {
            var bu = bz.nodeType;
            if (!bz || bu === 3 || bu === 8 || bu === 2) {
                return M
            }
            if (by && bw in b.attrFn) {
                return b(bz)[bw](bA)
            }
            if (!("getAttribute" in bz)) {
                return b.prop(bz, bw, bA)
            }
            var bv, e, bx = bu !== 1 || !b.isXMLDoc(bz);
            if (bx) {
                bw = b.attrFix[bw] || bw;
                e = b.attrHooks[bw];
                if (!e) {
                    if (am.test(bw)) {
                        e = aX
                    } else {
                        if (bd) {
                            e = bd
                        }
                    }
                }
            }
            if (bA !== M) {
                if (bA === null) {
                    b.removeAttr(bz, bw);
                    return M
                } else {
                    if (e && "set" in e && bx && (bv = e.set(bz, bA, bw)) !== M) {
                        return bv
                    } else {
                        bz.setAttribute(bw, "" + bA);
                        return bA
                    }
                }
            } else {
                if (e && "get" in e && bx && (bv = e.get(bz, bw)) !== null) {
                    return bv
                } else {
                    bv = bz.getAttribute(bw);
                    return bv === null ? M : bv
                }
            }
        },
        removeAttr: function (bu, e) {
            var bv;
            if (bu.nodeType === 1) {
                e = b.attrFix[e] || e;
                b.attr(bu, e, "");
                bu.removeAttribute(e);
                if (am.test(e) && (bv = b.propFix[e] || e) in bu) {
                    bu[bv] = false
                }
            }
        },
        attrHooks: {
            type: {
                set: function (e, bu) {
                    if (g.test(e.nodeName) && e.parentNode) {
                        b.error("type property can't be changed")
                    } else {
                        if (!b.support.radioValue && bu === "radio" && b.nodeName(e, "input")) {
                            var bv = e.value;
                            e.setAttribute("type", bu);
                            if (bv) {
                                e.value = bv
                            }
                            return bu
                        }
                    }
                }
            },
            value: {
                get: function (bu, e) {
                    if (bd && b.nodeName(bu, "button")) {
                        return bd.get(bu, e)
                    }
                    return e in bu ? bu.value : null
                },
                set: function (bu, bv, e) {
                    if (bd && b.nodeName(bu, "button")) {
                        return bd.set(bu, bv, e)
                    }
                    bu.value = bv
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (by, bw, bz) {
            var bu = by.nodeType;
            if (!by || bu === 3 || bu === 8 || bu === 2) {
                return M
            }
            var bv, e, bx = bu !== 1 || !b.isXMLDoc(by);
            if (bx) {
                bw = b.propFix[bw] || bw;
                e = b.propHooks[bw]
            }
            if (bz !== M) {
                if (e && "set" in e && (bv = e.set(by, bz, bw)) !== M) {
                    return bv
                } else {
                    return (by[bw] = bz)
                }
            } else {
                if (e && "get" in e && (bv = e.get(by, bw)) !== null) {
                    return bv
                } else {
                    return by[bw]
                }
            }
        },
        propHooks: {
            tabIndex: {
                get: function (bu) {
                    var e = bu.getAttributeNode("tabindex");
                    return e && e.specified ? parseInt(e.value, 10) : F.test(bu.nodeName) || n.test(bu.nodeName) && bu.href ? 0 : M
                }
            }
        }
    });
    b.attrHooks.tabIndex = b.propHooks.tabIndex;
    aX = {
        get: function (bu, e) {
            var bv;
            return b.prop(bu, e) === true || (bv = bu.getAttributeNode(e)) && bv.nodeValue !== false ? e.toLowerCase() : M
        },
        set: function (bu, bw, e) {
            var bv;
            if (bw === false) {
                b.removeAttr(bu, e)
            } else {
                bv = b.propFix[e] || e;
                if (bv in bu) {
                    bu[bv] = true
                }
                bu.setAttribute(e, e.toLowerCase())
            }
            return e
        }
    };
    if (!b.support.getSetAttribute) {
        bd = b.valHooks.button = {
            get: function (bv, bu) {
                var e;
                e = bv.getAttributeNode(bu);
                return e && e.nodeValue !== "" ? e.nodeValue : M
            },
            set: function (bv, bw, bu) {
                var e = bv.getAttributeNode(bu);
                if (!e) {
                    e = at.createAttribute(bu);
                    bv.setAttributeNode(e)
                }
                return (e.nodeValue = bw + "")
            }
        };
        b.each(["width", "height"], function (bu, e) {
            b.attrHooks[e] = b.extend(b.attrHooks[e], {
                set: function (bv, bw) {
                    if (bw === "") {
                        bv.setAttribute(e, "auto");
                        return bw
                    }
                }
            })
        })
    }
    if (!b.support.hrefNormalized) {
        b.each(["href", "src", "width", "height"], function (bu, e) {
            b.attrHooks[e] = b.extend(b.attrHooks[e], {
                get: function (bw) {
                    var bv = bw.getAttribute(e, 2);
                    return bv === null ? M : bv
                }
            })
        })
    }
    if (!b.support.style) {
        b.attrHooks.style = {
            get: function (e) {
                return e.style.cssText.toLowerCase() || M
            },
            set: function (e, bu) {
                return (e.style.cssText = "" + bu)
            }
        }
    }
    if (!b.support.optSelected) {
        b.propHooks.selected = b.extend(b.propHooks.selected, {
            get: function (bu) {
                var e = bu.parentNode;
                if (e) {
                    e.selectedIndex;
                    if (e.parentNode) {
                        e.parentNode.selectedIndex
                    }
                }
                return null
            }
        })
    }
    if (!b.support.checkOn) {
        b.each(["radio", "checkbox"], function () {
            b.valHooks[this] = {
                get: function (e) {
                    return e.getAttribute("value") === null ? "on" : e.value
                }
            }
        })
    }
    b.each(["radio", "checkbox"], function () {
        b.valHooks[this] = b.extend(b.valHooks[this], {
            set: function (e, bu) {
                if (b.isArray(bu)) {
                    return (e.checked = b.inArray(b(e).val(), bu) >= 0)
                }
            }
        })
    });
    var aZ = /\.(.*)$/,
        bc = /^(?:textarea|input|select)$/i,
        P = /\./g,
        bh = / /g,
        aE = /[^\w\s.|`]/g,
        I = function (e) {
            return e.replace(aE, "\\$&")
        };
    b.event = {
        add: function (bw, bA, bF, by) {
            if (bw.nodeType === 3 || bw.nodeType === 8) {
                return
            }
            if (bF === false) {
                bF = bj
            } else {
                if (!bF) {
                    return
                }
            }
            var bu, bE;
            if (bF.handler) {
                bu = bF;
                bF = bu.handler
            }
            if (!bF.guid) {
                bF.guid = b.guid++
            }
            var bB = b._data(bw);
            if (!bB) {
                return
            }
            var bG = bB.events,
                bz = bB.handle;
            if (!bG) {
                bB.events = bG = {}
            }
            if (!bz) {
                bB.handle = bz = function (bH) {
                    return typeof b !== "undefined" && (!bH || b.event.triggered !== bH.type) ? b.event.handle.apply(bz.elem, arguments) : M
                }
            }
            bz.elem = bw;
            bA = bA.split(" ");
            var bD, bx = 0,
                e;
            while ((bD = bA[bx++])) {
                bE = bu ? b.extend({}, bu) : {
                    handler: bF,
                    data: by
                };
                if (bD.indexOf(".") > -1) {
                    e = bD.split(".");
                    bD = e.shift();
                    bE.namespace = e.slice(0).sort().join(".")
                } else {
                    e = [];
                    bE.namespace = ""
                }
                bE.type = bD;
                if (!bE.guid) {
                    bE.guid = bF.guid
                }
                var bv = bG[bD],
                    bC = b.event.special[bD] || {};
                if (!bv) {
                    bv = bG[bD] = [];
                    if (!bC.setup || bC.setup.call(bw, by, e, bz) === false) {
                        if (bw.addEventListener) {
                            bw.addEventListener(bD, bz, false)
                        } else {
                            if (bw.attachEvent) {
                                bw.attachEvent("on" + bD, bz)
                            }
                        }
                    }
                }
                if (bC.add) {
                    bC.add.call(bw, bE);
                    if (!bE.handler.guid) {
                        bE.handler.guid = bF.guid
                    }
                }
                bv.push(bE);
                b.event.global[bD] = true
            }
            bw = null
        },
        global: {},
        remove: function (bI, bD, bv, bz) {
            if (bI.nodeType === 3 || bI.nodeType === 8) {
                return
            }
            if (bv === false) {
                bv = bj
            }
            var bL, by, bA, bF, bG = 0,
                bw, bB, bE, bx, bC, e, bK, bH = b.hasData(bI) && b._data(bI),
                bu = bH && bH.events;
            if (!bH || !bu) {
                return
            }
            if (bD && bD.type) {
                bv = bD.handler;
                bD = bD.type
            }
            if (!bD || typeof bD === "string" && bD.charAt(0) === ".") {
                bD = bD || "";
                for (by in bu) {
                    b.event.remove(bI, by + bD)
                }
                return
            }
            bD = bD.split(" ");
            while ((by = bD[bG++])) {
                bK = by;
                e = null;
                bw = by.indexOf(".") < 0;
                bB = [];
                if (!bw) {
                    bB = by.split(".");
                    by = bB.shift();
                    bE = new RegExp("(^|\\.)" + b.map(bB.slice(0).sort(), I).join("\\.(?:.*\\.)?") + "(\\.|$)")
                }
                bC = bu[by];
                if (!bC) {
                    continue
                }
                if (!bv) {
                    for (bF = 0; bF < bC.length; bF++) {
                        e = bC[bF];
                        if (bw || bE.test(e.namespace)) {
                            b.event.remove(bI, bK, e.handler, bF);
                            bC.splice(bF--, 1)
                        }
                    }
                    continue
                }
                bx = b.event.special[by] || {};
                for (bF = bz || 0; bF < bC.length; bF++) {
                    e = bC[bF];
                    if (bv.guid === e.guid) {
                        if (bw || bE.test(e.namespace)) {
                            if (bz == null) {
                                bC.splice(bF--, 1)
                            }
                            if (bx.remove) {
                                bx.remove.call(bI, e)
                            }
                        }
                        if (bz != null) {
                            break
                        }
                    }
                }
                if (bC.length === 0 || bz != null && bC.length === 1) {
                    if (!bx.teardown || bx.teardown.call(bI, bB) === false) {
                        b.removeEvent(bI, by, bH.handle)
                    }
                    bL = null;
                    delete bu[by]
                }
            }
            if (b.isEmptyObject(bu)) {
                var bJ = bH.handle;
                if (bJ) {
                    bJ.elem = null
                }
                delete bH.events;
                delete bH.handle;
                if (b.isEmptyObject(bH)) {
                    b.removeData(bI, M, true)
                }
            }
        },
        customEvent: {
            getData: true,
            setData: true,
            changeData: true
        },
        trigger: function (e, bA, by, bF) {
            var bD = e.type || e,
                bv = [],
                bu;
            if (bD.indexOf("!") >= 0) {
                bD = bD.slice(0, -1);
                bu = true
            }
            if (bD.indexOf(".") >= 0) {
                bv = bD.split(".");
                bD = bv.shift();
                bv.sort()
            }
            if ((!by || b.event.customEvent[bD]) && !b.event.global[bD]) {
                return
            }
            e = typeof e === "object" ? e[b.expando] ? e : new b.Event(bD, e) : new b.Event(bD);
            e.type = bD;
            e.exclusive = bu;
            e.namespace = bv.join(".");
            e.namespace_re = new RegExp("(^|\\.)" + bv.join("\\.(?:.*\\.)?") + "(\\.|$)");
            if (bF || !by) {
                e.preventDefault();
                e.stopPropagation()
            }
            if (!by) {
                b.each(b.cache, function () {
                    var bH = b.expando,
                        bG = this[bH];
                    if (bG && bG.events && bG.events[bD]) {
                        b.event.trigger(e, bA, bG.handle.elem)
                    }
                });
                return
            }
            if (by.nodeType === 3 || by.nodeType === 8) {
                return
            }
            e.result = M;
            e.target = by;
            bA = bA != null ? b.makeArray(bA) : [];
            bA.unshift(e);
            var bE = by,
                bw = bD.indexOf(":") < 0 ? "on" + bD : "";
            do {
                var bB = b._data(bE, "handle");
                e.currentTarget = bE;
                if (bB) {
                    bB.apply(bE, bA)
                }
                if (bw && b.acceptData(bE) && bE[bw] && bE[bw].apply(bE, bA) === false) {
                    e.result = false;
                    e.preventDefault()
                }
                bE = bE.parentNode || bE.ownerDocument || bE === e.target.ownerDocument && ba
            } while (bE && !e.isPropagationStopped());
            if (!e.isDefaultPrevented()) {
                var bx, bC = b.event.special[bD] || {};
                if ((!bC._default || bC._default.call(by.ownerDocument, e) === false) && !(bD === "click" && b.nodeName(by, "a")) && b.acceptData(by)) {
                    try {
                        if (bw && by[bD]) {
                            bx = by[bw];
                            if (bx) {
                                by[bw] = null
                            }
                            b.event.triggered = bD;
                            by[bD]()
                        }
                    } catch (bz) {}
                    if (bx) {
                        by[bw] = bx
                    }
                    b.event.triggered = M
                }
            }
            return e.result
        },
        handle: function (bA) {
            bA = b.event.fix(bA || ba.event);
            var bu = ((b._data(this, "events") || {})[bA.type] || []).slice(0),
                bz = !bA.exclusive && !bA.namespace,
                bx = Array.prototype.slice.call(arguments, 0);
            bx[0] = bA;
            bA.currentTarget = this;
            for (var bw = 0, e = bu.length; bw < e; bw++) {
                var by = bu[bw];
                if (bz || bA.namespace_re.test(by.namespace)) {
                    bA.handler = by.handler;
                    bA.data = by.data;
                    bA.handleObj = by;
                    var bv = by.handler.apply(this, bx);
                    if (bv !== M) {
                        bA.result = bv;
                        if (bv === false) {
                            bA.preventDefault();
                            bA.stopPropagation()
                        }
                    }
                    if (bA.isImmediatePropagationStopped()) {
                        break
                    }
                }
            }
            return bA.result
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function (bx) {
            if (bx[b.expando]) {
                return bx
            }
            var bu = bx;
            bx = b.Event(bu);
            for (var bv = this.props.length, bz; bv;) {
                bz = this.props[--bv];
                bx[bz] = bu[bz]
            }
            if (!bx.target) {
                bx.target = bx.srcElement || at
            }
            if (bx.target.nodeType === 3) {
                bx.target = bx.target.parentNode
            }
            if (!bx.relatedTarget && bx.fromElement) {
                bx.relatedTarget = bx.fromElement === bx.target ? bx.toElement : bx.fromElement
            }
            if (bx.pageX == null && bx.clientX != null) {
                var bw = bx.target.ownerDocument || at,
                    by = bw.documentElement,
                    e = bw.body;
                bx.pageX = bx.clientX + (by && by.scrollLeft || e && e.scrollLeft || 0) - (by && by.clientLeft || e && e.clientLeft || 0);
                bx.pageY = bx.clientY + (by && by.scrollTop || e && e.scrollTop || 0) - (by && by.clientTop || e && e.clientTop || 0)
            }
            if (bx.which == null && (bx.charCode != null || bx.keyCode != null)) {
                bx.which = bx.charCode != null ? bx.charCode : bx.keyCode
            }
            if (!bx.metaKey && bx.ctrlKey) {
                bx.metaKey = bx.ctrlKey
            }
            if (!bx.which && bx.button !== M) {
                bx.which = (bx.button & 1 ? 1 : (bx.button & 2 ? 3 : (bx.button & 4 ? 2 : 0)))
            }
            return bx
        },
        guid: 100000000,
        proxy: b.proxy,
        special: {
            ready: {
                setup: b.bindReady,
                teardown: b.noop
            },
            live: {
                add: function (e) {
                    b.event.add(this, r(e.origType, e.selector), b.extend({}, e, {
                        handler: ai,
                        guid: e.handler.guid
                    }))
                },
                remove: function (e) {
                    b.event.remove(this, r(e.origType, e.selector), e)
                }
            },
            beforeunload: {
                setup: function (bv, bu, e) {
                    if (b.isWindow(this)) {
                        this.onbeforeunload = e
                    }
                },
                teardown: function (bu, e) {
                    if (this.onbeforeunload === e) {
                        this.onbeforeunload = null
                    }
                }
            }
        }
    };
    b.removeEvent = at.removeEventListener ? function (bu, e, bv) {
        if (bu.removeEventListener) {
            bu.removeEventListener(e, bv, false)
        }
    } : function (bu, e, bv) {
        if (bu.detachEvent) {
            bu.detachEvent("on" + e, bv)
        }
    };
    b.Event = function (bu, e) {
        if (!this.preventDefault) {
            return new b.Event(bu, e)
        }
        if (bu && bu.type) {
            this.originalEvent = bu;
            this.type = bu.type;
            this.isDefaultPrevented = (bu.defaultPrevented || bu.returnValue === false || bu.getPreventDefault && bu.getPreventDefault()) ? k : bj
        } else {
            this.type = bu
        } if (e) {
            b.extend(this, e)
        }
        this.timeStamp = b.now();
        this[b.expando] = true
    };

    function bj() {
        return false
    }

    function k() {
        return true
    }
    b.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = k;
            var bu = this.originalEvent;
            if (!bu) {
                return
            }
            if (bu.preventDefault) {
                bu.preventDefault()
            } else {
                bu.returnValue = false
            }
        },
        stopPropagation: function () {
            this.isPropagationStopped = k;
            var bu = this.originalEvent;
            if (!bu) {
                return
            }
            if (bu.stopPropagation) {
                bu.stopPropagation()
            }
            bu.cancelBubble = true
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = k;
            this.stopPropagation()
        },
        isDefaultPrevented: bj,
        isPropagationStopped: bj,
        isImmediatePropagationStopped: bj
    };
    var ac = function (bv) {
        var bw = bv.relatedTarget,
            e = false,
            bu = bv.type;
        bv.type = bv.data;
        if (bw !== this) {
            if (bw) {
                e = b.contains(this, bw)
            }
            if (!e) {
                b.event.handle.apply(this, arguments);
                bv.type = bu
            }
        }
    }, aU = function (e) {
            e.type = e.data;
            b.event.handle.apply(this, arguments)
        };
    b.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (bu, e) {
        b.event.special[bu] = {
            setup: function (bv) {
                b.event.add(this, e, bv && bv.selector ? aU : ac, bu)
            },
            teardown: function (bv) {
                b.event.remove(this, e, bv && bv.selector ? aU : ac)
            }
        }
    });
    if (!b.support.submitBubbles) {
        b.event.special.submit = {
            setup: function (bu, e) {
                if (!b.nodeName(this, "form")) {
                    b.event.add(this, "click.specialSubmit", function (bx) {
                        var bw = bx.target,
                            bv = b.nodeName(bw, "input") || b.nodeName(bw, "button") ? bw.type : "";
                        if ((bv === "submit" || bv === "image") && b(bw).closest("form").length) {
                            aW("submit", this, arguments)
                        }
                    });
                    b.event.add(this, "keypress.specialSubmit", function (bx) {
                        var bw = bx.target,
                            bv = b.nodeName(bw, "input") || b.nodeName(bw, "button") ? bw.type : "";
                        if ((bv === "text" || bv === "password") && b(bw).closest("form").length && bx.keyCode === 13) {
                            aW("submit", this, arguments)
                        }
                    })
                } else {
                    return false
                }
            },
            teardown: function (e) {
                b.event.remove(this, ".specialSubmit")
            }
        }
    }
    if (!b.support.changeBubbles) {
        var bm, m = function (bu) {
                var e = b.nodeName(bu, "input") ? bu.type : "",
                    bv = bu.value;
                if (e === "radio" || e === "checkbox") {
                    bv = bu.checked
                } else {
                    if (e === "select-multiple") {
                        bv = bu.selectedIndex > -1 ? b.map(bu.options, function (bw) {
                            return bw.selected
                        }).join("-") : ""
                    } else {
                        if (b.nodeName(bu, "select")) {
                            bv = bu.selectedIndex
                        }
                    }
                }
                return bv
            }, aa = function aa(bw) {
                var bu = bw.target,
                    bv, bx;
                if (!bc.test(bu.nodeName) || bu.readOnly) {
                    return
                }
                bv = b._data(bu, "_change_data");
                bx = m(bu);
                if (bw.type !== "focusout" || bu.type !== "radio") {
                    b._data(bu, "_change_data", bx)
                }
                if (bv === M || bx === bv) {
                    return
                }
                if (bv != null || bx) {
                    bw.type = "change";
                    bw.liveFired = M;
                    b.event.trigger(bw, arguments[1], bu)
                }
            };
        b.event.special.change = {
            filters: {
                focusout: aa,
                beforedeactivate: aa,
                click: function (bw) {
                    var bv = bw.target,
                        bu = b.nodeName(bv, "input") ? bv.type : "";
                    if (bu === "radio" || bu === "checkbox" || b.nodeName(bv, "select")) {
                        aa.call(this, bw)
                    }
                },
                keydown: function (bw) {
                    var bv = bw.target,
                        bu = b.nodeName(bv, "input") ? bv.type : "";
                    if ((bw.keyCode === 13 && !b.nodeName(bv, "textarea")) || (bw.keyCode === 32 && (bu === "checkbox" || bu === "radio")) || bu === "select-multiple") {
                        aa.call(this, bw)
                    }
                },
                beforeactivate: function (bv) {
                    var bu = bv.target;
                    b._data(bu, "_change_data", m(bu))
                }
            },
            setup: function (bv, bu) {
                if (this.type === "file") {
                    return false
                }
                for (var e in bm) {
                    b.event.add(this, e + ".specialChange", bm[e])
                }
                return bc.test(this.nodeName)
            },
            teardown: function (e) {
                b.event.remove(this, ".specialChange");
                return bc.test(this.nodeName)
            }
        };
        bm = b.event.special.change.filters;
        bm.focus = bm.beforeactivate
    }

    function aW(bu, bw, e) {
        var bv = b.extend({}, e[0]);
        bv.type = bu;
        bv.originalEvent = {};
        bv.liveFired = M;
        b.event.handle.call(bw, bv);
        if (bv.isDefaultPrevented()) {
            e[0].preventDefault()
        }
    }
    if (!b.support.focusinBubbles) {
        b.each({
            focus: "focusin",
            blur: "focusout"
        }, function (bw, e) {
            var bu = 0;
            b.event.special[e] = {
                setup: function () {
                    if (bu++ === 0) {
                        at.addEventListener(bw, bv, true)
                    }
                },
                teardown: function () {
                    if (--bu === 0) {
                        at.removeEventListener(bw, bv, true)
                    }
                }
            };

            function bv(bx) {
                var by = b.event.fix(bx);
                by.type = e;
                by.originalEvent = {};
                b.event.trigger(by, null, by.target);
                if (by.isDefaultPrevented()) {
                    bx.preventDefault()
                }
            }
        })
    }
    b.each(["bind", "one"], function (bu, e) {
        b.fn[e] = function (bA, bB, bz) {
            var by;
            if (typeof bA === "object") {
                for (var bx in bA) {
                    this[e](bx, bB, bA[bx], bz)
                }
                return this
            }
            if (arguments.length === 2 || bB === false) {
                bz = bB;
                bB = M
            }
            if (e === "one") {
                by = function (bC) {
                    b(this).unbind(bC, by);
                    return bz.apply(this, arguments)
                };
                by.guid = bz.guid || b.guid++
            } else {
                by = bz
            } if (bA === "unload" && e !== "one") {
                this.one(bA, bB, bz)
            } else {
                for (var bw = 0, bv = this.length; bw < bv; bw++) {
                    b.event.add(this[bw], bA, by, bB)
                }
            }
            return this
        }
    });
    b.fn.extend({
        unbind: function (bx, bw) {
            if (typeof bx === "object" && !bx.preventDefault) {
                for (var bv in bx) {
                    this.unbind(bv, bx[bv])
                }
            } else {
                for (var bu = 0, e = this.length; bu < e; bu++) {
                    b.event.remove(this[bu], bx, bw)
                }
            }
            return this
        },
        delegate: function (e, bu, bw, bv) {
            return this.live(bu, bw, bv, e)
        },
        undelegate: function (e, bu, bv) {
            if (arguments.length === 0) {
                return this.unbind("live")
            } else {
                return this.die(bu, null, bv, e)
            }
        },
        trigger: function (e, bu) {
            return this.each(function () {
                b.event.trigger(e, bu, this)
            })
        },
        triggerHandler: function (e, bu) {
            if (this[0]) {
                return b.event.trigger(e, bu, this[0], true)
            }
        },
        toggle: function (bw) {
            var bu = arguments,
                e = bw.guid || b.guid++,
                bv = 0,
                bx = function (by) {
                    var bz = (b.data(this, "lastToggle" + bw.guid) || 0) % bv;
                    b.data(this, "lastToggle" + bw.guid, bz + 1);
                    by.preventDefault();
                    return bu[bz].apply(this, arguments) || false
                };
            bx.guid = e;
            while (bv < bu.length) {
                bu[bv++].guid = e
            }
            return this.click(bx)
        },
        hover: function (e, bu) {
            return this.mouseenter(e).mouseleave(bu || e)
        }
    });
    var aS = {
        focus: "focusin",
        blur: "focusout",
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    b.each(["live", "die"], function (bu, e) {
        b.fn[e] = function (bE, bB, bG, bx) {
            var bF, bC = 0,
                bD, bw, bI, bz = bx || this.selector,
                bv = bx ? this : b(this.context);
            if (typeof bE === "object" && !bE.preventDefault) {
                for (var bH in bE) {
                    bv[e](bH, bB, bE[bH], bz)
                }
                return this
            }
            if (e === "die" && !bE && bx && bx.charAt(0) === ".") {
                bv.unbind(bx);
                return this
            }
            if (bB === false || b.isFunction(bB)) {
                bG = bB || bj;
                bB = M
            }
            bE = (bE || "").split(" ");
            while ((bF = bE[bC++]) != null) {
                bD = aZ.exec(bF);
                bw = "";
                if (bD) {
                    bw = bD[0];
                    bF = bF.replace(aZ, "")
                }
                if (bF === "hover") {
                    bE.push("mouseenter" + bw, "mouseleave" + bw);
                    continue
                }
                bI = bF;
                if (aS[bF]) {
                    bE.push(aS[bF] + bw);
                    bF = bF + bw
                } else {
                    bF = (aS[bF] || bF) + bw
                } if (e === "live") {
                    for (var bA = 0, by = bv.length; bA < by; bA++) {
                        b.event.add(bv[bA], "live." + r(bF, bz), {
                            data: bB,
                            selector: bz,
                            handler: bG,
                            origType: bF,
                            origHandler: bG,
                            preType: bI
                        })
                    }
                } else {
                    bv.unbind("live." + r(bF, bz), bG)
                }
            }
            return this
        }
    });

    function ai(bE) {
        var bB, bw, bK, by, e, bG, bD, bF, bC, bJ, bA, bz, bI, bH = [],
            bx = [],
            bu = b._data(this, "events");
        if (bE.liveFired === this || !bu || !bu.live || bE.target.disabled || bE.button && bE.type === "click") {
            return
        }
        if (bE.namespace) {
            bz = new RegExp("(^|\\.)" + bE.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)")
        }
        bE.liveFired = this;
        var bv = bu.live.slice(0);
        for (bD = 0; bD < bv.length; bD++) {
            e = bv[bD];
            if (e.origType.replace(aZ, "") === bE.type) {
                bx.push(e.selector)
            } else {
                bv.splice(bD--, 1)
            }
        }
        by = b(bE.target).closest(bx, bE.currentTarget);
        for (bF = 0, bC = by.length; bF < bC; bF++) {
            bA = by[bF];
            for (bD = 0; bD < bv.length; bD++) {
                e = bv[bD];
                if (bA.selector === e.selector && (!bz || bz.test(e.namespace)) && !bA.elem.disabled) {
                    bG = bA.elem;
                    bK = null;
                    if (e.preType === "mouseenter" || e.preType === "mouseleave") {
                        bE.type = e.preType;
                        bK = b(bE.relatedTarget).closest(e.selector)[0];
                        if (bK && b.contains(bG, bK)) {
                            bK = bG
                        }
                    }
                    if (!bK || bK !== bG) {
                        bH.push({
                            elem: bG,
                            handleObj: e,
                            level: bA.level
                        })
                    }
                }
            }
        }
        for (bF = 0, bC = bH.length; bF < bC; bF++) {
            by = bH[bF];
            if (bw && by.level > bw) {
                break
            }
            bE.currentTarget = by.elem;
            bE.data = by.handleObj.data;
            bE.handleObj = by.handleObj;
            bI = by.handleObj.origHandler.apply(by.elem, arguments);
            if (bI === false || bE.isPropagationStopped()) {
                bw = by.level;
                if (bI === false) {
                    bB = false
                }
                if (bE.isImmediatePropagationStopped()) {
                    break
                }
            }
        }
        return bB
    }

    function r(bu, e) {
        return (bu && bu !== "*" ? bu + "." : "") + e.replace(P, "`").replace(bh, "&")
    }
    b.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error").split(" "), function (bu, e) {
        b.fn[e] = function (bw, bv) {
            if (bv == null) {
                bv = bw;
                bw = null
            }
            return arguments.length > 0 ? this.bind(e, bw, bv) : this.trigger(e)
        };
        if (b.attrFn) {
            b.attrFn[e] = true
        }
    });
    /*!
     * Sizzle CSS Selector Engine
     *  Copyright 2011, The Dojo Foundation
     *  Released under the MIT, BSD, and GPL Licenses.
     *  More information: http://sizzlejs.com/
     */
    (function () {
        var bE = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            bF = 0,
            bI = Object.prototype.toString,
            bz = false,
            by = true,
            bG = /\\/g,
            bM = /\W/;
        [0, 0].sort(function () {
                by = false;
                return 0
            });
        var bw = function (bR, e, bU, bV) {
            bU = bU || [];
            e = e || at;
            var bX = e;
            if (e.nodeType !== 1 && e.nodeType !== 9) {
                return []
            }
            if (!bR || typeof bR !== "string") {
                return bU
            }
            var bO, bZ, b2, bN, bY, b1, b0, bT, bQ = true,
                bP = bw.isXML(e),
                bS = [],
                bW = bR;
            do {
                bE.exec("");
                bO = bE.exec(bW);
                if (bO) {
                    bW = bO[3];
                    bS.push(bO[1]);
                    if (bO[2]) {
                        bN = bO[3];
                        break
                    }
                }
            } while (bO);
            if (bS.length > 1 && bA.exec(bR)) {
                if (bS.length === 2 && bB.relative[bS[0]]) {
                    bZ = bJ(bS[0] + bS[1], e)
                } else {
                    bZ = bB.relative[bS[0]] ? [e] : bw(bS.shift(), e);
                    while (bS.length) {
                        bR = bS.shift();
                        if (bB.relative[bR]) {
                            bR += bS.shift()
                        }
                        bZ = bJ(bR, bZ)
                    }
                }
            } else {
                if (!bV && bS.length > 1 && e.nodeType === 9 && !bP && bB.match.ID.test(bS[0]) && !bB.match.ID.test(bS[bS.length - 1])) {
                    bY = bw.find(bS.shift(), e, bP);
                    e = bY.expr ? bw.filter(bY.expr, bY.set)[0] : bY.set[0]
                }
                if (e) {
                    bY = bV ? {
                        expr: bS.pop(),
                        set: bC(bV)
                    } : bw.find(bS.pop(), bS.length === 1 && (bS[0] === "~" || bS[0] === "+") && e.parentNode ? e.parentNode : e, bP);
                    bZ = bY.expr ? bw.filter(bY.expr, bY.set) : bY.set;
                    if (bS.length > 0) {
                        b2 = bC(bZ)
                    } else {
                        bQ = false
                    }
                    while (bS.length) {
                        b1 = bS.pop();
                        b0 = b1;
                        if (!bB.relative[b1]) {
                            b1 = ""
                        } else {
                            b0 = bS.pop()
                        } if (b0 == null) {
                            b0 = e
                        }
                        bB.relative[b1](b2, b0, bP)
                    }
                } else {
                    b2 = bS = []
                }
            } if (!b2) {
                b2 = bZ
            }
            if (!b2) {
                bw.error(b1 || bR)
            }
            if (bI.call(b2) === "[object Array]") {
                if (!bQ) {
                    bU.push.apply(bU, b2)
                } else {
                    if (e && e.nodeType === 1) {
                        for (bT = 0; b2[bT] != null; bT++) {
                            if (b2[bT] && (b2[bT] === true || b2[bT].nodeType === 1 && bw.contains(e, b2[bT]))) {
                                bU.push(bZ[bT])
                            }
                        }
                    } else {
                        for (bT = 0; b2[bT] != null; bT++) {
                            if (b2[bT] && b2[bT].nodeType === 1) {
                                bU.push(bZ[bT])
                            }
                        }
                    }
                }
            } else {
                bC(b2, bU)
            } if (bN) {
                bw(bN, bX, bU, bV);
                bw.uniqueSort(bU)
            }
            return bU
        };
        bw.uniqueSort = function (bN) {
            if (bH) {
                bz = by;
                bN.sort(bH);
                if (bz) {
                    for (var e = 1; e < bN.length; e++) {
                        if (bN[e] === bN[e - 1]) {
                            bN.splice(e--, 1)
                        }
                    }
                }
            }
            return bN
        };
        bw.matches = function (e, bN) {
            return bw(e, null, null, bN)
        };
        bw.matchesSelector = function (e, bN) {
            return bw(bN, null, null, [e]).length > 0
        };
        bw.find = function (bT, e, bU) {
            var bS;
            if (!bT) {
                return []
            }
            for (var bP = 0, bO = bB.order.length; bP < bO; bP++) {
                var bQ, bR = bB.order[bP];
                if ((bQ = bB.leftMatch[bR].exec(bT))) {
                    var bN = bQ[1];
                    bQ.splice(1, 1);
                    if (bN.substr(bN.length - 1) !== "\\") {
                        bQ[1] = (bQ[1] || "").replace(bG, "");
                        bS = bB.find[bR](bQ, e, bU);
                        if (bS != null) {
                            bT = bT.replace(bB.match[bR], "");
                            break
                        }
                    }
                }
            }
            if (!bS) {
                bS = typeof e.getElementsByTagName !== "undefined" ? e.getElementsByTagName("*") : []
            }
            return {
                set: bS,
                expr: bT
            }
        };
        bw.filter = function (bX, bW, b0, bQ) {
            var bS, e, bO = bX,
                b2 = [],
                bU = bW,
                bT = bW && bW[0] && bw.isXML(bW[0]);
            while (bX && bW.length) {
                for (var bV in bB.filter) {
                    if ((bS = bB.leftMatch[bV].exec(bX)) != null && bS[2]) {
                        var b1, bZ, bN = bB.filter[bV],
                            bP = bS[1];
                        e = false;
                        bS.splice(1, 1);
                        if (bP.substr(bP.length - 1) === "\\") {
                            continue
                        }
                        if (bU === b2) {
                            b2 = []
                        }
                        if (bB.preFilter[bV]) {
                            bS = bB.preFilter[bV](bS, bU, b0, b2, bQ, bT);
                            if (!bS) {
                                e = b1 = true
                            } else {
                                if (bS === true) {
                                    continue
                                }
                            }
                        }
                        if (bS) {
                            for (var bR = 0;
                                (bZ = bU[bR]) != null; bR++) {
                                if (bZ) {
                                    b1 = bN(bZ, bS, bR, bU);
                                    var bY = bQ ^ !! b1;
                                    if (b0 && b1 != null) {
                                        if (bY) {
                                            e = true
                                        } else {
                                            bU[bR] = false
                                        }
                                    } else {
                                        if (bY) {
                                            b2.push(bZ);
                                            e = true
                                        }
                                    }
                                }
                            }
                        }
                        if (b1 !== M) {
                            if (!b0) {
                                bU = b2
                            }
                            bX = bX.replace(bB.match[bV], "");
                            if (!e) {
                                return []
                            }
                            break
                        }
                    }
                }
                if (bX === bO) {
                    if (e == null) {
                        bw.error(bX)
                    } else {
                        break
                    }
                }
                bO = bX
            }
            return bU
        };
        bw.error = function (e) {
            throw "Syntax error, unrecognized expression: " + e
        };
        var bB = bw.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function (e) {
                    return e.getAttribute("href")
                },
                type: function (e) {
                    return e.getAttribute("type")
                }
            },
            relative: {
                "+": function (bS, bN) {
                    var bP = typeof bN === "string",
                        bR = bP && !bM.test(bN),
                        bT = bP && !bR;
                    if (bR) {
                        bN = bN.toLowerCase()
                    }
                    for (var bO = 0, e = bS.length, bQ; bO < e; bO++) {
                        if ((bQ = bS[bO])) {
                            while ((bQ = bQ.previousSibling) && bQ.nodeType !== 1) {}
                            bS[bO] = bT || bQ && bQ.nodeName.toLowerCase() === bN ? bQ || false : bQ === bN
                        }
                    }
                    if (bT) {
                        bw.filter(bN, bS, true)
                    }
                },
                ">": function (bS, bN) {
                    var bR, bQ = typeof bN === "string",
                        bO = 0,
                        e = bS.length;
                    if (bQ && !bM.test(bN)) {
                        bN = bN.toLowerCase();
                        for (; bO < e; bO++) {
                            bR = bS[bO];
                            if (bR) {
                                var bP = bR.parentNode;
                                bS[bO] = bP.nodeName.toLowerCase() === bN ? bP : false
                            }
                        }
                    } else {
                        for (; bO < e; bO++) {
                            bR = bS[bO];
                            if (bR) {
                                bS[bO] = bQ ? bR.parentNode : bR.parentNode === bN
                            }
                        }
                        if (bQ) {
                            bw.filter(bN, bS, true)
                        }
                    }
                },
                "": function (bP, bN, bR) {
                    var bQ, bO = bF++,
                        e = bK;
                    if (typeof bN === "string" && !bM.test(bN)) {
                        bN = bN.toLowerCase();
                        bQ = bN;
                        e = bu
                    }
                    e("parentNode", bN, bO, bP, bQ, bR)
                },
                "~": function (bP, bN, bR) {
                    var bQ, bO = bF++,
                        e = bK;
                    if (typeof bN === "string" && !bM.test(bN)) {
                        bN = bN.toLowerCase();
                        bQ = bN;
                        e = bu
                    }
                    e("previousSibling", bN, bO, bP, bQ, bR)
                }
            },
            find: {
                ID: function (bN, bO, bP) {
                    if (typeof bO.getElementById !== "undefined" && !bP) {
                        var e = bO.getElementById(bN[1]);
                        return e && e.parentNode ? [e] : []
                    }
                },
                NAME: function (bO, bR) {
                    if (typeof bR.getElementsByName !== "undefined") {
                        var bN = [],
                            bQ = bR.getElementsByName(bO[1]);
                        for (var bP = 0, e = bQ.length; bP < e; bP++) {
                            if (bQ[bP].getAttribute("name") === bO[1]) {
                                bN.push(bQ[bP])
                            }
                        }
                        return bN.length === 0 ? null : bN
                    }
                },
                TAG: function (e, bN) {
                    if (typeof bN.getElementsByTagName !== "undefined") {
                        return bN.getElementsByTagName(e[1])
                    }
                }
            },
            preFilter: {
                CLASS: function (bP, bN, bO, e, bS, bT) {
                    bP = " " + bP[1].replace(bG, "") + " ";
                    if (bT) {
                        return bP
                    }
                    for (var bQ = 0, bR;
                        (bR = bN[bQ]) != null; bQ++) {
                        if (bR) {
                            if (bS ^ (bR.className && (" " + bR.className + " ").replace(/[\t\n\r]/g, " ").indexOf(bP) >= 0)) {
                                if (!bO) {
                                    e.push(bR)
                                }
                            } else {
                                if (bO) {
                                    bN[bQ] = false
                                }
                            }
                        }
                    }
                    return false
                },
                ID: function (e) {
                    return e[1].replace(bG, "")
                },
                TAG: function (bN, e) {
                    return bN[1].replace(bG, "").toLowerCase()
                },
                CHILD: function (e) {
                    if (e[1] === "nth") {
                        if (!e[2]) {
                            bw.error(e[0])
                        }
                        e[2] = e[2].replace(/^\+|\s*/g, "");
                        var bN = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                        e[2] = (bN[1] + (bN[2] || 1)) - 0;
                        e[3] = bN[3] - 0
                    } else {
                        if (e[2]) {
                            bw.error(e[0])
                        }
                    }
                    e[0] = bF++;
                    return e
                },
                ATTR: function (bQ, bN, bO, e, bR, bS) {
                    var bP = bQ[1] = bQ[1].replace(bG, "");
                    if (!bS && bB.attrMap[bP]) {
                        bQ[1] = bB.attrMap[bP]
                    }
                    bQ[4] = (bQ[4] || bQ[5] || "").replace(bG, "");
                    if (bQ[2] === "~=") {
                        bQ[4] = " " + bQ[4] + " "
                    }
                    return bQ
                },
                PSEUDO: function (bQ, bN, bO, e, bR) {
                    if (bQ[1] === "not") {
                        if ((bE.exec(bQ[3]) || "").length > 1 || /^\w/.test(bQ[3])) {
                            bQ[3] = bw(bQ[3], null, null, bN)
                        } else {
                            var bP = bw.filter(bQ[3], bN, bO, true ^ bR);
                            if (!bO) {
                                e.push.apply(e, bP)
                            }
                            return false
                        }
                    } else {
                        if (bB.match.POS.test(bQ[0]) || bB.match.CHILD.test(bQ[0])) {
                            return true
                        }
                    }
                    return bQ
                },
                POS: function (e) {
                    e.unshift(true);
                    return e
                }
            },
            filters: {
                enabled: function (e) {
                    return e.disabled === false && e.type !== "hidden"
                },
                disabled: function (e) {
                    return e.disabled === true
                },
                checked: function (e) {
                    return e.checked === true
                },
                selected: function (e) {
                    if (e.parentNode) {
                        e.parentNode.selectedIndex
                    }
                    return e.selected === true
                },
                parent: function (e) {
                    return !!e.firstChild
                },
                empty: function (e) {
                    return !e.firstChild
                },
                has: function (bO, bN, e) {
                    return !!bw(e[3], bO).length
                },
                header: function (e) {
                    return (/h\d/i).test(e.nodeName)
                },
                text: function (bO) {
                    var e = bO.getAttribute("type"),
                        bN = bO.type;
                    return bO.nodeName.toLowerCase() === "input" && "text" === bN && (e === bN || e === null)
                },
                radio: function (e) {
                    return e.nodeName.toLowerCase() === "input" && "radio" === e.type
                },
                checkbox: function (e) {
                    return e.nodeName.toLowerCase() === "input" && "checkbox" === e.type
                },
                file: function (e) {
                    return e.nodeName.toLowerCase() === "input" && "file" === e.type
                },
                password: function (e) {
                    return e.nodeName.toLowerCase() === "input" && "password" === e.type
                },
                submit: function (bN) {
                    var e = bN.nodeName.toLowerCase();
                    return (e === "input" || e === "button") && "submit" === bN.type
                },
                image: function (e) {
                    return e.nodeName.toLowerCase() === "input" && "image" === e.type
                },
                reset: function (bN) {
                    var e = bN.nodeName.toLowerCase();
                    return (e === "input" || e === "button") && "reset" === bN.type
                },
                button: function (bN) {
                    var e = bN.nodeName.toLowerCase();
                    return e === "input" && "button" === bN.type || e === "button"
                },
                input: function (e) {
                    return (/input|select|textarea|button/i).test(e.nodeName)
                },
                focus: function (e) {
                    return e === e.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function (bN, e) {
                    return e === 0
                },
                last: function (bO, bN, e, bP) {
                    return bN === bP.length - 1
                },
                even: function (bN, e) {
                    return e % 2 === 0
                },
                odd: function (bN, e) {
                    return e % 2 === 1
                },
                lt: function (bO, bN, e) {
                    return bN < e[3] - 0
                },
                gt: function (bO, bN, e) {
                    return bN > e[3] - 0
                },
                nth: function (bO, bN, e) {
                    return e[3] - 0 === bN
                },
                eq: function (bO, bN, e) {
                    return e[3] - 0 === bN
                }
            },
            filter: {
                PSEUDO: function (bO, bT, bS, bU) {
                    var e = bT[1],
                        bN = bB.filters[e];
                    if (bN) {
                        return bN(bO, bS, bT, bU)
                    } else {
                        if (e === "contains") {
                            return (bO.textContent || bO.innerText || bw.getText([bO]) || "").indexOf(bT[3]) >= 0
                        } else {
                            if (e === "not") {
                                var bP = bT[3];
                                for (var bR = 0, bQ = bP.length; bR < bQ; bR++) {
                                    if (bP[bR] === bO) {
                                        return false
                                    }
                                }
                                return true
                            } else {
                                bw.error(e)
                            }
                        }
                    }
                },
                CHILD: function (e, bP) {
                    var bS = bP[1],
                        bN = e;
                    switch (bS) {
                    case "only":
                    case "first":
                        while ((bN = bN.previousSibling)) {
                            if (bN.nodeType === 1) {
                                return false
                            }
                        }
                        if (bS === "first") {
                            return true
                        }
                        bN = e;
                    case "last":
                        while ((bN = bN.nextSibling)) {
                            if (bN.nodeType === 1) {
                                return false
                            }
                        }
                        return true;
                    case "nth":
                        var bO = bP[2],
                            bV = bP[3];
                        if (bO === 1 && bV === 0) {
                            return true
                        }
                        var bR = bP[0],
                            bU = e.parentNode;
                        if (bU && (bU.sizcache !== bR || !e.nodeIndex)) {
                            var bQ = 0;
                            for (bN = bU.firstChild; bN; bN = bN.nextSibling) {
                                if (bN.nodeType === 1) {
                                    bN.nodeIndex = ++bQ
                                }
                            }
                            bU.sizcache = bR
                        }
                        var bT = e.nodeIndex - bV;
                        if (bO === 0) {
                            return bT === 0
                        } else {
                            return (bT % bO === 0 && bT / bO >= 0)
                        }
                    }
                },
                ID: function (bN, e) {
                    return bN.nodeType === 1 && bN.getAttribute("id") === e
                },
                TAG: function (bN, e) {
                    return (e === "*" && bN.nodeType === 1) || bN.nodeName.toLowerCase() === e
                },
                CLASS: function (bN, e) {
                    return (" " + (bN.className || bN.getAttribute("class")) + " ").indexOf(e) > -1
                },
                ATTR: function (bR, bP) {
                    var bO = bP[1],
                        e = bB.attrHandle[bO] ? bB.attrHandle[bO](bR) : bR[bO] != null ? bR[bO] : bR.getAttribute(bO),
                        bS = e + "",
                        bQ = bP[2],
                        bN = bP[4];
                    return e == null ? bQ === "!=" : bQ === "=" ? bS === bN : bQ === "*=" ? bS.indexOf(bN) >= 0 : bQ === "~=" ? (" " + bS + " ").indexOf(bN) >= 0 : !bN ? bS && e !== false : bQ === "!=" ? bS !== bN : bQ === "^=" ? bS.indexOf(bN) === 0 : bQ === "$=" ? bS.substr(bS.length - bN.length) === bN : bQ === "|=" ? bS === bN || bS.substr(0, bN.length + 1) === bN + "-" : false
                },
                POS: function (bQ, bN, bO, bR) {
                    var e = bN[2],
                        bP = bB.setFilters[e];
                    if (bP) {
                        return bP(bQ, bO, bN, bR)
                    }
                }
            }
        };
        var bA = bB.match.POS,
            bv = function (bN, e) {
                return "\\" + (e - 0 + 1)
            };
        for (var bx in bB.match) {
            bB.match[bx] = new RegExp(bB.match[bx].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
            bB.leftMatch[bx] = new RegExp(/(^(?:.|\r|\n)*?)/.source + bB.match[bx].source.replace(/\\(\d+)/g, bv))
        }
        var bC = function (bN, e) {
            bN = Array.prototype.slice.call(bN, 0);
            if (e) {
                e.push.apply(e, bN);
                return e
            }
            return bN
        };
        try {
            Array.prototype.slice.call(at.documentElement.childNodes, 0)[0].nodeType
        } catch (bL) {
            bC = function (bQ, bP) {
                var bO = 0,
                    bN = bP || [];
                if (bI.call(bQ) === "[object Array]") {
                    Array.prototype.push.apply(bN, bQ)
                } else {
                    if (typeof bQ.length === "number") {
                        for (var e = bQ.length; bO < e; bO++) {
                            bN.push(bQ[bO])
                        }
                    } else {
                        for (; bQ[bO]; bO++) {
                            bN.push(bQ[bO])
                        }
                    }
                }
                return bN
            }
        }
        var bH, bD;
        if (at.documentElement.compareDocumentPosition) {
            bH = function (bN, e) {
                if (bN === e) {
                    bz = true;
                    return 0
                }
                if (!bN.compareDocumentPosition || !e.compareDocumentPosition) {
                    return bN.compareDocumentPosition ? -1 : 1
                }
                return bN.compareDocumentPosition(e) & 4 ? -1 : 1
            }
        } else {
            bH = function (bU, bT) {
                if (bU === bT) {
                    bz = true;
                    return 0
                } else {
                    if (bU.sourceIndex && bT.sourceIndex) {
                        return bU.sourceIndex - bT.sourceIndex
                    }
                }
                var bR, bN, bO = [],
                    e = [],
                    bQ = bU.parentNode,
                    bS = bT.parentNode,
                    bV = bQ;
                if (bQ === bS) {
                    return bD(bU, bT)
                } else {
                    if (!bQ) {
                        return -1
                    } else {
                        if (!bS) {
                            return 1
                        }
                    }
                }
                while (bV) {
                    bO.unshift(bV);
                    bV = bV.parentNode
                }
                bV = bS;
                while (bV) {
                    e.unshift(bV);
                    bV = bV.parentNode
                }
                bR = bO.length;
                bN = e.length;
                for (var bP = 0; bP < bR && bP < bN; bP++) {
                    if (bO[bP] !== e[bP]) {
                        return bD(bO[bP], e[bP])
                    }
                }
                return bP === bR ? bD(bU, e[bP], -1) : bD(bO[bP], bT, 1)
            };
            bD = function (bN, e, bO) {
                if (bN === e) {
                    return bO
                }
                var bP = bN.nextSibling;
                while (bP) {
                    if (bP === e) {
                        return -1
                    }
                    bP = bP.nextSibling
                }
                return 1
            }
        }
        bw.getText = function (e) {
            var bN = "",
                bP;
            for (var bO = 0; e[bO]; bO++) {
                bP = e[bO];
                if (bP.nodeType === 3 || bP.nodeType === 4) {
                    bN += bP.nodeValue
                } else {
                    if (bP.nodeType !== 8) {
                        bN += bw.getText(bP.childNodes)
                    }
                }
            }
            return bN
        };
        (function () {
            var bN = at.createElement("div"),
                bO = "script" + (new Date()).getTime(),
                e = at.documentElement;
            bN.innerHTML = "<a name='" + bO + "'/>";
            e.insertBefore(bN, e.firstChild);
            if (at.getElementById(bO)) {
                bB.find.ID = function (bQ, bR, bS) {
                    if (typeof bR.getElementById !== "undefined" && !bS) {
                        var bP = bR.getElementById(bQ[1]);
                        return bP ? bP.id === bQ[1] || typeof bP.getAttributeNode !== "undefined" && bP.getAttributeNode("id").nodeValue === bQ[1] ? [bP] : M : []
                    }
                };
                bB.filter.ID = function (bR, bP) {
                    var bQ = typeof bR.getAttributeNode !== "undefined" && bR.getAttributeNode("id");
                    return bR.nodeType === 1 && bQ && bQ.nodeValue === bP
                }
            }
            e.removeChild(bN);
            e = bN = null
        })();
        (function () {
            var e = at.createElement("div");
            e.appendChild(at.createComment(""));
            if (e.getElementsByTagName("*").length > 0) {
                bB.find.TAG = function (bN, bR) {
                    var bQ = bR.getElementsByTagName(bN[1]);
                    if (bN[1] === "*") {
                        var bP = [];
                        for (var bO = 0; bQ[bO]; bO++) {
                            if (bQ[bO].nodeType === 1) {
                                bP.push(bQ[bO])
                            }
                        }
                        bQ = bP
                    }
                    return bQ
                }
            }
            e.innerHTML = "<a href='#'></a>";
            if (e.firstChild && typeof e.firstChild.getAttribute !== "undefined" && e.firstChild.getAttribute("href") !== "#") {
                bB.attrHandle.href = function (bN) {
                    return bN.getAttribute("href", 2)
                }
            }
            e = null
        })();
        if (at.querySelectorAll) {
            (function () {
                var e = bw,
                    bP = at.createElement("div"),
                    bO = "__sizzle__";
                bP.innerHTML = "<p class='TEST'></p>";
                if (bP.querySelectorAll && bP.querySelectorAll(".TEST").length === 0) {
                    return
                }
                bw = function (b0, bR, bV, bZ) {
                    bR = bR || at;
                    if (!bZ && !bw.isXML(bR)) {
                        var bY = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b0);
                        if (bY && (bR.nodeType === 1 || bR.nodeType === 9)) {
                            if (bY[1]) {
                                return bC(bR.getElementsByTagName(b0), bV)
                            } else {
                                if (bY[2] && bB.find.CLASS && bR.getElementsByClassName) {
                                    return bC(bR.getElementsByClassName(bY[2]), bV)
                                }
                            }
                        }
                        if (bR.nodeType === 9) {
                            if (b0 === "body" && bR.body) {
                                return bC([bR.body], bV)
                            } else {
                                if (bY && bY[3]) {
                                    var bU = bR.getElementById(bY[3]);
                                    if (bU && bU.parentNode) {
                                        if (bU.id === bY[3]) {
                                            return bC([bU], bV)
                                        }
                                    } else {
                                        return bC([], bV)
                                    }
                                }
                            }
                            try {
                                return bC(bR.querySelectorAll(b0), bV)
                            } catch (bW) {}
                        } else {
                            if (bR.nodeType === 1 && bR.nodeName.toLowerCase() !== "object") {
                                var bS = bR,
                                    bT = bR.getAttribute("id"),
                                    bQ = bT || bO,
                                    b2 = bR.parentNode,
                                    b1 = /^\s*[+~]/.test(b0);
                                if (!bT) {
                                    bR.setAttribute("id", bQ)
                                } else {
                                    bQ = bQ.replace(/'/g, "\\$&")
                                } if (b1 && b2) {
                                    bR = bR.parentNode
                                }
                                try {
                                    if (!b1 || b2) {
                                        return bC(bR.querySelectorAll("[id='" + bQ + "'] " + b0), bV)
                                    }
                                } catch (bX) {} finally {
                                    if (!bT) {
                                        bS.removeAttribute("id")
                                    }
                                }
                            }
                        }
                    }
                    return e(b0, bR, bV, bZ)
                };
                for (var bN in e) {
                    bw[bN] = e[bN]
                }
                bP = null
            })()
        }(function () {
            var e = at.documentElement,
                bO = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
            if (bO) {
                var bQ = !bO.call(at.createElement("div"), "div"),
                    bN = false;
                try {
                    bO.call(at.documentElement, "[test!='']:sizzle")
                } catch (bP) {
                    bN = true
                }
                bw.matchesSelector = function (bS, bU) {
                    bU = bU.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!bw.isXML(bS)) {
                        try {
                            if (bN || !bB.match.PSEUDO.test(bU) && !/!=/.test(bU)) {
                                var bR = bO.call(bS, bU);
                                if (bR || !bQ || bS.document && bS.document.nodeType !== 11) {
                                    return bR
                                }
                            }
                        } catch (bT) {}
                    }
                    return bw(bU, null, null, [bS]).length > 0
                }
            }
        })();
        (function () {
            var e = at.createElement("div");
            e.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0) {
                return
            }
            e.lastChild.className = "e";
            if (e.getElementsByClassName("e").length === 1) {
                return
            }
            bB.order.splice(1, 0, "CLASS");
            bB.find.CLASS = function (bN, bO, bP) {
                if (typeof bO.getElementsByClassName !== "undefined" && !bP) {
                    return bO.getElementsByClassName(bN[1])
                }
            };
            e = null
        })();

        function bu(bN, bS, bR, bV, bT, bU) {
            for (var bP = 0, bO = bV.length; bP < bO; bP++) {
                var e = bV[bP];
                if (e) {
                    var bQ = false;
                    e = e[bN];
                    while (e) {
                        if (e.sizcache === bR) {
                            bQ = bV[e.sizset];
                            break
                        }
                        if (e.nodeType === 1 && !bU) {
                            e.sizcache = bR;
                            e.sizset = bP
                        }
                        if (e.nodeName.toLowerCase() === bS) {
                            bQ = e;
                            break
                        }
                        e = e[bN]
                    }
                    bV[bP] = bQ
                }
            }
        }

        function bK(bN, bS, bR, bV, bT, bU) {
            for (var bP = 0, bO = bV.length; bP < bO; bP++) {
                var e = bV[bP];
                if (e) {
                    var bQ = false;
                    e = e[bN];
                    while (e) {
                        if (e.sizcache === bR) {
                            bQ = bV[e.sizset];
                            break
                        }
                        if (e.nodeType === 1) {
                            if (!bU) {
                                e.sizcache = bR;
                                e.sizset = bP
                            }
                            if (typeof bS !== "string") {
                                if (e === bS) {
                                    bQ = true;
                                    break
                                }
                            } else {
                                if (bw.filter(bS, [e]).length > 0) {
                                    bQ = e;
                                    break
                                }
                            }
                        }
                        e = e[bN]
                    }
                    bV[bP] = bQ
                }
            }
        }
        if (at.documentElement.contains) {
            bw.contains = function (bN, e) {
                return bN !== e && (bN.contains ? bN.contains(e) : true)
            }
        } else {
            if (at.documentElement.compareDocumentPosition) {
                bw.contains = function (bN, e) {
                    return !!(bN.compareDocumentPosition(e) & 16)
                }
            } else {
                bw.contains = function () {
                    return false
                }
            }
        }
        bw.isXML = function (e) {
            var bN = (e ? e.ownerDocument || e : 0).documentElement;
            return bN ? bN.nodeName !== "HTML" : false
        };
        var bJ = function (e, bT) {
            var bR, bP = [],
                bQ = "",
                bO = bT.nodeType ? [bT] : bT;
            while ((bR = bB.match.PSEUDO.exec(e))) {
                bQ += bR[0];
                e = e.replace(bB.match.PSEUDO, "")
            }
            e = bB.relative[e] ? e + "*" : e;
            for (var bS = 0, bN = bO.length; bS < bN; bS++) {
                bw(e, bO[bS], bP)
            }
            return bw.filter(bQ, bP)
        };
        b.find = bw;
        b.expr = bw.selectors;
        b.expr[":"] = b.expr.filters;
        b.unique = bw.uniqueSort;
        b.text = bw.getText;
        b.isXMLDoc = bw.isXML;
        b.contains = bw.contains
    })();
    var Z = /Until$/,
        ao = /^(?:parents|prevUntil|prevAll)/,
        a8 = /,/,
        bp = /^.[^:#\[\.,]*$/,
        R = Array.prototype.slice,
        J = b.expr.match.POS,
        aw = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    b.fn.extend({
        find: function (e) {
            var bv = this,
                bx, bu;
            if (typeof e !== "string") {
                return b(e).filter(function () {
                    for (bx = 0, bu = bv.length; bx < bu; bx++) {
                        if (b.contains(bv[bx], this)) {
                            return true
                        }
                    }
                })
            }
            var bw = this.pushStack("", "find", e),
                bz, bA, by;
            for (bx = 0, bu = this.length; bx < bu; bx++) {
                bz = bw.length;
                b.find(e, this[bx], bw);
                if (bx > 0) {
                    for (bA = bz; bA < bw.length; bA++) {
                        for (by = 0; by < bz; by++) {
                            if (bw[by] === bw[bA]) {
                                bw.splice(bA--, 1);
                                break
                            }
                        }
                    }
                }
            }
            return bw
        },
        has: function (bu) {
            var e = b(bu);
            return this.filter(function () {
                for (var bw = 0, bv = e.length; bw < bv; bw++) {
                    if (b.contains(this, e[bw])) {
                        return true
                    }
                }
            })
        },
        not: function (e) {
            return this.pushStack(aD(this, e, false), "not", e)
        },
        filter: function (e) {
            return this.pushStack(aD(this, e, true), "filter", e)
        },
        is: function (e) {
            return !!e && (typeof e === "string" ? b.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function (bD, bu) {
            var bA = [],
                bx, bv, bC = this[0];
            if (b.isArray(bD)) {
                var bz, bw, by = {}, e = 1;
                if (bC && bD.length) {
                    for (bx = 0, bv = bD.length; bx < bv; bx++) {
                        bw = bD[bx];
                        if (!by[bw]) {
                            by[bw] = J.test(bw) ? b(bw, bu || this.context) : bw
                        }
                    }
                    while (bC && bC.ownerDocument && bC !== bu) {
                        for (bw in by) {
                            bz = by[bw];
                            if (bz.jquery ? bz.index(bC) > -1 : b(bC).is(bz)) {
                                bA.push({
                                    selector: bw,
                                    elem: bC,
                                    level: e
                                })
                            }
                        }
                        bC = bC.parentNode;
                        e++
                    }
                }
                return bA
            }
            var bB = J.test(bD) || typeof bD !== "string" ? b(bD, bu || this.context) : 0;
            for (bx = 0, bv = this.length; bx < bv; bx++) {
                bC = this[bx];
                while (bC) {
                    if (bB ? bB.index(bC) > -1 : b.find.matchesSelector(bC, bD)) {
                        bA.push(bC);
                        break
                    } else {
                        bC = bC.parentNode;
                        if (!bC || !bC.ownerDocument || bC === bu || bC.nodeType === 11) {
                            break
                        }
                    }
                }
            }
            bA = bA.length > 1 ? b.unique(bA) : bA;
            return this.pushStack(bA, "closest", bD)
        },
        index: function (e) {
            if (!e) {
                return (this[0] && this[0].parentNode) ? this.prevAll().length : -1
            }
            if (typeof e === "string") {
                return b.inArray(this[0], b(e))
            }
            return b.inArray(e.jquery ? e[0] : e, this)
        },
        add: function (e, bu) {
            var bw = typeof e === "string" ? b(e, bu) : b.makeArray(e && e.nodeType ? [e] : e),
                bv = b.merge(this.get(), bw);
            return this.pushStack(E(bw[0]) || E(bv[0]) ? bv : b.unique(bv))
        },
        andSelf: function () {
            return this.add(this.prevObject)
        }
    });

    function E(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11
    }
    b.each({
        parent: function (bu) {
            var e = bu.parentNode;
            return e && e.nodeType !== 11 ? e : null
        },
        parents: function (e) {
            return b.dir(e, "parentNode")
        },
        parentsUntil: function (bu, e, bv) {
            return b.dir(bu, "parentNode", bv)
        },
        next: function (e) {
            return b.nth(e, 2, "nextSibling")
        },
        prev: function (e) {
            return b.nth(e, 2, "previousSibling")
        },
        nextAll: function (e) {
            return b.dir(e, "nextSibling")
        },
        prevAll: function (e) {
            return b.dir(e, "previousSibling")
        },
        nextUntil: function (bu, e, bv) {
            return b.dir(bu, "nextSibling", bv)
        },
        prevUntil: function (bu, e, bv) {
            return b.dir(bu, "previousSibling", bv)
        },
        siblings: function (e) {
            return b.sibling(e.parentNode.firstChild, e)
        },
        children: function (e) {
            return b.sibling(e.firstChild)
        },
        contents: function (e) {
            return b.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : b.makeArray(e.childNodes)
        }
    }, function (e, bu) {
        b.fn[e] = function (by, bv) {
            var bx = b.map(this, bu, by),
                bw = R.call(arguments);
            if (!Z.test(e)) {
                bv = by
            }
            if (bv && typeof bv === "string") {
                bx = b.filter(bv, bx)
            }
            bx = this.length > 1 && !aw[e] ? b.unique(bx) : bx;
            if ((this.length > 1 || a8.test(bv)) && ao.test(e)) {
                bx = bx.reverse()
            }
            return this.pushStack(bx, e, bw.join(","))
        }
    });
    b.extend({
        filter: function (bv, e, bu) {
            if (bu) {
                bv = ":not(" + bv + ")"
            }
            return e.length === 1 ? b.find.matchesSelector(e[0], bv) ? [e[0]] : [] : b.find.matches(bv, e)
        },
        dir: function (bv, bu, bx) {
            var e = [],
                bw = bv[bu];
            while (bw && bw.nodeType !== 9 && (bx === M || bw.nodeType !== 1 || !b(bw).is(bx))) {
                if (bw.nodeType === 1) {
                    e.push(bw)
                }
                bw = bw[bu]
            }
            return e
        },
        nth: function (bx, e, bv, bw) {
            e = e || 1;
            var bu = 0;
            for (; bx; bx = bx[bv]) {
                if (bx.nodeType === 1 && ++bu === e) {
                    break
                }
            }
            return bx
        },
        sibling: function (bv, bu) {
            var e = [];
            for (; bv; bv = bv.nextSibling) {
                if (bv.nodeType === 1 && bv !== bu) {
                    e.push(bv)
                }
            }
            return e
        }
    });

    function aD(bw, bv, e) {
        bv = bv || 0;
        if (b.isFunction(bv)) {
            return b.grep(bw, function (by, bx) {
                var bz = !! bv.call(by, bx, by);
                return bz === e
            })
        } else {
            if (bv.nodeType) {
                return b.grep(bw, function (by, bx) {
                    return (by === bv) === e
                })
            } else {
                if (typeof bv === "string") {
                    var bu = b.grep(bw, function (bx) {
                        return bx.nodeType === 1
                    });
                    if (bp.test(bv)) {
                        return b.filter(bv, bu, !e)
                    } else {
                        bv = b.filter(bv, bu)
                    }
                }
            }
        }
        return b.grep(bw, function (by, bx) {
            return (b.inArray(by, bv) >= 0) === e
        })
    }
    var ae = / jQuery\d+="(?:\d+|null)"/g,
        ap = /^\s+/,
        T = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        d = /<([\w:]+)/,
        y = /<tbody/i,
        W = /<|&#?\w+;/,
        Q = /<(?:script|object|embed|option|style)/i,
        p = /checked\s*(?:[^=]|=\s*.checked.)/i,
        bl = /\/(java|ecma)script/i,
        aL = /^\s*<!(?:\[CDATA\[|\-\-)/,
        av = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        };
    av.optgroup = av.option;
    av.tbody = av.tfoot = av.colgroup = av.caption = av.thead;
    av.th = av.td;
    if (!b.support.htmlSerialize) {
        av._default = [1, "div<div>", "</div>"]
    }
    b.fn.extend({
        text: function (e) {
            if (b.isFunction(e)) {
                return this.each(function (bv) {
                    var bu = b(this);
                    bu.text(e.call(this, bv, bu.text()))
                })
            }
            if (typeof e !== "object" && e !== M) {
                return this.empty().append((this[0] && this[0].ownerDocument || at).createTextNode(e))
            }
            return b.text(this)
        },
        wrapAll: function (e) {
            if (b.isFunction(e)) {
                return this.each(function (bv) {
                    b(this).wrapAll(e.call(this, bv))
                })
            }
            if (this[0]) {
                var bu = b(e, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    bu.insertBefore(this[0])
                }
                bu.map(function () {
                    var bv = this;
                    while (bv.firstChild && bv.firstChild.nodeType === 1) {
                        bv = bv.firstChild
                    }
                    return bv
                }).append(this)
            }
            return this
        },
        wrapInner: function (e) {
            if (b.isFunction(e)) {
                return this.each(function (bu) {
                    b(this).wrapInner(e.call(this, bu))
                })
            }
            return this.each(function () {
                var bu = b(this),
                    bv = bu.contents();
                if (bv.length) {
                    bv.wrapAll(e)
                } else {
                    bu.append(e)
                }
            })
        },
        wrap: function (e) {
            return this.each(function () {
                b(this).wrapAll(e)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                if (!b.nodeName(this, "body")) {
                    b(this).replaceWith(this.childNodes)
                }
            }).end()
        },
        append: function () {
            return this.domManip(arguments, true, function (e) {
                if (this.nodeType === 1) {
                    this.appendChild(e)
                }
            })
        },
        prepend: function () {
            return this.domManip(arguments, true, function (e) {
                if (this.nodeType === 1) {
                    this.insertBefore(e, this.firstChild)
                }
            })
        },
        before: function () {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function (bu) {
                    this.parentNode.insertBefore(bu, this)
                })
            } else {
                if (arguments.length) {
                    var e = b(arguments[0]);
                    e.push.apply(e, this.toArray());
                    return this.pushStack(e, "before", arguments)
                }
            }
        },
        after: function () {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function (bu) {
                    this.parentNode.insertBefore(bu, this.nextSibling)
                })
            } else {
                if (arguments.length) {
                    var e = this.pushStack(this, "after", arguments);
                    e.push.apply(e, b(arguments[0]).toArray());
                    return e
                }
            }
        },
        remove: function (e, bw) {
            for (var bu = 0, bv;
                (bv = this[bu]) != null; bu++) {
                if (!e || b.filter(e, [bv]).length) {
                    if (!bw && bv.nodeType === 1) {
                        b.cleanData(bv.getElementsByTagName("*"));
                        b.cleanData([bv])
                    }
                    if (bv.parentNode) {
                        bv.parentNode.removeChild(bv)
                    }
                }
            }
            return this
        },
        empty: function () {
            for (var e = 0, bu;
                (bu = this[e]) != null; e++) {
                if (bu.nodeType === 1) {
                    b.cleanData(bu.getElementsByTagName("*"))
                }
                while (bu.firstChild) {
                    bu.removeChild(bu.firstChild)
                }
            }
            return this
        },
        clone: function (bu, e) {
            bu = bu == null ? false : bu;
            e = e == null ? bu : e;
            return this.map(function () {
                return b.clone(this, bu, e)
            })
        },
        html: function (bw) {
            if (bw === M) {
                return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(ae, "") : null
            } else {
                if (typeof bw === "string" && !Q.test(bw) && (b.support.leadingWhitespace || !ap.test(bw)) && !av[(d.exec(bw) || ["", ""])[1].toLowerCase()]) {
                    bw = bw.replace(T, "<$1></$2>");
                    try {
                        for (var bv = 0, bu = this.length; bv < bu; bv++) {
                            if (this[bv].nodeType === 1) {
                                b.cleanData(this[bv].getElementsByTagName("*"));
                                this[bv].innerHTML = bw
                            }
                        }
                    } catch (bx) {
                        this.empty().append(bw)
                    }
                } else {
                    if (b.isFunction(bw)) {
                        this.each(function (by) {
                            var e = b(this);
                            e.html(bw.call(this, by, e.html()))
                        })
                    } else {
                        this.empty().append(bw)
                    }
                }
            }
            return this
        },
        replaceWith: function (e) {
            if (this[0] && this[0].parentNode) {
                if (b.isFunction(e)) {
                    return this.each(function (bw) {
                        var bv = b(this),
                            bu = bv.html();
                        bv.replaceWith(e.call(this, bw, bu))
                    })
                }
                if (typeof e !== "string") {
                    e = b(e).detach()
                }
                return this.each(function () {
                    var bv = this.nextSibling,
                        bu = this.parentNode;
                    b(this).remove();
                    if (bv) {
                        b(bv).before(e)
                    } else {
                        b(bu).append(e)
                    }
                })
            } else {
                return this.length ? this.pushStack(b(b.isFunction(e) ? e() : e), "replaceWith", e) : this
            }
        },
        detach: function (e) {
            return this.remove(e, true)
        },
        domManip: function (bA, bE, bD) {
            var bw, bx, bz, bC, bB = bA[0],
                bu = [];
            if (!b.support.checkClone && arguments.length === 3 && typeof bB === "string" && p.test(bB)) {
                return this.each(function () {
                    b(this).domManip(bA, bE, bD, true)
                })
            }
            if (b.isFunction(bB)) {
                return this.each(function (bG) {
                    var bF = b(this);
                    bA[0] = bB.call(this, bG, bE ? bF.html() : M);
                    bF.domManip(bA, bE, bD)
                })
            }
            if (this[0]) {
                bC = bB && bB.parentNode;
                if (b.support.parentNode && bC && bC.nodeType === 11 && bC.childNodes.length === this.length) {
                    bw = {
                        fragment: bC
                    }
                } else {
                    bw = b.buildFragment(bA, this, bu)
                }
                bz = bw.fragment;
                if (bz.childNodes.length === 1) {
                    bx = bz = bz.firstChild
                } else {
                    bx = bz.firstChild
                } if (bx) {
                    bE = bE && b.nodeName(bx, "tr");
                    for (var bv = 0, e = this.length, by = e - 1; bv < e; bv++) {
                        bD.call(bE ? a9(this[bv], bx) : this[bv], bw.cacheable || (e > 1 && bv < by) ? b.clone(bz, true, true) : bz)
                    }
                }
                if (bu.length) {
                    b.each(bu, bo)
                }
            }
            return this
        }
    });

    function a9(e, bu) {
        return b.nodeName(e, "table") ? (e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody"))) : e
    }

    function v(e, bA) {
        if (bA.nodeType !== 1 || !b.hasData(e)) {
            return
        }
        var bz = b.expando,
            bw = b.data(e),
            bx = b.data(bA, bw);
        if ((bw = bw[bz])) {
            var bB = bw.events;
            bx = bx[bz] = b.extend({}, bw);
            if (bB) {
                delete bx.handle;
                bx.events = {};
                for (var by in bB) {
                    for (var bv = 0, bu = bB[by].length; bv < bu; bv++) {
                        b.event.add(bA, by + (bB[by][bv].namespace ? "." : "") + bB[by][bv].namespace, bB[by][bv], bB[by][bv].data)
                    }
                }
            }
        }
    }

    function af(bu, e) {
        var bv;
        if (e.nodeType !== 1) {
            return
        }
        if (e.clearAttributes) {
            e.clearAttributes()
        }
        if (e.mergeAttributes) {
            e.mergeAttributes(bu)
        }
        bv = e.nodeName.toLowerCase();
        if (bv === "object") {
            e.outerHTML = bu.outerHTML
        } else {
            if (bv === "input" && (bu.type === "checkbox" || bu.type === "radio")) {
                if (bu.checked) {
                    e.defaultChecked = e.checked = bu.checked
                }
                if (e.value !== bu.value) {
                    e.value = bu.value
                }
            } else {
                if (bv === "option") {
                    e.selected = bu.defaultSelected
                } else {
                    if (bv === "input" || bv === "textarea") {
                        e.defaultValue = bu.defaultValue
                    }
                }
            }
        }
        e.removeAttribute(b.expando)
    }
    b.buildFragment = function (by, bw, bu) {
        var bx, e, bv, bz;
        if (bw && bw[0]) {
            bz = bw[0].ownerDocument || bw[0]
        }
        if (!bz.createDocumentFragment) {
            bz = at
        }
        if (by.length === 1 && typeof by[0] === "string" && by[0].length < 512 && bz === at && by[0].charAt(0) === "<" && !Q.test(by[0]) && (b.support.checkClone || !p.test(by[0]))) {
            e = true;
            bv = b.fragments[by[0]];
            if (bv && bv !== 1) {
                bx = bv
            }
        }
        if (!bx) {
            bx = bz.createDocumentFragment();
            b.clean(by, bz, bx, bu)
        }
        if (e) {
            b.fragments[by[0]] = bv ? bx : 1
        }
        return {
            fragment: bx,
            cacheable: e
        }
    };
    b.fragments = {};
    b.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, bu) {
        b.fn[e] = function (bv) {
            var by = [],
                bB = b(bv),
                bA = this.length === 1 && this[0].parentNode;
            if (bA && bA.nodeType === 11 && bA.childNodes.length === 1 && bB.length === 1) {
                bB[bu](this[0]);
                return this
            } else {
                for (var bz = 0, bw = bB.length; bz < bw; bz++) {
                    var bx = (bz > 0 ? this.clone(true) : this).get();
                    b(bB[bz])[bu](bx);
                    by = by.concat(bx)
                }
                return this.pushStack(by, e, bB.selector)
            }
        }
    });

    function be(e) {
        if ("getElementsByTagName" in e) {
            return e.getElementsByTagName("*")
        } else {
            if ("querySelectorAll" in e) {
                return e.querySelectorAll("*")
            } else {
                return []
            }
        }
    }

    function ax(e) {
        if (e.type === "checkbox" || e.type === "radio") {
            e.defaultChecked = e.checked
        }
    }

    function G(e) {
        if (b.nodeName(e, "input")) {
            ax(e)
        } else {
            if ("getElementsByTagName" in e) {
                b.grep(e.getElementsByTagName("input"), ax)
            }
        }
    }
    b.extend({
        clone: function (bx, bz, bv) {
            var by = bx.cloneNode(true),
                e, bu, bw;
            if ((!b.support.noCloneEvent || !b.support.noCloneChecked) && (bx.nodeType === 1 || bx.nodeType === 11) && !b.isXMLDoc(bx)) {
                af(bx, by);
                e = be(bx);
                bu = be(by);
                for (bw = 0; e[bw]; ++bw) {
                    if (bu[bw]) {
                        af(e[bw], bu[bw])
                    }
                }
            }
            if (bz) {
                v(bx, by);
                if (bv) {
                    e = be(bx);
                    bu = be(by);
                    for (bw = 0; e[bw]; ++bw) {
                        v(e[bw], bu[bw])
                    }
                }
            }
            e = bu = null;
            return by
        },
        clean: function (bv, bx, bG, bz) {
            var bE;
            bx = bx || at;
            if (typeof bx.createElement === "undefined") {
                bx = bx.ownerDocument || bx[0] && bx[0].ownerDocument || at
            }
            var bH = [],
                bA;
            for (var bD = 0, by;
                (by = bv[bD]) != null; bD++) {
                if (typeof by === "number") {
                    by += ""
                }
                if (!by) {
                    continue
                }
                if (typeof by === "string") {
                    if (!W.test(by)) {
                        by = bx.createTextNode(by)
                    } else {
                        by = by.replace(T, "<$1></$2>");
                        var bJ = (d.exec(by) || ["", ""])[1].toLowerCase(),
                            bw = av[bJ] || av._default,
                            bC = bw[0],
                            bu = bx.createElement("div");
                        bu.innerHTML = bw[1] + by + bw[2];
                        while (bC--) {
                            bu = bu.lastChild
                        }
                        if (!b.support.tbody) {
                            var e = y.test(by),
                                bB = bJ === "table" && !e ? bu.firstChild && bu.firstChild.childNodes : bw[1] === "<table>" && !e ? bu.childNodes : [];
                            for (bA = bB.length - 1; bA >= 0; --bA) {
                                if (b.nodeName(bB[bA], "tbody") && !bB[bA].childNodes.length) {
                                    bB[bA].parentNode.removeChild(bB[bA])
                                }
                            }
                        }
                        if (!b.support.leadingWhitespace && ap.test(by)) {
                            bu.insertBefore(bx.createTextNode(ap.exec(by)[0]), bu.firstChild)
                        }
                        by = bu.childNodes
                    }
                }
                var bF;
                if (!b.support.appendChecked) {
                    if (by[0] && typeof (bF = by.length) === "number") {
                        for (bA = 0; bA < bF; bA++) {
                            G(by[bA])
                        }
                    } else {
                        G(by)
                    }
                }
                if (by.nodeType) {
                    bH.push(by)
                } else {
                    bH = b.merge(bH, by)
                }
            }
            if (bG) {
                bE = function (bK) {
                    return !bK.type || bl.test(bK.type)
                };
                for (bD = 0; bH[bD]; bD++) {
                    if (bz && b.nodeName(bH[bD], "script") && (!bH[bD].type || bH[bD].type.toLowerCase() === "text/javascript")) {
                        bz.push(bH[bD].parentNode ? bH[bD].parentNode.removeChild(bH[bD]) : bH[bD])
                    } else {
                        if (bH[bD].nodeType === 1) {
                            var bI = b.grep(bH[bD].getElementsByTagName("script"), bE);
                            bH.splice.apply(bH, [bD + 1, 0].concat(bI))
                        }
                        bG.appendChild(bH[bD])
                    }
                }
            }
            return bH
        },
        cleanData: function (bu) {
            var bx, bv, e = b.cache,
                bC = b.expando,
                bA = b.event.special,
                bz = b.support.deleteExpando;
            for (var by = 0, bw;
                (bw = bu[by]) != null; by++) {
                if (bw.nodeName && b.noData[bw.nodeName.toLowerCase()]) {
                    continue
                }
                bv = bw[b.expando];
                if (bv) {
                    bx = e[bv] && e[bv][bC];
                    if (bx && bx.events) {
                        for (var bB in bx.events) {
                            if (bA[bB]) {
                                b.event.remove(bw, bB)
                            } else {
                                b.removeEvent(bw, bB, bx.handle)
                            }
                        }
                        if (bx.handle) {
                            bx.handle.elem = null
                        }
                    }
                    if (bz) {
                        delete bw[b.expando]
                    } else {
                        if (bw.removeAttribute) {
                            bw.removeAttribute(b.expando)
                        }
                    }
                    delete e[bv]
                }
            }
        }
    });

    function bo(e, bu) {
        if (bu.src) {
            b.ajax({
                url: bu.src,
                async: false,
                dataType: "script"
            })
        } else {
            b.globalEval((bu.text || bu.textContent || bu.innerHTML || "").replace(aL, "/*$0*/"))
        } if (bu.parentNode) {
            bu.parentNode.removeChild(bu)
        }
    }
    var ah = /alpha\([^)]*\)/i,
        ar = /opacity=([^)]*)/,
        B = /([A-Z]|^ms)/g,
        bb = /^-?\d+(?:px)?$/i,
        bn = /^-?\d/,
        K = /^([\-+])=([\-+.\de]+)/,
        a6 = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, ak = ["Left", "Right"],
        a1 = ["Top", "Bottom"],
        X, aG, aV;
    b.fn.css = function (e, bu) {
        if (arguments.length === 2 && bu === M) {
            return this
        }
        return b.access(this, e, bu, true, function (bw, bv, bx) {
            return bx !== M ? b.style(bw, bv, bx) : b.css(bw, bv)
        })
    };
    b.extend({
        cssHooks: {
            opacity: {
                get: function (bv, bu) {
                    if (bu) {
                        var e = X(bv, "opacity", "opacity");
                        return e === "" ? "1" : e
                    } else {
                        return bv.style.opacity
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            "float": b.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (bw, bv, bC, bx) {
            if (!bw || bw.nodeType === 3 || bw.nodeType === 8 || !bw.style) {
                return
            }
            var bA, bB, by = b.camelCase(bv),
                bu = bw.style,
                bD = b.cssHooks[by];
            bv = b.cssProps[by] || by;
            if (bC !== M) {
                bB = typeof bC;
                if (bB === "string" && (bA = K.exec(bC))) {
                    bC = (+(bA[1] + 1) * +bA[2]) + parseFloat(b.css(bw, bv));
                    bB = "number"
                }
                if (bC == null || bB === "number" && isNaN(bC)) {
                    return
                }
                if (bB === "number" && !b.cssNumber[by]) {
                    bC += "px"
                }
                if (!bD || !("set" in bD) || (bC = bD.set(bw, bC)) !== M) {
                    try {
                        bu[bv] = bC
                    } catch (bz) {}
                }
            } else {
                if (bD && "get" in bD && (bA = bD.get(bw, false, bx)) !== M) {
                    return bA
                }
                return bu[bv]
            }
        },
        css: function (bx, bw, bu) {
            var bv, e;
            bw = b.camelCase(bw);
            e = b.cssHooks[bw];
            bw = b.cssProps[bw] || bw;
            if (bw === "cssFloat") {
                bw = "float"
            }
            if (e && "get" in e && (bv = e.get(bx, true, bu)) !== M) {
                return bv
            } else {
                if (X) {
                    return X(bx, bw)
                }
            }
        },
        swap: function (bw, bv, bx) {
            var e = {};
            for (var bu in bv) {
                e[bu] = bw.style[bu];
                bw.style[bu] = bv[bu]
            }
            bx.call(bw);
            for (bu in bv) {
                bw.style[bu] = e[bu]
            }
        }
    });
    b.curCSS = b.css;
    b.each(["height", "width"], function (bu, e) {
        b.cssHooks[e] = {
            get: function (bx, bw, bv) {
                var by;
                if (bw) {
                    if (bx.offsetWidth !== 0) {
                        return q(bx, e, bv)
                    } else {
                        b.swap(bx, a6, function () {
                            by = q(bx, e, bv)
                        })
                    }
                    return by
                }
            },
            set: function (bv, bw) {
                if (bb.test(bw)) {
                    bw = parseFloat(bw);
                    if (bw >= 0) {
                        return bw + "px"
                    }
                } else {
                    return bw
                }
            }
        }
    });
    if (!b.support.opacity) {
        b.cssHooks.opacity = {
            get: function (bu, e) {
                return ar.test((e && bu.currentStyle ? bu.currentStyle.filter : bu.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) + "" : e ? "1" : ""
            },
            set: function (bx, by) {
                var bw = bx.style,
                    bu = bx.currentStyle,
                    e = b.isNaN(by) ? "" : "alpha(opacity=" + by * 100 + ")",
                    bv = bu && bu.filter || bw.filter || "";
                bw.zoom = 1;
                if (by >= 1 && b.trim(bv.replace(ah, "")) === "") {
                    bw.removeAttribute("filter");
                    if (bu && !bu.filter) {
                        return
                    }
                }
                bw.filter = ah.test(bv) ? bv.replace(ah, e) : bv + " " + e
            }
        }
    }
    b(function () {
        if (!b.support.reliableMarginRight) {
            b.cssHooks.marginRight = {
                get: function (bv, bu) {
                    var e;
                    b.swap(bv, {
                        display: "inline-block"
                    }, function () {
                        if (bu) {
                            e = X(bv, "margin-right", "marginRight")
                        } else {
                            e = bv.style.marginRight
                        }
                    });
                    return e
                }
            }
        }
    });
    if (at.defaultView && at.defaultView.getComputedStyle) {
        aG = function (bx, bv) {
            var bu, bw, e;
            bv = bv.replace(B, "-$1").toLowerCase();
            if (!(bw = bx.ownerDocument.defaultView)) {
                return M
            }
            if ((e = bw.getComputedStyle(bx, null))) {
                bu = e.getPropertyValue(bv);
                if (bu === "" && !b.contains(bx.ownerDocument.documentElement, bx)) {
                    bu = b.style(bx, bv)
                }
            }
            return bu
        }
    }
    if (at.documentElement.currentStyle) {
        aV = function (bx, bv) {
            var by, bu = bx.currentStyle && bx.currentStyle[bv],
                e = bx.runtimeStyle && bx.runtimeStyle[bv],
                bw = bx.style;
            if (!bb.test(bu) && bn.test(bu)) {
                by = bw.left;
                if (e) {
                    bx.runtimeStyle.left = bx.currentStyle.left
                }
                bw.left = bv === "fontSize" ? "1em" : (bu || 0);
                bu = bw.pixelLeft + "px";
                bw.left = by;
                if (e) {
                    bx.runtimeStyle.left = e
                }
            }
            return bu === "" ? "auto" : bu
        }
    }
    X = aG || aV;

    function q(bv, bu, e) {
        var bx = bu === "width" ? bv.offsetWidth : bv.offsetHeight,
            bw = bu === "width" ? ak : a1;
        if (bx > 0) {
            if (e !== "border") {
                b.each(bw, function () {
                    if (!e) {
                        bx -= parseFloat(b.css(bv, "padding" + this)) || 0
                    }
                    if (e === "margin") {
                        bx += parseFloat(b.css(bv, e + this)) || 0
                    } else {
                        bx -= parseFloat(b.css(bv, "border" + this + "Width")) || 0
                    }
                })
            }
            return bx + "px"
        }
        bx = X(bv, bu, bu);
        if (bx < 0 || bx == null) {
            bx = bv.style[bu] || 0
        }
        bx = parseFloat(bx) || 0;
        if (e) {
            b.each(bw, function () {
                bx += parseFloat(b.css(bv, "padding" + this)) || 0;
                if (e !== "padding") {
                    bx += parseFloat(b.css(bv, "border" + this + "Width")) || 0
                }
                if (e === "margin") {
                    bx += parseFloat(b.css(bv, e + this)) || 0
                }
            })
        }
        return bx + "px"
    }
    if (b.expr && b.expr.filters) {
        b.expr.filters.hidden = function (bv) {
            var bu = bv.offsetWidth,
                e = bv.offsetHeight;
            return (bu === 0 && e === 0) || (!b.support.reliableHiddenOffsets && (bv.style.display || b.css(bv, "display")) === "none")
        };
        b.expr.filters.visible = function (e) {
            return !b.expr.filters.hidden(e)
        }
    }
    var l = /%20/g,
        an = /\[\]$/,
        bs = /\r?\n/g,
        bq = /#.*$/,
        aB = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        aY = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        aK = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        aN = /^(?:GET|HEAD)$/,
        c = /^\/\//,
        N = /\?/,
        a5 = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        s = /^(?:select|textarea)/i,
        h = /\s+/,
        br = /([?&])_=[^&]*/,
        L = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        C = b.fn.load,
        Y = {}, t = {}, aC, u, aR = ["*/"] + ["*"];
    try {
        aC = bk.href
    } catch (au) {
        aC = at.createElement("a");
        aC.href = "";
        aC = aC.href
    }
    u = L.exec(aC.toLowerCase()) || [];

    function f(e) {
        return function (bx, bz) {
            if (typeof bx !== "string") {
                bz = bx;
                bx = "*"
            }
            if (b.isFunction(bz)) {
                var bw = bx.toLowerCase().split(h),
                    bv = 0,
                    by = bw.length,
                    bu, bA, bB;
                for (; bv < by; bv++) {
                    bu = bw[bv];
                    bB = /^\+/.test(bu);
                    if (bB) {
                        bu = bu.substr(1) || "*"
                    }
                    bA = e[bu] = e[bu] || [];
                    bA[bB ? "unshift" : "push"](bz)
                }
            }
        }
    }

    function aT(bu, bD, by, bC, bA, bw) {
        bA = bA || bD.dataTypes[0];
        bw = bw || {};
        bw[bA] = true;
        var bz = bu[bA],
            bv = 0,
            e = bz ? bz.length : 0,
            bx = (bu === Y),
            bB;
        for (; bv < e && (bx || !bB); bv++) {
            bB = bz[bv](bD, by, bC);
            if (typeof bB === "string") {
                if (!bx || bw[bB]) {
                    bB = M
                } else {
                    bD.dataTypes.unshift(bB);
                    bB = aT(bu, bD, by, bC, bB, bw)
                }
            }
        }
        if ((bx || !bB) && !bw["*"]) {
            bB = aT(bu, bD, by, bC, "*", bw)
        }
        return bB
    }

    function aj(bv, bw) {
        var bu, e, bx = b.ajaxSettings.flatOptions || {};
        for (bu in bw) {
            if (bw[bu] !== M) {
                (bx[bu] ? bv : (e || (e = {})))[bu] = bw[bu]
            }
        }
        if (e) {
            b.extend(true, bv, e)
        }
    }
    b.fn.extend({
        load: function (bv, by, bz) {
            if (typeof bv !== "string" && C) {
                return C.apply(this, arguments)
            } else {
                if (!this.length) {
                    return this
                }
            }
            var bx = bv.indexOf(" ");
            if (bx >= 0) {
                var e = bv.slice(bx, bv.length);
                bv = bv.slice(0, bx)
            }
            var bw = "GET";
            if (by) {
                if (b.isFunction(by)) {
                    bz = by;
                    by = M
                } else {
                    if (typeof by === "object") {
                        by = b.param(by, b.ajaxSettings.traditional);
                        bw = "POST"
                    }
                }
            }
            var bu = this;
            b.ajax({
                url: bv,
                type: bw,
                dataType: "html",
                data: by,
                complete: function (bB, bA, bC) {
                    bC = bB.responseText;
                    if (bB.isResolved()) {
                        bB.done(function (bD) {
                            bC = bD
                        });
                        bu.html(e ? b("<div>").append(bC.replace(a5, "")).find(e) : bC)
                    }
                    if (bz) {
                        bu.each(bz, [bC, bA, bB])
                    }
                }
            });
            return this
        },
        serialize: function () {
            return b.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? b.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || s.test(this.nodeName) || aY.test(this.type))
            }).map(function (e, bu) {
                var bv = b(this).val();
                return bv == null ? null : b.isArray(bv) ? b.map(bv, function (bx, bw) {
                    return {
                        name: bu.name,
                        value: bx.replace(bs, "\r\n")
                    }
                }) : {
                    name: bu.name,
                    value: bv.replace(bs, "\r\n")
                }
            }).get()
        }
    });
    b.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, bu) {
        b.fn[bu] = function (bv) {
            return this.bind(bu, bv)
        }
    });
    b.each(["get", "post"], function (e, bu) {
        b[bu] = function (bv, bx, by, bw) {
            if (b.isFunction(bx)) {
                bw = bw || by;
                by = bx;
                bx = M
            }
            return b.ajax({
                type: bu,
                url: bv,
                data: bx,
                success: by,
                dataType: bw
            })
        }
    });
    b.extend({
        getScript: function (e, bu) {
            return b.get(e, M, bu, "script")
        },
        getJSON: function (e, bu, bv) {
            return b.get(e, bu, bv, "json")
        },
        ajaxSetup: function (bu, e) {
            if (e) {
                aj(bu, b.ajaxSettings)
            } else {
                e = bu;
                bu = b.ajaxSettings
            }
            aj(bu, e);
            return bu
        },
        ajaxSettings: {
            url: aC,
            isLocal: aK.test(u[1]),
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": aR
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": ba.String,
                "text html": true,
                "text json": b.parseJSON,
                "text xml": b.parseXML
            },
            flatOptions: {
                context: true,
                url: true
            }
        },
        ajaxPrefilter: f(Y),
        ajaxTransport: f(t),
        ajax: function (by, bw) {
            if (typeof by === "object") {
                bw = by;
                by = M
            }
            bw = bw || {};
            var bC = b.ajaxSetup({}, bw),
                bR = bC.context || bC,
                bF = bR !== bC && (bR.nodeType || bR instanceof b) ? b(bR) : b.event,
                bQ = b.Deferred(),
                bM = b._Deferred(),
                bA = bC.statusCode || {}, bB, bG = {}, bN = {}, bP, bx, bK, bD, bH, bz = 0,
                bv, bJ, bI = {
                    readyState: 0,
                    setRequestHeader: function (bS, bT) {
                        if (!bz) {
                            var e = bS.toLowerCase();
                            bS = bN[e] = bN[e] || bS;
                            bG[bS] = bT
                        }
                        return this
                    },
                    getAllResponseHeaders: function () {
                        return bz === 2 ? bP : null
                    },
                    getResponseHeader: function (bS) {
                        var e;
                        if (bz === 2) {
                            if (!bx) {
                                bx = {};
                                while ((e = aB.exec(bP))) {
                                    bx[e[1].toLowerCase()] = e[2]
                                }
                            }
                            e = bx[bS.toLowerCase()]
                        }
                        return e === M ? null : e
                    },
                    overrideMimeType: function (e) {
                        if (!bz) {
                            bC.mimeType = e
                        }
                        return this
                    },
                    abort: function (e) {
                        e = e || "abort";
                        if (bK) {
                            bK.abort(e)
                        }
                        bE(0, e);
                        return this
                    }
                };

            function bE(bY, bT, bZ, bV) {
                if (bz === 2) {
                    return
                }
                bz = 2;
                if (bD) {
                    clearTimeout(bD)
                }
                bK = M;
                bP = bV || "";
                bI.readyState = bY > 0 ? 4 : 0;
                var bS, b3, b2, bW = bT,
                    bX = bZ ? bi(bC, bI, bZ) : M,
                    bU, b1;
                if (bY >= 200 && bY < 300 || bY === 304) {
                    if (bC.ifModified) {
                        if ((bU = bI.getResponseHeader("Last-Modified"))) {
                            b.lastModified[bB] = bU
                        }
                        if ((b1 = bI.getResponseHeader("Etag"))) {
                            b.etag[bB] = b1
                        }
                    }
                    if (bY === 304) {
                        bW = "notmodified";
                        bS = true
                    } else {
                        try {
                            b3 = H(bC, bX);
                            bW = "success";
                            bS = true
                        } catch (b0) {
                            bW = "parsererror";
                            b2 = b0
                        }
                    }
                } else {
                    b2 = bW;
                    if (!bW || bY) {
                        bW = "error";
                        if (bY < 0) {
                            bY = 0
                        }
                    }
                }
                bI.status = bY;
                bI.statusText = "" + (bT || bW);
                if (bS) {
                    bQ.resolveWith(bR, [b3, bW, bI])
                } else {
                    bQ.rejectWith(bR, [bI, bW, b2])
                }
                bI.statusCode(bA);
                bA = M;
                if (bv) {
                    bF.trigger("ajax" + (bS ? "Success" : "Error"), [bI, bC, bS ? b3 : b2])
                }
                bM.resolveWith(bR, [bI, bW]);
                if (bv) {
                    bF.trigger("ajaxComplete", [bI, bC]);
                    if (!(--b.active)) {
                        b.event.trigger("ajaxStop")
                    }
                }
            }
            bQ.promise(bI);
            bI.success = bI.done;
            bI.error = bI.fail;
            bI.complete = bM.done;
            bI.statusCode = function (bS) {
                if (bS) {
                    var e;
                    if (bz < 2) {
                        for (e in bS) {
                            bA[e] = [bA[e], bS[e]]
                        }
                    } else {
                        e = bS[bI.status];
                        bI.then(e, e)
                    }
                }
                return this
            };
            bC.url = ((by || bC.url) + "").replace(bq, "").replace(c, u[1] + "//");
            bC.dataTypes = b.trim(bC.dataType || "*").toLowerCase().split(h);
            if (bC.crossDomain == null) {
                bH = L.exec(bC.url.toLowerCase());
                bC.crossDomain = !! (bH && (bH[1] != u[1] || bH[2] != u[2] || (bH[3] || (bH[1] === "http:" ? 80 : 443)) != (u[3] || (u[1] === "http:" ? 80 : 443))))
            }
            if (bC.data && bC.processData && typeof bC.data !== "string") {
                bC.data = b.param(bC.data, bC.traditional)
            }
            aT(Y, bC, bw, bI);
            if (bz === 2) {
                return false
            }
            bv = bC.global;
            bC.type = bC.type.toUpperCase();
            bC.hasContent = !aN.test(bC.type);
            if (bv && b.active++ === 0) {
                b.event.trigger("ajaxStart")
            }
            if (!bC.hasContent) {
                if (bC.data) {
                    bC.url += (N.test(bC.url) ? "&" : "?") + bC.data;
                    delete bC.data
                }
                bB = bC.url;
                if (bC.cache === false) {
                    var bu = b.now(),
                        bO = bC.url.replace(br, "$1_=" + bu);
                    bC.url = bO + ((bO === bC.url) ? (N.test(bC.url) ? "&" : "?") + "_=" + bu : "")
                }
            }
            if (bC.data && bC.hasContent && bC.contentType !== false || bw.contentType) {
                bI.setRequestHeader("Content-Type", bC.contentType)
            }
            if (bC.ifModified) {
                bB = bB || bC.url;
                if (b.lastModified[bB]) {
                    bI.setRequestHeader("If-Modified-Since", b.lastModified[bB])
                }
                if (b.etag[bB]) {
                    bI.setRequestHeader("If-None-Match", b.etag[bB])
                }
            }
            bI.setRequestHeader("Accept", bC.dataTypes[0] && bC.accepts[bC.dataTypes[0]] ? bC.accepts[bC.dataTypes[0]] + (bC.dataTypes[0] !== "*" ? ", " + aR + "; q=0.01" : "") : bC.accepts["*"]);
            for (bJ in bC.headers) {
                bI.setRequestHeader(bJ, bC.headers[bJ])
            }
            if (bC.beforeSend && (bC.beforeSend.call(bR, bI, bC) === false || bz === 2)) {
                bI.abort();
                return false
            }
            for (bJ in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                bI[bJ](bC[bJ])
            }
            bK = aT(t, bC, bw, bI);
            if (!bK) {
                bE(-1, "No Transport")
            } else {
                bI.readyState = 1;
                if (bv) {
                    bF.trigger("ajaxSend", [bI, bC])
                }
                if (bC.async && bC.timeout > 0) {
                    bD = setTimeout(function () {
                        bI.abort("timeout")
                    }, bC.timeout)
                }
                try {
                    bz = 1;
                    bK.send(bG, bE)
                } catch (bL) {
                    if (bz < 2) {
                        bE(-1, bL)
                    } else {
                        b.error(bL)
                    }
                }
            }
            return bI
        },
        param: function (e, bv) {
            var bu = [],
                bx = function (by, bz) {
                    bz = b.isFunction(bz) ? bz() : bz;
                    bu[bu.length] = encodeURIComponent(by) + "=" + encodeURIComponent(bz)
                };
            if (bv === M) {
                bv = b.ajaxSettings.traditional
            }
            if (b.isArray(e) || (e.jquery && !b.isPlainObject(e))) {
                b.each(e, function () {
                    bx(this.name, this.value)
                })
            } else {
                for (var bw in e) {
                    x(bw, e[bw], bv, bx)
                }
            }
            return bu.join("&").replace(l, "+")
        }
    });

    function x(bv, bx, bu, bw) {
        if (b.isArray(bx)) {
            b.each(bx, function (bz, by) {
                if (bu || an.test(bv)) {
                    bw(bv, by)
                } else {
                    x(bv + "[" + (typeof by === "object" || b.isArray(by) ? bz : "") + "]", by, bu, bw)
                }
            })
        } else {
            if (!bu && bx != null && typeof bx === "object") {
                for (var e in bx) {
                    x(bv + "[" + e + "]", bx[e], bu, bw)
                }
            } else {
                bw(bv, bx)
            }
        }
    }
    b.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });

    function bi(bC, bB, by) {
        var bu = bC.contents,
            bA = bC.dataTypes,
            bv = bC.responseFields,
            bx, bz, bw, e;
        for (bz in bv) {
            if (bz in by) {
                bB[bv[bz]] = by[bz]
            }
        }
        while (bA[0] === "*") {
            bA.shift();
            if (bx === M) {
                bx = bC.mimeType || bB.getResponseHeader("content-type")
            }
        }
        if (bx) {
            for (bz in bu) {
                if (bu[bz] && bu[bz].test(bx)) {
                    bA.unshift(bz);
                    break
                }
            }
        }
        if (bA[0] in by) {
            bw = bA[0]
        } else {
            for (bz in by) {
                if (!bA[0] || bC.converters[bz + " " + bA[0]]) {
                    bw = bz;
                    break
                }
                if (!e) {
                    e = bz
                }
            }
            bw = bw || e
        } if (bw) {
            if (bw !== bA[0]) {
                bA.unshift(bw)
            }
            return by[bw]
        }
    }

    function H(bG, by) {
        if (bG.dataFilter) {
            by = bG.dataFilter(by, bG.dataType)
        }
        var bC = bG.dataTypes,
            bF = {}, bz, bD, bv = bC.length,
            bA, bB = bC[0],
            bw, bx, bE, bu, e;
        for (bz = 1; bz < bv; bz++) {
            if (bz === 1) {
                for (bD in bG.converters) {
                    if (typeof bD === "string") {
                        bF[bD.toLowerCase()] = bG.converters[bD]
                    }
                }
            }
            bw = bB;
            bB = bC[bz];
            if (bB === "*") {
                bB = bw
            } else {
                if (bw !== "*" && bw !== bB) {
                    bx = bw + " " + bB;
                    bE = bF[bx] || bF["* " + bB];
                    if (!bE) {
                        e = M;
                        for (bu in bF) {
                            bA = bu.split(" ");
                            if (bA[0] === bw || bA[0] === "*") {
                                e = bF[bA[1] + " " + bB];
                                if (e) {
                                    bu = bF[bu];
                                    if (bu === true) {
                                        bE = e
                                    } else {
                                        if (e === true) {
                                            bE = bu
                                        }
                                    }
                                    break
                                }
                            }
                        }
                    }
                    if (!(bE || e)) {
                        b.error("No conversion from " + bx.replace(" ", " to "))
                    }
                    if (bE !== true) {
                        by = bE ? bE(by) : e(bu(by))
                    }
                }
            }
        }
        return by
    }
    var aA = b.now(),
        w = /(\=)\?(&|$)|\?\?/i;
    b.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            return b.expando + "_" + (aA++)
        }
    });
    b.ajaxPrefilter("json jsonp", function (bC, bz, bB) {
        var bw = bC.contentType === "application/x-www-form-urlencoded" && (typeof bC.data === "string");
        if (bC.dataTypes[0] === "jsonp" || bC.jsonp !== false && (w.test(bC.url) || bw && w.test(bC.data))) {
            var bA, bv = bC.jsonpCallback = b.isFunction(bC.jsonpCallback) ? bC.jsonpCallback() : bC.jsonpCallback,
                by = ba[bv],
                e = bC.url,
                bx = bC.data,
                bu = "$1" + bv + "$2";
            if (bC.jsonp !== false) {
                e = e.replace(w, bu);
                if (bC.url === e) {
                    if (bw) {
                        bx = bx.replace(w, bu)
                    }
                    if (bC.data === bx) {
                        e += (/\?/.test(e) ? "&" : "?") + bC.jsonp + "=" + bv
                    }
                }
            }
            bC.url = e;
            bC.data = bx;
            ba[bv] = function (bD) {
                bA = [bD]
            };
            bB.always(function () {
                ba[bv] = by;
                if (bA && b.isFunction(by)) {
                    ba[bv](bA[0])
                }
            });
            bC.converters["script json"] = function () {
                if (!bA) {
                    b.error(bv + " was not called")
                }
                return bA[0]
            };
            bC.dataTypes[0] = "json";
            return "script"
        }
    });
    b.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function (e) {
                b.globalEval(e);
                return e
            }
        }
    });
    b.ajaxPrefilter("script", function (e) {
        if (e.cache === M) {
            e.cache = false
        }
        if (e.crossDomain) {
            e.type = "GET";
            e.global = false
        }
    });
    b.ajaxTransport("script", function (bv) {
        if (bv.crossDomain) {
            var e, bu = at.head || at.getElementsByTagName("head")[0] || at.documentElement;
            return {
                send: function (bw, bx) {
                    e = at.createElement("script");
                    e.async = "async";
                    if (bv.scriptCharset) {
                        e.charset = bv.scriptCharset
                    }
                    e.src = bv.url;
                    e.onload = e.onreadystatechange = function (bz, by) {
                        if (by || !e.readyState || /loaded|complete/.test(e.readyState)) {
                            e.onload = e.onreadystatechange = null;
                            if (bu && e.parentNode) {
                                bu.removeChild(e)
                            }
                            e = M;
                            if (!by) {
                                bx(200, "success")
                            }
                        }
                    };
                    bu.insertBefore(e, bu.firstChild)
                },
                abort: function () {
                    if (e) {
                        e.onload(0, 1)
                    }
                }
            }
        }
    });
    var D = ba.ActiveXObject ? function () {
            for (var e in O) {
                O[e](0, 1)
            }
        } : false,
        A = 0,
        O;

    function aJ() {
        try {
            return new ba.XMLHttpRequest()
        } catch (bu) {}
    }

    function ag() {
        try {
            return new ba.ActiveXObject("Microsoft.XMLHTTP")
        } catch (bu) {}
    }
    b.ajaxSettings.xhr = ba.ActiveXObject ? function () {
        return !this.isLocal && aJ() || ag()
    } : aJ;
    (function (e) {
        b.extend(b.support, {
            ajax: !! e,
            cors: !! e && ("withCredentials" in e)
        })
    })(b.ajaxSettings.xhr());
    if (b.support.ajax) {
        b.ajaxTransport(function (e) {
            if (!e.crossDomain || b.support.cors) {
                var bu;
                return {
                    send: function (bA, bv) {
                        var bz = e.xhr(),
                            by, bx;
                        if (e.username) {
                            bz.open(e.type, e.url, e.async, e.username, e.password)
                        } else {
                            bz.open(e.type, e.url, e.async)
                        } if (e.xhrFields) {
                            for (bx in e.xhrFields) {
                                bz[bx] = e.xhrFields[bx]
                            }
                        }
                        if (e.mimeType && bz.overrideMimeType) {
                            bz.overrideMimeType(e.mimeType)
                        }
                        if (!e.crossDomain && !bA["X-Requested-With"]) {
                            bA["X-Requested-With"] = "XMLHttpRequest"
                        }
                        try {
                            for (bx in bA) {
                                bz.setRequestHeader(bx, bA[bx])
                            }
                        } catch (bw) {}
                        bz.send((e.hasContent && e.data) || null);
                        bu = function (bJ, bD) {
                            var bE, bC, bB, bH, bG;
                            try {
                                if (bu && (bD || bz.readyState === 4)) {
                                    bu = M;
                                    if (by) {
                                        bz.onreadystatechange = b.noop;
                                        if (D) {
                                            delete O[by]
                                        }
                                    }
                                    if (bD) {
                                        if (bz.readyState !== 4) {
                                            bz.abort()
                                        }
                                    } else {
                                        bE = bz.status;
                                        bB = bz.getAllResponseHeaders();
                                        bH = {};
                                        bG = bz.responseXML;
                                        if (bG && bG.documentElement) {
                                            bH.xml = bG
                                        }
                                        bH.text = bz.responseText;
                                        try {
                                            bC = bz.statusText
                                        } catch (bI) {
                                            bC = ""
                                        }
                                        if (!bE && e.isLocal && !e.crossDomain) {
                                            bE = bH.text ? 200 : 404
                                        } else {
                                            if (bE === 1223) {
                                                bE = 204
                                            }
                                        }
                                    }
                                }
                            } catch (bF) {
                                if (!bD) {
                                    bv(-1, bF)
                                }
                            }
                            if (bH) {
                                bv(bE, bC, bH, bB)
                            }
                        };
                        if (!e.async || bz.readyState === 4) {
                            bu()
                        } else {
                            by = ++A;
                            if (D) {
                                if (!O) {
                                    O = {};
                                    b(ba).unload(D)
                                }
                                O[by] = bu
                            }
                            bz.onreadystatechange = bu
                        }
                    },
                    abort: function () {
                        if (bu) {
                            bu(0, 1)
                        }
                    }
                }
            }
        })
    }
    var S = {}, a7, o, az = /^(?:toggle|show|hide)$/,
        aP = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        a2, aF = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        a3;
    b.fn.extend({
        show: function (bw, bz, by) {
            var bv, bx;
            if (bw || bw === 0) {
                return this.animate(a0("show", 3), bw, bz, by)
            } else {
                for (var bu = 0, e = this.length; bu < e; bu++) {
                    bv = this[bu];
                    if (bv.style) {
                        bx = bv.style.display;
                        if (!b._data(bv, "olddisplay") && bx === "none") {
                            bx = bv.style.display = ""
                        }
                        if (bx === "" && b.css(bv, "display") === "none") {
                            b._data(bv, "olddisplay", z(bv.nodeName))
                        }
                    }
                }
                for (bu = 0; bu < e; bu++) {
                    bv = this[bu];
                    if (bv.style) {
                        bx = bv.style.display;
                        if (bx === "" || bx === "none") {
                            bv.style.display = b._data(bv, "olddisplay") || ""
                        }
                    }
                }
                return this
            }
        },
        hide: function (bv, by, bx) {
            if (bv || bv === 0) {
                return this.animate(a0("hide", 3), bv, by, bx)
            } else {
                for (var bu = 0, e = this.length; bu < e; bu++) {
                    if (this[bu].style) {
                        var bw = b.css(this[bu], "display");
                        if (bw !== "none" && !b._data(this[bu], "olddisplay")) {
                            b._data(this[bu], "olddisplay", bw)
                        }
                    }
                }
                for (bu = 0; bu < e; bu++) {
                    if (this[bu].style) {
                        this[bu].style.display = "none"
                    }
                }
                return this
            }
        },
        _toggle: b.fn.toggle,
        toggle: function (bv, bu, bw) {
            var e = typeof bv === "boolean";
            if (b.isFunction(bv) && b.isFunction(bu)) {
                this._toggle.apply(this, arguments)
            } else {
                if (bv == null || e) {
                    this.each(function () {
                        var bx = e ? bv : b(this).is(":hidden");
                        b(this)[bx ? "show" : "hide"]()
                    })
                } else {
                    this.animate(a0("toggle", 3), bv, bu, bw)
                }
            }
            return this
        },
        fadeTo: function (e, bw, bv, bu) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: bw
            }, e, bv, bu)
        },
        animate: function (bx, bu, bw, bv) {
            var e = b.speed(bu, bw, bv);
            if (b.isEmptyObject(bx)) {
                return this.each(e.complete, [false])
            }
            bx = b.extend({}, bx);
            return this[e.queue === false ? "each" : "queue"](function () {
                if (e.queue === false) {
                    b._mark(this)
                }
                var bB = b.extend({}, e),
                    bI = this.nodeType === 1,
                    bF = bI && b(this).is(":hidden"),
                    by, bC, bA, bH, bG, bE, bz, bD, bJ;
                bB.animatedProperties = {};
                for (bA in bx) {
                    by = b.camelCase(bA);
                    if (bA !== by) {
                        bx[by] = bx[bA];
                        delete bx[bA]
                    }
                    bC = bx[by];
                    if (b.isArray(bC)) {
                        bB.animatedProperties[by] = bC[1];
                        bC = bx[by] = bC[0]
                    } else {
                        bB.animatedProperties[by] = bB.specialEasing && bB.specialEasing[by] || bB.easing || "swing"
                    } if (bC === "hide" && bF || bC === "show" && !bF) {
                        return bB.complete.call(this)
                    }
                    if (bI && (by === "height" || by === "width")) {
                        bB.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        if (b.css(this, "display") === "inline" && b.css(this, "float") === "none") {
                            if (!b.support.inlineBlockNeedsLayout) {
                                this.style.display = "inline-block"
                            } else {
                                bH = z(this.nodeName);
                                if (bH === "inline") {
                                    this.style.display = "inline-block"
                                } else {
                                    this.style.display = "inline";
                                    this.style.zoom = 1
                                }
                            }
                        }
                    }
                }
                if (bB.overflow != null) {
                    this.style.overflow = "hidden"
                }
                for (bA in bx) {
                    bG = new b.fx(this, bB, bA);
                    bC = bx[bA];
                    if (az.test(bC)) {
                        bG[bC === "toggle" ? bF ? "show" : "hide" : bC]()
                    } else {
                        bE = aP.exec(bC);
                        bz = bG.cur();
                        if (bE) {
                            bD = parseFloat(bE[2]);
                            bJ = bE[3] || (b.cssNumber[bA] ? "" : "px");
                            if (bJ !== "px") {
                                b.style(this, bA, (bD || 1) + bJ);
                                bz = ((bD || 1) / bG.cur()) * bz;
                                b.style(this, bA, bz + bJ)
                            }
                            if (bE[1]) {
                                bD = ((bE[1] === "-=" ? -1 : 1) * bD) + bz
                            }
                            bG.custom(bz, bD, bJ)
                        } else {
                            bG.custom(bz, bC, "")
                        }
                    }
                }
                return true
            })
        },
        stop: function (bu, e) {
            if (bu) {
                this.queue([])
            }
            this.each(function () {
                var bw = b.timers,
                    bv = bw.length;
                if (!e) {
                    b._unmark(true, this)
                }
                while (bv--) {
                    if (bw[bv].elem === this) {
                        if (e) {
                            bw[bv](true)
                        }
                        bw.splice(bv, 1)
                    }
                }
            });
            if (!e) {
                this.dequeue()
            }
            return this
        }
    });

    function bf() {
        setTimeout(aq, 0);
        return (a3 = b.now())
    }

    function aq() {
        a3 = M
    }

    function a0(bu, e) {
        var bv = {};
        b.each(aF.concat.apply([], aF.slice(0, e)), function () {
            bv[this] = bu
        });
        return bv
    }
    b.each({
        slideDown: a0("show", 1),
        slideUp: a0("hide", 1),
        slideToggle: a0("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (e, bu) {
        b.fn[e] = function (bv, bx, bw) {
            return this.animate(bu, bv, bx, bw)
        }
    });
    b.extend({
        speed: function (bv, bw, bu) {
            var e = bv && typeof bv === "object" ? b.extend({}, bv) : {
                complete: bu || !bu && bw || b.isFunction(bv) && bv,
                duration: bv,
                easing: bu && bw || bw && !b.isFunction(bw) && bw
            };
            e.duration = b.fx.off ? 0 : typeof e.duration === "number" ? e.duration : e.duration in b.fx.speeds ? b.fx.speeds[e.duration] : b.fx.speeds._default;
            e.old = e.complete;
            e.complete = function (bx) {
                if (b.isFunction(e.old)) {
                    e.old.call(this)
                }
                if (e.queue !== false) {
                    b.dequeue(this)
                } else {
                    if (bx !== false) {
                        b._unmark(this)
                    }
                }
            };
            return e
        },
        easing: {
            linear: function (bv, bw, e, bu) {
                return e + bu * bv
            },
            swing: function (bv, bw, e, bu) {
                return ((-Math.cos(bv * Math.PI) / 2) + 0.5) * bu + e
            }
        },
        timers: [],
        fx: function (bu, e, bv) {
            this.options = e;
            this.elem = bu;
            this.prop = bv;
            e.orig = e.orig || {}
        }
    });
    b.fx.prototype = {
        update: function () {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }(b.fx.step[this.prop] || b.fx.step._default)(this)
        },
        cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop]
            }
            var e, bu = b.css(this.elem, this.prop);
            return isNaN(e = parseFloat(bu)) ? !bu || bu === "auto" ? 0 : bu : e
        },
        custom: function (by, bx, bw) {
            var e = this,
                bv = b.fx;
            this.startTime = a3 || bf();
            this.start = by;
            this.end = bx;
            this.unit = bw || this.unit || (b.cssNumber[this.prop] ? "" : "px");
            this.now = this.start;
            this.pos = this.state = 0;

            function bu(bz) {
                return e.step(bz)
            }
            bu.elem = this.elem;
            if (bu() && b.timers.push(bu) && !a2) {
                a2 = setInterval(bv.tick, bv.interval)
            }
        },
        show: function () {
            this.options.orig[this.prop] = b.style(this.elem, this.prop);
            this.options.show = true;
            this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
            b(this.elem).show()
        },
        hide: function () {
            this.options.orig[this.prop] = b.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function (bx) {
            var bw = a3 || bf(),
                e = true,
                by = this.elem,
                bu = this.options,
                bv, bA;
            if (bx || bw >= bu.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                bu.animatedProperties[this.prop] = true;
                for (bv in bu.animatedProperties) {
                    if (bu.animatedProperties[bv] !== true) {
                        e = false
                    }
                }
                if (e) {
                    if (bu.overflow != null && !b.support.shrinkWrapBlocks) {
                        b.each(["", "X", "Y"], function (bB, bC) {
                            by.style["overflow" + bC] = bu.overflow[bB]
                        })
                    }
                    if (bu.hide) {
                        b(by).hide()
                    }
                    if (bu.hide || bu.show) {
                        for (var bz in bu.animatedProperties) {
                            b.style(by, bz, bu.orig[bz])
                        }
                    }
                    bu.complete.call(by)
                }
                return false
            } else {
                if (bu.duration == Infinity) {
                    this.now = bw
                } else {
                    bA = bw - this.startTime;
                    this.state = bA / bu.duration;
                    this.pos = b.easing[bu.animatedProperties[this.prop]](this.state, bA, 0, 1, bu.duration);
                    this.now = this.start + ((this.end - this.start) * this.pos)
                }
                this.update()
            }
            return true
        }
    };
    b.extend(b.fx, {
        tick: function () {
            for (var bu = b.timers, e = 0; e < bu.length; ++e) {
                if (!bu[e]()) {
                    bu.splice(e--, 1)
                }
            }
            if (!bu.length) {
                b.fx.stop()
            }
        },
        interval: 13,
        stop: function () {
            clearInterval(a2);
            a2 = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (e) {
                b.style(e.elem, "opacity", e.now)
            },
            _default: function (e) {
                if (e.elem.style && e.elem.style[e.prop] != null) {
                    e.elem.style[e.prop] = (e.prop === "width" || e.prop === "height" ? Math.max(0, e.now) : e.now) + e.unit
                } else {
                    e.elem[e.prop] = e.now
                }
            }
        }
    });
    if (b.expr && b.expr.filters) {
        b.expr.filters.animated = function (e) {
            return b.grep(b.timers, function (bu) {
                return e === bu.elem
            }).length
        }
    }

    function z(bw) {
        if (!S[bw]) {
            var e = at.body,
                bu = b("<" + bw + ">").appendTo(e),
                bv = bu.css("display");
            bu.remove();
            if (bv === "none" || bv === "") {
                if (!a7) {
                    a7 = at.createElement("iframe");
                    a7.frameBorder = a7.width = a7.height = 0
                }
                e.appendChild(a7);
                if (!o || !a7.createElement) {
                    o = (a7.contentWindow || a7.contentDocument).document;
                    o.write((at.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>");
                    o.close()
                }
                bu = o.createElement(bw);
                o.body.appendChild(bu);
                bv = b.css(bu, "display");
                e.removeChild(a7)
            }
            S[bw] = bv
        }
        return S[bw]
    }
    var V = /^t(?:able|d|h)$/i,
        ab = /^(?:body|html)$/i;
    if ("getBoundingClientRect" in at.documentElement) {
        b.fn.offset = function (bH) {
            var bx = this[0],
                bA;
            if (bH) {
                return this.each(function (e) {
                    b.offset.setOffset(this, bH, e)
                })
            }
            if (!bx || !bx.ownerDocument) {
                return null
            }
            if (bx === bx.ownerDocument.body) {
                return b.offset.bodyOffset(bx)
            }
            try {
                bA = bx.getBoundingClientRect()
            } catch (bE) {}
            var bG = bx.ownerDocument,
                bv = bG.documentElement;
            if (!bA || !b.contains(bv, bx)) {
                return bA ? {
                    top: bA.top,
                    left: bA.left
                } : {
                    top: 0,
                    left: 0
                }
            }
            var bB = bG.body,
                bC = aI(bG),
                bz = bv.clientTop || bB.clientTop || 0,
                bD = bv.clientLeft || bB.clientLeft || 0,
                bu = bC.pageYOffset || b.support.boxModel && bv.scrollTop || bB.scrollTop,
                by = bC.pageXOffset || b.support.boxModel && bv.scrollLeft || bB.scrollLeft,
                bF = bA.top + bu - bz,
                bw = bA.left + by - bD;
            return {
                top: bF,
                left: bw
            }
        }
    } else {
        b.fn.offset = function (bE) {
            var by = this[0];
            if (bE) {
                return this.each(function (bF) {
                    b.offset.setOffset(this, bE, bF)
                })
            }
            if (!by || !by.ownerDocument) {
                return null
            }
            if (by === by.ownerDocument.body) {
                return b.offset.bodyOffset(by)
            }
            b.offset.initialize();
            var bB, bv = by.offsetParent,
                bu = by,
                bD = by.ownerDocument,
                bw = bD.documentElement,
                bz = bD.body,
                bA = bD.defaultView,
                e = bA ? bA.getComputedStyle(by, null) : by.currentStyle,
                bC = by.offsetTop,
                bx = by.offsetLeft;
            while ((by = by.parentNode) && by !== bz && by !== bw) {
                if (b.offset.supportsFixedPosition && e.position === "fixed") {
                    break
                }
                bB = bA ? bA.getComputedStyle(by, null) : by.currentStyle;
                bC -= by.scrollTop;
                bx -= by.scrollLeft;
                if (by === bv) {
                    bC += by.offsetTop;
                    bx += by.offsetLeft;
                    if (b.offset.doesNotAddBorder && !(b.offset.doesAddBorderForTableAndCells && V.test(by.nodeName))) {
                        bC += parseFloat(bB.borderTopWidth) || 0;
                        bx += parseFloat(bB.borderLeftWidth) || 0
                    }
                    bu = bv;
                    bv = by.offsetParent
                }
                if (b.offset.subtractsBorderForOverflowNotVisible && bB.overflow !== "visible") {
                    bC += parseFloat(bB.borderTopWidth) || 0;
                    bx += parseFloat(bB.borderLeftWidth) || 0
                }
                e = bB
            }
            if (e.position === "relative" || e.position === "static") {
                bC += bz.offsetTop;
                bx += bz.offsetLeft
            }
            if (b.offset.supportsFixedPosition && e.position === "fixed") {
                bC += Math.max(bw.scrollTop, bz.scrollTop);
                bx += Math.max(bw.scrollLeft, bz.scrollLeft)
            }
            return {
                top: bC,
                left: bx
            }
        }
    }
    b.offset = {
        initialize: function () {
            var e = at.body,
                bu = at.createElement("div"),
                bx, bz, by, bA, bv = parseFloat(b.css(e, "marginTop")) || 0,
                bw = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            b.extend(bu.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            });
            bu.innerHTML = bw;
            e.insertBefore(bu, e.firstChild);
            bx = bu.firstChild;
            bz = bx.firstChild;
            bA = bx.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = (bz.offsetTop !== 5);
            this.doesAddBorderForTableAndCells = (bA.offsetTop === 5);
            bz.style.position = "fixed";
            bz.style.top = "20px";
            this.supportsFixedPosition = (bz.offsetTop === 20 || bz.offsetTop === 15);
            bz.style.position = bz.style.top = "";
            bx.style.overflow = "hidden";
            bx.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = (bz.offsetTop === -5);
            this.doesNotIncludeMarginInBodyOffset = (e.offsetTop !== bv);
            e.removeChild(bu);
            b.offset.initialize = b.noop
        },
        bodyOffset: function (e) {
            var bv = e.offsetTop,
                bu = e.offsetLeft;
            b.offset.initialize();
            if (b.offset.doesNotIncludeMarginInBodyOffset) {
                bv += parseFloat(b.css(e, "marginTop")) || 0;
                bu += parseFloat(b.css(e, "marginLeft")) || 0
            }
            return {
                top: bv,
                left: bu
            }
        },
        setOffset: function (bw, bF, bz) {
            var bA = b.css(bw, "position");
            if (bA === "static") {
                bw.style.position = "relative"
            }
            var by = b(bw),
                bu = by.offset(),
                e = b.css(bw, "top"),
                bD = b.css(bw, "left"),
                bE = (bA === "absolute" || bA === "fixed") && b.inArray("auto", [e, bD]) > -1,
                bC = {}, bB = {}, bv, bx;
            if (bE) {
                bB = by.position();
                bv = bB.top;
                bx = bB.left
            } else {
                bv = parseFloat(e) || 0;
                bx = parseFloat(bD) || 0
            } if (b.isFunction(bF)) {
                bF = bF.call(bw, bz, bu)
            }
            if (bF.top != null) {
                bC.top = (bF.top - bu.top) + bv
            }
            if (bF.left != null) {
                bC.left = (bF.left - bu.left) + bx
            }
            if ("using" in bF) {
                bF.using.call(bw, bC)
            } else {
                by.css(bC)
            }
        }
    };
    b.fn.extend({
        position: function () {
            if (!this[0]) {
                return null
            }
            var bv = this[0],
                bu = this.offsetParent(),
                bw = this.offset(),
                e = ab.test(bu[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : bu.offset();
            bw.top -= parseFloat(b.css(bv, "marginTop")) || 0;
            bw.left -= parseFloat(b.css(bv, "marginLeft")) || 0;
            e.top += parseFloat(b.css(bu[0], "borderTopWidth")) || 0;
            e.left += parseFloat(b.css(bu[0], "borderLeftWidth")) || 0;
            return {
                top: bw.top - e.top,
                left: bw.left - e.left
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var e = this.offsetParent || at.body;
                while (e && (!ab.test(e.nodeName) && b.css(e, "position") === "static")) {
                    e = e.offsetParent
                }
                return e
            })
        }
    });
    b.each(["Left", "Top"], function (bu, e) {
        var bv = "scroll" + e;
        b.fn[bv] = function (by) {
            var bw, bx;
            if (by === M) {
                bw = this[0];
                if (!bw) {
                    return null
                }
                bx = aI(bw);
                return bx ? ("pageXOffset" in bx) ? bx[bu ? "pageYOffset" : "pageXOffset"] : b.support.boxModel && bx.document.documentElement[bv] || bx.document.body[bv] : bw[bv]
            }
            return this.each(function () {
                bx = aI(this);
                if (bx) {
                    bx.scrollTo(!bu ? by : b(bx).scrollLeft(), bu ? by : b(bx).scrollTop())
                } else {
                    this[bv] = by
                }
            })
        }
    });

    function aI(e) {
        return b.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : false
    }
    b.each(["Height", "Width"], function (bu, e) {
        var bv = e.toLowerCase();
        b.fn["inner" + e] = function () {
            var bw = this[0];
            return bw && bw.style ? parseFloat(b.css(bw, bv, "padding")) : null
        };
        b.fn["outer" + e] = function (bx) {
            var bw = this[0];
            return bw && bw.style ? parseFloat(b.css(bw, bv, bx ? "margin" : "border")) : null
        };
        b.fn[bv] = function (by) {
            var bz = this[0];
            if (!bz) {
                return by == null ? null : this
            }
            if (b.isFunction(by)) {
                return this.each(function (bD) {
                    var bC = b(this);
                    bC[bv](by.call(this, bD, bC[bv]()))
                })
            }
            if (b.isWindow(bz)) {
                var bA = bz.document.documentElement["client" + e],
                    bw = bz.document.body;
                return bz.document.compatMode === "CSS1Compat" && bA || bw && bw["client" + e] || bA
            } else {
                if (bz.nodeType === 9) {
                    return Math.max(bz.documentElement["client" + e], bz.body["scroll" + e], bz.documentElement["scroll" + e], bz.body["offset" + e], bz.documentElement["offset" + e])
                } else {
                    if (by === M) {
                        var bB = b.css(bz, bv),
                            bx = parseFloat(bB);
                        return b.isNaN(bx) ? bB : bx
                    } else {
                        return this.css(bv, typeof by === "string" ? by : by + "px")
                    }
                }
            }
        }
    });
    ba.jQuery = ba.$ = b
})(window);
(function (b) {
    if (!document.defaultView || !document.defaultView.getComputedStyle) {
        var d = b.curCSS;
        b.curCSS = function (g, e, h) {
            if (e === "background-position") {
                e = "backgroundPosition"
            }
            if (e !== "backgroundPosition" || !g.currentStyle || g.currentStyle[e]) {
                return d.apply(this, arguments)
            }
            var f = g.style;
            if (!h && f && f[e]) {
                return f[e]
            }
            return d(g, "backgroundPositionX", h) + " " + d(g, "backgroundPositionY", h)
        }
    }
    var c = b.fn.animate;
    b.fn.animate = function (e) {
        if ("background-position" in e) {
            e.backgroundPosition = e["background-position"];
            delete e["background-position"]
        }
        if ("backgroundPosition" in e) {
            e.backgroundPosition = "(" + e.backgroundPosition
        }
        return c.apply(this, arguments)
    };

    function a(f) {
        f = f.replace(/left|top/g, "0px");
        f = f.replace(/right|bottom/g, "100%");
        f = f.replace(/([0-9\.]+)(\s|\)|$)/g, "$1px$2");
        var e = f.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
        return [parseFloat(e[1], 10), e[2], parseFloat(e[3], 10), e[4]]
    }
    b.fx.step.backgroundPosition = function (f) {
        if (!f.bgPosReady) {
            var h = b.curCSS(f.elem, "backgroundPosition");
            if (!h) {
                h = "0px 0px"
            }
            h = a(h);
            f.start = [h[0], h[2]];
            var e = a(f.end);
            f.end = [e[0], e[2]];
            f.unit = [e[1], e[3]];
            f.bgPosReady = true
        }
        var g = [];
        g[0] = ((f.end[0] - f.start[0]) * f.pos) + f.start[0] + f.unit[0];
        g[1] = ((f.end[1] - f.start[1]) * f.pos) + f.start[1] + f.unit[1];
        f.elem.style.backgroundPosition = g[0] + " " + g[1]
    }
})(jQuery);
(function (a) {
    a._spritely = {
        animate: function (e) {
            var g = a(e.el);
            var b = g.attr("id");
            if (!a._spritely.instances[b]) {
                return this
            }
            e = a.extend(e, a._spritely.instances[b] || {});
            if (e.play_frames && !a._spritely.instances[b]["remaining_frames"]) {
                a._spritely.instances[b]["remaining_frames"] = e.play_frames + 1
            }
            if (e.type == "sprite" && e.fps) {
                var h;
                var c = function (q) {
                    var l = e.width,
                        p = e.height;
                    if (!h) {
                        h = [];
                        total = 0;
                        for (var o = 0; o < e.no_of_frames; o++) {
                            h[h.length] = (0 - total);
                            total += l
                        }
                    }
                    if (a._spritely.instances[b]["current_frame"] == 0) {
                        if (e.on_first_frame) {
                            e.on_first_frame(q)
                        }
                    } else {
                        if (a._spritely.instances[b]["current_frame"] == h.length - 1) {
                            if (e.on_last_frame) {
                                e.on_last_frame(q)
                            }
                        }
                    } if (e.on_frame && e.on_frame[a._spritely.instances[b]["current_frame"]]) {
                        e.on_frame[a._spritely.instances[b]["current_frame"]](q)
                    }
                    if (e.rewind == true) {
                        if (a._spritely.instances[b]["current_frame"] <= 0) {
                            a._spritely.instances[b]["current_frame"] = h.length - 1
                        } else {
                            a._spritely.instances[b]["current_frame"] = a._spritely.instances[b]["current_frame"] - 1
                        }
                    } else {
                        if (a._spritely.instances[b]["current_frame"] >= h.length - 1) {
                            a._spritely.instances[b]["current_frame"] = 0
                        } else {
                            a._spritely.instances[b]["current_frame"] = a._spritely.instances[b]["current_frame"] + 1
                        }
                    }
                    var r = a._spritely.getBgY(q);
                    q.css("background-position", h[a._spritely.instances[b]["current_frame"]] + "px " + r);
                    if (e.bounce && e.bounce[0] > 0 && e.bounce[1] > 0) {
                        var k = e.bounce[0];
                        var m = e.bounce[1];
                        var n = e.bounce[2];
                        q.animate({
                            top: "+=" + k + "px",
                            left: "-=" + m + "px"
                        }, n).animate({
                            top: "-=" + k + "px",
                            left: "+=" + m + "px"
                        }, n)
                    }
                };
                if (a._spritely.instances[b]["remaining_frames"] && a._spritely.instances[b]["remaining_frames"] > 0) {
                    a._spritely.instances[b]["remaining_frames"]--;
                    if (a._spritely.instances[b]["remaining_frames"] == 0) {
                        a._spritely.instances[b]["remaining_frames"] = -1;
                        delete a._spritely.instances[b]["remaining_frames"];
                        return
                    } else {
                        c(g)
                    }
                } else {
                    if (a._spritely.instances[b]["remaining_frames"] != -1) {
                        c(g)
                    }
                }
            } else {
                if (e.type == "pan") {
                    if (!a._spritely.instances[b]["_stopped"]) {
                        if (e.dir == "up") {
                            a._spritely.instances[b]["l"] = a._spritely.getBgX(g).replace("px", "");
                            a._spritely.instances[b]["t"] = (a._spritely.instances[b]["t"] - (e.speed || 1)) || 0
                        } else {
                            if (e.dir == "down") {
                                a._spritely.instances[b]["l"] = a._spritely.getBgX(g).replace("px", "");
                                a._spritely.instances[b]["t"] = (a._spritely.instances[b]["t"] + (e.speed || 1)) || 0
                            } else {
                                if (e.dir == "left") {
                                    a._spritely.instances[b]["l"] = (a._spritely.instances[b]["l"] - (e.speed || 1)) || 0;
                                    a._spritely.instances[b]["t"] = a._spritely.getBgY(g).replace("px", "")
                                } else {
                                    a._spritely.instances[b]["l"] = (a._spritely.instances[b]["l"] + (e.speed || 1)) || 0;
                                    a._spritely.instances[b]["t"] = a._spritely.getBgY(g).replace("px", "")
                                }
                            }
                        }
                        var f = a._spritely.instances[b]["l"].toString();
                        if (f.indexOf("%") == -1) {
                            f += "px "
                        } else {
                            f += " "
                        }
                        var d = a._spritely.instances[b]["t"].toString();
                        if (d.indexOf("%") == -1) {
                            d += "px "
                        } else {
                            d += " "
                        }
                        a(g).css("background-position", f + d)
                    }
                }
            }
            a._spritely.instances[b]["options"] = e;
            a._spritely.instances[b]["timeout"] = window.setTimeout(function () {
                a._spritely.animate(e)
            }, parseInt(1000 / e.fps))
        },
        randomIntBetween: function (c, b) {
            return parseInt(rand_no = Math.floor((b - (c - 1)) * Math.random()) + c)
        },
        getBgY: function (b) {
            if (a.browser.msie) {
                var c = a(b).css("background-position-y") || "0"
            } else {
                var c = (a(b).css("background-position") || " ").split(" ")[1]
            }
            return c
        },
        getBgX: function (c) {
            if (a.browser.msie) {
                var b = a(c).css("background-position-x") || "0"
            } else {
                var b = (a(c).css("background-position") || " ").split(" ")[0]
            }
            return b
        },
        get_rel_pos: function (d, b) {
            var c = d;
            if (d < 0) {
                while (c < 0) {
                    c += b
                }
            } else {
                while (c > b) {
                    c -= b
                }
            }
            return c
        }
    };
    a.fn.extend({
        spritely: function (d) {
            var d = a.extend({
                type: "sprite",
                do_once: false,
                width: null,
                height: null,
                fps: 12,
                no_of_frames: 2,
                stop_after: null
            }, d || {});
            var b = a(this).attr("id");
            if (!a._spritely.instances) {
                a._spritely.instances = {}
            }
            if (!a._spritely.instances[b]) {
                if (d.start_at_frame) {
                    a._spritely.instances[b] = {
                        current_frame: d.start_at_frame - 1
                    }
                } else {
                    a._spritely.instances[b] = {
                        current_frame: -1
                    }
                }
            }
            a._spritely.instances[b]["type"] = d.type;
            a._spritely.instances[b]["depth"] = d.depth;
            d.el = this;
            d.width = d.width || a(this).width() || 100;
            d.height = d.height || a(this).height() || 100;
            var c = function () {
                return parseInt(1000 / d.fps)
            };
            if (!d.do_once) {
                window.setTimeout(function () {
                    a._spritely.animate(d)
                }, c(d.fps))
            } else {
                a._spritely.animate(d)
            }
            return this
        },
        sprite: function (b) {
            var b = a.extend({
                type: "sprite",
                bounce: [0, 0, 1000]
            }, b || {});
            return a(this).spritely(b)
        },
        pan: function (b) {
            var b = a.extend({
                type: "pan",
                dir: "left",
                continuous: true,
                speed: 1
            }, b || {});
            return a(this).spritely(b)
        },
        flyToTap: function (b) {
            var b = a.extend({
                el_to_move: null,
                type: "moveToTap",
                ms: 1000,
                do_once: true
            }, b || {});
            if (b.el_to_move) {
                a(b.el_to_move).active()
            }
            if (a._spritely.activeSprite) {
                if (window.Touch) {
                    a(this)[0].ontouchstart = function (g) {
                        var f = a._spritely.activeSprite;
                        var h = g.touches[0];
                        var d = h.pageY - (f.height() / 2);
                        var c = h.pageX - (f.width() / 2);
                        f.animate({
                            top: d + "px",
                            left: c + "px"
                        }, 1000)
                    }
                } else {
                    a(this).click(function (m) {
                        var g = a._spritely.activeSprite;
                        a(g).stop(true);
                        var d = g.width();
                        var k = g.height();
                        var c = m.pageX - (d / 2);
                        var f = m.pageY - (k / 2);
                        g.animate({
                            top: f + "px",
                            left: c + "px"
                        }, 1000)
                    })
                }
            }
            return this
        },
        isDraggable: function (c) {
            if ((!a(this).draggable)) {
                return this
            }
            var c = a.extend({
                type: "isDraggable",
                start: null,
                stop: null,
                drag: null
            }, c || {});
            var b = a(this).attr("id");
            if (!a._spritely.instances[b]) {
                return this
            }
            a._spritely.instances[b].isDraggableOptions = c;
            a(this).draggable({
                start: function () {
                    var d = a(this).attr("id");
                    a._spritely.instances[d].stop_random = true;
                    a(this).stop(true);
                    if (a._spritely.instances[d].isDraggableOptions.start) {
                        a._spritely.instances[d].isDraggableOptions.start(this)
                    }
                },
                drag: c.drag,
                stop: function () {
                    var d = a(this).attr("id");
                    a._spritely.instances[d].stop_random = false;
                    if (a._spritely.instances[d].isDraggableOptions.stop) {
                        a._spritely.instances[d].isDraggableOptions.stop(this)
                    }
                }
            });
            return this
        },
        active: function () {
            a._spritely.activeSprite = this;
            return this
        },
        activeOnClick: function () {
            var b = a(this);
            if (window.Touch) {
                b[0].ontouchstart = function (c) {
                    a._spritely.activeSprite = b
                }
            } else {
                b.click(function (c) {
                    a._spritely.activeSprite = b
                })
            }
            return this
        },
        spRandom: function (d) {
            var d = a.extend({
                top: 50,
                left: 50,
                right: 290,
                bottom: 320,
                speed: 4000,
                pause: 0
            }, d || {});
            var b = a(this).attr("id");
            if (!a._spritely.instances[b]) {
                return this
            }
            if (!a._spritely.instances[b].stop_random) {
                var f = a._spritely.randomIntBetween;
                var e = f(d.top, d.bottom);
                var c = f(d.left, d.right);
                a("#" + b).animate({
                    top: e + "px",
                    left: c + "px"
                }, d.speed)
            }
            window.setTimeout(function () {
                a("#" + b).spRandom(d)
            }, d.speed + d.pause);
            return this
        },
        makeAbsolute: function () {
            return this.each(function () {
                var b = a(this);
                var c = b.position();
                b.css({
                    position: "absolute",
                    marginLeft: 0,
                    marginTop: 0,
                    top: c.top,
                    left: c.left
                }).remove().appendTo("body")
            })
        },
        spSet: function (d, c) {
            var b = a(this).attr("id");
            a._spritely.instances[b][d] = c;
            return this
        },
        spGet: function (d, c) {
            var b = a(this).attr("id");
            return a._spritely.instances[b][d]
        },
        spStop: function (b) {
            a(this).each(function () {
                var c = a(this).attr("id");
                a._spritely.instances[c]["_last_fps"] = a(this).spGet("fps");
                a._spritely.instances[c]["_stopped"] = true;
                a._spritely.instances[c]["_stopped_f1"] = b;
                if (a._spritely.instances[c]["type"] == "sprite") {
                    a(this).spSet("fps", 0)
                }
                if (b) {
                    var d = a._spritely.getBgY(a(this));
                    a(this).css("background-position", "0 " + d)
                }
            });
            return this
        },
        spStart: function () {
            a(this).each(function () {
                var b = a(this).attr("id");
                var c = a._spritely.instances[b]["_last_fps"] || 12;
                a._spritely.instances[b]["_stopped"] = false;
                if (a._spritely.instances[b]["type"] == "sprite") {
                    a(this).spSet("fps", c)
                }
            });
            return this
        },
        spToggle: function () {
            var b = a(this).attr("id");
            var d = a._spritely.instances[b]["_stopped"] || false;
            var c = a._spritely.instances[b]["_stopped_f1"] || false;
            if (d) {
                a(this).spStart()
            } else {
                a(this).spStop(c)
            }
            return this
        },
        fps: function (b) {
            a(this).each(function () {
                a(this).spSet("fps", b)
            });
            return this
        },
        goToFrame: function (c) {
            var b = a(this).attr("id");
            if (a._spritely.instances && a._spritely.instances[b]) {
                a._spritely.instances[b]["current_frame"] = c - 1
            }
            return this
        },
        spSpeed: function (b) {
            a(this).each(function () {
                a(this).spSet("speed", b)
            });
            return this
        },
        spRelSpeed: function (b) {
            a(this).each(function () {
                var c = a(this).spGet("depth") / 100;
                a(this).spSet("speed", b * c)
            });
            return this
        },
        spChangeDir: function (b) {
            a(this).each(function () {
                a(this).spSet("dir", b)
            });
            return this
        },
        spState: function (b) {
            a(this).each(function () {
                var d = ((b - 1) * a(this).height()) + "px";
                var e = a._spritely.getBgX(a(this));
                var c = e + " -" + d;
                a(this).css("background-position", c)
            });
            return this
        },
        lockTo: function (c, b) {
            a(this).each(function () {
                var d = a(this).attr("id");
                if (!a._spritely.instances[d]) {
                    return this
                }
                a._spritely.instances[d]["locked_el"] = a(this);
                a._spritely.instances[d]["lock_to"] = a(c);
                a._spritely.instances[d]["lock_to_options"] = b;
                a._spritely.instances[d]["interval"] = window.setInterval(function () {
                    if (a._spritely.instances[d]["lock_to"]) {
                        var g = a._spritely.instances[d]["locked_el"];
                        var l = a._spritely.instances[d]["lock_to"];
                        var f = a._spritely.instances[d]["lock_to_options"];
                        var o = f.bg_img_width;
                        var k = l.height();
                        var m = a._spritely.getBgY(l);
                        var n = a._spritely.getBgX(l);
                        var h = (parseInt(n) + parseInt(f.left));
                        var e = (parseInt(m) + parseInt(f.top));
                        h = a._spritely.get_rel_pos(h, o);
                        a(g).css({
                            top: e + "px",
                            left: h + "px"
                        })
                    }
                }, b.interval || 20)
            });
            return this
        },
        destroy: function () {
            var c = a(this);
            var b = a(this).attr("id");
            if (a._spritely.instances[b] && a._spritely.instances[b]["timeout"]) {
                window.clearInterval(a._spritely.instances[b]["timeout"])
            }
            if (a._spritely.instances[b] && a._spritely.instances[b]["interval"]) {
                window.clearInterval(a._spritely.instances[b]["interval"])
            }
            delete a._spritely.instances[b];
            return this
        }
    })
})(jQuery);
try {
    document.execCommand("BackgroundImageCache", false, true)
} catch (err) {}(function () {
    var a = false,
        b = /xyz/.test(function () {
            xyz
        }) ? /\b_super\b/ : /.*/;
    this.Class = function () {};
    Class.extend = function (g) {
        var f = this.prototype;
        a = true;
        var e = new this();
        a = false;
        for (var d in g) {
            e[d] = typeof g[d] == "function" && typeof f[d] == "function" && b.test(g[d]) ? (function (h, k) {
                return function () {
                    var m = this._super;
                    this._super = f[h];
                    var l = k.apply(this, arguments);
                    this._super = m;
                    return l
                }
            })(d, g[d]) : g[d]
        }

        function c() {
            if (!a && this.init) {
                this.init.apply(this, arguments)
            }
        }
        c.prototype = e;
        c.prototype.constructor = c;
        c.extend = arguments.callee;
        return c
    }
})();

function trackClient(c) {
    if (!c) {
        return false
    }
    var f = "http://bi.redatoms.com/logger/log";
    var r = {};
    var n = null;
    this.trackEvent = function () {
        if (arguments.length < 5) {
            return false
        }
        var z = "";
        var x = false;
        var v = 0;
        for (var w = 0, u = 5; w < u; w++) {
            var y = arguments[w] == null ? "" : arguments[w].toString();
            al = y.replace(":", "_");
            z += z == "" ? "" : ":";
            z += y
        }
        if (arguments.length > 5) {
            x = arguments[5]
        }
        if (arguments.length > 6) {
            v = arguments[6]
        }
        this.sendData("_cs=" + z, x, v)
    };
    this.setChannel = function (u) {
        r.channel = u
    };
    this.setVersion = function (u) {
        r.bv = u
    };
    this.setRuid = function (u) {
        a(u)
    };
    this.onEvent = function (x, w, y, v, u) {
        this.trackEvent(" ", x, w, 1, y, v, u)
    };
    this.onBuy = function (x, v, y, w, u) {
        this.trackEvent("_bi_", x, "buy", v, y, w, u)
    };
    this.onSell = function (x, v, y, w, u) {
        this.trackEvent("_bi_", x, "sell", v, y, w, u)
    };
    this.sendData = function (v, x, u) {
        s();
        var y = "";
        for (var w in r) {
            y += "&" + w + "=" + r[w]
        }
        if (v) {
            y += "&" + v
        }
        h(f, y, x, u)
    };
    var b = window.navigator;
    var o = p("msc_uuid");
    var e = p("msc_sid");
    if (o == null) {
        var q = (new Date()).getTime();
        var l = new Date(q + 2 * 365 * 24 * 3600 * 1000);
        o = q + "" + Math.round(Math.random() * 10000);
        m("msc_uuid", o, l, "/")
    }
    if (e == null) {
        var q = (new Date()).getTime();
        e = q + "" + Math.round(Math.random() * 10000);
        m("msc_sid", e)
    }
    r = {
        uuid: o,
        appkey: c,
        channel: "html",
        sa: b.systemLanguage || b.language,
        sl: b.userLanguage || b.language,
        imei: o,
        sid: e
    };
    r.sr = window.screen.width + "x" + window.screen.height;
    r.sdkt = "html";
    r.sdkv = "1.1";
    r.bf = document.referrer;
    r.bp = window.location.href;
    var t = b.userAgent.toLowerCase();
    var d = /(msie|firefox|opera|chrome|netscape|safari|ucweb|360se|metasr)/;
    d.test(t);
    r.appname = RegExp.$1;
    var g = b.platform.toLowerCase();
    var k = "";
    if (g.indexOf("linux") > -1) {
        k = "Linux"
    } else {
        if (g.indexOf("mac") > -1) {
            k = "Mac"
        } else {
            if (g.indexOf("x11") > -1) {
                k = "Unix"
            } else {
                if (g.indexOf("win") > -1) {
                    if (t.indexOf("windows nt 5.0") > -1 || t.indexOf("windows 2000") > -1) {
                        k = "Windows2000"
                    }
                    if (t.indexOf("windows nt 5.1") > -1 || t.indexOf("windows xp") > -1) {
                        k = "WindowsXP"
                    }
                    if (t.indexOf("windows nt 5.2") > -1 || t.indexOf("windows 2003") > -1) {
                        k = "Windows2003"
                    }
                    if (t.indexOf("windows nt 6.0") > -1 || t.indexOf("windows vista") > -1) {
                        k = "WindowsVista"
                    }
                    if (t.indexOf("windows nt 6.1") > -1 || t.indexOf("windows 7") > -1) {
                        k = "Windows7"
                    }
                } else {
                    if (t.indexOf("iphone os") > -1) {
                        k = "ios"
                    } else {
                        if (t.indexOf("android") > -1) {
                            k = "Android"
                        } else {
                            if (t.indexOf("windows ce") > -1) {
                                k = "Windows ce"
                            } else {
                                if (t.indexOf("ipad") > -1) {
                                    k = "ipad"
                                } else {
                                    if (t.indexOf("windows mobile") > -1) {
                                        k = "Windows Mobile"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    r.sos = k;

    function s() {
        var u = p("msc_sno");
        var v = p("msc_uid");
        if (u == null) {
            u = 0
        }
        m("msc_sno", ++u);
        r.sh = u + "." + e + ".0.0";
        if (v != null) {
            r.ruid = v
        }
    }

    function a(w) {
        var u = p("msc_uid");
        if (u == null) {
            u = w
        } else {
            if (u != w) {
                var v = (new Date()).getTime();
                e = v + "" + Math.round(Math.random() * 10000);
                r.sid = e;
                m("msc_sid", e);
                m("msc_sno", 0)
            }
        }
        m("msc_uid", w)
    }

    function p(v) {
        var u = document.cookie.match((new RegExp(v + "=[a-zA-Z0-9.()=|%/]+($|;)", "g")));
        if (!u || !u[0]) {
            return null
        } else {
            return unescape(u[0].substring(v.length + 1, u[0].length).replace(";", "")) || null
        }
    }

    function m(w, y) {
        var u = arguments;
        var B = u.length;
        var v = (B > 2) ? u[2] : null;
        var A = (B > 3) ? u[3] : null;
        var x = (B > 4) ? u[4] : null;
        var z = (B > 5) ? u[5] : false;
        document.cookie = w + "=" + escape(y) + ((v == null) ? "" : ("; expires=" + v.toUTCString())) + ((A == null) ? "" : ("; path=" + A)) + ((x == null) ? "" : ("; domain=" + x)) + ((z == true) ? "; secure" : "")
    }

    function h(y, v, x, u) {
        try {
            var w = null;
            if (v) {
                y += "?" + v
            }
            if (window.XMLHttpRequest) {
                w = new XMLHttpRequest()
            } else {
                if (window.ActiveXObject) {
                    w = new ActiveXObject("Microsoft.XMLHTTP")
                } else {
                    alert("³õÊŒ»¯ŽíÎó£¡");
                    return false
                }
            } if (x && u && u > 0) {
                n = window.setTimeout(function () {
                    w.abort()
                }, u)
            }
            if (x) {
                w.open("get", encodeURI(encodeURI(y)), true)
            } else {
                w.open("get", encodeURI(encodeURI(y)), false)
            }
            w.onreadystatechange = function (A, B) {
                if (n) {
                    clearTimeout(n)
                }
                if (!x) {
                    w.abort()
                }
            };
            w.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
            w.send(null)
        } catch (z) {}
    }
}(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.Object = Class.extend({
        getR: function (d) {
            var e = Mojo.gap.device || "";
            return a.Mojo.ui.R(e, this.clsname(), d)
        },
        getL: function (f, e, d) {
            return Mojo.utils.locale(f, e, d)
        },
        init: function (f, e) {
            this._id = f;
            this._options = this._getDefaultOptions();
            b.extend(true, this._options, e || {});
            if (this._id == c || this._id == null) {
                this._element = b("<div></div>")
            } else {
                this._element = b('<div id="' + this._id + '"></div>')
            }
            this._children = [];
            this._parent = null;
            var d = this;
            if (this._options.classes != c) {
                b.each(this._options.classes, function (g, h) {
                    d.element().addClass(h)
                })
            }
            if (this._options.deviceaware) {
                d.element().addClass(Mojo.gap.device)
            }
        },
        _getDefaultOptions: function () {
            return {
                classes: [],
                deviceaware: true
            }
        },
        id: function () {
            return this._id
        },
        element: function () {
            return this._element
        },
        data: function (d, e) {
            if (e == c) {
                return this.element().data(d)
            }
            this.element().data(d, e)
        },
        show: function () {
            this.element().show()
        },
        hide: function () {
            this.element().hide()
        },
        clsname: function () {
            return "Object"
        },
        localeCat: function () {
            return ""
        },
        locale: function (d, e) {
            return Mojo.utils.locale(this.localeCat(), d, e)
        },
        rebinding: function () {
            this.element().unbind("touchend");
            this.element().bind("touchend", function () {})
        },
        resize: function (d) {
            if (d == c) {
                return
            }
            if (d.width != c) {
                this.element().width(d.width)
            }
            if (d.height != c) {
                this.element().height(d.height)
            }
            this._onResize(d)
        },
        _onResize: function (d) {}
    });
    a.Mojo.supportTouch = function () {
        if (a.Mojo._supportTouch == c) {
            a.Mojo._supportTouch = "ontouchstart" in a
        }
        return a.Mojo._supportTouch
    };
    if (!a.console) {
        a.console = {};
        a.console.log = function () {
            return
        }
    }
})(window, jQuery);
(function (a, b) {
    a.Mojo = a.Mojo || {};
    a.Mojo.ui = a.Mojo.ui || {};
    a.Mojo.ui.R = function (g, h, e) {
        if (a.Mojo.ui.Resource[g]) {
            if (a.Mojo.ui.Resource[g][h]) {
                var f = a.Mojo.ui.Resource[g][h][e];
                return f
            }
        }
    };
    a.Mojo.ui.Resource = {
        ipad: {
            "com.BaseSlotList": {
                unitWidth: 140
            },
            "com.Collection": {
                offsets: [{
                    x: 198,
                    y: -54
                }, {
                    x: 0,
                    y: 75
                }, {
                    x: 400,
                    y: 75
                }, {
                    x: 0,
                    y: 290
                }, {
                    x: 400,
                    y: 290
                }, {
                    x: 198,
                    y: 425
                }, ]
            },
            "com.CollectList": {
                unitWidth: 140
            },
            "com.EntityElement": {
                unitWidth: 22
            },
            "com.FbTaskList": {
                unitWidth: 157
            },
            "com.IllustrationList": {
                unitWidth: 157,
                height: 742,
                pageSize: 30
            },
            "com.IllustrationPanel": {
                pageSize: 20
            },
            "com.GiftCard": {
                playsize: 160
            },
            "com.MapElement": {
                left: 1.1,
                top: 1.4
            },
            "com.Marquee": {
                width: 600,
                height: 100
            },
            "com.TaskList": {
                unitWidth: 155,
            },
            "page.Intensify": {
                viewHeight: 60
            },
            "com.Slot": {
                imgHeight: "480",
                spriteHeight: "120",
                "background-position": "0 -5px",
                range: "",
                bgPos: "",
                targetPos: ""
            },
            "com.Tutorial": {
                home_left: 64,
                mission_left: 192,
                rob_left: 320,
                battle_left: 448,
                friend_left: 576,
                mall_left: 704,
                arrowwidth: 104,
                arrowheight: 150
            },
            "com.CardElement": {
                unitWidth: 22
            },
            "page.Server": {
                height1: 43,
                height2: 220,
                "margin-top": "100px"
            },
            "com.BattleDetailDialog": {
                height: 450
            },
            "com.FbBattleDetailDialog": {
                height: 450
            },
            "com.RankPlayerPage": {
                unitWidth: 97
            },
            "page.Home": {
                unitWidth: 128
            }
        },
        iphone: {
            "com.BaseSlotList": {
                unitWidth: 62
            },
            "com.Collection": {
                treasurePos: {
                    x: 115,
                    y: 159
                },
                offsets: [{
                    x: 102,
                    y: -23
                }, {
                    x: 0,
                    y: 35
                }, {
                    x: 200,
                    y: 35
                }, {
                    x: 0,
                    y: 145
                }, {
                    x: 200,
                    y: 145
                }, {
                    x: 102,
                    y: 200
                }, ]
            },
            "com.CollectList": {
                unitWidth: 62
            },
            "com.EntityElement": {
                unitWidth: 15
            },
            "com.FbTaskList": {
                unitWidth: 97
            },
            "com.IllustrationList": {
                unitWidth: 102,
                height: 345,
                pageSize: 20
            },
            "com.IllustrationPanel": {
                pageSize: 36
            },
            "com.GiftCard": {
                playsize: 80
            },
            "com.MapElement": {
                left: 1,
                top: 1
            },
            "com.Marquee": {
                width: 320,
                height: 60
            },
            "com.TaskList": {
                unitWidth: 97,
            },
            "page.Intensify": {
                viewHeight: 46
            },
            "com.Slot": {
                imgHeight: 240,
                spriteHeight: 60,
                "background-position": "5px -7px",
                range: "",
                bgPos: "",
                targetPos: ""
            },
            "com.Tutorial": {
                home_left: 26.5,
                mission_left: 79.5,
                rob_left: 132.5,
                battle_left: 185.5,
                friend_left: 238.5,
                mall_left: 291.5,
                arrowwidth: 52,
                arrowheight: 75
            },
            "com.CardElement": {
                unitWidth: 15
            },
            "page.Server": {
                height1: 43,
                height2: 220,
                "margin-top": "100px"
            },
            "com.BattleDetailDialog": {
                height: 200
            },
            "com.FbBattleDetailDialog": {
                height: 200
            },
            "com.RankPlayerPage": {
                unitWidth: 97
            },
            "page.Home": {
                unitWidth: 53
            }
        }
    }
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.ui = a.Mojo.ui || {};
    a.Mojo.ui.Button = Mojo.Object.extend({
        init: function (k, e) {
            this._super(k, e);
            var d = this;
            this.element().addClass("mojo-ui-button");
            if (d._options.special != null) {
                d.element().addClass(d._options.special)
            }
            if (this._options.icon) {
                this.element().append('<div class="icon"></div>')
            }
            if (this._options.textWrap) {
                this.element().append('<div class="text">' + this._options.text + "</div>")
            } else {
                this.element().append(this._options.text)
            }
            var g = function (l) {
                if (!d._options.disabled) {
                    d.element().addClass("mojo-ui-button-down");
                    if (d._options.special != null) {
                        d.element().addClass(d._options.special + "-down")
                    }
                    if (d._options.sound == c || d._options.sound == null) {
                        Mojo.gap.soundPlay("12_action_do")
                    } else {
                        Mojo.gap.soundPlay(d._options.sound)
                    }
                }
            };
            var f = function (l) {
                if (!d._options.disabled) {
                    d.element().removeClass("mojo-ui-button-down");
                    if (d._options.special != null) {
                        d.element().removeClass(d._options.special + "-down")
                    }
                }
            };
            var h = function (l) {
                if (!d._options.disabled) {
                    d.element().removeClass("mojo-ui-button-down");
                    if (d._options.special != null) {
                        d.element().removeClass(d._options.special + "-down")
                    }
                }
            };
            if (Mojo.supportTouch()) {
                this.element().bind("touchstart", g);
                this.element().bind("touchmove", f);
                this.element().bind("touchend", h)
            } else {
                this.element().bind("mousedown", g);
                this.element().bind("mousemove", f);
                this.element().bind("mouseup", h)
            }
            this._bindClick();
            this.disable(this._options.disabled)
        },
        _bindClick: function () {
            var d = this;
            this.element().unbind("click");
            this.element().click(function (f) {
                if (d._options.disabled) {
                    d._options.disableClick(d, f)
                } else {
                    d._options.click(d, f)
                }
            })
        },
        _getDefaultOptions: function () {
            return {
                text: "Button",
                click: $.noop,
                disableClick: $.noop,
                disabled: false,
                icon: false,
                textWrap: false,
                sound: null,
                special: null,
            }
        },
        disable: function (d) {
            this._options.disabled = d;
            this._element[d ? "addClass" : "removeClass"]("mojo-ui-button-disabled");
            if (this._options.special != null) {
                this._element[d ? "addClass" : "removeClass"](this._options.special + "-disabled")
            }
        },
        text: function (d) {
            if (d == c) {
                return this._options.text
            }
            this._options.text = d;
            if (this._options.textWrap) {
                this.element().find(".text").html(d)
            } else {
                this.element().html(d)
            }
        },
        click: function (e) {
            var d = this;
            this._options.click = e;
            this._bindClick()
        },
        setFlag: function (d) {
            if (d != c && d != null) {
                var f = "";
                var e = null;
                if (typeof (d) == "string") {
                    f = d
                } else {
                    if (typeof (d) == "object") {
                        f = d.text;
                        e = d.classes
                    }
                }
                $('<div class="flag"></div>').addClass(d.classes.join(" ")).html(f).appendTo(this.element())
            }
        },
        clsname: function () {
            return "ui.Button"
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.ui = a.Mojo.ui || {};
    a.Mojo.ui.Label = Mojo.Object.extend({
        init: function (f, e) {
            this._super(f, e);
            var d = this;
            this.element().addClass("mojo-ui-label");
            this.element().append('<div class="icon"></div><div class="text"><span>' + this._options.text + "</span></div>")
        },
        _getDefaultOptions: function () {
            return {
                text: "Label",
            }
        },
        text: function (d) {
            if (d == c) {
                return this._options.text
            }
            this._options.text = d;
            this.element().find(".text > span").html(d)
        },
        clsname: function () {
            return "ui.Label"
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.ui = a.Mojo.ui || {};
    a.Mojo.ui.Progress = Mojo.Object.extend({
        init: function (f, e) {
            this._super(f, e);
            var d = this;
            this.element().addClass("mojo-ui-progress");
            this.element().append('<div class="icon"></div><div class="bar"><span></span></div>');
            this._refresh()
        },
        _getDefaultOptions: function () {
            return {
                max: 100,
                min: 0,
                value: 0,
                labelTemplate: "#{percent}",
            }
        },
        _percentage: function () {
            var d = Math.round(100 * this._options.value / (this._options.max - this._options.min));
            if (d > 100) {
                d = 100
            }
            if (d < 0) {
                d = 0
            }
            return d
        },
        _refresh: function () {
            var e = this._percentage() + "%";
            var f = this._options.value + "/" + (this._options.max - this._options.min);
            this.element().find(".bar").css("width", e);
            var d = this._options.labelTemplate.replace(/#\{percent\}/g, e).replace(/#\{divide\}/g, f);
            this.element().find(".bar > span").html(d)
        },
        value: function (d) {
            if (d == c) {
                return this._options.value
            }
            if (typeof (d) == "object") {
                $.extend(true, this._options, d)
            } else {
                this._options.value = d
            }
            this._refresh()
        },
        clsname: function () {
            return "ui.Progress"
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.ui = a.Mojo.ui || {};
    a.Mojo.ui.Radio = Mojo.Object.extend({
        init: function (f, e) {
            this._super(f, e);
            var d = this;
            this.element().addClass("mojo-ui-radio");
            this.element().append("<ul></ul>");
            $.each(this._options.options, function (h, k) {
                var g = $("<li>" + k + "</li>");
                d.element().find("ul").append(g);
                g.click(function () {
                    d._optClick($(this).index())
                })
            });
            this._refresh()
        },
        _getDefaultOptions: function () {
            return {
                options: [],
                selected: 0,
                selectionChange: $.noop,
                disableClick: $.noop,
            }
        },
        _refresh: function () {
            this.element().find("li").removeClass("mojo-ui-radio-selected").eq(this._options.selected).addClass("mojo-ui-radio-selected")
        },
        _optClick: function (e) {
            var d = this;
            if (d.disable(e)) {
                d._options.disableClick(e);
                return
            }
            if (d._options.selected != e) {
                d._options.selected = e;
                d._refresh();
                d._options.selectionChange(e)
            }
        },
        addOption: function (f) {
            var d = this;
            if (f != c && f != null) {
                this._options.options.push(f);
                var e = $("<li>" + f + "</li>");
                d.element().find("ul").append(e);
                e.click(function () {
                    d._optClick($(this).index())
                })
            }
        },
        remove: function (d) {
            this.element().find("ul > li").eq(d).remove()
        },
        removeAll: function () {
            this.element().find("ul").empty()
        },
        selection: function (d) {
            if (d == c) {
                return this._options.selected
            }
            this._options.selected = d;
            this._refresh()
        },
        disable: function (d, e) {
            if (e == c) {
                return this.element().find("li").eq(d).hasClass("mojo-ui-radio-disabled")
            }
            this.element().find("li").eq(d)[e ? "addClass" : "removeClass"]("mojo-ui-radio-disabled")
        },
        clsname: function () {
            return "ui.Radio"
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.ui = a.Mojo.ui || {};
    a.Mojo.ui.Image = Mojo.Object.extend({
        init: function (f, e) {
            this._super(f, e);
            var d = this;
            this.element().addClass("mojo-ui-image");
            this.element().append("<img>");
            this._refresh()
        },
        _getDefaultOptions: function () {
            return {
                src: "",
                width: -1,
                height: -1,
            }
        },
        _refresh: function () {
            this.element().find("img").attr("src", this._options.src);
            if (this._options.width > -1) {
                this.element().find("img").attr("width", this._options.width)
            }
            if (this._options.height > -1) {
                this.element().find("img").attr("height", this._options.height)
            }
        },
        src: function (d) {
            if (text == c) {
                return this._options.src
            }
            this._options.src = d;
            this._refresh()
        },
        clsname: function () {
            return "ui.Image"
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.ui = a.Mojo.ui || {};
    a.Mojo.ui.ListPanel = a.Mojo.Object.extend({
        init: function (f, e) {
            this._super(f, e);
            this.element().addClass("mojo-ui-listpanel");
            this._children = [];
            this._hasLoaded = false;
            var d = this;
            this._header = b('<div class="header"></div>').appendTo(this.element());
            this._list = b('<div class="list"></div>');
            if (this._options.scrollable) {
                this._scroll = new Mojo.ui.Scroll(c, this._list, {
                    direction: 2
                });
                this.element().append(this._scroll.element())
            } else {
                this.element().append(this._list)
            }
            this._footer = b('<div class="footer"></div>').appendTo(this.element());
            this._more = new Mojo.ui.Button(c, {
                text: this._options.moreLabel,
                classes: ["more"],
                click: function (g, h) {
                    if (d._options.moreClick instanceof Function) {
                        d._options.moreClick(d)
                    } else {
                        if (d._options.refreshable == true) {
                            d._list.find(".mojo-ui-listpanel-child").remove();
                            d._children = [];
                            d._more.element().hide()
                        }
                        d._load()
                    }
                }
            });
            if (this._options.showMore) {
                this._more.element().appendTo(this._list);
                if (this._options.alwaysMore == true) {
                    this._more.element().show()
                }
            }
            this._load()
        },
        _load: function (d) {
            this._showWait();
            this._options.loadFunc(this._children.length, this._options.pageSize, d, this)
        },
        _getDefaultOptions: function () {
            return {
                pageSize: 10,
                showMore: true,
                alwaysMore: false,
                moreLabel: "More",
                moreClick: c,
                refreshable: false,
                drawFunc: b.noop,
                loadFunc: b.noop,
                scrollable: false,
                emptyLabel: null,
                onLoaded: c,
                direction: 2,
            }
        },
        _showWait: function () {
            this._more.disable(true);
            if (this._options.showMore === true) {
                b('<div class="waiting"></div>').insertBefore(this._more.element())
            } else {
                this._list.append('<div class="waiting"></div>')
            }
        },
        _hideWait: function () {
            this._list.find(".waiting").remove();
            this._more.disable(false)
        },
        _addChild: function (d) {
            if (d != c && d != null) {
                if (this._options.showMore === true) {
                    d.element().addClass("mojo-ui-listpanel-child").insertBefore(this._more.element())
                } else {
                    this._list.append(d.element().addClass("mojo-ui-listpanel-child"))
                }
                this._children.push(d)
            }
        },
        appendData: function (e, f) {
            if (this._options.refreshable == true) {
                this.initial()
            }
            var d = this;
            d._hideWait();
            if (e != c && e != null) {
                if (Array.isArray(e)) {
                    b.each(e, function (g, h) {
                        d._addChild(d._options.drawFunc(h))
                    });
                    if (d._options.alwaysMore == false && (e.length < d._options.pageSize || f === false)) {
                        d._more.element().hide()
                    }
                } else {
                    d._addChild(d._options.drawFunc(e));
                    if (d._options.alwaysMore == false && f === false) {
                        d._more.element().hide()
                    }
                } if (this._hasLoaded === false && this._options.onLoaded instanceof Function) {
                    this._options.onLoaded(this)
                }
                this._hasLoaded = true
            }
            this._list.find(".empty").remove();
            if (this._children.length == 0 && this._options.emptyLabel != null) {
                if (this._options.showMore) {
                    this._more.element().before('<div class="empty">' + this._options.emptyLabel + "</div>")
                } else {
                    this._list.append('<div class="empty">' + this._options.emptyLabel + "</div>")
                }
                this._more.element().hide()
            } else {
                if (this._options.alwaysMore == true && this._children.length > 0) {
                    this._more.element().show()
                }
            }
            this.rebinding();
            this.resize()
        },
        remove: function (d) {
            this._list.children().eq(d).remove()
        },
        removeAll: function () {
            this._hasLoaded = false;
            this._list.empty()
        },
        clsname: function () {
            return "ui.ListPanel"
        },
        child: function (d) {
            return this._children[d]
        },
        children: function () {
            return this._children
        },
        resize: function () {
            if (this._options.scrollable && this._options.direction != 1) {
                var k = this.element().offset().top;
                var g = k + this._header.outerHeight(true);
                var f = this._footer.outerHeight(true);
                var e = this.element().height() - this._header.outerHeight(true) - this._footer.outerHeight(true);
                var d = this.element().width();
                this._scroll._window.css({
                    top: g + "px",
                    bottom: f + "px",
                    height: e + "px",
                    width: d + "px"
                })
            }
            if (this._options.scrollable) {
                this._scroll.refresh()
            }
        },
        initial: function () {
            if (this._options.scrollable) {
                this._scroll.initial()
            }
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.ui = a.Mojo.ui || {};
    a.Mojo.ui.Overlay = Mojo.Object.extend({
        init: function (f, e) {
            this._super(f, e);
            var d = this;
            this.element().addClass("mojo-ui-overlay");
            if (this._options.reusable) {
                this.element().appendTo($(document.body))
            } else {}
            this.element().bind((Mojo.supportTouch ? "touchmove" : "mousemove"), function (g) {
                g.preventDefault()
            })
        },
        _getDefaultOptions: function () {
            return {
                zIndex: 1000,
                opacity: 0.5,
                reusable: false,
            }
        },
        show: function () {
            this.element().css({
                width: $(document).width() + "px",
                height: $(document).height() + "px",
                zIndex: this._options.zIndex,
                opacity: this._options.opacity,
            }).show();
            if (this._options.reusable) {} else {
                this.element().appendTo($(document.body))
            }
        },
        hide: function () {
            if (this._options.reusable) {
                this.element().hide()
            } else {
                this.element().remove()
            }
        },
        clsname: function () {
            return "ui.Overlay"
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.ui = a.Mojo.ui || {};
    a.Mojo.ui.Dialog = Mojo.Object.extend({
        init: function (f, e) {
            this._super(f, e);
            this._nextDialog = c;
            var d = this;
            this.element().addClass("mojo-ui-dialog");
            if (this._options.noTitle == false) {
                this.element().append(this._title = $('<div class="title"></div>'));
                this.element().append(new Mojo.ui.Button(c, {
                    special: "button-close",
                    text: "",
                    click: function () {
                        d.close()
                    },
                }).element())
            }
            this.element().append(this._content = $('<div class="content"></div>')).append(this._footer = $('<div class="footer"></div>'));
            if (this._options.noTitle == false) {
                if (this._options.title != c && this._options.title != null) {
                    this.element().find(".title").append(this._options.title).click(function () {
                        d.close()
                    })
                }
            }
            if (this._options.content != c && this._options.content != null) {
                this.element().find(".content").append(this._options.content)
            }
            if (this._options.reusable) {
                this.element().appendTo($(document.body));
                this.rebinding()
            } else {}
            this.element().bind((Mojo.supportTouch ? "touchmove" : "mousemove"), function (g) {
                g.preventDefault()
            })
        },
        _getDefaultOptions: function () {
            return {
                title: "Dialog",
                content: null,
                close: $.noop,
                zIndex: 1001,
                reusable: false,
                noTitle: false,
                noOverlay: false,
            }
        },
        open: function (d) {
            if (Mojo.app.dialog === c || d === true) {
                if (d != true) {
                    Mojo.app.dialog = this
                }
                if (this._options.noOverlay == false) {
                    this._overlayShow()
                }
                this.element().show().css("z-index", this._options.zIndex + 1);
                if (this._options.reusable) {} else {
                    this.element().appendTo($(document.body));
                    this.rebinding();
                    if (this._onDialogAppend) {
                        this._onDialogAppend()
                    }
                }
                Mojo.utils.center(this.element())
            } else {
                Mojo.app.dialog.openNext(this)
            }
        },
        openNext: function (d) {
            if (this._nextDialog === c) {
                this._nextDialog = d
            } else {
                this._nextDialog.openNext(d)
            }
        },
        close: function () {
            this._options.close();
            if (this._options.reusable) {
                this.element().hide()
            } else {
                this.element().remove()
            } if (this._options.noOverlay == false) {
                this._overlayHide()
            }
            Mojo.app.dialog = c;
            if (this._nextDialog != c && this._nextDialog != null) {
                this._nextDialog.open()
            }
        },
        show: function () {
            this.element().show();
            if (this.overlay !== c) {
                this.overlay.show()
            }
        },
        hide: function () {
            this.element().hide();
            if (this.overlay !== c) {
                this.overlay.hide()
            }
        },
        _overlayShow: function () {
            if (this.overlay === c) {
                this.overlay = new Mojo.ui.Overlay(c, {
                    zIndex: this._options.zIndex,
                    reusable: this._options.reusable,
                })
            }
            this.overlay.show()
        },
        _overlayHide: function () {
            if (this.overlay != c) {
                this.overlay.hide()
            }
        },
        clsname: function () {
            return "ui.Dialog"
        }
    })
})(window, jQuery);
/*!
 * iScroll Lite base on iScroll v4.1.6 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function () {
    var s = Math,
        d = function (m) {
            return m >> 0
        }, w = (/webkit/i).test(navigator.appVersion) ? "webkit" : (/firefox/i).test(navigator.userAgent) ? "Moz" : "opera" in window ? "O" : "",
        x = (/android/gi).test(navigator.appVersion),
        k = (/iphone|ipad/gi).test(navigator.appVersion),
        c = (/playbook/gi).test(navigator.appVersion),
        p = (/hp-tablet/gi).test(navigator.appVersion),
        n = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix(),
        v = "ontouchstart" in window && !p,
        f = w + "Transform" in document.documentElement.style,
        g = k || c,
        q = (function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (m) {
                return setTimeout(m, 17)
            }
        })(),
        o = (function () {
            return window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
        })(),
        h = "onorientationchange" in window ? "orientationchange" : "resize",
        b = v ? "touchstart" : "mousedown",
        r = v ? "touchmove" : "mousemove",
        e = v ? "touchend" : "mouseup",
        u = v ? "touchcancel" : "mouseup",
        a = "translate" + (n ? "3d(" : "("),
        l = n ? ",0)" : ")",
        t = function (z, m) {
            var A = this,
                B = document,
                y;
            A.wrapper = z.get(0);
            A.wrapper.style.overflow = "hidden";
            A.scroller = A.wrapper.children[0];
            A.options = {
                hScroll: true,
                vScroll: true,
                x: 0,
                y: 0,
                bounce: true,
                bounceLock: false,
                momentum: true,
                lockDirection: true,
                useTransform: false,
                useTransition: false,
                onRefresh: null,
                onBeforeScrollStart: function (C) {
                    C.preventDefault()
                },
                onScrollStart: null,
                onBeforeScrollMove: null,
                onScrollMove: null,
                onBeforeScrollEnd: null,
                onScrollEnd: null,
                onTouchEnd: null,
                onDestroy: null
            };
            for (y in m) {
                A.options[y] = m[y]
            }
            A.x = A.options.x;
            A.y = A.options.y;
            A.options.useTransform = f ? A.options.useTransform : false;
            A.options.hScrollbar = A.options.hScroll && A.options.hScrollbar;
            A.options.vScrollbar = A.options.vScroll && A.options.vScrollbar;
            A.options.useTransition = g && A.options.useTransition;
            A.scroller.style[w + "TransitionProperty"] = A.options.useTransform ? "-" + w.toLowerCase() + "-transform" : "top left";
            A.scroller.style[w + "TransitionDuration"] = "0";
            A.scroller.style[w + "TransformOrigin"] = "0 0";
            if (A.options.useTransition) {
                A.scroller.style[w + "TransitionTimingFunction"] = "cubic-bezier(0.33,0.66,0.66,1)"
            }
            if (A.options.useTransform) {
                A.scroller.style[w + "Transform"] = a + A.x + "px," + A.y + "px" + l
            } else {
                A.scroller.style.cssText += ";position:absolute;top:" + A.y + "px;left:" + A.x + "px"
            }
            A.refresh();
            A._bind(h, window);
            A._bind(b);
            if (!v) {
                A._bind("mouseout", A.wrapper)
            }
        };
    t.prototype = {
        enabled: true,
        x: 0,
        y: 0,
        steps: [],
        scale: 1,
        handleEvent: function (y) {
            var m = this;
            switch (y.type) {
            case b:
                if (!v && y.button !== 0) {
                    return
                }
                m._start(y);
                break;
            case r:
                m._move(y);
                break;
            case e:
            case u:
                m._end(y);
                break;
            case h:
                m._resize();
                break;
            case "mouseout":
                m._mouseout(y);
                break;
            case "webkitTransitionEnd":
                m._transitionEnd(y);
                break
            }
        },
        _resize: function () {
            this.refresh()
        },
        _pos: function (m, z) {
            m = this.hScroll ? m : 0;
            z = this.vScroll ? z : 0;
            if (this.options.useTransform) {
                this.scroller.style[w + "Transform"] = a + m + "px," + z + "px" + l + " scale(" + this.scale + ")"
            } else {
                m = d(m);
                z = d(z);
                this.scroller.style.left = m + "px";
                this.scroller.style.top = z + "px"
            }
            this.x = m;
            this.y = z
        },
        _start: function (C) {
            var B = this,
                z = v ? C.touches[0] : C,
                A, m, D;
            if (!B.enabled) {
                return
            }
            if (B.options.onBeforeScrollStart) {
                B.options.onBeforeScrollStart.call(B, C)
            }
            if (B.options.useTransition) {
                B._transitionTime(0)
            }
            B.moved = false;
            B.animating = false;
            B.zoomed = false;
            B.distX = 0;
            B.distY = 0;
            B.absDistX = 0;
            B.absDistY = 0;
            B.dirX = 0;
            B.dirY = 0;
            if (B.options.momentum) {
                if (B.options.useTransform) {
                    A = getComputedStyle(B.scroller, null)[w + "Transform"].replace(/[^0-9-.,]/g, "").split(",");
                    m = A[4] * 1;
                    D = A[5] * 1
                } else {
                    m = getComputedStyle(B.scroller, null).left.replace(/[^0-9-]/g, "") * 1;
                    D = getComputedStyle(B.scroller, null).top.replace(/[^0-9-]/g, "") * 1
                } if (m != B.x || D != B.y) {
                    if (B.options.useTransition) {
                        B._unbind("webkitTransitionEnd")
                    } else {
                        o(B.aniTime)
                    }
                    B.steps = [];
                    B._pos(m, D)
                }
            }
            B.startX = B.x;
            B.startY = B.y;
            B.pointX = z.pageX;
            B.pointY = z.pageY;
            B.startTime = C.timeStamp || Date.now();
            if (B.options.onScrollStart) {
                B.options.onScrollStart.call(B, C)
            }
            B._bind(r);
            B._bind(e);
            B._bind(u)
        },
        _move: function (D) {
            var A = this,
                y = v ? D.touches[0] : D,
                z = y.pageX - A.pointX,
                m = y.pageY - A.pointY,
                E = A.x + z,
                C = A.y + m,
                B = D.timeStamp || Date.now();
            if (A.options.onBeforeScrollMove) {
                A.options.onBeforeScrollMove.call(A, D)
            }
            A.pointX = y.pageX;
            A.pointY = y.pageY;
            if (E > 0 || E < A.maxScrollX) {
                E = A.options.bounce ? A.x + (z / 2) : E >= 0 || A.maxScrollX >= 0 ? 0 : A.maxScrollX
            }
            if (C > 0 || C < A.maxScrollY) {
                C = A.options.bounce ? A.y + (m / 2) : C >= 0 || A.maxScrollY >= 0 ? 0 : A.maxScrollY
            }
            A.distX += z;
            A.distY += m;
            A.absDistX = s.abs(A.distX);
            A.absDistY = s.abs(A.distY);
            if (A.absDistX < 6 && A.absDistY < 6) {
                return
            }
            if (A.options.lockDirection) {
                if (A.absDistX > A.absDistY + 5) {
                    C = A.y;
                    m = 0
                } else {
                    if (A.absDistY > A.absDistX + 5) {
                        E = A.x;
                        z = 0
                    }
                }
            }
            A.moved = true;
            A._pos(E, C);
            A.dirX = z > 0 ? -1 : z < 0 ? 1 : 0;
            A.dirY = m > 0 ? -1 : m < 0 ? 1 : 0;
            if (B - A.startTime > 300) {
                A.startTime = B;
                A.startX = A.x;
                A.startY = A.y
            }
            if (A.options.onScrollMove) {
                A.options.onScrollMove.call(A, D)
            }
        },
        _end: function (D) {
            if (v && D.touches.length != 0) {
                return
            }
            var B = this,
                H = v ? D.changedTouches[0] : D,
                E, G, z = {
                    dist: 0,
                    time: 0
                }, m = {
                    dist: 0,
                    time: 0
                }, A = (D.timeStamp || Date.now()) - B.startTime,
                F = B.x,
                C = B.y,
                y;
            B._unbind(r);
            B._unbind(e);
            B._unbind(u);
            if (B.options.onBeforeScrollEnd) {
                B.options.onBeforeScrollEnd.call(B, D)
            }
            if (!B.moved) {
                if (v) {
                    E = H.target;
                    while (E.nodeType != 1) {
                        E = E.parentNode
                    }
                    if (E.tagName != "SELECT" && E.tagName != "INPUT" && E.tagName != "TEXTAREA") {
                        G = document.createEvent("MouseEvents");
                        G.initMouseEvent("click", true, true, D.view, 1, H.screenX, H.screenY, H.clientX, H.clientY, D.ctrlKey, D.altKey, D.shiftKey, D.metaKey, 0, null);
                        G._fake = true;
                        E.dispatchEvent(G)
                    }
                }
                B._resetPos(200);
                if (B.options.onTouchEnd) {
                    B.options.onTouchEnd.call(B, D)
                }
                return
            }
            if (A < 300 && B.options.momentum) {
                z = F ? B._momentum(F - B.startX, A, -B.x, B.scrollerW - B.wrapperW + B.x, B.options.bounce ? B.wrapperW : 0) : z;
                m = C ? B._momentum(C - B.startY, A, -B.y, (B.maxScrollY < 0 ? B.scrollerH - B.wrapperH + B.y : 0), B.options.bounce ? B.wrapperH : 0) : m;
                F = B.x + z.dist;
                C = B.y + m.dist;
                if ((B.x > 0 && F > 0) || (B.x < B.maxScrollX && F < B.maxScrollX)) {
                    z = {
                        dist: 0,
                        time: 0
                    }
                }
                if ((B.y > 0 && C > 0) || (B.y < B.maxScrollY && C < B.maxScrollY)) {
                    m = {
                        dist: 0,
                        time: 0
                    }
                }
            }
            if (z.dist || m.dist) {
                y = s.max(s.max(z.time, m.time), 10);
                B.scrollTo(d(F), d(C), y);
                if (B.options.onTouchEnd) {
                    B.options.onTouchEnd.call(B, D)
                }
                return
            }
            B._resetPos(200);
            if (B.options.onTouchEnd) {
                B.options.onTouchEnd.call(B, D)
            }
        },
        _resetPos: function (z) {
            var m = this,
                A = m.x >= 0 ? 0 : m.x < m.maxScrollX ? m.maxScrollX : m.x,
                y = m.y >= 0 || m.maxScrollY > 0 ? 0 : m.y < m.maxScrollY ? m.maxScrollY : m.y;
            if (A == m.x && y == m.y) {
                if (m.moved) {
                    if (m.options.onScrollEnd) {
                        m.options.onScrollEnd.call(m)
                    }
                    m.moved = false
                }
                return
            }
            m.scrollTo(A, y, z || 0)
        },
        _mouseout: function (y) {
            var m = y.relatedTarget;
            if (!m) {
                this._end(y);
                return
            }
            while (m = m.parentNode) {
                if (m == this.wrapper) {
                    return
                }
            }
            this._end(y)
        },
        _transitionEnd: function (y) {
            var m = this;
            if (y.target != m.scroller) {
                return
            }
            m._unbind("webkitTransitionEnd");
            m._startAni()
        },
        _startAni: function () {
            var D = this,
                y = D.x,
                m = D.y,
                B = Date.now(),
                C, A, z;
            if (D.animating) {
                return
            }
            if (!D.steps.length) {
                D._resetPos(400);
                return
            }
            C = D.steps.shift();
            if (C.x == y && C.y == m) {
                C.time = 0
            }
            D.animating = true;
            D.moved = true;
            if (D.options.useTransition) {
                D._transitionTime(C.time);
                D._pos(C.x, C.y);
                D.animating = false;
                if (C.time) {
                    D._bind("webkitTransitionEnd")
                } else {
                    D._resetPos(0)
                }
                return
            }
            z = function () {
                var E = Date.now(),
                    G, F;
                if (E >= B + C.time) {
                    D._pos(C.x, C.y);
                    D.animating = false;
                    if (D.options.onAnimationEnd) {
                        D.options.onAnimationEnd.call(D)
                    }
                    D._startAni();
                    return
                }
                E = (E - B) / C.time - 1;
                A = s.sqrt(1 - E * E);
                G = (C.x - y) * A + y;
                F = (C.y - m) * A + m;
                D._pos(G, F);
                if (D.animating) {
                    D.aniTime = q(z)
                }
            };
            z()
        },
        _transitionTime: function (m) {
            this.scroller.style[w + "TransitionDuration"] = m + "ms"
        },
        _momentum: function (E, y, C, m, G) {
            var D = 0.0006,
                z = s.abs(E) / y,
                A = (z * z) / (2 * D),
                F = 0,
                B = 0;
            if (E > 0 && A > C) {
                B = G / (6 / (A / z * D));
                C = C + B;
                z = z * C / A;
                A = C
            } else {
                if (E < 0 && A > m) {
                    B = G / (6 / (A / z * D));
                    m = m + B;
                    z = z * m / A;
                    A = m
                }
            }
            A = A * (E < 0 ? -1 : 1);
            F = z / D;
            return {
                dist: A,
                time: d(F)
            }
        },
        _offset: function (m) {
            var z = -m.offsetLeft,
                y = -m.offsetTop;
            while (m = m.offsetParent) {
                z -= m.offsetLeft;
                y -= m.offsetTop
            }
            return {
                left: z,
                top: y
            }
        },
        _bind: function (z, y, m) {
            (y || this.scroller).addEventListener(z, this, !! m)
        },
        _unbind: function (z, y, m) {
            (y || this.scroller).removeEventListener(z, this, !! m)
        },
        destroy: function () {
            var m = this;
            m.scroller.style[w + "Transform"] = "";
            m._unbind(h, window);
            m._unbind(b);
            m._unbind(r);
            m._unbind(e);
            m._unbind(u);
            m._unbind("mouseout", m.wrapper);
            if (m.options.useTransition) {
                m._unbind("webkitTransitionEnd")
            }
            if (m.options.onDestroy) {
                m.options.onDestroy.call(m)
            }
        },
        refresh: function () {
            var m = this,
                y;
            m.wrapperW = m.wrapper.clientWidth;
            m.wrapperH = m.wrapper.clientHeight;
            m.scrollerW = m.scroller.offsetWidth;
            m.scrollerH = m.scroller.offsetHeight;
            m.maxScrollX = m.wrapperW - m.scrollerW;
            m.maxScrollY = m.wrapperH - m.scrollerH;
            m.dirX = 0;
            m.dirY = 0;
            m.hScroll = m.options.hScroll && m.maxScrollX < 0;
            m.vScroll = m.options.vScroll && (!m.options.bounceLock && !m.hScroll || m.scrollerH > m.wrapperH);
            y = m._offset(m.wrapper);
            m.wrapperOffsetLeft = -y.left;
            m.wrapperOffsetTop = -y.top;
            m.scroller.style[w + "TransitionDuration"] = "0";
            m._resetPos(200)
        },
        scrollTo: function (m, F, E, D) {
            var C = this,
                B = m,
                A, z;
            C.stop();
            if (!B.length) {
                B = [{
                    x: m,
                    y: F,
                    time: E,
                    relative: D
                }]
            }
            for (A = 0, z = B.length; A < z; A++) {
                if (B[A].relative) {
                    B[A].x = C.x - B[A].x;
                    B[A].y = C.y - B[A].y
                }
                C.steps.push({
                    x: B[A].x,
                    y: B[A].y,
                    time: B[A].time || 0
                })
            }
            C._startAni()
        },
        scrollToElement: function (m, z) {
            var y = this,
                A;
            m = m.nodeType ? m : y.scroller.querySelector(m);
            if (!m) {
                return
            }
            A = y._offset(m);
            A.left += y.wrapperOffsetLeft;
            A.top += y.wrapperOffsetTop;
            A.left = A.left > 0 ? 0 : A.left < y.maxScrollX ? y.maxScrollX : A.left;
            A.top = A.top > 0 ? 0 : A.top < y.maxScrollY ? y.maxScrollY : A.top;
            z = z === undefined ? s.max(s.abs(A.left) * 2, s.abs(A.top) * 2) : z;
            y.scrollTo(A.left, A.top, z)
        },
        disable: function () {
            this.stop();
            this._resetPos(0);
            this.enabled = false;
            this._unbind(r);
            this._unbind(e);
            this._unbind(u)
        },
        enable: function () {
            this.enabled = true
        },
        stop: function () {
            o(this.aniTime);
            this.steps = [];
            this.moved = false;
            this.animating = false
        }
    };
    if (typeof exports !== "undefined") {
        exports.iScroll = t
    } else {
        window.iScroll = t
    }
})();
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.ui = a.Mojo.ui || {};
    a.Mojo.ui.Scroll = Mojo.Object.extend({
        init: function (g, d, f) {
            this._super(g, f);
            if (d instanceof Mojo.Object) {
                this._scroller = d.element()
            } else {
                this._scroller = d
            }
            this._m = Math;
            var e = this;
            this.element().addClass("mojo-ui-scroll");
            this._window = $('<div class="window"></div>').appendTo(this.element());
            this._wrapper = $('<div class="wrapper"></div>').appendTo(this._window).append(this._scroller);
            this._scroller.addClass("scroller");
            this._control = new iScroll(this._window, {
                bounce: false,
                bounceLock: true,
                onScrollEnd: function () {
                    e._refreshArrow()
                }
            });
            if (this._options.showArrow) {
                this._bar = $('<div class="bar"></div>');
                this._arrowUp = new Mojo.ui.Button(c, {
                    classes: ["arrow-up"],
                    text: this._options.arrowUpLabel,
                    click: function () {
                        if (e._options.direction == 1) {
                            e.scrollByStep(-e._options.step, 0)
                        } else {
                            if (e._options.direction == 2) {
                                e.scrollByStep(0, -e._options.step)
                            }
                        }
                    },
                });
                this._arrowDown = new Mojo.ui.Button(c, {
                    classes: ["arrow-down"],
                    text: this._options.arrowDownLabel,
                    click: function () {
                        if (e._options.direction == 1) {
                            e.scrollByStep(e._options.step, 0)
                        } else {
                            if (e._options.direction == 2) {
                                e.scrollByStep(0, e._options.step)
                            }
                        }
                    },
                });
                this._bar.append(this._arrowUp.element()).append(this._arrowDown.element()).appendTo(this.element())
            }
            this._initializeWrapperStyle();
            this._refreshArrow()
        },
        _stopTouchScoll: function () {},
        _refreshArrow: function () {
            if (this._options.showArrow) {
                var d = this._wrapper.position();
                if (this._options.direction == 1) {
                    this._arrowUp.disable(d.left >= 0);
                    this._arrowDown.disable(Math.abs(d.left) >= this.scrollerWidth() - this.wrapperWidth())
                } else {
                    if (this._options.direction == 2) {
                        this._arrowUp.disable(d.top >= 0);
                        this._arrowDown.disable(d.top <= this._wrapper.height() - this._scroller.height())
                    }
                }
            }
        },
        refresh: function () {
            this._refreshArrow();
            this._control.refresh()
        },
        _horizontalOutBounds: function (d) {
            var e = this;
            return !(d <= 0 && d >= (e._wrapper.width() - e._scroller.width()))
        },
        _verticalOutBounds: function (e) {
            var d = this;
            return !(e <= 0 && e >= (d._wrapper.height() - d._scroller.height()))
        },
        _initializeWrapperStyle: function () {
            if (this._options.direction == 1) {} else {
                if (this._options.direction == 2) {
                    this._wrapper.css({
                        width: "100%"
                    })
                } else {}
            }
        },
        _getDefaultOptions: function () {
            return {
                direction: 0,
                outbounds: false,
                step: 0,
                showTrack: false,
                showArrow: false,
                arrowUpLabel: "",
                arrowDownLabel: "",
            }
        },
        wrapperWidth: function () {
            return this._window.innerWidth()
        },
        wrapperHeight: function () {
            return this._window.innerHeight()
        },
        scrollerWidth: function () {
            return this._wrapper.outerWidth()
        },
        scrollerHeight: function () {
            return this._wrapper.outerHeight()
        },
        scrollerLeft: function () {
            return this._wrapper.position().left
        },
        scrollerTop: function () {
            return this._wrapper.position().top
        },
        initial: function () {
            this.refresh()
        },
        scroll: function (f, d) {
            var g = this.scrollerWidth() - this.wrapperWidth();
            var e = this.scrollerHeight() - this.wrapperHeight();
            if (f > g) {
                f = g
            }
            if (f <= 0) {
                f = 0
            }
            if (d > e) {
                d = e
            }
            if (d <= 0) {
                d = 0
            }
            offsetX = f + this.scrollerLeft();
            offsetY = d + this.scrollerTop();
            this._control.scrollTo(offsetX, offsetY, 500, true);
            this._refreshArrow()
        },
        scrollByStep: function (e, d) {
            var g = Math.abs(this.scrollerLeft());
            var f = Math.abs(this.scrollerTop());
            relativeX = g + e;
            relativeY = f + d;
            this.scroll(relativeX, relativeY)
        },
        scrollTo: function (d, e) {
            this.scroll(d, e)
        },
        clsname: function () {
            return "ui.Scroll"
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.ui = a.Mojo.ui || {};
    a.Mojo.ui.Pager = Mojo.Object.extend({
        init: function (f, e) {
            this._super(f, e);
            var d = this;
            this.element().addClass("mojo-ui-pager");
            this._title = $('<div class="title"></div>').appendTo(this.element());
            this._container = $('<div class="container"></div>').appendTo(this.element());
            this._nav = $('<div class="nav"><div class="previous"></div><div class="next"></div></div>').appendTo(this.element());
            this._btnPrevious = new Mojo.ui.Button(c, {
                text: this._options.previousLabel,
                click: function () {
                    d.previous()
                },
            });
            this._btnNext = new Mojo.ui.Button(c, {
                text: this._options.nextLabel,
                click: function () {
                    d.next()
                },
            });
            this._nav.find(".previous").append(this._btnPrevious.element());
            this._nav.find(".next").append(this._btnNext.element());
            this._pages = [];
            this._current = 0;
            this._refresh()
        },
        _refresh: function () {
            var e = this._pages[this._current];
            if (e == c || e == null) {
                var d = this;
                e = new Mojo.ui.ListPanel(c, {
                    loadFunc: function (g, f) {
                        d._options.loadFunc(d._current, d._options.pageSize)
                    },
                    drawFunc: function (f) {
                        return d._options.drawFunc(f)
                    },
                    classes: ["page"],
                });
                this._container.append(e.element());
                this._pages.push(e)
            }
            this._container.children(".page").hide().eq(this._current).show();
            this._pageCount = this._calPages();
            this._title.html(this._options.titleTemplate.replace(/#\{current\}/g, this._current + 1).replace(/#\{pages\}/g, this._pageCount));
            this._btnPrevious.disable(false);
            this._btnNext.disable(false);
            if (this._current == 0) {
                this._btnPrevious.disable(true)
            }
            if (this._current == this._pageCount - 1) {
                this._btnNext.disable(true)
            }
        },
        _getDefaultOptions: function () {
            return {
                previousLabel: Mojo.utils.locale("ui", "Previous"),
                nextLabel: Mojo.utils.locale("ui", "Next"),
                total: 0,
                pageSize: 10,
                titleTemplate: "#{current}/#{pages}",
                loadFunc: $.noop,
                drawFunc: $.noop,
            }
        },
        next: function () {
            if (this._current < this._pageCount - 1) {
                this._current = this._current + 1;
                this._refresh()
            }
        },
        previous: function () {
            if (this._current > 0) {
                this._current = this._current - 1;
                this._refresh()
            }
        },
        total: function (d) {
            if (d == c) {
                return this._options.total
            }
            this._options.total = d;
            this._pageCount = this._calPages();
            this._title.html(this._options.titleTemplate.replace(/#\{current\}/g, this._current + 1).replace(/#\{pages\}/g, this._pageCount))
        },
        appendData: function (e, d) {
            this._pages[e].appendData(d)
        },
        _calPages: function () {
            var e = parseInt(this._options.total / this._options.pageSize);
            var d = parseInt(this._options.total % this._options.pageSize);
            if (d > 0) {
                return e + 1
            }
            return e
        },
        clsname: function () {
            return "ui.Pager"
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.ui = a.Mojo.ui || {};
    a.Mojo.ui.Tabs = Mojo.Object.extend({
        init: function (f, e) {
            this._super(f, e);
            var d = this;
            this.element().addClass("mojo-ui-tabs");
            this._nav = $('<div class="nav"><ul></ul></div>').appendTo(this.element());
            $.each(this._options.tabs, function (g, h) {
                if (d._options.panels[g] == c) {
                    d._options.panels[g] = null
                }
                d._addTab(g, h)
            });
            this._refresh();
            this._enableStatus = []
        },
        _getDefaultOptions: function () {
            return {
                tabs: [],
                panels: [],
                selected: -1,
                selectionChange: $.noop,
            }
        },
        _refresh: function () {
            this._nav.find("ul > li").removeClass("mojo-ui-tabs-selected").eq((this._options.selected < 0 ? 0 : this._options.selected)).addClass("mojo-ui-tabs-selected");
            this.element().find(".panel").hide().eq((this._options.selected < 0 ? 0 : this._options.selected)).show()
        },
        _select: function (d) {
            if (d < 0 || d >= this._options.tabs.length || d == this._options.selected) {
                return
            }
            this._options.selected = d;
            this._refresh();
            this._options.selectionChange(d)
        },
        _addTab: function (g, k, e) {
            var f = this;
            var d = $("<li>" + k + "</li>").appendTo(f._nav.find("ul")).click(function () {
                if (f._enableStatus[$(this).index()]) {
                    f._select($(this).index())
                }
            });
            f._enableStatus[g] = true;
            if (e != c && e != null) {
                var m = "";
                var h = null;
                if (typeof (e) == "string") {
                    m = e
                } else {
                    if (typeof (e) == "object") {
                        m = e.text;
                        h = e.classes
                    }
                }
                $('<div class="flag"></div>').addClass(e.classes.join(" ")).html(m).appendTo(d).click(function () {
                    f._select($(this).index())
                })
            }
            var l = $('<div class="panel"></div>').appendTo(f.element());
            if (f._options.panels[g] != c && f._options.panels[g] != null) {
                l.append(f._options.panels[g].element())
            }
        },
        addTab: function (f, e, d) {
            this._options.tabs.push(f);
            if (e != c) {
                this._options.panels.push(e)
            } else {
                this._options.panels.push(null)
            }
            this._addTab(this._options.tabs.length - 1, f, d);
            this._refresh()
        },
        setPanel: function (e, d) {
            this._options.panels[e] = d;
            this.element().children(".panel").eq(e).empty();
            this.element().children(".panel").eq(e).append(d.element())
        },
        selected: function () {
            return this._options.selected
        },
        enable: function (d, h) {
            var g = (h === c || h == true);
            if (this._enableStatus[d] != g) {
                this._enableStatus[d] = g;
                var e = this._nav.find("ul > li").eq(d);
                e[g ? "removeClass" : "addClass"]("mojo-ui-tabs-disabled")
            }
        },
        clsname: function () {
            return "ui.Tabs"
        }
    })
})(window, jQuery);
(function (w, $, g) {
    w.Mojo = w.Mojo || {};
    g = w.Mojo.utils = w.Mojo.utils || {};
    g.debug = g.debug || {};
    g.debug.style = "console";
    g.debug.vars = g.debug.vars || {};
    g.debug.vars.ui = g.debug.vars.ui || {};
    g.debug.vars.com = g.debug.vars.com || {};
    g.debug.vars.page = g.debug.vars.page || {};
    g.debug.print = function (obj, title, debug) {
        if (debug === true) {
            var msg = ((title === undefined) ? "Debug Message" : title) + "\n==========================\n";
            if (obj === null) {
                msg += "null"
            } else {
                if (obj === undefined) {
                    msg += "Undefined Object!"
                } else {
                    if (typeof (obj) == "object") {
                        for (var prop in obj) {
                            msg += prop + " : " + obj[prop] + "\n"
                        }
                    } else {
                        msg += obj.toString()
                    }
                }
            } if (g.debug.style === "console") {
                console.log(msg)
            } else {
                alert(msg)
            }
        }
    };
    g.formatTime = function (sec) {
        var hour = parseInt(sec / (60 * 60));
        var second = parseInt(sec % (60 * 60));
        var minute = parseInt(second / 60);
        second = second % 60;
        var str = hour >= 10 ? hour : "0" + hour;
        str += ":" + (minute >= 10 ? minute : "0" + minute);
        str += ":" + (second >= 10 ? second : "0" + second);
        return str
    };
    g.formatSecTime = function (sec) {
        var day = parseInt(sec / (3600 * 24));
        var hour = parseInt(sec / (60 * 60));
        var second = parseInt(sec % (60 * 60));
        var minute = parseInt(second / 60);
        second = second % 60;
        return ((day > 0 ? day + Mojo.utils.locale("ui", "days") : "") || (hour > 0 ? hour + Mojo.utils.locale("ui", "hours") : "") || (minute > 0 ? minute + Mojo.utils.locale("ui", "minutes") : "") || (second > 0 ? second + Mojo.utils.locale("ui", "seconds") : ""))
    };
    g.getFromNowTime = function (time) {
        var date = new Date();
        var now = date.getTime() / 1000;
        var send = parseInt(time);
        var t = parseInt(now - send);
        if (t < 1) {
            t = 1
        }
        var day = parseInt(t / (3600 * 24));
        var hour = parseInt((t % (3600 * 24)) / 3600);
        var minute = parseInt((t % 3600) / 60);
        var second = t % 60;
        return (((day > 0 ? day + Mojo.utils.locale("ui", "days") : "") || (hour > 0 ? hour + Mojo.utils.locale("ui", "hours") : "") || (minute > 0 ? minute + Mojo.utils.locale("ui", "minutes") : "") || (second > 0 ? second + Mojo.utils.locale("ui", "seconds") : "")) + Mojo.utils.locale("ui", "ago"))
    };
    g.center = function (element) {
        var left = $(window).width() / 2 - element.outerWidth() / 2;
        var top = $(window).height() / 2 - element.outerHeight() / 2;
        var sl = $(document).scrollLeft();
        var st = $(document).scrollTop();
        element.css({
            left: left + sl,
            top: top + st
        })
    };
    g.relaW = function (num) {
        return num / 320 * $(window).width()
    };
    g.relaH = function (num) {
        return num / 440 * $(windw).height()
    };
    g.bottom = function (element) {
        var left = $(window).width() / 2 - element.outerWidth() / 2;
        var sl = $(document).scrollLeft();
        element.css({
            left: left + sl,
            bottom: 0,
            position: "absolute"
        })
    };
    g.isWhat = function (typeId, what) {
        if (parseInt(typeId) == 1) {
            return (what === undefined ? "general" : (what == "general"))
        }
        if (parseInt(typeId) == 2) {
            return (what === undefined ? "sword" : (what == "sword"))
        }
        if (parseInt(typeId) == 3) {
            return (what === undefined ? "shield" : (what == "shield"))
        }
        if (parseInt(typeId) == 4) {
            return (what === undefined ? "mounts" : (what == "mounts"))
        }
        if (parseInt(typeId) == 5) {
            return (what === undefined ? "treasure" : (what == "treasure"))
        }
        if (parseInt(typeId) == 6) {
            return (what === undefined ? "shouji" : (what == "shouji"))
        }
        if (parseInt(typeId) == 7) {
            return (what === undefined ? "props" : (what == "props"))
        }
        if (parseInt(typeId) == 8) {
            return (what === undefined ? "minis" : (what == "minis"))
        }
        if (parseInt(typeId) == 21) {
            return (what === undefined ? "rm" : (what == "rm"))
        }
        if (parseInt(typeId) == 22) {
            return (what === undefined ? "vm" : (what == "vm"))
        }
        if (parseInt(typeId) == 23) {
            return (what === undefined ? "xp" : (what == "xp"))
        }
        return undefined
    };
    w.Mojo.lang = w.Mojo.lang || {};
    g.locale = function (cat, key, params, userLanguage) {
        if (userLanguage == undefined) {
            userLanguage = Mojo.app.getUserLanguage()
        }
        var result = "";
        var paramsObj = params || {};
        if (cat != undefined && cat != null && key != undefined && key != null) {
            if (w.Mojo.lang[cat] != undefined && w.Mojo.lang[cat][userLanguage] != undefined && w.Mojo.lang[cat][userLanguage][key] != undefined) {
                result = w.Mojo.lang[cat][userLanguage][key]
            }
            if (result.length <= 0) {
                if (paramsObj.__default__) {
                    result = paramsObj.__default__
                } else {
                    result = key
                }
            }
            var regExp = new RegExp();
            for (var k in paramsObj) {
                regExp = eval("/{{:" + k + "}}/g");
                result = result.replace(regExp, paramsObj[k])
            }
        }
        return result
    };
    g.getFromParams = function (key) {
        var url = location.href;
        var str = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var obj = {};
        for (i = 0; j = str[i]; i++) {
            obj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length)
        }
        return obj[key.toLowerCase()]
    };
    g.getFromHost = function (key) {
        var url = location.href;
        var host = url.split("?")[0];
        var hostList = host.split("/");
        for (var index = 0; index < hostList.length; index++) {
            var k = hostList[index];
            if (k == key && index < (hostList.length - 1)) {
                return hostList[index + 1]
            }
        }
        return undefined
    };
    g._hasSomething = {};
    g.getSomething = function (key, onlyOnce) {
        if (onlyOnce == true && g._hasSomething[key]) {
            return undefined
        }
        var result = g.getFromParams(key);
        if (result == undefined || result == null) {
            result = g.getFromHost(key)
        }
        if (onlyOnce == true) {
            g._hasSomething[key] = result
        }
        return result
    };
    g.formatTimePlus = function (format, time) {
        if (time === undefined) {
            time = (new Date()).getTime() / 1000
        }
        var day = 0,
            hour = 0,
            minutes = 0,
            second = 0;
        if (format.indexOf("%dd") >= 0) {
            day = parseInt(time / (3600 * 24));
            time = parseInt(time % 3600 * 24)
        }
        if (format.indexOf("%hhu") >= 0) {
            hour = parseInt(time / 3600);
            time = parseInt(time % 3600)
        }
        if (format.indexOf("%mmu") >= 0) {
            minutes = parseInt(time / 60);
            time = parseInt(time % 60)
        }
        second = parseInt(time);
        var result = format.replace("%ddu", (day <= 0 ? "" : day + Mojo.utils.locale("common", "day"))).replace("%hhu", (hour <= 0 ? "" : hour + Mojo.utils.locale("common", "hour"))).replace("%mmu", (minutes <= 0 ? "" : minutes + Mojo.utils.locale("common", "minutes"))).replace("%ssu", (second <= 0 ? "" : second + Mojo.utils.locale("common", "second")));
        return result
    };
    g.formatPlayerName = function (name, title) {
        if (typeof (name) == "object") {
            title = name.title;
            name = name.name
        }
        if (title) {
            return '[<span class="official">' + title + "</span>]" + name
        }
        return name
    };
    g.isNone = function (d) {
        if (d == undefined || d == null) {
            return true
        }
        if ((typeof (d) == "string" || Array.isArray(d)) && d.length <= 0) {
            return true
        }
        if (typeof (d) == "number") {
            return isNaN(d)
        }
        if (typeof (d) == "object") {
            for (var i in d) {
                return false
            }
            return true
        }
        return false
    };
    g.cardprice = function (lv, star) {
        lv = parseInt(lv);
        star = parseInt(star);
        var temp = 40 * (lv - 1) * Math.pow((lv / 50 + 1), 1.2) + 25 * Math.pow((star + 1), 2) / (5.2 - star);
        return Math.ceil(temp)
    };
    g.showWait = function (isOpen) {
        if (isOpen === false) {
            $(document.body).find(".mojo-utils-shadow").remove()
        } else {
            var shadow = $('<div class="mojo-utils-shadow"><div class="pp-chrysanthemum"></div></div>').css({
                width: $(document).width(),
                height: $(document).height(),
            }).appendTo($(document.body));
            g.center(shadow.find(".pp-chrysanthemum").first())
        }
    };
    g.trim = function (str) {
        return str.replace(/(^\s*)(\s*$)/g, "")
    };
    g.getEntityTitle = function (typeId) {
        var str = "";
        switch (parseInt(typeId)) {
        case 1:
            str = Mojo.utils.locale("entity", "generals_info");
            break;
        case 2:
            str = Mojo.utils.locale("entity", "weapon_info");
            break;
        case 3:
            str = Mojo.utils.locale("entity", "armor_info");
            break;
        case 4:
            str = Mojo.utils.locale("entity", "mounts_info");
            break;
        case 5:
            str = Mojo.utils.locale("entity", "treasure_info");
            break;
        default:
            break
        }
        return str
    };
    g.getClientVersion = function () {
        return Mojo.cache.get("app_version") == undefined ? "1.0" : Mojo.cache.get("app_version")
    };
    g.isOpenUrlAvailable = function () {
        var version = parseFloat(g.getClientVersion());
        if (Mojo.gap.device == "iphone") {
            if (version >= 1.3) {
                return true
            }
        } else {
            if (Mojo.gap.device == "ipad") {
                if (version >= 1.2) {
                    return true
                }
            }
        }
        return false
    }
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.lang = {};
    a.Mojo.lang.ui = {
        zh_tw: {
            Agree: "同意",
            "Assist Lose": "救援失敗",
            "Assist Win": "救援成功",
            Back: "返回",
            "Back to {{:scenario}}": "返回{{:scenario}}",
            "Base Informations": "基礎資料",
            Close: "關閉",
            Congratulations: "恭喜",
            "Congratulations! You got a card!": "恭喜你獲得了一張卡牌！",
            "Congratulations! You got rewards!": "恭喜你獲得獎勵！",
            Deny: "拒絕",
            Do: "執行",
            Duel: "切磋",
            "Fight Informations": "戰鬥資訊",
            "For Help": "求援",
            "For Help Again": "再次求援",
            "Force Invite": "勢力邀請",
            "Force War": "勢力戰",
            "Friend Assist Request": "好友求援",
            "Friend Confirmation": "好友確認",
            "Friend Delete": "割袍斷義",
            "Friend Message": "好友消息",
            "Friend PK Lose": "切磋戰敗",
            "Friend PK Win": "切磋勝利",
            "Friend Rejection": "好友拒絕",
            "Friend Request": "好友請求",
            "In War": "參戰",
            Introduction: "簡介",
            "Leave Message": "留言",
            Level: "難度：",
            "More Messages": "更多消息",
            Next: "後一頁",
            "PK Lose": "戰敗",
            "PK Win": "勝利",
            Previous: "前一頁",
            Progress: "完成度",
            Ranking: "",
            "Refresh Succ": "刷新成功",
            Reject: "拒絕",
            Reply: "回覆",
            Requirement: "任務需求",
            Retaliate: "反擊",
            Reward: "任務獎勵",
            Select: "選",
            "Select a friend": "選擇好友",
            Send: "發送",
            "Send Troops": "出兵",
            "System Message": "系統消息",
            Thanko_kr: "致謝",
            Thanks: "致谢",
            "Type message": "發送消息",
            "View Force": "查看勢力",
            "View More": "查看更多",
            ago: "前",
            day: "天",
            days: "天",
            hour: "小時",
            hours: "小時",
            minute: "分鐘",
            minutes: "分鐘",
            second: "秒",
            seconds: "秒",
            "ui War": "勢力戰",
        },
        zh_cn: {
            Agree: "同意",
            "Assist Lose": "救援失败",
            "Assist Win": "救援成功",
            Back: "返回",
            "Back to {{:scenario}}": "返回{{:scenario}}",
            "Base Informations": "基础信息",
            Close: "关闭",
            Congratulations: "恭喜",
            "Congratulations! You got a card!": "恭喜你获得了一张卡牌！",
            "Congratulations! You got rewards!": "恭喜你获得奖励！",
            Deny: "拒绝",
            Do: "执行",
            Duel: "切磋",
            "Fight Informations": "战斗信息",
            "For Help": "求援",
            "For Help Again": "再次求援",
            "Force Invite": "势力邀请",
            "Force War": "势力战",
            "Friend Assist Request": "好友求援",
            "Friend Confirmation": "好友确认",
            "Friend Delete": "割袍断义",
            "Friend Message": "好友消息",
            "Friend PK Lose": "切磋战败",
            "Friend PK Win": "切磋胜利",
            "Friend Rejection": "好友拒绝",
            "Friend Request": "好友请求",
            "In War": "参战",
            Introduction: "简介",
            "Leave Message": "留言",
            Level: "难度：",
            "More Messages": "更多消息",
            Next: "后一页",
            "PK Lose": "战败",
            "PK Win": "胜利",
            Previous: "前一页",
            Progress: "完成度",
            Ranking: "排行榜消息",
            "Refresh Succ": "刷新成功",
            Reject: "拒绝",
            Reply: "回复",
            Requirement: "任务需求",
            Retaliate: "反击",
            Reward: "任务奖励",
            Select: "选",
            "Select a friend": "选择好友",
            Send: "发送",
            "Send Troops": "出兵",
            "System Message": "系统消息",
            Thanko_kr: "致谢",
            Thanks: "致谢",
            "Type message": "发送消息",
            "View Force": "查看势力",
            "View More": "查看更多",
            ago: "前",
            day: "天",
            days: "天",
            hour: "小时",
            hours: "小时",
            minute: "分钟",
            minutes: "分钟",
            second: "秒",
            seconds: "秒",
            "ui War": "势力战",
        },
    };
    a.Mojo.lang.common = {
        zh_tw: {
            "Go Statistics": "查看統計",
            "acceleration for restore ep": "&#149精力恢復速度增加：",
            "acceleration for restore sp": "&#149體力恢復速度增加：",
            add_cp: "你使用了{{:name}}, 獲得了{{:value}}个挑戰書",
            add_ep: "{{:name}}使用成功",
            add_friend: "加好友",
            add_sp: "{{:name}}使用成功",
            ago: "",
            attack: "進攻",
            attack_again: "再次進攻",
            "avoid war time": "免戰時間：{{:avoid_war_time}}",
            avoid_war_content: "主公，我軍還在免戰中，撤銷免戰牌方可出兵！但是我軍也將城門大開！<br><b>免戰時間：{{:avoid_war_time}}</b>",
            avoid_war_title: "我軍免戰中",
            back: "返回",
            "bad network": "主公～你的網路有點弱哦～",
            base_attack: "基礎攻擊力：{{:old}} → <span>{{:new}}</span>",
            base_defence: "基礎防禦力：{{:old}} → <span>{{:new}}</span>",
            battle: "去征討",
            battle_search: "輸入玩家暱稱搜索",
            bind: "預設",
            bind_tip1: '主公，請預設您的email。Email將作為密碼找回的工具，且不可更改<div class="tip">所以請務必確認email正確有效哦~</div>',
            bind_tip2: "預設email 7天後，即可通過email找回密碼哦~",
            bind_title: "預設帳號資訊",
            bind_weibo: "預設Facebook",
            buy: "購買",
            "buy ep succ": "精力大還丹購買成功",
            "buy sp succ": "體力大還丹購買成功",
            buy_fail_title: "購買失敗！",
            buy_something_success: "{{:name}}購買成功",
            capacify_lack: "卡牌容量不足",
            capacify_lack_tip: "主公~您的卡牌容量不足啦，去强化掉多余的卡牌或者去出售部分卡牌再来吧~",
            clear_avoid_war: "免戰時間已清空，機會和挑戰並存",
            close: "關閉",
            common: "勢力：",
            count: "數量：",
            day: "天",
            days: "天",
            dday: "日",
            default_text: "請輸入給他（她）的話",
            discount: "折",
            email: "email",
            ep: "精力值：",
            expire: "維護",
            facebook: "Facebook",
            findpwd_email_address: "email *",
            findpwd_email_tip: "請輸入帳號和註冊的email：",
            findpwd_method_tip: "請選擇密碼找回的方式！<br>&#149預設手機的用戶請選擇【簡訊找回】<br>&#149已註冊email的用戶請選擇【郵件找回】<br>&#149未預設手機和郵箱的用戶請聯繫客服<br>客服email：support@redatoms.com",
            findpwd_mobile_tip: "請輸入帳號和註冊的手機號碼：",
            findpwd_send_email: "發送郵件",
            findpwd_server_tip: "您要找回密碼的伺服器：",
            findpwd_with_email: "郵件找回",
            findpwd_with_mobile: "簡訊找回",
            force: "勢力：",
            "force-none": "",
            force_message: "勢力消息",
            forcewar_lose_grain: "【{{:forcename}}】率眾偷襲我方勢力，奪走了{{:grain}}糧餉",
            forcewar_notice_members1: "[<span>{{:title}}</span>]{{:ownername}}向【{{:forcename}}】發起挑戰，號召你加入戰鬥！",
            forcewar_win_grain: "我方勢力輕鬆擊敗【{{:forcename}}】，奪得{{:grain}}糧餉",
            forgetpwd: "忘記密碼",
            friend_search: "",
            full: "滿",
            gain_levelup_award: "獲得升級獎勵：",
            general_count: "上陣將領數：",
            general_slot_unlock: "解鎖一個上陣將領卡槽!",
            go_accept: "查收",
            go_bless: "",
            go_embed: "直接上陣",
            go_fuben: "去闖關",
            go_intensify: "去強化",
            go_neizheng: "",
            go_payment: "去加值",
            go_rebirth: "去轉生",
            go_sale: "去出售",
            go_vm: "去換錢",
            grain: "糧餉：",
            "has reached the maximum": "已達最大值",
            hot: "熱",
            hour: "小時",
            hours: "小時",
            in_cd: "冷卻中：",
            input_email: "请输入郵箱地址",
            input_mobile: "請輸入手機號",
            input_username: "請輸入帳號",
            intensify: "強化",
            invite_friend: "好友邀請",
            level: "級別：",
            level_up: "恭喜主公達到等級{{:level}}",
            level_up_title: "恭喜升級",
            login_forget_description: "若註冊時未填寫手機號碼或手機號碼有誤，請聯繫客服。",
            login_forget_passwd: "密碼找回",
            login_forget_phone: "手機號碼 *",
            login_forget_sendsms: "發送簡訊",
            login_forget_username: "帳號  *",
            login_time: "",
            lv: "級別",
            main_j: "主將",
            max_energy: "精力最大值：{{:old}} → <span>{{:new}}</span>",
            max_entity: "卡牌容量上限：{{:old}} → <span>{{:new}}</span>",
            max_friends_count: "最大好友數量：{{:old}} → <span>{{:new}}</span>",
            max_stamina: "體力最大值：{{:old}} → <span>{{:new}}</span>",
            minute: "分鐘",
            minutes: "分鐘",
            month: "月",
            more: "更多",
            name: "暱稱：",
            "new": "新",
            new_attack: "攻擊：",
            new_defence: "防禦：",
            "no content": "無字天書會看不懂哦！",
            "no enough energy": "精力值不足",
            "no enough stamina": "體力值不足",
            "not enough ep": "提示: 主公如有體力,請前去征討",
            "not enough sp": "提示: 主公如有精力,請執行任務",
            not_bind: "暫不預設",
            ok: "確定",
            price: "花費：",
            "price in mall": "商城售價：",
            price_title: "售價：",
            priceless: "無價之寶，不可購買",
            recharge: "加值",
            relation: "（連結{{:platform}}）",
            relation_guest: "未預設email的用戶請聯繫客服<br>客服email：support@redatoms.com",
            reset_avoid_war: "使用成功，免戰時間重置為{{:avoid_war_time}}",
            revocation_of_war_free: "撤銷免戰",
            rm: "元寶：",
            rob: "去奪寶",
            search: "搜",
            second: "秒",
            seconds: "秒",
            select_all: "全選",
            simple: "",
            simple_attack: "攻擊力：",
            simple_defence: "防禦力：",
            simplified: "簡體",
            sp: "體力值：",
            suggestion_default_text: "請輸入您的建議",
            suggestion_has_send: "已飛鴿傳書！",
            suggestion_title: "意見建議",
            task: "做任務",
            team_attack: "軍團攻擊力：",
            team_defence: "軍團防禦力：",
            think_again: "再想想",
            "time for all ep": "&#149全部精力恢復：",
            "time for all sp": "&#149全部體力恢復：",
            "time for next ep": "&#149下一點精力恢復：",
            "time for next sp": "&#149下一點體力恢復：",
            tips: "提示",
            traditional: "繁體",
            unknown: "",
            unlock_fuben_name: "解鎖闖關：{{:name}}",
            unlock_slot_count: "上陣將領卡槽：{{:old}} → <span>{{:new}}</span>",
            use: "使用",
            view: "查看",
            vm: "銀幣：",
            wait_to_do: "主公～稍等一下再執行該任務吧～",
            weibo: "Facebook",
            "when lose": "失敗時",
            "when win": "勝利時",
            win_rate: "征討勝率：{{:percent}}%",
            xp: "經驗值：",
            year: "年",
        },
        zh_cn: {
            "Go Statistics": "查看统计",
            "acceleration for restore ep": "&#149精力恢复速度增加：",
            "acceleration for restore sp": "&#149体力恢复速度增加：",
            add_cp: "你使用了{{:name}}, 获得了{{:value}}个挑战书",
            add_ep: "{{:name}}使用成功",
            add_friend: "加好友",
            add_sp: "{{:name}}使用成功",
            ago: "前",
            attack: "进攻",
            attack_again: "再次进攻",
            "avoid war time": "免战时间：{{:avoid_war_time}}",
            avoid_war_content: "主公，我军还在免战中，撤销免战牌方可出兵！但是我军也将城门大开！<br><b>免战时间：{{:avoid_war_time}}</b>",
            avoid_war_title: "我军免战中",
            back: "返回",
            "bad network": "主公～你的网络不给力啊～",
            base_attack: "基础攻击力：{{:old}} → <span>{{:new}}</span>",
            base_defence: "基础防御力：{{:old}} → <span>{{:new}}</span>",
            battle: "去征讨",
            battle_search: "输入玩家昵称搜索",
            bind: "绑定",
            bind_tip1: '主公，请绑定您的电子邮箱。电子邮箱将作为密码找回的工具，且不可更改<div class="tip">所以请务必保证邮箱真实有效哦~</div>',
            bind_tip2: "绑定邮箱7天后，即可通过邮箱找回密码哦~",
            bind_title: "账户信息绑定",
            bind_weibo: "绑定微博",
            buy: "购买",
            "buy ep succ": "精力大还丹购买成功",
            "buy sp succ": "体力大还丹购买成功",
            buy_fail_title: "购买失败！",
            buy_something_success: "{{:name}}购买成功",
            capacify_lack: "卡牌容量不足",
            capacify_lack_tip: "主公~您的卡牌容量不足啦，去强化掉多余的卡牌或者去出售部分卡牌再来吧~",
            clear_avoid_war: "免战时间已清空，机会和挑战并存",
            close: "关闭",
            common: "势力：",
            count: "数量：",
            day: "天",
            days: "天",
            dday: "日",
            default_text: "请输入给Ta的话",
            discount: "折",
            email: "电子邮箱",
            ep: "精力值：",
            expire: "维护",
            facebook: "facebook",
            findpwd_email_address: "邮箱地址 *",
            findpwd_email_tip: "请输入账户和绑定的邮箱地址：",
            findpwd_method_tip: "<b>请选择密码找回的方式！</b><br>&#149绑定手机的用户请选择【短信找回】<br>&#149绑定邮箱的用户请选择【邮件找回】<br>&#149手机和邮箱都未绑定的用户请联系客服<br>客服邮箱：support@redatoms.com",
            findpwd_mobile_tip: "请输入账户和绑定的手机号码：",
            findpwd_send_email: "发送邮件",
            findpwd_server_tip: "您要找回密码的服务器：",
            findpwd_with_email: "邮件找回",
            findpwd_with_mobile: "短信找回",
            force: "势力：",
            "force-none": "未加入势力",
            force_message: "势力消息",
            forcewar_lose_grain: "【{{:forcename}}】率众偷袭我方势力，夺走了{{:grain}}粮饷",
            forcewar_notice_members1: "[<span>{{:title}}</span>]{{:ownername}}向【{{:forcename}}】发起挑战，号召你加入战斗！",
            forcewar_win_grain: "我方势力轻松击败【{{:forcename}}】，夺得{{:grain}}粮饷",
            forgetpwd: "忘记密码",
            friend_search: "输入好友昵称搜索",
            full: "满",
            gain_levelup_award: "获得升级奖励：",
            general_count: "上阵将领数：",
            general_slot_unlock: "解锁一个上阵将领卡槽!",
            go_accept: "查收",
            go_bless: "去祝福",
            go_embed: "直接上阵",
            go_fuben: "去闯关",
            go_intensify: "去强化",
            go_neizheng: "做内政",
            go_payment: "去充值",
            go_rebirth: "去转生",
            go_sale: "去出售",
            go_vm: "去换钱",
            grain: "粮饷：",
            "has reached the maximum": "已达最大值",
            hot: "热",
            hour: "小时",
            hours: "小时",
            in_cd: "冷却中：",
            input_email: "请输入邮箱地址",
            input_mobile: "请输入手机号",
            input_username: "请输入账户名",
            intensify: "强化",
            invite_friend: "好友邀请",
            level: "级别：",
            level_up: "恭喜主公达到等级{{:level}}",
            level_up_title: "恭喜升级",
            login_forget_description: "若注册时未填写手机号码或手机号码输入有误，请联系客服。",
            login_forget_passwd: "密码找回",
            login_forget_phone: "手机号 *",
            login_forget_sendsms: "发送短信",
            login_forget_username: "账户名 *",
            login_time: "登陆：",
            lv: "级别",
            main_j: "主将",
            max_energy: "精力最大值：{{:old}} → <span>{{:new}}</span>",
            max_entity: "卡牌容量上限：{{:old}} → <span>{{:new}}</span>",
            max_friends_count: "最大好友数量：{{:old}} → <span>{{:new}}</span>",
            max_stamina: "体力最大值：{{:old}} → <span>{{:new}}</span>",
            minute: "分钟",
            minutes: "分钟",
            month: "月",
            more: "更多",
            name: "昵称：",
            "new": "新",
            new_attack: "攻击：",
            new_defence: "防御：",
            "no content": "无字天书别人是看不懂的！",
            "no enough energy": "精力值不足",
            "no enough stamina": "体力值不足",
            "not enough ep": "提示: 主公如有体力,请前去征讨",
            "not enough sp": "提示: 主公如有精力,请前去任务",
            not_bind: "暂不绑定",
            ok: "确定",
            price: "花费：",
            "price in mall": "商城售价：",
            price_title: "售价：",
            priceless: "无价之宝，不可购得。",
            recharge: "充值",
            relation: "（关联{{:platform}}）",
            relation_guest: "邮箱未绑定的用户请联系客服<br>客服邮箱：support@redatoms.com",
            reset_avoid_war: "使用成功，免战时间重置为{{:avoid_war_time}}",
            revocation_of_war_free: "撤销免战",
            rm: "元宝：",
            rob: "去夺宝",
            search: "搜",
            second: "秒",
            seconds: "秒",
            select_all: "全选",
            simple: "",
            simple_attack: "攻击力：",
            simple_defence: "防御力：",
            simplified: "简体",
            sp: "体力值：",
            suggestion_default_text: "请输入您的建议",
            suggestion_has_send: "已飞鸽传书！",
            suggestion_title: "意见建议",
            task: "做任务",
            team_attack: "军团攻击力：",
            team_defence: "军团防御力：",
            think_again: "再想想",
            "time for all ep": "&#149全部精力恢复：",
            "time for all sp": "&#149全部体力恢复：",
            "time for next ep": "&#149下一点精力恢复：",
            "time for next sp": "&#149下一点体力恢复：",
            tips: "提示",
            traditional: "繁体",
            unknown: "未知",
            unlock_fuben_name: "解锁闯关：{{:name}}",
            unlock_slot_count: "上阵将领卡槽：{{:old}} → <span>{{:new}}</span>",
            use: "使用",
            view: "查看",
            vm: "银币：",
            wait_to_do: "主公～等会儿再执行该任务吧～",
            weibo: "新浪微博",
            "when lose": "失败时",
            "when win": "胜利时",
            win_rate: "征讨胜率：{{:percent}}%",
            xp: "经验值：",
            year: "年",
        },
    };
    a.Mojo.lang.weibo = {
        zh_tw: {
            "A new general socket will unlock after binding weibo account.": "綁定帳號後增加一個上陣將領卡槽。",
            "Bind sina weibo account": "預設微博",
            "Bind weibo": "預設微博",
            "Binding sina weibo account, please wait...": "正在預設您的新浪微博帳號，請稍候...",
            "Change account": "變更預設",
            "Fail to bind your weibo account!": "預設新浪微博帳號失敗！",
            "Fail to fetch your weibo account infomation!": "獲取新浪微博帳號資訊失敗！",
            "Fail to logout current account!": "新浪微博帳號重設失敗，請重試！",
            "Fetching your nickname of sina weibo, please wait...": "正在獲取新浪微博帳戶昵稱，請稍候...",
            "Has bind to sina weibo account": "已預設新浪微博",
            "Has bind to sina weibo account:{{:account}}": "已預設新浪微博<br>{{:account}}",
            "Have not bind any weibo account!": "未預設新浪微博",
            "I am watting for you in #SanGuo lai le#!": "我在#三國來了#等著你呢！",
            Login: "請重新登入",
            "Please input weibo content": "請輸入信息內容",
            "Receive 50 coins for every weibo message(The daily limit is 500 coins).": "每分享一次喜悅獲得100銀幣（每日上限500銀幣）。",
            "Send Success": "發送消息成功！",
            "Send message": "發送消息",
            "Send weibo": "發送消息",
            "Share achievements with your friends and fans.": "和好友、粉絲們分享成就。",
            "Weibo has a lot of benefits": "分享喜悅好處多多",
            'Your weibo account "{{:account}}" has expired, please login again!': "新浪微博已過期<br>{{:account}}",
            "Your weibo account has expired!": "新浪微博已過期",
            "bind message": "主公～你還沒預設微博，現在就去預設吧～<br>也可以在【首頁-設置】中自行預設～<br>PS:分享喜悅將獲得銀幣獎勵哦～",
            "bind title": "預設新浪微博",
            enter_game: "進入遊戲",
            "expire message": "主公～你的微博已過期，需要重新登錄～<br>也可以在【首頁-設置】中自行登錄～<br>PS:分享喜悅將獲得銀幣獎勵哦～",
            follow: "關注",
            "follow message": "是否關注官方微博，獲取更多遊戲資訊，並結交更多喜歡《三國來了》的戰友？<br>關注獎勵：1000銀幣",
            "follow official": "關注官方微博",
            "go bind": "去預設",
            "go login": "去登入",
            relation_official_weibo: "關注《三國來了》官方微博<br><span>（第一次關注獎勵1000銀幣哦~）</span>",
            relation_weibo: "連結新浪微博帳號",
            relation_weibo_tip: "嗨，連結新浪微博隨時可以與身邊的朋友分享遊戲中的喜悅哦~",
            "weibo bonus": "每分享一次喜悅可獲得100銀幣～",
        },
        zh_cn: {
            "A new general socket will unlock after binding weibo account.": "绑定账户后增加一个上阵将领卡槽。",
            "Bind sina weibo account": "绑定新浪微博",
            "Bind weibo": "绑定微博",
            "Binding sina weibo account, please wait...": "正在绑定新浪微博账号，请稍候...",
            "Change account": "变更绑定",
            "Fail to bind your weibo account!": "绑定新浪微博账号失败！",
            "Fail to fetch your weibo account infomation!": "获取新浪微博账号信息失败！",
            "Fail to logout current account!": "新浪微博账号注销失败，请重试！",
            "Fetching your nickname of sina weibo, please wait...": "正在获取新浪微博账户昵称，请稍候...",
            "Has bind to sina weibo account": "已绑定新浪微博",
            "Has bind to sina weibo account:{{:account}}": "已绑定新浪微博<br>{{:account}}",
            "Have not bind any weibo account!": "未绑定新浪微博",
            "I am watting for you in #SanGuo lai le#!": "我在#三国来了#等着你呢！",
            Login: "重新登录",
            "Please input weibo content": "请输入微博内容",
            "Receive 50 coins for every weibo message(The daily limit is 500 coins).": "每发一条微博获得100银币（每日上限500银币）。",
            "Send Success": "发送微博成功！",
            "Send message": "发送消息",
            "Send weibo": "发送微博",
            "Share achievements with your friends and fans.": "和好友、粉丝们分享成就。",
            "Weibo has a lot of benefits": "微博好处多多",
            'Your weibo account "{{:account}}" has expired, please login again!': "新浪微博已过期<br>{{:account}}",
            "Your weibo account has expired!": "新浪微博已过期",
            "bind message": "主公～你还没有绑定微博，现在就去绑定吧～<br>也可以在【首页-设置】中自行绑定～<br>PS:发送微博将获得银币奖励哦～",
            "bind title": "绑定新浪微博",
            enter_game: "进入游戏",
            "expire message": "主公～你的微博已过期，需要重新登录～<br>也可以在【首页-设置】中自行登录～<br>PS:发送微博将获得银币奖励哦～",
            follow: "关注",
            "follow message": "是否关注官方微博，获取更多游戏信息，并结交更多喜欢《三国来了》的战友？<br>关注奖励：1000银币",
            "follow official": "关注官方微博",
            "go bind": "去绑定",
            "go login": "去登录",
            relation_official_weibo: "关注《三国来了》官方微博<br><span>（第一次关注奖励1000银币哦~）</span>",
            relation_weibo: "关联新浪微博账号",
            relation_weibo_tip: "亲，关联新浪微博随时可以与身边的朋友分享游戏中的喜悦哦~",
            "weibo bonus": "每发一条微博可获得100银币～",
        },
    };
    a.Mojo.lang.facebook = {
        zh_tw: {
            "A new general socket will unlock after binding weibo account.": "預設帳號後增加一個上陣將領卡槽。",
            "Bind sina weibo account": "預設facebook",
            "Bind weibo": "預設facebook",
            "Binding sina weibo account, please wait...": "正在預設facebook帳號，請稍候...",
            "Change account": "變更預設",
            "Fail to bind your weibo account!": "預設facebook帳號失敗！",
            "Fail to fetch your weibo account infomation!": "獲取facebook帳號資訊失敗！",
            "Fail to logout current account!": "facebook帳號登出失敗，請重試！",
            "Fetching your nickname of sina weibo, please wait...": "正在獲取facebook帳戶昵稱，請稍候...",
            "Has bind to sina weibo account": "已預設facebook",
            "Has bind to sina weibo account:{{:account}}": "已預設facebook<br>{{:account}}",
            "Have not bind any weibo account!": "未預設facebook",
            "I am watting for you in #SanGuo lai le#!": "我在#三國來了#等著你呢！",
            Login: "重新登入",
            "Please input weibo content": "請輸入分享內容",
            "Receive 50 coins for every weibo message(The daily limit is 500 coins).": "每po一條分享獲得100銀幣（每日上限500銀幣）。",
            "Send Success": "發送分享成功！",
            "Send message": "發送消息",
            "Send weibo": "分享",
            "Share achievements with your friends and fans.": "和好友、粉絲們分享成就。",
            "Weibo has a lot of benefits": "預設facebook帳號好處多多",
            'Your weibo account "{{:account}}" has expired, please login again!': "facebook已過期<br>{{:account}}",
            "Your weibo account has expired!": "facebook已過期",
            "bind message": "主公～你還沒有預設facebook帳號，現在就去預設吧～<br>也可以在【首頁-設置】中自行預設～<br>PS:發送分享將獲得銀幣獎勵哦～",
            "bind title": "預設facebook",
            enter_game: "進入遊戲",
            "expire message": "主公～你的facebook已過期，需要重新登入～<br>也可以在【首頁-設置】中自行登入～<br>PS:發送分享將獲得銀幣獎勵哦～",
            follow: "關注",
            "follow message": "是否關注官方facebook，獲取更多遊戲資訊，並結交更多喜歡《三國來了》的戰友？<br>關注獎勵：1000銀幣",
            "follow official": "關注官方facebook",
            "go bind": "去預設",
            "go login": "去登入",
            relation_official_weibo: "關注《三國來了》官方Facebook<br><span>（第一次關注獎勵1000銀幣哦~）</span>",
            relation_weibo: "連結facebook帳號",
            relation_weibo_tip: "嗨，連結facebook隨時與身邊的朋友分享遊戲中的歡樂哦~",
            "weibo bonus": "每po一條分享可獲得100銀幣～",
        },
        zh_cn: {
            "A new general socket will unlock after binding weibo account.": "绑定账户后增加一个上阵将领卡槽。",
            "Bind sina weibo account": "绑定facebook",
            "Bind weibo": "绑定facebook",
            "Binding sina weibo account, please wait...": "正在绑定facebook账号，请稍候...",
            "Change account": "变更绑定",
            "Fail to bind your weibo account!": "绑定facebook账号失败！",
            "Fail to fetch your weibo account infomation!": "获取facebook账号信息失败！",
            "Fail to logout current account!": "facebook账号注销失败，请重试！",
            "Fetching your nickname of sina weibo, please wait...": "正在获取facebook账户昵称，请稍候...",
            "Has bind to sina weibo account": "已绑定facebook",
            "Has bind to sina weibo account:{{:account}}": "已绑定facebook<br>{{:account}}",
            "Have not bind any weibo account!": "未绑定facebook",
            "I am watting for you in #SanGuo lai le#!": "我在#三国来了#等着你呢！",
            Login: "重新登录",
            "Please input weibo content": "请输入分享内容",
            "Receive 50 coins for every weibo message(The daily limit is 500 coins).": "每发一条分享获得100银币（每日上限500银币）。",
            "Send Success": "发送分享成功！",
            "Send message": "发送消息",
            "Send weibo": "分享",
            "Share achievements with your friends and fans.": "和好友、粉丝们分享成就。",
            "Weibo has a lot of benefits": "绑定facebook好处多多",
            'Your weibo account "{{:account}}" has expired, please login again!': "facebook已过期<br>{{:account}}",
            "Your weibo account has expired!": "facebook已过期",
            "bind message": "主公～你还没有绑定facebook，现在就去绑定吧～<br>也可以在【首页-设置】中自行绑定～<br>PS:发送分享将获得银币奖励哦～",
            "bind title": "绑定facebook",
            enter_game: "进入游戏",
            "expire message": "主公～你的facebook已过期，需要重新登录～<br>也可以在【首页-设置】中自行登录～<br>PS:发送分享将获得银币奖励哦～",
            follow: "关注",
            "follow message": "是否关注官方facebook，获取更多游戏信息，并结交更多喜欢《三国来了》的战友？<br>关注奖励：1000银币",
            "follow official": "关注官方facebook",
            "go bind": "去绑定",
            "go login": "去登录",
            relation_official_weibo: "关注《三国来了》官方微博<br><span>（第一次关注奖励1000银币哦~）</span>",
            relation_weibo: "关联facebook账号",
            relation_weibo_tip: "亲，关联facebook随时可以与身边的朋友分享游戏中的喜悦哦~",
            "weibo bonus": "每发一条分享可获得100银币～",
        },
    };
    a.Mojo.lang.largeentity = {
        zh_tw: {
            attack: "增加攻擊力 + ",
            defence: "增加防禦力 + ",
            effect_ep: "精力恢復速度 + ",
            effect_max_attack: "武將最大攻擊 + ",
            effect_max_attack_pro: "攻擊時，打出最大攻擊的機率 + ",
            effect_max_defence: "武將最大防禦 + ",
            effect_max_defence_pro: "防守時，打出最大防禦的機率 + ",
            effect_min_attack: "武將最小攻擊 + ",
            effect_min_defence: "武將最小防禦 + ",
            effect_rm: "額外獲得元寶 + ",
            effect_sp: "體力恢復速度 + ",
            effect_vm: "額外獲得銀幣 + ",
            effect_xp: "額外獲得經驗 + ",
        },
        zh_cn: {
            attack: "增加攻击力 + ",
            defence: "增加防御力 + ",
            effect_ep: "精力恢复速度 + ",
            effect_max_attack: "武将最大攻击 + ",
            effect_max_attack_pro: "攻击时，打出最大攻击的概率 + ",
            effect_max_defence: "武将最大防御 + ",
            effect_max_defence_pro: "防守时，打出最大防御的概率 + ",
            effect_min_attack: "武将最小攻击 + ",
            effect_min_defence: "武将最小防御 + ",
            effect_rm: "额外获得元宝 + ",
            effect_sp: "体力恢复速度 + ",
            effect_vm: "额外获得银币 + ",
            effect_xp: "额外获得经验 + ",
        },
    };
    a.Mojo.lang.props = {
        zh_tw: {
            add_avoid_war: "使用【{{name}}】後，免戰時間重置為%hhu%mmu%ssu",
            add_ep: "使用【{{name}}】後，你的精力恢復了",
            add_null: "神馬都沒有增加，白費了",
            add_sp: "使用【{{name}}】後，你的體力恢復了",
            add_vm: "使用【{{name}}】後，你的銀幣增加了",
            avoid_war_time: "免戰時間：%hhu %mmu %ssu",
            buy_props_fail_title: "購買失敗",
            buy_props_please: "請先購買道具！",
            buy_props_success: "購買成功！",
            buy_props_success_content: "您購買的商品已經放入您的包裹中。",
            buy_props_success_title: "購買成功",
            buy_warning_content: "主公～我軍要購入此東東嗎？",
            buy_warning_title: "購買確認",
            first_add_avoid_war: "使用【{{name}}】後，免戰時間為%hhu%mmu%ssu",
            goto_payment: "去加值",
            player_ep_max: "主公體力充沛，不用再補啦。",
            player_sp_max: "主公精力充沛，不用再補啦。",
            priceless: "無價之寶，不可購買",
            props: "道具",
            props_detail_title: "道具詳細資訊",
            sure_avoid_war_time_content: "主公~我軍現在還有免戰時間，如果使用{{name}}，則免戰時間將重置。你確定要使用嗎？",
            sure_avoid_war_time_title: "免戰時間重置",
            sure_buy: "確定購買",
            think_again: "再想想",
            unit: "天",
            use_props_fail: "道具使用失敗",
            use_props_success: "道具使用成功",
        },
        zh_cn: {
            add_avoid_war: "使用【{{name}}】后，免战时间重置为%hhu%mmu%ssu",
            add_ep: "使用【{{name}}】后，你的精力恢复了",
            add_null: "啥都没有增加，白费了",
            add_sp: "使用【{{name}}】后，你的体力恢复了",
            add_vm: "使用【{{name}}】后，你的银币增加了",
            avoid_war_time: "免战时间：%hhu %mmu %ssu",
            buy_props_fail_title: "购买失败",
            buy_props_please: "请先购买道具！",
            buy_props_success: "购买成功！",
            buy_props_success_content: "您购买的商品已经放入您的包裹中。",
            buy_props_success_title: "购买成功",
            buy_warning_content: "主公～我军要购入此东东吗？",
            buy_warning_title: "购买确认",
            first_add_avoid_war: "使用【{{name}}】后，免战时间为%hhu%mmu%ssu",
            goto_payment: "去充值",
            player_ep_max: "主公体力充沛，不用再补啦。",
            player_sp_max: "主公精力充沛，不用再补啦。",
            priceless: "无价之宝",
            props: "道具",
            props_detail_title: "道具详细信息",
            sure_avoid_war_time_content: "主公~我军现在还有免战时间，如果使用{{name}}，则免战时间将重置。你确定要使用吗？",
            sure_avoid_war_time_title: "免战时间重置",
            sure_buy: "确定购买",
            think_again: "再想想",
            unit: "天",
            use_props_fail: "道具使用失败",
            use_props_success: "道具使用成功",
        },
    };
    a.Mojo.lang.mall = {
        zh_tw: {
            buy: "購買",
            buy_entity_content: "主公～您購買的東東已經放入包裹，可以從【首頁-卡牌】中查收～",
            buy_fail_title: "購買失敗！",
            buy_props_content: "主公～您購買的東東已經放入包裹，可以從【首頁-道具】中查收～",
            buy_rm: "購買元寶",
            buy_success_body: "PS:您購買的東東已經放入包裹。",
            buy_success_title: "購買成功",
            buy_vm: "購買銀幣",
            buy_warning_content: "主公～我軍要購入此東東嗎？",
            buy_warning_title: "購買確認",
            continue_mall: "繼續購物",
            discount_goods_flag: "%<br/>折扣",
            discount_goods_flag_new: "{{:discount}}折",
            go_accept: "查收",
            go_payment: "去加值",
            go_vm: "去換錢",
            goods_detail_title: "商品資訊",
            has_buy: "已購買",
            hot_goods_flag: "熱賣",
            need_rm: "主公～您的元寶不夠啦，荷包存點錢再來吧！",
            need_vm: "主公～您的銀幣不夠啦，荷包存點錢再來吧！",
            new_goods_flag: "新品",
            open_minis_result: "開啟扭蛋",
            open_minis_tip: "主公～您扭出了【{{name}}】，可以從【首頁-卡牌】中查收～",
            open_minis_tip1: "主公～您扭出了【{{name}}】，可以從【首頁-圖鑒-活動】中查收～",
            play_minis: "打開扭蛋",
            price_title: "{{name}}商城售價：",
            sure_buy: "確定購買",
            tavern_update_time: "酒館更新倒數計時 %hhu %mmu %ssu",
            think_again: "再想想",
            wait_buy_result: "待收貨",
        },
        zh_cn: {
            buy: "购买",
            buy_entity_content: "主公～您购买的东东已经放入包裹，可以从【首页-卡牌】中查收～",
            buy_fail_title: "购买失败！",
            buy_props_content: "主公～您购买的东东已经放送达，可以从【商城-道具】中查收～",
            buy_rm: "购买元宝",
            buy_success_body: "PS:您购买的东东已经放入包裹。",
            buy_success_title: "购买成功",
            buy_vm: "购买银币",
            buy_warning_content: "主公～我军要购入此东东吗？",
            ytinfo1: "%20%E5%94%AE%E4%BB%B7",
            ytinfo2: "%20%E6%9C%AC%E6%AC%A1%E5%B7%B2%E8%B4%AD%E4%B9%B0%20",
            ytbar: "%E9%85%92%E9%A6%86",
            buy_warning_title: "购买确认",
            continue_mall: "继续购物",
            discount_goods_flag: "%<br/>折扣",
            discount_goods_flag_new: "{{:discount}}折",
            go_accept: "查收",
            go_payment: "去充值",
            go_vm: "去换钱",
            goods_detail_title: "商品信息",
            has_buy: "已购买",
            hot_goods_flag: "热卖",
            need_rm: "主公～您的元宝不够啦，攒点钱再来吧！",
            need_vm: "主公～您的银币不够啦，攒点钱再来吧！",
            new_goods_flag: "新品",
            open_minis_result: "开启扭蛋",
            open_minis_tip: "主公～您扭出了【{{name}}】，可以从【首页-卡牌】中查收～",
            open_minis_tip1: "主公～您扭出了【{{name}}】，可以从【首页-图鉴-活动】中查收～",
            play_minis: "打开扭蛋",
            price_title: "{{name}}商城售价：",
            sure_buy: "确定购买",
            tavern_update_time: "酒馆更新倒计时 %hhu %mmu %ssu",
            think_again: "再想想",
            wait_buy_result: "待收货",
        },
    }
})(window, jQuery);
(function (a, c, d) {
    a.Mojo = a.Mojo || {};
    var b = a.Mojo.app = a.Mojo.app || {};
    b.baseUrl = "/mojo";
    b.isNd = false;
    b.data = b.data || {
        entityCategory: {
            groups: [],
            types: [],
            rarities: [],
            orders: [],
        },
    };
    b.pageParams = b.pageParams || {};
    b.redirect = function (g, n, e, l, k, m) {
        var f = g + ((n != d || e != d) ? "?" : "");
        for (key in n) {
            f += (key + "=" + n[key] + "&")
        }
        if (e != d) {
            var h = "__track_" + e + "_";
            if (l != d) {
                f += (h + "object__=" + l);
                if (k != d) {
                    f += ("&" + h + "action__=" + k);
                    if (m != d) {
                        f += ("&" + h + "remark__=" + m)
                    }
                }
            }
        }
        a.location.href = b.baseUrl + f
    };
    b.request = function (k) {
        var e = location.href;
        var h = e.substring(e.indexOf("?") + 1, e.length).split("&");
        var f = {};
        for (i = 0; j = h[i]; i++) {
            f[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length)
        }
        var g = f[k.toLowerCase()];
        if (typeof (g) == "undefined") {
            return ""
        } else {
            return g
        }
    };
    b.booleanStorage = function (e, f) {
        if (f == d) {
            return localStorage[e] == d || localStorage[e] == 1
        }
        localStorage[e] = f ? 1 : 0
    };
    b.saveStorage = function (e, f) {
        if (!window.localStorage) {
            return false
        }
        localStorage[e] = f
    };
    b.getStorage = function (e) {
        if (!window.localStorage) {
            return false
        }
        return localStorage[e]
    };
    b.clearStorage = function () {
        if (!window.localStorage) {
            return false
        }
        localStorage.clear()
    };
    b.getUserLanguage = function () {
        var e = b.getStorage("user_language");
        if (e == d || e == "") {
            if (b.data.userLanguage == d || b.data.userLanguage == null || b.data.userLanguage == "") {
                e = "zh_cn"
            } else {
                e = b.data.userLanguage
            }
        }
        return e
    };
    b.getServerNode = function () {
        if (b.getStorage("single_server") == "true" || b.isNewVersion() == false) {
            return null
        }
        if (b.serverNode != d) {
            var f = b.serverNode;
            if (f.regionId == f.userRegionId) {
                f.signal = "good"
            } else {
                var e = Math.random() * 100;
                if (e < 50) {
                    f.signal = "bad"
                } else {
                    f.signal = "normal"
                }
            } if (parseInt(f.regionId) == 1) {
                f.platform = Mojo.utils.locale("common", "weibo")
            } else {
                f.platform = Mojo.utils.locale("common", "facebook")
            }
            switch (parseInt(f.groupId)) {
            case 1:
                f.flag = "new";
                break;
            case 2:
                f.flag = "hot";
                break;
            case 3:
                f.flag = "simple";
                break;
            case 4:
                f.flag = "full";
                break;
            case 5:
                f.flag = "expire";
                break;
            default:
                f.flag = "simple";
                break
            }
            return f
        }
        return null
    };
    b.isNewVersion = function () {
        if (b.data.userLanguage == "ko_kr") {
            return true
        }
        var f = b.getStorage("is_new_version");
        var g;
        if (f == d || b.clientVersion != d) {
            if (b.isNd) {
                g = "1.0.1"
            } else {
                g = "1.2"
            }
            var k = g.split(".");
            if (b.clientVersion != d) {
                var e = b.clientVersion.split(".");
                for (var h = 0; h < e.length; h++) {
                    if (h >= k.length || e[h] > k[h]) {
                        b.saveStorage("is_new_version", true);
                        return true
                    } else {
                        if (e[h] == k[h]) {
                            continue
                        } else {
                            break
                        }
                    }
                }
            }
            return false
        }
        if (f != d) {
            return true
        }
    };
    b.getPlatform = function () {
        var e = Mojo.app.getStorage("user_region");
        if (e == "overseas" || b.data.userLanguage == "ko_kr" || b.data.userLanguage == "zh_tw") {
            return "facebook"
        } else {
            return "sina"
        }
    }, b.bgSound = function (e) {
        return b.booleanStorage("settings-bg-sound", e)
    };
    b.effectSound = function (e) {
        return b.booleanStorage("settings-effect-sound", e)
    };
    b.splash = function (e) {
        return b.booleanStorage("settings-splash", e)
    };
    b.currentPage = d;
    b.refreshCurrentProfile = function () {
        if (b.currentPage != d) {
            b.currentPage.refreshProfile()
        }
    };
    b.facebook = {};
    b.facebook.call = function (f) {
        if (window.FB) {
            Mojo.app.facebook.init(Mojo.app.fbparams);
            f(window.FB)
        } else {
            if (!window.fbAsyncInit) {
                window.fbAsyncInit = function () {
                    Mojo.app.facebook.init(Mojo.app.fbparams);
                    f(window.FB)
                }
            }
            var g, h = "facebook-jssdk",
                e = document.getElementsByTagName("script")[0];
            if (document.getElementById(h)) {
                Mojo.app.facebook.init(Mojo.app.fbparams);
                f(window.FB)
            } else {
                g = document.createElement("script");
                g.id = h;
                g.async = true;
                g.src = "//connect.facebook.net/en_US/all.js";
                e.parentNode.insertBefore(g, e)
            }
        }
    };
    b.facebook.init = function (e) {
        if (!window.FB) {
            return
        }
        if (Mojo.app.hasInitFacebookSDK == true) {
            return
        }
        Mojo.app.hasInitFacebookSDK = true;
        FB.init(e)
    };
    b.facebook.login = function () {
        var f = a.location.href.indexOf("?");
        if (f > 0) {
            callback_url = a.location.href.substring(0, f)
        } else {
            callback_url = a.location.href
        }
        var e = "https://www.facebook.com/dialog/oauth?";
        e += ("client_id=" + Mojo.app.data.facebookAppId + "&");
        e += ("redirect_uri=" + callback_url + "&");
        e += ("response_type=token&");
        e += ("scope=publish_stream&");
        a.location.href = e
    };
    b.facebook.logout = function (e) {
        Mojo.app.facebook.call(function (f) {
            f.getLoginStatus(function (g) {
                if (g.authResponse) {
                    f.logout(e)
                } else {
                    e()
                }
            })
        })
    };
    b.weibo = {};
    b.weibo.login = function () {
        var f = a.location.href.indexOf("?");
        if (f > 0) {
            callback_url = a.location.href.substring(0, f)
        } else {
            callback_url = a.location.href
        }
        callback_url = callback_url + "?";
        var e = "https://api.weibo.com/oauth2/authorize?";
        e += ("client_id=" + b.weibo.appKey + "&");
        e += ("redirect_uri=" + callback_url + "&");
        e += ("response_type=token&");
        e += ("display=" + b.weibo.display + "&");
        a.location.href = e
    };
    b.weibo.logout = function (e) {
        _options = {
            access_token: "",
            errorFunc: c.noop,
            successFunc: c.noop,
            failedFunc: c.noop,
        };
        c.extend(_options, e);
        c.ajax({
            url: "https://api.weibo.com/2/account/end_session.json",
            cache: false,
            dataType: "jsonp",
            type: "get",
            data: {
                access_token: _options.access_token,
            },
            error: function () {
                _options.errorFunc()
            },
            success: function (g, h, f) {
                if (g.code == 1) {
                    _options.successFunc(g.data)
                } else {
                    _options.failedFunc()
                }
            },
        })
    };
    b.weibo.showUser = function (e) {
        _options = {
            access_token: "",
            uid: 0,
            errorFunc: c.noop,
            successFunc: c.noop,
            failedFunc: c.noop,
        };
        c.extend(_options, e);
        c.ajax({
            url: "https://api.weibo.com/2/users/show.json",
            cache: false,
            dataType: "jsonp",
            type: "get",
            data: {
                access_token: _options.access_token,
                uid: _options.uid,
            },
            error: function () {
                _options.errorFunc()
            },
            success: function (g, h, f) {
                if (g.code == 1) {
                    _options.successFunc(g.data)
                } else {
                    _options.failedFunc()
                }
            },
        })
    };
    b.weibo.statusesUpdate = function (e) {
        _options = {
            access_token: "",
            status: "",
            errorFunc: c.noop,
            successFunc: c.noop,
            failedFunc: c.noop,
        };
        c.extend(_options, e);
        c.ajax({
            url: "https://api.weibo.com/2/statuses/update.json",
            cache: false,
            dataType: "json",
            type: "post",
            data: {
                access_token: _options.access_token,
                status: _options.status,
            },
            error: function () {
                _options.errorFunc()
            },
            success: function (g, h, f) {
                if (g.code == 1) {
                    _options.successFunc()
                } else {
                    _options.failedFunc()
                }
            },
        })
    };
    b.weibo.friendshipsShow = function (e) {
        _options = {
            access_token: "",
            source_id: "",
            target_id: "",
            errorFunc: c.noop,
            successFunc: c.noop,
            failedFunc: c.noop,
        };
        c.extend(_options, e);
        c.ajax({
            url: "https://api.weibo.com/2/friendships/show.json",
            cache: false,
            dataType: "jsonp",
            type: "get",
            data: {
                access_token: _options.access_token,
                source_id: _options.source_id,
                target_id: _options.target_id,
            },
            error: function () {
                _options.errorFunc()
            },
            success: function (g, h, f) {
                if (g.code == 1) {
                    _options.successFunc(g.data)
                } else {
                    _options.failedFunc()
                }
            },
        })
    };
    b.weibo.friendshipsCreate = function (e) {
        _options = {
            access_token: "",
            uid: "",
            errorFunc: c.noop,
            successFunc: c.noop,
            failedFunc: c.noop,
        };
        c.extend(_options, e);
        c.ajax({
            url: "https://api.weibo.com/2/friendships/create.json",
            cache: false,
            dataType: "json",
            type: "post",
            data: {
                access_token: _options.access_token,
                uid: _options.uid,
            },
            error: function () {
                _options.errorFunc()
            },
            success: function (g, h, f) {
                if (g.code == 1) {
                    _options.successFunc()
                } else {
                    _options.failedFunc()
                }
            },
        })
    };
    b.toast = b.toast || {
        show: function (k, g, h) {
            var e = g || 2000;
            var f = this;
            if (this._status == 0) {
                if (h) {
                    this._element.hide()
                } else {
                    this._element.show()
                }
                this._element.appendTo(c(document.body)).css({
                    zIndex: 2000
                }).html(k);
                this._status = 1
            } else {
                a.clearTimeout(this._timer);
                this._element.html(k)
            }
            Mojo.utils.bottom(this._element);
            this._timer = a.setTimeout(function () {
                f._hide()
            }, e)
        },
        _hide: function () {
            var e = this;
            e._element.fadeOut("slow", function () {
                e._element.remove();
                e._status = 0
            })
        },
        _element: c('<div class="toast"></div>'),
        _status: 0,
        _timer: 0,
    };
    b.tutorial = d;
    b.dialog = d
})(window, jQuery);
(function (a, c, d) {
    a.Mojo = a.Mojo || {};
    var b = a.Mojo.ajax = function (f, k, l, g, e) {
        if (e && e.showWait === true) {
            Mojo.utils.showWait(true)
        }
        var h = Mojo.app.getUserLanguage();
        c.ajax({
            url: b.baseUrl + "/ajax" + f,
            cache: false,
            dataType: "json",
            type: "post",
            data: k,
            timeout: 20000,
            headers: {
                gamelanguage: h,
                Signature: localStorage.mojo_sign
            },
            error: function (m, o, n) {
                if (e && e.showWait === true) {
                    Mojo.utils.showWait(false)
                }
                if (e && e.showToast == false) {} else {
                    Mojo.app.toast.show(Mojo.utils.locale("common", "bad network"))
                } if (Mojo.app.tutorial == "__NAV__") {
                    Mojo.gap.highlightMenuItem(-1)
                } else {
                    if (typeof (Mojo.app.tutorial) == "object" && Mojo.app.tutorial.close) {
                        Mojo.app.tutorial.close(true)
                    }
                } if (g != d && g != null) {
                    g()
                }
            },
            success: function (o, p, n) {
                if (e && e.showWait === true) {
                    Mojo.utils.showWait(false)
                }
                if (l !== d && l != null) {
                    l(o)
                }
                if (o && o.event != d && o.event != null) {
                    for (index in o.event) {
                        var m = o.event[index];
                        if (m.name == "level.up") {
                            Mojo.gap.levelupAnimationPlay();
                            a.setTimeout(function (q) {
                                (new Mojo.com.LevelUpDialog(q.data)).open()
                            }, 500, m)
                        } else {
                            if (m.name == "weibo.create" && m.expire == 0) {
                                if (m.data.manual_mode == 0) {
                                    a.setTimeout(function (q) {
                                        (new Mojo.com.WeiboPublishDialog({
                                            access_token: q.data.access_token,
                                        }, {
                                            defaultText: q.data.content,
                                            appendix: q.data.download_url,
                                        })).open()
                                    }, 500, m)
                                }
                            } else {
                                if (m.name == "facebook.create" && m.expire == 0) {
                                    if (m.data.manual_mode == 0) {
                                        a.setTimeout(function (q) {
                                            (new Mojo.com.FacebookFeedDialog({
                                                access_token: q.data.access_token,
                                            }, {
                                                defaultTitle: q.data.title,
                                                defaultText: q.data.content,
                                                appendix: q.data.download_url,
                                            })).open()
                                        }, 500, m)
                                    }
                                }
                            }
                        }
                    }
                }
            },
        })
    };
    b.baseUrl = "/mojo"
})(window, jQuery);
(function (a, c, d) {
    a.Mojo = a.Mojo || {};
    var b = a.Mojo.gap = a.Mojo.gap || {};
    a.Mojo.gap.Bridge = Class.extend({
        init: function (e) {
            this._options = c.extend(true, {
                device: "",
                bgSound: true,
                effectSound: true,
            }, e || {})
        },
        _execNativeCode: function () {},
        soundPlay: function (f, e, g) {},
        soundStop: function () {},
        battleAnimationPlay: function (e, f) {},
        niudanAnimationPlay: function (e) {},
        intensifyAnimationPlay: function () {},
        levelupAnimationPlay: function () {},
        compositeAnimationPlay: function () {},
        purchase: function (e, f) {},
        settings: function (f, e) {},
        highlightMenuItem: function (e) {},
        tutorialCallback: function (e) {},
        rechargeCallback: function () {},
        clearCache: function () {},
        bindUser: function (e) {},
        showMallIcon: function () {},
        hideMallIcon: function () {},
        openTpCenter: function () {},
        selectServer: function (e) {},
        setLanguage: function (e) {},
        getClientVersion: function () {
            this._execNativeCode("system/clientversion")
        },
        clientVersionCallback: function () {},
        openurl: function (e) {},
        bindPlayerIdToDevice: function () {},
        clearlogincookie: function () {},
        showbattleskip: function () {}
    });
    a.Mojo.gap.IOSBridge = a.Mojo.gap.Bridge.extend({
        init: function (e) {
            this._super(e);
            this._bridge = c("<iframe></iframe>").hide().attr("width", "0px").attr("height", "0px").attr("frameborder", "0").appendTo(c(document.body))
        },
        _execNativeCode: function (e) {
            this._bridge.attr("src", "mojo://" + e)
        },
        soundPlay: function (f, e, g) {
            if (this._options.effectSound) {
                g = g == d ? "mp3" : g;
                e = e == d ? 0 : e;
                this._execNativeCode("media/soundplay/" + f + "," + g + "," + e)
            }
        },
        soundStop: function () {
            this._execNativeCode("media/soundstop")
        },
        battleAnimationPlay: function (e, f) {
            if (e == d || e == null) {
                playerImgs = "null&null&null"
            } else {
                if (e.length == 3) {
                    playerImgs = e[0] + "&" + e[1] + "&" + e[2]
                } else {
                    if (e.length == 2) {
                        playerImgs = e[0] + "&" + e[1] + "&null"
                    } else {
                        if (e.length == 1) {
                            playerImgs = "null&" + e[0] + "&null"
                        } else {
                            playerImgs = "null&null&null"
                        }
                    }
                }
            } if (f == d || f == null) {
                oppImgs = "null&null&null"
            } else {
                if (f.length == 3) {
                    oppImgs = f[0] + "&" + f[1] + "&" + f[2]
                } else {
                    if (f.length == 2) {
                        oppImgs = f[0] + "&" + f[1] + "&null"
                    } else {
                        if (f.length == 1) {
                            oppImgs = "null&" + f[0] + "&null"
                        } else {
                            oppImgs = "null&null&null"
                        }
                    }
                }
            }
            this._execNativeCode("media/playBattleAnimation/" + playerImgs + "," + oppImgs)
        },
        niudanAnimationPlay: function (e) {
            this._execNativeCode("media/playNiudanAnimation/" + e)
        },
        intensifyAnimationPlay: function () {
            this._execNativeCode("media/playIntensifyAnimation")
        },
        levelupAnimationPlay: function () {},
        compositeAnimationPlay: function () {
            this._execNativeCode("media/playCompositeAnimation")
        },
        purchase: function (e, f) {
            this._execNativeCode("iap/purchase/" + e + "," + f)
        },
        settings: function (f, e) {
            if (f == "bg-sound") {
                if (e == true) {
                    this._execNativeCode("media/enablebgmusic")
                } else {
                    this._execNativeCode("media/disablebgmusic")
                }
            } else {
                if (f == "effect-sound") {
                    if (e == true) {
                        this._execNativeCode("media/enableeffectsound")
                    } else {
                        this._execNativeCode("media/disableeffectsound")
                    }
                }
            }
        },
        highlightMenuItem: function (e) {
            this._execNativeCode("tutorial/highlightmenuitem/" + e)
        },
        tutorialCallback: function (e) {
            if (Mojo.app.tutorial != d && Mojo.app.tutorial != null) {
                Mojo.app.tutorial.done()
            }
        },
        rechargeCallback: function () {},
        clearCache: function () {
            this._execNativeCode("system/clearcache")
        },
        bindUser: function (e) {
            this._execNativeCode("system/binduser/" + e)
        },
        showMallIcon: function () {
            this._execNativeCode("system/showmallicon")
        },
        hideMallIcon: function () {
            this._execNativeCode("system/hidemallicon")
        },
        openTpCenter: function () {
            this._execNativeCode("system/opentpcenter")
        },
        selectServer: function (e) {
            e = e.replace(/:\/\//g, ",").replace(/\//g, ",");
            this._execNativeCode("system/selectserver/" + e)
        },
        setLanguage: function (e) {
            this._execNativeCode("system/setlanguage/" + e)
        },
        getClientVersion: function () {
            this._execNativeCode("system/clientversion")
        },
        clientVersionCallback: function () {},
        openurl: function (e) {
            e = e.replace(/:\/\//g, ",").replace(/\//g, ",");
            this._execNativeCode("system/openurl/" + e)
        },
        bindPlayerIdToDevice: function (e) {
            this._execNativeCode("system/bindplayeridtodevice/" + e)
        },
        clearlogincookie: function () {
            this._execNativeCode("system/clearlogincookie")
        },
        showbattleskip: function () {
            this._execNativeCode("media/showbattleskip")
        }
    });
    a.Mojo.gap.AndroidBridge = a.Mojo.gap.Bridge.extend({
        init: function (e) {
            this._super(e)
        },
        _execNativeCode: function (e) {},
        soundPlay: function (f, e, g) {
            if (this._options.effectSound) {
                g = g == d ? "mp3" : g;
                window.MojoGapHandler.playSound("a_" + f + "." + g)
            }
        },
        soundStop: function () {},
        battleAnimationPlay: function (e, f) {
            if (e == d || e == null) {
                playerImgs = "null&null&null"
            } else {
                if (e.length == 3) {
                    playerImgs = e[0] + "&" + e[1] + "&" + e[2]
                } else {
                    if (e.length == 2) {
                        playerImgs = e[0] + "&" + e[1] + "&null"
                    } else {
                        if (e.length == 1) {
                            playerImgs = "null&" + e[0] + "&null"
                        } else {
                            playerImgs = "null&null&null"
                        }
                    }
                }
            } if (f == d || f == null) {
                oppImgs = "null&null&null"
            } else {
                if (f.length == 3) {
                    oppImgs = f[0] + "&" + f[1] + "&" + f[2]
                } else {
                    if (f.length == 2) {
                        oppImgs = f[0] + "&" + f[1] + "&null"
                    } else {
                        if (f.length == 1) {
                            oppImgs = "null&" + f[0] + "&null"
                        } else {
                            oppImgs = "null&null&null"
                        }
                    }
                }
            }
            window.MojoGapHandler.playBattleAnimation(playerImgs, oppImgs)
        },
        niudanAnimationPlay: function (e) {
            window.MojoGapHandler.playNiuDanAnimation(e)
        },
        intensifyAnimationPlay: function () {
            window.MojoGapHandler.playIntensifyAnimation()
        },
        levelupAnimationPlay: function () {
            window.MojoGapHandler.playLevelupAnimation()
        },
        compositeAnimationPlay: function () {
            window.MojoGapHandler.playCompositeAnimation()
        },
        purchase: function (e, f) {},
        settings: function (f, e) {
            if (f == "bg-sound") {
                if (e == true) {
                    window.MojoGapHandler.enableBgMusic()
                } else {
                    window.MojoGapHandler.disableBgMusic()
                }
            } else {
                if (f == "effect-sound") {
                    if (e == true) {
                        window.MojoGapHandler.enableEffectSound()
                    } else {
                        window.MojoGapHandler.disableEffectSound()
                    }
                }
            }
        },
        highlightMenuItem: function (e) {},
        tutorialCallback: function (e) {},
        rechargeCallback: function () {},
        clearCache: function () {},
        bindUser: function (e) {},
        showMallIcon: function () {},
        hideMallIcon: function () {},
        openTpCenter: function () {},
        selectServer: function (e) {},
        setLanguage: function (e) {},
        getClientVersion: function () {},
        clientVersionCallback: function () {},
        openurl: function (e) {},
        bindPlayerIdToDevice: function () {},
        clearlogincookie: function () {},
    });
    b.init = function (e) {
        var e = c.extend(true, {
            device: "",
            bgSound: true,
            effectSound: true,
        }, e || {});
        b.device = e.device;
        if (e.device == "iphone") {
            a.Mojo.gap = new a.Mojo.gap.IOSBridge(e)
        } else {
            if (e.device == "ipad") {
                a.Mojo.gap = new a.Mojo.gap.IOSBridge(e)
            } else {
                if (e.device == "andriod") {
                    a.Mojo.gap = new a.Mojo.gap.AndroidBridge(e)
                } else {
                    e.device = "iphone";
                    a.Mojo.gap = new a.Mojo.gap.IOSBridge(e)
                }
            }
        }
        a.Mojo.gap.device = e.device
    }
})(window, jQuery);
(function (a, c, d) {
    a.Mojo = a.Mojo || {};
    var b = a.Mojo.track = a.Mojo.track || {};
    a.Mojo.track.Client = Class.extend({
        init: function (e) {
            var e = c.extend(true, {
                appKey: "1322184698308194",
                ruid: "",
                channel: "html",
            }, e || {});
            this._c = new trackClient(e.appKey);
            this._c.setChannel(e.channel);
            this._c.setRuid(e.ruid)
        },
        _valid: function (f, e) {
            if (Mojo.app.data.track == d) {
                return true
            }
            if (Mojo.app.data.track[f] != d) {
                return Mojo.app.data.track[f][e] != d
            }
            return false
        },
        sendData: function (f, e) {
            this._c.sendData(f == d ? true : false, e)
        },
        onEvent: function (f, h, k, g, e) {
            if (!this._valid("events", f)) {
                return
            }
            this._c.onEvent(f, h, k, g == d ? true : false, e)
        },
        onBuy: function (f, g, k, h, e) {
            if (!this._valid("buys", f)) {
                return
            }
            this._c.onBuy(f, g, k, h == d ? true : false, e)
        },
        onSell: function (f, g, k, h, e) {
            if (!this._valid("sells", f)) {
                return
            }
            this._c.onSell(f, g, k, h == d ? true : false, e)
        },
    });
    b.init = function (e) {
        a.Mojo.track = new a.Mojo.track.Client(e)
    }
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.Page = a.Mojo.Object.extend({
        init: function (f, e) {
            this._super(f, e);
            this.element().addClass("mojo-page");
            Mojo.app.currentPage = this;
            var d = this;
            if (this._options.broadcast) {
                this.broadcast = new Mojo.com.Broadcast();
                this.element().append(this.broadcast.element())
            }
            if (this._options.baseProfile) {
                this.baseProfile = new Mojo.com.BaseProfile({
                    refreshCallback: function (g) {
                        d._baseProfileCallback(g)
                    }
                });
                this.element().append(this.baseProfile.element())
            }
            if (this._options.fightProfile) {
                this.fightProfile = new Mojo.com.FightProfile({
                    refreshCallback: function (g) {
                        d._fightProfileCallback(g)
                    }
                });
                this.element().append(this.fightProfile.element())
            }
            $(document.body).append(this.element());
            this._pageTrack()
        },
        _getDefaultOptions: function () {
            return {
                broadcast: true,
                baseProfile: false,
                fightProfile: false,
            }
        },
        load: function () {
            var d = this;
            if (this._options.baseProfile) {
                d.baseProfile.sync()
            }
            if (this._options.fightProfile) {
                d.fightProfile.sync()
            }
            Mojo.app.toast.show("", 10, true)
        },
        contentViewportHeight: function () {
            return $(window).height() - (this._options.broadcast ? this.broadcast.element().outerHeight() : 0) - (this._options.baseProfile ? this.baseProfile.element().outerHeight() : 0) - (this._options.fightProfile ? this.fightProfile.element().outerHeight() : 0) - 5
        },
        _pageTrack: function () {
            if (Mojo.utils.getFromParams("__track_event_object__") != c) {
                Mojo.track.onEvent(Mojo.utils.getFromParams("__track_event_object__"), Mojo.utils.getFromParams("__track_event_action__"), Mojo.utils.getFromParams("__track_event_remark__"))
            }
            if (Mojo.utils.getFromParams("__track_buy_object__") != c) {
                Mojo.track.onBuy(Mojo.utils.getFromParams("__track_buy_object__"), Mojo.utils.getFromParams("__track_buy_action__"), Mojo.utils.getFromParams("__track_buy_remark__"))
            }
            if (Mojo.utils.getFromParams("__track_sell_object__") != c) {
                Mojo.track.onSell(Mojo.utils.getFromParams("__track_sell_object__"), Mojo.utils.getFromParams("__track_sell_action__"), Mojo.utils.getFromParams("__track_sell_remark__"))
            }
        },
        _fightProfileCallback: function (d) {},
        _baseProfileCallback: function (d) {},
        refreshProfile: function () {
            if (this.baseProfile != c) {
                this.baseProfile.sync()
            }
            if (this.fightProfile != c) {
                this.fightProfile.sync()
            }
        },
        clsname: function () {
            return "Page"
        }
    })
})(window, jQuery);
(function ($) {
    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
    $.toJSON = typeof JSON === "object" && JSON.stringify ? JSON.stringify : function (o) {
        if (o === null) {
            return "null"
        }
        var type = typeof o;
        if (type === "undefined") {
            return undefined
        }
        if (type === "number" || type === "boolean") {
            return "" + o
        }
        if (type === "string") {
            return $.quoteString(o)
        }
        if (type === "object") {
            if (typeof o.toJSON === "function") {
                return $.toJSON(o.toJSON())
            }
            if (o.constructor === Date) {
                var month = o.getUTCMonth() + 1,
                    day = o.getUTCDate(),
                    year = o.getUTCFullYear(),
                    hours = o.getUTCHours(),
                    minutes = o.getUTCMinutes(),
                    seconds = o.getUTCSeconds(),
                    milli = o.getUTCMilliseconds();
                if (month < 10) {
                    month = "0" + month
                }
                if (day < 10) {
                    day = "0" + day
                }
                if (hours < 10) {
                    hours = "0" + hours
                }
                if (minutes < 10) {
                    minutes = "0" + minutes
                }
                if (seconds < 10) {
                    seconds = "0" + seconds
                }
                if (milli < 100) {
                    milli = "0" + milli
                }
                if (milli < 10) {
                    milli = "0" + milli
                }
                return '"' + year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds + "." + milli + 'Z"'
            }
            if (o.constructor === Array) {
                var ret = [];
                for (var i = 0; i < o.length; i++) {
                    ret.push($.toJSON(o[i]) || "null")
                }
                return "[" + ret.join(",") + "]"
            }
            var name, val, pairs = [];
            for (var k in o) {
                type = typeof k;
                if (type === "number") {
                    name = '"' + k + '"'
                } else {
                    if (type === "string") {
                        name = $.quoteString(k)
                    } else {
                        continue
                    }
                }
                type = typeof o[k];
                if (type === "function" || type === "undefined") {
                    continue
                }
                val = $.toJSON(o[k]);
                pairs.push(name + ":" + val)
            }
            return "{" + pairs.join(",") + "}"
        }
    };
    $.evalJSON = typeof JSON === "object" && JSON.parse ? JSON.parse : function (src) {
        return eval("(" + src + ")")
    };
    $.secureEvalJSON = typeof JSON === "object" && JSON.parse ? JSON.parse : function (src) {
        var filtered = src.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "");
        if (/^[\],:{}\s]*$/.test(filtered)) {
            return eval("(" + src + ")")
        } else {
            throw new SyntaxError("Error parsing JSON, source is not valid.")
        }
    };
    $.quoteString = function (string) {
        if (string.match(escapeable)) {
            return '"' + string.replace(escapeable, function (a) {
                var c = meta[a];
                if (typeof c === "string") {
                    return c
                }
                c = a.charCodeAt();
                return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
            }) + '"'
        }
        return '"' + string + '"'
    }
})(jQuery);
(function (a, b) {
    a.Mojo = a.Mojo || {};
    a.Mojo.cache = a.Mojo.cache || {
        set: function (e, d, c) {
            var f = {
                val: d,
                expire: c != undefined ? (new Date().getTime() / 1000 + c) : -1,
            };
            localStorage.setItem(e, b.toJSON(f))
        },
        get: function (c) {
            var d = localStorage.getItem(c);
            if (d && d != "" && d != undefined) {
                d = b.parseJSON(d);
                if (d.expire == -1 || d.expire >= (new Date().getTime() / 1000)) {
                    return d.val
                }
            }
            return undefined
        },
        remove: function (c) {
            localStorage.remove(c)
        }
    }
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.Broadcast = a.Mojo.Object.extend({
        clsname: function () {
            return "com.Broadcast"
        },
        init: function (e) {
            this._super("com-broadcast", e);
            this.element().addClass("mojo-com-broadcast");
            this.element().append('<div class="icon"></div>');
            this._wrapper = b('<div class="wrapper"></div>').appendTo(this.element());
            var d = this;
            this._interval = a.setInterval(function () {
                d.sync()
            }, 300000);
            this._index = 0;
            this._run()
        },
        _run: function () {
            if (this._data == c || this._data == null || this._data.length == 0) {
                this._running = false;
                this.sync()
            } else {
                this._running = true;
                var d = this;
                if (this._index >= this._data.length) {
                    this._index = 0
                }
                this._current = this._data[this._index];
                var e = this._genItem(this._current);
                this["_display" + this._options.display](e)
            }
        },
        _display0: function (e) {
            var d = this;
            e.animate({
                left: -e.width(),
            }, {
                duration: (e.width() + d._wrapper.width()) * 40,
                complete: function () {
                    b(this).remove();
                    d._index = parseInt((d._index + 1) % d._data.length);
                    d._run()
                },
            })
        },
        _display1: function (e) {
            var d = this;
            e.animate({
                top: "-=" + d._wrapper.height(),
            }, {
                duration: 1000,
                complete: function () {
                    if (b(this).position().top + b(this).height() > d._wrapper.height()) {
                        setTimeout(function () {
                            d._display1(e)
                        }, 2000)
                    } else {
                        b(this).delay(3000).animate({
                            opacity: 0,
                        }, {
                            duration: 1000,
                            complete: function () {
                                b(this).remove();
                                d._index = parseInt((d._index + 1) % d._data.length);
                                d._run()
                            }
                        })
                    }
                },
            })
        },
        _genItem: function (d) {
            if (this._options.display == 0) {
                return b('<div class="item">' + d.content + "</div>").appendTo(this._wrapper).css("left", this._wrapper.width()).css("top", 0)
            }
            return b('<div class="item">' + d.content + "</div>").appendTo(this._wrapper).css("left", 0).css("top", this._wrapper.height())
        },
        _getDefaultOptions: function () {
            return {
                display: 1,
            }
        },
        sync: function () {
            var d = this;
            var e = Mojo.cache.get("broadcast");
            if (e != c) {
                d._data = e;
                if (!d._running) {
                    d._run()
                }
            } else {
                Mojo.ajax("/message/broadcast", {
                    start: 0,
                    count: 1,
                }, function (f) {
                    if (f.errorCode == 0) {
                        d._data = f.data;
                        Mojo.cache.set("broadcast", d._data, 300);
                        if (!d._running) {
                            d._run()
                        }
                    }
                })
            }
        },
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.WeiboPublishDialog = a.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.WeiboPublishDialog"
        },
        init: function (e, d) {
            this._data = e;
            this._super(c, d);
            this.element().addClass("mojo-com-weibopublishdlg");
            this._addContent();
            this._addHandleButtons()
        },
        _addContent: function () {
            var d = this;
            var f = d._options.hintText;
            var h = d._options.maxlength;
            if (d._options.appendix != "") {
                h = h - parseInt(d._options.appendix.length) - 1
            }
            var e = h;
            if (d._options.defaultText != "") {
                f = d._options.defaultText;
                e = e - parseInt(d._options.defaultText.length)
            }
            var g = b("<div class='paragraph'></div>").appendTo(this._content);
            _bonus = b('<div class="bonus"></div>').html(Mojo.utils.locale("weibo", "weibo bonus")).appendTo(g);
            d._tip = b('<div class="words-tip"></div>').html(e).appendTo(g);
            _border = b('<div class="border"></div>').appendTo(g);
            _content = b('<form name="form" method="post" action=""><textarea name="textarea" maxlength="' + h + '" id="message-content" cols="45" rows="5">' + f + "</textarea></form>").appendTo(_border);
            _textarea = this._content.find("textarea").focus(function () {
                if (this.value == d._options.hintText) {
                    this.value = ""
                }
            });
            _textarea.bind("input propertychange", function () {
                var k = b(this).attr("maxlength");
                var l = b(this).val().length;
                if (l <= k) {
                    d._tip.html(k - l);
                    return true
                } else {
                    b(this).val(b(this).val().substring(0, k));
                    return false
                }
            })
        },
        _addHandleButtons: function () {
            var d = this;
            d._sendBtn = new Mojo.ui.Button(c, {
                special: "button-big-red",
                text: Mojo.utils.locale("ui", "Send"),
                click: function () {
                    d._sendBtn.disable(true);
                    var e = b("#message-content").val();
                    if (e == d._options.hintText) {
                        e = ""
                    }
                    if (d._options.appendix != "") {
                        e = e + " " + d._options.appendix
                    }
                    if (Mojo.utils.trim(e) == "") {
                        Mojo.app.toast.show(Mojo.utils.locale("weibo", "Please input weibo content"));
                        d._sendBtn.disable(false);
                        return
                    }
                    Mojo.app.weibo.statusesUpdate({
                        access_token: d._data.access_token,
                        status: e,
                        errorFunc: function () {
                            Mojo.app.toast.show(Mojo.utils.locale("weibo", "Send Success"));
                            d.close();
                            Mojo.ajax("/player/weiboPublish", {}, function (f) {
                                Mojo.app.refreshCurrentProfile();
                                d.afterPublish()
                            })
                        },
                        successFunc: function () {
                            Mojo.app.toast.show(Mojo.utils.locale("weibo", "Send Success"));
                            d.close();
                            Mojo.ajax("/player/weiboPublish", {}, function (f) {
                                Mojo.app.refreshCurrentProfile();
                                d.afterPublish()
                            })
                        },
                        failedFunc: function () {
                            d.close();
                            Mojo.ajax("/player/weiboPublish", {}, function (f) {
                                d.afterPublish()
                            })
                        },
                    })
                },
            });
            this._footer.append(d._sendBtn.element());
            this._footer.append((new Mojo.ui.Button(c, {
                text: Mojo.utils.locale("common", "close"),
                click: function () {
                    d.close();
                    d.afterPublish()
                },
            })).element())
        },
        afterPublish: function () {},
        _getDefaultOptions: function () {
            return b.extend(true, this._super(), {
                title: Mojo.utils.locale("weibo", "Send weibo"),
                maxlength: 140,
                hintText: Mojo.utils.locale("weibo", "Please input weibo content"),
                defaultText: "",
                appendix: "",
                zIndex: 1100,
            })
        },
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.FacebookFeedDialog = a.Mojo.ui.Dialog.extend({
        init: function (e, d) {
            this._data = e;
            this._super(c, d);
            this.element().addClass("mojo-com-facebookfeeddlg");
            this._addContent();
            this._addHandleButtons()
        },
        _addContent: function () {
            var d = this;
            var e = d._options.hintText;
            if (d._options.defaultText != "") {
                e = d._options.defaultText
            }
            _bonus = b('<div class="bonus"></div>').html(Mojo.utils.locale("facebook", "weibo bonus")).appendTo(this._content);
            _border = b('<div class="border"></div>').appendTo(this._content);
            _content = b('<form name="form" method="post" action=""><textarea name="textarea" " id="message-content" cols="45" rows="5">' + e + "</textarea></form>").appendTo(_border);
            _textarea = this._content.find("textarea").focus(function () {
                if (this.value == d._options.hintText) {
                    this.value = ""
                }
            })
        },
        _addHandleButtons: function () {
            var d = this;
            d._sendBtn = new Mojo.ui.Button(c, {
                special: "button-big-red",
                text: Mojo.utils.locale("ui", "Send"),
                click: function () {
                    d._sendBtn.disable(true);
                    var f = b("#message-content").val();
                    if (f == d._options.hintText) {
                        f = ""
                    }
                    var e = "";
                    if (d._options.appendix != "") {
                        e = d._options.appendix
                    }
                    if (Mojo.utils.trim(f) == "") {
                        Mojo.app.toast.show(Mojo.utils.locale("facebook", "Please input weibo content"));
                        d._sendBtn.disable(false);
                        return
                    }
                    var g = {
                        caption: d._options.defaultTitle,
                        name: d._options.defaultTitle,
                        picture: d._getImgurl(),
                        link: e,
                        description: d._options.defaultText,
                        access_token: d._data.access_token,
                        actions: [{
                            name: "go to sanguo",
                            link: e
                        }],
                    };
                    FB.api("/me/feed", "post", g, function (h) {
                        if (h && h.id) {
                            Mojo.ajax("/player/weiboPublish", {}, function (k) {
                                Mojo.app.refreshCurrentProfile()
                            })
                        } else {}
                        d.close()
                    })
                },
            });
            this._footer.append(d._sendBtn.element());
            this._footer.append((new Mojo.ui.Button(c, {
                text: Mojo.utils.locale("common", "close"),
                click: function () {
                    d.close();
                    d.afterPublish()
                },
            })).element())
        },
        afterPublish: function () {},
        _getImgurl: function () {
            var g = location.href;
            var e = g.indexOf("/mojo");
            var d = g.substring(0, e);
            var f = d + "/mojo/resources/classic/mobile/image/ui/icon.jpg";
            if (Mojo.app.data.userLanguage == "zh_tw") {
                f = d + "/mojo/resources/classic/mobile/image/ui/icon-tw.jpg"
            }
            return f
        },
        _getDefaultOptions: function () {
            return b.extend(true, this._super(), {
                title: Mojo.utils.locale("facebook", "Send weibo"),
                hintText: Mojo.utils.locale("facebook", "Please input feed content"),
                defaultTitle: "",
                defaultText: "",
                appendix: "",
                zIndex: 1100,
            })
        },
        debugable: function () {
            return Mojo.utils.debug.vars.com.weibopublishdlg
        },
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.WeiboExpireDialog = a.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.WeiboExpireDialog"
        },
        init: function (d) {
            this._super(c, d);
            this.element().addClass("mojo-com-weiboexpiredlg");
            this._addContent();
            this._addHandleButtons()
        },
        _addContent: function () {
            var d = this;
            _message = b('<div class="paragraph"></div>').html(Mojo.utils.locale("weibo", "expire message")).appendTo(this._content)
        },
        _addHandleButtons: function () {
            var d = this;
            this._footer.append((new Mojo.ui.Button("login-btn", {
                special: "button-big-red",
                text: Mojo.utils.locale("weibo", "go login"),
                click: function () {
                    Mojo.app.redirect("/settings");
                    d.close()
                },
            })).element());
            this._footer.append((new Mojo.ui.Button("close-btn", {
                text: Mojo.utils.locale("common", "close"),
                click: function () {
                    d.close()
                },
            })).element())
        },
        _getDefaultOptions: function () {
            return b.extend(true, this._super(), {
                title: Mojo.utils.locale("weibo", "Your weibo account has expired!"),
                zIndex: 1100,
            })
        },
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.WeiboBindDialog = a.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.WeiboBindDialog"
        },
        init: function (d) {
            this._super(c, d);
            this.element().addClass("mojo-com-weibobinddlg");
            this._addContent();
            this._addHandleButtons()
        },
        _addContent: function () {
            var d = this;
            _message = b('<div class="paragraph"></div>').html(Mojo.utils.locale("weibo", "bind message")).appendTo(this._content)
        },
        _addHandleButtons: function () {
            var d = this;
            this._footer.append((new Mojo.ui.Button("bind-btn", {
                special: "button-big-red",
                text: Mojo.utils.locale("weibo", "go bind"),
                click: function () {
                    Mojo.app.redirect("/settings");
                    d.close()
                },
            })).element());
            this._footer.append((new Mojo.ui.Button("close-btn", {
                text: Mojo.utils.locale("common", "close"),
                click: function () {
                    d.close()
                },
            })).element())
        },
        _getDefaultOptions: function () {
            return b.extend(true, this._super(), {
                title: Mojo.utils.locale("weibo", "bind title"),
                zIndex: 1100,
            })
        },
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.FacebookExpireDialog = a.Mojo.ui.Dialog.extend({
        init: function (d) {
            this._super(c, d);
            this.element().addClass("mojo-com-facebookexpiredlg");
            this._addContent();
            this._addHandleButtons()
        },
        _addContent: function () {
            var d = this;
            _message = b('<div class="paragraph"></div>').html(d.locale("expire message")).appendTo(this._content)
        },
        _addHandleButtons: function () {
            var d = this;
            this._footer.append((new Mojo.ui.Button("login-btn", {
                special: "button-big-red",
                text: d.locale("go login"),
                click: function () {
                    Mojo.app.redirect("/settings");
                    d.close()
                },
            })).element());
            this._footer.append((new Mojo.ui.Button("close-btn", {
                text: Mojo.utils.locale("common", "close"),
                click: function () {
                    d.close()
                },
            })).element())
        },
        _getDefaultOptions: function () {
            var d = this;
            return b.extend(true, this._super(), {
                title: d.locale("Your weibo account has expired!"),
                zIndex: 1100,
            })
        },
        localeCat: function () {
            return "facebook"
        },
        debugable: function () {
            return Mojo.utils.debug.vars.com.facebookexpiredlg
        },
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.FacebookBindDialog = a.Mojo.ui.Dialog.extend({
        init: function (d) {
            this._super(c, d);
            this.element().addClass("mojo-com-facebookbinddlg");
            this._addContent();
            this._addHandleButtons()
        },
        _addContent: function () {
            var d = this;
            _message = b('<div class="paragraph"></div>').html(d.locale("bind message")).appendTo(this._content)
        },
        _addHandleButtons: function () {
            var d = this;
            this._footer.append((new Mojo.ui.Button("bind-btn", {
                special: "button-big-red",
                text: d.locale("go bind"),
                click: function () {
                    Mojo.app.redirect("/settings");
                    d.close()
                },
            })).element());
            this._footer.append((new Mojo.ui.Button("close-btn", {
                text: Mojo.utils.locale("common", "close"),
                click: function () {
                    d.close()
                },
            })).element())
        },
        _getDefaultOptions: function () {
            var d = this;
            return b.extend(true, this._super(), {
                title: d.locale("bind title"),
                zIndex: 1100,
            })
        },
        localeCat: function () {
            return "facebook"
        },
        debugable: function () {
            return Mojo.utils.debug.vars.com.facebookbinddlg
        },
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.PlatformButton = a.Mojo.ui.Button.extend({
        init: function (e, d) {
            this._super(c, d);
            this._event = e;
            this.element().addClass("mojo-com-platformbtn");
            this._initData();
            this._addContent()
        },
        _initData: function () {
            var d = this;
            if (d._event != c && d._event != null) {
                for (index in d._event) {
                    if (d._event[index].name == "weibo.create" || d._event[index].name == "facebook.create") {
                        d._options.access_token = d._event[index].data.access_token;
                        d._options.defaultText = d._event[index].data.content;
                        d._options.expire = d._event[index].expire;
                        d._options.appendix = d._event[index].data.download_url;
                        d._options.defaultTitle = d._event[index].data.title
                    }
                }
            }
        },
        _addContent: function () {
            var g = this;
            g._platform = Mojo.app.getPlatform();
            console.log(g._platform);
            if (Mojo.app.getPlatform() == "facebook") {
                g.element().find(".icon").addClass("fb")
            }
            var d = (g._platform == "sina" ? Mojo.utils.locale("weibo", "Send weibo") : Mojo.utils.locale("facebook", "Send weibo"));
            g.text(d);
            var h = g._options.defaultText || g._options.content;
            var e = g._options.defaultTitle || g._options.title;
            var f = g._options.appendix || g._options.download_url;
            g.click(function () {
                g._options.btnClick();
                if (g._options.access_token != null && g._options.access_token != "") {
                    if (g._options.expire == 1) {
                        if (g._platform == "facebook") {
                            (new Mojo.com.FacebookExpireDialog()).open(true)
                        } else {
                            (new Mojo.com.WeiboExpireDialog()).open(true)
                        }
                    } else {
                        if (g._platform == "facebook") {
                            (new Mojo.com.FacebookFeedDialog({
                                access_token: g._options.access_token,
                            }, {
                                defaultText: h,
                                appendix: f,
                                defaultTitle: e
                            })).open(true)
                        } else {
                            (new Mojo.com.WeiboPublishDialog({
                                access_token: g._options.access_token,
                            }, {
                                defaultText: h,
                                appendix: f
                            })).open(true)
                        }
                    }
                } else {
                    if (g._platform == "facebook") {
                        (new Mojo.com.FacebookBindDialog()).open(true)
                    } else {
                        (new Mojo.com.WeiboBindDialog()).open(true)
                    }
                }
            })
        },
        _getDefaultOptions: function () {
            return b.extend(true, this._super(), {
                text: "",
                special: "button-big-red",
                btnClick: b.noop,
                icon: Mojo.app.getPlatform() == "facebook",
                textWrap: Mojo.app.getPlatform() == "facebook"
            })
        },
        debugable: function () {
            return Mojo.utils.debug.vars.com.platformbtn
        },
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.BaseProfileDialog = a.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.BaseProfileDialog"
        },
        init: function (e) {
            this._super("com-profile-base-dialog", e);
            this.element().addClass("mojo-com-profile-base-dialog");
            var d = this;
            this._interval = a.setInterval(function () {
                d._refresh()
            }, 1000);
            this._tips = b('<div class="paragraph"></div>').appendTo(this._content);
            this._refresh();
            this._footer.append((new Mojo.ui.Button(c, {
                special: "button-big-red",
                text: Mojo.utils.locale("common", "Go Statistics"),
                click: function () {
                    Mojo.app.redirect("/statistics", {}, "event", "04_022")
                },
            })).element());
            this._footer.append((new Mojo.ui.Button(c, {
                text: Mojo.utils.locale("common", "close"),
                click: function () {
                    d.close()
                },
            })).element())
        },
        _getDefaultOptions: function () {
            return b.extend(true, this._super(), {
                dataProvider: b.noop,
                title: Mojo.utils.locale("ui", "Base Informations"),
                close: function () {
                    a.clearInterval(self._interval)
                }
            })
        },
        _refresh: function () {
            var d = this._options.dataProvider();
            this._tips.empty();
            this._genTooltip(d)
        },
        _genTooltip: function (f) {
            new Mojo.ui.Label(c, {
                classes: ["name"],
                text: Mojo.utils.locale("common", "name") + f.name
            }).element().appendTo(this._tips);
            new Mojo.ui.Label(c, {
                classes: ["level"],
                text: Mojo.utils.locale("common", "level") + f.level
            }).element().appendTo(this._tips);
            if (f.xp > f.next_xp) {
                f.xp = f.next_xp
            }
            new Mojo.ui.Label(c, {
                classes: ["xp"],
                text: Mojo.utils.locale("common", "xp") + f.xp + "/" + f.next_xp
            }).element().appendTo(this._tips);
            new Mojo.ui.Label(c, {
                classes: ["rm"],
                text: Mojo.utils.locale("common", "rm") + f.rm
            }).element().appendTo(this._tips);
            new Mojo.ui.Label(c, {
                classes: ["vm"],
                text: Mojo.utils.locale("common", "vm") + f.vm
            }).element().appendTo(this._tips);
            new Mojo.ui.Label(c, {
                classes: ["grain"],
                text: Mojo.utils.locale("common", "grain") + f.grain
            }).element().appendTo(this._tips);
            new Mojo.ui.Label(c, {
                classes: ["ep"],
                text: Mojo.utils.locale("common", "ep") + f.ep + "/" + f.energy
            }).element().appendTo(this._tips);
            var e = Mojo.utils.locale("common", "time for next ep") + this._genEpRestore(f) + "<br>" + Mojo.utils.locale("common", "time for all ep") + this._genEpFullRestore(f) + (f.ep_percent > 0 ? ("<br>" + Mojo.utils.locale("common", "acceleration for restore ep") + f.ep_percent + "%") : "");
            b("<span class='time-for-ep'></span>").appendTo(this._tips).html(e);
            new Mojo.ui.Label(c, {
                classes: ["sp"],
                text: Mojo.utils.locale("common", "sp") + f.sp + "/" + f.stamina
            }).element().appendTo(this._tips);
            var d = Mojo.utils.locale("common", "time for next sp") + this._genSpRestore(f) + "<br>" + Mojo.utils.locale("common", "time for all sp") + this._genSpFullRestore(f) + (f.sp_percent > 0 ? ("<br>" + Mojo.utils.locale("common", "acceleration for restore sp") + f.sp_percent + "%") : "");
            b("<span class='time-for-sp'></span>").html(d).appendTo(this._tips);
            new Mojo.ui.Label(c, {
                classes: ["avoid_war_time"],
                text: Mojo.utils.locale("common", "avoid war time", {
                    avoid_war_time: Mojo.utils.formatTime(f.avoid_war_time)
                })
            }).element().appendTo(this._tips)
        },
        _genSpRestore: function (d) {
            if (d.sp == d.stamina) {
                str = Mojo.utils.locale("common", "has reached the maximum")
            } else {
                str = Mojo.utils.formatTime(d.sp_second)
            }
            return str
        },
        _genSpFullRestore: function (d) {
            if (d.sp == d.stamina) {
                str = Mojo.utils.locale("common", "has reached the maximum")
            } else {
                str = Mojo.utils.formatTime((d.stamina - d.sp - 1) * d.sp_restore_pp + d.sp_second)
            }
            return str
        },
        _genEpRestore: function (d) {
            if (d.ep == d.energy) {
                str = Mojo.utils.locale("common", "has reached the maximum")
            } else {
                str = Mojo.utils.formatTime(d.ep_second)
            }
            return str
        },
        _genEpFullRestore: function (d) {
            if (d.ep == d.energy) {
                str = Mojo.utils.locale("common", "has reached the maximum")
            } else {
                str = Mojo.utils.formatTime((d.energy - d.ep - 1) * d.ep_restore_pp + d.ep_second)
            }
            return str
        },
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.BaseProfile = a.Mojo.Object.extend({
        clsname: function () {
            return "com.BaseProfile"
        },
        init: function (e) {
            this._super("com-profile-base", e);
            this.element().addClass("mojo-com-profile-base");
            this.element().append('<div class="left"></div><div class="center"></div><div class="right"></div>');
            this._addLeft();
            this._addCenter();
            this._addRight();
            var d = this;
            this._data = {};
            this._syncInterval = a.setInterval(function () {
                d.sync()
            }, 60000);
            this._restoreInterval = a.setInterval(function () {
                d._calcEp();
                d._calcSp();
                d._calcAvoidWarTime()
            }, 1000);
            this.element().click(function () {
                Mojo.track.onEvent("04_021");
                (new Mojo.com.BaseProfileDialog({
                    dataProvider: function () {
                        return d._data
                    }
                })).open()
            })
        },
        _getDefaultOptions: function () {
            return {
                refreshCallback: b.noop,
            }
        },
        _addLeft: function () {
            var d = this.element().find(".left");
            this._name = b('<div class="name"></div>').appendTo(d);
            this._level = b('<div class="level">0</div>').appendTo(d);
            this._xp = new Mojo.ui.Progress(c, {
                classes: ["xp"],
                labelTemplate: "#{divide}",
            });
            this._xp.element().appendTo(d);
            b('<div class="xp-border"></div>').appendTo(d)
        },
        _addCenter: function () {
            this._rm = new Mojo.ui.Label(c, {
                classes: ["rm"],
                text: "0",
            });
            this._vm = new Mojo.ui.Label(c, {
                classes: ["vm"],
                text: "0",
            });
            this.element().find(".center").append(this._rm.element()).append(this._vm.element())
        },
        _addRight: function () {
            this._ep = new Mojo.ui.Progress(c, {
                classes: ["ep"],
                labelTemplate: "#{divide}",
            });
            this._sp = new Mojo.ui.Progress(c, {
                classes: ["sp"],
                labelTemplate: "#{divide}",
            });
            this.element().find(".right").append(this._ep.element()).append(b('<div class="ep-border"></div>')).append(this._sp.element()).append(b('<div class="sp-border"></div>'))
        },
        _refresh: function () {
            var d = this._data;
            this._name.html(d.name);
            this._level.html(d.level);
            if (parseInt(d.xp) > parseInt(d.next_xp)) {
                d.xp = d.next_xp
            }
            this._xp.value({
                value: d.xp,
                max: d.next_xp
            });
            this._rm.text(d.rm);
            this._vm.text(d.vm);
            this._ep.value({
                value: d.ep,
                max: d.energy
            });
            this._sp.value({
                value: d.sp,
                max: d.stamina
            });
            this._options.refreshCallback(d)
        },
        epRefresh: function (d) {
            this._data.ep = d;
            this._ep.value({
                value: this._data.ep,
                max: this._data.energy
            })
        },
        data: function (g) {
            if (g == c) {
                return this._data
            }
            this._data = b.extend(true, this._data, g);
            this._refresh();
            if (!Mojo.utils.isNone(g.event)) {
                var d = g.event;
                var e = d.type;
                if (e == 15) {
                    var f = b('<div class="paragraph"></div>').html(Mojo.utils.locale("common", "forcewar_notice_members1", {
                        title: d.title,
                        ownername: d.userName,
                        forcename: d.opponentForceName
                    }));
                    var h = new Mojo.ui.Dialog(c, {
                        classes: ["mojo-com-forcemsgdlg"],
                        title: Mojo.utils.locale("common", "force_message"),
                        content: f
                    });
                    new Mojo.ui.Button(c, {
                        special: "button-big-red",
                        text: Mojo.utils.locale("ui", "In War"),
                        click: function () {
                            Mojo.app.redirect("/force", {
                                index: 2
                            })
                        }
                    }).element().appendTo(h._footer);
                    new Mojo.ui.Button(c, {
                        text: Mojo.utils.locale("ui", "View More"),
                        click: function () {
                            Mojo.app.redirect("/force", {
                                index: 5
                            })
                        }
                    }).element().appendTo(h._footer);
                    h.open()
                } else {
                    if (e == 11) {
                        var f = b('<div class="paragraph"></div>').html(Mojo.utils.locale("common", "forcewar_win_grain", {
                            forcename: d.opponentForceName,
                            grain: d.grainCount
                        }));
                        var h = new Mojo.ui.Dialog(c, {
                            title: Mojo.utils.locale("common", "force_message"),
                            content: f
                        });
                        new Mojo.ui.Button(c, {
                            special: "button-big-red",
                            text: Mojo.utils.locale("ui", "View More"),
                            click: function () {
                                Mojo.app.redirect("/force", {
                                    index: 5
                                })
                            }
                        }).element().appendTo(h._footer);
                        new Mojo.ui.Button(c, {
                            text: Mojo.utils.locale("ui", "Close"),
                            click: function () {
                                h.close()
                            }
                        }).element().appendTo(h._footer);
                        h.open()
                    } else {
                        if (e == 13) {
                            var f = b('<div class="paragraph"></div>').html(Mojo.utils.locale("common", "forcewar_lose_grain", {
                                forcename: d.opponentForceName,
                                grain: d.grainCount
                            }));
                            var h = new Mojo.ui.Dialog(c, {
                                title: Mojo.utils.locale("common", "force_message"),
                                content: f
                            });
                            new Mojo.ui.Button(c, {
                                special: "button-big-red",
                                text: Mojo.utils.locale("ui", "Retaliate"),
                                click: function () {
                                    Mojo.app.redirect("/force", {
                                        index: 2,
                                        target_force_id: d.attacker_id
                                    })
                                }
                            }).element().appendTo(h._footer);
                            new Mojo.ui.Button(c, {
                                text: Mojo.utils.locale("ui", "View More"),
                                click: function () {
                                    Mojo.app.redirect("/force", {
                                        index: 5
                                    })
                                }
                            }).element().appendTo(h._footer);
                            h.open()
                        }
                    }
                }
            }
        },
        sync: function (e) {
            var d = this;
            Mojo.ajax("/player/profile", {}, function (f) {
                if (f.errorCode == 0) {
                    d.data(f.data)
                }
            })
        },
        _calcEp: function () {
            if (this._data.ep < this._data.energy) {
                if (this._data.ep_second < 0) {
                    this._data.ep_second = this._data.ep_restore_pp;
                    return
                }
                this._data.ep_second--;
                if (this._data.ep_second == 0) {
                    this._data.ep_second = this._data.ep_restore_pp;
                    this._data.ep++;
                    this._refresh()
                }
            }
        },
        _calcSp: function () {
            if (this._data.sp < this._data.stamina) {
                if (this._data.sp_second < 0) {
                    this._data.sp_second = this._data.sp_restore_pp;
                    return
                }
                this._data.sp_second--;
                if (this._data.sp_second == 0) {
                    this._data.sp_second = this._data.sp_restore_pp;
                    this._data.sp++;
                    this._refresh()
                }
            }
        },
        _calcAvoidWarTime: function () {
            if (this._data.avoid_war_time > 0) {
                this._data.avoid_war_time--
            }
        },
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.SmallEntity = a.Mojo.Object.extend({
        clsname: function () {
            return "com.SmallEntity"
        },
        init: function (e, d) {
            this._data = e;
            this._super(c, d);
            this.element().addClass("mojo-com-entity-small");
            this.element().append('<div class="minis-flag"></div>');
            this._refresh();
            this._initEvent()
        },
        _refresh: function () {
            var d = this;
            if (this._data instanceof Object) {
                this._setCard()
            } else {
                if (this._data instanceof String) {
                    Mojo.ajax("/detail", {
                        id: this._data,
                        pid: this._options.pid
                    }, function (e) {
                        if (e && e.errorCode === 0) {
                            d._data = e.data;
                            d._setCard()
                        }
                    })
                }
            }
            this._setMinisFlag();
            if (this._options.callback instanceof Function) {
                this._options.callback(this)
            }
        },
        _setCard: function () {
            var d = this;
            b("<img />").addClass("card-image-url").bind("load", function () {
                d.element().find(".card-image-url").show()
            }).hide().prependTo(this.element()).attr({
                src: this._data.small_image
            })
        },
        _setMinisFlag: function () {
            if (this._data && this._data.type_id && Mojo.utils.isWhat(this._data.type_id, "minis")) {
                if (Mojo.utils.isWhat(this._data.entity_type_id, "general")) {
                    this.element().find(".minis-flag").addClass("minis-flag-type-gp-" + this._data.entity_group_id).show()
                } else {
                    this.element().find(".minis-flag").addClass("minis-flag-type-" + this._data.entity_type_id).show()
                }
            } else {
                this.element().find(".minis-flag").hide()
            }
        },
        _initEvent: function () {
            var d = this;
            this.element().bind("click", function () {
                if (d._options.click instanceof Function) {
                    d._options.click(d)
                }
            })
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.Entity = a.Mojo.Object.extend({
        clsname: function () {
            return "com.Entity"
        },
        init: function (f, e, d) {
            this.data = e;
            this._super(f, d)
        },
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.LargeEntity = a.Mojo.com.Entity.extend({
        clsname: function () {
            return "com.LargeEntity"
        },
        init: function (f, e) {
            this._super(c, f, e);
            this._entityEffectText = {
                attack_max: {
                    text: Mojo.utils.locale("largeentity", "attack"),
                    unit: ""
                },
                attack_min: {
                    text: Mojo.utils.locale("largeentity", "attack"),
                    unit: ""
                },
                defence_max: {
                    text: Mojo.utils.locale("largeentity", "defence"),
                    unit: ""
                },
                defence_min: {
                    text: Mojo.utils.locale("largeentity", "defence"),
                    unit: ""
                },
                xp_value: {
                    text: Mojo.utils.locale("largeentity", "effect_xp"),
                    unit: ""
                },
                xp_percent: {
                    text: Mojo.utils.locale("largeentity", "effect_xp"),
                    unit: "%"
                },
                rm_value: {
                    text: Mojo.utils.locale("largeentity", "effect_rm"),
                    unit: ""
                },
                rm_percent: {
                    text: Mojo.utils.locale("largeentity", "effect_rm"),
                    unit: "%"
                },
                vm_value: {
                    text: Mojo.utils.locale("largeentity", "effect_vm"),
                    unit: ""
                },
                vm_percent: {
                    text: Mojo.utils.locale("largeentity", "effect_vm"),
                    unit: "%"
                },
                ep_percent: {
                    text: Mojo.utils.locale("largeentity", "effect_ep"),
                    unit: "%"
                },
                sp_percent: {
                    text: Mojo.utils.locale("largeentity", "effect_sp"),
                    unit: "%"
                },
                max_attack_percent: {
                    text: Mojo.utils.locale("largeentity", "effect_max_attack_pro"),
                    unit: "%"
                },
                max_defence_percent: {
                    text: Mojo.utils.locale("largeentity", "effect_max_defence_pro"),
                    unit: "%"
                },
                attack_max_percent: {
                    text: Mojo.utils.locale("largeentity", "effect_max_attack"),
                    unit: "%"
                },
                attack_min_percent: {
                    text: Mojo.utils.locale("largeentity", "effect_min_attack"),
                    unit: "%"
                },
                defence_max_percent: {
                    text: Mojo.utils.locale("largeentity", "effect_max_defence"),
                    unit: "%"
                },
                defence_min_percent: {
                    text: Mojo.utils.locale("largeentity", "effect_min_defence"),
                    unit: "%"
                }
            };
            this.element().addClass("mojo-com-entity-large");
            this._row1 = b('<div class="row"><div class="picture"></div></div>').appendTo(this.element());
            if (typeof f == "string") {
                var d = this;
                Mojo.ajax("/entity/detail", {
                    id: f,
                    pid: this._options.pid,
                    eid: this._options.eid,
                    rebirth_count: this._options.rebirthCount,
                }, function (g) {
                    if (g && g.errorCode === 0) {
                        d.data = g.data;
                        d._setPicture();
                        d._refresh()
                    } else {
                        d.data = c
                    } if (d._options.callback instanceof Function) {
                        d._options.callback(d)
                    }
                }, function () {
                    d.data = c;
                    if (d._options.callback instanceof Function) {
                        d._options.callback(d)
                    }
                })
            } else {
                if (typeof f == "object") {
                    this._setPicture();
                    this._refresh();
                    if (this._options.callback instanceof Function) {
                        this._options.callback(this)
                    }
                }
            }
        },
        _getEntityEffectText: function () {
            for (var d in this._entityEffectText) {
                if (this.data[d] && this.data[d] > 0) {
                    return this._entityEffectText[d].text + this.data[d] + this._entityEffectText[d].unit
                }
            }
            return ""
        },
        _setEntityEffectText: function () {
            if (this._options.showEntityEffect) {
                this._skills.append('<div class="paragraph">' + this._getEntityEffectText() + "</div>")
            }
        },
        _setPicture: function () {
            if (this._options.showDescription) {
                this._description = b('<div class="description mojo-com-entity-large--row--description">' + Mojo.utils.locale("ui", "Introduction") + ":<br>" + this.data.description + "</div>").appendTo(this._row1)
            }
            this._skills = b('<div class="row skills"></div>').hide().appendTo(this.element());
            if (this._options.showSkill) {
                this._skills.show()
            }
            this._row1.find(".picture").append('<img src="' + this.data.large_image + '" class="mojo-com-entity-large--row--img">').append('<div class="border"></div>').append('<div class="name mojo-com-entity-large--row--picture--name">' + this.data.name + "</div>").append('<div class="type"></div>').append('<div class="attributes mojo-com-entity-large--row--picture--attributes"></div>');
            this._row1.find(".picture > .name").addClass("rebirth-" + (this.data.rebirth_sum > 6 ? 6 : this.data.rebirth_sum))
        },
        _addAttributes: function () {
            if (parseInt(this.data.type_id) != 7 && parseInt(this.data.type_id) != 8 && this.data.level > 0) {
                this._row1.find(".attributes").append((this._xpProgress = new Mojo.ui.Progress(c, {
                    value: this.data.xp,
                    max: this.data.next_xp,
                    labelTemplate: "",
                    classes: ["mojo-com-entity-large--row--picture--attributes--mojo-ui-progress"],
                })).element()).append('<div class="level mojo-com-entity-large--row--picture--attributes--level">' + this.data.level + "</div>")
            }
            this._effects = b('<div class="effects mojo-com-entity-large--row--picture--attributes--effects"></div>').appendTo(this._row1.find(".attributes"));
            this.data.attack_max = parseInt(this.data.attack_max);
            this.data.attack_min = parseInt(this.data.attack_min);
            this.data.defence_max = parseInt(this.data.defence_max);
            this.data.defence_min = parseInt(this.data.defence_min);
            if (Mojo.utils.isWhat(this.data.type_id, "general")) {
                if (this.data.attack_max > 0) {
                    if (this.data.attack_max < this.data.attack_min) {
                        this.data.attack_max = this.data.attack_min
                    }
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-attack", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.attack_min + "-" + this.data.attack_max,
                    })).element())
                }
                if (this.data.defence_max > 0) {
                    if (this.data.defence_max < this.data.defence_min) {
                        this.data.defence_max = this.data.defence_min
                    }
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-defence", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.defence_min + "-" + this.data.defence_max,
                    })).element())
                }
            } else {
                if (this.data.attack_max > 0) {
                    if (this.data.attack_max < this.data.attack_min) {
                        this.data.attack_max = this.data.attack_min
                    }
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-attack", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.attack_min + "-" + this.data.attack_max,
                    })).element())
                }
                if (this.data.defence_max > 0) {
                    if (this.data.defence_max < this.data.defence_min) {
                        this.data.defence_max = this.data.defence_min
                    }
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-defence", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.defence_min + "-" + this.data.defence_max,
                    })).element())
                }
                if (this.data.xp_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-xp", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.xp_percent + "%",
                    })).element())
                }
                if (this.data.ep_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-ep", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.ep_percent + "%",
                    })).element())
                }
                if (this.data.sp_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-sp", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.sp_percent + "%",
                    })).element())
                }
                if (this.data.vm_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-vm", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.vm_percent + "%",
                    })).element())
                }
                if (this.data.max_attack_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-max-attack-percent", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.max_attack_percent + "%",
                    })).element())
                }
                if (this.data.max_defence_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-max-defence-percent", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.max_defence_percent + "%",
                    })).element())
                }
                if (this.data.attack_max_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-attack-max-percent", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.attack_max_percent + "%",
                    })).element())
                }
                if (this.data.attack_min_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-attack-min-percent", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.attack_min_percent + "%",
                    })).element())
                }
                if (this.data.defence_max_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-defence-max-percent", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.defence_max_percent + "%",
                    })).element())
                }
                if (this.data.defence_min_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(c, {
                        classes: ["effect-defence-min-percent", "mojo-com-entity-large--row--picture--attributes--mojo-ui-label"],
                        text: this.data.defence_min_percent + "%",
                    })).element())
                }
            }
        },
        _refresh: function () {
            if (parseInt(this.data.type_id) === 7 || parseInt(this.data.type_id) === 8) {
                this._row1.find(".picture").addClass("bg-level-other").addClass("mojo-com-entity-large--row--picture")
            } else {
                this._row1.find(".picture").addClass("bg-level-" + (parseInt((this.data.level - 1) / 10) + 1)).addClass("mojo-com-entity-large--row--picture")
            }
            this._row1.find(".picture > .rarity").addClass("star-rarity-" + this.data.rarity_id);
            this._row1.find(".picture > .border").addClass("border-rarity-" + (this.data.rarity_id ? this.data.rarity_id : "other")).addClass("mojo-com-entity-large--row--picture--border");
            if (this.data.group_id_1) {
                this._row1.find(".picture > .type").addClass("type-gp-" + this.data.group_id_1).addClass("type-gp-" + this.data.group_id_1 + "-" + Mojo.app.data.userLanguage).addClass("mojo-com-entity-large--row--picture--type").addClass("mojo-com-entity-large--row--picture--type-" + Mojo.app.data.userLanguage)
            } else {
                this._row1.find(".picture > .type").addClass("type-" + this.data.type_id).addClass("mojo-com-entity-large--row--picture--type").addClass("mojo-com-entity-large--row--picture--type-" + Mojo.app.data.userLanguage)
            } if (Mojo.utils.isWhat(this.data.type_id, "minis")) {
                var f = b("<div></div>").addClass("minis-flag").addClass("minis-flag-" + Mojo.app.data.userLanguage).appendTo(this._row1.find(".picture"));
                if (Mojo.utils.isWhat(this.data.entity_type_id, "general")) {
                    f.addClass("minis-flag-type-gp-" + this.data.entity_group_id).addClass("minis-flag-type-gp-" + this.data.entity_group_id + "-" + Mojo.app.data.userLanguage).show()
                } else {
                    f.addClass("minis-flag-type-" + this.data.entity_type_id).addClass("minis-flag-type-" + this.data.entity_type_id + "-" + Mojo.app.data.userLanguage).show()
                }
            }
            this._addAttributes();
            if (this._options.showSkill && this.data.skills) {
                skills = "";
                for (var e in this.data.skills) {
                    var d = this.data.skills[e];
                    skills += '<div class="paragraph">' + d.description + "</div>"
                }
                this._skills.html(skills)
            }
            if (Mojo.utils.isWhat(this.data.type_id, "mounts") || Mojo.utils.isWhat(this.data.type_id, "treasure")) {
                this._setEntityEffectText()
            }
            this.refresh()
        },
        refresh: function () {
            if (typeof this.data == "object") {
                if (this.data.is_max_level == 1) {
                    this._xpProgress.value(0)
                }
            }
        },
        _getDefaultOptions: function () {
            return b.extend(true, this._super(), {
                pid: "",
                eid: "",
                rebirthCount: 0,
                callback: c,
                showSkill: false,
                showDescription: true,
                showEntityEffect: true
            })
        },
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.Price = a.Mojo.Object.extend({
        clsname: function () {
            return "com.Price"
        },
        init: function (e, d) {
            this._data = e;
            this._super(c, d);
            this.element().addClass("mojo-com-goods-price");
            this.element().append('<div class="price-title"></div>');
            this.element().append('<div class="icon"></div>');
            this.element().append('<div class="before"></div>');
            this.element().append('<div class="now"></div>');
            this._refresh()
        },
        _refresh: function () {
            if (this._options.showTitle === true) {
                this.element().find(".price-title").html(this._options.priceTitle).show()
            } else {
                this.element().find(".price-title").hide()
            }
            var e = parseInt((this._data.discount ? this._data.discount : 100));
            var d = 0;
            if (this._data && this._data.rm && parseInt(this._data.rm) > 0) {
                this.element().find(".icon").removeClass("goods-vm-price").removeClass("goods-grain-price").addClass("goods-rm-price");
                d = this._data.rm
            } else {
                if (this._data && this._data.vm && parseInt(this._data.vm) > 0) {
                    this.element().find(".icon").removeClass("goods-rm-price").removeClass("goods-grain-price").addClass("goods-vm-price");
                    d = this._data.vm
                } else {
                    if (this._data && this._data.grain && parseInt(this._data.grain) > 0) {
                        this.element().find(".icon").removeClass("goods-rm-price").removeClass("goods-vm-price").addClass("goods-grain-price");
                        d = this._data.grain
                    } else {
                        this.element().find(".icon").addClass("none")
                    }
                }
            } if (e < 100) {
                this.element().find(".before").html(d)
            }
            if (parseInt(this._data.rm) > 0 || parseInt(this._data.vm) > 0 || parseInt(this._data.grain) > 0) {
                this.element().find(".now").html(parseInt((e * d) / 100))
            } else {
                this.element().find(".now").html(Mojo.utils.locale("props", "priceless"))
            }
        },
        _getDefaultOptions: function () {
            return {
                showTitle: true,
                priceTitle: Mojo.utils.locale("common", "price_title"),
            }
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.PaymentElement = a.Mojo.Object.extend({
        clsname: function () {
            return "com.PaymentElement"
        },
        init: function (e, d) {
            this._data = e;
            this._super(c, d);
            this._rmLabel = c;
            this._moneyLabel = c;
            this.element().addClass("mojo-com-payment-element").addClass("box-inner");
            if (parseInt(this._data.type) == 0) {
                this.element().addClass("payment-award")
            } else {
                this.element().addClass(Mojo.utils.getSomething("advertising") || this._options.advertising.status)
            }
            this._nameDiv = b('<div class="name"></div>').appendTo(this.element());
            this._prepaidDiv = b('<div class="prepaid"></div>').appendTo(this.element());
            this._advPrepaidDiv = b('<div class="advertising-prepaid"></div>').appendTo(this.element());
            this._descriptionDiv = b('<div class="description"></div>').appendTo(this.element());
            this._refresh()
        },
        _refresh: function () {
            var f = this;
            if (parseInt(this._data.type) == 0) {
                if (Mojo.utils.isNone(this._data.name) == false) {
                    this._nameDiv.html(this._data.name)
                }
            }
            if (Mojo.utils.isNone(this._data.description) == false) {
                this._descriptionDiv.html(this._data.description)
            }
            this._rmLabel = new Mojo.ui.Label(c, {
                text: this._data.rm
            });
            this._rmLabel.element().addClass("payment-rm-price").appendTo(this.element().find(".prepaid"));
            b('<div class="need"></div>').html("=").appendTo(this.element().find(".prepaid"));
            this._moneyLabel = new Mojo.ui.Label(c, {
                text: this._data.money
            });
            this._moneyLabel.element().addClass("payment-money-price").appendTo(this.element().find(".prepaid"));
            var e = Mojo.utils.locale("common", "buy");
            var g = false;
            if (parseInt(this._data.type) == 0) {
                if (parseInt(this._data.status) == 1) {
                    e = Mojo.utils.locale("mall", "has_buy");
                    g = true
                }
            }
            var d = (new Mojo.ui.Button(c, {
                text: e,
                special: "button-small-red",
                disabled: g,
                click: function () {
                    if (parseInt(f._data.type) == 0) {
                        d.disable(true);
                        d.text(Mojo.utils.locale("mall", "wait_buy_result"))
                    }
                    if (f._options.click instanceof Function) {
                        f._options.click(f._data)
                    }
                }
            }));
            d.element().addClass("payment-btn").appendTo(this.element());
            this._setAdvertising()
        },
        _setAdvertising: function () {
            var d = this._options.advertising.status;
            var e = this._data.discount_money;
            var d = Mojo.utils.getSomething("advertising") || d;
            var e = Mojo.utils.getSomething("discount") || e;
            if (d == "first" || d == "first_discount") {
                this._rmLabel.element().addClass("payment-before-price");
                new Mojo.ui.Label(c, {
                    text: parseInt((this._data.rm) * (isNaN(parseFloat(this._options.advertising.value)) ? 1 : parseFloat(this._options.advertising.value)))
                }).element().addClass("payment-rm-new-price").appendTo(this.element().find(".advertising-prepaid"))
            }
            if (d == "discount" || d == "first_discount") {
                this._moneyLabel.element().addClass("payment-before-price");
                new Mojo.ui.Label(c, {
                    text: e
                }).element().addClass("payment-money-new-price").appendTo(this.element().find(".advertising-prepaid"))
            }
        },
        _getDefaultOptions: function () {
            return {
                click: c,
                advertising: {}
            }
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.Goods = a.Mojo.Object.extend({
        clsname: function () {
            return "com.Goods"
        },
        init: function (f, e) {
            this._data = f;
            this._super("goods-" + f.id, e);
            this.element().addClass("mojo-com-goods").addClass("box-inner");
            this._goButtonLabelCat = e.goButtonLabelCat || "common";
            this._goButtonLabelKey = e.goButtonLabelKey || "buy";
            this._buyWarningTitleCat = e.buyWarningTitleCat || "mall";
            this._buyWarningTitleKey = e.buyWarningTitleKey || "buy_warning_title";
            this._buyWarningCat = e.buyWarningCat || "mall";
            this._buyWarningKey = e.buyWarningKey || "buy_warning_content";
            this._buyButtonLabelCat = e.buyButtonLabelCat || "mall";
            this._buyButtonLabelKey = e.buyButtonLabelKey || "sure_buy";
            this._levelInfo = e.levelInfo;
            this.hasColdDown = e.hasColdDown;
            this._coldDownWarning = e.coldDownWarning;
            this._exchangeClass = (e.exchangeClass != c ? e.exchangeClass : "go-buy-btn");
            this._card = c;
            this.element().append('<div class="goods-detail"></div>');
            var d = this;
            this._goButton = new Mojo.ui.Button(c, {
                text: Mojo.utils.locale(d._goButtonLabelCat, d._goButtonLabelKey),
                classes: ["go-button"],
                click: function () {
                    var h = "";
                    if (f.entity.type_id < 5) {
                        h = '<div class="tip"><span>' + f.name + decodeURI(Mojo.utils.locale("mall", "ytinfo1")) + (f.discount * f.vm) / 100 + decodeURI(Mojo.utils.locale("mall", "ytinfo2")) + '</span><span id="ytInfo">0</span></div>'
                    }
                    var g = new Mojo.ui.Dialog(c, {
                        title: Mojo.utils.locale(d._buyWarningTitleCat, d._buyWarningTitleKey),
                        content: b('<div class="tip">' + Mojo.utils.locale(d._buyWarningCat, d._buyWarningKey) + "</div>" + h),
                        deviceaware: true
                    });
                    new Mojo.ui.Button(c, {
                        text: Mojo.utils.locale(d._buyButtonLabelCat, d._buyButtonLabelKey),
                        special: "button-big-red",
                        click: function () {
                            if (f.entity.type_id >= 5) {
                                g.close()
                            }
                            if (d._options.onBuy instanceof Function) {
                                d._options.onBuy()
                            }
                        }
                    }).element().appendTo(g._footer);
                    new Mojo.ui.Button(c, {
                        text: '自动购买',
                        special: "button-big-red",
                        click: function () {
                            var _autointerval = a.setInterval(function () {
                                d._options.onBuy()
                            }, 1000)
                        }
                    }).element().appendTo(g._footer);
                    new Mojo.ui.Button(c, {
                        text: Mojo.utils.locale("common", "think_again"),
                        special: "button-big-blue",
                        click: function () {
                            g.close()
                        }
                    }).element().appendTo(g._footer);
                    g.open()
                },
                disableClick: function () {
                    if (d.hasColdDown && d.cd && d.cd > 0) {
                        Mojo.app.toast.show(d._coldDownWarning)
                    } else {
                        if (d._levelInfo) {
                            Mojo.app.toast.show(d._levelInfo.warning)
                        }
                    }
                },
                special: d._exchangeClass
            });
            this.element().append(this._goButton.element());
            if (this._levelInfo && this._levelInfo.level < this._levelInfo.unlockLevel) {
                this._goButton.disable(true)
            }
            this._setCard();
            this._setDetail();
            this._setAdvertising();
            this._initEvent()
        },
        _setCard: function () {
            var d = this;
            new Mojo.com.SmallEntity(this._data.entity, {
                callback: function (e) {
                    d._card = e;
                    e.element().addClass("image").prependTo(d.element())
                }
            })
        },
        _setDetail: function () {
            var d = this;
            b("<div></div>").addClass("goods-name").html(this._data.name).appendTo(this.element().find(".goods-detail"));
            b("<div></div>").addClass("goods-description").html(this._data.description).appendTo(this.element().find(".goods-detail"));
            if (this._levelInfo) {
                b("<div></div>").addClass("level-info").appendTo(this.element().find(".goods-detail"));
                b("<div></div>").addClass("level-title").html(this._levelInfo.title).appendTo(this.element().find(".level-info"));
                b("<div></div>").addClass("level-number").html(this._levelInfo.unlockLevel).appendTo(this.element().find(".level-info"))
            }
            var e = {};
            if (d._options.priceTitle != c) {
                e.priceTitle = d._options.priceTitle
            }(new Mojo.com.Price(this._data, e)).element().appendTo(this.element().find(".goods-detail"));
            if (this.hasColdDown && this._data.cold_down && this._data.cold_down > 0) {
                this.cd = this._data.cold_down;
                this.showCd()
            }
        },
        getDataId: function () {
            return this._data.id
        },
        showCd: function () {
            var d = this;
            if (d.cd == c || d.cd == 0) {
                return
            }
            this._goButton.disable(true);
            if (!d._lblCd) {
                d._lblCd = new Mojo.ui.Label(c, {
                    text: "",
                    classes: ["cd", "text-red"],
                });
                d._lblCd.element().appendTo(d.element().find(".goods-detail"))
            }
            d._lblCd.text(Mojo.utils.locale("common", "in_cd") + d._formatCDTime(d.cd));
            d._lblCd.show();
            d._interval = a.setInterval(function () {
                if (d.cd != c && d.cd > 1) {
                    d.cd--;
                    d._lblCd.text(Mojo.utils.locale("common", "in_cd") + d._formatCDTime(d.cd))
                } else {
                    d.cd = 0;
                    a.clearInterval(d._interval);
                    d._goButton.disable(false);
                    d._lblCd.hide()
                }
            }, 1000)
        },
        _formatCDTime: function (g) {
            var k = "";
            var d = parseInt(g / 86400);
            var f = parseInt((g % 86400) / 3600);
            var h = parseInt((g % 3600) / 60);
            var e = g % 60;
            if (d > 0) {
                k = d + Mojo.utils.locale("common", "day") + f + Mojo.utils.locale("common", "hour")
            } else {
                if (f > 0) {
                    k = f + Mojo.utils.locale("common", "hour") + h + Mojo.utils.locale("common", "minute")
                } else {
                    if (h > 0) {
                        k = h + Mojo.utils.locale("common", "minute") + e + Mojo.utils.locale("common", "second")
                    } else {
                        k = e + Mojo.utils.locale("common", "second")
                    }
                }
            }
            return k
        },
        _setAdvertising: function () {
            var e = parseInt(this._data.status || Mojo.utils.getSomething("gstatus"));
            var f = "";
            var d = "";
            if (e == 1) {
                d = "new-goods-flag";
                f = Mojo.utils.locale("mall", "new_goods_flag")
            } else {
                if (e == 2) {
                    d = "hot-goods-flag";
                    f = Mojo.utils.locale("mall", "hot_goods_flag")
                } else {
                    if (e == 3) {
                        d = "discount-goods-flag";
                        f = Mojo.utils.locale("mall", "discount_goods_flag_new", {
                            discount: parseInt(this._data.discount) / 10
                        })
                    }
                }
            } if (e > 0) {
                b('<div class="goods-advertising"></div>').addClass(d).html(f).appendTo(this.element())
            }
        },
        updateGoButtonStatus: function (d) {
            if (d >= this._levelInfo.unlockLevel) {
                this._goButton.disable(false)
            }
        },
        _getDefaultOptions: function () {
            return {
                click: c,
                onBuy: c
            }
        },
        _initEvent: function () {
            var d = this;
            this._card.element().bind("click", function () {
                if (d._options.click instanceof Function) {
                    d._options.click()
                }
            })
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.com = a.Mojo.com || {};
    a.Mojo.com.PropsElement = a.Mojo.Object.extend({
        clsname: function () {
            return "com.PropsElement"
        },
        init: function (e, d) {
            this._data = e;
            this._super(c, d);
            this.element().addClass("props").addClass("box-inner");
            this.element().append('<div class="card"></div>');
            this.element().append('<div class="info"></div>');
            this.element().append('<div class="buttons"></div>');
            this._countDiv = c;
            this._setCard();
            this._setCount();
            this._setDetail();
            this._setPrice();
            this._setButtons();
            this._setAdvertising()
        },
        _couldUse: function () {
            if (Mojo.utils.isNone(this._data.count) || parseInt(this._data.count) <= 0) {
                return false
            }
            if (Mojo.utils.isNone(this._options.baseProfile.data())) {
                return false
            }
            if ((this._data.id == "d01" || this._data.id == "d02") && this._options.baseProfile.data().ep >= this._options.baseProfile.data().energy) {
                return false
            } else {
                if (this._data.id == "d03" && this._options.baseProfile.data().sp >= this._options.baseProfile.data().stamina) {
                    return false
                }
            }
            return true
        },
        _whyCouldNotUse: function () {
            if (Mojo.utils.isNone(this._data.count) || parseInt(this._data.count) <= 0) {
                return Mojo.utils.locale("props", "buy_props_please")
            }
            if (Mojo.utils.isNone(this._options.baseProfile.data())) {
                return Mojo.utils.locale("props", "buy_props_please")
            }
            if ((this._data.id == "d01" || this._data.id == "d02") && this._options.baseProfile.data().ep >= this._options.baseProfile.data().energy) {
                return Mojo.utils.locale("props", "player_sp_max")
            } else {
                if (this._data.id == "d03" && this._options.baseProfile.data().sp >= this._options.baseProfile.data().stamina) {
                    return Mojo.utils.locale("props", "player_ep_max")
                }
            }
            return Mojo.utils.locale("props", "buy_props_please")
        },
        _setCard: function () {
            var d = this;
            new Mojo.com.SmallEntity(this._data, {
                callback: function (e) {
                    d.element().find(".card").append(e.element())
                },
                click: function () {
                    var g = new Mojo.ui.Dialog(c, {
                        title: Mojo.utils.locale("props", "props_detail_title"),
                        content: (new Mojo.com.LargeEntity(d._data)).element()
                    });
                    var f = {
                        name: d._data.name
                    };
                    b.extend(true, f, d._data.goods);
                    new Mojo.com.Price(f, {
                        showTitle: true
                    }).element().addClass("price-tip").insertBefore(g._footer);
                    if (d._data.trade_type != 0) {
                        (new Mojo.ui.Button(c, {
                            text: Mojo.utils.locale("common", "buy"),
                            special: "button-big-red",
                            click: function () {
                                d._buyProps(function (h) {
                                    g.close();
                                    if (h && h.errorCode === 0) {
                                        if (d._options.onBuyProps instanceof Function) {
                                            d._options.onBuyProps(h)
                                        }
                                    }
                                })
                            }
                        })).element().addClass("use-props").appendTo(g._footer)
                    }
                    if (d._data.use_type == 1) {
                        var e = (new Mojo.ui.Button(c, {
                            text: Mojo.utils.locale("common", "use"),
                            special: "button-big-blue",
                            disableClick: function () {
                                Mojo.app.toast.show(d._whyCouldNotUse())
                            },
                            click: function () {
                                d._checkAvoidWarTime(function (h) {
                                    if (h === true) {
                                        d._useProps(function (k) {
                                            g.close();
                                            if (k && k.errorCode === 0) {
                                                if (d._options.onUseProps instanceof Function) {
                                                    d._options.onUseProps(k.data)
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        }));
                        if (d._couldUse() === false) {
                            e.disable(true)
                        }
                        e.element().addClass("buy-props").appendTo(g._footer)
                    }
                    if (d._data.id == "d12") {
                        (new Mojo.ui.Button(c, {
                            text: Mojo.utils.locale("common", "go_fuben"),
                            click: function () {
                                Mojo.app.redirect("/fb")
                            },
                            special: "button-big-red"
                        })).element().appendTo(g._footer)
                    }
                    if (d._data.id == "d14") {
                        (new Mojo.ui.Button(c, {
                            text: Mojo.utils.locale("common", "go_neizheng"),
                            click: function () {
                                Mojo.app.redirect("/force", {
                                    index: 1
                                })
                            },
                            special: "button-big-red"
                        })).element().appendTo(g._footer)
                    }
                    if (parseInt(d._data.use_type) == 2) {
                        (new Mojo.ui.Button(c, {
                            text: Mojo.utils.locale("common", "close"),
                            click: function () {
                                g.close()
                            },
                            special: "button-big-red"
                        })).element().appendTo(g._footer)
                    }
                    g.open()
                }
            })
        },
        _setCount: function () {
            if (this._countDiv === c) {
                this._countDiv = b("<div></div>").addClass("count").html((this._data.count ? this._data.count : "0")).appendTo(this.element().find(".card"))
            } else {
                this._countDiv.html((this._data.count ? this._data.count : "0"))
            } if (parseInt(this._data.count) <= 0) {
                this._countDiv.hide()
            } else {
                this._countDiv.show()
            }
        },
        _setDetail: function () {
            b("<div></div>").addClass("name").html(this._data.name).appendTo(this.element().find(".info"));
            b("<div></div>").addClass("description").html(this._data.description).appendTo(this.element().find(".info"))
        },
        _setPrice: function () {
            (new Mojo.com.Price(this._data.goods)).element().appendTo(this.element().find(".info"))
        },
        _setAdvertising: function () {
            if (this._data.goods && this._data.goods.discount < 100) {
                b('<div class="goods-advertising"></div>').addClass("discount-goods-flag").html(Mojo.utils.locale("mall", "discount_goods_flag_new", {
                    discount: parseInt(this._data.goods.discount) / 10
                })).appendTo(this.element())
            }
        },
        _setButtons: function () {
            var d = this;
            this._usebtn = (new Mojo.ui.Button(c, {
                text: Mojo.utils.locale("common", "use"),
                classes: ["align-left", ],
                disableClick: function () {
                    Mojo.app.toast.show(d._whyCouldNotUse())
                },
                click: function () {
                    d._checkAvoidWarTime(function (e) {
                        if (e === true) {
                            d._useProps(function (f) {
                                if (f && f.errorCode === 0) {
                                    if (d._options.onUseProps instanceof Function) {
                                        d._options.onUseProps(f.data)
                                    }
                                }
                            })
                        }
                    })
                }
            }));
            this._setButtonsDisable();
            if (this._data.use_type == 1) {
                this._usebtn.element().addClass("use-props").appendTo(this.element().find(".buttons"))
            }
            this._tradeBtn = (new Mojo.ui.Button(c, {
                text: Mojo.utils.locale("common", "buy"),
                special: "button-big-red",
                classes: ["align-right", ],
                click: function () {
                    var e = new Mojo.ui.Dialog(c, {
                        title: Mojo.utils.locale("props", "buy_warning_title"),
                        content: b('<div class="tip">' + Mojo.utils.locale("props", "buy_warning_content") + "</div>"),
                        deviceaware: true
                    });
                    new Mojo.ui.Button(c, {
                        text: Mojo.utils.locale("props", "sure_buy"),
                        special: "button-big-red",
                        click: function () {
                            e.close();
                            d._buyProps(function (f) {
                                if (f && f.errorCode === 0) {
                                    if (d._options.onBuyProps instanceof Function) {
                                        d._options.onBuyProps(f)
                                    }
                                }
                            })
                        }
                    }).element().appendTo(e._footer);
                    new Mojo.ui.Button(c, {
                        text: Mojo.utils.locale("props", "think_again"),
                        special: "button-big-blue",
                        click: function () {
                            e.close()
                        }
                    }).element().appendTo(e._footer);
                    e.open()
                }
            }));
            if (this._data.trade_type != 0) {
                this._tradeBtn.element().addClass("buy-props").appendTo(this.element().find(".buttons"))
            }
        },
        _setButtonsDisable: function () {
            if (this._data.use_type == 0) {
                this._usebtn.disable(true);
                return
            }
            if (this._couldUse() === false) {
                this._usebtn.disable(true)
            } else {
                this._usebtn.disable(false)
            }
        },
        _getDefaultOptions: function () {
            return {
                baseProfile: c,
                onUseProps: c,
                onBuyProps: c,
                propsPage: c
            }
        },
        _checkAvoidWarTime: function (l) {
            var e = this;
            if (this._data.id == "d04" || this._data.id == "d05") {
                var g = this._options.propsPage.avoidWarTime();
                var k = this._options.propsPage.pageLoadedTime();
                var f = ((new Date()).getTime() - k) / 1000;
                if (g > 0 && f < g) {
                    var d = new Mojo.ui.Dialog(c, {
                        title: Mojo.utils.locale("props", "sure_avoid_war_time_title"),
                        content: b('<div class="tip"></div>').html(Mojo.utils.locale("props", "sure_avoid_war_time_content").replace(/\{\{name\}\}/g, this._data.name)),
                        deviceaware: true,
                        close: function () {
                            e._options.propsPage.stopUpdateAvoidWarTime()
                        }
                    });
                    var h = b('<div class="tip avoid-war-time"></div>').html(Mojo.utils.formatTimePlus(Mojo.utils.locale("props", "avoid_war_time"), (g - f))).appendTo(d._content);
                    new Mojo.ui.Button(c, {
                        text: Mojo.utils.locale("common", "use"),
                        special: "button-big-red",
                        click: function () {
                            if (l instanceof Function) {
                                d.close();
                                l(true)
                            }
                        }
                    }).element().appendTo(d._footer);
                    new Mojo.ui.Button(c, {
                        text: Mojo.utils.locale("common", "close"),
                        special: "button-big-blue",
                        click: function () {
                            d.close();
                            if (l instanceof Function) {
                                l(false)
                            }
                        }
                    }).element().appendTo(d._footer);
                    d.open(true);
                    this._options.propsPage.startUpdateAvoidWarTime(h)
                } else {
                    if (l instanceof Function) {
                        l(true)
                    }
                }
            } else {
                if (l instanceof Function) {
                    l(true)
                }
            }
        },
        _buyProps: function (e) {
            var d = this;
            Mojo.ajax("/mall/buy", {
                id: this._data.goods_id
            }, function (g) {
                if (g && g.errorCode === 0) {
                    d._data.count = parseInt(d._data.count || 0) + 1;
                    d._setCount();
                    var f = g.data.entities[0];
                    if (f != c && d._data.player_entity_id === c) {
                        d._data.player_entity_id = f.player_entity_id
                    }
                    Mojo.app.toast.show(Mojo.utils.locale("props", "buy_props_success"))
                } else {
                    var h = new Mojo.ui.Dialog(c, {
                        title: Mojo.utils.locale("common", "buy_fail_title"),
                        content: b('<div class="tip">' + g.errorMsg + "</div>"),
                        deviceaware: true
                    });
                    if (g && g.errorCode === 10004) {
                        new Mojo.ui.Button(c, {
                            text: Mojo.utils.locale("common", "go_vm"),
                            special: "button-big-red",
                            click: function () {
                                h.close()
                            }
                        }).element().appendTo(h._footer)
                    } else {
                        if (g && g.errorCode === 10005) {
                            new Mojo.ui.Button(c, {
                                text: Mojo.utils.locale("common", "go_payment"),
                                special: "button-big-red",
                                click: function () {
                                    h.close();
                                    Mojo.app.redirect("/mall", {
                                        selected: 4
                                    })
                                }
                            }).element().appendTo(h._footer)
                        }
                    }
                    new Mojo.ui.Button(c, {
                        text: Mojo.utils.locale("common", "close"),
                        special: "button-big-blue",
                        click: function () {
                            h.close()
                        }
                    }).element().appendTo(h._footer);
                    h.open()
                } if (e instanceof Function) {
                    e(g)
                }
                d._setButtonsDisable()
            }, function () {
                Mojo.app.toast.show(Mojo.utils.locale("props", "buy_props_fail_title"));
                if (e instanceof Function) {
                    e()
                }
            })
        },
        _useProps: function (e) {
            var d = this;
            Mojo.ajax("/entity/use", {
                id: d._data.player_entity_id
            }, function (g) {
                if (g && g.errorCode === 0) {
                    d._data.count = parseInt(d._data.count) - 1;
                    d._setCount();
                    var f = g.data;
                    var l = "";
                    switch (parseInt(g.data.use_rule)) {
                    case 1:
                        l = Mojo.utils.locale("props", "add_ep").replace(/\{\{name\}\}/g, d._data.name) + f.value;
                        break;
                    case 2:
                        l = Mojo.utils.locale("props", "add_sp").replace(/\{\{name\}\}/g, d._data.name) + f.value;
                        break;
                    case 3:
                        var k = d._options.propsPage.avoidWarTime();
                        var m = d._options.propsPage.pageLoadedTime();
                        var h = ((new Date()).getTime() - m) / 1000;
                        if (k > 0 && h < k) {
                            l = Mojo.utils.formatTimePlus(Mojo.utils.locale("props", "add_avoid_war").replace(/\{\{name\}\}/g, d._data.name), parseInt(f.value))
                        } else {
                            l = Mojo.utils.formatTimePlus(Mojo.utils.locale("props", "first_add_avoid_war").replace(/\{\{name\}\}/g, d._data.name), parseInt(f.value))
                        }
                        d._options.propsPage.avoidWarTime(parseInt(f.value));
                        break;
                    case 4:
                        l = Mojo.utils.locale("props", "add_vm").replace(/\{\{name\}\}/g, d._data.name) + f.value;
                        break;
                    default:
                        l = Mojo.utils.locale("props", "add_null");
                        break
                    }
                    Mojo.app.toast.show(l)
                }
                if (e instanceof Function) {
                    e(g)
                }
                d._setButtonsDisable()
            }, function () {
                Mojo.app.toast.show(Mojo.utils.locale("props", "use_props_fail"));
                if (e instanceof Function) {
                    e()
                }
            }, {
                showWait: true
            })
        }
    })
})(window, jQuery);
(function (a, b, c) {
    a.Mojo = a.Mojo || {};
    a.Mojo.page = a.Mojo.page || {};
    a.Mojo.page.Mall = a.Mojo.Page.extend({
        clsname: function () {
            return "page.Mall"
        },
        init: function () {
            this._super("page-mall", {
                baseProfile: true
            });
            this._paymentList = c;
            this._paymentAdvertising = c;
            this._paymentButtonFlag = c;
            this._tavern = c;
            this._tavernUpdateTime = c;
            this._tavernUpdateTimeDiv = c;
            this._hasUpdateTavernTime = false;
            this._avoidWarTime = 0;
            this._pageLoadedTime = c;
            this._isUpdateAvoidWarTime = false;
            this._updateAvoidWarTimeHandle = c;
            var d = this;
            Mojo.gap.rechargeCallback = function () {
                if (Mojo.utils.isNone(d._paymentList) == false) {
                    d._paymentAdvertising = c;
                    d._paymentList.removeAll();
                    d._paymentList._load()
                }
                d.baseProfile.sync()
            };
            Mojo.ajax("/mall/type", {}, function (e) {
                d._panels = [];
                if (e && e.errorCode === 0) {
                    for (var g in e.data) {
                        var f = e.data[g];
                        if (f.id > 0) {
                            d._panels.push({
                                id: f.id,
                                name: f.name,
                                status: f.status
                            })
                        } else {
                            if (f.id == -1) {
                                d._paymentButtonFlag = f.status
                            }
                        } if (f.id == 3) {
                            d._panels.push({
                                id: f.id,
                                name: decodeURI(Mojo.utils.locale("mall", "ytbar")),
                                status: f.status
                            })
                        }
                    }
                } else {
                    d._panels = []
                }
                d._addMallTabs();
                d._createPaymentButton()
            }, function () {
                d._panels = [];
                d._addMallTabs();
                d._createPaymentButton()
            })
        },
        _createPaymentButton: function () {
            var d = this;
            this._paymentButton = new Mojo.ui.Button("payment-button", {
                text: Mojo.utils.locale("common", "recharge"),
                special: "payment-button",
                click: function () {
                    d._createPaymentDialog()
                }
            });
            var e = this._paymentButtonFlag || Mojo.utils.getSomething("pstatus");
            if (Mojo.utils.isNone(e) == false) {
                this._paymentButton.setFlag({
                    text: Mojo.utils.locale("common", e),
                    classes: ["flag-" + e]
                })
            }
            this._paymentButton.element().appendTo(this.element())
        },
        _addMallTabs: function () {
            var d = this;
            this._mallTabs = new Mojo.ui.Tabs("tabs-mall", {
                selectionChange: function (f) {
                    var g = false;
                    if (f == 2 && d._needCreate == true) {
                        g = true
                    }
                    d._createMallList(f, g);
                    d._selected = f
                }
            });
            b.each(this._panels, function (g, h) {
                var f = h.status || Mojo.utils.getSomething("tstatus");
                if (Mojo.utils.isNone(f) == false) {
                    d._mallTabs.addTab(h.name, c, {
                        text: Mojo.utils.locale("common", f),
                        classes: ["flag-" + f]
                    })
                } else {
                    d._mallTabs.addTab(h.name)
                }
            });
            this.element().append(this._mallTabs.element());
            var e = 1;
            if (Mojo.utils.getSomething("selected")) {
                e = Mojo.utils.getSomething("selected")
            }
            if (e < 0 || e >= this._panels.length) {
                e = 1;
                this._createPaymentDialog()
            }
            this._mallTabs._select(e);
            this._selected = e
        },
        _createMallList: function (e, f) {
            var d = this;
            var g = this._panels[e];
            if (f) {
                g.malllist = c
            }
            d._needCreate = false;
            if (g.malllist === c || g.malllist === null) {
                g.index = e;
                if (g.id == "payment") {
                    d._createPaymentList(g)
                } else {
                    d._createGoodsList(g)
                }
                this._mallTabs.setPanel(e, g.malllist);
                this._mallTabs.element().find(".panel").addClass("box-outter");
                b("#payment-button").css("z-index", "1000")
            }
        },
        _createGeneralList: function (e) {
            var d = this;
            e.malllist = new Mojo.ui.ListPanel("mall-list-" + e.id, {
                scrollable: true,
                showMore: false,
                pageSize: 20,
                loadFunc: function (g, f, h) {
                    Mojo.ajax("/mall", {
                        type: e.id
                    }, function (n) {
                        if (n && n.errorCode === 0) {
                            if (Mojo.utils.isNone(n.data.time) == false && d._tavernUpdateTime == c) {
                                d._tavernUpdateTime = n.data.time;
                                d._tavern = e
                            }
                            var p = [];
                            for (var o in n.data.list) {
                                var m = n.data.list[o];
                                for (var k in m.entities) {
                                    var l = m.entities[k];
                                    p.push({
                                        id: m.id,
                                        name: m.name,
                                        description: m.description,
                                        vm: m.vm,
                                        rm: m.rm,
                                        discount: m.discount,
                                        entity: l,
                                        mallTypeId: e.id,
                                        status: m.status
                                    })
                                }
                            }
                            e.malllist.appendData(p)
                        } else {
                            e.malllist.appendData(null)
                        }
                    }, function () {
                        e.malllist.appendData(null)
                    })
                },
                drawFunc: function (f) {
                    return (new Mojo.com.Goods(f, {
                        onBuy: function () {
                            d._buyGoods(f)
                        },
                        click: function () {
                            var g = new Mojo.ui.Dialog(c, {
                                title: Mojo.utils.locale("mall", "goods_detail_title"),
                                content: (new Mojo.com.LargeEntity(f.entity)).element()
                            });
                            (new Mojo.com.Price(f, {
                                showTitle: true
                            })).element().addClass("price-tip").insertBefore(g._footer);
                            (new Mojo.ui.Button(c, {
                                text: Mojo.utils.locale("common", "buy"),
                                special: "button-big-red",
                                click: function () {
                                    d._buyGoods(f, function () {
                                        g.close()
                                    })
                                }
                            })).element().appendTo(g._footer);
                            (new Mojo.ui.Button(c, {
                                text: Mojo.utils.locale("common", "close"),
                                special: "button-big-blue",
                                click: function () {
                                    g.close()
                                }
                            })).element().appendTo(g._footer);
                            g.open()
                        }
                    }))
                },
                onLoaded: function (f) {
                    if (Mojo.utils.isNone(d._tavernUpdateTime) == false && d._hasUpdateTavernTime == false) {
                        f.element().addClass("tavern-listpanel");
                        d._updateTavernTime(f)
                    }
                }
            })
        },
        _createPropsList: function (e) {
            var d = this;
            e.malllist = new Mojo.ui.ListPanel("mall-list-" + +"props", {
                scrollable: true,
                pageSize: 20,
                showMore: false,
                loadFunc: function () {
                    Mojo.ajax("/entity/props", {}, function (f) {
                        if (d._pageLoadedTime === c) {
                            d._pageLoadedTime = (new Date()).getTime()
                        }
                        if (f && f.errorCode === 0) {
                            if (f.data.avoid_war_time) {
                                d._avoidWarTime = parseInt(f.data.avoid_war_time)
                            }
                            d.baseProfile.data(f.data.player);
                            e.malllist.appendData(f.data.list)
                        } else {
                            e.malllist.appendData(null)
                        }
                    }, function () {
                        if (d._pageLoadedTime === c) {
                            d._pageLoadedTime = (new Date()).getTime()
                        }
                        e.malllist.appendData(null)
                    })
                },
                drawFunc: function (f) {
                    return (new Mojo.com.PropsElement(f, {
                        baseProfile: d.baseProfile,
                        propsPage: d,
                        onUseProps: function (g) {
                            d._onUseProps(e, g, f)
                        },
                        onBuyProps: function (g) {
                            Mojo.track.onEvent("15_011");
                            d._onBuyProps(e, f, g)
                        }
                    }))
                }
            })
        },
        avoidWarTime: function (d) {
            if (d != c && d != null) {
                this._avoidWarTime = d;
                this._pageLoadedTime = (new Date()).getTime()
            }
            return this._avoidWarTime
        },
        startUpdateAvoidWarTime: function (d) {
            this._isUpdateAvoidWarTime = true;
            clearTimeout(this._updateAvoidWarTimeHandle);
            this._updateAvoidWarTime(d)
        },
        stopUpdateAvoidWarTime: function () {
            this._isUpdateAvoidWarTime = false;
            clearTimeout(this._updateAvoidWarTimeHandle)
        },
        _updateAvoidWarTime: function (f) {
            var e = ((new Date()).getTime() - this._pageLoadedTime) / 1000;
            var g = this._avoidWarTime - e;
            if (g < 0) {
                g = 0
            }
            if (f instanceof jQuery) {
                f.html(Mojo.utils.formatTimePlus(Mojo.utils.locale("props", "avoid_war_time"), g))
            }
            if (this._isUpdateAvoidWarTime === true) {
                var d = this;
                this._updateAvoidWarTimeHandle = setTimeout(function () {
                    d._updateAvoidWarTime(f)
                }, 1000)
            }
        },
        pageLoadedTime: function () {
            return this._pageLoadedTime
        },
        _onUseProps: function (h, d, g) {
            var e = g.goods;
            if (Mojo.utils.isNone(d.player) == false) {
                this.baseProfile.data(d.player)
            } else {
                var f = this.baseProfile.data();
                if (parseInt(d.use_rule) == 1) {
                    f.ep = parseInt(f.ep) + parseInt(d.value)
                } else {
                    if (parseInt(d.use_rule) == 2) {
                        f.sp = parseInt(f.sp) + parseInt(d.value)
                    } else {
                        if (parseInt(d.use_rule) == 4) {
                            f.vm = parseInt(f.vm) + parseInt(d.value)
                        }
                    }
                }
                this.baseProfile.data(f)
            }
            this._refreshProps(h);
            Mojo.track.onSell(e.id, 1, "使用", true)
        },
        _onBuyProps: function (h, g, e) {
            if (Mojo.utils.isNone(e) == false && e.errorCode === 0) {
                var d = g.goods;
                var f = this.baseProfile.data();
                if (e.data && e.data.player) {
                    f.vm = parseInt(e.data.player.vm);
                    f.rm = parseInt(e.data.player.rm)
                } else {
                    if (d.vm > 0) {
                        f.vm = parseInt(f.vm) - parseInt((d.discount / 100) * d.vm)
                    } else {
                        if (d.rm > 0) {
                            f.rm = parseInt(f.rm) - parseInt((d.discount / 100) * d.rm)
                        }
                    }
                }
                this.baseProfile.data(f);
                Mojo.track.onBuy(d.id, 1, "remark", true)
            }
        },
        _refreshProps: function (f) {
            var g = f.malllist._children;
            for (var d in g) {
                var e = g[d];
                e._setButtonsDisable()
            }
        },
        _createGoodsList: function (e) {
            var d = this;
            if (e.id == 3 && e.name != decodeURI(Mojo.utils.locale("mall", "ytbar"))) {
                this._createPropsList(e)
            } else {
                this._createGeneralList(e)
            }
        },
        _updateTavernTime: function (d) {
            this._hasUpdateTavernTime = true;
            var e = Mojo.utils.locale("mall", "tavern_update_time");
            if (this._tavernUpdateTimeDiv === c) {
                this._tavernUpdateTimeDiv = b('<div class="tavern-time"></div>').html(Mojo.utils.formatTimePlus(e, this._tavernUpdateTime - 1)).insertBefore(b("#mall-list-3 .window .list"))
            }
            if (this._tavernUpdateTime && this._tavernUpdateTime > 0) {
                this._tavernUpdateTime -= 1;
                var f = this;
                f._tavernUpdateTimeDiv.html(Mojo.utils.formatTimePlus(e, f._tavernUpdateTime));
                setTimeout(function () {
                    f._updateTavernTime()
                }, 1000)
            } else {
                if (this._tavernUpdateTime <= 0 && Mojo.utils.isNone(this._tavern) == false) {
                    this._tavern.malllist.element().remove();
                    this._tavern.malllist = c;
                    this._tavernUpdateTime = c;
                    this._tavernUpdateTimeDiv = c;
                    this._hasUpdateTavernTime = false;
                    this._createMallList(this._tavern.index)
                }
            }
        },
        _createPaymentList: function (e) {
            var d = this;
            e.malllist = new Mojo.ui.ListPanel("payment-listpanel", {
                scrollable: true,
                showMore: false,
                pageSize: 20,
                loadFunc: function () {
                    Mojo.ajax("/mall/RechargeList", {}, function (f) {
                        if (f && f.errorCode === 0) {
                            e.malllist.appendData(f.data.list)
                        } else {
                            e.malllist.appendData(null)
                        }
                    }, function () {
                        e.malllist.appendData(null)
                    })
                },
                drawFunc: function (f) {
                    return (new Mojo.com.PaymentElement(f, {
                        click: function (g) {
                            Mojo.gap.purchase(d.baseProfile.data().id, g.id)
                        }
                    }))
                }
            })
        },
        _createPaymentDialog: function () {
            var d = this;
            this._paymentList = new Mojo.ui.ListPanel("payment-listpanel", {
                scrollable: true,
                showMore: false,
                pageSize: 20,
                loadFunc: function () {
                    Mojo.ajax("/mall/RechargeList", {}, function (f) {
                        if (f && f.errorCode === 0) {
                            d._paymentData = f.data.list;
                            if (d._paymentAdvertising === c) {
                                d._paymentAdvertising = f.data.advertising
                            }
                            d._paymentList.appendData(f.data.list)
                        } else {
                            d._paymentList.appendData(null)
                        }
                    }, function () {
                        d._paymentList.appendData(null)
                    })
                },
                drawFunc: function (f) {
                    return (new Mojo.com.PaymentElement(f, {
                        advertising: (d._paymentAdvertising == c ? {} : d._paymentAdvertising),
                        click: function (g) {
                            switch (parseInt(g.money)) {
                            case 6:
                                Mojo.track.onEvent("10_021");
                                break;
                            case 30:
                                Mojo.track.onEvent("10_022");
                                break;
                            case 68:
                                Mojo.track.onEvent("10_023");
                                break;
                            case 198:
                                Mojo.track.onEvent("10_024");
                                break;
                            case 328:
                                Mojo.track.onEvent("10_025");
                                break;
                            case 648:
                                Mojo.track.onEvent("10_026");
                                break
                            }
                            Mojo.gap.purchase(d.baseProfile.data().id, g.id)
                        }
                    }))
                },
                onLoaded: function (f) {
                    b("#payment-advertising").remove();
                    b('<div id="payment-advertising" class="payment-advertising"></div>').html((d._paymentAdvertising == c ? Mojo.utils.getSomething("advertising_content") : d._paymentAdvertising.content)).insertBefore(f.element())
                }
            });
            var e = new Mojo.ui.Dialog("payment-dialog", {
                title: Mojo.utils.locale("common", "recharge"),
                content: d._paymentList.element(),
                close: function () {
                    d._paymentAdvertising = c;
                    d._paymentList = c;
                    d.baseProfile.sync()
                }
            });
            e.open();
            Mojo.track.onEvent("10_011")
        },
        _refreshPlayerMoney: function (d) {
            var e = this.baseProfile.data();
            if (d.vm > 0) {
                e.vm = parseInt(e.vm) - parseInt((d.discount / 100) * d.vm)
            } else {
                if (d.rm > 0) {
                    e.rm = parseInt(e.rm) - parseInt((d.discount / 100) * d.rm)
                }
            }
            this.baseProfile.data(e)
        },
        _buyGoods: function (e, f) {
            var d = this;
            Mojo.ajax("/mall/buy", {
                id: e.id,
                type: e.mallTypeId
            }, function (g) {
                if (g && g.errorCode === 0) {
                    d._refreshPlayerMoney(e);
                    if (d._selected == 0) {
                        d._needCreate = true
                    }
                }
                d._showBuyResult(g, e);
                if (f instanceof Function) {
                    f()
                }
            }, function () {
                d._showBuyResult();
                if (f instanceof Function) {
                    f()
                }
            }, {
                showWait: ((e.entity.type_id >= 5) ? true : false)
            })
        },
        _showBuyResult: function (f, h) {
            var n = this;
            if (f && f.errorCode === 0) {
                Mojo.track.onBuy(h.id, 1, "remark", true);
                if (h && parseInt(h.entity.type_id) == 8) {
                    Mojo.gap.niudanAnimationPlay(h.entity.rarity_id);
                    var g = f.data.entities[0];
                    var e = new Mojo.ui.Dialog(c, {
                        title: Mojo.utils.locale("mall", "open_minis_result"),
                        content: (new Mojo.com.LargeEntity(g)).element()
                    });
                    b("<div></div>").addClass("tip").html(Mojo.utils.locale("mall", "open_minis_tip").replace(/\{\{name\}\}/g, g.name)).appendTo(e._content);
                    new Mojo.ui.Button(c, {
                        text: Mojo.utils.locale("mall", "continue_mall"),
                        special: "button-big-red",
                        click: function () {
                            e.close()
                        }
                    }).element().appendTo(e._footer);
                    new Mojo.ui.Button(c, {
                        text: Mojo.utils.locale("mall", "go_accept"),
                        special: "button-big-blue",
                        click: function () {
                            e.close();
                            Mojo.app.redirect("/entity")
                        }
                    }).element().appendTo(e._footer);
                    setTimeout(function () {
                        e.open()
                    }, 400)
                } else {
                    var m = "";
                    if (parseInt(h.entity.type_id) == 7) {
                        m = Mojo.utils.locale("mall", "buy_props_content")
                    } else {
                        if (parseInt(h.entity.type_id) < 5) {
                            m = Mojo.utils.locale("mall", "buy_entity_content")
                        } else {
                            m = Mojo.utils.locale("mall", "buy_success_body")
                        }
                    }
                    var k = new Mojo.ui.Dialog(c, {
                        title: Mojo.utils.locale("mall", "buy_success_title"),
                        content: b('<div class="tip">' + m + "</div>")
                    });
                    new Mojo.ui.Button(c, {
                        text: Mojo.utils.locale("mall", "continue_mall"),
                        special: "button-big-red",
                        click: function () {
                            k.close()
                        }
                    }).element().appendTo(k._footer);
                    new Mojo.ui.Button(c, {
                        text: Mojo.utils.locale("mall", "go_accept"),
                        special: "button-big-blue",
                        click: function () {
                            if (Mojo.utils.isWhat(h.entity.type_id, "props")) {
                                k.close();
                                n._mallTabs._select(2)
                            } else {
                                Mojo.app.redirect("/entity")
                            }
                        }
                    }).element().appendTo(k._footer);
                    if (h.entity.type_id >= 5) {
                        k.open()
                    } else {
                        var l = parseInt(b("#ytInfo").html());
                        l++;
                        b("#ytInfo").html(l)
                    }
                }
            } else {
                var d = new Mojo.ui.Dialog(c, {
                    title: Mojo.utils.locale("mall", "buy_fail_title"),
                    content: b('<div class="tip">' + f.errorMsg + "</div>")
                });
                if (f && f.errorCode === 10004) {
                    new Mojo.ui.Button(c, {
                        text: Mojo.utils.locale("mall", "go_vm"),
                        special: "button-big-red",
                        click: function () {
                            d.close();
                            n._mallTabs._select(2)
                        }
                    }).element().appendTo(d._footer)
                } else {
                    if (f && f.errorCode === 10005) {
                        new Mojo.ui.Button(c, {
                            text: Mojo.utils.locale("mall", "go_payment"),
                            special: "button-big-red",
                            click: function () {
                                d.close();
                                n._createPaymentDialog()
                            }
                        }).element().appendTo(d._footer)
                    }
                }
                new Mojo.ui.Button(c, {
                    text: Mojo.utils.locale("common", "close"),
                    special: "button-big-blue",
                    click: function () {
                        d.close()
                    }
                }).element().appendTo(d._footer);
                d.open()
            }
        },
        _onTrack: function (d) {
            switch (d.id) {
            case "sp0101":
                Mojo.track.onEvent("20_091");
                break;
            case "sp0102":
                Mojo.track.onEvent("20_092");
                break;
            case "sp0103":
                Mojo.track.onEvent("20_101");
                break;
            case "sp0104":
                Mojo.track.onEvent("20_111");
                break;
            case "sp0106":
                Mojo.track.onEvent("20_112");
                break;
            case "sp0201":
                Mojo.track.onEvent("20_011");
                break;
            case "sp0202":
                Mojo.track.onEvent("20_012");
                break;
            case "sp0203":
                Mojo.track.onEvent("20_013");
                break;
            case "sp0204":
                Mojo.track.onEvent("20_014");
                break;
            case "sp0205":
                Mojo.track.onEvent("20_021");
                break;
            case "sp0206":
                Mojo.track.onEvent("20_022");
                break;
            case "sp0207":
                Mojo.track.onEvent("20_023");
                break;
            case "sp0208":
                Mojo.track.onEvent("20_024");
                break;
            case "sp0209":
                Mojo.track.onEvent("20_031");
                break;
            case "sp0210":
                Mojo.track.onEvent("20_032");
                break;
            case "sp0211":
                Mojo.track.onEvent("20_033");
                break;
            case "sp0212":
                Mojo.track.onEvent("20_034");
                break;
            case "sp0213":
                Mojo.track.onEvent("20_041");
                break;
            case "sp0214":
                Mojo.track.onEvent("20_042");
                break;
            case "sp0215":
                Mojo.track.onEvent("20_043");
                break;
            case "sp0216":
                Mojo.track.onEvent("20_044");
                break;
            case "sp0217":
                Mojo.track.onEvent("20_061");
                break;
            case "sp0218":
                Mojo.track.onEvent("20_062");
                break;
            case "sp0219":
                Mojo.track.onEvent("20_063");
                break;
            case "sp0220":
                Mojo.track.onEvent("20_064");
                break;
            case "sp0221":
                Mojo.track.onEvent("20_071");
                break;
            case "sp0222":
                Mojo.track.onEvent("20_072");
                break;
            case "sp0223":
                Mojo.track.onEvent("20_073");
                break;
            case "sp0224":
                Mojo.track.onEvent("20_074");
                break;
            case "sp0225":
                Mojo.track.onEvent("20_081");
                break;
            case "sp0226":
                Mojo.track.onEvent("20_082");
                break;
            case "sp0227":
                Mojo.track.onEvent("20_083");
                break;
            case "sp0228":
                Mojo.track.onEvent("20_084");
                break;
            case "sp0001":
                Mojo.track.onEvent("21_011");
                break;
            case "sp0002":
                Mojo.track.onEvent("21_012");
                break;
            case "sp0003":
                Mojo.track.onEvent("21_021");
                break;
            case "sp0004":
                Mojo.track.onEvent("21_031");
                break;
            case "sp0005":
                Mojo.track.onEvent("21_032");
                break;
            case "sp0006":
                Mojo.track.onEvent("21_041");
                break;
            case "sp0007":
                Mojo.track.onEvent("21_042");
                break;
            case "sp0008":
                Mojo.track.onEvent("21_051");
                break;
            case "sp0009":
                Mojo.track.onEvent("21_052");
                break;
            case "sp0010":
                Mojo.track.onEvent("21_061");
                break;
            default:
                break
            }
        },
    })
})(window, jQuery);