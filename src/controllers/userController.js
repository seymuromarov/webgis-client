import $store from "@/store/store.js";
const functions = {};
const getters = {
  getRoles() {
    return $store.getters.roles;
  },
  getDirectivePermissions() {
    return $store.getters.directivePermissions;
  },
  getUserInfo() {
    return $store.getters.userInfo;
  },
};
const setters = {
  setRoles(payload) {
    $store.dispatch("saveRoles", payload);
  },
  setDirectivePermissions(payload) {
    $store.dispatch("saveDirectivePermissions", payload);
  },
  setUserInfo(payload) {
    $store.dispatch("saveUserInfo", payload);
  },
};
export default { ...functions, ...getters, ...setters };
