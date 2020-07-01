const state = {
  roles: [],
  directivePermissions: [],
  userInfo: {
    id: "",
    email: "",
    userName: "",
  },
};

const mutations = {
  SET_ROLES(state, payload) {
    state.roles = payload;
  },
  SET_USER_INFO(state, payload) {
    state.userInfo = payload;
  },
  SET_DIRECTIVE_PERMISSIONS(state, payload) {
    state.directivePermissions = payload;
  },
};

const actions = {
  saveRoles(context, payload) {
    context.commit("SET_ROLES", payload);
  },
  saveUserInfo(context, payload) {
    context.commit("SET_USER_INFO", payload);
  },
  saveDirectivePermissions(context, payload) {
    context.commit("SET_DIRECTIVE_PERMISSIONS", payload);
  },
};

const getters = {
  roles: (state) => state.roles,
  directivePermissions: (state) => state.directivePermissions,
  userInfo: (state) => state.userInfo,
};

export default { state, mutations, actions, getters };
