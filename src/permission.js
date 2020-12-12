import router from "@/router";
import $store from "@/store/store.js";
import { tokenService, userService, authService } from "@/services"; // get token from cookie

const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // // // start progress bar
  // // determine whether the user has logged in
  const hasToken = tokenService.getToken();
  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = $store.getters.roles && $store.getters.roles.length > 0;

      if (hasRoles) {
        next();
      } else {
        try {
          await $store
            .dispatch("auth/getAuthorizedUser")
            .then(() => {})
            .catch(async () => {
              await $store.dispatch("auth/logout");
              next(`/login`);
            });

          next({ ...to, replace: true });
        } catch (error) {
          next(`/login`);
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`);
    }
  }
});
