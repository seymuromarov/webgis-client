import Vue from "vue";
import { _ } from "vue-underscore";
const vm = new Vue();

const functions = {
  showSuccess(msg) {
    if (_.isUndefined(msg)) msg = "Success";
    vm.$toasted.show(msg, {
      icon: {
        name: "fas fa-check",
      },
    });
  },
  showError(msg) {
    if (_.isUndefined(msg)) msg = "Failed!";
    vm.$toasted.show(msg, {
      theme: "bubble",
      icon: {
        name: "fas fa-check",
      },
    });
  },
};

export default { ...functions };
