open Shared;

[@bs.module "is_js"] external isNumber: value => bool = "number";
[@bs.module "is_js"] external isString: value => bool = "string";
[@bs.module "is_js"] external isUndefined: value => bool = "undefined";
[@bs.module "is_js"] external isNull: value => bool = "null";

let concatValidation = (v1: validation, v2: validation): validation =>
  switch (v1) {
  | Success(_) => v2
  | Fail(failures) =>
    switch (v2) {
    | Success(_) => v1
    | Fail(f2) => Fail(List.concat([failures, f2]))
    }
  };

let rec combineValidation = (validations: list(validation)): validation =>
  switch (validations) {
  | [] => Success("", Js.Json.null)
  | [v] => v
  | [v1, v2] => concatValidation(v1, v2)
  | [v, ...vs] => concatValidation(v, combineValidation(vs))
  };

let bothValidation = (v1: validation, v2: validation): validation =>
  switch (v1) {
  | Success(_) => v1
  | Fail(_) =>
    switch (v2) {
    | Success(_) => v2
    | Fail(_) => concatValidation(v1, v2)
    }
  };

let rec anyValidation = (validations: list(validation)): validation =>
  switch (validations) {
  | [] => Success("", Js.Json.null)
  | [v] => v
  | [v1, v2] => bothValidation(v1, v2)
  | [v, ...vs] =>
    switch (v) {
    | Success(_) => v
    | Fail(_) => concatValidation(v, anyValidation(vs))
    }
  };

type listT = validator => (. value, string) => validation;
let list: listT =
  validator =>
    (. value, path) =>
      switch (Js.Json.decodeArray(value)) {
      | Some(value) =>
        let valueList = Belt.List.fromArray(value);
        let validationList =
          List.mapi(
            (i, v) =>
              Index.doValidation(validator, v, Belt.Int.toString(i)),
            valueList,
          );
        combineValidation(validationList);
      | None => Fail([{path, message: "not a list", label: "list"}])
      };

type recordT = Js.Dict.t(validator) => (. value, string) => validation;
let record: recordT =
  record =>
    (. value, path) =>
      switch (Js.Json.decodeObject(value)) {
      | None => Fail([{path, message: "not an object", label: "record"}])
      | Some(value) =>
        let validatorKeys = Js.Dict.keys(record);
        let validationArray =
          Js.Array.map(
            vkey => {
              let mVal = Js.Dict.get(value, vkey);
              switch (mVal) {
              | Some(v) =>
                Index.doValidation(Js.Dict.unsafeGet(record, vkey), v, vkey)
              | None =>
                Fail([
                  {
                    path,
                    message: "key: " ++ vkey ++ " not found",
                    label: "key",
                  },
                ])
              };
            },
            validatorKeys,
          );
        combineValidation(Belt.List.fromArray(validationArray));
      };

type tupleT = Js.Array.t(validator) => (. value, string) => validation;
let tuple: tupleT =
  validators =>
    (. value, path) =>
      switch (Js.Json.decodeArray(value)) {
      | None => Fail([{path, message: "not a tuple", label: "tuple"}])
      | Some(value) =>
        let validatorList = Belt.List.fromArray(validators);
        let valueMax = Array.length(value) - 1;
        let validations =
          List.mapi(
            (i, v) => {
              let indexStr = Belt.Int.toString(i);
              i <= valueMax ?
                Index.doValidation(v, value[i], indexStr) :
                Fail([
                  {
                    path,
                    message: "index: " ++ indexStr ++ " out of range",
                    label: "index",
                  },
                ]);
            },
            validatorList,
          );
        combineValidation(validations);
      };

type notT = validator => (. value, string) => validation;
let (!): notT =
  validator =>
    (. value, path) =>
      switch (Index.doValidation(validator, value, path)) {
      | Success(label, value) =>
        Fail([
          {
            path,
            message: Js.Json.stringify(value) ++ " is a " ++ label,
            label: "not",
          },
        ])
      | Fail(_) => Success("not", value)
      };

type anyT = Js.Array.t(validator) => (. value, string) => validation;
let any = validators =>
  (. value, path) => {
    let validations =
      Js.Array.map(v => Index.doValidation(v, value, path), validators);
    anyValidation(Belt.List.fromArray(validations));
  };

[@bs.deriving abstract]
type customV = {
  validator: value => bool,
  message: value => string,
  label: string,
};

let custom = (customV: customV) =>
  (. value: value, path: string) => (
    validatorGet(customV, value) ?
      Success(labelGet(customV), value) :
      Fail([
        {
          path,
          message: messageGet(customV, value),
          label: labelGet(customV),
        },
      ]): validation
  );

let number =
  custom(
    customV(
      ~validator=isNumber,
      ~message=value => Js.Json.stringify(value) ++ " is not a number",
      ~label="number",
    ),
  );

let string =
  custom(
    customV(
      ~validator=isString,
      ~message=value => Js.Json.stringify(value) ++ " is not a string",
      ~label="string",
    ),
  );

let _undefined =
  custom(
    customV(
      ~validator=isUndefined,
      ~message=value => Js.Json.stringify(value) ++ " is not undefined",
      ~label="undefined",
    ),
  );

let _null =
  custom(
    customV(
      ~validator=isNull,
      ~message=value => Js.Json.stringify(value) ++ " is not null",
      ~label="null",
    ),
  );

let exists = any([|string|]);