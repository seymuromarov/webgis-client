import $store from "@/store/store.js";

const functions = {
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
    for (let i = 0; i < len; i++) {
      mapLayer.removeLayer(layersToRemove[i]);
    }
    $store.dispatch("saveMap", mapLayer);
  }
};
export default { ...functions };
