'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function caml_make_vect(len, init) {
  var b = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    b[i] = init;
  }
  return b;
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

function caml_is_extension(e) {
  if (e === undefined) {
    return false;
  } else if (e.tag === 248) {
    return true;
  } else {
    var slot = e[0];
    if (slot !== undefined) {
      return slot.tag === 248;
    } else {
      return false;
    }
  }
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

function rev_append(_l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      _l2 = /* :: */[
        l1[0],
        l2
      ];
      _l1 = l1[1];
      continue ;
    } else {
      return l2;
    }
  }}

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

function find_all(p) {
  return (function (param) {
      var _accu = /* [] */0;
      var _param = param;
      while(true) {
        var param$1 = _param;
        var accu = _accu;
        if (param$1) {
          var l = param$1[1];
          var x = param$1[0];
          if (_1(p, x)) {
            _param = l;
            _accu = /* :: */[
              x,
              accu
            ];
            continue ;
          } else {
            _param = l;
            continue ;
          }
        } else {
          return rev_append(accu, /* [] */0);
        }
      }    });
}

var concat = flatten;

var filter = find_all;
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

var $$Error = create("Caml_js_exceptions.Error");

function internalToOCamlException(e) {
  if (caml_is_extension(e)) {
    return e;
  } else {
    return [
            $$Error,
            e
          ];
  }
}
/* No side effect */

function map$1(f, a) {
  var l = a.length;
  if (l === 0) {
    return /* array */[];
  } else {
    var r = caml_make_vect(l, _1(f, a[0]));
    for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = _1(f, a[i]);
    }
    return r;
  }
}

function to_list(a) {
  var _i = a.length - 1 | 0;
  var _res = /* [] */0;
  while(true) {
    var res = _res;
    var i = _i;
    if (i < 0) {
      return res;
    } else {
      _res = /* :: */[
        a[i],
        res
      ];
      _i = i - 1 | 0;
      continue ;
    }
  }}

function list_length(_accu, _param) {
  while(true) {
    var param = _param;
    var accu = _accu;
    if (param) {
      _param = param[1];
      _accu = accu + 1 | 0;
      continue ;
    } else {
      return accu;
    }
  }}

function of_list(l) {
  if (l) {
    var a = caml_make_vect(list_length(0, l), l[0]);
    var _i = 1;
    var _param = l[1];
    while(true) {
      var param = _param;
      var i = _i;
      if (param) {
        a[i] = param[0];
        _param = param[1];
        _i = i + 1 | 0;
        continue ;
      } else {
        return a;
      }
    }  } else {
    return /* array */[];
  }
}

var Bottom = create("Array.Bottom");
/* No side effect */

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

function decodeNumber(json) {
  if (typeof json === "number") {
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

function doValidate(schema, value, path) {
  return _2(schema[/* validator */0], value, path);
}

function validationToOutput(validation) {
  if (validation.tag) {
    return of_list(validation[0]).map((function (c) {
                  return {
                          path: c[/* path */0],
                          target: c[/* value */1],
                          name: c[/* name */2]
                        };
                }));
  } else {
    return /* array */[];
  }
}

function concatValidations(v1, v2) {
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

function combineValidations(validations) {
  if (validations) {
    var vs = validations[1];
    var v = validations[0];
    if (vs) {
      if (vs[1]) {
        return concatValidations(v, combineValidations(vs));
      } else {
        return concatValidations(v, vs[0]);
      }
    } else {
      return v;
    }
  } else {
    return /* Success */__(0, [/* record */[
                /* path */"",
                /* value */null,
                /* name */""
              ]]);
  }
}

function validate(schema, value) {
  return validationToOutput(_2(schema[/* validator */0], value, ""));
}

function number_000(value, path) {
  var match = decodeNumber(value);
  if (match !== undefined) {
    return /* Success */__(0, [/* record */[
                /* path */path,
                /* value */value,
                /* name */"number"
              ]]);
  } else {
    return /* Fail */__(1, [/* :: */[
                /* record */[
                  /* path */path,
                  /* value */value,
                  /* name */"number"
                ],
                /* [] */0
              ]]);
  }
}

var number = /* record */[
  number_000,
  /* name */"number"
];

function string_000(value, path) {
  var match = decodeString(value);
  if (match !== undefined) {
    return /* Success */__(0, [/* record */[
                /* path */path,
                /* value */value,
                /* name */"string"
              ]]);
  } else {
    return /* Fail */__(1, [/* :: */[
                /* record */[
                  /* path */path,
                  /* value */value,
                  /* name */"string"
                ],
                /* [] */0
              ]]);
  }
}

var string = /* record */[
  string_000,
  /* name */"string"
];

function custom(validator, name) {
  return /* record */[
          /* validator */(function (value, path) {
              var match = _1(validator, value);
              if (match) {
                return /* Success */__(0, [/* record */[
                            /* path */path,
                            /* value */value,
                            /* name */name
                          ]]);
              } else {
                return /* Fail */__(1, [/* :: */[
                            /* record */[
                              /* path */path,
                              /* value */value,
                              /* name */name
                            ],
                            /* [] */0
                          ]]);
              }
            }),
          /* name */name
        ];
}

function listValidator(schema, value, path) {
  var match = decodeArray(value);
  if (match !== undefined) {
    return combineValidations(to_list(match.map((function (v, i) {
                          var path = String(i);
                          return _2(schema[/* validator */0], v, path);
                        }))));
  } else {
    return /* Fail */__(1, [/* :: */[
                /* record */[
                  /* path */path,
                  /* value */value,
                  /* name */"list"
                ],
                /* [] */0
              ]]);
  }
}

function list(schema) {
  return /* record */[
          /* validator */(function (param, param$1) {
              return listValidator(schema, param, param$1);
            }),
          /* name */"list"
        ];
}

function recordValidator(schemaDict, value, path) {
  var match = decodeObject(value);
  if (match !== undefined) {
    var record = valFromOption(match);
    var keys = Object.keys(schemaDict);
    return combineValidations(to_list(map$1((function (key) {
                          var match = get(record, key);
                          if (match !== undefined) {
                            var schema = schemaDict[key];
                            return _2(schema[/* validator */0], valFromOption(match), key);
                          } else {
                            return /* Fail */__(1, [/* :: */[
                                        /* record */[
                                          /* path */key,
                                          /* value */value,
                                          /* name */"key"
                                        ],
                                        /* [] */0
                                      ]]);
                          }
                        }), keys)));
  } else {
    return /* Fail */__(1, [/* :: */[
                /* record */[
                  /* path */path,
                  /* value */value,
                  /* name */"record"
                ],
                /* [] */0
              ]]);
  }
}

function record$1(schemaDict) {
  return /* record */[
          /* validator */(function (param, param$1) {
              return recordValidator(schemaDict, param, param$1);
            }),
          /* name */"record"
        ];
}

function tupleValidator(schemas, value, path) {
  var match = decodeArray(value);
  if (match !== undefined) {
    var tuple = match;
    return combineValidations(to_list(schemas.map((function (schema, i) {
                          var exit = 0;
                          var v;
                          try {
                            v = caml_array_get(tuple, i);
                            exit = 1;
                          }
                          catch (raw_exn){
                            var exn = internalToOCamlException(raw_exn);
                            if (exn[0] === invalid_argument) {
                              return /* Fail */__(1, [/* :: */[
                                          /* record */[
                                            /* path */String(i),
                                            /* value */value,
                                            /* name */"index"
                                          ],
                                          /* [] */0
                                        ]]);
                            } else {
                              throw exn;
                            }
                          }
                          if (exit === 1) {
                            var path = String(i);
                            return _2(schema[/* validator */0], v, path);
                          }
                          
                        }))));
  } else {
    return /* Fail */__(1, [/* :: */[
                /* record */[
                  /* path */path,
                  /* value */value,
                  /* name */"tuple"
                ],
                /* [] */0
              ]]);
  }
}

function tuple(schemas) {
  return /* record */[
          /* validator */(function (param, param$1) {
              return tupleValidator(schemas, param, param$1);
            }),
          /* name */"tuple"
        ];
}

function not(schema) {
  return /* record */[
          /* validator */(function (value, path) {
              var match = _2(schema[/* validator */0], value, path);
              if (match.tag) {
                return /* Success */__(0, [/* record */[
                            /* path */path,
                            /* value */value,
                            /* name */"not " + schema[/* name */1]
                          ]]);
              } else {
                return /* Fail */__(1, [/* :: */[
                            /* record */[
                              /* path */path,
                              /* value */value,
                              /* name */"not " + schema[/* name */1]
                            ],
                            /* [] */0
                          ]]);
              }
            }),
          /* name */"not " + schema[/* name */1]
        ];
}

function anyValidations(validations, value, path, name) {
  var fails = filter((function (v) {
            if (v.tag) {
              return false;
            } else {
              return true;
            }
          }))(validations);
  if (fails) {
    return /* Success */__(0, [/* record */[
                /* path */path,
                /* value */value,
                /* name */name
              ]]);
  } else {
    return /* Fail */__(1, [/* :: */[
                /* record */[
                  /* path */path,
                  /* value */value,
                  /* name */name
                ],
                /* [] */0
              ]]);
  }
}

function any(schemas) {
  var schemaNames = map$1((function (s) {
            return s[/* name */1];
          }), schemas).reduce((function (a, b) {
          return a + (" " + b);
        }), "");
  var name = "any:" + schemaNames;
  return /* record */[
          /* validator */(function (value, path) {
              return anyValidations(map((function (s) {
                                return _2(s[/* validator */0], value, path);
                              }), to_list(schemas)), value, path, name);
            }),
          /* name */name
        ];
}

function all(schemas) {
  return /* record */[
          /* validator */(function (value, path) {
              return combineValidations(map((function (s) {
                                return _2(s[/* validator */0], value, path);
                              }), to_list(schemas)));
            }),
          /* name */"all"
        ];
}

function minStringLength(l) {
  var name = "minStringLength: " + String(l);
  var validator = function (value, path) {
    var match = decodeString(value);
    if (match !== undefined) {
      var match$1 = match.length >= l;
      if (match$1) {
        return /* Success */__(0, [/* record */[
                    /* path */path,
                    /* value */value,
                    /* name */name
                  ]]);
      } else {
        return /* Fail */__(1, [/* :: */[
                    /* record */[
                      /* path */path,
                      /* value */value,
                      /* name */name
                    ],
                    /* [] */0
                  ]]);
      }
    } else {
      return /* Fail */__(1, [/* :: */[
                  /* record */[
                    /* path */path,
                    /* value */value,
                    /* name */name
                  ],
                  /* [] */0
                ]]);
    }
  };
  return /* record */[
          /* validator */validator,
          /* name */name
        ];
}

function maxStringLength(l) {
  var name = "maxStringLength: " + String(l);
  var validator = function (value, path) {
    var match = decodeString(value);
    if (match !== undefined) {
      var match$1 = match.length <= l;
      if (match$1) {
        return /* Success */__(0, [/* record */[
                    /* path */path,
                    /* value */value,
                    /* name */name
                  ]]);
      } else {
        return /* Fail */__(1, [/* :: */[
                    /* record */[
                      /* path */path,
                      /* value */value,
                      /* name */name
                    ],
                    /* [] */0
                  ]]);
      }
    } else {
      return /* Fail */__(1, [/* :: */[
                  /* record */[
                    /* path */path,
                    /* value */value,
                    /* name */name
                  ],
                  /* [] */0
                ]]);
    }
  };
  return /* record */[
          /* validator */validator,
          /* name */name
        ];
}
/* No side effect */

exports.all = all;
exports.any = any;
exports.anyValidations = anyValidations;
exports.combineValidations = combineValidations;
exports.concatValidations = concatValidations;
exports.custom = custom;
exports.doValidate = doValidate;
exports.list = list;
exports.listValidator = listValidator;
exports.maxStringLength = maxStringLength;
exports.minStringLength = minStringLength;
exports.not = not;
exports.number = number;
exports.record = record$1;
exports.recordValidator = recordValidator;
exports.string = string;
exports.tuple = tuple;
exports.tupleValidator = tupleValidator;
exports.validate = validate;
exports.validationToOutput = validationToOutput;
