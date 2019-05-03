type value = Js.Json.t;

[@bs.deriving abstract]
type jsFailure = {
  path: string,
  message: string,
};

type failure = {
  path: string,
  message: string,
  label: string,
};

type node = {_type: string};

type schema = {
  node,
  next: list(unit => schema),
};

type validation =
  | Success(string, value)
  | Fail(list(failure));

type validator = (value, string) => validation;