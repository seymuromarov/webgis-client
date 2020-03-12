import $store from "@/store/store.js";
import { layerHelper, serviceHelper } from "@/helpers";
const baseLayerList = {
    get() {
        return $store.getters.baseLayerList;
    },
    set(val) {
        $store.dispatch("saveBaseLayerList", val);
    },
};
const dynamicLayerList = {
    get() {
        return $store.getters.dynamicLayerList;
    },
    set(data) {
        $store.dispatch("saveDynamicLayerList", data);
    },
};

const getters = {
    getDynamicLayer(layerId) {
        let layers = getters.getDynamicLayersWithoutCategory();
        let layer = layers.find(c => c.id === layerId);
        return layer;
    },
    getBaseLayersWithoutCategory() {
        let list = [];
        layerHelper.recursiveLayerMapping(baseLayerList.get(), layer => {
            list.push(layer);
        });
        return list;
    },
    getDynamicLayersWithoutCategory(isLocalOnly) {
        let list = [];

        layerHelper.recursiveLayerMapping(dynamicLayerList.get(), layer => {
            var isLocal = isLocalOnly
                ? serviceHelper.isDynamicFromLocal(layer)
                : true;
            if (isLocal) list.push(layer);
        });
        return list;
    },
    getSelectedBasemaps() {
        let list = [];
        layerHelper.recursiveLayerMapping(baseLayerList.get(), layer => {
            if (layer.isSelected) list.push(layer);
        });
        return list;
    },
    getSelectedLayers() {
        var selectedLayers = [];
        var layers = [...dynamicLayerList.get(), ...baseLayerList.get()];
        layerHelper.recursiveLayerMapping(layers, layer => {
            if (layer.isSelected) {
                selectedLayers.push(layer);
            }
        });
        return selectedLayers;
    },
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
    },
    setQuery(service, query) {
        var list = layerHelper.recursiveLayerMapping(
            dynamicLayerList.get(),
            async layer => {
                if (layer != null && layer.id == service.id) {
                    service.query.where = query;
                }
            }
        );
        dynamicLayerList.set(list);
    },
};
const functions = {};
export default {
    ...getters,
    ...setters,
    ...functions,
};
