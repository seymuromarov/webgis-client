import $store from "@/store/store.js";
import {tileTypeEnum, resolutionOptionTypeEnum} from "@/enums";
import {
  serviceController,
  layerController,
  toolController,
} from "@/controllers";
import {defaultZoomLevelSettings} from "@/config/settings";
import {materialColors} from "@/constants/colors";
import {tokenService} from "@/services";
import {
  operatorEnumTostring,
  distanceEnumToString,
} from "@/utils/enumToString";
import {distanceConvert} from "@/utils/unitConvertor";

import {
  serviceHelper,
  layerHelper,
  tileHelper,
  colorHelper,
  coreHelper,
} from "@/helpers";
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
  Feature,
  Style,
  Icon,
  Stroke,
  Fill,
  CircleStyle,
  transform,
  Polygon,
  TileWMS,
} from "@/wrappers/openLayerImports";
import modalController from "./modalController";
import {drawTypeEnum} from "@/enums";

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

const functions = {
  addService(id) {
    let service = layerController.getLayer(id);
    // if (service.extent != null) {
    //   const { minX, minY, maxX, maxY } = service.extent;
    //   var extent = [minX, minY, maxX, maxY];
    //   functions.fitView(extent);
    // }

    var layer = functions.buildLayer(service.id);
    var zIndex = serviceController.getZIndex(service);
    layer.setZIndex(zIndex);

    let map = getters.getMap();
    map.addLayer(layer);
    setters.setMap(map);
  },

  focusToServicePolygon(layerId, pixel) {
    let layer = getters.getLayer(layerId);

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
  buildSelectionLayer(id) {
    let layer = getters.getLayer(id);
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
  deleteService(id) {
    var layer = getters.getLayer(id);
    functions.removeLayer(layer);
  },
  refreshService(id) {
    functions.deleteService(id);
    functions.addService(id);
  },
  removeLayer(layer) {
    let map = getters.getMap();
    map.removeLayer(layer);
    setters.setMap(map);
  },
  removeDrawPolygons() {
    let map = getters.getMap();
    map.getLayers().forEach(function (layer) {
      if (layer.get("type") === "draw") {
        functions.removeLayer(layer);
      }
    });
    setters.setMap(map);
  },

  focusToGeometry(coords) {
    let geometry = [];
    if (coords.x !== undefined) {
      geometry = [coords.x, coords.y];
    } else if (coords.rings !== undefined) {
      geometry = coords.rings[0];
    }
    if (geometry.length > 0) {
      geometry = geometry.map((item, index) =>
        transform(item, "EPSG:4326", "EPSG:3857")
      );
      var extent = new Polygon([geometry]);

      let map = getters.getMap();
      map.getView().fit(extent, {
        padding: [-50, 50, 30, 150],
        size: [50, 100],
        maxZoom: 16,
      });
      setters.setMap(map);
    }
  },
  fitView(extent) {
    var map = getters.getMap();
    map.getView().fit(extent);
    setters.setMap(map);
  },
  buildLayer(id) {
    const service = layerController.getLayer(id);
    const token = tokenService.getToken();

    const defaultProps = {
      id: service.id,
      name: service.name,
      ...getters.getResolutionOptions(service),
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

            style: (feature) => {
              var layerColor = service.layerColor;
              let borderColor = null;
              let fillColor = null;
              let isConditionExist = false;
              if (layerColor) {
                const column = layerColor.column;
                const currentFeatureColumnVal = feature.get(column);
                const conditions = layerColor.conditions;
                for (let i = 0; i < conditions.length; i++) {
                  const item = conditions[i];
                  var operator = operatorEnumTostring(item.operator);
                  const val = coreHelper.parseByTypeString(
                    layerColor.columnDataType,
                    item.value
                  );
                  const result = coreHelper.checkStringArithmeticOperation(
                    currentFeatureColumnVal,
                    val,
                    operator
                  );
                  if (result) {
                    isConditionExist = true;
                    borderColor = item.borderColor;
                    fillColor = item.fillColor;
                    break;
                  }
                }
              }

              if (!layerColor || !isConditionExist) {
                borderColor = service.color.borderColor;
                fillColor = service.color.fillColor;
              }
              return colorHelper.buildVectorStyle(borderColor, fillColor);
            },
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
        if (service.resourceType == "geowebcache") {
          layer = new TileLayer({
            ...defaultProps,
            source: new TileWMS({
              url: service.sourceUrl,
              params: {
                LAYERS: service.name,
                TILED: true,
                transparent: true,
                format: "image/png",
                srs: "EPSG:3857",
                WIDTH: 256,
                HEIGHT: 256,
              },
            }),
          });
        } else if (service.resourceType == "geoserver") {
          layer = new TileLayer({
            ...defaultProps,
            source: new TileWMS({
              url: service.sourceUrl,
              params: {
                LAYERS: service.name,
                TILED: true,
                format: "image/png",
              },
              serverType: 'geoserver',
            }),
          });

        }else if (service.resourceType == "geoserverGws") {
          layer = new TileLayer({
            ...defaultProps,
            source: new TileWMS({
              url: service.sourceUrl,
              params: {
                LAYERS: service.name,
                TILED: true,
                format: "image/png",
              },
            }),
          });

        } else if (service.spatial === 3857) {
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
      //Bunch layer
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

const events = {
  onMapClick(evt) {
    let coord = transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
    setters.setClickedCoordinate(coord);
    setters.setClickedPixel(evt.pixel);
    if (toolController.getRemoveStatus()) {
      var map = getters.getMap();
      map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        try {
          var drawSource = getters.getDrawSource();
          drawSource.removeFeature(feature);
          let elem = document.getElementsByClassName(
            `feature-${feature.get("id")}`
          );
          elem[0].remove();
          setters.setDrawSource(drawSource);
        } catch (e) {
        }
      });
    } else if (toolController.getColorPickStatus()) {
      var map = getters.getMap();
      map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        try {
          let newStyle = new Style({
            fill: new Fill({
              color: self.shapeFillColor.hex8,
            }),
            stroke: new Stroke({
              color: self.shapeBorderColor.hex8,
              width: 2,
            }),
            image: new CircleStyle({
              radius: 7,
              fill: new Fill({
                color: self.shapeFillColor.hex8,
              }),
            }),
          });

          feature.setStyle(newStyle);
        } catch (e) {
        }
      });
      setters.setMap(map);
    } //only map click
    else if (toolController.getDrawType() === drawTypeEnum.NONE) {
      modalController.showServiceSelectionModal();
    }
    // if (tableController.getTableVisibility()) {
    //   alert();
    //   // tableController.getGeometryData(coord);
    //   // mapController.focusToServicePolygon(evt.pixel);
    // }
  },
};

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
    let map = getters.getMap();
    map.getLayers().forEach((layer) => {
      if (layer.get("id") != undefined && layer.get("id") === service.id) {
        layer.setZIndex(serviceController.getZIndex(service));
      }
    });
  },
  setBaseLayout(index) {
    let map = getters.getMap();
    let layers = map.getLayers().getArray();
    layers[0].setSource(baseMaps[index]);
    setters.setMap(map);
  },
  setZoomLevel(zoom) {
    let map = getters.getMap();
    map.getView().setZoom(zoom);
    setters.setMap(map);
  },
  setCenter(center) {
    let map = getters.getMap();
    center = transform(center, "EPSG:4326", "EPSG:3857");
    map.getView().setCenter(center);
    setters.setMap(map);
  },
  setColorsArray(val) {
    $store.dispatch("SAVE_COLOR_PICKER_DYNAMIC_COLORS", val);
  },
  setClickedCoordinate(val) {
    $store.dispatch("saveClickedCoordinate", val);
  },
  setClickedPixel(val) {
    $store.dispatch("saveClickedPixel", val);
  },
};

const getters = {
  getMap() {
    return $store.getters.mapLayer;
  },
  getCurrentZoomLevel() {
    let map = getters.getMap();
    let view = map.getView();
    let zoom = view.getZoom();
    return zoom;
  },
  getCurrentCenter() {
    let map = getters.getMap();
    let view = map.getView();
    let center = view.getCenter();

    return transform(center, "EPSG:3857", "EPSG:4326");
  },
  getCurrentRotation() {
    let map = getters.getMap();
    let view = map.getView();
    let rotation = view.getRotation();
    return rotation;
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
  getClickedCoordinate() {
    return $store.getters.clickedCoordinate;
  },
  getClickedPixel() {
    return $store.getters.clickedPixel;
  },
  getLayer(id) {
    let map = getters.getMap();
    let layer = null;

    map.getLayers().forEach(function (item) {
      var layerId = item.get("id");
      if (layerId !== undefined && layerId === id) {
        layer = item;
      }
    });
    return layer;
  },
  getBaseMaps() {
    return baseMaps;
  },
  getActiveDynamicLayersColorsGetter() {
    return $store.getters.activeDynamicLayersColors;
  },

  getResolutionOptions(service) {
    const resolutionOption = service.resolutionOption;

    if (resolutionOption && serviceHelper.isLayer(service)) {
      let maxResolution = resolutionOption.maxResolution;
      let minResolution = resolutionOption.minResolution;
      if (resolutionOption.type == resolutionOptionTypeEnum.ZOOM) {
        return {
          maxResolution: createXYZ().getResolution(minResolution) * 1.01,
          minResolution: createXYZ().getResolution(maxResolution),
        };
      } else {
        var scaleUnit = resolutionOption.scaleUnit;
        var scaleUnitString = distanceEnumToString(scaleUnit);

        maxResolution = distanceConvert(scaleUnitString, "km", maxResolution);
        minResolution = distanceConvert(scaleUnitString, "km", minResolution);

        const factor = 10; //for openlayers scale convertion
        return {
          maxResolution: maxResolution * factor,
          minResolution: minResolution * factor,
        };
      }
    } else {
      //for bunch and default
      return {
        maxResolution:
          createXYZ().getResolution(defaultZoomLevelSettings.minZoomLevel) *
          1.01,
        minResolution: createXYZ().getResolution(
          defaultZoomLevelSettings.maxZoomLevel
        ),
      };
    }
  },
};
export default {...functions, ...getters, ...setters, ...events};
