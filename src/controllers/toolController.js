import $store from "@/store/store.js";
import { mapController } from "@/controllers";
import { drawTypeEnum } from "@/enums";
import {
  Graticule,
  Stroke,
  KML,
  shiftKeyOnly,
  Draw,
  createRegularPolygon,
  createBox,
  Feature,
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
} from "@/wrappers/openLayerImports";

const events = {
  onDrawStart(evt) {
    // let sketch = evt.feature;
    // /** @type {module:ol/coordinate~Coordinate|undefined} */
    // let maptooltipCoord = evt.coordinate;
    // listener = sketch.getGeometry().on("change", function(evt) {
    //   let geom = evt.target;
    //   let output;
    //   if (geom instanceof Polygon) {
    //     output = MapHelper.formatArea(geom);
    //     maptooltipCoord = geom.getInteriorPoint().getCoordinates();
    //   } else if (geom instanceof LineString) {
    //     output = MapHelper.formatLength(geom);
    //     maptooltipCoord = geom.getLastCoordinate();
    //   } else if (geom instanceof Circle) {
    //     output = MapHelper.formatCircleRadius(geom);
    //     maptooltipCoord = geom.getLastCoordinate();
    //   }
    //   try {
    //     self.data.measuremaptooltipElement.innerHTML = output;
    //     self.data.measuremaptooltip.setPosition(maptooltipCoord);
    //   } catch (e) {
    //     self.createMeasuremaptooltip();
    //     self.data.measuremaptooltipElement.innerHTML = output;
    //     self.data.measuremaptooltip.setPosition(maptooltipCoord);
    //   }
    // });
  },
};
const functions = {
  buildEventListener() {},
  setDrawType(type) {
    let map = mapController.getMap();
    setters.setDrawType(type);
    map.removeInteraction(getters.getDraw());
    setters.setColorPickStatus(false);
    setters.setMarkerStatus(false);
    setters.setRemoveStatus(false);
    if (type !== drawTypeEnum.NONE) {
      functions.addInteraction(type);
    }
    setters.addFeatureIdCounter(10);
    document.body.style.cursor = "default";
  },
  buildGeometryFunction(type) {
    console.log("buildGeometryFunction -> type", type);
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
    console.log("buildGeometryFunction -> geometryFunction", geometryFunction);
    return geometryFunction;
  },
  deleteFeature() {
    functions.setDrawType(drawTypeEnum.NONE);
    setters.setRemoveStatus(true);
  },
  eyeDropper() {
    functions.setDrawType(drawTypeEnum.NONE);
    this.$moodal.colorPickerModal.show();
    setters.setColorPickStatus(true);
  },
  resetFeatures() {
    functions.setDrawType(drawTypeEnum.NONE);

    let elements = document.getElementsByClassName("maptooltip");
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute("style", "display:none;");
    }
    let source = mapController.getDrawSource();
    mapController.setDrawSource(source.clear());
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
  addInteraction(type) {
    console.log("addInteraction -> type", type);
    setters.setColorPickStatus(false);
    setters.setMarkerStatus(false);
    setters.setRemoveStatus(false);

    let geometryFunction = functions.buildGeometryFunction(type);

    var options = {
      source: mapController.getDrawSource(),
      type: type,
      freehandCondition: shiftKeyOnly,
    };
    if (geometryFunction) options.geometryFunction = geometryFunction;
    console.log("addInteraction -> options", options);

    let draw = new Draw(options);

    let map = mapController.getMap();
    map.addInteraction(draw);

    map.addOverlay(functions.createMeasureOverlay());
    map.addOverlay(functions.createHelpOverlay());

    mapController.setMap(map);

    let listener;
    let self = this;
    draw.on(
      "drawstart",
      function(evt) {
        self.data.sketch = evt.feature;
        /** @type {module:ol/coordinate~Coordinate|undefined} */
        let maptooltipCoord = evt.coordinate;
        listener = self.data.sketch.getGeometry().on("change", function(evt) {
          let geom = evt.target;
          let output;

          if (geom instanceof Polygon) {
            output = MapHelper.formatArea(geom);
            maptooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = MapHelper.formatLength(geom);
            maptooltipCoord = geom.getLastCoordinate();
          } else if (geom instanceof Circle) {
            output = MapHelper.formatCircleRadius(geom);
            maptooltipCoord = geom.getLastCoordinate();
          }
          try {
            self.data.measuremaptooltipElement.innerHTML = output;
            self.data.measuremaptooltip.setPosition(maptooltipCoord);
          } catch (e) {
            self.createMeasuremaptooltip();
            self.data.measuremaptooltipElement.innerHTML = output;
            self.data.measuremaptooltip.setPosition(maptooltipCoord);
          }
        });
      },
      this
    );

    // self.data.draw.on(
    //   "drawend",
    //   function(e) {
    //     try {
    //       self.data.measuremaptooltipElement.className =
    //         "maptooltip maptooltip-static " + self.data.featureIDSet;
    //       self.data.measuremaptooltip.setOffset([0, -7]);
    //       let bbox = e.feature.getGeometry().getExtent();
    //       store.dispatch("SAVE_DRAW_BBOX", bbox);
    //     } catch (e) {
    //       self.createMeasuremaptooltip();
    //       self.data.measuremaptooltipElement.className =
    //         "maptooltip maptooltip-static " + self.data.featureIDSet;
    //       self.data.measuremaptooltip.setOffset([0, -7]);
    //     }
    //     self.data.sketch = null;
    //     self.data.measuremaptooltipElement = null;
    //     unByKey(listener);

    //     e.feature.setProperties({
    //       id: self.data.featureIDSet,
    //       name: ""
    //     });
    //     let newStyle = new Style({
    //       fill: new Fill({ color: "#00000000" }),
    //       stroke: new Stroke({ color: "#C672F5", width: 2 }),
    //       image: new CircleStyle({
    //         radius: 7,
    //         fill: new Fill({ color: "#00000000" })
    //       })
    //     });

    //     if (self.data.typeSelect !== "Point") {
    //       e.feature.setStyle(newStyle);
    //     }

    //     self.data.featureIDSet += 10;
    //   },
    //   this
    // );
  },

  createHelpOverlay() {
    //eger varsa butun hamisini sil
    // if (this.data.helpmaptooltipElement) {
    //   this.data.helpmaptooltipElement.parentNode.removeChild(
    //     this.data.helpmaptooltipElement
    //   );
    // }
    let helpToolTip = document.createElement("div");
    helpToolTip.className = "maptooltip hidden";
    return new Overlay({
      element: helpToolTip,
      offset: [15, 0],
      positioning: "center-left",
    });
    // let map = mapController.getMap();
    // map.addOverlay(overlay);
    // mapController.setMap(map);
  },
  createMeasureOverlay() {
    // if (this.data.measuremaptooltipElement) {
    //   this.data.measuremaptooltipElement.parentNode.removeChild(
    //     this.data.measuremaptooltipElement
    //   );
    // }
    let measureToolTip = document.createElement("div");
    measureToolTip.className = "maptooltip maptooltip-measure";
    return new Overlay({
      element: measureToolTip,
      offset: [0, -15],
      positioning: "bottom-center",
    });
    // let map = mapController.getMap();
    // map.addOverlay(overlay);
    // mapController.setMap(map);
  },
  // createMeasuremaptooltip() {
  //   if (this.data.measuremaptooltipElement) {
  //     this.data.measuremaptooltipElement.parentNode.removeChild(
  //       this.data.measuremaptooltipElement
  //     );
  //   }
  //   this.data.measuremaptooltipElement = document.createElement("div");
  //   this.data.measuremaptooltipElement.className =
  //     "maptooltip maptooltip-measure";
  //   this.data.measuremaptooltip = new Overlay({
  //     element: this.data.measuremaptooltipElement,
  //     offset: [0, -15],
  //     positioning: "bottom-center",
  //   });
  //   this.data.mapLayer.addOverlay(this.data.measuremaptooltip);
  // }

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
    functions.setDrawType(drawTypeEnum.NONE);
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
    functions.setDrawType(drawTypeEnum.BOX);
    setters.setDrawForChangeDetectionStatus(true);
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
  getColorPickStatus() {
    return $store.getters.isColorPick;
  },
  getMarkerStatus() {
    return $store.getters.isMarker;
  },
  getRemoveStatus() {
    return $store.getters.isRemove;
  },
  getFeatureIdCounter() {
    return $store.getters.featureIdCounter;
  },
  getDrawForChangeDetectionStatus() {
    return$store.getters.isDrawForChangeDetection;
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
};

const checkers = {};
export default { ...functions, ...getters, ...setters };
