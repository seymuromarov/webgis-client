<template>
<div class="row container-fluid padding-0">
    <div class=" padding-0 sup-bar-layout">

        <img src="../assets/logo-en.png" alt="logo" class="azc-cosmos-logo">
        <div class="userNameLabel">
            <span class="">{{ username }}</span>
            <i @click="logout()" title='Log out' class="logOutIcon fas fa-power-off" style="margin-left: 10px;"></i>
        </div>
        <hr>

        <h5 class="text-left-layer">Dynamic Layers
            <span>
                <i v-if="!dynamicLayersShow" @click="dynamicLayersShow=true" class="fas fa-caret-left makeMePoint">
                </i>
                <i v-if="dynamicLayersShow " @click="dynamicLayersShow=false" class="fas fa-caret-down makeMePoint">
                </i>
            </span>
        </h5>

        <LayerColorPicker @updateColor="saveColor" />

        <transition name="slide-fade">

            <draggable v-show="dynamicLayersShow" class="list-group" tag="ul" key="dynamicLayer" v-model="dynamicLayerList" v-bind="dragOptionsDynamic" @start="isDragging = true" @end="onMoveCallbackDynamicLayerList()">
                <transition-group type="transition" name="flip-list">
                    <li class="list-group-item" v-for="(element,index) in dynamicLayerList" :key="index" style="text-align: left">
                        <div class="row">
                            <div class="col-12  layerDiv">
                                <input class="parentCheckbox" :id="element.name" :name="element.name" type="checkbox" @click="selectService(element, element.order,true, $event)" />
                                <i class="checkbox-icon far fa-check-circle"></i>
                                <label :for="element.name"></label>
                                <span class="serviceTitle">
                                    {{ element.name }}
                                </span>

                                <span>
                                    <i v-if="element.collapseVisibility && !element.layersVisibility" @click="dynamicLayersReset(element, true)" class="fas fa-caret-left makeMePoint">
                                    </i>
                                    <i v-if=" element.layersVisibility " @click="element.layersVisibility=false" class="fas fa-caret-down makeMePoint">
                                    </i>
                                </span>

                            </div>
                        </div>

                        <div style="background: whitesmoke;padding-top: 10px; " v-show="element.layersVisibility">
                            <div class="row layerDiv" v-for="layer in element.layers"  :style="{paddingLeft: layer.margin * 30 + 'px'}" >

                                <div class="col-12" style="white-space: nowrap" >
                                    <input class="parentCheckbox" v-show="layer.geometryType" :id="element.name + layer.id" :value="element.name + layer.id" :name="element.name + layer.id" v-model="dynamicSubLayerList[element.name][layer.id]" type="checkbox" @click="selectSubService(element,element.order,layer.id, $event)" />
                                    <i class="checkbox-icon far fa-check-circle"></i>
                                    <label :for="element.name + layer.id"></label>
                                    <span class="serviceTitle" :for="layer.name"> {{ layer.name }}</span>
                                    <div class="">
                                        <i class="dataIcon fas fa-table" @click="getTableData(element,layer.id,layer.name,'1=1')"></i>
                                        <i style="margin-left: 10px;" class="dataIcon fab fa-codiepie" v-if="element.color===true" @click="OpenColorPicker(element,layer.id,layer.name,element.order)"></i>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </li>
                </transition-group>
            </draggable>
        </transition>
        <hr>
        <h5 class="text-left-layer">Basemaps
            <span>
                <i v-if="!baseLayersShow" @click="baseLayersShow=true" class="fas fa-caret-left makeMePoint">
                </i>
                <i v-if="baseLayersShow " @click="baseLayersShow=false" class="fas fa-caret-down makeMePoint">
                </i>
            </span>
        </h5>
        <transition name="slide-fade">

            <draggable class="list-group" v-show="baseLayersShow" tag="ul" key="baseLayers" v-model="baseLayerList" v-bind="dragOptions" @start="isDragging = true" @end="onMoveCallbackBaseLayerList()">
                
                  
            <TreeView 
    :data="baseLayerList" @selectService="selectService"/>
                <!-- <transition-group type="transition" name="flip-list">
     

                    <li class="list-group-item" v-for="element in baseLayerList" :key="element.name" style="text-align: left">


                        <div class="row">

                            <div class="col-12 layerDiv">
                                <input class="parentCheckbox" :id="element.name" :name="element.name" type="checkbox" :checked="element.name==='AzercosmosBasemap'" @click="selectService(element, element.order,false, $event)" />
                                <i class="checkbox-icon far fa-check-circle"></i>
                                <label :for="element.name"></label>
                                <span class="serviceTitle">
                                    {{ element.name }}
                                </span>
                            </div>
         
                        </div>
                    </li>
                </transition-group> -->
            </draggable>
        </transition>

    </div>

    <div class=" padding-0 map-layout">

        <div id="map">
            <button class="action-button-class btn btn-control" :style="{top : '15%'}" title="Search" @click="cityInputToggle">
                <i class="fas fa-search"></i>
            </button>
            <button class="action-button-class btn btn-control" :style="{top : '25%'}" title="Add marker" @click="setMarkerTrue">
                <i class="fas fa-map-marker-alt"></i>
            </button>

            <div style="position: absolute;top: 14.2%;right: 60px;z-index: 999" v-show="citySearchInputShow">
                <multiselect v-model="citySearchValue" :options="citySearchOptions" :custom-label="nameWithCountry" selectLabel="" placeholder="Select City" label="city" track-by="city" @select="onCitySelect"></multiselect>
            </div>

            <button class="action-button-class btn btn-control" :style="{top : '65%'}" title="Delete Feature" @click="deleteFeatureOn">
                <i class="fas fa-trash"></i>
            </button>
            <button class="action-button-class btn btn-control" :style="{top : '70%'}" title="Reset Features" @click="resetFeatures">
                <i class="fas fa-sync-alt"></i>
            </button>
            <button class="action-button-class btn btn-control" :style="{top : '75%'}" title="Color Picker" @click="eyeDropper">
                <i class="fas fa-eye-dropper"></i>
            </button>

            <button v-for="(item, index) in drawings" class="action-button-class btn btn-control" :style="{top : ((index+1)*5+25) + '%'}" :title="item.tooltip" @click="setDrawType(item.name)">
                <i :class="item.icon"></i>

            </button>

            <div id="mouse-position" class="latLongShow" @click="LatLongFormToggle"></div>

            <div class="latLongShowForm" v-show="latLongFormShow">
                <div style="width: 300px" @mouseleave="LatLongFormToggle">
                    <div style="display: inline;float: left;">
                        Lat: <input v-model="latChange" v-on:keyup.enter="changeLocation" class="form-control" type="text" placeholder="Latitude" style="    display: inline-block;width: 100px;">
                    </div>
                    <div style="display: inline;">
                        Lng: <input v-model="longChange" v-on:keyup.enter="changeLocation" class="form-control" type="text" placeholder="Longitude" style="    display: inline-block;width: 100px;">

                    </div>
                </div>
            </div>
            <div id="info" class="infokml" v-show="this.kmlInfo!==null">&nbsp;</div>

            <button class="action-button-class btn btn-control" style="bottom: 10px;right: 50px;" @click="dragAndDropToast" title="Upload file" v-if="!showTable">
                <i class="fas fa-file-upload"></i>
            </button>
            <button class="action-button-class btn btn-control" style="bottom: 10px;right: 10px;" @click="selectLayerForm = true" v-if="!showTable">
                <i class="fas fa-stream"></i>
            </button>
            <div v-show="selectLayerForm" @mouseleave="selectLayerForm=false" class="selectLayerForm">
                <form>
                    <div v-for="(element,index) in baseMaps">
                        <input type="radio" class="" name="baseLayer" @click="setBaseLayout(index)">
                        <span style="margin-left: 5px;">{{index}}</span>

                    </div>
                </form>
            </div>

            <button class="action-button-class btn btn-control" style="top: 116px;left: .5rem;" title="Home" @click="zoomToCenter">
                <i class="fas fa-home"></i>
            </button>
            <button class="action-button-class btn btn-control" style="top: 152px;left: .5rem;" title="Go next map history" :disabled='!nextHistoryEvent' @click="historyNext">
                <i class="fas fa-arrow-right"></i>
            </button>
            <button class="action-button-class btn btn-control" style="top: 188px;left: .5rem;" title="Go previous map history" :disabled='!previousHistoryEvent' @click="historyBack">
                <i class="fas fa-arrow-left"></i>
            </button>

            <button class="action-button-class btn btn-control" style="top: 224px;left: .5rem;" @click="addGraticule" title="Add Graticule" v-show="!showTable">
                <i class="fas fa-barcode"></i>
            </button>

            <button class="action-button-class btn btn-control" style="bottom: 10px;left: 3rem;" @click="pngExport" title="Export to png" v-show="!showTable">
                <i class="far fa-file-image"></i>
            </button>

            <button class="action-button-class btn btn-control" style="bottom: 10px;left: .5rem;" @click="exportData" title="Export to geojson" v-show="!showTable">
                <i class="fas fa-file-download"></i>
            </button>
        </div>

    </div>

    <!--        <div class="" >-->
    <div v-if="showTable" class="tableDiv howMuchWidthHaveMap">
        <div class="tableHeader">
            <div class="row">
                <div class="col-2">
                    <p class="text-left" style="margin-top: 5px;">{{tableHeader}}</p>
                </div>
                <div class="col-10">
                    <download-excel v-if="tableFeaturesHeader" class="fas fa-file-excel icon excelDataIcon excelIcon makeMePoint" :data="featuresToExcel" :fields="checkedColumnsToExcel" type="xls" :name="'test' + '_report.xls'">

                        <i></i>

                    </download-excel>
                    <i class="fas  fa-columns tableColumns makeMePoint" @click="showColumnsChange">

                    </i>
                    <i class="fas fa-times tableClose makeMePoint" @click="showTable=false"></i>
                    <i class="fas fa-filter tableFilter makeMePoint" @click="showFilterModal"></i>
                    <div class="tableShowColumns" v-if="showColumnsBoolean">
                        <div class="columnsDiv">
                            <div v-for="(alias, key) in tableFeaturesHeader">
                                <input @click="selectColumns(alias,key, $event)" type="checkbox" :id="alias" :value="alias" v-model="checkedColumns" checked="checked" />
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
                        <td class="makeMePoint" @click="showDataModal(data)" v-show="checkedColumnsData.includes(key)" v-for="(attr, key) in data.attributes"> {{ attr }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!--        </div>-->
    <modal name="data-modal" transition="nice-modal-fade" :min-width="200" :min-height="200" :delay="100" :draggable="true">
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
                        <td class="paddingLeft">{{ tableFeaturesHeaderWithAlias[key] }}</td>
                        <td class="paddingRight">{{ value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </modal>

    <modal name="filter-modal" transition="nice-modal-fade" class="filter-modal-class" :min-width="200" :min-height="200" :delay="100" :draggable="true" :height="540">
        <div id="filterDiv" class="filterDiv">
            <div id="filterDivHeader" class="filterDivHeader">
                <label class="filterLayerName"> {{ this.tableHeader }}</label>
                <!--                    <i class="fas fa-times filterCloseIcon" @click="closeFilter()"></i>-->
            </div>
            <div class="filterFieldsListDiv">
                <ul class="filterFieldsList">
                    <li @dblclick="filterQuery += stackedTableFeaturesHeader[column] + ' '" @click="filterSelectedColumn(stackedTableFeaturesHeader[column])" v-for="(alias, column) in tableFeaturesHeader"> {{ alias }}
                    </li>
                </ul>
            </div>
            <div class="filterCenterDiv">
                <div class="filterActionsDiv">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <button @click="filterQuery += '= '" class="parameterButton btn btn-sm btn-outline-secondary"> =
                                    </button>
                                </td>
                                <td>
                                    <button @click="filterQuery += '>= '" class="parameterButton btn btn-sm btn-outline-secondary"> >=
                                    </button>
                                </td>
                                <td>
                                    <button @click="filterQuery += '> '" class="parameterButton btn btn-sm btn-outline-secondary"> >
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button @click="filterQuery += '<= '" class="parameterButton btn btn-sm btn-outline-secondary">
                                        <= </button> </td> <td>
                                            <button @click="filterQuery += '< '" class="parameterButton btn btn-sm btn-outline-secondary">
                                                < </button> </td> <td>
                                                    <button @click="filterQuery += 'LIKE '" class="parameterButton btn btn-sm btn-outline-secondary"> like
                                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button @click="filterQuery += '<> '" class="parameterButton btn btn-sm btn-outline-secondary">
                                        <>
                                    </button>
                                </td>
                                <td>
                                    <button @click="filterQuery += 'AND '" class="parameterButton btn btn-sm btn-outline-secondary"> and
                                    </button>
                                </td>
                                <td>
                                    <button @click="filterQuery += 'OR '" class="parameterButton btn btn-sm btn-outline-secondary"> or
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button @click="filterQuery += 'IS NULL'" class="parameterButton btn btn-sm btn-outline-secondary"> null
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
                <textarea class="queryTextArea" name="filterQuery" rows="4" cols="69" v-model="filterQuery"> {{ filterQuery }} </textarea>
                <div>
                    <button class="btn btn-outline-info filterApplyButton" @click="filterData()">Apply</button>
                </div>
            </div>
        </div>

    </modal>
    <modal name="color-picker-modal" transition="nice-modal-fade" class="color-picker-modal-class" :min-width="200" :min-height="200" :delay="100" :draggable="false" :height="400">
        <ShapeColorPicker @setShapeColor="setShapeColor" />

    </modal>

</div>
</template>

<script>
import 'ol/ol.css'
// import geocoder from 'ol-geocoder';
import {
    Map,
    View,
    Overlay,
    Feature
} from 'ol';
import {
    LineString,
    Polygon,
    Circle,
    Point
} from 'ol/geom.js';
import {
    Modify,
    defaults as defaultInteractions,
    DragRotateAndZoom,
    DragAndDrop
} from 'ol/interaction';
import {
    Circle as CircleStyle,
    Fill,
    Stroke,
    Style,
    Icon
} from 'ol/style.js';
import {
    Tile as TileLayer,
    Vector as VectorLayer,
    Image as ImageLayer
} from 'ol/layer.js';
import VectorTileLayer from "ol/layer/VectorTile.js";
import VectorTileSource from "ol/source/VectorTile.js";
import MVT from "ol/format/MVT.js";

import {
    TileArcGISRest,
    Vector as VectorSource,
    ImageArcGISRest
} from 'ol/source.js';
import {
    fromLonLat,
    METERS_PER_UNIT,
    transform,
    transformExtent,
    get as getProjection,
    getTransform
} from 'ol/proj';
import XYZ from 'ol/source/XYZ.js';
import draggable from "vuedraggable";
import {
    bbox as bboxStrategy
} from "ol/loadingstrategy";
import LayerService from '@/services/LayerService'
import {
    Toggler,
    MapHelpers,
    ColorPicker,
    LayerHelper
} from '../helpers'
import {
    ZoomSlider,
    defaults as defaultControls,
    FullScreen
} from 'ol/control.js';

import MousePosition from 'ol/control/MousePosition.js';
import {
    createStringXY
} from 'ol/coordinate.js';
import {
    GPX,
    GeoJSON,
    IGC,
    KML,
    TopoJSON
} from 'ol/format.js';
import {
    LAYER_URLS
} from "../config/baseUrl";
import proj4 from 'proj4';
import {
    register
} from 'ol/proj/proj4.js';
import {
    applyTransform
} from "ol/extent";
import * as format from "ol/format";
import {
    az_json
} from "../assets/json/az"
import LoginService from "../services/LoginService";
//#region Components

import Multiselect from 'vue-multiselect'
import {LayerColorPicker,ShapeColorPicker,scratch,TreeView} from '../components/';

 //#endregion
export default {
    name: 'home',
    components: {
        draggable,
        LayerColorPicker,
        ShapeColorPicker,
        Multiselect,
        scratch,
        TreeView,
    },
    data() {
        return {
             treeData :{
                name: 'My Tree',
                children: [
                    { name: 'hello' },
                    { name: 'wat' },
                    {
                    name: 'child folder',
                    children: [
                        {
                        name: 'child folder',
                        children: [
                            { name: 'hello' },
                            { name: 'wat' }
                        ]
                        },
                        { name: 'hello' },
                        { name: 'wat' },
                        {
                        name: 'child folder',
                        children: [
                            { name: 'hello' },
                            { name: 'wat' }
                        ]
                        }
                    ]
                    }
                ]
                },
            baseLayersShow: true,
            dynamicLayersShow: true,
            latLongFormShow: false,
            MapHelpers: null,
            Toggler: null,
            ColorPicker: null,
            latChange: null,
            longChange: null,
            lastCoordinates: null,
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
            drawings: [{
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
            isRemove: false,
            isColorPick: false,
            gisLayers: [],
            token: null,
            emlakToken: null,
            kmlInfo: null,
            username: null,
            source: null,
            vector: null,
            vectorSource: null,
            vectorLayer: null,
            featureIDSet: 0,
            sketch: null,
            typeSelect: null,
            showTable: false,
            draw: null,
            tableFeaturesData: [],
            tableFeatureData: [],
            tableNextRequest: [],
            tableFeaturesHeader: [],
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
            stackedTableFeaturesHeader: [],
            tableHeader: null,
            dynamicLayerList: [],
            baseLayerList: [],
            dynamicSubLayerList: [
                []
            ],
            helpmaptooltipElement: null,
            helpmaptooltip: null,
            measuremaptooltipElement: null,
            measuremaptooltip: null,
            baseMaps: {
                sat: new XYZ({

                    name: "sat",
                    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                }),
                street: new XYZ({

                    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
                }),
                gray: new XYZ({

                    crossOrigin: "Anonymous",
                    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                }),
                none: new XYZ({

                    crossOrigin: "Anonymous",
                    url: "",
                })
            },

            dynamicForColors: [
                []
            ]
        }
    },
    mounted() {
        this.token = this.$cookie.get('token');
        this.username = this.$cookie.get('username');
        if (this.token === null)
            this.$router.push('/login')

        this.MapHelpers = new MapHelpers(this)
        this.Toggler = new Toggler(this)
        this.ColorPicker = new ColorPicker(this);
        this.LayerHelper = new LayerHelper(this);
        this.citySearchOptions = az_json;

        this.source = new VectorSource({
            wrapX: false
        });

        this.vector = new VectorLayer({
            source: this.source,
            features: []
        });
        this.vector.setZIndex(9999);
        let gray = new TileLayer({
            source: new XYZ({
                crossOrigin: "Anonymous",
                url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                // url: "",
            })
        });
        this.LayerService();

        this.$nextTick(function () {
            let dragAndDropInteraction = new DragAndDrop({
                formatConstructors: [
                    GPX,
                    GeoJSON,
                    IGC,
                    KML,
                    TopoJSON
                ]
            });
            this.layers = [
                gray,
                this.vector
            ];

            let zoom = 7;
            let center = fromLonLat([47.82858, 40.3598414]);
            let rotation = 0;

            this.mapLayer = new Map({
                interactions: defaultInteractions().extend([
                    new DragRotateAndZoom(), dragAndDropInteraction
                ]),
                controls: defaultControls().extend([
                    new FullScreen()
                ]),
                target: 'map',
                layers: this.layers,
                view: new View({
                    center: center,
                    zoom: zoom,
                    rotation: rotation
                })
            });

            // this.mapLayer.addControl(geocoderControl)
            // let zoomslider = new ZoomSlider();
            // this.mapLayer.addControl(zoomslider);
            let modify = new Modify({
                source: this.source
            });
            this.mapLayer.addInteraction(modify);
            let self = this;

            dragAndDropInteraction.on('addfeatures', function (event) {
                //     let vectorSource = new VectorSource({
                //         features: event.features
                //     });
                //     self.mapLayer.addLayer(new VectorLayer({
                //         renderMode: 'image',
                //         source: vectorSource
                //     }));
                self.source.addFeatures(event.features)
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
                        if (features[i].get('name') !== undefined) {
                            info.push(features[i].get('name'));

                        }
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
                // displayFeatureInfo(pixel);
                let coord = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
                this.lastCoordinates = coord[1].toString().substring(0, 7) + "," + coord[0].toString().substring(0, 7);
                document.getElementById('mouse-position').innerHTML = "Lat: " + coord[1].toString().substring(0, 7) + " , " + "Long: " + coord[0].toString().substring(0, 7);

            });

            this.mapLayer.on('click', function (evt) {
                displayFeatureInfo(evt.pixel);
                let coord = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
                if (self.isMarker) {
                    let iconFeature = new Feature({
                        crossOrigin: "Anonymous",
                        geometry: new Point(fromLonLat([coord[0], coord[1]])),
                        name: '',
                        id: '232'
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
                if (self.isRemove) {

                    self.mapLayer.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                        try {
                            self.source.removeFeature(feature)
                            console.log(feature.get('id'))
                            let elem = document.getElementsByClassName(feature.get('id'));

                            elem[0].className = "hidden"
                        } catch (e) {

                        }
                    });

                }
                if (self.isColorPick) {

                    self.mapLayer.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                        try {
                            let newStyle = new Style({
                                fill: new Fill({
                                    color: self.shapeFillColor.hex8
                                }),
                                stroke: new Stroke({
                                    color: self.shapeBorderColor.hex8,
                                    width: 2
                                }),
                                image: new CircleStyle({
                                    radius: 7,
                                    fill: new Fill({
                                        color: self.shapeFillColor.hex8
                                    })
                                })
                            });

                            feature.setStyle(newStyle)

                        } catch (e) {

                        }
                    });

                }
                if (self.showTable) {
                    let geometry = coord[0] + ',' + coord[1];
                    self.getGeometryData(self.tableNextRequest['service'], self.tableNextRequest['layer_id'], self.tableNextRequest['layer_name'], self.filterQuery, geometry)
                }
            });

            // hash check
            let view = this.mapLayer.getView();
            let updateHistoryMap = function () {
                if (self.historyUpdate) {
                    self.historyEvents.push({
                        zoom: view.getZoom(),
                        center: view.getCenter(),
                        rotation: view.getRotation()
                    });
                    self.historyEventsIndex = self.historyEvents.length;
                    self.nextHistoryEvent = false
                    if (self.historyEventsIndex !== 1) {
                        self.previousHistoryEvent = true
                    }
                } else {
                    self.historyUpdate = true;
                }
            };
            self.mapLayer.on('moveend', updateHistoryMap);
            window.addEventListener('popstate', function (event) {
                if (event.state === null) {
                    return;
                }
                self.mapLayer.getView().setCenter(event.state.center);
                self.mapLayer.getView().setZoom(event.state.zoom);
                self.mapLayer.getView().setRotation(event.state.rotation);
            });
            // hash check end

        });

    },
    methods: {

        changeLocation() {
            this.mapLayer.getView().setCenter(fromLonLat([parseFloat(this.longChange), parseFloat(this.latChange)]))
        },
        LatLongFormToggle() {
            let loc = document.getElementById('mouse-position').innerHTML;
            loc = loc.split(":").map(item => item.trim());
            let long = loc[2];
            let lat = loc[1].split(",").map(item => item.trim());
            lat = lat[0]
            this.longChange = long;
            this.latChange = lat;
            this.Toggler.setLatLongShowForm()
        },
        setShapeColor() {

            document.body.style.cursor = "crosshair";
            this.$modal.hide('color-picker-modal');
        },
        cityInputToggle() {
            this.Toggler.cityInputToggle(this);
        },
        onCitySelect(city) {
            this.mapLayer.getView().setCenter(fromLonLat([parseFloat(city.lng), parseFloat(city.lat)]))
            this.mapLayer.getView().setZoom(11)
            this.citySearchInputShow = false
        },
        nameWithCountry({
            city,
            country
        }) {
            return `${city} , ${country}`
        },
        historyBack() {
            this.MapHelpers.historyBack(this)
        },
        historyNext() {
            this.MapHelpers.historyNext(this)
        },
        exportData() {
            this.MapHelpers.exportData(this)
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
            this.mapLayer.getView().setCenter(fromLonLat([47.82858, 40.3598414]))
            this.mapLayer.getView().setZoom(8)
        },
        addGraticule() {
            this.MapHelpers.addGraticule()
        },
        pngExport() {
            this.MapHelpers.pngExport()
        },
        setMarkerTrue() {
            this.setDrawType('None')
            this.isMarker = true;
        },
        eyeDropper() {
            this.setDrawType('None')
            this.$modal.show('color-picker-modal', null, {
                name: 'dynamic-modal',
            });
            this.isColorPick = true
        },
        deleteFeatureOn() {
            this.setDrawType('None')
            this.isRemove = true
        },
        resetFeatures() {
            this.MapHelpers.resetFeatures()
        },
        selectColumns(alias, key, e) {
            if (e.target.checked) {
                this.checkedColumnsData.push(this.stackedTableFeaturesHeader[key])
            } else {
                this.checkedColumnsData = this.checkedColumnsData.filter(data => data != alias);
            }
        },
        showColumnsChange() {
            this.Toggler.showColumnsChange()
        },
        showDataModal(Feature) {
            this.tableFeatureData = Feature
            this.$modal.show('data-modal', null, {
                name: 'dynamic-modal',
                resizable: true,
                adaptive: true,
                draggable: true,
            });
            if (this.tableFeatureData.geometry.x !== undefined) {
                this.mapLayer.getView().setCenter(fromLonLat([this.tableFeatureData.geometry.x, this.tableFeatureData.geometry.y]))
            } else {
                this.mapLayer.getView().setCenter(fromLonLat(this.tableFeatureData.geometry.rings[0][0]))
            }

        },
        showFilterModal() {
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
            this.MapHelpers.addInteraction()
        },
        onMoveCallbackBaseLayerList(evt, originalEvent) {
            this.baseLayerList = this.baseLayerList.map((item, index) => {
                let name = item.name
                let order = index + 1
                let spatial = item.spatial
                return {
                    name,
                    order,
                    spatial
                };
            });
            this.setIndexes();
        },
        onMoveCallbackDynamicLayerList(evt, originalEvent) {
            let self = this;

            this.dynamicLayerList = this.dynamicLayerList.map((item, index) => {
                let name = item.name
                let layersVisibility = item.layersVisibility
                let collapseVisibility = item.collapseVisibility
                let layers = item.layers
                let apiFrom = item.apiFrom ? item.apiFrom : 'internal'

                return {
                    name,
                    order: index + 1,
                    layersVisibility,
                    collapseVisibility,
                    layers,
                    apiFrom
                };
            });
            this.setDynamicIndexes();

        },

        async getTableData(service, layer_id, layer_name, query) {
            let token;
            if (service.apiFrom === 'emlak') {
                token = this.emlakToken
            } else {
                token = this.token;
            }

            let response = await LayerService.getTableData({
                token: token,
                name: service.name,
                layer: layer_id,
                where: query
            });
            if (response.data.error !== undefined) {
                return;
            }

            let self = this
            this.tableNextRequest['service'] = service;
            this.tableNextRequest['layer_id'] = layer_id;
            this.tableNextRequest['layer_name'] = layer_name;

            this.tableHeader = layer_name
            this.tableFeaturesData = response.data.features
            this.tableFeaturesHeader = Object.keys(this.tableFeaturesData[0].attributes);
            let target = response.data.fieldAliases
            this.tableFeaturesHeaderWithAlias = response.data.fieldAliases
            this.stackedTableFeaturesHeader = this.tableFeaturesHeader
            this.checkedColumnsData = []
            this.checkedColumns = []

            for (let alias in this.tableFeaturesHeader) {
                if (!this.defaultUnCheckedColumns.includes(this.tableFeaturesHeader[alias])) {
                    this.checkedColumnsData.push(this.tableFeaturesHeader[alias])
                    this.checkedColumns.push(this.tableFeaturesHeader[alias])

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
            this.checkedColumns = this.checkedColumns.map((item, index) => {
                return self.tableFeaturesHeaderWithAlias[item]
            });
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
        async LayerService() {
            let self = this;
            const response = await LayerService.getLayersWithFullDataFromServer({
                token: this.token
            });
            // self.gisLayers = response.data.featureCollection.layers[0].featureSet.features;
            self.gisLayers =response.data;
            // console.log("TCL: btn -> LayerService ->  this.gisLayers",  this.gisLayers);

            let layers = self.LayerHelper.creator(self.gisLayers);            
            self.baseLayerList = layers.baseLayers;
            self.dynamicLayerList = layers.dynamicLayers;
            // console.log(self.dynamicLayerList);
            // self.baseLayerList.map((item, index) => {
            //     if (item.name === "AzercosmosBasemap") {
            //         // this.addLayers(item, item.order, false, null)
            //     }
            // });

        },
        addLayers(service, index, dynamic = false, params) {
        console.log("TCL: addLayers -> params", params)
        console.log("TCL: addLayers -> service", service)

            let url = LAYER_URLS.GET_DYNAMIC_LAYER_URL({name:service.name});
            let vectorUrl = 'https://localhost:5001'
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

                if (service.apiFrom === 'emlak') {
                    new_layer = new ImageLayer({
                        source: new ImageArcGISRest({
                            url: url,
                            crossOrigin: "Anonymous",
                            params: {
                                "token": this.emlakToken,
                                "layers": layer_config,
                                "dynamicLayers": colors,
                                // "FORMAT": "png8"
                            }
                        })
                    });

                } else if (service.apiFrom === 'vectorGeojson') {

                    new_layer = new VectorLayer({
                        source: new VectorSource({
                            format: new GeoJSON({
                                featureProjection: "EPSG:3857",
                                dataProjection: "EPSG:4326"
                            }),
                            url: function (extent) {
                                return (
                                    "https://localhost:5001/VectorAsGeoJson" +
                                    "/EPSG:3857/" +
                                    transformExtent(extent, "EPSG:3857", "EPSG:4326").join(",")
                                );
                            },
                            strategy: bboxStrategy
                        }),
                        style: new Style({
                            stroke: new Stroke({
                                color: "rgba(0, 0, 255, 1.0)",
                                width: 2
                            })
                        })
                    });
                    // console.log("newLayer", new_layer);
                } else if (service.apiFrom === 'vectorMvt') {
                    new_layer = new VectorTileLayer({
                        declutter: false,
                        source: new VectorTileSource({
                            format: new MVT(),
                            url: "https://localhost:5001/VectorAsMvt/{z}/{x}/{y}.pbf"
                        }),
                        style: new Style({
                            stroke: new Stroke({
                                color: "rgba(0, 0, 255, 1.0)",
                                width: 2
                            })
                        })
                    });
                } else {
                    new_layer = new ImageLayer({
                        source: new ImageArcGISRest({
                            url: url,
                            crossOrigin: "Anonymous",
                            params: {
                                "token": this.token,
                                "layers": layer_config,
                                "dynamicLayers": colors,
                                // "FORMAT": "png8"
                            }
                        })
                    });

                }
            } else {
                
                    console.log("TCL: btn -> addLayers -> service.spatial", service.spatial);
                if (service.spatial === 3857) {
                    url = url + "/tile/{z}/{y}/{x}?token=" + this.token
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
            let token;
            if (service.apiFrom === 'emlak') {
                token = this.emlakToken
            } else {
                token = this.token;
            }
            let response = await LayerService.getLayerDynamic({
                token: token,
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
                let apiFrom = item.apiFrom ? item.apiFrom : 'internal'

                let color = item.color ? item.color : false
                if (service.name === name) {
                    layersVisibility = status;
                    color = colorEnabled
                }
                let layers = item.layers
                let order = item.order
                return {
                    name,
                    order: order,
                    layersVisibility,
                    collapseVisibility,
                    layers,
                    color,
                    apiFrom
                };
            });
        },

        async selectService(service, index, dynamic, e) {

            console.log(service, index, dynamic, e)
            this.selectedServiceName = service.name

            let self = this;
            let responseDynamic;
            if (service.apiFrom === 'emlak') {
                let gettoken = await LoginService.getEmlakToken();
                this.emlakToken = gettoken.data.token
                responseDynamic = await LayerService.getLayerForEmlakService({
                    token: this.emlakToken,
                    name: service.name
                })
                console.log(responseDynamic)
            } else if (service.apiFrom === 'vectorGeojson') {
    
                responseDynamic = {
                    data: {
                        layers: [{
                            defaultVisibility: true,
                            id: 0,
                            maxScale: 0,
                            minScale: 0,
                            name: "VectorGeoJson",
                            parentLayerId: -1,
                            subLayerIds: null
                        }]
                    }
                }

            } else if (service.apiFrom === 'vectorMvt') {
                responseDynamic = {
                    data: {
                        layers: [{
                            defaultVisibility: true,
                            id: 0,
                            maxScale: 0,
                            minScale: 0,
                            name: "VectorMVT",
                            parentLayerId: -1,
                            subLayerIds: null
                        }]
                    }
                }
            } else {
                responseDynamic = await LayerService.getDynamicLayers({
                    token: this.token,
                    name: service.name
                })
            }

            // }
            this.dynamicLayerList = this.dynamicLayerList.map((item, index) => {
                let name = item.name
                let layersVisibility = item.layersVisibility
                let collapseVisibility = item.collapseVisibility
                let color = item.color ? item.color : false
                let apiFrom = item.apiFrom ? item.apiFrom : 'internal'
                let layers = item.layers
                if (service.name === name) {
                    layers = responseDynamic.data.layers
                }
                let order = item.order
                return {
                    name,
                    order: order,
                    layersVisibility,
                    collapseVisibility,
                    layers,
                    apiFrom,
                    color
                };
            });

            self.dynamicSubLayerList[service.name] = [];
            responseDynamic.data.layers.forEach(function (element) {
                self.dynamicSubLayerList[service.name][element.id] = true
            });

            if (e.target.checked) {
                console.log(service, index, dynamic, null);
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
        setDrawType(name) {
            this.typeSelect = name
            this.mapLayer.removeInteraction(this.draw);
            this.isColorPick = false
            this.isMarker = false
            this.isRemove = false
            if (name !== 'None') {

                this.addInteraction();
            }
            this.featureIDSet += 10;
            document.body.style.cursor = "default";
        },
        saveColor() {
            this.$store.dispatch("SAVE_COLORPICKER_VISIBILITY", false);

            this.deleteLayers(this.colorPicker.layer)

            let layerDyn = this.ColorPicker.renderColor(this.colorPicker.sublayer, this.selectedFillColor, this.selectedBorderColor);

            if (typeof this.dynamicForColors[this.colorPicker.layer.name] === 'undefined') {
                this.dynamicForColors[this.colorPicker.layer.name] = [];
            }
            this.dynamicForColors[this.colorPicker.layer.name][this.colorPicker.sublayer] = layerDyn;

            this.addLayers(this.colorPicker.layer, this.colorPicker.index, true, layerDyn)

        },
        selectLayer(a)
        {
console.log(a);
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
        selectedFillColor() {
            return this.$store.state.fillColor;
        },
        selectedBorderColor() {
            return this.$store.state.borderColor;
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
        dragOptions() {
            return {
                animation: 0,
                group: "baseDragger",
                disabled: false,
                ghostClass: "ghost"
            };
        },
        dragOptionsDynamic() {
            return {
                animation: 0,
                group: "dynamicDragger",
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
    },

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
