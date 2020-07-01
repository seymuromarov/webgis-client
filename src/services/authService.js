import { tokenService } from "@/services";
import { userController } from "@/controllers";
import $store from "@/store/store.js";
export default {
  logout() {
    userController.setRoles([]);
    userController.setDirectivePermissions([]);
    userController.setUserInfo({});
    $store.dispatch("SAVE_AUTH_TOKEN", "");
    tokenService.removeToken();
  },
};
