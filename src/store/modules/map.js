const state = {
    mapLayer: null,
};

const mutations = {
    SET_MAP(state, payload) {
        state.mapLayer = payload;
    },
};

const actions = {
    saveMap(context, payload) {
        context.commit("SET_MAP", payload);
    },
};

const getters = {
    mapLayer: state => {
        return state.mapLayer;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
