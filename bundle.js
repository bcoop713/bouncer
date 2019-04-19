var Bouncer = (function (exports) {
  'use strict';

  var out_of_memory = /* tuple */[
    "Out_of_memory",
    0
  ];

  var sys_error = /* tuple */[
    "Sys_error",
    -1
  ];

  var failure = /* tuple */[
    "Failure",
    -2
  ];

  var invalid_argument = /* tuple */[
    "Invalid_argument",
    -3
  ];

  var end_of_file = /* tuple */[
    "End_of_file",
    -4
  ];

  var division_by_zero = /* tuple */[
    "Division_by_zero",
    -5
  ];

  var not_found = /* tuple */[
    "Not_found",
    -6
  ];

  var match_failure = /* tuple */[
    "Match_failure",
    -7
  ];

  var stack_overflow = /* tuple */[
    "Stack_overflow",
    -8
  ];

  var sys_blocked_io = /* tuple */[
    "Sys_blocked_io",
    -9
  ];

  var assert_failure = /* tuple */[
    "Assert_failure",
    -10
  ];

  var undefined_recursive_module = /* tuple */[
    "Undefined_recursive_module",
    -11
  ];

  out_of_memory.tag = 248;

  sys_error.tag = 248;

  failure.tag = 248;

  invalid_argument.tag = 248;

  end_of_file.tag = 248;

  division_by_zero.tag = 248;

  not_found.tag = 248;

  match_failure.tag = 248;

  stack_overflow.tag = 248;

  sys_blocked_io.tag = 248;

  assert_failure.tag = 248;

  undefined_recursive_module.tag = 248;
  /*  Not a pure module */

  function caml_array_sub(x, offset, len) {
    var result = new Array(len);
    var j = 0;
    var i = offset;
    while(j < len) {
      result[j] = x[i];
      j = j + 1 | 0;
      i = i + 1 | 0;
    }  return result;
  }

  function caml_array_get(xs, index) {
    if (index < 0 || index >= xs.length) {
      throw [
            invalid_argument,
            "index out of bounds"
          ];
    } else {
      return xs[index];
    }
  }
  /* No side effect */

  function app(_f, _args) {
    while(true) {
      var args = _args;
      var f = _f;
      var init_arity = f.length;
      var arity = init_arity === 0 ? 1 : init_arity;
      var len = args.length;
      var d = arity - len | 0;
      if (d === 0) {
        return f.apply(null, args);
      } else if (d < 0) {
        _args = caml_array_sub(args, arity, -d | 0);
        _f = f.apply(null, caml_array_sub(args, 0, arity));
        continue ;
      } else {
        return (function(f,args){
        return function (x) {
          return app(f, args.concat(/* array */[x]));
        }
        }(f,args));
      }
    }}

  function curry_1(o, a0, arity) {
    switch (arity) {
      case 1 : 
          return o(a0);
      case 2 : 
          return (function (param) {
              return o(a0, param);
            });
      case 3 : 
          return (function (param, param$1) {
              return o(a0, param, param$1);
            });
      case 4 : 
          return (function (param, param$1, param$2) {
              return o(a0, param, param$1, param$2);
            });
      case 5 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, param, param$1, param$2, param$3);
            });
      case 6 : 
          return (function (param, param$1, param$2, param$3, param$4) {
              return o(a0, param, param$1, param$2, param$3, param$4);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3, param$4, param$5) {
              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
            });
      default:
        return app(o, /* array */[a0]);
    }
  }

  function _1(o, a0) {
    var arity = o.length;
    if (arity === 1) {
      return o(a0);
    } else {
      return curry_1(o, a0, arity);
    }
  }

  function curry_2(o, a0, a1, arity) {
    switch (arity) {
      case 1 : 
          return app(o(a0), /* array */[a1]);
      case 2 : 
          return o(a0, a1);
      case 3 : 
          return (function (param) {
              return o(a0, a1, param);
            });
      case 4 : 
          return (function (param, param$1) {
              return o(a0, a1, param, param$1);
            });
      case 5 : 
          return (function (param, param$1, param$2) {
              return o(a0, a1, param, param$1, param$2);
            });
      case 6 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, a1, param, param$1, param$2, param$3);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3, param$4) {
              return o(a0, a1, param, param$1, param$2, param$3, param$4);
            });
      default:
        return app(o, /* array */[
                    a0,
                    a1
                  ]);
    }
  }

  function _2(o, a0, a1) {
    var arity = o.length;
    if (arity === 2) {
      return o(a0, a1);
    } else {
      return curry_2(o, a0, a1, arity);
    }
  }
  /* No side effect */

  function __(tag, block) {
    block.tag = tag;
    return block;
  }

  function record(meta, xs) {
    return Object.defineProperty(xs, Symbol.for("BsRecord"), {
                value: meta
              });
  }

  function variant(meta, tag, xs) {
    xs.tag = tag;
    return Object.defineProperty(xs, Symbol.for("BsVariant"), {
                value: meta
              });
  }

  function simpleVariant(meta, xs) {
    return Object.defineProperty(xs, Symbol.for("BsVariant"), {
                value: meta
              });
  }

  function localModule(meta, xs) {
    return Object.defineProperty(xs, Symbol.for("BsLocalModule"), {
                value: meta
              });
  }

  function polyVar(meta, xs) {
    return Object.defineProperty(xs, Symbol.for("BsPolyVar"), {
                value: meta
              });
  }

  function spliceApply (fn,args){
    var i, argLen; 
    argLen = args.length;
    var applied = [];
    for(i = 0; i < argLen - 1; ++i){
      applied.push(args[i]);
    }
    var lastOne = args[argLen - 1];
    for(i = 0; i < lastOne.length; ++i ){
      applied.push(lastOne[i]);
    }
    return fn.apply(null,applied)
  }
  function spliceObjApply (obj,name,args){
    var i, argLen; 
    argLen = args.length;
    var applied = [];
    for(i = 0; i < argLen - 1; ++i){
      applied.push(args[i]);
    }
    var lastOne = args[argLen - 1];
    for(i = 0; i < lastOne.length; ++i ){
      applied.push(lastOne[i]);
    }
    return (obj[name]).apply(obj,applied)
  }/* No side effect */

  var Block = /*#__PURE__*/Object.freeze({
    __: __,
    record: record,
    variant: variant,
    simpleVariant: simpleVariant,
    localModule: localModule,
    polyVar: polyVar,
    spliceApply: spliceApply,
    spliceObjApply: spliceObjApply
  });

  /* No side effect */

  /* No side effect */

  /* No side effect */

  /* No side effect */

  /* No side effect */

  /* imul Not a pure module */

  /* No side effect */

  /* Caml_int32 Not a pure module */

  /* No side effect */

  /* No side effect */

  var id = /* record */[/* contents */0];

  function caml_fresh_oo_id(param) {
    id[0] += 1;
    return id[0];
  }

  function create(str) {
    var v_001 = caml_fresh_oo_id(/* () */0);
    var v = /* tuple */[
      str,
      v_001
    ];
    v.tag = 248;
    return v;
  }
  /* No side effect */

  /* No side effect */

  /* No side effect */

  var Exit = create("Pervasives.Exit");

  function $at(l1, l2) {
    if (l1) {
      return /* :: */[
              l1[0],
              $at(l1[1], l2)
            ];
    } else {
      return l2;
    }
  }
  /* No side effect */

  function flatten(param) {
    if (param) {
      return $at(param[0], flatten(param[1]));
    } else {
      return /* [] */0;
    }
  }

  function map(f, param) {
    if (param) {
      var r = _1(f, param[0]);
      return /* :: */[
              r,
              map(f, param[1])
            ];
    } else {
      return /* [] */0;
    }
  }

  function mapi(i, f, param) {
    if (param) {
      var r = _2(f, i, param[0]);
      return /* :: */[
              r,
              mapi(i + 1 | 0, f, param[1])
            ];
    } else {
      return /* [] */0;
    }
  }

  function mapi$1(f, l) {
    return mapi(0, f, l);
  }

  var concat = flatten;
  /* No side effect */

  /* No side effect */

  /* No side effect */

  var undefinedHeader = /* array */[];

  function some(x) {
    if (x === undefined) {
      var block = /* tuple */[
        undefinedHeader,
        0
      ];
      block.tag = 256;
      return block;
    } else if (x !== null && x[0] === undefinedHeader) {
      var nid = x[1] + 1 | 0;
      var block$1 = /* tuple */[
        undefinedHeader,
        nid
      ];
      block$1.tag = 256;
      return block$1;
    } else {
      return x;
    }
  }

  function valFromOption(x) {
    if (x !== null && x[0] === undefinedHeader) {
      var depth = x[1];
      if (depth === 0) {
        return undefined;
      } else {
        return /* tuple */[
                undefinedHeader,
                depth - 1 | 0
              ];
      }
    } else {
      return x;
    }
  }
  /* No side effect */

  /* No side effect */

  /* No side effect */

  function length(xs) {
    var _x = xs;
    var _acc = 0;
    while(true) {
      var acc = _acc;
      var x = _x;
      if (x) {
        _acc = acc + 1 | 0;
        _x = x[1];
        continue ;
      } else {
        return acc;
      }
    }}

  function fillAux(arr, _i, _x) {
    while(true) {
      var x = _x;
      var i = _i;
      if (x) {
        arr[i] = x[0];
        _x = x[1];
        _i = i + 1 | 0;
        continue ;
      } else {
        return /* () */0;
      }
    }}

  function fromArray(a) {
    var a$1 = a;
    var _i = a.length - 1 | 0;
    var _res = /* [] */0;
    while(true) {
      var res = _res;
      var i = _i;
      if (i < 0) {
        return res;
      } else {
        _res = /* :: */[
          a$1[i],
          res
        ];
        _i = i - 1 | 0;
        continue ;
      }
    }}

  function toArray(x) {
    var len = length(x);
    var arr = new Array(len);
    fillAux(arr, 0, x);
    return arr;
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 5.0.2, PLEASE EDIT WITH CARE

  function convertToJs(validation) {
    if (validation.tag) {
      return toArray(map((function (f) {
                        return {
                                path: f[/* path */0],
                                message: f[/* message */1]
                              };
                      }), validation[0]));
    } else {
      return /* array */[];
    }
  }

  function doValidation(validator, value, path) {
    return _2(validator, value, path);
  }

  function validate(validator, value) {
    return convertToJs(_2(validator, value, ""));
  }
  /* No side effect */

  /*!
   * is.js 0.8.0
   * Author: Aras Atasaygin
   */
  (function(root, factory) {    // eslint-disable-line no-extra-semi
      if (typeof define === 'function' && define.amd) {
          // AMD. Register as an anonymous module.
          define(function() {
              // Also create a global in case some scripts
              // that are loaded still are looking for
              // a global even when an AMD loader is in use.
              return (root.is = factory());
          });
      } else if (typeof exports === 'object') {
          // Node. Does not work with strict CommonJS, but
          // only CommonJS-like enviroments that support module.exports,
          // like Node.
          module.exports = factory();
      } else {
          // Browser globals (root is self)
          root.is = factory();
      }
  }(undefined, function() {

      // Baseline
      /* -------------------------------------------------------------------------- */

      // define 'is' object and current version
      var is = {};
      is.VERSION = '0.8.0';

      // define interfaces
      is.not = {};
      is.all = {};
      is.any = {};

      // cache some methods to call later on
      var toString = Object.prototype.toString;
      var slice = Array.prototype.slice;
      var hasOwnProperty = Object.prototype.hasOwnProperty;

      // helper function which reverses the sense of predicate result
      function not(func) {
          return function() {
              return !func.apply(null, slice.call(arguments));
          };
      }

      // helper function which call predicate function per parameter and return true if all pass
      function all(func) {
          return function() {
              var params = getParams(arguments);
              var length = params.length;
              for (var i = 0; i < length; i++) {
                  if (!func.call(null, params[i])) {
                      return false;
                  }
              }
              return true;
          };
      }

      // helper function which call predicate function per parameter and return true if any pass
      function any(func) {
          return function() {
              var params = getParams(arguments);
              var length = params.length;
              for (var i = 0; i < length; i++) {
                  if (func.call(null, params[i])) {
                      return true;
                  }
              }
              return false;
          };
      }

      // build a 'comparator' object for various comparison checks
      var comparator = {
          '<': function(a, b) { return a < b; },
          '<=': function(a, b) { return a <= b; },
          '>': function(a, b) { return a > b; },
          '>=': function(a, b) { return a >= b; }
      };

      // helper function which compares a version to a range
      function compareVersion(version, range) {
          var string = (range + '');
          var n = +(string.match(/\d+/) || NaN);
          var op = string.match(/^[<>]=?|/)[0];
          return comparator[op] ? comparator[op](version, n) : (version == n || n !== n);
      }

      // helper function which extracts params from arguments
      function getParams(args) {
          var params = slice.call(args);
          var length = params.length;
          if (length === 1 && is.array(params[0])) {    // support array
              params = params[0];
          }
          return params;
      }

      // Type checks
      /* -------------------------------------------------------------------------- */

      // is a given value Arguments?
      is.arguments = function(value) {    // fallback check is for IE
          return toString.call(value) === '[object Arguments]' ||
              (value != null && typeof value === 'object' && 'callee' in value);
      };

      // is a given value Array?
      is.array = Array.isArray || function(value) {    // check native isArray first
          return toString.call(value) === '[object Array]';
      };

      // is a given value Boolean?
      is.boolean = function(value) {
          return value === true || value === false || toString.call(value) === '[object Boolean]';
      };

      // is a given value Char?
      is.char = function(value) {
          return is.string(value) && value.length === 1;
      };

      // is a given value Date Object?
      is.date = function(value) {
          return toString.call(value) === '[object Date]';
      };

      // is a given object a DOM node?
      is.domNode = function(object) {
          return is.object(object) && object.nodeType > 0;
      };

      // is a given value Error object?
      is.error = function(value) {
          return toString.call(value) === '[object Error]';
      };

      // is a given value function?
      is['function'] = function(value) {    // fallback check is for IE
          return toString.call(value) === '[object Function]' || typeof value === 'function';
      };

      // is given value a pure JSON object?
      is.json = function(value) {
          return toString.call(value) === '[object Object]';
      };

      // is a given value NaN?
      is.nan = function(value) {    // NaN is number :) Also it is the only value which does not equal itself
          return value !== value;
      };

      // is a given value null?
      is['null'] = function(value) {
          return value === null;
      };

      // is a given value number?
      is.number = function(value) {
          return is.not.nan(value) && toString.call(value) === '[object Number]';
      };

      // is a given value object?
      is.object = function(value) {
          return Object(value) === value;
      };

      // is a given value RegExp?
      is.regexp = function(value) {
          return toString.call(value) === '[object RegExp]';
      };

      // are given values same type?
      // prevent NaN, Number same type check
      is.sameType = function(value, other) {
          var tag = toString.call(value);
          if (tag !== toString.call(other)) {
              return false;
          }
          if (tag === '[object Number]') {
              return !is.any.nan(value, other) || is.all.nan(value, other);
          }
          return true;
      };
      // sameType method does not support 'all' and 'any' interfaces
      is.sameType.api = ['not'];

      // is a given value String?
      is.string = function(value) {
          return toString.call(value) === '[object String]';
      };

      // is a given value undefined?
      is.undefined = function(value) {
          return value === void 0;
      };

      // is a given value window?
      // setInterval method is only available for window object
      is.windowObject = function(value) {
          return value != null && typeof value === 'object' && 'setInterval' in value;
      };

      // Presence checks
      /* -------------------------------------------------------------------------- */

      //is a given value empty? Objects, arrays, strings
      is.empty = function(value) {
          if (is.object(value)) {
              var length = Object.getOwnPropertyNames(value).length;
              if (length === 0 || (length === 1 && is.array(value)) ||
                      (length === 2 && is.arguments(value))) {
                  return true;
              }
              return false;
          }
          return value === '';
      };

      // is a given value existy?
      is.existy = function(value) {
          return value != null;
      };

      // is a given value falsy?
      is.falsy = function(value) {
          return !value;
      };

      // is a given value truthy?
      is.truthy = not(is.falsy);

      // Arithmetic checks
      /* -------------------------------------------------------------------------- */

      // is a given number above minimum parameter?
      is.above = function(n, min) {
          return is.all.number(n, min) && n > min;
      };
      // above method does not support 'all' and 'any' interfaces
      is.above.api = ['not'];

      // is a given number decimal?
      is.decimal = function(n) {
          return is.number(n) && n % 1 !== 0;
      };

      // are given values equal? supports numbers, strings, regexes, booleans
      // TODO: Add object and array support
      is.equal = function(value, other) {
          // check 0 and -0 equity with Infinity and -Infinity
          if (is.all.number(value, other)) {
              return value === other && 1 / value === 1 / other;
          }
          // check regexes as strings too
          if (is.all.string(value, other) || is.all.regexp(value, other)) {
              return '' + value === '' + other;
          }
          if (is.all.boolean(value, other)) {
              return value === other;
          }
          return false;
      };
      // equal method does not support 'all' and 'any' interfaces
      is.equal.api = ['not'];

      // is a given number even?
      is.even = function(n) {
          return is.number(n) && n % 2 === 0;
      };

      // is a given number finite?
      is.finite = isFinite || function(n) {
          return is.not.infinite(n) && is.not.nan(n);
      };

      // is a given number infinite?
      is.infinite = function(n) {
          return n === Infinity || n === -Infinity;
      };

      // is a given number integer?
      is.integer = function(n) {
          return is.number(n) && n % 1 === 0;
      };

      // is a given number negative?
      is.negative = function(n) {
          return is.number(n) && n < 0;
      };

      // is a given number odd?
      is.odd = function(n) {
          return is.number(n) && n % 2 === 1;
      };

      // is a given number positive?
      is.positive = function(n) {
          return is.number(n) && n > 0;
      };

      // is a given number above maximum parameter?
      is.under = function(n, max) {
          return is.all.number(n, max) && n < max;
      };
      // least method does not support 'all' and 'any' interfaces
      is.under.api = ['not'];

      // is a given number within minimum and maximum parameters?
      is.within = function(n, min, max) {
          return is.all.number(n, min, max) && n > min && n < max;
      };
      // within method does not support 'all' and 'any' interfaces
      is.within.api = ['not'];

      // Regexp checks
      /* -------------------------------------------------------------------------- */
      // Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook
      // Scott Gonzalez: Email address validation

      // dateString match m/d/yy and mm/dd/yyyy, allowing any combination of one or two digits for the day and month, and two or four digits for the year
      // eppPhone match extensible provisioning protocol format
      // nanpPhone match north american number plan format
      // time match hours, minutes, and seconds, 24-hour clock
      var regexes = {
          affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
          alphaNumeric: /^[A-Za-z0-9]+$/,
          caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
          creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
          dateString: /^(1[0-2]|0?[1-9])([\/-])(3[01]|[12][0-9]|0?[1-9])(?:\2)(?:[0-9]{2})?[0-9]{2}$/,
          email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, // eslint-disable-line no-control-regex
          eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
          hexadecimal: /^(?:0x)?[0-9a-fA-F]+$/,
          hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
          ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
          ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
          nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
          socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4}$/,
          timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
          ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
          url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
          usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/
      };

      function regexpCheck(regexp, regexes) {
          is[regexp] = function(value) {
              return regexes[regexp].test(value);
          };
      }

      // create regexp checks methods from 'regexes' object
      for (var regexp in regexes) {
          if (regexes.hasOwnProperty(regexp)) {
              regexpCheck(regexp, regexes);
          }
      }

      // simplify IP checks by calling the regex helpers for IPv4 and IPv6
      is.ip = function(value) {
          return is.ipv4(value) || is.ipv6(value);
      };

      // String checks
      /* -------------------------------------------------------------------------- */

      // is a given string or sentence capitalized?
      is.capitalized = function(string) {
          if (is.not.string(string)) {
              return false;
          }
          var words = string.split(' ');
          for (var i = 0; i < words.length; i++) {
              var word = words[i];
              if (word.length) {
                  var chr = word.charAt(0);
                  if (chr !== chr.toUpperCase()) {
                      return false;
                  }
              }
          }
          return true;
      };

      // is string end with a given target parameter?
      is.endWith = function(string, target) {
          if (is.not.string(string)) {
              return false;
          }
          target += '';
          var position = string.length - target.length;
          return position >= 0 && string.indexOf(target, position) === position;
      };
      // endWith method does not support 'all' and 'any' interfaces
      is.endWith.api = ['not'];

      // is a given string include parameter target?
      is.include = function(string, target) {
          return string.indexOf(target) > -1;
      };
      // include method does not support 'all' and 'any' interfaces
      is.include.api = ['not'];

      // is a given string all lowercase?
      is.lowerCase = function(string) {
          return is.string(string) && string === string.toLowerCase();
      };

      // is a given string palindrome?
      is.palindrome = function(string) {
          if (is.not.string(string)) {
              return false;
          }
          string = string.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
          var length = string.length - 1;
          for (var i = 0, half = Math.floor(length / 2); i <= half; i++) {
              if (string.charAt(i) !== string.charAt(length - i)) {
                  return false;
              }
          }
          return true;
      };

      // is a given value space?
      // horizantal tab: 9, line feed: 10, vertical tab: 11, form feed: 12, carriage return: 13, space: 32
      is.space = function(value) {
          if (is.not.char(value)) {
              return false;
          }
          var charCode = value.charCodeAt(0);
          return (charCode > 8 && charCode < 14) || charCode === 32;
      };

      // is string start with a given target parameter?
      is.startWith = function(string, target) {
          return is.string(string) && string.indexOf(target) === 0;
      };
      // startWith method does not support 'all' and 'any' interfaces
      is.startWith.api = ['not'];

      // is a given string all uppercase?
      is.upperCase = function(string) {
          return is.string(string) && string === string.toUpperCase();
      };

      // Time checks
      /* -------------------------------------------------------------------------- */

      var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

      // is a given dates day equal given day parameter?
      is.day = function(date, day) {
          return is.date(date) && day.toLowerCase() === days[date.getDay()];
      };
      // day method does not support 'all' and 'any' interfaces
      is.day.api = ['not'];

      // is a given date in daylight saving time?
      is.dayLightSavingTime = function(date) {
          var january = new Date(date.getFullYear(), 0, 1);
          var july = new Date(date.getFullYear(), 6, 1);
          var stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
          return date.getTimezoneOffset() < stdTimezoneOffset;
      };

      // is a given date future?
      is.future = function(date) {
          var now = new Date();
          return is.date(date) && date.getTime() > now.getTime();
      };

      // is date within given range?
      is.inDateRange = function(date, start, end) {
          if (is.not.date(date) || is.not.date(start) || is.not.date(end)) {
              return false;
          }
          var stamp = date.getTime();
          return stamp > start.getTime() && stamp < end.getTime();
      };
      // inDateRange method does not support 'all' and 'any' interfaces
      is.inDateRange.api = ['not'];

      // is a given date in last month range?
      is.inLastMonth = function(date) {
          return is.inDateRange(date, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date());
      };

      // is a given date in last week range?
      is.inLastWeek = function(date) {
          return is.inDateRange(date, new Date(new Date().setDate(new Date().getDate() - 7)), new Date());
      };

      // is a given date in last year range?
      is.inLastYear = function(date) {
          return is.inDateRange(date, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
      };

      // is a given date in next month range?
      is.inNextMonth = function(date) {
          return is.inDateRange(date, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)));
      };

      // is a given date in next week range?
      is.inNextWeek = function(date) {
          return is.inDateRange(date, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)));
      };

      // is a given date in next year range?
      is.inNextYear = function(date) {
          return is.inDateRange(date, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
      };

      // is the given year a leap year?
      is.leapYear = function(year) {
          return is.number(year) && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
      };

      // is a given dates month equal given month parameter?
      is.month = function(date, month) {
          return is.date(date) && month.toLowerCase() === months[date.getMonth()];
      };
      // month method does not support 'all' and 'any' interfaces
      is.month.api = ['not'];

      // is a given date past?
      is.past = function(date) {
          var now = new Date();
          return is.date(date) && date.getTime() < now.getTime();
      };

      // is a given date in the parameter quarter?
      is.quarterOfYear = function(date, quarter) {
          return is.date(date) && is.number(quarter) && quarter === Math.floor((date.getMonth() + 3) / 3);
      };
      // quarterOfYear method does not support 'all' and 'any' interfaces
      is.quarterOfYear.api = ['not'];

      // is a given date indicate today?
      is.today = function(date) {
          var now = new Date();
          var todayString = now.toDateString();
          return is.date(date) && date.toDateString() === todayString;
      };

      // is a given date indicate tomorrow?
      is.tomorrow = function(date) {
          var now = new Date();
          var tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString();
          return is.date(date) && date.toDateString() === tomorrowString;
      };

      // is a given date weekend?
      // 6: Saturday, 0: Sunday
      is.weekend = function(date) {
          return is.date(date) && (date.getDay() === 6 || date.getDay() === 0);
      };

      // is a given date weekday?
      is.weekday = not(is.weekend);

      // is a given dates year equal given year parameter?
      is.year = function(date, year) {
          return is.date(date) && is.number(year) && year === date.getFullYear();
      };
      // year method does not support 'all' and 'any' interfaces
      is.year.api = ['not'];

      // is a given date indicate yesterday?
      is.yesterday = function(date) {
          var now = new Date();
          var yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
          return is.date(date) && date.toDateString() === yesterdayString;
      };

      // Environment checks
      /* -------------------------------------------------------------------------- */

      var freeGlobal = is.windowObject(typeof global == 'object' && global) && global;
      var freeSelf = is.windowObject(typeof self == 'object' && self) && self;
      var thisGlobal = is.windowObject(typeof this == 'object' && this) && this;
      var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

      var document = freeSelf && freeSelf.document;
      var previousIs = root.is;

      // store navigator properties to use later
      var navigator = freeSelf && freeSelf.navigator;
      var appVersion = (navigator && navigator.appVersion || '').toLowerCase();
      var userAgent = (navigator && navigator.userAgent || '').toLowerCase();
      var vendor = (navigator && navigator.vendor || '').toLowerCase();

      // is current device android?
      is.android = function() {
          return /android/.test(userAgent);
      };
      // android method does not support 'all' and 'any' interfaces
      is.android.api = ['not'];

      // is current device android phone?
      is.androidPhone = function() {
          return /android/.test(userAgent) && /mobile/.test(userAgent);
      };
      // androidPhone method does not support 'all' and 'any' interfaces
      is.androidPhone.api = ['not'];

      // is current device android tablet?
      is.androidTablet = function() {
          return /android/.test(userAgent) && !/mobile/.test(userAgent);
      };
      // androidTablet method does not support 'all' and 'any' interfaces
      is.androidTablet.api = ['not'];

      // is current device blackberry?
      is.blackberry = function() {
          return /blackberry/.test(userAgent) || /bb10/.test(userAgent);
      };
      // blackberry method does not support 'all' and 'any' interfaces
      is.blackberry.api = ['not'];

      // is current browser chrome?
      // parameter is optional
      is.chrome = function(range) {
          var match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null;
          return match !== null && compareVersion(match[1], range);
      };
      // chrome method does not support 'all' and 'any' interfaces
      is.chrome.api = ['not'];

      // is current device desktop?
      is.desktop = function() {
          return is.not.mobile() && is.not.tablet();
      };
      // desktop method does not support 'all' and 'any' interfaces
      is.desktop.api = ['not'];

      // is current browser edge?
      // parameter is optional
      is.edge = function(range) {
          var match = userAgent.match(/edge\/(\d+)/);
          return match !== null && compareVersion(match[1], range);
      };
      // edge method does not support 'all' and 'any' interfaces
      is.edge.api = ['not'];

      // is current browser firefox?
      // parameter is optional
      is.firefox = function(range) {
          var match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
          return match !== null && compareVersion(match[1], range);
      };
      // firefox method does not support 'all' and 'any' interfaces
      is.firefox.api = ['not'];

      // is current browser internet explorer?
      // parameter is optional
      is.ie = function(range) {
          var match = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/);
          return match !== null && compareVersion(match[1], range);
      };
      // ie method does not support 'all' and 'any' interfaces
      is.ie.api = ['not'];

      // is current device ios?
      is.ios = function() {
          return is.iphone() || is.ipad() || is.ipod();
      };
      // ios method does not support 'all' and 'any' interfaces
      is.ios.api = ['not'];

      // is current device ipad?
      // parameter is optional
      is.ipad = function(range) {
          var match = userAgent.match(/ipad.+?os (\d+)/);
          return match !== null && compareVersion(match[1], range);
      };
      // ipad method does not support 'all' and 'any' interfaces
      is.ipad.api = ['not'];

      // is current device iphone?
      // parameter is optional
      is.iphone = function(range) {
          // original iPhone doesn't have the os portion of the UA
          var match = userAgent.match(/iphone(?:.+?os (\d+))?/);
          return match !== null && compareVersion(match[1] || 1, range);
      };
      // iphone method does not support 'all' and 'any' interfaces
      is.iphone.api = ['not'];

      // is current device ipod?
      // parameter is optional
      is.ipod = function(range) {
          var match = userAgent.match(/ipod.+?os (\d+)/);
          return match !== null && compareVersion(match[1], range);
      };
      // ipod method does not support 'all' and 'any' interfaces
      is.ipod.api = ['not'];

      // is current operating system linux?
      is.linux = function() {
          return /linux/.test(appVersion);
      };
      // linux method does not support 'all' and 'any' interfaces
      is.linux.api = ['not'];

      // is current operating system mac?
      is.mac = function() {
          return /mac/.test(appVersion);
      };
      // mac method does not support 'all' and 'any' interfaces
      is.mac.api = ['not'];

      // is current device mobile?
      is.mobile = function() {
          return is.iphone() || is.ipod() || is.androidPhone() || is.blackberry() || is.windowsPhone();
      };
      // mobile method does not support 'all' and 'any' interfaces
      is.mobile.api = ['not'];

      // is current state offline?
      is.offline = not(is.online);
      // offline method does not support 'all' and 'any' interfaces
      is.offline.api = ['not'];

      // is current state online?
      is.online = function() {
          return !navigator || navigator.onLine === true;
      };
      // online method does not support 'all' and 'any' interfaces
      is.online.api = ['not'];

      // is current browser opera?
      // parameter is optional
      is.opera = function(range) {
          var match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
          return match !== null && compareVersion(match[1], range);
      };
      // opera method does not support 'all' and 'any' interfaces
      is.opera.api = ['not'];

      // is current browser phantomjs?
      // parameter is optional
      is.phantom = function(range) {
          var match = userAgent.match(/phantomjs\/(\d+)/);
          return match !== null && compareVersion(match[1], range);
      };
      // phantom method does not support 'all' and 'any' interfaces
      is.phantom.api = ['not'];

      // is current browser safari?
      // parameter is optional
      is.safari = function(range) {
          var match = userAgent.match(/version\/(\d+).+?safari/);
          return match !== null && compareVersion(match[1], range);
      };
      // safari method does not support 'all' and 'any' interfaces
      is.safari.api = ['not'];

      // is current device tablet?
      is.tablet = function() {
          return is.ipad() || is.androidTablet() || is.windowsTablet();
      };
      // tablet method does not support 'all' and 'any' interfaces
      is.tablet.api = ['not'];

      // is current device supports touch?
      is.touchDevice = function() {
          return !!document && ('ontouchstart' in freeSelf ||
              ('DocumentTouch' in freeSelf && document instanceof DocumentTouch));
      };
      // touchDevice method does not support 'all' and 'any' interfaces
      is.touchDevice.api = ['not'];

      // is current operating system windows?
      is.windows = function() {
          return /win/.test(appVersion);
      };
      // windows method does not support 'all' and 'any' interfaces
      is.windows.api = ['not'];

      // is current device windows phone?
      is.windowsPhone = function() {
          return is.windows() && /phone/.test(userAgent);
      };
      // windowsPhone method does not support 'all' and 'any' interfaces
      is.windowsPhone.api = ['not'];

      // is current device windows tablet?
      is.windowsTablet = function() {
          return is.windows() && is.not.windowsPhone() && /touch/.test(userAgent);
      };
      // windowsTablet method does not support 'all' and 'any' interfaces
      is.windowsTablet.api = ['not'];

      // Object checks
      /* -------------------------------------------------------------------------- */

      // has a given object got parameterized count property?
      is.propertyCount = function(object, count) {
          if (is.not.object(object) || is.not.number(count)) {
              return false;
          }
          var n = 0;
          for (var property in object) {
              if (hasOwnProperty.call(object, property) && ++n > count) {
                  return false;
              }
          }
          return n === count;
      };
      // propertyCount method does not support 'all' and 'any' interfaces
      is.propertyCount.api = ['not'];

      // is given object has parameterized property?
      is.propertyDefined = function(object, property) {
          return is.object(object) && is.string(property) && property in object;
      };
      // propertyDefined method does not support 'all' and 'any' interfaces
      is.propertyDefined.api = ['not'];

      // Array checks
      /* -------------------------------------------------------------------------- */

      // is a given item in an array?
      is.inArray = function(value, array) {
          if (is.not.array(array)) {
              return false;
          }
          for (var i = 0; i < array.length; i++) {
              if (array[i] === value) {
                  return true;
              }
          }
          return false;
      };
      // inArray method does not support 'all' and 'any' interfaces
      is.inArray.api = ['not'];

      // is a given array sorted?
      is.sorted = function(array, sign) {
          if (is.not.array(array)) {
              return false;
          }
          var predicate = comparator[sign] || comparator['>='];
          for (var i = 1; i < array.length; i++) {
              if (!predicate(array[i], array[i - 1])) {
                  return false;
              }
          }
          return true;
      };

      // API
      // Set 'not', 'all' and 'any' interfaces to methods based on their api property
      /* -------------------------------------------------------------------------- */

      function setInterfaces() {
          var options = is;
          for (var option in options) {
              if (hasOwnProperty.call(options, option) && is['function'](options[option])) {
                  var interfaces = options[option].api || ['not', 'all', 'any'];
                  for (var i = 0; i < interfaces.length; i++) {
                      if (interfaces[i] === 'not') {
                          is.not[option] = not(is[option]);
                      }
                      if (interfaces[i] === 'all') {
                          is.all[option] = all(is[option]);
                      }
                      if (interfaces[i] === 'any') {
                          is.any[option] = any(is[option]);
                      }
                  }
              }
          }
      }
      setInterfaces();

      // Configuration methods
      // Intentionally added after setInterfaces function
      /* -------------------------------------------------------------------------- */

      // change namespace of library to prevent name collisions
      // var preferredName = is.setNamespace();
      // preferredName.odd(3);
      // => true
      is.setNamespace = function() {
          root.is = previousIs;
          return this;
      };

      // set optional regexes to methods
      is.setRegexp = function(regexp, name) {
          for (var r in regexes) {
              if (hasOwnProperty.call(regexes, r) && (name === r)) {
                  regexes[r] = regexp;
              }
          }
      };

      return is;
  }));

  var Is_js = /*#__PURE__*/Object.freeze({

  });

  function get(dict, k) {
    if ((k in dict)) {
      return some(dict[k]);
    }
    
  }
  /* No side effect */

  function decodeString(json) {
    if (typeof json === "string") {
      return json;
    }
    
  }

  function decodeObject(json) {
    if (typeof json === "object" && !Array.isArray(json) && json !== null) {
      return some(json);
    }
    
  }

  function decodeArray(json) {
    if (Array.isArray(json)) {
      return json;
    }
    
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 5.0.2, PLEASE EDIT WITH CARE

  function concatValidation(v1, v2) {
    if (v1.tag) {
      if (v2.tag) {
        return /* Fail */__(1, [concat(/* :: */[
                        v1[0],
                        /* :: */[
                          v2[0],
                          /* [] */0
                        ]
                      ])]);
      } else {
        return v1;
      }
    } else {
      return v2;
    }
  }

  function combineValidation(validations) {
    if (validations) {
      var vs = validations[1];
      var v = validations[0];
      if (vs) {
        if (vs[1]) {
          return concatValidation(v, combineValidation(vs));
        } else {
          return concatValidation(v, vs[0]);
        }
      } else {
        return v;
      }
    } else {
      return /* Success */__(0, [
                "",
                null
              ]);
    }
  }

  function bothValidation(v1, v2) {
    if (v1.tag) {
      if (v2.tag) {
        return concatValidation(v1, v2);
      } else {
        return v2;
      }
    } else {
      return v1;
    }
  }

  function anyValidation(validations) {
    if (validations) {
      var vs = validations[1];
      var v = validations[0];
      if (vs) {
        if (vs[1]) {
          if (v.tag) {
            return concatValidation(v, anyValidation(vs));
          } else {
            return v;
          }
        } else {
          return bothValidation(v, vs[0]);
        }
      } else {
        return v;
      }
    } else {
      return /* Success */__(0, [
                "",
                null
              ]);
    }
  }

  function list(validator, value, path) {
    var match = decodeArray(value);
    if (match !== undefined) {
      var valueList = fromArray(match);
      return combineValidation(mapi$1((function (i, v) {
                        return doValidation(validator, v, String(i));
                      }), valueList));
    } else {
      return /* Fail */__(1, [/* :: */[
                  /* record */[
                    /* path */path,
                    /* message */"not a list",
                    /* label */"list"
                  ],
                  /* [] */0
                ]]);
    }
  }

  function record$1(record$1, value, path) {
    var match = decodeObject(value);
    if (match !== undefined) {
      var value$1 = valFromOption(match);
      var validatorKeys = Object.keys(record$1);
      var validationArray = validatorKeys.map((function (vkey) {
              var mVal = get(value$1, vkey);
              if (mVal !== undefined) {
                return doValidation(record$1[vkey], valFromOption(mVal), vkey);
              } else {
                var match = doValidation(record$1[vkey], null, vkey);
                if (match.tag) {
                  return /* Fail */__(1, [/* :: */[
                              /* record */[
                                /* path */path,
                                /* message */"key: " + (vkey + " not found"),
                                /* label */"key"
                              ],
                              /* [] */0
                            ]]);
                } else {
                  return /* Success */__(0, [
                            match[0],
                            match[1]
                          ]);
                }
              }
            }));
      return combineValidation(fromArray(validationArray));
    } else {
      return /* Fail */__(1, [/* :: */[
                  /* record */[
                    /* path */path,
                    /* message */"not an object",
                    /* label */"record"
                  ],
                  /* [] */0
                ]]);
    }
  }

  function tuple(validators, value, path) {
    var match = decodeArray(value);
    if (match !== undefined) {
      var value$1 = match;
      var validatorList = fromArray(validators);
      var valueMax = value$1.length - 1 | 0;
      return combineValidation(mapi$1((function (i, v) {
                        var indexStr = String(i);
                        var match = i <= valueMax;
                        if (match) {
                          return doValidation(v, caml_array_get(value$1, i), indexStr);
                        } else {
                          return /* Fail */__(1, [/* :: */[
                                      /* record */[
                                        /* path */path,
                                        /* message */"index: " + (indexStr + " out of range"),
                                        /* label */"index"
                                      ],
                                      /* [] */0
                                    ]]);
                        }
                      }), validatorList));
    } else {
      return /* Fail */__(1, [/* :: */[
                  /* record */[
                    /* path */path,
                    /* message */"not a tuple",
                    /* label */"tuple"
                  ],
                  /* [] */0
                ]]);
    }
  }

  function vNot(validator, value, path) {
    var match = doValidation(validator, value, path);
    if (match.tag) {
      return /* Success */__(0, [
                "not",
                value
              ]);
    } else {
      return /* Fail */__(1, [/* :: */[
                  /* record */[
                    /* path */path,
                    /* message */JSON.stringify(match[1]) + (" is a " + match[0]),
                    /* label */"not"
                  ],
                  /* [] */0
                ]]);
    }
  }

  function any(validators, value, path) {
    var validations = validators.map((function (v) {
            return doValidation(v, value, path);
          }));
    return anyValidation(fromArray(validations));
  }

  function all(validators, value, path) {
    var validations = validators.map((function (v) {
            return doValidation(v, value, path);
          }));
    return combineValidation(fromArray(validations));
  }

  function custom(customV, value, path) {
    var match = _1(customV.validator, value);
    if (match) {
      return /* Success */__(0, [
                customV.label,
                value
              ]);
    } else {
      return /* Fail */__(1, [/* :: */[
                  /* record */[
                    /* path */path,
                    /* message */_1(customV.message, value),
                    /* label */customV.label
                  ],
                  /* [] */0
                ]]);
    }
  }

  var partial_arg = {
    validator: (function (prim) {
        return undefined(prim);
      }),
    message: (function (value) {
        return JSON.stringify(value) + " is not a number";
      }),
    label: "number"
  };

  function number(param, param$1) {
    return custom(partial_arg, param, param$1);
  }

  var partial_arg$1 = {
    validator: (function (prim) {
        return undefined(prim);
      }),
    message: (function (value) {
        return JSON.stringify(value) + " is not a string";
      }),
    label: "string"
  };

  function string(param, param$1) {
    return custom(partial_arg$1, param, param$1);
  }

  var partial_arg$2 = {
    validator: (function (prim) {
        return undefined(prim);
      }),
    message: (function (value) {
        return JSON.stringify(value) + " is not undefined";
      }),
    label: "undefined"
  };

  function _undefined(param, param$1) {
    return custom(partial_arg$2, param, param$1);
  }

  var partial_arg$3 = {
    validator: (function (prim) {
        return undefined(prim);
      }),
    message: (function (value) {
        return JSON.stringify(value) + " is not null";
      }),
    label: "null"
  };

  function _null(param, param$1) {
    return custom(partial_arg$3, param, param$1);
  }

  function maxStringLength($$int) {
    var validator = function (value) {
      var match = decodeString(value);
      if (match !== undefined) {
        return match.length <= $$int;
      } else {
        return false;
      }
    };
    var partial_arg = {
      validator: validator,
      message: (function (value) {
          return JSON.stringify(value) + (" is greater than " + $$int.toString());
        }),
      label: "maxStringLength"
    };
    return (function (param, param$1) {
        return custom(partial_arg, param, param$1);
      });
  }

  function minStringLength($$int) {
    var validator = function (value) {
      var match = decodeString(value);
      if (match !== undefined) {
        return match.length >= $$int;
      } else {
        return false;
      }
    };
    var partial_arg = {
      validator: validator,
      message: (function (value) {
          return JSON.stringify(value) + (" is less than " + $$int.toString());
        }),
      label: "maxStringLength"
    };
    return (function (param, param$1) {
        return custom(partial_arg, param, param$1);
      });
  }

  var partial_arg$4 = /* array */[
    _null,
    _undefined
  ];

  function partial_arg$5(param, param$1) {
    return any(partial_arg$4, param, param$1);
  }

  function exists(param, param$1) {
    return vNot(partial_arg$5, param, param$1);
  }

  function optional(validator) {
    var partial_arg = /* array */[
      (function (param, param$1) {
          return vNot(exists, param, param$1);
        }),
      validator
    ];
    return (function (param, param$1) {
        return any(partial_arg, param, param$1);
      });
  }
  /* is_js Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 5.0.2, PLEASE EDIT WITH CARE

  function list$1(validator) {
    return (function (param, param$1) {
        return list(validator, param, param$1);
      });
  }

  function tuple$1(validator) {
    return (function (param, param$1) {
        return tuple(validator, param, param$1);
      });
  }

  function record$2(validator) {
    return (function (param, param$1) {
        return record$1(validator, param, param$1);
      });
  }

  var maxStringLength$1 = maxStringLength;

  var minStringLength$1 = minStringLength;

  function any$1(validators) {
    return (function (param, param$1) {
        return any(validators, param, param$1);
      });
  }

  function all$1(validators) {
    return (function (param, param$1) {
        return all(validators, param, param$1);
      });
  }

  var optional$1 = optional;

  function custom$1(customV) {
    return (function (param, param$1) {
        return custom(customV, param, param$1);
      });
  }

  function number$1(value) {
    return (function (param) {
        return number(value, param);
      });
  }

  function string$1(value) {
    return (function (param) {
        return string(value, param);
      });
  }

  function _undefined$1(value) {
    return (function (param) {
        return _undefined(value, param);
      });
  }

  function _null$1(value) {
    return (function (param) {
        return _null(value, param);
      });
  }

  function not(validator) {
    return (function (param, param$1) {
        return vNot(validator, param, param$1);
      });
  }

  function exists$1(value) {
    return (function (param) {
        return exists(value, param);
      });
  }

  var validate$1 = validate;
  /* Validators-Bouncer Not a pure module */

  exports._null = _null$1;
  exports._undefined = _undefined$1;
  exports.all = all$1;
  exports.any = any$1;
  exports.custom = custom$1;
  exports.exists = exists$1;
  exports.list = list$1;
  exports.maxStringLength = maxStringLength$1;
  exports.minStringLength = minStringLength$1;
  exports.not = not;
  exports.number = number$1;
  exports.optional = optional$1;
  exports.record = record$2;
  exports.string = string$1;
  exports.tuple = tuple$1;
  exports.validate = validate$1;

  return exports;

}({}));
