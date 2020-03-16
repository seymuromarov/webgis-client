import $store from "@/store/store.js";
import { serviceHelper, layerHelper } from "@/helpers";
import { layerController } from "@/controllers";
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

    if (isChecked) this.addService(service);
    else mapController.deleteService(service);
  },
  addService(service) {
    if (service.extent != null) {
      this.mapLayer
        .getView()
        .fit([
          service.extent.minX,
          service.extent.minY,
          service.extent.maxX,
          service.extent.maxY
        ]);
    }

    var newService = this.renderNewService(service);
    this.getOrderNumber(this.dynamicLayerList, service);

    newService.set("name", service.name);
    var zIndex = this.getZIndex(service);
    newService.setZIndex(zIndex);

    this.mapLayer.addLayer(newService);
  },

  setZIndex(service) {
    this.mapLayer.getLayers().forEach(layer => {
      if (
        layer.get("name") != undefined &&
        layer.get("name") === service.name
      ) {
        layer.setZIndex(this.getZIndex(service));
      }
    });
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
        orderNo = this.getOrderNumber(this.dynamicLayerList, service);
      } else {
        zIndex = layerSettings.basemapZIndex;
        orderNo = this.getOrderNumber(this.baseLayerList, service);
      }
    } else {
      zIndex = layerSettings.bunchZIndex;
      orderNo = this.getOrderNumber(this.bunchLayerList, service);
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
