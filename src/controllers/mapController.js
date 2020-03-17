import $store from "@/store/store.js";

const functions = {
  fitView(extent) {
    this.mapLayer.getView().fit(extent);
  },

  deleteService(service) {
    let layersToRemove = [];
    var mapLayer = $store.getters.mapLayer;
    mapLayer.getLayers().forEach(function(layer) {
      if (
        layer.get("name") != undefined &&
        layer.get("name") === service.name
      ) {
        layersToRemove.push(layer);
      }
    });
    let len = layersToRemove.length;
    for (let i = 0; i < len; i++) functions.removeLayer(layersToRemove[i]);
  },
  removeLayer(layer) {
    var mapLayer = $store.getters.mapLayer;
    mapLayer.removeLayer(layer);
    $store.dispatch("saveMap", mapLayer);
  }
};
export default { ...functions };
