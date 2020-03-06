import $store from "@/store/store.js";
import { layerHelper, serviceHelper } from "@/helpers";
const baseLayerList = {
  get() {
    return $store.getters.baseLayerList;
  },
  set(val) {
    $store.dispatch("saveBaseLayerList", val);
  }
};
const dynamicLayerList = {
  get() {
    return $store.getters.dynamicLayerList;
  },
  set(data) {
    $store.dispatch("saveDynamicLayerList", data);
  }
};

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
  getSelectedBasemaps() {
    let list = [];
    let baseLayerList = $store.getters.baseLayerList;
    layerHelper.recursiveLayerMapping(baseLayerList, layer => {
      if (layer.isSelected) list.push(layer);
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
const setters = {
  setColor(service, color, isSubLayer) {
    var list = layerHelper.recursiveLayerMapping(
      dynamicLayerList.get(),
      async layer => {
        if (layer != null && layer.id == service.id) {
          if (isSubLayer) {
            layer.layers = layer.layers.map((item, index) => {
              if (item.id == service.id) {
                item.color = color;
              }
              return item;
            });
          } else {
            layer.color = color;
          }
        }
      }
    );
    dynamicLayerList.set(list);
  }
};
const functions = {};
export default {
  ...getters,
  ...setters,
  ...functions
};
