import { emlakUsers } from "../constants/permissions";

class LayerHelper {
  constructor(self) {
    this.data = self;
    this.counter = 0;
  }

  recursiveMap = (val, index) => {
    //if category
    if (val.layers !== undefined)
      return {
        name: val.label,
        order: this.counter++,
        children: val.children.map((val, i) => this.recursiveMap(val, index)),
        layers: val.layers.map((val, i) => ({
          name: val.label,
          order: this.counter++,
          spatial: val.spatial
        }))
      };
    else
      return {
        name: val.label,
        order: this.counter++,
        spatial: val.spatial
      };
  };

  creator = layers => {
    console.log("TCL: LayerHelper -> layers", layers);
    let baseLayers = layers
      .filter(c => c.mapTypeId === "basemap" || c.layers !== undefined)
      .map((val, index) => this.recursiveMap(val, index));

    console.log("TCL: LayerHelper -> baseLayers", baseLayers);
    let dynamicLayers = layers
      .filter(c => c.mapTypeId === "dynamic")
      .map((val, index) => ({
        name: val.label,
        order: index + 1,
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

  add = (service, index, dynamic = false, params) => {};

  delete = () => {};
  setColor = () => {};

  setLayout = () => {};
}

export default LayerHelper;
