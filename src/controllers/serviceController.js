import { serviceHelper, layerHelper, colorHelper } from "@/helpers";
import { serviceTypeEnum } from "@/enums";
import { serviceZIndexSettings } from "@/config/settings";
import { tokenService, hashService } from "@/services";
import layer from "@/api/layer";
import { _ } from "vue-underscore";
import {
  layerController,
  mapController,
  bunchController,
  tableController,
} from "@/controllers";
import toolController from "./toolController";
const functions = {
  addLayerColorIndex(number) {
    let layerColorOrder = layerController.getLayerColorOrderList();
    let i = layerColorOrder.findIndex((c) => c === 0);
    layerColorOrder[i] = number;
  },
  getLayerColorIndex(number) {
    let layerColorOrder = layerController.getLayerColorOrderList();
    let i = layerColorOrder.findIndex((c) => c === number);
    return i;
  },
  getServiceByObj(obj) {
    const isLayer = serviceHelper.isLayer(obj);
    const isBunch = serviceHelper.isBunch(obj);

    if (isLayer) {
      return layerController.getLayer(obj.id);
    } else if (isBunch) {
      return bunchController.getBunch(obj.id);
    }
  },
  removeLayerColorIndex(number) {
    let layerColorOrder = layerController.getLayerColorOrderList();
    let i = layerColorOrder.findIndex((c) => c === number);
    layerColorOrder[i] = 0;
  },
  async selectService(service, isChecked) {
    if (service && service.isSelected != isChecked) {
      if (!isChecked) {
        mapController.removeDrawPolygons();
      }

      var tableActiveService = tableController.getTableActiveService();
      if (!isChecked && tableActiveService) {
        if (serviceHelper.isEqual(service, tableActiveService))
          tableController.setTableUnvisible();
      }

      if (serviceHelper.isLayer(service)) {
        layerController.setSelected(service, isChecked);
      } else {
        bunchController.setSelected(service, isChecked);
      }

      mapController.resetSelectionLayer();

      if (isChecked) {
        functions.addLayerColorIndex(service.id);

        let colorIndex = functions.getLayerColorIndex(service.id);
        let color = colorHelper.getColorByIndex(colorIndex);
        let colorObj = colorHelper.buildColorObject(color);

        await functions.saveColor(service, colorObj);

        mapController.addService(service);
        if (serviceHelper.isDynamicFromLocal(service))
          mapController.buildSelectionLayer(service.id);
      } else {
        functions.removeLayerColorIndex(service.id);
        mapController.deleteService(service);
        functions.resetQuery(service.id);
        toolController.deleteServiceFeatures(service.id);
      }

      hashService.updateHash();
    }
  },
  async setServicesStatusByIds(ids, isChecked) {
    await new Promise((resolve, reject) => {
      if (ids && ids.length > 0) {
        ids.forEach(async (element) => {
          var service = layerController.getLayer(element);
          await functions.selectService(service, isChecked);
        });
      }
      resolve();
    });
  },

  saveColor(service, color, selectedColorConditionId) {
    var isLayer = serviceHelper.isLayer(service);
    var isBunch = serviceHelper.isBunch(service);

    return new Promise((resolve) => {
      if (isLayer) {
        layerController.setColor(service, color, selectedColorConditionId);
      } else if (isBunch) {
        bunchController.setColor(service.id, color);
      }
      resolve();
    });
  },
  resetQuery(id) {
    var service = layerController.getLayer(id);
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
