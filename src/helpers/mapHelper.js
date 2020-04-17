import { KML } from "ol/format.js";
import Stroke from "ol/style/Stroke";
import Graticule from "ol/Graticule";
import { shiftKeyOnly } from "ol/events/condition";
import Draw, { createRegularPolygon, createBox } from "ol/interaction/Draw.js";
import { Overlay, Feature } from "ol";
import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";
import { getArea, getLength } from "ol/sphere.js";
import { LineString, Polygon, Circle } from "ol/geom.js";
import { unByKey } from "ol/Observable.js";
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import store from "../store/store";

class MapHelper {
  constructor(self) {
    this.data = self;
  }

  historyBack() {
    this.data.historyUpdate = false;
    this.data.historyEventsIndex -= 1;
    let myState = this.data.historyEvents[this.data.historyEventsIndex - 1];
    this.data.mapLayer.getView().setCenter(myState.center);
    this.data.mapLayer.getView().setZoom(myState.zoom);
    this.data.mapLayer.getView().setRotation(myState.rotation);
    this.data.nextHistoryEvent = true;
    if (this.data.historyEventsIndex === 1) {
      this.data.previousHistoryEvent = false;
    }
  }

  historyNext() {
    if (this.data.historyEventsIndex + 1 === this.data.historyEvents.length) {
      this.data.nextHistoryEvent = false;
    }
    this.data.previousHistoryEvent = true;
    this.data.historyUpdate = false;
    this.data.historyEventsIndex += 1;
    let myState = this.data.historyEvents[this.data.historyEventsIndex - 1];
    this.data.mapLayer.getView().setCenter(myState.center);
    this.data.mapLayer.getView().setZoom(myState.zoom);
    this.data.mapLayer.getView().setRotation(myState.rotation);
  }

  exportData() {
    let features = this.data.source.getFeatures();
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
  }

  // addGraticule() {
  //   if (this.data.graticule) {
  //     this.data.graticuleLayer.setMap(null);
  //     this.data.graticule = false;
  //   } else {
  //     this.data.graticuleLayer = new Graticule({
  //       strokeStyle: new Stroke({
  //         color: "rgba(255,120,0,0.9)",
  //         width: 2,
  //         lineDash: [0.5, 4],
  //       }),
  //       showLabels: true,
  //       map: this.data.mapLayer,
  //     });
  //     this.data.graticule = true;
  //   }
  // }

  // pngExport() {
  //   this.data.mapLayer.once("rendercomplete", function(event) {
  //     let canvas = event.context.canvas;
  //     if (navigator.msSaveBlob) {
  //       navigator.msSaveBlob(canvas.msToBlob(), "map.png");
  //     } else {
  //       canvas.toBlob(function(blob) {
  //         saveAs(blob, "map.png");
  //       });
  //     }
  //   });
  //   this.data.mapLayer.renderSync();
  // }

  // resetFeatures() {
  //   this.data.setDrawType("None");
  //   let elements = document.getElementsByClassName("maptooltip");
  //   for (let i = 0; i < elements.length; i++) {
  //     elements[i].setAttribute("style", "display:none;");
  //   }
  //   this.data.source.clear();
  // }

  addInteraction() {
    this.data.isMarker = false;
    this.data.isRemove = false;
    this.data.isColorPick = false;
    let value = this.data.typeSelect;
    if (value !== "None") {
      var geometryFunction;
      if (value === "Square") {
        value = "Circle";
        geometryFunction = createRegularPolygon(4);
      } else if (value === "Box") {
        value = "Circle";
        geometryFunction = createBox();
      } else if (value === "Circle") {
        geometryFunction = createRegularPolygon(120);
      }
      this.data.draw = new Draw({
        source: this.data.source,
        type: value,
        geometryFunction: geometryFunction,
        freehandCondition: shiftKeyOnly,
      });
      this.data.mapLayer.addInteraction(this.data.draw);
    } else {
      this.data.draw = new Draw({
        source: this.data.source,
        type: this.data.typeSelect,
        freehandCondition: shiftKeyOnly,
      });

      this.data.mapLayer.addInteraction(this.data.draw);
    }
    this.createMeasuremaptooltip();
    this.createHelpmaptooltip();
    let listener;
    let self = this;
    self.data.draw.on(
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

    self.data.draw.on(
      "drawend",
      function(e) {
        try {
          self.data.measuremaptooltipElement.className =
            "maptooltip maptooltip-static " + self.data.featureIDSet;
          self.data.measuremaptooltip.setOffset([0, -7]);
          let bbox = e.feature.getGeometry().getExtent();
          store.dispatch("SAVE_DRAW_BBOX", bbox);
        } catch (e) {
          self.createMeasuremaptooltip();
          self.data.measuremaptooltipElement.className =
            "maptooltip maptooltip-static " + self.data.featureIDSet;
          self.data.measuremaptooltip.setOffset([0, -7]);
        }
        self.data.sketch = null;
        self.data.measuremaptooltipElement = null;
        unByKey(listener);

        e.feature.setProperties({
          id: self.data.featureIDSet,
          name: "",
        });
        let newStyle = new Style({
          fill: new Fill({ color: "#00000000" }),
          stroke: new Stroke({ color: "#C672F5", width: 2 }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: "#00000000" }),
          }),
        });

        if (self.data.typeSelect !== "Point") {
          e.feature.setStyle(newStyle);
        }

        self.data.featureIDSet += 10;
      },
      this
    );
  }

  renderPolygonVector(coordinates) {
    var polygon = new Polygon([coordinates]);
    var feature = new Feature({
      geometry: polygon,
    });
    var vectorSource = new VectorSource();
    vectorSource.addFeature(feature);

    var style = new Style({
      stroke: new Stroke({
        color: "#FF0000",
        width: 3,
      }),
    });
    var vectorLayer = new VectorLayer({
      type: "draw",
      source: vectorSource,
      style: style,
    });
    return vectorLayer;
  }

  createHelpmaptooltip() {
    if (this.data.helpmaptooltipElement) {
      this.data.helpmaptooltipElement.parentNode.removeChild(
        this.data.helpmaptooltipElement
      );
    }
    this.data.helpmaptooltipElement = document.createElement("div");
    this.data.helpmaptooltipElement.className = "maptooltip hidden";
    this.data.helpmaptooltip = new Overlay({
      element: this.data.helpmaptooltipElement,
      offset: [15, 0],
      positioning: "center-left",
    });
    this.data.mapLayer.addOverlay(this.data.helpmaptooltip);
  }

  createMeasuremaptooltip() {
    if (this.data.measuremaptooltipElement) {
      this.data.measuremaptooltipElement.parentNode.removeChild(
        this.data.measuremaptooltipElement
      );
    }
    this.data.measuremaptooltipElement = document.createElement("div");
    this.data.measuremaptooltipElement.className =
      "maptooltip maptooltip-measure";
    this.data.measuremaptooltip = new Overlay({
      element: this.data.measuremaptooltipElement,
      offset: [0, -15],
      positioning: "bottom-center",
    });
    this.data.mapLayer.addOverlay(this.data.measuremaptooltip);
  }

  static formatArea(polygon) {
    let area = getArea(polygon);
    let output;
    if (area > 10000) {
      output =
        Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
    } else {
      output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
    }
    return output;
  }

  static formatLength(line) {
    let length = getLength(line);
    let output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + " " + "km";
    } else {
      output = Math.round(length * 100) / 100 + " " + "m";
    }
    return output;
  }

  static formatCircleRadius(line) {
    let length = line.getRadius() * METERS_PER_UNIT["m"];
    let output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + " " + "km";
    } else {
      output = Math.round(length * 100) / 100 + " " + "m";
    }
    return output;
  }
}

export default MapHelper;
