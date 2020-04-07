import $store from "@/store/store.js";
import { tileTypeEnum } from "@/enums";
import { serviceController } from "@/controllers";
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
} from "@/wrappers/openLayerImports";

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
  deleteService(service) {
    var map = mapLayer.get();
    map.getLayers().forEach(function(layer) {
      if (
        layer.get("name") != undefined &&
        layer.get("name") === service.name
      ) {
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
    };
    const isLayer = serviceHelper.isLayer(service);

    let new_layer;

    let url = URL + "/api/map/service/" + service.name + "/MapServer/";
    if (isLayer) {
      var isDynamic = serviceHelper.isDynamic(service);
      if (isDynamic) {
        if (serviceHelper.isLocalService(service)) {
          new_layer = new VectorTileLayer({
            ...defaultProps,
            source: new VectorTileSource({
              format: new MVT({
                geometryName: "geom",
              }),
              url: tileHelper.buildTileUrl(service, tileTypeEnum.LOCAL_MVT),
            }),
            style: colorHelper.buildVectorStyle(service.color),
          });
        } else {
          new_layer = new ImageLayer({
            ...zoomLevelProperties,
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
          url = url + "/tile/{z}/{y}/{x}?token=" + token;
          new_layer = new TileLayer({
            ...zoomLevelProperties,
            source: new XYZ({
              url: url,
              projection: "EPSG:3857",
              crossOrigin: "Anonymous",
            }),
          });
        } else {
          new_layer = new TileLayer({
            ...zoomLevelProperties,
            source: new TileArcGISRest({
              url: url,
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
      var queryParams = service.layers.map((item, index) => {
        return {
          layerId: item.id,
          query: item.query,
        };
      });
      var params = { queries: queryParams };
      new_layer = new VectorTileLayer({
        id: service.id,
        source: new VectorTileSource({
          format: new MVT({
            geometryName: "geom",
          }),
          url:
            URL +
            "/api/Tile/Intersect/VectorAsMvt" +
            `/${service.id}/{z}/{x}/{y}/?` +
            qs.stringify(params, {
              arrayFormat: "indices",
              allowDots: true,
            }),
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

          return colorHelper.buildVectorStyle(service.color);
        },
      });
    }

    return new_layer;
  },
};

const setters = {
  setZIndex(service) {
    let map = mapLayer.get();
    map.getLayers().forEach((layer) => {
      if (
        layer.get("name") != undefined &&
        layer.get("name") === service.name
      ) {
        layer.setZIndex(serviceController.calculateZIndex(service));
      }
    });
  },
};

const getters = {
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
    return {
      maxResolution: createXYZ().getResolution(service.minZoomLevel) * 1.01,
      minResolution: createXYZ().getResolution(service.maxZoomLevel),
    };
  },
};
export default { ...functions, ...getters, ...setters };
