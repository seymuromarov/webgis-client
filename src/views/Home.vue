<template>
    <div class="row container-fluid padding-0">
        <div class=" padding-0 sup-bar-layout">

            <div class="userNameLabel">
                <span class="">{{ username }}</span>
                <i @click="logout()" title='Log out' class="logOutIcon fas fa-power-off" style="margin-left: 10px;"></i>
            </div>
            <hr>

            <h4 class="text-left-layer">Dynamic Layers</h4>
            <div class="colorPickers" v-show="colorPicker.visibility">
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link active" href="#" @click="colorPicker.borderTab = true">Border Color</a>
                    </li>
                    <li class="nav-item" @click="colorPicker.borderTab = false">
                        <a class="nav-link" href="#">Fill Color</a>
                    </li>
                </ul>

                <div class="colorPicker" v-if="colorPicker.borderTab">
                    <h5>Border Color</h5>
                    <colorPicker v-model="borderColors"></colorPicker>
                </div>
                <div class="colorPicker" v-else>
                    <h5>Fill Color</h5>
                    <colorPicker v-model="colors"></colorPicker>
                </div>
                <div class="colorPickerButton">
                    <button class="btn btn-sm btn-danger" type="button" @click="colorPicker.visibility = false">Close
                    </button>
                    <button class="btn btn-sm btn-primary" type="button" @click="saveColor()">Save</button>
                </div>
            </div>
            <draggable
                    class="list-group"
                    tag="ul"
                    v-model="dynamicLayerList"
                    v-bind="dragOptions"
                    @start="isDragging = true"
                    @end="onMoveCallbackDynamicLayerList()"

            >
                <li
                        class="list-group-item"
                        v-for="element in dynamicLayerList"
                        :key="element.name"
                        style="text-align: left"
                >
                    <div class="row">
                        <div class="col-12  layerDiv">
                            <input class="parentCheckbox"
                                   :id="element.name" :name="element.name" type="checkbox"
                                   @click="selectService(element, element.order,true, $event)"/>
                            <i class="checkbox-icon far fa-check-circle"></i>
                            <label :for="element.name"></label>
                            <span class="serviceTitle">
                                  {{ element.name }}
                            </span>

                            <span>
                                      <i v-if="element.collapseVisibility && !element.layersVisibility"
                                         @click="dynamicLayersReset(element, true)"
                                         class="fas fa-caret-left makeMePoint">
                                      </i>
                                      <i v-if=" element.layersVisibility "
                                         @click="element.layersVisibility=false"
                                         class="fas fa-caret-down makeMePoint">
                                      </i>
                                </span>

                        </div>
                    </div>

                    <div style="background: whitesmoke;padding-top: 10px; " v-show="element.layersVisibility"
                    >
                        <div class="row layerDiv"
                             v-for="layer in element.layers"
                             :style="{paddingLeft: layer.margin * 30 + 'px'}">


                            <div class="col-12">
                                <input class="parentCheckbox"
                                       v-show="layer.geometryType"
                                       :id="element.name + layer.id"
                                       :value="element.name + layer.id"
                                       :name="element.name + layer.id"
                                       v-model="dynamicSubLayerList[element.name][layer.id]"
                                       type="checkbox"
                                       @click="selectSubService(element,element.order,layer.id, $event)"/>
                                <i class="checkbox-icon far fa-check-circle"></i>
                                <label :for="element.name + layer.id"></label>
                                <span class="serviceTitle" :for="layer.name"> {{ layer.name }}</span>
                                <div class="">
                                    <i class="dataIcon fas fa-table"
                                       @click="getTableData(element,layer.id,layer.name,'1=1')"></i>
                                    <i style="margin-left: 10px;" class="dataIcon fab fa-codiepie"
                                       v-if="element.color===true"
                                       @click="OpenColorPicker(element,layer.id,layer.name,element.order)"></i>

                                </div>

                            </div>

                        </div>

                    </div>


                </li>
            </draggable>
            <hr>
            <h4 class="text-left-layer">Basemaps</h4>
            <draggable
                    class="list-group"
                    tag="ul"
                    v-model="baseLayerList"
                    v-bind="dragOptions"
                    @start="isDragging = true"
                    @end="onMoveCallbackBaseLayerList()"
            >
                <transition-group type="transition" name="flip-list">
                    <li
                            class="list-group-item"
                            v-for="element in baseLayerList"
                            :key="element.name"
                            style="text-align: left"
                    >
                        <div class="row">
                            <div class="col-12 layerDiv">
                                <input class="parentCheckbox"
                                       :id="element.name" :name="element.name" type="checkbox"
                                       @click="selectService(element, element.order,false, $event)"/>
                                <i class="checkbox-icon far fa-check-circle"></i>
                                <label :for="element.name"></label>
                                <span class="serviceTitle">
                                  {{ element.name }}
                                </span>
                            </div>
                        </div>
                    </li>
                </transition-group>
            </draggable>

        </div>

        <div class=" padding-0 map-layout">

            <div id="map">
                <button
                        class="action-button-class btn btn-control"
                        :style="{top : '15%'}"
                        title="Add marker"
                        @click="setMarkerTrue"
                >
                    <i class="fas fa-map-marker-alt"></i>
                </button>

                <button v-for="(item, index) in drawings"
                        class="action-button-class btn btn-control"
                        :style="{top : ((index+1)*5+15) + '%'}"
                        :title="item.tooltip"
                        @click="setDrawType(item.name)">
                    <i :class="item.icon"></i>

                </button>

                <div id="mouse-position"
                     class="latLongShow"
                ></div>
                <div id="info" class="infokml" v-show="this.kmlInfo!==null">&nbsp;</div>

                <button class="action-button-class btn btn-control"
                        style="bottom: 10px;right: 60px;"
                        @click="dragAndDropToast"
                        v-if="!showTable">
                    <i class="fas fa-file-upload"></i>
                </button>
                <button class="action-button-class btn btn-control"
                        style="bottom: 10px;right: 10px;"
                        @mouseover="selectLayerForm = true"
                        v-if="!showTable">
                    <i class="fas fa-stream"></i>
                </button>
                <div v-show="selectLayerForm" @mouseleave="selectLayerForm=false"
                     class="selectLayerForm">
                    <form>
                        <div v-for="(element,index) in baseMaps">
                            <input type="radio" class="" name="baseLayer" @click="setBaseLayout(index)">
                            <span style="margin-left: 5px;">{{index}}</span>

                        </div>
                    </form>
                </div>

                <button class="action-button-class btn btn-control"
                        style="top: 118px;left: .5rem;"
                        title="Home"
                        @click="zoomToCenter">
                    <i class="fas fa-home"></i>
                </button>

                <button class="action-button-class btn btn-control"
                        style="bottom: 90px;left: .5rem;"
                        @click="addGraticule"
                        title="Add Graticule"
                        v-show="!showTable">
                    <i class="fas fa-barcode"></i>
                </button>

                <button class="action-button-class btn btn-control"
                        style="bottom: 50px;left: .5rem;"
                        @click="pngExport"
                        title="Export to png"
                        v-show="!showTable">
                    <i class="far fa-file-image"></i>
                </button>

                <button class="action-button-class btn btn-control"
                        style="bottom: 10px;left: .5rem;"
                        @click="pdfExport"
                        title="Export to pdf"
                        v-show="!showTable">
                    <i class="far fa-file-pdf"></i>
                </button>
            </div>

        </div>

        <div class="" v-if="showTable">
            <div class="tableDiv howMuchWidthHaveMap">
                <div class="tableHeader">
                    <div class="row">
                        <div class="col-2">
                            <p class="text-left" style="margin-top: 5px;">{{tableHeader}}</p>
                        </div>
                        <div class="col-10">
                            <download-excel
                                    v-if="tableFeaturesHeader"
                                    class="fas fa-file-excel icon excelDataIcon excelIcon makeMePoint"
                                    :data="featuresToExcel"
                                    :fields="checkedColumnsToExcel"
                                    type="xls"
                                    :name="'test' + '_report.xls'">

                                <i></i>

                            </download-excel>
                            <i class="fas  fa-columns tableColumns makeMePoint" @click="showColumnsChange">

                            </i>
                            <i class="fas fa-times tableClose makeMePoint" @click="showTable=false"></i>
                            <i class="fas fa-filter tableFilter makeMePoint" @click="showFilterModal"></i>
                            <div class="tableShowColumns" v-if="showColumnsBoolean">
                                <div class="columnsDiv">
                                    <div v-for="(alias, key) in tableFeaturesHeader">
                                        <input @click="selectColumns(alias,key, $event)" type="checkbox" :id="alias"
                                               :value="alias" v-model="checkedColumns" checked="checked"/>
                                        <label> {{ alias }} </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tableContent">
                    <table class="selfTable table">
                        <thead class="tableHeader">
                        <tr>
                            <th v-show="checkedColumns.includes(alias)" v-for="(alias, key) in tableFeaturesHeader">{{
                                alias }}
                            </th>
                        </tr>
                        </thead>
                        <tbody class="tableBody">
                        <tr v-for="(data, key) in tableFeaturesData">
                            <td class="makeMePoint"
                                @click="showDataModal(data)"
                                v-show="checkedColumnsData.includes(key)"
                                v-for="(attr, key) in data.attributes"
                            > {{ attr }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <modal name="data-modal"
               transition="nice-modal-fade"
               :min-width="200"
               :min-height="200"
               :delay="100"
               :draggable="true"
        >
            <p class="tableModalHeader">{{this.tableHeader}}</p>
            <div class="row" style="overflow: auto">
                <table class="table popupTable">
                    <thead>
                    <tr class="fields">
                        <th class="paddingLeft">Field</th>
                        <th class="paddingRight">Value</th>
                    </tr>
                    </thead>
                    <tbody class="popupTableBody">
                    <tr v-for="(value, key) in tableFeatureData.attributes">
                        <td class="paddingLeft">{{ key }}</td>
                        <td class="paddingRight">{{ value }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </modal>
        <modal name="filter-modal"
               transition="nice-modal-fade"
               :min-width="200"
               :min-height="200"
               :delay="100"
               :draggable="true"
        >
            <div id="filterDiv" class="filterDiv">
                <div id="filterDivHeader" class="filterDivHeader">
                    <label class="filterLayerName"> {{ this.tableHeader }}</label>
                    <!--                    <i class="fas fa-times filterCloseIcon" @click="closeFilter()"></i>-->
                </div>
                <div class="filterFieldsListDiv">
                    <ul class="filterFieldsList">
                        <li @dblclick="filterQuery += stackedTableFeaturesHeader[column] + ' '"
                            @click="filterSelectedColumn(stackedTableFeaturesHeader[column])"
                            v-for="(alias, column) in tableFeaturesHeader"> {{ alias }}
                        </li>
                    </ul>
                </div>
                <div class="filterCenterDiv">
                    <div class="filterActionsDiv">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <button @click="filterQuery += '= '"
                                            class="parameterButton btn btn-sm btn-outline-secondary"> =
                                    </button>
                                </td>
                                <td>
                                    <button @click="filterQuery += '>= '"
                                            class="parameterButton btn btn-sm btn-outline-secondary"> >=
                                    </button>
                                </td>
                                <td>
                                    <button @click="filterQuery += '> '"
                                            class="parameterButton btn btn-sm btn-outline-secondary"> >
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button @click="filterQuery += '<= '"
                                            class="parameterButton btn btn-sm btn-outline-secondary"> <=
                                    </button>
                                </td>
                                <td>
                                    <button @click="filterQuery += '< '"
                                            class="parameterButton btn btn-sm btn-outline-secondary"> <
                                    </button>
                                </td>
                                <td>
                                    <button @click="filterQuery += 'LIKE '"
                                            class="parameterButton btn btn-sm btn-outline-secondary"> like
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button @click="filterQuery += '<> '"
                                            class="parameterButton btn btn-sm btn-outline-secondary"> <>
                                    </button>
                                </td>
                                <td>
                                    <button @click="filterQuery += 'AND '"
                                            class="parameterButton btn btn-sm btn-outline-secondary"> and
                                    </button>
                                </td>
                                <td>
                                    <button @click="filterQuery += 'OR '"
                                            class="parameterButton btn btn-sm btn-outline-secondary"> or
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button @click="filterQuery += 'IS NULL'"
                                            class="parameterButton btn btn-sm btn-outline-secondary"> null
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="filterValuesDiv">
                        <ul class="filterValuesList">
                            <li @dblclick="addValueToQuery(value)" class="filterValue" v-for="value in filterValues"> {{
                                value }}
                            </li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="filterSelectDiv">
                    <label class="query-start">SELECT * FROM table WHERE:</label>
                    <textarea class="queryTextArea" name="filterQuery" rows="4" cols="69"
                              v-model="filterQuery"> {{ filterQuery }} </textarea>
                    <div>
                        <button class="btn btn-outline-info filterApplyButton" @click="filterData()">Apply</button>
                    </div>
                </div>
            </div>

        </modal>
    </div>


</template>

<script>
    import 'ol/ol.css'
    import geocoder from 'ol-geocoder';
    import {Map, View, Overlay, Feature} from 'ol';
    import {getArea, getLength, getDistance} from 'ol/sphere.js';
    import {LineString, Polygon, Circle, Point} from 'ol/geom.js';
    import {unByKey} from 'ol/Observable.js';
    import Draw, {createRegularPolygon, createBox} from 'ol/interaction/Draw.js';
    import {Modify, defaults as defaultInteractions, DragRotateAndZoom, DragAndDrop} from 'ol/interaction';
    import {Circle as CircleStyle, Fill, Stroke, Style, Icon} from 'ol/style.js';
    import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
    import {TileArcGISRest, Vector as VectorSource} from 'ol/source.js';
    import {fromLonLat, METERS_PER_UNIT, transform, transformExtent, get as getProjection, getTransform} from 'ol/proj';
    import XYZ from 'ol/source/XYZ.js';
    import draggable from "vuedraggable";
    import LayerService from '@/services/LayerService'
    import {ZoomSlider, defaults as defaultControls, FullScreen} from 'ol/control.js';
    import {Chrome} from 'vue-color';
    import MousePosition from 'ol/control/MousePosition.js';
    import {createStringXY} from 'ol/coordinate.js';
    import {GPX, GeoJSON, IGC, KML, TopoJSON} from 'ol/format.js';
    import Graticule from 'ol/Graticule.js';
    import {shiftKeyOnly} from "ol/events/condition";
    import {baseUrl} from "../config/baseUrl";
    import proj4 from 'proj4';
    import {register} from 'ol/proj/proj4.js';
    import {applyTransform} from "ol/extent";

    export default {
        name: 'home',
        components: {
            draggable,
            colorPicker: Chrome,
        },
        data() {
            return {
                filterQuery: '',
                filterValues: [],
                mapLayer: null,
                tableQuery: null,
                selectLayerForm: false,
                showColumnsBoolean: false,
                value: [],
                checkedColumns: [],
                checkedColumnsData: [],
                defaultUnCheckedColumns: ['OBJECTID', 'Shape_Length', 'Shape_Area'],
                drawings: [
                    {
                        name: "Point",
                        icon: 'fas fa-circle',
                        tooltip: "Add Point"
                    },
                    {
                        name: "LineString",
                        icon: 'fas fa-long-arrow-alt-right',
                        tooltip: "Add LineString"

                    },
                    {
                        name: "Polygon",
                        icon: 'fas fa-draw-polygon',
                        tooltip: "Add Polygon"

                    },
                    {
                        name: "Circle",
                        icon: 'far fa-circle',
                        tooltip: "Add Circle"

                    },
                    {
                        name: "Box",
                        icon: 'far fa-calendar',
                        tooltip: "Add Rectangle"

                    },
                    {
                        name: "Square",
                        icon: 'far fa-square',
                        tooltip: "Add Square"

                    },
                    {
                        name: "None",
                        icon: 'fas fa-mouse-pointer',
                        tooltip: "Mouse"

                    },
                ],
                options: [],
                layers: [],
                isMarker: false,
                gisLayers: [],
                token: null,
                kmlInfo: null,
                username: null,
                source: null,
                vector: null,
                vectorSource: null,
                vectorLayer: null,
                sketch: null,
                typeSelect: null,
                showTable: false,
                draw: null,
                tableFeaturesData: [],
                tableFeatureData: [],
                tableNextRequest: [],
                tableFeaturesHeader: [],
                graticule: false,
                graticuleLayer: null,
                stackedTableFeaturesHeader: [],
                tableHeader: null,
                dynamicLayerList: [],
                baseLayerList: [],
                dynamicSubLayerList: [[]],
                helpmaptooltipElement: null,
                helpmaptooltip: null,
                measuremaptooltipElement: null,
                measuremaptooltip: null,
                baseMaps: {
                    sat:
                        new XYZ({

                            name: "sat",
                            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                        }),
                    waterColor:
                        new XYZ({

                            name: "waterColor",
                            url: "//a.tile.stamen.com/watercolor/{z}/{x}/{y}.png",
                        }),
                    esriWorldStreetMap:
                        new XYZ({

                            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
                        }),
                    terrain:
                        new XYZ({

                            name: "waterColor",
                            url: "//a.tile.stamen.com/terrain/{z}/{x}/{y}.png",
                        }),
                    toner:
                        new XYZ({

                            name: "waterColor",
                            url: "//a.tile.stamen.com/toner/{z}/{x}/{y}.png",
                        }),

                    gray:
                        new XYZ({

                            crossOrigin: "Anonymous",
                            url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                        }),
                    none: new XYZ({

                        crossOrigin: "Anonymous",
                        url: "",
                    })
                },
                colors: {
                    hex: '#fff',
                    rgba: {r: 255, g: 255, b: 255, a: 1},
                },
                borderColors: {
                    hex: '#fff',
                    rgba: {r: 255, g: 255, b: 255, a: 1},
                },
                colorPicker: {
                    visibility: false,
                    layer: null,
                    borderTab: true
                },
                dynamicForColors: [[]]
            }
        },
        mounted() {
            this.token = this.$cookie.get('token');
            this.username = this.$cookie.get('username');
            if (this.token === null)
                this.$router.push('/login')

            this.source = new VectorSource({wrapX: false});

            this.vector = new VectorLayer({
                source: this.source,
                features: []
            });
            this.vector.setZIndex(9999);
            let gray = new TileLayer({
                source: new XYZ({
                    crossOrigin: "Anonymous",
                    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                })
            });
            this.LayerService();

            this.$nextTick(function () {
                let mousePositionControl = new MousePosition({
                    coordinateFormat: createStringXY(4),
                    projection: 'EPSG:4326',
                    className: 'custom-mouse-position',
                    target: document.getElementById('mouse-position'),
                    undefinedHTML: '',
                });

                let dragAndDropInteraction = new DragAndDrop({
                    formatConstructors: [
                        GPX,
                        GeoJSON,
                        IGC,
                        KML,
                        TopoJSON
                    ]
                });
                let geocoderControl = new geocoder('nominatim', {
                    provider: 'osm',
                    lang: 'en',
                    placeholder: 'Search for ...',
                    limit: 5,
                    debug: false,
                    autoComplete: true,
                    keepOpen: false
                });

                this.layers = [
                    gray,
                    this.vector
                ];

                this.mapLayer = new Map({
                    interactions: defaultInteractions().extend([
                        new DragRotateAndZoom(), dragAndDropInteraction
                    ]),
                    controls: defaultControls().extend([
                        mousePositionControl,
                        new FullScreen()
                    ]),
                    target: 'map',
                    layers: this.layers,
                    view: new View({
                        center: fromLonLat([49.882858, 40.3598414]),
                        zoom: 6
                    })
                });

                this.mapLayer.addControl(geocoderControl)
                // let zoomslider = new ZoomSlider();
                // this.mapLayer.addControl(zoomslider);
                let modify = new Modify({source: this.source});
                this.mapLayer.addInteraction(modify);
                let self = this;
                dragAndDropInteraction.on('addfeatures', function (event) {
                    let vectorSource = new VectorSource({
                        features: event.features
                    });
                    self.mapLayer.addLayer(new VectorLayer({
                        renderMode: 'image',
                        source: vectorSource
                    }));
                    self.mapLayer.getView().fit(vectorSource.getExtent());
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
                            if (features[i].get('name') !== undefined)
                                info.push(features[i].get('name'));
                        }
                        document.getElementById('info').innerHTML = info.join(', ') || '&nbsp';
                        self.kmlInfo = info.join(', ') || null
                    } else {
                        document.getElementById('info').innerHTML = '&nbsp;';
                        self.kmlInfo = null
                    }
                };

                this.mapLayer.on('pointermove', function (evt) {
                    if (evt.dragging) {
                        return;
                    }
                    let pixel = self.mapLayer.getEventPixel(evt.originalEvent);
                    displayFeatureInfo(pixel);
                });

                this.mapLayer.on('click', function (evt) {
                    displayFeatureInfo(evt.pixel);
                    let coord = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
                    if (self.isMarker) {
                        let iconFeature = new Feature({
                            crossOrigin: "Anonymous",
                            geometry: new Point(fromLonLat([coord[0], coord[1]])),
                            name: 'Marker'
                        });
                        iconFeature.setStyle(new Style({
                            image: new Icon({
                                anchor: [0.5, 46],
                                size: [48, 48],
                                anchorXUnits: 'fraction',
                                anchorYUnits: 'pixels',
                                src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAD2ElEQVRogdWaQYgcRRSGv2724HER8eBBFhHJWSWB6ClEood+5pyzJ3P1Ih5EwjKERUQPopJDlICYg4R6IQQMXkxEPETwoBAWWYLIIrIsYQ9xWaY8TPdsbU3XdFV1z5j8UPSb1139/lf16vWr7imstTzOKIDy/ybRB4W1lqIoSmvteKr0fqdARI4BrwMngDVgFRgDO8AfwB3ghqr+1dhw7SXLZMyAtXZcFMWRflVVnQXeA16MvM0t4IKq3k6176LouwZE5BngS+B05i2+As4bY/ZyOh8JIfcIk5GG9ukriqKsquo4oMBTmeQb3APOqOp9107DwZfda7IXcVVVJ4HvgCd6km+wDbyiqlspnbJCSETWgF+YLNAhcQ94KSWcSjicLvfoLlJXFpEV4BuGJw/wAvC5z2GePBM+PvGWjm8BxzuI/A38BGwCe8ABsAtsAQ87+p4TkVdDfPyLV+BwsXblfhEpgXcjyD9dNxerHM7amPlr731r7WsddrDWjo+ETgROA8/OOX/ALPE2dNk7JSJrUSHUFjKhBrzZYXglgnwMSiZP82AINXJprR27ITSvAS8PRDAGJ7r4zISQf/S9BZ5bogPPJ4VQKJV6+ieX6MCqyyckl7HhU1+XVaFmopPPNIR8r0JTBjxYogO7XaMPEAyhgLy5YNIuthq78wa2jJkmJ4R61e6J+CE7C/k6R//1ksjvA9eSQsg9GXJIVe+ynFm4oqo7bXyCIQTRmejCgsmPgVFsWCeFUD0Lt4C7C3TgW2PMZoiPL7dmoa6MBIwWRh9GsXuBoijK7E29iPwOHBuKdY2bxpg3UjoEy2l/V+bqa3Eji+J8jGJHvpFnp8Qj3qavj1eAPwck/2Pzjigm9rNqIbcZY/YZdhbWUzkEa6GQruX8F8A/A5D/1RhzI6djMAt1rv5JSt0HPh7AgZFvN7Yl1UKBB9sn9KtSN4GrufajdmQu/JkwxjxgEkq52FDV6b2Ts1AbsTaiIcdq3YdMCrBUbAOX/XunyNO3CE028uHqQzKwLSKXgLcTHdios1k2knZkbc8IlwyT90Kx2AE+yx35Rk7dkU1l3ylVvQ9cTXDgU1V9GLpfrNw7C3kZaZ24jf8e8NEQNrNrobYRMcb8BlyPcOCSqu72Hf2+tRABeb2D/AGTrJWdeVx5xdqjn20GwM8i8j1wKnD+sjFmsCKwby0UwgcB/T5wMZpdBBb2obuqqovAO45qDJxX1T5P7Rn0/sw6DyJyEjgD/Atcqxf5sKgdKNuObc295lGQp9+JA87NfKP15TkD03nNEGj9r8TjhMFqoa5sNUTOb5P/A8dYOKnlHRBqAAAAAElFTkSuQmCC',
                            })
                        }));
                        self.source.addFeature(iconFeature)

                    }
                    if (self.showTable) {
                        let geometry = coord[0] + ',' + coord[1];
                        self.getGeometryData(self.tableNextRequest['service'], self.tableNextRequest['layer_id'], self.tableNextRequest['layer_name'], self.filterQuery, geometry)
                    }
                });


            });

        },
        methods: {
            testMe(data) {
                console.log(data)
            },
            filterSelectedColumn(column) {
                this.filterValues = [];
                for (let i = 0; i < this.tableFeaturesData.length; i++) {
                    if (!this.filterValues.includes(this.tableFeaturesData[i].attributes[column]))
                        this.filterValues.push(this.tableFeaturesData[i].attributes[column])
                }
            },
            filterData() {
                this.getTableData(this.tableNextRequest['service'], this.tableNextRequest['layer_id'], this.tableNextRequest['layer_name'], this.filterQuery)
                this.$modal.hide('filter-modal');
            },
            addValueToQuery(value) {
                if (typeof value == 'string')
                    value = "'" + value + "'"
                this.filterQuery += value + ' ';
            },
            dragAndDropToast() {
                let toast = this.$toasted.show("Drag & drop GPX, GeoJSON, IGC, KML, TopoJSON files over map", {
                    theme: "outline",
                    position: "bottom-center",
                    duration: 3500
                });
            },
            zoomToCenter() {
                this.mapLayer.getView().setCenter(fromLonLat([49.882858, 40.3598414]))
                this.mapLayer.getView().setZoom(8)
            },
            addGraticule() {
                if (this.graticule) {
                    this.graticuleLayer.setMap(null);
                    this.graticule = false
                } else {
                    this.graticuleLayer = new Graticule({
                        // the style to use for the lines, optional.
                        strokeStyle: new Stroke({
                            color: 'rgba(255,120,0,0.9)',
                            width: 2,
                            lineDash: [0.5, 4]
                        }),
                        showLabels: true,
                        map: this.mapLayer
                    });


                    this.graticule = true
                }

            },
            pngExport() {
                this.mapLayer.once('rendercomplete', function (event) {
                    let canvas = event.context.canvas;
                    if (navigator.msSaveBlob) {
                        navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
                    } else {
                        canvas.toBlob(function (blob) {
                            saveAs(blob, 'map.png');
                        });
                    }
                });
                this.mapLayer.renderSync();

            },
            pdfExport() {
                let dims = {
                    a0: [1189, 841],
                    a1: [841, 594],
                    a2: [594, 420],
                    a3: [420, 297],
                    a4: [297, 210],
                    a5: [210, 148]
                };
                let format = 'a4';
                let resolution = '72';
                let dim = dims[format];
                let width = Math.round(dim[0] * resolution / 25.4);
                let height = Math.round(dim[1] * resolution / 25.4);
                let size = /** @type {module:ol/size~Size} */ (this.mapLayer.getSize());
                let extent = this.mapLayer.getView().calculateExtent(size);

                let self = this;
                this.mapLayer.once('rendercomplete', function (event) {
                    let canvas = event.context.canvas;
                    let data = canvas.toDataURL('image/jpeg');
                    let pdf = new jsPDF('landscape', undefined, format);
                    pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
                    pdf.save('map.pdf');
                    console.log('test')
                    // Reset original map size
                    self.mapLayer.setSize(size);
                    self.mapLayer.getView().fit(extent, {size: size});
                });

                // Set print size
                let printSize = [width, height];
                this.mapLayer.setSize(size);
                // this.mapLayer.getView().fit(extent, {size: size});

            },
            setMarkerTrue() {
                this.isMarker = true
                this.typeSelect = 'None'
            },
            selectColumns(alias, key, e) {
                if (e.target.checked) {
                    // for (let alias in this.tableFeaturesHeader) {
                    // if (this.checkedColumns.includes(alias)) {
                    this.checkedColumnsData.push(this.stackedTableFeaturesHeader[key])
                    // }
                    // }
                } else {
                    this.checkedColumnsData = this.checkedColumnsData.filter(data => data != alias);
                }
            },
            showColumnsChange() {
                if (this.showColumnsBoolean) {
                    this.showColumnsBoolean = false
                } else {
                    this.showColumnsBoolean = true
                }
            },
            showDataModal(Feature) {
                this.tableFeatureData = Feature
                // console.log(Feature)
                this.$modal.show('data-modal', null, {
                    name: 'dynamic-modal',
                    resizable: true,
                    adaptive: true,
                    draggable: true,
                });
            },
            showFilterModal() {
                // this.tableFeatureData = Feature
                // console.log(Feature)
                this.$modal.show('filter-modal', null, {
                    name: 'dynamic-modal',
                    resizable: true,
                    adaptive: true,
                    draggable: true,
                });
            },

            hideDataModal() {
                this.$modal.hide('data-modal');
            },
            logout() {
                this.$cookie.delete('token');
                this.$cookie.delete('username');
                this.$router.push('/login')

            },
            addInteraction() {
                this.isMarker = false
                let value = this.typeSelect
                if (value !== 'None') {
                    var geometryFunction;
                    if (value === 'Square') {
                        value = 'Circle';
                        geometryFunction = createRegularPolygon(4);
                    } else if (value === 'Box') {
                        value = 'Circle';
                        geometryFunction = createBox();
                    }
                    this.draw = new Draw({
                        source: this.source,
                        type: value,
                        geometryFunction: geometryFunction,
                        freehandCondition: shiftKeyOnly
                    });
                    this.mapLayer.addInteraction(this.draw);

                } else {

                    this.draw = new Draw({
                        source: this.source,
                        type: this.typeSelect,
                        freehandCondition: shiftKeyOnly

                    });


                    this.mapLayer.addInteraction(this.draw);

                }

                // this.draw.setZIndex(9999)
                this.createMeasuremaptooltip();
                this.createHelpmaptooltip();

                let listener;
                let self = this;
                // let handleOutput = this;
                this.draw.on('drawstart',
                    function (evt) {
                        // set sketch
                        this.sketch = evt.feature;
                        /** @type {module:ol/coordinate~Coordinate|undefined} */
                        let maptooltipCoord = evt.coordinate;
                        listener = this.sketch.getGeometry().on('change', function (evt) {
                            let geom = evt.target;
                            let output;

                            if (geom instanceof Polygon) {
                                output = self.formatArea(geom);

                                maptooltipCoord = geom.getInteriorPoint().getCoordinates();
                            } else if (geom instanceof LineString) {
                                output = self.formatLength(geom);
                                maptooltipCoord = geom.getLastCoordinate();
                            } else if (geom instanceof Circle) {
                                output = self.formatCircleRadius(geom);
                                maptooltipCoord = geom.getLastCoordinate();
                            }
                            self.measuremaptooltipElement.innerHTML = output;
                            self.measuremaptooltip.setPosition(maptooltipCoord);
                        });
                    }, this);

                this.draw.on('drawend',
                    function (e) {
                        self.measuremaptooltipElement.className = 'maptooltip maptooltip-static';
                        self.measuremaptooltip.setOffset([0, -7]);
                        // unset sketch
                        self.sketch = null;
                        // unset maptooltip so that a new one can be created
                        self.measuremaptooltipElement = null;
                        self.createMeasuremaptooltip();
                        unByKey(listener);
                    }, this);
            },
            createHelpmaptooltip() {
                if (this.helpmaptooltipElement) {
                    this.helpmaptooltipElement.parentNode.removeChild(this.helpmaptooltipElement);
                }
                this.helpmaptooltipElement = document.createElement('div');
                this.helpmaptooltipElement.className = 'maptooltip hidden';
                this.helpmaptooltip = new Overlay({
                    element: this.helpmaptooltipElement,
                    offset: [15, 0],
                    positioning: 'center-left'
                });
                this.mapLayer.addOverlay(this.helpmaptooltip);
            },
            createMeasuremaptooltip() {
                if (this.measuremaptooltipElement) {
                    this.measuremaptooltipElement.parentNode.removeChild(this.measuremaptooltipElement);
                }
                this.measuremaptooltipElement = document.createElement('div');
                this.measuremaptooltipElement.className = 'maptooltip maptooltip-measure';
                this.measuremaptooltip = new Overlay({
                    element: this.measuremaptooltipElement,
                    offset: [0, -15],
                    positioning: 'bottom-center'
                });
                this.mapLayer.addOverlay(this.measuremaptooltip);
            },
            formatArea(polygon) {
                let area = getArea(polygon);
                let output;
                if (area > 10000) {
                    output = (Math.round(area / 1000000 * 100) / 100) +
                        ' ' + 'km<sup>2</sup>';
                } else {
                    output = (Math.round(area * 100) / 100) +
                        ' ' + 'm<sup>2</sup>';
                }
                return output;
            },
            formatLength(line) {
                let length = getLength(line);
                let output;
                if (length > 100) {
                    output = (Math.round(length / 1000 * 100) / 100) +
                        ' ' + 'km';
                } else {
                    output = (Math.round(length * 100) / 100) +
                        ' ' + 'm';
                }
                return output;
            },
            formatCircleRadius(line) {
                let length = line.getRadius() * METERS_PER_UNIT['m'];
                let output;
                if (length > 100) {
                    output = (Math.round(length / 1000 * 100) / 100) +
                        ' ' + 'km';
                } else {
                    output = (Math.round(length * 100) / 100) +
                        ' ' + 'm';
                }
                return output;
            },
            onMoveCallbackBaseLayerList(evt, originalEvent) {
                this.baseLayerList = this.baseLayerList.map((item, index) => {
                    let name = item.name
                    let order = index + 1
                    let spatial = item.spatial
                    return {name, order, spatial};
                });
                this.setIndexes();
            },
            onMoveCallbackDynamicLayerList(evt, originalEvent) {
                let self = this;
                console.log(this.dynamicLayerList)

                this.dynamicLayerList = this.dynamicLayerList.map((item, index) => {
                    let name = item.name
                    let layersVisibility = item.layersVisibility
                    let collapseVisibility = item.collapseVisibility
                    let layers = item.layers
                    return {name, order: index + 1, layersVisibility, collapseVisibility, layers};
                });
                console.log(this.dynamicLayerList)
                this.setDynamicIndexes();

            },
            async LayerService() {
                const response = await LayerService.getLayers({token: this.token});
                this.gisLayers = response.data.services;
                let self = this;
                for (let i = 0; i < this.gisLayers.length; i++) {
                    let responseDynamic = await LayerService.getDynamicLayers({
                        token: self.token,
                        name: self.gisLayers[i].name
                    })

                    if (!responseDynamic.data.supportsDynamicLayers) {
                        this.baseLayerList.push({
                            'name': self.gisLayers[i].name,
                            'order': i + 1,
                            'spaital': responseDynamic.data.spatialReference.latestWkid
                        })
                    } else {


                        this.dynamicLayerList.push({
                            'name': self.gisLayers[i].name,
                            'order': i + 1,
                            'layersVisibility': false,
                            'collapseVisibility': false,
                            'layers': responseDynamic.data.layers
                        })
                        self.dynamicSubLayerList[self.gisLayers[i].name] = [];
                        responseDynamic.data.layers.forEach(function (element) {
                            self.dynamicSubLayerList[self.gisLayers[i].name][element.id] = true

                        });
                    }
                }
                delete this.dynamicSubLayerList[0];

            },
            async getTableData(service, layer_id, layer_name, query) {
                let response = await LayerService.getTableData({
                    token: this.token,
                    name: service.name,
                    layer: layer_id,
                    where: query
                });
                if (response.data.error !== undefined) {
                    console.log('error')
                    return;
                }

                this.tableNextRequest['service'] = service;
                this.tableNextRequest['layer_id'] = layer_id;
                this.tableNextRequest['layer_name'] = layer_name;

                this.tableHeader = layer_name
                this.tableFeaturesData = response.data.features
                this.tableFeaturesHeader = Object.keys(this.tableFeaturesData[0].attributes);
                let target = response.data.fieldAliases
                this.stackedTableFeaturesHeader = this.tableFeaturesHeader
                this.checkedColumnsData = []
                for (let alias in this.tableFeaturesHeader) {
                    if (!this.defaultUnCheckedColumns.includes(this.tableFeaturesHeader[alias])) {
                        this.checkedColumnsData.push(this.tableFeaturesHeader[alias])
                    }
                }

                this.tableFeaturesHeader = this.tableFeaturesHeader.map((item, index) => {
                    let name = item
                    for (let k in target) {
                        if (typeof target[k] !== 'function') {
                            if (item === k) {
                                name = target[k]
                            }
                        }
                    }
                    return name;
                });
                this.checkedColumns = []
                for (let alias in this.tableFeaturesHeader) {
                    if (!this.defaultUnCheckedColumns.includes(this.tableFeaturesHeader[alias])) {
                        this.checkedColumns.push(this.tableFeaturesHeader[alias])
                    }
                }
                console.log(this.checkedColumns)
                console.log(this.checkedColumnsData)
                // console.log(this.tableFeaturesData)
                this.showTable = true
                this.filterQuery = '';
                this.filterValues = [];

            },
            async getGeometryData(service, layer_id, layer_name, query, geometry) {
                let response = await LayerService.getGeometryData({
                    token: this.token,
                    name: service.name,
                    layer: layer_id,
                    where: query,
                    geometry: geometry,
                });

                if (response.data.features !== undefined) {
                    if (response.data.features.length !== 0) {
                        this.showDataModal(response.data.features[0])
                    }
                }
            },
            setIndexes() {
                this.baseLayerList.map((item, index) => {
                    this.mapLayer.getLayers().forEach(function (layer) {
                        if (layer.get('name') != undefined && layer.get('name') === item.name) {
                            layer.setZIndex(500 - index)
                        }
                    });
                });
            },
            setDynamicIndexes() {
                this.dynamicLayerList.map((item, index) => {
                    this.mapLayer.getLayers().forEach(function (layer) {
                        if (layer.get('name') != undefined && layer.get('name') === item.name) {
                            layer.setZIndex(9999 - index)
                        }
                    });
                });
            },
            addLayers(service, index, dynamic = false, params) {

                let url = baseUrl + "/arcgis/rest/services/" + service.name + "/MapServer";
                let new_layer;
                if (dynamic) {

                    let layers = this.dynamicSubLayerList[service.name];
                    let active_layers = '';
                    let hidden_layers = '';
                    let colors = '';
                    if (typeof this.dynamicForColors[service.name] !== 'undefined') {
                        colors = '[';
                        this.dynamicForColors[this.colorPicker.layer.name].forEach(function (colorLayer) {
                            colors += colorLayer;
                        })
                        colors += ']';
                    }
                    layers.forEach(function (layer, index) {
                        if (layer === true) {
                            active_layers += index + ','
                        } else {
                            hidden_layers += index + ','
                        }
                    })

                    let layer_config = '';
                    if (active_layers !== '') {
                        active_layers = active_layers.slice(0, -1);
                        layer_config += "show:" + active_layers
                    } else {
                        hidden_layers = hidden_layers.slice(0, -1);
                        layer_config += "hide:" + hidden_layers
                    }
                    new_layer = new TileLayer({
                        source: new TileArcGISRest({
                            url: url,
                            crossOrigin: "Anonymous",
                            params: {
                                "token": this.token,
                                "layers": layer_config,
                                "dynamicLayers": colors,
                                "FORMAT": "png8"
                            }
                        })
                    });
                } else {
                    console.log(service.spaital)
                    if (service.spaital === 3857) {

                        url = url + "/tile/{z}/{y}/{x}?token=" + this.token
                        // proj4.defs("EPSG:32639", "+proj=utm +zone=39 +datum=WGS84 +units=m +no_defs");
                        //
                        // register(proj4);
                        // var proj54009 = getProjection('EPSG:32639');
                        // proj54009.setExtent([4073251.6068361676, 605305.4965181611, 4762111.411185106, -265800.3546973752]);
                        new_layer = new TileLayer({
                            source: new XYZ({
                                url: url,
                                projection: 'EPSG:3857',
                                crossOrigin: "Anonymous",
                            })
                        });
                    } else {
                        new_layer = new TileLayer({
                            source: new TileArcGISRest({
                                url: url,
                                crossOrigin: "Anonymous",
                                params: {
                                    "token": this.token,
                                    "FORMAT": "png8"
                                }
                            })
                        });
                    }
                }
                this.mapLayer.addLayer(new_layer);
                new_layer.set('name', service.name);
                if (dynamic) {
                    new_layer.setZIndex(9999 - index);
                } else {
                    new_layer.setZIndex(500 - index);
                }

            },
            setBaseLayout(index) {
                let layers = this.mapLayer.getLayers().getArray();
                layers[0].setSource(this.baseMaps[index])
            },
            deleteLayers(service, reset) {
                let layersToRemove = [];
                let self = this
                this.mapLayer.getLayers().forEach(function (layer) {
                    if (layer.get('name') != undefined && layer.get('name') === service.name) {
                        layersToRemove.push(layer);
                        if (reset)
                            self.dynamicLayersReset(service, false)
                    }
                });
                let len = layersToRemove.length;
                for (let i = 0; i < len; i++) {
                    this.mapLayer.removeLayer(layersToRemove[i]);
                }
            },
            async dynamicLayersReset(service, status) {
                let response = await LayerService.getLayerDynamic({
                    token: this.token,
                    name: service.name,
                })
                let colorEnabled = false;
                if (response.data.layers[0].drawingInfo !== undefined) {
                    if (response.data.layers[0].drawingInfo.renderer.symbol !== undefined) {
                        if (response.data.layers[0].drawingInfo.renderer.symbol.color !== undefined) {
                            colorEnabled = true
                        }
                    }
                }

                this.dynamicLayerList = this.dynamicLayerList.map((item, index) => {
                    let name = item.name
                    let layersVisibility = item.layersVisibility
                    let collapseVisibility = item.collapseVisibility
                    let color = item.color ? item.color : false
                    if (service.name === name) {
                        layersVisibility = status;
                        color = colorEnabled
                    }
                    let layers = item.layers
                    let order = item.order
                    return {name, order: order, layersVisibility, collapseVisibility, layers, color};
                });
            },
            selectService(service, index, dynamic, e) {
                this.selectedServiceName = service.name
                if (e.target.checked) {
                    this.addLayers(service, index, dynamic, null)
                    for (let i in this.dynamicLayerList) {
                        if (this.dynamicLayerList[i].name === service.name) {
                            this.dynamicLayerList[i].collapseVisibility = true;
                            break;
                        }
                    }
                } else {
                    this.deleteLayers(service)
                    for (let i in this.dynamicLayerList) {
                        if (this.dynamicLayerList[i].name === service.name) {
                            this.dynamicLayerList[i].collapseVisibility = false;
                            this.dynamicLayerList[i].layersVisibility = false;
                            break;
                        }
                    }

                }
            },
            selectSubService(service, index, id, e) {
                if (this.dynamicSubLayerList[service.name][id]) {
                    this.dynamicSubLayerList[service.name][id] = false
                } else {
                    this.dynamicSubLayerList[service.name][id] = true
                }
                this.deleteLayers(service, false)
                for (let i in this.dynamicLayerList) {
                    if (this.dynamicLayerList[i].name === service.name) {
                        this.dynamicLayerList[i].layersVisibility = true;
                        break;
                    }
                }
                this.dynamicLayersReset(service, true)

                this.addLayers(service, index, true, null)

            },
            saveColor() {
                // this.changeColor(this.colorPicker.layer.drawingInfo.renderer.symbol, this.colors)
                // this.changeColor(this.colorPicker.layer.drawingInfo.renderer.symbol.outline, this.borderColors)
                this.deleteLayers(this.colorPicker.layer)
                this.colorPicker.visibility = false;
                let colors = [];
                let outlines = [];
                colors[0] = this.colors.rgba.r;
                colors[1] = this.colors.rgba.g;
                colors[2] = this.colors.rgba.b;
                colors[3] = 255;
                outlines[0] = this.borderColors.rgba.r;
                outlines[1] = this.borderColors.rgba.g;
                outlines[2] = this.borderColors.rgba.b;
                outlines[3] = 255;

                let color = "[" + colors[0] + "," + colors[1] + "," + colors[2] + "," + colors[3] + "]";
                let outline = "[" + outlines[0] + "," + outlines[1] + "," + outlines[2] + "," + outlines[3] + "]";
                // let layerDyn = '[' +
                //     '{"id":' + this.colorPicker.sublayer + ',"name":"","source":{"type":"mapLayer","mapLayerId": ' + this.colorPicker.sublayer + '},"drawingInfo":{"renderer":{"type":"simple","label":"","description":"","symbol":{"color":' + color + ',"outline":{"color":' + outline + ',"width":1.0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}}},"minScale":0,"maxScale":0},]';
                if (typeof this.dynamicForColors[this.colorPicker.layer.name] === 'undefined') {
                    this.dynamicForColors[this.colorPicker.layer.name] = [];
                }
                let layerDyn = '{"id":' + this.colorPicker.sublayer + ',"name":"","source":{"type":"mapLayer","mapLayerId": ' + this.colorPicker.sublayer + '},"drawingInfo":{"renderer":{"type":"simple","label":"","description":"","symbol":{"color":' + color + ',"outline":{"color":' + outline + ',"width":1.0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}}},"minScale":0,"maxScale":0},';

                this.dynamicForColors[this.colorPicker.layer.name][this.colorPicker.sublayer] = layerDyn;

                // responseDynamic.data.layers.forEach(function (element) {
                //     self.dynamicSubLayerList[self.gisLayers[i].name][element.id] = true
                //
                // });

                this.addLayers(this.colorPicker.layer, this.colorPicker.index, true, layerDyn)
            },

            setDrawType(name) {
                this.typeSelect = name
                this.mapLayer.removeInteraction(this.draw);

                if (name !== 'None') {

                    this.addInteraction();
                }

            },
            OpenColorPicker(layer, sublayer, name, index) {
                this.colorPicker.visibility = true;
                this.colorPicker.sublayer = sublayer;
                this.colorPicker.layer = layer;
                this.colorPicker.service = name;
                this.colorPicker.index = index;
            },
            async getLayerDynamic(layer) {
                let response = await LayerService.getLayerDynamic({
                    token: this.token,
                    name: layer.name,
                })
                return response.data
            },
            changeColor(layer, globalColor) {
                layer.color[0] = globalColor.rgba.r;
                layer.color[1] = globalColor.rgba.g;
                layer.color[2] = globalColor.rgba.b;
                layer.color[3] = globalColor.rgba.a;
            },
            checkNested(obj) {
                var args = Array.prototype.slice.call(arguments, 1);

                for (var i = 0; i < args.length; i++) {
                    if (!obj || !obj.hasOwnProperty(args[i])) {
                        return false;
                    }
                    obj = obj[args[i]];
                }
                return true;
            }
        }
        ,
        computed: {
            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            },
            dragOptionsDynamic() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
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
                    if (this.checkedColumns.includes(this.tableFeaturesHeader[column])) {
                        columns[this.tableFeaturesHeader[column]] = this.stackedTableFeaturesHeader[column];
                    }
                }
                return columns;
            }
        }
        ,

    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
