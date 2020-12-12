import Vue from "vue";
const vm = new Vue();
const success = (msg) => {
  vm.$snotify.success(msg);
};
const error = (msg) => {
  vm.$snotify.error(msg);
};
export default { success, error };
