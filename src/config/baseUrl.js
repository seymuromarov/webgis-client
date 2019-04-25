const getUrl = window.location;
// let port = 8888
// if (getUrl.protocol === "https") {
//     port = 7777
// }
// let server_url = getUrl.protocol + '//' + getUrl.hostname + ':' + port;

// let server_url = getUrl.protocol + '//' + getUrl.hostname + '/node';
let server_url = getUrl.protocol + '//webgis.azercosmos.az/node';

export const baseUrl = server_url