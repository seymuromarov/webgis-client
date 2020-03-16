import $store from "@/store/store.js";
import { serviceHelper, layerHelper } from "@/helpers";
import { layerController, mapController } from "@/controllers";
const functions = {
  async selectService(service, isChecked) {
    if (serviceHelper.isLayer(service)) {
      if (serviceHelper.isDynamic(service)) {
        if (isChecked && serviceHelper.isDynamicFromArcgis(service)) {
          let subLayerResponse = await this.getResponseDynamic(service);
          service.layers = subLayerResponse.data.layers;
        }
      }
      layerController.setSelected(service, isChecked);
    } else {
      bunchController.setSelected(service, isChecked);
    }

    if (isChecked) functions.addService(service);
    else functions.deleteService(service);
  },
  addService(service) {
    if (service.extent != null) {
      const { minX, minY, maxX, maxY } = service.extent;
      var extent = [minX, minY, maxX, maxY];
      mapController.fitView(extent);
    }

    var newService = mapController.renderNewService(service);
    newService.set("name", service.name);
    var zIndex = this.getZIndex(service);
    newService.setZIndex(zIndex);

    this.mapLayer.addLayer(newService);
  },
  deleteService(service) {
    let layersToRemove = [];
    var mapLayer = $store.getters.mapLayer;
    mapLayer
      .get()
      .getLayers()
      .forEach(function(layer) {
        if (
          layer.get("name") != undefined &&
          layer.get("name") === service.name
        ) {
          layersToRemove.push(layer);
        }
      });
    let len = layersToRemove.length;
    for (let i = 0; i < len; i++) {
      mapLayer.removeLayer(layersToRemove[i]);
    }
    $store.dispatch("saveMap", mapLayer);
  },
  refreshService(service) {
    functions.deleteService(service, false);
    functions.addService(service);
  }
};
const setters = {};
const getters = {
  getZIndex(service) {
    let zIndex = 0;
    let orderNo = 0;
    if (serviceHelper.isLayer(service)) {
      if (serviceHelper.isDynamic(service)) {
        zIndex = layerSettings.dynamicZIndex;
        orderNo = getters.getOrderNumber(
          layerController.getDynamicLayerList(),
          service
        );
      } else {
        zIndex = layerSettings.basemapZIndex;
        orderNo = getters.getOrderNumber(
          layerController.getBaseLayerList(),
          service
        );
      }
    } else {
      zIndex = layerSettings.bunchZIndex;
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
  }
};
export default { ...functions, ...getters };
