import Cookies from "vue-cookie";

const TokenKey = "token";

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, {expires: "1D"});
}

export function removeToken() {
    return Cookies.delete(TokenKey);
}
