import $store from "@/store/store.js";
import { layerHelper, serviceHelper } from "@/helpers";
import { deepClone } from "@/utils";
const defaultColorCondtionId = -1;
const getters = {
  getBaseLayerList() {
    let data = $store.getters.baseLayerList;
    return deepClone(data);
  },

  getDynamicLayerList() {
    let data = $store.getters.dynamicLayerList;
    return deepClone(data);
  },
  getDynamicLayerAsTreeSelect() {
    var arr = getters.getDynamicLayerList();

    var options = layerHelper.recursiveTreeMapping(arr, (item) => {
      if (serviceHelper.isCategory(item)) {
        item.layers = item.layers.filter((c) =>
          serviceHelper.isLocalService(c)
        );
      } else {
        if (!serviceHelper.isLocalService(item)) item = null;
      }

      return item;
    });
    return options;
  },
  getBasemapLayerAsTreeSelect() {
    var arr = getters.getBaseLayerList();
    var options = layerHelper.recursiveTreeMapping(arr);
    return options;
  },
  getLayer(layerId) {
    var layer = getters.getDynamicLayer(layerId);
    if (!layer) layer = getters.getBaseLayer(layerId);
    return layer;
  },
  getDynamicLayer(layerId) {
    let layers = getters.getDynamicLayersWithoutCategory();
    let layer = layers.find((c) => c.id === layerId);
    return layer;
  },
  getBaseLayer(layerId) {
    let layers = getters.getBaseLayersWithoutCategory();
    let layer = layers.find((c) => c.id === layerId);
    return layer;
  },
  getLayersWithoutCategory() {
    return [
      ...this.getDynamicLayersWithoutCategory(),
      ...this.getBaseLayersWithoutCategory(),
    ];
  },

  getBaseLayersWithoutCategory() {
    let list = [];
    layerHelper.recursiveLayerMapping(getters.getBaseLayerList(), (layer) => {
      list.push(layer);
    });
    return list;
  },
  getDynamicLayersWithoutCategory(isLocalOnly) {
    let list = [];

    layerHelper.recursiveLayerMapping(
      getters.getDynamicLayerList(),
      (layer) => {
        var isLocal = isLocalOnly
          ? serviceHelper.isDynamicFromLocal(layer)
          : true;
        if (isLocal) list.push(layer);
      }
    );
    return list;
  },
  getSelectedBasemaps() {
    let list = getters
      .getBaseLayersWithoutCategory()
      .filter((c) => c.isSelected);
    // layerHelper.recursiveLayerMapping(getters.getBaseLayerList(), (layer) => {
    //   if (layer.isSelected) list.push(layer);
    // });
    return list;
  },
  getSelectedDyanmics() {
    let list = getters
      .getDynamicLayersWithoutCategory()
      .filter((c) => c.isSelected);

    return list;
  },
  getSelectedLayers() {
    // var selectedLayers = [];
    var list = [
      ...getters.getSelectedDyanmics(),
      ...getters.getSelectedBasemaps(),
    ];

    return list;
  },

  getExtentCoordinates(layerId) {
    let layer = getters.getDynamicLayer(layerId);
    return layer.query.extentCoordinates;
  },
  getLayerColorOrderList() {
    return $store.getters.layerColorOrderList;
  },

  getFavoriteBaseLayerIds() {
    return $store.getters.favoriteBaseLayerIds;
  },
  getFavoriteDynamicLayerIds() {
    return $store.getters.favoriteDynamicLayerIds;
  },
  getDefaultDynamicLayerIds() {
    return $store.getters.defaultDynamicLayerIds;
  },
  getDefaultBaseLayerIds() {
    return $store.getters.defaultBaseLayerIds;
  },
  getLayerColorConditionList(item) {
    const defaultColor = {
      id: defaultColorCondtionId,
      title: "Default",
      borderColor: item.color.borderColor,
      fillColor: item.color.fillColor,
    };
    const layerColor = item.layerColor;
    if (!layerColor) return [defaultColor];

    const conditonData = layerColor.conditions.map((c) => {
      var title = layerHelper.buildLayerConditionLabel(
        layerColor.column,
        c.operator,
        c.value
      );
      return {
        id: c.id,
        title,
        borderColor: c.borderColor,
        fillColor: c.fillColor,
      };
    });

    return [defaultColor, ...conditonData];
  },
};
const setters = {
  setSelected(service, isChecked) {
    var list = [];

    if (serviceHelper.isDynamic(service)) {
      list = getters.getDynamicLayerList();
      list = layerHelper.recursiveLayerMapping(list, async (item) => {
        if (item != null && item.id == service.id) {
          item.isSelected = isChecked;
          if (isChecked && serviceHelper.isDynamicFromArcgis(item)) {
            item.layers = service.layers.map((item) =>
              layerHelper.subLayerMapping(item, item)
            );
          }
        }
      });

      setters.setDynamicLayerList(list);
    } else if (serviceHelper.isBasemap(service)) {
      list = layerHelper.recursiveLayerMapping(
        getters.getBaseLayerList(),
        async (item) => {
          if (item != null && item.id == service.id) {
            item.isSelected = isChecked;
          }
        }
      );
      setters.setBaseLayerList(list);
    }
  },

  setColor(service, color, selectedColorOption) {
    var list = layerHelper.recursiveLayerMapping(
      getters.getDynamicLayerList(),
      async (layer) => {
        if (layer != null && layer.id == service.id) {
          if (
            selectedColorOption &&
            selectedColorOption.code !== defaultColorCondtionId
          ) {
            let conditionColor = layer.layerColor.conditions.find(
              (c) => c.id == parseInt(selectedColorOption.code)
            );
            if (conditionColor) {
              conditionColor.fillColor = color.fillColor;
              conditionColor.borderColor = color.borderColor;
            }
          } else {
            layer.color = color;
          }
        }
      }
    );
    setters.setDynamicLayerList(list);
  },
  setQuery(service, query) {
    var list = layerHelper.recursiveLayerMapping(
      getters.getDynamicLayerList(),
      async (layer) => {
        if (layer != null && layer.id == service.id) {
          layer.query.where = query;
        }
      }
    );
    setters.setDynamicLayerList(list);
  },
  setExtentCoordinates(service, coordinates) {
    var list = layerHelper.recursiveLayerMapping(
      getters.getDynamicLayerList(),
      async (layer) => {
        if (layer != null && layer.id == service.id) {
          layer.query.extentCoordinates = coordinates;
        }
      }
    );
    setters.setDynamicLayerList(list);
  },

  setBaseLayerList(data) {
    $store.dispatch("saveBaseLayerList", data);
  },
  setDynamicLayerList(data) {
    $store.dispatch("saveDynamicLayerList", data);
  },
  setLayerColorOrderList(data) {
    $store.dispatch("saveLayerColorOrderList", data);
  },

  setFavoriteDynamicLayerIds(data) {
    $store.dispatch("saveFavoriteDyanmicLayerIds", data);
  },
  setFavoriteBaseLayerIds(data) {
    $store.dispatch("saveFavoriteBaseLayerIds", data);
  },
  setDefaultDynamicLayerIds(data) {
    $store.dispatch("saveDefaultDynamicLayerIds", data);
  },
  setDefaultBaseLayerIds(data) {
    $store.dispatch("saveDefaultBaseLayerIds", data);
  },
};
const functions = {};
export default {
  ...getters,
  ...setters,
  ...functions,
};
