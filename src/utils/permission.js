import $store from "@/store/store.js";
import { permissionHelper } from "@/helpers";

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = $store.getters && $store.getters.roles;
    const permissions = permissionHelper.getRolePermissions(roles);
    const directivePermissions =
      $store.getters && $store.getters.directivePermissions;
    const permissionRoles = value;

    const hasPermission = permissions.some((permission) => {
      return permissionRoles.includes(permission);
    });
    const hasDirectivePermission = directivePermissions.some((permission) => {
      return permissionRoles.includes(permission);
    });
    let result = hasPermission || hasDirectivePermission;
    if (!result) {
      return false;
    }
    return true;
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`);
    return false;
  }
}
