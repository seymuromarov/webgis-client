import $store from "@/store/store.js";
import { tileTypeEnum, layerTypeEnum } from "@/enums";
import { serviceController, tableController } from "@/controllers";
import { defaultZoomLevelSettings } from "@/config/settings";
import { materialColors } from "@/config/colors";
import { tokenService } from "@/services";
import { serviceHelper, layerHelper, tileHelper, colorHelper } from "@/helpers";
import {
  createXYZ,
  VectorTileLayer,
  VectorTileSource,
  MVT,
  ImageLayer,
  ImageArcGISRest,
  TileLayer,
  XYZ,
  TileArcGISRest,
  Style,
  Stroke,
  Fill,
} from "@/wrappers/openLayerImports";
const selectedLayerStyle = new Style({
  stroke: new Stroke({
    color: "rgba(200,20,20,1)",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(200,20,20,0.4)",
  }),
});
const baseMaps = {
  none: new XYZ({
    crossOrigin: "Anonymous",
    url: "",
  }),
  satellite: new XYZ({
    name: "sat",
    url:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  }),
  street: new XYZ({
    url:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  }),
  gray: new XYZ({
    crossOrigin: "Anonymous",
    url:
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  }),
};

const mapLayer = {
  get() {
    return $store.getters.mapLayer;
  },
  set(val) {
    $store.dispatch("saveMap", val);
  },
};

const functions = {
  addService(service) {
    if (service.extent != null) {
      const { minX, minY, maxX, maxY } = service.extent;
      var extent = [minX, minY, maxX, maxY];
      functions.fitView(extent);
    }

    var layer = functions.buildLayer(service);
    var zIndex = serviceController.getZIndex(service);
    layer.setZIndex(zIndex);

    let map = mapLayer.get();
    map.addLayer(layer);
    mapLayer.set(map);
  },
  focusToServicePolygon(pixel) {
    let activeService = tableController.getTableActiveService();
    let layer = getters.getLayer(activeService.id);

    layer.getFeatures(pixel).then((features) => {
      //after getfeatures , ol adding chunk canvas sections into html.this is for delete them
      var canvases = document
        .querySelectorAll('canvas[width="256"][height="256"]')
        .forEach((el) => el.remove());

      let selectionLayer = getters.getSelectionLayer();
      if (!features.length) {
        setters.setSelectedFeatureId(0);
        selectionLayer.changed();
        return;
      }
      var feature = features[0];
      if (!feature) {
        return;
      }
      var fid = feature.getId();
      setters.setSelectedFeatureId(fid);
      selectionLayer.changed();
    });
  },
  buildSelectionLayer(service) {
    let layer = getters.getLayer(service.id);
    let source = layer.getSource();
    let selectionLayer = new VectorTileLayer({
      map: getters.getMap(),
      renderMode: "vector",
      source: source,
      style: (feature) => {
        if (feature != null)
          if (feature.getId() == getters.getSelectedFeatureId()) {
            return selectedLayerStyle;
          }
      },
    });
    setters.setSelectionLayer(selectionLayer);
  },
  resetSelectionLayer() {
    setters.setSelectionLayer(null);
    setters.setSelectedFeatureId(0);
  },
  deleteService(service) {
    var layer = getters.getLayer(service.id);
    functions.removeLayer(layer);
  },
  refreshService(service) {
    functions.deleteService(service, false);
    functions.addService(service);
  },
  removeLayer(layer) {
    let map = mapLayer.get();
    map.removeLayer(layer);
    mapLayer.set(map);
  },
  removeDrawPolygons() {
    let map = mapLayer.get();
    map.getLayers().forEach(function(layer) {
      if (layer.get("type") === "draw") {
        functions.removeLayer(layer);
      }
    });
    mapLayer.set(map);
  },
  fitView(extent) {
    var map = mapLayer.get();
    map.getView().fit(extent);
    mapLayer.set(map);
  },
  buildLayer(service) {
    const token = tokenService.getToken();

    const defaultProps = {
      id: service.id,
      name: service.name,
      zoomLevelProperties: getters.getZoomLevelOptions(service),
      type: service.type,
    };
    const isLayer = serviceHelper.isLayer(service);

    let layer;
    if (isLayer) {
      var isDynamic = serviceHelper.isDynamic(service);
      if (isDynamic) {
        if (serviceHelper.isLocalService(service)) {
          layer = new VectorTileLayer({
            ...defaultProps,
            declutter: true,
            source: new VectorTileSource({
              format: new MVT({
                idProperty: "gid",
                geometryName: "geom",
              }),
              url: tileHelper.buildTileUrl(service, tileTypeEnum.LOCAL_MVT),
            }),
            style: colorHelper.buildVectorStyle(service.color),
          });
        } else {
          layer = new ImageLayer({
            ...defaultProps,
            source: new ImageArcGISRest({
              url: tileHelper.buildTileUrl(
                service,
                tileTypeEnum.IMAGE_ARCGIS_REST
              ),
              crossOrigin: "Anonymous",
              params: {
                token: token,
                layers: layerHelper.renderArcgisSublayerConfig(service),
                dynamicLayers: layerHelper.renderSubLayersColorString(service),
              },
            }),
          });
        }
      } else {
        if (service.spatial === 3857) {
          layer = new TileLayer({
            ...defaultProps,
            source: new XYZ({
              url: tileHelper.buildTileUrl(service, tileTypeEnum.XYZ),
              projection: "EPSG:3857",
              crossOrigin: "Anonymous",
            }),
          });
        } else {
          layer = new TileLayer({
            ...defaultProps,
            source: new TileArcGISRest({
              url: tileHelper.buildTileUrl(
                service,
                tileTypeEnum.TILE_ARCGIS_REST
              ),
              crossOrigin: "Anonymous",
              params: {
                token: token,
                FORMAT: "png8",
              },
            }),
          });
        }
      }
    } else {
      layer = new VectorTileLayer({
        ...defaultProps,
        source: new VectorTileSource({
          format: new MVT({
            geometryName: "geom",
          }),
          url: tileHelper.buildTileUrl(service, tileTypeEnum.LOCAL_MVT),
        }),
        style: (feature) => {
          var featureLayerId = feature.get("layerId");
          var layerIds = service.layers.map((item) => {
            return item.id;
          });
          var index = layerIds.indexOf(featureLayerId);

          var color = materialColors[index];
          var colorObj = {
            border: {
              hex8: color,
            },
            fill: {
              hex8: "#FFFFFF00",
            },
          };
          return colorHelper.buildVectorStyle(colorObj);
        },
      });
    }

    return layer;
  },
};

const events = {};

const setters = {
  setMap(val) {
    $store.dispatch("saveMap", val);
  },
  setSelectionLayer(val) {
    $store.dispatch("saveSelectionLayer", val);
  },
  setSelectedFeatureId(val) {
    $store.dispatch("saveSelectedFeatureId", val);
  },
  setDrawSource(val) {
    $store.dispatch("saveDrawSource", val);
  },
  setSketch(val) {
    $store.dispatch("saveSketch", val);
  },
  setZIndex(service) {
    let map = mapLayer.get();
    map.getLayers().forEach((layer) => {
      if (layer.get("id") != undefined && layer.get("id") === service.id) {
        layer.setZIndex(serviceController.calculateZIndex(service));
      }
    });
  },
  setBaseLayout(index) {
    let map = mapLayer.get();
    let layers = map.getLayers().getArray();
    layers[0].setSource(baseMaps[index]);
    setters.setMap(map);
  },
};

const getters = {
  getMap() {
    return $store.getters.mapLayer;
  },
  getSelectionLayer() {
    return $store.getters.selectionLayer;
  },
  getSelectedFeatureId() {
    return $store.getters.selectedFeatureId;
  },
  getDrawSource() {
    return $store.getters.drawSource;
  },
  getSketch() {
    return $store.getters.sketch;
  },
  getLayer(id) {
    let map = mapLayer.get();
    let layer = null;

    map.getLayers().forEach(function(lyr) {
      var layerId = lyr.values_.id;
      if (layerId !== undefined && layerId === id) {
        layer = lyr;
      }
    });
    return layer;
  },
  getBaseMaps() {
    return baseMaps;
  },
  getZoomLevelOptions(service) {
    let min, max;
    if (serviceHelper.isLayer(service)) {
      min = service.minZoomLevel;
      max = service.maxZoomLevel;
    } else {
      min = defaultZoomLevelSettings.minZoomLevel;
      max = defaultZoomLevelSettings.maxZoomLevel;
    }
    return {
      maxResolution: createXYZ().getResolution(min) * 1.01,
      minResolution: createXYZ().getResolution(max),
    };
  },
};
export default { ...functions, ...getters, ...setters };
