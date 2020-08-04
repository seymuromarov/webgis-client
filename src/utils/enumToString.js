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
