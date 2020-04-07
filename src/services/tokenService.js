const tokenKey = "token";

export default {
  getToken() {
    // return Cookies.get(TokenKey);
    return localStorage.getItem(tokenKey);
  },
  setToken(token) {
    localStorage.setItem(tokenKey, token);
    // return Cookies.set(tokenKey, token, { expires: "1D" });
  },
  removeToken() {
    localStorage.removeItem(tokenKey);
    // return Cookies.delete(tokenKey);
  },
};
