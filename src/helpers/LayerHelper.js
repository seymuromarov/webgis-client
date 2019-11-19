import { emlakUsers } from "../constants/permissions";

class LayerHelper {
  constructor(self) {
    this.data = self;
  }

  recursiveMap = (val, index) => {
    //if category
    if (val.layers !== undefined)
      return {
        name: val.label,
        children: val.children.map((val, index) =>
          this.recursiveMap(val, index)
        ),
        layers: val.layers.map((val, index) => ({
          name: val.label,
          order: index + 1,
          spatial: val.spatial
        }))
      };
    else
      return {
        name: val.label,
        order: index + 1,
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

    // console.log("TCL: LayerHelper -> dynamicLayers", dynamicLayers);

    // for (let i = 0; i < layers.length; i++) {
    //   if (layers[i].attributes["summary"] !== "dynamic") {
    //     if (
    //       layers[i].attributes.title === "AzercosmosBasemap" ||
    //       layers[i].attributes.title === "Azersky2018" ||
    //       layers[i].attributes.title === "Azersky2019"
    //     ) {
    //       baseLayers.push({
    //         name: layers[i].attributes.title,
    //         order: i + 1,
    //         spatial: 3857
    //       });
    //     } else {
    //       baseLayers.push({
    //         name: layers[i].attributes.title,
    //         order: i + 1,
    //         spatial: 32936
    //       });
    //     }
    //   } else {
    //     dynamicLayers.push({
    //       name: layers[i].attributes.title,
    //       order: i + 1,
    //       layersVisibility: false,
    //       collapseVisibility: false,
    //       layers: null,
    //       apiFrom: "internal"
    //     });
    //   }
    // }

    // //just for now
    // if (emlakUsers.includes(this.data.username)) {
    //   dynamicLayers.push({
    //     name: "UQODIYA_EKIN",
    //     order: layers.length++,
    //     layersVisibility: false,
    //     collapseVisibility: false,
    //     layers: null,
    //     apiFrom: "emlak"
    //   });
    // }
    // dynamicLayers.push(
    //   {
    //     name: "VECTOR_GEOJSON",
    //     order: layers.length++,
    //     layersVisibility: false,
    //     collapseVisibility: false,
    //     layers: null,
    //     apiFrom: "vectorGeojson"
    //   },
    //   {
    //     name: "VECTOR_MVT",
    //     order: layers.length++,
    //     layersVisibility: false,
    //     collapseVisibility: false,
    //     layers: null,
    //     apiFrom: "vectorMvt"
    //   }
    // );

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
