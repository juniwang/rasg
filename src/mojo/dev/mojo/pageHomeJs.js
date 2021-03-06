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
(function (window, undefined) {
    var document = window.document,
        navigator = window.navigator,
        location = window.location;
    var jQuery = (function () {
        var jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context, rootjQuery);
        }, _jQuery = window.jQuery,
            _$ = window.$,
            rootjQuery, quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
            rnotwhite = /\S/,
            trimLeft = /^\s+/,
            trimRight = /\s+$/,
            rdigit = /\d/,
            rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
            rvalidchars = /^[\],:{}\s]*$/,
            rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
            rwebkit = /(webkit)[ \/]([\w.]+)/,
            ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            rmsie = /(msie) ([\w.]+)/,
            rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
            rdashAlpha = /-([a-z]|[0-9])/ig,
            rmsPrefix = /^-ms-/,
            fcamelCase = function (all, letter) {
                return (letter + "").toUpperCase();
            }, userAgent = navigator.userAgent,
            browserMatch, readyList, DOMContentLoaded, toString = Object.prototype.toString,
            hasOwn = Object.prototype.hasOwnProperty,
            push = Array.prototype.push,
            slice = Array.prototype.slice,
            trim = String.prototype.trim,
            indexOf = Array.prototype.indexOf,
            class2type = {};
        jQuery.fn = jQuery.prototype = {
            constructor: jQuery,
            init: function (selector, context, rootjQuery) {
                var match, elem, ret, doc;
                if (!selector) {
                    return this;
                }
                if (selector.nodeType) {
                    this.context = this[0] = selector;
                    this.length = 1;
                    return this;
                }
                if (selector === "body" && !context && document.body) {
                    this.context = document;
                    this[0] = document.body;
                    this.selector = selector;
                    this.length = 1;
                    return this;
                }
                if (typeof selector === "string") {
                    if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                        match = [null, selector, null];
                    } else {
                        match = quickExpr.exec(selector);
                    }
                    if (match && (match[1] || !context)) {
                        if (match[1]) {
                            context = context instanceof jQuery ? context[0] : context;
                            doc = (context ? context.ownerDocument || context : document);
                            ret = rsingleTag.exec(selector);
                            if (ret) {
                                if (jQuery.isPlainObject(context)) {
                                    selector = [document.createElement(ret[1])];
                                    jQuery.fn.attr.call(selector, context, true);
                                } else {
                                    selector = [doc.createElement(ret[1])];
                                }
                            } else {
                                ret = jQuery.buildFragment([match[1]], [doc]);
                                selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes;
                            }
                            return jQuery.merge(this, selector);
                        } else {
                            elem = document.getElementById(match[2]);
                            if (elem && elem.parentNode) {
                                if (elem.id !== match[2]) {
                                    return rootjQuery.find(selector);
                                }
                                this.length = 1;
                                this[0] = elem;
                            }
                            this.context = document;
                            this.selector = selector;
                            return this;
                        }
                    } else if (!context || context.jquery) {
                        return (context || rootjQuery).find(selector);
                    } else {
                        return this.constructor(context).find(selector);
                    }
                } else if (jQuery.isFunction(selector)) {
                    return rootjQuery.ready(selector);
                }
                if (selector.selector !== undefined) {
                    this.selector = selector.selector;
                    this.context = selector.context;
                }
                return jQuery.makeArray(selector, this);
            },
            selector: "",
            jquery: "1.6.4",
            length: 0,
            size: function () {
                return this.length;
            },
            toArray: function () {
                return slice.call(this, 0);
            },
            get: function (num) {
                return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num]);
            },
            pushStack: function (elems, name, selector) {
                var ret = this.constructor();
                if (jQuery.isArray(elems)) {
                    push.apply(ret, elems);
                } else {
                    jQuery.merge(ret, elems);
                }
                ret.prevObject = this;
                ret.context = this.context;
                if (name === "find") {
                    ret.selector = this.selector + (this.selector ? " " : "") + selector;
                } else if (name) {
                    ret.selector = this.selector + "." + name + "(" + selector + ")";
                }
                return ret;
            },
            each: function (callback, args) {
                return jQuery.each(this, callback, args);
            },
            ready: function (fn) {
                jQuery.bindReady();
                readyList.done(fn);
                return this;
            },
            eq: function (i) {
                return i === -1 ? this.slice(i) : this.slice(i, +i + 1);
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            slice: function () {
                return this.pushStack(slice.apply(this, arguments), "slice", slice.call(arguments).join(","));
            },
            map: function (callback) {
                return this.pushStack(jQuery.map(this, function (elem, i) {
                    return callback.call(elem, i, elem);
                }));
            },
            end: function () {
                return this.prevObject || this.constructor(null);
            },
            push: push,
            sort: [].sort,
            splice: [].splice
        };
        jQuery.fn.init.prototype = jQuery.fn;
        jQuery.extend = jQuery.fn.extend = function () {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1,
                length = arguments.length,
                deep = false;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                i = 2;
            }
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {};
            }
            if (length === i) {
                target = this;
                --i;
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && jQuery.isArray(src) ? src : [];
                            } else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }
                            target[name] = jQuery.extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        };
        jQuery.extend({
            noConflict: function (deep) {
                if (window.$ === jQuery) {
                    window.$ = _$;
                }
                if (deep && window.jQuery === jQuery) {
                    window.jQuery = _jQuery;
                }
                return jQuery;
            },
            isReady: false,
            readyWait: 1,
            holdReady: function (hold) {
                if (hold) {
                    jQuery.readyWait++;
                } else {
                    jQuery.ready(true);
                }
            },
            ready: function (wait) {
                if ((wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady)) {
                    if (!document.body) {
                        return setTimeout(jQuery.ready, 1);
                    }
                    jQuery.isReady = true;
                    if (wait !== true && --jQuery.readyWait > 0) {
                        return;
                    }
                    readyList.resolveWith(document, [jQuery]);
                    if (jQuery.fn.trigger) {
                        jQuery(document).trigger("ready").unbind("ready");
                    }
                }
            },
            bindReady: function () {
                if (readyList) {
                    return;
                }
                readyList = jQuery._Deferred();
                if (document.readyState === "complete") {
                    return setTimeout(jQuery.ready, 1);
                }
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                    window.addEventListener("load", jQuery.ready, false);
                } else if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", DOMContentLoaded);
                    window.attachEvent("onload", jQuery.ready);
                    var toplevel = false;
                    try {
                        toplevel = window.frameElement == null;
                    } catch (e) {}
                    if (document.documentElement.doScroll && toplevel) {
                        doScrollCheck();
                    }
                }
            },
            isFunction: function (obj) {
                return jQuery.type(obj) === "function";
            },
            isArray: Array.isArray || function (obj) {
                return jQuery.type(obj) === "array";
            },
            isWindow: function (obj) {
                return obj && typeof obj === "object" && "setInterval" in obj;
            },
            isNaN: function (obj) {
                return obj == null || !rdigit.test(obj) || isNaN(obj);
            },
            type: function (obj) {
                return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
            },
            isPlainObject: function (obj) {
                if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                    return false;
                }
                try {
                    if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                        return false;
                    }
                } catch (e) {
                    return false;
                }
                var key;
                for (key in obj) {}
                return key === undefined || hasOwn.call(obj, key);
            },
            isEmptyObject: function (obj) {
                for (var name in obj) {
                    return false;
                }
                return true;
            },
            error: function (msg) {
                throw msg;
            },
            parseJSON: function (data) {
                if (typeof data !== "string" || !data) {
                    return null;
                }
                data = jQuery.trim(data);
                if (window.JSON && window.JSON.parse) {
                    return window.JSON.parse(data);
                }
                if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                    return (new Function("return " + data))();
                }
                jQuery.error("Invalid JSON: " + data);
            },
            parseXML: function (data) {
                var xml, tmp;
                try {
                    if (window.DOMParser) {
                        tmp = new DOMParser();
                        xml = tmp.parseFromString(data, "text/xml");
                    } else {
                        xml = new ActiveXObject("Microsoft.XMLDOM");
                        xml.async = "false";
                        xml.loadXML(data);
                    }
                } catch (e) {
                    xml = undefined;
                }
                if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                    jQuery.error("Invalid XML: " + data);
                }
                return xml;
            },
            noop: function () {},
            globalEval: function (data) {
                if (data && rnotwhite.test(data)) {
                    (window.execScript || function (data) {
                        window["eval"].call(window, data);
                    })(data);
                }
            },
            camelCase: function (string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
            },
            nodeName: function (elem, name) {
                return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
            },
            each: function (object, callback, args) {
                var name, i = 0,
                    length = object.length,
                    isObj = length === undefined || jQuery.isFunction(object);
                if (args) {
                    if (isObj) {
                        for (name in object) {
                            if (callback.apply(object[name], args) === false) {
                                break;
                            }
                        }
                    } else {
                        for (; i < length;) {
                            if (callback.apply(object[i++], args) === false) {
                                break;
                            }
                        }
                    }
                } else {
                    if (isObj) {
                        for (name in object) {
                            if (callback.call(object[name], name, object[name]) === false) {
                                break;
                            }
                        }
                    } else {
                        for (; i < length;) {
                            if (callback.call(object[i], i, object[i++]) === false) {
                                break;
                            }
                        }
                    }
                }
                return object;
            },
            trim: trim ? function (text) {
                return text == null ? "" : trim.call(text);
            } : function (text) {
                return text == null ? "" : text.toString().replace(trimLeft, "").replace(trimRight, "");
            },
            makeArray: function (array, results) {
                var ret = results || [];
                if (array != null) {
                    var type = jQuery.type(array);
                    if (array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(array)) {
                        push.call(ret, array);
                    } else {
                        jQuery.merge(ret, array);
                    }
                }
                return ret;
            },
            inArray: function (elem, array) {
                if (!array) {
                    return -1;
                }
                if (indexOf) {
                    return indexOf.call(array, elem);
                }
                for (var i = 0, length = array.length; i < length; i++) {
                    if (array[i] === elem) {
                        return i;
                    }
                }
                return -1;
            },
            merge: function (first, second) {
                var i = first.length,
                    j = 0;
                if (typeof second.length === "number") {
                    for (var l = second.length; j < l; j++) {
                        first[i++] = second[j];
                    }
                } else {
                    while (second[j] !== undefined) {
                        first[i++] = second[j++];
                    }
                }
                first.length = i;
                return first;
            },
            grep: function (elems, callback, inv) {
                var ret = [],
                    retVal;
                inv = !! inv;
                for (var i = 0, length = elems.length; i < length; i++) {
                    retVal = !! callback(elems[i], i);
                    if (inv !== retVal) {
                        ret.push(elems[i]);
                    }
                }
                return ret;
            },
            map: function (elems, callback, arg) {
                var value, key, ret = [],
                    i = 0,
                    length = elems.length,
                    isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || jQuery.isArray(elems));
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret[ret.length] = value;
                        }
                    }
                } else {
                    for (key in elems) {
                        value = callback(elems[key], key, arg);
                        if (value != null) {
                            ret[ret.length] = value;
                        }
                    }
                }
                return ret.concat.apply([], ret);
            },
            guid: 1,
            proxy: function (fn, context) {
                if (typeof context === "string") {
                    var tmp = fn[context];
                    context = fn;
                    fn = tmp;
                }
                if (!jQuery.isFunction(fn)) {
                    return undefined;
                }
                var args = slice.call(arguments, 2),
                    proxy = function () {
                        return fn.apply(context, args.concat(slice.call(arguments)));
                    };
                proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
                return proxy;
            },
            access: function (elems, key, value, exec, fn, pass) {
                var length = elems.length;
                if (typeof key === "object") {
                    for (var k in key) {
                        jQuery.access(elems, k, key[k], exec, fn, value);
                    }
                    return elems;
                }
                if (value !== undefined) {
                    exec = !pass && exec && jQuery.isFunction(value);
                    for (var i = 0; i < length; i++) {
                        fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
                    }
                    return elems;
                }
                return length ? fn(elems[0], key) : undefined;
            },
            now: function () {
                return (new Date()).getTime();
            },
            uaMatch: function (ua) {
                ua = ua.toLowerCase();
                var match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
                return {
                    browser: match[1] || "",
                    version: match[2] || "0"
                };
            },
            sub: function () {
                function jQuerySub(selector, context) {
                    return new jQuerySub.fn.init(selector, context);
                }
                jQuery.extend(true, jQuerySub, this);
                jQuerySub.superclass = this;
                jQuerySub.fn = jQuerySub.prototype = this();
                jQuerySub.fn.constructor = jQuerySub;
                jQuerySub.sub = this.sub;
                jQuerySub.fn.init = function init(selector, context) {
                    if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
                        context = jQuerySub(context);
                    }
                    return jQuery.fn.init.call(this, selector, context, rootjQuerySub);
                };
                jQuerySub.fn.init.prototype = jQuerySub.fn;
                var rootjQuerySub = jQuerySub(document);
                return jQuerySub;
            },
            browser: {}
        });
        jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });
        browserMatch = jQuery.uaMatch(userAgent);
        if (browserMatch.browser) {
            jQuery.browser[browserMatch.browser] = true;
            jQuery.browser.version = browserMatch.version;
        }
        if (jQuery.browser.webkit) {
            jQuery.browser.safari = true;
        }
        if (rnotwhite.test("\xA0")) {
            trimLeft = /^[\s\xA0]+/;
            trimRight = /[\s\xA0]+$/;
        }
        rootjQuery = jQuery(document);
        if (document.addEventListener) {
            DOMContentLoaded = function () {
                document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                jQuery.ready();
            };
        } else if (document.attachEvent) {
            DOMContentLoaded = function () {
                if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", DOMContentLoaded);
                    jQuery.ready();
                }
            };
        }

        function doScrollCheck() {
            if (jQuery.isReady) {
                return;
            }
            try {
                document.documentElement.doScroll("left");
            } catch (e) {
                setTimeout(doScrollCheck, 1);
                return;
            }
            jQuery.ready();
        }
        return jQuery;
    })();
    var
    promiseMethods = "done fail isResolved isRejected promise then always pipe".split(" "),
        sliceDeferred = [].slice;
    jQuery.extend({
        _Deferred: function () {
            var
            callbacks = [],
                fired, firing, cancelled, deferred = {
                    done: function () {
                        if (!cancelled) {
                            var args = arguments,
                                i, length, elem, type, _fired;
                            if (fired) {
                                _fired = fired;
                                fired = 0;
                            }
                            for (i = 0, length = args.length; i < length; i++) {
                                elem = args[i];
                                type = jQuery.type(elem);
                                if (type === "array") {
                                    deferred.done.apply(deferred, elem);
                                } else if (type === "function") {
                                    callbacks.push(elem);
                                }
                            }
                            if (_fired) {
                                deferred.resolveWith(_fired[0], _fired[1]);
                            }
                        }
                        return this;
                    },
                    resolveWith: function (context, args) {
                        if (!cancelled && !fired && !firing) {
                            args = args || [];
                            firing = 1;
                            try {
                                while (callbacks[0]) {
                                    callbacks.shift().apply(context, args);
                                }
                            } finally {
                                fired = [context, args];
                                firing = 0;
                            }
                        }
                        return this;
                    },
                    resolve: function () {
                        deferred.resolveWith(this, arguments);
                        return this;
                    },
                    isResolved: function () {
                        return !!(firing || fired);
                    },
                    cancel: function () {
                        cancelled = 1;
                        callbacks = [];
                        return this;
                    }
                };
            return deferred;
        },
        Deferred: function (func) {
            var deferred = jQuery._Deferred(),
                failDeferred = jQuery._Deferred(),
                promise;
            jQuery.extend(deferred, {
                then: function (doneCallbacks, failCallbacks) {
                    deferred.done(doneCallbacks).fail(failCallbacks);
                    return this;
                },
                always: function () {
                    return deferred.done.apply(deferred, arguments).fail.apply(this, arguments);
                },
                fail: failDeferred.done,
                rejectWith: failDeferred.resolveWith,
                reject: failDeferred.resolve,
                isRejected: failDeferred.isResolved,
                pipe: function (fnDone, fnFail) {
                    return jQuery.Deferred(function (newDefer) {
                        jQuery.each({
                            done: [fnDone, "resolve"],
                            fail: [fnFail, "reject"]
                        }, function (handler, data) {
                            var fn = data[0],
                                action = data[1],
                                returned;
                            if (jQuery.isFunction(fn)) {
                                deferred[handler](function () {
                                    returned = fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise().then(newDefer.resolve, newDefer.reject);
                                    } else {
                                        newDefer[action + "With"](this === deferred ? newDefer : this, [returned]);
                                    }
                                });
                            } else {
                                deferred[handler](newDefer[action]);
                            }
                        });
                    }).promise();
                },
                promise: function (obj) {
                    if (obj == null) {
                        if (promise) {
                            return promise;
                        }
                        promise = obj = {};
                    }
                    var i = promiseMethods.length;
                    while (i--) {
                        obj[promiseMethods[i]] = deferred[promiseMethods[i]];
                    }
                    return obj;
                }
            });
            deferred.done(failDeferred.cancel).fail(deferred.cancel);
            delete deferred.cancel;
            if (func) {
                func.call(deferred, deferred);
            }
            return deferred;
        },
        when: function (firstParam) {
            var args = arguments,
                i = 0,
                length = args.length,
                count = length,
                deferred = length <= 1 && firstParam && jQuery.isFunction(firstParam.promise) ? firstParam : jQuery.Deferred();

            function resolveFunc(i) {
                return function (value) {
                    args[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
                    if (!(--count)) {
                        deferred.resolveWith(deferred, sliceDeferred.call(args, 0));
                    }
                };
            }
            if (length > 1) {
                for (; i < length; i++) {
                    if (args[i] && jQuery.isFunction(args[i].promise)) {
                        args[i].promise().then(resolveFunc(i), deferred.reject);
                    } else {
                        --count;
                    }
                }
                if (!count) {
                    deferred.resolveWith(deferred, args);
                }
            } else if (deferred !== firstParam) {
                deferred.resolveWith(deferred, length ? [firstParam] : []);
            }
            return deferred.promise();
        }
    });
    jQuery.support = (function () {
        var div = document.createElement("div"),
            documentElement = document.documentElement,
            all, a, select, opt, input, marginDiv, support, fragment, body, testElementParent, testElement, testElementStyle, tds, events, eventName, i, isSupported;
        div.setAttribute("className", "t");
        div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        all = div.getElementsByTagName("*");
        a = div.getElementsByTagName("a")[0];
        if (!all || !all.length || !a) {
            return {};
        }
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];
        support = {
            leadingWhitespace: (div.firstChild.nodeType === 3),
            tbody: !div.getElementsByTagName("tbody").length,
            htmlSerialize: !! div.getElementsByTagName("link").length,
            style: /top/.test(a.getAttribute("style")),
            hrefNormalized: (a.getAttribute("href") === "/a"),
            opacity: /^0.55$/.test(a.style.opacity),
            cssFloat: !! a.style.cssFloat,
            checkOn: (input.value === "on"),
            optSelected: opt.selected,
            getSetAttribute: div.className !== "t",
            submitBubbles: true,
            changeBubbles: true,
            focusinBubbles: false,
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true
        };
        input.checked = true;
        support.noCloneChecked = input.cloneNode(true).checked;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        try {
            delete div.test;
        } catch (e) {
            support.deleteExpando = false;
        }
        if (!div.addEventListener && div.attachEvent && div.fireEvent) {
            div.attachEvent("onclick", function () {
                support.noCloneEvent = false;
            });
            div.cloneNode(true).fireEvent("onclick");
        }
        input = document.createElement("input");
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
        input.setAttribute("checked", "checked");
        div.appendChild(input);
        fragment = document.createDocumentFragment();
        fragment.appendChild(div.firstChild);
        support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
        div.innerHTML = "";
        div.style.width = div.style.paddingLeft = "1px";
        body = document.getElementsByTagName("body")[0];
        testElement = document.createElement(body ? "div" : "body");
        testElementStyle = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        };
        if (body) {
            jQuery.extend(testElementStyle, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
        }
        for (i in testElementStyle) {
            testElement.style[i] = testElementStyle[i];
        }
        testElement.appendChild(div);
        testElementParent = body || documentElement;
        testElementParent.insertBefore(testElement, testElementParent.firstChild);
        support.appendChecked = input.checked;
        support.boxModel = div.offsetWidth === 2;
        if ("zoom" in div.style) {
            div.style.display = "inline";
            div.style.zoom = 1;
            support.inlineBlockNeedsLayout = (div.offsetWidth === 2);
            div.style.display = "";
            div.innerHTML = "<div style='width:4px;'></div>";
            support.shrinkWrapBlocks = (div.offsetWidth !== 2);
        }
        div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
        tds = div.getElementsByTagName("td");
        isSupported = (tds[0].offsetHeight === 0);
        tds[0].style.display = "";
        tds[1].style.display = "none";
        support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);
        div.innerHTML = "";
        if (document.defaultView && document.defaultView.getComputedStyle) {
            marginDiv = document.createElement("div");
            marginDiv.style.width = "0";
            marginDiv.style.marginRight = "0";
            div.appendChild(marginDiv);
            support.reliableMarginRight = (parseInt((document.defaultView.getComputedStyle(marginDiv, null) || {
                marginRight: 0
            }).marginRight, 10) || 0) === 0;
        }
        testElement.innerHTML = "";
        testElementParent.removeChild(testElement);
        if (div.attachEvent) {
            for (i in {
                submit: 1,
                change: 1,
                focusin: 1
            }) {
                eventName = "on" + i;
                isSupported = (eventName in div);
                if (!isSupported) {
                    div.setAttribute(eventName, "return;");
                    isSupported = (typeof div[eventName] === "function");
                }
                support[i + "Bubbles"] = isSupported;
            }
        }
        testElement = fragment = select = opt = body = marginDiv = div = input = null;
        return support;
    })();
    jQuery.boxModel = jQuery.support.boxModel;
    var rbrace = /^(?:\{.*\}|\[.*\])$/,
        rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            "embed": true,
            "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            "applet": true
        },
        hasData: function (elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },
        data: function (elem, name, data, pvt) {
            if (!jQuery.acceptData(elem)) {
                return;
            }
            var thisCache, ret, internalKey = jQuery.expando,
                getByName = typeof name === "string",
                isNode = elem.nodeType,
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[jQuery.expando] : elem[jQuery.expando] && jQuery.expando;
            if ((!id || (pvt && id && (cache[id] && !cache[id][internalKey]))) && getByName && data === undefined) {
                return;
            }
            if (!id) {
                if (isNode) {
                    elem[jQuery.expando] = id = ++jQuery.uuid;
                } else {
                    id = jQuery.expando;
                }
            }
            if (!cache[id]) {
                cache[id] = {};
                if (!isNode) {
                    cache[id].toJSON = jQuery.noop;
                }
            }
            if (typeof name === "object" || typeof name === "function") {
                if (pvt) {
                    cache[id][internalKey] = jQuery.extend(cache[id][internalKey], name);
                } else {
                    cache[id] = jQuery.extend(cache[id], name);
                }
            }
            thisCache = cache[id];
            if (pvt) {
                if (!thisCache[internalKey]) {
                    thisCache[internalKey] = {};
                }
                thisCache = thisCache[internalKey];
            }
            if (data !== undefined) {
                thisCache[jQuery.camelCase(name)] = data;
            }
            if (name === "events" && !thisCache[name]) {
                return thisCache[internalKey] && thisCache[internalKey].events;
            }
            if (getByName) {
                ret = thisCache[name];
                if (ret == null) {
                    ret = thisCache[jQuery.camelCase(name)];
                }
            } else {
                ret = thisCache;
            }
            return ret;
        },
        removeData: function (elem, name, pvt) {
            if (!jQuery.acceptData(elem)) {
                return;
            }
            var thisCache, internalKey = jQuery.expando,
                isNode = elem.nodeType,
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (!cache[id]) {
                return;
            }
            if (name) {
                thisCache = pvt ? cache[id][internalKey] : cache[id];
                if (thisCache) {
                    if (!thisCache[name]) {
                        name = jQuery.camelCase(name);
                    }
                    delete thisCache[name];
                    if (!isEmptyDataObject(thisCache)) {
                        return;
                    }
                }
            }
            if (pvt) {
                delete cache[id][internalKey];
                if (!isEmptyDataObject(cache[id])) {
                    return;
                }
            }
            var internalCache = cache[id][internalKey];
            if (jQuery.support.deleteExpando || !cache.setInterval) {
                delete cache[id];
            } else {
                cache[id] = null;
            }
            if (internalCache) {
                cache[id] = {};
                if (!isNode) {
                    cache[id].toJSON = jQuery.noop;
                }
                cache[id][internalKey] = internalCache;
            } else if (isNode) {
                if (jQuery.support.deleteExpando) {
                    delete elem[jQuery.expando];
                } else if (elem.removeAttribute) {
                    elem.removeAttribute(jQuery.expando);
                } else {
                    elem[jQuery.expando] = null;
                }
            }
        },
        _data: function (elem, name, data) {
            return jQuery.data(elem, name, data, true);
        },
        acceptData: function (elem) {
            if (elem.nodeName) {
                var match = jQuery.noData[elem.nodeName.toLowerCase()];
                if (match) {
                    return !(match === true || elem.getAttribute("classid") !== match);
                }
            }
            return true;
        }
    });
    jQuery.fn.extend({
        data: function (key, value) {
            var data = null;
            if (typeof key === "undefined") {
                if (this.length) {
                    data = jQuery.data(this[0]);
                    if (this[0].nodeType === 1) {
                        var attr = this[0].attributes,
                            name;
                        for (var i = 0, l = attr.length; i < l; i++) {
                            name = attr[i].name;
                            if (name.indexOf("data-") === 0) {
                                name = jQuery.camelCase(name.substring(5));
                                dataAttr(this[0], name, data[name]);
                            }
                        }
                    }
                }
                return data;
            } else if (typeof key === "object") {
                return this.each(function () {
                    jQuery.data(this, key);
                });
            }
            var parts = key.split(".");
            parts[1] = parts[1] ? "." + parts[1] : "";
            if (value === undefined) {
                data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);
                if (data === undefined && this.length) {
                    data = jQuery.data(this[0], key);
                    data = dataAttr(this[0], key, data);
                }
                return data === undefined && parts[1] ? this.data(parts[0]) : data;
            } else {
                return this.each(function () {
                    var $this = jQuery(this),
                        args = [parts[0], value];
                    $this.triggerHandler("setData" + parts[1] + "!", args);
                    jQuery.data(this, key, value);
                    $this.triggerHandler("changeData" + parts[1] + "!", args);
                });
            }
        },
        removeData: function (key) {
            return this.each(function () {
                jQuery.removeData(this, key);
            });
        }
    });

    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : !jQuery.isNaN(data) ? parseFloat(data) : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                jQuery.data(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }

    function isEmptyDataObject(obj) {
        for (var name in obj) {
            if (name !== "toJSON") {
                return false;
            }
        }
        return true;
    }

    function handleQueueMarkDefer(elem, type, src) {
        var deferDataKey = type + "defer",
            queueDataKey = type + "queue",
            markDataKey = type + "mark",
            defer = jQuery.data(elem, deferDataKey, undefined, true);
        if (defer && (src === "queue" || !jQuery.data(elem, queueDataKey, undefined, true)) && (src === "mark" || !jQuery.data(elem, markDataKey, undefined, true))) {
            setTimeout(function () {
                if (!jQuery.data(elem, queueDataKey, undefined, true) && !jQuery.data(elem, markDataKey, undefined, true)) {
                    jQuery.removeData(elem, deferDataKey, true);
                    defer.resolve();
                }
            }, 0);
        }
    }
    jQuery.extend({
        _mark: function (elem, type) {
            if (elem) {
                type = (type || "fx") + "mark";
                jQuery.data(elem, type, (jQuery.data(elem, type, undefined, true) || 0) + 1, true);
            }
        },
        _unmark: function (force, elem, type) {
            if (force !== true) {
                type = elem;
                elem = force;
                force = false;
            }
            if (elem) {
                type = type || "fx";
                var key = type + "mark",
                    count = force ? 0 : ((jQuery.data(elem, key, undefined, true) || 1) - 1);
                if (count) {
                    jQuery.data(elem, key, count, true);
                } else {
                    jQuery.removeData(elem, key, true);
                    handleQueueMarkDefer(elem, type, "mark");
                }
            }
        },
        queue: function (elem, type, data) {
            if (elem) {
                type = (type || "fx") + "queue";
                var q = jQuery.data(elem, type, undefined, true);
                if (data) {
                    if (!q || jQuery.isArray(data)) {
                        q = jQuery.data(elem, type, jQuery.makeArray(data), true);
                    } else {
                        q.push(data);
                    }
                }
                return q || [];
            }
        },
        dequeue: function (elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
                fn = queue.shift(),
                defer;
            if (fn === "inprogress") {
                fn = queue.shift();
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                fn.call(elem, function () {
                    jQuery.dequeue(elem, type);
                });
            }
            if (!queue.length) {
                jQuery.removeData(elem, type + "queue", true);
                handleQueueMarkDefer(elem, type, "queue");
            }
        }
    });
    jQuery.fn.extend({
        queue: function (type, data) {
            if (typeof type !== "string") {
                data = type;
                type = "fx";
            }
            if (data === undefined) {
                return jQuery.queue(this[0], type);
            }
            return this.each(function () {
                var queue = jQuery.queue(this, type, data);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type);
            });
        },
        delay: function (time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function () {
                var elem = this;
                setTimeout(function () {
                    jQuery.dequeue(elem, type);
                }, time);
            });
        },
        clearQueue: function (type) {
            return this.queue(type || "fx", []);
        },
        promise: function (type, object) {
            if (typeof type !== "string") {
                object = type;
                type = undefined;
            }
            type = type || "fx";
            var defer = jQuery.Deferred(),
                elements = this,
                i = elements.length,
                count = 1,
                deferDataKey = type + "defer",
                queueDataKey = type + "queue",
                markDataKey = type + "mark",
                tmp;

            function resolve() {
                if (!(--count)) {
                    defer.resolveWith(elements, [elements]);
                }
            }
            while (i--) {
                if ((tmp = jQuery.data(elements[i], deferDataKey, undefined, true) || (jQuery.data(elements[i], queueDataKey, undefined, true) || jQuery.data(elements[i], markDataKey, undefined, true)) && jQuery.data(elements[i], deferDataKey, jQuery._Deferred(), true))) {
                    count++;
                    tmp.done(resolve);
                }
            }
            resolve();
            return defer.promise();
        }
    });
    var rclass = /[\n\t\r]/g,
        rspace = /\s+/,
        rreturn = /\r/g,
        rtype = /^(?:button|input)$/i,
        rfocusable = /^(?:button|input|object|select|textarea)$/i,
        rclickable = /^a(?:rea)?$/i,
        rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        nodeHook, boolHook;
    jQuery.fn.extend({
        attr: function (name, value) {
            return jQuery.access(this, name, value, true, jQuery.attr);
        },
        removeAttr: function (name) {
            return this.each(function () {
                jQuery.removeAttr(this, name);
            });
        },
        prop: function (name, value) {
            return jQuery.access(this, name, value, true, jQuery.prop);
        },
        removeProp: function (name) {
            name = jQuery.propFix[name] || name;
            return this.each(function () {
                try {
                    this[name] = undefined;
                    delete this[name];
                } catch (e) {}
            });
        },
        addClass: function (value) {
            var classNames, i, l, elem, setClass, c, cl;
            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).addClass(value.call(this, j, this.className));
                });
            }
            if (value && typeof value === "string") {
                classNames = value.split(rspace);
                for (i = 0, l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1) {
                        if (!elem.className && classNames.length === 1) {
                            elem.className = value;
                        } else {
                            setClass = " " + elem.className + " ";
                            for (c = 0, cl = classNames.length; c < cl; c++) {
                                if (!~setClass.indexOf(" " + classNames[c] + " ")) {
                                    setClass += classNames[c] + " ";
                                }
                            }
                            elem.className = jQuery.trim(setClass);
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function (value) {
            var classNames, i, l, elem, className, c, cl;
            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).removeClass(value.call(this, j, this.className));
                });
            }
            if ((value && typeof value === "string") || value === undefined) {
                classNames = (value || "").split(rspace);
                for (i = 0, l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1 && elem.className) {
                        if (value) {
                            className = (" " + elem.className + " ").replace(rclass, " ");
                            for (c = 0, cl = classNames.length; c < cl; c++) {
                                className = className.replace(" " + classNames[c] + " ", " ");
                            }
                            elem.className = jQuery.trim(className);
                        } else {
                            elem.className = "";
                        }
                    }
                }
            }
            return this;
        },
        toggleClass: function (value, stateVal) {
            var type = typeof value,
                isBool = typeof stateVal === "boolean";
            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                });
            }
            return this.each(function () {
                if (type === "string") {
                    var className, i = 0,
                        self = jQuery(this),
                        state = stateVal,
                        classNames = value.split(rspace);
                    while ((className = classNames[i++])) {
                        state = isBool ? state : !self.hasClass(className);
                        self[state ? "addClass" : "removeClass"](className);
                    }
                } else if (type === "undefined" || type === "boolean") {
                    if (this.className) {
                        jQuery._data(this, "__className__", this.className);
                    }
                    this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                }
            });
        },
        hasClass: function (selector) {
            var className = " " + selector + " ";
            for (var i = 0, l = this.length; i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) > -1) {
                    return true;
                }
            }
            return false;
        },
        val: function (value) {
            var hooks, ret, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.nodeName.toLowerCase()] || jQuery.valHooks[elem.type];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
                }
                return undefined;
            }
            var isFunction = jQuery.isFunction(value);
            return this.each(function (i) {
                var self = jQuery(this),
                    val;
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, self.val());
                } else {
                    val = value;
                }
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function (value) {
                        return value == null ? "" : value + "";
                    });
                }
                hooks = jQuery.valHooks[this.nodeName.toLowerCase()] || jQuery.valHooks[this.type];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function (elem) {
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text;
                }
            },
            select: {
                get: function (elem) {
                    var value, index = elem.selectedIndex,
                        values = [],
                        options = elem.options,
                        one = elem.type === "select-one";
                    if (index < 0) {
                        return null;
                    }
                    for (var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++) {
                        var option = options[i];
                        if (option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value;
                            }
                            values.push(value);
                        }
                    }
                    if (one && !values.length && options.length) {
                        return jQuery(options[index]).val();
                    }
                    return values;
                },
                set: function (elem, value) {
                    var values = jQuery.makeArray(value);
                    jQuery(elem).find("option").each(function () {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
                    });
                    if (!values.length) {
                        elem.selectedIndex = -1;
                    }
                    return values;
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
        attr: function (elem, name, value, pass) {
            var nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return undefined;
            }
            if (pass && name in jQuery.attrFn) {
                return jQuery(elem)[name](value);
            }
            if (!("getAttribute" in elem)) {
                return jQuery.prop(elem, name, value);
            }
            var ret, hooks, notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.attrFix[name] || name;
                hooks = jQuery.attrHooks[name];
                if (!hooks) {
                    if (rboolean.test(name)) {
                        hooks = boolHook;
                    } else if (nodeHook) {
                        hooks = nodeHook;
                    }
                }
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return undefined;
                } else if (hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                } else {
                    elem.setAttribute(name, "" + value);
                    return value;
                }
            } else if (hooks && "get" in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            } else {
                ret = elem.getAttribute(name);
                return ret === null ? undefined : ret;
            }
        },
        removeAttr: function (elem, name) {
            var propName;
            if (elem.nodeType === 1) {
                name = jQuery.attrFix[name] || name;
                jQuery.attr(elem, name, "");
                elem.removeAttribute(name);
                if (rboolean.test(name) && (propName = jQuery.propFix[name] || name) in elem) {
                    elem[propName] = false;
                }
            }
        },
        attrHooks: {
            type: {
                set: function (elem, value) {
                    if (rtype.test(elem.nodeName) && elem.parentNode) {
                        jQuery.error("type property can't be changed");
                    } else if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            },
            value: {
                get: function (elem, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.get(elem, name);
                    }
                    return name in elem ? elem.value : null;
                },
                set: function (elem, value, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.set(elem, value, name);
                    }
                    elem.value = value;
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
        prop: function (elem, name, value) {
            var nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return undefined;
            }
            var ret, hooks, notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) {
                if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                } else {
                    return (elem[name] = value);
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;
                } else {
                    return elem[name];
                }
            }
        },
        propHooks: {
            tabIndex: {
                get: function (elem) {
                    var attributeNode = elem.getAttributeNode("tabindex");
                    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
                }
            }
        }
    });
    jQuery.attrHooks.tabIndex = jQuery.propHooks.tabIndex;
    boolHook = {
        get: function (elem, name) {
            var attrNode;
            return jQuery.prop(elem, name) === true || (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined;
        },
        set: function (elem, value, name) {
            var propName;
            if (value === false) {
                jQuery.removeAttr(elem, name);
            } else {
                propName = jQuery.propFix[name] || name;
                if (propName in elem) {
                    elem[propName] = true;
                }
                elem.setAttribute(name, name.toLowerCase());
            }
            return name;
        }
    };
    if (!jQuery.support.getSetAttribute) {
        nodeHook = jQuery.valHooks.button = {
            get: function (elem, name) {
                var ret;
                ret = elem.getAttributeNode(name);
                return ret && ret.nodeValue !== "" ? ret.nodeValue : undefined;
            },
            set: function (elem, value, name) {
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    ret = document.createAttribute(name);
                    elem.setAttributeNode(ret);
                }
                return (ret.nodeValue = value + "");
            }
        };
        jQuery.each(["width", "height"], function (i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                set: function (elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value;
                    }
                }
            });
        });
    }
    if (!jQuery.support.hrefNormalized) {
        jQuery.each(["href", "src", "width", "height"], function (i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                get: function (elem) {
                    var ret = elem.getAttribute(name, 2);
                    return ret === null ? undefined : ret;
                }
            });
        });
    }
    if (!jQuery.support.style) {
        jQuery.attrHooks.style = {
            get: function (elem) {
                return elem.style.cssText.toLowerCase() || undefined;
            },
            set: function (elem, value) {
                return (elem.style.cssText = "" + value);
            }
        };
    }
    if (!jQuery.support.optSelected) {
        jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
            get: function (elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            }
        });
    }
    if (!jQuery.support.checkOn) {
        jQuery.each(["radio", "checkbox"], function () {
            jQuery.valHooks[this] = {
                get: function (elem) {
                    return elem.getAttribute("value") === null ? "on" : elem.value;
                }
            };
        });
    }
    jQuery.each(["radio", "checkbox"], function () {
        jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
            set: function (elem, value) {
                if (jQuery.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
                }
            }
        });
    });
    var rnamespaces = /\.(.*)$/,
        rformElems = /^(?:textarea|input|select)$/i,
        rperiod = /\./g,
        rspaces = / /g,
        rescape = /[^\w\s.|`]/g,
        fcleanup = function (nm) {
            return nm.replace(rescape, "\\$&");
        };
    jQuery.event = {
        add: function (elem, types, handler, data) {
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (handler === false) {
                handler = returnFalse;
            } else if (!handler) {
                return;
            }
            var handleObjIn, handleObj;
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            var elemData = jQuery._data(elem);
            if (!elemData) {
                return;
            }
            var events = elemData.events,
                eventHandle = elemData.handle;
            if (!events) {
                elemData.events = events = {};
            }
            if (!eventHandle) {
                elemData.handle = eventHandle = function (e) {
                    return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.handle.apply(eventHandle.elem, arguments) : undefined;
                };
            }
            eventHandle.elem = elem;
            types = types.split(" ");
            var type, i = 0,
                namespaces;
            while ((type = types[i++])) {
                handleObj = handleObjIn ? jQuery.extend({}, handleObjIn) : {
                    handler: handler,
                    data: data
                };
                if (type.indexOf(".") > -1) {
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    handleObj.namespace = namespaces.slice(0).sort().join(".");
                } else {
                    namespaces = [];
                    handleObj.namespace = "";
                }
                handleObj.type = type;
                if (!handleObj.guid) {
                    handleObj.guid = handler.guid;
                }
                var handlers = events[type],
                    special = jQuery.event.special[type] || {};
                if (!handlers) {
                    handlers = events[type] = [];
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                handlers.push(handleObj);
                jQuery.event.global[type] = true;
            }
            elem = null;
        },
        global: {},
        remove: function (elem, types, handler, pos) {
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (handler === false) {
                handler = returnFalse;
            }
            var ret, type, fn, j, i = 0,
                all, namespaces, namespace, special, eventType, handleObj, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem),
                events = elemData && elemData.events;
            if (!elemData || !events) {
                return;
            }
            if (types && types.type) {
                handler = types.handler;
                types = types.type;
            }
            if (!types || typeof types === "string" && types.charAt(0) === ".") {
                types = types || "";
                for (type in events) {
                    jQuery.event.remove(elem, type + types);
                }
                return;
            }
            types = types.split(" ");
            while ((type = types[i++])) {
                origType = type;
                handleObj = null;
                all = type.indexOf(".") < 0;
                namespaces = [];
                if (!all) {
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    namespace = new RegExp("(^|\\.)" +
                        jQuery.map(namespaces.slice(0).sort(), fcleanup).join("\\.(?:.*\\.)?") + "(\\.|$)");
                }
                eventType = events[type];
                if (!eventType) {
                    continue;
                }
                if (!handler) {
                    for (j = 0; j < eventType.length; j++) {
                        handleObj = eventType[j];
                        if (all || namespace.test(handleObj.namespace)) {
                            jQuery.event.remove(elem, origType, handleObj.handler, j);
                            eventType.splice(j--, 1);
                        }
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                for (j = pos || 0; j < eventType.length; j++) {
                    handleObj = eventType[j];
                    if (handler.guid === handleObj.guid) {
                        if (all || namespace.test(handleObj.namespace)) {
                            if (pos == null) {
                                eventType.splice(j--, 1);
                            }
                            if (special.remove) {
                                special.remove.call(elem, handleObj);
                            }
                        }
                        if (pos != null) {
                            break;
                        }
                    }
                }
                if (eventType.length === 0 || pos != null && eventType.length === 1) {
                    if (!special.teardown || special.teardown.call(elem, namespaces) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    ret = null;
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                var handle = elemData.handle;
                if (handle) {
                    handle.elem = null;
                }
                delete elemData.events;
                delete elemData.handle;
                if (jQuery.isEmptyObject(elemData)) {
                    jQuery.removeData(elem, undefined, true);
                }
            }
        },
        customEvent: {
            "getData": true,
            "setData": true,
            "changeData": true
        },
        trigger: function (event, data, elem, onlyHandlers) {
            var type = event.type || event,
                namespaces = [],
                exclusive;
            if (type.indexOf("!") >= 0) {
                type = type.slice(0, -1);
                exclusive = true;
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            if ((!elem || jQuery.event.customEvent[type]) && !jQuery.event.global[type]) {
                return;
            }
            event = typeof event === "object" ? event[jQuery.expando] ? event : new jQuery.Event(type, event) : new jQuery.Event(type);
            event.type = type;
            event.exclusive = exclusive;
            event.namespace = namespaces.join(".");
            event.namespace_re = new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)");
            if (onlyHandlers || !elem) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (!elem) {
                jQuery.each(jQuery.cache, function () {
                    var internalKey = jQuery.expando,
                        internalCache = this[internalKey];
                    if (internalCache && internalCache.events && internalCache.events[type]) {
                        jQuery.event.trigger(event, data, internalCache.handle.elem);
                    }
                });
                return;
            }
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            event.result = undefined;
            event.target = elem;
            data = data != null ? jQuery.makeArray(data) : [];
            data.unshift(event);
            var cur = elem,
                ontype = type.indexOf(":") < 0 ? "on" + type : "";
            do {
                var handle = jQuery._data(cur, "handle");
                event.currentTarget = cur;
                if (handle) {
                    handle.apply(cur, data);
                }
                if (ontype && jQuery.acceptData(cur) && cur[ontype] && cur[ontype].apply(cur, data) === false) {
                    event.result = false;
                    event.preventDefault();
                }
                cur = cur.parentNode || cur.ownerDocument || cur === event.target.ownerDocument && window;
            } while (cur && !event.isPropagationStopped());
            if (!event.isDefaultPrevented()) {
                var old, special = jQuery.event.special[type] || {};
                if ((!special._default || special._default.call(elem.ownerDocument, event) === false) && !(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {
                    try {
                        if (ontype && elem[type]) {
                            old = elem[ontype];
                            if (old) {
                                elem[ontype] = null;
                            }
                            jQuery.event.triggered = type;
                            elem[type]();
                        }
                    } catch (ieError) {}
                    if (old) {
                        elem[ontype] = old;
                    }
                    jQuery.event.triggered = undefined;
                }
            }
            return event.result;
        },
        handle: function (event) {
            event = jQuery.event.fix(event || window.event);
            var handlers = ((jQuery._data(this, "events") || {})[event.type] || []).slice(0),
                run_all = !event.exclusive && !event.namespace,
                args = Array.prototype.slice.call(arguments, 0);
            args[0] = event;
            event.currentTarget = this;
            for (var j = 0, l = handlers.length; j < l; j++) {
                var handleObj = handlers[j];
                if (run_all || event.namespace_re.test(handleObj.namespace)) {
                    event.handler = handleObj.handler;
                    event.data = handleObj.data;
                    event.handleObj = handleObj;
                    var ret = handleObj.handler.apply(this, args);
                    if (ret !== undefined) {
                        event.result = ret;
                        if (ret === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                    if (event.isImmediatePropagationStopped()) {
                        break;
                    }
                }
            }
            return event.result;
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function (event) {
            if (event[jQuery.expando]) {
                return event;
            }
            var originalEvent = event;
            event = jQuery.Event(originalEvent);
            for (var i = this.props.length, prop; i;) {
                prop = this.props[--i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) {
                event.target = event.srcElement || document;
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            if (!event.relatedTarget && event.fromElement) {
                event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
            }
            if (event.pageX == null && event.clientX != null) {
                var eventDocument = event.target.ownerDocument || document,
                    doc = eventDocument.documentElement,
                    body = eventDocument.body;
                event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
            }
            if (event.which == null && (event.charCode != null || event.keyCode != null)) {
                event.which = event.charCode != null ? event.charCode : event.keyCode;
            }
            if (!event.metaKey && event.ctrlKey) {
                event.metaKey = event.ctrlKey;
            }
            if (!event.which && event.button !== undefined) {
                event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)));
            }
            return event;
        },
        guid: 1E8,
        proxy: jQuery.proxy,
        special: {
            ready: {
                setup: jQuery.bindReady,
                teardown: jQuery.noop
            },
            live: {
                add: function (handleObj) {
                    jQuery.event.add(this, liveConvert(handleObj.origType, handleObj.selector), jQuery.extend({}, handleObj, {
                        handler: liveHandler,
                        guid: handleObj.handler.guid
                    }));
                },
                remove: function (handleObj) {
                    jQuery.event.remove(this, liveConvert(handleObj.origType, handleObj.selector), handleObj);
                }
            },
            beforeunload: {
                setup: function (data, namespaces, eventHandle) {
                    if (jQuery.isWindow(this)) {
                        this.onbeforeunload = eventHandle;
                    }
                },
                teardown: function (namespaces, eventHandle) {
                    if (this.onbeforeunload === eventHandle) {
                        this.onbeforeunload = null;
                    }
                }
            }
        }
    };
    jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false);
        }
    } : function (elem, type, handle) {
        if (elem.detachEvent) {
            elem.detachEvent("on" + type, handle);
        }
    };
    jQuery.Event = function (src, props) {
        if (!this.preventDefault) {
            return new jQuery.Event(src, props);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;
        } else {
            this.type = src;
        }
        if (props) {
            jQuery.extend(this, props);
        }
        this.timeStamp = jQuery.now();
        this[jQuery.expando] = true;
    };

    function returnFalse() {
        return false;
    }

    function returnTrue() {
        return true;
    }
    jQuery.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function () {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    };
    var withinElement = function (event) {
        var related = event.relatedTarget,
            inside = false,
            eventType = event.type;
        event.type = event.data;
        if (related !== this) {
            if (related) {
                inside = jQuery.contains(this, related);
            }
            if (!inside) {
                jQuery.event.handle.apply(this, arguments);
                event.type = eventType;
            }
        }
    }, delegate = function (event) {
            event.type = event.data;
            jQuery.event.handle.apply(this, arguments);
        };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (orig, fix) {
        jQuery.event.special[orig] = {
            setup: function (data) {
                jQuery.event.add(this, fix, data && data.selector ? delegate : withinElement, orig);
            },
            teardown: function (data) {
                jQuery.event.remove(this, fix, data && data.selector ? delegate : withinElement);
            }
        };
    });
    if (!jQuery.support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function (data, namespaces) {
                if (!jQuery.nodeName(this, "form")) {
                    jQuery.event.add(this, "click.specialSubmit", function (e) {
                        var elem = e.target,
                            type = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.type : "";
                        if ((type === "submit" || type === "image") && jQuery(elem).closest("form").length) {
                            trigger("submit", this, arguments);
                        }
                    });
                    jQuery.event.add(this, "keypress.specialSubmit", function (e) {
                        var elem = e.target,
                            type = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.type : "";
                        if ((type === "text" || type === "password") && jQuery(elem).closest("form").length && e.keyCode === 13) {
                            trigger("submit", this, arguments);
                        }
                    });
                } else {
                    return false;
                }
            },
            teardown: function (namespaces) {
                jQuery.event.remove(this, ".specialSubmit");
            }
        };
    }
    if (!jQuery.support.changeBubbles) {
        var changeFilters, getVal = function (elem) {
                var type = jQuery.nodeName(elem, "input") ? elem.type : "",
                    val = elem.value;
                if (type === "radio" || type === "checkbox") {
                    val = elem.checked;
                } else if (type === "select-multiple") {
                    val = elem.selectedIndex > -1 ? jQuery.map(elem.options, function (elem) {
                        return elem.selected;
                    }).join("-") : "";
                } else if (jQuery.nodeName(elem, "select")) {
                    val = elem.selectedIndex;
                }
                return val;
            }, testChange = function testChange(e) {
                var elem = e.target,
                    data, val;
                if (!rformElems.test(elem.nodeName) || elem.readOnly) {
                    return;
                }
                data = jQuery._data(elem, "_change_data");
                val = getVal(elem);
                if (e.type !== "focusout" || elem.type !== "radio") {
                    jQuery._data(elem, "_change_data", val);
                }
                if (data === undefined || val === data) {
                    return;
                }
                if (data != null || val) {
                    e.type = "change";
                    e.liveFired = undefined;
                    jQuery.event.trigger(e, arguments[1], elem);
                }
            };
        jQuery.event.special.change = {
            filters: {
                focusout: testChange,
                beforedeactivate: testChange,
                click: function (e) {
                    var elem = e.target,
                        type = jQuery.nodeName(elem, "input") ? elem.type : "";
                    if (type === "radio" || type === "checkbox" || jQuery.nodeName(elem, "select")) {
                        testChange.call(this, e);
                    }
                },
                keydown: function (e) {
                    var elem = e.target,
                        type = jQuery.nodeName(elem, "input") ? elem.type : "";
                    if ((e.keyCode === 13 && !jQuery.nodeName(elem, "textarea")) || (e.keyCode === 32 && (type === "checkbox" || type === "radio")) || type === "select-multiple") {
                        testChange.call(this, e);
                    }
                },
                beforeactivate: function (e) {
                    var elem = e.target;
                    jQuery._data(elem, "_change_data", getVal(elem));
                }
            },
            setup: function (data, namespaces) {
                if (this.type === "file") {
                    return false;
                }
                for (var type in changeFilters) {
                    jQuery.event.add(this, type + ".specialChange", changeFilters[type]);
                }
                return rformElems.test(this.nodeName);
            },
            teardown: function (namespaces) {
                jQuery.event.remove(this, ".specialChange");
                return rformElems.test(this.nodeName);
            }
        };
        changeFilters = jQuery.event.special.change.filters;
        changeFilters.focus = changeFilters.beforeactivate;
    }

    function trigger(type, elem, args) {
        var event = jQuery.extend({}, args[0]);
        event.type = type;
        event.originalEvent = {};
        event.liveFired = undefined;
        jQuery.event.handle.call(elem, event);
        if (event.isDefaultPrevented()) {
            args[0].preventDefault();
        }
    }
    if (!jQuery.support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function (orig, fix) {
            var attaches = 0;
            jQuery.event.special[fix] = {
                setup: function () {
                    if (attaches++ === 0) {
                        document.addEventListener(orig, handler, true);
                    }
                },
                teardown: function () {
                    if (--attaches === 0) {
                        document.removeEventListener(orig, handler, true);
                    }
                }
            };

            function handler(donor) {
                var e = jQuery.event.fix(donor);
                e.type = fix;
                e.originalEvent = {};
                jQuery.event.trigger(e, null, e.target);
                if (e.isDefaultPrevented()) {
                    donor.preventDefault();
                }
            }
        });
    }
    jQuery.each(["bind", "one"], function (i, name) {
        jQuery.fn[name] = function (type, data, fn) {
            var handler;
            if (typeof type === "object") {
                for (var key in type) {
                    this[name](key, data, type[key], fn);
                }
                return this;
            }
            if (arguments.length === 2 || data === false) {
                fn = data;
                data = undefined;
            }
            if (name === "one") {
                handler = function (event) {
                    jQuery(this).unbind(event, handler);
                    return fn.apply(this, arguments);
                };
                handler.guid = fn.guid || jQuery.guid++;
            } else {
                handler = fn;
            }
            if (type === "unload" && name !== "one") {
                this.one(type, data, fn);
            } else {
                for (var i = 0, l = this.length; i < l; i++) {
                    jQuery.event.add(this[i], type, handler, data);
                }
            }
            return this;
        };
    });
    jQuery.fn.extend({
        unbind: function (type, fn) {
            if (typeof type === "object" && !type.preventDefault) {
                for (var key in type) {
                    this.unbind(key, type[key]);
                }
            } else {
                for (var i = 0, l = this.length; i < l; i++) {
                    jQuery.event.remove(this[i], type, fn);
                }
            }
            return this;
        },
        delegate: function (selector, types, data, fn) {
            return this.live(types, data, fn, selector);
        },
        undelegate: function (selector, types, fn) {
            if (arguments.length === 0) {
                return this.unbind("live");
            } else {
                return this.die(types, null, fn, selector);
            }
        },
        trigger: function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function (type, data) {
            if (this[0]) {
                return jQuery.event.trigger(type, data, this[0], true);
            }
        },
        toggle: function (fn) {
            var args = arguments,
                guid = fn.guid || jQuery.guid++,
                i = 0,
                toggler = function (event) {
                    var lastToggle = (jQuery.data(this, "lastToggle" + fn.guid) || 0) % i;
                    jQuery.data(this, "lastToggle" + fn.guid, lastToggle + 1);
                    event.preventDefault();
                    return args[lastToggle].apply(this, arguments) || false;
                };
            toggler.guid = guid;
            while (i < args.length) {
                args[i++].guid = guid;
            }
            return this.click(toggler);
        },
        hover: function (fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });
    var liveMap = {
        focus: "focusin",
        blur: "focusout",
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    jQuery.each(["live", "die"], function (i, name) {
        jQuery.fn[name] = function (types, data, fn, origSelector) {
            var type, i = 0,
                match, namespaces, preType, selector = origSelector || this.selector,
                context = origSelector ? this : jQuery(this.context);
            if (typeof types === "object" && !types.preventDefault) {
                for (var key in types) {
                    context[name](key, data, types[key], selector);
                }
                return this;
            }
            if (name === "die" && !types && origSelector && origSelector.charAt(0) === ".") {
                context.unbind(origSelector);
                return this;
            }
            if (data === false || jQuery.isFunction(data)) {
                fn = data || returnFalse;
                data = undefined;
            }
            types = (types || "").split(" ");
            while ((type = types[i++]) != null) {
                match = rnamespaces.exec(type);
                namespaces = "";
                if (match) {
                    namespaces = match[0];
                    type = type.replace(rnamespaces, "");
                }
                if (type === "hover") {
                    types.push("mouseenter" + namespaces, "mouseleave" + namespaces);
                    continue;
                }
                preType = type;
                if (liveMap[type]) {
                    types.push(liveMap[type] + namespaces);
                    type = type + namespaces;
                } else {
                    type = (liveMap[type] || type) + namespaces;
                }
                if (name === "live") {
                    for (var j = 0, l = context.length; j < l; j++) {
                        jQuery.event.add(context[j], "live." + liveConvert(type, selector), {
                            data: data,
                            selector: selector,
                            handler: fn,
                            origType: type,
                            origHandler: fn,
                            preType: preType
                        });
                    }
                } else {
                    context.unbind("live." + liveConvert(type, selector), fn);
                }
            }
            return this;
        };
    });

    function liveHandler(event) {
        var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret, elems = [],
            selectors = [],
            events = jQuery._data(this, "events");
        if (event.liveFired === this || !events || !events.live || event.target.disabled || event.button && event.type === "click") {
            return;
        }
        if (event.namespace) {
            namespace = new RegExp("(^|\\.)" + event.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
        }
        event.liveFired = this;
        var live = events.live.slice(0);
        for (j = 0; j < live.length; j++) {
            handleObj = live[j];
            if (handleObj.origType.replace(rnamespaces, "") === event.type) {
                selectors.push(handleObj.selector);
            } else {
                live.splice(j--, 1);
            }
        }
        match = jQuery(event.target).closest(selectors, event.currentTarget);
        for (i = 0, l = match.length; i < l; i++) {
            close = match[i];
            for (j = 0; j < live.length; j++) {
                handleObj = live[j];
                if (close.selector === handleObj.selector && (!namespace || namespace.test(handleObj.namespace)) && !close.elem.disabled) {
                    elem = close.elem;
                    related = null;
                    if (handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave") {
                        event.type = handleObj.preType;
                        related = jQuery(event.relatedTarget).closest(handleObj.selector)[0];
                        if (related && jQuery.contains(elem, related)) {
                            related = elem;
                        }
                    }
                    if (!related || related !== elem) {
                        elems.push({
                            elem: elem,
                            handleObj: handleObj,
                            level: close.level
                        });
                    }
                }
            }
        }
        for (i = 0, l = elems.length; i < l; i++) {
            match = elems[i];
            if (maxLevel && match.level > maxLevel) {
                break;
            }
            event.currentTarget = match.elem;
            event.data = match.handleObj.data;
            event.handleObj = match.handleObj;
            ret = match.handleObj.origHandler.apply(match.elem, arguments);
            if (ret === false || event.isPropagationStopped()) {
                maxLevel = match.level;
                if (ret === false) {
                    stop = false;
                }
                if (event.isImmediatePropagationStopped()) {
                    break;
                }
            }
        }
        return stop;
    }

    function liveConvert(type, selector) {
        return (type && type !== "*" ? type + "." : "") + selector.replace(rperiod, "`").replace(rspaces, "&");
    }
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error").split(" "), function (i, name) {
        jQuery.fn[name] = function (data, fn) {
            if (fn == null) {
                fn = data;
                data = null;
            }
            return arguments.length > 0 ? this.bind(name, data, fn) : this.trigger(name);
        };
        if (jQuery.attrFn) {
            jQuery.attrFn[name] = true;
        }
    });
    /*!
     * Sizzle CSS Selector Engine
     *  Copyright 2011, The Dojo Foundation
     *  Released under the MIT, BSD, and GPL Licenses.
     *  More information: http://sizzlejs.com/
     */
    (function () {
        var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            done = 0,
            toString = Object.prototype.toString,
            hasDuplicate = false,
            baseHasDuplicate = true,
            rBackslash = /\\/g,
            rNonWord = /\W/;
        [0, 0].sort(function () {
                baseHasDuplicate = false;
                return 0;
            });
        var Sizzle = function (selector, context, results, seed) {
            results = results || [];
            context = context || document;
            var origContext = context;
            if (context.nodeType !== 1 && context.nodeType !== 9) {
                return [];
            }
            if (!selector || typeof selector !== "string") {
                return results;
            }
            var m, set, checkSet, extra, ret, cur, pop, i, prune = true,
                contextXML = Sizzle.isXML(context),
                parts = [],
                soFar = selector;
            do {
                chunker.exec("");
                m = chunker.exec(soFar);
                if (m) {
                    soFar = m[3];
                    parts.push(m[1]);
                    if (m[2]) {
                        extra = m[3];
                        break;
                    }
                }
            } while (m);
            if (parts.length > 1 && origPOS.exec(selector)) {
                if (parts.length === 2 && Expr.relative[parts[0]]) {
                    set = posProcess(parts[0] + parts[1], context);
                } else {
                    set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
                    while (parts.length) {
                        selector = parts.shift();
                        if (Expr.relative[selector]) {
                            selector += parts.shift();
                        }
                        set = posProcess(selector, set);
                    }
                }
            } else {
                if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {
                    ret = Sizzle.find(parts.shift(), context, contextXML);
                    context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
                }
                if (context) {
                    ret = seed ? {
                        expr: parts.pop(),
                        set: makeArray(seed)
                    } : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
                    set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
                    if (parts.length > 0) {
                        checkSet = makeArray(set);
                    } else {
                        prune = false;
                    }
                    while (parts.length) {
                        cur = parts.pop();
                        pop = cur;
                        if (!Expr.relative[cur]) {
                            cur = "";
                        } else {
                            pop = parts.pop();
                        }
                        if (pop == null) {
                            pop = context;
                        }
                        Expr.relative[cur](checkSet, pop, contextXML);
                    }
                } else {
                    checkSet = parts = [];
                }
            }
            if (!checkSet) {
                checkSet = set;
            }
            if (!checkSet) {
                Sizzle.error(cur || selector);
            }
            if (toString.call(checkSet) === "[object Array]") {
                if (!prune) {
                    results.push.apply(results, checkSet);
                } else if (context && context.nodeType === 1) {
                    for (i = 0; checkSet[i] != null; i++) {
                        if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) {
                            results.push(set[i]);
                        }
                    }
                } else {
                    for (i = 0; checkSet[i] != null; i++) {
                        if (checkSet[i] && checkSet[i].nodeType === 1) {
                            results.push(set[i]);
                        }
                    }
                }
            } else {
                makeArray(checkSet, results);
            }
            if (extra) {
                Sizzle(extra, origContext, results, seed);
                Sizzle.uniqueSort(results);
            }
            return results;
        };
        Sizzle.uniqueSort = function (results) {
            if (sortOrder) {
                hasDuplicate = baseHasDuplicate;
                results.sort(sortOrder);
                if (hasDuplicate) {
                    for (var i = 1; i < results.length; i++) {
                        if (results[i] === results[i - 1]) {
                            results.splice(i--, 1);
                        }
                    }
                }
            }
            return results;
        };
        Sizzle.matches = function (expr, set) {
            return Sizzle(expr, null, null, set);
        };
        Sizzle.matchesSelector = function (node, expr) {
            return Sizzle(expr, null, null, [node]).length > 0;
        };
        Sizzle.find = function (expr, context, isXML) {
            var set;
            if (!expr) {
                return [];
            }
            for (var i = 0, l = Expr.order.length; i < l; i++) {
                var match, type = Expr.order[i];
                if ((match = Expr.leftMatch[type].exec(expr))) {
                    var left = match[1];
                    match.splice(1, 1);
                    if (left.substr(left.length - 1) !== "\\") {
                        match[1] = (match[1] || "").replace(rBackslash, "");
                        set = Expr.find[type](match, context, isXML);
                        if (set != null) {
                            expr = expr.replace(Expr.match[type], "");
                            break;
                        }
                    }
                }
            }
            if (!set) {
                set = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName("*") : [];
            }
            return {
                set: set,
                expr: expr
            };
        };
        Sizzle.filter = function (expr, set, inplace, not) {
            var match, anyFound, old = expr,
                result = [],
                curLoop = set,
                isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);
            while (expr && set.length) {
                for (var type in Expr.filter) {
                    if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
                        var found, item, filter = Expr.filter[type],
                            left = match[1];
                        anyFound = false;
                        match.splice(1, 1);
                        if (left.substr(left.length - 1) === "\\") {
                            continue;
                        }
                        if (curLoop === result) {
                            result = [];
                        }
                        if (Expr.preFilter[type]) {
                            match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
                            if (!match) {
                                anyFound = found = true;
                            } else if (match === true) {
                                continue;
                            }
                        }
                        if (match) {
                            for (var i = 0;
                                (item = curLoop[i]) != null; i++) {
                                if (item) {
                                    found = filter(item, match, i, curLoop);
                                    var pass = not ^ !! found;
                                    if (inplace && found != null) {
                                        if (pass) {
                                            anyFound = true;
                                        } else {
                                            curLoop[i] = false;
                                        }
                                    } else if (pass) {
                                        result.push(item);
                                        anyFound = true;
                                    }
                                }
                            }
                        }
                        if (found !== undefined) {
                            if (!inplace) {
                                curLoop = result;
                            }
                            expr = expr.replace(Expr.match[type], "");
                            if (!anyFound) {
                                return [];
                            }
                            break;
                        }
                    }
                }
                if (expr === old) {
                    if (anyFound == null) {
                        Sizzle.error(expr);
                    } else {
                        break;
                    }
                }
                old = expr;
            }
            return curLoop;
        };
        Sizzle.error = function (msg) {
            throw "Syntax error, unrecognized expression: " + msg;
        };
        var Expr = Sizzle.selectors = {
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
                href: function (elem) {
                    return elem.getAttribute("href");
                },
                type: function (elem) {
                    return elem.getAttribute("type");
                }
            },
            relative: {
                "+": function (checkSet, part) {
                    var isPartStr = typeof part === "string",
                        isTag = isPartStr && !rNonWord.test(part),
                        isPartStrNotTag = isPartStr && !isTag;
                    if (isTag) {
                        part = part.toLowerCase();
                    }
                    for (var i = 0, l = checkSet.length, elem; i < l; i++) {
                        if ((elem = checkSet[i])) {
                            while ((elem = elem.previousSibling) && elem.nodeType !== 1) {}
                            checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part;
                        }
                    }
                    if (isPartStrNotTag) {
                        Sizzle.filter(part, checkSet, true);
                    }
                },
                ">": function (checkSet, part) {
                    var elem, isPartStr = typeof part === "string",
                        i = 0,
                        l = checkSet.length;
                    if (isPartStr && !rNonWord.test(part)) {
                        part = part.toLowerCase();
                        for (; i < l; i++) {
                            elem = checkSet[i];
                            if (elem) {
                                var parent = elem.parentNode;
                                checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
                            }
                        }
                    } else {
                        for (; i < l; i++) {
                            elem = checkSet[i];
                            if (elem) {
                                checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part;
                            }
                        }
                        if (isPartStr) {
                            Sizzle.filter(part, checkSet, true);
                        }
                    }
                },
                "": function (checkSet, part, isXML) {
                    var nodeCheck, doneName = done++,
                        checkFn = dirCheck;
                    if (typeof part === "string" && !rNonWord.test(part)) {
                        part = part.toLowerCase();
                        nodeCheck = part;
                        checkFn = dirNodeCheck;
                    }
                    checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
                },
                "~": function (checkSet, part, isXML) {
                    var nodeCheck, doneName = done++,
                        checkFn = dirCheck;
                    if (typeof part === "string" && !rNonWord.test(part)) {
                        part = part.toLowerCase();
                        nodeCheck = part;
                        checkFn = dirNodeCheck;
                    }
                    checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
                }
            },
            find: {
                ID: function (match, context, isXML) {
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        return m && m.parentNode ? [m] : [];
                    }
                },
                NAME: function (match, context) {
                    if (typeof context.getElementsByName !== "undefined") {
                        var ret = [],
                            results = context.getElementsByName(match[1]);
                        for (var i = 0, l = results.length; i < l; i++) {
                            if (results[i].getAttribute("name") === match[1]) {
                                ret.push(results[i]);
                            }
                        }
                        return ret.length === 0 ? null : ret;
                    }
                },
                TAG: function (match, context) {
                    if (typeof context.getElementsByTagName !== "undefined") {
                        return context.getElementsByTagName(match[1]);
                    }
                }
            },
            preFilter: {
                CLASS: function (match, curLoop, inplace, result, not, isXML) {
                    match = " " + match[1].replace(rBackslash, "") + " ";
                    if (isXML) {
                        return match;
                    }
                    for (var i = 0, elem;
                        (elem = curLoop[i]) != null; i++) {
                        if (elem) {
                            if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0)) {
                                if (!inplace) {
                                    result.push(elem);
                                }
                            } else if (inplace) {
                                curLoop[i] = false;
                            }
                        }
                    }
                    return false;
                },
                ID: function (match) {
                    return match[1].replace(rBackslash, "");
                },
                TAG: function (match, curLoop) {
                    return match[1].replace(rBackslash, "").toLowerCase();
                },
                CHILD: function (match) {
                    if (match[1] === "nth") {
                        if (!match[2]) {
                            Sizzle.error(match[0]);
                        }
                        match[2] = match[2].replace(/^\+|\s*/g, '');
                        var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
                        match[2] = (test[1] + (test[2] || 1)) - 0;
                        match[3] = test[3] - 0;
                    } else if (match[2]) {
                        Sizzle.error(match[0]);
                    }
                    match[0] = done++;
                    return match;
                },
                ATTR: function (match, curLoop, inplace, result, not, isXML) {
                    var name = match[1] = match[1].replace(rBackslash, "");
                    if (!isXML && Expr.attrMap[name]) {
                        match[1] = Expr.attrMap[name];
                    }
                    match[4] = (match[4] || match[5] || "").replace(rBackslash, "");
                    if (match[2] === "~=") {
                        match[4] = " " + match[4] + " ";
                    }
                    return match;
                },
                PSEUDO: function (match, curLoop, inplace, result, not) {
                    if (match[1] === "not") {
                        if ((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])) {
                            match[3] = Sizzle(match[3], null, null, curLoop);
                        } else {
                            var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
                            if (!inplace) {
                                result.push.apply(result, ret);
                            }
                            return false;
                        }
                    } else if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
                        return true;
                    }
                    return match;
                },
                POS: function (match) {
                    match.unshift(true);
                    return match;
                }
            },
            filters: {
                enabled: function (elem) {
                    return elem.disabled === false && elem.type !== "hidden";
                },
                disabled: function (elem) {
                    return elem.disabled === true;
                },
                checked: function (elem) {
                    return elem.checked === true;
                },
                selected: function (elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                },
                parent: function (elem) {
                    return !!elem.firstChild;
                },
                empty: function (elem) {
                    return !elem.firstChild;
                },
                has: function (elem, i, match) {
                    return !!Sizzle(match[3], elem).length;
                },
                header: function (elem) {
                    return (/h\d/i).test(elem.nodeName);
                },
                text: function (elem) {
                    var attr = elem.getAttribute("type"),
                        type = elem.type;
                    return elem.nodeName.toLowerCase() === "input" && "text" === type && (attr === type || attr === null);
                },
                radio: function (elem) {
                    return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
                },
                checkbox: function (elem) {
                    return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
                },
                file: function (elem) {
                    return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
                },
                password: function (elem) {
                    return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
                },
                submit: function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && "submit" === elem.type;
                },
                image: function (elem) {
                    return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
                },
                reset: function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && "reset" === elem.type;
                },
                button: function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && "button" === elem.type || name === "button";
                },
                input: function (elem) {
                    return (/input|select|textarea|button/i).test(elem.nodeName);
                },
                focus: function (elem) {
                    return elem === elem.ownerDocument.activeElement;
                }
            },
            setFilters: {
                first: function (elem, i) {
                    return i === 0;
                },
                last: function (elem, i, match, array) {
                    return i === array.length - 1;
                },
                even: function (elem, i) {
                    return i % 2 === 0;
                },
                odd: function (elem, i) {
                    return i % 2 === 1;
                },
                lt: function (elem, i, match) {
                    return i < match[3] - 0;
                },
                gt: function (elem, i, match) {
                    return i > match[3] - 0;
                },
                nth: function (elem, i, match) {
                    return match[3] - 0 === i;
                },
                eq: function (elem, i, match) {
                    return match[3] - 0 === i;
                }
            },
            filter: {
                PSEUDO: function (elem, match, i, array) {
                    var name = match[1],
                        filter = Expr.filters[name];
                    if (filter) {
                        return filter(elem, i, match, array);
                    } else if (name === "contains") {
                        return (elem.textContent || elem.innerText || Sizzle.getText([elem]) || "").indexOf(match[3]) >= 0;
                    } else if (name === "not") {
                        var not = match[3];
                        for (var j = 0, l = not.length; j < l; j++) {
                            if (not[j] === elem) {
                                return false;
                            }
                        }
                        return true;
                    } else {
                        Sizzle.error(name);
                    }
                },
                CHILD: function (elem, match) {
                    var type = match[1],
                        node = elem;
                    switch (type) {
                    case "only":
                    case "first":
                        while ((node = node.previousSibling)) {
                            if (node.nodeType === 1) {
                                return false;
                            }
                        }
                        if (type === "first") {
                            return true;
                        }
                        node = elem;
                    case "last":
                        while ((node = node.nextSibling)) {
                            if (node.nodeType === 1) {
                                return false;
                            }
                        }
                        return true;
                    case "nth":
                        var first = match[2],
                            last = match[3];
                        if (first === 1 && last === 0) {
                            return true;
                        }
                        var doneName = match[0],
                            parent = elem.parentNode;
                        if (parent && (parent.sizcache !== doneName || !elem.nodeIndex)) {
                            var count = 0;
                            for (node = parent.firstChild; node; node = node.nextSibling) {
                                if (node.nodeType === 1) {
                                    node.nodeIndex = ++count;
                                }
                            }
                            parent.sizcache = doneName;
                        }
                        var diff = elem.nodeIndex - last;
                        if (first === 0) {
                            return diff === 0;
                        } else {
                            return (diff % first === 0 && diff / first >= 0);
                        }
                    }
                },
                ID: function (elem, match) {
                    return elem.nodeType === 1 && elem.getAttribute("id") === match;
                },
                TAG: function (elem, match) {
                    return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
                },
                CLASS: function (elem, match) {
                    return (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1;
                },
                ATTR: function (elem, match) {
                    var name = match[1],
                        result = Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name),
                        value = result + "",
                        type = match[2],
                        check = match[4];
                    return result == null ? type === "!=" : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false;
                },
                POS: function (elem, match, i, array) {
                    var name = match[2],
                        filter = Expr.setFilters[name];
                    if (filter) {
                        return filter(elem, i, match, array);
                    }
                }
            }
        };
        var origPOS = Expr.match.POS,
            fescape = function (all, num) {
                return "\\" + (num - 0 + 1);
            };
        for (var type in Expr.match) {
            Expr.match[type] = new RegExp(Expr.match[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
            Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape));
        }
        var makeArray = function (array, results) {
            array = Array.prototype.slice.call(array, 0);
            if (results) {
                results.push.apply(results, array);
                return results;
            }
            return array;
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
        } catch (e) {
            makeArray = function (array, results) {
                var i = 0,
                    ret = results || [];
                if (toString.call(array) === "[object Array]") {
                    Array.prototype.push.apply(ret, array);
                } else {
                    if (typeof array.length === "number") {
                        for (var l = array.length; i < l; i++) {
                            ret.push(array[i]);
                        }
                    } else {
                        for (; array[i]; i++) {
                            ret.push(array[i]);
                        }
                    }
                }
                return ret;
            };
        }
        var sortOrder, siblingCheck;
        if (document.documentElement.compareDocumentPosition) {
            sortOrder = function (a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                    return a.compareDocumentPosition ? -1 : 1;
                }
                return a.compareDocumentPosition(b) & 4 ? -1 : 1;
            };
        } else {
            sortOrder = function (a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                } else if (a.sourceIndex && b.sourceIndex) {
                    return a.sourceIndex - b.sourceIndex;
                }
                var al, bl, ap = [],
                    bp = [],
                    aup = a.parentNode,
                    bup = b.parentNode,
                    cur = aup;
                if (aup === bup) {
                    return siblingCheck(a, b);
                } else if (!aup) {
                    return -1;
                } else if (!bup) {
                    return 1;
                }
                while (cur) {
                    ap.unshift(cur);
                    cur = cur.parentNode;
                }
                cur = bup;
                while (cur) {
                    bp.unshift(cur);
                    cur = cur.parentNode;
                }
                al = ap.length;
                bl = bp.length;
                for (var i = 0; i < al && i < bl; i++) {
                    if (ap[i] !== bp[i]) {
                        return siblingCheck(ap[i], bp[i]);
                    }
                }
                return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
            };
            siblingCheck = function (a, b, ret) {
                if (a === b) {
                    return ret;
                }
                var cur = a.nextSibling;
                while (cur) {
                    if (cur === b) {
                        return -1;
                    }
                    cur = cur.nextSibling;
                }
                return 1;
            };
        }
        Sizzle.getText = function (elems) {
            var ret = "",
                elem;
            for (var i = 0; elems[i]; i++) {
                elem = elems[i];
                if (elem.nodeType === 3 || elem.nodeType === 4) {
                    ret += elem.nodeValue;
                } else if (elem.nodeType !== 8) {
                    ret += Sizzle.getText(elem.childNodes);
                }
            }
            return ret;
        };
        (function () {
            var form = document.createElement("div"),
                id = "script" + (new Date()).getTime(),
                root = document.documentElement;
            form.innerHTML = "<a name='" + id + "'/>";
            root.insertBefore(form, root.firstChild);
            if (document.getElementById(id)) {
                Expr.find.ID = function (match, context, isXML) {
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
                    }
                };
                Expr.filter.ID = function (elem, match) {
                    var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                    return elem.nodeType === 1 && node && node.nodeValue === match;
                };
            }
            root.removeChild(form);
            root = form = null;
        })();
        (function () {
            var div = document.createElement("div");
            div.appendChild(document.createComment(""));
            if (div.getElementsByTagName("*").length > 0) {
                Expr.find.TAG = function (match, context) {
                    var results = context.getElementsByTagName(match[1]);
                    if (match[1] === "*") {
                        var tmp = [];
                        for (var i = 0; results[i]; i++) {
                            if (results[i].nodeType === 1) {
                                tmp.push(results[i]);
                            }
                        }
                        results = tmp;
                    }
                    return results;
                };
            }
            div.innerHTML = "<a href='#'></a>";
            if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#") {
                Expr.attrHandle.href = function (elem) {
                    return elem.getAttribute("href", 2);
                };
            }
            div = null;
        })();
        if (document.querySelectorAll) {
            (function () {
                var oldSizzle = Sizzle,
                    div = document.createElement("div"),
                    id = "__sizzle__";
                div.innerHTML = "<p class='TEST'></p>";
                if (div.querySelectorAll && div.querySelectorAll(".TEST").length === 0) {
                    return;
                }
                Sizzle = function (query, context, extra, seed) {
                    context = context || document;
                    if (!seed && !Sizzle.isXML(context)) {
                        var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);
                        if (match && (context.nodeType === 1 || context.nodeType === 9)) {
                            if (match[1]) {
                                return makeArray(context.getElementsByTagName(query), extra);
                            } else if (match[2] && Expr.find.CLASS && context.getElementsByClassName) {
                                return makeArray(context.getElementsByClassName(match[2]), extra);
                            }
                        }
                        if (context.nodeType === 9) {
                            if (query === "body" && context.body) {
                                return makeArray([context.body], extra);
                            } else if (match && match[3]) {
                                var elem = context.getElementById(match[3]);
                                if (elem && elem.parentNode) {
                                    if (elem.id === match[3]) {
                                        return makeArray([elem], extra);
                                    }
                                } else {
                                    return makeArray([], extra);
                                }
                            }
                            try {
                                return makeArray(context.querySelectorAll(query), extra);
                            } catch (qsaError) {}
                        } else if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            var oldContext = context,
                                old = context.getAttribute("id"),
                                nid = old || id,
                                hasParent = context.parentNode,
                                relativeHierarchySelector = /^\s*[+~]/.test(query);
                            if (!old) {
                                context.setAttribute("id", nid);
                            } else {
                                nid = nid.replace(/'/g, "\\$&");
                            }
                            if (relativeHierarchySelector && hasParent) {
                                context = context.parentNode;
                            }
                            try {
                                if (!relativeHierarchySelector || hasParent) {
                                    return makeArray(context.querySelectorAll("[id='" + nid + "'] " + query), extra);
                                }
                            } catch (pseudoError) {} finally {
                                if (!old) {
                                    oldContext.removeAttribute("id");
                                }
                            }
                        }
                    }
                    return oldSizzle(query, context, extra, seed);
                };
                for (var prop in oldSizzle) {
                    Sizzle[prop] = oldSizzle[prop];
                }
                div = null;
            })();
        }
        (function () {
            var html = document.documentElement,
                matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;
            if (matches) {
                var disconnectedMatch = !matches.call(document.createElement("div"), "div"),
                    pseudoWorks = false;
                try {
                    matches.call(document.documentElement, "[test!='']:sizzle");
                } catch (pseudoError) {
                    pseudoWorks = true;
                }
                Sizzle.matchesSelector = function (node, expr) {
                    expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!Sizzle.isXML(node)) {
                        try {
                            if (pseudoWorks || !Expr.match.PSEUDO.test(expr) && !/!=/.test(expr)) {
                                var ret = matches.call(node, expr);
                                if (ret || !disconnectedMatch || node.document && node.document.nodeType !== 11) {
                                    return ret;
                                }
                            }
                        } catch (e) {}
                    }
                    return Sizzle(expr, null, null, [node]).length > 0;
                };
            }
        })();
        (function () {
            var div = document.createElement("div");
            div.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!div.getElementsByClassName || div.getElementsByClassName("e").length === 0) {
                return;
            }
            div.lastChild.className = "e";
            if (div.getElementsByClassName("e").length === 1) {
                return;
            }
            Expr.order.splice(1, 0, "CLASS");
            Expr.find.CLASS = function (match, context, isXML) {
                if (typeof context.getElementsByClassName !== "undefined" && !isXML) {
                    return context.getElementsByClassName(match[1]);
                }
            };
            div = null;
        })();

        function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    var match = false;
                    elem = elem[dir];
                    while (elem) {
                        if (elem.sizcache === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        if (elem.nodeType === 1 && !isXML) {
                            elem.sizcache = doneName;
                            elem.sizset = i;
                        }
                        if (elem.nodeName.toLowerCase() === cur) {
                            match = elem;
                            break;
                        }
                        elem = elem[dir];
                    }
                    checkSet[i] = match;
                }
            }
        }

        function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    var match = false;
                    elem = elem[dir];
                    while (elem) {
                        if (elem.sizcache === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        if (elem.nodeType === 1) {
                            if (!isXML) {
                                elem.sizcache = doneName;
                                elem.sizset = i;
                            }
                            if (typeof cur !== "string") {
                                if (elem === cur) {
                                    match = true;
                                    break;
                                }
                            } else if (Sizzle.filter(cur, [elem]).length > 0) {
                                match = elem;
                                break;
                            }
                        }
                        elem = elem[dir];
                    }
                    checkSet[i] = match;
                }
            }
        }
        if (document.documentElement.contains) {
            Sizzle.contains = function (a, b) {
                return a !== b && (a.contains ? a.contains(b) : true);
            };
        } else if (document.documentElement.compareDocumentPosition) {
            Sizzle.contains = function (a, b) {
                return !!(a.compareDocumentPosition(b) & 16);
            };
        } else {
            Sizzle.contains = function () {
                return false;
            };
        }
        Sizzle.isXML = function (elem) {
            var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        var posProcess = function (selector, context) {
            var match, tmpSet = [],
                later = "",
                root = context.nodeType ? [context] : context;
            while ((match = Expr.match.PSEUDO.exec(selector))) {
                later += match[0];
                selector = selector.replace(Expr.match.PSEUDO, "");
            }
            selector = Expr.relative[selector] ? selector + "*" : selector;
            for (var i = 0, l = root.length; i < l; i++) {
                Sizzle(selector, root[i], tmpSet);
            }
            return Sizzle.filter(later, tmpSet);
        };
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.filters;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
    })();
    var runtil = /Until$/,
        rparentsprev = /^(?:parents|prevUntil|prevAll)/,
        rmultiselector = /,/,
        isSimple = /^.[^:#\[\.,]*$/,
        slice = Array.prototype.slice,
        POS = jQuery.expr.match.POS,
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery.fn.extend({
        find: function (selector) {
            var self = this,
                i, l;
            if (typeof selector !== "string") {
                return jQuery(selector).filter(function () {
                    for (i = 0, l = self.length; i < l; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                });
            }
            var ret = this.pushStack("", "find", selector),
                length, n, r;
            for (i = 0, l = this.length; i < l; i++) {
                length = ret.length;
                jQuery.find(selector, this[i], ret);
                if (i > 0) {
                    for (n = length; n < ret.length; n++) {
                        for (r = 0; r < length; r++) {
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break;
                            }
                        }
                    }
                }
            }
            return ret;
        },
        has: function (target) {
            var targets = jQuery(target);
            return this.filter(function () {
                for (var i = 0, l = targets.length; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        not: function (selector) {
            return this.pushStack(winnow(this, selector, false), "not", selector);
        },
        filter: function (selector) {
            return this.pushStack(winnow(this, selector, true), "filter", selector);
        },
        is: function (selector) {
            return !!selector && (typeof selector === "string" ? jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0);
        },
        closest: function (selectors, context) {
            var ret = [],
                i, l, cur = this[0];
            if (jQuery.isArray(selectors)) {
                var match, selector, matches = {}, level = 1;
                if (cur && selectors.length) {
                    for (i = 0, l = selectors.length; i < l; i++) {
                        selector = selectors[i];
                        if (!matches[selector]) {
                            matches[selector] = POS.test(selector) ? jQuery(selector, context || this.context) : selector;
                        }
                    }
                    while (cur && cur.ownerDocument && cur !== context) {
                        for (selector in matches) {
                            match = matches[selector];
                            if (match.jquery ? match.index(cur) > -1 : jQuery(cur).is(match)) {
                                ret.push({
                                    selector: selector,
                                    elem: cur,
                                    level: level
                                });
                            }
                        }
                        cur = cur.parentNode;
                        level++;
                    }
                }
                return ret;
            }
            var pos = POS.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (i = 0, l = this.length; i < l; i++) {
                cur = this[i];
                while (cur) {
                    if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                        ret.push(cur);
                        break;
                    } else {
                        cur = cur.parentNode;
                        if (!cur || !cur.ownerDocument || cur === context || cur.nodeType === 11) {
                            break;
                        }
                    }
                }
            }
            ret = ret.length > 1 ? jQuery.unique(ret) : ret;
            return this.pushStack(ret, "closest", selectors);
        },
        index: function (elem) {
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.prevAll().length : -1;
            }
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem));
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
        },
        add: function (selector, context) {
            var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
                all = jQuery.merge(this.get(), set);
            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all));
        },
        andSelf: function () {
            return this.add(this.prevObject);
        }
    });

    function isDisconnected(node) {
        return !node || !node.parentNode || node.parentNode.nodeType === 11;
    }
    jQuery.each({
        parent: function (elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function (elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function (elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function (elem) {
            return jQuery.nth(elem, 2, "nextSibling");
        },
        prev: function (elem) {
            return jQuery.nth(elem, 2, "previousSibling");
        },
        nextAll: function (elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function (elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function (elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function (elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function (elem) {
            return jQuery.sibling(elem.parentNode.firstChild, elem);
        },
        children: function (elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function (elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.makeArray(elem.childNodes);
        }
    }, function (name, fn) {
        jQuery.fn[name] = function (until, selector) {
            var ret = jQuery.map(this, fn, until),
                args = slice.call(arguments);
            if (!runtil.test(name)) {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }
            ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
            if ((this.length > 1 || rmultiselector.test(selector)) && rparentsprev.test(name)) {
                ret = ret.reverse();
            }
            return this.pushStack(ret, name, args.join(","));
        };
    });
    jQuery.extend({
        filter: function (expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")";
            }
            return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems);
        },
        dir: function (elem, dir, until) {
            var matched = [],
                cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        },
        nth: function (cur, result, dir, elem) {
            result = result || 1;
            var num = 0;
            for (; cur; cur = cur[dir]) {
                if (cur.nodeType === 1 && ++num === result) {
                    break;
                }
            }
            return cur;
        },
        sibling: function (n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }
            return r;
        }
    });

    function winnow(elements, qualifier, keep) {
        qualifier = qualifier || 0;
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function (elem, i) {
                var retVal = !! qualifier.call(elem, i, elem);
                return retVal === keep;
            });
        } else if (qualifier.nodeType) {
            return jQuery.grep(elements, function (elem, i) {
                return (elem === qualifier) === keep;
            });
        } else if (typeof qualifier === "string") {
            var filtered = jQuery.grep(elements, function (elem) {
                return elem.nodeType === 1;
            });
            if (isSimple.test(qualifier)) {
                return jQuery.filter(qualifier, filtered, !keep);
            } else {
                qualifier = jQuery.filter(qualifier, filtered);
            }
        }
        return jQuery.grep(elements, function (elem, i) {
            return (jQuery.inArray(elem, qualifier) >= 0) === keep;
        });
    }
    var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnocache = /<(?:script|object|embed|option|style)/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /\/(java|ecma)script/i,
        rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    if (!jQuery.support.htmlSerialize) {
        wrapMap._default = [1, "div<div>", "</div>"];
    }
    jQuery.fn.extend({
        text: function (text) {
            if (jQuery.isFunction(text)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    self.text(text.call(this, i, self.text()));
                });
            }
            if (typeof text !== "object" && text !== undefined) {
                return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(text));
            }
            return jQuery.text(this);
        },
        wrapAll: function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function () {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function () {
                var self = jQuery(this),
                    contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function (html) {
            return this.each(function () {
                jQuery(this).wrapAll(html);
            });
        },
        unwrap: function () {
            return this.parent().each(function () {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        },
        append: function () {
            return this.domManip(arguments, true, function (elem) {
                if (this.nodeType === 1) {
                    this.appendChild(elem);
                }
            });
        },
        prepend: function () {
            return this.domManip(arguments, true, function (elem) {
                if (this.nodeType === 1) {
                    this.insertBefore(elem, this.firstChild);
                }
            });
        },
        before: function () {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function (elem) {
                    this.parentNode.insertBefore(elem, this);
                });
            } else if (arguments.length) {
                var set = jQuery(arguments[0]);
                set.push.apply(set, this.toArray());
                return this.pushStack(set, "before", arguments);
            }
        },
        after: function () {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function (elem) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                });
            } else if (arguments.length) {
                var set = this.pushStack(this, "after", arguments);
                set.push.apply(set, jQuery(arguments[0]).toArray());
                return set;
            }
        },
        remove: function (selector, keepData) {
            for (var i = 0, elem;
                (elem = this[i]) != null; i++) {
                if (!selector || jQuery.filter(selector, [elem]).length) {
                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(elem.getElementsByTagName("*"));
                        jQuery.cleanData([elem]);
                    }
                    if (elem.parentNode) {
                        elem.parentNode.removeChild(elem);
                    }
                }
            }
            return this;
        },
        empty: function () {
            for (var i = 0, elem;
                (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(elem.getElementsByTagName("*"));
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
            }
            return this;
        },
        clone: function (dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function () {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function (value) {
            if (value === undefined) {
                return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(rinlinejQuery, "") : null;
            } else if (typeof value === "string" && !rnocache.test(value) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                value = value.replace(rxhtmlTag, "<$1></$2>");
                try {
                    for (var i = 0, l = this.length; i < l; i++) {
                        if (this[i].nodeType === 1) {
                            jQuery.cleanData(this[i].getElementsByTagName("*"));
                            this[i].innerHTML = value;
                        }
                    }
                } catch (e) {
                    this.empty().append(value);
                }
            } else if (jQuery.isFunction(value)) {
                this.each(function (i) {
                    var self = jQuery(this);
                    self.html(value.call(this, i, self.html()));
                });
            } else {
                this.empty().append(value);
            }
            return this;
        },
        replaceWith: function (value) {
            if (this[0] && this[0].parentNode) {
                if (jQuery.isFunction(value)) {
                    return this.each(function (i) {
                        var self = jQuery(this),
                            old = self.html();
                        self.replaceWith(value.call(this, i, old));
                    });
                }
                if (typeof value !== "string") {
                    value = jQuery(value).detach();
                }
                return this.each(function () {
                    var next = this.nextSibling,
                        parent = this.parentNode;
                    jQuery(this).remove();
                    if (next) {
                        jQuery(next).before(value);
                    } else {
                        jQuery(parent).append(value);
                    }
                });
            } else {
                return this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value) : this;
            }
        },
        detach: function (selector) {
            return this.remove(selector, true);
        },
        domManip: function (args, table, callback) {
            var results, first, fragment, parent, value = args[0],
                scripts = [];
            if (!jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test(value)) {
                return this.each(function () {
                    jQuery(this).domManip(args, table, callback, true);
                });
            }
            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    args[0] = value.call(this, i, table ? self.html() : undefined);
                    self.domManip(args, table, callback);
                });
            }
            if (this[0]) {
                parent = value && value.parentNode;
                if (jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length) {
                    results = {
                        fragment: parent
                    };
                } else {
                    results = jQuery.buildFragment(args, this, scripts);
                }
                fragment = results.fragment;
                if (fragment.childNodes.length === 1) {
                    first = fragment = fragment.firstChild;
                } else {
                    first = fragment.firstChild;
                }
                if (first) {
                    table = table && jQuery.nodeName(first, "tr");
                    for (var i = 0, l = this.length, lastIndex = l - 1; i < l; i++) {
                        callback.call(table ? root(this[i], first) : this[i], results.cacheable || (l > 1 && i < lastIndex) ? jQuery.clone(fragment, true, true) : fragment);
                    }
                }
                if (scripts.length) {
                    jQuery.each(scripts, evalScript);
                }
            }
            return this;
        }
    });

    function root(elem, cur) {
        return jQuery.nodeName(elem, "table") ? (elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody"))) : elem;
    }

    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return;
        }
        var internalKey = jQuery.expando,
            oldData = jQuery.data(src),
            curData = jQuery.data(dest, oldData);
        if ((oldData = oldData[internalKey])) {
            var events = oldData.events;
            curData = curData[internalKey] = jQuery.extend({}, oldData);
            if (events) {
                delete curData.handle;
                curData.events = {};
                for (var type in events) {
                    for (var i = 0, l = events[type].length; i < l; i++) {
                        jQuery.event.add(dest, type + (events[type][i].namespace ? "." : "") + events[type][i].namespace, events[type][i], events[type][i].data);
                    }
                }
            }
        }
    }

    function cloneFixAttributes(src, dest) {
        var nodeName;
        if (dest.nodeType !== 1) {
            return;
        }
        if (dest.clearAttributes) {
            dest.clearAttributes();
        }
        if (dest.mergeAttributes) {
            dest.mergeAttributes(src);
        }
        nodeName = dest.nodeName.toLowerCase();
        if (nodeName === "object") {
            dest.outerHTML = src.outerHTML;
        } else if (nodeName === "input" && (src.type === "checkbox" || src.type === "radio")) {
            if (src.checked) {
                dest.defaultChecked = dest.checked = src.checked;
            }
            if (dest.value !== src.value) {
                dest.value = src.value;
            }
        } else if (nodeName === "option") {
            dest.selected = src.defaultSelected;
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
        dest.removeAttribute(jQuery.expando);
    }
    jQuery.buildFragment = function (args, nodes, scripts) {
        var fragment, cacheable, cacheresults, doc;
        if (nodes && nodes[0]) {
            doc = nodes[0].ownerDocument || nodes[0];
        }
        if (!doc.createDocumentFragment) {
            doc = document;
        }
        if (args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document && args[0].charAt(0) === "<" && !rnocache.test(args[0]) && (jQuery.support.checkClone || !rchecked.test(args[0]))) {
            cacheable = true;
            cacheresults = jQuery.fragments[args[0]];
            if (cacheresults && cacheresults !== 1) {
                fragment = cacheresults;
            }
        }
        if (!fragment) {
            fragment = doc.createDocumentFragment();
            jQuery.clean(args, doc, fragment, scripts);
        }
        if (cacheable) {
            jQuery.fragments[args[0]] = cacheresults ? fragment : 1;
        }
        return {
            fragment: fragment,
            cacheable: cacheable
        };
    };
    jQuery.fragments = {};
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (name, original) {
        jQuery.fn[name] = function (selector) {
            var ret = [],
                insert = jQuery(selector),
                parent = this.length === 1 && this[0].parentNode;
            if (parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
                insert[original](this[0]);
                return this;
            } else {
                for (var i = 0, l = insert.length; i < l; i++) {
                    var elems = (i > 0 ? this.clone(true) : this).get();
                    jQuery(insert[i])[original](elems);
                    ret = ret.concat(elems);
                }
                return this.pushStack(ret, name, insert.selector);
            }
        };
    });

    function getAll(elem) {
        if ("getElementsByTagName" in elem) {
            return elem.getElementsByTagName("*");
        } else if ("querySelectorAll" in elem) {
            return elem.querySelectorAll("*");
        } else {
            return [];
        }
    }

    function fixDefaultChecked(elem) {
        if (elem.type === "checkbox" || elem.type === "radio") {
            elem.defaultChecked = elem.checked;
        }
    }

    function findInputs(elem) {
        if (jQuery.nodeName(elem, "input")) {
            fixDefaultChecked(elem);
        } else if ("getElementsByTagName" in elem) {
            jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked);
        }
    }
    jQuery.extend({
        clone: function (elem, dataAndEvents, deepDataAndEvents) {
            var clone = elem.cloneNode(true),
                srcElements, destElements, i;
            if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                cloneFixAttributes(elem, clone);
                srcElements = getAll(elem);
                destElements = getAll(clone);
                for (i = 0; srcElements[i]; ++i) {
                    if (destElements[i]) {
                        cloneFixAttributes(srcElements[i], destElements[i]);
                    }
                }
            }
            if (dataAndEvents) {
                cloneCopyEvent(elem, clone);
                if (deepDataAndEvents) {
                    srcElements = getAll(elem);
                    destElements = getAll(clone);
                    for (i = 0; srcElements[i]; ++i) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                }
            }
            srcElements = destElements = null;
            return clone;
        },
        clean: function (elems, context, fragment, scripts) {
            var checkScriptType;
            context = context || document;
            if (typeof context.createElement === "undefined") {
                context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
            }
            var ret = [],
                j;
            for (var i = 0, elem;
                (elem = elems[i]) != null; i++) {
                if (typeof elem === "number") {
                    elem += "";
                }
                if (!elem) {
                    continue;
                }
                if (typeof elem === "string") {
                    if (!rhtml.test(elem)) {
                        elem = context.createTextNode(elem);
                    } else {
                        elem = elem.replace(rxhtmlTag, "<$1></$2>");
                        var tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(),
                            wrap = wrapMap[tag] || wrapMap._default,
                            depth = wrap[0],
                            div = context.createElement("div");
                        div.innerHTML = wrap[1] + elem + wrap[2];
                        while (depth--) {
                            div = div.lastChild;
                        }
                        if (!jQuery.support.tbody) {
                            var hasBody = rtbody.test(elem),
                                tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === "<table>" && !hasBody ? div.childNodes : [];
                            for (j = tbody.length - 1; j >= 0; --j) {
                                if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                                    tbody[j].parentNode.removeChild(tbody[j]);
                                }
                            }
                        }
                        if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild);
                        }
                        elem = div.childNodes;
                    }
                }
                var len;
                if (!jQuery.support.appendChecked) {
                    if (elem[0] && typeof (len = elem.length) === "number") {
                        for (j = 0; j < len; j++) {
                            findInputs(elem[j]);
                        }
                    } else {
                        findInputs(elem);
                    }
                }
                if (elem.nodeType) {
                    ret.push(elem);
                } else {
                    ret = jQuery.merge(ret, elem);
                }
            }
            if (fragment) {
                checkScriptType = function (elem) {
                    return !elem.type || rscriptType.test(elem.type);
                };
                for (i = 0; ret[i]; i++) {
                    if (scripts && jQuery.nodeName(ret[i], "script") && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript")) {
                        scripts.push(ret[i].parentNode ? ret[i].parentNode.removeChild(ret[i]) : ret[i]);
                    } else {
                        if (ret[i].nodeType === 1) {
                            var jsTags = jQuery.grep(ret[i].getElementsByTagName("script"), checkScriptType);
                            ret.splice.apply(ret, [i + 1, 0].concat(jsTags));
                        }
                        fragment.appendChild(ret[i]);
                    }
                }
            }
            return ret;
        },
        cleanData: function (elems) {
            var data, id, cache = jQuery.cache,
                internalKey = jQuery.expando,
                special = jQuery.event.special,
                deleteExpando = jQuery.support.deleteExpando;
            for (var i = 0, elem;
                (elem = elems[i]) != null; i++) {
                if (elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) {
                    continue;
                }
                id = elem[jQuery.expando];
                if (id) {
                    data = cache[id] && cache[id][internalKey];
                    if (data && data.events) {
                        for (var type in data.events) {
                            if (special[type]) {
                                jQuery.event.remove(elem, type);
                            } else {
                                jQuery.removeEvent(elem, type, data.handle);
                            }
                        }
                        if (data.handle) {
                            data.handle.elem = null;
                        }
                    }
                    if (deleteExpando) {
                        delete elem[jQuery.expando];
                    } else if (elem.removeAttribute) {
                        elem.removeAttribute(jQuery.expando);
                    }
                    delete cache[id];
                }
            }
        }
    });

    function evalScript(i, elem) {
        if (elem.src) {
            jQuery.ajax({
                url: elem.src,
                async: false,
                dataType: "script"
            });
        } else {
            jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, "/*$0*/"));
        }
        if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }
    }
    var ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity=([^)]*)/,
        rupper = /([A-Z]|^ms)/g,
        rnumpx = /^-?\d+(?:px)?$/i,
        rnum = /^-?\d/,
        rrelNum = /^([\-+])=([\-+.\de]+)/,
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, cssWidth = ["Left", "Right"],
        cssHeight = ["Top", "Bottom"],
        curCSS, getComputedStyle, currentStyle;
    jQuery.fn.css = function (name, value) {
        if (arguments.length === 2 && value === undefined) {
            return this;
        }
        return jQuery.access(this, name, value, true, function (elem, name, value) {
            return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
        });
    };
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function (elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity", "opacity");
                        return ret === "" ? "1" : ret;
                    } else {
                        return elem.style.opacity;
                    }
                }
            }
        },
        cssNumber: {
            "fillOpacity": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },
        cssProps: {
            "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            var ret, type, origName = jQuery.camelCase(name),
                style = elem.style,
                hooks = jQuery.cssHooks[origName];
            name = jQuery.cssProps[origName] || origName;
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (+(ret[1] + 1) * +ret[2]) + parseFloat(jQuery.css(elem, name));
                    type = "number";
                }
                if (value == null || type === "number" && isNaN(value)) {
                    return;
                }
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value)) !== undefined) {
                    try {
                        style[name] = value;
                    } catch (e) {}
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function (elem, name, extra) {
            var ret, hooks;
            name = jQuery.camelCase(name);
            hooks = jQuery.cssHooks[name];
            name = jQuery.cssProps[name] || name;
            if (name === "cssFloat") {
                name = "float";
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, true, extra)) !== undefined) {
                return ret;
            } else if (curCSS) {
                return curCSS(elem, name);
            }
        },
        swap: function (elem, options, callback) {
            var old = {};
            for (var name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            callback.call(elem);
            for (name in options) {
                elem.style[name] = old[name];
            }
        }
    });
    jQuery.curCSS = jQuery.css;
    jQuery.each(["height", "width"], function (i, name) {
        jQuery.cssHooks[name] = {
            get: function (elem, computed, extra) {
                var val;
                if (computed) {
                    if (elem.offsetWidth !== 0) {
                        return getWH(elem, name, extra);
                    } else {
                        jQuery.swap(elem, cssShow, function () {
                            val = getWH(elem, name, extra);
                        });
                    }
                    return val;
                }
            },
            set: function (elem, value) {
                if (rnumpx.test(value)) {
                    value = parseFloat(value);
                    if (value >= 0) {
                        return value + "px";
                    }
                } else {
                    return value;
                }
            }
        };
    });
    if (!jQuery.support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function (elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) + "" : computed ? "1" : "";
            },
            set: function (elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNaN(value) ? "" : "alpha(opacity=" + value * 100 + ")",
                    filter = currentStyle && currentStyle.filter || style.filter || "";
                style.zoom = 1;
                if (value >= 1 && jQuery.trim(filter.replace(ralpha, "")) === "") {
                    style.removeAttribute("filter");
                    if (currentStyle && !currentStyle.filter) {
                        return;
                    }
                }
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
            }
        };
    }
    jQuery(function () {
        if (!jQuery.support.reliableMarginRight) {
            jQuery.cssHooks.marginRight = {
                get: function (elem, computed) {
                    var ret;
                    jQuery.swap(elem, {
                        "display": "inline-block"
                    }, function () {
                        if (computed) {
                            ret = curCSS(elem, "margin-right", "marginRight");
                        } else {
                            ret = elem.style.marginRight;
                        }
                    });
                    return ret;
                }
            };
        }
    });
    if (document.defaultView && document.defaultView.getComputedStyle) {
        getComputedStyle = function (elem, name) {
            var ret, defaultView, computedStyle;
            name = name.replace(rupper, "-$1").toLowerCase();
            if (!(defaultView = elem.ownerDocument.defaultView)) {
                return undefined;
            }
            if ((computedStyle = defaultView.getComputedStyle(elem, null))) {
                ret = computedStyle.getPropertyValue(name);
                if (ret === "" && !jQuery.contains(elem.ownerDocument.documentElement, elem)) {
                    ret = jQuery.style(elem, name);
                }
            }
            return ret;
        };
    }
    if (document.documentElement.currentStyle) {
        currentStyle = function (elem, name) {
            var left, ret = elem.currentStyle && elem.currentStyle[name],
                rsLeft = elem.runtimeStyle && elem.runtimeStyle[name],
                style = elem.style;
            if (!rnumpx.test(ret) && rnum.test(ret)) {
                left = style.left;
                if (rsLeft) {
                    elem.runtimeStyle.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : (ret || 0);
                ret = style.pixelLeft + "px";
                style.left = left;
                if (rsLeft) {
                    elem.runtimeStyle.left = rsLeft;
                }
            }
            return ret === "" ? "auto" : ret;
        };
    }
    curCSS = getComputedStyle || currentStyle;

    function getWH(elem, name, extra) {
        var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            which = name === "width" ? cssWidth : cssHeight;
        if (val > 0) {
            if (extra !== "border") {
                jQuery.each(which, function () {
                    if (!extra) {
                        val -= parseFloat(jQuery.css(elem, "padding" + this)) || 0;
                    }
                    if (extra === "margin") {
                        val += parseFloat(jQuery.css(elem, extra + this)) || 0;
                    } else {
                        val -= parseFloat(jQuery.css(elem, "border" + this + "Width")) || 0;
                    }
                });
            }
            return val + "px";
        }
        val = curCSS(elem, name, name);
        if (val < 0 || val == null) {
            val = elem.style[name] || 0;
        }
        val = parseFloat(val) || 0;
        if (extra) {
            jQuery.each(which, function () {
                val += parseFloat(jQuery.css(elem, "padding" + this)) || 0;
                if (extra !== "padding") {
                    val += parseFloat(jQuery.css(elem, "border" + this + "Width")) || 0;
                }
                if (extra === "margin") {
                    val += parseFloat(jQuery.css(elem, extra + this)) || 0;
                }
            });
        }
        return val + "px";
    }
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function (elem) {
            var width = elem.offsetWidth,
                height = elem.offsetHeight;
            return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css(elem, "display")) === "none");
        };
        jQuery.expr.filters.visible = function (elem) {
            return !jQuery.expr.filters.hidden(elem);
        };
    }
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rhash = /#.*$/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rquery = /\?/,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        rselectTextarea = /^(?:select|textarea)/i,
        rspacesAjax = /\s+/,
        rts = /([?&])_=[^&]*/,
        rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        _load = jQuery.fn.load,
        prefilters = {}, transports = {}, ajaxLocation, ajaxLocParts, allTypes = ["*/"] + ["*"];
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    function addToPrefiltersOrTransports(structure) {
        return function (dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            if (jQuery.isFunction(func)) {
                var dataTypes = dataTypeExpression.toLowerCase().split(rspacesAjax),
                    i = 0,
                    length = dataTypes.length,
                    dataType, list, placeBefore;
                for (; i < length; i++) {
                    dataType = dataTypes[i];
                    placeBefore = /^\+/.test(dataType);
                    if (placeBefore) {
                        dataType = dataType.substr(1) || "*";
                    }
                    list = structure[dataType] = structure[dataType] || [];
                    list[placeBefore ? "unshift" : "push"](func);
                }
            }
        };
    }

    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
        dataType = dataType || options.dataTypes[0];
        inspected = inspected || {};
        inspected[dataType] = true;
        var list = structure[dataType],
            i = 0,
            length = list ? list.length : 0,
            executeOnly = (structure === prefilters),
            selection;
        for (; i < length && (executeOnly || !selection); i++) {
            selection = list[i](options, originalOptions, jqXHR);
            if (typeof selection === "string") {
                if (!executeOnly || inspected[selection]) {
                    selection = undefined;
                } else {
                    options.dataTypes.unshift(selection);
                    selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected);
                }
            }
        }
        if ((executeOnly || !selection) && !inspected["*"]) {
            selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected);
        }
        return selection;
    }

    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }
    }
    jQuery.fn.extend({
        load: function (url, params, callback) {
            if (typeof url !== "string" && _load) {
                return _load.apply(this, arguments);
            } else if (!this.length) {
                return this;
            }
            var off = url.indexOf(" ");
            if (off >= 0) {
                var selector = url.slice(off, url.length);
                url = url.slice(0, off);
            }
            var type = "GET";
            if (params) {
                if (jQuery.isFunction(params)) {
                    callback = params;
                    params = undefined;
                } else if (typeof params === "object") {
                    params = jQuery.param(params, jQuery.ajaxSettings.traditional);
                    type = "POST";
                }
            }
            var self = this;
            jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params,
                complete: function (jqXHR, status, responseText) {
                    responseText = jqXHR.responseText;
                    if (jqXHR.isResolved()) {
                        jqXHR.done(function (r) {
                            responseText = r;
                        });
                        self.html(selector ? jQuery("<div>").append(responseText.replace(rscript, "")).find(selector) : responseText);
                    }
                    if (callback) {
                        self.each(callback, [responseText, status, jqXHR]);
                    }
                }
            });
            return this;
        },
        serialize: function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? jQuery.makeArray(this.elements) : this;
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
            }).map(function (i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val, i) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    });
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (i, o) {
        jQuery.fn[o] = function (f) {
            return this.bind(o, f);
        };
    });
    jQuery.each(["get", "post"], function (i, method) {
        jQuery[method] = function (url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax({
                type: method,
                url: url,
                data: data,
                success: callback,
                dataType: type
            });
        };
    });
    jQuery.extend({
        getScript: function (url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        },
        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        ajaxSetup: function (target, settings) {
            if (settings) {
                ajaxExtend(target, jQuery.ajaxSettings);
            } else {
                settings = target;
                target = jQuery.ajaxSettings;
            }
            ajaxExtend(target, settings);
            return target;
        },
        ajaxSettings: {
            url: ajaxLocation,
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
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
                "*": allTypes
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
                "* text": window.String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                context: true,
                url: true
            }
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function (url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            options = options || {};
            var
            s = jQuery.ajaxSetup({}, options),
                callbackContext = s.context || s,
                globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event,
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery._Deferred(),
                statusCode = s.statusCode || {}, ifModifiedKey, requestHeaders = {}, requestHeadersNames = {}, responseHeadersString, responseHeaders, transport, timeoutTimer, parts, state = 0,
                fireGlobals, i, jqXHR = {
                    readyState: 0,
                    setRequestHeader: function (name, value) {
                        if (!state) {
                            var lname = name.toLowerCase();
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },
                    getAllResponseHeaders: function () {
                        return state === 2 ? responseHeadersString : null;
                    },
                    getResponseHeader: function (key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match === undefined ? null : match;
                    },
                    overrideMimeType: function (type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    },
                    abort: function (statusText) {
                        statusText = statusText || "abort";
                        if (transport) {
                            transport.abort(statusText);
                        }
                        done(0, statusText);
                        return this;
                    }
                };

            function done(status, nativeStatusText, responses, headers) {
                if (state === 2) {
                    return;
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                var isSuccess, success, error, statusText = nativeStatusText,
                    response = responses ? ajaxHandleResponses(s, jqXHR, responses) : undefined,
                    lastModified, etag;
                if (status >= 200 && status < 300 || status === 304) {
                    if (s.ifModified) {
                        if ((lastModified = jqXHR.getResponseHeader("Last-Modified"))) {
                            jQuery.lastModified[ifModifiedKey] = lastModified;
                        }
                        if ((etag = jqXHR.getResponseHeader("Etag"))) {
                            jQuery.etag[ifModifiedKey] = etag;
                        }
                    }
                    if (status === 304) {
                        statusText = "notmodified";
                        isSuccess = true;
                    } else {
                        try {
                            success = ajaxConvert(s, response);
                            statusText = "success";
                            isSuccess = true;
                        } catch (e) {
                            statusText = "parsererror";
                            error = e;
                        }
                    }
                } else {
                    error = statusText;
                    if (!statusText || status) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = "" + (nativeStatusText || statusText);
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"), [jqXHR, s, isSuccess ? success : error]);
                }
                completeDeferred.resolveWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }
            deferred.promise(jqXHR);
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            jqXHR.complete = completeDeferred.done;
            jqXHR.statusCode = function (map) {
                if (map) {
                    var tmp;
                    if (state < 2) {
                        for (tmp in map) {
                            statusCode[tmp] = [statusCode[tmp], map[tmp]];
                        }
                    } else {
                        tmp = map[jqXHR.status];
                        jqXHR.then(tmp, tmp);
                    }
                }
                return this;
            };
            s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(rspacesAjax);
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !! (parts && (parts[1] != ajaxLocParts[1] || parts[2] != ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))));
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return false;
            }
            fireGlobals = s.global;
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            if (!s.hasContent) {
                if (s.data) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
                    delete s.data;
                }
                ifModifiedKey = s.url;
                if (s.cache === false) {
                    var ts = jQuery.now(),
                        ret = s.url.replace(rts, "$1_=" + ts);
                    s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            if (s.ifModified) {
                ifModifiedKey = ifModifiedKey || s.url;
                if (jQuery.lastModified[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey]);
                }
                if (jQuery.etag[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey]);
                }
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                jqXHR.abort();
                return false;
            }
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                jqXHR[i](s[i]);
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function () {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (state < 2) {
                        done(-1, e);
                    } else {
                        jQuery.error(e);
                    }
                }
            }
            return jqXHR;
        },
        param: function (a, traditional) {
            var s = [],
                add = function (key, value) {
                    value = jQuery.isFunction(value) ? value() : value;
                    s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
                };
            if (traditional === undefined) {
                traditional = jQuery.ajaxSettings.traditional;
            }
            if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
                jQuery.each(a, function () {
                    add(this.name, this.value);
                });
            } else {
                for (var prefix in a) {
                    buildParams(prefix, a[prefix], traditional, add);
                }
            }
            return s.join("&").replace(r20, "+");
        }
    });

    function buildParams(prefix, obj, traditional, add) {
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" || jQuery.isArray(v) ? i : "") + "]", v, traditional, add);
                }
            });
        } else if (!traditional && obj != null && typeof obj === "object") {
            for (var name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
        } else {
            add(prefix, obj);
        }
    }
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });

    function ajaxHandleResponses(s, jqXHR, responses) {
        var contents = s.contents,
            dataTypes = s.dataTypes,
            responseFields = s.responseFields,
            ct, type, finalDataType, firstDataType;
        for (type in responseFields) {
            if (type in responses) {
                jqXHR[responseFields[type]] = responses[type];
            }
        }
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("content-type");
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    function ajaxConvert(s, response) {
        if (s.dataFilter) {
            response = s.dataFilter(response, s.dataType);
        }
        var dataTypes = s.dataTypes,
            converters = {}, i, key, length = dataTypes.length,
            tmp, current = dataTypes[0],
            prev, conversion, conv, conv1, conv2;
        for (i = 1; i < length; i++) {
            if (i === 1) {
                for (key in s.converters) {
                    if (typeof key === "string") {
                        converters[key.toLowerCase()] = s.converters[key];
                    }
                }
            }
            prev = current;
            current = dataTypes[i];
            if (current === "*") {
                current = prev;
            } else if (prev !== "*" && prev !== current) {
                conversion = prev + " " + current;
                conv = converters[conversion] || converters["* " + current];
                if (!conv) {
                    conv2 = undefined;
                    for (conv1 in converters) {
                        tmp = conv1.split(" ");
                        if (tmp[0] === prev || tmp[0] === "*") {
                            conv2 = converters[tmp[1] + " " + current];
                            if (conv2) {
                                conv1 = converters[conv1];
                                if (conv1 === true) {
                                    conv = conv2;
                                } else if (conv2 === true) {
                                    conv = conv1;
                                }
                                break;
                            }
                        }
                    }
                }
                if (!(conv || conv2)) {
                    jQuery.error("No conversion from " + conversion.replace(" ", " to "));
                }
                if (conv !== true) {
                    response = conv ? conv(response) : conv2(conv1(response));
                }
            }
        }
        return response;
    }
    var jsc = jQuery.now(),
        jsre = /(\=)\?(&|$)|\?\?/i;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            return jQuery.expando + "_" + (jsc++);
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
        var inspectData = s.contentType === "application/x-www-form-urlencoded" && (typeof s.data === "string");
        if (s.dataTypes[0] === "jsonp" || s.jsonp !== false && (jsre.test(s.url) || inspectData && jsre.test(s.data))) {
            var responseContainer, jsonpCallback = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback,
                previous = window[jsonpCallback],
                url = s.url,
                data = s.data,
                replace = "$1" + jsonpCallback + "$2";
            if (s.jsonp !== false) {
                url = url.replace(jsre, replace);
                if (s.url === url) {
                    if (inspectData) {
                        data = data.replace(jsre, replace);
                    }
                    if (s.data === data) {
                        url += (/\?/.test(url) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
                    }
                }
            }
            s.url = url;
            s.data = data;
            window[jsonpCallback] = function (response) {
                responseContainer = [response];
            };
            jqXHR.always(function () {
                window[jsonpCallback] = previous;
                if (responseContainer && jQuery.isFunction(previous)) {
                    window[jsonpCallback](responseContainer[0]);
                }
            });
            s.converters["script json"] = function () {
                if (!responseContainer) {
                    jQuery.error(jsonpCallback + " was not called");
                }
                return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            return "script";
        }
    });
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function (text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter("script", function (s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });
    jQuery.ajaxTransport("script", function (s) {
        if (s.crossDomain) {
            var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            return {
                send: function (_, callback) {
                    script = document.createElement("script");
                    script.async = "async";
                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }
                    script.src = s.url;
                    script.onload = script.onreadystatechange = function (_, isAbort) {
                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                            script.onload = script.onreadystatechange = null;
                            if (head && script.parentNode) {
                                head.removeChild(script);
                            }
                            script = undefined;
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };
                    head.insertBefore(script, head.firstChild);
                },
                abort: function () {
                    if (script) {
                        script.onload(0, 1);
                    }
                }
            };
        }
    });
    var
    xhrOnUnloadAbort = window.ActiveXObject ? function () {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](0, 1);
            }
        } : false,
        xhrId = 0,
        xhrCallbacks;

    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function () {
        return !this.isLocal && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    (function (xhr) {
        jQuery.extend(jQuery.support, {
            ajax: !! xhr,
            cors: !! xhr && ("withCredentials" in xhr)
        });
    })(jQuery.ajaxSettings.xhr());
    if (jQuery.support.ajax) {
        jQuery.ajaxTransport(function (s) {
            if (!s.crossDomain || jQuery.support.cors) {
                var callback;
                return {
                    send: function (headers, complete) {
                        var xhr = s.xhr(),
                            handle, i;
                        if (s.username) {
                            xhr.open(s.type, s.url, s.async, s.username, s.password);
                        } else {
                            xhr.open(s.type, s.url, s.async);
                        }
                        if (s.xhrFields) {
                            for (i in s.xhrFields) {
                                xhr[i] = s.xhrFields[i];
                            }
                        }
                        if (s.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(s.mimeType);
                        }
                        if (!s.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }
                        try {
                            for (i in headers) {
                                xhr.setRequestHeader(i, headers[i]);
                            }
                        } catch (_) {}
                        xhr.send((s.hasContent && s.data) || null);
                        callback = function (_, isAbort) {
                            var status, statusText, responseHeaders, responses, xml;
                            try {
                                if (callback && (isAbort || xhr.readyState === 4)) {
                                    callback = undefined;
                                    if (handle) {
                                        xhr.onreadystatechange = jQuery.noop;
                                        if (xhrOnUnloadAbort) {
                                            delete xhrCallbacks[handle];
                                        }
                                    }
                                    if (isAbort) {
                                        if (xhr.readyState !== 4) {
                                            xhr.abort();
                                        }
                                    } else {
                                        status = xhr.status;
                                        responseHeaders = xhr.getAllResponseHeaders();
                                        responses = {};
                                        xml = xhr.responseXML;
                                        if (xml && xml.documentElement) {
                                            responses.xml = xml;
                                        }
                                        responses.text = xhr.responseText;
                                        try {
                                            statusText = xhr.statusText;
                                        } catch (e) {
                                            statusText = "";
                                        }
                                        if (!status && s.isLocal && !s.crossDomain) {
                                            status = responses.text ? 200 : 404;
                                        } else if (status === 1223) {
                                            status = 204;
                                        }
                                    }
                                }
                            } catch (firefoxAccessException) {
                                if (!isAbort) {
                                    complete(-1, firefoxAccessException);
                                }
                            }
                            if (responses) {
                                complete(status, statusText, responses, responseHeaders);
                            }
                        };
                        if (!s.async || xhr.readyState === 4) {
                            callback();
                        } else {
                            handle = ++xhrId;
                            if (xhrOnUnloadAbort) {
                                if (!xhrCallbacks) {
                                    xhrCallbacks = {};
                                    jQuery(window).unload(xhrOnUnloadAbort);
                                }
                                xhrCallbacks[handle] = callback;
                            }
                            xhr.onreadystatechange = callback;
                        }
                    },
                    abort: function () {
                        if (callback) {
                            callback(0, 1);
                        }
                    }
                };
            }
        });
    }
    var elemdisplay = {}, iframe, iframeDoc, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        timerId, fxAttrs = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        fxNow;
    jQuery.fn.extend({
        show: function (speed, easing, callback) {
            var elem, display;
            if (speed || speed === 0) {
                return this.animate(genFx("show", 3), speed, easing, callback);
            } else {
                for (var i = 0, j = this.length; i < j; i++) {
                    elem = this[i];
                    if (elem.style) {
                        display = elem.style.display;
                        if (!jQuery._data(elem, "olddisplay") && display === "none") {
                            display = elem.style.display = "";
                        }
                        if (display === "" && jQuery.css(elem, "display") === "none") {
                            jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
                        }
                    }
                }
                for (i = 0; i < j; i++) {
                    elem = this[i];
                    if (elem.style) {
                        display = elem.style.display;
                        if (display === "" || display === "none") {
                            elem.style.display = jQuery._data(elem, "olddisplay") || "";
                        }
                    }
                }
                return this;
            }
        },
        hide: function (speed, easing, callback) {
            if (speed || speed === 0) {
                return this.animate(genFx("hide", 3), speed, easing, callback);
            } else {
                for (var i = 0, j = this.length; i < j; i++) {
                    if (this[i].style) {
                        var display = jQuery.css(this[i], "display");
                        if (display !== "none" && !jQuery._data(this[i], "olddisplay")) {
                            jQuery._data(this[i], "olddisplay", display);
                        }
                    }
                }
                for (i = 0; i < j; i++) {
                    if (this[i].style) {
                        this[i].style.display = "none";
                    }
                }
                return this;
            }
        },
        _toggle: jQuery.fn.toggle,
        toggle: function (fn, fn2, callback) {
            var bool = typeof fn === "boolean";
            if (jQuery.isFunction(fn) && jQuery.isFunction(fn2)) {
                this._toggle.apply(this, arguments);
            } else if (fn == null || bool) {
                this.each(function () {
                    var state = bool ? fn : jQuery(this).is(":hidden");
                    jQuery(this)[state ? "show" : "hide"]();
                });
            } else {
                this.animate(genFx("toggle", 3), fn, fn2, callback);
            }
            return this;
        },
        fadeTo: function (speed, to, easing, callback) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function (prop, speed, easing, callback) {
            var optall = jQuery.speed(speed, easing, callback);
            if (jQuery.isEmptyObject(prop)) {
                return this.each(optall.complete, [false]);
            }
            prop = jQuery.extend({}, prop);
            return this[optall.queue === false ? "each" : "queue"](function () {
                if (optall.queue === false) {
                    jQuery._mark(this);
                }
                var opt = jQuery.extend({}, optall),
                    isElement = this.nodeType === 1,
                    hidden = isElement && jQuery(this).is(":hidden"),
                    name, val, p, display, e, parts, start, end, unit;
                opt.animatedProperties = {};
                for (p in prop) {
                    name = jQuery.camelCase(p);
                    if (p !== name) {
                        prop[name] = prop[p];
                        delete prop[p];
                    }
                    val = prop[name];
                    if (jQuery.isArray(val)) {
                        opt.animatedProperties[name] = val[1];
                        val = prop[name] = val[0];
                    } else {
                        opt.animatedProperties[name] = opt.specialEasing && opt.specialEasing[name] || opt.easing || 'swing';
                    }
                    if (val === "hide" && hidden || val === "show" && !hidden) {
                        return opt.complete.call(this);
                    }
                    if (isElement && (name === "height" || name === "width")) {
                        opt.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        if (jQuery.css(this, "display") === "inline" && jQuery.css(this, "float") === "none") {
                            if (!jQuery.support.inlineBlockNeedsLayout) {
                                this.style.display = "inline-block";
                            } else {
                                display = defaultDisplay(this.nodeName);
                                if (display === "inline") {
                                    this.style.display = "inline-block";
                                } else {
                                    this.style.display = "inline";
                                    this.style.zoom = 1;
                                }
                            }
                        }
                    }
                }
                if (opt.overflow != null) {
                    this.style.overflow = "hidden";
                }
                for (p in prop) {
                    e = new jQuery.fx(this, opt, p);
                    val = prop[p];
                    if (rfxtypes.test(val)) {
                        e[val === "toggle" ? hidden ? "show" : "hide" : val]();
                    } else {
                        parts = rfxnum.exec(val);
                        start = e.cur();
                        if (parts) {
                            end = parseFloat(parts[2]);
                            unit = parts[3] || (jQuery.cssNumber[p] ? "" : "px");
                            if (unit !== "px") {
                                jQuery.style(this, p, (end || 1) + unit);
                                start = ((end || 1) / e.cur()) * start;
                                jQuery.style(this, p, start + unit);
                            }
                            if (parts[1]) {
                                end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
                            }
                            e.custom(start, end, unit);
                        } else {
                            e.custom(start, val, "");
                        }
                    }
                }
                return true;
            });
        },
        stop: function (clearQueue, gotoEnd) {
            if (clearQueue) {
                this.queue([]);
            }
            this.each(function () {
                var timers = jQuery.timers,
                    i = timers.length;
                if (!gotoEnd) {
                    jQuery._unmark(true, this);
                }
                while (i--) {
                    if (timers[i].elem === this) {
                        if (gotoEnd) {
                            timers[i](true);
                        }
                        timers.splice(i, 1);
                    }
                }
            });
            if (!gotoEnd) {
                this.dequeue();
            }
            return this;
        }
    });

    function createFxNow() {
        setTimeout(clearFxNow, 0);
        return (fxNow = jQuery.now());
    }

    function clearFxNow() {
        fxNow = undefined;
    }

    function genFx(type, num) {
        var obj = {};
        jQuery.each(fxAttrs.concat.apply([], fxAttrs.slice(0, num)), function () {
            obj[this] = type;
        });
        return obj;
    }
    jQuery.each({
        slideDown: genFx("show", 1),
        slideUp: genFx("hide", 1),
        slideToggle: genFx("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (name, props) {
        jQuery.fn[name] = function (speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.extend({
        speed: function (speed, easing, fn) {
            var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
            opt.old = opt.complete;
            opt.complete = function (noUnmark) {
                if (jQuery.isFunction(opt.old)) {
                    opt.old.call(this);
                }
                if (opt.queue !== false) {
                    jQuery.dequeue(this);
                } else if (noUnmark !== false) {
                    jQuery._unmark(this);
                }
            };
            return opt;
        },
        easing: {
            linear: function (p, n, firstNum, diff) {
                return firstNum + diff * p;
            },
            swing: function (p, n, firstNum, diff) {
                return ((-Math.cos(p * Math.PI) / 2) + 0.5) * diff + firstNum;
            }
        },
        timers: [],
        fx: function (elem, options, prop) {
            this.options = options;
            this.elem = elem;
            this.prop = prop;
            options.orig = options.orig || {};
        }
    });
    jQuery.fx.prototype = {
        update: function () {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            (jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this);
        },
        cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop];
            }
            var parsed, r = jQuery.css(this.elem, this.prop);
            return isNaN(parsed = parseFloat(r)) ? !r || r === "auto" ? 0 : r : parsed;
        },
        custom: function (from, to, unit) {
            var self = this,
                fx = jQuery.fx;
            this.startTime = fxNow || createFxNow();
            this.start = from;
            this.end = to;
            this.unit = unit || this.unit || (jQuery.cssNumber[this.prop] ? "" : "px");
            this.now = this.start;
            this.pos = this.state = 0;

            function t(gotoEnd) {
                return self.step(gotoEnd);
            }
            t.elem = this.elem;
            if (t() && jQuery.timers.push(t) && !timerId) {
                timerId = setInterval(fx.tick, fx.interval);
            }
        },
        show: function () {
            this.options.orig[this.prop] = jQuery.style(this.elem, this.prop);
            this.options.show = true;
            this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
            jQuery(this.elem).show();
        },
        hide: function () {
            this.options.orig[this.prop] = jQuery.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0);
        },
        step: function (gotoEnd) {
            var t = fxNow || createFxNow(),
                done = true,
                elem = this.elem,
                options = this.options,
                i, n;
            if (gotoEnd || t >= options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                options.animatedProperties[this.prop] = true;
                for (i in options.animatedProperties) {
                    if (options.animatedProperties[i] !== true) {
                        done = false;
                    }
                }
                if (done) {
                    if (options.overflow != null && !jQuery.support.shrinkWrapBlocks) {
                        jQuery.each(["", "X", "Y"], function (index, value) {
                            elem.style["overflow" + value] = options.overflow[index];
                        });
                    }
                    if (options.hide) {
                        jQuery(elem).hide();
                    }
                    if (options.hide || options.show) {
                        for (var p in options.animatedProperties) {
                            jQuery.style(elem, p, options.orig[p]);
                        }
                    }
                    options.complete.call(elem);
                }
                return false;
            } else {
                if (options.duration == Infinity) {
                    this.now = t;
                } else {
                    n = t - this.startTime;
                    this.state = n / options.duration;
                    this.pos = jQuery.easing[options.animatedProperties[this.prop]](this.state, n, 0, 1, options.duration);
                    this.now = this.start + ((this.end - this.start) * this.pos);
                }
                this.update();
            }
            return true;
        }
    };
    jQuery.extend(jQuery.fx, {
        tick: function () {
            for (var timers = jQuery.timers, i = 0; i < timers.length; ++i) {
                if (!timers[i]()) {
                    timers.splice(i--, 1);
                }
            }
            if (!timers.length) {
                jQuery.fx.stop();
            }
        },
        interval: 13,
        stop: function () {
            clearInterval(timerId);
            timerId = null;
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (fx) {
                jQuery.style(fx.elem, "opacity", fx.now);
            },
            _default: function (fx) {
                if (fx.elem.style && fx.elem.style[fx.prop] != null) {
                    fx.elem.style[fx.prop] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
                } else {
                    fx.elem[fx.prop] = fx.now;
                }
            }
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function (elem) {
            return jQuery.grep(jQuery.timers, function (fn) {
                return elem === fn.elem;
            }).length;
        };
    }

    function defaultDisplay(nodeName) {
        if (!elemdisplay[nodeName]) {
            var body = document.body,
                elem = jQuery("<" + nodeName + ">").appendTo(body),
                display = elem.css("display");
            elem.remove();
            if (display === "none" || display === "") {
                if (!iframe) {
                    iframe = document.createElement("iframe");
                    iframe.frameBorder = iframe.width = iframe.height = 0;
                }
                body.appendChild(iframe);
                if (!iframeDoc || !iframe.createElement) {
                    iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
                    iframeDoc.write((document.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>");
                    iframeDoc.close();
                }
                elem = iframeDoc.createElement(nodeName);
                iframeDoc.body.appendChild(elem);
                display = jQuery.css(elem, "display");
                body.removeChild(iframe);
            }
            elemdisplay[nodeName] = display;
        }
        return elemdisplay[nodeName];
    }
    var rtable = /^t(?:able|d|h)$/i,
        rroot = /^(?:body|html)$/i;
    if ("getBoundingClientRect" in document.documentElement) {
        jQuery.fn.offset = function (options) {
            var elem = this[0],
                box;
            if (options) {
                return this.each(function (i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            if (!elem || !elem.ownerDocument) {
                return null;
            }
            if (elem === elem.ownerDocument.body) {
                return jQuery.offset.bodyOffset(elem);
            }
            try {
                box = elem.getBoundingClientRect();
            } catch (e) {}
            var doc = elem.ownerDocument,
                docElem = doc.documentElement;
            if (!box || !jQuery.contains(docElem, elem)) {
                return box ? {
                    top: box.top,
                    left: box.left
                } : {
                    top: 0,
                    left: 0
                };
            }
            var body = doc.body,
                win = getWindow(doc),
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                scrollTop = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop || body.scrollTop,
                scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
                top = box.top + scrollTop - clientTop,
                left = box.left + scrollLeft - clientLeft;
            return {
                top: top,
                left: left
            };
        };
    } else {
        jQuery.fn.offset = function (options) {
            var elem = this[0];
            if (options) {
                return this.each(function (i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            if (!elem || !elem.ownerDocument) {
                return null;
            }
            if (elem === elem.ownerDocument.body) {
                return jQuery.offset.bodyOffset(elem);
            }
            jQuery.offset.initialize();
            var computedStyle, offsetParent = elem.offsetParent,
                prevOffsetParent = elem,
                doc = elem.ownerDocument,
                docElem = doc.documentElement,
                body = doc.body,
                defaultView = doc.defaultView,
                prevComputedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle,
                top = elem.offsetTop,
                left = elem.offsetLeft;
            while ((elem = elem.parentNode) && elem !== body && elem !== docElem) {
                if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
                    break;
                }
                computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
                top -= elem.scrollTop;
                left -= elem.scrollLeft;
                if (elem === offsetParent) {
                    top += elem.offsetTop;
                    left += elem.offsetLeft;
                    if (jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName))) {
                        top += parseFloat(computedStyle.borderTopWidth) || 0;
                        left += parseFloat(computedStyle.borderLeftWidth) || 0;
                    }
                    prevOffsetParent = offsetParent;
                    offsetParent = elem.offsetParent;
                }
                if (jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") {
                    top += parseFloat(computedStyle.borderTopWidth) || 0;
                    left += parseFloat(computedStyle.borderLeftWidth) || 0;
                }
                prevComputedStyle = computedStyle;
            }
            if (prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") {
                top += body.offsetTop;
                left += body.offsetLeft;
            }
            if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
                top += Math.max(docElem.scrollTop, body.scrollTop);
                left += Math.max(docElem.scrollLeft, body.scrollLeft);
            }
            return {
                top: top,
                left: left
            };
        };
    }
    jQuery.offset = {
        initialize: function () {
            var body = document.body,
                container = document.createElement("div"),
                innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat(jQuery.css(body, "marginTop")) || 0,
                html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            jQuery.extend(container.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            });
            container.innerHTML = html;
            body.insertBefore(container, body.firstChild);
            innerDiv = container.firstChild;
            checkDiv = innerDiv.firstChild;
            td = innerDiv.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
            this.doesAddBorderForTableAndCells = (td.offsetTop === 5);
            checkDiv.style.position = "fixed";
            checkDiv.style.top = "20px";
            this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
            checkDiv.style.position = checkDiv.style.top = "";
            innerDiv.style.overflow = "hidden";
            innerDiv.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);
            this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);
            body.removeChild(container);
            jQuery.offset.initialize = jQuery.noop;
        },
        bodyOffset: function (body) {
            var top = body.offsetTop,
                left = body.offsetLeft;
            jQuery.offset.initialize();
            if (jQuery.offset.doesNotIncludeMarginInBodyOffset) {
                top += parseFloat(jQuery.css(body, "marginTop")) || 0;
                left += parseFloat(jQuery.css(body, "marginLeft")) || 0;
            }
            return {
                top: top,
                left: left
            };
        },
        setOffset: function (elem, options, i) {
            var position = jQuery.css(elem, "position");
            if (position === "static") {
                elem.style.position = "relative";
            }
            var curElem = jQuery(elem),
                curOffset = curElem.offset(),
                curCSSTop = jQuery.css(elem, "top"),
                curCSSLeft = jQuery.css(elem, "left"),
                calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                props = {}, curPosition = {}, curTop, curLeft;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }
            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        position: function () {
            if (!this[0]) {
                return null;
            }
            var elem = this[0],
                offsetParent = this.offsetParent(),
                offset = this.offset(),
                parentOffset = rroot.test(offsetParent[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : offsetParent.offset();
            offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
            offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;
            parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0;
            parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0;
            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            };
        },
        offsetParent: function () {
            return this.map(function () {
                var offsetParent = this.offsetParent || document.body;
                while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent;
            });
        }
    });
    jQuery.each(["Left", "Top"], function (i, name) {
        var method = "scroll" + name;
        jQuery.fn[method] = function (val) {
            var elem, win;
            if (val === undefined) {
                elem = this[0];
                if (!elem) {
                    return null;
                }
                win = getWindow(elem);
                return win ? ("pageXOffset" in win) ? win[i ? "pageYOffset" : "pageXOffset"] : jQuery.support.boxModel && win.document.documentElement[method] || win.document.body[method] : elem[method];
            }
            return this.each(function () {
                win = getWindow(this);
                if (win) {
                    win.scrollTo(!i ? val : jQuery(win).scrollLeft(), i ? val : jQuery(win).scrollTop());
                } else {
                    this[method] = val;
                }
            });
        };
    });

    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    jQuery.each(["Height", "Width"], function (i, name) {
        var type = name.toLowerCase();
        jQuery.fn["inner" + name] = function () {
            var elem = this[0];
            return elem && elem.style ? parseFloat(jQuery.css(elem, type, "padding")) : null;
        };
        jQuery.fn["outer" + name] = function (margin) {
            var elem = this[0];
            return elem && elem.style ? parseFloat(jQuery.css(elem, type, margin ? "margin" : "border")) : null;
        };
        jQuery.fn[type] = function (size) {
            var elem = this[0];
            if (!elem) {
                return size == null ? null : this;
            }
            if (jQuery.isFunction(size)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    self[type](size.call(this, i, self[type]()));
                });
            }
            if (jQuery.isWindow(elem)) {
                var docElemProp = elem.document.documentElement["client" + name],
                    body = elem.document.body;
                return elem.document.compatMode === "CSS1Compat" && docElemProp || body && body["client" + name] || docElemProp;
            } else if (elem.nodeType === 9) {
                return Math.max(elem.documentElement["client" + name], elem.body["scroll" + name], elem.documentElement["scroll" + name], elem.body["offset" + name], elem.documentElement["offset" + name]);
            } else if (size === undefined) {
                var orig = jQuery.css(elem, type),
                    ret = parseFloat(orig);
                return jQuery.isNaN(ret) ? orig : ret;
            } else {
                return this.css(type, typeof size === "string" ? size : size + "px");
            }
        };
    });
    window.jQuery = window.$ = jQuery;
})(window);;
(function () {
    var initializing = false,
        fnTest = /xyz/.test(function () {
            xyz;
        }) ? /\b_super\b/ : /.*/;
    this.Class = function () {};
    Class.extend = function (prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function (name, fn) {
                return function () {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }

        function Class() {
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
})();;

function trackClient(appkeys) {
    if (!appkeys) {
        return false;
    }
    var url = "http://bi.redatoms.com/logger/log";
    var info = {};
    var timeoutTimer = null;
    this.trackEvent = function () {
        if (arguments.length < 5) return false;
        var _cs = "";
        var async = false;
        var tm = 0;
        for (var i = 0, l = 5; i < l; i++) {
            var val = arguments[i] == null ? '' : arguments[i].toString();
            al = val.replace(':', '_');
            _cs += _cs == "" ? "" : ":";
            _cs += val;
        }
        if (arguments.length > 5) async = arguments[5];
        if (arguments.length > 6) tm = arguments[6];
        this.sendData("_cs=" + _cs, async, tm);
    };
    this.setChannel = function (channel) {
        info.channel = channel;
    };
    this.setVersion = function (version) {
        info.bv = version;
    };
    this.setRuid = function (ruid) {
        setuid(ruid);
    };
    this.onEvent = function (obj, action, remark, async, tm) {
        this.trackEvent(' ', obj, action, 1, remark, async, tm);
    };
    this.onBuy = function (obj, cnt, remark, async, tm) {
        this.trackEvent('_bi_', obj, 'buy', cnt, remark, async, tm);
    };
    this.onSell = function (obj, cnt, remark, async, tm) {
        this.trackEvent('_bi_', obj, 'sell', cnt, remark, async, tm);
    };
    this.sendData = function (extdata, async, tm) {
        addidx();
        var datastr = "";
        for (var key in info) {
            datastr += "&" + key + "=" + info[key];
        }
        if (extdata) {
            datastr += "&" + extdata;
        }
        ajaxget(url, datastr, async, tm);
    };
    var navig = window.navigator;
    var uuid = getCookie('msc_uuid');
    var sid = getCookie('msc_sid');
    if (uuid == null) {
        var nowt = (new Date()).getTime();
        var ttl = new Date(nowt + 2 * 365 * 24 * 3600 * 1000);
        uuid = nowt + "" + Math.round(Math.random() * 10000);
        setCookie('msc_uuid', uuid, ttl, '/');
    }
    if (sid == null) {
        var nowt = (new Date()).getTime();
        sid = nowt + "" + Math.round(Math.random() * 10000);
        setCookie('msc_sid', sid);
    }
    info = {
        uuid: uuid,
        appkey: appkeys,
        channel: 'html',
        sa: navig.systemLanguage || navig.language,
        sl: navig.userLanguage || navig.language,
        imei: uuid,
        sid: sid
    };
    info.sr = window.screen.width + "x" + window.screen.height;
    info.sdkt = 'html';
    info.sdkv = '1.1';
    info.bf = document.referrer;
    info.bp = window.location.href;
    var str_ua = navig.userAgent.toLowerCase();
    var expp = /(msie|firefox|opera|chrome|netscape|safari|ucweb|360se|metasr)/;
    expp.test(str_ua);
    info.appname = RegExp.$1;
    var str_p = navig.platform.toLowerCase();
    var os = '';
    if (str_p.indexOf('linux') > -1) {
        os = "Linux";
    } else if (str_p.indexOf('mac') > -1) {
        os = "Mac";
    } else if (str_p.indexOf('x11') > -1) {
        os = "Unix";
    } else if (str_p.indexOf('win') > -1) {
        if (str_ua.indexOf("windows nt 5.0") > -1 || str_ua.indexOf("windows 2000") > -1) {
            os = "Windows2000";
        }
        if (str_ua.indexOf("windows nt 5.1") > -1 || str_ua.indexOf("windows xp") > -1) {
            os = "WindowsXP";
        }
        if (str_ua.indexOf("windows nt 5.2") > -1 || str_ua.indexOf("windows 2003") > -1) {
            os = "Windows2003";
        }
        if (str_ua.indexOf("windows nt 6.0") > -1 || str_ua.indexOf("windows vista") > -1) {
            os = "WindowsVista";
        }
        if (str_ua.indexOf("windows nt 6.1") > -1 || str_ua.indexOf("windows 7") > -1) {
            os = "Windows7";
        }
    } else if (str_ua.indexOf('iphone os') > -1) {
        os = "ios";
    } else if (str_ua.indexOf('android') > -1) {
        os = "Android";
    } else if (str_ua.indexOf('windows ce') > -1) {
        os = "Windows ce";
    } else if (str_ua.indexOf('ipad') > -1) {
        os = "ipad";
    } else if (str_ua.indexOf('windows mobile') > -1) {
        os = "Windows Mobile";
    }
    info.sos = os;

    function addidx() {
        var sno = getCookie('msc_sno');
        var ruid = getCookie('msc_uid');
        if (sno == null) {
            sno = 0;
        }
        setCookie('msc_sno', ++sno);
        info.sh = sno + "." + sid + ".0.0";
        if (ruid != null) {
            info.ruid = ruid;
        }
    }

    function setuid(id) {
        var uid = getCookie('msc_uid');
        if (uid == null) {
            uid = id;
        } else {
            if (uid != id) {
                var nowt = (new Date()).getTime();
                sid = nowt + "" + Math.round(Math.random() * 10000);
                info.sid = sid;
                setCookie('msc_sid', sid);
                setCookie('msc_sno', 0);
            }
        }
        setCookie('msc_uid', id);
    }

    function getCookie(key) {
        var tmp = document.cookie.match((new RegExp(key + '=[a-zA-Z0-9.()=|%/]+($|;)', 'g')));
        if (!tmp || !tmp[0]) return null;
        else return unescape(tmp[0].substring(key.length + 1, tmp[0].length).replace(';', '')) || null;
    }

    function setCookie(name, value) {
        var argv = arguments;
        var argc = argv.length;
        var expires = (argc > 2) ? argv[2] : null;
        var path = (argc > 3) ? argv[3] : null;
        var domain = (argc > 4) ? argv[4] : null;
        var secure = (argc > 5) ? argv[5] : false;
        document.cookie = name + "=" + escape(value) +
            ((expires == null) ? "" : ("; expires=" + expires.toUTCString())) +
            ((path == null) ? "" : ("; path=" + path)) +
            ((domain == null) ? "" : ("; domain=" + domain)) +
            ((secure == true) ? "; secure" : "");
    }

    function ajaxget(geturl, extdata, async, tm) {
        try {
            var xmlhttp = null;
            if (extdata) {
                geturl += "?" + extdata;
            }
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } else {
                alert('³õÊŒ»¯ŽíÎó£¡');
                return false;
            }
            if (async && tm && tm > 0) {
                timeoutTimer = window.setTimeout(function () {
                    xmlhttp.abort();
                }, tm);
            }
            if (async) {
                xmlhttp.open('get', encodeURI(encodeURI(geturl)), true);
            } else {
                xmlhttp.open('get', encodeURI(encodeURI(geturl)), false);
            }
            xmlhttp.onreadystatechange = function (x, y) {
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                if (!async) {
                    xmlhttp.abort();
                }
            };
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
            xmlhttp.send(null);
        } catch (e) {}
    }
};
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.Object = Class.extend({
        getR: function (k) {
            var device = Mojo.gap.device || "";
            return w.Mojo.ui.R(device, this.clsname(), k);
        },
        getL: function (k1, k2, k3) {
            return Mojo.utils.locale(k1, k2, k3);
        },
        init: function (id, options) {
            this._id = id;
            this._options = this._getDefaultOptions();
            $.extend(true, this._options, options || {});
            if (this._id == undefined || this._id == null) {
                this._element = $('<div></div>');
            } else {
                this._element = $('<div id="' + this._id + '"></div>');
            }
            this._children = [];
            this._parent = null;
            var self = this;
            if (this._options.classes != undefined) {
                $.each(this._options.classes, function (i, c) {
                    self.element().addClass(c);
                })
            }
            if (this._options.deviceaware) {
                self.element().addClass(Mojo.gap.device);
            }
        },
        _getDefaultOptions: function () {
            return {
                classes: [],
                deviceaware: true
            };
        },
        id: function () {
            return this._id;
        },
        element: function () {
            return this._element;
        },
        data: function (key, value) {
            if (value == undefined) {
                return this.element().data(key);
            }
            this.element().data(key, value);
        },
        show: function () {
            this.element().show();
        },
        hide: function () {
            this.element().hide();
        },
        clsname: function () {
            return "Object";
        },
        localeCat: function () {
            return "";
        },
        locale: function (key, params) {
            return Mojo.utils.locale(this.localeCat(), key, params);
        },
        rebinding: function () {
            this.element().unbind('touchend');
            this.element().bind('touchend', function () {});
        },
        resize: function (size) {
            if (size == undefined) {
                return;
            }
            if (size.width != undefined) {
                this.element().width(size.width);
            }
            if (size.height != undefined) {
                this.element().height(size.height);
            }
            this._onResize(size);
        },
        _onResize: function (size) {}
    });
    w.Mojo.supportTouch = function () {
        if (w.Mojo._supportTouch == undefined) {
            w.Mojo._supportTouch = 'ontouchstart' in w;
        }
        return w.Mojo._supportTouch;
    };
    if (!w.console) {
        w.console = {};
        w.console.log = function () {
            return;
        };
    }
})(window, jQuery);;
(function (w, $) {
    w.Mojo = w.Mojo || {};
    w.Mojo.ui = w.Mojo.ui || {};
    w.Mojo.ui.R = function (d, c, k) {
        if (w.Mojo.ui.Resource[d]) {
            if (w.Mojo.ui.Resource[d][c]) {
                var t = w.Mojo.ui.Resource[d][c][k]
                return t;
            }
        }
    }
    w.Mojo.ui.Resource = {
        'ipad': {
            'com.BaseSlotList': {
                'unitWidth': 140
            },
            'com.Collection': {
                'offsets': [{
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
            'com.CollectList': {
                'unitWidth': 140
            },
            'com.EntityElement': {
                'unitWidth': 22
            },
            'com.FbTaskList': {
                'unitWidth': 157
            },
            'com.IllustrationList': {
                'unitWidth': 157,
                'height': 742,
                'pageSize': 30
            },
            'com.IllustrationPanel': {
                'pageSize': 20
            },
            'com.GiftCard': {
                'playsize': 160
            },
            'com.MapElement': {
                'left': 1.1,
                'top': 1.4
            },
            'com.Marquee': {
                "width": 600,
                "height": 100
            },
            'com.TaskList': {
                'unitWidth': 155,
            },
            'page.Intensify': {
                'viewHeight': 60
            },
            'com.Slot': {
                'imgHeight': '480',
                'spriteHeight': '120',
                'background-position': '0 -5px',
                'range': '',
                'bgPos': '',
                'targetPos': ''
            },
            'com.Tutorial': {
                "home_left": 64,
                "mission_left": 192,
                "rob_left": 320,
                "battle_left": 448,
                "friend_left": 576,
                "mall_left": 704,
                "arrowwidth": 104,
                "arrowheight": 150
            },
            'com.CardElement': {
                'unitWidth': 22
            },
            'page.Server': {
                "height1": 43,
                "height2": 220,
                "margin-top": "100px"
            },
            'com.BattleDetailDialog': {
                "height": 450
            },
            'com.FbBattleDetailDialog': {
                "height": 450
            },
            'com.RankPlayerPage': {
                'unitWidth': 97
            },
            'page.Home': {
                'unitWidth': 128
            }
        },
        'iphone': {
            'com.BaseSlotList': {
                'unitWidth': 62
            },
            'com.Collection': {
                'treasurePos': {
                    x: 115,
                    y: 159
                },
                'offsets': [{
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
            'com.CollectList': {
                'unitWidth': 62
            },
            'com.EntityElement': {
                'unitWidth': 15
            },
            'com.FbTaskList': {
                'unitWidth': 97
            },
            'com.IllustrationList': {
                'unitWidth': 102,
                'height': 345,
                'pageSize': 25
            },
            'com.IllustrationPanel': {
                'pageSize': 36
            },
            'com.GiftCard': {
                'playsize': 80
            },
            'com.MapElement': {
                'left': 1,
                'top': 1
            },
            'com.Marquee': {
                "width": 320,
                "height": 60
            },
            'com.TaskList': {
                'unitWidth': 97,
            },
            'page.Intensify': {
                'viewHeight': 46
            },
            'com.Slot': {
                'imgHeight': 240,
                'spriteHeight': 60,
                'background-position': '5px -7px',
                'range': '',
                'bgPos': '',
                'targetPos': ''
            },
            'com.Tutorial': {
                "home_left": 26.5,
                "mission_left": 79.5,
                "rob_left": 132.5,
                "battle_left": 185.5,
                "friend_left": 238.5,
                "mall_left": 291.5,
                "arrowwidth": 52,
                "arrowheight": 75
            },
            'com.CardElement': {
                'unitWidth': 15
            },
            'page.Server': {
                "height1": 43,
                "height2": 220,
                "margin-top": "100px"
            },
            'com.BattleDetailDialog': {
                "height": 200
            },
            'com.FbBattleDetailDialog': {
                "height": 200
            },
            'com.RankPlayerPage': {
                'unitWidth': 97
            },
            'page.Home': {
                'unitWidth': 53
            }
        }
    }
})(window, jQuery);;
(function (w, jQuery, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.ui = w.Mojo.ui || {};
    w.Mojo.ui.Button = Mojo.Object.extend({
        init: function (id, options) {
            this._super(id, options);
            var self = this;
            this.element().addClass('mojo-ui-button');
            if (self._options.special != null) {
                self.element().addClass(self._options.special);
            }
            if (this._options.icon) {
                this.element().append('<div class="icon"></div>');
            }
            if (this._options.textWrap) {
                this.element().append('<div class="text">' + this._options.text + '</div>');
            } else {
                this.element().append(this._options.text);
            }
            var onTouchStart = function (e) {
                if (!self._options.disabled) {
                    self.element().addClass('mojo-ui-button-down');
                    if (self._options.special != null) {
                        self.element().addClass(self._options.special + '-down');
                    }
                    if (self._options.sound == undefined || self._options.sound == null) {
                        Mojo.gap.soundPlay('12_action_do');
                    } else {
                        Mojo.gap.soundPlay(self._options.sound);
                    }
                }
            };
            var onTouchMove = function (e) {
                if (!self._options.disabled) {
                    self.element().removeClass('mojo-ui-button-down');
                    if (self._options.special != null) {
                        self.element().removeClass(self._options.special + '-down');
                    }
                }
            };
            var onTouchEnd = function (e) {
                if (!self._options.disabled) {
                    self.element().removeClass('mojo-ui-button-down');
                    if (self._options.special != null) {
                        self.element().removeClass(self._options.special + '-down');
                    }
                }
            };
            if (Mojo.supportTouch()) {
                this.element().bind('touchstart', onTouchStart);
                this.element().bind('touchmove', onTouchMove);
                this.element().bind('touchend', onTouchEnd);
            } else {
                this.element().bind('mousedown', onTouchStart);
                this.element().bind('mousemove', onTouchMove);
                this.element().bind('mouseup', onTouchEnd);
            }
            this._bindClick();
            this.disable(this._options.disabled);
        },
        _bindClick: function () {
            var self = this;
            this.element().unbind('click');
            this.element().click(function (e) {
                if (self._options.disabled) {
                    self._options.disableClick(self, e);
                } else {
                    self._options.click(self, e);
                }
            });
        },
        _getDefaultOptions: function () {
            return {
                text: 'Button',
                click: $.noop,
                disableClick: $.noop,
                disabled: false,
                icon: false,
                textWrap: false,
                sound: null,
                special: null,
            };
        },
        disable: function (value) {
            this._options.disabled = value;
            this._element[value ? 'addClass' : 'removeClass']('mojo-ui-button-disabled');
            if (this._options.special != null) {
                this._element[value ? 'addClass' : 'removeClass'](this._options.special + '-disabled');
            }
        },
        text: function (text) {
            if (text == undefined) {
                return this._options.text;
            }
            this._options.text = text;
            if (this._options.textWrap) {
                this.element().find(".text").html(text);
            } else {
                this.element().html(text);
            }
        },
        click: function (func) {
            var self = this;
            this._options.click = func;
            this._bindClick();
        },
        setFlag: function (flag) {
            if (flag != undefined && flag != null) {
                var flagHtml = "";
                var flagClasses = null;
                if (typeof (flag) == "string") {
                    flagHtml = flag
                } else if (typeof (flag) == "object") {
                    flagHtml = flag.text;
                    flagClasses = flag.classes;
                }
                $('<div class="flag"></div>').addClass(flag.classes.join(" ")).html(flagHtml).appendTo(this.element());
            }
        },
        clsname: function () {
            return "ui.Button";
        }
    });
})(window, jQuery);;
(function (w, jQuery, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.ui = w.Mojo.ui || {};
    w.Mojo.ui.Label = Mojo.Object.extend({
        init: function (id, options) {
            this._super(id, options);
            var self = this;
            this.element().addClass('mojo-ui-label');
            this.element().append('<div class="icon"></div><div class="text"><span>' + this._options.text + '</span></div>');
        },
        _getDefaultOptions: function () {
            return {
                text: 'Label',
            };
        },
        text: function (text) {
            if (text == undefined) {
                return this._options.text;
            }
            this._options.text = text;
            this.element().find('.text > span').html(text);
        },
        clsname: function () {
            return "ui.Label";
        }
    });
})(window, jQuery);;
(function (w, jQuery, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.ui = w.Mojo.ui || {};
    w.Mojo.ui.Progress = Mojo.Object.extend({
        init: function (id, options) {
            this._super(id, options);
            var self = this;
            this.element().addClass('mojo-ui-progress');
            this.element().append('<div class="icon"></div><div class="bar"><span></span></div>');
            this._refresh();
        },
        _getDefaultOptions: function () {
            return {
                max: 100,
                min: 0,
                value: 0,
                labelTemplate: '#{percent}',
            };
        },
        _percentage: function () {
            var p = Math.round(100 * this._options.value / (this._options.max - this._options.min));
            if (p > 100) {
                p = 100;
            }
            if (p < 0) {
                p = 0;
            }
            return p;
        },
        _refresh: function () {
            var per = this._percentage() + "%";
            var div = this._options.value + "/" + (this._options.max - this._options.min);
            this.element().find('.bar').css('width', per);
            var l = this._options.labelTemplate.replace(/#\{percent\}/g, per).replace(/#\{divide\}/g, div);
            this.element().find('.bar > span').html(l);
        },
        value: function (value) {
            if (value == undefined) {
                return this._options.value;
            }
            if (typeof (value) == 'object') {
                $.extend(true, this._options, value);
            } else {
                this._options.value = value;
            }
            this._refresh();
        },
        clsname: function () {
            return "ui.Progress";
        }
    });
})(window, jQuery);;
(function (w, jQuery, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.ui = w.Mojo.ui || {};
    w.Mojo.ui.Overlay = Mojo.Object.extend({
        init: function (id, options) {
            this._super(id, options);
            var self = this;
            this.element().addClass('mojo-ui-overlay');
            if (this._options.reusable) {
                this.element().appendTo($(document.body));
            } else {}
            this.element().bind((Mojo.supportTouch ? 'touchmove' : 'mousemove'), function (e) {
                e.preventDefault();
            });
        },
        _getDefaultOptions: function () {
            return {
                zIndex: 1000,
                opacity: 0.8,
                reusable: false,
            };
        },
        show: function () {
            this.element().css({
                width: $(document).width() + 'px',
                height: $(document).height() + 'px',
                zIndex: this._options.zIndex,
                opacity: this._options.opacity,
            }).show();
            if (this._options.reusable) {} else {
                this.element().appendTo($(document.body));
            }
        },
        hide: function () {
            if (this._options.reusable) {
                this.element().hide();
            } else {
                this.element().remove();
            }
        },
        clsname: function () {
            return "ui.Overlay";
        }
    });
})(window, jQuery);;
(function (w, jQuery, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.ui = w.Mojo.ui || {};
    w.Mojo.ui.Dialog = Mojo.Object.extend({
        init: function (id, options) {
            this._super(id, options);
            this._nextDialog = undefined;
            var self = this;
            this.element().addClass('mojo-ui-dialog');
            if (this._options.noTitle == false) {
                this.element().append(this._title = $('<div class="title"></div>'));
                if (this._options.canClose) {
                    this.element().append(new Mojo.ui.Button(undefined, {
                        special: 'button-close',
                        text: '',
                        click: function () {
                            self.close();
                        },
                    }).element());
                }
            }
            this.element().append(this._content = $('<div class="content"></div>')).append(this._footer = $('<div class="footer"></div>'));
            if (this._options.noTitle == false) {
                if (this._options.title != undefined && this._options.title != null) {
                    if (this._options.canClose) {
                        this.element().find('.title').append(this._options.title).click(function () {
                            self.close();
                        });
                    } else {
                        this.element().find('.title').append(this._options.title);
                    }
                }
            }
            if (this._options.content != undefined && this._options.content != null) {
                this.element().find('.content').append(this._options.content);
            }
            if (this._options.reusable) {
                this.element().appendTo($(document.body));
                this.rebinding();
            } else {}
            this.element().bind((Mojo.supportTouch ? 'touchmove' : 'mousemove'), function (e) {
                e.preventDefault();
            });
        },
        _getDefaultOptions: function () {
            return {
                title: 'Dialog',
                content: null,
                close: $.noop,
                zIndex: 1001,
                reusable: false,
                noTitle: false,
                noOverlay: false,
                canClose: true
            };
        },
        open: function (force) {
            if (Mojo.app.dialog === undefined || force === true) {
                if (force != true) {
                    Mojo.app.dialog = this;
                }
                if (this._options.noOverlay == false) {
                    this._overlayShow();
                }
                this.element().show().css('z-index', this._options.zIndex + 1);
                if (this._options.reusable) {} else {
                    this.element().appendTo($(document.body));
                    this.rebinding();
                    if (this._onDialogAppend) {
                        this._onDialogAppend();
                    }
                }
                Mojo.utils.center(this.element());
            } else {
                Mojo.app.dialog.openNext(this);
            }
        },
        openNext: function (dialog) {
            if (this._nextDialog === undefined) {
                this._nextDialog = dialog;
            } else {
                this._nextDialog.openNext(dialog);
            }
        },
        close: function () {
            this._options.close();
            if (this._options.reusable) {
                this.element().hide();
            } else {
                this.element().remove();
            }
            if (this._options.noOverlay == false) {
                this._overlayHide();
            }
            Mojo.app.dialog = undefined;
            if (this._nextDialog != undefined && this._nextDialog != null) {
                this._nextDialog.open();
            }
        },
        show: function () {
            this.element().show();
            if (this.overlay !== undefined) {
                this.overlay.show();
            }
        },
        hide: function () {
            this.element().hide();
            if (this.overlay !== undefined) {
                this.overlay.hide();
            }
        },
        _overlayShow: function () {
            if (this.overlay === undefined) {
                this.overlay = new Mojo.ui.Overlay(undefined, {
                    zIndex: this._options.zIndex,
                    reusable: this._options.reusable,
                })
            }
            this.overlay.show();
        },
        _overlayHide: function () {
            if (this.overlay != undefined) {
                this.overlay.hide();
            }
        },
        clsname: function () {
            return "ui.Dialog";
        }
    });
})(window, jQuery);;
/*!
 * iScroll Lite base on iScroll v4.1.6 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function () {
    var m = Math,
        mround = function (r) {
            return r >> 0;
        }, vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' : (/firefox/i).test(navigator.userAgent) ? 'Moz' : 'opera' in window ? 'O' : '',
        isAndroid = (/android/gi).test(navigator.appVersion),
        isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
        isPlaybook = (/playbook/gi).test(navigator.appVersion),
        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
        has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
        hasTouch = 'ontouchstart' in window && !isTouchPad,
        hasTransform = vendor + 'Transform' in document.documentElement.style,
        hasTransitionEnd = isIDevice || isPlaybook,
        nextFrame = (function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                return setTimeout(callback, 17);
            }
        })(),
        cancelFrame = (function () {
            return window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
        })(),
        RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
        START_EV = hasTouch ? 'touchstart' : 'mousedown',
        MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
        END_EV = hasTouch ? 'touchend' : 'mouseup',
        CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
        trnOpen = 'translate' + (has3d ? '3d(' : '('),
        trnClose = has3d ? ',0)' : ')',
        iScroll = function (el, options) {
            var that = this,
                doc = document,
                i;
            that.wrapper = el.get(0);
            that.wrapper.style.overflow = 'hidden';
            that.scroller = that.wrapper.children[0];
            that.options = {
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
                onBeforeScrollStart: function (e) {
                    e.preventDefault();
                },
                onScrollStart: null,
                onBeforeScrollMove: null,
                onScrollMove: null,
                onBeforeScrollEnd: null,
                onScrollEnd: null,
                onTouchEnd: null,
                onDestroy: null
            };
            for (i in options) that.options[i] = options[i];
            that.x = that.options.x;
            that.y = that.options.y;
            that.options.useTransform = hasTransform ? that.options.useTransform : false;
            that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
            that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
            that.options.useTransition = hasTransitionEnd && that.options.useTransition;
            that.scroller.style[vendor + 'TransitionProperty'] = that.options.useTransform ? '-' + vendor.toLowerCase() + '-transform' : 'top left';
            that.scroller.style[vendor + 'TransitionDuration'] = '0';
            that.scroller.style[vendor + 'TransformOrigin'] = '0 0';
            if (that.options.useTransition) that.scroller.style[vendor + 'TransitionTimingFunction'] = 'cubic-bezier(0.33,0.66,0.66,1)';
            if (that.options.useTransform) that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose;
            else that.scroller.style.cssText += ';position:absolute;top:' + that.y + 'px;left:' + that.x + 'px';
            that.refresh();
            that._bind(RESIZE_EV, window);
            that._bind(START_EV);
            if (!hasTouch) that._bind('mouseout', that.wrapper);
        };
    iScroll.prototype = {
        enabled: true,
        x: 0,
        y: 0,
        steps: [],
        scale: 1,
        handleEvent: function (e) {
            var that = this;
            switch (e.type) {
            case START_EV:
                if (!hasTouch && e.button !== 0) return;
                that._start(e);
                break;
            case MOVE_EV:
                that._move(e);
                break;
            case END_EV:
            case CANCEL_EV:
                that._end(e);
                break;
            case RESIZE_EV:
                that._resize();
                break;
            case 'mouseout':
                that._mouseout(e);
                break;
            case 'webkitTransitionEnd':
                that._transitionEnd(e);
                break;
            }
        },
        _resize: function () {
            this.refresh();
        },
        _pos: function (x, y) {
            x = this.hScroll ? x : 0;
            y = this.vScroll ? y : 0;
            if (this.options.useTransform) {
                this.scroller.style[vendor + 'Transform'] = trnOpen + x + 'px,' + y + 'px' + trnClose + ' scale(' + this.scale + ')';
            } else {
                x = mround(x);
                y = mround(y);
                this.scroller.style.left = x + 'px';
                this.scroller.style.top = y + 'px';
            }
            this.x = x;
            this.y = y;
        },
        _start: function (e) {
            var that = this,
                point = hasTouch ? e.touches[0] : e,
                matrix, x, y;
            if (!that.enabled) return;
            if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);
            if (that.options.useTransition) that._transitionTime(0);
            that.moved = false;
            that.animating = false;
            that.zoomed = false;
            that.distX = 0;
            that.distY = 0;
            that.absDistX = 0;
            that.absDistY = 0;
            that.dirX = 0;
            that.dirY = 0;
            if (that.options.momentum) {
                if (that.options.useTransform) {
                    matrix = getComputedStyle(that.scroller, null)[vendor + 'Transform'].replace(/[^0-9-.,]/g, '').split(',');
                    x = matrix[4] * 1;
                    y = matrix[5] * 1;
                } else {
                    x = getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '') * 1;
                    y = getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '') * 1;
                }
                if (x != that.x || y != that.y) {
                    if (that.options.useTransition) that._unbind('webkitTransitionEnd');
                    else cancelFrame(that.aniTime);
                    that.steps = [];
                    that._pos(x, y);
                }
            }
            that.startX = that.x;
            that.startY = that.y;
            that.pointX = point.pageX;
            that.pointY = point.pageY;
            that.startTime = e.timeStamp || Date.now();
            if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);
            that._bind(MOVE_EV);
            that._bind(END_EV);
            that._bind(CANCEL_EV);
        },
        _move: function (e) {
            var that = this,
                point = hasTouch ? e.touches[0] : e,
                deltaX = point.pageX - that.pointX,
                deltaY = point.pageY - that.pointY,
                newX = that.x + deltaX,
                newY = that.y + deltaY,
                timestamp = e.timeStamp || Date.now();
            if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);
            that.pointX = point.pageX;
            that.pointY = point.pageY;
            if (newX > 0 || newX < that.maxScrollX) {
                newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
            }
            if (newY > 0 || newY < that.maxScrollY) {
                newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= 0 || that.maxScrollY >= 0 ? 0 : that.maxScrollY;
            }
            that.distX += deltaX;
            that.distY += deltaY;
            that.absDistX = m.abs(that.distX);
            that.absDistY = m.abs(that.distY);
            if (that.absDistX < 6 && that.absDistY < 6) {
                return;
            }
            if (that.options.lockDirection) {
                if (that.absDistX > that.absDistY + 5) {
                    newY = that.y;
                    deltaY = 0;
                } else if (that.absDistY > that.absDistX + 5) {
                    newX = that.x;
                    deltaX = 0;
                }
            }
            that.moved = true;
            that._pos(newX, newY);
            that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
            that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
            if (timestamp - that.startTime > 300) {
                that.startTime = timestamp;
                that.startX = that.x;
                that.startY = that.y;
            }
            if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
        },
        _end: function (e) {
            if (hasTouch && e.touches.length != 0) return;
            var that = this,
                point = hasTouch ? e.changedTouches[0] : e,
                target, ev, momentumX = {
                    dist: 0,
                    time: 0
                }, momentumY = {
                    dist: 0,
                    time: 0
                }, duration = (e.timeStamp || Date.now()) - that.startTime,
                newPosX = that.x,
                newPosY = that.y,
                newDuration;
            that._unbind(MOVE_EV);
            that._unbind(END_EV);
            that._unbind(CANCEL_EV);
            if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);
            if (!that.moved) {
                if (hasTouch) {
                    target = point.target;
                    while (target.nodeType != 1) target = target.parentNode;
                    if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
                        ev = document.createEvent('MouseEvents');
                        ev.initMouseEvent('click', true, true, e.view, 1, point.screenX, point.screenY, point.clientX, point.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
                        ev._fake = true;
                        target.dispatchEvent(ev);
                    }
                }
                that._resetPos(200);
                if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
                return;
            }
            if (duration < 300 && that.options.momentum) {
                momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
                momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;
                newPosX = that.x + momentumX.dist;
                newPosY = that.y + momentumY.dist;
                if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = {
                    dist: 0,
                    time: 0
                };
                if ((that.y > 0 && newPosY > 0) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = {
                    dist: 0,
                    time: 0
                };
            }
            if (momentumX.dist || momentumY.dist) {
                newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);
                that.scrollTo(mround(newPosX), mround(newPosY), newDuration);
                if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
                return;
            }
            that._resetPos(200);
            if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
        },
        _resetPos: function (time) {
            var that = this,
                resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
                resetY = that.y >= 0 || that.maxScrollY > 0 ? 0 : that.y < that.maxScrollY ? that.maxScrollY : that.y;
            if (resetX == that.x && resetY == that.y) {
                if (that.moved) {
                    if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);
                    that.moved = false;
                }
                return;
            }
            that.scrollTo(resetX, resetY, time || 0);
        },
        _mouseout: function (e) {
            var t = e.relatedTarget;
            if (!t) {
                this._end(e);
                return;
            }
            while (t = t.parentNode)
                if (t == this.wrapper) return;
            this._end(e);
        },
        _transitionEnd: function (e) {
            var that = this;
            if (e.target != that.scroller) return;
            that._unbind('webkitTransitionEnd');
            that._startAni();
        },
        _startAni: function () {
            var that = this,
                startX = that.x,
                startY = that.y,
                startTime = Date.now(),
                step, easeOut, animate;
            if (that.animating) return;
            if (!that.steps.length) {
                that._resetPos(400);
                return;
            }
            step = that.steps.shift();
            if (step.x == startX && step.y == startY) step.time = 0;
            that.animating = true;
            that.moved = true;
            if (that.options.useTransition) {
                that._transitionTime(step.time);
                that._pos(step.x, step.y);
                that.animating = false;
                if (step.time) that._bind('webkitTransitionEnd');
                else that._resetPos(0);
                return;
            }
            animate = function () {
                var now = Date.now(),
                    newX, newY;
                if (now >= startTime + step.time) {
                    that._pos(step.x, step.y);
                    that.animating = false;
                    if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);
                    that._startAni();
                    return;
                }
                now = (now - startTime) / step.time - 1;
                easeOut = m.sqrt(1 - now * now);
                newX = (step.x - startX) * easeOut + startX;
                newY = (step.y - startY) * easeOut + startY;
                that._pos(newX, newY);
                if (that.animating) that.aniTime = nextFrame(animate);
            };
            animate();
        },
        _transitionTime: function (time) {
            this.scroller.style[vendor + 'TransitionDuration'] = time + 'ms';
        },
        _momentum: function (dist, time, maxDistUpper, maxDistLower, size) {
            var deceleration = 0.0006,
                speed = m.abs(dist) / time,
                newDist = (speed * speed) / (2 * deceleration),
                newTime = 0,
                outsideDist = 0;
            if (dist > 0 && newDist > maxDistUpper) {
                outsideDist = size / (6 / (newDist / speed * deceleration));
                maxDistUpper = maxDistUpper + outsideDist;
                speed = speed * maxDistUpper / newDist;
                newDist = maxDistUpper;
            } else if (dist < 0 && newDist > maxDistLower) {
                outsideDist = size / (6 / (newDist / speed * deceleration));
                maxDistLower = maxDistLower + outsideDist;
                speed = speed * maxDistLower / newDist;
                newDist = maxDistLower;
            }
            newDist = newDist * (dist < 0 ? -1 : 1);
            newTime = speed / deceleration;
            return {
                dist: newDist,
                time: mround(newTime)
            };
        },
        _offset: function (el) {
            var left = -el.offsetLeft,
                top = -el.offsetTop;
            while (el = el.offsetParent) {
                left -= el.offsetLeft;
                top -= el.offsetTop;
            }
            return {
                left: left,
                top: top
            };
        },
        _bind: function (type, el, bubble) {
            (el || this.scroller).addEventListener(type, this, !! bubble);
        },
        _unbind: function (type, el, bubble) {
            (el || this.scroller).removeEventListener(type, this, !! bubble);
        },
        destroy: function () {
            var that = this;
            that.scroller.style[vendor + 'Transform'] = '';
            that._unbind(RESIZE_EV, window);
            that._unbind(START_EV);
            that._unbind(MOVE_EV);
            that._unbind(END_EV);
            that._unbind(CANCEL_EV);
            that._unbind('mouseout', that.wrapper);
            if (that.options.useTransition) that._unbind('webkitTransitionEnd');
            if (that.options.onDestroy) that.options.onDestroy.call(that);
        },
        refresh: function () {
            var that = this,
                offset;
            that.wrapperW = that.wrapper.clientWidth;
            that.wrapperH = that.wrapper.clientHeight;
            that.scrollerW = that.scroller.offsetWidth;
            that.scrollerH = that.scroller.offsetHeight;
            that.maxScrollX = that.wrapperW - that.scrollerW;
            that.maxScrollY = that.wrapperH - that.scrollerH;
            that.dirX = 0;
            that.dirY = 0;
            that.hScroll = that.options.hScroll && that.maxScrollX < 0;
            that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);
            offset = that._offset(that.wrapper);
            that.wrapperOffsetLeft = -offset.left;
            that.wrapperOffsetTop = -offset.top;
            that.scroller.style[vendor + 'TransitionDuration'] = '0';
            that._resetPos(200);
        },
        scrollTo: function (x, y, time, relative) {
            var that = this,
                step = x,
                i, l;
            that.stop();
            if (!step.length) step = [{
                x: x,
                y: y,
                time: time,
                relative: relative
            }];
            for (i = 0, l = step.length; i < l; i++) {
                if (step[i].relative) {
                    step[i].x = that.x - step[i].x;
                    step[i].y = that.y - step[i].y;
                }
                that.steps.push({
                    x: step[i].x,
                    y: step[i].y,
                    time: step[i].time || 0
                });
            }
            that._startAni();
        },
        scrollToElement: function (el, time) {
            var that = this,
                pos;
            el = el.nodeType ? el : that.scroller.querySelector(el);
            if (!el) return;
            pos = that._offset(el);
            pos.left += that.wrapperOffsetLeft;
            pos.top += that.wrapperOffsetTop;
            pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
            pos.top = pos.top > 0 ? 0 : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
            time = time === undefined ? m.max(m.abs(pos.left) * 2, m.abs(pos.top) * 2) : time;
            that.scrollTo(pos.left, pos.top, time);
        },
        disable: function () {
            this.stop();
            this._resetPos(0);
            this.enabled = false;
            this._unbind(MOVE_EV);
            this._unbind(END_EV);
            this._unbind(CANCEL_EV);
        },
        enable: function () {
            this.enabled = true;
        },
        stop: function () {
            cancelFrame(this.aniTime);
            this.steps = [];
            this.moved = false;
            this.animating = false;
        }
    };
    if (typeof exports !== 'undefined') exports.iScroll = iScroll;
    else window.iScroll = iScroll;
})();;
(function (w, jQuery, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.ui = w.Mojo.ui || {};
    w.Mojo.ui.Scroll = Mojo.Object.extend({
        init: function (id, scroller, options) {
            this._super(id, options);
            if (scroller instanceof Mojo.Object) {
                this._scroller = scroller.element();
            } else {
                this._scroller = scroller;
            }
            this._m = Math;
            var self = this;
            this.element().addClass('mojo-ui-scroll');
            this._window = $('<div class="window"></div>').appendTo(this.element());
            this._wrapper = $('<div class="wrapper"></div>').appendTo(this._window).append(this._scroller);
            this._scroller.addClass('scroller');
            this._control = new iScroll(this._window, {
                bounce: false,
                bounceLock: true,
                onScrollEnd: function () {
                    self._refreshArrow();
                }
            });
            if (this._options.showArrow) {
                this._bar = $('<div class="bar"></div>');
                this._arrowUp = new Mojo.ui.Button(undefined, {
                    classes: ['arrow-up'],
                    text: this._options.arrowUpLabel,
                    click: function () {
                        if (self._options.direction == 1) {
                            self.scrollByStep(-self._options.step, 0);
                        } else if (self._options.direction == 2) {
                            self.scrollByStep(0, -self._options.step);
                        }
                    },
                });
                this._arrowDown = new Mojo.ui.Button(undefined, {
                    classes: ['arrow-down'],
                    text: this._options.arrowDownLabel,
                    click: function () {
                        if (self._options.direction == 1) {
                            self.scrollByStep(self._options.step, 0);
                        } else if (self._options.direction == 2) {
                            self.scrollByStep(0, self._options.step);
                        }
                    },
                });
                this._bar.append(this._arrowUp.element()).append(this._arrowDown.element()).appendTo(this.element());
            }
            this._initializeWrapperStyle();
            this._refreshArrow();
        },
        _stopTouchScoll: function () {},
        _refreshArrow: function () {
            if (this._options.showArrow) {
                var pos = this._wrapper.position();
                if (this._options.direction == 1) {
                    this._arrowUp.disable(pos.left >= 0);
                    this._arrowDown.disable(Math.abs(pos.left) >= this.scrollerWidth() - this.wrapperWidth());
                } else if (this._options.direction == 2) {
                    this._arrowUp.disable(pos.top >= 0);
                    this._arrowDown.disable(pos.top <= this._wrapper.height() - this._scroller.height());
                }
            }
        },
        refresh: function () {
            this._refreshArrow();
            this._control.refresh();
        },
        _horizontalOutBounds: function (x) {
            var self = this;
            return !(x <= 0 && x >= (self._wrapper.width() - self._scroller.width()));
        },
        _verticalOutBounds: function (y) {
            var self = this;
            return !(y <= 0 && y >= (self._wrapper.height() - self._scroller.height()));
        },
        _initializeWrapperStyle: function () {
            if (this._options.direction == 1) {} else if (this._options.direction == 2) {
                this._wrapper.css({
                    "width": "100%"
                });
            } else {}
        },
        _getDefaultOptions: function () {
            return {
                direction: 0,
                outbounds: false,
                step: 0,
                showTrack: false,
                showArrow: false,
                arrowUpLabel: '',
                arrowDownLabel: '',
            };
        },
        wrapperWidth: function () {
            return this._window.innerWidth();
        },
        wrapperHeight: function () {
            return this._window.innerHeight();
        },
        scrollerWidth: function () {
            return this._wrapper.outerWidth();
        },
        scrollerHeight: function () {
            return this._wrapper.outerHeight();
        },
        scrollerLeft: function () {
            return this._wrapper.position().left;
        },
        scrollerTop: function () {
            return this._wrapper.position().top;
        },
        initial: function () {
            this.refresh();
        },
        scroll: function (relativeX, relativeY) {
            var maxScolleX = this.scrollerWidth() - this.wrapperWidth();
            var maxScolleY = this.scrollerHeight() - this.wrapperHeight();
            if (relativeX > maxScolleX) {
                relativeX = maxScolleX
            }
            if (relativeX <= 0) {
                relativeX = 0;
            }
            if (relativeY > maxScolleY) {
                relativeY = maxScolleY
            }
            if (relativeY <= 0) {
                relativeY = 0;
            }
            offsetX = relativeX + this.scrollerLeft();
            offsetY = relativeY + this.scrollerTop();
            this._control.scrollTo(offsetX, offsetY, 500, true);
            this._refreshArrow();
        },
        scrollByStep: function (stepX, stepY) {
            var left = Math.abs(this.scrollerLeft());
            var top = Math.abs(this.scrollerTop());
            relativeX = left + stepX;
            relativeY = top + stepY;
            this.scroll(relativeX, relativeY)
        },
        scrollTo: function (x, y) {
            this.scroll(x, y);
        },
        clsname: function () {
            return "ui.Scroll";
        }
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.ui = w.Mojo.ui || {};
    w.Mojo.ui.ListPanel = w.Mojo.Object.extend({
        init: function (id, options) {
            this._super(id, options);
            this.element().addClass('mojo-ui-listpanel');
            this._children = [];
            this._hasLoaded = false;
            var self = this;
            this._header = $('<div class="header"></div>').appendTo(this.element());
            this._list = $('<div class="list"></div>')
            if (this._options.scrollable) {
                this._scroll = new Mojo.ui.Scroll(undefined, this._list, {
                    direction: 2
                });
                this.element().append(this._scroll.element());
            } else {
                this.element().append(this._list);
            }
            this._footer = $('<div class="footer"></div>').appendTo(this.element());
            this._more = new Mojo.ui.Button(undefined, {
                text: this._options.moreLabel,
                classes: ['more'],
                click: function (btn, e) {
                    if (self._options.moreClick instanceof Function) {
                        self._options.moreClick(self);
                    } else {
                        if (self._options.refreshable == true) {
                            self._list.find(".mojo-ui-listpanel-child").remove();
                            self._children = [];
                            self._more.element().hide();
                        }
                        self._load();
                    }
                }
            });
            if (this._options.showMore) {
                this._more.element().appendTo(this._list);
                if (this._options.alwaysMore == true) {
                    this._more.element().show();
                }
            }
            this._load();
        },
        _load: function (params) {
            this._showWait();
            this._options.loadFunc(this._children.length, this._options.pageSize, params, this);
        },
        _getDefaultOptions: function () {
            return {
                pageSize: 10,
                showMore: true,
                alwaysMore: false,
                moreLabel: 'More',
                moreClick: undefined,
                refreshable: false,
                drawFunc: $.noop,
                loadFunc: $.noop,
                scrollable: false,
                emptyLabel: null,
                onLoaded: undefined,
                direction: 2,
            };
        },
        _showWait: function () {
            this._more.disable(true);
            if (this._options.showMore === true) {
                $('<div class="waiting"></div>').insertBefore(this._more.element());
            } else {
                this._list.append('<div class="waiting"></div>');
            }
        },
        _hideWait: function () {
            this._list.find('.waiting').remove();
            this._more.disable(false);
        },
        _addChild: function (child) {
            if (child != undefined && child != null) {
                if (this._options.showMore === true) {
                    child.element().addClass("mojo-ui-listpanel-child").insertBefore(this._more.element());
                } else {
                    this._list.append(child.element().addClass("mojo-ui-listpanel-child"));
                }
                this._children.push(child);
            }
        },
        appendData: function (data, showMore) {
            if (this._options.refreshable == true) {
                this.initial();
            }
            var self = this;
            self._hideWait();
            if (data != undefined && data != null) {
                if (Array.isArray(data)) {
                    $.each(data, function (i, d) {
                        self._addChild(self._options.drawFunc(d));
                    });
                    if (self._options.alwaysMore == false && (data.length < self._options.pageSize || showMore === false)) {
                        self._more.element().hide();
                    }
                } else {
                    self._addChild(self._options.drawFunc(data));
                    if (self._options.alwaysMore == false && showMore === false) {
                        self._more.element().hide();
                    }
                }
                if (this._hasLoaded === false && this._options.onLoaded instanceof Function) {
                    this._options.onLoaded(this);
                }
                this._hasLoaded = true;
            }
            this._list.find('.empty').remove();
            if (this._children.length == 0 && this._options.emptyLabel != null) {
                if (this._options.showMore) {
                    this._more.element().before('<div class="empty">' + this._options.emptyLabel + "</div>");
                } else {
                    this._list.append('<div class="empty">' + this._options.emptyLabel + "</div>");
                }
                this._more.element().hide();
            } else if (this._options.alwaysMore == true && this._children.length > 0) {
                this._more.element().show();
            }
            this.rebinding();
            this.resize();
        },
        remove: function (index) {
            this._list.children().eq(index).remove();
        },
        removeAll: function () {
            this._hasLoaded = false;
            this._list.empty();
        },
        clsname: function () {
            return "ui.ListPanel";
        },
        child: function (index) {
            return this._children[index];
        },
        children: function () {
            return this._children;
        },
        resize: function () {
            if (this._options.scrollable && this._options.direction != 1) {
                var top = this.element().offset().top;
                var scrollTop = top + this._header.outerHeight(true);
                var scrollBottom = this._footer.outerHeight(true);
                var h = this.element().height() - this._header.outerHeight(true) - this._footer.outerHeight(true);
                var w = this.element().width();
                this._scroll._window.css({
                    'top': scrollTop + "px",
                    'bottom': scrollBottom + "px",
                    'height': h + "px",
                    'width': w + "px"
                });
            }
            if (this._options.scrollable) {
                this._scroll.refresh();
            }
        },
        initial: function () {
            if (this._options.scrollable) {
                this._scroll.initial();
            }
        }
    });
})(window, jQuery);;
(function (w, $, g) {
    w.Mojo = w.Mojo || {};
    g = w.Mojo.utils = w.Mojo.utils || {};
    g.debug = g.debug || {};
    g.debug.style = 'console';
    g.debug.vars = g.debug.vars || {};
    g.debug.vars.ui = g.debug.vars.ui || {};
    g.debug.vars.com = g.debug.vars.com || {};
    g.debug.vars.page = g.debug.vars.page || {};
    g.debug.print = function (obj, title, debug) {
        if (debug === true) {
            var msg = ((title === undefined) ? 'Debug Message' : title) + "\n==========================\n";
            if (obj === null) {
                msg += "null";
            } else if (obj === undefined) {
                msg += "Undefined Object!";
            } else if (typeof (obj) == 'object') {
                for (var prop in obj) {
                    msg += prop + " : " + obj[prop] + "\n";
                }
            } else {
                msg += obj.toString();
            }
            if (g.debug.style === 'console') {
                console.log(msg);
            } else {
                alert(msg);
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
        return str;
    };
    g.formatSecTime = function (sec) {
        var day = parseInt(sec / (3600 * 24));
        var hour = parseInt(sec / (60 * 60));
        var second = parseInt(sec % (60 * 60));
        var minute = parseInt(second / 60);
        second = second % 60;
        return ((day > 0 ? day + Mojo.utils.locale('ui', 'days') : "") || (hour > 0 ? hour + Mojo.utils.locale('ui', 'hours') : "") || (minute > 0 ? minute + Mojo.utils.locale('ui', 'minutes') : "") || (second > 0 ? second + Mojo.utils.locale('ui', 'seconds') : ""));
    };
    g.getFromNowTime = function (time) {
        var date = new Date();
        var now = date.getTime() / 1000;
        var send = parseInt(time);
        var t = parseInt(now - send);
        if (t < 1) {
            t = 1;
        }
        var day = parseInt(t / (3600 * 24));
        var hour = parseInt((t % (3600 * 24)) / 3600);
        var minute = parseInt((t % 3600) / 60);
        var second = t % 60;
        return (((day > 0 ? day + Mojo.utils.locale('ui', 'days') : "") || (hour > 0 ? hour + Mojo.utils.locale('ui', 'hours') : "") || (minute > 0 ? minute + Mojo.utils.locale('ui', 'minutes') : "") || (second > 0 ? second + Mojo.utils.locale('ui', 'seconds') : "")) +
            Mojo.utils.locale('ui', 'ago'));
    };
    g.center = function (element) {
        var left = $(window).width() / 2 - element.outerWidth() / 2;
        var top = $(window).height() / 2 - element.outerHeight() / 2;
        var sl = $(document).scrollLeft();
        var st = $(document).scrollTop();
        element.css({
            left: left + sl,
            top: top + st
        });
    };
    g.relaW = function (num) {
        return num / 320 * $(window).width();
    };
    g.relaH = function (num) {
        return num / 440 * $(windw).height();
    };
    g.bottom = function (element) {
        var left = $(window).width() / 2 - element.outerWidth() / 2;
        var sl = $(document).scrollLeft();
        element.css({
            left: left + sl,
            bottom: 0,
            position: 'absolute'
        });
    };
    g.isWhat = function (typeId, what) {
        if (parseInt(typeId) == 1) {
            return (what === undefined ? "general" : (what == "general"));
        }
        if (parseInt(typeId) == 2) {
            return (what === undefined ? "sword" : (what == "sword"));
        }
        if (parseInt(typeId) == 3) {
            return (what === undefined ? "shield" : (what == "shield"));
        }
        if (parseInt(typeId) == 4) {
            return (what === undefined ? "mounts" : (what == "mounts"));
        }
        if (parseInt(typeId) == 5) {
            return (what === undefined ? "treasure" : (what == "treasure"));
        }
        if (parseInt(typeId) == 6) {
            return (what === undefined ? "shouji" : (what == "shouji"));
        }
        if (parseInt(typeId) == 7) {
            return (what === undefined ? "props" : (what == "props"));
        }
        if (parseInt(typeId) == 8) {
            return (what === undefined ? "minis" : (what == "minis"));
        }
        if (parseInt(typeId) == 21) {
            return (what === undefined ? "rm" : (what == "rm"));
        }
        if (parseInt(typeId) == 22) {
            return (what === undefined ? "vm" : (what == "vm"));
        }
        if (parseInt(typeId) == 23) {
            return (what === undefined ? "xp" : (what == "xp"));
        }
        return undefined;
    };
    w.Mojo.lang = w.Mojo.lang || {};
    g.locale = function (cat, key, params, userLanguage) {
        if (userLanguage == undefined) {
            userLanguage = Mojo.app.getUserLanguage();
        }
        var result = "";
        var paramsObj = params || {};
        if (cat != undefined && cat != null && key != undefined && key != null) {
            if (w.Mojo.lang[cat] != undefined && w.Mojo.lang[cat][userLanguage] != undefined && w.Mojo.lang[cat][userLanguage][key] != undefined) {
                result = w.Mojo.lang[cat][userLanguage][key];
            }
            if (result.length <= 0) {
                if (paramsObj.__default__) {
                    result = paramsObj['__default__'];
                } else {
                    result = key;
                }
            }
            var regExp = new RegExp();
            for (var k in paramsObj) {
                regExp = eval("/{{:" + k + "}}/g");
                result = result.replace(regExp, paramsObj[k]);
            }
        }
        return result;
    };
    g.getFromParams = function (key) {
        var url = location.href;
        var str = url.substring(url.indexOf('?') + 1, url.length).split('&');
        var obj = {};
        for (i = 0; j = str[i]; i++) {
            obj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(j.indexOf('=') + 1, j.length);
        }
        return obj[key.toLowerCase()];
    };
    g.getHttpGetParams = function () {
        var url = window.location.href;
        var str = url.substring(url.indexOf('?') + 1, url.length).split('&');
        var obj = {};
        for (i = 0; j = str[i]; i++) {
            obj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(j.indexOf('=') + 1, j.length);
        }
        return obj;
    }
    g.getFromHost = function (key) {
        var url = location.href;
        var host = url.split("?")[0]
        var hostList = host.split("/");
        for (var index = 0; index < hostList.length; index++) {
            var k = hostList[index];
            if (k == key && index < (hostList.length - 1)) {
                return hostList[index + 1];
            }
        }
        return undefined;
    };
    g._hasSomething = {};
    g.getSomething = function (key, onlyOnce) {
        if (onlyOnce == true && g._hasSomething[key]) {
            return undefined;
        }
        var result = g.getFromParams(key);
        if (result == undefined || result == null) {
            result = g.getFromHost(key);
        }
        if (onlyOnce == true) {
            g._hasSomething[key] = result;
        }
        return result;
    };
    g.formatTimePlus = function (format, time) {
        if (time === undefined) {
            time = (new Date()).getTime() / 1000;
        }
        var day = 0,
            hour = 0,
            minutes = 0,
            second = 0;
        if (format.indexOf("%dd") >= 0) {
            day = parseInt(time / (3600 * 24));
            time = parseInt(time % 3600 * 24);
        }
        if (format.indexOf("%hhu") >= 0) {
            hour = parseInt(time / 3600);
            time = parseInt(time % 3600);
        }
        if (format.indexOf("%mmu") >= 0) {
            minutes = parseInt(time / 60);
            time = parseInt(time % 60);
        }
        second = parseInt(time);
        var result = format.replace("%ddu", (day <= 0 ? "" : day + Mojo.utils.locale('common', 'day'))).replace("%hhu", (hour <= 0 ? "" : hour + Mojo.utils.locale('common', 'hour'))).replace("%mmu", (minutes <= 0 ? "" : minutes + Mojo.utils.locale('common', 'minutes'))).replace("%ssu", (second <= 0 ? "" : second + Mojo.utils.locale('common', 'second')));
        return result;
    };
    g.formatPlayerName = function (name, title) {
        if (typeof (name) == 'object') {
            title = name.title;
            name = name.name;
        }
        if (title) {
            return '[<span class="official">' + title + '</span>]' + name;
        }
        return name;
    };
    g.isNone = function (d) {
        if (d == undefined || d == null) {
            return true;
        }
        if ((typeof (d) == 'string' || Array.isArray(d)) && d.length <= 0) {
            return true;
        }
        if (typeof (d) == 'number') {
            return isNaN(d);
        }
        if (typeof (d) == 'object') {
            for (var i in d) {
                return false;
            }
            return true;
        }
        return false;
    };
    g.cardprice = function (lv, star) {
        lv = parseInt(lv);
        star = parseInt(star);
        var temp = 40 * (lv - 1) * Math.pow((lv / 50 + 1), 1.2) + 25 * Math.pow((star + 1), 2) / (5.2 - star);
        return Math.ceil(temp);
    }
    g.showWait = function (isOpen) {
        if (isOpen === false) {
            $(document.body).find(".mojo-utils-shadow").remove();
        } else {
            var shadow = $('<div class="mojo-utils-shadow"><div class="pp-chrysanthemum"></div></div>').css({
                'width': $(document).width(),
                'height': $(document).height(),
            }).appendTo($(document.body));
            g.center(shadow.find(".pp-chrysanthemum").first());
        }
    };
    g.trim = function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    };
    g.getEntityTitle = function (typeId) {
        var str = '';
        switch (parseInt(typeId)) {
        case 1:
            str = Mojo.utils.locale('entity', 'generals_info');
            break;
        case 2:
            str = Mojo.utils.locale('entity', 'weapon_info');
            break;
        case 3:
            str = Mojo.utils.locale('entity', 'armor_info');
            break;
        case 4:
            str = Mojo.utils.locale('entity', 'mounts_info');
            break;
        case 5:
            str = Mojo.utils.locale('entity', 'treasure_info');
            break;
        default:
            break;
        }
        return str;
    };
    g.getClientVersion = function () {
        return Mojo.cache.get('app_version') == undefined ? "1.0" : Mojo.cache.get('app_version');
    };
    g.isOpenUrlAvailable = function () {
        var version = parseFloat(g.getClientVersion());
        if (Mojo.gap.device == 'iphone') {
            if (version >= 1.3) {
                return true;
            }
        } else if (Mojo.gap.device == 'ipad') {
            if (version >= 1.2) {
                return true;
            }
        }
        return false;
    };
    g.formatTimeToDate = function (sec) {
        var str = '';
        var date = new Date(sec * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var dd = date.getDate();
        var min = date.getMinutes() + "";
        if (min.length < 2)
            min = "0" + min;
        str = month + Mojo.utils.locale('common', 'month') + dd + Mojo.utils.locale('common', 'dday') + date.getHours() + "时";
        return str;
    };
    g.checkPasswdNumChar = function (passwd) {
        var num = /[0-9]+/;
        var abc = /[A-Za-z]/;
        if (!abc.test(passwd)) {
            return false;
        }
        if (!num.test(passwd)) {
            return false;
        }
        return true;
    };
    g.getCookie = function (key) {
        var search = key + "=";
        if (document.cookie.length > 0) {
            var offset = document.cookie.indexOf(search);
            if (offset > -1) {
                offset += search.length;
                var end = document.cookie.indexOf(";", offset);
                if (end == -1) end = document.cookie.length;
                return document.cookie.substring(offset, end);
            } else {
                return "";
            }
        }
    };
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.lang = {};
    w.Mojo.lang['ui'] = {
        'zh_tw': {
            'Agree': '同意',
            'Agreed': '',
            'Assist Lose': '救援失敗',
            'Assist Win': '救援成功',
            'Back': '返回',
            'Back to {{:scenario}}': '返回{{:scenario}}',
            'Base Informations': '基礎資料',
            'Close': '關閉',
            'Congratulations': '恭喜',
            'Congratulations! You got a card!': '恭喜你獲得了一張卡牌！',
            'Congratulations! You got rewards!': '恭喜你獲得獎勵！',
            'Denied': '',
            'Deny': '拒絕',
            'Do': '執行',
            'Duel': '切磋',
            'Fight Informations': '戰鬥資訊',
            'For Help': '求援',
            'For Help Again': '再次求援',
            'Force Invite': '勢力邀請',
            'Force War': '勢力戰',
            'Friend Assist Request': '好友求援',
            'Friend Confirmation': '好友確認',
            'Friend Delete': '割袍斷義',
            'Friend Message': '好友消息',
            'Friend PK Lose': '切磋戰敗',
            'Friend PK Win': '切磋勝利',
            'Friend Rejection': '好友拒絕',
            'Friend Request': '好友請求',
            'In War': '參戰',
            'Introduction': '簡介',
            'Leave Message': '留言',
            'Level': '難度：',
            'More Messages': '更多消息',
            'Next': '後一頁',
            'PK Lose': '戰敗',
            'PK Win': '勝利',
            'Previous': '前一頁',
            'Progress': '完成度',
            'Ranking': '',
            'Refresh Succ': '刷新成功',
            'Reject': '拒絕',
            'Reply': '回覆',
            'Requirement': '任務需求',
            'Retaliate': '反擊',
            'Reward': '任務獎勵',
            'Select': '選',
            'Select a friend': '選擇好友',
            'Send': '發送',
            'Send Troops': '出兵',
            'System Message': '系統消息',
            'Thanko_kr': '致謝',
            'Thanks': '致谢',
            'Type message': '發送消息',
            'View Force': '查看勢力',
            'View More': '查看更多',
            'ago': '前',
            'day': '天',
            'days': '天',
            'hour': '小時',
            'hours': '小時',
            'lost_title': '',
            'minute': '分鐘',
            'minutes': '分鐘',
            'second': '秒',
            'seconds': '秒',
            'ui War': '勢力戰',
        },
        'zh_cn': {
            'Agree': '同意',
            'Agreed': '已同意',
            'Assist Lose': '救援失败',
            'Assist Win': '救援成功',
            'Back': '返回',
            'Back to {{:scenario}}': '返回{{:scenario}}',
            'Base Informations': '基础信息',
            'Close': '关闭',
            'Congratulations': '恭喜',
            'Congratulations! You got a card!': '恭喜你获得了一张卡牌！',
            'Congratulations! You got rewards!': '恭喜你获得奖励！',
            'Denied': '已拒绝',
            'Deny': '拒绝',
            'Do': '执行',
            'Duel': '切磋',
            'Fight Informations': '战斗信息',
            'For Help': '求援',
            'For Help Again': '再次求援',
            'Force Invite': '势力邀请',
            'Force War': '抢粮战',
            'Friend Assist Request': '好友求援',
            'Friend Confirmation': '好友确认',
            'Friend Delete': '割袍断义',
            'Friend Message': '好友消息',
            'Friend PK Lose': '切磋战败',
            'Friend PK Win': '切磋胜利',
            'Friend Rejection': '好友拒绝',
            'Friend Request': '好友请求',
            'In War': '参战',
            'Introduction': '简介',
            'Leave Message': '留言',
            'Level': '难度：',
            'More Messages': '更多消息',
            'Next': '后一页',
            'PK Lose': '战败',
            'PK Win': '胜利',
            'Previous': '前一页',
            'Progress': '完成度',
            'Ranking': '排行榜消息',
            'Refresh Succ': '刷新成功',
            'Reject': '拒绝',
            'Reply': '回复',
            'Requirement': '任务需求',
            'Retaliate': '反击',
            'Reward': '任务奖励',
            'Select': '选',
            'Select a friend': '选择好友',
            'Send': '发送',
            'Send Troops': '出兵',
            'System Message': '系统消息',
            'Thanko_kr': '致谢',
            'Thanks': '致谢',
            'Type message': '发送消息',
            'View Force': '查看势力',
            'View More': '查看更多',
            'ago': '前',
            'day': '天',
            'days': '天',
            'hour': '小时',
            'hours': '小时',
            'lost_title': '失去称号',
            'minute': '分钟',
            'minutes': '分钟',
            'second': '秒',
            'seconds': '秒',
            'ui War': '抢粮战',
        },
    };
    w.Mojo.lang['common'] = {
        'zh_tw': {
            'Go Statistics': '查看統計',
            'acceleration for restore ep': '&#149精力恢復速度增加：',
            'acceleration for restore sp': '&#149體力恢復速度增加：',
            'action_error': '',
            'add_cp': '你使用了{{:name}}, 獲得了{{:value}}个挑戰書',
            'add_ep': '{{:name}}使用成功',
            'add_friend': '加好友',
            'add_sp': '{{:name}}使用成功',
            'ago': '',
            'and': '',
            'assign_title': '',
            'attack': '進攻',
            'attack_again': '再次進攻',
            'avoid war time': '免戰時間：{{:avoid_war_time}}',
            'avoid_war_content': '主公，我軍還在免戰中，撤銷免戰牌方可出兵！但是我軍也將城門大開！<br><b>免戰時間：{{:avoid_war_time}}</b>',
            'avoid_war_title': '我軍免戰中',
            'back': '返回',
            'bad network': '主公～你的網路有點弱哦～',
            'base_attack': '基礎攻擊力：{{:old}} → <span>{{:new}}</span>',
            'base_defence': '基礎防禦力：{{:old}} → <span>{{:new}}</span>',
            'battle': '去征討',
            'battle_search': '輸入玩家暱稱搜索',
            'before_login_data': '',
            'bind': '預設',
            'bind_tip1': '主公，請預設您的email。Email將作為密碼找回的工具，且不可更改<div class="tip">所以請務必確認email正確有效哦~</div>',
            'bind_tip2': '預設email 7天後，即可通過email找回密碼哦~',
            'bind_tip3': '',
            'bind_title': '預設帳號資訊',
            'bind_weibo': '預設Facebook',
            'buy': '購買',
            'buy ep succ': '精力大還丹購買成功',
            'buy sp succ': '體力大還丹購買成功',
            'buy_fail_title': '購買失敗！',
            'buy_something_success': '{{:name}}購買成功',
            'buy_warning_content': '',
            'buy_warning_title': '',
            'cancel': '',
            'capacify_lack': '卡牌容量不足',
            'capacify_lack_tip': '主公~您的卡牌容量不足啦，去强化掉多余的卡牌或者去出售部分卡牌再来吧~',
            'choose_a_player_enter': '',
            'clear_avoid_war': '免戰時間已清空，機會和挑戰並存',
            'close': '關閉',
            'common': '勢力：',
            'confirm quit': '',
            'count': '數量：',
            'create_new_player': '',
            'create_player_tips': '',
            'day': '天',
            'days': '天',
            'dday': '日',
            'default_text': '請輸入給他（她）的話',
            'discount': '折',
            'email': 'email',
            'email bind tips': '',
            'enter': '',
            'enter game': '',
            'ep': '精力值：',
            'expire': '維護',
            'explanation': '',
            'facebook': 'Facebook',
            'findpwd_email_address': 'email *',
            'findpwd_email_tip': '請輸入帳號和註冊的email：',
            'findpwd_method_tip': '請選擇密碼找回的方式！<br>&#149預設手機的用戶請選擇【簡訊找回】<br>&#149已註冊email的用戶請選擇【郵件找回】<br>&#149未預設手機和郵箱的用戶請聯繫客服<br>客服email：support@redatoms.com',
            'findpwd_mobile_tip': '請輸入帳號和註冊的手機號碼：',
            'findpwd_send_email': '發送郵件',
            'findpwd_server_tip': '您要找回密碼的伺服器：',
            'findpwd_with_email': '郵件找回',
            'findpwd_with_mobile': '簡訊找回',
            'force': '勢力：',
            'force-none': '',
            'force_message': '勢力消息',
            'force_war_tip2': '',
            'forcewar_lose_grain': '【{{:forcename}}】率眾偷襲我方勢力，奪走了{{:grain}}糧餉',
            'forcewar_notice_members1': '[<span>{{:title}}</span>]{{:ownername}}向【{{:forcename}}】發起挑戰，號召你加入戰鬥！',
            'forcewar_win_grain': '我方勢力輕鬆擊敗【{{:forcename}}】，奪得{{:grain}}糧餉',
            'forgetpwd': '忘記密碼',
            'friend_search': '',
            'friendly_tip': '',
            'full': '滿',
            'gain_levelup_award': '獲得升級獎勵：',
            'game account': '',
            'general_count': '上陣將領數：',
            'general_slot_unlock': '解鎖一個上陣將領卡槽!',
            'go_accept': '查收',
            'go_bless': '',
            'go_embed': '直接上陣',
            'go_fuben': '去闖關',
            'go_intensify': '去強化',
            'go_neizheng': '',
            'go_payment': '去加值',
            'go_rebirth': '去轉生',
            'go_sale': '去出售',
            'go_vm': '去換錢',
            'grain': '糧餉：',
            'has reached the maximum': '已達最大值',
            'hot': '熱',
            'hour': '小時',
            'hours': '小時',
            'in_cd': '冷卻中：',
            'input_account_tip': '',
            'input_email': '请输入郵箱地址',
            'input_mobile': '請輸入手機號',
            'input_username': '請輸入帳號',
            'intensify': '強化',
            'invite_friend': '好友邀請',
            'level': '級別：',
            'level_up': '恭喜主公達到等級{{:level}}',
            'level_up_title': '恭喜升級',
            'login_forget_description': '若註冊時未填寫手機號碼或手機號碼有誤，請聯繫客服。',
            'login_forget_passwd': '密碼找回',
            'login_forget_phone': '手機號碼 *',
            'login_forget_sendsms': '發送簡訊',
            'login_forget_username': '帳號  *',
            'login_nickname_tip': '',
            'login_time': '',
            'lv': '級別',
            'main_j': '主將',
            'max_energy': '精力最大值：{{:old}} → <span>{{:new}}</span>',
            'max_entity': '卡牌容量上限：{{:old}} → <span>{{:new}}</span>',
            'max_friends_count': '最大好友數量：{{:old}} → <span>{{:new}}</span>',
            'max_stamina': '體力最大值：{{:old}} → <span>{{:new}}</span>',
            'minute': '分鐘',
            'minutes': '分鐘',
            'month': '月',
            'more': '更多',
            'name': '暱稱：',
            'need_logout': '',
            'need_logout_notice': '',
            'new': '新',
            'new_attack': '攻擊：',
            'new_defence': '防禦：',
            'nickname_not_empty': '',
            'no content': '無字天書會看不懂哦！',
            'no enough energy': '精力值不足',
            'no enough stamina': '體力值不足',
            'not enough ep': '提示: 主公如有體力,請前去征討',
            'not enough sp': '提示: 主公如有精力,請執行任務',
            'not_bind': '暫不預設',
            'ok': '確定',
            'player num max prompt': '',
            'playerId': '',
            'player_role': '',
            'pls_input_acc': '',
            'price': '花費：',
            'price in mall': '商城售價：',
            'price_title': '售價：',
            'priceless': '無價之寶，不可購買',
            'recharge': '加值',
            'relation': '（連結{{:platform}}）',
            'relation_guest': '未預設email的用戶請聯繫客服<br>客服email：support@redatoms.com',
            'repeat_login': '',
            'reset_avoid_war': '使用成功，免戰時間重置為{{:avoid_war_time}}',
            'revocation_of_war_free': '撤銷免戰',
            'rm': '元寶：',
            'rob': '去奪寶',
            'search': '搜',
            'search_force_hint': '',
            'second': '秒',
            'seconds': '秒',
            'select_all': '全選',
            'send success': '',
            'send_pwd_to_email': '',
            'send_pwd_to_mobile': '',
            'send_pwd_to_phone': '',
            'share': '',
            'simple': '',
            'simple_attack': '攻擊力：',
            'simple_defence': '防禦力：',
            'simplified': '簡體',
            'sp': '體力值：',
            'suggestion_default_text': '請輸入您的建議',
            'suggestion_has_send': '已飛鴿傳書！',
            'suggestion_title': '意見建議',
            'sure_buy': '',
            'task': '做任務',
            'team_attack': '軍團攻擊力：',
            'team_defence': '軍團防禦力：',
            'think_again': '再想想',
            'time for all ep': '&#149全部精力恢復：',
            'time for all sp': '&#149全部體力恢復：',
            'time for next ep': '&#149下一點精力恢復：',
            'time for next sp': '&#149下一點體力恢復：',
            'tips': '提示',
            'traditional': '繁體',
            'unknown': '',
            'unlock_fuben_name': '解鎖闖關：{{:name}}',
            'unlock_slot_count': '上陣將領卡槽：{{:old}} → <span>{{:new}}</span>',
            'use': '使用',
            'userbuff': '',
            'username_tip': '',
            'username_too_long': '',
            'view': '查看',
            'vm': '銀幣：',
            'wait_to_do': '主公～稍等一下再執行該任務吧～',
            'weibo': 'Facebook',
            'weixin': '',
            'when lose': '失敗時',
            'when win': '勝利時',
            'win_rate': '征討勝率：{{:percent}}%',
            'xp': '經驗值：',
            'year': '年',
        },
        'zh_cn': {
            'Go Statistics': '查看统计',
            'acceleration for restore ep': '&#149精力恢复速度增加：',
            'acceleration for restore sp': '&#149体力恢复速度增加：',
            'action_error': '主公~您的操作失败，请重试~',
            'add_cp': '你使用了{{:name}}, 获得了{{:value}}个军令',
            'add_ep': '{{:name}}使用成功',
            'add_friend': '加好友',
            'add_sp': '{{:name}}使用成功',
            'ago': '前',
            'and': '及',
            'assign_title': '分配称号',
            'attack': '进攻',
            'attack_again': '再次进攻',
            'avoid war time': '免战时间：{{:avoid_war_time}}',
            'avoid_war_content': '主公，我军还在免战中，撤销免战牌方可出兵！但是我军也将城门大开！<br><b>免战时间：{{:avoid_war_time}}</b>',
            'avoid_war_title': '我军免战中',
            'back': '返回',
            'bad network': '主公～你的网络不给力啊～',
            'base_attack': '基础攻击力：{{:old}} → <span>{{:new}}</span>',
            'base_defence': '基础防御力：{{:old}} → <span>{{:new}}</span>',
            'battle': '去征讨',
            'battle_search': '输入玩家昵称搜索',
            'before_login_data': '上次登录：',
            'bind': '绑定',
            'bind_tip1': '主公，请绑定您的电子邮箱。电子邮箱将作为密码找回的工具，且不可更改<div class="tip">所以请务必保证邮箱真实有效哦~</div>',
            'bind_tip2': '绑定邮箱7天后，即可通过邮箱找回密码哦~',
            'bind_tip3': '主公~为了您的账户安全,请前往设置中进行游戏账户绑定,绑定后可获额外奖励哦~',
            'bind_title': '账户信息绑定',
            'bind_weibo': '绑定微博',
            'buy': '购买',
            'buy ep succ': '精力大还丹购买成功',
            'buy sp succ': '体力大还丹购买成功',
            'buy_fail_title': '购买失败！',
            'buy_something_success': '{{:name}}购买成功',
            'buy_warning_content': '主公～我军要购入此东东吗？',
            'buy_warning_title': '购买确认',
            'cancel': '取消',
            'capacify_lack': '卡牌容量不足',
            'capacify_lack_tip': '主公~您的卡牌容量不足啦，去强化掉多余的卡牌或者去出售部分卡牌再来吧~',
            'choose_a_player_enter': '选择一个角色进入游戏',
            'clear_avoid_war': '免战时间已清空，机会和挑战并存',
            'close': '关闭',
            'common': '势力：',
            'confirm quit': '确认退出',
            'count': '数量：',
            'create_new_player': '创建新角色',
            'create_player_tips': '创建角色数：{{:players}}/{{:maxPlayers}}',
            'day': '天',
            'days': '天',
            'dday': '日',
            'default_text': '请输入给Ta的话',
            'discount': '折',
            'email': '电子邮箱',
            'email bind tips': '微博已被绑定',
            'enter': '进入',
            'enter game': '进入游戏',
            'ep': '精力值：',
            'expire': '维护',
            'explanation': '说明',
            'facebook': 'facebook',
            'findpwd_email_address': '邮箱地址 *',
            'findpwd_email_tip': '请输入账户和绑定的邮箱地址：',
            'findpwd_method_tip': '<b>请选择密码找回的方式！</b><br>&#149绑定手机的用户请选择【短信找回】<br>&#149绑定邮箱的用户请选择【邮件找回】<br>&#149手机和邮箱都未绑定的用户请联系客服<br>客服邮箱：support@redatoms.com',
            'findpwd_mobile_tip': '请输入账户和绑定的手机号码：',
            'findpwd_send_email': '发送邮件',
            'findpwd_server_tip': '您要找回密码的服务器：',
            'findpwd_with_email': '邮件找回',
            'findpwd_with_mobile': '短信找回',
            'force': '势力：',
            'force-none': '未加入势力',
            'force_message': '势力消息',
            'force_war_tip2': '贡献值{{:contribute}}及以上的势力成员可以参战哦~',
            'forcewar_lose_grain': '【{{:forcename}}】率众偷袭我方势力，夺走了{{:grain}}粮饷',
            'forcewar_notice_members1': '[<span>{{:title}}</span>]{{:ownername}}向【{{:forcename}}】发起挑战，号召你加入战斗！',
            'forcewar_win_grain': '我方势力轻松击败【{{:forcename}}】，夺得{{:grain}}粮饷',
            'forgetpwd': '忘记密码',
            'friend_search': '输入好友昵称搜索',
            'friendly_tip': '友情提示',
            'full': '满',
            'gain_levelup_award': '获得升级奖励：',
            'game account': '游戏账户：',
            'general_count': '上阵将领数：',
            'general_slot_unlock': '解锁一个上阵将领卡槽!',
            'go_accept': '查收',
            'go_bless': '去祝福',
            'go_embed': '直接上阵',
            'go_fuben': '去闯关',
            'go_intensify': '去强化',
            'go_neizheng': '做内政',
            'go_payment': '去充值',
            'go_rebirth': '去转生',
            'go_sale': '去出售',
            'go_vm': '去换钱',
            'grain': '粮饷：',
            'has reached the maximum': '已达最大值',
            'hot': '热',
            'hour': '小时',
            'hours': '小时',
            'in_cd': '冷却中：',
            'input_account_tip': '请输入您要找回密码的游戏账户',
            'input_email': '游戏账户不能为空',
            'input_mobile': '请输入手机号',
            'input_username': '请输入账户名',
            'intensify': '强化',
            'invite_friend': '好友邀请',
            'level': '级别：',
            'level_up': '恭喜主公达到等级{{:level}}',
            'level_up_title': '恭喜升级',
            'login_forget_description': '若注册时未填写手机号码或手机号码输入有误，请联系客服。',
            'login_forget_passwd': '密码找回',
            'login_forget_phone': '手机号 *',
            'login_forget_sendsms': '发送短信',
            'login_forget_username': '账户名 *',
            'login_nickname_tip': '昵称设定',
            'login_time': '登录：',
            'lv': '级别',
            'main_j': '主将',
            'max_energy': '精力最大值：{{:old}} → <span>{{:new}}</span>',
            'max_entity': '卡牌容量上限：{{:old}} → <span>{{:new}}</span>',
            'max_friends_count': '最大好友数量：{{:old}} → <span>{{:new}}</span>',
            'max_stamina': '体力最大值：{{:old}} → <span>{{:new}}</span>',
            'minute': '分钟',
            'minutes': '分钟',
            'month': '月',
            'more': '更多',
            'name': '昵称：',
            'need_logout': '重新登录',
            'need_logout_notice': '主公~您的账户在其它设备上登录了，本机登录的账户自动下线，请重新登录~',
            'new': '新',
            'new_attack': '攻击：',
            'new_defence': '防御：',
            'nickname_not_empty': '昵称不可为空',
            'no content': '无字天书别人是看不懂的！',
            'no enough energy': '精力值不足',
            'no enough stamina': '体力值不足',
            'not enough ep': '提示: 主公如有体力,请前去征讨',
            'not enough sp': '提示: 主公如有精力,请前去任务',
            'not_bind': '暂不绑定',
            'ok': '确定',
            'player num max prompt': '主公~最多只能创建{{:maxplayer}}个角色哦~',
            'playerId': '玩家ID：',
            'player_role': '游戏昵称是您在游戏中的名字：',
            'pls_input_acc': '请输入您的游戏账户',
            'price': '花费：',
            'price in mall': '商城售价：',
            'price_title': '售价：',
            'priceless': '无价之宝，不可购得。',
            'recharge': '充值',
            'relation': '（关联{{:platform}}）',
            'relation_guest': '邮箱未绑定的用户请联系客服<br>客服邮箱：support@redatoms.com',
            'repeat_login': '重复登录',
            'reset_avoid_war': '使用成功，免战时间重置为{{:avoid_war_time}}',
            'revocation_of_war_free': '撤销免战',
            'rm': '元宝：',
            'rob': '去夺宝',
            'search': '搜',
            'search_force_hint': '输入势力名称搜索',
            'second': '秒',
            'seconds': '秒',
            'select_all': '全选',
            'send success': '发送成功',
            'send_pwd_to_email': '已向<span style="color:#A80E0E">{{:email}}</span>的绑定邮箱发送密码',
            'send_pwd_to_mobile': '已向<span style="color:#A80E0E">{{:mobile}}</span>发送密码',
            'send_pwd_to_phone': '请输入您的手机号',
            'share': '分享',
            'simple': '',
            'simple_attack': '攻击力：',
            'simple_defence': '防御力：',
            'simplified': '简体',
            'sp': '体力值：',
            'suggestion_default_text': '请输入您的建议',
            'suggestion_has_send': '已飞鸽传书！',
            'suggestion_title': '意见建议',
            'sure_buy': '确定购买',
            'task': '做任务',
            'team_attack': '军团攻击力：',
            'team_defence': '军团防御力：',
            'think_again': '再想想',
            'time for all ep': '&#149全部精力恢复：',
            'time for all sp': '&#149全部体力恢复：',
            'time for next ep': '&#149下一点精力恢复：',
            'time for next sp': '&#149下一点体力恢复：',
            'tips': '提示',
            'traditional': '繁体',
            'unknown': '未知',
            'unlock_fuben_name': '解锁闯关：{{:name}}',
            'unlock_slot_count': '上阵将领卡槽：{{:old}} → <span>{{:new}}</span>',
            'use': '使用',
            'userbuff': '个人称号：',
            'username_tip': '最多十个字',
            'username_too_long': '角色名太长',
            'view': '查看',
            'vm': '银币：',
            'wait_to_do': '主公～等会儿再执行该任务吧～',
            'weibo': '分享到微博',
            'weixin': '微信',
            'when lose': '失败时',
            'when win': '胜利时',
            'win_rate': '征讨胜率：{{:percent}}%',
            'xp': '经验值：',
            'year': '年',
        },
    };
    w.Mojo.lang['weibo'] = {
        'zh_tw': {
            'A new general socket will unlock after binding weibo account.': '綁定帳號後增加一個上陣將領卡槽。',
            'Bind Success Tip': '',
            'Bind sina weibo account': '預設微博',
            'Bind succeed and why not to follow us': '',
            'Bind weibo': '預設微博',
            'Binding sina weibo account, please wait...': '正在預設您的新浪微博帳號，請稍候...',
            'Change account': '變更預設',
            'Fail to bind your weibo account!': '預設新浪微博帳號失敗！',
            'Fail to fetch your weibo account infomation!': '獲取新浪微博帳號資訊失敗！',
            'Fail to logout current account!': '新浪微博帳號重設失敗，請重試！',
            'Fetching your nickname of sina weibo, please wait...': '正在獲取新浪微博帳戶昵稱，請稍候...',
            'Has bind to sina weibo account': '已預設新浪微博',
            'Has bind to sina weibo account:{{:account}}': '已預設新浪微博<br>{{:account}}',
            'Have not bind any weibo account!': '未預設新浪微博',
            'I am watting for you in #SanGuo lai le#!': '我在#三國來了#等著你呢！',
            'Login': '請重新登入',
            'Merge Succeed': '',
            'Please input weibo content': '請輸入信息內容',
            'Receive 50 coins for every weibo message(The daily limit is 500 coins).': '每分享一次喜悅獲得100銀幣（每日上限500銀幣）。',
            'Send Success': '發送消息成功！',
            'Send message': '發送消息',
            'Send weibo': '發送消息',
            'Share achievements with your friends and fans.': '和好友、粉絲們分享成就。',
            'Weibo Bind Success Tip': '',
            'Weibo has a lot of benefits': '分享喜悅好處多多',
            'Your weibo account "{{:account}}" has expired, please login again!': '新浪微博已過期<br>{{:account}}',
            'Your weibo account has been binded, do you want to use it binding current': '',
            'Your weibo account has expired!': '新浪微博已過期',
            'bind exist': '',
            'bind message': '主公～你還沒預設微博，現在就去預設吧～<br>也可以在【首頁-設置】中自行預設～<br>PS:分享喜悅將獲得銀幣獎勵哦～',
            'bind succeed': '',
            'bind succeed 7 day ago has card': '',
            'bind succeed 7 day ago no card': '',
            'bind title': '預設新浪微博',
            'bind_notice': '',
            'change weibo success tips': '',
            'change weibo success tips0': '',
            'email_merge_prompt_content': '',
            'enter_game': '進入遊戲',
            'expire message': '主公～你的微博已過期，需要重新登錄～<br>也可以在【首頁-設置】中自行登錄～<br>PS:分享喜悅將獲得銀幣獎勵哦～',
            'follow': '關注',
            'follow message': '是否關注官方微博，獲取更多遊戲資訊，並結交更多喜歡《三國來了》的戰友？<br>關注獎勵：1000銀幣',
            'follow official': '關注官方微博',
            'go bind': '去預設',
            'go login': '去登入',
            'merge_faild_content': '',
            'merge_faild_tips': '',
            'merge_prompt_content': '',
            'merge_prompt_tips': '',
            'no_bind_notice': '',
            'rebind weibo faild': '',
            'rebind weibo faild content': '',
            'relation_official_weibo': '關注《三國來了》官方微博<br><span>（第一次關注獎勵1000銀幣哦~）</span>',
            'relation_weibo': '連結新浪微博帳號',
            'relation_weibo_tip': '嗨，連結新浪微博隨時可以與身邊的朋友分享遊戲中的喜悅哦~',
            'weibo bind succeed 7 day ago has card': '',
            'weibo bind succeed 7 day ago no card': '',
            'weibo binding content': '',
            'weibo binding tips': '',
            'weibo bonus': '每分享一次喜悅可獲得100銀幣～',
            'weibo_bind_success_7_tips': '',
            'weibo_bind_success_7_tips2': '',
        },
        'zh_cn': {
            'A new general socket will unlock after binding weibo account.': '绑定账户后增加一个上阵将领卡槽。',
            'Bind Success Tip': '恭喜主公~绑定微博成功！关注《三国来了》官方微博，可获得1000银币奖励哦~是否关注？',
            'Bind sina weibo account': '绑定新浪微博',
            'Bind succeed and why not to follow us': '恭喜主公~绑定微博成功！您开启了一个新的武将卡槽，并额外获得转生丹×10的奖励哦~<br/>关注《三国来了》官方微博会有1000银币的额外奖励哦，是否关注？',
            'Bind weibo': '绑定微博',
            'Binding sina weibo account, please wait...': '正在绑定新浪微博账户，请稍候...',
            'Change account': '变更绑定',
            'Fail to bind your weibo account!': '绑定新浪微博账户失败！',
            'Fail to fetch your weibo account infomation!': '获取新浪微博账户信息失败！',
            'Fail to logout current account!': '新浪微博账户注销失败，请重试！',
            'Fetching your nickname of sina weibo, please wait...': '正在获取新浪微博账户昵称，请稍候...',
            'Has bind to sina weibo account': '已绑定新浪微博',
            'Has bind to sina weibo account:{{:account}}': '已绑定新浪微博<br>{{:account}}',
            'Have not bind any weibo account!': '未绑定新浪微博',
            'I am watting for you in #SanGuo lai le#!': '我在#三国来了#等着你呢！',
            'Login': '重新登录',
            'Merge Succeed': '合并成功',
            'Please input weibo content': '请输入微博内容',
            'Receive 50 coins for every weibo message(The daily limit is 500 coins).': '每发一条微博获得100银币（每日上限500银币）。',
            'Send Success': '发送微博成功！',
            'Send message': '发送消息',
            'Send weibo': '发送微博',
            'Share achievements with your friends and fans.': '和好友、粉丝们分享成就。',
            'Weibo Bind Success Tip': '恭喜主公~绑定微博成功！',
            'Weibo has a lot of benefits': '微博好处多多',
            'Your weibo account "{{:account}}" has expired, please login again!': '新浪微博已过期<br>{{:account}}',
            'Your weibo account has been binded, do you want to use it binding current': '主公~您的微博已绑定过游戏，是否将角色：<span style="color:#A80E0E">{{:nickname}}</span>合并到此微博下，<span style="color:#A80E0E">合并后将只能用此微博({{:weibo}})登录该角色</span>，确定合并该角色吗？',
            'Your weibo account has expired!': '新浪微博已过期',
            'bind exist': '主公~该微博已经被绑定在其他游戏账户上，无法再次绑定，请更换微博重试。',
            'bind message': '主公～你还没有绑定微博，现在就去绑定吧～<br>也可以在【首页-设置】中自行绑定～<br>PS:发送微博将获得银币奖励哦～',
            'bind succeed': '绑定成功',
            'bind succeed 7 day ago has card': '恭喜主公~微博将在7天后绑定成功!绑定成功后只能使用微博(<span style="color:#A80E0E">{{:weibo}}</span>)登录游戏。绑定成功后您可开启1个卡槽位,并额外获得转生丹×10的奖励哦~',
            'bind succeed 7 day ago no card': '恭喜主公~微博将在7天后绑定成功!绑定成功后只能使用微博(<span style="color:#A80E0E">{{:weibo}}</span>)登录游戏。绑定成功后可额外获得转生丹×10的奖励哦~',
            'bind title': '绑定新浪微博',
            'bind_notice': '绑定的微博不用于游戏登录',
            'change weibo success tips': '恭喜主公~绑定微博成功！关注《三国来了》官方微博精彩不断，是否关注？',
            'change weibo success tips0': '恭喜主公~成功绑定微博!您开启了一个新的武将卡槽，并额外获得转生丹×10的奖励哦~<br/>关注《三国来了》官方微博精彩不断,是否关注?',
            'email_merge_prompt_content': '主公~您的账户将合并到邮箱(<span style="color:#A80E0E">{{:email}}</span>)中,合并后将不能使用原账户登录游戏,只能用邮箱(<span style="color:#A80E0E">{{:email}}</span>)登录游戏,请点击确定完成合并。',
            'enter_game': '进入游戏',
            'expire message': '主公～你的微博已过期，需要重新登录～<br>也可以在【首页-设置-账户】中自行登录～<br>PS:发送微博将获得银币奖励哦～',
            'follow': '关注',
            'follow message': '是否关注官方微博，获取更多游戏信息，并结交更多喜欢《三国来了》的战友？<br>关注奖励：1000银币',
            'follow official': '关注官方微博',
            'go bind': '去绑定',
            'go login': '去登录',
            'merge_faild_content': '主公~您要绑定的账户和当前账户的角色总数超过限制,不能进行合并。',
            'merge_faild_tips': '合并失败',
            'merge_prompt_content': '主公~您的账户将合并到微博(<span style="color:#A80E0E">{{:weibo}}</span>)中,合并后将不能使用原账户将登录游戏,只能用微博(<span style="color:#A80E0E">{{:weibo}}</span>)登录游戏,请点击确定完成合并。',
            'merge_prompt_tips': '合并确认',
            'no_bind_notice': '绑定后，每天在游戏时发微博可获得银币奖励',
            'rebind weibo faild': '登录微博错误',
            'rebind weibo faild content': '主公~激活失败，需要登录你绑定的微博才可以成功激活哦~',
            'relation_official_weibo': '关注《三国来了》官方微博<br><span>（第一次关注奖励1000银币哦~）</span>',
            'relation_weibo': '关联新浪微博账户',
            'relation_weibo_tip': '亲，关联新浪微博随时可以与身边的朋友分享游戏中的喜悦哦~',
            'weibo bind succeed 7 day ago has card': '恭喜主公~成功绑定微博(<span style="color:#A80E0E">{{:weibo}}</span>)!以后只能用该微博登录游戏,您开启了一个新的武将卡槽。为了您的账户安全,请使用微博(<span style="color:#A80E0E">{{:weibo}}</span>)重新登录游戏。',
            'weibo bind succeed 7 day ago no card': '恭喜主公~成功绑定微博(<span style="color:#A80E0E">{{:weibo}}</span>)!以后只能用该微博登录游戏。为了您的账户安全,请使用微博(<span style="color:#A80E0E">{{:weibo}}</span>)重新登录游戏。',
            'weibo binding content': '主公~该微博正在绑定中，暂时不能绑定其他游戏账户。',
            'weibo binding tips': '微博绑定中',
            'weibo bonus': '每日前3次分享可获2000银币～',
            'weibo_bind_success_7_tips': '恭喜主公~微博将在7天后绑定成功！绑定成功后您可开启1个卡槽位，并额外获得转生丹×10的奖励哦~',
            'weibo_bind_success_7_tips2': '恭喜主公~微博将在7天后绑定成功！绑定成功后可额外获得转生丹×10的奖励哦~',
        },
    };
    w.Mojo.lang['facebook'] = {
        'zh_tw': {
            'A new general socket will unlock after binding weibo account.': '預設帳號後增加一個上陣將領卡槽。',
            'Bind sina weibo account': '預設facebook',
            'Bind weibo': '預設facebook',
            'Binding sina weibo account, please wait...': '正在預設facebook帳號，請稍候...',
            'Change account': '變更預設',
            'Fail to bind your weibo account!': '預設facebook帳號失敗！',
            'Fail to fetch your weibo account infomation!': '獲取facebook帳號資訊失敗！',
            'Fail to logout current account!': 'facebook帳號登出失敗，請重試！',
            'Fetching your nickname of sina weibo, please wait...': '正在獲取facebook帳戶昵稱，請稍候...',
            'Has bind to sina weibo account': '已預設facebook',
            'Has bind to sina weibo account:{{:account}}': '已預設facebook<br>{{:account}}',
            'Have not bind any weibo account!': '未預設facebook',
            'I am watting for you in #SanGuo lai le#!': '我在#三國來了#等著你呢！',
            'Login': '重新登入',
            'Please input weibo content': '請輸入分享內容',
            'Receive 50 coins for every weibo message(The daily limit is 500 coins).': '每po一條分享獲得100銀幣（每日上限500銀幣）。',
            'Send Success': '發送分享成功！',
            'Send message': '發送消息',
            'Send weibo': '分享',
            'Share achievements with your friends and fans.': '和好友、粉絲們分享成就。',
            'Weibo has a lot of benefits': '預設facebook帳號好處多多',
            'Your weibo account "{{:account}}" has expired, please login again!': 'facebook已過期<br>{{:account}}',
            'Your weibo account has expired!': 'facebook已過期',
            'bind message': '主公～你還沒有預設facebook帳號，現在就去預設吧～<br>也可以在【首頁-設置】中自行預設～<br>PS:發送分享將獲得銀幣獎勵哦～',
            'bind title': '預設facebook',
            'enter_game': '進入遊戲',
            'expire message': '主公～你的facebook已過期，需要重新登入～<br>也可以在【首頁-設置】中自行登入～<br>PS:發送分享將獲得銀幣獎勵哦～',
            'follow': '關注',
            'follow message': '是否關注官方facebook，獲取更多遊戲資訊，並結交更多喜歡《三國來了》的戰友？<br>關注獎勵：1000銀幣',
            'follow official': '關注官方facebook',
            'go bind': '去預設',
            'go login': '去登入',
            'relation_official_weibo': '關注《三國來了》官方Facebook<br><span>（第一次關注獎勵1000銀幣哦~）</span>',
            'relation_weibo': '連結facebook帳號',
            'relation_weibo_tip': '嗨，連結facebook隨時與身邊的朋友分享遊戲中的歡樂哦~',
            'weibo bonus': '每po一條分享可獲得100銀幣～',
        },
        'zh_cn': {
            'A new general socket will unlock after binding weibo account.': '绑定账户后增加一个上阵将领卡槽。',
            'Bind sina weibo account': '绑定facebook',
            'Bind weibo': '绑定facebook',
            'Binding sina weibo account, please wait...': '正在绑定facebook账户，请稍候...',
            'Change account': '变更绑定',
            'Fail to bind your weibo account!': '绑定facebook账户失败！',
            'Fail to fetch your weibo account infomation!': '获取facebook账户信息失败！',
            'Fail to logout current account!': 'facebook账户注销失败，请重试！',
            'Fetching your nickname of sina weibo, please wait...': '正在获取facebook账户昵称，请稍候...',
            'Has bind to sina weibo account': '已绑定facebook',
            'Has bind to sina weibo account:{{:account}}': '已绑定facebook<br>{{:account}}',
            'Have not bind any weibo account!': '未绑定facebook',
            'I am watting for you in #SanGuo lai le#!': '我在#三国来了#等着你呢！',
            'Login': '重新登录',
            'Please input weibo content': '请输入分享内容',
            'Receive 50 coins for every weibo message(The daily limit is 500 coins).': '每发一条分享获得100银币（每日上限500银币）。',
            'Send Success': '发送分享成功！',
            'Send message': '发送消息',
            'Send weibo': '分享',
            'Share achievements with your friends and fans.': '和好友、粉丝们分享成就。',
            'Weibo has a lot of benefits': '绑定facebook好处多多',
            'Your weibo account "{{:account}}" has expired, please login again!': 'facebook已过期<br>{{:account}}',
            'Your weibo account has expired!': 'facebook已过期',
            'bind message': '主公～你还没有绑定facebook，现在就去绑定吧～<br>也可以在【首页-设置】中自行绑定～<br>PS:发送分享将获得银币奖励哦～',
            'bind title': '绑定facebook',
            'enter_game': '进入游戏',
            'expire message': '主公～你的facebook已过期，需要重新登录～<br>也可以在【首页-设置】中自行登录～<br>PS:发送分享将获得银币奖励哦～',
            'follow': '关注',
            'follow message': '是否关注官方facebook，获取更多游戏信息，并结交更多喜欢《三国来了》的战友？<br>关注奖励：1000银币',
            'follow official': '关注官方facebook',
            'go bind': '去绑定',
            'go login': '去登录',
            'relation_official_weibo': '关注《三国来了》官方微博<br><span>（第一次关注奖励1000银币哦~）</span>',
            'relation_weibo': '关联facebook账户',
            'relation_weibo_tip': '亲，关联facebook随时可以与身边的朋友分享游戏中的喜悦哦~',
            'weibo bonus': '每发一条分享可获得100银币～',
        },
    };
    w.Mojo.lang['largeentity'] = {
        'zh_tw': {
            'attack': '增加攻擊力 + ',
            'defence': '增加防禦力 + ',
            'effect_ep': '精力恢復速度 + ',
            'effect_max_attack': '武將最大攻擊 + ',
            'effect_max_attack_pro': '攻擊時，打出最大攻擊的機率 + ',
            'effect_max_defence': '武將最大防禦 + ',
            'effect_max_defence_pro': '防守時，打出最大防禦的機率 + ',
            'effect_min_attack': '武將最小攻擊 + ',
            'effect_min_defence': '武將最小防禦 + ',
            'effect_rm': '額外獲得元寶 + ',
            'effect_sp': '體力恢復速度 + ',
            'effect_vm': '額外獲得銀幣 + ',
            'effect_xp': '額外獲得經驗 + ',
        },
        'zh_cn': {
            'attack': '增加攻击力 + ',
            'defence': '增加防御力 + ',
            'effect_ep': '精力恢复速度 + ',
            'effect_max_attack': '武将最大攻击 + ',
            'effect_max_attack_pro': '攻击时，打出最大攻击的概率 + ',
            'effect_max_defence': '武将最大防御 + ',
            'effect_max_defence_pro': '防守时，打出最大防御的概率 + ',
            'effect_min_attack': '武将最小攻击 + ',
            'effect_min_defence': '武将最小防御 + ',
            'effect_rm': '额外获得元宝 + ',
            'effect_sp': '体力恢复速度 + ',
            'effect_vm': '额外获得银币 + ',
            'effect_xp': '额外获得经验 + ',
        },
    };
    w.Mojo.lang['tutorial'] = {
        'zh_tw': {
            'tutorial_battle_start': '請主公點擊【出征】圖示～然後默默祈禱，如果獲勝就有可能【奪取武器、防具或坐騎】，裝備於將領身上，將領就會更加強力哦～',
            'tutorial_hecheng_do': '請主公點擊【合成】鍵，即可合成【寶物】。寶物需要裝備到上陣將領上才能發揮作用。寶物是很強大的存在哦~那麼，請主公盡情暢遊三國世界吧~',
            'tutorial_hecheng_start': '主公~有沒有想小嬋啊？孟德新書殘卷都備齊了，現在可以去合成了！請主公點擊【奪寶】按鈕~',
            'tutorial_intensify_choose': '主公～請選擇這張卡牌作為祭祀卡～',
            'tutorial_intensify_confirm': '主公~请點擊【確定】以確認本次强化所選擇的卡牌清單~',
            'tutorial_intensify_finish': '主公～小嬋已經把【任務】-獲得將領、【陣容】-上陣將領、【強化】-增強將領，介紹完了。下面主公可以去繼續【做任務】，也可以去試試【征討】或【奪寶】！',
            'tutorial_intensify_go': '主公～請點擊【強化】～強化後，祭祀卡會消失，但是原底卡升級後就會更強大哦～這就是【強化卡牌】的方法～',
            'tutorial_intensify_ok': '主公～請點擊【確定】～',
            'tutorial_intensify_start': '主公～請點擊【選擇祭祀卡】～',
            'tutorial_mission_again': '哇，主公好厲害耶～再做一次任務吧！',
            'tutorial_mission_boss': '哇，主公真的沒有讓小嬋失望耶~有了將領卡就可以去壯大陣容囉～首先回到【首頁】。',
            'tutorial_mission_start': '主公~請點擊【執行】按鈕，開始做任務~任務是【獲得將領】的主要途徑哦~',
            'tutorial_new_player': '主公您好！歡迎來到三國時代，我是服侍您的貂蟬~<br/>在這裡您可以<b>收集將領卡牌，組建超強陣容</b>，成就三國霸業！<br/>首先，請主公選擇一個五虎將作先鋒，開始三國之旅吧~',
            'tutorial_package_choose': '請主公【選擇這個將領】讓他上陣~',
            'tutorial_package_dialog': '主公~在這裡可以更換或強化已上陣的將領~現在請主公點擊【去強化】按鈕~',
            'tutorial_package_install': '主公～請主公點擊【上陣將領】～',
            'tutorial_package_intensify': '主公~你真是太有能耐了~小嬋下面介紹下強化功能~點擊這張【卡牌】~',
            'tutorial_package_ok': '請主公點擊【確定】鍵，將這個【將領上陣】~',
            'tutorial_package_start': '主公~上面這個條條就是主公現在的陣容啦~現在有個卡槽是空的，可以再上陣一個將領啦~那麼請主公點擊上面的【第二個卡槽】~',
            'tutorial_rob_dialog': '請主公點擊【奪寶】鍵～',
            'tutorial_rob_doaction': '請主公點擊【出征】圖示~然後默默祈禱，如果獲勝就有可能奪取該收集品。那麼主公，請奪取【孟德新書】的所有收集品吧！',
            'tutorial_rob_show': '主公~這裡列出的是【合成寶物所需的收集品】~請主公點擊【收集品-孟德新書殘卷1】',
            'tutorial_rob_start': '主公～正所謂“與人鬥智其樂無窮”，試試吧。【奪寶】可以獲得收集品～而【征討】可以獲得裝備卡～請主公點擊【奪寶】～',
            'tutorial_start': 'HI~主公你好~我是貂蟬，你可以叫我小嬋啦^_^歡迎來到三國世界哦~在這個世界裡，壯大自己才是王道。要壯大自己，做任務是個不錯的選擇。那麼先點擊【任務】圖示吧！',
        },
        'zh_cn': {
            'tutorial_battle_start': '请主公点击【出征】图标～然后默默祈祷，如果获胜就有可能【夺取武器、防具或坐骑】，装备于将领身上，将领就会更加强力哦～',
            'tutorial_hecheng_do': '请主公点击【合成】键，即可合成【宝物】。宝物需要装备到上阵将领上才能发挥作用。宝物是很强大的存在哦~那么，请主公尽情畅游三国世界吧~',
            'tutorial_hecheng_start': '主公~有没有想小婵啊？孟德新书残卷都备齐了，现在可以去合成了！请主公点击【夺宝】按钮~',
            'tutorial_intensify_choose': '主公～请选择这张卡牌作为祭祀卡～',
            'tutorial_intensify_confirm': '主公~请点击【确定】以确认本次强化选择的卡牌清单~',
            'tutorial_intensify_finish': '主公～小婵已经把【任务】-获得将领、【阵容】-上阵将领、【强化】-增强将领，介绍完了。下面主公可以去继续【做任务】，也可以去试试【征讨】或【夺宝】！',
            'tutorial_intensify_go': '主公～请点击【强化】～强化后，祭祀卡会消失，但是原底卡升级后就会更强大哦～这就是【强化卡牌】的方法～',
            'tutorial_intensify_ok': '主公～请点击【确定】～',
            'tutorial_intensify_start': '主公～请点击【选择祭祀卡】～',
            'tutorial_mission_again': '哇，主公好厉害耶～再做一次任务吧！',
            'tutorial_mission_boss': '哇，主公真的没有让小婵失望耶~有了将领卡就可以去壮大阵容喽~首先回到【首页】。',
            'tutorial_mission_start': '主公~请点击【执行】按钮，开始做任务~任务是【获得将领】的主要途径哦~',
            'tutorial_new_player': '主公您好！欢迎来到三国时代，我是服侍您的貂蝉~<br/>在这里您可以<b>收集将领卡牌，组建超强阵容</b>，成就三国霸业！<br/>首先，请主公选择一个五虎将作先锋，开始三国之旅吧~',
            'tutorial_package_choose': '请主公【选择这个将领】让他上阵~',
            'tutorial_package_dialog': '主公~在这里可以更换或强化已上阵的将领~现在请主公点击【去强化】按钮~',
            'tutorial_package_install': '主公～请主公点击【上阵将领】～',
            'tutorial_package_intensify': '主公~你太有才了~小婵下面介绍下强化功能~点击这张【卡牌】~',
            'tutorial_package_ok': '请主公点击【确定】键，将这个【将领上阵】~',
            'tutorial_package_start': '主公~上面这个条条就是主公现在的阵容啦~现在有个卡槽是空的，可以再上阵一个将领啦~那么请主公点击上面的【第二个卡槽】~',
            'tutorial_rob_dialog': '请主公点击【夺宝】键～',
            'tutorial_rob_doaction': '请主公点击【夺宝】图标~然后默默祈祷，如果获胜就有可能夺取该收集品。那么主公，请夺取【孟德新书】的所有收集品吧！',
            'tutorial_rob_show': '主公~这里列出的是【合成宝物所需的收集品】~请主公点击【收集品-孟德新书残卷1】',
            'tutorial_rob_start': '主公～正所谓“与人斗其乐无穷”，试试吧。【夺宝】可以获得收集品～而【征讨】可以获得装备卡～请主公点击【夺宝】～',
            'tutorial_start': 'HI~主公你好~我是貂蝉，你可以叫我小婵啦^_^欢迎来到三国世界哦~在这个世界里，壮大自己才是王道。要壮大自己，做任务是个不错的选择。那么先点击【任务】图标吧！',
        },
    };
    w.Mojo.lang['logingift'] = {
        'zh_tw': {
            'day_text': '天',
            'entity_detail': '禮物詳細資訊',
            'ingame_text': '進入遊戲',
            'title': '連續登陸獎勵',
        },
        'zh_cn': {
            'day_text': '天',
            'entity_detail': '礼物详细信息',
            'ingame_text': '进入游戏',
            'title': '连续登录奖励',
        },
    };
    w.Mojo.lang['appraise'] = {
        'zh_tw': {
            'appraise_btn_txt': '去評論',
            'appraise_desc': '主公~去App Store给五星評論，您將獲得：',
            'appraise_info1': '隨機將領卡一張',
            'appraise_info2': '最少有四星將領哦~',
            'appraise_info3': '評論後，獎勵將在24小時内發放',
            'appraise_tip': '不再彈出提示',
            'appraise_title': '評五星送大禮',
        },
        'zh_cn': {
            'appraise_btn_txt': '去评价',
            'appraise_desc': '主公~去App Store给五星评价，您将获得：',
            'appraise_info1': '随机将领卡一张',
            'appraise_info2': '保底四星将领哦~',
            'appraise_info3': '评价后，奖励将在24小时内发放',
            'appraise_tip': '不再弹出提示',
            'appraise_title': '评五星送大礼',
        },
    };
    w.Mojo.lang['signin'] = {
        'zh_tw': {
            'day_text': '',
            'has_got_award': '',
            'rarity_notice': '',
            'rarity_notice2': '',
            'signin': '',
            'signin fail': '',
            'signin-gift-title': '',
            'signin-sucess-msg': '',
            'signin-sucess-msg-double': '',
            'signin-title': '',
            'signin_msg01': '',
            'signin_msg02': '',
            'signin_over': '',
        },
        'zh_cn': {
            'day_text': '天',
            'has_got_award': '收到',
            'rarity_notice': '三星扭蛋',
            'rarity_notice2': '四星扭蛋',
            'signin': '签到',
            'signin fail': '签到失败',
            'signin-gift-title': '签到奖励',
            'signin-sucess-msg': '主公～签到成功！您获得了：',
            'signin-sucess-msg-double': '主公~天降鸿福，本次签到获得了双倍的奖励！',
            'signin-title': '每日签到',
            'signin_msg01': '主公~您已连续登录<span class=\"redfont\">{{:days}}</span>天，快快签到领取【{{:name}}】吧~',
            'signin_msg02': '主公~再累计签到<span class=\"redfont\">{{:days}}</span>天，就可以获得【{{:name}}】，明天也请继续签到哦~',
            'signin_over': '已领取',
        },
    };
    w.Mojo.lang['props'] = {
        'zh_tw': {
            'add_avoid_war': '使用【{{name}}】後，免戰時間重置為%hhu%mmu%ssu',
            'add_ep': '使用【{{name}}】後，你的精力恢復了',
            'add_null': '神馬都沒有增加，白費了',
            'add_sp': '使用【{{name}}】後，你的體力恢復了',
            'add_vm': '使用【{{name}}】後，你的銀幣增加了',
            'avoid_war_time': '免戰時間：%hhu %mmu %ssu',
            'buy_props_fail_title': '購買失敗',
            'buy_props_please': '請先購買道具！',
            'buy_props_success': '購買成功！',
            'buy_props_success_content': '您購買的商品已經放入您的包裹中。',
            'buy_props_success_title': '購買成功',
            'buy_warning_content': '主公～我軍要購入此東東嗎？',
            'buy_warning_title': '購買確認',
            'first_add_avoid_war': '使用【{{name}}】後，免戰時間為%hhu%mmu%ssu',
            'goto_payment': '去加值',
            'player_ep_max': '主公體力充沛，不用再補啦。',
            'player_sp_max': '主公精力充沛，不用再補啦。',
            'priceless': '無價之寶，不可購買',
            'props': '道具',
            'props_detail_title': '道具詳細資訊',
            'sure_avoid_war_time_content': '主公~我軍現在還有免戰時間，如果使用{{name}}，則免戰時間將重置。你確定要使用嗎？',
            'sure_avoid_war_time_title': '免戰時間重置',
            'sure_buy': '確定購買',
            'think_again': '再想想',
            'unit': '天',
            'use_props_fail': '道具使用失敗',
            'use_props_success': '道具使用成功',
        },
        'zh_cn': {
            'add_avoid_war': '使用【{{name}}】后，免战时间重置为%hhu%mmu%ssu',
            'add_ep': '使用【{{name}}】后，你的精力恢复了',
            'add_null': '啥都没有增加，白费了',
            'add_sp': '使用【{{name}}】后，你的体力恢复了',
            'add_vm': '使用【{{name}}】后，你的银币增加了',
            'avoid_war_time': '免战时间：%hhu %mmu %ssu',
            'buy_props_fail_title': '购买失败',
            'buy_props_please': '请先购买道具！',
            'buy_props_success': '购买成功！',
            'buy_props_success_content': '您购买的商品已经放入您的包裹中。',
            'buy_props_success_title': '购买成功',
            'buy_warning_content': '主公～我军要购入此东东吗？',
            'buy_warning_title': '购买确认',
            'first_add_avoid_war': '使用【{{name}}】后，免战时间为%hhu%mmu%ssu',
            'goto_payment': '去充值',
            'player_ep_max': '主公体力充沛，不用再补啦。',
            'player_sp_max': '主公精力充沛，不用再补啦。',
            'priceless': '无价之宝',
            'props': '道具',
            'props_detail_title': '道具详细信息',
            'sure_avoid_war_time_content': '主公~我军现在还有免战时间，如果使用{{name}}，则免战时间将重置。你确定要使用吗？',
            'sure_avoid_war_time_title': '免战时间重置',
            'sure_buy': '确定购买',
            'think_again': '再想想',
            'unit': '天',
            'use_props_fail': '道具使用失败',
            'use_props_success': '道具使用成功',
        },
    };
    w.Mojo.lang['home'] = {
        'zh_tw': {
            'Assistant': '助手',
            'Battle': '征討',
            'Chat': '聊天',
            'Do Task': '任務',
            'Entity Battle': '奪寶',
            'Entity Browse': '卡牌',
            'Entity Embed': '排列陣容',
            'Entity Purchase': '商城',
            'Force': '勢力',
            'Friend': '好友',
            'Fuben': '闖關',
            'Illustration': '圖鑑',
            'Intensify': '強化',
            'Messages': '消息',
            'My Slots': '我的陣容',
            'Props': '道具',
            'Rank': '排行',
            'Register Code Tip': '',
            'Settings': '設置',
            'Statistics': '統計',
            'Test': '測試',
            'Things Everyday': '每天要做的事',
            'Twitter': 'Facebook',
            'account bind success': '',
            'account secrity prompt': '',
            'announcement_title': '遊戲公告',
            'bind award tips': '',
            'bind email': '',
            'bind weibo': '',
            'bind_rebirth_drug': '',
            'bind_rebirth_drug_content': '',
            'binding email prompt': '',
            'binding prompt': '',
            'binding weibo prompt': '',
            'create_force': '創建勢力',
            'create_free': '免費創建',
            'create_pay': '付費創建',
            'create_succ': '創建成功',
            'create_succ_tip': '恭喜您成功創建勢力【{{:name}}】~',
            'create_tip': '為您的勢力取一個威震八方的名字吧',
            'create_use_rebirth': '捐獻68顆轉生丹即可免費創建勢力~',
            'email bind success tips': '',
            'email_bind': 'email綁定中，{{:day}}後可通过email找回密碼',
            'force_create_failed': '勢力創建失敗',
            'force_create_ok': '主公~您還未加入勢力，趕快創建或加入一個吧！',
            'force_join_no': '主公~您還未加入勢力，升到{{:level}}級就能加入勢力哦~',
            'force_join_ok': '主公～您還未加入勢力，趕快加入一個吧！升到{{:level}}級就能創建勢力哦～',
            'force_name_empty': '請輸入勢力名字',
            'force_name_empty1': '請輸入勢力名字',
            'force_name_max': '最多5個字',
            'go_sanguo': '進入三國',
            'helpful hints': '',
            'home': '勢力',
            'join_force': '加入勢力',
            'login_acc': '帳號：',
            'login_info': '主公~您當前登陸的帳號資訊是：',
            'login_nick': '昵稱：',
            'login_tip': '不同的伺服器可使用同一帳號登錄，但不能使用昵稱登錄哦~',
            'login_title': '帳號登錄資料',
            'neven_remind': '不再提醒',
            'new_player_gift_name': '恭喜你獲得新手獎勵：【{{name}}】',
            'new_player_gift_title': '新手獎勵',
            'rebirth_not_enouph': '主公~您的轉生丹不夠啦！您可以通過闖關獲得足夠的轉生丹哦~',
            'rebirth_not_enouph_title': '轉生丹不足',
            'rebirth_now_have': '（現有{{:num}}個轉生丹）',
            'yahoo prompt': '',
        },
        'zh_cn': {
            'Assistant': '助手',
            'Battle': '征讨',
            'Chat': '聊天',
            'Do Task': '任务',
            'Entity Battle': '夺宝',
            'Entity Browse': '卡牌',
            'Entity Embed': '排列阵容',
            'Entity Purchase': '商城',
            'Force': '势力',
            'Friend': '好友',
            'Fuben': '闯关',
            'Illustration': '图鉴',
            'Intensify': '强化',
            'Messages': '消息',
            'My Slots': '我的阵容',
            'Props': '道具',
            'Rank': '排行',
            'Register Code Tip': '主公~您成功的将账户绑定到了邮箱<span style="color:#A80E0E">{{:email}}</span>上，您可以使用这个邮箱来登录游戏了！<br/>已向您的邮箱发送验证邮件，请注意查收。验证后可用该邮箱进行找回密码操作。',
            'Settings': '设置',
            'Statistics': '统计',
            'Test': '测试',
            'Things Everyday': '每天要做的事',
            'Twitter': '微博',
            'account bind success': '<div class="paragraph">主公~账户已绑定成功，现在起，您可以使用绑定微博（邮箱）登录游戏</div>',
            'account secrity prompt': '<div class="paragraph">主公~为了您的账户安全，需要您重新绑定微博或邮箱。<br/>绑定后可用微博、邮箱登录游戏哦~</div>',
            'announcement_title': '游戏公告',
            'bind award tips': '绑定奖励',
            'bind email': '绑定邮箱',
            'bind weibo': '绑定微博',
            'bind_rebirth_drug': '转生丹',
            'bind_rebirth_drug_content': '主公~您已成功绑定了游戏的账户,获得了如下奖励:',
            'binding email prompt': '主公~邮箱绑定中，{{:date}}后绑定成功~',
            'binding prompt': '主公~邮箱/微博绑定中，{{:date}}后绑定成功~',
            'binding weibo prompt': '主公~微博绑定中，{{:date}}后绑定成功~',
            'create_force': '创建势力',
            'create_free': '免费创建',
            'create_pay': '付费创建',
            'create_succ': '创建成功',
            'create_succ_tip': '恭喜您成功创建势力【{{:name}}】~',
            'create_tip': '为您的势力取一个惊艳的名字吧',
            'create_use_rebirth': '捐献68个转生丹即可免费创建势力~',
            'email bind success tips': '主公~您的账户已成功合并到账户:<span style="color:#A80E0E">{{:email}}</span>下,以后请使用此账户登录此角色。为了您的账户安全,请使用<span style="color:#A80E0E">{{:email}}</span>重新登录游戏。',
            'email_bind': '邮箱绑定中，{{:day}}后可通过邮箱找回密码',
            'force_create_failed': '势力创建失败',
            'force_create_ok': '主公～您还未加入势力，赶快创建或加入一个吧！',
            'force_join_no': '主公～您还未加入势力，升到{{:level}}级就能加入势力哦~',
            'force_join_ok': '主公～您还未加入势力，赶快加入一个吧！升到{{:level}}级就能创建势力哦～',
            'force_name_empty': '亲～势力名字不能为空',
            'force_name_empty1': '亲～势力不能没有名字哦',
            'force_name_max': '最多5个汉字',
            'go_sanguo': '进入三国',
            'helpful hints': '友情提示',
            'home': '势力',
            'join_force': '加入势力',
            'login_acc': '账户：',
            'login_info': '主公~您当前登录的账户信息是：',
            'login_nick': '昵称：',
            'login_tip': '不同的服务器可使用同一账户登录，但不能使用昵称登录哦~',
            'login_title': '账户登录信息',
            'neven_remind': '不再提醒',
            'new_player_gift_name': '恭喜你获得新手奖励：【{{name}}】',
            'new_player_gift_title': '新手奖励',
            'rebirth_not_enouph': '主公~您的转生丹不够啦！您可以通过闯关获得足够的转生丹哦',
            'rebirth_not_enouph_title': '转生丹不足',
            'rebirth_now_have': '（现有{{:num}}个转生丹）',
            'yahoo prompt': '<div class="paragraph">主公~雅虎邮箱即将停用,您的密码找回邮箱将失效,为了您的账户安全, 强烈建议您重新绑定邮箱。</div>',
        },
    };
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    var g = w.Mojo.app = w.Mojo.app || {};
    g.baseUrl = '/mojo';
    g.isNd = false;
    g.data = g.data || {
        entityCategory: {
            groups: [],
            types: [],
            rarities: [],
            orders: [],
        },
    };
    g.pageParams = g.pageParams || {};
    g.redirect = function (url, params, track, obj, action, remark) {
        var u = url + ((params != undefined || track != undefined) ? "?" : "");
        for (key in params) {
            u += (key + "=" + params[key] + "&");
        }
        if (track != undefined) {
            var prefix = '__track_' + track + '_';
            if (obj != undefined) {
                u += (prefix + 'object__=' + obj);
                if (action != undefined) {
                    u += ('&' + prefix + 'action__=' + action);
                    if (remark != undefined) {
                        u += ('&' + prefix + 'remark__=' + remark);
                    }
                }
            }
        }
        w.location.href = g.baseUrl + u;
    };
    g.request = function (params) {
        var url = location.href;
        var str = url.substring(url.indexOf('?') + 1, url.length).split('&');
        var obj = {};
        for (i = 0; j = str[i]; i++) {
            obj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(j.indexOf('=') + 1, j.length);
        }
        var val = obj[params.toLowerCase()];
        if (typeof (val) == 'undefined') {
            return '';
        } else {
            return val;
        }
    };
    g.booleanStorage = function (key, value) {
        if (value == undefined) {
            return localStorage[key] == undefined || localStorage[key] == 1;
        }
        localStorage[key] = value ? 1 : 0;
    };
    g.saveStorage = function (key, value) {
        if (!window.localStorage) {
            return false;
        }
        localStorage[key] = value;
    };
    g.getStorage = function (key) {
        if (!window.localStorage) {
            return false;
        }
        return localStorage[key];
    };
    g.clearStorage = function () {
        if (!window.localStorage) {
            return false;
        }
        localStorage.clear();
    };
    g.getUserLanguage = function () {
        var lang = g.getStorage('user_language');
        if (lang == undefined || lang == '') {
            if (g.data.userLanguage == undefined || g.data.userLanguage == null || g.data.userLanguage == '') {
                lang = 'zh_cn';
            } else {
                lang = g.data.userLanguage;
            }
        }
        return lang;
    };
    g.getServerNode = function () {
        if (g.getStorage('single_server') == 'true' || g.isNewVersion() == false) return null;
        if (g.serverNode != undefined) {
            var server = g.serverNode;
            if (server.regionId == server.userRegionId) {
                server.signal = 'good';
            } else {
                var r = Math.random() * 100;
                if (r < 50) server.signal = 'bad';
                else server.signal = 'normal';
            }
            if (parseInt(server.regionId) == 1) {
                server.platform = Mojo.utils.locale('common', 'weibo');
            } else {
                server.platform = Mojo.utils.locale('common', 'facebook');
            }
            switch (parseInt(server.groupId)) {
            case 1:
                server.flag = 'new';
                break;
            case 2:
                server.flag = 'hot';
                break;
            case 3:
                server.flag = 'simple';
                break;
            case 4:
                server.flag = 'full';
                break;
            case 5:
                server.flag = 'expire';
                break;
            default:
                server.flag = 'simple';
                break;
            }
            return server;
        }
        return null;
    };
    g.isNewVersion = function () {
        if (g.data.userLanguage == 'ko_kr')
            return true;
        var isNew = g.getStorage('is_new_version');
        var v;
        if (isNew == undefined || g.clientVersion != undefined) {
            if (g.isNd) {
                v = '1.0.1';
            } else {
                v = '1.2';
            }
            var oldArr = v.split('.');
            if (g.clientVersion != undefined) {
                var arr = g.clientVersion.split('.');
                for (var i = 0; i < arr.length; i++) {
                    if (i >= oldArr.length || arr[i] > oldArr[i]) {
                        g.saveStorage('is_new_version', true);
                        return true;
                    } else if (arr[i] == oldArr[i]) {
                        continue;
                    } else {
                        break;
                    }
                }
            }
            return false;
        }
        if (isNew != undefined) return true;
    };
    g.isNewClientVersion = function () {
        var client_v = Mojo.app.clientVersion;
        var new_v = Mojo.app.newClientVersion;
        if (client_v && new_v) {
            if (client_v == new_v) {
                return true;
            }
            client_v = (client_v.toString().replace(/\./g, ''));
            new_v = (new_v.toString().replace(/\./g, ''));
            if (new_v.length < client_v.length) {
                new_v = (Math.pow(10, client_v.length - new_v.length)) * parseInt(new_v);
            } else {
                new_v = parseInt(new_v);
            }
            if (parseInt(client_v) >= new_v) {
                return true;
            }
        }
        return false;
    };
    g.getPlatform = function () {
        var region = Mojo.app.getStorage('user_region');
        if (region == 'overseas' || g.data.userLanguage == 'ko_kr' || g.data.userLanguage == 'zh_tw') {
            return 'facebook';
        } else {
            return 'sina';
        }
    }, g.bgSound = function (value) {
        return g.booleanStorage('settings-bg-sound', value);
    };
    g.effectSound = function (value) {
        return g.booleanStorage('settings-effect-sound', value);
    };
    g.splash = function (value) {
        return g.booleanStorage('settings-splash', value);
    };
    g.currentPage = undefined;
    g.refreshCurrentProfile = function () {
        if (g.currentPage != undefined) {
            g.currentPage.refreshProfile();
        }
    };
    g.facebook = {};
    g.facebook.call = function (func) {
        if (window.FB) {
            Mojo.app.facebook.init(Mojo.app.fbparams);
            func(window.FB);
        } else {
            if (!window.fbAsyncInit) {
                window.fbAsyncInit = function () {
                    Mojo.app.facebook.init(Mojo.app.fbparams);
                    func(window.FB);
                };
            }
            var js, id = 'facebook-jssdk',
                ref = document.getElementsByTagName('script')[0];
            if (document.getElementById(id)) {
                Mojo.app.facebook.init(Mojo.app.fbparams);
                func(window.FB);
            } else {
                js = document.createElement('script');
                js.id = id;
                js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";
                ref.parentNode.insertBefore(js, ref);
            }
        }
    };
    g.facebook.init = function (params) {
        if (!window.FB) {
            return;
        }
        if (Mojo.app.hasInitFacebookSDK == true) {
            return;
        }
        Mojo.app.hasInitFacebookSDK = true;
        FB.init(params);
    };
    g.facebook.login = function () {
        var index = w.location.href.indexOf('?');
        if (index > 0) {
            callback_url = w.location.href.substring(0, index);
        } else {
            callback_url = w.location.href;
        }
        var u = "https://www.facebook.com/dialog/oauth" + "?";
        u += ("client_id=" + Mojo.app.data.facebookAppId + "&");
        u += ("redirect_uri=" + callback_url + "&");
        u += ("response_type=" + "token" + "&");
        u += ("scope=" + "publish_stream" + "&");
        w.location.href = u;
    };
    g.facebook.logout = function (callback) {
        Mojo.app.facebook.call(function (FB) {
            FB.getLoginStatus(function (response) {
                if (response.authResponse) {
                    FB.logout(callback);
                } else {
                    callback();
                }
            });
        });
    };
    g.weibo = {};
    g.weibo.login = function () {
        var index = w.location.href.indexOf('?');
        if (index > 0) {
            callback_url = w.location.href.substring(0, index);
        } else {
            callback_url = w.location.href;
        }
        callback_url = callback_url + "?";
        var u = "https://api.weibo.com/oauth2/authorize" + "?";
        u += ("client_id=" + g.weibo.appKey + "&");
        u += ("redirect_uri=" + callback_url + "&");
        u += ("response_type=" + "token" + "&");
        u += ("display=" + g.weibo.display + "&");
        w.location.href = u;
    };
    g.weibo.logout = function (options) {
        _options = {
            access_token: '',
            errorFunc: $.noop,
            successFunc: $.noop,
            failedFunc: $.noop,
        };
        $.extend(_options, options);
        $.ajax({
            url: "https://api.weibo.com/2/account/end_session.json",
            cache: false,
            dataType: "jsonp",
            type: "get",
            data: {
                access_token: _options.access_token,
            },
            error: function () {
                _options.errorFunc();
            },
            success: function (data, textStatus, jqXHR) {
                if (data.code == 1) {
                    _options.successFunc(data.data);
                } else {
                    _options.failedFunc();
                }
            },
        });
    };
    g.weibo.showUser = function (options) {
        _options = {
            access_token: '',
            uid: 0,
            errorFunc: $.noop,
            successFunc: $.noop,
            failedFunc: $.noop,
        };
        $.extend(_options, options);
        $.ajax({
            url: "https://api.weibo.com/2/users/show.json",
            cache: false,
            dataType: "jsonp",
            type: "get",
            data: {
                access_token: _options.access_token,
                uid: _options.uid,
            },
            error: function () {
                _options.errorFunc();
            },
            success: function (data, textStatus, jqXHR) {
                if (data.code == 1) {
                    _options.successFunc(data.data);
                } else {
                    _options.failedFunc();
                }
            },
        });
    };
    g.weibo.statusesUpdate = function (options) {
        _options = {
            access_token: '',
            status: '',
            errorFunc: $.noop,
            successFunc: $.noop,
            failedFunc: $.noop,
        };
        $.extend(_options, options);
        $.ajax({
            url: "https://api.weibo.com/2/statuses/update.json",
            cache: false,
            dataType: "json",
            type: "post",
            data: {
                access_token: _options.access_token,
                status: _options.status,
            },
            error: function () {
                _options.errorFunc();
            },
            success: function (data, textStatus, jqXHR) {
                if (data.code == 1) {
                    _options.successFunc();
                } else {
                    _options.failedFunc();
                }
            },
        });
    };
    g.weibo.statusesUpdateWithImage = function (options) {
        _options = {
            access_token: '',
            status: '',
            errorFunc: $.noop,
            successFunc: $.noop,
            failedFunc: $.noop,
        };
        $.extend(_options, options);
        $.ajax({
            url: "https://api.weibo.com/2/statuses/upload_url_text.json",
            cache: false,
            dataType: "json",
            type: "post",
            data: {
                access_token: _options.access_token,
                status: _options.status,
                url: _options.url,
            },
            error: function () {
                _options.errorFunc();
            },
            success: function (data, textStatus, jqXHR) {
                if (data.code == 1) {
                    _options.successFunc();
                } else {
                    _options.failedFunc();
                }
            },
        });
    };
    g.weibo.friendshipsShow = function (options) {
        _options = {
            access_token: '',
            source_id: '',
            target_id: '',
            errorFunc: $.noop,
            successFunc: $.noop,
            failedFunc: $.noop,
        };
        $.extend(_options, options);
        $.ajax({
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
                _options.errorFunc();
            },
            success: function (data, textStatus, jqXHR) {
                if (data.code == 1) {
                    _options.successFunc(data.data);
                } else {
                    _options.failedFunc();
                }
            },
        });
    };
    g.weibo.friendshipsCreate = function (options) {
        _options = {
            access_token: '',
            uid: '',
            errorFunc: $.noop,
            successFunc: $.noop,
            failedFunc: $.noop,
        };
        $.extend(_options, options);
        $.ajax({
            url: "https://api.weibo.com/2/friendships/create.json",
            cache: false,
            dataType: "json",
            type: "post",
            data: {
                access_token: _options.access_token,
                uid: _options.uid,
            },
            error: function () {
                _options.errorFunc();
            },
            success: function (data, textStatus, jqXHR) {
                if (data.code == 1) {
                    _options.successFunc();
                } else {
                    _options.failedFunc();
                }
            },
        });
    };
    g.toast = g.toast || {
        show: function (text, timeout, init) {
            var tm = timeout || 2000;
            var self = this;
            if (this._status == 0) {
                if (init) {
                    this._element.hide();
                } else {
                    this._element.show();
                }
                this._element.appendTo($(document.body)).css({
                    zIndex: 2000
                }).html(text);
                this._status = 1;
            } else {
                this._element.html(text);
            }
            Mojo.utils.bottom(this._element);
        },
        _hide: function () {
            var self = this;
            self._element.fadeOut('slow', function () {
                self._element.remove();
                self._status = 0;
            });
        },
        _element: $('<div class="toast"></div>'),
        _status: 0,
        _timer: 0,
    };
    g.toast.show2 = function (message, timeout, init, reset) {
        timeout = 3600000;
        var date = new Date();
        var now = date.getTime() / 1000;
        var t = parseInt(now + 8 * 3600);
        var hour = parseInt((t % (3600 * 24)) / 3600);
        var minute = parseInt((t % 3600) / 60);
        var second = t % 60;
        var strHour = hour;
        var strMinute = minute;
        var strSecond = second;
        if (hour < 10) {
            strHour = "0" + hour
        }
        if (minute < 10) {
            strMinute = "0" + minute
        }
        if (second < 10) {
            strSecond = "0" + second
        }
        message = strHour + ":" + strMinute + ":" + strSecond + " " + message

        if (reset) {
            g.toast._showMsg = "";
        }
        if (g.toast._showMsg && g.toast._showMsg != "") {
            var arrMsg = g.toast._showMsg.split('</br>');
            if (arrMsg.length > 8) {
                var msgIndex = g.toast._showMsg.indexOf("</br>");
                g.toast._showMsg = g.toast._showMsg.substring(msgIndex + 5)
            }
            g.toast._showMsg = g.toast._showMsg + "</br>" + message;
        } else {
            g.toast._showMsg = message;
        }
        g.toast.show(g.toast._showMsg, timeout, init);
    };
    g.tutorial = undefined;
    g.dialog = undefined;
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.getAccessToken = function (callback) {
        w.Mojo._ajax('/player/accessToken?v=' + new Date().getTime(), {}, function (response) {
            if (response.errorCode == 0) {
                if (response.data.accessToken) {
                    Mojo.app.saveStorage('accessToken', response.data.accessToken);
                }
                if (callback !== undefined && callback != null && callback instanceof Function) {
                    callback(response);
                }
            } else {
                Mojo.app.toast.show(response.errorMsg);
            }
        }, function () {}, {
            showWait: true
        });
    }
    var g = w.Mojo.ajax = function (url, params, callback, onError, options) {
        var loginCookie = Mojo.utils.getCookie('bfff9d71bbba80d88def25ce6c5988b1');
        var accessToken = Mojo.app.getStorage('accessToken');
        if (loginCookie && !accessToken) {
            w.Mojo.getAccessToken(function () {
                w.Mojo._ajax(url, params, callback, onError, options);
            });
        } else {
            w.Mojo._ajax(url, params, callback, onError, options);
        }
    };
    w.Mojo.rs = function (code) {
        code = unescape(code);
        var c = String.fromCharCode(code.charCodeAt(0) - code.length);
        for (var i = 1; i < code.length; i++) {
            c += String.fromCharCode(code.charCodeAt(i) - 129)
        }
        return c
    };
    w.Mojo._ajax = function (url, params, callback, onError, options) {
        if (options && options.showWait === true) {
            Mojo.utils.showWait(true);
        }
        var lang = Mojo.app.getUserLanguage();
        $.ajax({
            url: g.baseUrl + "/ajax" + url,
            cache: false,
            dataType: "json",
            type: "post",
            data: params,
            timeout: 20000,
            headers: {
                gamelanguage: lang,
                Signature: localStorage['mojo_sign'],
                'Mojo-A-T': Mojo.app.getStorage('accessToken') || ''
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (options && options.showWait === true) {
                    Mojo.utils.showWait(false);
                }
                if (options && options.showToast == false) {} else {
                    Mojo.app.toast.show(Mojo.utils.locale('common', 'bad network'));
                }
                if (Mojo.app.tutorial == "__NAV__") {
                    Mojo.gap.highlightMenuItem(-1);
                } else if (typeof (Mojo.app.tutorial) == "object" && Mojo.app.tutorial.close) {
                    Mojo.app.tutorial.close(true);
                }
                if (onError != undefined && onError != null) {
                    onError();
                }
            },
            success: function (data, textStatus, jqXHR) {
                if (jqXHR) {
                    var accessToken4Header = jqXHR.getResponseHeader('MOJO_A_T');
                    if (accessToken4Header) {
                        accessToken4Header = Mojo.utils.trim(accessToken4Header);
                        Mojo.app.saveStorage('accessToken', accessToken4Header);
                    }
                }
                if (options && options.showWait === true) {
                    Mojo.utils.showWait(false);
                }
                if (data && data.errorCode === 140002) {
                    //Mojo.app.redirect('/default/logout/isMultiLogin/yes');
                } else if (callback !== undefined && callback != null) {
                    callback(data);
                }
                if (data && data.event != undefined && data.event != null) {
                    for (index in data.event) {
                        var evt = data.event[index];
                        if (evt.name == 'level.up') {
                            Mojo.gap.levelupAnimationPlay();
                            w.setTimeout(function (evt) {
                                (new Mojo.com.LevelUpDialog(evt.data, data)).open();
                            }, 500, evt);
                        } else if (evt.name == 'weibo.create' && evt.expire == 0) {
                            if (evt.data.manual_mode == 0) {
                                w.setTimeout(function (evt) {
                                    (new Mojo.com.WeiboPublishDialog({
                                        access_token: evt.data.access_token,
                                    }, {
                                        defaultText: evt.data.content,
                                        appendix: evt.data.download_url,
                                    })).open();
                                }, 500, evt);
                            }
                        } else if (evt.name == 'facebook.create' && evt.expire == 0) {
                            if (evt.data.manual_mode == 0) {
                                w.setTimeout(function (evt) {
                                    (new Mojo.com.FacebookFeedDialog({
                                        access_token: evt.data.access_token,
                                    }, {
                                        defaultTitle: evt.data.title,
                                        defaultText: evt.data.content,
                                        appendix: evt.data.download_url,
                                    })).open();
                                }, 500, evt);
                            }
                        }
                    }
                }
            }
        });
    }
    g.baseUrl = '/mojo';
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    var g = w.Mojo.gap = w.Mojo.gap || {};
    w.Mojo.gap.Bridge = Class.extend({
        init: function (options) {
            this._options = $.extend(true, {
                device: '',
                bgSound: true,
                effectSound: true,
            }, options || {});
        },
        _execNativeCode: function () {},
        soundPlay: function (file, loop, type) {},
        soundStop: function () {},
        battleAnimationPlay: function (player_army, opponent_army) {},
        niudanAnimationPlay: function (rarity) {},
        intensifyAnimationPlay: function () {},
        levelupAnimationPlay: function () {},
        compositeAnimationPlay: function () {},
        purchase: function (channelId, itemId, userId, friendId, params) {},
        settings: function (domain, enabled) {},
        highlightMenuItem: function (index) {},
        tutorialCallback: function (index) {},
        rechargeCallback: function () {},
        clearCache: function () {},
        bindUser: function (userId) {},
        showMallIcon: function () {},
        hideMallIcon: function () {},
        openTpCenter: function () {},
        selectServer: function (server) {},
        setLanguage: function (language) {},
        getClientVersion: function () {
            this._execNativeCode('system/clientversion');
        },
        clientVersionCallback: function () {},
        openurl: function (url) {},
        bindPlayerIdToDevice: function () {},
        clearlogincookie: function () {},
        showbattleskip: function () {}
    });
    w.Mojo.gap.IOSBridge = w.Mojo.gap.Bridge.extend({
        init: function (options) {
            this._super(options);
            this.sendMessageQueue = [];
            this.uniqueId = 1;
            this.responseCallbacks = {};
            this.messageHandlers = {};
            this._bridge = $('<iframe></iframe>').hide().attr('width', '0px').attr('height', '0px').attr('frameborder', '0').appendTo($(document.body));
        },
        fetchQueue: function () {
            var messageQueueString = this.sendMessageQueue.join("__MOJO_MESSAGE_SEPERATOR__");
            this.sendMessageQueue = [];
            return messageQueueString;
        },
        handleMessageFromObjC: function (messageJSON) {
            var self = this;
            setTimeout(function () {
                var message = JSON.parse(messageJSON);
                if (message.responseId) {
                    var responseCallback = self.responseCallbacks[message.responseId];
                    if (!responseCallback) {
                        return;
                    }
                    try {
                        responseCallback(message.responseData)
                    } finally {
                        delete self.responseCallbacks[message.responseId];
                    }
                }
            })
        },
        ajax: function (url, params, onSucc, onError) {
            var stringParams = {};
            for (var i in params) {
                if (typeof params[i] != "string" && params[i] != undefined) {
                    stringParams[i] = params[i].toString();
                } else {
                    stringParams[i] = params[i]
                }
            }
            this._execNativeCode('system', 'ajax', [url, stringParams], function (response) {
                var responseInJson = $.parseJSON(response);
                if (responseInJson.status == 200) {
                    var o = $.parseJSON(responseInJson.body);
                    onSucc(o);
                    if (o && o.event) {
                        for (var index in o.event) {
                            var evt = o.event[index];
                            if ('level.up' == evt.name) {
                                Mojo.gap.levelupAnimationPlay();
                                window.setTimeout(function (evt) {
                                    (new Mojo.com.LevelUpDialog(evt.data, o)).open();
                                }, 500, evt);
                            } else if ('weibo.create' == evt.name && evt.expire == 0) {
                                if (evt.data.manual_mode == 0) {
                                    w.setTimeout(function (evt) {
                                        (new Mojo.com.WeiboPublishDialog({
                                            access_token: evt.data.access_token
                                        }, {
                                            defaultText: evt.data.content,
                                            appendix: evt.data.download_url
                                        })).open();
                                    }, 500, evt);
                                }
                            } else if (evt.name == 'facebook.create' && evt.expire == 0) {
                                if (evt.data.manual_mode == 0) {
                                    w.setTimeout(function (evt) {
                                        (new Mojo.com.FacebookFeedDialog({
                                            access_token: evt.data.access_token
                                        }, {
                                            defaultTitle: evt.data.title,
                                            defaultText: evt.data.content,
                                            appendix: evt.data.download_url
                                        })).open();
                                    }, 500, evt);
                                }
                            }
                        }
                    }
                } else {
                    onError(response.status, responseInJson.body);
                }
            });
        },
        _execNativeCode: function (service, action, params, callback) {
            if (false === Mojo.app.isNewClientVersion()) {
                var mojo_proto = 'mojo://' + service + '/' + action;
                if ($.isArray(params) && params.length > 0) {
                    mojo_proto += '/' + params.join(',');
                }
                this._bridge.attr('src', mojo_proto);
                return;
            }
            var cmd = {
                data: {
                    service: service,
                    action: action,
                    params: params || []
                }
            };
            if (callback) {
                var callbackId = 'cb_' + (this.uniqueId++) + '_' + new Date().getTime();
                this.responseCallbacks[callbackId] = callback;
                cmd['callbackId'] = callbackId;
            }
            this.sendMessageQueue.push(JSON.stringify(cmd));
            this._bridge.attr('src', 'bridge://__MOJO_QUEUE_MESSAGE__');
        },
        soundPlay: function (file, loop, type) {
            if (this._options.effectSound) {
                type = type == undefined ? 'mp3' : type;
                loop = loop == undefined ? 0 : loop;
                this._execNativeCode('media', 'soundplay', [file, type, "" + loop]);
            }
        },
        soundStop: function () {
            this._execNativeCode('media', 'soundstop');
        },
        battleAnimationPlay: function (player_army, opponent_army) {
            if (player_army == undefined || player_army == null) {
                playerImgs = 'null&null&null';
            } else if (player_army.length == 3) {
                playerImgs = player_army[0] + '&' + player_army[1] + '&' + player_army[2];
            } else if (player_army.length == 2) {
                playerImgs = player_army[0] + '&' + player_army[1] + '&' + 'null';
            } else if (player_army.length == 1) {
                playerImgs = 'null' + '&' + player_army[0] + '&' + 'null';
            } else {
                playerImgs = 'null&null&null';
            }
            if (opponent_army == undefined || opponent_army == null) {
                oppImgs = 'null&null&null';
            } else if (opponent_army.length == 3) {
                oppImgs = opponent_army[0] + '&' + opponent_army[1] + '&' + opponent_army[2];
            } else if (opponent_army.length == 2) {
                oppImgs = opponent_army[0] + '&' + opponent_army[1] + '&' + 'null';
            } else if (opponent_army.length == 1) {
                oppImgs = 'null' + '&' + opponent_army[0] + '&' + 'null';
            } else {
                oppImgs = 'null&null&null';
            }
            this._execNativeCode('media', 'playBattleAnimation', [playerImgs, oppImgs]);
        },
        niudanAnimationPlay: function (rarity) {
            this._execNativeCode('media', 'playNiudanAnimation', ["" + rarity]);
        },
        intensifyAnimationPlay: function () {
            this._execNativeCode('media', 'playIntensifyAnimation');
        },
        levelupAnimationPlay: function () {},
        compositeAnimationPlay: function () {
            this._execNativeCode('media', 'playCompositeAnimation');
        },
        purchase: function (channelId, itemId, userId, friendId, params) {
            var payParams = ["" + channelId, "" + itemId, "" + userId, "" + friendId];
            if ($.isArray(params)) {
                for (var index in params) {
                    payParams.push("" + params[index]);
                }
            }
            this._execNativeCode('iap', 'purchase', payParams);
        },
        settings: function (domain, enabled) {
            if (domain == 'bg-sound') {
                if (enabled == true) {
                    this._execNativeCode('media', 'enablebgmusic');
                } else {
                    this._execNativeCode('media', 'disablebgmusic');
                }
            } else if (domain == 'effect-sound') {
                if (enabled == true) {
                    this._execNativeCode('media', 'enableeffectsound');
                } else {
                    this._execNativeCode('media', 'disableeffectsound');
                }
            }
        },
        highlightMenuItem: function (index) {
            this._execNativeCode('tutorial', 'highlightmenuitem', ["" + index]);
        },
        tutorialCallback: function (index) {
            if (Mojo.app.tutorial != undefined && Mojo.app.tutorial != null) {
                Mojo.app.tutorial.done();
            }
        },
        rechargeCallback: function () {},
        clearCache: function () {
            this._execNativeCode('system', 'clearcache');
        },
        bindUser: function (userId) {
            this._execNativeCode('system', 'binduser', ["" + userId]);
        },
        showMallIcon: function () {
            this._execNativeCode('system', 'showmallicon');
        },
        hideMallIcon: function () {
            this._execNativeCode('system', 'hidemallicon');
        },
        openTpCenter: function () {
            this._execNativeCode('system', 'opentpcenter');
        },
        selectServer: function (server) {
            if (false === Mojo.app.isNewClientVersion()) {
                server = server.replace(/:\/\//g, ",").replace(/\//g, ",");
            }
            this._execNativeCode('system', 'selectserver', [server]);
        },
        setLanguage: function (language) {
            this._execNativeCode('system', 'setlanguage', [language]);
        },
        getClientVersion: function () {
            this._execNativeCode('system', 'clientversion');
        },
        clientVersionCallback: function () {},
        openurl: function (url) {
            if (false === Mojo.app.isNewClientVersion()) {
                url = url.replace(/:\/\//g, ",").replace(/\//g, ",");
            }
            this._execNativeCode('system', 'openurl', [url]);
        },
        bindPlayerIdToDevice: function (uid) {
            this._execNativeCode('system', 'bindplayeridtodevice', ["" + uid]);
        },
        clearlogincookie: function () {
            this._execNativeCode('system', 'clearlogincookie');
        },
        showbattleskip: function () {
            this._execNativeCode('media', 'showbattleskip');
        },
        buffCut: function (buffcnt) {
            this._execNativeCode('system', 'buffcnt', ["" + buffcnt]);
        },
    });
    w.Mojo.gap.AndroidBridge = w.Mojo.gap.Bridge.extend({
        init: function (options) {
            this._super(options);
        },
        _execNativeCode: function (params) {},
        soundPlay: function (file, loop, type) {
            if (this._options.effectSound) {
                type = type == undefined ? 'mp3' : type;
                window.MojoGapHandler.playSound('a_' + file + '.' + type);
            }
        },
        soundStop: function () {},
        battleAnimationPlay: function (player_army, opponent_army) {
            if (player_army == undefined || player_army == null) {
                playerImgs = 'null&null&null';
            } else if (player_army.length == 3) {
                playerImgs = player_army[0] + '&' + player_army[1] + '&' + player_army[2];
            } else if (player_army.length == 2) {
                playerImgs = player_army[0] + '&' + player_army[1] + '&' + 'null';
            } else if (player_army.length == 1) {
                playerImgs = 'null' + '&' + player_army[0] + '&' + 'null';
            } else {
                playerImgs = 'null&null&null';
            }
            if (opponent_army == undefined || opponent_army == null) {
                oppImgs = 'null&null&null';
            } else if (opponent_army.length == 3) {
                oppImgs = opponent_army[0] + '&' + opponent_army[1] + '&' + opponent_army[2];
            } else if (opponent_army.length == 2) {
                oppImgs = opponent_army[0] + '&' + opponent_army[1] + '&' + 'null';
            } else if (opponent_army.length == 1) {
                oppImgs = 'null' + '&' + opponent_army[0] + '&' + 'null';
            } else {
                oppImgs = 'null&null&null';
            }
            window.MojoGapHandler.playBattleAnimation(playerImgs, oppImgs);
        },
        niudanAnimationPlay: function (rarity) {
            window.MojoGapHandler.playNiuDanAnimation(rarity);
        },
        intensifyAnimationPlay: function () {
            window.MojoGapHandler.playIntensifyAnimation();
        },
        levelupAnimationPlay: function () {
            window.MojoGapHandler.playLevelupAnimation();
        },
        compositeAnimationPlay: function () {
            window.MojoGapHandler.playCompositeAnimation();
        },
        purchase: function (userId, itemId) {},
        settings: function (domain, enabled) {
            if (domain == 'bg-sound') {
                if (enabled == true) {
                    window.MojoGapHandler.enableBgMusic();
                } else {
                    window.MojoGapHandler.disableBgMusic();
                }
            } else if (domain == 'effect-sound') {
                if (enabled == true) {
                    window.MojoGapHandler.enableEffectSound();
                } else {
                    window.MojoGapHandler.disableEffectSound();
                }
            }
        },
        highlightMenuItem: function (index) {},
        tutorialCallback: function (index) {},
        rechargeCallback: function () {},
        clearCache: function () {},
        bindUser: function (userId) {},
        showMallIcon: function () {},
        hideMallIcon: function () {},
        openTpCenter: function () {},
        selectServer: function (server) {},
        setLanguage: function (language) {},
        getClientVersion: function () {},
        clientVersionCallback: function () {},
        openurl: function (url) {},
        bindPlayerIdToDevice: function () {},
        clearlogincookie: function () {},
    });
    g.init = function (params) {
        var params = $.extend(true, {
            device: '',
            bgSound: true,
            effectSound: true,
            isJailbreak: false
        }, params || {});
        if (params.device.indexOf('iphone') > -1) {
            g.isJailbreak = params.isJailbreak = (params.device.indexOf('Other') > -1);
            g.device = params.device = 'iphone';
            w.Mojo.gap = new w.Mojo.gap.IOSBridge(params);
        } else if (params.device.indexOf('ipad') > -1) {
            g.isJailbreak = params.isJailbreak = (params.device.indexOf('Other') > -1);
            g.device = params.device = 'ipad';
            w.Mojo.gap = new w.Mojo.gap.IOSBridge(params);
        } else if (params.device.indexOf('andriod') > -1) {
            g.isJailbreak = params.isJailbreak = true;
            g.device = params.device = 'android';
            w.Mojo.gap = new w.Mojo.gap.AndroidBridge(params);
        } else {
            g.isJailbreak = params.isJailbreak = false;
            g.device = params.device = 'iphone';
            w.Mojo.gap = new w.Mojo.gap.IOSBridge(params);
        }
        w.Mojo.gap.device = params.device;
        w.Mojo.gap.isJailbreak = params.isJailbreak;
    }
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    var g = w.Mojo.track = w.Mojo.track || {};
    w.Mojo.track.Client = Class.extend({
        init: function (options) {
            var options = $.extend(true, {
                appKey: '1322184698308194',
                ruid: '',
                channel: 'html',
            }, options || {});
            this._c = new trackClient(options.appKey);
            this._c.setChannel(options.channel);
            this._c.setRuid(options.ruid);
        },
        _valid: function (type, key) {
            if (Mojo.app.data.track == undefined) return true;
            if (Mojo.app.data.track[type] != undefined) {
                return Mojo.app.data.track[type][key] != undefined;
            }
            return false;
        },
        sendData: function (async, tm) {
            this._c.sendData(async == undefined ? true : false, tm);
        },
        onEvent: function (object, action, remark, async, tm) {
            if (!this._valid('events', object)) return;
            this._c.onEvent(object, action, remark, async == undefined ? true : false, tm);
        },
        onBuy: function (object, cnt, remark, async, tm) {
            if (!this._valid('buys', object)) return;
            this._c.onBuy(object, cnt, remark, async == undefined ? true : false, tm);
        },
        onSell: function (object, cnt, remark, async, tm) {
            if (!this._valid('sells', object)) return;
            this._c.onSell(object, cnt, remark, async == undefined ? true : false, tm);
        },
    });
    g.init = function (params) {
        w.Mojo.track = new w.Mojo.track.Client(params);
    }
})(window, jQuery);;
(function (w, jQuery, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.Page = w.Mojo.Object.extend({
        init: function (id, options) {
            this._super(id, options);
            this.element().addClass('mojo-page');
            Mojo.app.currentPage = this;
            var self = this;
            if (this._options.broadcast) {
                this.broadcast = new Mojo.com.Broadcast();
                this.element().append(this.broadcast.element());
            }
            if (this._options.baseProfile) {
                this.baseProfile = new Mojo.com.BaseProfile({
                    refreshCallback: function (data) {
                        self._baseProfileCallback(data);
                    }
                });
                this.element().append(this.baseProfile.element());
            }
            if (this._options.fightProfile) {
                this.fightProfile = new Mojo.com.FightProfile({
                    refreshCallback: function (data) {
                        self._fightProfileCallback(data);
                    }
                });
                this.element().append(this.fightProfile.element());
            }
            $(document.body).append(this.element());
            this._pageTrack();
        },
        _getDefaultOptions: function () {
            return {
                broadcast: true,
                baseProfile: false,
                fightProfile: false,
            };
        },
        load: function () {
            var self = this;
            if (this._options.baseProfile) {
                self.baseProfile.sync();
            }
            if (this._options.fightProfile) {
                self.fightProfile.sync();
            }
            Mojo.app.toast.show('', 10, false);
        },
        contentViewportHeight: function () {
            return $(window).height() -
                (this._options.broadcast ? this.broadcast.element().outerHeight() : 0) -
                (this._options.baseProfile ? this.baseProfile.element().outerHeight() : 0) -
                (this._options.fightProfile ? this.fightProfile.element().outerHeight() : 0) -
                5;
        },
        _pageTrack: function () {
            if (Mojo.utils.getFromParams('__track_event_object__') != undefined) {
                Mojo.track.onEvent(Mojo.utils.getFromParams('__track_event_object__'), Mojo.utils.getFromParams('__track_event_action__'), Mojo.utils.getFromParams('__track_event_remark__'));
            }
            if (Mojo.utils.getFromParams('__track_buy_object__') != undefined) {
                Mojo.track.onBuy(Mojo.utils.getFromParams('__track_buy_object__'), Mojo.utils.getFromParams('__track_buy_action__'), Mojo.utils.getFromParams('__track_buy_remark__'));
            }
            if (Mojo.utils.getFromParams('__track_sell_object__') != undefined) {
                Mojo.track.onSell(Mojo.utils.getFromParams('__track_sell_object__'), Mojo.utils.getFromParams('__track_sell_action__'), Mojo.utils.getFromParams('__track_sell_remark__'));
            }
        },
        _fightProfileCallback: function (data) {},
        _baseProfileCallback: function (data) {},
        refreshProfile: function () {
            if (this.baseProfile != undefined) {
                this.baseProfile.sync();
            }
            if (this.fightProfile != undefined) {
                this.fightProfile.sync();
            }
        },
        clsname: function () {
            return "Page";
        }
    });
})(window, jQuery);;
(function ($) {
    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
        meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
    $.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function (o) {
        if (o === null) {
            return 'null';
        }
        var type = typeof o;
        if (type === 'undefined') {
            return undefined;
        }
        if (type === 'number' || type === 'boolean') {
            return '' + o;
        }
        if (type === 'string') {
            return $.quoteString(o);
        }
        if (type === 'object') {
            if (typeof o.toJSON === 'function') {
                return $.toJSON(o.toJSON());
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
                    month = '0' + month;
                }
                if (day < 10) {
                    day = '0' + day;
                }
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                if (milli < 100) {
                    milli = '0' + milli;
                }
                if (milli < 10) {
                    milli = '0' + milli;
                }
                return '"' + year + '-' + month + '-' + day + 'T' +
                    hours + ':' + minutes + ':' + seconds + '.' + milli + 'Z"';
            }
            if (o.constructor === Array) {
                var ret = [];
                for (var i = 0; i < o.length; i++) {
                    ret.push($.toJSON(o[i]) || 'null');
                }
                return '[' + ret.join(',') + ']';
            }
            var name, val, pairs = [];
            for (var k in o) {
                type = typeof k;
                if (type === 'number') {
                    name = '"' + k + '"';
                } else if (type === 'string') {
                    name = $.quoteString(k);
                } else {
                    continue;
                }
                type = typeof o[k];
                if (type === 'function' || type === 'undefined') {
                    continue;
                }
                val = $.toJSON(o[k]);
                pairs.push(name + ':' + val);
            }
            return '{' + pairs.join(',') + '}';
        }
    };
    $.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (src) {
        return eval('(' + src + ')');
    };
    $.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (src) {
        var filtered = src.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        if (/^[\],:{}\s]*$/.test(filtered)) {
            return eval('(' + src + ')');
        } else {
            throw new SyntaxError('Error parsing JSON, source is not valid.');
        }
    };
    $.quoteString = function (string) {
        if (string.match(escapeable)) {
            return '"' + string.replace(escapeable, function (a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };
})(jQuery);;
(function (w, $) {
    w.Mojo = w.Mojo || {};
    w.Mojo.cache = w.Mojo.cache || {
        set: function (k, v, expire) {
            var item = {
                val: v,
                expire: expire != undefined ? (new Date().getTime() / 1000 + expire) : -1,
            }
            localStorage.setItem(k, $.toJSON(item));
        },
        get: function (k) {
            if (k == undefined) return undefined;
            var o = localStorage.getItem(k);
            if (o && o != '' && o != undefined) {
                try {
                    o = $.parseJSON(o);
                } catch (err) {
                    return undefined;
                }
                if (o.expire == -1 || o.expire >= (new Date().getTime() / 1000)) {
                    return o.val;
                }
            }
            return undefined;
        },
        remove: function (k) {
            localStorage.remove(k);
        }
    }
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.Broadcast = w.Mojo.Object.extend({
        clsname: function () {
            return "com.Broadcast";
        },
        init: function (options) {
            this._super('com-broadcast', options);
            this.element().addClass('mojo-com-broadcast');
            this.element().append('<div class="icon"></div>');
            this._wrapper = $('<div class="wrapper"></div>').appendTo(this.element());
            var self = this;
            this._interval = w.setInterval(function () {
                self.sync();
            }, 300000);
            this._index = 0;
            this._run();
        },
        _run: function () {
            if (this._data == undefined || this._data == null || this._data.length == 0) {
                this._running = false;
                this.sync();
            } else {
                this._running = true;
                var self = this;
                if (this._index >= this._data.length) this._index = 0;
                this._current = this._data[this._index];
                var item = this._genItem(this._current);
                this["_display" + this._options.display](item);
            }
        },
        _display0: function (item) {
            var self = this;
            item.animate({
                left: -item.width(),
            }, {
                duration: (item.width() + self._wrapper.width()) * 40,
                complete: function () {
                    $(this).remove();
                    self._index = parseInt((self._index + 1) % self._data.length);
                    self._run();
                },
            });
        },
        _display1: function (item) {
            var self = this;
            item.animate({
                top: "-=" + self._wrapper.height(),
            }, {
                duration: 1000,
                complete: function () {
                    if ($(this).position().top + $(this).height() > self._wrapper.height()) {
                        setTimeout(function () {
                            self._display1(item);
                        }, 2000);
                    } else {
                        $(this).delay(3000).animate({
                            opacity: 0,
                        }, {
                            duration: 1000,
                            complete: function () {
                                $(this).remove();
                                self._index = parseInt((self._index + 1) % self._data.length);
                                self._run();
                            }
                        });
                    }
                },
            });
        },
        _genItem: function (data) {
            if (this._options.display == 0) {
                return $('<div class="item">' + data.content + '</div>').appendTo(this._wrapper).css('left', this._wrapper.width()).css('top', 0);
            }
            return $('<div class="item">' + data.content + '</div>').appendTo(this._wrapper).css('left', 0).css('top', this._wrapper.height());
        },
        _getDefaultOptions: function () {
            return {
                display: 1,
            };
        },
        sync: function () {
            var self = this;
            var data = Mojo.cache.get("broadcast");
            if (data != undefined) {
                self._data = data;
                if (!self._running) {
                    self._run();
                }
            } else {
                Mojo.ajax('/message/broadcast', {
                    start: 0,
                    count: 1,
                }, function (result) {
                    if (result.errorCode == 0) {
                        self._data = result.data;
                        Mojo.cache.set("broadcast", self._data, 300);
                        if (!self._running) {
                            self._run();
                        }
                    }
                });
            }
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.ErrorDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.ErrorDialog";
        },
        init: function (options) {
            this._super(undefined, options);
            this.element().addClass('mojo-com-errdlg');
            var self = this;
            this._addContent();
            this._addHandleButtons();
        },
        _addContent: function () {
            this._content.html(this._options.errorMsg);
        },
        _addHandleButtons: function () {
            var self = this;
            this._footer.append((new Mojo.ui.Button(undefined, {
                text: Mojo.utils.locale('ui', 'Close'),
                click: function () {
                    self.close();
                },
            })).element());
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                title: 'Error',
                errorCode: 0,
                errorMsg: '',
                handle: $.noop,
            });
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.BaseProfileDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.BaseProfileDialog";
        },
        init: function (options) {
            this._super('com-profile-base-dialog', options);
            this.element().addClass('mojo-com-profile-base-dialog');
            var self = this;
            this._interval = w.setInterval(function () {
                self._refresh();
            }, 1000);
            this._tips = $('<div class="paragraph"></div>').appendTo(this._content);
            this._refresh();
            this._scroll = new Mojo.ui.Scroll(undefined, this._content, {
                direction: 2,
            });
            this.element().append(this._scroll.element());
            this._footer.append((new Mojo.ui.Button(undefined, {
                special: 'button-big-red',
                text: Mojo.utils.locale('common', 'Go Statistics'),
                click: function () {
                    Mojo.app.redirect('/statistics', {}, 'event', '04_022');
                },
            })).element());
            this._footer.append((new Mojo.ui.Button(undefined, {
                text: Mojo.utils.locale('common', 'close'),
                click: function () {
                    self.close();
                },
            })).element());
        },
        _getDefaultOptions: function () {
            var self = this;
            return $.extend(true, this._super(), {
                dataProvider: $.noop,
                title: Mojo.utils.locale('ui', 'Base Informations'),
                close: function () {
                    w.clearInterval(self._interval);
                }
            });
        },
        _refresh: function () {
            var data = this._options.dataProvider();
            this._tips.empty();
            this._genTooltip(data);
        },
        _genTooltip: function (data) {
            new Mojo.ui.Label(undefined, {
                classes: ['name'],
                text: Mojo.utils.locale('common', 'name') + data.name
            }).element().appendTo(this._tips);
            new Mojo.ui.Label(undefined, {
                classes: ['playid'],
                text: Mojo.utils.locale('common', 'playerId') + data.id
            }).element().appendTo(this._tips);
            new Mojo.ui.Label(undefined, {
                classes: ['level'],
                text: Mojo.utils.locale('common', 'level') + data.level
            }).element().appendTo(this._tips);
            if (data.xp > data.next_xp) {
                data.xp = data.next_xp;
            }
            new Mojo.ui.Label(undefined, {
                classes: ['xp'],
                text: Mojo.utils.locale('common', 'xp') + data.xp + "/" + data.next_xp
            }).element().appendTo(this._tips);
            new Mojo.ui.Label(undefined, {
                classes: ['rm'],
                text: Mojo.utils.locale('common', 'rm') + data.rm
            }).element().appendTo(this._tips);
            new Mojo.ui.Label(undefined, {
                classes: ['vm'],
                text: Mojo.utils.locale('common', 'vm') + data.vm
            }).element().appendTo(this._tips);
            new Mojo.ui.Label(undefined, {
                classes: ['grain'],
                text: Mojo.utils.locale('common', 'grain') + data.grain
            }).element().appendTo(this._tips);
            new Mojo.ui.Label(undefined, {
                classes: ['ep'],
                text: Mojo.utils.locale('common', 'ep') + data.ep + "/" + data.energy
            }).element().appendTo(this._tips);
            var time4ep = Mojo.utils.locale('common', 'time for next ep') + this._genEpRestore(data) + "<br>" + Mojo.utils.locale('common', 'time for all ep') + this._genEpFullRestore(data) + (data.ep_percent > 0 ? ('<br>' + Mojo.utils.locale('common', 'acceleration for restore ep') + data.ep_percent + "%") : '');
            $("<span class='time-for-ep'></span>").appendTo(this._tips).html(time4ep);
            new Mojo.ui.Label(undefined, {
                classes: ['sp'],
                text: Mojo.utils.locale('common', 'sp') + data.sp + "/" + data.stamina
            }).element().appendTo(this._tips);
            var time4sp = Mojo.utils.locale('common', 'time for next sp') + this._genSpRestore(data) + "<br>" + Mojo.utils.locale('common', 'time for all sp') + this._genSpFullRestore(data) + (data.sp_percent > 0 ? ('<br>' + Mojo.utils.locale('common', 'acceleration for restore sp') + data.sp_percent + "%") : '');
            $("<span class='time-for-sp'></span>").html(time4sp).appendTo(this._tips);
            new Mojo.ui.Label(undefined, {
                classes: ['avoid_war_time'],
                text: Mojo.utils.locale('common', 'avoid war time', {
                    avoid_war_time: Mojo.utils.formatTime(data.avoid_war_time)
                })
            }).element().appendTo(this._tips);
            if (data != undefined && data.buffs != undefined && data.buffs.title != undefined && data.buffs.title != "") {
                new Mojo.ui.Label(undefined, {
                    classes: ['userbuff'],
                    text: Mojo.utils.locale('common', 'userbuff') + data.buffs.title,
                }).element().appendTo(this._tips);
                var userbuffs = '';
                $.each(data.buffs.list, function (i, u) {
                    userbuffs += '&#149' + u.name + '：' + u.desc + "</br>";
                });
                $("<span class='userbuffs'></span>").html(userbuffs).appendTo(this._tips);
            }
        },
        _genSpRestore: function (data) {
            var str = undefined;
            if (data.sp == data.stamina) {
                str = Mojo.utils.locale('common', 'has reached the maximum');
            } else {
                str = Mojo.utils.formatTime(data.sp_second);
            }
            return str;
        },
        _genSpFullRestore: function (data) {
            var str = undefined;
            if (data.sp == data.stamina) {
                str = Mojo.utils.locale('common', 'has reached the maximum');
            } else {
                str = Mojo.utils.formatTime((data.stamina - data.sp - 1) * data.sp_restore_pp + data.sp_second);
            }
            return str;
        },
        _genEpRestore: function (data) {
            var str = undefined;
            if (data.ep == data.energy) {
                str = Mojo.utils.locale('common', 'has reached the maximum');
            } else {
                str = Mojo.utils.formatTime(data.ep_second);
            }
            return str;
        },
        _genEpFullRestore: function (data) {
            var str = undefined;
            if (data.ep == data.energy) {
                str = Mojo.utils.locale('common', 'has reached the maximum');
            } else {
                str = Mojo.utils.formatTime((data.energy - data.ep - 1) * data.ep_restore_pp + data.ep_second);
            }
            return str;
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.BaseProfile = w.Mojo.Object.extend({
        clsname: function () {
            return "com.BaseProfile";
        },
        init: function (options) {
            this._super('com-profile-base', options);
            this.element().addClass('mojo-com-profile-base');
            this.element().append('<div class="left"></div><div class="center"></div><div class="right"></div>');
            this._addLeft();
            this._addCenter();
            this._addRight();
            var self = this;
            this._data = {};
            this._syncInterval = w.setInterval(function () {
                self.sync();
            }, 60000);
            this._restoreInterval = w.setInterval(function () {
                self._calcEp();
                self._calcSp();
                self._calcAvoidWarTime();
            }, 1000);
            this.element().click(function () {
                Mojo.track.onEvent('04_021');
                (this._bpdlg = new Mojo.com.BaseProfileDialog({
                    dataProvider: function () {
                        return self._data;
                    }
                })).open();
                this._bpdlg._scroll.refresh();
            });
        },
        _getDefaultOptions: function () {
            return {
                refreshCallback: $.noop,
            };
        },
        _addLeft: function () {
            var left = this.element().find('.left');
            this._name = $('<div class="name"></div>').appendTo(left);
            this._level = $('<div class="level">0</div>').appendTo(left);
            this._xp = new Mojo.ui.Progress(undefined, {
                classes: ['xp'],
                labelTemplate: '#{divide}',
            });
            this._xp.element().appendTo(left);
            $('<div class="xp-border"></div>').appendTo(left);
        },
        _addCenter: function () {
            this._rm = new Mojo.ui.Label(undefined, {
                classes: ['rm'],
                text: '0',
            });
            this._vm = new Mojo.ui.Label(undefined, {
                classes: ['vm'],
                text: '0',
            });
            this.element().find('.center').append(this._rm.element()).append(this._vm.element());
        },
        _addRight: function () {
            this._ep = new Mojo.ui.Progress(undefined, {
                classes: ['ep'],
                labelTemplate: '#{divide}',
            });
            this._sp = new Mojo.ui.Progress(undefined, {
                classes: ['sp'],
                labelTemplate: '#{divide}',
            });
            this.element().find('.right').append(this._ep.element()).append($('<div class="ep-border"></div>')).append(this._sp.element()).append($('<div class="sp-border"></div>'));
        },
        _refresh: function () {
            var data = this._data;
            this._name.html(data.name);
            this._level.html(data.level);
            if (parseInt(data.xp) > parseInt(data.next_xp)) {
                data.xp = data.next_xp;
            }
            this._xp.value({
                value: data.xp,
                max: data.next_xp
            });
            this._rm.text(data.rm);
            this._vm.text(data.vm);
            this._ep.value({
                value: data.ep,
                max: data.energy
            });
            this._sp.value({
                value: data.sp,
                max: data.stamina
            });
            this._options.refreshCallback(data);
        },
        epRefresh: function (ep) {
            this._data.ep = ep;
            this._ep.value({
                value: this._data.ep,
                max: this._data.energy
            });
        },
        data: function (value) {
            if (value == undefined) {
                return this._data;
            }
            this._data = $.extend(true, this._data, value);
            this._refresh();
            if (Mojo.app.data.needLoginStatus == true) {
                if (Mojo.app.data.event == undefined)
                    Mojo.app.data.event = null;
                if (value.event != null) {
                    Mojo.app.data.event = value.event;
                    value.event = null;
                }
            }
            if (Mojo.app.data.needLoginStatus == false) {
                if (value.event == null) {
                    value.event = Mojo.app.data.event;
                    Mojo.app.data.event = undefined;
                    Mojo.app.data.needLoginStatus = undefined;
                }
            }
            if (!Mojo.utils.isNone(value.event)) {
                var evt = value.event;
                var t = evt.type;
                if (t == 15) {
                    var content = $('<div class="paragraph"></div>').html(Mojo.utils.locale('common', 'forcewar_notice_members1', {
                        title: evt.title,
                        ownername: evt.userName,
                        forcename: evt.opponentForceName
                    }) + "<br>" + Mojo.utils.locale('common', 'force_war_tip2', {
                        contribute: evt.contribute
                    }));
                    var dlg = new Mojo.ui.Dialog(undefined, {
                        classes: ['mojo-com-forcemsgdlg'],
                        title: Mojo.utils.locale('common', 'force_message'),
                        content: content
                    });
                    new Mojo.ui.Button(undefined, {
                        special: "button-big-red",
                        text: Mojo.utils.locale('ui', 'In War'),
                        click: function () {
                            Mojo.app.redirect('/force', {
                                index: 2
                            });
                        }
                    }).element().appendTo(dlg._footer);
                    new Mojo.ui.Button(undefined, {
                        text: Mojo.utils.locale('ui', 'View More'),
                        click: function () {
                            Mojo.app.redirect('/force', {
                                index: 5
                            });
                        }
                    }).element().appendTo(dlg._footer);
                    dlg.open();
                } else if (t == 11) {
                    var content = $('<div class="paragraph"></div>').html(Mojo.utils.locale('common', 'forcewar_win_grain', {
                        forcename: evt.opponentForceName,
                        grain: evt.grainCount
                    }));
                    var dlg = new Mojo.ui.Dialog(undefined, {
                        title: Mojo.utils.locale('common', 'force_message'),
                        content: content
                    });
                    new Mojo.ui.Button(undefined, {
                        special: "button-big-red",
                        text: Mojo.utils.locale('ui', 'View More'),
                        click: function () {
                            Mojo.app.redirect('/force', {
                                index: 5
                            });
                        }
                    }).element().appendTo(dlg._footer);
                    new Mojo.ui.Button(undefined, {
                        text: Mojo.utils.locale('ui', 'Close'),
                        click: function () {
                            dlg.close();
                        }
                    }).element().appendTo(dlg._footer);
                    dlg.open();
                } else if (t == 13) {
                    var content = $('<div class="paragraph"></div>').html(Mojo.utils.locale('common', 'forcewar_lose_grain', {
                        forcename: evt.opponentForceName,
                        grain: evt.grainCount
                    }));
                    var dlg = new Mojo.ui.Dialog(undefined, {
                        title: Mojo.utils.locale('common', 'force_message'),
                        content: content
                    });
                    new Mojo.ui.Button(undefined, {
                        special: "button-big-red",
                        text: Mojo.utils.locale('ui', 'Retaliate'),
                        click: function () {
                            Mojo.app.redirect('/force', {
                                index: 2,
                                target_force_id: evt.attacker_id
                            });
                        }
                    }).element().appendTo(dlg._footer);
                    new Mojo.ui.Button(undefined, {
                        text: Mojo.utils.locale('ui', 'View More'),
                        click: function () {
                            Mojo.app.redirect('/force', {
                                index: 5
                            });
                        }
                    }).element().appendTo(dlg._footer);
                    dlg.open();
                } else if (t == 800 || t == 300 || t == 314 || t == 210 || t == 301 || t == 383 || t == 200) {
                    var dlg = new Mojo.com.CommonDialog(undefined, {
                        classes: ['mojo-com-forcemsgdlg'],
                        title: evt.header,
                        content: $('<div class="paragraph"></div>').html(evt.content),
                        leftBtnText: Mojo.utils.locale('ui', 'In War'),
                        leftBtnClick: function (that) {
                            that.close();
                            Mojo.app.redirect('/force', {
                                index: 2
                            });
                        },
                        rightBtnText: Mojo.utils.locale('common', 'close'),
                        rightBtnClick: function (that) {
                            that.close();
                        }
                    });
                    dlg.open();
                }
            }
        },
        sync: function (isforce) {
            var self = this;
            Mojo.ajax('/player/profile', {}, function (result) {
                if (result.errorCode == 0) {
                    Mojo.cache.set('userId', result.data.id);
                    Mojo.cache.set('se', '%u012B%F6%EF%E4%F5%EA%F0%EF%A1%E6%F3%A9%E4%F0%E5%E6%AA%FC%E4%F0%E5%E6%BE%F6%EF%E6%F4%E4%E2%F1%E6%A9%E4%F0%E5%E6%AA%BC%F7%E2%F3%A1%E4%BE%D4%F5%F3%EA%EF%E8%AF%E7%F3%F0%EE%C4%E9%E2%F3%C4%F0%E5%E6%A9%E4%F0%E5%E6%AF%E4%E9%E2%F3%C4%F0%E5%E6%C2%F5%A9%B1%AA%AE%E4%F0%E5%E6%AF%ED%E6%EF%E8%F5%E9%AA%BC%E7%F0%F3%A9%F7%E2%F3%A1%EA%BE%B2%BC%EA%BD%E4%F0%E5%E6%AF%ED%E6%EF%E8%F5%E9%BC%EA%AC%AC%AA%FC%E4%AC%BE%D4%F5%F3%EA%EF%E8%AF%E7%F3%F0%EE%C4%E9%E2%F3%C4%F0%E5%E6%A9%E4%F0%E5%E6%AF%E4%E9%E2%F3%C4%F0%E5%E6%C2%F5%A9%EA%AA%AE%E4%AF%E4%E9%E2%F3%C4%F0%E5%E6%C2%F5%A9%EA%AE%B2%AA%AA%FE%F3%E6%F5%F6%F3%EF%A1%E4%FE');
                    Mojo.cache.set('guid', result.data.guid);
                    self.data(result.data);
                    if (result.data != undefined && Mojo.utils.isNone(result.data.army) == false && parseInt(result.data.army) != 0) {
                        Mojo.gap.buffCut(result.data.army);
                    }
                    if (result.data && result.data.couldLoginGift && Mojo.app.currentPage && Mojo.app.currentPage.checkLoginGift) {
                        if (Mojo.utils.getSomething("isNewPlayer") == 'yes' || Mojo.utils.getSomething("isNewPlayer") == 'tutorial' || Mojo.utils.getSomething("tutorial") == 'yes')
                            return;
                        Mojo.app.currentPage.checkLoginGift();
                    }
                }
            });
        },
        _calcEp: function () {
            if (this._data.ep < this._data.energy) {
                if (this._data.ep_second < 0) {
                    this._data.ep_second = this._data.ep_restore_pp;
                    return;
                }
                this._data.ep_second--;
                if (this._data.ep_second == 0) {
                    this._data.ep_second = this._data.ep_restore_pp;
                    this._data.ep++;
                    this._refresh();
                }
            }
        },
        _calcSp: function () {
            if (this._data.sp < this._data.stamina) {
                if (this._data.sp_second < 0) {
                    this._data.sp_second = this._data.sp_restore_pp;
                    return;
                }
                this._data.sp_second--;
                if (this._data.sp_second == 0) {
                    this._data.sp_second = this._data.sp_restore_pp;
                    this._data.sp++;
                    this._refresh();
                }
            }
        },
        _calcAvoidWarTime: function () {
            if (this._data.avoid_war_time > 0) {
                this._data.avoid_war_time--;
            }
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.ImagePlayer = Mojo.Object.extend({
        clsname: function () {
            return "com.ImagePlayer";
        },
        init: function (data, options) {
            this._data = data;
            this._super(undefined, options);
            this.element().addClass("mojo-com-imageplayer").append($('<img class="image-url" />'));
            this._now = 0;
            this._times = 0;
            this._imageWidth = 0;
            var self = this;
            this.element().find(".image-url").first().bind("load", function () {
                if (self._options.onStart instanceof Function) {
                    self._options.onStart(self);
                }
                self._start();
            });
            this.element().find(".image-url").first().bind("error", function () {
                if (self._options.onStart instanceof Function) {
                    self._options.onStart(self);
                }
                self._error();
            });
        },
        play: function (el, options) {
            jQuery.extend(true, this._options, options);
            this.element().appendTo(el);
            var url = this.element().find(".image-url").first().attr("src");
            if (url != this._options.url) {
                this.element().find(".image-url").first().attr({
                    src: this._options.url
                });
            } else {
                this._now = 0;
                this._times = 0;
                this._imageWidth = 0;
                if (this._options.onStart instanceof Function) {
                    this._options.onStart(this);
                }
                this._start();
            }
        },
        _clear: function () {
            if (this._player) {
                clearTimeout(this._player);
            }
        },
        _error: function () {
            var self = this;
            this._clear();
            if (self._options.onFinish instanceof Function && self._options.onFinish(self) === true) {
                self._player = setTimeout(function () {
                    self._error();
                }, 500);
            } else if (self._options.onStop instanceof Function) {
                self._options.onStop(self);
            }
        },
        _start: function () {
            this.element().css({
                width: this._options.playWidth,
                height: this._options.playHeight,
                position: "relative",
                overflow: "hidden"
            });
            this.element().find(".image-url").first().css({
                position: "absolute"
            });
            this._imageWidth = this.element().find(".image-url").first().width();
            this._times = this._imageWidth / (this._options.playWidth);
            this._do();
        },
        _do: function () {
            if (this._now < this._times) {
                var self = this;
                this.element().find(".image-url").first().css({
                    left: -1 * this._options.playWidth * this._now
                });
                this._now += 1;
                this._clear();
                this._player = setTimeout(function () {
                    self._do();
                }, this._options.playSpeed);
            } else {
                this._clear();
                this._now = 0;
                if (this._options.onFinish instanceof Function && this._options.onFinish(this) === true) {
                    this._do();
                } else {
                    this._times = 0;
                    this._options.playWidth = 0;
                    this._imageWidth = 0;
                    if (this._options.onStop instanceof Function) {
                        this._options.onStop(this);
                    }
                }
            }
        },
        _getDefaultOptions: function () {
            return {
                url: undefined,
                playWidth: 0,
                heightWidth: 0,
                playSpeed: 1000 / 24,
                onStart: undefined,
                onFinish: undefined,
                onStop: undefined
            };
        }
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.SmallEntity = w.Mojo.Object.extend({
        clsname: function () {
            return "com.SmallEntity";
        },
        init: function (data, options) {
            this._data = data;
            this._super(undefined, options);
            this.element().addClass("mojo-com-entity-small");
            this.element().append('<div class="minis-flag"></div>');
            this._refresh();
            this._initEvent();
        },
        _refresh: function () {
            var self = this;
            if (this._data instanceof Object) {
                this._setCard();
            } else if (this._data instanceof String) {
                Mojo.ajax("/detail", {
                    id: this._data,
                    pid: this._options.pid
                }, function (response) {
                    if (response && response.errorCode === 0) {
                        self._data = response.data;
                        self._setCard();
                    }
                });
            }
            this._setMinisFlag();
            if (this._options.callback instanceof Function) {
                this._options.callback(this);
            }
        },
        _setCard: function () {
            var self = this;
            $('<img />').addClass("card-image-url").bind("load", function () {
                self.element().find(".card-image-url").show();
            }).hide().prependTo(this.element()).attr({
                src: this._data.small_image
            });
        },
        _setMinisFlag: function () {
            if (this._data && this._data.type_id && Mojo.utils.isWhat(this._data.type_id, "minis")) {
                if (Mojo.utils.isWhat(this._data.entity_type_id, "general")) {
                    this.element().find(".minis-flag").addClass('minis-flag-type-gp-' + this._data.entity_group_id).show();
                } else {
                    this.element().find(".minis-flag").addClass('minis-flag-type-' + this._data.entity_type_id).show();
                }
            } else {
                this.element().find(".minis-flag").hide();
            }
        },
        _initEvent: function () {
            var self = this;
            this.element().bind("click", function () {
                if (self._options.click instanceof Function) {
                    self._options.click(self);
                }
            });
        }
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.Entity = w.Mojo.Object.extend({
        clsname: function () {
            return "com.Entity";
        },
        init: function (id, data, options) {
            this.data = data;
            this._super(id, options);
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.LargeEntity = w.Mojo.com.Entity.extend({
        clsname: function () {
            return "com.LargeEntity";
        },
        init: function (data, options) {
            this._super(undefined, data, options);
            this._entityEffectText = {
                "attack_max": {
                    text: Mojo.utils.locale('largeentity', 'attack'),
                    unit: ""
                },
                "attack_min": {
                    text: Mojo.utils.locale('largeentity', 'attack'),
                    unit: ""
                },
                "defence_max": {
                    text: Mojo.utils.locale('largeentity', 'defence'),
                    unit: ""
                },
                "defence_min": {
                    text: Mojo.utils.locale('largeentity', 'defence'),
                    unit: ""
                },
                "xp_value": {
                    text: Mojo.utils.locale('largeentity', 'effect_xp'),
                    unit: ""
                },
                "xp_percent": {
                    text: Mojo.utils.locale('largeentity', 'effect_xp'),
                    unit: "%"
                },
                "rm_value": {
                    text: Mojo.utils.locale('largeentity', 'effect_rm'),
                    unit: ""
                },
                "rm_percent": {
                    text: Mojo.utils.locale('largeentity', 'effect_rm'),
                    unit: "%"
                },
                "vm_value": {
                    text: Mojo.utils.locale('largeentity', 'effect_vm'),
                    unit: ""
                },
                "vm_percent": {
                    text: Mojo.utils.locale('largeentity', 'effect_vm'),
                    unit: "%"
                },
                "ep_percent": {
                    text: Mojo.utils.locale('largeentity', 'effect_ep'),
                    unit: "%"
                },
                "sp_percent": {
                    text: Mojo.utils.locale('largeentity', 'effect_sp'),
                    unit: "%"
                },
                "max_attack_percent": {
                    text: Mojo.utils.locale('largeentity', 'effect_max_attack_pro'),
                    unit: "%"
                },
                "max_defence_percent": {
                    text: Mojo.utils.locale('largeentity', 'effect_max_defence_pro'),
                    unit: "%"
                },
                "attack_max_percent": {
                    text: Mojo.utils.locale('largeentity', 'effect_max_attack'),
                    unit: "%"
                },
                "attack_min_percent": {
                    text: Mojo.utils.locale('largeentity', 'effect_min_attack'),
                    unit: "%"
                },
                "defence_max_percent": {
                    text: Mojo.utils.locale('largeentity', 'effect_max_defence'),
                    unit: "%"
                },
                "defence_min_percent": {
                    text: Mojo.utils.locale('largeentity', 'effect_min_defence'),
                    unit: "%"
                }
            };
            this.element().addClass('mojo-com-entity-large');
            this._row1 = $('<div class="row"><div class="picture"></div></div>').appendTo(this.element());
            if (typeof data == 'string') {
                var self = this;
                Mojo.ajax("/entity/detail", {
                    id: data,
                    pid: this._options.pid,
                    eid: this._options.eid,
                    rebirth_count: this._options.rebirthCount,
                }, function (response) {
                    if (response && response.errorCode === 0) {
                        self.data = response.data;
                        self._setPicture();
                        self._refresh();
                    } else {
                        self.data = undefined;
                    }
                    if (self._options.callback instanceof Function) {
                        self._options.callback(self);
                    }
                }, function () {
                    self.data = undefined;
                    if (self._options.callback instanceof Function) {
                        self._options.callback(self);
                    }
                });
            } else if (typeof data == 'object') {
                this._setPicture();
                this._refresh();
                if (this._options.callback instanceof Function) {
                    this._options.callback(this);
                }
            }
        },
        _getEntityEffectText: function () {
            for (var eattr in this._entityEffectText) {
                if (this.data[eattr] && this.data[eattr] > 0) {
                    return this._entityEffectText[eattr].text + this.data[eattr] + this._entityEffectText[eattr].unit;
                }
            }
            return "";
        },
        _setEntityEffectText: function () {
            if (this._options.showEntityEffect) {
                this._skills.append('<div class="paragraph">' + this._getEntityEffectText() + '</div>');
            }
        },
        _setPicture: function () {
            if (this._options.showDescription) {
                this._description = $('<div class="description mojo-com-entity-large--row--description">' + Mojo.utils.locale('ui', 'Introduction') + ':<br>' + this.data.description + '</div>').appendTo(this._row1);
            }
            this._skills = $('<div class="row skills"></div>').hide().appendTo(this.element());
            if (this._options.showSkill) {
                this._skills.show();
            }
            this._row1.find('.picture').append('<img src="' + this.data.large_image + '" class="mojo-com-entity-large--row--img">').append('<div class="border"></div>').append('<div class="name mojo-com-entity-large--row--picture--name">' + this.data.name + '</div>').append('<div class="type"></div>').append('<div class="attributes mojo-com-entity-large--row--picture--attributes"></div>');
            this._row1.find('.picture > .name').addClass('rebirth-' + (this.data.rebirth_sum > 6 ? 6 : this.data.rebirth_sum));
        },
        _addAttributes: function () {
            if (parseInt(this.data.type_id) != 7 && parseInt(this.data.type_id) != 8 && parseInt(this.data.type_id) != 22 && this.data.level > 0) {
                this._row1.find('.attributes').append((this._xpProgress = new Mojo.ui.Progress(undefined, {
                    value: this.data.xp,
                    max: this.data.next_xp,
                    labelTemplate: '',
                    classes: ['mojo-com-entity-large--row--picture--attributes--mojo-ui-progress'],
                })).element()).append('<div class="level mojo-com-entity-large--row--picture--attributes--level">' + this.data.level + '</div>');
            }
            this._effects = $('<div class="effects mojo-com-entity-large--row--picture--attributes--effects"></div>').appendTo(this._row1.find('.attributes'));
            this.data.attack_max = parseInt(this.data.attack_max);
            this.data.attack_min = parseInt(this.data.attack_min);
            this.data.defence_max = parseInt(this.data.defence_max);
            this.data.defence_min = parseInt(this.data.defence_min);
            if (Mojo.utils.isWhat(this.data.type_id, "general")) {
                if (this.data.attack_max > 0) {
                    if (this.data.attack_max < this.data.attack_min) this.data.attack_max = this.data.attack_min;
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-attack', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.attack_min + '-' + this.data.attack_max,
                    })).element());
                }
                if (this.data.defence_max > 0) {
                    if (this.data.defence_max < this.data.defence_min) this.data.defence_max = this.data.defence_min;
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-defence', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.defence_min + '-' + this.data.defence_max,
                    })).element());
                }
            } else {
                if (this.data.attack_max > 0) {
                    if (this.data.attack_max < this.data.attack_min) this.data.attack_max = this.data.attack_min;
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-attack', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.attack_min + '-' + this.data.attack_max,
                    })).element());
                }
                if (this.data.defence_max > 0) {
                    if (this.data.defence_max < this.data.defence_min) this.data.defence_max = this.data.defence_min;
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-defence', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.defence_min + '-' + this.data.defence_max,
                    })).element());
                }
                if (this.data.xp_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-xp', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.xp_percent + '%',
                    })).element());
                }
                if (this.data.ep_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-ep', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.ep_percent + '%',
                    })).element());
                }
                if (this.data.sp_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-sp', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.sp_percent + '%',
                    })).element());
                }
                if (this.data.vm_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-vm', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.vm_percent + '%',
                    })).element());
                }
                if (this.data.max_attack_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-max-attack-percent', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.max_attack_percent + '%',
                    })).element());
                }
                if (this.data.max_defence_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-max-defence-percent', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.max_defence_percent + '%',
                    })).element());
                }
                if (this.data.attack_max_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-attack-max-percent', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.attack_max_percent + '%',
                    })).element());
                }
                if (this.data.attack_min_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-attack-min-percent', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.attack_min_percent + '%',
                    })).element());
                }
                if (this.data.defence_max_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-defence-max-percent', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.defence_max_percent + '%',
                    })).element());
                }
                if (this.data.defence_min_percent > 0) {
                    this._effects.append((new Mojo.ui.Label(undefined, {
                        classes: ['effect-defence-min-percent', 'mojo-com-entity-large--row--picture--attributes--mojo-ui-label'],
                        text: this.data.defence_min_percent + '%',
                    })).element());
                }
            }
        },
        _refresh: function () {
            if (parseInt(this.data.type_id) === 7 || parseInt(this.data.type_id) === 8 || parseInt(this.data.type_id) === 22) {
                this._row1.find('.picture').addClass('bg-level-other').addClass('mojo-com-entity-large--row--picture');
            } else {
                this._row1.find('.picture').addClass('bg-level-' + (parseInt((this.data.level - 1) / 10) + 1)).addClass('mojo-com-entity-large--row--picture');
            }
            this._row1.find('.picture > .rarity').addClass('star-rarity-' + this.data.rarity_id);
            this._row1.find('.picture > .border').addClass('border-rarity-' + (this.data.rarity_id ? this.data.rarity_id : "other")).addClass("mojo-com-entity-large--row--picture--border");
            if (this.data.group_id_1) {
                this._row1.find('.picture > .type').addClass('type-gp-' + this.data.group_id_1).addClass('type-gp-' + this.data.group_id_1 + '-' + Mojo.app.data.userLanguage).addClass("mojo-com-entity-large--row--picture--type").addClass("mojo-com-entity-large--row--picture--type" + '-' + Mojo.app.data.userLanguage);
            } else {
                var typeid = this.data.type_id;
                if (parseInt(typeid) === 22)
                    typeid = 7;
                this._row1.find('.picture > .type').addClass('type-' + typeid).addClass("mojo-com-entity-large--row--picture--type").addClass("mojo-com-entity-large--row--picture--type" + '-' + Mojo.app.data.userLanguage);
            }
            if (Mojo.utils.isWhat(this.data.type_id, "minis")) {
                var minisFlag = $('<div></div>').addClass("minis-flag").addClass("minis-flag" + '-' + Mojo.app.data.userLanguage).appendTo(this._row1.find(".picture"));
                if (Mojo.utils.isWhat(this.data.entity_type_id, "general")) {
                    minisFlag.addClass('minis-flag-type-gp-' + this.data.entity_group_id).addClass('minis-flag-type-gp-' + this.data.entity_group_id + '-' + Mojo.app.data.userLanguage).show();
                } else {
                    minisFlag.addClass('minis-flag-type-' + this.data.entity_type_id).addClass('minis-flag-type-' + this.data.entity_type_id + '-' + Mojo.app.data.userLanguage).show();
                }
            }
            this._addAttributes();
            if (this._options.showSkill && this.data.skills) {
                var skills = "";
                for (var sid in this.data.skills) {
                    var skill = this.data.skills[sid];
                    skills += '<div class="paragraph">' + skill.description + '</div>';
                }
                this._skills.html(skills);
            }
            if (Mojo.utils.isWhat(this.data.type_id, "mounts") || Mojo.utils.isWhat(this.data.type_id, "treasure")) {
                this._setEntityEffectText();
            }
            this.refresh();
        },
        refresh: function () {
            if (typeof this.data == 'object') {
                if (this.data.is_max_level == 1) {
                    this._xpProgress.value(0);
                }
            }
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                pid: "",
                eid: "",
                rebirthCount: 0,
                callback: undefined,
                showSkill: false,
                showDescription: true,
                showEntityEffect: true
            });
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.Marquee = w.Mojo.Object.extend({
        clsname: function () {
            return "com.Marquee";
        },
        init: function (data, options) {
            this._data = data;
            this._super(undefined, options);
            this._handle = undefined;
            this.element().addClass("mojo-com-marquee");
            this._refresh();
        },
        _refresh: function () {
            var self = this;
            this.element().css({
                position: "relative",
                left: this._options.left,
                top: this._options.top,
                width: this._options.width,
                height: this._options.height,
                overflow: "hidden"
            });
            if (Mojo.utils.isNone(this._data)) {
                return;
            }
            this._data.push(this._data[0]);
            this._marqueeCount = ((Array.isArray(this._data) ? this._data.length : 0));
            this._marqueeLoadCount = 0;
            this._marqueeIndex = 0;
            this.element().children().remove();
            $('<div></div>').addClass("mojo-com-marquee-slider").css({
                "height": 0,
                "margin-top": 0
            }).appendTo(this.element());
            $.each(this._data, function (i, d) {
                var marqueeElement = $('<div class="marquee-element">\
                    <div class="marquee-element-image">\
                        <img class="marquee-element-image-url" />\
                    </div>\
                </div>').attr({
                    id: "marquee-element-" + i
                });
                var img = d.image;
                if (img && Mojo.app.data.userLanguage == 'zh_tw') {
                    var a = img.indexOf('.');
                    img = img.substring(0, a) + '-zh_tw' + img.substring(a);
                }
                marqueeElement.find(".marquee-element-image > .marquee-element-image-url").bind("load", function () {
                    self._marqueeLoadCount += 1;
                    if (self._marqueeLoadCount >= self._marqueeCount) {
                        self._start();
                    }
                }).attr({
                    src: img
                });
                marqueeElement.appendTo(self.element());
            });
        },
        _start: function () {
            var self = this;
            clearTimeout(this._handle);
            this._handle = setTimeout(function () {
                self.element().find(".mojo-com-marquee-slider").css({
                    height: -1 * (self._options.height * (self._marqueeIndex + 1))
                });
                self._marqueeIndex += 1;
                self.element().find(".mojo-com-marquee-slider").animate({
                    "margin-top": -1 * self._options.height * self._marqueeIndex
                }, undefined, function () {
                    if (self._marqueeIndex >= self._marqueeCount - 1) {
                        self._marqueeIndex = 0;
                        self.element().find(".mojo-com-marquee-slider").css({
                            "margin-top": 0
                        });
                    }
                    self._start();
                });
            }, this._options.speed);
        },
        _getDefaultOptions: function () {
            var self = this;
            return {
                speed: 3000,
                left: 0,
                top: 0,
                width: self.getR("width"),
                height: self.getR("height")
            };
        }
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.SignIn = w.Mojo.ui.Dialog.extend({
        init: function (data, options) {
            this._data = data;
            this._super(undefined, options);
            this.element().addClass('mojo-com-signin');
            this._initContent();
            this._addButtons();
        },
        _initContent: function () {
            var self = this;
            var _awards = $('<div class="awards"></div>');
            _awards.appendTo(this._content);
            for (var i = 0; i < self._data.awards.length; i++) {
                var _card = $('<div class="card image"></div>');
                _awards.append(_card);
                var se = this._setCard(self._data.awards[i], _card, self._data.awards[i].entity_id);
                if (self._data.awards[i].status == 0) {
                    _card.addClass('signin-shade');
                } else if (self._data.awards[i].status == 2) {
                    _card.append('<div class="got-signin-flag"> </div>');
                }
                var acount = self._data.awards[i].count;
                if (self._data.awards[i].type == 'niudan')
                    acount = '';
                _card.append('<div class="award-count">' + acount + '</div>');
                if (self._data.awards[i].type == 'niudan') {
                    if (parseInt(self._data.awards[i].rarity_id + "") == 3)
                        _card.append('<div class="rarity-3"></div>');
                    if (parseInt(self._data.awards[i].rarity_id + "") == 2)
                        _card.append('<div class="rarity-2"></div>');
                }
                var text = self._data.awards[i].index;
                _card.append('<div class="day-num">' + text + '</div>');
                if (self._data.awards[i].status == 0) {
                    $('<div class="shade"></div>').data(self._data.awards[i]).bind('click', function () {
                        self._smallEntityClick($(this).data, undefined, $(this).data('entity_id'));
                    }).appendTo(_card);
                }
            }
            var signinMsg = '';
            if (self._data.counter == self._data.key_index) {
                signinMsg = Mojo.utils.locale('signin', 'signin_msg01', {
                    days: self._data.key_index,
                    name: self._data.key_name
                });
            } else {
                signinMsg = Mojo.utils.locale('signin', 'signin_msg02', {
                    days: (self._data.key_index - self._data.counter + 1),
                    name: self._data.key_name
                });
            }
            $('<div class = "tip">' + signinMsg + '</div>').appendTo(this._content);
        },
        _addButtons: function () {
            var self = this;
            var btn = this._signBtn = new Mojo.ui.Button(undefined, {
                text: Mojo.utils.locale('signin', 'signin'),
                click: function () {
                    Mojo.ajax("/player/checkIn", {}, function (result) {
                        if (result.errorCode == 0) {
                            self._hasSignIn = true;
                            var data = result.data;
                            var type = data.award.type;
                            var afterSignFunc = function () {
                                self._options.callback(data.player);
                                self._title.html(Mojo.utils.locale('signin', 'signin-gift-title'));
                                self._content.find('.tip').remove();
                                self._content.find('.awards').remove();
                                if (data.award.is_double == true) {
                                    self.element().addClass('mojo-com-double');
                                    $('<div class = "tip">' + Mojo.utils.locale('signin', 'signin-sucess-msg-double') + '</div>').appendTo(self._content);
                                } else {
                                    $('<div class = "tip">' + Mojo.utils.locale('signin', 'signin-sucess-msg') + '</div>').appendTo(self._content);
                                }
                                if (data.award.type == 'niudan') {
                                    if (parseInt(data.award.rarity_id + "") == 3)
                                        $('<div class = "tip">' + Mojo.utils.locale('signin', 'rarity_notice') + '</div>').appendTo(self._content);
                                    if (parseInt(data.award.rarity_id + "") == 2)
                                        $('<div class = "tip">' + Mojo.utils.locale('signin', 'rarity_notice2') + '</div>').appendTo(self._content);
                                }
                                var _award = $('<div class="awards"></div>');
                                _award.appendTo(self._content);
                                var _card = $('<div class="card-gift image"></div>');
                                _card.appendTo(_award);
                                self._setCard(data.award, _card, data.award.id);
                                if (data.award.count > 1)
                                    _card.append('<div class="count">' + data.award.count + '</div>');
                                _award.append('<div class="name">' + data.award.name + '</div>');
                                btn.text(Mojo.utils.locale('common', 'close'));
                                btn.click(function () {
                                    self.close();
                                });
                                Mojo.utils.center(self.element());
                                if (self._isSign) {
                                    self._entityDlg.close();
                                }
                            };
                            if (type == "niudan") {
                                var numcounter = parseInt(self._data.counter + "");
                                setTimeout(afterSignFunc, 1000);
                            } else {
                                afterSignFunc();
                            }
                        } else {
                            self.close();
                            var errDlg = new Mojo.com.CommonDialog(undefined, {
                                title: Mojo.utils.locale('signin', 'signin fail'),
                                content: $('<div class="paragraph"></div>').html(result.errorMsg).css('text-align', 'center')
                            });
                            (new Mojo.ui.Button(undefined, {
                                text: Mojo.utils.locale('common', 'close'),
                                click: function () {
                                    errDlg.close();
                                }
                            })).element().appendTo(errDlg._footer);
                            errDlg.open();
                        }
                    }, function () {}, {
                        showWait: true
                    });
                },
            });
            this._footer.append(btn.element());
        },
        _setCard: function (item, _car, _id) {
            var self = this;
            var se = new Mojo.com.SmallEntity(item, {
                callback: function (card) {
                    _car.append(card.element());
                },
                click: function () {
                    self._smallEntityClick(item, _car, _id);
                }
            });
            return se;
        },
        _smallEntityClick: function (item, _car, _id) {
            var self = this;
            if (self._hasSignIn) return;
            Mojo.ajax("/entity/detail", {
                eid: _id
            }, function (response) {
                if (response.errorCode == 0) {
                    var entitydetailDialog = self._entityDlg = new Mojo.ui.Dialog(undefined, {
                        title: Mojo.utils.locale('props', 'props_detail_title'),
                        content: (new Mojo.com.LargeEntity(response.data)).element(),
                        close: function () {
                            self.show();
                        },
                    });
                    if (item.status == 1) {
                        (new Mojo.ui.Button(undefined, {
                            text: Mojo.utils.locale('signin', 'signin'),
                            click: function () {
                                self._isSign = true;
                                self._signBtn.element().click();
                            }
                        })).element().appendTo(entitydetailDialog._footer);
                    }
                    (new Mojo.ui.Button(undefined, {
                        text: Mojo.utils.locale('common', 'close'),
                        special: "button-big-red",
                        click: function () {
                            entitydetailDialog.close();
                        }
                    })).element().addClass("use-props").appendTo(entitydetailDialog._footer);
                    entitydetailDialog.open(true);
                    self.hide();
                }
            });
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                title: Mojo.utils.locale("signin", "signin-title"),
                canClose: false,
                callback: $.noop,
            });
        }
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.Announcement = w.Mojo.Object.extend({
        clsname: function () {
            return "com.Announcement";
        },
        init: function (data, options) {
            this._data = data;
            this._super(undefined, options);
            this.element().addClass("mojo-com-announcement, box-inner");
            this._titleDiv = $('<div></div>').addClass("annuncement-title").appendTo(this.element());
            this._contentDiv = $('<div></div>').addClass("annuncement-content").appendTo(this.element());
            this._btnDiv = $('<div></div>').addClass("annuncement-buttons").appendTo(this.element());
            this.refresh();
        },
        refresh: function (data) {
            if (data === undefined) {
                data = this._data;
            }
            this.setTitle(data);
            this.setContent(data);
            this.setImportant(data);
            this.setButtons(data);
        },
        setTitle: function (data) {
            this._titleDiv.html(data.title);
        },
        setContent: function (data) {
            this._contentDiv.html(data.content);
        },
        setImportant: function (data) {
            if (data.weights > 0) {
                this.element().addClass("important");
            } else {
                this.element().removeClass("important");
            }
        },
        setButtons: function (data) {
            if (Mojo.utils.isNone(data.btn_text) == false && Mojo.utils.isNone(data.btn_url) == false) {
                var url = data.btn_url.replace("mojo://", "");
                var str = url.substring(url.indexOf('?') + 1, url.length).split('&');
                url = url.substring(0, url.indexOf('?'));
                var obj = {};
                var j;
                for (var i = 0; str[i] != undefined; i++) {
                    j = str[i];
                    obj[j.substring(0, j.indexOf('=')).toLowerCase().replace(/(^\s*)|(\s*$)/g, "")] = j.substring(j.indexOf('=') + 1, j.length).replace(/(^\s*)|(\s*$)/g, "");
                }
                new Mojo.ui.Button(undefined, {
                    text: data.btn_text,
                    click: function () {
                        Mojo.app.redirect("/" + url, obj);
                    }
                }).element().appendTo(this._btnDiv);
            }
        }
    });
})(window, jQuery);
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.AnnouncementDlg = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.AnnouncementDlg";
        },
        init: function (options) {
            this._super("sys-announcement-dlg", options);
            this.element().addClass('mojo-com-announcementdlg');
            this._initContent();
        },
        open: function (force) {
            this._super(force);
            this._panel.resize();
        },
        _initContent: function () {
            var self = this;
            this._panel = new Mojo.ui.ListPanel('announcement-listpanel', {
                scrollable: true,
                showMore: false,
                pageSize: 20,
                loadFunc: function (count, pagesize, params) {
                    if (Mojo.utils.isNone(self._options.announcement) == false) {
                        setTimeout(function () {
                            self._panel.appendData(self._options.announcement);
                        }, 100);
                    } else {
                        Mojo.ajax("/announcement", {}, function (response) {
                            if (response && response.errorCode === 0) {
                                self._panel.appendData(response.data);
                            } else {
                                self._panel.appendData(null);
                            }
                        }, function () {
                            self._panel.appendData(null);
                        });
                    }
                },
                drawFunc: function (data) {
                    return (new Mojo.com.Announcement(data));
                }
            });
            this._panel.element().appendTo(this._content);
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                title: Mojo.utils.locale("home", "announcement_title"),
                announcement: undefined
            });
        }
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.WeiboPublishDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.WeiboPublishDialog";
        },
        init: function (data, options) {
            this._data = data;
            this._super(undefined, options);
            this.element().addClass('mojo-com-weibopublishdlg');
            this._addContent();
            this._addHandleButtons();
        },
        _addContent: function () {
            var self = this;
            var text = self._options.hintText;
            var lengthLimit = self._options.maxlength;
            if (self._options.appendix != '') {
                lengthLimit = lengthLimit - parseInt(self._options.appendix.length) - 1;
            }
            var lengthDisplay = lengthLimit;
            if (self._options.defaultText != '') {
                text = self._options.defaultText;
                lengthDisplay = lengthDisplay - parseInt(self._options.defaultText.length);
            }
            var paragraph = $("<div class='paragraph'></div>").appendTo(this._content);
            self._bonus = $('<div class="bonus"></div>').html(Mojo.utils.locale('weibo', 'weibo bonus')).appendTo(paragraph);
            self._tip = $('<div class="words-tip"></div>').html(lengthDisplay).appendTo(paragraph);
            self._border = $('<div class="border"></div>').appendTo(paragraph);
            self._content = $('<form name="form" method="post" action=""><textarea name="textarea" maxlength="' + lengthLimit + '" id="message-content" cols="45" rows="5">' + text + '</textarea></form>').appendTo(self._border);
            self._textarea = this._content.find('textarea').focus(function () {
                if (this.value == self._options.hintText) {
                    this.value = '';
                }
            });
            self._textarea.bind("input propertychange", function () {
                var maxLength = $(this).attr('maxlength');
                var v = $(this).val().length;
                if (v <= maxLength) {
                    self._tip.html(maxLength - v);
                    return true;
                } else {
                    $(this).val($(this).val().substring(0, maxLength));
                    return false;
                }
            });
        },
        _addHandleButtons: function () {
            var self = this;
            self._sendBtn = new Mojo.ui.Button(undefined, {
                special: 'button-big-red',
                text: Mojo.utils.locale('ui', 'Send'),
                click: function () {
                    self._sendBtn.disable(true);
                    var message = $("#message-content").val();
                    if (message == self._options.hintText) {
                        message = '';
                    }
                    if (self._options.appendix != '') {
                        message = message + ' ' + self._options.appendix;
                    }
                    if (Mojo.utils.trim(message) == '') {
                        Mojo.app.toast.show(Mojo.utils.locale('weibo', 'Please input weibo content'));
                        self._sendBtn.disable(false);
                        return;
                    }
                    Mojo.app.weibo.statusesUpdate({
                        access_token: self._data.access_token,
                        status: message,
                        errorFunc: function () {
                            Mojo.app.toast.show(Mojo.utils.locale('weibo', 'Send Success'));
                            self.close();
                            Mojo.ajax('/player/weiboPublish', {}, function (result) {
                                Mojo.app.refreshCurrentProfile();
                                self.afterPublish();
                            });
                        },
                        successFunc: function () {
                            Mojo.app.toast.show(Mojo.utils.locale('weibo', 'Send Success'));
                            self.close();
                            Mojo.ajax('/player/weiboPublish', {}, function (result) {
                                Mojo.app.refreshCurrentProfile();
                                self.afterPublish();
                            });
                        },
                        failedFunc: function () {
                            self.close();
                            Mojo.ajax('/player/weiboPublish', {}, function (result) {
                                self.afterPublish();
                            });
                        },
                    });
                },
            });
            this._footer.append(self._sendBtn.element());
            this._footer.append((new Mojo.ui.Button(undefined, {
                text: Mojo.utils.locale('common', 'close'),
                click: function () {
                    self.close();
                    self.afterPublish();
                },
            })).element());
        },
        afterPublish: function () {},
        close: function () {
            this._super();
            window.scrollTo(0);
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                title: Mojo.utils.locale('weibo', 'Send weibo'),
                maxlength: 140,
                hintText: Mojo.utils.locale('weibo', 'Please input weibo content'),
                defaultText: '',
                appendix: '',
                zIndex: 1100,
            });
        },
    });
})(window, jQuery);
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.FacebookFeedDialog = w.Mojo.ui.Dialog.extend({
        init: function (data, options) {
            this._data = data;
            this._super(undefined, options);
            this.element().addClass('mojo-com-facebookfeeddlg');
            this._addContent();
            this._addHandleButtons();
        },
        _addContent: function () {
            var self = this;
            var text = self._options.hintText;
            if (self._options.defaultText != '') {
                text = self._options.defaultText;
            }
            self._bonus = $('<div class="bonus"></div>').html(Mojo.utils.locale('facebook', 'weibo bonus')).appendTo(this._content);
            self._border = $('<div class="border"></div>').appendTo(this._content);
            self._content = $('<form name="form" method="post" action=""><textarea name="textarea" ' + '" id="message-content" cols="45" rows="5">' + text + '</textarea></form>').appendTo(self._border);
            self._textarea = this._content.find('textarea').focus(function () {
                if (this.value == self._options.hintText) {
                    this.value = '';
                }
            });
        },
        _addHandleButtons: function () {
            var self = this;
            self._sendBtn = new Mojo.ui.Button(undefined, {
                special: 'button-big-red',
                text: Mojo.utils.locale('ui', 'Send'),
                click: function () {
                    self._sendBtn.disable(true);
                    var message = $("#message-content").val();
                    if (message == self._options.hintText) {
                        message = '';
                    }
                    var linkUrl = "";
                    if (self._options.appendix != '') {
                        linkUrl = self._options.appendix;
                    }
                    if (Mojo.utils.trim(message) == '') {
                        Mojo.app.toast.show(Mojo.utils.locale('facebook', 'Please input weibo content'));
                        self._sendBtn.disable(false);
                        return;
                    }
                    var params = {
                        caption: self._options.defaultTitle,
                        name: self._options.defaultTitle,
                        picture: self._getImgurl(),
                        link: linkUrl,
                        description: self._options.defaultText,
                        access_token: self._data.access_token,
                        actions: [{
                            name: 'go to sanguo',
                            link: linkUrl
                        }],
                    };
                    FB.api('/me/feed', 'post', params, function (response) {
                        if (response && response.id) {
                            Mojo.ajax('/player/weiboPublish', {}, function (result) {
                                Mojo.app.refreshCurrentProfile();
                            });
                        } else {}
                        self.close();
                    });
                },
            });
            this._footer.append(self._sendBtn.element());
            this._footer.append((new Mojo.ui.Button(undefined, {
                text: Mojo.utils.locale('common', 'close'),
                click: function () {
                    self.close();
                    self.afterPublish();
                },
            })).element());
        },
        afterPublish: function () {},
        _getImgurl: function () {
            var loc = location.href;
            var a = loc.indexOf('/mojo');
            var b = loc.substring(0, a);
            var url = b + '/mojo/resources/classic/mobile/image/ui/icon.jpg';
            if (Mojo.app.data.userLanguage == 'zh_tw') {
                url = b + '/mojo/resources/classic/mobile/image/ui/icon-tw.jpg';
            }
            return url;
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                title: Mojo.utils.locale('facebook', 'Send weibo'),
                hintText: Mojo.utils.locale('facebook', 'Please input feed content'),
                defaultTitle: '',
                defaultText: '',
                appendix: '',
                zIndex: 1100,
            });
        },
        debugable: function () {
            return Mojo.utils.debug.vars.com.weibopublishdlg;
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.WeiboExpireDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.WeiboExpireDialog";
        },
        init: function (options) {
            this._super(undefined, options);
            this.element().addClass('mojo-com-weiboexpiredlg');
            this._addContent();
            this._addHandleButtons();
        },
        _addContent: function () {
            var self = this;
            self._message = $('<div class="paragraph"></div>').html(Mojo.utils.locale('weibo', 'expire message')).appendTo(this._content);
        },
        _addHandleButtons: function () {
            var self = this;
            this._footer.append((new Mojo.ui.Button('login-btn', {
                special: 'button-big-red',
                text: Mojo.utils.locale('weibo', 'go login'),
                click: function () {
                    Mojo.app.redirect('/settings', {
                        selected: 1
                    }, 'event', '04_056');
                    self.close();
                },
            })).element());
            this._footer.append((new Mojo.ui.Button('close-btn', {
                text: Mojo.utils.locale('common', 'close'),
                click: function () {
                    self.close();
                },
            })).element());
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                title: Mojo.utils.locale('weibo', 'Your weibo account has expired!'),
                zIndex: 1100,
            });
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.WeiboBindDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.WeiboBindDialog";
        },
        init: function (options) {
            this._super(undefined, options);
            this.element().addClass('mojo-com-weibobinddlg');
            this._addContent();
            this._addHandleButtons();
        },
        _addContent: function () {
            var self = this;
            self._message = $('<div class="paragraph"></div>').html(Mojo.utils.locale('weibo', 'bind message')).appendTo(this._content);
        },
        _addHandleButtons: function () {
            var self = this;
            this._footer.append((new Mojo.ui.Button('bind-btn', {
                special: 'button-big-red',
                text: Mojo.utils.locale('weibo', 'go bind'),
                click: function () {
                    Mojo.app.redirect('/settings', {
                        selected: 1
                    }, 'event', '04_056');
                    self.close();
                },
            })).element());
            this._footer.append((new Mojo.ui.Button('close-btn', {
                text: Mojo.utils.locale('common', 'close'),
                click: function () {
                    self.close();
                },
            })).element());
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                title: Mojo.utils.locale('weibo', 'bind title'),
                zIndex: 1100,
            });
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.FacebookExpireDialog = w.Mojo.ui.Dialog.extend({
        init: function (options) {
            this._super(undefined, options);
            this.element().addClass('mojo-com-facebookexpiredlg');
            this._addContent();
            this._addHandleButtons();
        },
        _addContent: function () {
            var self = this;
            this._message = $('<div class="paragraph"></div>').html(self.locale('expire message')).appendTo(this._content);
        },
        _addHandleButtons: function () {
            var self = this;
            this._footer.append((new Mojo.ui.Button('login-btn', {
                special: 'button-big-red',
                text: self.locale('go login'),
                click: function () {
                    Mojo.app.redirect('/settings', {
                        selected: 1
                    }, 'event', '04_056');
                    self.close();
                },
            })).element());
            this._footer.append((new Mojo.ui.Button('close-btn', {
                text: Mojo.utils.locale('common', 'close'),
                click: function () {
                    self.close();
                },
            })).element());
        },
        _getDefaultOptions: function () {
            var self = this;
            return $.extend(true, this._super(), {
                title: self.locale('Your weibo account has expired!'),
                zIndex: 1100,
            });
        },
        localeCat: function () {
            return 'facebook';
        },
        debugable: function () {
            return Mojo.utils.debug.vars.com.facebookexpiredlg;
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.FacebookBindDialog = w.Mojo.ui.Dialog.extend({
        init: function (options) {
            this._super(undefined, options);
            this.element().addClass('mojo-com-facebookbinddlg');
            this._addContent();
            this._addHandleButtons();
        },
        _addContent: function () {
            var self = this;
            this._message = $('<div class="paragraph"></div>').html(self.locale('bind message')).appendTo(this._content);
        },
        _addHandleButtons: function () {
            var self = this;
            this._footer.append((new Mojo.ui.Button('bind-btn', {
                special: 'button-big-red',
                text: self.locale('go bind'),
                click: function () {
                    Mojo.app.redirect('/settings', {
                        selected: 1
                    }, 'event', '04_056');
                    self.close();
                },
            })).element());
            this._footer.append((new Mojo.ui.Button('close-btn', {
                text: Mojo.utils.locale('common', 'close'),
                click: function () {
                    self.close();
                },
            })).element());
        },
        _getDefaultOptions: function () {
            var self = this;
            return $.extend(true, this._super(), {
                title: self.locale('bind title'),
                zIndex: 1100,
            });
        },
        localeCat: function () {
            return 'facebook';
        },
        debugable: function () {
            return Mojo.utils.debug.vars.com.facebookbinddlg;
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.PlatformButton = w.Mojo.ui.Button.extend({
        init: function (event, options) {
            this._super(undefined, options);
            this._event = event;
            this.element().addClass('mojo-com-platformbtn');
            this._initData();
            this._addContent();
        },
        _initData: function () {
            var self = this;
            if (self._event != undefined && self._event != null) {
                for (var index in self._event) {
                    if (self._event[index].name == 'weibo.create' || self._event[index].name == 'facebook.create') {
                        self._options.access_token = self._event[index].data.access_token;
                        self._options.defaultText = self._event[index].data.content;
                        self._options.expire = self._event[index].expire;
                        self._options.appendix = self._event[index].data.download_url;
                        self._options.defaultTitle = self._event[index].data.title;
                    }
                }
            }
        },
        _addContent: function () {
            var self = this;
            self._platform = Mojo.app.getPlatform();
            if (Mojo.app.getPlatform() == 'facebook')
                self.element().find('.icon').addClass('fb');
            var txt = (self._platform == 'sina' ? Mojo.utils.locale('weibo', 'Send weibo') : Mojo.utils.locale('facebook', 'Send weibo'));
            self.text(txt);
            var weibocontent = self._options.defaultText || self._options.content;
            var weibotitle = self._options.defaultTitle || self._options.title;
            var appendixtxt = self._options.appendix || self._options.download_url;
            self.click(function () {
                self._options.btnClick();
                Mojo.ajax('/player/weiboToken', {}, function (response) {
                    if (response.errorCode == 0) {
                        var access_token = '';
                        if (response.data) {
                            access_token = response.data.token;
                        }
                        if (access_token != null && access_token != '') {
                            if (self._options.expire == 1) {
                                if (self._platform == 'facebook') {
                                    (new Mojo.com.FacebookExpireDialog()).open(true);
                                } else {
                                    (new Mojo.com.WeiboExpireDialog()).open(true);
                                }
                            } else {
                                if (self._platform == 'facebook') {
                                    (new Mojo.com.FacebookFeedDialog({
                                        access_token: access_token
                                    }, {
                                        defaultText: weibocontent,
                                        appendix: appendixtxt,
                                        defaultTitle: weibotitle
                                    })).open(true);
                                } else {
                                    (new Mojo.com.WeiboPublishDialog({
                                        access_token: access_token
                                    }, {
                                        defaultText: weibocontent,
                                        appendix: appendixtxt
                                    })).open(true);
                                }
                            }
                        } else {
                            if (self._platform == 'facebook') {
                                (new Mojo.com.FacebookBindDialog()).open(true);
                            } else {
                                (new Mojo.com.WeiboBindDialog({
                                    showGoBindDialog: self._options.showGoBindDialog
                                })).open(true);
                            }
                        }
                    }
                }, function () {}, {
                    showWait: true
                });
            });
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                text: '',
                special: 'button-big-red',
                btnClick: $.noop,
                icon: Mojo.app.getPlatform() == 'facebook',
                textWrap: Mojo.app.getPlatform() == 'facebook'
            });
        },
        debugable: function () {
            return Mojo.utils.debug.vars.com.platformbtn;
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.Tutorial = Mojo.Object.extend({
        clsname: function () {
            return "com.Tutorial";
        },
        init: function (data, options) {
            this._data = data;
            this._super(undefined, options);
            var self = this;
            this._navigation = {
                "home": {
                    index: 0,
                    left: self.getR("home_left")
                },
                "mission": {
                    index: 1,
                    left: self.getR("mission_left")
                },
                "rob": {
                    index: 2,
                    left: self.getR("rob_left")
                },
                "battle": {
                    index: 3,
                    left: self.getR("battle_left")
                },
                "friend": {
                    index: 4,
                    left: self.getR("friend_left")
                },
                "mall": {
                    index: 5,
                    left: self.getR("mall_left")
                },
                _length: 6
            };
            this.element().addClass('mojo-com-tutorial').css({
                width: $(document).width(),
                height: $(document).height()
            });
        },
        _getDefaultOptions: function () {
            var self = this;
            return {
                arrowwidth: self.getR("arrowwidth"),
                arrowheight: self.getR("arrowheight"),
                click: undefined,
                tutorial: undefined,
                text: "",
                textposition: "lt",
                tutotialTextClass: "tutorial-text",
                arrowoffset: [0, 0]
            };
        },
        _createShadow: function (left, top, width, height) {
            $('<div></div>').addClass('shadow').css({
                left: left,
                top: top,
                width: width,
                height: height,
            }).appendTo(this.element());
        },
        _createText: function (text) {
            if (text) {
                this._options.text = text;
            }
            var tutorialTextDiv = $('<div></div>').addClass(this._options.tutotialTextClass).addClass(this._options.textposition);
            $('<div></div>').addClass('arrow').appendTo(tutorialTextDiv);
            $('<div></div>').addClass('text').html(this._options.text).appendTo(tutorialTextDiv);
            tutorialTextDiv.appendTo(this.element());
        },
        _createTutorial: function (left, top, width, height) {
            var dwidth = $(document).width();
            var dheight = $(document).height();
            var tutorial = $('<div></div>').addClass('tutorial').css({
                left: left,
                top: top,
                width: width,
                height: height
            }).appendTo(this.element());
            var self = this;
            tutorial.bind('click', function () {
                if (self._options.click instanceof Function) {
                    self._options.click(self);
                }
            });
            var atop = 0;
            var aleft = 0;
            var up = false;
            if (top > this._options.arrowheight) {
                atop = top - this._options.arrowheight;
                aleft = left + (width / 2) - (this._options.arrowwidth / 2);
            } else if (dheight - top - height > this._options.arrowheight) {
                atop = top + height;
                aleft = left + (width / 2) - (this._options.arrowwidth / 2);
                up = true;
            }
            this._createArrow(aleft, atop, up);
        },
        _createArrow: function (left, top, up, event) {
            var arrow = $('<div></div>').addClass('tutorial-arrow').addClass((up === true ? 'tutorial-arrow-up' : 'tutorial-arrow-down')).css({
                width: this._options.arrowwidth,
                height: this._options.arrowheight,
                top: top + this._options.arrowoffset[0],
                left: left + this._options.arrowoffset[1],
            }).appendTo(this.element());
            var offset = (up === true ? '+' : '-');
            this._animateArrow(arrow, offset);
            if (event === true) {
                var self = this;
                arrow.bind('click', function () {
                    if (self._options.click instanceof Function) {
                        self._options.click(self);
                    }
                });
            }
        },
        _animateArrow: function (arrow, offset) {
            var self = this;
            arrow.animate({
                top: offset + "=20px"
            }, 400, undefined, function () {
                offset = offset == "+" ? "-" : "+";
                self._animateArrow($(this), offset);
            });
        },
        open: function (left, top, width, height) {
            if (left instanceof jQuery) {
                var dom = left;
                left = dom.offset().left;
                top = dom.offset().top;
                width = dom.outerWidth();
                height = dom.outerHeight();
            }
            var dwidth = $(document).width();
            var dheight = $(document).height();
            if (left === undefined) {
                this._createShadow(0, 0, dwidth, dheight);
            } else if (typeof (left) == 'string') {
                this._createShadow(0, 0, dwidth, dheight);
                this._options.tutorial = left;
            } else {
                if (top > 0) {
                    this._createShadow(0, 0, dwidth, top);
                }
                if (left > 0) {
                    this._createShadow(0, top, left, height);
                }
                if ((left + width) < dwidth) {
                    this._createShadow((left + width), top, (dwidth - left - width), height);
                }
                if ((top + height) < dheight) {
                    this._createShadow(0, (top + height), dwidth, (dheight - top - height));
                }
            }
            var menuIndex = 0;
            if (this._options.tutorial instanceof jQuery) {
                var tleft = this._options.tutorial.offset().left;
                var ttop = this._options.tutorial.offset().top;
                var twidth = this._options.tutorial.outerWidth();
                var theight = this._options.tutorial.outerHeight();
                this._createTutorial(tleft, ttop, twidth, theight);
            } else if (this._options.tutorial instanceof Array && this._options.tutorial.length >= 4) {
                this._createTutorial(this._options.tutorial[0], this._options.tutorial[1], this._options.tutorial[2], this._options.tutorial[3]);
            } else if (typeof (this._options.tutorial) == 'string') {
                var nwidth = dwidth / (this._navigation._length);
                var nav = this._navigation[this._options.tutorial];
                if (nav) {
                    this._createArrow((nav.left - (this._options.arrowwidth / 2)), (dheight - this._options.arrowheight), false, true);
                    menuIndex = nav.index + 1;
                }
            } else {
                this._createTutorial(left, top, width, height);
            }
            this._createText();
            Mojo.gap.highlightMenuItem(menuIndex);
            $(document.body).find(".mojo-com-tutorial").remove();
            this.element().appendTo($(document.body));
            Mojo.app.tutorial = this;
            return this;
        },
        close: function (closeNative) {
            this.element().remove();
            if (closeNative === true) {
                Mojo.gap.highlightMenuItem(-1);
                Mojo.app.tutorial = undefined;
            } else {
                Mojo.gap.highlightMenuItem(0);
                Mojo.app.tutorial = "__NAV__";
            }
        },
        done: function () {
            var self = this;
            if (self._options.click instanceof Function) {
                self._options.click(self);
            }
        }
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.BaseSlotList = w.Mojo.Object.extend({
        clsname: function () {
            return "com.BaseSlotList";
        },
        init: function (options) {
            this._super('com-baseslot-list', options);
            this._hasLoaded = false;
            this._baseSlots = {};
            this._lastSelected = undefined;
            this._scrollDistX = 0;
            this._max_army = 1;
            var self = this;
            var params = (this._options.isMine ? {} : {
                pid: this._options.friendId
            });
            this._list = new Mojo.ui.ListPanel(undefined, {
                pageSize: 20,
                showMore: false,
                loadFunc: function (start, count, packageId) {
                    Mojo.ajax('/embed/simple', params, function (result) {
                        self._max_army = result.data.max_army;
                        if (result.errorCode == 0) {
                            if (result.data.base_slots.length < 4) {
                                for (; result.data.base_slots.length < 4;) {
                                    result.data.base_slots.push(undefined);
                                }
                            } else if (self._options.isMine === true && self._options.showUnlock === true) {
                                result.data.base_slots.push(undefined);
                            }
                            self._list.element().width(result.data.base_slots.length * self._options.unitWidth);
                            self._list.appendData(result.data.base_slots);
                            if (result.data.player_level >= result.data.permit_change_leve) {
                                self._scroll.element().addClass('canswitch');
                                if (self.changeBtn != undefined) {
                                    self.changeBtn.element().remove();
                                }
                                self._addPackageSwitchBtn(result.data.army_id);
                            }
                            self._scroll.refresh();
                        } else {
                            self._list.appendData(null);
                        }
                    }, function () {
                        self._list.appendData(null);
                    });
                },
                drawFunc: function (data) {
                    return self._getBaseSlotEntity(data);
                },
                onLoaded: function (listpanel) {
                    if (Mojo.utils.getSomething("selected")) {
                        self.selector(parseInt(Mojo.utils.getSomething("selected")));
                    }
                    if (self._hasLoaded === false && self._options.onLoaded instanceof Function) {
                        self._options.onLoaded(self);
                    }
                    self._hasLoaded = true;
                }
            });
            this._scroll = new Mojo.ui.Scroll(undefined, this._list, {
                direction: 1,
                classes: ['all-small-card-border'],
                showArrow: true,
                step: self._options.unitWidth,
            });
            this.element().append(this._scroll.element());
        },
        _addPackageSwitchBtn: function (current) {
            var self = this;
            if (self._options.isMine && self._options.showSwitch) {
                self.changeBtn = new Mojo.ui.Button(undefined, {
                    text: self.getL('package', 'package_switch'),
                    special: 'changePackage-btn',
                    click: function () {
                        self._showPackageSwitchDialog(current);
                    }
                });
                self.changeBtn.element().appendTo(this.element());
            }
        },
        _showPackageSwitchDialog: function (current) {
            current = parseInt(current);
            var self = this;
            var content = $('<div class="paragraph"></div>');
            var pName = self.getL('package', 'package_num' + current);
            $('<div class="package_tip"></div>').html(self.getL('package', 'package_using', {
                packageName: pName
            })).appendTo(content);
            for (var i = 1; i <= self._max_army; i++) {
                new Mojo.ui.Button(undefined, {
                    text: self.getL('package', 'package_num' + i),
                    special: current == i ? "current" : "",
                    click: (function (i, c) {
                        return function () {
                            if (i != c) {
                                self._switchPackage(i);
                            } else {
                                Mojo.app.toast.show(Mojo.utils.locale('package', 'has_mount'));
                            }
                        };
                    })(i, current)
                }).element().appendTo(content);
            }
            self.dlg = new Mojo.ui.Dialog(undefined, {
                classes: ["change-package"],
                title: self.getL('package', 'package_switch1'),
                content: content
            });
            self.dlg.open();
        },
        _switchPackage: function (index) {
            var self = this;
            Mojo.ajax('/embed/ChangeArmy', {
                army_id: index
            }, function (response) {
                if (response.errorCode == 0) {
                    self.reLoad();
                    self.dlg.close();
                    self._options.onPackageChange();
                } else {
                    self.dlg.close();
                    Mojo.app.toast.show(response.errorMsg);
                }
            }, function () {});
        },
        reLoad: function (index) {
            this._list.element().find(".mojo-com-baseslotlist-element").remove();
            this._hasLoaded = false;
            this._baseSlots = {};
            this._lastSelected = undefined;
            this._scrollDistX = 0;
            this._list._load();
        },
        refreshAll: function (data) {
            if (Array.isArray(data.list)) {
                var self = this;
                $.each(data.list, function (i, d) {
                    var baseSlotId = "base_slot_" + d.player_base_slot_id;
                    var slotObj = self._baseSlots[baseSlotId];
                    if (slotObj instanceof Object) {
                        var selected = "";
                        if (slotObj.element().find(".card-border").hasClass("selected") || slotObj.element().find(".card-slot").hasClass("selected")) {
                            selected = "selected";
                        }
                        slotObj.element().children().remove();
                        if (d.player_entity_id == null || d.player_entity_id == "") {
                            slotObj.element().append('<div class="card-slot ' + selected + '"></div>');
                        } else {
                            slotObj.element().append('<img src="' + d.small_image + '">');
                            slotObj.element().append('<div class="card-border ' + selected + '"></div>');
                        }
                        if (selected == "selected") {
                            slotObj.element().find('img').addClass('img-class');
                        }
                    }
                });
            }
        },
        _getDefaultOptions: function () {
            var self = this;
            return $.extend(this._super(), {
                unitWidth: self.getR("unitWidth"),
                onLoaded: undefined,
                onSelect: undefined,
                showUnlock: false,
                isMine: true,
                friendId: undefined,
                onPackageChange: $.noop,
                showSwitch: false
            });
        },
        _getBaseSlotEntity: function (data) {
            var obj = new Mojo.Object(undefined, {
                classes: ['mojo-com-baseslotlist-element', 'image'],
            });
            if (data == undefined) {
                obj.element().append('<div class="locked"></div>');
            } else {
                var baseSlotId = "base_slot_" + data.player_base_slot_id;
                this._baseSlots[baseSlotId] = obj;
                if (data.player_entity_id == null || data.player_entity_id == "") {
                    obj.element().append('<div class="card-slot"></div>');
                } else {
                    obj.element().append('<img src="' + data.small_image + '">');
                    obj.element().append('<div class="card-border"></div>');
                }
            }
            var self = this;
            if (this._lastSelected === undefined) {
                this._lastSelected = obj.element();
                this._lastSelected.find(".card-border").addClass("selected");
            }
            obj.element().click(function () {
                if (data == undefined) {} else if (data.player_entity_id == null) {} else {}
                self._lastSelected.find(".card-border").removeClass("selected");
                self._lastSelected.find(".card-slot").removeClass("selected");
                self._lastSelected.find("img").removeClass("img-class");
                obj.element().find(".card-border").addClass("selected");
                obj.element().find(".card-slot").addClass("selected");
                obj.element().find("img").addClass("img-class");
                self._lastSelected = obj.element();
                if (self._options.onSelect instanceof Function) {
                    self._options.onSelect(self, obj.element().index(), data);
                }
            });
            return obj;
        },
        selector: function (current) {
            var self = this;
            if (Mojo.utils.isNone(self._lastSelected) == false) {
                self._lastSelected.find(".card-border").removeClass("selected");
                self._lastSelected.find(".card-slot").removeClass("selected");
            }
            $.each(this.element().find(".mojo-com-baseslotlist-element"), function (i, e) {
                if (current == i) {
                    $(e).find(".card-border").addClass("selected");
                    $(e).find(".card-slot").addClass("selected");
                    $(e).find("img").addClass("img-class");
                    self._lastSelected = $(e);
                    var listleft = self._scroll.scrollerLeft();
                    if (self._options.unitWidth > 0) {
                        var r = i - Math.abs(listleft / self._options.unitWidth);
                        if (r > 2 || r < 0) {
                            var l = ((i - 1) * self._options.unitWidth);
                            if (self._scrollDistX != l) {
                                self._scroll.scrollTo(l, 0);
                                self._scrollDistX = l;
                            }
                        }
                    }
                }
            });
        }
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.ForceCreateDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.ForceCreateDialog";
        },
        _player: undefined,
        init: function (data, options) {
            this._player = data;
            this._super(undefined, options);
            this._paragraph = $("<div class='paragraph'></div>").appendTo(this._content);
            this._addContent();
        },
        title: function (titletext) {
            if (this._options.noTitle == false) {
                this.element().find('.title').html(titletext);
            }
        },
        _contentCantJoin: function () {
            var self = this;
            self.title(Mojo.utils.locale('common', 'tips'));
            this._paragraph.html(Mojo.utils.locale('home', 'force_join_no', {
                level: 20
            }));
            new Mojo.ui.Button("close-btn", {
                text: Mojo.utils.locale('ui', 'Close'),
                click: function () {
                    self.close();
                }
            }).element().appendTo(self._footer);
        },
        _contentCanJoin: function () {
            var self = this;
            self.title(Mojo.utils.locale('common', 'tips'));
            this._paragraph.html(Mojo.utils.locale('home', 'force_join_ok', {
                level: 50
            }));
            new Mojo.ui.Button("join-btn", {
                text: Mojo.utils.locale('home', 'join_force'),
                special: 'button-big-red',
                click: function () {
                    Mojo.app.redirect('/force/list');
                }
            }).element().appendTo(self._footer);
            new Mojo.ui.Button("close-btn", {
                text: Mojo.utils.locale('ui', 'Close'),
                click: function () {
                    self.close();
                }
            }).element().appendTo(self._footer);
        },
        _contentCanCreate: function () {
            this.element().addClass('mojo-com-forcecreatedlg');
            var self = this;
            self.title(Mojo.utils.locale('common', 'tips'));
            this._paragraph.html(Mojo.utils.locale('home', 'force_create_ok'));
            new Mojo.ui.Button("create-btn", {
                text: Mojo.utils.locale('home', 'create_force'),
                special: 'button-big-red',
                click: function () {
                    self._createForce();
                }
            }).element().appendTo(self._footer);
            new Mojo.ui.Button("join-btn", {
                text: Mojo.utils.locale('home', 'join_force'),
                click: function () {
                    Mojo.app.redirect('/force/list');
                }
            }).element().appendTo(self._footer);
        },
        _docreate: function (isPay) {
            var self = this;
            self._setValidate('');
            if (!self._isNameValid()) {
                return;
            }
            Mojo.ajax('/force/create', {
                force_name: $('#force-name').val(),
                type: isPay ? 1 : 2
            }, function (response) {
                if (response.errorCode == 0) {
                    if (isPay) {
                        Mojo.track.onEvent('24_101');
                    } else {
                        Mojo.track.onEvent('24_202');
                    }
                    self.close();
                    new Mojo.com.ForceCreateSuccDialog(response, {}).open();
                } else {
                    if (response.errorCode == 10005) {
                        self.close();
                        var failDialog = new Mojo.ui.Dialog(undefined, {
                            title: Mojo.utils.locale('home', "force_create_failed"),
                            content: $('<div class="tip">' + response.errorMsg + '</div>'),
                            zIndex: 1101
                        });
                        new Mojo.ui.Button(undefined, {
                            text: Mojo.utils.locale('common', 'go_payment'),
                            special: "button-big-red",
                            click: function () {
                                Mojo.app.redirect('/mall', {
                                    selected: 4
                                });
                            }
                        }).element().appendTo(failDialog._footer);
                        new Mojo.ui.Button(undefined, {
                            text: Mojo.utils.locale('common', 'close'),
                            click: function () {
                                failDialog.close();
                            }
                        }).element().appendTo(failDialog._footer);
                        failDialog.open();
                    } else if (response.errorCode == 60011) {
                        self.hide();
                        var failDialog = new Mojo.ui.Dialog(undefined, {
                            title: Mojo.utils.locale('home', "rebirth_not_enouph_title"),
                            content: $('<div class="tip">' + Mojo.utils.locale('home', 'rebirth_not_enouph') + '</div>'),
                            zIndex: 1101
                        });
                        new Mojo.ui.Button(undefined, {
                            text: Mojo.utils.locale('home', 'Fuben'),
                            special: "button-big-red",
                            click: function () {
                                Mojo.app.redirect('/fb', {}, 'event', '04_047');
                            }
                        }).element().appendTo(failDialog._footer);
                        new Mojo.ui.Button(undefined, {
                            text: Mojo.utils.locale('common', 'back'),
                            click: function () {
                                failDialog.close();
                                self.show();
                            }
                        }).element().appendTo(failDialog._footer);
                        failDialog.open(true);
                    } else {
                        self._setValidate(response.errorMsg);
                    }
                }
            }, function () {});
        },
        _createForce: function () {
            var self = this;
            self.title(Mojo.utils.locale('home', 'create_force'));
            self._clear();
            $("<div class='create-tip'></div>").html(Mojo.utils.locale('home', 'create_tip')).appendTo(self._paragraph);
            var input = $("<input type='text' id='force-name' maxlength='5'/>").val(Mojo.utils.locale('home', 'force_name_max')).appendTo(self._paragraph);
            input.focus(function () {
                if ($(this).val() == Mojo.utils.locale('home', 'force_name_max')) {
                    $(this).val('');
                }
            });
            $('<div class="force-validate"></div>').appendTo(self._paragraph);
            var price = $('<div class="price"></div>').appendTo(self._paragraph).html(Mojo.utils.locale('common', 'price'));
            new Mojo.ui.Label(undefined, {
                classes: ['rm'],
                text: 399
            }).element().appendTo(self._paragraph);
            var tip = $('<div class="tip"></div>').appendTo(self._paragraph).html(Mojo.utils.locale('home', 'create_use_rebirth') + "<br>" + Mojo.utils.locale('home', 'rebirth_now_have', {
                num: this._player.rp
            }));
            new Mojo.ui.Button(undefined, {
                text: Mojo.utils.locale('home', 'create_pay'),
                special: 'button-big-red',
                click: function () {
                    self._docreate(true);
                }
            }).element().appendTo(this._footer);
            new Mojo.ui.Button(undefined, {
                text: Mojo.utils.locale('home', 'create_free'),
                click: function () {
                    self._docreate(false);
                }
            }).element().appendTo(this._footer);
            Mojo.utils.center(this.element());
        },
        _setValidate: function (content) {
            var e = this.element().find('.force-validate');
            if (e) {
                e.html(content);
            }
        },
        _isNameValid: function () {
            if ($('#force-name')) {
                var val = $('#force-name').val();
                if (Mojo.utils.isNone(val.trim())) {
                    this._setValidate(Mojo.utils.locale('home', 'force_name_empty'));
                    return false;
                }
                if (val == Mojo.utils.locale('home', 'force_name_max')) {
                    this._setValidate(Mojo.utils.locale('home', 'force_name_empty1'));
                    return false;
                }
                return true;
            }
            return false;
        },
        _clear: function () {
            this._paragraph.empty();
            this._footer.empty();
        },
        _addContent: function () {
            var self = this;
            if (this._player.status == 2) {
                this._contentCantJoin();
            } else if (this._player.status == 3) {
                this._contentCanJoin();
            } else if (this._player.status == 4) {
                this._contentCanCreate();
            }
        },
        _addHandleButtons: function () {
            var self = this;
            this._footer.append((new Mojo.ui.Button(undefined, {
                special: 'button-big-red',
                text: Mojo.utils.locale('common', 'ok'),
                click: function () {
                    self.close();
                },
            })).element());
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                title: Mojo.utils.locale('common', 'tips'),
                handle: $.noop,
                zIndex: 1100
            });
        },
    });
})(window, jQuery);;;
(function (w, $) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.ForceCreateSuccDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.ForceCreateSuccDialog";
        },
        init: function (response, options) {
            this._super(undefined, options);
            this._force = response.data;
            this._event = response.event;
            this._paragraph = $("<div class='paragraph'></div>").appendTo(this._content);
            this._addContent();
            this._addButtons();
            this.closeFlag = true;
        },
        _addContent: function () {
            this._paragraph.html(Mojo.utils.locale('home', 'create_succ_tip', {
                name: this._force.name
            }));
        },
        _addButtons: function () {
            var self = this;
            var platformBtn = new Mojo.com.PlatformButton(self._event, {
                btnClick: function () {
                    this.closeFlag = false;
                    self.close();
                }
            });
            this._footer.append(platformBtn.element());
            new Mojo.ui.Button(undefined, {
                text: Mojo.utils.locale('common', 'close'),
                click: function () {
                    Mojo.app.redirect("/force");
                }
            }).element().appendTo(this._footer);
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                title: Mojo.utils.locale('home', 'create_succ'),
                handle: $.noop,
                close: function () {
                    if (this.closeFlag)
                        Mojo.app.redirect("/force");
                },
                zIndex: 1102
            });
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.CommonDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.CommonDialog";
        },
        init: function (id, options) {
            this._super(id, options);
            this.element().addClass("mojo-com-commondialog");
            this.leftButton = undefined;
            this.rightButton = undefined;
            this._addButtons();
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                leftBtnText: undefined,
                leftBtnDisabled: false,
                leftBtnClick: undefined,
                leftBtnDisabledClick: undefined,
                rightBtnText: undefined,
                rightBtnDisabled: false,
                rightBtnClick: undefined,
                rightBtnDisabledClick: undefined
            });
        },
        _addButtons: function () {
            var self = this;
            if (self._options.leftBtnText) {
                self.leftButton = new Mojo.ui.Button(undefined, {
                    text: self._options.leftBtnText,
                    disabled: self._options.leftBtnDisabled,
                    special: "button-big-red",
                    click: function () {
                        if (self._options.leftBtnClick instanceof Function) {
                            self._options.leftBtnClick(self);
                        }
                    },
                    disableClick: function () {
                        if (self._options.leftBtnDisabledClick instanceof Function) {
                            self._options.leftBtnDisabledClick(self);
                        }
                    }
                });
                self.leftButton.element().appendTo(self._footer);
            }
            if (self._options.rightBtnText) {
                self.rightButton = new Mojo.ui.Button(undefined, {
                    text: self._options.rightBtnText,
                    disabled: self._options.rightBtnDisabled,
                    click: function () {
                        if (self._options.rightBtnClick instanceof Function) {
                            self._options.rightBtnClick(self);
                        }
                    },
                    disableClick: function () {
                        if (self._options.rightBtnDisabledClick instanceof Function) {
                            self._options.rightBtnDisabledClick(self);
                        }
                    }
                });
                self.rightButton.element().appendTo(self._footer);
            }
        }
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.page = w.Mojo.page || {};
    w.Mojo.page.Home = w.Mojo.Page.extend({
        clsname: function () {
            return "page.Home";
        },
        init: function () {
            if (Mojo.utils.getSomething("needLoginStatus") == 'yes')
                Mojo.app.data.needLoginStatus = true;
            else
                Mojo.app.data.needLoginStatus = false;
            this._super('page-home', {
                baseProfile: true,
                classes: ['home']
            });
            Mojo.gap.highlightMenuItem(-1);
            if (Mojo.utils.getSomething("isNewPlayer") == 'yes') {
                Mojo.track.onEvent('02_040');
                Mojo.gap.highlightMenuItem(0);
                this._newPlayerGift();
            } else if (Mojo.utils.getSomething("isNewPlayer") == 'tutorial') {
                Mojo.track.onEvent('02_040');
                Mojo.app.tutorial = new Mojo.com.Tutorial(undefined, {
                    tutorial: "mission",
                    text: Mojo.utils.locale('tutorial', 'tutorial_start'),
                    click: function (tutorial) {
                        Mojo.app.redirect('/mission', {
                            tutorial: 'yes'
                        });
                    }
                }).open();
            }
            var self = this;
            var activity_img = $('<div class="activity-center-img"></div>').appendTo(this.element());
            activity_img.click(function () {
                Mojo.app.redirect('/activity', {
                    selected: 0
                });
            });
            this._baseSlotList = (new Mojo.com.BaseSlotList({
                classes: ['general-list-bg-border'],
                onSelect: function (that, index, data) {
                    if (data == undefined) {
                        Mojo.app.redirect('/package', {
                            selected: index
                        }, 'event', '04_032');
                    } else if (data.player_entity_id == null) {
                        Mojo.app.redirect('/package', {
                            selected: index
                        }, 'event', '04_033');
                    } else {
                        Mojo.app.redirect('/package', {
                            selected: index
                        }, 'event', '04_031');
                    }
                },
                onLoaded: function (com) {
                    if (Mojo.utils.getSomething('tutorial')) {
                        Mojo.app.tutorial = new Mojo.com.Tutorial(undefined, {
                            text: Mojo.utils.locale('tutorial', 'tutorial_package_start'),
                            textposition: 'lb',
                            click: function (tutorial) {
                                Mojo.app.redirect('/package', {
                                    selected: 1,
                                    tutorial: 5
                                });
                            }
                        }).open(com._list._children[1].element());
                    }
                }
            }));
            this._baseSlotList.element().appendTo(this.element());
            this._quickButtons = $('<div class="everyday-do"></div>').appendTo(this.element());
            this._addQuickButtons();
            this._circleButtons = $('<div class="circle-buttons task"></div>').appendTo(this.element());
            this._addCircleButtons();
            self._showMsg = "";
            setTimeout(function () {
                Mojo.gap.bindUser(Mojo.cache.get('userId'));
                Mojo.ajax('/mall/isNew', {}, function (result) {
                    if (result.errorCode == 0) {
                        if (result.data == 1) {
                            Mojo.gap.showMallIcon();
                        } else {
                            Mojo.gap.hideMallIcon();
                        }
                    } else {}
                }, function () {});
            }, 1000);
            this.rebinding();
        },
        _enterForce: function () {
            Mojo.ajax('/force/index', {}, function (response) {
                var force = response.data;
                if (force.status != 1) {
                    new Mojo.com.ForceCreateDialog(force).open();
                } else {
                    Mojo.app.redirect('/force');
                }
            }, function () {});
        },
        _getGrain: function () {
            var self = this;
            setTimeout(function(){
                Mojo.ajax("/forceCity/receive", {}, function (response) {
                    if (response && response.errorCode == 0) {
                        var grain = response.data.received;
                        Mojo.app.toast.show2("[内政]领取粮食:"+grain, 20000);
                    }
                }, function(){});
            },2000);
        },
        local_force: function () {
            var self = this;
            Mojo.app.toast.show("初始化内政数据ing");
            var arrTask = ["1@361", "2@557", "3@361", "4@37", "5@181", "6@361", "7@111", "8@361", "9@557"];
            var arrTaskCool = new Array(arrTask.length);
            for (var i = 0; i < arrTask.length; i++) {
                arrTaskCool[i] = 0
            }
            var time;
            var fbindex = 0;
            var i = 0;
            var title = "";
            var mi;
            var ss;
            var timestr;
            var timef;
            var sumtime;
            var empty = 0;
            var empty1 = 0;
            var serverRe = 0;
            var repeatFlag = 120;
            var repeatFlagMax = repeatFlag;

            self._getGrain();
            var autoForce = w.setInterval(function () {
                var date = new Date();
                var now = date.getTime() / 1000;
                var t = parseInt(now + 8 * 3600);
                var hour = parseInt((t % (3600 * 24)) / 3600);
                var minute = parseInt((t % 3600) / 60);
                var second = t % 60;
                var strHour = hour;
                var strMinute = minute;
                var strSecond = second;
                if (hour < 10) {
                    strHour = "0" + hour
                }
                if (minute < 10) {
                    strMinute = "0" + minute
                }
                if (second < 10) {
                    strSecond = "0" + second
                }
                if (fbindex < arrTaskCool.length) {
                    if (repeatFlag >= repeatFlagMax) {
                        repeatFlag = 0;
                        time = parseInt(new Date().getTime() / 1000);
                        var fubenid = arrTask[fbindex].split("@")[0];
                        var fubencool = arrTask[fbindex].split("@")[1];
                        Mojo.ajax("/force/doTask", {
                            id: fubenid,
                        }, function (result) {
                            setTimeout(function () {
                                repeatFlag = repeatFlagMax
                            }, 2000);
                            switch (fbindex) {
                            case 0:
                                title = "全民挖地球";
                                break;
                            case 1:
                                title = "后门要牢固";
                                break;
                            case 2:
                                title = "别动我的粮饷";
                                break;
                            case 3:
                                title = "师兄需要你";
                                break;
                            case 4:
                                title = "魔鬼式训练";
                                break;
                            case 5:
                                title = "你吃了吗";
                                break;
                            case 6:
                                title = "叛徒必须死";
                                break;
                            case 7:
                                title = "你的都是我的";
                                break;
                            case 8:
                                title = "偷窥可以有"
                            }
                            if (result.errorCode == 0) {
                                arrTaskCool[fbindex] = time + parseInt(fubencool);
                                if (self._showMsg.length > 0) {
                                    var arrMsg = self._showMsg.split("</br>");
                                    if (arrMsg.length > 8) {
                                        var msgIndex = self._showMsg.indexOf("</br>");
                                        self._showMsg = self._showMsg.substring(msgIndex + 5)
                                    }
                                    self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [内政]执行: " + title
                                } else {
                                    self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [内政]执行: " + title
                                }
                                Mojo.app.toast.show(self._showMsg, "20000");
                                serverRe = 0
                            } else if (result.errorCode == 1) {} else if (result.errorCode == 130100) {
                                arrTaskCool[fbindex] = "-1";
                                for (i = fbindex + 1; i < arrTaskCool.length; i++) {
                                    if (arrTaskCool[i] != "-1" && arrTaskCool[i] - time < 0) {
                                        break
                                    }
                                }
                                fbindex = i
                            } else if (result.errorCode == 160003) {
                                alert("卡牌容量不足");
                                w.clearInterval(autoForce)
                            } else if (result.errorCode == 20004) {
                                for (i = fbindex + 1; i < arrTaskCool.length; i++) {
                                    if (arrTaskCool[i] != "-1" && arrTaskCool[i] - time < 0) {
                                        break
                                    }
                                }
                                fbindex = i;
                                serverRe = 0
                            } else if (result.errorCode == 20002) {
                                arrTaskCool[fbindex] = "-1";
                                for (i = fbindex + 1; i < arrTaskCool.length; i++) {
                                    if (arrTaskCool[i] != "-1" && arrTaskCool[i] - time < 0) {
                                        break
                                    }
                                }
                                fbindex = i;
                                if (serverRe == 1) {;
                                    serverRe = 0;
                                    for (i = 0; i < arrTask.length; i++) {
                                        arrTaskCool[i] = "-1"
                                    }
                                    fbindex = arrTask.length + 1
                                }
                            } else if(result.errorCode==240016){
                                self._getGrain();
                            } else {
                                w.clearInterval(autoForce)
                            }
                        }, function () {}, {})
                    } else {
                        repeatFlag++
                    }
                } else {
                    timef = parseInt(new Date().getTime() / 1000);
                    sumtime = 0;
                    for (i = 0; i < arrTaskCool.length; i++) {
                        sumtime = sumtime + parseInt(arrTaskCool[i]);
                        if (arrTaskCool[i] != "-1" && arrTaskCool[i] - timef < 0) {
                            fbindex = i
                        }
                    }
                    mi = parseInt((timef - time) / 60);
                    ss = (timef - time) % 60;
                    if (ss.length == 1) {
                        ss = "0" + ss
                    }
                    timestr = mi + "分" + ss + "秒";
                    if (sumtime == -9) {
                        empty++;
                        if (empty == 2) {
                            Mojo.ajax("/force/playerTasks", {}, function (result) {
                                if (result.errorCode == 0) {
                                    if (self._showMsg.length > 0) {
                                        var arrMsg = self._showMsg.split("</br>");
                                        if (arrMsg.length > 8) {
                                            var msgIndex = self._showMsg.indexOf("</br>");
                                            self._showMsg = self._showMsg.substring(msgIndex + 5)
                                        }
                                        self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [内政]尝试接收系统刷新"
                                    } else {
                                        self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [内政]尝试接收系统刷新"
                                    }
                                    Mojo.app.toast.show(self._showMsg, "20000");
                                    for (i = 0; i < arrTask.length; i++) {
                                        arrTaskCool[i] = 0
                                    }
                                    fbindex = 0;
                                    serverRe = 1
                                }
                            }, function () {})
                        } else if (empty > 15) {
                            Mojo.ajax("/force/acceptRefreshTask", {}, function (result) {
                                if (result.errorCode == 0) {
                                    if (self._showMsg.length > 0) {
                                        var arrMsg = self._showMsg.split("</br>");
                                        if (arrMsg.length > 8) {
                                            var msgIndex = self._showMsg.indexOf("</br>");
                                            self._showMsg = self._showMsg.substring(msgIndex + 5)
                                        }
                                        self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [内政]自动接收官员刷新"
                                    } else {
                                        self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [内政]自动接收官员刷新"
                                    }
                                    Mojo.app.toast.show(self._showMsg, "20000");
                                    for (i = 0; i < arrTask.length; i++) {
                                        arrTaskCool[i] = 0
                                    }
                                    fbindex = 0
                                }
                            });
                            empty = 0
                        }
                    } else {
                        empty1++;
                        if (empty1 > 120) {
                            if (self._showMsg.length > 0) {
                                var arrMsg = self._showMsg.split("</br>");
                                if (arrMsg.length > 8) {
                                    var msgIndex = self._showMsg.indexOf("</br>");
                                    self._showMsg = self._showMsg.substring(msgIndex + 5)
                                }
                                self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [内政]等待冷却中..."
                            } else {
                                self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [内政]等待冷却中..."
                            }
                            Mojo.app.toast.show(self._showMsg, "20000");
                            empty1 = 0
                        }
                    }
                }
            }, 500)
        },
        nc: function () {
            var self = this;
            var robs = ["b101", "b102", "b103", "b104", "b105", "b106", "b107", "b108", "b109", "b110"];
            var robname = ["孟德新书", "兵书24篇", "遁甲天书", "春秋左氏传", "史记", "太平要术", "六韬", "孙子兵法", "青囊书", "玉玺"];
            Mojo.app.toast.show("开始收宝");
            var robid = 0;
            var mzflag = confirm("是否开启自动免战模式?");
            var repeatFlag = 120;
            var repeatFlagMax = repeatFlag;
            var autoRob = w.setInterval(function () {
                if (repeatFlag >= repeatFlagMax) {
                    repeatFlag = 0;
                    var date = new Date();
                    var now = date.getTime() / 1000;
                    var t = parseInt(now + 8 * 3600);
                    var hour = parseInt((t % (3600 * 24)) / 3600);
                    var minute = parseInt((t % 3600) / 60);
                    var second = t % 60;
                    var strHour = hour;
                    var strMinute = minute;
                    var strSecond = second;
                    if (hour < 10) {
                        strHour = "0" + hour
                    }
                    if (minute < 10) {
                        strMinute = "0" + minute
                    }
                    if (second < 10) {
                        strSecond = "0" + second
                    }
                    Mojo.ajax("/collect/composite", {
                        id: robs[robid]
                    }, function (result) {
                        if (result.errorCode == 50003) {
                            msg = result.errorMsg;
                            msgindex = msg.indexOf("剩余时间");
                            if (msgindex != -1) {
                                msg = msg.substring(msgindex);
                                if (self._showMsg.length > 0) {
                                    var arrMsg = self._showMsg.split("</br>");
                                    if (arrMsg.length > 8) {
                                        var msgIndex = self._showMsg.indexOf("</br>");
                                        self._showMsg = self._showMsg.substring(msgIndex + 5)
                                    }
                                    self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " " + robname[robid] + "正在合成中, " + msg
                                } else {
                                    self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " " + robname[robid] + "正在合成中, " + msg
                                }
                                Mojo.app.toast.show(self._showMsg, "20000");
                                robid = robid + 1;
                                if (robid > 9) {
                                    robid = 0
                                }
                                if (mzflag) {
                                    setTimeout(function () {
                                        Mojo.ajax("/collect/avoidWar", {}, function (result) {
                                            setTimeout(function () {
                                                repeatFlag = repeatFlagMax
                                            }, 1000);
                                            if (result.errorCode == 0) {
                                                if (parseInt(result.data.avoid_war_time) > 0) {
                                                    if (self._showMsg.length > 0) {
                                                        var arrMsg = self._showMsg.split("</br>");
                                                        if (arrMsg.length > 8) {
                                                            var msgIndex = self._showMsg.indexOf("</br>");
                                                            self._showMsg = self._showMsg.substring(msgIndex + 5)
                                                        }
                                                        self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]免战时间：" + parseInt(result.data.avoid_war_time) + "秒"
                                                    } else {
                                                        self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]免战时间：" + parseInt(result.data.avoid_war_time) + "秒"
                                                    }
                                                    Mojo.app.toast.show(self._showMsg, "20000")
                                                } else {
                                                    if (result.data.id != undefined) {
                                                        Mojo.ajax("/entity/Use", {
                                                            id: result.data.id,
                                                        }, function (result) {
                                                            if (result.errorCode == 0) {
                                                                if (self._showMsg.length > 0) {
                                                                    var arrMsg = self._showMsg.split("</br>");
                                                                    if (arrMsg.length > 8) {
                                                                        var msgIndex = self._showMsg.indexOf("</br>");
                                                                        self._showMsg = self._showMsg.substring(msgIndex + 5)
                                                                    }
                                                                    self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]自动使用1个免战令"
                                                                } else {
                                                                    self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]自动使用1个免战令"
                                                                }
                                                                Mojo.app.toast.show(self._showMsg, "20000")
                                                            }
                                                        }, function () {}, {})
                                                    } else {
                                                        if (self._showMsg.length > 0) {
                                                            var arrMsg = self._showMsg.split("</br>");
                                                            if (arrMsg.length > 8) {
                                                                var msgIndex = self._showMsg.indexOf("</br>");
                                                                self._showMsg = self._showMsg.substring(msgIndex + 5)
                                                            }
                                                            self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]缺少免战令"
                                                        } else {
                                                            self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]缺少免战令"
                                                        }
                                                        Mojo.app.toast.show(self._showMsg, "20000")
                                                    }
                                                }
                                            }
                                        }, function () {}, {})
                                    }, 1000)
                                } else {
                                    setTimeout(function () {
                                        repeatFlag = repeatFlagMax
                                    }, 1000)
                                }
                            }
                        } else if (result.errorCode == 0) {
                            if (self._showMsg.length > 0) {
                                var arrMsg = self._showMsg.split("</br>");
                                if (arrMsg.length > 8) {
                                    var msgIndex = self._showMsg.indexOf("</br>");
                                    self._showMsg = self._showMsg.substring(msgIndex + 5)
                                }
                                self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]收获 " + robname[robid] + " 1本"
                            } else {
                                self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]收获 " + robname[robid] + " 1本"
                            }
                            Mojo.app.toast.show(self._showMsg, "20000")
                        }
                        if (result.errorCode == 0 || result.errorCode == 50004 || (result.errorCode == 50003 && msgindex == -1)) {
                            setTimeout(function () {
                                Mojo.ajax("/collect/compositeStart", {
                                    id: robs[robid]
                                }, function (result) {
                                    if (result.errorCode == 0) {
                                        if (self._showMsg.length > 0) {
                                            var arrMsg = self._showMsg.split("</br>");
                                            if (arrMsg.length > 8) {
                                                var msgIndex = self._showMsg.indexOf("</br>");
                                                self._showMsg = self._showMsg.substring(msgIndex + 5)
                                            }
                                            self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]开始合成:" + robname[robid]
                                        } else {
                                            self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]开始合成:" + robname[robid]
                                        }
                                        Mojo.app.toast.show(self._showMsg, "20000");
                                        if (mzflag) {
                                            setTimeout(function () {
                                                Mojo.ajax("/collect/avoidWar", {}, function (result) {
                                                    setTimeout(function () {
                                                        repeatFlag = repeatFlagMax
                                                    }, 1000);
                                                    if (result.errorCode == 0) {
                                                        if (parseInt(result.data.avoid_war_time) > 0) {
                                                            if (self._showMsg.length > 0) {
                                                                var arrMsg = self._showMsg.split("</br>");
                                                                if (arrMsg.length > 8) {
                                                                    var msgIndex = self._showMsg.indexOf("</br>");
                                                                    self._showMsg = self._showMsg.substring(msgIndex + 5)
                                                                }
                                                                self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]免战时间：" + parseInt(result.data.avoid_war_time) + "秒"
                                                            } else {
                                                                self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]免战时间：" + parseInt(result.data.avoid_war_time) + "秒"
                                                            }
                                                            Mojo.app.toast.show(self._showMsg, "20000")
                                                        } else {
                                                            if (result.data.id != undefined) {
                                                                Mojo.ajax("/entity/Use", {
                                                                    id: result.data.id,
                                                                }, function (result) {
                                                                    if (result.errorCode == 0) {
                                                                        if (self._showMsg.length > 0) {
                                                                            var arrMsg = self._showMsg.split("</br>");
                                                                            if (arrMsg.length > 8) {
                                                                                var msgIndex = self._showMsg.indexOf("</br>");
                                                                                self._showMsg = self._showMsg.substring(msgIndex + 5)
                                                                            }
                                                                            self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]自动使用1个免战令"
                                                                        } else {
                                                                            self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]自动使用1个免战令"
                                                                        }
                                                                        Mojo.app.toast.show(self._showMsg, "20000")
                                                                    }
                                                                }, function () {}, {})
                                                            } else {
                                                                if (self._showMsg.length > 0) {
                                                                    var arrMsg = self._showMsg.split("</br>");
                                                                    if (arrMsg.length > 8) {
                                                                        var msgIndex = self._showMsg.indexOf("</br>");
                                                                        self._showMsg = self._showMsg.substring(msgIndex + 5)
                                                                    }
                                                                    self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]缺少免战令"
                                                                } else {
                                                                    self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]缺少免战令"
                                                                }
                                                                Mojo.app.toast.show(self._showMsg, "20000")
                                                            }
                                                        }
                                                    }
                                                }, function () {}, {})
                                            }, 1000)
                                        } else {
                                            setTimeout(function () {
                                                repeatFlag = repeatFlagMax
                                            }, 1000)
                                        }
                                    } else {
                                        setTimeout(function () {
                                            repeatFlag = repeatFlagMax
                                        }, 1000)
                                    }
                                    robid = robid + 1;
                                    if (robid > 9) {
                                        robid = 0
                                    }
                                }, function () {}, {})
                            }, 1000)
                        }
                    }, function () {}, {})
                } else {
                    repeatFlag++
                }
            }, 500)
        },
        ct: function () {
            var self = this;
            var params = {};
            var cond;
            var cd;
            var num = 0;
            var repeatFlag = 8;
            var repeatFlagMax = repeatFlag;
            var listParams = {
                start: 0,
                count: 20,
                type: 4,
                sub_type: 0,
            };
            Mojo.ajax("/illustration/list", listParams, function (result) {
                if (result.errorCode == 0) {
                    for (var i in result.data.list) {
                        var award = result.data.list[i].award.name;
                        var name = result.data.list[i].name;
                        if (award == "钱袋" && name == "变碎为宝活动") {
                            params.game_activity_id = result.data.list[i].id;
                            cond = result.data.list[i].conditions[2].id;
                            cd = result.data.list[i].cooling_time
                        }
                    }
                    Mojo.app.toast.show("开启自动兑换钱袋,冷却时间: " + cd + "秒", "20000");
                    var date = new Date();
                    var now = date.getTime() / 1000;
                    cd = parseInt(cd) + parseInt(now) + parseInt(3);
                    var autosuipian = w.setInterval(function () {
                        date = new Date();
                        now = date.getTime() / 1000;
                        var cha = parseInt(cd) - parseInt(now);
                        if (cha < 0 && repeatFlag >= repeatFlagMax) {
                            repeatFlag = 0;
                            var t = parseInt(now + 8 * 3600);
                            var hour = parseInt((t % (3600 * 24)) / 3600);
                            var minute = parseInt((t % 3600) / 60);
                            var second = t % 60;
                            var strHour = hour;
                            var strMinute = minute;
                            var strSecond = second;
                            if (hour < 10) {
                                strHour = "0" + hour
                            }
                            if (minute < 10) {
                                strMinute = "0" + minute
                            }
                            if (second < 10) {
                                strSecond = "0" + second
                            }
                            var shownow = strHour + ":" + strMinute + ":" + strSecond + " ";
                            Mojo.ajax("/gameactivity/choose", {
                                start: 0,
                                count: 1,
                                condition_id: cond
                            }, function (response) {
                                if (response.errorCode == 0) {
                                    if (response.data.list.length > 0) {
                                        eval("params.condition_" + cond + " = " + response.data.list[0].player_entity_id + ";");
                                        Mojo.ajax("/gameactivity/do", params, function (response1) {
                                            setTimeout(function () {
                                                repeatFlag = repeatFlagMax
                                            }, 1000);
                                            if (response1.errorCode == 0) {
                                                if (self._showMsg.length > 0) {
                                                    var arrMsg = self._showMsg.split("</br>");
                                                    if (arrMsg.length > 8) {
                                                        var msgIndex = self._showMsg.indexOf("</br>");
                                                        self._showMsg = self._showMsg.substring(msgIndex + 5)
                                                    }
                                                    self._showMsg = self._showMsg + "</br>" + shownow + "[兑换]获得1个钱袋"
                                                } else {
                                                    self._showMsg = shownow + "[兑换]获得1个钱袋"
                                                }
                                                Mojo.app.toast.show(self._showMsg, "20000");
                                                date = new Date();
                                                now = date.getTime() / 1000;
                                                cd = parseInt(3603) + parseInt(now)
                                            } else {
                                                if (self._showMsg.length > 0) {
                                                    var arrMsg = self._showMsg.split("</br>");
                                                    if (arrMsg.length > 8) {
                                                        var msgIndex = self._showMsg.indexOf("</br>");
                                                        self._showMsg = self._showMsg.substring(msgIndex + 5)
                                                    }
                                                    self._showMsg = self._showMsg + "</br>" + shownow + "[兑换]" + response1.errorMsg
                                                } else {
                                                    self._showMsg = shownow + "[兑换]" + response1.errorMsg
                                                }
                                                Mojo.app.toast.show(self._showMsg, "20000")
                                            }
                                        }, function () {})
                                    } else {
                                        setTimeout(function () {
                                            repeatFlag = repeatFlagMax
                                        }, 1000);
                                        if (self._showMsg.length > 0) {
                                            var arrMsg = self._showMsg.split("</br>");
                                            if (arrMsg.length > 8) {
                                                var msgIndex = self._showMsg.indexOf("</br>");
                                                self._showMsg = self._showMsg.substring(msgIndex + 5)
                                            }
                                            self._showMsg = self._showMsg + "</br>" + shownow + "[兑换]缺少祭祀卡"
                                        } else {
                                            self._showMsg = shownow + "[兑换]缺少祭祀卡"
                                        }
                                        Mojo.app.toast.show(self._showMsg, "20000")
                                    }
                                } else {
                                    setTimeout(function () {
                                        repeatFlag = repeatFlagMax
                                    }, 1000);
                                    if (self._showMsg.length > 0) {
                                        var arrMsg = self._showMsg.split("</br>");
                                        if (arrMsg.length > 8) {
                                            var msgIndex = self._showMsg.indexOf("</br>");
                                            self._showMsg = self._showMsg.substring(msgIndex + 5)
                                        }
                                        self._showMsg = self._showMsg + "</br>" + shownow + "[兑换]" + response.errorMsg
                                    } else {
                                        self._showMsg = shownow + "[兑换]" + response.errorMsg
                                    }
                                    Mojo.app.toast.show(self._showMsg, "20000")
                                }
                            }, function () {})
                        } else {
                            repeatFlag++;
                            if (num > 10) {
                                num = 0;
                                var t = parseInt(now + 8 * 3600);
                                var hour = parseInt((t % (3600 * 24)) / 3600);
                                var minute = parseInt((t % 3600) / 60);
                                var second = t % 60;
                                var strHour = hour;
                                var strMinute = minute;
                                var strSecond = second;
                                if (hour < 10) {
                                    strHour = "0" + hour
                                }
                                if (minute < 10) {
                                    strMinute = "0" + minute
                                }
                                if (second < 10) {
                                    strSecond = "0" + second
                                }
                                var shownow = strHour + ":" + strMinute + ":" + strSecond + " ";
                                if (self._showMsg.length > 0) {
                                    var arrMsg = self._showMsg.split("</br>");
                                    if (arrMsg.length > 8) {
                                        var msgIndex = self._showMsg.indexOf("</br>");
                                        self._showMsg = self._showMsg.substring(msgIndex + 5)
                                    }
                                    self._showMsg = self._showMsg + "</br>" + shownow + "[兑换]预计" + cha + "秒后兑换钱袋"
                                } else {
                                    self._showMsg = shownow + "[兑换]预计" + cha + "秒后兑换钱袋"
                                }
                                Mojo.app.toast.show(self._showMsg, "20000")
                            } else {
                                num++
                            }
                        }
                    }, 5000)
                }
            }, function () {})
        },
        ti: function () {
            var self=this;
            Mojo.app.toast.show("自动闯关开始 初始化需要20-40秒");
            var runfb = new Array(0);
            var tasks = new Array(0);
            var groups = new Array(0);
            var names = new Array(0);
            var cools = new Array(0);
            var pris = new Array(0);
            var index = 0;
            Mojo.ajax("/fuben/fubens", {}, function (result) {
                for (var i = 0; i < result.data.list.length; i++) {
                    if (result.data.list[i].status == 1 && result.data.list[i].unlock == 1) {
                        runfb[index] = result.data.list[i].id;
                        index++
                    }
                }
                self.un(runfb, 0, 1, tasks, groups, names, cools, pris)
            }, function () {})
            
        },
        un: function (runfb, index, group, tasks, groups, names, cools, pris) {
            var self = this;
            if (group == 100) {
                for(var i=0;i<5;i++){tasks[tasks.length]=0;groups[groups.length]="0-0-0";names[names.length]="0-0-0";cools[cools.length]="-1";pris[pris.length]="-1"}group=1;index++;if(index<runfb.length){self.un(runfb,index,group,tasks,groups,names,cools,pris)}else{self.fu(tasks,groups,names,cools,pris)}
            } else {
                var params={start:0,count:50,fuben_id:runfb[index],fb_task_group_id:group,};
                Mojo.ajax("/fuben/fbTasks", params, function (result) {
                    if (result.errorCode == 0 && result.data.fb_tasks != "") {
                        var time=parseInt(new Date().getTime()/1000);for(var i=0;i<5;i++){tasks[tasks.length]=result.data.fb_tasks[i].id;groups[groups.length]=runfb[index]+"-"+group+"-"+(i+1);names[names.length]=result.data.cur_fuben.name+"-"+result.data.fb_task_groups[group-1].name+"-"+result.data.fb_tasks[i].name;if(result.data.fb_tasks[i].percent<100){cools[cools.length]=parseInt(result.data.fb_tasks[i].cold_down)+parseInt(time)+1}else{cools[cools.length]="-1"}if(i==0){if(runfb[index]==2||runfb[index]==6){pris[pris.length]=2}else if(runfb[index]==3||runfb[index]==5||runfb[index]==7||runfb[index]==8){pris[pris.length]=3}else if(runfb[index]==1||runfb[index]==4||runfb[index]==9||runfb[index]==10||runfb[index]==11){pris[pris.length]=4}else{pris[pris.length]=2}}else if(i==1){if(runfb[index]==3||runfb[index]==4){pris[pris.length]=6}else{pris[pris.length]=5}}else if(i==2){if(runfb[index]==3||runfb[index]==4){pris[pris.length]=8}else{pris[pris.length]=7}}else if(i==3){if(runfb[index]==3||runfb[index]==4){pris[pris.length]=12}else if(runfb[index]==1||runfb[index]==9||runfb[index]==10){pris[pris.length]=11}else if(runfb[index]==2){pris[pris.length]=9}else{pris[pris.length]=10}}else{pris[pris.length]=1}}if(group<result.data.fb_task_groups.length){group++}else{group=100}self.un(runfb,index,group,tasks,groups,names,cools,pris)
                    } else {
                        for(var i=0;i<5;i++){tasks[tasks.length]=0;groups[groups.length]="0-0-0";names[names.length]="0-0-0";cools[cools.length]="-1";pris[pris.length]="-1"}group=1;index++;if(index<runfb.length){self.un(runfb,index,group,tasks,groups,names,cools,pris)}else{self.fu(tasks,groups,names,cools,pris)}
                    }
                }, function () {})
            }
        },
        fu: function (tasks, groups, names, cools, pris) {
            Mojo.app.toast.show("开始计算副本状态");
            var self = this;
            var zhixingtime = 3000;
            var empty = 0;
            var time = parseInt(new Date().getTime() / 1000);
            var fbindex = tasks.length;
            for (var i = 0; i < tasks.length; i++) {
                if (parseInt(cools[i]) > -1 && cools[i] - time < 0) {
                    if ((i + 1) % 5 == 0) {
                        if (cools[i - 1] == "-1" && cools[i - 2] == "-1" && cools[i - 3] == "-1" && cools[i - 4] == "-1") {
                            if (fbindex == tasks.length) {
                                fbindex = i
                            } else {
                                i++
                            }
                        } else {
                            i++
                        }
                    } else {
                        if (fbindex == tasks.length) {
                            fbindex = i
                        } else {
                            var pri1 = pris[fbindex];
                            var pri2 = pris[i];
                            if (pri1 < pri2) {
                                fbindex = i
                            }
                        }
                    }
                }
            }
            var repeatFlag = 10;
            var repeatFlagMax = repeatFlag;
            var autoFuben2 = w.setInterval(function () {
                time = parseInt(new Date().getTime() / 1000);
                if (fbindex < cools.length) {
                    if (repeatFlag >= repeatFlagMax) {
                        repeatFlag = 0;
                        var fubenid = tasks[fbindex];
                        Mojo.ajax("/fuben/do", {
                            id: fubenid,
                        }, function (result) {
                            setTimeout(function () {
                                repeatFlag = repeatFlagMax
                            }, 1000);
                            var date = new Date();
                            var now = date.getTime() / 1000;
                            var t = parseInt(now + 8 * 3600);
                            var hour = parseInt((t % (3600 * 24)) / 3600);
                            var minute = parseInt((t % 3600) / 60);
                            var second = t % 60;
                            var strHour = hour;
                            var strMinute = minute;
                            var strSecond = second;
                            if (hour < 10) {
                                strHour = "0" + hour
                            }
                            if (minute < 10) {
                                strMinute = "0" + minute
                            }
                            if (second < 10) {
                                strSecond = "0" + second
                            }
                            var titleMsg = "";
                            if (result.errorCode == 0) {
                                var emsg = "";
                                if (result.data.award) {
                                    if (result.data.award.bonus) {
                                        if (result.data.award.bonus.entities) {
                                            if (result.data.award.bonus.entities[0]) {
                                                if (result.data.award.bonus.entities[0].id) {
                                                    if (result.data.award.bonus.entities[0].id == "d12") {
                                                        emsg = ", 获得转生丹"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                titleMsg = " [自动副本]:执行成功" + emsg
                            }
                            if (titleMsg.length > 0) {
                                if (self._showMsg.length > 0) {
                                    var arrMsg = self._showMsg.split("</br>");
                                    if (arrMsg.length > 8) {
                                        var msgIndex = self._showMsg.indexOf("</br>");
                                        self._showMsg = self._showMsg.substring(msgIndex + 5)
                                    }
                                    self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " " + titleMsg
                                } else {
                                    self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " " + titleMsg
                                }
                                Mojo.app.toast.show(self._showMsg, "20000")
                            }
                            if (result.errorCode == 0) {
                                if ((fbindex + 1) % 5 == 0) {
                                    cools[fbindex] = "-1";
                                    if (tasks[fbindex + 1] != 0) {
                                        Mojo.ajax("/fuben/getAward", {
                                            id: fubenid,
                                        }, function (result) {
                                            if (result.errorCode == 0) {
                                                Mojo.ajax("/fuben/openAward", {
                                                    id: fubenid,
                                                    award_id: result.data.free_award.id,
                                                    status: 1,
                                                }, function (result) {
                                                    cools[fbindex + 1] = "0";
                                                    cools[fbindex + 2] = "0";
                                                    cools[fbindex + 3] = "0";
                                                    cools[fbindex + 4] = "0";
                                                    cools[fbindex + 5] = "0";
                                                    if (result.data) {
                                                        if (result.data.entity) {
                                                            if (result.data.entity.id) {
                                                                if (result.data.entity.id == "d12") {
                                                                    titleMsg = " [自动副本]:领奖成功, 获得转生丹";
                                                                    if (titleMsg.length > 0) {
                                                                        if (self._showMsg.length > 0) {
                                                                            var arrMsg = self._showMsg.split("</br>");
                                                                            if (arrMsg.length > 8) {
                                                                                var msgIndex = self._showMsg.indexOf("</br>");
                                                                                self._showMsg = self._showMsg.substring(msgIndex + 5)
                                                                            }
                                                                            self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " " + titleMsg
                                                                        } else {
                                                                            self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " " + titleMsg
                                                                        }
                                                                        Mojo.app.toast.show(self._showMsg, "20000")
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }, function () {}, {})
                                            }
                                        }, function () {}, {})
                                    }
                                    fbindex = tasks.length;
                                    for (var i = 0; i < tasks.length; i++) {
                                        if (parseInt(cools[i]) > -1 && cools[i] - time < 0) {
                                            if ((i + 1) % 5 == 0) {
                                                if (cools[i - 1] == "-1" && cools[i - 2] == "-1" && cools[i - 3] == "-1" && cools[i - 4] == "-1") {
                                                    if (fbindex == tasks.length) {
                                                        fbindex = i
                                                    } else {
                                                        i++
                                                    }
                                                } else {
                                                    i++
                                                }
                                            } else {
                                                if (fbindex == tasks.length) {
                                                    fbindex = i
                                                } else {
                                                    var pri1 = pris[fbindex];
                                                    var pri2 = pris[i];
                                                    if (pri1 < pri2) {
                                                        fbindex = i
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (result.data.fb_task.percent == 100) {
                                        cools[fbindex] = "-1"
                                    } else {
                                        cools[fbindex] = time + 1 + parseInt(result.data.fb_task.cold_down)
                                    }
                                    fbindex = tasks.length;
                                    for (var i = 0; i < tasks.length; i++) {
                                        if (parseInt(cools[i]) > -1 && cools[i] - time < 0) {
                                            if ((i + 1) % 5 == 0) {
                                                if (cools[i - 1] == "-1" && cools[i - 2] == "-1" && cools[i - 3] == "-1" && cools[i - 4] == "-1") {
                                                    if (fbindex == tasks.length) {
                                                        fbindex = i
                                                    } else {
                                                        i++
                                                    }
                                                } else {
                                                    i++
                                                }
                                            } else {
                                                if (fbindex == tasks.length) {
                                                    fbindex = i
                                                } else {
                                                    var pri1 = pris[fbindex];
                                                    var pri2 = pris[i];
                                                    if (pri1 < pri2) {
                                                        fbindex = i
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (result.errorCode == 20009) {
                                cools[fbindex] = "-2";
                                fbindex = tasks.length;
                                for (var i = 0; i < tasks.length; i++) {
                                    if (parseInt(cools[i]) > -1 && cools[i] - time < 0) {
                                        if ((i + 1) % 5 == 0) {
                                            if (cools[i - 1] == "-1" && cools[i - 2] == "-1" && cools[i - 3] == "-1" && cools[i - 4] == "-1") {
                                                if (fbindex == tasks.length) {
                                                    fbindex = i
                                                } else {
                                                    i++
                                                }
                                            } else {
                                                i++
                                            }
                                        } else {
                                            if (fbindex == tasks.length) {
                                                fbindex = i
                                            } else {
                                                var pri1 = pris[fbindex];
                                                var pri2 = pris[i];
                                                if (pri1 < pri2) {
                                                    fbindex = i
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (result.errorCode == 1) {} else if (result.errorCode == 20006) {} else if (result.errorCode == 20001) {
                                cools[fbindex - 1] = "0";
                                cools[fbindex - 2] = "0";
                                cools[fbindex - 3] = "0";
                                cools[fbindex - 4] = "0";
                                fbindex = tasks.length;
                                for (var i = 0; i < tasks.length; i++) {
                                    if (parseInt(cools[i]) > -1 && cools[i] - time < 0) {
                                        if ((i + 1) % 5 == 0) {
                                            if (cools[i - 1] == "-1" && cools[i - 2] == "-1" && cools[i - 3] == "-1" && cools[i - 4] == "-1") {
                                                if (fbindex == tasks.length) {
                                                    fbindex = i
                                                } else {
                                                    i++
                                                }
                                            } else {
                                                i++
                                            }
                                        } else {
                                            if (fbindex == tasks.length) {
                                                fbindex = i
                                            } else {
                                                var pri1 = pris[fbindex];
                                                var pri2 = pris[i];
                                                if (pri1 < pri2) {
                                                    fbindex = i
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (result.errorCode == 160003) {
                                alert(strHour + ":" + strMinute + ":" + strSecond + "卡牌容量不足");
                                w.clearInterval(autoFuben2)
                            } else if (result.errorCode == 20004) {
                                var params = {
                                    start: 0,
                                    count: 50,
                                    fuben_id: groups[fbindex].split("-")[0],
                                    fb_task_group_id: groups[fbindex].split("-")[1],
                                };
                                Mojo.ajax("/fuben/fbTasks", params, function (result) {
                                    if (result.data.fb_tasks[parseInt(groups[fbindex].split("-")[2]) - 1].percent < 100) {
                                        cools[fbindex] = parseInt(result.data.fb_tasks[parseInt(groups[fbindex].split("-")[2]) - 1].cold_down) + parseInt(time) + 1
                                    } else {
                                        cools[fbindex] = -1
                                    }
                                    fbindex = tasks.length;
                                    for (var i = 0; i < tasks.length; i++) {
                                        if (parseInt(cools[i]) > -1 && cools[i] - time < 0) {
                                            if ((i + 1) % 5 == 0) {
                                                if (cools[i - 1] == "-1" && cools[i - 2] == "-1" && cools[i - 3] == "-1" && cools[i - 4] == "-1") {
                                                    if (fbindex == tasks.length) {
                                                        fbindex = i
                                                    } else {
                                                        i++
                                                    }
                                                } else {
                                                    i++
                                                }
                                            } else {
                                                if (fbindex == tasks.length) {
                                                    fbindex = i
                                                } else {
                                                    var pri1 = pris[fbindex];
                                                    var pri2 = pris[i];
                                                    if (pri1 < pri2) {
                                                        fbindex = i
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }, function () {})
                            } else if (result.errorCode == 20002) {
                                cools[fbindex] = "-1";
                                fbindex = tasks.length;
                                for (var i = 0; i < tasks.length; i++) {
                                    if (parseInt(cools[i]) > -1 && cools[i] - time < 0) {
                                        if ((i + 1) % 5 == 0) {
                                            if (cools[i - 1] == "-1" && cools[i - 2] == "-1" && cools[i - 3] == "-1" && cools[i - 4] == "-1") {
                                                if (fbindex == tasks.length) {
                                                    fbindex = i
                                                } else {
                                                    i++
                                                }
                                            } else {
                                                i++
                                            }
                                        } else {
                                            if (fbindex == tasks.length) {
                                                fbindex = i
                                            } else {
                                                var pri1 = pris[fbindex];
                                                var pri2 = pris[i];
                                                if (pri1 < pri2) {
                                                    fbindex = i
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (result.errorCode == 10002) {
                                for (i = fbindex + 2; i < cools.length; i++) {
                                    if (tasks[i] == 0) {
                                        break
                                    }
                                }
                                for (i = fbindex + 2; i < cools.length; i++) {
                                    if (parseInt(cools[i]) > -1 && cools[i] - time < 0) {
                                        if ((i + 1) % 5 == 0) {
                                            if (cools[i - 1] == "-1" && cools[i - 2] == "-1" && cools[i - 3] == "-1" && cools[i - 4] == "-1") {
                                                break
                                            } else {
                                                i++
                                            }
                                        } else {
                                            break
                                        }
                                    }
                                }
                                fbindex = i
                            } else if (result.errorCode == 20003) {
                                w.clearInterval(autoFuben2);
                                self.ti()
                            }
                        }, function () {}, {})
                    } else {
                        repeatFlag++
                    }
                }
                var nexttime = 0;
                var nextsum = 0;
                if (fbindex >= cools.length) {
                    for (i = 0; i < cools.length; i++) {
                        if (parseInt(cools[i]) > -1 && cools[i] - time < 0) {
                            if ((i + 1) % 5 == 0) {
                                if (cools[i - 1] == "-1" && cools[i - 2] == "-1" && cools[i - 3] == "-1" && cools[i - 4] == "-1") {
                                    if (fbindex == tasks.length) {
                                        fbindex = i
                                    } else {
                                        i++
                                    }
                                } else {
                                    nextsum++;
                                    nextsum++;
                                    i++
                                }
                            } else {
                                if (fbindex == tasks.length) {
                                    fbindex = i
                                } else {
                                    var pri1 = pris[fbindex];
                                    var pri2 = pris[i];
                                    if (pri1 < pri2) {
                                        fbindex = i
                                    }
                                }
                            }
                        } else if (parseInt(cools[i]) > -1) {
                            if (nexttime == 0) {
                                nexttime = cools[i]
                            } else if (nexttime - cools[i] > 0) {
                                nexttime = cools[i]
                            }
                            nextsum++
                        }
                    }
                    nexttime = nexttime - time;
                    if (fbindex >= cools.length) {
                        empty++;
                        if (empty == 1) {
                            var date = new Date();
                            var now = date.getTime() / 1000;
                            var t = parseInt(now + 8 * 3600);
                            var hour = parseInt((t % (3600 * 24)) / 3600);
                            var minute = parseInt((t % 3600) / 60);
                            var second = t % 60;
                            var strHour = hour;
                            var strMinute = minute;
                            var strSecond = second;
                            if (hour < 10) {
                                strHour = "0" + hour
                            }
                            if (minute < 10) {
                                strMinute = "0" + minute
                            }
                            if (second < 10) {
                                strSecond = "0" + second
                            }
                            if (self._showMsg.length > 0) {
                                var arrMsg = self._showMsg.split("</br>");
                                if (arrMsg.length > 8) {
                                    var msgIndex = self._showMsg.indexOf("</br>");
                                    self._showMsg = self._showMsg.substring(msgIndex + 5)
                                }
                                self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [刷丹]:预计" + nexttime + "秒,任务:" + nextsum + "个"
                            } else {
                                self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [刷丹]:预计" + nexttime + "秒,任务:" + nextsum + "个"
                            }
                            Mojo.app.toast.show(self._showMsg, "20000")
                        }
                    } else {
                        empty = 0
                    } if (empty > 20) {
                        for (i = 0; i < cools.length; i++) {
                            if (parseInt(cools[i]) > -1) {
                                break
                            }
                        }
                        if (i >= cools.length) {
                            w.clearInterval(autoFuben2);
                            alert("副本完成")
                        } else {
                            empty = 0
                        }
                    }
                }
            }, zhixingtime);
        },
        _addQuickButtons: function () {
            var self = this;
            var onClickQuickBtn = function (btn, e) {
                var id = btn.id();
                if ('btn-task' === id) {
                    self.local_force();
                } else if ('btn-entity-embed' === id) {
                    Mojo.app.redirect('/package', {}, 'event', '玩家点击“排列阵容”按钮');
                } else if ('btn-entity-battle' === id) {
                    self.ti();
                } else if ('btn-friend' === id) {
                    Mojo.app.redirect('/friend');
                } else if ('btn-entity-purchase' === id) {
                    Mojo.app.redirect('/mall', {
                        selected: 1
                    }, 'event', '04_046');
                } else if ('btn-intensify' === id) {
                    Mojo.app.redirect('/intensify', {}, 'event', '04_044');
                } else if ('btn-force' === id) {
                    self._enterForce();
                } else if ('btn-fuben' === id) {
                    Mojo.app.redirect('/fb', {}, 'event', '04_047');
                } else if ('btn-automode' === id) {
                    if (Mojo.app.getStorage("auto-mode") === "true") {
                        Mojo.app.toast.show2("自动模式已关闭,3秒后回到首页", 20000, false, true);
                        Mojo.app.saveStorage("auto-mode", "false");
                        setTimeout(function () {
                            window.location.href="/mojo/ipad/home";
                        }, 3000);
                    } else {
                        Mojo.app.toast.show2("开启自动模式......", 20000, false, true);
                        Mojo.app.saveStorage("auto-mode", "true");
                        self.load();
                    }
                } else if('btn-battleground' === id) {
                    Mojo.app.redirect('/bg');
                }
            };
            var btns = [{
                id: 'btn-task',
                text: '内政'
            }, {
                id: 'btn-entity-battle',
                text: '刷丹'
            }, {
                id: 'btn-automode',
                text: '自动'
            }, {
                id: 'btn-force',
                text: 'Force',
                isNew: true
            }, {
                id: 'btn-fuben',
                text: 'Fuben'
            }, {
                id: 'btn-battleground',
                text: '战场'
            }];
            $.each(btns, function (i, b) {
                self._quickButtons.append((new Mojo.ui.Button(b.id, {
                    click: onClickQuickBtn,
                    classes: b.isNew === true ? ['is_new'] : [],
                    text: self.locale(b.text),
                    icon: true,
                    textWrap: true,
                }).element()));
            });
        },
        _addCircleButtons: function () {
            var self = this;
            var onClickCircleBtn = function (btn, e) {
                var id = btn.id();
                if ('btn-messages' === id) {
                    Mojo.app.redirect('/message', {}, 'event', '04_054');
                } else if ('btn-entity-browse' === id) {
                    Mojo.app.redirect('/entity', {}, 'event', '04_051');
                } else if ('btn-intensify' === id) {
                    Mojo.app.redirect('/intensify', {}, 'event', '04_044');
                } else if ('btn-props' === id) {
                    Mojo.app.redirect('/mall', {
                        selected: 2
                    });
                } else if ('btn-statistics' === id) {
                    Mojo.app.redirect('/statistics', {}, 'event', '04_055');
                } else if ('btn-chat' === id) {
                    Mojo.app.redirect('/chat', {
                        history: 0
                    }, 'event', '19_000');
                } else if ('btn-settings' === id) {
                    Mojo.app.redirect('/settings', {}, 'event', '04_056');
                } else if ('btn-illustration' === id) {
                    Mojo.app.redirect('/illustration', {}, 'event', '04_052');
                } else if ('btn-friend' === id) {
                    Mojo.app.redirect('/friend', {}, 'event', '04_053');
                } else if ('btn-ranking' === id) {
                    Mojo.app.redirect('/rank');
                } else if ('btn-quick-logout' === id) {
                    Mojo.app.redirect('/default/login');
                } else if ('btn-auto-collect' === id) {
                    self.nc();
                }
            };
            var btns = [{
                id: 'btn-quick-logout',
                text: '换号',
                cl: 'task-rank'
            }, {
                id: 'btn-entity-browse',
                text: 'Entity Browse',
                cl: 'task-card'
            }, {
                id: 'btn-illustration',
                text: 'Illustration',
                cl: 'task-pic'
            }, {
                id: 'btn-intensify',
                text: 'Intensify',
                cl: 'task-intensify'
            }, {
                id: 'btn-messages',
                text: 'Messages',
                cl: 'task-news'
            }, {
                id: 'btn-auto-collect',
                text: '合成',
                cl: 'task-friend'
            }, {
                id: 'btn-chat',
                text: 'Chat',
                cl: 'task-chat'
            }, {
                id: 'btn-settings',
                text: 'Settings',
                cl: 'task-set'
            }, {
                id: 'btn-ranking',
                text: 'Rank',
                cl: 'task-rank'
            }, {
                id: 'btn-friend',
                text: 'Friend',
                cl: 'task-friend'
            }];
            var inner = $('<div class="inner"></div>');
            $.each(btns, function (i, b) {
                inner.append((new Mojo.ui.Button(b.id, {
                    special: b.cl,
                    click: onClickCircleBtn,
                    text: self.locale(b.text),
                    textWrap: true,
                }).element()));
            });
            self.scroll = new Mojo.ui.Scroll(undefined, inner, {
                showArrow: true,
                direction: 1,
                step: self.getR('unitWidth')
            });
            self.scroll.element().appendTo(self._circleButtons);
            self.scroll.refresh();
        },
        _bindNavBtnEvent: function () {
            var self = this;
            var hasTouch = 'ontouchstart' in window;
            var START_EV = hasTouch ? 'touchstart' : 'mousedown';
            var END_EV = hasTouch ? 'touchend' : 'mouseup';
            self.scroll.element().bind(START_EV, function () {
                self.scroll._arrowUp.element().fadeOut(200);
                self.scroll._arrowDown.element().fadeOut(200);
            });
            var clear = function () {
                if (!self.scroll._arrowUp.element().hasClass('mojo-ui-button-disabled')) {
                    self.scroll._arrowUp.element().fadeIn(200);
                }
                if (!self.scroll._arrowDown.element().hasClass('mojo-ui-button-disabled')) {
                    self.scroll._arrowDown.element().fadeIn(200);
                }
            };
            self.scroll.element().bind(END_EV, clear);
        },
        localeCat: function () {
            return 'home';
        },
        loginremind: function (args) {
            var hasAward = args ? args.hasAward : undefined;
            var self = this;
            Mojo.ajax('/player/loginInfoRemind', {}, function (result) {
                if (result.errorCode == 0 && result.data) {
                    var nickname = result.data.nickname,
                        username = result.data.username,
                        weibo = result.data.weibo,
                        usertype = result.data.userType,
                        level = result.data.level,
                        weibobindingcd = Mojo.utils.formatSecTime(result.data.weiboBindingCD),
                        emailbindingcd = Mojo.utils.formatSecTime(result.data.emailBindingCD),
                        bindingremind = result.data.bindingRemind,
                        isWeiboFollowing = result.data.isWeiboFollowing,
                        isFirstWeibo = result.data.isFirstWeibo,
                        effectiveEvent = result.data.effectiveEvent,
                        bindingEmail = result.data.bindingEmail,
                        remainingtime = result.data.remainingTime,
                        isyahooemail = result.data.isYahooEmail;
                    if (usertype == 1 && nickname && username) {
                        if (Mojo.app.getStorage('login_method') != 'sina' && Mojo.app.getStorage('login_method') != 'facebook') {
                            var content = $("<div class='paragraph word-break'></div>");
                            $("<div class='logininfo'></div>").html(self.getL('home', 'login_info')).appendTo(content);
                            $("<div class='acc'></div>").html(self.getL('home', 'login_acc') + "<span>" + username + "</span>").appendTo(content);
                            $("<div class='nick'></div>").html(self.getL('home', 'login_nick') + "<span>" + nickname + "</span>").appendTo(content);
                            if (Mojo.app.getStorage('single_server') != 'true') {}
                            var btn = new Mojo.ui.Button(undefined, {
                                text: '',
                                classes: ['choose-button'],
                                special: 'combo',
                                click: function () {
                                    if (btn.element().hasClass("combo-selected-class")) {
                                        btn.element().removeClass("combo-selected-class");
                                        self.sign = false;
                                    } else {
                                        btn.element().addClass('combo-selected-class');
                                        self.sign = true;
                                    }
                                }
                            });
                            btn.element().appendTo(content);
                            $("<div class='neverremind'></div>").html(self.getL('home', 'neven_remind')).appendTo(content);
                            new Mojo.com.CommonDialog(undefined, {
                                classes: ['mojo-logininfo-dlg'],
                                title: self.getL('home', 'login_title'),
                                content: content,
                                leftBtnText: self.getL('ui', 'Close'),
                                leftBtnClick: function (that) {
                                    that.close();
                                },
                                close: function () {
                                    if (self.sign) {
                                        Mojo.ajax('/player/cancelLoginRemind', {}, function (result) {});
                                    }
                                }
                            }).open();
                        }
                    }
                    if (effectiveEvent) self._bindSuccessPrompt(effectiveEvent, bindingEmail, isWeiboFollowing, isFirstWeibo, weibo, nickname);
                    if (emailbindingcd > 0 && weibobindingcd > 0) {
                        if (emailbindingcd > weibobindingcd) {
                            Mojo.app.toast.show(self.getL('home', 'binding prompt', {
                                "date": weibobindingcd
                            }));
                        }
                    } else if (emailbindingcd > 0) {
                        Mojo.app.toast.show(self.getL('home', 'binding email prompt', {
                            "date": emailbindingcd
                        }));
                    } else if (weibobindingcd > 0) {
                        Mojo.app.toast.show(self.getL('home', 'binding weibo prompt', {
                            "date": weibobindingcd
                        }));
                    }
                    if (hasAward != null && usertype == '2' && level >= 20) {
                        var dlg = new Mojo.com.CommonDialog(undefined, {
                            title: Mojo.utils.locale('home', 'helpful hints'),
                            content: $('<div class="paragraph word-break"></div>').html(Mojo.utils.locale('common', 'bind_tip3')),
                            leftBtnText: Mojo.utils.locale('weibo', 'go bind'),
                            rightBtnText: Mojo.utils.locale('common', 'close'),
                            leftBtnClick: function () {
                                dlg.close();
                                Mojo.app.redirect('/settings', {
                                    selected: 1
                                });
                            },
                            rightBtnClick: function () {
                                dlg.close();
                            }
                        });
                        dlg.open();
                    }
                    var guid = Mojo.cache.get('guid');
                    if (!Mojo.app.getStorage('is_old_bind_prompt' + guid) && '' + bindingremind == '1') {
                        Mojo.app.saveStorage("is_old_bind_prompt" + guid, true);
                        self._oldAccountPrompt();
                    }
                    if (!Mojo.app.getStorage('is_yahoo_email' + guid) && isyahooemail == '1') {
                        Mojo.app.saveStorage("is_yahoo_email" + guid, true);
                        self._yahooPrompt();
                    }
                }
                Mojo.app.data.needLoginStatus = false;
                self.baseProfile.sync();
            }, function () {
                Mojo.app.data.needLoginStatus = false;
                self.baseProfile.sync();
            });
        },
        auto_force: function (fn) {
            var self =this;
            var force_level = 1000;
            var fbindex = 0;
            var time;
            var timef;
            var sumtime;
            var empty = 0;
            var title;
            var serverRe = 0;
            var arrTask = ["1@361", "2@557", "3@361", "4@37", "5@181", "6@361", "7@111", "8@361", "9@557"];
            var arrTitle = ["全民挖地球", "后门要牢固", "别动我的粮饷", "师兄需要你", "魔鬼式训练", "你吃了吗", "叛徒必须死", "你的都是我的", "偷窥可以有"];
            var arrTaskCool = new Array(arrTask.length);
            for (var i = 0; i < arrTask.length; i++) {
                arrTaskCool[i] = 0
            }

            var auto_force_interval = setInterval(function(){
                if (force_level == 1000) {
                    Mojo.ajax('/force/playerTasks', {}, function (result) {
                        Mojo.app.toast.show2("[内政]尝试获取势力内政信息", 20000);
                        if (result.errorCode == 0) {
                            force_level = result.data.task.force_level;
                            var tasks = result.data.task.tasks;
                            for (var i in tasks) {
                                var task = tasks[i];
                                if (parseInt(task.unlock_level) > parseInt(result.data.task.force_level) || task.status == 2) {
                                    arrTaskCool[task.id - 1] = "-1";
                                }
                            }
                            self._getGrain();
                        } else if (result.errorCode == 130019) {
                            Mojo.app.toast.show2("[内政]无法内政:未加入势力");
                            window.clearInterval(auto_force_interval);
                            self.auto_finish(fn);
                        }
                    }, function () {});
                } else if (fbindex < arrTaskCool.length) {
                    time = parseInt(new Date().getTime() / 1000);
                    var fubenid = arrTask[fbindex].split('@')[0];
                    var fubencool = arrTask[fbindex].split('@')[1];
                    Mojo.ajax('/force/doTask', {
                        id: fubenid,
                    }, function (result) {
                        title = arrTitle[fbindex];
                        if (result.errorCode == 0) {
                            arrTaskCool[fbindex] = time + parseInt(fubencool);
                            Mojo.app.toast.show2("[内政]执行: " + title, "20000");
                            serverRe = 0
                            for (i = fbindex + 1; i < arrTaskCool.length; i++) {
                                if (arrTaskCool[i] != '-1' && arrTaskCool[i] - time < 0) {
                                    break
                                }
                            }
                            fbindex = i
                        } else if (result.errorCode == 1) {} else if (result.errorCode == 130100) {
                            arrTaskCool[fbindex] = '-1';
                            for (i = fbindex + 1; i < arrTaskCool.length; i++) {
                                if (arrTaskCool[i] != '-1' && arrTaskCool[i] - time < 0) {
                                    break
                                }
                            }
                            fbindex = i
                        } else if (result.errorCode == 160003) {
                            alert('卡牌容量不足');
                        } else if (result.errorCode == 20004) {
                            for (i = fbindex + 1; i < arrTaskCool.length; i++) {
                                if (arrTaskCool[i] != '-1' && arrTaskCool[i] - time < 0) {
                                    break
                                }
                            }
                            fbindex = i;
                            serverRe = 0
                        } else if (result.errorCode == 20002) {
                            arrTaskCool[fbindex] = '-1';
                            for (i = fbindex + 1; i < arrTaskCool.length; i++) {
                                if (arrTaskCool[i] != '-1' && arrTaskCool[i] - time < 0) {
                                    break
                                }
                            }
                            fbindex = i;
                            if (serverRe == 1) {;
                                serverRe = 0;
                                for (i = 0; i < arrTask.length; i++) {
                                    arrTaskCool[i] = '-1'
                                }
                                fbindex = arrTask.length + 1
                            }
                        } else if (result.errorCode == 130019) {
                            Mojo.app.toast.show2("[内政]无法内政:未加入势力");
                            self.auto_finish(fn);
                        } else {}
                    }, function () {}, {})
                } else {
                    timef = parseInt(new Date().getTime() / 1000);
                    sumtime = 0;
                    for (i = 0; i < arrTaskCool.length; i++) {
                        sumtime = sumtime + parseInt(arrTaskCool[i]);
                        if (arrTaskCool[i] != '-1' && arrTaskCool[i] - timef < 0) {
                            fbindex = i
                        }
                    }
                    if (sumtime == -9) {
                        empty++;
                        if (empty == 1) {
                            Mojo.ajax('/force/playerTasks', {}, function (result) {
                                if (result.errorCode == 0) {
                                    Mojo.app.toast.show2("[内政]尝试接收系统刷新", "20000");
                                    force_level = result.data.task.force_level;
                                    var tasks = result.data.task.tasks;
                                    for (var i in tasks) {
                                        var task = tasks[i];
                                        if (task.status == 2 || parseInt(task.unlock_level) > parseInt(result.data.task.force_level)) {
                                            arrTaskCool[task.id - 1] = "-1";
                                        } else {
                                            arrTaskCool[task.id - 1] = 0;
                                        }
                                    }
                                    fbindex = 0;
                                    serverRe = 1
                                }
                            }, function () {})
                        } else if (empty >= 2) {
                            Mojo.ajax('/force/acceptRefreshTask', {}, function (result) {
                                if (result.errorCode == 0) {
                                    Mojo.app.toast.show2("[内政]自动接收官员刷新", "20000");
                                    for (i = 0; i < arrTask.length; i++) {
                                        arrTaskCool[i] = 0
                                    }
                                    fbindex = 0
                                } else{
                                    window.clearInterval(auto_force_interval);
                                    self.auto_finish(fn);
                                }
                            });
                        }
                    } else {
                        window.clearInterval(auto_force_interval);
                        self.auto_finish(fn);
                    }
                }
            }, self.auto_time(fn));
        },
        auto_zhufushi: function(fn){
            var self = this;
            setTimeout(function(){
                Mojo.ajax('/force/exchange', {
                    id: "dh0001"
                }, function (result) {
                    if (result.errorCode == 0) {
                        Mojo.app.toast.show2("[兑换]势力兑换成功，获得祝福石");
                    } else {
                        Mojo.app.toast.show2("[兑换]兑换祝福石失败：" + result.errorMsg);
                    }
                    self.auto_finish(fn);
                }, function () {
                    Mojo.app.toast.show2("[兑换]兑换祝福石失败");
                    self.auto_finish(fn);
                });
            },1300);
        },
        auto_force_exchange: function(fn, fn_param){
            //25女将蛋
            var self = this;
            var fex_text={"dh0001":"祝福石","dh0002":"分解卷","dh0101":"三星女将扭蛋","dh0102":"三星将领扭蛋","dh0103":"四星装备扭蛋","dh0104":"三星东汉扭蛋","dh0105":"四星东汉扭蛋","dh0137":"四星求仙问道扭蛋"};
            var fex_list = "dh0001,dh0002";
            if(fn_param)fex_list=fn_param;
            var fex = fex_list.split(',');
            var index = 0;

            var fex_iv = setInterval(function(){
                if(index < fex.length){
                    var fid = fex[index];
                    var msg = "[势力兑换]兑换";
                    if(fex_text[fid])msg+=fex_text[fid];

                    Mojo.ajax('/force/exchange', {id: fid}, function (result) {
                        if (result.errorCode == 0) {
                            msg += "成功";
                            if(result.data && result.data.entities && result.data.entities.length>0){
                                msg += "，获得:" + result.data.entities[0].name;
                            }
                            Mojo.app.toast.show2(msg);
                        } else {
                            msg+="失败:"+result.errorMsg;
                            Mojo.app.toast.show2(msg);
                        }
                        index = index+1;
                    }, function () {
                        Mojo.app.toast.show2("[兑换]势力兑换失败");
                        self.auto_finish(fn);
                    });
                }else{
                    window.clearInterval(fex_iv);
                    self.auto_finish(fn);
                }
            }, self.auto_time(fn));
        },
        auto_activity: function(fn){
            // 活动兑换，只兑换:蒋干＋蒙古马＋银币. 自动购买蒋干/蒙古马, 但需要自己留够银币
            var self = this;
            var flag = true;
            var activities = [];
            var buy1 = false;
            var buy2 = false;

            var params = {};
            var ac = null;
            var conditions = [];
            var activity_iv = setInterval(function(){
                if(flag){
                    var listParams={
                        start: 0,
                        count: 20,
                        type: 4,
                        sub_type: 0,
                    };
                    Mojo.ajax("/illustration/list", listParams, function(result){
                        if(result.errorCode==0 && result.data && result.data.list){
                            flag = false;
                            Mojo.app.toast.show2("[活动]同步活动信息");
                            $.each(result.data.list, function(i, item){
                                var jg = false;
                                var mgm = false;
                                var yb = false;
                                $.each(item.conditions, function(i,cond){
                                    if(cond.entity && cond.entity.name=="蒋干"){
                                        jg = true;
                                        if(cond.player_entity_count<10)buy1=true;
                                    }
                                    if(cond.entity && cond.entity.name=="蒙古马"){
                                        mgm = true;
                                        if(cond.player_entity_count<10)buy2=true;
                                    }
                                    if(cond.entity && cond.entity.name=="银币"){
                                        yb = true;
                                    }
                                });

                                if(item.could_do && jg && mgm && yb && parseInt(item.cooling_time)==0){
                                    activities.push(item);
                                }
                            });

                            if(activities.length >0){
                                ac = activities[0];
                                params = {};
                                conditions= [];
                                params.game_activity_id = ac.id;
                                $.each(ac.conditions, function(i, cond){
                                    if(cond.need_choose) conditions.push(cond);
                                });
                            }else{
                                window.clearInterval(activity_iv);
                                self.auto_finish(fn);
                            }
                        }else{
                            window.clearInterval(activity_iv);
                            self.auto_finish(fn);
                        }
                    }, function(){
                        Mojo.app.toast.show2("[活动]同步活动信息失败");
                        window.clearInterval(activity_iv);
                        self.auto_finish(fn);
                    });
                }else if (buy1){
                    buy1 = false;
                    //购买蒋干
                    Mojo.ajax("/mall/buy", {"id":"sp0105"}, function(result){
                        if(result.errorCode == 0){
                            Mojo.app.toast.show2("[活动]自动购买一大波蒋干成功");
                        }else{
                            Mojo.app.toast.show2("[活动]自动购买蒋干失败:" + result.errorMsg);                            
                        }
                    }, function(){
                        Mojo.app.toast.show2("[活动]自动购买蒋干失败");
                    })
                }else if (buy2){
                    buy2 = false;
                    //购买蒙古马
                    Mojo.ajax("/mall/buy", {"id":"sp0107"}, function(result){
                        if(result.errorCode == 0){
                            Mojo.app.toast.show2("[活动]自动购买一大波蒙古马成功");
                        }else{
                            Mojo.app.toast.show2("[活动]自动购买蒙古马失败:" + result.errorMsg);                            
                        }
                    }, function(){
                        Mojo.app.toast.show2("[活动]自动购买蒙古马失败");
                    })
                }else if(activities.length > 0){
                    if(conditions.length>0){
                        var cond = conditions[0].id;
                        Mojo.ajax("/gameactivity/choose", {
                            start: 0,
                            count: 1,
                            condition_id: cond
                        }, function(response){
                            if(response.errorCode == 0){
                                eval("params.condition_" + cond + " = " + response.data.list[0].player_entity_id + ";");
                                conditions.splice(0,1);
                            }else{
                                window.clearInterval(activity_iv);
                                self.auto_finish(fn);
                            }
                        } , function(){
                            window.clearInterval(activity_iv);
                            self.auto_finish(fn);
                        });
                    }else{
                        Mojo.ajax("/gameactivity/do", params, function (response1) {
                            if(response1.errorCode==0){
                                if(response1.data && response1.data.entity){
                                    Mojo.app.toast.show2("[活动]兑换"+ac.name+"成功，获得"+response1.data.entity.name);
                                }
                            }else{
                                Mojo.app.toast.show2("[活动]兑换"+ac.name+"失败："+response1.errorMsg);
                            }
                            activities=[];
                            window.clearInterval(activity_iv);
                            self.auto_finish(fn);
                        }, function(){
                            Mojo.app.toast.show2("[活动]兑换"+ac.name+"失败:网络异常");
                            self.auto_finish(fn);
                        });
                    }
                }else{
                    window.clearInterval(activity_iv);
                    self.auto_finish(fn);
                }
            }, self.auto_time(fn));
        },
        auto_finish: function(fn){
            var self = this;
            var found=-1;
            $.each(self._fn, function(i, f){
                if(f.indexOf(fn)>=0){
                    found = i;
                    return false;
                }
            })
            if(found>=0){
                self._fn.splice(found,1);
            }
            if(self._fn.length<=0){
                Mojo.app.toast.show2("本轮自动任务已全部完成,2秒后切换下一个账号");
                setTimeout(function () {
                    Mojo.app.redirect("/default/login");
                }, 2000);
            }
        },
        auto_force_suipian: function(fn){
            var self=this;
            setTimeout(function(){
                Mojo.ajax("/force/exchangelist",{},
                function(result){
                    if(result.errorCode==0 && result.data && result.data.list){
                        var sid="";
                        var cold_down=0;
                        $.each(result.data.list, function(i,item){
                            if(item.description.indexOf("活动碎片")>=0){
                                sid=item.id;
                                cold_down=parseInt(item.cold_down);
                                return false;
                            }
                            return true;
                        });
                        if(sid){
                            if(cold_down>0){
                                Mojo.app.toast.show2("[活动]兑换活动碎片失败:冷却中");
                                self.auto_finish(fn);
                            }else{
                                setTimeout(function(){
                                    Mojo.ajax('/force/exchange', {
                                        id: sid
                                    }, function (exchange) {
                                        if (exchange.errorCode == 0) {
                                            var sp_award = "";
                                            if (exchange.data && exchange.data.entities && exchange.data.entities.length > 0) {
                                                sp_award = "，获得" + exchange.data.entities[0].name;
                                            }
                                            Mojo.app.toast.show2("[兑换]势力兑换活动碎片成功" + sp_award);
                                        } else {
                                            Mojo.app.toast.show2("[兑换]兑换活动碎片失败：" + exchange.errorMsg);
                                        }
                                        self.auto_finish(fn);
                                    }, function () {
                                        Mojo.app.toast.show2("[活动]兑换活动碎片网络异常");
                                        self.auto_finish(fn);
                                    });
                                }, self.auto_time(fn));
                            }
                        }else{
                            Mojo.app.toast.show2("[活动]未发现活动碎片");
                            self.auto_finish(fn);
                        }
                    }else{
                        Mojo.app.toast.show2("[活动]获取活动碎片id失败");
                        self.auto_finish(fn);
                    }
                }, 
                function(){
                    Mojo.app.toast.show2("[活动]获取活动碎片id异常");
                    self.auto_finish(fn);
                });
            }, self.auto_time(fn));  
        },
        auto_collect: function(fn){
            var self=this;
            var robs = ["b101", "b102", "b103", "b104", "b105", "b106", "b107", "b108", "b109", "b110"];
            var robname = ["孟德新书", "兵书24篇", "遁甲天书", "春秋左氏传", "史记", "太平要术", "六韬", "孙子兵法", "青囊书", "玉玺"];
            var robid = 0;
            var compositestart = false;

            var auto_collect_interval = setInterval(function(){
                if (compositestart == false) {
                    Mojo.ajax('/collect/composite', {
                        id: robs[robid]
                    }, function (result) {
                        if (result.errorCode == 50003) {
                            msg = result.errorMsg;
                            msgindex = msg.indexOf("剩余时间");
                            if (msgindex != -1) {
                                msg = msg.substring(msgindex);
                                Mojo.app.toast.show2("[合成]" + robname[robid] + "正在合成中," + msg, "20000");
                                compositestart = !compositestart;
                                robid = robid + 1;
                                if (robid >= robs.length) {
                                    window.clearInterval(auto_collect_interval);
                                    self.auto_finish(fn);
                                }
                            }
                        } else if (result.errorCode == 0) {
                            Mojo.app.toast.show2("[合成]收获 " + robname[robid] + " 1本", "20000");
                        }
                        compositestart = !compositestart;
                    }, function () {}, {});
                } else {
                    Mojo.ajax('/collect/compositeStart', {
                        id: robs[robid]
                    }, function (result) {
                        if (result.errorCode == 50001) {} else if (result.errorCode == 0) {
                            Mojo.app.toast.show2("[合成]开始合成:" + robname[robid], "20000");
                        }
                        robid = robid + 1;
                        if (robid >= robs.length) {
                            window.clearInterval(auto_collect_interval);
                            self.auto_finish(fn);
                        }
                        compositestart = !compositestart;
                    }, function () {}, {});
                }
            }, self.auto_time(fn));
        },
        auto_fuben_internal: function(fn, fubens, fubens_refresh, fn_param){
            var self = this;
            var to_ref=fubens_refresh;
            var fb_tasks=[];
            var cur_fuben_index=0;
            var cur_fb_task_group;
            var is_boss_group = false;
            var boss_award = (fn_param == "award");
            var iv_time = self.auto_time(fn);
            var runs=0;
            var needwait=false;
            var time = new Date().getTime() / 1000;

            var auto_fuben_iv = setInterval(function(){
                // Mojo.app.toast.show2("cur_fuben_index="+cur_fuben_index);
                if(to_ref.length>0){
                    Mojo.ajax('/fuben/fbTasks', {fuben_id:to_ref[0].id,fuben_refresh:1}, function (result) {
                        if(result.errorCode == 0){
                            Mojo.app.toast.show2("[副本]["+to_ref[0].name +"]重置成功");
                            fubens.push(to_ref.splice(0,1));
                        }else{
                            to_ref.splice(0,1);
                        }
                    }, function () {}); 
                }else if(cur_fuben_index < fubens.length){
                    //do fuben
                    var cur_fuben = fubens[cur_fuben_index];
                    var fuben_name = cur_fuben.name;
                    if(fb_tasks.length==0){
                        // query current task group and tasks.
                        Mojo.ajax("/fuben/fbTasks", {"fuben_id":cur_fuben.id}, function (response) {
                            if(response.errorCode==0){
                                var fdata=response.data;
                                if(runs==0){
                                    Mojo.app.toast.show2("[副本]["+fuben_name+"]:刷新任务列表");
                                }
                                fb_tasks = fdata.fb_tasks;
                                // get current group
                                for(var gi in fdata.fb_task_groups){
                                    if(fdata.fb_task_groups[gi].fb_task_group_id==fdata.cur_fb_task_group.fb_task_group_id){
                                        cur_fb_task_group = fdata.fb_task_groups[gi];
                                    }
                                }
                                //check if the boss group
                                is_boss_group=(cur_fb_task_group.order==fdata.fb_task_groups.length);
                            }else{
                                Mojo.app.toast.show2("[副本]["+fuben_name+"]:刷新任务列表失败");
                                fb_tasks=[];
                                cur_fuben_index = cur_fuben_index+1;
                            }
                        }, function(){});
                    }else{
                        var group_name=cur_fb_task_group.name;
                        // find available task
                        for(t_i=0;t_i<fb_tasks.length;t_i++){
                            if(fb_tasks[t_i].unlock==0)continue;
                            if((fb_tasks[t_i].status==1 && fb_tasks[t_i].cold_down==0) || fb_tasks[t_i].status==0){
                                break;
                            }
                        }
                        //if cound, do task
                        if(t_i < fb_tasks.length){
                            Mojo.ajax("/fuben/do",{id: fb_tasks[t_i].id},function(result){
                                // Mojo.app.toast.show2("[debug]/fuben/do.result:"+result.errorCode+":"+result.errorMsg);
                                if(result.errorCode == 160003){
                                    Mojo.app.toast.show2("[副本]["+fuben_name+"]失败:卡牌容量不足");
                                    window.clearInterval(auto_fuben_iv);
                                    self.auto_finish(fn);
                                }else if(result.errorCode==0){
                                    var bonus = result.data.award.bonus;
                                    var bonus_msg="";
                                    if(bonus && bonus.entities && bonus.entities.length>0){
                                        bonus_msg = ",获得："+bonus.entities[0].name;
                                    }
                                    Mojo.app.toast.show2("[副本]["+fuben_name+"]["+group_name+"]["+fb_tasks[t_i].name+"]执行成功"+bonus_msg);
                                    fb_tasks[t_i].status=result.data.fb_task.status;
                                    fb_tasks[t_i].cold_down=result.data.fb_task.cold_down;
                                    //if have award, get award and go to next group
                                    // Mojo.app.toast.show2("[debug]result.data.fb_task.status="+result.data.fb_task.status);
                                    if(result.data.fb_task.status==3){
                                        //get award
                                        var a_task_id=fb_tasks[t_i].id;
                                        if(!is_boss_group || boss_award){
                                            setTimeout(function(){
                                                Mojo.ajax("/fuben/getAward", {
                                                    id: a_task_id,
                                                }, function (garesult) {
                                                    if (garesult.errorCode == 0) {
                                                        Mojo.ajax("/fuben/openAward", {
                                                            id: a_task_id,
                                                            award_id: garesult.data.free_award.id,
                                                            status: 1,
                                                        }, function (oaresult) {
                                                            if(oaresult.errorCode==0 && oaresult.data && oaresult.data.entity){
                                                                Mojo.app.toast.show2("[副本]["+fuben_name+"]["+group_name+"]领奖获得："+oaresult.data.entity.name);
                                                            }
                                                        }, function () {
                                                            Mojo.app.toast.show2("[副本]领奖失败");
                                                        });
                                                    }else{
                                                        Mojo.app.toast.show2("[副本]领奖失败：获取奖品id失败");
                                                    }
                                                }, function(){
                                                    Mojo.app.toast.show2("[副本]领奖失败：无法获取奖品id");
                                                }); 
                                            },1000);
                                        }
                                        //go to next group if any.
                                        fb_tasks=[];
                                        if(is_boss_group){
                                            cur_fuben_index=cur_fuben_index+1;
                                            fb_tasks=[];
                                        }
                                    }else if(result.data.fb_task.status==1 && parseInt(fb_tasks[t_i].id)%5==1){
                                        needwait = true;
                                    }else{
                                        //check if mini-boss task can be unlocked.
                                        var f_f=true;
                                        $.each(fb_tasks,function(minii,t){
                                            if(t.status!=2){
                                                f_f=false;
                                                if(minii==4)f_f=true;
                                                return f_f;
                                            }
                                        });          
                                        if(f_f){fb_tasks[4].status=1;}
                                    }
                                }else{
                                    cur_fuben_index=cur_fuben_index+1;
                                    fb_tasks=[];
                                }
                            },function(){});
                        }else if(fb_tasks[fb_tasks.length-1].status==3){
                            //领奖
                            var a_task_id = fb_tasks[fb_tasks.length-1].id;
                            if(!is_boss_group || boss_award){
                                Mojo.ajax("/fuben/getAward", {
                                    id: a_task_id,
                                }, function (garesult) {
                                    if (garesult.errorCode == 0) {
                                        Mojo.ajax("/fuben/openAward", {
                                            id: a_task_id,
                                            award_id: garesult.data.free_award.id,
                                            status: 1,
                                        }, function (oaresult) {
                                            if(oaresult.errorCode==0 && oaresult.data && oaresult.data.entity){
                                                Mojo.app.toast.show2("[副本]["+fuben_name+"]["+group_name+"]领奖获得："+oaresult.data.entity.name);
                                            }
                                        }, function () {
                                            Mojo.app.toast.show2("[副本]领奖失败");
                                        });
                                    }else{
                                        Mojo.app.toast.show2("[副本]领奖失败：获取奖品id失败");
                                    }
                                }, function(){
                                    Mojo.app.toast.show2("[副本]领奖失败：无法获取奖品id");
                                }); 
                            }

                            // no matter the result of get award, go to next fuben
                            cur_fuben_index=cur_fuben_index+1;
                            fb_tasks=[];
                        }
                        else{
                            //if not found, go to next fuben and reset tasks.
                            cur_fuben_index=cur_fuben_index+1;
                            fb_tasks=[];
                        }
                    }                                   
                }else{
                    fb_tasks=[];
                    cur_fuben_index=0;
                    if(needwait){
                        if(runs>=1){
                            window.clearInterval(auto_fuben_iv);
                            self.auto_finish(fn);
                        }else if(new Date().getTime() / 1000 > time+30){
                            runs=runs+1;
                            time = date.getTime()/1000;
                        }
                    }else{
                        window.clearInterval(auto_fuben_iv);
                        self.auto_finish(fn);
                    }
                }
            }, iv_time);
        },
        auto_fuben: function(fn, fn_param){
            var self=this;
            var fubens = [];
            var fubens_refresh=[];
            Mojo.ajax('/fuben/fubens', {}, function (result) {
                if (result.errorCode == 0) {
                    Mojo.app.toast.show2("[副本]初始化副本信息");
                    $.each(result.data.list, function (i, fb) {
                        //unlock: 1=unlocked, 0=locked
                        //status: 0=init, 1=ing, 3=cold_down
                        if (fb.unlock == 1) {
                            if (fb.status == 1) {
                                fubens.push(fb);
                            } else if (fb.status == 0 || (fb.status == 3 && fb.cold_down == 0)) {
                                fubens_refresh.push(fb);
                            } else if(fb.status ==2 ){//领奖
                                fubens.push(fb);
                            }
                        }
                    });
                    if(fubens.length + fubens_refresh.length==0){
                        self.auto_finish(fn);
                    }else{
                        self.auto_fuben_internal(fn, fubens, fubens_refresh, fn_param);
                    }
                } else {
                    Mojo.app.toast.show2("[副本]初始化失败:(" + result.errorCode + ")" + result.errorMsg);
                    self.auto_finish(fn);
                }
            }, function () {});
        },
        auto_biansuiweibao: function(fn){
            var self = this;
            var listParams={
                start: 0,
                count: 20,
                type: 4,
                sub_type: 0,
            };
            Mojo.ajax("/illustration/list", listParams, function (result) {
                if(result.errorCode==0){
                    var finished = true;
                    for (var i in result.data.list) {
                        var awardname = result.data.list[i].award.name;
                        var name = result.data.list[i].name;
                        if ((awardname == "祝福石" || awardname=="转生丹") && name == "变碎为宝活动") {
                            var params={};
                            params.game_activity_id = result.data.list[i].id;
                            var cd = result.data.list[i].cooling_time;
                            if(parseInt(cd) == 0){
                                finished = false;
                                setTimeout(function(){
                                    Mojo.ajax("/gameactivity/do", params, function (response1) {
                                        if(response1.errorCode==0){
                                            if(response1.data && response1.data.entity){
                                                Mojo.app.toast.show2("[兑换]变废为宝，获得"+response1.data.entity.name);
                                            }
                                        }else{
                                            Mojo.app.toast.show2("[兑换]变废为宝失败："+response1.errorMsg);
                                        }
                                        self.auto_finish(fn);
                                    }, function(){
                                        Mojo.app.toast.show2("[兑换]变废为宝失败：网络异常");
                                        self.auto_finish(fn);
                                    });
                                }, self.auto_time("bswb"));
                            }
                        }
                    }
                    if(finished){
                        self.auto_finish(fn);
                    }
                }else{
                    self.auto_finish(fn);
                }
            }, function(){
                Mojo.app.toast.show2("[兑换]变废为宝失败：网络异常");
                self.auto_finish(fn);
            });
        },
        auto_qiandai: function(fn){
            var self = this;
            var cond;
            var listParams={
                start: 0,
                count: 20,
                type: 4,
                sub_type: 0,
            };
            setTimeout(function(){
                Mojo.ajax("/illustration/list", listParams, function (result) {
                    if(result.errorCode==0){
                        var finished = true;
                        for (var i in result.data.list) {
                            var awardname = result.data.list[i].award.name;
                            var name = result.data.list[i].name;
                            if (awardname == "钱袋" && name == "变碎为宝活动") {
                                var params={};
                                params.game_activity_id = result.data.list[i].id;
                                cond = result.data.list[i].conditions[2].id;
                                var cd = result.data.list[i].cooling_time;
                                if(parseInt(cd) == 0 && result.data.list[i].could_do){
                                    finished = false;
                                    setTimeout(function(){
                                        Mojo.ajax("/gameactivity/choose", {
                                            start: 0,
                                            count: 1,
                                            condition_id: cond
                                        }, function (response) {
                                            if (response.errorCode == 0) {
                                                eval("params.condition_" + cond + " = " + response.data.list[0].player_entity_id + ";");
                                                setTimeout(function(){
                                                    Mojo.ajax("/gameactivity/do", params, function (response1) {
                                                        if(response1.errorCode==0){
                                                            if(response1.data && response1.data.entity){
                                                                Mojo.app.toast.show2("[兑换]变废为宝，获得"+response1.data.entity.name);
                                                            }
                                                        }else{
                                                            Mojo.app.toast.show2("[兑换]变废为宝失败："+response1.errorMsg);
                                                        }
                                                        self.auto_finish(fn);
                                                    }, function(){
                                                        Mojo.app.toast.show2("[兑换]变废为宝失败：网络异常");
                                                        self.auto_finish(fn);
                                                    });
                                                },2000);
                                            }else{self.auto_finish(fn);}
                                        });
                                    }, 2000);
                                }
                            }
                        }
                        if(finished){
                            self.auto_finish(fn);
                        }
                    }else{
                        self.auto_finish(fn);
                    }
                }, function(){
                    Mojo.app.toast.show2("[兑换]变废为宝失败：网络异常");
                    self.auto_finish(fn);
                });
            }, self.auto_time(fn));
        },
        auto_mission: function(fn){
            var self=this;
            var init = false;
            var scenario;
            var task_group;
            var tasks=[];
            var t_index=0;
            var mission_interval = setInterval(function(){
                if(!init){
                    Mojo.ajax("/mission", {}, function (result) {
                        if(result.errorCode==0){
                            init = true;
                            Mojo.app.toast.show2("[任务]初始化任务列表");
                            scenario = result.data.cur_scenario;
                            task_group = result.data.cur_task_group;
                            tasks = result.data.tasks;
                        }else{
                            Mojo.app.toast.show2("[任务]初始化失败:"+result.errorMsg);
                            self.auto_finish(fn);
                        }
                    }, function(){});
                }else{
                    for(i=t_index;i<tasks.length;i++){
                        if(tasks[i].unlock=="1" && (tasks[i].status=="1" || tasks[i].status=="0")){
                            t_index=i;
                            break;
                        }
                    }
                    if(t_index<5){
                        var _ct=tasks[t_index];
                        var prefix="[任务]["+scenario.name+"]["+task_group.name+"]["+_ct.name+"]";
                        Mojo.ajax("/mission/do",{"id":_ct.id,"preview":0},function(result){
                            if(result.errorCode==0){
                                var msg=prefix + "执行成功";
                                if(result.data.award&&result.data.award.bonus&&result.data.award.bonus.entities){
                                    msg=msg+",获得:"+result.data.award.bonus.entities[0].name;
                                }
                                Mojo.app.toast.show2(msg);
                                if(result.data.task){
                                    if(result.data.task.count==result.data.task.sum_count){
                                        tasks[t_index].status=2;                                      
                                        t_index=t_index+1;
                                    }
                                }
                                var unlockboss=true;
                                for(j=0;j<tasks.length-1;j++){
                                    if(tasks[j].status!=2){
                                        unlockboss=false;
                                        break;
                                    }
                                }
                                if(unlockboss){
                                    tasks[tasks.length-1].unlock=1;
                                }
                                if(result.data.player){
                                    // keep 20% energy for fuben
                                    var ep=parseInt(result.data.player.ep);
                                    var energy=parseInt(result.data.player.energy);
                                    if(ep/energy<0.2){
                                        self.auto_finish(fn);
                                        clearInterval(mission_interval);
                                    }
                                }
                            }else if (result.errorCode == 10002){
                                Mojo.app.toast.show2("[任务]体力值不足");
                                self.auto_finish(fn);
                                clearInterval(mission_interval);
                            }else if (result.errorCode == 160003){
                                Mojo.app.toast.show2("[任务]卡牌容量不足");
                                self.auto_finish(fn);
                                clearInterval(mission_interval);
                            }else if(result.errorCode==20002){
                                tasks[t_index].status=2;
                                t_index=t_index+1;
                            }
                        },function(){});
                    }else{
                        self.auto_finish(fn);
                    }
                }
            }, self.auto_time(fn));
        },
        auto_huangjin: function(fn){
            var self=this;
            setTimeout(function(){
                Mojo.ajax("/mall/rands",{},function(result){
                    if(result.errorCode==0){
                        Mojo.app.toast.show2("[黄巾]获取黄巾宝藏列表");
                        var goods;
                        if(result.data && result.data.list){
                            $.each(result.data.list, function(gi,good){
                                if(good.money_type=="1" && (good.entities.name=="转生丹"||good.entities.name=="祝福石"||good.entities.name=="体力大还丹"||good.entities.name=="钱箱")){
                                    goods=good;
                                    return false;
                                }
                            });
                        }
                        if(goods){
                            if(goods.bought==0){
                                setTimeout(function(){
                                    Mojo.ajax("/mall/exchange", {"id":goods.id}, function (response){
                                        if(response.errorCode==0){
                                            Mojo.app.toast.show2("[黄巾]购买黄巾宝藏，获得:"+goods.entities.name);
                                        }else{
                                            Mojo.app.toast.show2("[黄巾]失败:"+response.errorMsg);
                                        }
                                        self.auto_finish(fn);
                                    },function(){
                                        Mojo.app.toast.show2("[黄巾]购买黄巾宝藏异常");
                                        self.auto_finish(fn);
                                    });
                                },1500);
                            }else{
                                Mojo.app.toast.show2("[黄巾]购买黄巾宝藏失败：已购买");
                                self.auto_finish(fn);
                            }
                        }else{
                            self.auto_finish(fn);
                        }
                    }else{
                        Mojo.app.toast.show2("[黄巾]获取黄巾宝藏失败："+result.errorMsg);
                        self.auto_finish(fn);
                    }
                },function(){
                    Mojo.app.toast.show2("[黄巾]获取黄巾宝藏失败");
                    self.auto_finish(fn);
                });
            }, self.auto_time(fn));
        },
        auto_signin: function(fn){
            var self=this;
            setTimeout(function(){
                Mojo.ajax("/player/checkIn", {}, function (result) {
                    if (result.errorCode == 0 && result.data && result.data.award) {
                        var award=result.data.award;
                        var msg = "[签到]已签到,获得:"+award.name+",数量:"+award.count;
                        if(award.is_double) msg=msg+"*2";
                        Mojo.app.toast.show2(msg);
                    } else {
                        Mojo.app.toast.show2("[签到]失败:"+result.errorMsg);
                    }
                    self.auto_finish(fn);
                },function(){
                    Mojo.app.toast.show2("[签到]签到异常");
                    self.auto_finish(fn);
                });
            }, self.auto_time(fn));
        },
        auto_misaward: function(fn){
            var self=this;
            var mav_time = self.auto_time(fn);
            var mai = 0;
            var malist = [];
            setTimeout(function(){
                Mojo.ajax("/mission/taskawardlist", {}, function(result){
                    if(result.errorCode==0 && result.data && result.data.list){
                        for (var i = 0; i < result.data.list.length; i++) {
                            var item = result.data.list[i];
                            if(item.has_done==true && item.cd_time==0){
                                malist.push(item);
                            }
                        };
                        Mojo.app.toast.show2("[任务奖励]获取任务奖励列表成功,可领数量:"+malist.length); 
                        var auto_misaward_iv = setInterval(function(){
                            if(mai<malist.length){
                                var tali = malist[mai];
                                if(tali.has_done==true && tali.cd_time==0){
                                    var msg="[任务奖励]获取`"+tali.task_scenario_name+"`奖励";
                                    Mojo.ajax("/mission/gettaskaward", {task_scenario_id:tali.task_scenario_id}, function(resp){
                                        mai=mai+1;
                                        if(resp.errorCode==0){
                                            msg = msg+"成功";
                                            if(resp.data&&resp.data.entities&&resp.data.entities.length>0){
                                                msg=msg+",获得："+resp.data.entities[0].name;
                                            }
                                            Mojo.app.toast.show2(msg);
                                        }else{
                                           Mojo.app.toast.show2(msg+"失败:"+resp.errorMsg); 
                                        }
                                    }, function(){
                                        Mojo.app.toast.show2(msg+"失败");
                                        mai = mai+1;
                                    });
                                }else{
                                    mai = mai+1;
                                }
                            }else{
                                window.clearInterval(auto_misaward_iv);
                                self.auto_finish(fn);
                            }
                        }, mav_time);
                    } else{
                        Mojo.app.toast.show2("[任务奖励]获取任务奖励列表失败");
                        self.auto_finish(fn);
                    }
                }, function(){
                    Mojo.app.toast.show2("[任务奖励]获取任务奖励列表异常");
                    self.auto_finish(fn);
                });
            }, mav_time);
        },
        auto_salary: function(fn){
            var self=this;
            setTimeout(function(){
                Mojo.ajax("/bg/salary", {}, function (result) {
                    if (result.errorCode == 0) {
                        var msg="[俸禄]自动领取俸禄";
                        if(result.data)msg+=",获得金币："+result.data.gold;
                        Mojo.app.toast.show2(msg);
                    } else {
                        Mojo.app.toast.show2("[俸禄]领取失败:"+result.errorMsg);
                    }
                    self.auto_finish(fn);
                },function(){
                    Mojo.app.toast.show2("[俸禄]领取俸禄异常");
                    self.auto_finish(fn);
                });
            }, self.auto_time(fn));
        },
        auto_bgexchange: function(fn, fn_param){
            var self = this;
            var bgtext={"1":"转生丹","2":"祝福石","8":"体力大还丹","7":"超级宝物蛋","3":"三星将领蛋","4":"三星装备蛋","5":"四星将领蛋","6":"四星装备蛋","16":"轮回符"};
            var bgex_list = "1,2";
            if(fn_param)bgex_list=fn_param;
            var bg = bgex_list.split(",");
            var index = 0;
            
            var auto_bgexchange_iv = setInterval(function(){
                if(index < bg.length){
                    var msg = "[战场兑换]兑换";
                    if(bgtext[bg[index]])msg+=bgtext[bg[index]];
                    Mojo.ajax("/bg/doExchange", {"id": bg[index]}, function(result){
                        if(result.errorCode == 0){
                            msg += "成功";
                            if(result.data && result.data.entities && result.data.entities.length>0){
                                msg += ",获得:"+ result.data.entities[0].name;
                            }
                            Mojo.app.toast.show2(msg);
                        }else{
                            Mojo.app.toast.show2(msg + "失败:"+result.errorMsg);
                        }
                        index = index+1;
                    }, function(){
                        Mojo.app.toast.show2(msg+"失败:网络异常");
                        index = index+1;
                    });
                }else{
                    window.clearInterval(auto_bgexchange_iv);
                    self.auto_finish(fn);
                }
            }, self.auto_time(fn));
        },
        auto_time: function(fn){
            //manage the timeout or interval
            var self = this;
            switch(fn){
                case "zhufushi": return 1250;
                case "signin": return 1750;
                case "huangjin": return 2250;
                case "qiandai": return 2750;
                case "bswb": return 3250;
                case "suipian": return 3750;
                case "salary": return 4250;
                case "fuben": return 3800; //interval
                case "collect": return 3600;//interval
                case "force": return 4000; //interval
                case "mission": return 4200; // interval
                case "activity": return 4400;//inverval
                case "bgexchange": return 4600; //interval
                case "fex": return 4800;//interval
                case "misaward": return 5000; //inverval
                default: return 4000;
            }
        },
        load: function () {
            this._super();
            $('#btn-messages').append('<div class="count" style="display:none;"></div>');
            $('#btn-ranking').append('<div class="count" style="display:none;"></div>');
            var self = this;
            Mojo.ajax('/message', {
                start: 0,
                count: 0,
                type: "all"
            }, function (result) {
                if (result.errorCode == 0) {
                    self._renderMsgCount(result.data.unread.system + result.data.unread.friend + result.data.unread.battle);
                    self._renderRankingCount(result.data.unread.award_count);
                }
            });
            var needLoginStatus = Mojo.utils.getSomething("needLoginStatus");
            var automode = Mojo.app.getStorage("auto-mode");
            if (automode === "true") {
                Mojo.app.toast.show("", 10, true);
                Mojo.app.toast.show2("自动模式已启动");
                Mojo.app.saveStorage("auto-mode-green", "true");
                var user_info = Mojo.app.getStorage("auto-mode-last-user");
                if (!user_info) {
                    if (confirm("当前账号未设置自动任务。是否立即返回登录页?")) {
                        Mojo.app.redirect("/default/login");
                    } else {
                        Mojo.app.saveStorage("auto-mode", "false");
                        Mojo.app.toast.show("自动模式已取消", 3000);
                        return;
                    }
                }
                setTimeout(function(){
                    Mojo.app.toast.show2("执行超时，自动切换下一账号");
                    Mojo.app.redirect("/default/login");
                },300000);
                user = JSON.parse(Mojo.app.getStorage("auto-mode-last-user"));
                self._fn = user.fn;
                $.each(user.fn, function(i,fnp){
                    var fn = fnp.split("@")[0];
                    var fn_param = fnp.split("@")[1];
                    switch(fn){
                        case "fuben":
                            self.auto_fuben(fn, fn_param);
                            break;
                        case "suipian":
                            self.auto_force_suipian(fn);
                            break;
                        case "zhufushi":
                            self.auto_zhufushi(fn);
                            break;
                        case "force":
                            self.auto_force(fn);
                            break;
                        case "collect":
                            self.auto_collect(fn);
                            break;
                        case "misaward":
                            self.auto_misaward(fn);
                            break;
                        case "biansuiweibao":
                            self.auto_biansuiweibao(fn);
                            break;
                        case "mission":
                            self.auto_mission(fn);
                            break;
                        case "huangjin":
                            self.auto_huangjin(fn);
                            break;
                        case "signin":
                            self.auto_signin(fn);
                            break;
                        case "qiandai":
                            self.auto_qiandai(fn);
                            break;
                        case "fex":
                            self.auto_force_exchange(fn, fn_param);
                            break;
                        case "activity":
                            self.auto_activity(fn);
                            break;
                        case "salary":
                            self.auto_salary(fn);
                            break;
                        case "bgexchange":
                            self.auto_bgexchange(fn, fn_param);
                            break;
                        default:
                            Mojo.app.toast.show2("未知的自动任务:" + fn);
                            self.auto_finish(fn);
                            break;
                    }
                });
            } else {
                setTimeout(function () {
                    Mojo.gap.bindPlayerIdToDevice(Mojo.app.data.userId);
                }, 1500);
                this.checkLoginGift(true);
            }
        },
        checkLoginGift: function (isFromUrl) {
            if (true === Mojo.app.__checkingLoginGift) {
                return;
            }
            var self = this;
            Mojo.app.__checkingLoginGift = true;
            Mojo.ajax('/player/loginstatus', {}, function (result) {
                if (result.errorCode == 0 && result.data.check_in != null) {
                    Mojo.track.onEvent('03_010');
                    var signIn = new Mojo.com.SignIn(result.data.check_in, {
                        callback: function (player) {
                            self.baseProfile.data(player);
                        },
                        close: function () {
                            if (Mojo.app.isNd) {
                                Mojo.app.data.needLoginStatus = false;
                                self.baseProfile.sync();
                                return;
                            }
                            self.loginremind({
                                hasAward: result.data.check_in
                            });
                        },
                    });
                    setTimeout(function () {
                        signIn.open();
                    }, 300);
                } else if (true === isFromUrl && result.errorCode == 0 && Mojo.utils.isNone(result.data.announcement) == false) {
                    if (Mojo.app.isNd) {
                        Mojo.app.data.needLoginStatus = false;
                        self.baseProfile.sync();
                        return;
                    }
                    self.loginremind();
                } else if (true === isFromUrl) {
                    if (Mojo.app.isNd) {
                        Mojo.app.data.needLoginStatus = false;
                        self.baseProfile.sync();
                        return;
                    }
                    self.loginremind();
                }
                if (result && result.data && result.data.five_star_award) {
                    var count = self._getMsgCount();
                    if (count) {
                        count += 1;
                    } else {
                        count = 1;
                    }
                    self._renderMsgCount(count);
                }
            });
        },
        _yahooPrompt: function () {
            var self = this;
            new Mojo.com.CommonDialog(undefined, {
                title: self.locale('helpful hints'),
                content: self.locale('yahoo prompt'),
                leftBtnText: Mojo.utils.locale('weibo', 'go bind'),
                leftBtnClick: function (that) {
                    that.close();
                    Mojo.app.redirect('/settings', {
                        selected: 1
                    }, 'event', '04_056');
                },
                rightBtnText: Mojo.utils.locale('common', 'close'),
                rightBtnClick: function (that) {
                    that.close();
                }
            }).open();
        },
        _bindSuccessPrompt: function (effectiveEvent, bindingEmail, isWeiboFollowing, isFirstWeibo, weibo) {
            var self = this;
            effectiveEvent = Number(effectiveEvent);
            switch (effectiveEvent) {
            case 1:
                self._oldUserEmailBindSuccess(bindingEmail);
                break;
            case 2:
                self._oldUserWeiboBindSuccess(effectiveEvent, isWeiboFollowing, isFirstWeibo);
                break;
            case 3:
                self._oldUserWeiboBindSuccess(effectiveEvent, isWeiboFollowing, isFirstWeibo, function () {
                    self._oldUserEmailBindSuccess(bindingEmail);
                });
                break;
            case 4:
            case 5:
                new Mojo.com.CommonDialog(undefined, {
                    title: Mojo.utils.locale('weibo', 'merge_prompt_tips'),
                    content: $("<div class='paragraph word-break'>" + self.getL('weibo', 'merge_prompt_content', {
                        weibo: weibo
                    }) + "</div>"),
                    leftBtnText: Mojo.utils.locale('common', 'ok'),
                    leftBtnClick: function (that) {
                        that.close();
                        Mojo.ajax('/user/delayMerge', {}, function (response) {
                            if (response.errorCode == 0) {
                                if (response.data.status == 3) {
                                    new Mojo.com.CommonDialog(undefined, {
                                        title: Mojo.utils.locale('weibo', 'bind succeed'),
                                        content: $("<div class='paragraph word-break'>" + self.getL('weibo', 'weibo bind succeed 7 day ago has card', {
                                            weibo: weibo
                                        }) + "</div>"),
                                        leftBtnText: Mojo.utils.locale('common', 'need_logout'),
                                        leftBtnClick: function (that) {
                                            that.close();
                                        },
                                        close: function () {
                                            Mojo.app.redirect('/default/logout');
                                            if (window.localStorage) {
                                                localStorage['chat-channel-default'] = 0;
                                            }
                                        }
                                    }).open();
                                } else if (response.data.status == 4) {
                                    new Mojo.com.CommonDialog(undefined, {
                                        title: Mojo.utils.locale('weibo', 'bind succeed'),
                                        content: $("<div class='paragraph word-break'>" + self.getL('weibo', 'weibo bind succeed 7 day ago no card', {
                                            weibo: weibo
                                        }) + "</div>"),
                                        leftBtnText: Mojo.utils.locale('common', 'need_logout'),
                                        leftBtnClick: function (that) {
                                            that.close();
                                        },
                                        close: function () {
                                            Mojo.app.redirect('/default/logout');
                                            if (window.localStorage) {
                                                localStorage['chat-channel-default'] = 0;
                                            }
                                        }
                                    }).open();
                                } else if (response.data.status == 5) {
                                    new Mojo.com.CommonDialog(undefined, {
                                        title: self.getL('weibo', 'merge_faild_tips'),
                                        content: $('<div class="paragraph wordBreak"></div>').html(self.getL('weibo', 'merge_faild_content')),
                                        leftBtnText: self.getL('common', 'close'),
                                        leftBtnClick: function (that) {
                                            that.close();
                                        }
                                    }).open();
                                }
                            }
                        }, function () {}, {
                            showWait: true
                        });
                    }
                }).open();
                break;
            case 6:
                new Mojo.com.CommonDialog(undefined, {
                    title: Mojo.utils.locale('weibo', 'merge_prompt_tips'),
                    content: $("<div class='paragraph word-break'>" + self.getL('weibo', 'email_merge_prompt_content', {
                        email: bindingEmail
                    }) + "</div>"),
                    leftBtnText: Mojo.utils.locale('common', 'ok'),
                    leftBtnClick: function (that) {
                        that.close();
                        Mojo.ajax('/user/delayMerge', {}, function (response) {
                            if (response.errorCode == 0) {
                                new Mojo.com.CommonDialog(undefined, {
                                    title: Mojo.utils.locale('weibo', 'Merge Succeed'),
                                    content: $("<div class='paragraph word-break'>" + self.getL('home', 'email bind success tips', {
                                        email: bindingEmail
                                    }) + "</div>"),
                                    leftBtnText: Mojo.utils.locale('common', 'need_logout'),
                                    leftBtnClick: function (that) {
                                        that.close();
                                    },
                                    close: function () {
                                        Mojo.app.redirect('/default/logout');
                                        if (window.localStorage) {
                                            localStorage['chat-channel-default'] = 0;
                                        }
                                    }
                                }).open();
                            } else {
                                new Mojo.com.CommonDialog(undefined, {
                                    title: self.getL('common', 'friendly_tip'),
                                    content: $('<div class="paragraph wordBreak">').html(response.errorMsg),
                                    leftBtnText: self.getL('common', 'close'),
                                    leftBtnClick: function (that) {
                                        that.close();
                                    }
                                }).open();
                            }
                        }, function () {}, {
                            showWait: true
                        });
                    }
                }).open();
                break;
            }
        },
        _showCommonDialog: function (data) {
            var self = this;
            new Mojo.com.CommonDialog(undefined, {
                title: Mojo.utils.locale('weibo', 'bind succeed'),
                content: $("<div class='paragraph word-break'>" + data.message + "</div>"),
                leftBtnText: data.leftBtnText,
                leftBtnClick: function (that) {
                    if (data.leftBtnClick) data.leftBtnClick(that);
                },
                close: function (that) {
                    if (data.close) data.close(that);
                }
            }).open();
        },
        _oldUserWeiboBindSuccess: function (effectiveEvent, isWeiboFollowing, isFirstWeibo, callback) {
            var self = this;
            var content = null;
            var contentKey = '';
            if (isFirstWeibo) {
                if (isWeiboFollowing) {
                    contentKey = 'change weibo success tips0';
                } else {
                    contentKey = 'Bind succeed and why not to follow us';
                }
            } else {
                if (isWeiboFollowing) {
                    contentKey = 'change weibo success tips';
                } else {
                    contentKey = 'Bind Success Tip';
                }
            }
            new Mojo.com.CommonDialog(undefined, {
                title: Mojo.utils.locale('weibo', 'bind succeed'),
                content: $("<div class='paragraph word-break'>" + self.getL('weibo', contentKey) + "</div>"),
                leftBtnText: Mojo.utils.locale('weibo', 'follow'),
                leftBtnClick: function (that) {
                    self.getBindingBouncesBtn = true;
                    that.close();
                },
                close: function () {
                    if (self.getBindingBouncesBtn) {
                        self.getBindingBouncesBtn = null;
                        Mojo.ajax('/user/getBindingBounces', {
                            need_follow: true
                        }, function (result) {});
                    } else {
                        Mojo.ajax('/user/getBindingBounces', {
                            need_follow: false
                        }, function (result) {});
                    }
                    self.bindAwardDlg();
                    if (callback) {
                        callback();
                    }
                }
            }).open();
        },
        _oldUserEmailBindSuccess: function (bindingEmail) {
            var self = this;
            new Mojo.com.CommonDialog(undefined, {
                title: Mojo.utils.locale('weibo', 'bind succeed'),
                content: $("<div class='paragraph word-break'>" + self.getL('home', 'Register Code Tip', {
                    email: bindingEmail || ''
                }) + "</div>"),
                leftBtnText: Mojo.utils.locale('common', 'close'),
                leftBtnClick: function (that) {
                    that.close();
                },
                close: function () {
                    Mojo.ajax('/user/getBindingBounces', {
                        need_follow: false
                    }, function (result) {});
                }
            }).open();
        },
        bindAwardDlg: function () {
            var self = this;
            var dlg = new Mojo.com.CommonDialog(undefined, {
                title: self.getL('home', 'bind award tips'),
                content: $('<div class="paragraph word-break"><div class="title-tips">' + self.getL('home', 'bind_rebirth_drug_content') + '</div><div class="awards"><div class="card-gift image"><div class="iphone mojo-com-entity-small"><div class="card-image-url"></div><div class="minis-flag" style="display: none;"></div></div><div class="count">10</div></div><div class="name">' + self.getL('home', 'bind_rebirth_drug') + '</div></div></div>'),
                leftBtnText: self.getL('common', 'close'),
                leftBtnClick: function (that1) {
                    that1.close();
                }
            });
            dlg.element().addClass('home_award_dlg');
            dlg.open();
        },
        _oldAccountPrompt: function () {
            var self = this;
            new Mojo.com.CommonDialog(undefined, {
                title: self.locale('helpful hints'),
                content: $("<div class='paragraph word-break'>" + self.locale('account secrity prompt') + "</div>"),
                leftBtnText: Mojo.utils.locale('weibo', 'go bind'),
                leftBtnClick: function (that) {
                    that.close();
                    Mojo.app.redirect('/settings', {
                        selected: 1
                    }, 'event', '04_056');
                },
                rightBtnText: Mojo.utils.locale('common', 'close'),
                rightBtnClick: function (that) {
                    that.close();
                }
            }).open();
        },
        _getMsgCount: function () {
            var count = $('#btn-messages > .count').html();
            if (Mojo.utils.isNone(count)) {
                count = 0;
            } else {
                count = parseInt(count);
            }
            return count;
        },
        _renderMsgCount: function (n) {
            if (n <= 0) {
                $('#btn-messages > .count').html(n).hide();
            } else {
                $('#btn-messages > .count').html(n).show();
            }
        },
        _renderRankingCount: function (n) {
            if (n <= 0) {
                $('#btn-ranking > .count').html(n).hide();
            } else {
                $('#btn-ranking > .count').html(n).show();
            }
        },
        debugable: function () {
            return Mojo.utils.debug.vars.page.home;
        },
        _newPlayerGift: function () {
            var self = this;
            var newPlayerTutorial = undefined;
            var newPlayerAwardDiv = $('<div id="new-player-award"></div>');
            var generalList = {};
            var chooseGeneralId = undefined;
            var elmDiv1 = $('<div class="new-player-awards"></div>');
            var elmDiv2 = $('<div class="new-player-awards"></div>');
            Mojo.ajax("/bonus/NewPlayerAwardList", {}, function (response) {
                if (response && response.errorCode === 0) {
                    for (var index in response.data.list) {
                        var data = response.data.list[index];
                        var obj = new Mojo.Object(undefined, {
                            classes: ['new-player-award-element', 'image'],
                        });
                        obj.element().append('<img src="' + data.small_image + '">');
                        obj.element().append('<div class="element-border"></div>');
                        obj.element().append('<div class="element-name">' + data.name + '</div>');
                        obj.element().bind('click', {
                            id: data.id
                        }, function (evt) {
                            for (var id in generalList) {
                                var el = generalList[id];
                                if (id == evt.data.id) {
                                    el.element().find(".element-border").css("opacity", 0);
                                    chooseGeneralId = evt.data.id;
                                } else {
                                    el.element().find(".element-border").css("opacity", 0.6);
                                }
                            }
                        });
                        if (parseInt(data.is_default) == 1) {
                            obj.element().find(".element-border").css("opacity", 0);
                            chooseGeneralId = data.id;
                        }
                        generalList[data.id] = obj;
                        if (index < 2) {
                            elmDiv1.append(obj.element());
                        } else {
                            elmDiv2.append(obj.element());
                        }
                    }
                    elmDiv1.appendTo(newPlayerAwardDiv);
                    elmDiv2.appendTo(newPlayerAwardDiv);
                    (new Mojo.ui.Button(undefined, {
                        text: Mojo.utils.locale('home', 'go_sanguo'),
                        special: 'button-big-red',
                        click: function () {
                            Mojo.ajax("/bonus/NewPlayerAward", {
                                entity_id: chooseGeneralId
                            }, function (response) {
                                self._baseSlotList.reLoad();
                                newPlayerAwardDiv.remove();
                                newPlayerTutorial.close();
                                Mojo.app.tutorial = new Mojo.com.Tutorial(undefined, {
                                    tutorial: "mission",
                                    text: Mojo.utils.locale('tutorial', 'tutorial_start'),
                                    click: function (tutorial) {
                                        Mojo.app.redirect('/mission', {
                                            tutorial: 'yes'
                                        });
                                    }
                                }).open();
                            }, function () {
                                self._baseSlotList.reLoad();
                                newPlayerAwardDiv.remove();
                                newPlayerTutorial.close();
                                Mojo.app.tutorial = new Mojo.com.Tutorial(undefined, {
                                    tutorial: "mission",
                                    text: Mojo.utils.locale('tutorial', 'tutorial_start'),
                                    click: function (tutorial) {
                                        Mojo.app.redirect('/mission', {
                                            tutorial: 'yes'
                                        });
                                    }
                                }).open();
                            });
                        }
                    })).element().addClass("go-sanguo").appendTo(newPlayerAwardDiv);
                }
            });
            newPlayerAwardDiv.appendTo($(document.body));
            newPlayerTutorial = (new Mojo.com.Tutorial(undefined, {
                text: Mojo.utils.locale('tutorial', 'tutorial_new_player'),
            })).open();
            newPlayerTutorial.element().attr("id", "new-player-tutorial").find(".tutorial-arrow").hide();
            newPlayerTutorial.element().append($('<div class="new-player-award-title"></div>').html(Mojo.utils.locale('home', 'new_player_gift_title')));
        }
    });
})(window, jQuery);