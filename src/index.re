open Shared;

let convertToJs = (validation: validation): Js.Array.t(jsFailure) =>
  switch (validation) {
  | Success(_) => [||]
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