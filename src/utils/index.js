import { _ } from "vue-underscore";

export function readableFileSizeConverter(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}
export function getErrorMessage(response) {
  let messages = [];
  if (response !== 200) {
    if (response.data) {
      if (_.isString(response.data)) {
        messages.push({
          key: "general",
          message: response.data,
        });
      } else if (_.isObject(response.data)) {
        var keys = Object.keys(response.data);
        keys.forEach((element) => {
          messages.push({
            key: element,
            message: response.data[element][0],
          });
        });
      }
    } else
      messages.push({
        key: "general",
        message: "Error",
      });
  }

  return messages;
}

export function guid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export function stringDivider(str, width, spaceReplacer) {
  if (str.length > width) {
    var p = width;
    while (p > 0 && str[p] != " " && str[p] != "-") {
      p--;
    }
    if (p > 0) {
      var left;
      if (str.substring(p, p + 1) == "-") {
        left = str.substring(0, p + 1);
      } else {
        left = str.substring(0, p);
      }
      var right = str.substring(p + 1);
      return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
    }
  }
  return str;
}
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
