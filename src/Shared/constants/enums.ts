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

export { DetailType, FilterOrder, POPUPTYPES };
