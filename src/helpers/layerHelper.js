import { serviceTypeEnum } from "@/enums";
import { colorHelper, serviceHelper } from "@/helpers";

const mapper = {
  basemapMapping: (val) => {
    return {
      id: val.id,
      name: val.label,
      showingLabel: val.showingLabel,
      spatial: val.spatial,
      minZoomLevel: val.minZoomLevel,
      maxZoomLevel: val.maxZoomLevel,
      extent: val.extent,
      resolutionOption: val.resolutionOption,
      resourceType: val.resourceTypeId,
      mapType: val.mapTypeId,
      type: serviceTypeEnum.LAYER,
      isDisabled: val.isDisabled,
      isSelected: false,
      layers: null,
      sourceUrl: val.sourceUrl,
    };
  },
  dynamicMapping: (val) => {
    return {
      id: val.id,
      name: val.label,
      showingLabel: val.showingLabel,
      minZoomLevel: val.minZoomLevel,
      maxZoomLevel: val.maxZoomLevel,
      extent: val.extent,
      spatial: val.spatial,
      resolutionOption: val.resolutionOption,
      resourceType: val.resourceTypeId,
      mapType: val.mapTypeId,
      type: serviceTypeEnum.LAYER,
      isDisabled: val.isDisabled,
      isSelected: false,
      isColorEnabled: true,
      sourceUrl: val.sourceUrl,
      ...(val.resourceTypeId === "local" && {
        color: null,
        layerColor: val.layerColor,
      }),

      query: { where: "", extentCoordinates: "" },
      layers: null,
    };
  },
  recursiveMap: (val) => {
    if (val.layers !== undefined) {
      var obj = {
        id: val.id,
        name: val.label,
        mapTypeId: val.mapTypeId,
        children: val.children.map((val, i) => mapper.recursiveMap(val)),
        type: serviceTypeEnum.CATEGORY,
        layers: val.layers.map((item, i) =>
          serviceHelper.isBasemap(val.mapTypeId)
            ? mapper.basemapMapping(item)
            : mapper.dynamicMapping(item)
        ),
      };
      return obj;
    } else
      return serviceHelper.isBasemap(val.mapTypeId)
        ? mapper.basemapMapping(val)
        : mapper.dynamicMapping(val);
  },
  subLayerMapping: (item, layer) => {
    item.color = null;
    item.type = serviceTypeEnum.SUBLAYER;
    item.isSelected = true;
    item.uid = parseInt(layer.id.toString() + item.id.toString());
    item.parent = layer;
    return item;
  },
  mapLayers: (layers) => {
    let baseLayers = layers
      .filter((c) => c.mapTypeId === "basemap")
      .map((val) => mapper.recursiveMap(val));

    let dynamicLayers = layers
      .filter((c) => c.mapTypeId === "dynamic")
      .map((val) => mapper.recursiveMap(val));

    var mapResult = {
      baseLayers,
      dynamicLayers,
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
  },

  recursiveTreeMapping: (arr, callback) => {
    var list = [];
    for (let i = 0; i < arr.length; i++) {
      var item = arr[i];
      var item = mapper.recursiveTreeSelectMapping(item, callback);
      if (item) list.push(item);
    }
    return list;
  },
  recursiveTreeSelectMapping: (item, callback) => {
    if (callback && typeof callback === "function") {
      item = callback(item);
    }
    if (!item) return item;
    var isCategory = serviceHelper.isCategory(item);
    if (isCategory) {
      var category = {
        id: item.id,
        label: item.name,
        children: [...item.children, ...item.layers],
      };

      for (var i = 0; i < category.children.length; i++) {
        category.children[i] = mapper.recursiveTreeSelectMapping(
          category.children[i],
          callback
        );
      }
      return category;
    } else {
      return { id: item.id, label: item.name };
    }
  },
};

const functions = {
  renderArcgisSublayerConfig: (service) => {
    var subLayers = service.layers;
    var activeLayers = subLayers
      .filter((c) => c.isSelected)
      .map((item, index) => {
        return item.id;
      });
    var hiddenLayers = subLayers
      .filter((c) => !c.isSelected)
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
  renderSubLayersColorString: (layer) => {
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
  },

  treeFilter(data, label) {
    var r = data.filter(function(o) {
      if (serviceHelper.isCategory(o)) {
        o.children = functions.treeFilter(o.children, label);
        var isContains = o.layers.some((c) =>
          c.name.toLowerCase().includes(label.toLowerCase())
        );
        if (o.layers)
          o.layers = o.layers.filter((c) =>
            c.name.toLowerCase().includes(label.toLowerCase())
          );

        return isContains || o.children.length > 0;
      } else {
        return o.name.toLowerCase().includes(label.toLowerCase());
      }
    });

    return r;
  },
};

export default {
  ...functions,
  // ...serviceHelper,
  ...mapper,
};
