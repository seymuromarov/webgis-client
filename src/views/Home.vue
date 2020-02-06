<template>
    <div class="row container-fluid padding-0">
        <!-- Sidebar -->
        <!-- :dynamicLayerList="dynamicLayerList" -->
        <Sidebar
                :selectedLayers="selectedLayers"
                :dynamicSubLayerList="dynamicSubLayerList"
                :baseLayerList="baseLayerList"
                :baseLayersShow="baseLayersShow"
                :dragOptions="dragOptions"
                @saveColor="saveColor"
                @dynamicLayerListOnChange="dynamicLayerList = $event"
                @selectedLayersOnChange="
				(e, id) => (selectedLayers[id] = e.target.value)
			"
                @dynamicSubLayerListOnChange="
				(e, name, id) =>
					(dynamicSubLayerList[name][id] = e.target.value)
			"
                @onMoveCallbackDynamicLayerList="onMoveCallbackDynamicLayerList"
                @selectService="selectService"
                @dynamicLayersReset="dynamicLayersReset"
                @selectSubService="selectSubService"
                @getTableData="getTableData"
                @openColorPicker="OpenColorPicker"
                @setBaseLayersShow="val => (baseLayersShow = val)"
                @setBaseLayerList="baseLayerList = $event"
                @onMoveCallbackBaseLayerList="onMoveCallbackBaseLayerList"
                @basemapLayersReset="basemapLayersReset"
        />

        <!-- Main content -->
        <div class="padding-0 map-layout">
            <div id="map">
                <button
                        class="action-button-class btn btn-control"
                        :style="{ top: '15%' }"
                        title="Search"
                        @click="cityInputToggle"
                >
                    <i class="fas fa-search"></i>
                </button>

                <div
                        style="position: absolute;top: 14.2%;right: 60px;z-index: 999"
                        v-show="citySearchInputShow"
                >
                    <multiselect
                            v-model="citySearchValue"
                            :options="citySearchOptions"
                            :custom-label="nameWithCountry"
                            selectLabel
                            placeholder="Select City"
                            label="city"
                            track-by="city"
                            @select="onCitySelect"
                    ></multiselect>
                </div>

                <button
                        class="action-button-class btn btn-control"
                        :style="{ top: '65%' }"
                        title="Delete Feature"
                        @click="deleteFeatureOn"
                >
                    <i class="fas fa-trash"></i>
                </button>
                <button
                        class="action-button-class btn btn-control"
                        :style="{ top: '70%' }"
                        title="Reset Features"
                        @click="resetFeatures"
                >
                    <i class="fas fa-sync-alt"></i>
                </button>
                <button
                        class="action-button-class btn btn-control"
                        :style="{ top: '75%' }"
                        title="Color Picker"
                        @click="eyeDropper"
                >
                    <i class="fas fa-eye-dropper"></i>
                </button>

                <button
                        v-for="(item, index) in drawings"
                        :key="index"
                        class="action-button-class btn btn-control"
                        :style="{ top: (index + 1) * 5 + 25 + '%' }"
                        :title="item.tooltip"
                        @click="setDrawType(item.name)"
                >
                    <i :class="item.icon"></i>
                </button>

                <button
                        class="action-button-class btn btn-control"
                        :style="{ top: (drawings.length + 5) * 5 + 25 + '%' }"
                        title="Change Detection"
                        @click="changeDetector"
                >
                    <i class="fas fa-globe"></i>
                </button>

                <div
                        id="mouse-position"
                        class="latLongShow"
                        @click="LatLongFormToggle"
                ></div>

                <div class="latLongShowForm" v-show="latLongFormShow">
                    <div @mouseleave="LatLongFormToggle">
                        <div style="width: 300px">
                            <div style="display: inline;float: left;">
                                Lat:
                                <input
                                        v-model="latChange"
                                        v-on:keyup.enter="changeLocation"
                                        class="form-control"
                                        type="text"
                                        placeholder="Latitude"
                                        style="display: inline-block;width: 100px;"
                                />
                            </div>
                            <div style="display: inline;">
                                Lng:
                                <input
                                        v-model="longChange"
                                        v-on:keyup.enter="changeLocation"
                                        class="form-control"
                                        type="text"
                                        placeholder="Longitude"
                                        style="display: inline-block;width: 100px;"
                                />
                            </div>
                        </div>
                        <input
                                class="form-check-input"
                                type="checkbox"
                                v-model="isMetricCoordinateSystem"
                                id="coordinateCheckbox"
                                aria-label
                        />
                        <label class="form-check-label" for="coordinateCheckbox"
                        >Use metric coordinate system</label
                        >
                    </div>
                </div>
                <div id="info" class="infokml" v-show="this.kmlInfo !== null">
                    &nbsp;
                </div>

                <button
                        class="action-button-class btn btn-control"
                        style="bottom: 10px;right: 90px;"
                        @click="dragAndDropToast"
                        title="Upload file"
                        v-if="!isTabelVisible"
                >
                    <i class="fas fa-file-upload"></i>
                </button>
                <button
                        class="action-button-class btn btn-control"
                        style="bottom: 10px;right: 50px;"
                        @click="selectLayerForm = true"
                        v-if="!isTabelVisible"
                >
                    <i class="fas fa-stream"></i>
                </button>
                <button
                        class="action-button-class btn btn-control"
                        style="bottom: 10px;right: 10px;"
                        @click="showInfoModal = true"
                >
                    <i class="fas fa-info"></i>
                </button>
                <div
                        v-show="selectLayerForm"
                        @mouseleave="selectLayerForm = false"
                        class="selectLayerForm"
                >
                    <form>
                        <div v-for="(element, index) in baseMaps" :key="index">
                            <input
                                    type="radio"
                                    class
                                    name="baseLayer"
                                    @click="setBaseLayout(index)"
                            />
                            <span style="margin-left: 5px;">{{ index }}</span>
                        </div>
                    </form>
                </div>

                <button
                        class="action-button-class btn btn-control"
                        style="top: 116px;left: .5rem;"
                        title="Home"
                        @click="zoomToCenter"
                >
                    <i class="fas fa-home"></i>
                </button>
                <button
                        class="action-button-class btn btn-control"
                        style="top: 152px;left: .5rem;"
                        title="Go next map history"
                        :disabled="!nextHistoryEvent"
                        @click="historyNext"
                >
                    <i class="fas fa-arrow-right"></i>
                </button>
                <button
                        class="action-button-class btn btn-control"
                        style="top: 188px;left: .5rem;"
                        title="Go previous map history"
                        :disabled="!previousHistoryEvent"
                        @click="historyBack"
                >
                    <i class="fas fa-arrow-left"></i>
                </button>

                <button
                        class="action-button-class btn btn-control"
                        style="top: 224px;left: .5rem;"
                        @click="addGraticule"
                        title="Add Graticule"
                        v-show="!isTabelVisible"
                >
                    <i class="fas fa-barcode"></i>
                </button>

                <button
                        class="action-button-class btn btn-control"
                        style="bottom: 10px;left: 3rem;"
                        @click="pngExport"
                        title="Export to png"
                        v-show="!isTabelVisible"
                >
                    <i class="far fa-file-image"></i>
                </button>

                <button
                        class="action-button-class btn btn-control"
                        style="bottom: 10px;left: .5rem;"
                        @click="exportData"
                        title="Export to KMZ"
                        v-show="!isTabelVisible"
                >
                    <i class="fas fa-file-download"></i>
                </button>
            </div>
        </div>

        <DataTable
                ref="dataTable"
                @showFilterModal="showFilterModal"
                @mapSetCenter="mapSetCenter"
        />

        <!-- Report -->
        <modal
                name="arithmetic-result-modal"
                transition="nice-modal-fade"
                :min-width="200"
                :min-height="200"
                :delay="100"
                :draggable="true"
        >
            <Report
                    :arithmeticDataResult="ArithmeticDataResult"
            />
        </modal>

        <!-- Filter -->
        <modal
                name="filter-modal"
                transition="nice-modal-fade"
                class="filter-modal-class"
                :min-width="200"
                :min-height="200"
                :delay="100"
                :draggable="true"
                :height="540"
        >
            <FilterBox
                    :tableHeader="tableHeader"
                    :filterQuery="filterQuery"
                    :filterValues="filterValues"
                    :tableFeaturesHeader="tableFeaturesHeader"
                    :stackedTableFeaturesHeader="stackedTableFeaturesHeader"
                    @appendFilterQuery="filterQuery += $event"
                    @setFilterQuery="filterQuery = $event.target.value"
                    @filterSelectedColumn="filterSelectedColumn"
                    @filterData="filterData"
            />
        </modal>

        <!-- Shape Color Picker -->
        <modal
                name="color-picker-modal"
                transition="nice-modal-fade"
                class="color-picker-modal-class"
                :min-width="200"
                :min-height="200"
                :delay="100"
                :draggable="false"
                :height="400"
        >
            <ShapeColorPicker @setShapeColor="setShapeColor"/>
        </modal>

        <detector-modal
                v-if="lastBBOXOfShape.length > 0 && isDrawnShapeForDetection"
                v-bind="{ lastBBOXOfShape, token }"
                @close="
				($store.state.dataTable.lastBBOXOfShape = []) &
					(isDrawnShapeForDetection = false)
			"
        ></detector-modal>

        <!-- Information Modal -->
        <InfoModal :isOpen="showInfoModal" @close="showInfoModal = false"/>
    </div>
</template>

<script>
    // OpenLayers
    import {Map, View, Overlay, Feature} from "ol";
    import {LineString, Polygon, Circle, Point} from "ol/geom.js";
    import {
        Modify,
        defaults as defaultInteractions,
        DragRotateAndZoom,
        DragAndDrop,
    } from "ol/interaction";
    import TileDebug from "ol/source/TileDebug";
    import {Circle as CircleStyle, Fill, Stroke, Style, Icon} from "ol/style.js";
    import {
        Tile as TileLayer,
        Vector as VectorLayer,
        Image as ImageLayer,
    } from "ol/layer.js";
    import VectorTileLayer from "ol/layer/VectorTile.js";
    import VectorTileSource from "ol/source/VectorTile.js";
    import MVT from "ol/format/MVT.js";
    import {createXYZ} from "ol/tilegrid";
    import {
        OSM,
        TileArcGISRest,
        Vector as VectorSource,
        ImageArcGISRest,
    } from "ol/source.js";
    import {
        fromLonLat,
        METERS_PER_UNIT,
        transform,
        transformExtent,
        get as getProjection,
        getTransform,
    } from "ol/proj";
    import XYZ from "ol/source/XYZ.js";
    import {bbox as bboxStrategy} from "ol/loadingstrategy";
    import {
        ZoomSlider,
        defaults as defaultControls,
        FullScreen,
    } from "ol/control.js";
    import MousePosition from "ol/control/MousePosition.js";
    import {createStringXY} from "ol/coordinate.js";
    import {GPX, GeoJSON, IGC, KML, TopoJSON} from "ol/format.js";
    import {register} from "ol/proj/proj4.js";
    import {applyTransform} from "ol/extent";
    import * as format from "ol/format";

    // Other dependencies
    import proj4 from "proj4";
    import Multiselect from "vue-multiselect";

    // Custom components
    import {
        ShapeColorPicker,
        DataTable,
        Sidebar,
        Filter,
        Report,
    } from "@/components/";
    import InfoModal from "@/components/Info/index";
    import DetectorModal from "@/components/modals/ChangeDetector";

    // Utils
    import {URL, MAP_URLS} from "@/config/baseUrl";
    import {az_json} from "@/assets/json/az";
    import LoginService from "@/services/LoginService";
    import LayerService from "@/services/LayerService";
    import {Toggler, MapHelpers, ColorPicker, LayerHelper} from "@/helpers";

    // Styles
    import "ol/ol.css";

    export default {
        name: "Home",
        components: {
            ShapeColorPicker,
            Multiselect,
            DataTable,
            DetectorModal,
            InfoModal,
            Sidebar,
            FilterBox: Filter,
            Report,
        },
        data() {
            return {
                isDrawnShapeForDetection: false,
                isSimpleModalVisible: false,
                baseLayersShow: true,
                latLongFormShow: false,
                MapHelpers: null,
                Toggler: null,
                ColorPicker: null,
                latChange: null,
                longChange: null,
                lastCoordinates: null,
                filterQuery: "",

                ArithmeticDataResult: {},
                dataFilter: {
                    query: "",
                    arithmeticType: 0,
                },
                filterValues: [],
                mapLayer: null,
                tableQuery: null,
                selectLayerForm: false,
                showColumnsBoolean: false,
                value: [],
                checkedColumns: [],
                checkedColumnsData: [],
                drawings: [
                    {
                        name: "Point",
                        icon: "fas fa-circle",
                        tooltip: "Add Point",
                    },
                    {
                        name: "LineString",
                        icon: "fas fa-long-arrow-alt-right",
                        tooltip: "Add LineString",
                    },
                    {
                        name: "Polygon",
                        icon: "fas fa-draw-polygon",
                        tooltip: "Add Polygon",
                    },
                    {
                        name: "Circle",
                        icon: "far fa-circle",
                        tooltip: "Add Circle",
                    },
                    {
                        name: "Box",
                        icon: "far fa-calendar",
                        tooltip: "Add Rectangle",
                    },
                    {
                        name: "Square",
                        icon: "far fa-square",
                        tooltip: "Add Square",
                    },
                    {
                        name: "None",
                        icon: "fas fa-mouse-pointer",
                        tooltip: "Mouse",
                    },
                ],
                options: [],
                layers: [],
                layerCounter: 0,
                isMarker: false,
                isRemove: false,
                isColorPick: false,
                gisLayers: [],
                token: null,
                emlakToken: null,
                kmlInfo: null,
                source: null,
                vector: null,
                vectorSource: null,
                vectorLayer: null,
                featureIDSet: 0,
                sketch: null,
                typeSelect: null,
                // isTabelVisible: false,
                draw: null,
                stackedTableFeaturesHeader: [],
                tableFeaturesHeader: [],
                tableFeaturesData: [],
                tableFeatureData: [],
                tableNextRequest: [],
                citySearchOptions: [],
                citySearchValue: null,
                citySearchInputShow: false,
                historyUpdate: true,
                nextHistoryEvent: false,
                previousHistoryEvent: false,
                historyEvents: [],
                historyEventsIndex: 0,
                tableFeaturesHeaderWithAlias: [],
                graticule: false,
                graticuleLayer: null,
                tableHeader: null,
                dynamicLayerList: [],
                baseLayerList: [],
                dynamicSubLayerList: [[]],
                helpmaptooltipElement: null,
                helpmaptooltip: null,
                measuremaptooltipElement: null,
                measuremaptooltip: null,
                isMetricCoordinateSystem: false,
                baseMaps: {
                    sat: new XYZ({
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
                    none: new XYZ({
                        crossOrigin: "Anonymous",
                        url: "",
                    }),
                },
                selectedLayers: {},
                dynamicForColors: [[]],
                showInfoModal: false,
                isHashLoaded: false,
            };
        },
        mounted() {
            this.token = this.$cookie.get("token");
            if (this.token === null) this.$router.push("/login");

            this.MapHelpers = new MapHelpers(this);
            this.Toggler = new Toggler(this);
            this.ColorPicker = new ColorPicker(this);
            this.LayerHelper = new LayerHelper(this);
            this.citySearchOptions = az_json;

            this.source = new VectorSource({
                wrapX: false,
            });

            this.vector = new VectorLayer({
                source: this.source,
                features: [],
            });
            this.vector.setZIndex(9999);

            var debug = new TileLayer({
                source: new TileDebug({
                    projection: "EPSG:3857",
                    tileGrid: new OSM().getTileGrid(),
                }),
            });

            let gray = new TileLayer({
                source: new XYZ({
                    crossOrigin: "Anonymous",
                    url:
                        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                }),
            });
            this.LayerService();

            this.$nextTick(function () {
                let dragAndDropInteraction = new DragAndDrop({
                    formatConstructors: [GPX, GeoJSON, IGC, KML, TopoJSON],
                });
                this.layers = [gray, this.vector];

                let zoom = 8;
                let center = fromLonLat([47.82858, 40.3598414]);
                let rotation = 0;

                if (window.location.hash !== "") {
                    let hash = window.location.hash.replace("#shareMap=", "");
                    let parts = hash.split("&");
                    if (parts.length === 4) {
                        zoom = parseInt(parts[0], 10);
                        center = [parseFloat(parts[1]), parseFloat(parts[2])];
                        parts[3].split(",").forEach(element => {
                            this.selectedLayers[parseInt(element)] = true;
                        });
                    }
                }

                this.mapLayer = new Map({
                    interactions: defaultInteractions().extend([
                        new DragRotateAndZoom(),
                        dragAndDropInteraction,
                    ]),
                    controls: defaultControls().extend([new FullScreen()]),
                    target: "map",
                    layers: this.layers,
                    view: new View({
                        center: center,
                        zoom: zoom,
                        rotation: rotation,
                    }),
                });

                let modify = new Modify({
                    source: this.source,
                });
                this.mapLayer.addInteraction(modify);
                let self = this;

                dragAndDropInteraction.on("addfeatures", function (event) {
                    self.source.addFeatures(event.features);
                    self.mapLayer.getView().fit(self.source.getExtent());
                });

                let displayFeatureInfo = function (pixel) {
                    let features = [];
                    self.mapLayer.forEachFeatureAtPixel(pixel, function (feature) {
                        features.push(feature);
                    });
                    if (features.length > 0) {
                        let info = [];
                        let i, ii;
                        for (i = 0, ii = features.length; i < ii; ++i) {
                            if (features[i].get("name") !== undefined) {
                                info.push(features[i].get("name"));
                            }
                        }
                        document.getElementById("info").innerHTML =
                            info.join(", ") || "&nbsp";
                        self.kmlInfo = info.join(", ") || null;
                    } else {
                        document.getElementById("info").innerHTML = "&nbsp;";
                        self.kmlInfo = null;
                    }
                };

                this.mapLayer.on("pointermove", function (evt) {
                    if (evt.dragging) {
                        return;
                    }
                    let pixel = self.mapLayer.getEventPixel(evt.originalEvent);
                    let coord = transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
                    if (self.isMetricCoordinateSystem) {
                        coord = fromLonLat([coord[0], coord[1]]);
                        coord = [
                            coord[1].toString().substring(0, 10),
                            coord[0].toString().substring(0, 10),
                        ];
                    } else {
                        coord = [
                            coord[1].toString().substring(0, 7),
                            coord[0].toString().substring(0, 7),
                        ];
                    }
                    document.getElementById("mouse-position").innerHTML =
                        "Lat: " +
                        coord[1].toString() +
                        " , " +
                        "Long: " +
                        coord[0].toString();
                });

                this.mapLayer.on("click", function (evt) {
                    displayFeatureInfo(evt.pixel);
                    let coord = transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
                    if (self.isMarker) {
                        let iconFeature = new Feature({
                            crossOrigin: "Anonymous",
                            geometry: new Point(fromLonLat([coord[0], coord[1]])),
                            name: "",
                            id: "232",
                        });
                        iconFeature.setStyle(
                            new Style({
                                image: new Icon({
                                    anchor: [0.5, 46],
                                    size: [48, 48],
                                    anchorXUnits: "fraction",
                                    anchorYUnits: "pixels",
                                    src:
                                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAD2ElEQVRogdWaQYgcRRSGv2724HER8eBBFhHJWSWB6ClEood+5pyzJ3P1Ih5EwjKERUQPopJDlICYg4R6IQQMXkxEPETwoBAWWYLIIrIsYQ9xWaY8TPdsbU3XdFV1z5j8UPSb1139/lf16vWr7imstTzOKIDy/ybRB4W1lqIoSmvteKr0fqdARI4BrwMngDVgFRgDO8AfwB3ghqr+1dhw7SXLZMyAtXZcFMWRflVVnQXeA16MvM0t4IKq3k6176LouwZE5BngS+B05i2+As4bY/ZyOh8JIfcIk5GG9ukriqKsquo4oMBTmeQb3APOqOp9107DwZfda7IXcVVVJ4HvgCd6km+wDbyiqlspnbJCSETWgF+YLNAhcQ94KSWcSjicLvfoLlJXFpEV4BuGJw/wAvC5z2GePBM+PvGWjm8BxzuI/A38BGwCe8ABsAtsAQ87+p4TkVdDfPyLV+BwsXblfhEpgXcjyD9dNxerHM7amPlr731r7WsddrDWjo+ETgROA8/OOX/ALPE2dNk7JSJrUSHUFjKhBrzZYXglgnwMSiZP82AINXJprR27ITSvAS8PRDAGJ7r4zISQf/S9BZ5bogPPJ4VQKJV6+ieX6MCqyyckl7HhU1+XVaFmopPPNIR8r0JTBjxYogO7XaMPEAyhgLy5YNIuthq78wa2jJkmJ4R61e6J+CE7C/k6R//1ksjvA9eSQsg9GXJIVe+ynFm4oqo7bXyCIQTRmejCgsmPgVFsWCeFUD0Lt4C7C3TgW2PMZoiPL7dmoa6MBIwWRh9GsXuBoijK7E29iPwOHBuKdY2bxpg3UjoEy2l/V+bqa3Eji+J8jGJHvpFnp8Qj3qavj1eAPwck/2Pzjigm9rNqIbcZY/YZdhbWUzkEa6GQruX8F8A/A5D/1RhzI6djMAt1rv5JSt0HPh7AgZFvN7Yl1UKBB9sn9KtSN4GrufajdmQu/JkwxjxgEkq52FDV6b2Ts1AbsTaiIcdq3YdMCrBUbAOX/XunyNO3CE028uHqQzKwLSKXgLcTHdios1k2knZkbc8IlwyT90Kx2AE+yx35Rk7dkU1l3ylVvQ9cTXDgU1V9GLpfrNw7C3kZaZ24jf8e8NEQNrNrobYRMcb8BlyPcOCSqu72Hf2+tRABeb2D/AGTrJWdeVx5xdqjn20GwM8i8j1wKnD+sjFmsCKwby0UwgcB/T5wMZpdBBb2obuqqovAO45qDJxX1T5P7Rn0/sw6DyJyEjgD/Atcqxf5sKgdKNuObc295lGQp9+JA87NfKP15TkD03nNEGj9r8TjhMFqoa5sNUTOb5P/A8dYOKnlHRBqAAAAAElFTkSuQmCC",
                                }),
                            })
                        );
                        self.source.addFeature(iconFeature);
                    }
                    if (self.isRemove) {
                        self.mapLayer.forEachFeatureAtPixel(evt.pixel, function (
                            feature,
                            layer
                        ) {
                            try {
                                self.source.removeFeature(feature);
                                let elem = document.getElementsByClassName(
                                    feature.get("id")
                                );

                                elem[0].className = "hidden";
                            } catch (e) {
                            }
                        });
                    }
                    if (self.isColorPick) {
                        self.mapLayer.forEachFeatureAtPixel(evt.pixel, function (
                            feature,
                            layer
                        ) {
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
                    }

                    if (self.isTabelVisible) {
                        self.getGeometryData(
                            self.tableNextRequest["service"],
                            self.tableNextRequest["layerId"],
                            self.tableNextRequest["layerName"],
                            self.filterQuery,
                            coord
                        );
                    }
                });

                let view = this.mapLayer.getView();
                let updateHistoryMap = function () {
                    if (self.historyUpdate) {
                        let state = {
                            zoom: view.getZoom(),
                            center: view.getCenter(),
                            rotation: view.getRotation(),
                        };
                        self.updateHash();
                        self.historyEvents.push(state);
                        self.historyEventsIndex = self.historyEvents.length;
                        self.nextHistoryEvent = false;
                        if (self.historyEventsIndex !== 1) {
                            self.previousHistoryEvent = true;
                        }
                    } else {
                        self.historyUpdate = true;
                    }
                };
                self.mapLayer.on("moveend", updateHistoryMap);
                window.addEventListener("popstate", function (event) {
                    if (event.state === null) {
                        return;
                    }
                    self.mapLayer.getView().setCenter(event.state.center);
                    self.mapLayer.getView().setZoom(event.state.zoom);
                    self.mapLayer.getView().setRotation(event.state.rotation);
                });
            });
        },
        methods: {
            objectToQueryString(obj) {
                var str = [];
                for (var p in obj)
                    if (obj.hasOwnProperty(p)) {
                        str.push(
                            encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
                        );
                    }
                return "?" + str.join("&");
            },
            updateHash() {
                let view = this.mapLayer.getView();
                let state = {
                    zoom: view.getZoom(),
                    center: view.getCenter(),
                    rotation: view.getRotation(),
                };

                let selectedLayersArr = Object.keys(this.selectedLayers).map(
                    Number
                );
                let hash =
                    "#shareMap=" +
                    view.getZoom() +
                    "&" +
                    Math.round(view.getCenter()[0] * 100) / 100 +
                    "&" +
                    Math.round(view.getCenter()[1] * 100) / 100 +
                    "&" +
                    selectedLayersArr.toString();

                window.history.pushState(state, "map", hash);
            },
            changeLocation() {
                this.mapLayer
                    .getView()
                    .setCenter(
                        fromLonLat([
                            parseFloat(this.longChange),
                            parseFloat(this.latChange),
                        ])
                    );
            },
            LatLongFormToggle() {
                let loc = document.getElementById("mouse-position").innerHTML;
                loc = loc.split(":").map(item => item.trim());
                let long = loc[2];
                let lat = loc[1].split(",").map(item => item.trim());
                lat = lat[0];
                this.longChange = long;
                this.latChange = lat;
                this.Toggler.setLatLongShowForm();
            },
            setShapeColor() {
                document.body.style.cursor = "crosshair";
                this.$modal.hide("color-picker-modal");
            },
            cityInputToggle() {
                this.Toggler.cityInputToggle(this);
            },
            onCitySelect(city) {
                this.mapLayer
                    .getView()
                    .setCenter(
                        fromLonLat([parseFloat(city.lng), parseFloat(city.lat)])
                    );
                this.mapLayer.getView().setZoom(11);
                this.citySearchInputShow = false;
            },
            nameWithCountry({city, country}) {
                return `${city} , ${country}`;
            },
            historyBack() {
                this.MapHelpers.historyBack(this);
            },
            historyNext() {
                this.MapHelpers.historyNext(this);
            },
            exportData() {
                this.MapHelpers.exportData(this);
            },

            async filterSelectedColumn(column) {
                this.filterValues = [];
                let params = {
                    id: this.$store.state.dataTable.serviceInfo.id,
                };
                if(this.selectedServiceInfo.resourceType==='local')
                {
                    let getLayerColumnsDistinctData = await LayerService.getLayerColumnsDistinctData(params);
                    let result = getLayerColumnsDistinctData.data.result
                    this.filterValues = result[Object.keys(result).find(key => key.toLowerCase() === column.toLowerCase())]
                }
                else
                {
                    let keys = Object.keys(this.tableHeadersWithAlias);
                    for (let i = 0; i < keys.length; i++) {
                        if (this.tableHeadersWithAlias[keys[i]] === column) {
                            column = keys[i];
                            break;
                        }
                    }

                    for (let i = 0; i < this.tableFeaturesData.length; i++) {
                        if (
                            !this.filterValues.includes(
                                this.tableFeaturesData[i].attributes[column]
                            )
                        ) {
                            this.filterValues.push(
                                this.tableFeaturesData[i].attributes[column]
                            );
                        }
                    }
                }
             
                // if (getLayerColumnsDistinctData.status === 200) {
                  
                // } else {
                    
                // }

            },
            filterData() {
                this.getTableData(
                    this.tableNextRequest["service"],
                    this.tableNextRequest["layerId"],
                    this.tableNextRequest["layerName"],
                    this.filterQuery == "" ? {} : {where: this.filterQuery}
                );
                this.$modal.hide("filter-modal");
            },
            addValueToQuery(value) {
                if (typeof value == "string") value = "'" + value + "'";
                this.filterQuery += value + " ";
            },
            dragAndDropToast() {
                let toast = this.$toasted.show(
                    "Drag & drop GPX, GeoJSON, IGC, KML, TopoJSON files over map",
                    {
                        theme: "outline",
                        position: "bottom-center",
                        duration: 3500,
                    }
                );
            },
            zoomToCenter() {
                this.mapLayer
                    .getView()
                    .setCenter(fromLonLat([47.82858, 40.3598414]));
                this.mapLayer.getView().setZoom(8);
            },
            addGraticule() {
                this.MapHelpers.addGraticule();
            },
            pngExport() {
                this.MapHelpers.pngExport();
            },
            setMarkerTrue() {
                this.setDrawType("None");
                this.isMarker = true;
            },
            eyeDropper() {
                this.setDrawType("None");
                this.$modal.show("color-picker-modal", null, {
                    name: "dynamic-modal",
                });
                this.isColorPick = true;
            },
            changeDetector() {
                this.$store.state.dataTable.lastBBOXOfShape = [];
                this.setDrawType("Box");
                this.isDrawnShapeForDetection = true;
            },
            deleteFeatureOn() {
                this.setDrawType("None");
                this.isRemove = true;
            },
            resetFeatures() {
                this.MapHelpers.resetFeatures();
            },
            selectColumns(alias, key, e) {
                if (e.target.checked) {
                    this.checkedColumnsData.push(
                        this.stackedTableFeaturesHeader[key]
                    );
                } else {
                    this.checkedColumnsData = this.checkedColumnsData.filter(
                        data => data != alias
                    );
                }
            },
            showColumnsChange() {
                this.Toggler.showColumnsChange();
            },
            // showSimpleFilterModal(layerId, layerName) {
            //     this.$store.dispatch("SAVE_DATATABLE_LAYER_ID", layerId);
            //     this.$store.dispatch("SAVE_DATATABLE_SERVICE_NAME", layerName);
            //     this.$refs.reportFilterModal.$modal.show(
            //         "simple-data-filter-modal",
            //         null,
            //         {
            //             name: "simple-data-filter-modal",
            //             resizable: false,
            //             adaptive: true,
            //             draggable: false,
            //         }
            //     );
            // },
            mapSetCenter(data) {
                if (data.geometry.x !== undefined) {
                    this.mapLayer
                        .getView()
                        .setCenter(fromLonLat([data.geometry.x, data.geometry.y]));
                } else {
                    this.mapLayer
                        .getView()
                        .setCenter(fromLonLat(data.geometry.rings[0][0]));
                }
            },
            showFilterModal() {
                this.$modal.show("filter-modal", null, {
                    name: "dynamic-modal",
                    resizable: true,
                    adaptive: true,
                    draggable: true,
                });
            },
            addInteraction() {
                this.MapHelpers.addInteraction();
            },
            onMoveCallbackBaseLayerList(evt, originalEvent) {
                this.layerCounter = 0;
                this.baseLayerList = this.baseLayerList.map((item, index) =>
                    this.recursiveLayerOrder(item)
                );
                this.baseLayerList.map((item, index) =>
                    this.recursiveLayerIndexes(item)
                );
            },
            recursiveLayerIndexes(item) {
                if (item.layers !== undefined && item.children !== undefined) {
                    item.layers.map((item, index) =>
                        this.recursiveLayerIndexes(item)
                    );
                } else {
                    this.mapLayer.getLayers().forEach(function (layer) {
                        if (
                            layer.get("name") != undefined &&
                            layer.get("name") === item.name
                        ) {
                            layer.setZIndex(500 - item.order);
                        }
                    });
                }
            },
            recursiveLayerSet(item, serviceName, subLayers) {
                if (this.isItemCategory(item, serviceName)) {

                    return {
                        ...item,
                        layers: item.layers.map(item => this.recursiveLayerSet(item, serviceName, subLayers)),
                    }

                } else {
                    if (item.name == serviceName) {
                        item.layers = subLayers.data.layers;
                    }
                    return {
                        ...item,
                        apiFrom: item.apiFrom
                            ? item.apiFrom
                            : "internal",
                        color: item.color ? item.color : false,
                    };
                }

            },
            recursiveLayerOrder(item) {
                this.layerCounter++;
                if (item.layers !== undefined && item.children !== undefined)
                    return {
                        ...item,
                        order: this.layerCounter++,
                        children: item.children.map(item =>
                            this.recursiveLayerOrder(item)
                        ),
                        layers: item.layers.map(item => ({
                            ...item,
                            order: this.layerCounter++,
                        })),
                    };
                else
                    return {
                        ...item,
                        order: this.layerCounter++,
                    };
            },
            isItemCategory(item) {
                return item.layers !== undefined && item.children !== undefined;
            },
            recursiveLayerFind(item, name) {
                if (item.layers !== undefined && item.children !== undefined) //group
                {
                    if (item.layers.some(c => c.name === name))
                        return item.layers.find(c => c.name == name);
                    else {
                        item.children.map(item => this.recursiveLayerOrder(item));
                    }

                } else //layer
                {
                    if (item.name == name) {
                        return item;
                    } else {
                        return null;
                    }
                }


            },
            onMoveCallbackDynamicLayerList(evt, originalEvent) {
                let self = this;

                const list = this.dynamicLayerList.map((item, index) => {
                    return {
                        ...item,
                        order: index + 1,
                    };
                });

                this.dynamicLayerList = list
                this.$store.dispatch('SET_DYNAMIC_LAYER_LIST', list)

                this.setDynamicIndexes();
            },
            async getTableData(service, layerId, layerName, query) {
                var layer = this.getLayer(service.id);
                let token;
                if (service.apiFrom === "emlak") {
                    token = this.emlakToken;
                } else {
                    token = this.token;
                }
                let response;


                if (service.resourceType === "azcArcgis") {
                    let params = {
                        token: token,
                        name: service.name,
                        layer: layerId,
                        ...query,
                    };
                    response = await LayerService.getTableData(params);
                } else {
                    this.tablePaging = {
                        isBusy: false,
                        page: 1,
                        limit: 25
                    };
                    let params = {
                        layerId: service.id,
                        ...query,
                        ...this.tablePaging
                    };

                    service.query = query;
                    if (this.filterQueryIsSum && service.resourceType === 'local') {
                        params.isSum = this.filterQueryIsSum;
                        params.ArithmeticColumnName = this.filterQueryArithmeticColumn;
                        response = await LayerService.getLocalArithmeticData(
                            params
                        );
                        this.ArithmeticDataResult = response.data.result;
                        this.$modal.show("arithmetic-result-modal", null, {
                            name: "arithmetic-result-modal",
                            resizable: true,
                            adaptive: true,
                            draggable: true,
                        });
                    } else {
                        response = await LayerService.getLocalTableData(params);
                    }
                    this.refreshLayer(service);
                }

                if (response.data.error !== undefined) {
                    return;
                }

                if (!this.filterQueryIsSum) {
                    let self = this;
                    this.tableNextRequest["service"] = service;
                    this.tableNextRequest["layerId"] = layerId;
                    this.tableNextRequest["layerName"] = layerName;

                    let serviceName = service.name;
                    let serviceInfo={
                        id:service.id,
                        label:service.name,
                        mapType:service.mapType,
                        resourceType:service.resourceType,
                        query:service.query,
                        isDisabled:service.isDisabled,
                    }
                    let serviceResourceType = service.resourceType;
                    let tableName = layerName;
                    let tableData = response.data.features;
                    let totalCount = response.data.totalCount;
                    let tableHeaders = Object.keys(tableData[0].attributes);
                    let tableStackedHeaders = tableHeaders;
                    let target = response.data.fieldAliases;
                    let tableHeadersWithAlias = response.data.fieldAliases;

                    let checkedColumnsData = [];
                    let checkedColumns = [];

                    let defaultUnCheckedColumns = [
                        "OBJECTID",
                        "Shape_Length",
                        "Shape_Area",
                    ];

                    for (let alias in tableHeaders) {
                        if (
                            !defaultUnCheckedColumns.includes(tableHeaders[alias])
                        ) {
                            checkedColumnsData.push(tableHeaders[alias]);
                            checkedColumns.push(tableHeaders[alias]);
                        }
                    }

                    tableHeaders = tableHeaders.map((item, index) => {
                        let name = item;
                        for (let k in target) {
                            if (typeof target[k] !== "function") {
                                if (item === k) {
                                    name = target[k];
                                }
                            }
                        }
                        return name;
                    });
                    checkedColumns = checkedColumns.map((item, index) => {
                        return tableHeadersWithAlias[item];
                    });
                    await this.$store.dispatch("SAVE_DATATABLE_VISIBLE", false);
                    await this.$store.dispatch("SAVE_DATATABLE_CONFIGURATION", {
                       
                        serviceInfo,
                        totalCount,
                        tableName,
                        tableHeaders,
                        tableStackedHeaders,
                        tableHeadersWithAlias,
                        tableData,
                        target,
                        checkedColumnsData,
                        checkedColumns,
                    });                   
                    await this.$store.dispatch("SAVE_DATATABLE_VISIBLE", true);
                    this.tableFeaturesData = tableData;
                    this.tableFeaturesHeader = tableHeaders;
                    this.stackedTableFeaturesHeader = tableHeaders;
                }
                this.filterQuery = "";
                this.filterValues = [];

                // this.dynamicLayersReset(service, true);
            },
            async getGeometryData(service, layer_id, layer_name, query, coords) {
                let response = null;
                let geometry = null;
                if (service.resourceType === "azcArcgis") {
                    geometry = coords[0] + "," + coords[1];
                    var params = {
                        token: this.token,
                        name: service.name,
                        layer: layer_id,
                        where: query,
                        geometry: geometry,
                    };
                    response = await LayerService.getGeometryData(params);
                } else {
                    var params = {
                        layerId: service.id,
                        where: query,
                        geometry: coords[0] + "," + coords[1],
                    };
                    response = await LayerService.getLocalTableData(params);
                }

                if (response.data.features !== undefined) {
                    if (response.data.features.length !== 0) {
                        this.$refs.dataTable.showDataModal(
                            response.data.features[0]
                        );
                    }
                }
            },
            setDynamicIndexes() {
                this.$store.state.layers.dynamicLayerList.map((item, index) => {
                    this.mapLayer.getLayers().forEach(function (layer) {
                        if (
                            layer.get("name") != undefined &&
                            layer.get("name") === item.name
                        ) {
                            layer.setZIndex(9999 - index);
                        }
                    });
                });
            },
            async LayerService() {
                let self = this;
                const response = await LayerService.getLayersWithFullDataFromServer(
                    {
                        token: this.token,
                    }
                );
                self.gisLayers = response.data;
                let layers = self.LayerHelper.creator(self.gisLayers);
                self.baseLayerList = layers.baseLayers;

                self.dynamicLayerList = layers.dynamicLayers;
                this.$store.dispatch('SET_DYNAMIC_LAYER_LIST', layers.dynamicLayers)

                let selectedLayersArr = Object.keys(this.selectedLayers).map(
                    Number
                );
                selectedLayersArr.forEach(value => {
                    this.baseLayerList.forEach(item => {
                        this.checkIfLayerNeedsToTurnOn(item, value);
                    });
                    this.$store.state.layers.dynamicLayerList.forEach(item => {
                        this.checkIfLayerNeedsToTurnOn(item, value);
                    });
                });
            },
            checkIfLayerNeedsToTurnOn(layer, value) {
                let e = {target: {checked: true}};

                if (layer.hasOwnProperty("children")) {
                    layer.layers.map(async item => {
                        this.checkIfLayerNeedsToTurnOn(item, value);
                    });
                } else {
                    if (layer.id === value) {
                        this.selectService(
                            layer,
                            layer.order,
                            layer.mapType === "dynamic",
                            e,
                            false
                        );
                    }
                }
            },
            selectedLayersIdHolder(isAdd = true, service) {
                if (isAdd) {
                    this.selectedLayers[service.id] = true;
                } else {
                    delete this.selectedLayers[service.id];
                }
                this.updateHash();
            },
            addLayers(service, index, dynamic = false) {
                this.selectedLayersIdHolder(true, service);
                if (service.extent != null && this.isHashLoaded) {
                    this.mapLayer
                        .getView()
                        .fit([
                            service.extent.minX,
                            service.extent.minY,
                            service.extent.maxX,
                            service.extent.maxY,
                        ]);
                }
                let zoomLevelProperties = {
                    maxResolution:
                        createXYZ().getResolution(service.minZoomLevel) * 1.01,
                    minResolution: createXYZ().getResolution(service.maxZoomLevel),
                };
                let url = URL + "/api/map/service/" + service.name + "/MapServer/";
                let new_layer;
                if (dynamic) {
                    let layers = this.dynamicSubLayerList[service.name];
                    let active_layers = "";
                    let hidden_layers = "";
                    let colors = "";
                    if (
                        typeof this.dynamicForColors[service.name] !== "undefined"
                    ) {
                        colors = "[";
                        this.dynamicForColors[
                            this.colorPicker.colorPicker.layer.name
                            ].forEach(function (colorLayer) {
                            colors += colorLayer;
                        });
                        colors += "]";
                    }
                    layers.forEach(function (layer, index) {
                        if (layer === true) {
                            active_layers += index + ",";
                        } else {
                            hidden_layers += index + ",";
                        }
                    });
                    let layer_config = "";
                    if (active_layers !== "") {
                        active_layers = active_layers.slice(0, -1);
                        layer_config += "show:" + active_layers;
                    } else {
                        hidden_layers = hidden_layers.slice(0, -1);
                        layer_config += "hide:" + hidden_layers;
                    }
                    if (service.resourceType === "emlak") {
                        new_layer = new ImageLayer({
                            ...zoomLevelProperties,
                            source: new ImageArcGISRest({
                                url: url,
                                crossOrigin: "Anonymous",
                                params: {
                                    token: this.emlakToken,
                                    layers: layer_config,
                                    dynamicLayers: colors,
                                },
                            }),
                        });
                    } else if (
                        service.resourceType !== undefined &&
                        service.resourceType.trim() === "local"
                    ) {
                        new_layer = new VectorTileLayer({
                            id: service.id,
                            declutter: false,
                            ...zoomLevelProperties,
                            source: new VectorTileSource({
                                format: new MVT(),
                                url:
                                    URL +
                                    "/" +
                                    MAP_URLS.MVT +
                                    `/${service.id}/{z}/{x}/{y}/` +
                                    (service.query.where != ""
                                        ? this.objectToQueryString(service.query)
                                        : ""),
                            }),
                        });
                    } else {
                        new_layer = new ImageLayer({
                            ...zoomLevelProperties,
                            source: new ImageArcGISRest({
                                url: url,
                                crossOrigin: "Anonymous",
                                params: {
                                    token: this.token,
                                    layers: layer_config,
                                    dynamicLayers: colors,
                                },
                            }),
                        });
                    }
                } else {
                    if (service.spatial === 3857) {
                        url = url + "/tile/{z}/{y}/{x}?token=" + this.token;
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
                                    token: this.token,
                                    FORMAT: "png8",
                                },
                            }),
                        });
                    }
                }

                this.mapLayer.addLayer(new_layer);
                new_layer.set("name", service.name);
                if (dynamic) {
                    new_layer.setZIndex(9999 - index);
                } else {
                    new_layer.setZIndex(500 - index);
                }
            },
            refreshLayer(service) {
              
                // var layer=this.getLayer(service.id);
                // if(layer!==null)
                // {                   
                //     // layer.getSource().changed();

                //     var source = layer.getSource();
                //     source.tileCache.expireCache({});
                //     source.tileCache.clear();
                //     source.clear();
                //     // layer.getSource().setTileLoadFunction(layer.getSource().getTileLoadFunction());
                //     source.refresh({force:true});
                // }
                this.deleteLayers(service);
                this.addLayers(service, service.order, true);
               

            },
            getLayer(id) {
                let layer = null;
                this.mapLayer.getLayers().forEach(function (lyr) {
                    var layerId = lyr.values_.id;
                    if (layerId !== undefined && layerId === id) {
                        layer = lyr;
                    }
                });
                return layer;
            },
            setBaseLayout(index) {
                let layers = this.mapLayer.getLayers().getArray();
                layers[0].setSource(this.baseMaps[index]);
            },
            deleteLayers(service, reset) {
                this.selectedLayersIdHolder(false, service);
                let layersToRemove = [];
                let self = this;

                this.mapLayer.getLayers().forEach(function (layer) {
                    if (
                        layer.get("name") != undefined &&
                        layer.get("name") === service.name
                    ) {
                        layersToRemove.push(layer);
                        if (reset) self.dynamicLayersReset(service, false);
                    }
                });
                let len = layersToRemove.length;
                for (let i = 0; i < len; i++) {
                    this.mapLayer.removeLayer(layersToRemove[i]);
                }
            },
            async basemapLayersReset(service, status) {
                this.baseLayerList = this.baseLayerList.map((item, index) => {
                    if (service.name === item.name) {
                        item.layersVisibility = status;
                    }
                    return item;
                });
            },
            async dynamicLayersReset(service, status) {
                let token;
                if (service.apiFrom === "emlak") {
                    token = this.emlakToken;
                } else {
                    token = this.token;
                }

                let colorEnabled = false;
                if (service.resourceType === "azcArcgis") {
                    let response = await LayerService.getLayerDynamic({
                        token: token,
                        name: service.name,
                    });
                    if (response.data.layers[0].drawingInfo !== undefined) {
                        if (
                            response.data.layers[0].drawingInfo.renderer.symbol !==
                            undefined
                        ) {
                            if (
                                response.data.layers[0].drawingInfo.renderer.symbol
                                    .color !== undefined
                            ) {
                                colorEnabled = true;
                            }
                        }
                    }
                }
                const list = this.$store.state.layers.dynamicLayerList.map((item, index) => {
                    item.color = item.color ? item.color : false;
                    var layer = this.recursiveLayerFind(item, service.name);
                    if (layer) {
                        layer.layersVisibility = status;
                        layer.color = colorEnabled;
                    }
                    return item;
                });

                this.dynamicLayerList = list
                this.$store.dispatch('SET_DYNAMIC_LAYER_LIST', list)


            },
            async getResponseDynamic(service) {
                let responseDynamic;
                if (service.apiFrom === "emlak") {
                    let gettoken = await LoginService.getEmlakToken();
                    this.emlakToken = gettoken.data.token;
                    responseDynamic = await LayerService.getLayerForEmlakService({
                        token: this.emlakToken,
                        name: service.name,
                    });
                } else if (
                    service.resourceType !== undefined &&
                    service.resourceType.trim() === "local"
                ) {
                    responseDynamic = {
                        data: {
                            layers: [
                                {
                                    defaultVisibility: true,
                                    id: 0,
                                    maxScale: 0,
                                    minScale: 0,
                                    name: service.name,
                                    parentLayerId: -1,
                                    subLayerIds: null,
                                },
                            ],
                        },
                    };
                } else {
                    responseDynamic = await LayerService.getDynamicLayers({
                        token: this.token,
                        name: service.name,
                    });
                }

                return responseDynamic;
            },
            async selectService(service, index, dynamic, e, isHashLoaded = true) {
                if (e.target.checked) {
                    let self = this;
                    let subLayers;
                    this.isHashLoaded = isHashLoaded;

                    if (
                        (service.mapType === "basemap",
                        service.unitedDynamicLayerName !== undefined &&
                        service.unitedDynamicLayerName !== null)
                    ) {
                        subLayers = await this.getResponseDynamic(
                            service.unitedDynamicLayerName
                        );
                        this.baseLayerList = this.baseLayerList.map(
                            (item, index) => {
                                if (service.name === item.name) {
                                    item.unitedDynamicLayerName.layers =
                                        subLayers.data.layers;
                                }
                                return item;
                            }
                        );
                    } else {
                        subLayers = await this.getResponseDynamic(service);
                        const list = this.dynamicLayerList.map(
                            (item, index) => this.recursiveLayerSet(item, service.name, subLayers));
                        this.dynamicLayerList = list
                        this.$store.dispatch('SET_DYNAMIC_LAYER_LIST', list)
                    }

                    self.dynamicSubLayerList[service.name] = [];
                    subLayers.data.layers.forEach(function (element) {
                        self.dynamicSubLayerList[service.name][element.id] = true;
                    });

                    this.addLayers(service, index, dynamic);

                    for (let i in this.dynamicLayerList) {
                        var item = this.dynamicLayerList[i];
                        var result = this.recursiveLayerFind(item, service.name);
                        if (result != null) {
                            result.collapseVisibility = true;
                            this.$store.dispatch('SET_DYNAMIC_LAYER_LIST', this.dynamicLayerList)
                            break;
                        }
                    }

                    for (let i in this.baseLayerList) {
                        if (
                            this.baseLayerList[i].unitedDynamicLayerName !==
                            undefined &&
                            this.baseLayerList[i].unitedDynamicLayerName !== null &&
                            this.baseLayerList[i].name === service.name
                        ) {
                            this.baseLayerList[i].collapseVisibility = true;
                            break;
                        }
                    }
                } else {
                    this.deleteLayers(service);
                    for (let i in this.$store.state.layers.dynamicLayerList) {
                        if (this.$store.state.layers.dynamicLayerList[i].name === service.name) {
                            let list = this.$store.state.layers.dynamicLayerList
                            list[i].collapseVisibility = false;
                            list[i].layersVisibility = false;
                            this.$store.dispatch('SET_DYNAMIC_LAYER_LIST', list)

                            break;
                        }
                    }
                    for (let i in this.baseLayerList) {
                        if (
                            this.baseLayerList[i].unitedDynamicLayerName !==
                            undefined &&
                            this.baseLayerList[i].unitedDynamicLayerName !== null &&
                            this.baseLayerList[i].name === service.name
                        ) {
                            this.baseLayerList[i].collapseVisibility = false;
                            this.baseLayerList[i].layersVisibility = false;
                            break;
                        }
                    }
                }
            },
            selectSubService(service, index, id, e) {
                this.dynamicSubLayerList[service.name][id] = !this
                    .dynamicSubLayerList[service.name][id];
                this.deleteLayers(service, false);
                for (let i in this.$store.state.layers.dynamicLayerList) {
                    if (this.$store.state.layers.dynamicLayerList[i].name === service.name) {
                        let list = this.$store.state.layers.dynamicLayerList
                        list[i].layersVisibility = true;
                        this.$store.dispatch('SET_DYNAMIC_LAYER_LIST', list)

                        break;
                    }
                }
                this.dynamicLayersReset(service, true);
                this.addLayers(service, index, true);
            },
            setDrawType(name) {
                this.typeSelect = name;
                this.mapLayer.removeInteraction(this.draw);
                this.isColorPick = false;
                this.isMarker = false;
                this.isRemove = false;
                if (name !== "None") {
                    this.addInteraction();
                }
                this.featureIDSet += 10;
                document.body.style.cursor = "default";
            },
            saveColor() {
                this.$store.dispatch("SAVE_COLORPICKER_VISIBILITY", false);

                this.deleteLayers(this.colorPicker.colorPicker.layer);

                let layerDyn = this.ColorPicker.renderColor(
                    this.colorPicker.colorPicker.sublayer,
                    this.selectedFillColor,
                    this.selectedBorderColor
                );

                if (
                    typeof this.dynamicForColors[
                        this.colorPicker.colorPicker.layer.name
                        ] === "undefined"
                ) {
                    this.dynamicForColors[
                        this.colorPicker.colorPicker.layer.name
                        ] = [];
                }
                this.dynamicForColors[this.colorPicker.colorPicker.layer.name][
                    this.colorPicker.colorPicker.sublayer
                    ] = layerDyn;

                this.addLayers(
                    this.colorPicker.colorPicker.layer,
                    this.colorPicker.colorPicker.index,
                    true
                );
            },
            OpenColorPicker(layer, sublayer, name, index) {
                this.$store.dispatch("SAVE_COLORPICKER", {
                    ...this.colorPicker,
                    visibility: true,
                    sublayer: sublayer,
                    layer: layer,
                    service: name,
                    index: index,
                });
            },
        },
        computed: {
            isTabelVisible() {
                return this.$store.state.dataTable.isVisible;
            },
            tablePaging: {
                get() {
                    return this.$store.state.dataTable.paging;
                },
                set(value) {
                    this.$store.dispatch("SAVE_DATATABLE_PAGING", value);
                }
            },
            selectedServiceInfo() {
                return this.$store.state.dataTable.serviceInfo;
            },
            filterQueryIsSum() {
                return this.$store.state.filter.filterQueryIsSum;
            },
            filterQueryArithmeticColumn() {
                return this.$store.state.filter.filterQueryArithmeticColumn;
            },

            // stackedTableFeaturesHeader() {
            //     return this.$store.state.dataTable.tableStackedHeaders;
            // },
            // tableFeaturesData () {
            //     return this.$store.state.dataTable.tableData;
            // },
            tableHeadersWithAlias() {
                return this.$store.state.dataTable.tableHeadersWithAlias;
            },
            selectedFillColor() {
                return this.$store.state.colorPicker.fillColor;
            },
            selectedBorderColor() {
                return this.$store.state.colorPicker.borderColor;
            },
            shapeBorderColor() {
                return this.$store.state.shapeBorderColor;
            },
            shapeFillColor() {
                return this.$store.state.shapeFillColor;
            },
            colorPicker() {
                return this.$store.state.colorPicker;
            },
            lastBBOXOfShape() {
                return this.$store.state.dataTable.lastBBOXOfShape;
            },
            dragOptions() {
                return {
                    animation: 0,
                    group: "baseDragger",
                    disabled: false,
                    ghostClass: "ghost",
                };
            },
            dragOptionsDynamic() {
                return {
                    animation: 0,
                    group: "dynamicDragger",
                    disabled: false,
                    ghostClass: "ghost",
                };
            },
            featuresToExcel() {
                let features = [];
                for (let i = 0; i < this.tableFeaturesData.length; i++) {
                    features[i] = this.tableFeaturesData[i].attributes;
                }
                return features;
            },
            checkedColumnsToExcel() {
                let columns = {};
                for (let column in this.tableFeaturesHeader) {
                    if (
                        this.checkedColumns.includes(
                            this.tableFeaturesHeader[column]
                        )
                    ) {
                        columns[
                            this.tableFeaturesHeader[column]
                            ] = this.stackedTableFeaturesHeader[column];
                    }
                }
                return columns;
            },
        },
    };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
