<template>
    <div class="row container-fluid padding-0">
        <div class="col-2 padding-0">

            <p>All Layers</p>
            <draggable
                    class="list-group"
                    tag="ul"
                    v-model="gisLayersList"
                    v-bind="dragOptions"
                    @start="isDragging = true"
                    @end="onMoveCallback()"
            >
                <transition-group type="transition" name="flip-list">
                    <li
                            class="list-group-item"
                            v-for="element in gisLayersList"
                            :key="element.order"
                            style="text-align: left"
                    >
                        <div class="row">
                            <div class="col-2">
                                <div class="material-switch ">
                                    <input :id="element.name" :name="element.name" type="checkbox"
                                           @click="selectService(element, element.order, $event)"/>
                                    <label :for="element.name" class="label-primary"></label>
                                </div>

                            </div>
                            <div class="col-10">
                                {{ element.name }}

                            </div>
                        </div>
                    </li>
                </transition-group>
            </draggable>

        </div>

        <div class="col-10 padding-0">
            <!--            <form class="form-inline">-->
            <!--                <label>Geometry type &nbsp;</label>-->
            <!--                <select id="type">-->
            <!--                    <option value="Point">Point</option>-->
            <!--                    <option value="LineString">LineString</option>-->
            <!--                    <option value="Polygon">Polygon</option>-->
            <!--                    <option value="Circle">Circle</option>-->
            <!--                    <option value="None">None</option>-->
            <!--                </select>-->
            <!--            </form>-->

            <div id="map">
                <button v-for="(item, index) in drawings" class="action-button-class btn btn-primary" :style="{top : ((index+1)*7+20) + '%'}"
                        @click="setDrawType(item.name)">
                    {{item.name}}
                </button>
            </div>

        </div>

    </div>

</template>

<script>

    import 'ol/ol.css'
    import {Map, View, Overlay} from 'ol';
    import {getArea, getLength} from 'ol/sphere.js';
    import {LineString, Polygon} from 'ol/geom.js';
    import {unByKey} from 'ol/Observable.js';
    import Draw, {createRegularPolygon, createBox} from 'ol/interaction/Draw.js';
    import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
    import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
    import {TileArcGISRest, Vector as VectorSource} from 'ol/source.js';
    import {fromLonLat} from 'ol/proj';
    import XYZ from 'ol/source/XYZ.js';
    import Multiselect from 'vue-multiselect'
    import axios from 'axios';
    import draggable from "vuedraggable";
    import LayerService from '@/services/LayerService'
    import {ZoomSlider} from 'ol/control.js';

    const message = [
        "vue.draggable",
        "draggable",
        "component",
        "for",
        "vue.js 2.0",
        "based",
        "on",
        "Sortablejs"
    ];

    let helpTooltipElement;
    let helpTooltip;
    let sketch;
    let source;
    let measureTooltipElement;
    let measureTooltip;
    let typeSelect;
    let draw;
    let continuePolygonMsg = 'Click to continue drawing the polygon';
    let continueLineMsg = 'Click to continue drawing the line';

    let formatLength = function (line) {
        var length = getLength(line);
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                ' ' + 'km';
        } else {
            output = (Math.round(length * 100) / 100) +
                ' ' + 'm';
        }
        return output;
    };
    let formatArea = function (polygon) {
        var area = getArea(polygon);
        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
        }
        return output;
    };

    export default {
        name: 'home',
        components: {
            Multiselect,
            draggable,
        },
        data() {
            return {
                mapLayer: null,
                value: [],
                drawings: [
                    {
                        name: "Point",
                    },
                    {
                        name: "LineString",
                    },
                    {
                        name: "Polygon",
                    },
                    {
                        name: "Circle",
                    },
                    {
                        name: "Box",
                    },
                    {
                        name: "Square",
                    },
                    {
                        name: "Star",
                    },
                    {
                        name: "None",
                    },
                ],
                options: [],
                layers: [],
                gisLayers: [],
                token: null,
                source: null,
                vector: null,
                typeSelect: null,
                draw: null,
                gisLayersList: null,
                baseMaps: {
                    sat:
                        new TileLayer({
                            source: new XYZ({
                                attributions: 'Tiles © Azercosmos</a>',
                                url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                            })
                        }),
                    waterColor:
                        new TileLayer({
                            source: new XYZ({
                                attributions: 'Tiles © Azercosmos</a>',
                                url: "//{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png",
                            })
                        }),
                    esriWorldStreetMap:
                        new TileLayer({
                            source: new XYZ({
                                attributions: 'Tiles © Azercosmos</a>',
                                url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
                            })
                        }),
                    gray:
                        new TileLayer({
                            source: new XYZ({
                                attributions: 'Tiles © Azercosmos</a>',
                                url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                            })
                        }),
                    none: new TileArcGISRest({
                        url: "",
                    })
                },
            }
        },
        mounted() {
            this.token = this.$store.getters.token;
            this.source = new VectorSource({wrapX: false});
            this.vector = new VectorLayer({
                source: this.source
            });
            this.layers = [
                this.baseMaps.gray,
                this.vector
            ];
            this.LayerService();
            this.$nextTick(function () {
                this.mapLayer = new Map({
                    target: 'map',
                    layers: this.layers,
                    view: new View({
                        center: fromLonLat([49.882858, 40.3598414]),
                        zoom: 6
                    })
                });
                let zoomslider = new ZoomSlider();
                this.mapLayer.addControl(zoomslider);
            });

        },
        methods: {
            sort() {
                this.list = this.list.sort((a, b) => a.order - b.order);
            },
            addInteraction() {
                let value = this.typeSelect
                if (value !== 'None') {
                    var geometryFunction;
                    if (value === 'Square') {
                        value = 'Circle';
                        geometryFunction = createRegularPolygon(4);
                    } else if (value === 'Box') {
                        value = 'Circle';
                        geometryFunction = createBox();
                    } else if (value === 'Star') {
                        value = 'Circle';
                        geometryFunction = function (coordinates, geometry) {
                            var center = coordinates[0];
                            var last = coordinates[1];
                            var dx = center[0] - last[0];
                            var dy = center[1] - last[1];
                            var radius = Math.sqrt(dx * dx + dy * dy);
                            var rotation = Math.atan2(dy, dx);
                            var newCoordinates = [];
                            var numPoints = 12;
                            for (var i = 0; i < numPoints; ++i) {
                                var angle = rotation + i * 2 * Math.PI / numPoints;
                                var fraction = i % 2 === 0 ? 1 : 0.5;
                                var offsetX = radius * fraction * Math.cos(angle);
                                var offsetY = radius * fraction * Math.sin(angle);
                                newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
                            }
                            newCoordinates.push(newCoordinates[0].slice());
                            if (!geometry) {
                                geometry = new Polygon([newCoordinates]);
                            } else {
                                geometry.setCoordinates([newCoordinates]);
                            }
                            return geometry;
                        };
                    }
                    this.draw = new Draw({
                        source: this.source,
                        type: value,
                        geometryFunction: geometryFunction
                    });
                    this.mapLayer.addInteraction(this.draw);
                } else {
                    this.draw = new Draw({
                        source: this.source,
                        type: this.typeSelect
                    });
                    this.mapLayer.addInteraction(this.draw);

                }

            },
            onMoveCallback(evt, originalEvent) {
                this.gisLayersList = this.gisLayersList.map((item, index) => {
                    let name = item.name
                    return {name, order: index + 1};
                });
                this.setIndexes();
            },
            async LayerService() {
                const response = await LayerService.getLayers({token: this.token});
                this.gisLayers = response.data.services;
                this.gisLayersList = response.data.services.map((item, index) => {
                    let name = item.name
                    return {name, order: index + 1};
                })
            },
            setIndexes() {
                this.gisLayersList = this.gisLayersList.map((item, index) => {
                    this.mapLayer.getLayers().forEach(function (layer) {
                        if (layer.get('name') != undefined && layer.get('name') === item.name) {
                            layer.setZIndex(500 - index)
                        }
                    });
                });
            },
            addLayers(service, index) {
                let url = "http://10.222.32.50/arcgis/rest/services/" + service.name + "/MapServer";
                let new_layer = new TileLayer({
                    source: new TileArcGISRest({
                        url: url,
                        params: {
                            "token": this.token
                        }
                    })
                });
                this.mapLayer.addLayer(new_layer);
                new_layer.set('name', service.name);
                new_layer.setZIndex(500 - index);
            },
            deleteLayers(service) {
                let layersToRemove = [];
                this.mapLayer.getLayers().forEach(function (layer) {
                    console.log(layer);
                    if (layer.get('name') != undefined && layer.get('name') === service.name) {
                        layersToRemove.push(layer);
                    }
                });
                let len = layersToRemove.length;
                for (let i = 0; i < len; i++) {
                    this.mapLayer.removeLayer(layersToRemove[i]);
                }
            },
            selectService(service, index, e) {
                this.selectedServiceName = service.name
                if (e.target.checked) {
                    this.addLayers(service, index)
                } else {
                    this.deleteLayers(service)
                }
            },
            setDrawType(name) {
                this.typeSelect = name
                this.mapLayer.removeInteraction(this.draw);

                if (name !== 'None') {

                    this.addInteraction();
                }

            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            }
        },

    }
</script>
<style>
    #map {
        height: 100vh;
        width: 100%;
    }

    .action-button-class {
        position: absolute;
        right: 15px;
        z-index: 10
    }

    #map .ol-zoom .ol-zoom-out {
        margin-top: 204px;
    }

    #map .ol-zoomslider {
        background-color: transparent;
        top: 2.3em;
    }

    #map .ol-touch .ol-zoom .ol-zoom-out {
        margin-top: 212px;
    }

    #map .ol-touch .ol-zoomslider {
        top: 2.75em;
    }

    #map .ol-zoom-in.ol-has-tooltip:hover [role=tooltip],
    #map .ol-zoom-in.ol-has-tooltip:focus [role=tooltip] {
        top: 3px;
    }

    #map .ol-zoom-out.ol-has-tooltip:hover [role=tooltip],
    #map .ol-zoom-out.ol-has-tooltip:focus [role=tooltip] {
        top: 232px;
    }


    .row {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    .padding-0 {
        padding: 0 !important;
    }

    .button {
        margin-top: 35px;
    }

    .flip-list-move {
        transition: transform 0.5s;
    }

    .no-move {
        transition: transform 0s;
    }

    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }

    .list-group {
        min-height: 20px;
    }

    .list-group-item {
        cursor: move;
        padding: 5px 0 !important;
    }

    .list-group-item i {
        cursor: pointer;
    }

</style>
<style>
    .material-switch > input[type="checkbox"] {
        display: none;
    }

    .material-switch > label {
        cursor: pointer;
        height: 0px;
        position: relative;
        width: 25px;
    }

    .label-primary {
        background-color: #428bca;
    }

    .material-switch > label::before {
        background: rgb(0, 0, 0);
        box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        content: '';
        height: 14px;
        margin-top: -8px;
        position: absolute;
        opacity: 0.3;
        transition: all 0.4s ease-in-out;
        width: 25px;
    }


    .material-switch > label::after {
        background: rgb(255, 255, 255);
        border-radius: 16px;
        -webkit-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        content: '';
        height: 16px;
        left: -4px;
        margin-top: -8px;
        position: absolute;
        top: -1.5px;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        width: 15px;
    }

    .material-switch > input[type="checkbox"]:checked + label::before {
        background: inherit;
        opacity: 0.5;
    }

    .material-switch > input[type="checkbox"]:checked + label::after {
        background: inherit;
        left: 12px;
    }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
