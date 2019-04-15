type value = Js.Json.t;
[@bs.module "is_js"] external isNumber: value => bool = "number";

[@bs.deriving abstract]
type jsFailure = {
  path: string,
  message: string,
};

type failure = {
  path: string,
  message: string,
};

type validation =
  | Success
  | Fail(list(failure));

type validator = (value, string) => validation;

let convertToJs = (validation: validation): Js.Array.t(jsFailure) =>
  switch (validation) {
  | Success => [||]
  | Fail(failures) =>
    failures
    |> List.map(f => jsFailure(~path=f.path, ~message=f.message))
    |> Belt.List.toArray
  };

let doValidation =
    (validator: validator, value: value, path: string): validation =>
  validator(value, path);

let validate = (validator: validator, value: value): Js.Array.t(jsFailure) => {
  let validation = doValidation(validator, value, "");
  convertToJs(validation);
};