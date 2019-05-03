type value = Js.Json.t;
type label = string;
type explanation = string;
type path = string;
type name = string;
type description = option(string);
type component = string;

type context = {
  path,
  value,
  name,
};

[@bs.deriving abstract]
type output =
  Js.Array.t({
    .
    "path": path,
    "target": value,
    "name": name,
  });

type validation =
  | Success(context)
  | Fail(list(context));

type validator = (value, path) => validation;

type schema = {
  validator,
  name,
};

let doValidate = (schema: schema, value: value, path: path): validation =>
  schema.validator(value, path);

let validationToOutput = (validation: validation): output =>
  switch (validation) {
  | Success(_) => [||]
  | Fail(contexts) =>
    contexts
    |> Array.of_list
    |> Js.Array.map(c => {"path": c.path, "target": c.value, "name": c.name})
  };

let concatValidations = (v1: validation, v2: validation): validation =>
  switch (v1) {
  | Success(_) => v2
  | Fail(contexts) =>
    switch (v2) {
    | Success(_) => v1
    | Fail(moreContexts) => Fail(List.concat([contexts, moreContexts]))
    }
  };

let rec combineValidations = (validations: list(validation)): validation =>
  switch (validations) {
  | [] => Success({path: "", value: Js.Json.null, name: ""})
  | [v] => v
  | [v1, v2] => concatValidations(v1, v2)
  | [v, ...vs] => concatValidations(v, combineValidations(vs))
  };

let validate = (schema: schema, value: value): output =>
  doValidate(schema, value, "") |> validationToOutput;

let number: schema = {
  validator: (value, path) =>
    switch (Js.Json.decodeNumber(value)) {
    | Some(_) => Success({path, value, name: "number"})
    | None => Fail([{path, value, name: "number"}])
    },
  name: "number",
};

let string: schema = {
  validator: (value, path) =>
    switch (Js.Json.decodeString(value)) {
    | Some(_) => Success({path, value, name: "string"})
    | None => Fail([{path, value, name: "string"}])
    },
  name: "string",
};

let custom = (validator: value => bool, name: string): schema => {
  validator: (value, path) => 
  switch(validator(value)) {
  | true => Success({path, value, name})
  | false => Fail([{path, value, name}])
  },
  name
}

let listValidator = (schema: schema, value: value, path: path): validation =>
  switch (Js.Json.decodeArray(value)) {
  | Some(values) =>
    let validations =
      Js.Array.mapi(
        (v, i) => doValidate(schema, v, string_of_int(i)),
        values,
      )
      |> Array.to_list;
    combineValidations(validations);
  | None => Fail([{path, value, name: "list"}])
  };

let list = (schema: schema): schema => {
  validator: listValidator(schema),
  name: "list",
};

let recordValidator =
    (schemaDict: Js.Dict.t(schema), value: value, path: path): validation =>
  switch (Js.Json.decodeObject(value)) {
  | None => Fail([{path, value, name: "record"}])
  | Some(record) =>
    let keys = Js.Dict.keys(schemaDict);
    let validations =
      keys
      |> Array.map(key =>
           switch (Js.Dict.get(record, key)) {
           | Some(v) =>
             doValidate(Js.Dict.unsafeGet(schemaDict, key), v, key)
           | None => Fail([{path: key, value, name: "key"}])
           }
         )
         |> Array.to_list
    combineValidations(validations)
    
  };


let record = (schemaDict: Js.Dict.t(schema)): schema => {
  validator: recordValidator(schemaDict),
  name: "record",
};

let tupleValidator = (schemas: Js.Array.t(schema), value: value, path: path): validation =>
  switch (Js.Json.decodeArray(value)) {
  | None => Fail([{path, value, name: "tuple"}])
  | Some(tuple) =>
    let validations = 
      schemas
      |> Js.Array.mapi(
        ((schema, i) =>
           switch (tuple[i]) {
           | v =>
             doValidate(schema, v, string_of_int(i))
           | exception Invalid_argument(_) => Fail([{path: string_of_int(i), value, name: "index"}])
           }
         ))
      |> Array.to_list
    combineValidations(validations)
    
  };


let tuple = (schemas: Js.Array.t(schema)): schema => {
  validator: tupleValidator(schemas),
  name: "tuple",
};

let (!) = (schema: schema): schema => {
  validator: (value, path) => switch(doValidate(schema, value, path)) {
  | Success(_) => Fail([{path, value, name: "not " ++ schema.name}])
  | Fail(_) => Success({path, value, name: "not " ++ schema.name})
  },
  name: "not " ++ schema.name
}

let anyValidations = (validations: list(validation), value: value, path: path, name: name ): validation => {
  let fails = List.filter(v => switch(v) {
      | Success(_) => true
      | Fail(_) => false
    }, validations);
  switch(fails) {
  | [] => Fail([{value, path, name}])
  | _ => Success({value, path, name})
  }
}

let any = (schemas: Js.Array.t(schema)): schema => {
  let schemaNames = schemas |> Array.map(s => s.name) |> Js.Array.reduce((a, b) => a ++ " " ++ b, "");
  let name = "any:" ++ schemaNames;
  {
    validator: (value, path) => anyValidations(schemas |> Array.to_list |> List.map(s => doValidate(s, value, path)), value, path, name),
    name
  }
}