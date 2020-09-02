import { tokenService } from "@/services";
import { userController } from "@/controllers";
import $store from "@/store/store.js";

const failedAttemptKey = "loginFailedAttemptCount";
export default {
  logout() {
    userController.setRoles([]);
    userController.setDirectivePermissions([]);
    userController.setUserInfo({});
    $store.dispatch("SAVE_AUTH_TOKEN", "");
    tokenService.removeToken();
  },
  getFailedAttemptCount() {
    var c = localStorage.getItem(failedAttemptKey);

    if (!c) {
      this.resetFailedAttemptCount();
      return this.getFailedAttemptCount();
    } else {
      return parseInt(c);
    }
  },
  increaseFailedAttempCount() {
    var c = this.getFailedAttemptCount();
    localStorage.setItem(failedAttemptKey, parseInt(c) + 1);
  },
  setFailedAttempCount(val) {
    localStorage.setItem(failedAttemptKey, val);
  },
  resetFailedAttemptCount() {
    localStorage.setItem(failedAttemptKey, 0);
  },
};
