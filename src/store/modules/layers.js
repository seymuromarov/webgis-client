const state = {
    dynamicLayerList: [],
    selectedLayers: {},
};

const mutations = {
    SET_DYNAMIC_LAYER_LIST(state, payload) {
        state.dynamicLayerList = payload;
    },
    SET_SELECTED_LAYERS(state, payload) {
        state.selectedLayers = payload;
    },
};

const actions = {
    SET_DYNAMIC_LAYER_LIST(context, payload) {
        context.commit("SET_DYNAMIC_LAYER_LIST", payload);
    },
    SET_SELECTED_LAYERS(context, payload) {
        context.commit("SET_SELECTED_LAYERS", payload);
    },
};

export default {
    state,
    mutations,
    actions,
};
