import $store from "@/store/store.js";
import { layerHelper } from "@/helpers";

let getBaseLayersWithoutCategory = () => {
    let baseLayerList = $store.getters.baseLayerList;
    let list = [];
    layerHelper.recursiveLayerMapping(baseLayerList, layer => {
        list.push(layer);
    });
    return list;
};

let getDynamicLayersWithoutCategory = () => {
    let dynamicLayerList = $store.getters.dynamicLayerList;
    let list = [];
    layerHelper.recursiveLayerMapping(dynamicLayerList, layer => {
        list.push(layer);
    });
    return list;
};

let getSelectedLayers = () => {
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
};

export default {
    getBaseLayersWithoutCategory,
    getSelectedLayers,
    getDynamicLayersWithoutCategory,
};
