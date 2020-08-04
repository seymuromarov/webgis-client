const functions = {
  checkStringArithmeticOperation(val1, val2, operationString) {
    switch (operationString) {
      case "=":
        return val1 === val2;
      case ">":
        return val1 > val2;
      case "<":
        return val1 < val2;
      case ">=":
        return val1 >= val2;
      case "<=":
        return val1 <= val2;
      default:
        return val1 === val2;
    }
  },
  parseByTypeString(typestring, val) {
    // int, double, string, bool;
    switch (typestring) {
      case "int":
        return parseInt(val);
      case "double":
        return parseFloat(val);
      case "string":
        return val.toString();

      default:
        return parseInt(val);
    }
  },
};

export default {
  ...functions,
};
