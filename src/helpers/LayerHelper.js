import { emlakUsers } from "../constants/permissions";
import { layerTypeEnum } from "../constants/enums/layerEnums";

let baseCounter = 0;
let dynamicCounter = 0;

const LayerHelper = {
  basemapMapping: val => {
    return {
      id: val.id,
      name: val.label,
      showingLabel: val.showingLabel,
      order: LayerHelper.baseCounter++,
      spatial: val.spatial,
      minZoomLevel: val.minZoomLevel,
      maxZoomLevel: val.maxZoomLevel,
      extent: val.extent,
      resourceType: val.resourceTypeId,
      mapType: val.mapTypeId,
      type: layerTypeEnum.LAYER,
      isDisabled: val.isDisabled,
      isSelected: false,

      layersVisibility: false,
      collapseVisibility: false,

      unitedDynamicLayerName:
        val.unitedDynamicLayer != null
          ? LayerHelper.basemapMapping(val.unitedDynamicLayer)
          : null,

      layers: null
    };
  },
  dynamicMapping: val => {
    return {
      id: val.resourceTypeId === "local" ? val.id : val.id,
      name: val.label,
      showingLabel: val.showingLabel,
      order: LayerHelper.dynamicCounter++,
      minZoomLevel: val.minZoomLevel,
      maxZoomLevel: val.maxZoomLevel,
      extent: val.extent,
      resourceType: val.resourceTypeId,
      mapType: val.mapTypeId,
      type: layerTypeEnum.LAYER,
      isDisabled: val.isDisabled,
      isSelected: false,
      isColorEnabled: true,

      ...(val.resourceTypeId === "local" && { color: null }),

      layersVisibility: false,
      collapseVisibility: false,

      query: { where: "" },
      layers: null,
      apiFrom: "internal"
    };
  },
  recursiveMap: (val, index) => {
    if (val.layers !== undefined) {
      return {
        name: val.label,
        mapTypeId: val.mapTypeId,
        children: val.children.map((val, i) =>
          LayerHelper.recursiveMap(val, index)
        ),
        type: layerTypeEnum.CATEGORY,
        layers: val.layers.map((val, i) =>
          val.mapTypeId == "basemap"
            ? LayerHelper.basemapMapping(val)
            : LayerHelper.dynamicMapping(val)
        )
      };
    } else
      return val.mapTypeId == "basemap"
        ? LayerHelper.basemapMapping(val)
        : LayerHelper.dynamicMapping(val);
  },
  mapLayers: layers => {
    baseCounter = 0;
    dynamicCounter = 0;
    let baseLayers = layers
      .filter(c => c.mapTypeId === "basemap")
      .map((val, index) => LayerHelper.recursiveMap(val));

    let dynamicLayers = layers
      .filter(c => c.mapTypeId === "dynamic")
      .map((val, index) => LayerHelper.recursiveMap(val));

    var mapResult = {
      baseLayers,
      dynamicLayers
    };
    return mapResult;
  },
  mapSubLayer: (item, layer) => {
    item.color = null;
    item.type = layerTypeEnum.SUBLAYER;
    item.isSelected = true;
    item.uid = parseInt(layer.id.toString() + item.id.toString());
    item.parent = layer;
    return item;
  },

  isLocalService: service => {
    return service.resourceType === "local";
  },
  isArcgisService: service => {
    return service.resourceType === "azcArcgis";
  },

  isDynamic(service) {
    return service.mapType == "dynamic";
  },
  isBasemap(service) {
    return service.mapType == "basemap";
  },

  isDynamicFromArcgis(service) {
    return (
      LayerHelper.isArcgisService(service) && LayerHelper.isDynamic(service)
    );
  },
  isDynamicFromLocal(service) {
    return (
      LayerHelper.isLocalService(service) && LayerHelper.isDynamic(service)
    );
  },

  isCategory: service => {
    return service.type === layerTypeEnum.CATEGORY;
  },
  isLayer: service => {
    return service.type === layerTypeEnum.LAYER;
  },
  isSublayer: service => {
    return service.type === layerTypeEnum.SUBLAYER;
  },

  makeArcgisSublayerConfig: service => {
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
  }
};

export default LayerHelper;
