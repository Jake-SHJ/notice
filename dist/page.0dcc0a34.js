// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})(
  {
    '../node_modules/axios/lib/helpers/bind.js': [
      function (require, module, exports) {
        'use strict';

        module.exports = function bind(fn, thisArg) {
          return function wrap() {
            var args = new Array(arguments.length);
            for (var i = 0; i < args.length; i++) {
              args[i] = arguments[i];
            }
            return fn.apply(thisArg, args);
          };
        };
      },
      {},
    ],
    '../node_modules/axios/lib/utils.js': [
      function (require, module, exports) {
        'use strict';

        var bind = require('./helpers/bind');

        /*global toString:true*/

        // utils is a library of generic helper functions non-specific to axios

        var toString = Object.prototype.toString;

        /**
         * Determine if a value is an Array
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an Array, otherwise false
         */
        function isArray(val) {
          return toString.call(val) === '[object Array]';
        }

        /**
         * Determine if a value is undefined
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if the value is undefined, otherwise false
         */
        function isUndefined(val) {
          return typeof val === 'undefined';
        }

        /**
         * Determine if a value is a Buffer
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Buffer, otherwise false
         */
        function isBuffer(val) {
          return (
            val !== null &&
            !isUndefined(val) &&
            val.constructor !== null &&
            !isUndefined(val.constructor) &&
            typeof val.constructor.isBuffer === 'function' &&
            val.constructor.isBuffer(val)
          );
        }

        /**
         * Determine if a value is an ArrayBuffer
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an ArrayBuffer, otherwise false
         */
        function isArrayBuffer(val) {
          return toString.call(val) === '[object ArrayBuffer]';
        }

        /**
         * Determine if a value is a FormData
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an FormData, otherwise false
         */
        function isFormData(val) {
          return typeof FormData !== 'undefined' && val instanceof FormData;
        }

        /**
         * Determine if a value is a view on an ArrayBuffer
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
         */
        function isArrayBufferView(val) {
          var result;
          if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
            result = ArrayBuffer.isView(val);
          } else {
            result = val && val.buffer && val.buffer instanceof ArrayBuffer;
          }
          return result;
        }

        /**
         * Determine if a value is a String
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a String, otherwise false
         */
        function isString(val) {
          return typeof val === 'string';
        }

        /**
         * Determine if a value is a Number
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Number, otherwise false
         */
        function isNumber(val) {
          return typeof val === 'number';
        }

        /**
         * Determine if a value is an Object
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an Object, otherwise false
         */
        function isObject(val) {
          return val !== null && typeof val === 'object';
        }

        /**
         * Determine if a value is a Date
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Date, otherwise false
         */
        function isDate(val) {
          return toString.call(val) === '[object Date]';
        }

        /**
         * Determine if a value is a File
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a File, otherwise false
         */
        function isFile(val) {
          return toString.call(val) === '[object File]';
        }

        /**
         * Determine if a value is a Blob
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Blob, otherwise false
         */
        function isBlob(val) {
          return toString.call(val) === '[object Blob]';
        }

        /**
         * Determine if a value is a Function
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Function, otherwise false
         */
        function isFunction(val) {
          return toString.call(val) === '[object Function]';
        }

        /**
         * Determine if a value is a Stream
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Stream, otherwise false
         */
        function isStream(val) {
          return isObject(val) && isFunction(val.pipe);
        }

        /**
         * Determine if a value is a URLSearchParams object
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a URLSearchParams object, otherwise false
         */
        function isURLSearchParams(val) {
          return (
            typeof URLSearchParams !== 'undefined' &&
            val instanceof URLSearchParams
          );
        }

        /**
         * Trim excess whitespace off the beginning and end of a string
         *
         * @param {String} str The String to trim
         * @returns {String} The String freed of excess whitespace
         */
        function trim(str) {
          return str.replace(/^\s*/, '').replace(/\s*$/, '');
        }

        /**
         * Determine if we're running in a standard browser environment
         *
         * This allows axios to run in a web worker, and react-native.
         * Both environments support XMLHttpRequest, but not fully standard globals.
         *
         * web workers:
         *  typeof window -> undefined
         *  typeof document -> undefined
         *
         * react-native:
         *  navigator.product -> 'ReactNative'
         * nativescript
         *  navigator.product -> 'NativeScript' or 'NS'
         */
        function isStandardBrowserEnv() {
          if (
            typeof navigator !== 'undefined' &&
            (navigator.product === 'ReactNative' ||
              navigator.product === 'NativeScript' ||
              navigator.product === 'NS')
          ) {
            return false;
          }
          return (
            typeof window !== 'undefined' && typeof document !== 'undefined'
          );
        }

        /**
         * Iterate over an Array or an Object invoking a function for each item.
         *
         * If `obj` is an Array callback will be called passing
         * the value, index, and complete array for each item.
         *
         * If 'obj' is an Object callback will be called passing
         * the value, key, and complete object for each property.
         *
         * @param {Object|Array} obj The object to iterate
         * @param {Function} fn The callback to invoke for each item
         */
        function forEach(obj, fn) {
          // Don't bother if no value provided
          if (obj === null || typeof obj === 'undefined') {
            return;
          }

          // Force an array if not already something iterable
          if (typeof obj !== 'object') {
            /*eslint no-param-reassign:0*/
            obj = [obj];
          }

          if (isArray(obj)) {
            // Iterate over array values
            for (var i = 0, l = obj.length; i < l; i++) {
              fn.call(null, obj[i], i, obj);
            }
          } else {
            // Iterate over object keys
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
              }
            }
          }
        }

        /**
         * Accepts varargs expecting each argument to be an object, then
         * immutably merges the properties of each object and returns result.
         *
         * When multiple objects contain the same key the later object in
         * the arguments list will take precedence.
         *
         * Example:
         *
         * ```js
         * var result = merge({foo: 123}, {foo: 456});
         * console.log(result.foo); // outputs 456
         * ```
         *
         * @param {Object} obj1 Object to merge
         * @returns {Object} Result of all merge properties
         */
        function merge(/* obj1, obj2, obj3, ... */) {
          var result = {};
          function assignValue(val, key) {
            if (typeof result[key] === 'object' && typeof val === 'object') {
              result[key] = merge(result[key], val);
            } else {
              result[key] = val;
            }
          }

          for (var i = 0, l = arguments.length; i < l; i++) {
            forEach(arguments[i], assignValue);
          }
          return result;
        }

        /**
         * Function equal to merge with the difference being that no reference
         * to original objects is kept.
         *
         * @see merge
         * @param {Object} obj1 Object to merge
         * @returns {Object} Result of all merge properties
         */
        function deepMerge(/* obj1, obj2, obj3, ... */) {
          var result = {};
          function assignValue(val, key) {
            if (typeof result[key] === 'object' && typeof val === 'object') {
              result[key] = deepMerge(result[key], val);
            } else if (typeof val === 'object') {
              result[key] = deepMerge({}, val);
            } else {
              result[key] = val;
            }
          }

          for (var i = 0, l = arguments.length; i < l; i++) {
            forEach(arguments[i], assignValue);
          }
          return result;
        }

        /**
         * Extends object a by mutably adding to it the properties of object b.
         *
         * @param {Object} a The object to be extended
         * @param {Object} b The object to copy properties from
         * @param {Object} thisArg The object to bind function to
         * @return {Object} The resulting value of object a
         */
        function extend(a, b, thisArg) {
          forEach(b, function assignValue(val, key) {
            if (thisArg && typeof val === 'function') {
              a[key] = bind(val, thisArg);
            } else {
              a[key] = val;
            }
          });
          return a;
        }

        module.exports = {
          isArray: isArray,
          isArrayBuffer: isArrayBuffer,
          isBuffer: isBuffer,
          isFormData: isFormData,
          isArrayBufferView: isArrayBufferView,
          isString: isString,
          isNumber: isNumber,
          isObject: isObject,
          isUndefined: isUndefined,
          isDate: isDate,
          isFile: isFile,
          isBlob: isBlob,
          isFunction: isFunction,
          isStream: isStream,
          isURLSearchParams: isURLSearchParams,
          isStandardBrowserEnv: isStandardBrowserEnv,
          forEach: forEach,
          merge: merge,
          deepMerge: deepMerge,
          extend: extend,
          trim: trim,
        };
      },
      { './helpers/bind': '../node_modules/axios/lib/helpers/bind.js' },
    ],
    '../node_modules/axios/lib/helpers/buildURL.js': [
      function (require, module, exports) {
        'use strict';

        var utils = require('./../utils');

        function encode(val) {
          return encodeURIComponent(val)
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+')
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']');
        }

        /**
         * Build a URL by appending params to the end
         *
         * @param {string} url The base of the url (e.g., http://www.google.com)
         * @param {object} [params] The params to be appended
         * @returns {string} The formatted url
         */
        module.exports = function buildURL(url, params, paramsSerializer) {
          /*eslint no-param-reassign:0*/
          if (!params) {
            return url;
          }

          var serializedParams;
          if (paramsSerializer) {
            serializedParams = paramsSerializer(params);
          } else if (utils.isURLSearchParams(params)) {
            serializedParams = params.toString();
          } else {
            var parts = [];

            utils.forEach(params, function serialize(val, key) {
              if (val === null || typeof val === 'undefined') {
                return;
              }

              if (utils.isArray(val)) {
                key = key + '[]';
              } else {
                val = [val];
              }

              utils.forEach(val, function parseValue(v) {
                if (utils.isDate(v)) {
                  v = v.toISOString();
                } else if (utils.isObject(v)) {
                  v = JSON.stringify(v);
                }
                parts.push(encode(key) + '=' + encode(v));
              });
            });

            serializedParams = parts.join('&');
          }

          if (serializedParams) {
            var hashmarkIndex = url.indexOf('#');
            if (hashmarkIndex !== -1) {
              url = url.slice(0, hashmarkIndex);
            }

            url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
          }

          return url;
        };
      },
      { './../utils': '../node_modules/axios/lib/utils.js' },
    ],
    '../node_modules/axios/lib/core/InterceptorManager.js': [
      function (require, module, exports) {
        'use strict';

        var utils = require('./../utils');

        function InterceptorManager() {
          this.handlers = [];
        }

        /**
         * Add a new interceptor to the stack
         *
         * @param {Function} fulfilled The function to handle `then` for a `Promise`
         * @param {Function} rejected The function to handle `reject` for a `Promise`
         *
         * @return {Number} An ID used to remove interceptor later
         */
        InterceptorManager.prototype.use = function use(fulfilled, rejected) {
          this.handlers.push({
            fulfilled: fulfilled,
            rejected: rejected,
          });
          return this.handlers.length - 1;
        };

        /**
         * Remove an interceptor from the stack
         *
         * @param {Number} id The ID that was returned by `use`
         */
        InterceptorManager.prototype.eject = function eject(id) {
          if (this.handlers[id]) {
            this.handlers[id] = null;
          }
        };

        /**
         * Iterate over all the registered interceptors
         *
         * This method is particularly useful for skipping over any
         * interceptors that may have become `null` calling `eject`.
         *
         * @param {Function} fn The function to call for each interceptor
         */
        InterceptorManager.prototype.forEach = function forEach(fn) {
          utils.forEach(this.handlers, function forEachHandler(h) {
            if (h !== null) {
              fn(h);
            }
          });
        };

        module.exports = InterceptorManager;
      },
      { './../utils': '../node_modules/axios/lib/utils.js' },
    ],
    '../node_modules/axios/lib/core/transformData.js': [
      function (require, module, exports) {
        'use strict';

        var utils = require('./../utils');

        /**
         * Transform the data for a request or a response
         *
         * @param {Object|String} data The data to be transformed
         * @param {Array} headers The headers for the request or response
         * @param {Array|Function} fns A single function or Array of functions
         * @returns {*} The resulting transformed data
         */
        module.exports = function transformData(data, headers, fns) {
          /*eslint no-param-reassign:0*/
          utils.forEach(fns, function transform(fn) {
            data = fn(data, headers);
          });

          return data;
        };
      },
      { './../utils': '../node_modules/axios/lib/utils.js' },
    ],
    '../node_modules/axios/lib/cancel/isCancel.js': [
      function (require, module, exports) {
        'use strict';

        module.exports = function isCancel(value) {
          return !!(value && value.__CANCEL__);
        };
      },
      {},
    ],
    '../node_modules/axios/lib/helpers/normalizeHeaderName.js': [
      function (require, module, exports) {
        'use strict';

        var utils = require('../utils');

        module.exports = function normalizeHeaderName(headers, normalizedName) {
          utils.forEach(headers, function processHeader(value, name) {
            if (
              name !== normalizedName &&
              name.toUpperCase() === normalizedName.toUpperCase()
            ) {
              headers[normalizedName] = value;
              delete headers[name];
            }
          });
        };
      },
      { '../utils': '../node_modules/axios/lib/utils.js' },
    ],
    '../node_modules/axios/lib/core/enhanceError.js': [
      function (require, module, exports) {
        'use strict';

        /**
         * Update an Error with the specified config, error code, and response.
         *
         * @param {Error} error The error to update.
         * @param {Object} config The config.
         * @param {string} [code] The error code (for example, 'ECONNABORTED').
         * @param {Object} [request] The request.
         * @param {Object} [response] The response.
         * @returns {Error} The error.
         */
        module.exports = function enhanceError(
          error,
          config,
          code,
          request,
          response
        ) {
          error.config = config;
          if (code) {
            error.code = code;
          }

          error.request = request;
          error.response = response;
          error.isAxiosError = true;

          error.toJSON = function () {
            return {
              // Standard
              message: this.message,
              name: this.name,
              // Microsoft
              description: this.description,
              number: this.number,
              // Mozilla
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              // Axios
              config: this.config,
              code: this.code,
            };
          };
          return error;
        };
      },
      {},
    ],
    '../node_modules/axios/lib/core/createError.js': [
      function (require, module, exports) {
        'use strict';

        var enhanceError = require('./enhanceError');

        /**
         * Create an Error with the specified message, config, error code, request and response.
         *
         * @param {string} message The error message.
         * @param {Object} config The config.
         * @param {string} [code] The error code (for example, 'ECONNABORTED').
         * @param {Object} [request] The request.
         * @param {Object} [response] The response.
         * @returns {Error} The created error.
         */
        module.exports = function createError(
          message,
          config,
          code,
          request,
          response
        ) {
          var error = new Error(message);
          return enhanceError(error, config, code, request, response);
        };
      },
      { './enhanceError': '../node_modules/axios/lib/core/enhanceError.js' },
    ],
    '../node_modules/axios/lib/core/settle.js': [
      function (require, module, exports) {
        'use strict';

        var createError = require('./createError');

        /**
         * Resolve or reject a Promise based on response status.
         *
         * @param {Function} resolve A function that resolves the promise.
         * @param {Function} reject A function that rejects the promise.
         * @param {object} response The response.
         */
        module.exports = function settle(resolve, reject, response) {
          var validateStatus = response.config.validateStatus;
          if (!validateStatus || validateStatus(response.status)) {
            resolve(response);
          } else {
            reject(
              createError(
                'Request failed with status code ' + response.status,
                response.config,
                null,
                response.request,
                response
              )
            );
          }
        };
      },
      { './createError': '../node_modules/axios/lib/core/createError.js' },
    ],
    '../node_modules/axios/lib/helpers/isAbsoluteURL.js': [
      function (require, module, exports) {
        'use strict';

        /**
         * Determines whether the specified URL is absolute
         *
         * @param {string} url The URL to test
         * @returns {boolean} True if the specified URL is absolute, otherwise false
         */
        module.exports = function isAbsoluteURL(url) {
          // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
          // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
          // by any combination of letters, digits, plus, period, or hyphen.
          return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
        };
      },
      {},
    ],
    '../node_modules/axios/lib/helpers/combineURLs.js': [
      function (require, module, exports) {
        'use strict';

        /**
         * Creates a new URL by combining the specified URLs
         *
         * @param {string} baseURL The base URL
         * @param {string} relativeURL The relative URL
         * @returns {string} The combined URL
         */
        module.exports = function combineURLs(baseURL, relativeURL) {
          return relativeURL
            ? baseURL.replace(/\/+$/, '') +
                '/' +
                relativeURL.replace(/^\/+/, '')
            : baseURL;
        };
      },
      {},
    ],
    '../node_modules/axios/lib/core/buildFullPath.js': [
      function (require, module, exports) {
        'use strict';

        var isAbsoluteURL = require('../helpers/isAbsoluteURL');
        var combineURLs = require('../helpers/combineURLs');

        /**
         * Creates a new URL by combining the baseURL with the requestedURL,
         * only when the requestedURL is not already an absolute URL.
         * If the requestURL is absolute, this function returns the requestedURL untouched.
         *
         * @param {string} baseURL The base URL
         * @param {string} requestedURL Absolute or relative URL to combine
         * @returns {string} The combined full path
         */
        module.exports = function buildFullPath(baseURL, requestedURL) {
          if (baseURL && !isAbsoluteURL(requestedURL)) {
            return combineURLs(baseURL, requestedURL);
          }
          return requestedURL;
        };
      },
      {
        '../helpers/isAbsoluteURL':
          '../node_modules/axios/lib/helpers/isAbsoluteURL.js',
        '../helpers/combineURLs':
          '../node_modules/axios/lib/helpers/combineURLs.js',
      },
    ],
    '../node_modules/axios/lib/helpers/parseHeaders.js': [
      function (require, module, exports) {
        'use strict';

        var utils = require('./../utils');

        // Headers whose duplicates are ignored by node
        // c.f. https://nodejs.org/api/http.html#http_message_headers
        var ignoreDuplicateOf = [
          'age',
          'authorization',
          'content-length',
          'content-type',
          'etag',
          'expires',
          'from',
          'host',
          'if-modified-since',
          'if-unmodified-since',
          'last-modified',
          'location',
          'max-forwards',
          'proxy-authorization',
          'referer',
          'retry-after',
          'user-agent',
        ];

        /**
         * Parse headers into an object
         *
         * ```
         * Date: Wed, 27 Aug 2014 08:58:49 GMT
         * Content-Type: application/json
         * Connection: keep-alive
         * Transfer-Encoding: chunked
         * ```
         *
         * @param {String} headers Headers needing to be parsed
         * @returns {Object} Headers parsed into an object
         */
        module.exports = function parseHeaders(headers) {
          var parsed = {};
          var key;
          var val;
          var i;

          if (!headers) {
            return parsed;
          }

          utils.forEach(headers.split('\n'), function parser(line) {
            i = line.indexOf(':');
            key = utils.trim(line.substr(0, i)).toLowerCase();
            val = utils.trim(line.substr(i + 1));

            if (key) {
              if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                return;
              }
              if (key === 'set-cookie') {
                parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
              } else {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
              }
            }
          });

          return parsed;
        };
      },
      { './../utils': '../node_modules/axios/lib/utils.js' },
    ],
    '../node_modules/axios/lib/helpers/isURLSameOrigin.js': [
      function (require, module, exports) {
        'use strict';

        var utils = require('./../utils');

        module.exports = utils.isStandardBrowserEnv()
          ? // Standard browser envs have full support of the APIs needed to test
            // whether the request URL is of the same origin as current location.
            (function standardBrowserEnv() {
              var msie = /(msie|trident)/i.test(navigator.userAgent);
              var urlParsingNode = document.createElement('a');
              var originURL;

              /**
               * Parse a URL to discover it's components
               *
               * @param {String} url The URL to be parsed
               * @returns {Object}
               */
              function resolveURL(url) {
                var href = url;

                if (msie) {
                  // IE needs attribute set twice to normalize properties
                  urlParsingNode.setAttribute('href', href);
                  href = urlParsingNode.href;
                }

                urlParsingNode.setAttribute('href', href);

                // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
                return {
                  href: urlParsingNode.href,
                  protocol: urlParsingNode.protocol
                    ? urlParsingNode.protocol.replace(/:$/, '')
                    : '',
                  host: urlParsingNode.host,
                  search: urlParsingNode.search
                    ? urlParsingNode.search.replace(/^\?/, '')
                    : '',
                  hash: urlParsingNode.hash
                    ? urlParsingNode.hash.replace(/^#/, '')
                    : '',
                  hostname: urlParsingNode.hostname,
                  port: urlParsingNode.port,
                  pathname:
                    urlParsingNode.pathname.charAt(0) === '/'
                      ? urlParsingNode.pathname
                      : '/' + urlParsingNode.pathname,
                };
              }

              originURL = resolveURL(window.location.href);

              /**
               * Determine if a URL shares the same origin as the current location
               *
               * @param {String} requestURL The URL to test
               * @returns {boolean} True if URL shares the same origin, otherwise false
               */
              return function isURLSameOrigin(requestURL) {
                var parsed = utils.isString(requestURL)
                  ? resolveURL(requestURL)
                  : requestURL;
                return (
                  parsed.protocol === originURL.protocol &&
                  parsed.host === originURL.host
                );
              };
            })()
          : // Non standard browser envs (web workers, react-native) lack needed support.
            (function nonStandardBrowserEnv() {
              return function isURLSameOrigin() {
                return true;
              };
            })();
      },
      { './../utils': '../node_modules/axios/lib/utils.js' },
    ],
    '../node_modules/axios/lib/helpers/cookies.js': [
      function (require, module, exports) {
        'use strict';

        var utils = require('./../utils');

        module.exports = utils.isStandardBrowserEnv()
          ? // Standard browser envs support document.cookie
            (function standardBrowserEnv() {
              return {
                write: function write(
                  name,
                  value,
                  expires,
                  path,
                  domain,
                  secure
                ) {
                  var cookie = [];
                  cookie.push(name + '=' + encodeURIComponent(value));

                  if (utils.isNumber(expires)) {
                    cookie.push('expires=' + new Date(expires).toGMTString());
                  }

                  if (utils.isString(path)) {
                    cookie.push('path=' + path);
                  }

                  if (utils.isString(domain)) {
                    cookie.push('domain=' + domain);
                  }

                  if (secure === true) {
                    cookie.push('secure');
                  }

                  document.cookie = cookie.join('; ');
                },

                read: function read(name) {
                  var match = document.cookie.match(
                    new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
                  );
                  return match ? decodeURIComponent(match[3]) : null;
                },

                remove: function remove(name) {
                  this.write(name, '', Date.now() - 86400000);
                },
              };
            })()
          : // Non standard browser env (web workers, react-native) lack needed support.
            (function nonStandardBrowserEnv() {
              return {
                write: function write() {},
                read: function read() {
                  return null;
                },
                remove: function remove() {},
              };
            })();
      },
      { './../utils': '../node_modules/axios/lib/utils.js' },
    ],
    '../node_modules/axios/lib/adapters/xhr.js': [
      function (require, module, exports) {
        'use strict';

        var utils = require('./../utils');
        var settle = require('./../core/settle');
        var buildURL = require('./../helpers/buildURL');
        var buildFullPath = require('../core/buildFullPath');
        var parseHeaders = require('./../helpers/parseHeaders');
        var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
        var createError = require('../core/createError');

        module.exports = function xhrAdapter(config) {
          return new Promise(function dispatchXhrRequest(resolve, reject) {
            var requestData = config.data;
            var requestHeaders = config.headers;

            if (utils.isFormData(requestData)) {
              delete requestHeaders['Content-Type']; // Let the browser set it
            }

            var request = new XMLHttpRequest();

            // HTTP basic authentication
            if (config.auth) {
              var username = config.auth.username || '';
              var password = config.auth.password || '';
              requestHeaders.Authorization =
                'Basic ' + btoa(username + ':' + password);
            }

            var fullPath = buildFullPath(config.baseURL, config.url);
            request.open(
              config.method.toUpperCase(),
              buildURL(fullPath, config.params, config.paramsSerializer),
              true
            );

            // Set the request timeout in MS
            request.timeout = config.timeout;

            // Listen for ready state
            request.onreadystatechange = function handleLoad() {
              if (!request || request.readyState !== 4) {
                return;
              }

              // The request errored out and we didn't get a response, this will be
              // handled by onerror instead
              // With one exception: request that using file: protocol, most browsers
              // will return status as 0 even though it's a successful request
              if (
                request.status === 0 &&
                !(
                  request.responseURL &&
                  request.responseURL.indexOf('file:') === 0
                )
              ) {
                return;
              }

              // Prepare the response
              var responseHeaders =
                'getAllResponseHeaders' in request
                  ? parseHeaders(request.getAllResponseHeaders())
                  : null;
              var responseData =
                !config.responseType || config.responseType === 'text'
                  ? request.responseText
                  : request.response;
              var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request,
              };

              settle(resolve, reject, response);

              // Clean up request
              request = null;
            };

            // Handle browser request cancellation (as opposed to a manual cancellation)
            request.onabort = function handleAbort() {
              if (!request) {
                return;
              }

              reject(
                createError('Request aborted', config, 'ECONNABORTED', request)
              );

              // Clean up request
              request = null;
            };

            // Handle low level network errors
            request.onerror = function handleError() {
              // Real errors are hidden from us by the browser
              // onerror should only fire if it's a network error
              reject(createError('Network Error', config, null, request));

              // Clean up request
              request = null;
            };

            // Handle timeout
            request.ontimeout = function handleTimeout() {
              var timeoutErrorMessage =
                'timeout of ' + config.timeout + 'ms exceeded';
              if (config.timeoutErrorMessage) {
                timeoutErrorMessage = config.timeoutErrorMessage;
              }
              reject(
                createError(
                  timeoutErrorMessage,
                  config,
                  'ECONNABORTED',
                  request
                )
              );

              // Clean up request
              request = null;
            };

            // Add xsrf header
            // This is only done if running in a standard browser environment.
            // Specifically not if we're in a web worker, or react-native.
            if (utils.isStandardBrowserEnv()) {
              var cookies = require('./../helpers/cookies');

              // Add xsrf header
              var xsrfValue =
                (config.withCredentials || isURLSameOrigin(fullPath)) &&
                config.xsrfCookieName
                  ? cookies.read(config.xsrfCookieName)
                  : undefined;

              if (xsrfValue) {
                requestHeaders[config.xsrfHeaderName] = xsrfValue;
              }
            }

            // Add headers to the request
            if ('setRequestHeader' in request) {
              utils.forEach(requestHeaders, function setRequestHeader(
                val,
                key
              ) {
                if (
                  typeof requestData === 'undefined' &&
                  key.toLowerCase() === 'content-type'
                ) {
                  // Remove Content-Type if data is undefined
                  delete requestHeaders[key];
                } else {
                  // Otherwise add header to the request
                  request.setRequestHeader(key, val);
                }
              });
            }

            // Add withCredentials to request if needed
            if (!utils.isUndefined(config.withCredentials)) {
              request.withCredentials = !!config.withCredentials;
            }

            // Add responseType to request if needed
            if (config.responseType) {
              try {
                request.responseType = config.responseType;
              } catch (e) {
                // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
                // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
                if (config.responseType !== 'json') {
                  throw e;
                }
              }
            }

            // Handle progress if needed
            if (typeof config.onDownloadProgress === 'function') {
              request.addEventListener('progress', config.onDownloadProgress);
            }

            // Not all browsers support upload events
            if (
              typeof config.onUploadProgress === 'function' &&
              request.upload
            ) {
              request.upload.addEventListener(
                'progress',
                config.onUploadProgress
              );
            }

            if (config.cancelToken) {
              // Handle cancellation
              config.cancelToken.promise.then(function onCanceled(cancel) {
                if (!request) {
                  return;
                }

                request.abort();
                reject(cancel);
                // Clean up request
                request = null;
              });
            }

            if (requestData === undefined) {
              requestData = null;
            }

            // Send the request
            request.send(requestData);
          });
        };
      },
      {
        './../utils': '../node_modules/axios/lib/utils.js',
        './../core/settle': '../node_modules/axios/lib/core/settle.js',
        './../helpers/buildURL':
          '../node_modules/axios/lib/helpers/buildURL.js',
        '../core/buildFullPath':
          '../node_modules/axios/lib/core/buildFullPath.js',
        './../helpers/parseHeaders':
          '../node_modules/axios/lib/helpers/parseHeaders.js',
        './../helpers/isURLSameOrigin':
          '../node_modules/axios/lib/helpers/isURLSameOrigin.js',
        '../core/createError': '../node_modules/axios/lib/core/createError.js',
        './../helpers/cookies': '../node_modules/axios/lib/helpers/cookies.js',
      },
    ],
    '../node_modules/process/browser.js': [
      function (require, module, exports) {
        // shim for using process in browser
        var process = (module.exports = {}); // cached from whatever global is present so that test runners that stub it
        // don't break things.  But we need to wrap it in a try catch in case it is
        // wrapped in strict mode code which doesn't define any globals.  It's inside a
        // function because try/catches deoptimize in certain engines.

        var cachedSetTimeout;
        var cachedClearTimeout;

        function defaultSetTimout() {
          throw new Error('setTimeout has not been defined');
        }

        function defaultClearTimeout() {
          throw new Error('clearTimeout has not been defined');
        }

        (function () {
          try {
            if (typeof setTimeout === 'function') {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }

          try {
            if (typeof clearTimeout === 'function') {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();

        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
          } // if setTimeout wasn't available but was latter defined

          if (
            (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
            setTimeout
          ) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }

          try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }

        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
          } // if clearTimeout wasn't available but was latter defined

          if (
            (cachedClearTimeout === defaultClearTimeout ||
              !cachedClearTimeout) &&
            clearTimeout
          ) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }

          try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
            } catch (e) {
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
            }
          }
        }

        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;

        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }

          draining = false;

          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }

          if (queue.length) {
            drainQueue();
          }
        }

        function drainQueue() {
          if (draining) {
            return;
          }

          var timeout = runTimeout(cleanUpNextTick);
          draining = true;
          var len = queue.length;

          while (len) {
            currentQueue = queue;
            queue = [];

            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }

            queueIndex = -1;
            len = queue.length;
          }

          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }

        process.nextTick = function (fun) {
          var args = new Array(arguments.length - 1);

          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }

          queue.push(new Item(fun, args));

          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        }; // v8 likes predictible objects

        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }

        Item.prototype.run = function () {
          this.fun.apply(null, this.array);
        };

        process.title = 'browser';
        process.env = {};
        process.argv = [];
        process.version = ''; // empty string to avoid regexp issues

        process.versions = {};

        function noop() {}

        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;

        process.listeners = function (name) {
          return [];
        };

        process.binding = function (name) {
          throw new Error('process.binding is not supported');
        };

        process.cwd = function () {
          return '/';
        };

        process.chdir = function (dir) {
          throw new Error('process.chdir is not supported');
        };

        process.umask = function () {
          return 0;
        };
      },
      {},
    ],
    '../node_modules/axios/lib/defaults.js': [
      function (require, module, exports) {
        var process = require('process');
        ('use strict');

        var utils = require('./utils');
        var normalizeHeaderName = require('./helpers/normalizeHeaderName');

        var DEFAULT_CONTENT_TYPE = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };

        function setContentTypeIfUnset(headers, value) {
          if (
            !utils.isUndefined(headers) &&
            utils.isUndefined(headers['Content-Type'])
          ) {
            headers['Content-Type'] = value;
          }
        }

        function getDefaultAdapter() {
          var adapter;
          if (typeof XMLHttpRequest !== 'undefined') {
            // For browsers use XHR adapter
            adapter = require('./adapters/xhr');
          } else if (
            typeof process !== 'undefined' &&
            Object.prototype.toString.call(process) === '[object process]'
          ) {
            // For node use HTTP adapter
            adapter = require('./adapters/http');
          }
          return adapter;
        }

        var defaults = {
          adapter: getDefaultAdapter(),

          transformRequest: [
            function transformRequest(data, headers) {
              normalizeHeaderName(headers, 'Accept');
              normalizeHeaderName(headers, 'Content-Type');
              if (
                utils.isFormData(data) ||
                utils.isArrayBuffer(data) ||
                utils.isBuffer(data) ||
                utils.isStream(data) ||
                utils.isFile(data) ||
                utils.isBlob(data)
              ) {
                return data;
              }
              if (utils.isArrayBufferView(data)) {
                return data.buffer;
              }
              if (utils.isURLSearchParams(data)) {
                setContentTypeIfUnset(
                  headers,
                  'application/x-www-form-urlencoded;charset=utf-8'
                );
                return data.toString();
              }
              if (utils.isObject(data)) {
                setContentTypeIfUnset(
                  headers,
                  'application/json;charset=utf-8'
                );
                return JSON.stringify(data);
              }
              return data;
            },
          ],

          transformResponse: [
            function transformResponse(data) {
              /*eslint no-param-reassign:0*/
              if (typeof data === 'string') {
                try {
                  data = JSON.parse(data);
                } catch (e) {
                  /* Ignore */
                }
              }
              return data;
            },
          ],

          /**
           * A timeout in milliseconds to abort a request. If set to 0 (default) a
           * timeout is not created.
           */
          timeout: 0,

          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',

          maxContentLength: -1,

          validateStatus: function validateStatus(status) {
            return status >= 200 && status < 300;
          },
        };

        defaults.headers = {
          common: {
            Accept: 'application/json, text/plain, */*',
          },
        };

        utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(
          method
        ) {
          defaults.headers[method] = {};
        });

        utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(
          method
        ) {
          defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
        });

        module.exports = defaults;
      },
      {
        './utils': '../node_modules/axios/lib/utils.js',
        './helpers/normalizeHeaderName':
          '../node_modules/axios/lib/helpers/normalizeHeaderName.js',
        './adapters/xhr': '../node_modules/axios/lib/adapters/xhr.js',
        './adapters/http': '../node_modules/axios/lib/adapters/xhr.js',
        process: '../node_modules/process/browser.js',
      },
    ],
    '../node_modules/axios/lib/core/dispatchRequest.js': [
      function (require, module, exports) {
        'use strict';

        var utils = require('./../utils');
        var transformData = require('./transformData');
        var isCancel = require('../cancel/isCancel');
        var defaults = require('../defaults');

        /**
         * Throws a `Cancel` if cancellation has been requested.
         */
        function throwIfCancellationRequested(config) {
          if (config.cancelToken) {
            config.cancelToken.throwIfRequested();
          }
        }

        /**
         * Dispatch a request to the server using the configured adapter.
         *
         * @param {object} config The config that is to be used for the request
         * @returns {Promise} The Promise to be fulfilled
         */
        module.exports = function dispatchRequest(config) {
          throwIfCancellationRequested(config);

          // Ensure headers exist
          config.headers = config.headers || {};

          // Transform request data
          config.data = transformData(
            config.data,
            config.headers,
            config.transformRequest
          );

          // Flatten headers
          config.headers = utils.merge(
            config.headers.common || {},
            config.headers[config.method] || {},
            config.headers
          );

          utils.forEach(
            ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
            function cleanHeaderConfig(method) {
              delete config.headers[method];
            }
          );

          var adapter = config.adapter || defaults.adapter;

          return adapter(config).then(
            function onAdapterResolution(response) {
              throwIfCancellationRequested(config);

              // Transform response data
              response.data = transformData(
                response.data,
                response.headers,
                config.transformResponse
              );

              return response;
            },
            function onAdapterRejection(reason) {
              if (!isCancel(reason)) {
                throwIfCancellationRequested(config);

                // Transform response data
                if (reason && reason.response) {
                  reason.response.data = transformData(
                    reason.response.data,
                    reason.response.headers,
                    config.transformResponse
                  );
                }
              }

              return Promise.reject(reason);
            }
          );
        };
      },
      {
        './../utils': '../node_modules/axios/lib/utils.js',
        './transformData': '../node_modules/axios/lib/core/transformData.js',
        '../cancel/isCancel': '../node_modules/axios/lib/cancel/isCancel.js',
        '../defaults': '../node_modules/axios/lib/defaults.js',
      },
    ],
    '../node_modules/axios/lib/core/mergeConfig.js': [
      function (require, module, exports) {
        'use strict';

        var utils = require('../utils');

        /**
         * Config-specific merge-function which creates a new config-object
         * by merging two configuration objects together.
         *
         * @param {Object} config1
         * @param {Object} config2
         * @returns {Object} New object resulting from merging config2 to config1
         */
        module.exports = function mergeConfig(config1, config2) {
          // eslint-disable-next-line no-param-reassign
          config2 = config2 || {};
          var config = {};

          var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
          var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
          var defaultToConfig2Keys = [
            'baseURL',
            'url',
            'transformRequest',
            'transformResponse',
            'paramsSerializer',
            'timeout',
            'withCredentials',
            'adapter',
            'responseType',
            'xsrfCookieName',
            'xsrfHeaderName',
            'onUploadProgress',
            'onDownloadProgress',
            'maxContentLength',
            'validateStatus',
            'maxRedirects',
            'httpAgent',
            'httpsAgent',
            'cancelToken',
            'socketPath',
          ];

          utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
            if (typeof config2[prop] !== 'undefined') {
              config[prop] = config2[prop];
            }
          });

          utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(
            prop
          ) {
            if (utils.isObject(config2[prop])) {
              config[prop] = utils.deepMerge(config1[prop], config2[prop]);
            } else if (typeof config2[prop] !== 'undefined') {
              config[prop] = config2[prop];
            } else if (utils.isObject(config1[prop])) {
              config[prop] = utils.deepMerge(config1[prop]);
            } else if (typeof config1[prop] !== 'undefined') {
              config[prop] = config1[prop];
            }
          });

          utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
            if (typeof config2[prop] !== 'undefined') {
              config[prop] = config2[prop];
            } else if (typeof config1[prop] !== 'undefined') {
              config[prop] = config1[prop];
            }
          });

          var axiosKeys = valueFromConfig2Keys
            .concat(mergeDeepPropertiesKeys)
            .concat(defaultToConfig2Keys);

          var otherKeys = Object.keys(config2).filter(function filterAxiosKeys(
            key
          ) {
            return axiosKeys.indexOf(key) === -1;
          });

          utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
            if (typeof config2[prop] !== 'undefined') {
              config[prop] = config2[prop];
            } else if (typeof config1[prop] !== 'undefined') {
              config[prop] = config1[prop];
            }
          });

          return config;
        };
      },
      { '../utils': '../node_modules/axios/lib/utils.js' },
    ],
    '../node_modules/axios/lib/core/Axios.js': [
      function (require, module, exports) {
        'use strict';

        var utils = require('./../utils');
        var buildURL = require('../helpers/buildURL');
        var InterceptorManager = require('./InterceptorManager');
        var dispatchRequest = require('./dispatchRequest');
        var mergeConfig = require('./mergeConfig');

        /**
         * Create a new instance of Axios
         *
         * @param {Object} instanceConfig The default config for the instance
         */
        function Axios(instanceConfig) {
          this.defaults = instanceConfig;
          this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager(),
          };
        }

        /**
         * Dispatch a request
         *
         * @param {Object} config The config specific for this request (merged with this.defaults)
         */
        Axios.prototype.request = function request(config) {
          /*eslint no-param-reassign:0*/
          // Allow for axios('example/url'[, config]) a la fetch API
          if (typeof config === 'string') {
            config = arguments[1] || {};
            config.url = arguments[0];
          } else {
            config = config || {};
          }

          config = mergeConfig(this.defaults, config);

          // Set config.method
          if (config.method) {
            config.method = config.method.toLowerCase();
          } else if (this.defaults.method) {
            config.method = this.defaults.method.toLowerCase();
          } else {
            config.method = 'get';
          }

          // Hook up interceptors middleware
          var chain = [dispatchRequest, undefined];
          var promise = Promise.resolve(config);

          this.interceptors.request.forEach(function unshiftRequestInterceptors(
            interceptor
          ) {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
          });

          this.interceptors.response.forEach(function pushResponseInterceptors(
            interceptor
          ) {
            chain.push(interceptor.fulfilled, interceptor.rejected);
          });

          while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
          }

          return promise;
        };

        Axios.prototype.getUri = function getUri(config) {
          config = mergeConfig(this.defaults, config);
          return buildURL(
            config.url,
            config.params,
            config.paramsSerializer
          ).replace(/^\?/, '');
        };

        // Provide aliases for supported request methods
        utils.forEach(
          ['delete', 'get', 'head', 'options'],
          function forEachMethodNoData(method) {
            /*eslint func-names:0*/
            Axios.prototype[method] = function (url, config) {
              return this.request(
                utils.merge(config || {}, {
                  method: method,
                  url: url,
                })
              );
            };
          }
        );

        utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(
          method
        ) {
          /*eslint func-names:0*/
          Axios.prototype[method] = function (url, data, config) {
            return this.request(
              utils.merge(config || {}, {
                method: method,
                url: url,
                data: data,
              })
            );
          };
        });

        module.exports = Axios;
      },
      {
        './../utils': '../node_modules/axios/lib/utils.js',
        '../helpers/buildURL': '../node_modules/axios/lib/helpers/buildURL.js',
        './InterceptorManager':
          '../node_modules/axios/lib/core/InterceptorManager.js',
        './dispatchRequest':
          '../node_modules/axios/lib/core/dispatchRequest.js',
        './mergeConfig': '../node_modules/axios/lib/core/mergeConfig.js',
      },
    ],
    '../node_modules/axios/lib/cancel/Cancel.js': [
      function (require, module, exports) {
        'use strict';

        /**
         * A `Cancel` is an object that is thrown when an operation is canceled.
         *
         * @class
         * @param {string=} message The message.
         */
        function Cancel(message) {
          this.message = message;
        }

        Cancel.prototype.toString = function toString() {
          return 'Cancel' + (this.message ? ': ' + this.message : '');
        };

        Cancel.prototype.__CANCEL__ = true;

        module.exports = Cancel;
      },
      {},
    ],
    '../node_modules/axios/lib/cancel/CancelToken.js': [
      function (require, module, exports) {
        'use strict';

        var Cancel = require('./Cancel');

        /**
         * A `CancelToken` is an object that can be used to request cancellation of an operation.
         *
         * @class
         * @param {Function} executor The executor function.
         */
        function CancelToken(executor) {
          if (typeof executor !== 'function') {
            throw new TypeError('executor must be a function.');
          }

          var resolvePromise;
          this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve;
          });

          var token = this;
          executor(function cancel(message) {
            if (token.reason) {
              // Cancellation has already been requested
              return;
            }

            token.reason = new Cancel(message);
            resolvePromise(token.reason);
          });
        }

        /**
         * Throws a `Cancel` if cancellation has been requested.
         */
        CancelToken.prototype.throwIfRequested = function throwIfRequested() {
          if (this.reason) {
            throw this.reason;
          }
        };

        /**
         * Returns an object that contains a new `CancelToken` and a function that, when called,
         * cancels the `CancelToken`.
         */
        CancelToken.source = function source() {
          var cancel;
          var token = new CancelToken(function executor(c) {
            cancel = c;
          });
          return {
            token: token,
            cancel: cancel,
          };
        };

        module.exports = CancelToken;
      },
      { './Cancel': '../node_modules/axios/lib/cancel/Cancel.js' },
    ],
    '../node_modules/axios/lib/helpers/spread.js': [
      function (require, module, exports) {
        'use strict';

        /**
         * Syntactic sugar for invoking a function and expanding an array for arguments.
         *
         * Common use case would be to use `Function.prototype.apply`.
         *
         *  ```js
         *  function f(x, y, z) {}
         *  var args = [1, 2, 3];
         *  f.apply(null, args);
         *  ```
         *
         * With `spread` this example can be re-written.
         *
         *  ```js
         *  spread(function(x, y, z) {})([1, 2, 3]);
         *  ```
         *
         * @param {Function} callback
         * @returns {Function}
         */
        module.exports = function spread(callback) {
          return function wrap(arr) {
            return callback.apply(null, arr);
          };
        };
      },
      {},
    ],
    '../node_modules/axios/lib/axios.js': [
      function (require, module, exports) {
        'use strict';

        var utils = require('./utils');
        var bind = require('./helpers/bind');
        var Axios = require('./core/Axios');
        var mergeConfig = require('./core/mergeConfig');
        var defaults = require('./defaults');

        /**
         * Create an instance of Axios
         *
         * @param {Object} defaultConfig The default config for the instance
         * @return {Axios} A new instance of Axios
         */
        function createInstance(defaultConfig) {
          var context = new Axios(defaultConfig);
          var instance = bind(Axios.prototype.request, context);

          // Copy axios.prototype to instance
          utils.extend(instance, Axios.prototype, context);

          // Copy context to instance
          utils.extend(instance, context);

          return instance;
        }

        // Create the default instance to be exported
        var axios = createInstance(defaults);

        // Expose Axios class to allow class inheritance
        axios.Axios = Axios;

        // Factory for creating new instances
        axios.create = function create(instanceConfig) {
          return createInstance(mergeConfig(axios.defaults, instanceConfig));
        };

        // Expose Cancel & CancelToken
        axios.Cancel = require('./cancel/Cancel');
        axios.CancelToken = require('./cancel/CancelToken');
        axios.isCancel = require('./cancel/isCancel');

        // Expose all/spread
        axios.all = function all(promises) {
          return Promise.all(promises);
        };
        axios.spread = require('./helpers/spread');

        module.exports = axios;

        // Allow use of default import syntax in TypeScript
        module.exports.default = axios;
      },
      {
        './utils': '../node_modules/axios/lib/utils.js',
        './helpers/bind': '../node_modules/axios/lib/helpers/bind.js',
        './core/Axios': '../node_modules/axios/lib/core/Axios.js',
        './core/mergeConfig': '../node_modules/axios/lib/core/mergeConfig.js',
        './defaults': '../node_modules/axios/lib/defaults.js',
        './cancel/Cancel': '../node_modules/axios/lib/cancel/Cancel.js',
        './cancel/CancelToken':
          '../node_modules/axios/lib/cancel/CancelToken.js',
        './cancel/isCancel': '../node_modules/axios/lib/cancel/isCancel.js',
        './helpers/spread': '../node_modules/axios/lib/helpers/spread.js',
      },
    ],
    '../node_modules/axios/index.js': [
      function (require, module, exports) {
        module.exports = require('./lib/axios');
      },
      { './lib/axios': '../node_modules/axios/lib/axios.js' },
    ],
    '../node_modules/querystring-es3/decode.js': [
      function (require, module, exports) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        'use strict'; // If obj.hasOwnProperty has been overridden, then calling
        // obj.hasOwnProperty(prop) will break.
        // See: https://github.com/joyent/node/issues/1707

        function hasOwnProperty(obj, prop) {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        }

        module.exports = function (qs, sep, eq, options) {
          sep = sep || '&';
          eq = eq || '=';
          var obj = {};

          if (typeof qs !== 'string' || qs.length === 0) {
            return obj;
          }

          var regexp = /\+/g;
          qs = qs.split(sep);
          var maxKeys = 1000;

          if (options && typeof options.maxKeys === 'number') {
            maxKeys = options.maxKeys;
          }

          var len = qs.length; // maxKeys <= 0 means that we should not limit keys count

          if (maxKeys > 0 && len > maxKeys) {
            len = maxKeys;
          }

          for (var i = 0; i < len; ++i) {
            var x = qs[i].replace(regexp, '%20'),
              idx = x.indexOf(eq),
              kstr,
              vstr,
              k,
              v;

            if (idx >= 0) {
              kstr = x.substr(0, idx);
              vstr = x.substr(idx + 1);
            } else {
              kstr = x;
              vstr = '';
            }

            k = decodeURIComponent(kstr);
            v = decodeURIComponent(vstr);

            if (!hasOwnProperty(obj, k)) {
              obj[k] = v;
            } else if (isArray(obj[k])) {
              obj[k].push(v);
            } else {
              obj[k] = [obj[k], v];
            }
          }

          return obj;
        };

        var isArray =
          Array.isArray ||
          function (xs) {
            return Object.prototype.toString.call(xs) === '[object Array]';
          };
      },
      {},
    ],
    '../node_modules/querystring-es3/encode.js': [
      function (require, module, exports) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        'use strict';

        var stringifyPrimitive = function (v) {
          switch (typeof v) {
            case 'string':
              return v;

            case 'boolean':
              return v ? 'true' : 'false';

            case 'number':
              return isFinite(v) ? v : '';

            default:
              return '';
          }
        };

        module.exports = function (obj, sep, eq, name) {
          sep = sep || '&';
          eq = eq || '=';

          if (obj === null) {
            obj = undefined;
          }

          if (typeof obj === 'object') {
            return map(objectKeys(obj), function (k) {
              var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

              if (isArray(obj[k])) {
                return map(obj[k], function (v) {
                  return ks + encodeURIComponent(stringifyPrimitive(v));
                }).join(sep);
              } else {
                return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
              }
            }).join(sep);
          }

          if (!name) return '';
          return (
            encodeURIComponent(stringifyPrimitive(name)) +
            eq +
            encodeURIComponent(stringifyPrimitive(obj))
          );
        };

        var isArray =
          Array.isArray ||
          function (xs) {
            return Object.prototype.toString.call(xs) === '[object Array]';
          };

        function map(xs, f) {
          if (xs.map) return xs.map(f);
          var res = [];

          for (var i = 0; i < xs.length; i++) {
            res.push(f(xs[i], i));
          }

          return res;
        }

        var objectKeys =
          Object.keys ||
          function (obj) {
            var res = [];

            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
            }

            return res;
          };
      },
      {},
    ],
    '../node_modules/querystring-es3/index.js': [
      function (require, module, exports) {
        'use strict';

        exports.decode = exports.parse = require('./decode');
        exports.encode = exports.stringify = require('./encode');
      },
      {
        './decode': '../node_modules/querystring-es3/decode.js',
        './encode': '../node_modules/querystring-es3/encode.js',
      },
    ],
    '../node_modules/node-libs-browser/node_modules/punycode/punycode.js': [
      function (require, module, exports) {
        var global = arguments[3];
        var define;
        /*! https://mths.be/punycode v1.4.1 by @mathias */
        (function (root) {
          /** Detect free variables */
          var freeExports =
            typeof exports == 'object' &&
            exports &&
            !exports.nodeType &&
            exports;
          var freeModule =
            typeof module == 'object' && module && !module.nodeType && module;
          var freeGlobal = typeof global == 'object' && global;
          if (
            freeGlobal.global === freeGlobal ||
            freeGlobal.window === freeGlobal ||
            freeGlobal.self === freeGlobal
          ) {
            root = freeGlobal;
          }

          /**
           * The `punycode` object.
           * @name punycode
           * @type Object
           */
          var punycode,
            /** Highest positive signed 32-bit float value */
            maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
            /** Bootstring parameters */
            base = 36,
            tMin = 1,
            tMax = 26,
            skew = 38,
            damp = 700,
            initialBias = 72,
            initialN = 128, // 0x80
            delimiter = '-', // '\x2D'
            /** Regular expressions */
            regexPunycode = /^xn--/,
            regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
            regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
            /** Error messages */
            errors = {
              overflow: 'Overflow: input needs wider integers to process',
              'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
              'invalid-input': 'Invalid input',
            },
            /** Convenience shortcuts */
            baseMinusTMin = base - tMin,
            floor = Math.floor,
            stringFromCharCode = String.fromCharCode,
            /** Temporary variable */
            key;

          /*--------------------------------------------------------------------------*/

          /**
           * A generic error utility function.
           * @private
           * @param {String} type The error type.
           * @returns {Error} Throws a `RangeError` with the applicable error message.
           */
          function error(type) {
            throw new RangeError(errors[type]);
          }

          /**
           * A generic `Array#map` utility function.
           * @private
           * @param {Array} array The array to iterate over.
           * @param {Function} callback The function that gets called for every array
           * item.
           * @returns {Array} A new array of values returned by the callback function.
           */
          function map(array, fn) {
            var length = array.length;
            var result = [];
            while (length--) {
              result[length] = fn(array[length]);
            }
            return result;
          }

          /**
           * A simple `Array#map`-like wrapper to work with domain name strings or email
           * addresses.
           * @private
           * @param {String} domain The domain name or email address.
           * @param {Function} callback The function that gets called for every
           * character.
           * @returns {Array} A new string of characters returned by the callback
           * function.
           */
          function mapDomain(string, fn) {
            var parts = string.split('@');
            var result = '';
            if (parts.length > 1) {
              // In email addresses, only the domain name should be punycoded. Leave
              // the local part (i.e. everything up to `@`) intact.
              result = parts[0] + '@';
              string = parts[1];
            }
            // Avoid `split(regex)` for IE8 compatibility. See #17.
            string = string.replace(regexSeparators, '\x2E');
            var labels = string.split('.');
            var encoded = map(labels, fn).join('.');
            return result + encoded;
          }

          /**
           * Creates an array containing the numeric code points of each Unicode
           * character in the string. While JavaScript uses UCS-2 internally,
           * this function will convert a pair of surrogate halves (each of which
           * UCS-2 exposes as separate characters) into a single code point,
           * matching UTF-16.
           * @see `punycode.ucs2.encode`
           * @see <https://mathiasbynens.be/notes/javascript-encoding>
           * @memberOf punycode.ucs2
           * @name decode
           * @param {String} string The Unicode input string (UCS-2).
           * @returns {Array} The new array of code points.
           */
          function ucs2decode(string) {
            var output = [],
              counter = 0,
              length = string.length,
              value,
              extra;
            while (counter < length) {
              value = string.charCodeAt(counter++);
              if (value >= 0xd800 && value <= 0xdbff && counter < length) {
                // high surrogate, and there is a next character
                extra = string.charCodeAt(counter++);
                if ((extra & 0xfc00) == 0xdc00) {
                  // low surrogate
                  output.push(
                    ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000
                  );
                } else {
                  // unmatched surrogate; only append this code unit, in case the next
                  // code unit is the high surrogate of a surrogate pair
                  output.push(value);
                  counter--;
                }
              } else {
                output.push(value);
              }
            }
            return output;
          }

          /**
           * Creates a string based on an array of numeric code points.
           * @see `punycode.ucs2.decode`
           * @memberOf punycode.ucs2
           * @name encode
           * @param {Array} codePoints The array of numeric code points.
           * @returns {String} The new Unicode string (UCS-2).
           */
          function ucs2encode(array) {
            return map(array, function (value) {
              var output = '';
              if (value > 0xffff) {
                value -= 0x10000;
                output += stringFromCharCode(((value >>> 10) & 0x3ff) | 0xd800);
                value = 0xdc00 | (value & 0x3ff);
              }
              output += stringFromCharCode(value);
              return output;
            }).join('');
          }

          /**
           * Converts a basic code point into a digit/integer.
           * @see `digitToBasic()`
           * @private
           * @param {Number} codePoint The basic numeric code point value.
           * @returns {Number} The numeric value of a basic code point (for use in
           * representing integers) in the range `0` to `base - 1`, or `base` if
           * the code point does not represent a value.
           */
          function basicToDigit(codePoint) {
            if (codePoint - 48 < 10) {
              return codePoint - 22;
            }
            if (codePoint - 65 < 26) {
              return codePoint - 65;
            }
            if (codePoint - 97 < 26) {
              return codePoint - 97;
            }
            return base;
          }

          /**
           * Converts a digit/integer into a basic code point.
           * @see `basicToDigit()`
           * @private
           * @param {Number} digit The numeric value of a basic code point.
           * @returns {Number} The basic code point whose value (when used for
           * representing integers) is `digit`, which needs to be in the range
           * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
           * used; else, the lowercase form is used. The behavior is undefined
           * if `flag` is non-zero and `digit` has no uppercase form.
           */
          function digitToBasic(digit, flag) {
            //  0..25 map to ASCII a..z or A..Z
            // 26..35 map to ASCII 0..9
            return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
          }

          /**
           * Bias adaptation function as per section 3.4 of RFC 3492.
           * https://tools.ietf.org/html/rfc3492#section-3.4
           * @private
           */
          function adapt(delta, numPoints, firstTime) {
            var k = 0;
            delta = firstTime ? floor(delta / damp) : delta >> 1;
            delta += floor(delta / numPoints);
            for (
              ;
              /* no initialization */ delta > (baseMinusTMin * tMax) >> 1;
              k += base
            ) {
              delta = floor(delta / baseMinusTMin);
            }
            return floor(k + ((baseMinusTMin + 1) * delta) / (delta + skew));
          }

          /**
           * Converts a Punycode string of ASCII-only symbols to a string of Unicode
           * symbols.
           * @memberOf punycode
           * @param {String} input The Punycode string of ASCII-only symbols.
           * @returns {String} The resulting string of Unicode symbols.
           */
          function decode(input) {
            // Don't use UCS-2
            var output = [],
              inputLength = input.length,
              out,
              i = 0,
              n = initialN,
              bias = initialBias,
              basic,
              j,
              index,
              oldi,
              w,
              k,
              digit,
              t,
              /** Cached calculation results */
              baseMinusT;

            // Handle the basic code points: let `basic` be the number of input code
            // points before the last delimiter, or `0` if there is none, then copy
            // the first basic code points to the output.

            basic = input.lastIndexOf(delimiter);
            if (basic < 0) {
              basic = 0;
            }

            for (j = 0; j < basic; ++j) {
              // if it's not a basic code point
              if (input.charCodeAt(j) >= 0x80) {
                error('not-basic');
              }
              output.push(input.charCodeAt(j));
            }

            // Main decoding loop: start just after the last delimiter if any basic code
            // points were copied; start at the beginning otherwise.

            for (
              index = basic > 0 ? basic + 1 : 0;
              index < inputLength /* no final expression */;

            ) {
              // `index` is the index of the next character to be consumed.
              // Decode a generalized variable-length integer into `delta`,
              // which gets added to `i`. The overflow checking is easier
              // if we increase `i` as we go, then subtract off its starting
              // value at the end to obtain `delta`.
              for (oldi = i, w = 1, k = base /* no condition */; ; k += base) {
                if (index >= inputLength) {
                  error('invalid-input');
                }

                digit = basicToDigit(input.charCodeAt(index++));

                if (digit >= base || digit > floor((maxInt - i) / w)) {
                  error('overflow');
                }

                i += digit * w;
                t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

                if (digit < t) {
                  break;
                }

                baseMinusT = base - t;
                if (w > floor(maxInt / baseMinusT)) {
                  error('overflow');
                }

                w *= baseMinusT;
              }

              out = output.length + 1;
              bias = adapt(i - oldi, out, oldi == 0);

              // `i` was supposed to wrap around from `out` to `0`,
              // incrementing `n` each time, so we'll fix that now:
              if (floor(i / out) > maxInt - n) {
                error('overflow');
              }

              n += floor(i / out);
              i %= out;

              // Insert `n` at position `i` of the output
              output.splice(i++, 0, n);
            }

            return ucs2encode(output);
          }

          /**
           * Converts a string of Unicode symbols (e.g. a domain name label) to a
           * Punycode string of ASCII-only symbols.
           * @memberOf punycode
           * @param {String} input The string of Unicode symbols.
           * @returns {String} The resulting Punycode string of ASCII-only symbols.
           */
          function encode(input) {
            var n,
              delta,
              handledCPCount,
              basicLength,
              bias,
              j,
              m,
              q,
              k,
              t,
              currentValue,
              output = [],
              /** `inputLength` will hold the number of code points in `input`. */
              inputLength,
              /** Cached calculation results */
              handledCPCountPlusOne,
              baseMinusT,
              qMinusT;

            // Convert the input in UCS-2 to Unicode
            input = ucs2decode(input);

            // Cache the length
            inputLength = input.length;

            // Initialize the state
            n = initialN;
            delta = 0;
            bias = initialBias;

            // Handle the basic code points
            for (j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue < 0x80) {
                output.push(stringFromCharCode(currentValue));
              }
            }

            handledCPCount = basicLength = output.length;

            // `handledCPCount` is the number of code points that have been handled;
            // `basicLength` is the number of basic code points.

            // Finish the basic string - if it is not empty - with a delimiter
            if (basicLength) {
              output.push(delimiter);
            }

            // Main encoding loop:
            while (handledCPCount < inputLength) {
              // All non-basic code points < n have been handled already. Find the next
              // larger one:
              for (m = maxInt, j = 0; j < inputLength; ++j) {
                currentValue = input[j];
                if (currentValue >= n && currentValue < m) {
                  m = currentValue;
                }
              }

              // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
              // but guard against overflow
              handledCPCountPlusOne = handledCPCount + 1;
              if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                error('overflow');
              }

              delta += (m - n) * handledCPCountPlusOne;
              n = m;

              for (j = 0; j < inputLength; ++j) {
                currentValue = input[j];

                if (currentValue < n && ++delta > maxInt) {
                  error('overflow');
                }

                if (currentValue == n) {
                  // Represent delta as a generalized variable-length integer
                  for (q = delta, k = base /* no condition */; ; k += base) {
                    t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                    if (q < t) {
                      break;
                    }
                    qMinusT = q - t;
                    baseMinusT = base - t;
                    output.push(
                      stringFromCharCode(
                        digitToBasic(t + (qMinusT % baseMinusT), 0)
                      )
                    );
                    q = floor(qMinusT / baseMinusT);
                  }

                  output.push(stringFromCharCode(digitToBasic(q, 0)));
                  bias = adapt(
                    delta,
                    handledCPCountPlusOne,
                    handledCPCount == basicLength
                  );
                  delta = 0;
                  ++handledCPCount;
                }
              }

              ++delta;
              ++n;
            }
            return output.join('');
          }

          /**
           * Converts a Punycode string representing a domain name or an email address
           * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
           * it doesn't matter if you call it on a string that has already been
           * converted to Unicode.
           * @memberOf punycode
           * @param {String} input The Punycoded domain name or email address to
           * convert to Unicode.
           * @returns {String} The Unicode representation of the given Punycode
           * string.
           */
          function toUnicode(input) {
            return mapDomain(input, function (string) {
              return regexPunycode.test(string)
                ? decode(string.slice(4).toLowerCase())
                : string;
            });
          }

          /**
           * Converts a Unicode string representing a domain name or an email address to
           * Punycode. Only the non-ASCII parts of the domain name will be converted,
           * i.e. it doesn't matter if you call it with a domain that's already in
           * ASCII.
           * @memberOf punycode
           * @param {String} input The domain name or email address to convert, as a
           * Unicode string.
           * @returns {String} The Punycode representation of the given domain name or
           * email address.
           */
          function toASCII(input) {
            return mapDomain(input, function (string) {
              return regexNonASCII.test(string)
                ? 'xn--' + encode(string)
                : string;
            });
          }

          /*--------------------------------------------------------------------------*/

          /** Define the public API */
          punycode = {
            /**
             * A string representing the current Punycode.js version number.
             * @memberOf punycode
             * @type String
             */
            version: '1.4.1',
            /**
             * An object of methods to convert from JavaScript's internal character
             * representation (UCS-2) to Unicode code points, and back.
             * @see <https://mathiasbynens.be/notes/javascript-encoding>
             * @memberOf punycode
             * @type Object
             */
            ucs2: {
              decode: ucs2decode,
              encode: ucs2encode,
            },
            decode: decode,
            encode: encode,
            toASCII: toASCII,
            toUnicode: toUnicode,
          };

          /** Expose `punycode` */
          // Some AMD build optimizers, like r.js, check for specific condition patterns
          // like the following:
          if (
            typeof define == 'function' &&
            typeof define.amd == 'object' &&
            define.amd
          ) {
            define('punycode', function () {
              return punycode;
            });
          } else if (freeExports && freeModule) {
            if (module.exports == freeExports) {
              // in Node.js, io.js, or RingoJS v0.8.0+
              freeModule.exports = punycode;
            } else {
              // in Narwhal or RingoJS v0.7.0-
              for (key in punycode) {
                punycode.hasOwnProperty(key) &&
                  (freeExports[key] = punycode[key]);
              }
            }
          } else {
            // in Rhino or a web browser
            root.punycode = punycode;
          }
        })(this);
      },
      {},
    ],
    '../node_modules/url/util.js': [
      function (require, module, exports) {
        'use strict';

        module.exports = {
          isString: function (arg) {
            return typeof arg === 'string';
          },
          isObject: function (arg) {
            return typeof arg === 'object' && arg !== null;
          },
          isNull: function (arg) {
            return arg === null;
          },
          isNullOrUndefined: function (arg) {
            return arg == null;
          },
        };
      },
      {},
    ],
    '../node_modules/url/url.js': [
      function (require, module, exports) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        'use strict';

        var punycode = require('punycode');
        var util = require('./util');

        exports.parse = urlParse;
        exports.resolve = urlResolve;
        exports.resolveObject = urlResolveObject;
        exports.format = urlFormat;

        exports.Url = Url;

        function Url() {
          this.protocol = null;
          this.slashes = null;
          this.auth = null;
          this.host = null;
          this.port = null;
          this.hostname = null;
          this.hash = null;
          this.search = null;
          this.query = null;
          this.pathname = null;
          this.path = null;
          this.href = null;
        }

        // Reference: RFC 3986, RFC 1808, RFC 2396

        // define these here so at least they only have to be
        // compiled once on the first module load.
        var protocolPattern = /^([a-z0-9.+-]+:)/i,
          portPattern = /:[0-9]*$/,
          // Special case for a simple path URL
          simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
          // RFC 2396: characters reserved for delimiting URLs.
          // We actually just auto-escape these.
          delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
          // RFC 2396: characters not allowed for various reasons.
          unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
          // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
          autoEscape = ["'"].concat(unwise),
          // Characters that are never ever allowed in a hostname.
          // Note that any invalid chars are also handled, but these
          // are the ones that are *expected* to be seen, so we fast-path
          // them.
          nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
          hostEndingChars = ['/', '?', '#'],
          hostnameMaxLen = 255,
          hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
          hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
          // protocols that can allow "unsafe" and "unwise" chars.
          unsafeProtocol = {
            javascript: true,
            'javascript:': true,
          },
          // protocols that never have a hostname.
          hostlessProtocol = {
            javascript: true,
            'javascript:': true,
          },
          // protocols that always contain a // bit.
          slashedProtocol = {
            http: true,
            https: true,
            ftp: true,
            gopher: true,
            file: true,
            'http:': true,
            'https:': true,
            'ftp:': true,
            'gopher:': true,
            'file:': true,
          },
          querystring = require('querystring');

        function urlParse(url, parseQueryString, slashesDenoteHost) {
          if (url && util.isObject(url) && url instanceof Url) return url;

          var u = new Url();
          u.parse(url, parseQueryString, slashesDenoteHost);
          return u;
        }

        Url.prototype.parse = function (
          url,
          parseQueryString,
          slashesDenoteHost
        ) {
          if (!util.isString(url)) {
            throw new TypeError(
              "Parameter 'url' must be a string, not " + typeof url
            );
          }

          // Copy chrome, IE, opera backslash-handling behavior.
          // Back slashes before the query string get converted to forward slashes
          // See: https://code.google.com/p/chromium/issues/detail?id=25916
          var queryIndex = url.indexOf('?'),
            splitter =
              queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
            uSplit = url.split(splitter),
            slashRegex = /\\/g;
          uSplit[0] = uSplit[0].replace(slashRegex, '/');
          url = uSplit.join(splitter);

          var rest = url;

          // trim before proceeding.
          // This is to support parse stuff like "  http://foo.com  \n"
          rest = rest.trim();

          if (!slashesDenoteHost && url.split('#').length === 1) {
            // Try fast path regexp
            var simplePath = simplePathPattern.exec(rest);
            if (simplePath) {
              this.path = rest;
              this.href = rest;
              this.pathname = simplePath[1];
              if (simplePath[2]) {
                this.search = simplePath[2];
                if (parseQueryString) {
                  this.query = querystring.parse(this.search.substr(1));
                } else {
                  this.query = this.search.substr(1);
                }
              } else if (parseQueryString) {
                this.search = '';
                this.query = {};
              }
              return this;
            }
          }

          var proto = protocolPattern.exec(rest);
          if (proto) {
            proto = proto[0];
            var lowerProto = proto.toLowerCase();
            this.protocol = lowerProto;
            rest = rest.substr(proto.length);
          }

          // figure out if it's got a host
          // user@server is *always* interpreted as a hostname, and url
          // resolution will treat //foo/bar as host=foo,path=bar because that's
          // how the browser resolves relative URLs.
          if (
            slashesDenoteHost ||
            proto ||
            rest.match(/^\/\/[^@\/]+@[^@\/]+/)
          ) {
            var slashes = rest.substr(0, 2) === '//';
            if (slashes && !(proto && hostlessProtocol[proto])) {
              rest = rest.substr(2);
              this.slashes = true;
            }
          }

          if (
            !hostlessProtocol[proto] &&
            (slashes || (proto && !slashedProtocol[proto]))
          ) {
            // there's a hostname.
            // the first instance of /, ?, ;, or # ends the host.
            //
            // If there is an @ in the hostname, then non-host chars *are* allowed
            // to the left of the last @ sign, unless some host-ending character
            // comes *before* the @-sign.
            // URLs are obnoxious.
            //
            // ex:
            // http://a@b@c/ => user:a@b host:c
            // http://a@b?@c => user:a host:c path:/?@c

            // v0.12 TODO(isaacs): This is not quite how Chrome does things.
            // Review our test case against browsers more comprehensively.

            // find the first instance of any hostEndingChars
            var hostEnd = -1;
            for (var i = 0; i < hostEndingChars.length; i++) {
              var hec = rest.indexOf(hostEndingChars[i]);
              if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                hostEnd = hec;
            }

            // at this point, either we have an explicit point where the
            // auth portion cannot go past, or the last @ char is the decider.
            var auth, atSign;
            if (hostEnd === -1) {
              // atSign can be anywhere.
              atSign = rest.lastIndexOf('@');
            } else {
              // atSign must be in auth portion.
              // http://a@b/c@d => host:b auth:a path:/c@d
              atSign = rest.lastIndexOf('@', hostEnd);
            }

            // Now we have a portion which is definitely the auth.
            // Pull that off.
            if (atSign !== -1) {
              auth = rest.slice(0, atSign);
              rest = rest.slice(atSign + 1);
              this.auth = decodeURIComponent(auth);
            }

            // the host is the remaining to the left of the first non-host char
            hostEnd = -1;
            for (var i = 0; i < nonHostChars.length; i++) {
              var hec = rest.indexOf(nonHostChars[i]);
              if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                hostEnd = hec;
            }
            // if we still have not hit it, then the entire thing is a host.
            if (hostEnd === -1) hostEnd = rest.length;

            this.host = rest.slice(0, hostEnd);
            rest = rest.slice(hostEnd);

            // pull out port.
            this.parseHost();

            // we've indicated that there is a hostname,
            // so even if it's empty, it has to be present.
            this.hostname = this.hostname || '';

            // if hostname begins with [ and ends with ]
            // assume that it's an IPv6 address.
            var ipv6Hostname =
              this.hostname[0] === '[' &&
              this.hostname[this.hostname.length - 1] === ']';

            // validate a little.
            if (!ipv6Hostname) {
              var hostparts = this.hostname.split(/\./);
              for (var i = 0, l = hostparts.length; i < l; i++) {
                var part = hostparts[i];
                if (!part) continue;
                if (!part.match(hostnamePartPattern)) {
                  var newpart = '';
                  for (var j = 0, k = part.length; j < k; j++) {
                    if (part.charCodeAt(j) > 127) {
                      // we replace non-ASCII char with a temporary placeholder
                      // we need this to make sure size of hostname is not
                      // broken by replacing non-ASCII by nothing
                      newpart += 'x';
                    } else {
                      newpart += part[j];
                    }
                  }
                  // we test again with ASCII char only
                  if (!newpart.match(hostnamePartPattern)) {
                    var validParts = hostparts.slice(0, i);
                    var notHost = hostparts.slice(i + 1);
                    var bit = part.match(hostnamePartStart);
                    if (bit) {
                      validParts.push(bit[1]);
                      notHost.unshift(bit[2]);
                    }
                    if (notHost.length) {
                      rest = '/' + notHost.join('.') + rest;
                    }
                    this.hostname = validParts.join('.');
                    break;
                  }
                }
              }
            }

            if (this.hostname.length > hostnameMaxLen) {
              this.hostname = '';
            } else {
              // hostnames are always lower case.
              this.hostname = this.hostname.toLowerCase();
            }

            if (!ipv6Hostname) {
              // IDNA Support: Returns a punycoded representation of "domain".
              // It only converts parts of the domain name that
              // have non-ASCII characters, i.e. it doesn't matter if
              // you call it with a domain that already is ASCII-only.
              this.hostname = punycode.toASCII(this.hostname);
            }

            var p = this.port ? ':' + this.port : '';
            var h = this.hostname || '';
            this.host = h + p;
            this.href += this.host;

            // strip [ and ] from the hostname
            // the host field still retains them, though
            if (ipv6Hostname) {
              this.hostname = this.hostname.substr(1, this.hostname.length - 2);
              if (rest[0] !== '/') {
                rest = '/' + rest;
              }
            }
          }

          // now rest is set to the post-host stuff.
          // chop off any delim chars.
          if (!unsafeProtocol[lowerProto]) {
            // First, make 100% sure that any "autoEscape" chars get
            // escaped, even if encodeURIComponent doesn't think they
            // need to be.
            for (var i = 0, l = autoEscape.length; i < l; i++) {
              var ae = autoEscape[i];
              if (rest.indexOf(ae) === -1) continue;
              var esc = encodeURIComponent(ae);
              if (esc === ae) {
                esc = escape(ae);
              }
              rest = rest.split(ae).join(esc);
            }
          }

          // chop off from the tail first.
          var hash = rest.indexOf('#');
          if (hash !== -1) {
            // got a fragment string.
            this.hash = rest.substr(hash);
            rest = rest.slice(0, hash);
          }
          var qm = rest.indexOf('?');
          if (qm !== -1) {
            this.search = rest.substr(qm);
            this.query = rest.substr(qm + 1);
            if (parseQueryString) {
              this.query = querystring.parse(this.query);
            }
            rest = rest.slice(0, qm);
          } else if (parseQueryString) {
            // no query string, but parseQueryString still requested
            this.search = '';
            this.query = {};
          }
          if (rest) this.pathname = rest;
          if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
            this.pathname = '/';
          }

          //to support http.request
          if (this.pathname || this.search) {
            var p = this.pathname || '';
            var s = this.search || '';
            this.path = p + s;
          }

          // finally, reconstruct the href based on what has been validated.
          this.href = this.format();
          return this;
        };

        // format a parsed object into a url string
        function urlFormat(obj) {
          // ensure it's an object, and not a string url.
          // If it's an obj, this is a no-op.
          // this way, you can call url_format() on strings
          // to clean up potentially wonky urls.
          if (util.isString(obj)) obj = urlParse(obj);
          if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
          return obj.format();
        }

        Url.prototype.format = function () {
          var auth = this.auth || '';
          if (auth) {
            auth = encodeURIComponent(auth);
            auth = auth.replace(/%3A/i, ':');
            auth += '@';
          }

          var protocol = this.protocol || '',
            pathname = this.pathname || '',
            hash = this.hash || '',
            host = false,
            query = '';

          if (this.host) {
            host = auth + this.host;
          } else if (this.hostname) {
            host =
              auth +
              (this.hostname.indexOf(':') === -1
                ? this.hostname
                : '[' + this.hostname + ']');
            if (this.port) {
              host += ':' + this.port;
            }
          }

          if (
            this.query &&
            util.isObject(this.query) &&
            Object.keys(this.query).length
          ) {
            query = querystring.stringify(this.query);
          }

          var search = this.search || (query && '?' + query) || '';

          if (protocol && protocol.substr(-1) !== ':') protocol += ':';

          // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
          // unless they had them to begin with.
          if (
            this.slashes ||
            ((!protocol || slashedProtocol[protocol]) && host !== false)
          ) {
            host = '//' + (host || '');
            if (pathname && pathname.charAt(0) !== '/')
              pathname = '/' + pathname;
          } else if (!host) {
            host = '';
          }

          if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
          if (search && search.charAt(0) !== '?') search = '?' + search;

          pathname = pathname.replace(/[?#]/g, function (match) {
            return encodeURIComponent(match);
          });
          search = search.replace('#', '%23');

          return protocol + host + pathname + search + hash;
        };

        function urlResolve(source, relative) {
          return urlParse(source, false, true).resolve(relative);
        }

        Url.prototype.resolve = function (relative) {
          return this.resolveObject(urlParse(relative, false, true)).format();
        };

        function urlResolveObject(source, relative) {
          if (!source) return relative;
          return urlParse(source, false, true).resolveObject(relative);
        }

        Url.prototype.resolveObject = function (relative) {
          if (util.isString(relative)) {
            var rel = new Url();
            rel.parse(relative, false, true);
            relative = rel;
          }

          var result = new Url();
          var tkeys = Object.keys(this);
          for (var tk = 0; tk < tkeys.length; tk++) {
            var tkey = tkeys[tk];
            result[tkey] = this[tkey];
          }

          // hash is always overridden, no matter what.
          // even href="" will remove it.
          result.hash = relative.hash;

          // if the relative url is empty, then there's nothing left to do here.
          if (relative.href === '') {
            result.href = result.format();
            return result;
          }

          // hrefs like //foo/bar always cut to the protocol.
          if (relative.slashes && !relative.protocol) {
            // take everything except the protocol from relative
            var rkeys = Object.keys(relative);
            for (var rk = 0; rk < rkeys.length; rk++) {
              var rkey = rkeys[rk];
              if (rkey !== 'protocol') result[rkey] = relative[rkey];
            }

            //urlParse appends trailing / to urls like http://www.example.com
            if (
              slashedProtocol[result.protocol] &&
              result.hostname &&
              !result.pathname
            ) {
              result.path = result.pathname = '/';
            }

            result.href = result.format();
            return result;
          }

          if (relative.protocol && relative.protocol !== result.protocol) {
            // if it's a known url protocol, then changing
            // the protocol does weird things
            // first, if it's not file:, then we MUST have a host,
            // and if there was a path
            // to begin with, then we MUST have a path.
            // if it is file:, then the host is dropped,
            // because that's known to be hostless.
            // anything else is assumed to be absolute.
            if (!slashedProtocol[relative.protocol]) {
              var keys = Object.keys(relative);
              for (var v = 0; v < keys.length; v++) {
                var k = keys[v];
                result[k] = relative[k];
              }
              result.href = result.format();
              return result;
            }

            result.protocol = relative.protocol;
            if (!relative.host && !hostlessProtocol[relative.protocol]) {
              var relPath = (relative.pathname || '').split('/');
              while (relPath.length && !(relative.host = relPath.shift()));
              if (!relative.host) relative.host = '';
              if (!relative.hostname) relative.hostname = '';
              if (relPath[0] !== '') relPath.unshift('');
              if (relPath.length < 2) relPath.unshift('');
              result.pathname = relPath.join('/');
            } else {
              result.pathname = relative.pathname;
            }
            result.search = relative.search;
            result.query = relative.query;
            result.host = relative.host || '';
            result.auth = relative.auth;
            result.hostname = relative.hostname || relative.host;
            result.port = relative.port;
            // to support http.request
            if (result.pathname || result.search) {
              var p = result.pathname || '';
              var s = result.search || '';
              result.path = p + s;
            }
            result.slashes = result.slashes || relative.slashes;
            result.href = result.format();
            return result;
          }

          var isSourceAbs =
              result.pathname && result.pathname.charAt(0) === '/',
            isRelAbs =
              relative.host ||
              (relative.pathname && relative.pathname.charAt(0) === '/'),
            mustEndAbs =
              isRelAbs || isSourceAbs || (result.host && relative.pathname),
            removeAllDots = mustEndAbs,
            srcPath = (result.pathname && result.pathname.split('/')) || [],
            relPath = (relative.pathname && relative.pathname.split('/')) || [],
            psychotic = result.protocol && !slashedProtocol[result.protocol];

          // if the url is a non-slashed url, then relative
          // links like ../.. should be able
          // to crawl up to the hostname, as well.  This is strange.
          // result.protocol has already been set by now.
          // Later on, put the first path part into the host field.
          if (psychotic) {
            result.hostname = '';
            result.port = null;
            if (result.host) {
              if (srcPath[0] === '') srcPath[0] = result.host;
              else srcPath.unshift(result.host);
            }
            result.host = '';
            if (relative.protocol) {
              relative.hostname = null;
              relative.port = null;
              if (relative.host) {
                if (relPath[0] === '') relPath[0] = relative.host;
                else relPath.unshift(relative.host);
              }
              relative.host = null;
            }
            mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
          }

          if (isRelAbs) {
            // it's absolute.
            result.host =
              relative.host || relative.host === ''
                ? relative.host
                : result.host;
            result.hostname =
              relative.hostname || relative.hostname === ''
                ? relative.hostname
                : result.hostname;
            result.search = relative.search;
            result.query = relative.query;
            srcPath = relPath;
            // fall through to the dot-handling below.
          } else if (relPath.length) {
            // it's relative
            // throw away the existing file, and take the new path instead.
            if (!srcPath) srcPath = [];
            srcPath.pop();
            srcPath = srcPath.concat(relPath);
            result.search = relative.search;
            result.query = relative.query;
          } else if (!util.isNullOrUndefined(relative.search)) {
            // just pull out the search.
            // like href='?foo'.
            // Put this after the other two cases because it simplifies the booleans
            if (psychotic) {
              result.hostname = result.host = srcPath.shift();
              //occationaly the auth can get stuck only in host
              //this especially happens in cases like
              //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
              var authInHost =
                result.host && result.host.indexOf('@') > 0
                  ? result.host.split('@')
                  : false;
              if (authInHost) {
                result.auth = authInHost.shift();
                result.host = result.hostname = authInHost.shift();
              }
            }
            result.search = relative.search;
            result.query = relative.query;
            //to support http.request
            if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
              result.path =
                (result.pathname ? result.pathname : '') +
                (result.search ? result.search : '');
            }
            result.href = result.format();
            return result;
          }

          if (!srcPath.length) {
            // no path at all.  easy.
            // we've already handled the other stuff above.
            result.pathname = null;
            //to support http.request
            if (result.search) {
              result.path = '/' + result.search;
            } else {
              result.path = null;
            }
            result.href = result.format();
            return result;
          }

          // if a url ENDs in . or .., then it must get a trailing slash.
          // however, if it ends in anything else non-slashy,
          // then it must NOT get a trailing slash.
          var last = srcPath.slice(-1)[0];
          var hasTrailingSlash =
            ((result.host || relative.host || srcPath.length > 1) &&
              (last === '.' || last === '..')) ||
            last === '';

          // strip single dots, resolve double dots to parent dir
          // if the path tries to go above the root, `up` ends up > 0
          var up = 0;
          for (var i = srcPath.length; i >= 0; i--) {
            last = srcPath[i];
            if (last === '.') {
              srcPath.splice(i, 1);
            } else if (last === '..') {
              srcPath.splice(i, 1);
              up++;
            } else if (up) {
              srcPath.splice(i, 1);
              up--;
            }
          }

          // if the path is allowed to go above the root, restore leading ..s
          if (!mustEndAbs && !removeAllDots) {
            for (; up--; up) {
              srcPath.unshift('..');
            }
          }

          if (
            mustEndAbs &&
            srcPath[0] !== '' &&
            (!srcPath[0] || srcPath[0].charAt(0) !== '/')
          ) {
            srcPath.unshift('');
          }

          if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
            srcPath.push('');
          }

          var isAbsolute =
            srcPath[0] === '' || (srcPath[0] && srcPath[0].charAt(0) === '/');

          // put the host back
          if (psychotic) {
            result.hostname = result.host = isAbsolute
              ? ''
              : srcPath.length
              ? srcPath.shift()
              : '';
            //occationaly the auth can get stuck only in host
            //this especially happens in cases like
            //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
            var authInHost =
              result.host && result.host.indexOf('@') > 0
                ? result.host.split('@')
                : false;
            if (authInHost) {
              result.auth = authInHost.shift();
              result.host = result.hostname = authInHost.shift();
            }
          }

          mustEndAbs = mustEndAbs || (result.host && srcPath.length);

          if (mustEndAbs && !isAbsolute) {
            srcPath.unshift('');
          }

          if (!srcPath.length) {
            result.pathname = null;
            result.path = null;
          } else {
            result.pathname = srcPath.join('/');
          }

          //to support request.http
          if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
            result.path =
              (result.pathname ? result.pathname : '') +
              (result.search ? result.search : '');
          }
          result.auth = relative.auth || result.auth;
          result.slashes = result.slashes || relative.slashes;
          result.href = result.format();
          return result;
        };

        Url.prototype.parseHost = function () {
          var host = this.host;
          var port = portPattern.exec(host);
          if (port) {
            port = port[0];
            if (port !== ':') {
              this.port = port.substr(1);
            }
            host = host.substr(0, host.length - port.length);
          }
          if (host) this.hostname = host;
        };
      },
      {
        punycode:
          '../node_modules/node-libs-browser/node_modules/punycode/punycode.js',
        './util': '../node_modules/url/util.js',
        querystring: '../node_modules/querystring-es3/index.js',
      },
    ],
    '../node_modules/xtend/immutable.js': [
      function (require, module, exports) {
        module.exports = extend;
        var hasOwnProperty = Object.prototype.hasOwnProperty;

        function extend() {
          var target = {};

          for (var i = 0; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        }
      },
      {},
    ],
    '../node_modules/parse-link-header/index.js': [
      function (require, module, exports) {
        'use strict';

        var qs = require('querystring'),
          url = require('url'),
          xtend = require('xtend');

        function hasRel(x) {
          return x && x.rel;
        }

        function intoRels(acc, x) {
          function splitRel(rel) {
            acc[rel] = xtend(x, { rel: rel });
          }

          x.rel.split(/\s+/).forEach(splitRel);

          return acc;
        }

        function createObjects(acc, p) {
          // rel="next" => 1: rel 2: next
          var m = p.match(/\s*(.+)\s*=\s*"?([^"]+)"?/);
          if (m) acc[m[1]] = m[2];
          return acc;
        }

        function parseLink(link) {
          try {
            var m = link.match(/<?([^>]*)>(.*)/),
              linkUrl = m[1],
              parts = m[2].split(';'),
              parsedUrl = url.parse(linkUrl),
              qry = qs.parse(parsedUrl.query);

            parts.shift();

            var info = parts.reduce(createObjects, {});

            info = xtend(qry, info);
            info.url = linkUrl;
            return info;
          } catch (e) {
            return null;
          }
        }

        module.exports = function (linkHeader) {
          if (!linkHeader) return null;

          return linkHeader
            .split(/,\s*</)
            .map(parseLink)
            .filter(hasRel)
            .reduce(intoRels, {});
        };
      },
      {
        querystring: '../node_modules/querystring-es3/index.js',
        url: '../node_modules/url/url.js',
        xtend: '../node_modules/xtend/immutable.js',
      },
    ],
    'js/page/index.js': [
      function (require, module, exports) {
        'use strict';

        var _axios = _interopRequireDefault(require('axios'));

        var _parseLinkHeader = _interopRequireDefault(
          require('parse-link-header')
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function _createForOfIteratorHelper(o) {
          if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
            if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
              var i = 0;
              var F = function F() {};
              return {
                s: F,
                n: function n() {
                  if (i >= o.length) return { done: true };
                  return { done: false, value: o[i++] };
                },
                e: function e(_e) {
                  throw _e;
                },
                f: F,
              };
            }
            throw new TypeError(
              'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            );
          }
          var it,
            normalCompletion = true,
            didErr = false,
            err;
          return {
            s: function s() {
              it = o[Symbol.iterator]();
            },
            n: function n() {
              var step = it.next();
              normalCompletion = step.done;
              return step;
            },
            e: function e(_e2) {
              didErr = true;
              err = _e2;
            },
            f: function f() {
              try {
                if (!normalCompletion && it.return != null) it.return();
              } finally {
                if (didErr) throw err;
              }
            },
          };
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === 'Object' && o.constructor) n = o.constructor.name;
          if (n === 'Map' || n === 'Set') return Array.from(n);
          if (
            n === 'Arguments' ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return _arrayLikeToArray(o, minLen);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;
          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }
          return arr2;
        }

        // query string to parameter function
        var getUrlParams = function getUrlParams() {
          var params = {};
          window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (
            str,
            key,
            value
          ) {
            params[key] = value;
          });
          return params;
        }; // List and Modal View function

        var createListAndModal = function createListAndModal(data) {
          data.map(function (datum) {
            var userId = datum.userId,
              id = datum.id,
              title = datum.title,
              body = datum.body; // li 생성

            var childNode = document.createElement('li'); // li 내용 생성

            var text = document.createTextNode(
              ''.concat(id, '. ').concat(title, ' / Author: ').concat(userId)
            );
            childNode.appendChild(text);
            childNode.classList.add(
              'list-group-item',
              'list-group-item-action'
            );
            childNode.setAttribute('id', 'data-'.concat(id));
            childNode.setAttribute('data-toggle', 'modal');
            childNode.setAttribute('data-target', '#modal'); // li map

            document.getElementById('board-list').appendChild(childNode); // modal control

            var listItem = document.getElementById('data-'.concat(id));

            var onClick = function onClick() {
              var modalTitle = document.getElementById('modal-title');
              var modalBody = document.getElementById('modal-body');
              var titleNode = document.createTextNode(
                ''.concat(title, ' / Author: ').concat(userId)
              );
              var bodyNode = document.createTextNode(''.concat(body));

              if (modalTitle.hasChildNodes()) {
                modalTitle.removeChild(modalTitle.childNodes[0]);
                modalTitle.appendChild(titleNode);
                modalBody.removeChild(modalBody.childNodes[0]);
                modalBody.appendChild(bodyNode);
              } else {
                modalTitle.appendChild(titleNode);
                modalBody.appendChild(bodyNode);
              }
            };

            listItem.addEventListener('click', onClick, false);
          });
        }; // api

        _axios.default
          .get(
            'https://jsonplaceholder.typicode.com/posts'.concat(
              window.location.search
            )
          )
          .then(function (response) {
            console.log(response); // total count

            var headers = Object.entries(response.headers);

            for (var _i = 0, _headers = headers; _i < _headers.length; _i++) {
              var a = _headers[_i];

              if (a[0] === 'x-total-count') {
                var totalCount = document.getElementById('total-count');
                var countText = document.createTextNode(a[1]);
                totalCount.appendChild(countText);
              }
            } // active page

            var search = window.location.search;
            var pageLinks = document.getElementsByClassName('page-link');

            var _iterator = _createForOfIteratorHelper(pageLinks),
              _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                var _a = _step.value;
                var href = _a.attributes.href.value;

                if (href == search) {
                  _a.parentNode.setAttribute('class', 'page-item active');
                }
              } // call view function
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            createListAndModal(response.data);
          });
      },
      {
        axios: '../node_modules/axios/index.js',
        'parse-link-header': '../node_modules/parse-link-header/index.js',
      },
    ],
    '../node_modules/parcel-bundler/src/builtins/hmr-runtime.js': [
      function (require, module, exports) {
        var global = arguments[3];
        var OVERLAY_ID = '__parcel__error__overlay__';
        var OldModule = module.bundle.Module;

        function Module(moduleName) {
          OldModule.call(this, moduleName);
          this.hot = {
            data: module.bundle.hotData,
            _acceptCallbacks: [],
            _disposeCallbacks: [],
            accept: function (fn) {
              this._acceptCallbacks.push(fn || function () {});
            },
            dispose: function (fn) {
              this._disposeCallbacks.push(fn);
            },
          };
          module.bundle.hotData = null;
        }

        module.bundle.Module = Module;
        var checkedAssets, assetsToAccept;
        var parent = module.bundle.parent;

        if (
          (!parent || !parent.isParcelRequire) &&
          typeof WebSocket !== 'undefined'
        ) {
          var hostname = '' || location.hostname;
          var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
          var ws = new WebSocket(
            protocol + '://' + hostname + ':' + '58586' + '/'
          );

          ws.onmessage = function (event) {
            checkedAssets = {};
            assetsToAccept = [];
            var data = JSON.parse(event.data);

            if (data.type === 'update') {
              var handled = false;
              data.assets.forEach(function (asset) {
                if (!asset.isNew) {
                  var didAccept = hmrAcceptCheck(
                    global.parcelRequire,
                    asset.id
                  );

                  if (didAccept) {
                    handled = true;
                  }
                }
              }); // Enable HMR for CSS by default.

              handled =
                handled ||
                data.assets.every(function (asset) {
                  return asset.type === 'css' && asset.generated.js;
                });

              if (handled) {
                console.clear();
                data.assets.forEach(function (asset) {
                  hmrApply(global.parcelRequire, asset);
                });
                assetsToAccept.forEach(function (v) {
                  hmrAcceptRun(v[0], v[1]);
                });
              } else if (location.reload) {
                // `location` global exists in a web worker context but lacks `.reload()` function.
                location.reload();
              }
            }

            if (data.type === 'reload') {
              ws.close();

              ws.onclose = function () {
                location.reload();
              };
            }

            if (data.type === 'error-resolved') {
              console.log('[parcel] ✨ Error resolved');
              removeErrorOverlay();
            }

            if (data.type === 'error') {
              console.error(
                '[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack
              );
              removeErrorOverlay();
              var overlay = createErrorOverlay(data);
              document.body.appendChild(overlay);
            }
          };
        }

        function removeErrorOverlay() {
          var overlay = document.getElementById(OVERLAY_ID);

          if (overlay) {
            overlay.remove();
          }
        }

        function createErrorOverlay(data) {
          var overlay = document.createElement('div');
          overlay.id = OVERLAY_ID; // html encode message and stack trace

          var message = document.createElement('div');
          var stackTrace = document.createElement('pre');
          message.innerText = data.error.message;
          stackTrace.innerText = data.error.stack;
          overlay.innerHTML =
            '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
            '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
            '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
            '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' +
            message.innerHTML +
            '</div>' +
            '<pre>' +
            stackTrace.innerHTML +
            '</pre>' +
            '</div>';
          return overlay;
        }

        function getParents(bundle, id) {
          var modules = bundle.modules;

          if (!modules) {
            return [];
          }

          var parents = [];
          var k, d, dep;

          for (k in modules) {
            for (d in modules[k][1]) {
              dep = modules[k][1][d];

              if (
                dep === id ||
                (Array.isArray(dep) && dep[dep.length - 1] === id)
              ) {
                parents.push(k);
              }
            }
          }

          if (bundle.parent) {
            parents = parents.concat(getParents(bundle.parent, id));
          }

          return parents;
        }

        function hmrApply(bundle, asset) {
          var modules = bundle.modules;

          if (!modules) {
            return;
          }

          if (modules[asset.id] || !bundle.parent) {
            var fn = new Function(
              'require',
              'module',
              'exports',
              asset.generated.js
            );
            asset.isNew = !modules[asset.id];
            modules[asset.id] = [fn, asset.deps];
          } else if (bundle.parent) {
            hmrApply(bundle.parent, asset);
          }
        }

        function hmrAcceptCheck(bundle, id) {
          var modules = bundle.modules;

          if (!modules) {
            return;
          }

          if (!modules[id] && bundle.parent) {
            return hmrAcceptCheck(bundle.parent, id);
          }

          if (checkedAssets[id]) {
            return;
          }

          checkedAssets[id] = true;
          var cached = bundle.cache[id];
          assetsToAccept.push([bundle, id]);

          if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
            return true;
          }

          return getParents(global.parcelRequire, id).some(function (id) {
            return hmrAcceptCheck(global.parcelRequire, id);
          });
        }

        function hmrAcceptRun(bundle, id) {
          var cached = bundle.cache[id];
          bundle.hotData = {};

          if (cached) {
            cached.hot.data = bundle.hotData;
          }

          if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
            cached.hot._disposeCallbacks.forEach(function (cb) {
              cb(bundle.hotData);
            });
          }

          delete bundle.cache[id];
          bundle(id);
          cached = bundle.cache[id];

          if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
            cached.hot._acceptCallbacks.forEach(function (cb) {
              cb();
            });

            return true;
          }
        }
      },
      {},
    ],
  },
  {},
  [
    '../node_modules/parcel-bundler/src/builtins/hmr-runtime.js',
    'js/page/index.js',
  ],
  null
);
//# sourceMappingURL=/page.0dcc0a34.js.map
