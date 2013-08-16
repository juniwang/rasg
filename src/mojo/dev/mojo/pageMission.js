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
(function ($) {
    if (!document.defaultView || !document.defaultView.getComputedStyle) {
        var oldCurCSS = $.curCSS;
        $.curCSS = function (elem, name, force) {
            if (name === 'background-position') {
                name = 'backgroundPosition';
            }
            if (name !== 'backgroundPosition' || !elem.currentStyle || elem.currentStyle[name]) {
                return oldCurCSS.apply(this, arguments);
            }
            var style = elem.style;
            if (!force && style && style[name]) {
                return style[name];
            }
            return oldCurCSS(elem, 'backgroundPositionX', force) + ' ' + oldCurCSS(elem, 'backgroundPositionY', force);
        };
    }
    var oldAnim = $.fn.animate;
    $.fn.animate = function (prop) {
        if ('background-position' in prop) {
            prop.backgroundPosition = prop['background-position'];
            delete prop['background-position'];
        }
        if ('backgroundPosition' in prop) {
            prop.backgroundPosition = '(' + prop.backgroundPosition;
        }
        return oldAnim.apply(this, arguments);
    };

    function toArray(strg) {
        strg = strg.replace(/left|top/g, '0px');
        strg = strg.replace(/right|bottom/g, '100%');
        strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g, "$1px$2");
        var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
        return [parseFloat(res[1], 10), res[2], parseFloat(res[3], 10), res[4]];
    }
    $.fx.step.backgroundPosition = function (fx) {
        if (!fx.bgPosReady) {
            var start = $.curCSS(fx.elem, 'backgroundPosition');
            if (!start) {
                start = '0px 0px';
            }
            start = toArray(start);
            fx.start = [start[0], start[2]];
            var end = toArray(fx.end);
            fx.end = [end[0], end[2]];
            fx.unit = [end[1], end[3]];
            fx.bgPosReady = true;
        }
        var nowPosX = [];
        nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
        nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
        fx.elem.style.backgroundPosition = nowPosX[0] + ' ' + nowPosX[1];
    };
})(jQuery);;
(function ($) {
    $._spritely = {
        animate: function (options) {
            var el = $(options.el);
            var el_id = el.attr('id');
            if (!$._spritely.instances[el_id]) {
                return this;
            }
            options = $.extend(options, $._spritely.instances[el_id] || {});
            if (options.play_frames && !$._spritely.instances[el_id]['remaining_frames']) {
                $._spritely.instances[el_id]['remaining_frames'] = options.play_frames + 1;
            }
            if (options.type == 'sprite' && options.fps) {
                var frames;
                var animate = function (el) {
                    var w = options.width,
                        h = options.height;
                    if (!frames) {
                        frames = [];
                        total = 0
                        for (var i = 0; i < options.no_of_frames; i++) {
                            frames[frames.length] = (0 - total);
                            total += w;
                        }
                    }
                    if ($._spritely.instances[el_id]['current_frame'] == 0) {
                        if (options.on_first_frame) {
                            options.on_first_frame(el);
                        }
                    } else if ($._spritely.instances[el_id]['current_frame'] == frames.length - 1) {
                        if (options.on_last_frame) {
                            options.on_last_frame(el);
                        }
                    }
                    if (options.on_frame && options.on_frame[$._spritely.instances[el_id]['current_frame']]) {
                        options.on_frame[$._spritely.instances[el_id]['current_frame']](el);
                    }
                    if (options.rewind == true) {
                        if ($._spritely.instances[el_id]['current_frame'] <= 0) {
                            $._spritely.instances[el_id]['current_frame'] = frames.length - 1;
                        } else {
                            $._spritely.instances[el_id]['current_frame'] = $._spritely.instances[el_id]['current_frame'] - 1;
                        };
                    } else {
                        if ($._spritely.instances[el_id]['current_frame'] >= frames.length - 1) {
                            $._spritely.instances[el_id]['current_frame'] = 0;
                        } else {
                            $._spritely.instances[el_id]['current_frame'] = $._spritely.instances[el_id]['current_frame'] + 1;
                        }
                    }
                    var yPos = $._spritely.getBgY(el);
                    el.css('background-position', frames[$._spritely.instances[el_id]['current_frame']] + 'px ' + yPos);
                    if (options.bounce && options.bounce[0] > 0 && options.bounce[1] > 0) {
                        var ud = options.bounce[0];
                        var lr = options.bounce[1];
                        var ms = options.bounce[2];
                        el.animate({
                            top: '+=' + ud + 'px',
                            left: '-=' + lr + 'px'
                        }, ms).animate({
                            top: '-=' + ud + 'px',
                            left: '+=' + lr + 'px'
                        }, ms);
                    }
                }
                if ($._spritely.instances[el_id]['remaining_frames'] && $._spritely.instances[el_id]['remaining_frames'] > 0) {
                    $._spritely.instances[el_id]['remaining_frames']--;
                    if ($._spritely.instances[el_id]['remaining_frames'] == 0) {
                        $._spritely.instances[el_id]['remaining_frames'] = -1;
                        delete $._spritely.instances[el_id]['remaining_frames'];
                        return;
                    } else {
                        animate(el);
                    }
                } else if ($._spritely.instances[el_id]['remaining_frames'] != -1) {
                    animate(el);
                }
            } else if (options.type == 'pan') {
                if (!$._spritely.instances[el_id]['_stopped']) {
                    if (options.dir == 'up') {
                        $._spritely.instances[el_id]['l'] = $._spritely.getBgX(el).replace('px', '');
                        $._spritely.instances[el_id]['t'] = ($._spritely.instances[el_id]['t'] - (options.speed || 1)) || 0;
                    } else if (options.dir == 'down') {
                        $._spritely.instances[el_id]['l'] = $._spritely.getBgX(el).replace('px', '');
                        $._spritely.instances[el_id]['t'] = ($._spritely.instances[el_id]['t'] + (options.speed || 1)) || 0;
                    } else if (options.dir == 'left') {
                        $._spritely.instances[el_id]['l'] = ($._spritely.instances[el_id]['l'] - (options.speed || 1)) || 0;
                        $._spritely.instances[el_id]['t'] = $._spritely.getBgY(el).replace('px', '');
                    } else {
                        $._spritely.instances[el_id]['l'] = ($._spritely.instances[el_id]['l'] + (options.speed || 1)) || 0;
                        $._spritely.instances[el_id]['t'] = $._spritely.getBgY(el).replace('px', '');
                    }
                    var bg_left = $._spritely.instances[el_id]['l'].toString();
                    if (bg_left.indexOf('%') == -1) {
                        bg_left += 'px ';
                    } else {
                        bg_left += ' ';
                    }
                    var bg_top = $._spritely.instances[el_id]['t'].toString();
                    if (bg_top.indexOf('%') == -1) {
                        bg_top += 'px ';
                    } else {
                        bg_top += ' ';
                    }
                    $(el).css('background-position', bg_left + bg_top);
                }
            }
            $._spritely.instances[el_id]['options'] = options;
            $._spritely.instances[el_id]['timeout'] = window.setTimeout(function () {
                $._spritely.animate(options);
            }, parseInt(1000 / options.fps));
        },
        randomIntBetween: function (lower, higher) {
            return parseInt(rand_no = Math.floor((higher - (lower - 1)) * Math.random()) + lower);
        },
        getBgY: function (el) {
            if ($.browser.msie) {
                var bgY = $(el).css('background-position-y') || '0';
            } else {
                var bgY = ($(el).css('background-position') || ' ').split(' ')[1];
            }
            return bgY;
        },
        getBgX: function (el) {
            if ($.browser.msie) {
                var bgX = $(el).css('background-position-x') || '0';
            } else {
                var bgX = ($(el).css('background-position') || ' ').split(' ')[0];
            }
            return bgX;
        },
        get_rel_pos: function (pos, w) {
            var r = pos;
            if (pos < 0) {
                while (r < 0) {
                    r += w;
                }
            } else {
                while (r > w) {
                    r -= w;
                }
            }
            return r;
        }
    };
    $.fn.extend({
        spritely: function (options) {
            var options = $.extend({
                type: 'sprite',
                do_once: false,
                width: null,
                height: null,
                fps: 12,
                no_of_frames: 2,
                stop_after: null
            }, options || {});
            var el_id = $(this).attr('id');
            if (!$._spritely.instances) {
                $._spritely.instances = {};
            }
            if (!$._spritely.instances[el_id]) {
                if (options.start_at_frame) {
                    $._spritely.instances[el_id] = {
                        current_frame: options.start_at_frame - 1
                    };
                } else {
                    $._spritely.instances[el_id] = {
                        current_frame: -1
                    };
                }
            }
            $._spritely.instances[el_id]['type'] = options.type;
            $._spritely.instances[el_id]['depth'] = options.depth;
            options.el = this;
            options.width = options.width || $(this).width() || 100;
            options.height = options.height || $(this).height() || 100;
            var get_rate = function () {
                return parseInt(1000 / options.fps);
            }
            if (!options.do_once) {
                window.setTimeout(function () {
                    $._spritely.animate(options);
                }, get_rate(options.fps));
            } else {
                $._spritely.animate(options);
            }
            return this;
        },
        sprite: function (options) {
            var options = $.extend({
                type: 'sprite',
                bounce: [0, 0, 1000]
            }, options || {});
            return $(this).spritely(options);
        },
        pan: function (options) {
            var options = $.extend({
                type: 'pan',
                dir: 'left',
                continuous: true,
                speed: 1
            }, options || {});
            return $(this).spritely(options);
        },
        flyToTap: function (options) {
            var options = $.extend({
                el_to_move: null,
                type: 'moveToTap',
                ms: 1000,
                do_once: true
            }, options || {});
            if (options.el_to_move) {
                $(options.el_to_move).active();
            }
            if ($._spritely.activeSprite) {
                if (window.Touch) {
                    $(this)[0].ontouchstart = function (e) {
                        var el_to_move = $._spritely.activeSprite;
                        var touch = e.touches[0];
                        var t = touch.pageY - (el_to_move.height() / 2);
                        var l = touch.pageX - (el_to_move.width() / 2);
                        el_to_move.animate({
                            top: t + 'px',
                            left: l + 'px'
                        }, 1000);
                    };
                } else {
                    $(this).click(function (e) {
                        var el_to_move = $._spritely.activeSprite;
                        $(el_to_move).stop(true);
                        var w = el_to_move.width();
                        var h = el_to_move.height();
                        var l = e.pageX - (w / 2);
                        var t = e.pageY - (h / 2);
                        el_to_move.animate({
                            top: t + 'px',
                            left: l + 'px'
                        }, 1000);
                    });
                }
            }
            return this;
        },
        isDraggable: function (options) {
            if ((!$(this).draggable)) {
                return this;
            }
            var options = $.extend({
                type: 'isDraggable',
                start: null,
                stop: null,
                drag: null
            }, options || {});
            var el_id = $(this).attr('id');
            if (!$._spritely.instances[el_id]) {
                return this;
            }
            $._spritely.instances[el_id].isDraggableOptions = options;
            $(this).draggable({
                start: function () {
                    var el_id = $(this).attr('id');
                    $._spritely.instances[el_id].stop_random = true;
                    $(this).stop(true);
                    if ($._spritely.instances[el_id].isDraggableOptions.start) {
                        $._spritely.instances[el_id].isDraggableOptions.start(this);
                    }
                },
                drag: options.drag,
                stop: function () {
                    var el_id = $(this).attr('id');
                    $._spritely.instances[el_id].stop_random = false;
                    if ($._spritely.instances[el_id].isDraggableOptions.stop) {
                        $._spritely.instances[el_id].isDraggableOptions.stop(this);
                    }
                }
            });
            return this;
        },
        active: function () {
            $._spritely.activeSprite = this;
            return this;
        },
        activeOnClick: function () {
            var el = $(this);
            if (window.Touch) {
                el[0].ontouchstart = function (e) {
                    $._spritely.activeSprite = el;
                };
            } else {
                el.click(function (e) {
                    $._spritely.activeSprite = el;
                });
            }
            return this;
        },
        spRandom: function (options) {
            var options = $.extend({
                top: 50,
                left: 50,
                right: 290,
                bottom: 320,
                speed: 4000,
                pause: 0
            }, options || {});
            var el_id = $(this).attr('id');
            if (!$._spritely.instances[el_id]) {
                return this;
            }
            if (!$._spritely.instances[el_id].stop_random) {
                var r = $._spritely.randomIntBetween;
                var t = r(options.top, options.bottom);
                var l = r(options.left, options.right);
                $('#' + el_id).animate({
                    top: t + 'px',
                    left: l + 'px'
                }, options.speed)
            }
            window.setTimeout(function () {
                $('#' + el_id).spRandom(options);
            }, options.speed + options.pause)
            return this;
        },
        makeAbsolute: function () {
            return this.each(function () {
                var el = $(this);
                var pos = el.position();
                el.css({
                    position: "absolute",
                    marginLeft: 0,
                    marginTop: 0,
                    top: pos.top,
                    left: pos.left
                }).remove().appendTo("body");
            });
        },
        spSet: function (prop_name, prop_value) {
            var el_id = $(this).attr('id');
            $._spritely.instances[el_id][prop_name] = prop_value;
            return this;
        },
        spGet: function (prop_name, prop_value) {
            var el_id = $(this).attr('id');
            return $._spritely.instances[el_id][prop_name];
        },
        spStop: function (bool) {
            $(this).each(function () {
                var el_id = $(this).attr('id');
                $._spritely.instances[el_id]['_last_fps'] = $(this).spGet('fps');
                $._spritely.instances[el_id]['_stopped'] = true;
                $._spritely.instances[el_id]['_stopped_f1'] = bool;
                if ($._spritely.instances[el_id]['type'] == 'sprite') {
                    $(this).spSet('fps', 0);
                }
                if (bool) {
                    var bp_top = $._spritely.getBgY($(this));
                    $(this).css('background-position', '0 ' + bp_top);
                }
            });
            return this;
        },
        spStart: function () {
            $(this).each(function () {
                var el_id = $(this).attr('id');
                var fps = $._spritely.instances[el_id]['_last_fps'] || 12;
                $._spritely.instances[el_id]['_stopped'] = false;
                if ($._spritely.instances[el_id]['type'] == 'sprite') {
                    $(this).spSet('fps', fps);
                }
            });
            return this;
        },
        spToggle: function () {
            var el_id = $(this).attr('id');
            var stopped = $._spritely.instances[el_id]['_stopped'] || false;
            var stopped_f1 = $._spritely.instances[el_id]['_stopped_f1'] || false;
            if (stopped) {
                $(this).spStart();
            } else {
                $(this).spStop(stopped_f1);
            }
            return this;
        },
        fps: function (fps) {
            $(this).each(function () {
                $(this).spSet('fps', fps);
            });
            return this;
        },
        goToFrame: function (n) {
            var el_id = $(this).attr('id');
            if ($._spritely.instances && $._spritely.instances[el_id]) {
                $._spritely.instances[el_id]['current_frame'] = n - 1;
            }
            return this;
        },
        spSpeed: function (speed) {
            $(this).each(function () {
                $(this).spSet('speed', speed);
            });
            return this;
        },
        spRelSpeed: function (speed) {
            $(this).each(function () {
                var rel_depth = $(this).spGet('depth') / 100;
                $(this).spSet('speed', speed * rel_depth);
            });
            return this;
        },
        spChangeDir: function (dir) {
            $(this).each(function () {
                $(this).spSet('dir', dir);
            });
            return this;
        },
        spState: function (n) {
            $(this).each(function () {
                var yPos = ((n - 1) * $(this).height()) + 'px';
                var xPos = $._spritely.getBgX($(this));
                var bp = xPos + ' -' + yPos;
                $(this).css('background-position', bp);
            });
            return this;
        },
        lockTo: function (el, options) {
            $(this).each(function () {
                var el_id = $(this).attr('id');
                if (!$._spritely.instances[el_id]) {
                    return this;
                }
                $._spritely.instances[el_id]['locked_el'] = $(this);
                $._spritely.instances[el_id]['lock_to'] = $(el);
                $._spritely.instances[el_id]['lock_to_options'] = options;
                $._spritely.instances[el_id]['interval'] = window.setInterval(function () {
                    if ($._spritely.instances[el_id]['lock_to']) {
                        var locked_el = $._spritely.instances[el_id]['locked_el'];
                        var locked_to_el = $._spritely.instances[el_id]['lock_to'];
                        var locked_to_options = $._spritely.instances[el_id]['lock_to_options'];
                        var locked_to_el_w = locked_to_options.bg_img_width;
                        var locked_to_el_h = locked_to_el.height();
                        var locked_to_el_y = $._spritely.getBgY(locked_to_el);
                        var locked_to_el_x = $._spritely.getBgX(locked_to_el);
                        var el_l = (parseInt(locked_to_el_x) + parseInt(locked_to_options['left']));
                        var el_t = (parseInt(locked_to_el_y) + parseInt(locked_to_options['top']));
                        el_l = $._spritely.get_rel_pos(el_l, locked_to_el_w);
                        $(locked_el).css({
                            'top': el_t + 'px',
                            'left': el_l + 'px'
                        });
                    }
                }, options.interval || 20);
            });
            return this;
        },
        destroy: function () {
            var el = $(this);
            var el_id = $(this).attr('id');
            if ($._spritely.instances[el_id] && $._spritely.instances[el_id]['timeout']) {
                window.clearInterval($._spritely.instances[el_id]['timeout']);
            }
            if ($._spritely.instances[el_id] && $._spritely.instances[el_id]['interval']) {
                window.clearInterval($._spritely.instances[el_id]['interval']);
            }
            delete $._spritely.instances[el_id]
            return this;
        }
    })
})(jQuery);
try {
    document.execCommand("BackgroundImageCache", false, true);
} catch (err) {};
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a); if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});;
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
            },
            'com.ActivityCenterList': {
                'unitWidth': 157,
                'height': 742,
                'pageSize': 30
            },
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
            },
            'com.ActivityCenterList': {
                'unitWidth': 102,
                'height': 345,
                'pageSize': 25
            },
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
    w.Mojo.ui.Radio = Mojo.Object.extend({
        init: function (id, options) {
            this._super(id, options);
            var self = this;
            this.element().addClass('mojo-ui-radio');
            this.element().append('<ul></ul>');
            $.each(this._options.options, function (i, it) {
                var opt = $('<li>' + it + '</li>');
                self.element().find('ul').append(opt);
                opt.click(function () {
                    self._optClick($(this).index());
                });
            });
            this._refresh();
        },
        _getDefaultOptions: function () {
            return {
                options: [],
                selected: 0,
                selectionChange: $.noop,
                disableClick: $.noop,
            };
        },
        _refresh: function () {
            this.element().find('li').removeClass('mojo-ui-radio-selected').eq(this._options.selected).addClass('mojo-ui-radio-selected');
        },
        _optClick: function (index) {
            var self = this;
            if (self.disable(index)) {
                self._options.disableClick(index);
                return;
            }
            if (self._options.selected != index) {
                self._options.selected = index;
                self._refresh();
                self._options.selectionChange(index);
            }
        },
        addOption: function (it) {
            var self = this;
            if (it != undefined && it != null) {
                this._options.options.push(it);
                var opt = $('<li>' + it + '</li>');
                self.element().find('ul').append(opt);
                opt.click(function () {
                    self._optClick($(this).index());
                });
            }
        },
        remove: function (index) {
            this.element().find('ul > li').eq(index).remove();
        },
        removeAll: function () {
            this.element().find('ul').empty();
        },
        selection: function (index) {
            if (index == undefined) {
                return this._options.selected;
            }
            this._options.selected = index;
            this._refresh();
        },
        disable: function (index, value) {
            if (value == undefined) {
                return this.element().find('li').eq(index).hasClass('mojo-ui-radio-disabled');
            }
            this.element().find('li').eq(index)[value ? 'addClass' : 'removeClass']('mojo-ui-radio-disabled');
        },
        clsname: function () {
            return "ui.Radio";
        }
    });
})(window, jQuery);;
(function (w, jQuery, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.ui = w.Mojo.ui || {};
    w.Mojo.ui.Image = Mojo.Object.extend({
        init: function (id, options) {
            this._super(id, options);
            var self = this;
            this.element().addClass('mojo-ui-image');
            this.element().append('<img>');
            this._refresh();
        },
        _getDefaultOptions: function () {
            return {
                src: '',
                width: -1,
                height: -1,
            };
        },
        _refresh: function () {
            this.element().find('img').attr('src', this._options.src);
            if (this._options.width > -1) {
                this.element().find('img').attr('width', this._options.width);
            }
            if (this._options.height > -1) {
                this.element().find('img').attr('height', this._options.height);
            }
        },
        src: function (src) {
            if (text == undefined) {
                return this._options.src;
            }
            this._options.src = src;
            this._refresh();
        },
        clsname: function () {
            return "ui.Image";
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
(function (w, jQuery, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.ui = w.Mojo.ui || {};
    w.Mojo.ui.Pager = Mojo.Object.extend({
        init: function (id, options) {
            this._super(id, options);
            var self = this;
            this.element().addClass('mojo-ui-pager');
            this._title = $('<div class="title"></div>').appendTo(this.element());
            this._container = $('<div class="container"></div>').appendTo(this.element());
            this._nav = $('<div class="nav"><div class="previous"></div><div class="next"></div></div>').appendTo(this.element());
            this._btnPrevious = new Mojo.ui.Button(undefined, {
                text: this._options.previousLabel,
                click: function () {
                    self.previous();
                },
            });
            this._btnNext = new Mojo.ui.Button(undefined, {
                text: this._options.nextLabel,
                click: function () {
                    self.next();
                },
            });
            this._nav.find('.previous').append(this._btnPrevious.element());
            this._nav.find('.next').append(this._btnNext.element());
            this._pages = [];
            this._current = 0;
            this._refresh();
        },
        _refresh: function () {
            var p = this._pages[this._current];
            if (p == undefined || p == null) {
                var self = this;
                p = new Mojo.ui.ListPanel(undefined, {
                    loadFunc: function (start, count) {
                        self._options.loadFunc(self._current, self._options.pageSize);
                    },
                    drawFunc: function (data) {
                        return self._options.drawFunc(data);
                    },
                    classes: ['page'],
                });
                this._container.append(p.element());
                this._pages.push(p);
            }
            this._container.children('.page').hide().eq(this._current).show();
            this._pageCount = this._calPages();
            this._title.html(this._options.titleTemplate.replace(/#\{current\}/g, this._current + 1).replace(/#\{pages\}/g, this._pageCount));
            this._btnPrevious.disable(false);
            this._btnNext.disable(false);
            if (this._current == 0) {
                this._btnPrevious.disable(true);
            }
            if (this._current == this._pageCount - 1) {
                this._btnNext.disable(true);
            }
        },
        _getDefaultOptions: function () {
            return {
                previousLabel: Mojo.utils.locale('ui', 'Previous'),
                nextLabel: Mojo.utils.locale('ui', 'Next'),
                total: 0,
                pageSize: 10,
                titleTemplate: '#{current}/#{pages}',
                loadFunc: $.noop,
                drawFunc: $.noop,
            };
        },
        next: function () {
            if (this._current < this._pageCount - 1) {
                this._current = this._current + 1;
                this._refresh();
            }
        },
        previous: function () {
            if (this._current > 0) {
                this._current = this._current - 1;
                this._refresh();
            }
        },
        total: function (value) {
            if (value == undefined) {
                return this._options.total;
            }
            this._options.total = value;
            this._pageCount = this._calPages();
            this._title.html(this._options.titleTemplate.replace(/#\{current\}/g, this._current + 1).replace(/#\{pages\}/g, this._pageCount));
        },
        appendData: function (page, data) {
            this._pages[page].appendData(data);
        },
        _calPages: function () {
            var p = parseInt(this._options.total / this._options.pageSize);
            var a = parseInt(this._options.total % this._options.pageSize);
            if (a > 0) {
                return p + 1;
            }
            return p;
        },
        clsname: function () {
            return "ui.Pager";
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
    g.showDiaochan = function (text, click) {
        (new Mojo.com.Diaochan(undefined, {
            text: text,
            click: click
        })).open();
    };
    g.showLockedToast = function (id) {
        var d = {
            'btn-force': 20,
            'btn-fuben': 10,
            'btn-chat': 5,
            'btn-entity-battle': 5,
            'btn-ranking': 3,
            'btn-battle': 4,
            'btn-entity-browse': 2,
            'btn-task': 1,
            'btn-intensify': 1,
            'btn-illustration': 1,
            'btn-friend': 1,
            'btn-messages': 1,
            'btn-settings': 1,
            'btn-entity-embed': 1,
            'btn-mall': 1
        };
        Mojo.app.toast.show(Mojo.utils.locale('common', 'do_task_update', {
            level: d[id]
        }));
    }
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
            'diaochan_first_card': '',
            'diaochan_intity_first_card': '',
            'diaochan_new_player': '',
            'discount': '折',
            'do_task_update': '',
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
            'get_wuhu_tip': '',
            'go_accept': '查收',
            'go_bless': '',
            'go_embed': '直接上陣',
            'go_fuben': '去闖關',
            'go_intensify': '去強化',
            'go_neizheng': '',
            'go_package_card': '',
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
            'new_player_gift_title': '',
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
            'diaochan_first_card': '啊~被打败了~<br/>主公再厉害也不能总是单打独斗呀~<br/>点击【首页】中的阵容头像可以把刚获得的卡牌上阵哦~<div class="goBtn">点击继续</div>',
            'diaochan_intity_first_card': '低等级的卡牌不够给力啊~<br/>点击【首页】中的将领头像，可以强化将领，提高战斗力哦~<div class="goBtn">点击继续</div>',
            'diaochan_new_player': 'Hi~主公~<br/>我是貂蝉~<br/>我将陪伴您通过【任务】体验三国穿越之旅哦~<div class="goBtn">点击继续</div>',
            'discount': '折',
            'do_task_update': '做【任务】升到{{:level}}级就能解锁哦~',
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
            'get_wuhu_tip': '恭喜主公~成功招募了五虎上将【{{:wuhu}}】~',
            'go_accept': '查收',
            'go_bless': '去祝福',
            'go_embed': '直接上阵',
            'go_fuben': '去闯关',
            'go_intensify': '去强化',
            'go_neizheng': '做内政',
            'go_package_card': '去上阵',
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
            'new_player_gift_title': '强者奖励',
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
            'tutorial_new_player': '主公~您真的太棒啦~<br/>连五虎上将都希望成为您的追随者哦~<br/>在他们后悔之前，赶紧选择一个吧~<br/>别忘了去【阵容】上阵你的五虎将哦~',
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
    w.Mojo.lang['fuben'] = {
        'zh_tw': {
            'attack_bonus': '攻擊加成：{{:attack_bonus}}%',
            'award': '獎勵',
            'be_restraint': '被克',
            'buy': '付費購買',
            'challenge': '挑戰',
            'choose_award': '恭喜主公，我軍擊敗了【{{:boss_name}}】！<br>以下獎勵二選一：',
            'choose_one': '（獎品二選一）',
            'choose_team_friends': '協助戰鬥的好友（{{:current}}/{{:total}}）',
            'day': '天',
            'defeat': '戰敗',
            'defence': '【防禦】',
            'dont_get_award_content': '報~主公~前方有疑似獎勵的東東~是否在重新闖關前，先去領獎？',
            'dont_get_award_title': '未領取獎勵',
            'for_help': '又吃鱉啦~幹嘛不組幾個強力的好友來幫忙呢？',
            'for_sale': '<span>售價：</span>',
            'free': '免費',
            'friend': '好友',
            'fuben': '闖關',
            'fuben_award_content1': '恭喜主公，我軍擊敗了【{{:boss_name}}】，【{{:entity_name}}】仰慕主公，前來投奔~',
            'fuben_award_content2': '恭喜主公，我軍擊敗了【{{:boss_name}}】，並繳獲了【{{:entity_name}}】～',
            'fuben_award_content3': '恭喜主公，我軍擊敗了【{{:boss_name}}】，打開神秘禮物後獲得【{{:entity_name}}】～',
            'fuben_award_title': '闖關獎勵',
            'get_for_free': '免費獲得',
            'go_award': '去領獎',
            'go_to_clean': '去剿匪',
            'has_enemy_content': '報~主公~前方仍有敵軍餘黨，是否在重新闖關前，剿滅他們奪取獎勵？',
            'has_enemy_title': '尚有敵軍',
            'hour': '時',
            'in': '進入',
            'in_cd': '冷卻中：',
            'in_fuben': '闖關中：',
            'is_enough': '主公~{{:count}}個強力好友就夠了~',
            'less_level': '主公~您的級別不足哦~',
            'minute': '分',
            'need_to_upgrade': '主公~您的等級不足哦~',
            'no friends': '主公～我們現在還沒有盟友，速速去加上幾個好友吧～人多好辦事！',
            'no_friends': '點擊【組隊】按鈕選擇協助戰鬥的好友',
            'none': '無',
            'refresh_time': '闖關時間結束後才能再次闖關',
            'restart': '重新闖關',
            'restraint': '克制',
            'second': '秒',
            'skills': '【技能】<br>',
            'team': '組隊',
            'team_add': '好友組隊加成：{{:team_add}}%',
            'unlock_level': '解鎖級別：',
            'wait_to_do': '主公~稍等一下再執行該任務吧~',
        },
        'zh_cn': {
            'attack_bonus': '攻击加成：{{:attack_bonus}}%',
            'award': '领奖',
            'be_restraint': '被克',
            'buy': '付费购买',
            'challenge': '挑战',
            'choose_award': '恭喜主公，我军击败了【{{:boss_name}}】！<br>以下奖励二选一：',
            'choose_one': '（奖品二选一）',
            'choose_team_friends': '协助战斗的好友（{{:current}}/{{:total}}）',
            'day': '天',
            'defeat': '战败',
            'defence': '【防御】',
            'dont_get_award_content': '报～主公～前方有疑似奖励的东东～是否遗弃它们，重新开始闯关？',
            'dont_get_award_title': '未领取奖励',
            'for_help': '又吃败仗了，为啥不组几个强力的好友来帮忙呢？',
            'for_sale': '<span>售价：</span>',
            'free': '免费',
            'friend': '好友',
            'fuben': '闯关',
            'fuben_award_content1': '恭喜主公，我军击败了【{{:boss_name}}】，【{{:entity_name}}】仰慕主公，前来投奔～',
            'fuben_award_content2': '恭喜主公，我军击败了【{{:boss_name}}】，并缴获了【{{:entity_name}}】～',
            'fuben_award_content3': '恭喜主公，我军击败了【{{:boss_name}}】，打开神秘礼物后获得【{{:entity_name}}】～',
            'fuben_award_title': '闯关奖励',
            'get_for_free': '免费获得',
            'go_award': '去领奖',
            'go_to_clean': '去清剿',
            'has_enemy_content': '报～主公～前方仍有敌军残留，是否放他们一马，重新开始闯关？',
            'has_enemy_title': '未扫清敌军',
            'hour': '时',
            'in': '进入',
            'in_cd': '冷却中：',
            'in_fuben': '闯关中：',
            'is_enough': '主公～{{:count}}个强力好友就够了～',
            'less_level': '主公～您的级别不足哦～',
            'minute': '分',
            'need_to_upgrade': '主公～我们还是先修炼修炼再来挑战吧～',
            'no friends': '主公～我们现在还没有盟友，速速去加上几个好友吧～人多好办事儿！',
            'no_friends': '点击【组队】按钮选择协助战斗的好友',
            'none': '无',
            'refresh_time': '闯关时间结束后才能再次闯关',
            'restart': '重新闯关',
            'restraint': '克制',
            'second': '秒',
            'skills': '【技能】<br>',
            'team': '组队',
            'team_add': '好友组队加成：{{:team_add}}%',
            'unlock_level': '解锁级别：',
            'wait_to_do': '主公～等会儿再执行该任务吧～',
        },
    };
    w.Mojo.lang['battle'] = {
        'zh_tw': {
            'Can not attack weak': '主公～欺負弱小是不對的～',
            'Enemy': '宿敵',
            'Fight': '單挑',
            'More opponents': '更多對手',
            'No enemies': '您還沒有仇家！獨孤求敗中～',
            'No fight opponents': '您還沒有實力相近的對手！獨孤求敗中～',
            'action': '出征',
            'armor_protect': '',
            'base attack': '基礎攻擊力：',
            'base defence': '基礎防禦力：',
            'battle result preview': '戰鬥結果預覽',
            'battle_fail_content': '',
            'battle_fail_title': '',
            'battle_result_formation_title_lose': '',
            'battle_result_formation_title_win': '',
            'battle_result_title': '戰鬥結果',
            'battle_result_title_lose': '征討失敗',
            'battle_result_title_rob_lose': '奪寶失敗',
            'battle_result_title_rob_win': '奪寶獎勵',
            'battle_result_title_win': '征討獎勵',
            'battle_tip': '攻擊等級高、存款多的玩家能搶到更多銀幣哦~',
            'be_restraint': '被克',
            'force_none': '',
            'formation': '調整陣容',
            'formation detail': '陣容資訊',
            'in_avoid_war': '',
            'lose_message': '你被打敗，小有損失～',
            'refresh opps': '刷新對手',
            'refresh_opponents': '刷新對手',
            'resist': '',
            'restraint': '克制',
            'search_prefix': 'Lv.',
            'sum attack': '軍團攻擊力：',
            'sum defence': '軍團防禦力：',
            'weapon_hit': '',
            'win_message_01': '恭喜主公，我軍擊敗了{{:name}}，並繳獲了【{{:bonus}}】～',
            'win_message_02': '恭喜主公，我軍擊敗了{{:name}}，打掃戰場時發現了【{{:bonus}}】～',
            'win_message_03': '恭喜主公，我軍擊敗了{{:name}}～',
            'win_message_04': '主公～真遺憾！你在行軍過程中【{{:bonus}}】已經被其他人搶走了！',
            'win_message_05': '主公～我軍雖勝，但{{:name}}攜【{{:bonus}}】跑路了～',
            'win_message_06': '主公～你有可能獲得裝備卡哦～',
            'win_message_07': '主公~你真是佛心來的啊！我軍擊敗了{{:name}}，並將【{{:bonus}}】歸還給了{{:frdname}}～',
        },
        'zh_cn': {
            'Can not attack weak': '主公～欺负弱小是不对的～',
            'Enemy': '宿敌',
            'Fight': '单挑',
            'More opponents': '更多对手',
            'No enemies': '您还没有仇家！独孤求败中～',
            'No fight opponents': '这个世界查无此人～',
            'action': '出征',
            'armor_protect': '防护',
            'base attack': '基础攻击力：',
            'base defence': '基础防御力：',
            'battle result preview': '征讨结果预览',
            'battle_fail_content': '主公，对方在战斗中哦，请稍等一会再来吧！',
            'battle_fail_title': '不能征讨',
            'battle_result_formation_title_lose': '战斗失败',
            'battle_result_formation_title_win': '战斗胜利',
            'battle_result_title': '战斗结果',
            'battle_result_title_lose': '征讨失败',
            'battle_result_title_rob_lose': '夺宝失败',
            'battle_result_title_rob_win': '夺宝奖励',
            'battle_result_title_win': '征讨奖励',
            'battle_tip': '攻击等级高、存钱多的玩家能抢到更多银币哦~',
            'be_restraint': '被克',
            'force_none': '未加入势力',
            'formation': '调整阵容',
            'formation detail': '阵容对比',
            'in_avoid_war': '免战中',
            'lose_message': '你被打败，小有损失～',
            'refresh opps': '刷新对手',
            'refresh_opponents': '刷新对手',
            'resist': '抵抗',
            'restraint': '克制',
            'search_prefix': 'Lv.',
            'sum attack': '军团攻击力：',
            'sum defence': '军团防御力：',
            'weapon_hit': '暴击',
            'win_message_01': '恭喜主公，我军击败了{{:name}}，并缴获了【{{:bonus}}】～',
            'win_message_02': '恭喜主公，我军击败了{{:name}}，打扫战场时发现了【{{:bonus}}】～',
            'win_message_03': '恭喜主公，我军击败了{{:name}}～',
            'win_message_04': '主公～真遗憾！你在行军过程中【{{:bonus}}】已经被其他人抢走了！',
            'win_message_05': '主公～我军虽胜，但{{:name}}携【{{:bonus}}】跑路了～',
            'win_message_06': '主公～你有可能获得装备卡哦～',
            'win_message_07': '主公~你就是当代的活雷锋啊！我军击败了{{:name}}，并将【{{:bonus}}】归还给了{{:frdname}}～',
        },
    };
    w.Mojo.lang['mission'] = {
        'zh_tw': {
            'Attack Another Generals': '恭喜主公，我軍擊敗了【{{:boss_name}}】，並繳獲了【{{:name}}】～',
            'Attack One Generals': '恭喜主公，我軍擊敗了【{{:boss_name}}】，並招降了【{{:name}}】～',
            'Coins': '銀幣',
            'Energy point is not enough': '精力值不足',
            'Gained': '獲得',
            'Get Another Collection': '恭喜，百姓們仰慕主公，獻上了傳家之寶【{{:name}}】～',
            'Get Another Generals': '恭喜，【{{:name}}】仰慕主公，前來投奔～',
            'Get One Collection': '恭喜主公，我軍在廢棄的房舍裡面發現了【{{:name}}】～',
            'Get One Generals': '恭喜主公，我軍招募到了【{{:name}}】～',
            'Please complete the tasko_kr above!': '需要完成以上全部任務才能執行此任務～',
            'Please complete the tasks above!': '需要完成以上全部任務才能執行此任務～',
            'Task Awards': '任務獎勵',
            'The task is completed!': '主公～該任務已經完成～',
            'You have to complete the previous task group!': '需要完成上一任務鏈方能解鎖～',
            'action': '',
            'battle result preview': '',
            'battle_result_fail': '',
            'battle_result_formation_title_lose': '',
            'battle_result_formation_title_win': '',
            'formation': '',
            'new_player_gift_title': '',
            'win_card': '',
        },
        'zh_cn': {
            'Attack Another Generals': '恭喜主公，我军击败了【{{:boss_name}}】，并缴获了【{{:name}}】～',
            'Attack One Generals': '恭喜主公，我军击败了【{{:boss_name}}】，并招降了【{{:name}}】～',
            'Coins': '银币',
            'Energy point is not enough': '精力值不足',
            'Gained': '获得',
            'Get Another Collection': '恭喜，百姓们仰慕主公，献上了传家之宝【{{:name}}】～',
            'Get Another Generals': '恭喜，【{{:name}}】仰慕主公，前来投奔～',
            'Get One Collection': '恭喜主公，我军在废弃的房舍里面发现了【{{:name}}】～',
            'Get One Generals': '恭喜主公，我军招募到了【{{:name}}】～',
            'Please complete the tasko_kr above!': '需要完成以上全部任务才能执行此任务～',
            'Please complete the tasks above!': '需要完成以上全部任务才能执行此任务～',
            'Task Awards': '任务奖励',
            'The task is completed!': '主公～该任务已经完成～',
            'You have to complete the previous task group!': '需要完成上一任务链方能解锁～',
            'action': '出征',
            'battle result preview': '征讨结果预览',
            'battle_result_fail': '我军战败了，可以强化将领或调整阵容后再来试试哦~',
            'battle_result_formation_title_lose': '战斗失败',
            'battle_result_formation_title_win': '战斗胜利',
            'formation': '调整阵容',
            'new_player_gift_title': '强者奖励',
            'win_card': '主公~您有可能获得将领卡哦~',
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
                w.clearTimeout(this._timer);
                this._element.html(text);
            }
            Mojo.utils.bottom(this._element);
            this._timer = w.setTimeout(function () {
                self._hide();
            }, tm);
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
                    Mojo.app.redirect('/default/logout/isMultiLogin/yes');
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
        openFeedbackCenter: function () {},
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
            Mojo.ajax('/mall/waitplayerrecharge', {
                rid: itemId
            });
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
        openFeedbackCenter: function () {
            this._execNativeCode('system', 'openfeedbackcenter');
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
        openFeedbackCenter: function () {},
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
            Mojo.app.toast.show('', 10, true);
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
    w.Mojo.com.EpDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.EpDialog";
        },
        init: function (data, options) {
            this._data = data;
            this._super(undefined, options);
            this.element().addClass('mojo-com-epdlg');
            var self = this;
            this._message = $('<div class="paragraph"></div>').appendTo(this._content);
            this._goods = $('<div class="goods"></div>').appendTo(this._content);
            this._card = $('<div class="card"></div>').appendTo(this._goods);
            this._img = $('<img></img>').attr('src', '' + this._data.props.goods_small_image).appendTo(this._card);
            this._count = $('<div class="count"></div>').html(this._data.props.count).appendTo(this._card);
            this._name = $('<div class="name"></div>').html(this._data.props.goods_name).appendTo(this._goods);
            this._desc = $('<div class="desc"></div>').html(this._data.props.goods_description).appendTo(this._goods);
            this._price = $('<div class="price"></div>').appendTo(this._goods);
            this._priceTitle = $('<div class="price-title"></div>').html(Mojo.utils.locale('common', 'price in mall')).appendTo(this._price);
            this._priceIcon = $('<div class="price-icon"></div>').appendTo(this._price);
            this._priceValue = $('<div class="price-value"></div>').appendTo(this._price);
            if (this._data.props.goods_vm > 0) {
                this._priceValue.html(this._data.props.goods_vm);
            } else {
                this._priceValue.html(this._data.props.goods_rm);
            }
            this._interval = w.setInterval(function () {
                self._calcEp();
                self._refresh();
            }, 1000);
            this._addHandleButtons();
            $("<div class='tip'></div>").text(Mojo.utils.locale("common", "not enough ep")).appendTo(this.element());
            this._refresh();
            Mojo.track.onEvent('18_020');
        },
        _refresh: function () {
            this._count.html(this._data.props.count);
            this._message.html(this._genEptip(this._data));
            if (this._data.props.count <= 0) {
                this._useBtn.disable(true);
            } else {
                this._useBtn.disable(false);
            }
        },
        _genEptip: function (data) {
            var str = "" + this._options.message + "<br>" +
                Mojo.utils.locale('common', 'time for next ep') + this._genEpRestore(data) + "<br>" +
                Mojo.utils.locale('common', 'time for all ep') + this._genEpFullRestore(data) + "<br>";
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
        _calcEp: function () {
            if (this._data.ep < this._data.energy) {
                this._data.ep_second--;
                if (this._data.ep_second < 0) {
                    this._data.ep_second = this._data.ep_restore_pp;
                    this._data.ep++;
                }
            }
        },
        _addBuyBtn: function () {
            var self = this;
            self._buyBtn = (new Mojo.ui.Button('buy-btn', {
                text: Mojo.utils.locale('common', 'buy'),
                click: function () {
                    self.hide();
                    var buyWarningDialog = new Mojo.ui.Dialog(undefined, {
                        title: Mojo.utils.locale('common', 'buy_warning_title'),
                        content: $('<div class="tip">' + Mojo.utils.locale('common', 'buy_warning_content') + '</div>'),
                        deviceaware: true
                    });
                    new Mojo.ui.Button(undefined, {
                        text: Mojo.utils.locale('common', 'sure_buy'),
                        special: "button-big-red",
                        click: function () {
                            buyWarningDialog.close();
                            self.show();
                            Mojo.track.onEvent('18_021');
                            Mojo.ajax('/mall/Buy', {
                                id: self._data.props.goods_id,
                            }, function (result) {
                                self._buyBtn.disable(false);
                                if (result.errorCode == 0) {
                                    self._data.props.count = parseInt(self._data.props.count) + 1;
                                    self._data.props.id = result.data.entities[0].player_entity_id;
                                    self._options.refreshProfile(result.data.player);
                                    self._refresh();
                                    Mojo.app.toast.show(Mojo.utils.locale("common", "buy ep succ"));
                                } else {
                                    (new Mojo.com.BuyFailDialog({
                                        message: result.errorMsg,
                                    })).open(true);
                                }
                            });
                            self._buyBtn.disable(true);
                        }
                    }).element().appendTo(buyWarningDialog._footer);
                    new Mojo.ui.Button(undefined, {
                        text: Mojo.utils.locale('common', 'think_again'),
                        special: 'button-big-blue',
                        click: function () {
                            buyWarningDialog.close();
                            self.show();
                        }
                    }).element().appendTo(buyWarningDialog._footer);
                    buyWarningDialog.open(true);
                },
            }));
            this._footer.append(self._buyBtn.element());
        },
        _addUseBtn: function () {
            var self = this;
            self._useBtn = (new Mojo.ui.Button('use-btn', {
                text: Mojo.utils.locale('common', 'use'),
                special: 'button-big-red',
                click: function () {
                    Mojo.track.onEvent('18_022');
                    Mojo.ajax('/entity/Use', {
                        id: self._data.props.id,
                    }, function (result) {
                        if (result.errorCode == 0) {
                            self._data.ep_second = result.data.player.ep_second;
                            self._data.ep_restore_pp = result.data.player.ep_restore_pp;
                            self._data.ep = result.data.player.ep;
                            self._data.energy = result.data.player.energy;
                            self._data.props.count = parseInt(self._data.props.count) - 1;
                            self._refresh();
                            self._options.refreshProfile(self._data);
                            Mojo.app.toast.show(Mojo.utils.locale('common', 'add_ep', {
                                name: self._data.props.goods_name
                            }));
                            if (result.data.player.ep >= result.data.player.energy) {
                                w.clearInterval(self._interval);
                                self.close();
                            } else {
                                if (self._data.props.count <= 0) {
                                    self.element().find('#use-btn').disable(true);
                                }
                            }
                        } else {}
                    }, function () {}, {
                        showWait: true
                    });
                },
            }));
            this._footer.find("#use-btn").remove();
            this._footer.append(this._useBtn.element());
        },
        _addHandleButtons: function () {
            var self = this;
            this._addUseBtn();
            this._addBuyBtn();
        },
        _getDefaultOptions: function () {
            var self = this;
            return $.extend(true, this._super(), {
                title: Mojo.utils.locale('common', 'no enough energy'),
                message: '',
                zIndex: 1021,
                close: function () {
                    w.clearInterval(self._interval);
                },
                refreshProfile: null,
            });
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.BuyFailDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.BuyFailDialog";
        },
        init: function (options) {
            this._super(undefined, options);
            this.element().addClass('mojo-com-buyfaildlg');
            this._addContent();
            this._addHandleButtons();
        },
        _addContent: function () {
            var self = this;
            this._message = $('<div class="paragraph"></div>').html(self._options.message).appendTo(this._content);
        },
        _addHandleButtons: function () {
            var self = this;
            if (this._options.useRm == true) {
                this._footer.append((new Mojo.ui.Button(undefined, {
                    text: Mojo.utils.locale('common', 'go_payment'),
                    click: function () {
                        Mojo.app.redirect('/mall', {
                            selected: 4
                        });
                    },
                    special: 'button-big-red',
                })).element());
            } else {
                this._footer.append((new Mojo.ui.Button(undefined, {
                    text: Mojo.utils.locale('common', 'go_vm'),
                    click: function () {
                        Mojo.app.redirect('/mall', {
                            selected: 2
                        });
                    },
                    special: 'button-big-red',
                })).element());
            }
            this._footer.append((new Mojo.ui.Button(undefined, {
                text: Mojo.utils.locale('common', 'close'),
                click: function () {
                    self.close();
                },
            })).element());
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                title: Mojo.utils.locale('common', 'buy_fail_title'),
                message: '',
                useRm: true,
                zIndex: 1100,
                deviceaware: true
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
    var g = w.Mojo.com.Slot = w.Mojo.Object.extend({
        clsname: function () {
            return "com.Slot";
        },
        init: function (options) {
            this._super(undefined, options);
            var self = this;
            this._slotContainer = this.element();
            this._slotContainer.show().addClass(self._options.slotContainerClass);
            this._slot = $('<div></div>').attr("id", self._options.slotId).addClass(self._options.slotClass).addClass(self._options.slotClass + '-' + Mojo.app.data.userLanguage).appendTo(this._slotContainer);
            $(this._slot).pan({
                fps: 30,
                dir: 'down'
            });
            $(this._slot).spStop();
        },
        _getDefaultOptions: function () {
            var self = this;
            return {
                slotId: '0',
                speed: 0,
                step: 2,
                interval: null,
                maxSpeed: 60,
                minSpeed: 10,
                imgHeight: self.getR("imgHeight"),
                spriteHeight: self.getR("spriteHeight"),
                started: false,
                slotContainerClass: 'mojo-com-slot-container',
                slotClass: 'mojo-com-slot',
                slotMotionClass: 'mojo-com-slot-motion',
                slotActivePaneClass: 'mojo-com-slot-activepane',
                slotActiveBtnClass: 'mojo-com-slot-activebtn',
            };
        },
        reset: function () {
            var self = this;
            $(this._slot).spStop();
            $._spritely.instances[self._options.slotId].t = 0;
            $(this._slot).css('background-position', self.getR("background-position"));
            self._options.speed = 0;
        },
        canStart: function () {
            var self = this;
            if (self._options.started === false && self._options.speed == 0) {
                return true;
            } else {
                return false;
            }
        },
        startInSchedule: function () {
            var self = this;
            if (self._options.started === false) {
                if (self._options.speed == 0) {
                    self.start();
                } else {
                    var interval = window.setInterval(function () {
                        if (self._options.speed == 0) {
                            self.start();
                            clearInterval(interval);
                        }
                    }, 100);
                }
            }
        },
        start: function () {
            var self = this;
            $(this._slot).spStart();
            self._options.started = true;
            self._options.interval = window.setInterval(function () {
                if (self._options.speed < self._options.maxSpeed) {
                    self._options.speed += self._options.step;
                    $(self._slot).spSpeed(self._options.speed);
                }
            }, 40);
        },
        canStop: function () {
            var self = this;
            if (self._options.started === true && self._options.speed >= self._options.maxSpeed) {
                return true;
            } else {
                return false;
            }
        },
        stopInSchedule: function (n, callback) {
            var self = this;
            if (self._options.started === true) {
                var targetPos = self._options.spriteHeight * n;
                if (self._options.speed >= self._options.maxSpeed) {
                    self.stop(targetPos, callback);
                } else {
                    var interval = window.setInterval(function () {
                        if (self._options.speed >= self._options.maxSpeed) {
                            self.stop(targetPos, callback);
                            clearInterval(interval);
                        }
                    }, 100);
                }
            }
        },
        stop: function (targetPos, callback) {
            var self = this;
            clearInterval(self._options.interval);
            self._options.interval = window.setInterval(function () {
                if (self._options.speed > self._options.minSpeed) {
                    self._options.speed -= self._options.step;
                    $(self._slot).spSpeed(self._options.speed);
                }
                if (self._options.speed <= self._options.minSpeed) {
                    var range = self._rangeFromTarget_when_dir_down(targetPos);
                    if (range > 0) {
                        if (Mojo.gap.device == 'ipad') {
                            if (range < 0.05) {
                                var best = targetPos;
                                var bgPos = "0px " + best + "px";
                                $(self._slot).css('background-position', bgPos);
                                $(self._slot).spSpeed(0);
                                $(self._slot).spStop();
                                clearInterval(self._options.interval);
                                $(self._slot).removeClass(self._options.slotMotionClass);
                                self._options.speed = 0;
                                self._options.started = false;
                                if (callback != undefined) {
                                    callback.call();
                                }
                            } else if (range < 0.1) {
                                self._options.speed = 1;
                                $(self._slot).spSpeed(1);
                            } else if (range < 0.5) {
                                self._options.speed = 2;
                                $(self._slot).spSpeed(2);
                            } else if (range < 0.9) {
                                self._options.speed = 4;
                                $(self._slot).spSpeed(4);
                            } else if (range < 1.4) {
                                self._options.speed = 6;
                                $(self._slot).spSpeed(6);
                            } else if (range < 2) {
                                self._options.speed = 8;
                                $(self._slot).spSpeed(8);
                            }
                        } else {
                            if (range < 0.1) {
                                var best = targetPos - 7;
                                var bgPos = "5px " + best + "px";
                                $(self._slot).css('background-position', bgPos);
                                $(self._slot).spSpeed(0);
                                $(self._slot).spStop();
                                clearInterval(self._options.interval);
                                $(self._slot).removeClass(self._options.slotMotionClass);
                                self._options.speed = 0;
                                self._options.started = false;
                                if (callback != undefined) {
                                    callback.call();
                                }
                            } else if (range < 0.5) {
                                self._options.speed = 2;
                                $(self._slot).spSpeed(2);
                            } else if (range < 0.9) {
                                self._options.speed = 4;
                                $(self._slot).spSpeed(4);
                            } else if (range < 1.4) {
                                self._options.speed = 6;
                                $(self._slot).spSpeed(6);
                            } else if (range < 2) {
                                self._options.speed = 8;
                                $(self._slot).spSpeed(8);
                            }
                        }
                    }
                }
            }, 40);
        },
        _rangeFromTarget_when_dir_down: function (targetPos) {
            var self = this;
            var currentPos = $(self._slot).css('background-position');
            currentPos = currentPos.split(' ')[1];
            currentPos = parseInt(currentPos, 10);
            if ((targetPos - (currentPos % self._options.imgHeight)) > 0) {
                return ((targetPos - (currentPos % self._options.imgHeight)) / self._options.spriteHeight);
            } else {
                return -1;
            }
        },
        _rangeFromTarget_when_dir_up: function (targetPos) {
            var self = this;
            var currentPos = $(self._slot).css('background-position');
            currentPos = currentPos.split(' ')[1];
            currentPos = parseInt(currentPos, 10);
            if (((currentPos % self._options.imgHeight) - targetPos) > 0) {
                return (((currentPos % self._options.imgHeight) - targetPos) / self._options.spriteHeight);
            } else {
                return -1;
            }
        },
        _isNearTarget: function (range, targetPos) {
            var self = this;
            var currentPos = $(self._slot).css('background-position');
            currentPos = currentPos.split(' ')[1];
            currentPos = parseInt(currentPos, 10);
            if (((currentPos % self._options.imgHeight) - targetPos) > 0 && ((currentPos % self._options.imgHeight) - targetPos) < (self._options.spriteHeight * range)) {
                return true;
            } else {
                return false;
            }
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.Task = w.Mojo.Object.extend({
        clsname: function () {
            return "com.Task";
        },
        init: function (scenario, group, task, options) {
            this.scenario = scenario;
            this.group = group;
            this.task = task;
            this._super(undefined, options);
            this.element().addClass('mojo-com-task');
            this._addTitle();
            this._addDescription();
            this._addDetail();
            this._addAction();
            this._refresh();
        },
        _addTitle: function () {
            this.element().append('<div class="title"><div class="left">' +
                this.scenario.order + '-' + this.group.order + '-' + this.task.order + '</div><div class="center">' +
                this.task.name + '</div><div class="right">' +
                Mojo.utils.locale('ui', 'Level') + this.task.level + '</div></div>');
        },
        _addDescription: function () {
            this.element().append('<div class="row description">' + this.task.description + '</div>');
        },
        _addDetail: function () {
            if (this.task.hp > 0) {
                this._lblHp = new Mojo.ui.Label(undefined, {
                    classes: ['hp'],
                    text: this.task.hp
                });
            }
            if (this.task.ep > 0) {
                this._lblEp = new Mojo.ui.Label(undefined, {
                    classes: ['ep'],
                    text: this.task.ep
                });
            }
            if (this.task.sp > 0) {
                this._lblSp = new Mojo.ui.Label(undefined, {
                    classes: ['sp'],
                    text: this.task.sp
                });
            }
            if (this.task.xp > 0) {
                this._lblXp = new Mojo.ui.Label(undefined, {
                    classes: ['xp'],
                    text: this.task.xp
                });
            }
            if (this.task.rm > 0) {
                this._lblRm = new Mojo.ui.Label(undefined, {
                    classes: ['rm'],
                    text: this.task.rm
                });
            }
            if (this.task.vm > 0) {
                this._lblVm = new Mojo.ui.Label(undefined, {
                    classes: ['vm'],
                    text: this.task.vm
                });
            }
            if (this.task.boss && this.task.boss.award != undefined && this.task.boss.award.length > 0) {
                this._lblAward = new Mojo.ui.Label(undefined, {
                    classes: ['bonus'],
                    text: this.task.award,
                });
            }
            this._progress = new Mojo.ui.Progress(undefined, {
                value: this.task.count,
                max: this.task.sum_count,
            });
            this.element().append('<div class="row"><div class="requirement"></div><div class="reward"></div><div class="progress"></div></div>');
            this.element().find('.row > .requirement').append(Mojo.utils.locale('ui', 'Requirement') + '<br>').append(this._lblHp != undefined ? this._lblHp.element() : '').append(this._lblEp != undefined ? this._lblEp.element() : '').append(this._lblSp != undefined ? this._lblSp.element() : '');
            this.element().find('.row > .reward').append(Mojo.utils.locale('ui', 'Reward') + '<br>').append('<div class="group"></div>').find('.group').append(this._lblXp != undefined ? this._lblXp.element() : '').append(this._lblRm != undefined ? this._lblRm.element() : '').append(this._lblVm != undefined ? this._lblVm.element() : '').append(this._lblAward != undefined ? this._lblAward.element() : '');
            this.element().find('.row > .progress').append(Mojo.utils.locale('ui', 'Progress') + '<br>').append(this._progress.element());
            if (this.task.boss_info && this._boosAttr == undefined) {
                this._boosAttr = $('<div class="row"><div class="defence"></div></div>').appendTo(this.element());
                this.element().find('.row > .defence').html(Mojo.utils.locale('fuben', 'defence') + this.task.boss_info.def.min + '~' + this.task.boss_info.def.max);
                if (this.task.boss_info.skills != undefined && this.task.boss_info.skills.length > 0) {
                    this.element().append('<div class="row"><div class="skills"></div></div>');
                    var str = '';
                    for (var i = 0; i < this.task.boss_info.skills.length; i++) {
                        str += this.task.boss_info.skills[i] + '<br>';
                    }
                    this.element().find('.row > .skills').html(Mojo.utils.locale('fuben', 'skills') + '<span>' + str + '</span>');
                }
            }
        },
        _addAction: function () {
            var self = this;
            if (this._slotBorder == undefined) {
                this._slotBorder = $('<div class="row"><div class="slot"></div></div>');
            }
            if (this.task.boss && this.task.boss.img != undefined) {
                if (this._boss != undefined) {
                    return;
                }
                if (this._slot != undefined) {
                    this._slot.element().remove();
                    this._slot = undefined;
                    this._btnDo.element().remove();
                    this._btnDo = undefined;
                }
                this._boss = new Mojo.ui.Image(undefined, {
                    src: this.task.boss.img
                });
                this._btnDo = new Mojo.ui.Button(undefined, {
                    text: Mojo.utils.locale('ui', 'Do'),
                    click: function () {
                        Mojo.track.onEvent('05_041');
                        self._showTaskPreviewDialog();
                    },
                    disableClick: function () {
                        if (parseInt(self.task.status) == 2) {
                            Mojo.app.toast.show(Mojo.utils.locale('mission', 'The task is completed!'));
                        } else {
                            Mojo.app.toast.show(Mojo.utils.locale('mission', 'Please complete the tasks above!'));
                        }
                    },
                    special: 'button-big-red',
                });
            } else {
                this._slot = new Mojo.com.Slot({
                    slotId: 'slot-task-' + this.task.task_id,
                });
                this._btnDo = new Mojo.ui.Button(undefined, {
                    text: Mojo.utils.locale('ui', 'Do'),
                    click: function () {
                        Mojo.track.onEvent('05_031');
                        self._slot.startInSchedule();
                        self._sendRequest();
                    },
                    disableClick: function () {
                        if (parseInt(self.task.status) == 2) {
                            Mojo.app.toast.show(Mojo.utils.locale('mission', 'The task is completed!'));
                        }
                    },
                    special: 'button-big-red',
                    sound: '17_slotmachine',
                });
            }
            this._slotBorder.appendTo(this.element()).append(this._btnDo.element()).children('.slot').append(this._slot == undefined ? this._boss.element() : this._slot.element());
        },
        _showTaskPreviewDialog: function () {
            var self = this;
            Mojo.ajax('/mission/do', {
                id: self.task.id,
                preview: 1,
            }, function (result) {
                if (result.errorCode == 0) {
                    (new Mojo.com.TaskPreviewDialog(result.data, {
                        buttonClick: function () {
                            self._sendRequest();
                        },
                    })).open();
                } else if (result.errorCode == 10002) {
                    (new Mojo.com.EpDialog(result.data, {
                        title: Mojo.utils.locale('mission', 'Energy point is not enough'),
                        message: result.errorMsg,
                        refreshProfile: function (data) {
                            self._options.refreshProfile(data);
                        },
                    })).open();
                } else if (result.errorCode == 160003) {
                    var dlg = new Mojo.com.CommonDialog(undefined, {
                        title: Mojo.utils.locale('common', 'capacify_lack'),
                        content: $('<div class="paragraph"></div>').html(Mojo.utils.locale('common', 'capacify_lack_tip')),
                        leftBtnText: Mojo.utils.locale('common', 'go_intensify'),
                        leftBtnClick: function () {
                            Mojo.app.redirect('/intensify');
                        },
                        rightBtnText: Mojo.utils.locale('common', 'go_sale'),
                        rightBtnClick: function () {
                            Mojo.app.redirect('/entity', {
                                selected: 3
                            });
                        },
                        close: function () {
                            Mojo.app.redirect('/home');
                        }
                    });
                    dlg.open();
                } else {
                    (new Mojo.com.TipsDialog({
                        title: Mojo.utils.locale('common', 'tips'),
                        message: result.errorMsg,
                    })).open();
                }
            }, function () {}, {
                showWait: true
            });
        },
        _refresh: function (boss) {
            var self = this;
            this._progress.value(this.task.count);
            this._btnDo.disable(this.task.status == 2 || this.task.unlock == 0);
            if (boss != undefined) {
                this._addAction();
                setTimeout(function () {
                    self._options.reSize();
                }, 100);
            }
        },
        _onResult: function (result) {
            Mojo.gap.showbattleskip();
            var self = this;
            var data = result.data;
            self._overlayHide();
            var sucessDlg = new Mojo.com.TaskDialog(data, {
                close: function () {
                    $.extend(self.task, data.task);
                    self._options.afterDo(data, result);
                    self._refresh(data.task.boss);
                    if (self.task.status == 2) {
                        self.unlock(false);
                        self._options.complete(this, data.unlock);
                    }
                    if (result.data.wuhu) {
                        self._newPlayerGift(result);
                    }
                    Mojo.light.showLight('task', {
                        level: data.player.level
                    });
                },
            });
            if (self._slot == undefined) {
                setTimeout(function () {
                    Mojo.ajax('/battle/Detail', {}, function (response) {
                        if (response.errorCode == 0) {
                            (new Mojo.com.BattleDetailDialog(response.data, {
                                title: Mojo.utils.locale('mission', 'battle_result_formation_title_win'),
                                show_detail_first: true,
                                non_show_def_lever: true,
                                non_show_base_def: true,
                                close: function () {
                                    sucessDlg.open(true);
                                },
                            })).open(true);
                        } else {}
                    }, function () {}, {
                        showWait: true
                    });
                }, 500);
            } else {
                sucessDlg.open(true);
            }
        },
        _newPlayerGift: function (response) {
            var self = this;
            var newPlayerTutorial = undefined;
            var newPlayerAwardDiv = $('<div id="new-player-award"></div>');
            var generalList = {};
            var chooseGeneralId = undefined;
            var elmDiv1 = $('<div class="new-player-awards"></div>');
            if (response && response.errorCode === 0) {
                for (var index in response.data.wuhu.list) {
                    var data = response.data.wuhu.list[index];
                    var obj = new Mojo.Object(undefined, {
                        classes: ['new-player-award-element', 'image'],
                    });
                    obj.element().append('<img src="' + data.small_image + '">');
                    obj.element().append('<div class="element-border"></div>');
                    obj.element().append('<div class="element-name">' + data.name + '</div>');
                    obj.element().bind('click', {
                        id: data.id
                    }, function (evt) {
                        elmDiv1.find('.selected').removeClass('selected');
                        for (var id in generalList) {
                            var el = generalList[id];
                            if (id == evt.data.id) {
                                el.element().addClass('selected');
                                chooseGeneralId = evt.data.id;
                            }
                        }
                    });
                    if (parseInt(data.is_default) == 1) {
                        obj.element().addClass('selected');
                        chooseGeneralId = data.id;
                    }
                    generalList[data.id] = obj;
                    elmDiv1.append(obj.element());
                }
                elmDiv1.appendTo(newPlayerAwardDiv);
                (new Mojo.ui.Button(undefined, {
                    text: Mojo.utils.locale('common', 'ok'),
                    special: 'button-big-red',
                    click: function () {
                        Mojo.ajax("/bonus/NewPlayerAward", {
                            entity_id: chooseGeneralId
                        }, function (response) {
                            newPlayerAwardDiv.remove();
                            newPlayerTutorial.close();
                            Mojo.gap.highlightMenuItem(-1);
                        }, function () {
                            newPlayerAwardDiv.remove();
                            newPlayerTutorial.close();
                        });
                    }
                })).element().addClass("go-sanguo").appendTo(newPlayerAwardDiv);
            }
            newPlayerTutorial = (new Mojo.com.Tutorial(undefined, {
                text: Mojo.utils.locale('tutorial', 'tutorial_new_player'),
            }));
            newPlayerTutorial.open();
            newPlayerTutorial.element().attr("id", "new-player-tutorial").find(".tutorial-arrow").hide();
            newPlayerTutorial.element().append($('<div class="new-player-award-title"></div>').html(Mojo.utils.locale('mission', 'new_player_gift_title')));
            newPlayerTutorial.element().append(newPlayerAwardDiv);
        },
        _overlayShow: function () {
            if (this._overlay == undefined) {
                this._overlay = new Mojo.ui.Overlay('task-slot-overlay', {
                    opacity: 0,
                });
            }
            this._overlay.show();
        },
        _overlayHide: function () {
            if (this._overlay != undefined) {
                this._overlay.hide();
            }
        },
        _sendRequest: function () {
            var self = this;
            self._overlayShow();
            Mojo.ajax('/mission/do', {
                id: self.task.id,
                preview: 0,
            }, function (result) {
                if (result.errorCode == 0) {
                    self._stopSlot(result.data.award.bonus, function () {
                        self._onResult(result);
                    });
                    if (self._slot == undefined) {
                        Mojo.gap.battleAnimationPlay(result.data.player_army, result.data.opponent_army);
                        setTimeout(function () {
                            self._onResult(result);
                        }, 500);
                    }
                } else {
                    self._stopSlot(undefined, function () {
                        self._overlayHide();
                    });
                    if (self.task.boss != undefined) {
                        self._overlayHide();
                    }
                    if (result.errorCode == 10002) {
                        (new Mojo.com.EpDialog(result.data, {
                            title: Mojo.utils.locale('mission', 'Energy point is not enough'),
                            message: result.errorMsg,
                            refreshProfile: function (data) {
                                self._options.refreshProfile(data);
                            },
                        })).open();
                    } else if (result.errorCode == 160003) {
                        var dlg = new Mojo.com.CommonDialog(undefined, {
                            title: Mojo.utils.locale('common', 'capacify_lack'),
                            content: $('<div class="paragraph"></div>').html(Mojo.utils.locale('common', 'capacify_lack_tip')),
                            leftBtnText: Mojo.utils.locale('common', 'go_intensify'),
                            leftBtnClick: function () {
                                Mojo.app.redirect('/intensify');
                            },
                            rightBtnText: Mojo.utils.locale('common', 'go_sale'),
                            rightBtnClick: function () {
                                Mojo.app.redirect('/entity', {
                                    selected: 3
                                });
                            },
                            close: function () {
                                Mojo.app.redirect('/home');
                            }
                        });
                        dlg.open();
                    } else if (result.errorCode == 20010) {
                        Mojo.gap.battleAnimationPlay(result.data.player_army, result.data.opponent_army);
                        Mojo.ajax('/battle/Detail', {}, function (response) {
                            if (response.errorCode == 0) {
                                (new Mojo.com.BattleDetailDialog(response.data, {
                                    title: Mojo.utils.locale('mission', 'battle_result_formation_title_lose'),
                                    show_detail_first: true,
                                    non_show_def_lever: true,
                                    non_show_base_def: true,
                                    close: function () {
                                        self._options.afterDo(result.data, result);
                                        if (result.data.showcan > 0) {
                                            setTimeout(function () {
                                                if (result.data.showcan == 2) {
                                                    Mojo.light.showLight('task|0');
                                                    Mojo.utils.showDiaochan(Mojo.utils.locale('common', 'diaochan_first_card'), function () {
                                                        Mojo.app.redirect('/home');
                                                    });
                                                } else if (result.data.showcan == 3) {
                                                    Mojo.light.showLight('task|0');
                                                    Mojo.utils.showDiaochan(Mojo.utils.locale('common', 'diaochan_intity_first_card'), function () {
                                                        Mojo.app.redirect('/home');
                                                    });
                                                }
                                                Mojo.app.toast.show(result.errorMsg);
                                            }, 500);
                                        } else {
                                            new Mojo.com.CommonDialog(undefined, {
                                                title: Mojo.utils.locale('mission', 'battle_result_formation_title_lose'),
                                                content: $('<div class="paragraph"></div>').html(Mojo.utils.locale('mission', 'battle_result_fail')),
                                                leftBtnText: Mojo.utils.locale('common', 'go_intensify'),
                                                leftBtnClick: function () {
                                                    Mojo.app.redirect('/intensify');
                                                },
                                                rightBtnText: Mojo.utils.locale('mission', 'formation'),
                                                rightBtnClick: function () {
                                                    Mojo.app.redirect('/package');
                                                },
                                            }).open(true);
                                        }
                                    },
                                })).open(true);
                            } else {}
                        }, function () {}, {
                            showWait: true
                        });
                    } else {
                        Mojo.app.toast.show(result.errorMsg);
                    }
                }
            }, function () {
                self._stopSlot(undefined, function () {
                    self._overlayHide();
                });
            });
        },
        _stopSlot: function (bonus, callback) {
            if (this._slot == undefined) return;
            var n = 1;
            if (bonus != undefined) {
                if (bonus.vm != undefined) {
                    n = 2;
                } else if (bonus.xp != undefined) {
                    n = 3;
                } else if (bonus.entities != undefined) {
                    n = 4;
                }
            }
            this._slot.stopInSchedule(n, callback);
        },
        _getDefaultOptions: function () {
            return {
                complete: $.noop,
                afterDo: $.noop,
                refreshProfile: $.noop,
            };
        },
        unlock: function (value) {
            this._btnDo.disable(!value);
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.TaskList = w.Mojo.ui.ListPanel.extend({
        clsname: function () {
            return "com.TaskList";
        },
        init: function (options) {
            this._super(undefined, options);
            this.element().addClass('mojo-com-tasklist');
            this._addNavigator();
        },
        _addNavigator: function () {
            var self = this;
            this._scenBtn = new Mojo.ui.Button('btn-scenario', {
                text: '',
                click: function () {
                    self._options.clickScenario(self._scenario);
                },
            });
            this._gpRadio = new Mojo.ui.Radio('radio-groups', {
                selectionChange: function (i) {
                    Mojo.track.onEvent('05_012');
                    self.switchTo(self.data.cur_scenario.scenario_id, self.data.task_groups[i].task_group_id);
                },
                disableClick: function (index) {
                    Mojo.app.toast.show(Mojo.utils.locale('mission', 'You have to complete the previous task group!'));
                },
            });
            this._group_scroll = new Mojo.ui.Scroll('task-groups-scroll', this._gpRadio, {
                direction: 1,
            });
            this.element().children('.header').append(this._scenBtn.element()).append(this._group_scroll.element());
        },
        _refreshNav: function () {
            var self = this;
            this._scenBtn.text(this.data.cur_scenario.name);
            this._gpRadio.removeAll();
            this._gpRadio.element().css('width', self.data.task_groups.length * this.getR("unitWidth"));
            $.each(self.data.task_groups, function (i, gp) {
                self._gpRadio.addOption(gp.name);
                if (gp.unlock == 0) {
                    self._gpRadio.disable(i, true);
                }
                if (gp.task_group_id == self.data.cur_task_group.task_group_id) {
                    self._gpRadio.selection(i);
                    self._group_scroll.scroll((i * self.getR("unitWidth")), 0);
                }
            });
            this._options.scenario_id = this.data.cur_scenario.scenario_id;
            this._options.task_group_id = this.data.cur_task_group.task_group_id;
            this._group_scroll.refresh();
        },
        _refreshList: function () {
            this.initial();
            this.appendData(this.data.tasks);
            this.resize();
            this._options.onListRefresh();
        },
        switchTo: function (sid, gid, track) {
            if (sid == undefined) {
                return;
            }
            this._options.scenario_id = sid;
            this._options.task_group_id = gid;
            this.removeAll();
            this._children = [];
            this._load(track);
        },
        _getDefaultOptions: function () {
            var self = this;
            return {
                onListRefresh: $.noop,
                scrollable: true,
                scenario_id: null,
                task_group_id: null,
                pageSize: 50,
                clickScenario: $.noop,
                afterDoTask: $.noop,
                refreshProfile: $.noop,
                unlockScenario: $.noop,
                loadFunc: function (start, count, track) {
                    var params = {
                        start: start,
                        count: count,
                    };
                    if (self._options.scenario_id != null) {
                        params.scenario_id = self._options.scenario_id;
                    }
                    if (self._options.task_group_id != null) {
                        params.task_group_id = self._options.task_group_id;
                    }
                    Mojo.ajax('/mission', params, function (result) {
                        if (result.errorCode == 0) {
                            self.data = result.data;
                            self._refreshNav();
                            self._refreshList();
                        }
                    }, function () {
                        self.appendData(null);
                    });
                },
                drawFunc: function (data) {
                    return new Mojo.com.Task(self.data.cur_scenario, self.data.cur_task_group, data, {
                        complete: function (task, unlock) {
                            if (unlock != undefined && unlock != null) {
                                self._unlock(unlock.scenario_id, unlock.task_group_id, unlock.task_id, unlock.next_level);
                            }
                        },
                        afterDo: function (data, result) {
                            self._options.afterDoTask(data, result);
                        },
                        refreshProfile: function (data) {
                            self._options.refreshProfile(data);
                        },
                        reSize: function () {
                            self.resize();
                        },
                    });
                },
            };
        },
        _unlock: function (sid, gid, tid, nlevel) {
            if (sid != this._options.scenario_id) {
                this._options.unlockScenario(sid);
            } else if (gid == this._options.task_group_id && nlevel != undefined && nlevel == 1) {
                this.switchTo(sid, gid, true);
                return;
            }
            if (sid != this._options.scenario_id || gid != this._options.task_group_id) {
                this.switchTo(sid, gid, true);
            } else {
                var ts = this.children();
                var t = null;
                for (var i = 0; i < ts.length; i++) {
                    t = ts[i];
                    if (t.task.scenario_id == sid && t.task.task_group_id == gid && t.task.task_id == tid) {
                        t.unlock(true);
                        break;
                    }
                }
            }
        },
        debugTitle: function () {
            return "Mojo.com.TaskList";
        }
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.TaskDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.TaskDialog";
        },
        init: function (data, options) {
            this._data = data.award;
            this._task = data.task;
            this._super(undefined, options);
            this.element().addClass('mojo-com-taskdlg');
            var self = this;
            this._addContent();
            this._addHandleButtons();
        },
        _addContent: function () {
            var data = null;
            var vm = 0,
                rm = 0,
                xp = 0,
                addvm = 0,
                addrm = 0;
            if (this._data.bonus != undefined) {
                if (this._data.bonus.entities != undefined && this._data.bonus.entities.length > 0) {
                    Mojo.gap.soundPlay('18_new_card');
                    data = this._data.bonus.entities[0];
                }
            } else {}
            if (this._data.boss != undefined) {
                if (this._data.boss.entities != undefined && this._data.boss.entities.length > 0) {
                    data = this._data.boss.entities[0];
                }
            }
            if (data != null) {
                this._entity = new Mojo.com.LargeEntity(data);
                this._content.append(this._entity.element());
                this._content.append('<div class="tip">' + this._contentText(data) + '</div>');
            }
            this._content.append('<div class="reward"></div>');
            this._content.find('.reward').append((new Mojo.ui.Label(undefined, {
                text: Mojo.utils.locale('mission', 'Gained') + '：',
                classes: ['gained'],
            })).element());
            this._content.find('.reward').append((new Mojo.ui.Label(undefined, {
                text: this._xpText(),
                classes: ['xp'],
            })).element());
            this._content.find('.reward').append((new Mojo.ui.Label(undefined, {
                text: this._vmText(),
                classes: ['vm'],
            })).element());
        },
        _xpText: function () {
            if (this._data.bonus != undefined) {
                return this._data.fixed.xp + (this._data.fixed.add_xp > 0 ? "+" + this._data.fixed.add_xp : "") + (this._data.bonus.xp > 0 ? "+" + this._data.bonus.xp : "");
            } else {
                return this._data.fixed.xp + (this._data.fixed.add_xp > 0 ? "+" + this._data.fixed.add_xp : "");
            }
        },
        _vmText: function () {
            if (this._data.bonus != undefined) {
                return this._data.fixed.vm + (this._data.fixed.add_vm > 0 ? "+" + this._data.fixed.add_vm : "") + (this._data.bonus.vm > 0 ? "+" + this._data.bonus.vm : "");
            } else {
                return this._data.fixed.vm + (this._data.fixed.add_vm > 0 ? "+" + this._data.fixed.add_vm : "");
            }
        },
        _contentText: function (entity) {
            var number = Math.random();
            if (this._data.bonus != undefined) {
                if (entity.type_id == 1) {
                    if (number > 0.5) {
                        return Mojo.utils.locale('mission', 'Get One Generals', {
                            name: entity.name
                        });
                    } else {
                        return Mojo.utils.locale('mission', 'Get Another Generals', {
                            name: entity.name
                        });
                    }
                } else {
                    if (number > 0.5) {
                        return Mojo.utils.locale('mission', 'Get One Collection', {
                            name: entity.name
                        });
                    } else {
                        return Mojo.utils.locale('mission', 'Get Another Collection', {
                            name: entity.name
                        });
                    }
                }
            } else {
                if (entity.type_id == 1) {
                    return Mojo.utils.locale('mission', 'Attack One Generals', {
                        boss_name: this._task.boss.name,
                        name: entity.name
                    });
                } else {
                    return Mojo.utils.locale('mission', 'Attack Another Generals', {
                        boss_name: this._task.boss.name,
                        name: entity.name
                    });
                }
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
                title: Mojo.utils.locale('mission', 'Task Awards'),
                handle: $.noop,
            });
        },
        open: function () {
            if (this._entity != null && this._entity != undefined) {
                this._super();
            } else {
                Mojo.app.toast.show(Mojo.utils.locale('mission', 'Gained') + ' XP:' + this._xpText() + '&nbsp;，&nbsp;' + Mojo.utils.locale('mission', 'Coins') + ':' + this._vmText());
                this.close();
            }
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.Map = w.Mojo.Object.extend({
        clsname: function () {
            return "com.Map";
        },
        init: function (scenario, options) {
            this._scenario = scenario;
            this._super(undefined, options);
            this.element().addClass('mojo-com-map');
            var self = this;
            this._btnBack = (new Mojo.ui.Button('btn-map-back', {
                click: self._options.clickBack,
                text: '',
            }));
            this.element().append(this._btnBack.element());
            this._maplist = new Mojo.ui.ListPanel('com-map-maplist', {
                pageSize: 50,
                loadFunc: function (start, count) {
                    Mojo.ajax('/mission/map', {
                        start: start,
                        count: count,
                    }, function (result) {
                        if (result.errorCode == 0) {
                            self._maplist.appendData(result.data);
                            self.focus();
                        } else {
                            self._maplist.appendData(null);
                        }
                    }, function () {
                        self._maplist.appendData(null);
                    });
                },
                drawFunc: function (data) {
                    return new Mojo.com.MapElement(data, {
                        click: function (data) {
                            self._options.clickElement(data);
                        },
                    });
                },
            });
            this._scroll = new Mojo.ui.Scroll('com-map-scroll', this._maplist, {});
            this.element().append(this._scroll.element());
        },
        focus: function () {
            this._scroll.refresh();
            var ml = this._maplist.children();
            var m = null;
            for (var i = 0; i < ml.length; i++) {
                m = ml[i];
                if (m.data.data == this._scenario.scenario_id) {
                    var dx = (m.data.x - this._scroll.wrapperWidth() / 2);
                    var dy = (m.data.y - this._scroll.wrapperHeight() / 2);
                    this._scroll.scroll(dx, dy);
                    break;
                }
            }
        },
        _getDefaultOptions: function () {
            var self = this;
            return $.extend(true, this._super, {
                clickBack: $.noop,
                clickElement: $.noop,
            });
        },
        scenario: function (scen) {
            if (scen == undefined) {
                return this._scenario;
            }
            this._scenario = scen;
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.MapElement = w.Mojo.Object.extend({
        clsname: function () {
            return "com.MapElement";
        },
        init: function (data, options) {
            this.data = data;
            this._super(undefined, options);
            this.element().addClass('mojo-com-map-element');
            this.element().append('<div class="name"></div><div class="status"></div>');
            this._refresh();
        },
        _refresh: function () {
            var self = this;
            var icons = ['main-city', 'border-town', 'border', 'points'];
            var flags = ['locked', 'fighting', 'occupied'];
            var type = parseInt(this.data.type);
            var status = parseInt(this.data.status);
            this.element().addClass("map-" + icons[type] + (status == 0 ? "-disabled" : ""));
            this.element().find('.name').html(this.data.name);
            this.element().find('.status').addClass(flags[status]);
            this.element().css('left', this.getR("left") * parseInt(this.data.x)).css('top', this.getR("top") * parseInt(this.data.y));
            if (status != 0) {
                this.element().click(function () {
                    self._options.click(self.data);
                });
            }
        },
        _getDefaultOptions: function () {
            return {
                click: $.noop,
            };
        },
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.LevelUpDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.LevelUpDialog";
        },
        init: function (data, fulldata, options) {
            this._data = data;
            this._fulldata = fulldata;
            this._super(undefined, options);
            this.element().addClass('mojo-com-levelupdlg');
            this.element().addClass('mojo-com-levelupdlg-' + Mojo.app.data.userLanguage);
            this._addContent();
            this._addHandleButtons();
        },
        _getIOSMajorVersion: function () {
            var userAgent = window.navigator.userAgent;
            var result = userAgent.match(/iPhone OS (\d*)_/);
            if (!Mojo.utils.isNone(result)) {
                return result[1];
            }
            result = userAgent.match(/iPad OS (\d*)_/);
            if (!Mojo.utils.isNone(result)) {
                return result[1];
            }
            return undefined;
        },
        _addContent: function () {
            this._genTips();
            if (this._data.award.vm != undefined && this._data.award.vm != null) {
                this._bonus = $('<div class="bonus mojo-ui-label"></div>').appendTo(this._content.find('.paragraph'));
                this._bonus.append((new Mojo.ui.Label(undefined, {
                    classes: ['vm'],
                    text: this._data.award.vm
                })).element());
            }
            if (this._data.award.rm != undefined && this._data.award.rm != null) {
                this._bonus.append((new Mojo.ui.Label(undefined, {
                    classes: ['rm'],
                    text: this._data.award.rm
                })).element());
            }
        },
        _isDataChanged: function (attr) {
            if (attr && attr.length > 1) {
                return attr[0] != attr[1];
            }
            return false;
        },
        _genTips: function () {
            var _message = $('<div class="paragraph"></div>');
            new Mojo.ui.Label(undefined, {
                classes: ['level'],
                text: Mojo.utils.locale('common', 'level_up', {
                    'level': this._data.level[1]
                })
            }).element().appendTo(_message);
            new Mojo.ui.Label(undefined, {
                classes: ['base_attack'],
                text: Mojo.utils.locale('common', 'base_attack', {
                    'old': this._data.attack[0],
                    'new': this._data.attack[1]
                })
            }).element().appendTo(_message);
            new Mojo.ui.Label(undefined, {
                classes: ['base_defence'],
                text: Mojo.utils.locale('common', 'base_defence', {
                    'old': this._data.defence[0],
                    'new': this._data.defence[1]
                })
            }).element().appendTo(_message);
            new Mojo.ui.Label(undefined, {
                classes: ['max_energy'],
                text: Mojo.utils.locale('common', 'max_energy', {
                    'old': this._data.energy[0],
                    'new': this._data.energy[1]
                })
            }).element().appendTo(_message);
            if (this._isDataChanged(this._data.stamina)) {
                new Mojo.ui.Label(undefined, {
                    classes: ['max_stamina'],
                    text: Mojo.utils.locale('common', 'max_stamina', {
                        'old': this._data.stamina[0],
                        'new': this._data.stamina[1]
                    })
                }).element().appendTo(_message);
            }
            if (this._isDataChanged(this._data.maxFriendsNum)) {
                new Mojo.ui.Label(undefined, {
                    classes: ['max_friend'],
                    text: Mojo.utils.locale('common', 'max_friends_count', {
                        'old': this._data.maxFriendsNum[0],
                        'new': this._data.maxFriendsNum[1]
                    })
                }).element().appendTo(_message);
            }
            if (this._isDataChanged(this._data.entity)) {
                new Mojo.ui.Label(undefined, {
                    classes: ['entity'],
                    text: Mojo.utils.locale('common', 'max_entity', {
                        'old': this._data.entity[0],
                        'new': this._data.entity[1]
                    })
                }).element().appendTo(_message);
            }
            if (this._isDataChanged(this._data.unlockSlotNum)) {
                new Mojo.ui.Label(undefined, {
                    classes: ['unlock_slot'],
                    text: Mojo.utils.locale('common', 'unlock_slot_count', {
                        'old': this._data.unlockSlotNum[0],
                        'new': this._data.unlockSlotNum[1]
                    })
                }).element().appendTo(_message);
            }
            if (!Mojo.utils.isNone(this._data.unlockFuben)) {
                new Mojo.ui.Label(undefined, {
                    classes: ['unlock_fuben'],
                    text: Mojo.utils.locale('common', 'unlock_fuben_name', {
                        'name': this._data.unlockFuben
                    })
                }).element().appendTo(_message);
            }
            var appendAwardTitle = false;
            var award = this._data.award;
            if (!Mojo.utils.isNone(award.vm) || !Mojo.utils.isNone(award.rm)) {
                new Mojo.ui.Label(undefined, {
                    classes: ['levelup_award'],
                    text: Mojo.utils.locale('common', 'gain_levelup_award')
                }).element().appendTo(_message);
                appendAwardTitle = true;
            }
            _message.appendTo(this._content);
        },
        _doWeiboBind: function () {
            Mojo.app.redirect('/newplayer/sinaAuth?state=bind');
        },
        _addHandleButtons: function () {
            var self = this;
            if (self._data.level[1] >= 20 && self._data.level[1] % 5 == 0 && !self._fulldata.data.isbind && !Mojo.app.isNd) {
                self._needBind = true;
            }
            if (self._data && self._data.weibo) {
                self._data.weibo.btnClick = function () {
                    self.close();
                    if (self._needBind) {
                        self._showGoBindDialog();
                    }
                };
            }
            self._data.weibo.showGoBindDialog = function () {
                if (self._needBind) {
                    self._showGoBindDialog();
                }
            };
            var weiboBind = self._fulldata.data.weiboBind || false;
            self._data.weibo = self._data.weibo || {};
            self._data.weibo.weiboBind = weiboBind;
            var platformBtn = new Mojo.com.PlatformButton(undefined, self._data.weibo);
            self._footer.prepend(platformBtn.element());
            this._footer.append((new Mojo.ui.Button('close-btn', {
                text: Mojo.utils.locale('common', 'close'),
                click: function () {
                    self.close();
                    if (self._needBind) {
                        self._showGoBindDialog();
                    }
                }
            })).element());
        },
        _showGoBindDialog: function () {
            var self = this;
            self._needBind = false;
            setTimeout(function () {
                var dlg = new Mojo.com.CommonDialog(undefined, {
                    title: Mojo.utils.locale('common', 'friendly_tip'),
                    content: $('<div class="paragraph"></div>').html(Mojo.utils.locale('common', 'bind_tip3')),
                    leftBtnText: Mojo.utils.locale('weibo', 'go bind'),
                    leftBtnClick: function () {
                        dlg.close();
                        Mojo.app.redirect('/settings', {
                            selected: 1
                        });
                    }
                });
                dlg.open();
            }, 500);
        },
        _showFiveStarDialog: function () {
            var self = this;
            var isOpenUrlSupport = Mojo.utils.isOpenUrlAvailable();
            if (!Mojo.app.isNd && self._data.showFiveStarCommentActivity && isOpenUrlSupport) {
                Mojo.track.onEvent('101_001');
                self._openFiveStarDialog();
            }
        },
        _openFiveStarDialog: function () {
            var self = this;
            self._flag = false;
            var fiveStarDlg = new Mojo.com.CommonDialog(undefined, {
                title: Mojo.utils.locale('appraise', 'appraise_title'),
                classes: ['five-star-dialog'],
                leftBtnText: Mojo.utils.locale('appraise', 'appraise_btn_txt'),
                leftBtnClick: function (that) {
                    Mojo.track.onEvent('101_002');
                    Mojo.ajax('/gameactivity/fivestarcomment', {
                        agree: 1
                    }, function (resp) {
                        that.close();
                        var url = 'itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=';
                        if (Mojo.gap.device == 'ipad') {
                            url = url + '527515340';
                        } else {
                            url = url + '500601105';
                        }
                        var dlg = new Mojo.ui.Dialog(undefined, {
                            title: Mojo.utils.locale('common', 'tips'),
                            content: $('<div class="tip"></div>').html(Mojo.utils.locale('gameactivity', 'five_star_agree', {
                                '__default__': '请主公稍等，24小时内系统会随即奖励一张四星卡发放到您的卡牌包中，祝您游戏愉快！'
                            })),
                            close: function () {
                                Mojo.gap.openurl(url);
                            }
                        });
                        (new Mojo.ui.Button(undefined, {
                            text: Mojo.utils.locale('common', 'ok'),
                            click: function () {
                                dlg.close();
                            }
                        })).element().appendTo(dlg._footer);
                        dlg.open();
                    }, {
                        showWait: true
                    });
                },
                rightBtnText: Mojo.utils.locale('common', 'close'),
                rightBtnClick: function (that) {
                    that.close();
                },
                close: function () {
                    Mojo.track.onEvent('101_003');
                }
            });
            var paragraph = $('<div class="paragraph"></div>').appendTo(fiveStarDlg._content);
            var desc = $('<div class="desc"></div>').html(Mojo.utils.locale('appraise', 'appraise_desc')).appendTo(paragraph);
            var imgborder = $('<div class="img-border"></div>').appendTo(paragraph);
            var img = $('<div class="img"></div>').appendTo(imgborder);
            var info1 = $('<div class="info1"></div>').html(Mojo.utils.locale('appraise', 'appraise_info1')).appendTo(paragraph);
            var info2 = $('<div class="info2"></div>').html(Mojo.utils.locale('appraise', 'appraise_info2')).appendTo(paragraph);
            var info3 = $('<div class="info3"></div>').html(Mojo.utils.locale('appraise', 'appraise_info3')).appendTo(paragraph);
            fiveStarDlg.open();
        },
        _getDefaultOptions: function () {
            var self = this;
            return $.extend(true, this._super(), {
                noTitle: true,
                close: function () {
                    self._showFiveStarDialog();
                },
                zIndex: 1101
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
(function (w, $, g, undefined) {
    w.Mojo = w.Mojo || {};
    g = w.Mojo.light = w.Mojo.light || {};
    g.showLight = function (position, opts) {
        var positions = position.split('|');
        var modul = positions[0];
        var p = positions[1];
        var lightQuickBtns = Mojo.app.getStorage('lightQuickBtns');
        switch (modul) {
        case 'first-card-border':
            if (lightQuickBtns != 'first-card-border') {
                break;
            }
            var firstCard = $('#package-page-panel .general-list-bg-border .mojo-com-baseslotlist-element').first().find('div');
            if (!firstCard.hasClass('selected')) {
                break;
            }
            switch (p) {
            case '1':
                var lightEle = $('#page-package #package-page-panel .mojo-com-package .mojo-com-package-general .card-default');
                lightEle.addClass('mojo-com-light');
                break;
            case '2':
                var lightEle = $('#mojo-com-entity-preview .mojo-com-entitylist .mojo-com-entity-element').first().find('.radio');
                lightEle.addClass('mojo-com-light-radius-round');
                break;
            case '3':
                var lightEle = $('#mojo-com-entity-preview #confirm-button');
                var radio = $('#mojo-com-entity-preview .mojo-com-entitylist .mojo-com-entity-element').first().find('.radio');
                if (radio.hasClass('radio-selected-class')) {
                    lightEle.addClass('mojo-com-light');
                    radio.removeClass('mojo-com-light-radius-round');
                } else {
                    lightEle.removeClass('mojo-com-light');
                    radio.addClass('mojo-com-light-radius-round');
                }
                break;
            case '4':
                var lightEle = $('#page-package #package-page-panel .mojo-com-package .mojo-com-light');
                lightEle.removeClass('mojo-com-light');
                Mojo.app.saveStorage('lightQuickBtns', '');
                break;
            }
            break;
        case 'task':
            if (lightQuickBtns != 'btn-task') {
                break;
            }
            var level = opts && opts.level;
            if (level > 3) {
                Mojo.app.saveStorage('lightQuickBtns', '');
                var lighted = $('.mojo-com-tasklist .mojo-ui-listpanel-child .mojo-com-light-radius-round');
                lighted.removeClass('mojo-com-light-radius-round');
                return;
            }
            var lighted = $('.mojo-com-tasklist .mojo-ui-listpanel-child .mojo-com-light-radius-round');
            lighted.removeClass('mojo-com-light-radius-round');
            var lightEle = $('.mojo-com-tasklist .mojo-ui-listpanel-child').filter(function () {
                return $('.mojo-ui-button-disabled', this).length == 0;
            }).first().find('.mojo-ui-button');
            lightEle.addClass('mojo-com-light-radius-round');
            switch (p) {
            case '0':
                Mojo.app.saveStorage('lightQuickBtns', '');
                var lighted = $('.mojo-com-tasklist .mojo-ui-listpanel-child .mojo-com-light-radius-round');
                lighted.removeClass('mojo-com-light-radius-round');
                break;
            }
            break;
        case 'first-card-border-intensify':
            if (lightQuickBtns != 'first-card-border-intensify') {
                break;
            }
            switch (p) {
            case '1':
                var firstCard = $('#package-page-panel .general-list-bg-border .mojo-com-baseslotlist-element .card-border').first();
                if (!firstCard.hasClass('selected')) {
                    break;
                }
                var lightEle = $('#page-package #package-page-panel .mojo-com-package .mojo-com-package-general .card');
                lightEle.addClass('mojo-com-light');
                break;
            case '2':
                var firstCard = $('#package-page-panel .general-list-bg-border .mojo-com-baseslotlist-element .card-border').first();
                if (!firstCard.hasClass('selected')) {
                    break;
                }
                if (opts.ele) {
                    opts.ele.addClass('mojo-com-light-radius-round');
                }
                break;
            case '3':
                setTimeout(function () {
                    var lightEle = $('#page-intensify .panel').first().find('.ritual-icon');
                    lightEle.addClass('mojo-com-light');
                });
                break;
            case '4':
                setTimeout(function () {
                    var lightEleP = $('#page-intensify .panel').first().find('.ritual-icon');
                    if (lightEleP.hasClass('mojo-com-light')) {
                        var lightEle = $('#mojo-com-entity-preview .mojo-com-entitylist .mojo-com-entity-element .combo');
                        lightEle.addClass('mojo-com-light');
                    }
                });
                break;
            case '5':
                var lightEle = $('#mojo-com-entity-preview .mojo-com-entitylist .mojo-com-entity-element .combo');
                if (!lightEle.hasClass('mojo-com-light')) {
                    break;
                }
                var maxCard = 7;
                var lightEle = $('.mojo-com-entity-preview #confirm-button');
                var comboSel = $('.mojo-com-entity-preview .mojo-com-entitylist .combo-selected-class');
                if (comboSel.length >= maxCard) {
                    lightEle.addClass('mojo-com-light');
                    var lightEles = $('.mojo-com-entity-preview .mojo-com-entitylist .mojo-com-light');
                    lightEles.removeClass('mojo-com-light');
                } else {
                    var star1 = $('#mojo-com-entity-preview .mojo-com-entitylist .star-1');
                    var star2 = $('#mojo-com-entity-preview .mojo-com-entitylist .star-2');
                    var flag = false;
                    for (var i = 0; i < star1.length; i++) {
                        var s1 = $(star1[i]);
                        if (s1.attr('class').indexOf('combo-selected-class') == -1) {
                            flag = true;
                        }
                    }
                    for (var i = 0; i < star2.length; i++) {
                        var s2 = $(star2[i]);
                        if (s2.attr('class').indexOf('combo-selected-class') == -1) {
                            flag = true;
                        }
                    }
                    if (flag) {
                        lightEle.removeClass('mojo-com-light');
                        var lightEles = $('.mojo-com-entity-preview .mojo-com-entitylist .mojo-com-light');
                        lightEles.addClass('mojo-com-light');
                    } else {
                        lightEle.addClass('mojo-com-light');
                        var lightEles = $('.mojo-com-entity-preview .mojo-com-entitylist .mojo-com-light');
                        lightEles.removeClass('mojo-com-light');
                    }
                }
                break;
            case '6':
                var confirmButton = $('.mojo-com-entity-preview #confirm-button');
                if (confirmButton.hasClass('mojo-com-light')) {
                    if (opts.ele) {
                        opts.ele.addClass('mojo-com-light-radius-round');
                    }
                    Mojo.app.data.intensify5 = true;
                }
                break;
            case '7':
                if (Mojo.app.data.intensify5) {
                    var oldLightEle = $('#page-intensify .mojo-com-intensify .mojo-com-light');
                    oldLightEle.removeClass('mojo-com-light');
                    var lightEle = $('#page-intensify .mojo-com-intensify .intensify-button');
                    lightEle.addClass('mojo-com-light-radius-round');
                    delete Mojo.app.data.intensify5;
                }
                break;
            case '8':
                Mojo.app.saveStorage('lightQuickBtns', '');
                var lightEle = $('#page-intensify .mojo-com-intensify .mojo-com-light-radius-round');
                lightEle.removeClass('mojo-com-light-radius-round');
                break;
            }
            break;
        case 'battle':
            if (lightQuickBtns != 'btn-battle') {
                break;
            }
            switch (p) {
            case '1':
                var lightEle = $('#page-battle .mojo-ui-scroll .mojo-com-opponent .go-attack-btn');
                lightEle.addClass('mojo-com-light');
                break;
            case '2':
                Mojo.app.saveStorage('lightQuickBtns', '');
                break;
            }
            break;
        case 'entity-battle':
            if (lightQuickBtns != 'btn-entity-battle') {
                break;
            }
            var firstCard = $('#page-rob .mojo-ui-pagepanel .general-list-bg-border .mojo-com-collectlist-element').first().find('.card-border');
            if (!firstCard.hasClass('selected')) {
                break;
            }
            switch (p) {
            case '1':
                var lightEle = $('.mojo-com-collection .mojo-com-collect-fragment .image');
                lightEle.addClass('mojo-com-light-radius-round');
                break;
            case '2':
                var lightEle = $('.mojo-com-collectfragdlg .footer #rob-btn');
                lightEle.addClass('mojo-com-light-radius-round');
                break;
            case '3':
                var lightEle = $('#page-rob .opplist .mojo-ui-scroll .mojo-com-opponent .go-attack-btn');
                lightEle.addClass('mojo-com-light');
                break;
            case '4':
                Mojo.app.saveStorage('lightQuickBtns', '');
                break;
            }
            break;
        case 'fuben':
            break;
        case 'force':
            break;
        }
    };
    g.showShadow = function () {
        $(document.body).find(".mojo-com-tutorial").remove();
        var tutorial = $('<div class="mojo-com-tutorial"><div class="shadow"></div></div>').appendTo($(document.body));
        tutorial.find(".shadow").css({
            left: 0,
            top: 0,
            width: $(document).width(),
            height: $(document).height()
        });
    };
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.Diaochan = Mojo.Object.extend({
        clsname: function () {
            return "Mojo.com.Diaochan";
        },
        init: function (data, options) {
            var self = this;
            this._data = data;
            this._super(undefined, options);
            this.element().addClass('mojo-com-tutorial mojo-com-diaochan-tutorial').css({
                width: $(document).width(),
                height: $(document).height()
            });
            this.element().click(function (e) {
                self._click(e);
            });
            Mojo.gap.highlightMenuItem(0);
        },
        _getDefaultOptions: function () {
            var self = this;
            return {
                click: undefined,
                text: "",
                textposition: "lt",
                diaochabTextClass: "tutorial-text"
            };
        },
        _createtutorialIcon: function (text) {
            if (text) {
                this._options.text = text;
            }
            var tutorialTextDiv = $('<div></div>').addClass(this._options.diaochabTextClass).addClass(this._options.textposition);
            $('<div></div>').addClass('arrow').appendTo(tutorialTextDiv);
            $('<div></div>').addClass('text').html(this._options.text).appendTo(tutorialTextDiv);
            tutorialTextDiv.appendTo(this.element());
        },
        _createShadow: function (left, top, width, height) {
            $('<div></div>').addClass('shadow').css({
                left: left,
                top: top,
                width: width,
                height: height
            }).appendTo(this.element());
        },
        open: function () {
            var dwidth = $(document).width();
            var dheight = $(document).height();
            this._createShadow(0, 0, dwidth, dheight);
            this._createtutorialIcon();
            $(document.body).find(".mojo-com-tutorial").remove();
            this.element().appendTo($(document.body));
            return this;
        },
        _click: function () {
            var self = this;
            this.element().remove();
            Mojo.gap.highlightMenuItem(-1);
            if (self._options.click instanceof Function) {
                self._options.click(self);
            }
        }
    });
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
                pos: '',
                unAppendBody: false,
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
        },
        _createArrow: function (left, top, up, event) {
            return;
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
            if (this._options.unAppendBody != true) {
                this.element().appendTo($(document.body));
            }
            Mojo.app.tutorial = this;
            return this;
        },
        close: function (closeNative) {
            this.element().remove();
            Mojo.gap.highlightMenuItem(-1);
            if (closeNative === true) {
                Mojo.app.tutorial = undefined;
            } else {
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
    w.Mojo.page = w.Mojo.page || {};
    w.Mojo.page.Mission = w.Mojo.Page.extend({
        clsname: function () {
            return "page.Mission";
        },
        init: function () {
            this._super('page-mission', {
                baseProfile: true
            });
            this._hasTutorial = false;
            this._addTaskList();
        },
        _addTaskList: function () {
            var self = this;
            this._taskList = new Mojo.com.TaskList({
                unlockScenario: function (sid) {
                    if (self._map != undefined || self._map != null) {
                        self._map.element().remove();
                        self._map = null;
                    }
                },
                clickScenario: function () {
                    Mojo.track.onEvent('05_011');
                    self._switchToMap();
                },
                afterDoTask: function (data, result) {
                    self.baseProfile.data(data.player);
                },
                onListRefresh: function (data, result) {
                    Mojo.light.showLight('task');
                },
                refreshProfile: function (data) {
                    self.baseProfile.data(data);
                }
            });
            this.element().append(this._taskList.element());
            this._taskList._group_scroll.refresh();
        },
        _switchToMap: function () {
            var self = this;
            if (this._map == undefined || this._map == null) {
                this._map = new Mojo.com.Map(this._taskList.data.cur_scenario, {
                    clickBack: function () {
                        Mojo.track.onEvent('05_021');
                        self._switchToTaskList();
                    },
                    clickElement: function (data) {
                        Mojo.track.onEvent('05_022');
                        self._switchToTaskList(data.data);
                    },
                });
                this.element().append(this._map.element());
                this.rebinding();
            } else {
                this._map.scenario(this._taskList.data.cur_scenario);
            }
            this._taskList.hide();
            this._map.show();
            this._map.focus();
        },
        _switchToTaskList: function (sid) {
            this._map.hide();
            this._taskList.show();
            this._taskList.switchTo(sid);
        },
        load: function () {
            this._super();
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
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.BattleDetailDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.BattleDetailDialog";
        },
        init: function (data, options) {
            var self = this;
            this._data = data;
            this._super(undefined, options);
            this.element().addClass('mojo-com-battledetaildlg');
            this._attackerStatistics = {
                'is_res': 0,
                'is_anti_res': 0,
                'weapon_add_attack': 0
            };
            this._defenderStatistics = {
                'is_res': 0,
                'is_anti_res': 0,
                'armor_add_defence': 0
            };
            this._addContent();
            this._showResult();
            this._addButtons();
        },
        _addContent: function () {
            var self = this;
            this._content.append(this._templateLeft);
            this._content.append(this._templateRight);
            this._content.after($('<div class="center_line"></div>'));
        },
        _showResult: function () {
            var self = this;
            this._content.find('.top-left > .player_name').html(self._data.attacker.player.name);
            this._content.find('.top-left > .player_level').html(Mojo.utils.locale('common', 'level') + self._data.attacker.player.level);
            this._content.find('.top-left > .player_sum').html(Mojo.utils.locale('battle', 'sum attack') + self._data.attacker.player.sum_attack);
            this._content.find('.top-left > .player_base').html(Mojo.utils.locale('battle', 'base attack') + self._data.attacker.player.base_attack);
            this._content.find('.top-right > .player_name').html(self._data.defender.player.name);
            if (self._options.non_show_def_lever == undefined || self._options.non_show_def_lever == false) {
                this._content.find('.top-right > .player_level').html(Mojo.utils.locale('common', 'level') + self._data.defender.player.level);
            }
            this._content.find('.top-right > .player_sum').html(Mojo.utils.locale('battle', 'sum defence') + self._data.defender.player.sum_defence);
            if (self._options.non_show_base_def == undefined || self._options.non_show_base_def == false) {
                this._content.find('.top-right > .player_base').html(Mojo.utils.locale('battle', 'base defence') + self._data.defender.player.base_defence);
            }
            this._army = $('<div class="army"></div>').appendTo(this._content);
            var _blankScroll = $('<div></div>');
            var _playerArmy = $('<div class="con_left"></div>').appendTo(_blankScroll);
            if (self._data.attacker.army != undefined && self._data.attacker.army.length > 0) {
                for (var index in self._data.attacker.army) {
                    var army = self._data.attacker.army[index];
                    var attacker = $('<div></div>').addClass("player_attacker").appendTo(_playerArmy);
                    var image = $('<div class="small-card"></div>');
                    $('<img></img>').attr('src', army.small_image).appendTo(image);
                    image.appendTo(attacker);
                    var attackerRestraint = $('<div class="attacker-restraint"></div>').appendTo(attacker);
                    if (army.is_res == 1) {
                        self._attackerStatistics.is_res += 1;
                        var res = new Mojo.ui.Label(undefined, {
                            text: Mojo.utils.locale('battle', 'restraint'),
                            classes: ['restraint'],
                        });
                        res.element().appendTo(attackerRestraint);
                    }
                    if (army.is_be_res == 1) {
                        var be_res = undefined;
                        if (army.is_anti_res == 1) {
                            self._attackerStatistics.is_anti_res += 1;
                            be_res = new Mojo.ui.Label(undefined, {
                                text: Mojo.utils.locale('battle', 'resist'),
                                classes: ['resist'],
                            });
                        } else {
                            be_res = new Mojo.ui.Label(undefined, {
                                text: Mojo.utils.locale('battle', 'be_restraint'),
                                classes: ['be-restraint'],
                            });
                        }
                        be_res.element().appendTo(attackerRestraint);
                    }
                    if (army.weapon_add_attack > 0) {
                        self._attackerStatistics.weapon_add_attack += 1;
                        var res = new Mojo.ui.Label(undefined, {
                            text: Mojo.utils.locale('battle', 'weapon_hit'),
                            classes: ['weapon_hit'],
                        });
                        res.element().appendTo(attackerRestraint);
                    }
                    var attackerName = $('<div></div>').addClass("attacker_name").addClass('rebirth-' + (army.rebirth_sum > 6 ? 6 : army.rebirth_sum)).appendTo(attacker).html(army.name);
                    var attackerAttack = $('<div></div>').addClass("attacker_attack").appendTo(attacker).html(Mojo.utils.locale('common', 'simple_attack') + army.attack);
                }
                var playerArmyStatistics = $('<div class="army-statistics"></div>').prependTo(_playerArmy);
                (new Mojo.ui.Label(undefined, {
                    text: Mojo.utils.locale('battle', 'restraint') + "：" + self._attackerStatistics.is_res,
                    classes: ['restraint']
                })).element().appendTo(playerArmyStatistics);
                (new Mojo.ui.Label(undefined, {
                    text: Mojo.utils.locale('battle', 'resist') + "：" + self._attackerStatistics.is_anti_res,
                    classes: ['resist']
                })).element().appendTo(playerArmyStatistics);
                (new Mojo.ui.Label(undefined, {
                    text: Mojo.utils.locale('battle', 'weapon_hit') + "：" + self._attackerStatistics.weapon_add_attack,
                    classes: ['weapon_hit']
                })).element().appendTo(playerArmyStatistics);
            }
            var _opponentArmy = $('<div class="con_right"></div>').appendTo(_blankScroll);
            if (self._data.defender.army != undefined && self._data.defender.army.length > 0) {
                for (var index in self._data.defender.army) {
                    var army = self._data.defender.army[index];
                    var defender = $('<div></div>').addClass("opponent_defender").appendTo(_opponentArmy);
                    var image = $('<div class="small-card"></div>');
                    $('<img></img>').attr('src', army.small_image).appendTo(image);
                    image.appendTo(defender);
                    var defenderRestraint = $('<div class="defender-restraint"></div>').appendTo(defender);
                    if (army.is_res == 1) {
                        self._defenderStatistics.is_res += 1;
                        var res = new Mojo.ui.Label(undefined, {
                            text: Mojo.utils.locale('battle', 'restraint'),
                            classes: ['restraint'],
                        });
                        res.element().appendTo(defenderRestraint);
                    }
                    if (army.is_be_res == 1) {
                        var be_res = undefined;
                        if (army.is_anti_res == 1) {
                            self._defenderStatistics.is_anti_res += 1;
                            be_res = new Mojo.ui.Label(undefined, {
                                text: Mojo.utils.locale('battle', 'resist'),
                                classes: ['resist'],
                            });
                        } else {
                            be_res = new Mojo.ui.Label(undefined, {
                                text: Mojo.utils.locale('battle', 'be_restraint'),
                                classes: ['be-restraint'],
                            });
                        }
                        be_res.element().appendTo(defenderRestraint);
                    }
                    if (army.armor_add_defence > 0) {
                        self._defenderStatistics.armor_add_defence += 1;
                        var res = new Mojo.ui.Label(undefined, {
                            text: Mojo.utils.locale('battle', 'armor_protect'),
                            classes: ['armor_protect'],
                        });
                        res.element().appendTo(defenderRestraint);
                    }
                    var defenderName = $('<div></div>').addClass("defender_name").addClass('rebirth-' + (army.rebirth_sum > 6 ? 6 : army.rebirth_sum)).appendTo(defender).html(army.name);
                    var defenderDefence = $('<div></div>').addClass("defender_defence").appendTo(defender).html(Mojo.utils.locale('common', 'simple_defence') + army.defence);
                }
                var opponentArmyStatistics = $('<div class="army-statistics"></div>').prependTo(_opponentArmy);
                (new Mojo.ui.Label(undefined, {
                    text: Mojo.utils.locale('battle', 'restraint') + "：" + self._defenderStatistics.is_res,
                    classes: ['restraint']
                })).element().appendTo(opponentArmyStatistics);
                (new Mojo.ui.Label(undefined, {
                    text: Mojo.utils.locale('battle', 'resist') + "：" + self._defenderStatistics.is_anti_res,
                    classes: ['resist']
                })).element().appendTo(opponentArmyStatistics);
                (new Mojo.ui.Label(undefined, {
                    text: Mojo.utils.locale('battle', 'armor_protect') + "：" + self._defenderStatistics.armor_add_defence,
                    classes: ['armor_protect']
                })).element().appendTo(opponentArmyStatistics);
            }
            self._scroll = new Mojo.ui.Scroll(undefined, _blankScroll, {
                direction: 2
            });
            self._scroll.element().css('height', self.getR("height"));
            this._army.append(self._scroll.element());
            if (self._data.win == true) {
                Mojo.gap.soundPlay('19_battle_win,mp3');
            } else {
                Mojo.gap.soundPlay('20_battle_lose,mp3');
            }
        },
        _onDialogAppend: function () {
            var self = this;
            self._scroll.refresh();
        },
        _addButtons: function () {
            var self = this;
            var btn = new Mojo.ui.Button(undefined, {
                text: Mojo.utils.locale('battle', 'formation'),
                click: function () {
                    Mojo.app.redirect('/package');
                },
                special: 'button-big-red',
            });
            if (self._options.show_detail_first == true) {
                btn = new Mojo.ui.Button(undefined, {
                    text: Mojo.utils.locale('common', 'ok'),
                    click: function () {
                        self.close();
                    },
                    special: 'button-big-red',
                });
            }
            this._footer.append(btn.element());
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                title: Mojo.utils.locale('battle', 'formation detail'),
                opponent_id: '',
                opponent_name: '',
                entity_id: '',
                pk_mode: false,
                zIndex: 1005,
                backCallback: $.noop,
                xp: '',
                vm: '',
                entity: null,
            });
        },
        _templateLeft: '<div class="top-left">\
    <div class="player_name"></div>\
    <div class="player_level"></div>\
    <div class="player_sum"></div>\
    <div class="player_base"></div>\
   </div>',
        _templateRight: '<div class="top-right">\
    <div class="player_name"></div>\
    <div class="player_level"></div>\
    <div class="player_sum"></div>\
    <div class="player_base"></div>\
   </div>',
    });
})(window, jQuery);;
(function (w, $, undefined) {
    w.Mojo = w.Mojo || {};
    w.Mojo.com = w.Mojo.com || {};
    w.Mojo.com.TaskPreviewDialog = w.Mojo.ui.Dialog.extend({
        clsname: function () {
            return "com.TaskPreviewDialog";
        },
        init: function (data, options) {
            this._data = data;
            this._super(undefined, options);
            this.element().addClass('mojo-com-taskpreviewdlg');
            this._addContent();
            this._addHandleButtons();
        },
        _addContent: function () {
            var self = this;
            this._name = $('<div class="name"></div>').appendTo(this._content);
            this._player = $('<div class="player"></div>').appendTo(this._name);
            $('<div class="player_icon"></div>').appendTo(this._player);
            this._playerName = $('<div class="player_name"></div>').html(self._data.player_name).appendTo(this._player);
            this._playerAttack = $('<div class="player_attack"></div>').html('(' + self._data.attack_min + '-' + self._data.attack_max + ')').appendTo(this._player);
            this._vs = $('<div class="vs"></div>').html('VS').appendTo(this._name);
            this._opp = $('<div class="opp"></div>').appendTo(this._name);
            $('<div class="opp_icon"></div>').appendTo(this._opp);
            this._oppName = $('<div class="opp_name"></div>').html(self._data.boss.name).appendTo(this._opp);
            this._oppDefence = $('<div class="opp_defence"></div>').html('(' + self._data.boss.def.min + '-' + self._data.boss.def.max + ')').appendTo(this._opp);
            this._ifwin = $('<div class="ifwin"></div>').appendTo(this._content);
            this._win = $('<div class="win"></div>').html(Mojo.utils.locale('common', 'when win')).appendTo(this._ifwin);
            this._ifwin.append((new Mojo.ui.Label(undefined, {
                classes: ['winxp'],
                text: self._data.win_xp,
            })).element());
            this._ifwin.append((new Mojo.ui.Label(undefined, {
                classes: ['winvm'],
                text: self._data.win_vm,
            })).element());
            this._rate = $('<div class="rate"></div>').html(Mojo.utils.locale('mission', 'win_card')).appendTo(this._ifwin);
            this._iflose = $('<div class="iflose"></div>').appendTo(this._content);
            this._lose = $('<div class="lose"></div>').html(Mojo.utils.locale('common', 'when lose')).appendTo(this._iflose);
            this._iflose.append((new Mojo.ui.Label(undefined, {
                classes: ['losevm'],
                text: '-' + self._data.lose_vm,
            })).element());
        },
        _addHandleButtons: function () {
            var self = this;
            this._attackBtn = new Mojo.ui.Button('attack-btn', {
                special: 'button-big-red',
                text: self._options.atackBtnText,
                click: function () {
                    self._attackBtn.disable(true);
                    self._options.buttonClick();
                    self.close();
                },
            });
            this._footer.append(this._attackBtn.element());
            this._footer.append((new Mojo.ui.Button('close-btn', {
                text: Mojo.utils.locale('common', 'close'),
                click: function () {
                    self.close();
                },
            })).element());
        },
        _getDefaultOptions: function () {
            return $.extend(true, this._super(), {
                atackBtnText: Mojo.utils.locale('mission', 'action'),
                title: Mojo.utils.locale('mission', 'battle result preview'),
                type: '',
                callback: $.noop,
                from: ''
            });
        },
    });
})(window, jQuery);