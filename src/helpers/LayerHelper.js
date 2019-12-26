import { emlakUsers } from "../constants/permissions";

class LayerHelper {
  constructor(self) {
    this.data = self;
    this.counter = 0;
  }
  layerMap(val) {
    return {
      id: val.id,
      name: val.label,
      showingLabel: val.showingLabel,
      order: this.counter++,
      spatial: val.spatial,
      minZoomLevel:val.minZoomLevel,
      maxZoomLevel:val.maxZoomLevel,
      extent:val.extent,
      resourceType: val.resourceTypeId,
      mapType: val.mapTypeId,
      unitedDynamicLayerName:
        val.unitedDynamicLayer != null
          ? this.layerMap(val.unitedDynamicLayer)
          : null,
      layersVisibility: false,
      collapseVisibility: false,
      layers: null
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
        id: val.resourceTypeId.trim() === "local" ? val.id : val.name,
        name: val.label,
        showingLabel: val.showingLabel,
        order: index + 1,
        minZoomLevel:val.minZoomLevel,
        maxZoomLevel:val.maxZoomLevel,
        extent:val.extent,
        resourceType: val.resourceTypeId,
        mapType: val.mapTypeId,
        layersVisibility: false,
        collapseVisibility: false,

        layers: null,
        apiFrom: "internal"
      }));

    return {
      baseLayers,
      dynamicLayers
    };
  };

  add = () => {};
  delete = () => {};
  setColor = () => {};
  setLayout = () => {};
}

export default LayerHelper;
