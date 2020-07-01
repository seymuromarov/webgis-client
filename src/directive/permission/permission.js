import $store from "@/store/store.js";
import { permissionHelper } from "@/helpers";

export default {
  inserted(el, binding, vnode) {
    const { value } = binding;
    const roles = $store.getters && $store.getters.roles;
    const permissions = permissionHelper.getRolePermissions(roles);
    const directivePermissions =
      $store.getters && $store.getters.directivePermissions;

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;

      const hasPermission = permissions.some((permission) => {
        return permissionRoles.includes(permission);
      });

      const hasDirectivePermission = directivePermissions.some((permission) => {
        return permissionRoles.includes(permission);
      });
      let result = hasPermission || hasDirectivePermission;
      if (!result) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`);
    }
  },
};
