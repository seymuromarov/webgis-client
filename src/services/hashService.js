import { mapController, layerController } from "@/controllers";
export default {
  resolveHash() {
    let hash = window.location.hash;
    if (hash !== "") {
      let hashString = hash.replace("#shareMap=", "");
      let parts = hashString.split("&");
      if (parts.length === 4) {
        let zoom = parseInt(parts[0], 10);
        let center = [parseFloat(parts[1]), parseFloat(parts[2])];
        let selectedLayers = [];
        let selectedPartSplit = parts[3].split(",");
        if (selectedPartSplit && selectedPartSplit != "")
          selectedLayers = selectedPartSplit.map(Number);
        return { zoom, center, selectedLayers };
      }
    }
    return null;
  },
  setHashSelectedServices() {
    if (this.hashResolveResult !== null) {
      var serviceIds = this.hashResolveResult.selectedLayers;
      if (serviceIds)
        for (let i = 0; i < serviceIds.length; i++) {
          const item = serviceIds[i];
          var service = layerController.getLayer(item);
          if (service) serviceController.selectService(service, true);
        }
    }
  },
  updateHash() {
    let map = mapController.getMap();
    let view = map.getView();

    let state = {
      zoom: view.getZoom(),
      center: view.getCenter(),
      rotation: view.getRotation(),
    };
    var selectedLayers = layerController.getSelectedLayers();
    var selectedLayerIds = selectedLayers.map((item) => {
      return item.id;
    });
    let hash =
      "#shareMap=" +
      view.getZoom() +
      "&" +
      Math.round(view.getCenter()[0] * 100) / 100 +
      "&" +
      Math.round(view.getCenter()[1] * 100) / 100 +
      "&" +
      selectedLayerIds;
    window.history.pushState(state, "map", hash);
  },
};
