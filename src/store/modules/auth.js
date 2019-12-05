const state = {
    token: null,
    username: null,
    authError: null
};

const mutations = {
    SET_AUTH_TOKEN(state, token) {
        state.token = token;
    }
};

const actions = {
    SAVE_AUTH_TOKEN(context, token) {
        context.commit("SET_AUTH_TOKEN", token);
    }
};

const getters = {
    token: state => {
        return state.token;
    },
    username: state => {
        return state.username;
    }
};

export default {state, mutations, actions, getters};
