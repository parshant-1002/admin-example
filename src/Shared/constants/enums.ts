enum DetailType {
  String,
  Number,
  Dropdown,
  Date,
  DateRange,
}
enum FilterOrder {
  ASCENDING = -1,
  DESCENDING = 1,
}

enum POPUPTYPES {
  NONE = 'NONE',
  EDIT = 'EDIT',
  ADD = 'ADD',
  DELETE = 'DELETE',
}

enum VariableTypes {
  string = 'string',
  number = 'number',
}

enum ButtonType {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

export { DetailType, FilterOrder, POPUPTYPES, VariableTypes, ButtonType };
