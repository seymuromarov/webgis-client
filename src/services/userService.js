import user from "@/api/user";
import { userHelper } from "@/helpers";
import { tokenService } from "@/services";
import { userController } from "@/controllers";
import $store from "@/store/store.js";
import router from "@/router";

export default {
  getInfo() {
    return new Promise((resolve, reject) => {
      user
        .getInfo()
        .then((response) => {
          if (!response) {
            reject("Verification failed, please Login again.");
          }

          let { roles, directivePermissions } = response.data;

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            roles = [{ name: "none", permissions: [] }];
          }

          if (!roles || roles.length <= 0) {
            reject("getInfo: roles must be a non-null array!");
          }

          let mappedRoles = userHelper.mapRoleObj(roles);
          let mappedDirectivePermissions = userHelper.mapPermissionObj(
            directivePermissions
          );

          userController.setRoles(mappedRoles);
          userController.setDirectivePermissions(mappedDirectivePermissions);
          userController.setUserInfo(userHelper.mapUserInfo(response.data));

          resolve(response);

          // resolve({
          //   roles: mappedRoles,
          //   directivePermissions: mappedDirectivePermissions,
          // });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
