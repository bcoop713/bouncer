type value = Js.Json.t;
[@bs.module "is_js"] external isNumber: value => bool = "number";

let concatValidation =
    (v1: Index.validation, v2: Index.validation): Index.validation =>
  switch (v1) {
  | Success => v2
  | Fail(failures) =>
    switch (v2) {
    | Success => v1
    | Fail(f2) => Fail(List.concat([failures, f2]))
    }
  };

let rec combineValidation =
        (validations: list(Index.validation)): Index.validation =>
  switch (validations) {
  | [] => Success
  | [v] => v
  | [v1, v2] => concatValidation(v1, v2)
  | [v, ...vs] => concatValidation(v, combineValidation(vs))
  };

let number: Index.validator =
  (value, path) =>
    isNumber(value) ?
      Success :
      Fail([
        {path, message: Js.Json.stringify(value) ++ " is not a number"},
      ]);

let list =
  (. validator: Index.validator) =>
    (. value: Js.Array.t(Index.value), path: string) => (
      {
        let valueList = Belt.List.fromArray(value);
        let validationList =
          List.mapi(
            (i, v) =>
              Index.doValidation(validator, v, Belt.Int.toString(i)),
            valueList,
          );
        combineValidation(validationList);
      }: Index.validation
    );

let record =
  (. record: Js.Dict.t(Index.validator)) =>
    (. value: Js.Dict.t(Index.value), path: string) => {
        let validatorKeys = Js.Dict.keys(record)
        let validationArray = Js.Array.map(vkey => {
            let mVal = Js.Dict.get(value, vkey)
            switch(mVal) {
            | Some(v) => Index.doValidation(Js.Dict.unsafeGet(record, vkey), v, vkey)
            | None => Fail([{path: path, message: "key: " ++ vkey ++ " not found"}])
            }
        },validatorKeys)
        combineValidation(Belt.List.fromArray(validationArray))
    };

[@bs.deriving abstract]
type customV = {
  validator: Index.value => bool,
  message: Index.value => string,
};
let custom =
  (. customV: customV) =>
    (. value: value, path: string) => (
      validatorGet(customV, value) ?
        Success : Fail([{path, message: messageGet(customV, value)}]): Index.validation
    );