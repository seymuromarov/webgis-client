import { serviceTypeEnum } from "../constants/enums/serviceEnums";
import { colorHelper, serviceHelper } from "@/helpers";

const mapper = {
  basemapMapping: (val, counter) => {
    counter += 1;
    return {
      id: val.id,
      name: val.label,
      showingLabel: val.showingLabel,
      order: counter,
      spatial: val.spatial,
      minZoomLevel: val.minZoomLevel,
      maxZoomLevel: val.maxZoomLevel,
      extent: val.extent,
      resourceType: val.resourceTypeId,
      mapType: val.mapTypeId,
      type: serviceTypeEnum.LAYER,
      isDisabled: val.isDisabled,
      isSelected: false,

      layersVisibility: false,
      collapseVisibility: false,

      unitedDynamicLayerName:
        val.unitedDynamicLayer != null
          ? mapper.basemapMapping(val.unitedDynamicLayer)
          : null,

      layers: null
    };
  },
  dynamicMapping: (val, counter) => {
    counter += 1;
    return {
      id: val.resourceTypeId === "local" ? val.id : val.id,
      name: val.label,
      showingLabel: val.showingLabel,
      order: counter,
      minZoomLevel: val.minZoomLevel,
      maxZoomLevel: val.maxZoomLevel,
      extent: val.extent,
      resourceType: val.resourceTypeId,
      mapType: val.mapTypeId,
      type: serviceTypeEnum.LAYER,
      isDisabled: val.isDisabled,
      isSelected: false,
      isColorEnabled: true,

      ...(val.resourceTypeId === "local" && { color: null }),

      layersVisibility: false,
      collapseVisibility: false,

      query: { where: "1=1" },
      layers: null,
      apiFrom: "internal"
    };
  },
  recursiveMap: (val, counter) => {
    if (val.layers !== undefined) {
      return {
        name: val.label,
        mapTypeId: val.mapTypeId,
        children: val.children.map((val, i) =>
          mapper.recursiveMap(val, counter)
        ),
        type: serviceTypeEnum.CATEGORY,
        layers: val.layers.map((val, i) =>
          val.mapTypeId == "basemap"
            ? mapper.basemapMapping(val, counter)
            : mapper.dynamicMapping(val, counter)
        )
      };
    } else
      return val.mapTypeId == "basemap"
        ? mapper.basemapMapping(val, counter)
        : mapper.dynamicMapping(val, counter);
  },
  subLayerMapping: (item, layer) => {
    item.color = null;
    item.type = serviceTypeEnum.SUBLAYER;
    item.isSelected = true;
    item.uid = parseInt(layer.id.toString() + item.id.toString());
    item.parent = layer;
    return item;
  },
  mapLayers: layers => {
    let baseCounter = 0;
    let dynamicCounter = 0;
    let baseLayers = layers
      .filter(c => c.mapTypeId === "basemap")
      .map(val => mapper.recursiveMap(val, baseCounter));

    let dynamicLayers = layers
      .filter(c => c.mapTypeId === "dynamic")
      .map(val => mapper.recursiveMap(val, dynamicCounter));

    var mapResult = {
      baseLayers,
      dynamicLayers
    };
    return mapResult;
  },

  recursiveLayerMapping: (layerArr, callback) => {
    for (var i = 0; i < layerArr.length; i++) {
      var item = layerArr[i];
      mapper.recursiveMapping(item, callback);
    }
    return layerArr;
  },

  recursiveMapping: (item, callback) => {
    var isCategory = serviceHelper.isCategory(item);
    if (isCategory) {
      //group

      if (item.children && item.children.length > 0) {
        for (var i = 0; i < item.children.length; i++) {
          var child = item.children[i];
          mapper.recursiveMapping(child, callback);
        }
      }

      if (item.layers && item.layers.length > 0) {
        for (var i = 0; i < item.layers.length; i++) {
          var layer = item.layers[i];
          mapper.recursiveMapping(layer, callback);
        }
      }
    } //layer
    else {
      if (callback && typeof callback === "function") {
        callback(item);
      }
    }
  }
};

const functions = {
  renderArcgisSublayerConfig: service => {
    var subLayers = service.layers;
    var activeLayers = subLayers
      .filter(c => c.isSelected)
      .map((item, index) => {
        return item.id;
      });
    var hiddenLayers = subLayers
      .filter(c => !c.isSelected)
      .map((item, index) => {
        return item.id;
      });
    var config = "";
    if (activeLayers.length > 0) {
      config = "show:" + activeLayers.join(" , ");
    } else {
      config = "hide:" + hiddenLayers.join(" , ");
    }

    return config;
  },
  renderSubLayersColorString: layer => {
    var colorStringArr = [];
    for (var i = 0; i < layer.layers.length; i++) {
      let subLayer = layer.layers[i];

      if (subLayer.color !== undefined && subLayer.color !== null) {
        let colorString = colorHelper.renderColor(
          subLayer.id,
          subLayer.color.fill,
          subLayer.color.border
        );

        colorStringArr.push(colorString);
      }
    }
    var result = "";
    if (colorStringArr.length > 0)
      result = "[" + colorStringArr.join(" , ") + "]";

    return result;
  }
};

export default {
  ...functions,
  // ...serviceHelper,
  ...mapper
};
