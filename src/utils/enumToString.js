export function operatorEnumTostring(val) {
  switch (val) {
    case 1:
      return "=";
    case 2:
      return ">";
    case 3:
      return "<";
    case 4:
      return ">=";
    case 5:
      return "<=";
  }
}
export function distanceEnumToString(val) {
  switch (val) {
    case 1:
      return "km";
    case 2:
      return "m";
    case 3:
      return "cm";
    default:
      return "km";
  }
}
