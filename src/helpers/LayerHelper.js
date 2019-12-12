import { emlakUsers } from "../constants/permissions";

class LayerHelper {
  constructor(self) {
    this.data = self;
    this.counter = 0;
  }
  layerMap(val) {
    return {
      name: val.label,
      showingLabel: val.showingLabel,
      order: this.counter++,
      spatial: val.spatial,
      resourceType: val.resourceTypeId,
      unitedDynamicLayerName: val.unitedDynamicLayerName
    };
  }
  recursiveMap = (val, index) => {
    if (val.layers !== undefined) {
      return {
        name: val.label,
        order: this.counter++,
        children: val.children.map((val, i) => this.recursiveMap(val, index)),
        layers: val.layers.map((val, i) => this.layerMap(val))
      };
    } else return this.layerMap(val);
  };

  creator = layers => {
    let baseLayers = layers
      .filter(c => c.mapTypeId === "basemap" || c.layers !== undefined)
      .map((val, index) => this.recursiveMap(val, index));

    let dynamicLayers = layers
      .filter(c => c.mapTypeId === "dynamic")
      .map((val, index) => ({
        name: val.label,
        showingLabel: val.showingLabel,
        order: index + 1,
        id: val.resourceTypeId.trim() === "local" ? val.id : val.name,
        layersVisibility: false,
        collapseVisibility: false,
        layers: null,
        apiFrom: "internal",
        resourceType: val.resourceTypeId
      }));

    return {
      baseLayers,
      dynamicLayers
    };
  };

  add = (service, index, dynamic = false, params) => {};

  delete = () => {};
  setColor = () => {};

  setLayout = () => {};
}

export default LayerHelper;
