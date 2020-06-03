import qs from "qs";
const functions = {
  formatQueryString(params) {
    return qs.stringify(params, {
      arrayFormat: "indices",
      allowDots: true,
    });
  },
  checkImageExists(imageUrl) {
    var http = new XMLHttpRequest();

    http.open("HEAD", imageUrl, false);
    http.send();

    return http.status != 404;
  },
};
export default { ...functions };
