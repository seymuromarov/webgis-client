import $store from "@/store/store.js";
import { mapController, modalController } from "@/controllers";
import { drawTypeEnum } from "@/enums";
import { _ } from "vue-underscore";

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
    transform
} from "@/wrappers/openLayerImports";
import { get } from "ol/proj";

const functions = {
    pickDrawType(type, callback) {
        let map = mapController.getMap();
        setters.setDrawType(type);
        map.removeInteraction(getters.getDraw());
        setters.setColorPickStatus(false);
        setters.setMarkerStatus(false);
        setters.setRemoveStatus(false);
        if (type !== drawTypeEnum.NONE) {
            functions.addInteraction(type, callback);
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

        //let elements = document.getElementsByClassName("maptooltip");
        //for (let i = 0; i < elements.length; i++) {
        //    elements[i].setAttribute("style", "display:none;");
        //}

        document.querySelectorAll('.maptooltip')
            .forEach((el) => el.remove());

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
    addInteraction(type, callback) {
        setters.setColorPickStatus(false);
        setters.setMarkerStatus(false);
        setters.setRemoveStatus(false);

        let geometryFunction = functions.buildGeometryFunction(type);

        switch (type) {
            case drawTypeEnum.SQUARE:
                type = drawTypeEnum.CIRCLE;
                break;
            case drawTypeEnum.BOX:
                type = drawTypeEnum.CIRCLE;
                break;
        }

        var options = {
            source: mapController.getDrawSource(),
            type: type,
            freehandCondition: shiftKeyOnly,
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
            function (evt) {
                mapController.setSketch(evt.feature);
                /** @type {module:ol/coordinate~Coordinate|undefined} */
                let maptooltipCoord = evt.coordinate;
                let sketch = mapController.getSketch();

                listener = sketch.getGeometry().on("change", function (evt) {
                    let geom = evt.target;
                    let output;

                    if (geom instanceof Polygon) {
                        output = functions.formatArea(geom);
                        maptooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof LineString) {
                        output = functions.formatLength(geom);
                        maptooltipCoord = geom.getLastCoordinate();
                    } else if (geom instanceof Circle) {
                        output = functions.formatCircleRadius(geom);
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

        draw.on(
            "drawend",
            function (e) {
                let measuremaptooltipElement = getters.getMeasureMapTooltipElement();
                let measuremaptooltip = getters.getMeasureMapTooltip();

                try {
                    measuremaptooltipElement.className = `maptooltip maptooltip-static feature-${getters.getFeatureIdCounter()}`;
                    measuremaptooltip.setOffset([0, -7]);

                    let bbox = e.feature.getGeometry().getCoordinates()[0];
                    for (var i = 0; i < bbox.length; i++) {
                        bbox[i] = transform(bbox[i], "EPSG:3857", "EPSG:4326");
                    }

                    setters.setBbox(bbox);
                } catch (e) {
                    functions.createMeasuremaptooltip();
                    measuremaptooltipElement.className = `maptooltip maptooltip-static feature-${getters.getFeatureIdCounter()}`;
                    measuremaptooltip.setOffset([0, -7]);
                }
                mapController.setSketch(null);
                measuremaptooltipElement = null;
                unByKey(listener);

                e.feature.setProperties({
                    id: getters.getFeatureIdCounter(),
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

                if (type !== "Point") {
                    e.feature.setStyle(newStyle);
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
        if (element) {
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
        if (element) {
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
        map.once("rendercomplete", function (event) {
            let canvas = event.context.canvas;
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(canvas.msToBlob(), "map.png");
            } else {
                canvas.toBlob(function (blob) {
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

    formatArea(polygon) {
        let area = getArea(polygon);
        let output;
        if (area > 10000) {
            output =
                Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
        } else {
            output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
        }
        return output;
    },

    formatLength(line) {
        let length = getLength(line);
        let output;
        if (length > 100) {
            output = Math.round((length / 1000) * 100) / 100 + " " + "km";
        } else {
            output = Math.round(length * 100) / 100 + " " + "m";
        }
        return output;
    },

    formatCircleRadius(line) {
        let length = line.getRadius() * METERS_PER_UNIT["m"];
        let output;
        if (length > 100) {
            output = Math.round((length / 1000) * 100) / 100 + " " + "km";
        } else {
            output = Math.round(length * 100) / 100 + " " + "m";
        }
        return output;
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
