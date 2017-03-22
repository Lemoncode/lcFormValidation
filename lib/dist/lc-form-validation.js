(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("lc-form-validation", [], factory);
	else if(typeof exports === 'object')
		exports["lc-form-validation"] = factory();
	else
		root["lc-form-validation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export FieldValidation */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FieldValidationResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormValidationResult; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FieldValidation = function FieldValidation() {
    _classCallCheck(this, FieldValidation);
};
var FieldValidationResult = function FieldValidationResult() {
    _classCallCheck(this, FieldValidationResult);

    this.key = '';
    this.type = '';
    this.succeeded = false;
    this.errorMessage = '';
};
var FormValidationResult = function FormValidationResult() {
    _classCallCheck(this, FormValidationResult);

    this.succeeded = false;
    this.fieldErrors = [];
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return consts; });
var consts = {
    globalFormValidationId: "_GLOBAL_FORM_",
    defaultFilter: { OnChange: true }
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parseLengthParams;
/* harmony export (immutable) */ __webpack_exports__["b"] = isLengthValid;
function parseLengthParams(customParams, errorMessage) {
    var length = customParams.length === null ? NaN : Number(customParams.length);
    if (isNaN(length)) {
        throw new Error(errorMessage);
    }
    return length;
}
function isLengthValid(value, length, validatorFn) {
    return typeof value === 'string' ? validatorFn(value, length) : true;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entities__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = pattern;
/* harmony export (immutable) */ __webpack_exports__["b"] = isValidPattern;

var BAD_PARAMETER = 'FieldValidationError: pattern option for pattern validation is mandatory. Example: { pattern: /\d+/ }.';
function pattern(value, vm, customParams) {
    var pattern = parsePattern(customParams);
    var isValid = isValidPattern(value, pattern);
    var validationResult = new __WEBPACK_IMPORTED_MODULE_0__entities__["b" /* FieldValidationResult */]();
    validationResult.succeeded = isValid;
    validationResult.type = 'PATTERN';
    validationResult.errorMessage = isValid ? '' : 'Please provide a valid format.';
    return validationResult;
}
function parsePattern(_ref) {
    var pattern = _ref.pattern;

    if (typeof pattern === 'boolean' || pattern === null) {
        throw new Error(BAD_PARAMETER);
    }
    return getRegExp(pattern);
}
function getRegExp(pattern) {
    return pattern instanceof RegExp ? pattern : new RegExp(pattern);
}
function isEmptyValue(value) {
    return value === null || value === undefined || value === '';
}
function isValidPattern(value, pattern) {
    return isEmptyValue(value) ? true : pattern.test(value);
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entities__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__baseFormValidation__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rules__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FormValidationResult", function() { return __WEBPACK_IMPORTED_MODULE_0__entities__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FieldValidationResult", function() { return __WEBPACK_IMPORTED_MODULE_0__entities__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFormValidation", function() { return __WEBPACK_IMPORTED_MODULE_1__baseFormValidation__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Validators", function() { return __WEBPACK_IMPORTED_MODULE_2__rules__["a"]; });





/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0
 */

(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(18);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));
//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16), __webpack_require__(17)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__validationEngine__ = __webpack_require__(13);
/* unused harmony export BaseFormValidation */
/* harmony export (immutable) */ __webpack_exports__["a"] = createFormValidation;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var BaseFormValidation = function () {
    function BaseFormValidation(validationConstraints) {
        _classCallCheck(this, BaseFormValidation);

        this.validationEngine = new __WEBPACK_IMPORTED_MODULE_0__validationEngine__["a" /* ValidationEngine */]();
        this.parseValidationConstraints(validationConstraints);
    }

    _createClass(BaseFormValidation, [{
        key: 'parseValidationConstraints',
        value: function parseValidationConstraints(validationConstraints) {
            if (validationConstraints && (typeof validationConstraints === 'undefined' ? 'undefined' : _typeof(validationConstraints)) === 'object') {
                var global = validationConstraints.global,
                    fields = validationConstraints.fields;

                if (global && global instanceof Array) {
                    this.parseFormValidations(global);
                }
                if (fields && (typeof fields === 'undefined' ? 'undefined' : _typeof(fields)) === 'object') {
                    this.parseAllFieldsValidations(fields);
                }
            }
        }
    }, {
        key: 'parseFormValidations',
        value: function parseFormValidations(validationFunctions) {
            var _this = this;

            validationFunctions.forEach(function (validationFunction) {
                if (typeof validationFunction === 'function') {
                    _this.validationEngine.addFormValidation(validationFunction);
                }
            });
        }
    }, {
        key: 'parseAllFieldsValidations',
        value: function parseAllFieldsValidations(fields) {
            for (var field in fields) {
                this.parseFieldValidations(field, fields[field]);
            }
        }
    }, {
        key: 'parseFieldValidations',
        value: function parseFieldValidations(constraint, fieldValidationConstraints) {
            var _this2 = this;

            if (fieldValidationConstraints instanceof Array) {
                fieldValidationConstraints.forEach(function (fieldValidationConstraint) {
                    if (fieldValidationConstraint && (typeof fieldValidationConstraint === 'undefined' ? 'undefined' : _typeof(fieldValidationConstraint)) === 'object') {
                        _this2.addFieldValidation(constraint, fieldValidationConstraint);
                    }
                });
            }
        }
    }, {
        key: 'addFieldValidation',
        value: function addFieldValidation(field, validationConstraint) {
            this.validationEngine.addFieldValidation(field, validationConstraint.validator, validationConstraint.eventsFilter, validationConstraint.customParams);
            return this;
        }
    }, {
        key: 'validateField',
        value: function validateField(vm, key, value, eventsFilter) {
            return this.validationEngine.triggerFieldValidation(vm, key, value, eventsFilter);
        }
    }, {
        key: 'validateForm',
        value: function validateForm(vm) {
            return this.validationEngine.validateForm(vm);
        }
    }, {
        key: 'isValidationInProgress',
        value: function isValidationInProgress() {
            return this.validationEngine.isValidationInProgress();
        }
    }, {
        key: 'isFormDirty',
        value: function isFormDirty() {
            return this.validationEngine.isFormDirty();
        }
    }, {
        key: 'isFormPristine',
        value: function isFormPristine() {
            return this.validationEngine.isFormPristine();
        }
    }]);

    return BaseFormValidation;
}();
function createFormValidation(validationConstraints) {
    return new BaseFormValidation(validationConstraints);
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fieldValidationEventFilter; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FieldValidationEventFilter = function () {
    function FieldValidationEventFilter() {
        _classCallCheck(this, FieldValidationEventFilter);
    }

    _createClass(FieldValidationEventFilter, [{
        key: "filter",
        value: function filter(fieldValidations, eventsFilter) {
            var _this = this;

            var result = [];
            if (eventsFilter) {
                result = fieldValidations.filter(function (fieldValidation) {
                    return _this.hasAnyFilter(fieldValidation, eventsFilter);
                });
            } else {
                result = fieldValidations;
            }
            return result;
        }
    }, {
        key: "hasAnyFilter",
        value: function hasAnyFilter(fieldValidation, eventsFilter) {
            return Object.keys(eventsFilter).some(function (filter) {
                return eventsFilter[filter] === fieldValidation.eventsFilter[filter];
            });
        }
    }]);

    return FieldValidationEventFilter;
}();

var fieldValidationEventFilter = new FieldValidationEventFilter();

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entities__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pattern__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return email; });


var EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var email = function email(value) {
    var validationResult = new __WEBPACK_IMPORTED_MODULE_0__entities__["b" /* FieldValidationResult */]();
    var isValid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__pattern__["b" /* isValidPattern */])(value, EMAIL_PATTERN);
    validationResult.succeeded = isValid;
    validationResult.type = 'EMAIL';
    validationResult.errorMessage = isValid ? '' : 'Please enter a valid email address.';
    return validationResult;
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__required__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__minLength__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maxLength__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__email__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pattern__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Validators; });





var Validators = {
    required: __WEBPACK_IMPORTED_MODULE_0__required__["a" /* required */],
    minLength: __WEBPACK_IMPORTED_MODULE_1__minLength__["a" /* minLength */],
    maxLength: __WEBPACK_IMPORTED_MODULE_2__maxLength__["a" /* maxLength */],
    email: __WEBPACK_IMPORTED_MODULE_3__email__["a" /* email */],
    pattern: __WEBPACK_IMPORTED_MODULE_4__pattern__["a" /* pattern */]
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entities__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__length__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = maxLength;


var DEFAULT_PARAMS = { length: undefined };
var BAD_PARAMETER = 'FieldValidationError: Parameter "length" for maxLength in customParams is mandatory and should be a valid number. Example: { length: 4 }.';
function maxLength(value, vm) {
    var customParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_PARAMS;

    var length = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__length__["a" /* parseLengthParams */])(customParams, BAD_PARAMETER);
    var isValid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__length__["b" /* isLengthValid */])(value, length, isStringLengthValid);
    var validationResult = new __WEBPACK_IMPORTED_MODULE_0__entities__["b" /* FieldValidationResult */]();
    validationResult.succeeded = isValid;
    validationResult.type = 'MAX_LENGTH';
    validationResult.errorMessage = isValid ? '' : 'The value provided is too long. Length must not exceed ' + length + ' characters.';
    return validationResult;
}
function isStringLengthValid(value, length) {
    return isNaN(length) ? false : value.length <= length;
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entities__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__length__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return minLength; });


var DEFAULT_PARAMS = { length: undefined };
var BAD_PARAMETER = 'FieldValidationError: Parameter "length" for minLength in customParams is mandatory and should be a valid number. Example: { length: 4 }.';
var minLength = function minLength(value, vm) {
    var customParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_PARAMS;

    var length = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__length__["a" /* parseLengthParams */])(customParams, BAD_PARAMETER);
    var isValid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__length__["b" /* isLengthValid */])(value, length, isStringLengthValid);
    var validationResult = new __WEBPACK_IMPORTED_MODULE_0__entities__["b" /* FieldValidationResult */]();
    validationResult.errorMessage = isValid ? '' : 'The value provided must have at least ' + length + ' characters.';
    validationResult.succeeded = isValid;
    validationResult.type = 'MIN_LENGTH';
    return validationResult;
};
function isStringLengthValid(value, length) {
    return value.length >= length;
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entities__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return required; });

var DEFAULT_PARAMS = { trim: true };
var required = function required(value, vm) {
    var customParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_PARAMS;

    var validationResult = new __WEBPACK_IMPORTED_MODULE_0__entities__["b" /* FieldValidationResult */]();
    var isValid = isValidField(value, Boolean(customParams.trim));
    validationResult.errorMessage = isValid ? '' : 'Please fill in this mandatory field.';
    validationResult.succeeded = isValid;
    validationResult.type = 'REQUIRED';
    return validationResult;
};
function isValidField(value, trim) {
    return typeof value === 'string' ? isStringValid(value, trim) : value === true;
}
function isStringValid(value, trim) {
    return trim ? value.trim().length > 0 : value.length > 0;
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__consts__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__validationsDispatcher__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validationsResultBuilder__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fieldValidationEventFilter__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationEngine; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var ValidationEngine = function () {
    function ValidationEngine() {
        _classCallCheck(this, ValidationEngine);

        this.asyncValidationInProgressCount = 0;
        this.validationsPerField = {};
        this.validationsGlobalForm = [];
        this.isFormChanged = true;
    }

    _createClass(ValidationEngine, [{
        key: 'isFormDirty',
        value: function isFormDirty() {
            return !this.isFormChanged;
        }
    }, {
        key: 'isFormPristine',
        value: function isFormPristine() {
            return this.isFormChanged;
        }
    }, {
        key: 'validateForm',
        value: function validateForm(viewModel) {
            var _this = this;

            var fullFormValidatedPromise = new Promise(function (resolve, reject) {
                var fieldValidationResults = __WEBPACK_IMPORTED_MODULE_1__validationsDispatcher__["a" /* validationsDispatcher */].fireAllFieldsValidations(viewModel, Object.keys(_this.validationsPerField), _this.validateSingleField.bind(_this));
                if (_this.validationsGlobalForm.length > 0) {
                    fieldValidationResults = [].concat(_toConsumableArray(fieldValidationResults), _toConsumableArray(_this.validateGlobalFormValidations(viewModel)));
                }
                Promise.all(fieldValidationResults).then(function (fieldValidationResults) {
                    var formValidationResult = __WEBPACK_IMPORTED_MODULE_2__validationsResultBuilder__["a" /* validationsResultBuilder */].buildFormValidationsResult(fieldValidationResults);
                    resolve(formValidationResult);
                }).catch(function (result) {
                    var errorInformation = 'Uncontrolled error when validating full form, check custom validations code';
                    console.log(errorInformation);
                    reject(result);
                });
            });
            return fullFormValidatedPromise;
        }
    }, {
        key: 'validateGlobalFormValidations',
        value: function validateGlobalFormValidations(vm) {
            this.asyncValidationInProgressCount++;
            var globalFieldResultValidations = [];
            if (this.validationsGlobalForm.length == 0) {
                this.asyncValidationInProgressCount--;
            } else {
                var fieldValidationResultsPromises = __WEBPACK_IMPORTED_MODULE_1__validationsDispatcher__["a" /* validationsDispatcher */].fireGlobalFormValidations(vm, this.validationsGlobalForm);
                this.asyncValidationInProgressCount--;
                globalFieldResultValidations = [].concat(_toConsumableArray(fieldValidationResultsPromises));
            }
            return globalFieldResultValidations;
        }
    }, {
        key: 'triggerFieldValidation',
        value: function triggerFieldValidation(vm, key, value) {
            var filters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : __WEBPACK_IMPORTED_MODULE_0__consts__["a" /* consts */].defaultFilter;

            this.isFormChanged = false;
            return this.validateSingleField(vm, key, value, filters);
        }
    }, {
        key: 'validateSingleField',
        value: function validateSingleField(vm, key, value) {
            var _this2 = this;

            var filters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            this.asyncValidationInProgressCount++;
            var fieldValidationResultPromise = new Promise(function (resolve, reject) {
                if (!_this2.isFieldKeyMappingDefined(key)) {
                    _this2.asyncValidationInProgressCount--;
                    resolve();
                } else {
                    var filteredFieldValidations = __WEBPACK_IMPORTED_MODULE_3__fieldValidationEventFilter__["a" /* fieldValidationEventFilter */].filter(_this2.validationsPerField[key], filters);
                    __WEBPACK_IMPORTED_MODULE_1__validationsDispatcher__["a" /* validationsDispatcher */].fireSingleFieldValidations(vm, value, filteredFieldValidations).then(function (fieldValidationResult) {
                        _this2.asyncValidationInProgressCount--;
                        if (fieldValidationResult) {
                            fieldValidationResult.key = key;
                        }
                        resolve(fieldValidationResult);
                    }).catch(function (result) {
                        _this2.asyncValidationInProgressCount--;
                        var errorInformation = 'Validation Exception, field: ' + key + ' validation fn Index: ' + key;
                        console.log(errorInformation);
                        reject(result);
                    });
                }
            });
            return fieldValidationResultPromise;
        }
    }, {
        key: 'addFieldValidation',
        value: function addFieldValidation(key, validation) {
            var eventsFilter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_0__consts__["a" /* consts */].defaultFilter;
            var customParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            var asyncValidationFn = function asyncValidationFn(value, vm, customParams) {
                return Promise.resolve(validation(value, vm, customParams));
            };
            if (!this.isFieldKeyMappingDefined(key)) {
                this.validationsPerField[key] = [];
            }
            this.validationsPerField[key].push({ validationFn: asyncValidationFn, eventsFilter: eventsFilter, customParams: customParams });
            return this;
        }
    }, {
        key: 'isFieldKeyMappingDefined',
        value: function isFieldKeyMappingDefined(key) {
            return this.validationsPerField[key] !== undefined && this.validationsPerField[key] !== null;
        }
    }, {
        key: 'addFormValidation',
        value: function addFormValidation(validation) {
            var validationAsync = function validationAsync(vm) {
                return Promise.resolve(validation(vm));
            };
            this.validationsGlobalForm.push(validationAsync);
        }
    }, {
        key: 'isValidationInProgress',
        value: function isValidationInProgress() {
            return this.asyncValidationInProgressCount > 0;
        }
    }]);

    return ValidationEngine;
}();

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ValidationDispatcher */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return validationsDispatcher; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidationParams = function ValidationParams(vm, value, validationsPerField) {
    _classCallCheck(this, ValidationParams);

    this.vm = vm;
    this.value = value;
    this.validationsPerField = validationsPerField;
};

var ValidationDispatcher = function () {
    function ValidationDispatcher() {
        _classCallCheck(this, ValidationDispatcher);
    }

    _createClass(ValidationDispatcher, [{
        key: "fireSingleFieldValidations",
        value: function fireSingleFieldValidations(vm, value, fieldValidations) {
            var _this = this;

            var validationParams = new ValidationParams(vm, value, fieldValidations);
            var fieldValidationResultPromise = new Promise(function (resolve, reject) {
                if (fieldValidations && fieldValidations.length > 0) {
                    _this.fireSingleValidation(resolve, reject, validationParams, 0);
                } else {
                    resolve();
                }
            });
            return fieldValidationResultPromise;
        }
    }, {
        key: "fireSingleValidation",
        value: function fireSingleValidation(resolve, reject, validationParams, currentIndex) {
            var _this2 = this;

            var fieldValidation = validationParams.validationsPerField[currentIndex];
            fieldValidation.validationFn(validationParams.value, validationParams.vm, fieldValidation.customParams).then(function (fieldValidationResult) {
                if (_this2.fieldValidationFailedOrLastOne(fieldValidationResult, currentIndex, validationParams.validationsPerField.length)) {
                    resolve(fieldValidationResult);
                } else {
                    currentIndex++;
                    _this2.fireSingleValidation(resolve, reject, validationParams, currentIndex);
                }
            }).catch(function () {
                reject(currentIndex);
            });
        }
    }, {
        key: "fieldValidationFailedOrLastOne",
        value: function fieldValidationFailedOrLastOne(fieldValidationResult, index, numberOfItems) {
            return !fieldValidationResult || !fieldValidationResult.succeeded || this.isLastElement(index, numberOfItems);
        }
    }, {
        key: "isLastElement",
        value: function isLastElement(index, length) {
            return index === length - 1;
        }
    }, {
        key: "fireAllFieldsValidations",
        value: function fireAllFieldsValidations(vm, fieldsToValidate, validationFn) {
            var fieldValidationResultsPromises = [];
            if (this.areParametersDefined(vm, validationFn)) {
                fieldsToValidate.forEach(function (field) {
                    var vmFieldValue = vm[field];
                    if (vmFieldValue !== undefined) {
                        var fieldValidationResultsPromise = validationFn(vm, field, vmFieldValue);
                        fieldValidationResultsPromises.push(fieldValidationResultsPromise);
                    }
                });
            }
            return fieldValidationResultsPromises;
        }
    }, {
        key: "fireGlobalFormValidations",
        value: function fireGlobalFormValidations(vm, validations) {
            var validationResultsPromises = [];
            if (this.areParametersDefined(validations)) {
                validations.forEach(function (validationFn) {
                    validationResultsPromises.push(validationFn(vm));
                });
            }
            return validationResultsPromises;
        }
    }, {
        key: "areParametersDefined",
        value: function areParametersDefined() {
            for (var _len = arguments.length, parameters = Array(_len), _key = 0; _key < _len; _key++) {
                parameters[_key] = arguments[_key];
            }

            return parameters.every(function (parameter) {
                return parameter;
            });
        }
    }]);

    return ValidationDispatcher;
}();
var validationsDispatcher = new ValidationDispatcher();


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entities__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__consts__ = __webpack_require__(1);
/* unused harmony export ValidationsResultBuilder */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return validationsResultBuilder; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var ValidationsResultBuilder = function () {
    function ValidationsResultBuilder() {
        _classCallCheck(this, ValidationsResultBuilder);
    }

    _createClass(ValidationsResultBuilder, [{
        key: 'buildFormValidationsResult',
        value: function buildFormValidationsResult(fieldValidationResults) {
            var formValidationResult = new __WEBPACK_IMPORTED_MODULE_0__entities__["a" /* FormValidationResult */]();
            if (fieldValidationResults && fieldValidationResults.length > 0) {
                var filteredFieldValidationResults = this.removeUndefinedValidationResults(fieldValidationResults);
                this.setGlobalKeyToEmptyKeys(filteredFieldValidationResults);
                formValidationResult.succeeded = filteredFieldValidationResults.every(function (fvr) {
                    return fvr.succeeded;
                });
                formValidationResult.fieldErrors = filteredFieldValidationResults.filter(function (fvr) {
                    return fvr.key !== __WEBPACK_IMPORTED_MODULE_1__consts__["a" /* consts */].globalFormValidationId;
                });
                formValidationResult.formGlobalErrors = filteredFieldValidationResults.filter(function (fvr) {
                    return fvr.key === __WEBPACK_IMPORTED_MODULE_1__consts__["a" /* consts */].globalFormValidationId;
                });
            }
            return formValidationResult;
        }
    }, {
        key: 'removeUndefinedValidationResults',
        value: function removeUndefinedValidationResults(fieldValidationResults) {
            return fieldValidationResults.filter(function (fvr) {
                return fvr !== undefined && fvr !== null;
            });
        }
    }, {
        key: 'setGlobalKeyToEmptyKeys',
        value: function setGlobalKeyToEmptyKeys(fieldValidationResults) {
            fieldValidationResults.forEach(function (fieldValidationResult) {
                if (!fieldValidationResult.key) {
                    fieldValidationResult.key = __WEBPACK_IMPORTED_MODULE_1__consts__["a" /* consts */].globalFormValidationId;
                }
            });
        }
    }]);

    return ValidationsResultBuilder;
}();
var validationsResultBuilder = new ValidationsResultBuilder();


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
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
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
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
    while(len) {
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
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
});