import { drawTypeEnum } from "@/enums";

const state = {
  graticuleVisibility: false,
  isColorPick: false,
  isMarker: false,
  isRemove: false,
  isDrawForChangeDetection: false,
  isDrawForTable: false,
  drawType: drawTypeEnum.NONE,
  featureIdCounter: 0,
  bbox: [],
};

const mutations = {
  SET_GRATICULE_VISIBILITY(state, payload) {
    state.graticuleVisibility = payload;
  },
  SET_COLOR_PICK_STATUS(state, payload) {
    state.isColorPick = payload;
  },
  SET_MARKER_STATUS(state, payload) {
    state.isMarker = payload;
  },
  SET_DRAW_FOR_CHANGE_DETECTION_STATUS(state, payload) {
    state.isChangeDetection = payload;
  },
  SET_REMOVE_STATUS(state, payload) {
    state.isRemove = payload;
  },
  SET_DRAW_TYPE(state, payload) {
    state.drawType = payload;
  },
  SET_FEATURE_ID_COUNTER(state, payload) {
    state.featureIdCounter = payload;
  },
  SET_BBOX(state, payload) {
    state.bbox = payload;
  },
};

const actions = {
  saveGraticuleVisibility(context, payload) {
    context.commit("SET_GRATICULE_VISIBILITY", payload);
  },
  saveColorPickStatus(context, payload) {
    context.commit("SET_COLOR_PICK_STATUS", payload);
  },
  saveMarkerStatus(context, payload) {
    context.commit("SET_MARKER_STATUS", payload);
  },
  saveDrawForChangeDetectionStatus(context, payload) {
    context.commit("SET_DRAW_FOR_CHANGE_DETECTION_STATUS", payload);
  },
  saveRemoveStatus(context, payload) {
    context.commit("SET_REMOVE_STATUS", payload);
  },
  saveDrawType(context, payload) {
    context.commit("SET_DRAW_TYPE", payload);
  },
  saveFeatureIdCounter(context, payload) {
    context.commit("SET_FEATURE_ID_COUNTER", payload);
  },
  saveBbox(context, payload) {
    context.commit("SET_BBOX", payload);
  },
};

const getters = {
  graticuleVisibility: (state) => {
    return state.graticuleVisibility;
  },
  isColorPick: (state) => {
    return state.isColorPick;
  },
  isMarker: (state) => {
    return state.isMarker;
  },
  isRemove: (state) => {
    return state.isRemove;
  },
  isDrawForChangeDetection: (state) => {
    return state.isDrawForChangeDetection;
  },
  drawType: (state) => {
    return state.drawType;
  },
  featureIdCounter: (state) => {
    return state.featureIdCounter;
  },
  bbox: (state) => {
    return state.bbox;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
