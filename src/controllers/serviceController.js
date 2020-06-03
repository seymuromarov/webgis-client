import { serviceHelper, layerHelper } from "@/helpers";
import { serviceTypeEnum } from "@/enums";
import { serviceZIndexSettings } from "@/config/settings";
import { layerService, tokenService } from "@/services";
import { _ } from "vue-underscore";
import {
  layerController,
  mapController,
  bunchController,
  tableController,
} from "@/controllers";
import toolController from "./toolController";
const functions = {
  async selectService(service, isChecked) {
    if (!isChecked) {
      mapController.removeDrawPolygons();
    }
    var tableActiveService = tableController.getTableActiveService();
    if (!isChecked && tableActiveService) {
      if (serviceHelper.isEqual(service, tableActiveService))
        tableController.setTableUnvisible();
    }

    if (serviceHelper.isLayer(service)) {
      if (isChecked && serviceHelper.isDynamicFromArcgis(service)) {
        let subLayerResponse = await functions.getResponseDynamic(service);
        service.layers = subLayerResponse.data.layers;
      }
      layerController.setSelected(service, isChecked);
    } else {
      bunchController.setSelected(service, isChecked);
    }

    mapController.resetSelectionLayer();

    if (isChecked) {
      console.log(layerController.getSelectedDynamicLayers())
      mapController.addService(service);
      if (serviceHelper.isDynamicFromLocal(service))
        mapController.buildSelectionLayer(service);
    } else {
      mapController.deleteService(service);
      functions.resetQuery(service);
      toolController.deleteActiveServiceFeatures();
    }
  },
  async getResponseDynamic(service) {
    let responseDynamic = null;
    if (serviceHelper.isDynamicFromArcgis(service)) {
      responseDynamic = await layerService.getDynamicLayers({
        token: tokenService.getToken(),
        name: service.name,
      });
    }
    return responseDynamic;
  },
  async dynamicLayersReset(service, status) {
    if (serviceHelper.isDynamicFromArcgis(service)) {
      var isColorEnabled = await serviceHelper.isLayerColorEnabled(service);

      let list = layerHelper.recursiveLayerMapping(
        layerController.getDynamicLayerList(),
        async (layer) => {
          if (layer != null && layer.id == service.id) {
            if (layer.layers !== undefined && layer.layers !== null) {
              layer.layers = layer.layers.map((item, index) => {
                return {
                  ...item,
                  isColorEnabled,
                };
              });
            }
          }
        }
      );
      layerController.setDynamicLayerList(list);
    }
  },

  async selectSubService(service, index, subLayerId, e) {
    let isChecked = e.target.checked;

    let list = layerHelper.recursiveLayerMapping(
      layerController.getDynamicLayerList(),
      async (layer) => {
        if (layer != null && layer.id == service.id) {
          var subLayer = layer.layers.find((c) => c.id == subLayerId);
          subLayer.isSelected = isChecked;
        }
      }
    );
    layerController.setDynamicLayerList(list);
    functions.dynamicLayersReset(service, isChecked);
    mapController.refreshService(service);
  },
  saveColor(service, colorObj) {
    const { fillColor, borderColor } = colorObj;
    var isLayer = serviceHelper.isLayer(service);
    var isSubLayer = serviceHelper.isSublayer(service);
    var isBunch = serviceHelper.isBunch(service);

    var color = { fill: fillColor, border: borderColor };

    if (isLayer || isSubLayer) {
      var service = isSubLayer ? service.parent : service;

      layerController.setColor(service, color, isSubLayer);
    } else if (isBunch) {
      bunchController.setColor(service.id, color);
    }
    mapController.refreshService(service);
  },
  resetQuery(service) {
    var isBunch = serviceHelper.isBunch(service);
    var isDynamicLayer =
      serviceHelper.isDynamic(service) && serviceHelper.isLayer(service);
    if (isBunch) {
      const layers = service.layers;
      layers.forEach(function(layer) {
        var isLayerIdNotUndefined = !_.isUndefined(layer.id);
        if (isLayerIdNotUndefined) {
          setters.setQuery(service, "", layer.id);
          setters.setExtentCoordinates(service, "");
        }
      });
    } else if (isDynamicLayer) {
      setters.setQuery(service, "");
      setters.setExtentCoordinates(service, "");
    }
  },
};

const events = {
  onDraggableMoveCallback(type) {
    switch (type) {
      case serviceTypeEnum.DYNAMIC_LAYER:
        var list = layerController.getDynamicLayerList();
        list.map((item, index) => {
          mapController.setZIndex(item);
        });
        layerController.setDynamicLayerList(list);
        break;
      case serviceTypeEnum.BASE_LAYER:
        var list = layerController.getBaseLayerList();
        list.map((item, index) => {
          mapController.setZIndex(item);
        });
        layerController.setBaseLayerList(list);
        break;
      case serviceTypeEnum.BUNCH:
        var list = bunchController.getBunchLayerList();
        list.map((item, index) => {
          mapController.setZIndex(item);
        });
        bunchController.setBunchLayerList(list);
        break;
    }
  },
};
const setters = {
  setQuery(service, query, bunchLayerId) {
    var isBunch = serviceHelper.isBunch(service);
    var isDynamicLayer =
      serviceHelper.isDynamic(service) && serviceHelper.isLayer(service);
    var isLayerIdNotUndefined = !_.isUndefined(bunchLayerId);
    if (isBunch && isLayerIdNotUndefined) {
      bunchController.setQuery(service, bunchLayerId, query);
    } else if (isDynamicLayer) {
      layerController.setQuery(service, query);
    }
  },
  setExtentCoordinates(service, coordinates) {
    var isBunch = serviceHelper.isBunch(service);
    var isDynamicLayer =
      serviceHelper.isDynamic(service) && serviceHelper.isLayer(service);
    if (isBunch) {
      bunchController.setExtentCoordinates(service, coordinates);
    } else if (isDynamicLayer) {
      layerController.setExtentCoordinates(service, coordinates);
    }
  },
};
const getters = {
  getDynamicService(service, layerId) {
    var isBunch = serviceHelper.isBunch(service);
    var isDynamicLayer =
      serviceHelper.isDynamic(service) && serviceHelper.isLayer(service);

    var isLayerIdNotUndefined = !_.isUndefined(layerId);
    let layer = null;
    if (isBunch && isLayerIdNotUndefined) {
      //bunch service
      layer = bunchController.getBunchLayer(
        service.id, //bunch
        layerId //layer
      );
    } else if (isDynamicLayer) {
      layer = layerController.getDynamicLayer(service.id);
    }

    return layer;
  },

  getZIndex(service) {
    let zIndex = 0;
    let orderNo = 0;
    if (serviceHelper.isLayer(service)) {
      if (serviceHelper.isDynamic(service)) {
        zIndex = serviceZIndexSettings.dynamicZIndex;

        orderNo = getters.getOrderNumber(
          layerController.getDynamicLayerList(),
          service
        );
      } else {
        zIndex = serviceZIndexSettings.basemapZIndex;
        orderNo = getters.getOrderNumber(
          layerController.getBaseLayerList(),
          service
        );
      }
    } else {
      zIndex = serviceZIndexSettings.bunchZIndex;
      orderNo = getters.getOrderNumber(
        bunchController.getBunchLayerList(),
        service
      );
    }

    return zIndex - orderNo;
  },
  getOrderNumber(array, service) {
    var index = 0;
    var result = 0;
    layerHelper.recursiveLayerMapping(array, function(layer) {
      index++;
      if (layer.name == service.name) {
        result = index;
      }
    });
    return result;
  },
};
export default { ...functions, ...getters, ...setters, ...events };
