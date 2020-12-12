import { tokenService } from "@/services";
import auth from "@/api/auth";
import user from "@/api/user";
import { userHelper } from "@/helpers";
import { userController } from "@/controllers";
const state = {
  token: null,
  username: null,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
};

const actions = {
  saveToken(context, token) {
    context.commit("SET_TOKEN", token);
  },
  login({ commit }, data) {
    const { emailOrUsername, password, recaptchaToken } = data;

    return new Promise((resolve, reject) => {
      auth
        .login({
          emailOrUsername: emailOrUsername,
          password: password,
          recaptchaToken,
        })
        .then((response) => {
          const { token } = response;
          tokenService.setToken(token);
          commit("SET_TOKEN", token);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logout({ commit }) {
    userController.setRoles([]);
    userController.setDirectivePermissions([]);
    userController.setUserInfo({});
    commit("SET_TOKEN", null);
    tokenService.removeToken();
  },
  getAuthorizedUser({ commit }) {
    return new Promise((resolve, reject) => {
      user
        .getAuthorizedUser()
        .then((response) => {
          if (!response) {
            reject("Verification failed, please Login again.");
          }

          let { roles, directivePermissions } = response;

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
          userController.setUserInfo(userHelper.mapUserInfo(response));

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

const getters = {
  token: (state) => {
    return state.token;
  },
  username: (state) => {
    return state.username;
  },
};

export default { namespaced: true, state, mutations, actions, getters };
