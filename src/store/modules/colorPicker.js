const state = {
    fillColor: {
        hex: "#ffffff00",
        rgba: {
            r: 255,
            g: 255,
            b: 255,
            a: 0
        }
    },
    borderColor: {
        hex: "#000000",
        rgba: {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        }
    },
    shapeFillColor: {
        hex8: "#ffffff00",
        rgba: {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        }
    },
    shapeBorderColor: {
        hex8: "#000000",
        rgba: {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        }
    },
    colorPicker: {
        visibility: false,
        layer: null,
        borderTab: true
    }
};
const getters = {
    colorPicker: state => {
        return state.colorPicker;
    }
};
const mutations = {
    SET_COLORPICKER(state, payload) {
        state.colorPicker = payload;
    },
    SET_COLORPICKER_BORDER_TAB(state, payload) {
        state.colorPicker.borderTab = payload;
    },
    SET_COLORPICKER_LAYER(state, payload) {
        state.colorPicker.layer = payload;
    },
    SET_COLORPICKER_VISIBILITY(state, payload) {
        state.colorPicker.visibility = payload;
    },
    SET_COLORPICKER_FILLCOLOR(state, payload) {
        state.fillColor = payload;
    },

    SET_COLORPICKER_BORDERCOLOR(state, payload) {
        state.borderColor = payload;
    },
    SET_COLORPICKER_SHAPEBORDERCOLOR(state, payload) {
        state.shapeBorderColor = payload;
    },
    SET_COLORPICKER_SHAPEFILLCOLOR(state, payload) {
        state.shapeFillColor = payload;
    }
};
const actions = {
    SAVE_COLORPICKER(context, payload) {
        context.commit("SET_COLORPICKER", payload);
    },
    SAVE_COLORPICKER_BORDER_TAB(context, payload) {
        context.commit("SET_COLORPICKER_BORDER_TAB", payload);
    },
    SAVE_COLORPICKER_VISIBILITY(context, payload) {
        context.commit("SET_COLORPICKER_VISIBILITY", payload);
    },
    SAVE_COLORPICKER_LAYER(context, payload) {
        context.commit("SET_COLORPICKER_LAYER", payload);
    },
    SAVE_COLORPICKER_FILLCOLOR(context, payload) {
        context.commit("SET_COLORPICKER_FILLCOLOR", payload);
    },
    SAVE_COLORPICKER_BORDERCOLOR(context, payload) {
        context.commit("SET_COLORPICKER_BORDERCOLOR", payload);
    },
    SAVE_COLORPICKER_SHAPEFILLCOLOR(context, payload) {
        context.commit("SET_COLORPICKER_SHAPEFILLCOLOR", payload);
    },
    SAVE_COLORPICKER_SHAPEBORDERCOLOR(context, payload) {
        context.commit("SET_COLORPICKER_SHAPEBORDERCOLOR", payload);
    }
};
export default {state, mutations, actions, getters};
