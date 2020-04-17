import $store from "@/store/store.js";
import { tileTypeEnum, layerTypeEnum } from "@/enums";
import { serviceController } from "@/controllers";
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
  TileArcGISRest
} from "@/wrappers/openLayerImports";

const mapLayer = {
  get() {
    return $store.getters.mapLayer;
  },
  set(val) {
    $store.dispatch("saveMap", val);
  }
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
  deleteService(service) {
    var map = mapLayer.get();
    map.getLayers().forEach(function(layer) {
      if (layer.get("id") != undefined && layer.get("id") === service.id) {
        functions.removeLayer(layer);
      }
    });
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
      type: service.type
    };
    const isLayer = serviceHelper.isLayer(service);

    let layer;
    if (isLayer) {
      var isDynamic = serviceHelper.isDynamic(service);
      if (isDynamic) {
        if (serviceHelper.isLocalService(service)) {
          layer = new VectorTileLayer({
            ...defaultProps,
            source: new VectorTileSource({
              format: new MVT({
                geometryName: "geom"
              }),
              url: tileHelper.buildTileUrl(service, tileTypeEnum.LOCAL_MVT)
            }),
            style: colorHelper.buildVectorStyle(service.color)
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
                dynamicLayers: layerHelper.renderSubLayersColorString(service)
              }
            })
          });
        }
      } else {
        if (service.spatial === 3857) {
          layer = new TileLayer({
            ...defaultProps,
            source: new XYZ({
              url: tileHelper.buildTileUrl(service, tileTypeEnum.XYZ),
              projection: "EPSG:3857",
              crossOrigin: "Anonymous"
            })
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
                FORMAT: "png8"
              }
            })
          });
        }
      }
    } else {
      layer = new VectorTileLayer({
        ...defaultProps,
        source: new VectorTileSource({
          format: new MVT({
            geometryName: "geom"
          }),
          url: tileHelper.buildTileUrl(service, tileTypeEnum.LOCAL_MVT)
        }),
        style: feature => {
          var featureLayerId = feature.get("layerId");
          var layerIds = service.layers.map(item => {
            return item.id;
          });
          var index = layerIds.indexOf(featureLayerId);

          var color = materialColors[index];
          var colorObj = {
            border: {
              hex8: color
            },
            fill: {
              hex8: "#FFFFFF00"
            }
          };

          return colorHelper.buildVectorStyle(colorObj);
        }
      });
    }

    return layer;
  }
};

const events = {};

const setters = {
  setMap(val) {
    $store.dispatch("saveMap", val);
  },
  setDrawSource() {
    $store.dispatch("saveDrawSource", val);
  },
  setZIndex(service) {
    let map = mapLayer.get();
    map.getLayers().forEach(layer => {
      if (layer.get("id") != undefined && layer.get("id") === service.id) {
        layer.setZIndex(serviceController.calculateZIndex(service));
      }
    });
  }
};

const getters = {
  getMap() {
    return $store.getters.mapLayer;
  },
  getDrawSource() {
    return $store.getters.drawSource;
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
      minResolution: createXYZ().getResolution(max)
    };
  }
};
export default { ...functions, ...getters, ...setters };
