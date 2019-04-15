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
  value =>
    isNumber(value) ?
      Success :
      Fail([
        {path: "", message: Js.Json.stringify(value) ++ " is not a number"},
      ]);

let list =
  (. validator: Index.validator) =>
    (. value: Js.Array.t(Index.value)) => (
      {
        let valueList = Belt.List.fromArray(value);
        let validationList =
          List.map(Index.doValidation(validator), valueList);
        combineValidation(validationList);
      }: Index.validation
    );

[@bs.deriving abstract]
type customV = {
  validator: Index.value => bool,
  message: Index.value => string,
};
let custom =
  (. customV: customV) =>
    (. value: value) => (
      validatorGet(customV, value) ?
        Success : Fail([{path: "", message: messageGet(customV, value)}]): Index.validation
    );