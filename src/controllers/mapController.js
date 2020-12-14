import $store from "@/store/store.js";
import $i18n from "@/lang";
import {
  tileTypeEnum,
  resolutionOptionTypeEnum,
  coordinateTypeEnum,
} from "@/enums";
import { serviceController, toolController } from "@/controllers";
import { defaultZoomLevelSettings } from "@/config/settings";
import { materialColors } from "@/constants/colors";
import { selectedLayerStyle } from "@/constants/featureStyles";
import { tokenService } from "@/services";
import { distanceEnumToString } from "@/utils/enumToString";
import { distanceConvert } from "@/utils/unitConvertor";

import { serviceHelper, urlHelper, colorHelper } from "@/helpers";
import {
  createXYZ,
  VectorTileLayer,
  VectorTileSource,
  MVT,
  TileLayer,
  XYZ,
  TileArcGISRest,
  Style,
  Stroke,
  Fill,
  CircleStyle,
  transform,
  transformExtent,
  Polygon,
  TileWMS,
} from "@/wrappers/openLayerImports";
import modalController from "./modalController";
const resolutionFactor = 10;

const functions = {
  addService(service) {
    //get last version
    service = serviceController.getServiceByObj(service);

    var layer = functions.buildLayer(service);
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
  deleteService(service) {
    var layer = getters.getLayer(service.id);

    functions.removeLayer(layer);
  },
  refreshService(service) {
    functions.deleteService(service);
    functions.addService(service);
  },
  removeLayer(layer) {
    let map = getters.getMap();
    map.removeLayer(layer);
    setters.setMap(map);
  },
  removeDrawPolygons() {
    let map = getters.getMap();
    map.getLayers().forEach(function(layer) {
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
  buildLayer(service) {
    service = serviceController.getServiceByObj(service);
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
        var isConditionalColorExist = service.layerColor != null;
        console.log(
          "🚀 ~ file: mapController.js ~ line 163 ~ buildLayer ~ isConditionalColorExist",
          isConditionalColorExist
        );

        layer = new VectorTileLayer({
          ...defaultProps,
          declutter: true,
          source: new VectorTileSource({
            format: new MVT({
              idProperty: "gid",
              geometryName: "geom",
            }),
            url: urlHelper.buildTileUrl(service, tileTypeEnum.LOCAL_MVT),
          }),
          style: isConditionalColorExist
            ? (feature) => colorHelper.renderMvtStyle(feature, service)
            : colorHelper.buildVectorStyle(),
        });
      } else {
        if (serviceHelper.isGeowebcacheService(service)) {
          layer = new TileLayer({
            ...defaultProps,
            source: new TileWMS({
              url: urlHelper.buildTileUrl(service, tileTypeEnum.WMS),
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
        } else if (serviceHelper.isGeoserverService(service)) {
          layer = new TileLayer({
            ...defaultProps,
            source: new TileWMS({
              url: urlHelper.buildTileUrl(service, tileTypeEnum.WMS),
              params: {
                LAYER: service.name,
                TILED: true,
                format: "image/png",
              },
              serverType: "geoserver",
            }),
          });
        } else if (serviceHelper.isGeoserverGwsService(service)) {
          layer = new TileLayer({
            ...defaultProps,
            source: new TileWMS({
              url: urlHelper.buildTileUrl(service, tileTypeEnum.WMS),
              params: {
                LAYERS: service.name,
                TILED: true,
                format: "image/png",
                srs: "EPSG:3857",
              },
            }),
          });
        } else if (service.spatial === 3857) {
          layer = new TileLayer({
            ...defaultProps,
            source: new XYZ({
              url: urlHelper.buildTileUrl(service, tileTypeEnum.XYZ),
              projection: "EPSG:3857",
              crossOrigin: "Anonymous",
            }),
          });
        } else {
          layer = new TileLayer({
            ...defaultProps,
            source: new TileArcGISRest({
              url: urlHelper.buildTileUrl(
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
          url: urlHelper.buildTileUrl(service, tileTypeEnum.LOCAL_MVT),
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
        } catch (e) {}
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
        } catch (e) {}
      });
      setters.setMap(map);
    } //only map click
    else if (!toolController.getInteractionStatus()) {
      modalController.showServiceSelectionModal();
    }
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
  setCurrentResolution(val) {
    let map = getters.getMap();
    let view = map.getView();
    view.setResolution(val * resolutionFactor);
    setters.setMap(map);
  },
  setBaseLayout(index) {
    let map = getters.getMap();
    let layers = map.getLayers().getArray();
    layers[0].setSource(getters.getBaseLayouts()[index].layout);
    setters.setMap(map);
  },
  setZoomLevel(zoom) {
    let map = getters.getMap();
    map.getView().setZoom(zoom);
    setters.setMap(map);
  },
  setCenter(center, type) {
    let map = getters.getMap();
    if (type && type == coordinateTypeEnum.GEOGRAPHIC)
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
  getCurrentExtent() {
    let map = getters.getMap();
    var extent = map.getView().calculateExtent(map.getSize());
    return transformExtent(extent, "EPSG:3857", "EPSG:4326");
  },
  getCurrentResolution() {
    let map = getters.getMap();
    let view = map.getView();
    var val = view.getResolution() / resolutionFactor;
    return val;
  },
  getCurrentCenter(type) {
    let map = getters.getMap();
    let view = map.getView();
    let center = view.getCenter();

    if (type && type == coordinateTypeEnum.GEOGRAPHIC)
      center = transform(center, "EPSG:3857", "EPSG:4326");

    return center;
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
  getScaleLineOptions() {
    var opt = $store.getters.scaleOptions;
    var value = 0;
    var unit = "km";
    var width = 62;
    if (opt) {
      var t = opt.renderedHTML_.split(" ");

      value = t[0];
      unit = t[1];
      width = opt.renderedWidth_;
    }

    return { value, unit, width };
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

    map.getLayers().forEach(function(item) {
      var layerId = item.get("id");
      var layerType = item.get("type");
      if (layerId !== undefined && layerId === id) {
        layer = item;
      }
    });
    return layer;
  },
  getBaseLayouts() {
    const layouts = [
      {
        name: $i18n.t("menu.baseLayouts.options.none"),
        layout: new XYZ({
          crossOrigin: "Anonymous",
          url: "",
        }),
      },
      {
        name: $i18n.t("menu.baseLayouts.options.satellite"),
        layout: new XYZ({
          name: "sat",
          url:
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        }),
      },
      {
        name: $i18n.t("menu.baseLayouts.options.street"),
        layout: new XYZ({
          url:
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        }),
      },
      {
        name: $i18n.t("menu.baseLayouts.options.gray"),
        layout: new XYZ({
          crossOrigin: "Anonymous",
          url:
            "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        }),
      },
    ];
    return layouts;
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

        return {
          maxResolution: maxResolution * resolutionFactor,
          minResolution: minResolution * resolutionFactor,
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
export default { ...functions, ...getters, ...setters, ...events };
