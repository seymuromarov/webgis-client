const state = {
    dynamicLayerList: [],
    dynamicSubLayerList: [[]],
    baseLayerList: [],
    selectedLayers: {},
};

const mutations = {
    SET_DYNAMIC_LAYER_LIST(state, payload) {
        state.dynamicLayerList = payload;
    },
    SET_DYNAMIC_SUBLAYER_LIST(state, payload) {
        state.dynamicSubLayerList = payload;
    },
    SET_BASE_LAYER_LIST(state, payload) {
        state.baseLayerList = payload;
    },
    SET_SELECTED_LAYERS(state, payload) {
        state.selectedLayers = payload;
    },
};

const actions = {
    SET_DYNAMIC_LAYER_LIST(context, payload) {
        context.commit("SET_DYNAMIC_LAYER_LIST", payload);
    },
    SET_DYNAMIC_SUBLAYER_LIST(context, payload) {
        context.commit("SET_DYNAMIC_SUBLAYER_LIST", payload);
    },
    SET_BASE_LAYER_LIST(context, payload) {
        context.commit("SET_BASE_LAYER_LIST", payload);
    },
    SET_SELECTED_LAYERS(context, payload) {
        context.commit("SET_SELECTED_LAYERS", payload);
    },
};

const getters = {
    dynamicLayerList: state => {
        return state.dynamicLayerList;
    },
    dynamicSubLayerList: state => {
        return state.dynamicSubLayerList;
    },
    baseLayerList: state => {
        return state.baseLayerList;
    },
    selectedLayers: state => {
        return state.selectedLayers;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
