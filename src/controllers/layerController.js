import $store from "@/store/store.js";
import { layerHelper, serviceHelper } from "@/helpers";

const getters = {
  getBaseLayersWithoutCategory() {
    let baseLayerList = $store.getters.baseLayerList;
    let list = [];
    layerHelper.recursiveLayerMapping(baseLayerList, layer => {
      list.push(layer);
    });
    return list;
  },
  getDynamicLayersWithoutCategory(isLocalOnly) {
    let dynamicLayerList = $store.getters.dynamicLayerList;
    let list = [];
    layerHelper.recursiveLayerMapping(dynamicLayerList, layer => {
      if (isLocalOnly && serviceHelper.isDynamicFromLocal(layer))
        list.push(layer);
    });
    return list;
  },
  getSelectedLayers() {
    var selectedLayers = [];
    let dynamicLayerList = $store.getters.dynamicLayerList;
    let baseLayerList = $store.getters.baseLayerList;
    var layers = [...dynamicLayerList, ...baseLayerList];
    layerHelper.recursiveLayerMapping(layers, layer => {
      if (layer.isSelected) {
        selectedLayers.push(layer);
      }
    });
    return selectedLayers;
  }
};
const setters = {};

export default {
  ...getters
};
