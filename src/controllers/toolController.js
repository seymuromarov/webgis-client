import $store from "@/store/store.js";
import {
  mapController,
  modalController,
  tableController,
  ndviController,
} from "@/controllers";
import { drawTypeEnum } from "@/enums";
import { mapHelper } from "@/helpers";
import {
  featureStyle,
  pointStyle,
  textPointStyle,
} from "@/constants/featureStyles";
import { _ } from "vue-underscore";
import { stringDivider } from "@/utils";
import {
  Graticule,
  Stroke,
  KML,
  shiftKeyOnly,
  Draw,
  createRegularPolygon,
  createBox,
  Feature,
  Text,
  fromLonLat,
  Point,
  VectorLayer,
  VectorSource,
  getArea,
  getLength,
  LineString,
  Polygon,
  Circle,
  unByKey,
  Style,
  CircleStyle,
  Overlay,
  Fill,
  transform,
} from "@/wrappers/openLayerImports";
import { get } from "ol/proj";
import layerController from "./layerController";

let lastEvent = null;

const functions = {
  pickDrawType(type, callback, featureOptions) {
    let map = mapController.getMap();
    setters.setDrawType(type);
    map.removeInteraction(getters.getDraw());

    setters.setColorPickStatus(false);
    setters.setMarkerStatus(false);
    setters.setRemoveStatus(false);
    if (type !== drawTypeEnum.NONE) {
      setters.setInteractionStatus(true);
      functions.addInteraction(type, callback, featureOptions);
    } else {
      setters.setInteractionStatus(false);
    }

    setters.addFeatureIdCounter(10);
    document.body.style.cursor = "default";
  },
  buildGeometryFunction(type) {
    let geometryFunction = null;
    if (type !== drawTypeEnum.NONE) {
      switch (type) {
        case drawTypeEnum.SQUARE:
          geometryFunction = createRegularPolygon(4);
          break;
        case drawTypeEnum.BOX:
          geometryFunction = createBox();
          break;
        case drawTypeEnum.CIRCLE:
          geometryFunction = createRegularPolygon(120);
          break;
      }
    }
    return geometryFunction;
  },
  deleteFeature() {
    functions.pickDrawType(drawTypeEnum.NONE);
    setters.setRemoveStatus(true);
  },
  eyeDropper() {
    functions.pickDrawType(drawTypeEnum.NONE);
    modalController.showColorPickerModal();
    setters.setColorPickStatus(true);
  },
  resetFeatures() {
    functions.pickDrawType(drawTypeEnum.NONE);

    document.querySelectorAll(".maptooltip").forEach((el) => el.remove());

    let source = mapController.getDrawSource();
    source.clear();
    mapController.setDrawSource(source);
  },
  exportData() {
    let source = mapController.getDrawSource();
    mapController.setDrawSource(source.clear());
    let features = source.getFeatures();
    let area = new KML({
      maxDepth: 10,
      extractStyles: true,
      featureProjection: "EPSG:3857",
    }).writeFeatures(features, {
      featureProjection: "EPSG:3857",
    });
    const blob = new Blob([area], { type: "text/plain" });
    const e = document.createEvent("MouseEvents"),
      a = document.createElement("a");
    a.download = "shapes.kml";
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
    e.initEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    a.dispatchEvent(e);
  },

  deleteFeatureTooltip(featureId) {
    let elem = document.getElementsByClassName(`feature-${featureId}`);
    elem[0].remove();
  },
  deleteServiceFeatures(id) {
    let service = layerController.getLayer(id);

    if (service) {
      var serviceInfo = {
        id: service.id,
        type: service.type,
      };
      //delete past features for this service
      functions.deleteFeatureByCallback((feature) => {
        var forService = feature.get("forService");
        let isEqual = _.isMatch(forService, serviceInfo);
        if (isEqual) functions.deleteFeatureTooltip(feature.get("id"));
        return isEqual;
      });
    }
  },
  deleteFeatureByName(name) {
    functions.deleteFeatureByCallback((feature) => {
      var n = feature.get("name");
      let isEqual = n == name;
      return isEqual;
    });
  },
  deleteFeatureByCallback(callback) {
    let source = mapController.getDrawSource();
    let features = source.getFeatures();
    if (!_.isUndefined(callback) && _.isFunction(callback)) {
      var result = _.filter(features, (feature) => {
        return callback(feature);
      });

      for (var i = 0; i < result.length; i++) {
        var item = result[i];
        source.removeFeature(item);
      }
      mapController.setDrawSource(source);
    }
  },
  addText(text, coord) {
    const weight = "normal";
    const size = "14px";
    const height = 1;
    const fontType = "Arial";
    var font = weight + " " + size + "/" + height + " " + fontType;
    let feature = new Feature({
      geometry: new Point(fromLonLat([coord[0], coord[1]])),
    });

    feature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({ color: "#00000000" }),
          stroke: new Stroke({ color: "#00000000", width: 1 }),
        }),
        text: new Text({
          textAlign: "center",
          textBaseline: "middle",
          font: font,
          text: stringDivider(text, 16, "\n"),
          fill: new Fill({ color: "#aa3300" }),
          stroke: new Stroke({ color: "#ffffff", width: 3 }),
          offsetX: 0,
          offsetY: 0,
          placement: "point",
        }),
      })
    );

    var drawSource = mapController.getDrawSource();
    drawSource.addFeature(feature);
    mapController.setDrawSource(drawSource);
  },

  addInteraction(type, callback, featureOptions) {
    setters.setColorPickStatus(false);
    setters.setMarkerStatus(false);
    setters.setRemoveStatus(false);

    let geometryFunction = functions.buildGeometryFunction(type);
    let geomType = type;
    switch (type) {
      case drawTypeEnum.SQUARE:
        geomType = drawTypeEnum.CIRCLE;
        break;
      case drawTypeEnum.BOX:
        geomType = drawTypeEnum.CIRCLE;
        break;
      case drawTypeEnum.TEXT:
        geomType = drawTypeEnum.POINT;
        break;
    }

    var options = {
      source: mapController.getDrawSource(),
      type: geomType,
      freehandCondition: shiftKeyOnly,
      condition: function(e) {
        // when the point's button is 1(leftclick), allows drawing
        if (e.pointerEvent.buttons === 1) {
          return true;
        } else {
          return false;
        }
      },
    };

    if (geometryFunction) options.geometryFunction = geometryFunction;

    let draw = new Draw(options);
    setters.setDraw(draw);
    let map = mapController.getMap();
    map.addInteraction(draw);
    mapController.setMap(map);
    // map.addOverlay(functions.createMeasureOverlay());
    // map.addOverlay(functions.createHelpOverlay());

    functions.createMeasuremaptooltip();
    functions.createHelpmaptooltip();

    let listener;
    mapController.setSketch(null);
    draw.on(
      "drawstart",
      function(evt) {
        mapController.setSketch(evt.feature);
        /** @type {module:ol/coordinate~Coordinate|undefined} */
        let maptooltipCoord = evt.coordinate;
        let sketch = mapController.getSketch();

        listener = sketch.getGeometry().on("change", function(evt) {
          let geom = evt.target;
          let output;

          if (geom instanceof Polygon) {
            output = mapHelper.formatArea(geom);
            maptooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = mapHelper.formatLength(geom);
            maptooltipCoord = geom.getLastCoordinate();
          } else if (geom instanceof Circle) {
            output = mapHelper.formatCircleRadius(geom);
            maptooltipCoord = geom.getLastCoordinate();
          }
          let measuremaptooltipElement = getters.getMeasureMapTooltipElement();
          let measuremaptooltip = getters.getMeasureMapTooltip();
          try {
            measuremaptooltipElement.innerHTML = output;
            measuremaptooltip.setPosition(maptooltipCoord);
          } catch (e) {
            functions.createMeasuremaptooltip();
            measuremaptooltipElement.innerHTML = output;
            measuremaptooltip.setPosition(maptooltipCoord);
          }
        });
      },
      this
    );

    document.removeEventListener("mousedown", lastEvent);
    lastEvent = (e) => {
      if (e.which == 3) {
        draw.removeLastPoint();
      }
    };
    document.addEventListener("mousedown", lastEvent);

    draw.on(
      "drawend",
      function(e) {
        let measuremaptooltipElement = getters.getMeasureMapTooltipElement();
        let measuremaptooltip = getters.getMeasureMapTooltip();

        try {
          measuremaptooltipElement.className = `maptooltip maptooltip-static feature-${getters.getFeatureIdCounter()}`;
          measuremaptooltip.setOffset([0, -7]);
          let coordinates = [];

          let t = e.feature.getGeometry().getType();
          if (geomType == drawTypeEnum.POINT) {
            coordinates = e.feature.getGeometry().getCoordinates();
            coordinates = transform(coordinates, "EPSG:3857", "EPSG:4326");
          } else if (geomType == drawTypeEnum.LINESTRING) {
            coordinates = e.feature.getGeometry().getCoordinates();
            for (var i = 0; i < coordinates.length; i++) {
              coordinates[i] = transform(
                coordinates[i],
                "EPSG:3857",
                "EPSG:4326"
              );
            }
          } else {
            coordinates = e.feature.getGeometry().getCoordinates()[0];
            for (var i = 0; i < coordinates.length; i++) {
              coordinates[i] = transform(
                coordinates[i],
                "EPSG:3857",
                "EPSG:4326"
              );
            }
          }

          setters.setBbox(coordinates);
        } catch (e) {
          functions.createMeasuremaptooltip();
          measuremaptooltipElement.className = `maptooltip maptooltip-static feature-${getters.getFeatureIdCounter()}`;
          measuremaptooltip.setOffset([0, -7]);
        }
        mapController.setSketch(null);
        measuremaptooltipElement = null;
        unByKey(listener);

        let featureOpt = {
          id: getters.getFeatureIdCounter(),
          name: "",
        };
        if (!_.isUndefined(featureOptions) && _.isObject(featureOptions)) {
          featureOpt = Object.assign(featureOpt, featureOptions); //extend object
        }
        e.feature.setProperties(featureOpt);

        if (type !== drawTypeEnum.TEXT) {
          if (type !== drawTypeEnum.POINT) {
            e.feature.setStyle(featureStyle);
          } else if (type === drawTypeEnum.POINT) {
            e.feature.setStyle(pointStyle);
          }
        } else {
          e.feature.setStyle(textPointStyle);
        }

        setters.addFeatureIdCounter(10);

        if (!_.isUndefined(callback) && _.isFunction(callback)) {
          callback();
        }
      },
      this
    );
  },

  createHelpmaptooltip() {
    let element = getters.getHelpMapTooltipElement();
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
      setters.setHelpMapTooltipElement(element);
    }

    let helpmaptooltipElement = document.createElement("div");
    helpmaptooltipElement.className = "maptooltip hidden";
    let helpmaptooltip = new Overlay({
      element: helpmaptooltipElement,
      offset: [15, 0],
      positioning: "center-left",
    });
    setters.setHelpMapTooltipElement(helpmaptooltipElement);
    setters.setHelpMapTooltip(helpmaptooltip);

    let map = mapController.getMap();
    map.addOverlay(helpmaptooltip);
    mapController.setMap(map);
  },
  createMeasuremaptooltip() {
    let element = getters.getMeasureMapTooltipElement();
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
      setters.setMeasureMapTooltipElement(element);
    }

    let measuremaptooltipElement = document.createElement("div");
    measuremaptooltipElement.className = "maptooltip maptooltip-measure";
    let measuremaptooltip = new Overlay({
      element: measuremaptooltipElement,
      offset: [0, -15],
      positioning: "bottom-center",
    });
    setters.setMeasureMapTooltipElement(measuremaptooltipElement);
    setters.setMeasureMapTooltip(measuremaptooltip);

    let map = mapController.getMap();
    map.addOverlay(measuremaptooltip);
    mapController.setMap(map);
  },

  pngExport() {
    let map = mapController.getMap();
    map.once("rendercomplete", function(event) {
      let canvas = event.context.canvas;
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(canvas.msToBlob(), "map.png");
      } else {
        canvas.toBlob(function(blob) {
          saveAs(blob, "map.png");
        });
      }
    });
    map.renderSync();
  },

  addGraticule() {
    if (getters.getGraticuleVisibility()) {
      let graticule = getters.getGraticuleLayer();
      graticule.setMap(null);
      setters.setGraticuleLayer(graticule);
      setters.setGraticuleVisibility(false);
    } else {
      let map = mapController.getMap();
      let graticule = new Graticule({
        strokeStyle: new Stroke({
          color: "rgba(255,120,0,0.9)",
          width: 2,
          lineDash: [0.5, 4],
        }),
        showLabels: true,
        map: map,
      });
      setters.setGraticuleLayer(graticule);
      setters.setGraticuleVisibility(true);
    }
  },
  addPlace() {
    functions.pickDrawType(drawTypeEnum.NONE);
    setters.setMarkerStatus(true);
  },
  fullScreen() {
    if (
      window.innerWidth == screen.width &&
      window.innerHeight == screen.height
    ) {
      document.exitFullscreen();
    } else {
      document.querySelector("body").requestFullscreen();
    }
  },
  changeDetector() {
    setters.setBbox([]);
    functions.pickDrawType(drawTypeEnum.BOX);
    setters.setDrawForChangeDetectionStatus(true);
  },
  ndviAssessment(callback) {
    setters.setBbox([]);
    functions.pickDrawType(drawTypeEnum.BOX, callback);
  },
};
const getters = {
  getGraticuleVisibility() {
    return $store.getters.graticuleVisibility;
  },
  getGraticuleLayer() {
    return $store.getters.graticuleLayer;
  },
  getDraw() {
    return $store.getters.draw;
  },
  getBbox() {
    return $store.getters.bbox;
  },
  getDrawType() {
    return $store.getters.drawType;
  },

  getColorPickStatus() {
    return $store.getters.isColorPick;
  },
  getMarkerStatus() {
    return $store.getters.isMarker;
  },
  getInteractionStatus() {
    return $store.getters.isInteraction;
  },
  getRemoveStatus() {
    return $store.getters.isRemove;
  },
  getFeatureIdCounter() {
    return $store.getters.featureIdCounter;
  },
  getDrawForChangeDetectionStatus() {
    return $store.getters.isDrawForChangeDetection;
  },

  getMeasureMapTooltipElement() {
    return $store.getters.measuremaptooltipElement;
  },

  getMeasureMapTooltip() {
    return $store.getters.measuremaptooltip;
  },
  getHelpMapTooltipElement() {
    return $store.getters.helpmaptooltipElement;
  },
  getHelpMapTooltip() {
    return $store.getters.helpmaptooltip;
  },
};

const setters = {
  setGraticuleVisibility(val) {
    $store.dispatch("saveGraticuleVisibility", val);
  },
  setGraticuleLayer(val) {
    $store.dispatch("saveGraticule", val);
  },
  setDrawForChangeDetectionStatus(val) {
    $store.dispatch("saveDrawForChangeDetectionStatus", val);
  },
  setDraw(val) {
    $store.dispatch("saveDraw", val);
  },
  setBbox(val) {
    $store.dispatch("saveBbox", val);
  },

  setColorPickStatus(val) {
    $store.dispatch("saveColorPickStatus", val);
  },
  setMarkerStatus(val) {
    $store.dispatch("saveMarkerStatus", val);
  },
  setInteractionStatus(val) {
    $store.dispatch("saveInteractionStatus", val);
  },
  setRemoveStatus(val) {
    $store.dispatch("saveRemoveStatus", val);
  },
  setDrawType(val) {
    $store.dispatch("saveDrawType", val);
  },
  setFeatureIdCounter(val) {
    $store.dispatch("saveFeatureIdCounter", val);
  },
  addFeatureIdCounter(val) {
    val += getters.getFeatureIdCounter();
    setters.setFeatureIdCounter(val);
  },

  setMeasureMapTooltipElement(val) {
    $store.dispatch("saveMeasuremapTooltipElement", val);
  },

  setMeasureMapTooltip(val) {
    $store.dispatch("saveMeasuremapTooltip", val);
  },
  setHelpMapTooltipElement(val) {
    $store.dispatch("saveHelpmapTooltipElement", val);
  },
  setHelpMapTooltip(val) {
    $store.dispatch("saveHelpmapTooltip", val);
  },
};

const checkers = {};
export default { ...functions, ...getters, ...setters };
