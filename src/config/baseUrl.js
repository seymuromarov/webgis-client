const getUrl = window.location;
let port = 8888
if (getUrl.protocol === "https") {
    port = 7777
}
export const baseUrl = getUrl.protocol + '//' + getUrl.hostname + ':'+port;