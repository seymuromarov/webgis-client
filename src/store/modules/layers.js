const state = {
    dynamicLayerList: [],
    baseLayerList: [],
    bunchLayerList: [],
    focusedPolygonVector: null
};

const mutations = {
    SET_FOCUSED_POLYGON_VECTOR(state, payload) {
        state.focusedPolygonVector = payload;
    },
    SET_DYNAMIC_LAYER_LIST(state, payload) {
        state.dynamicLayerList = payload;
    },

    SET_BASE_LAYER_LIST(state, payload) {
        state.baseLayerList = payload;
    },
    SET_BUNCH_LAYER_LIST(state, payload) {
        state.bunchLayerList = payload;
    }
};

const actions = {
    saveFocusePolygonVector(context, payload) {
        context.commit("SET_FOCUSED_POLYGON_VECTOR", payload);
    },
    saveDynamicLayerList(context, payload) {
        context.commit("SET_DYNAMIC_LAYER_LIST", payload);
    },

    saveBaseLayerList(context, payload) {
        context.commit("SET_BASE_LAYER_LIST", payload);
    },
    saveBunchLayerList(context, payload) {
        context.commit("SET_BUNCH_LAYER_LIST", payload);
    }
};

const getters = {
    dynamicLayerList: state => {
        return state.dynamicLayerList;
    },
    baseLayerList: state => {
        return state.baseLayerList;
    },
    bunchLayerList: state => {
        return state.bunchLayerList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
