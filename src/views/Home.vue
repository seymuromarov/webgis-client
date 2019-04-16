<template>
    <div class="row container-fluid padding-0">
        <div class="col-2 padding-0">
            <!--            <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag"-->
            <!--                         label="name" track-by="name" :options="gisLayers" :multiple="true" :taggable="true"-->
            <!--                         @select="addLayers" @remove="deleteLayers"-->
            <!--            ></multiselect>-->

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
            <div id="map">
                <select id="type">
                    <option value="length">Length (LineString)</option>
                    <option value="area">Area (Polygon)</option>
                </select>
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
    import Draw from 'ol/interaction/Draw.js';
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
                options: [],
                layers: [],
                gisLayers: [],
                token: null,
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

            source = new VectorSource();

            let vector = new VectorLayer({
                source: source,
                style: new Style({
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new Stroke({
                        color: '#ffcc33',
                        width: 2
                    }),
                    image: new CircleStyle({
                        radius: 7,
                        fill: new Fill({
                            color: '#ffcc33'
                        })
                    })
                })
            });

            this.layers = [
                this.baseMaps.gray,
                vector
            ];
            let pointerMoveHandler = function (evt) {
                if (evt.dragging) {
                    return;
                }
                /** @type {string} */
                let helpMsg = 'Click to start drawing';

                if (sketch) {
                    var geom = (sketch.getGeometry());
                    if (geom instanceof Polygon) {
                        helpMsg = continuePolygonMsg;
                    } else if (geom instanceof LineString) {
                        helpMsg = continueLineMsg;
                    }
                }

                helpTooltipElement.innerHTML = helpMsg;
                helpTooltip.setPosition(evt.coordinate);

                // console.log(evt.coordinate)
                helpTooltipElement.classList.remove('hidden');
            };

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
                this.mapLayer.on('pointermove', pointerMoveHandler);

                this.mapLayer.getViewport().addEventListener('mouseout', function () {
                    helpTooltipElement.classList.add('hidden');
                });

                typeSelect = document.getElementById('type');
                typeSelect.onchange = function () {
                    this.mapLayer.removeInteraction(draw);
                    this.addInteraction();
                }.bind(this);

                this.addInteraction();


            });

        },
        methods: {
            addInteraction() {
                let type = (typeSelect.value === 'area' ? 'Polygon' : 'LineString');
                draw = new Draw({
                    source: source,
                    type: type,
                    style: new Style({
                        fill: new Fill({
                            color: 'rgba(255, 255, 255, 0.2)'
                        }),
                        stroke: new Stroke({
                            color: 'rgba(0, 0, 0, 0.5)',
                            lineDash: [10, 10],
                            width: 2
                        }),
                        image: new CircleStyle({
                            radius: 5,
                            stroke: new Stroke({
                                color: 'rgba(0, 0, 0, 0.7)'
                            }),
                            fill: new Fill({
                                color: 'rgba(255, 255, 255, 0.2)'
                            })
                        })
                    })
                });
                this.mapLayer.addInteraction(draw);

                this.createMeasureTooltip();
                this.createHelpTooltip();
                let callcreateMeasureTooltip = function () {
                    this.createMeasureTooltip();

                }.bind(this);

                let listener;
                draw.on('drawstart',
                    function (evt) {
                        // set sketch
                        sketch = evt.feature;

                        /** @type {module:ol/coordinate~Coordinate|undefined} */
                        let tooltipCoord = evt.coordinate;
                        listener = sketch.getGeometry().on('change', function (evt) {
                            console.log("b")

                            let geom = evt.target;
                            let output;
                            if (geom instanceof Polygon) {
                                output = formatArea(geom);
                                tooltipCoord = geom.getInteriorPoint().getCoordinates();
                            } else if (geom instanceof LineString) {
                                output = formatLength(geom);
                                tooltipCoord = geom.getLastCoordinate();
                            }
                            console.log(output)
                            measureTooltipElement.innerHTML = output;
                            measureTooltip.setPosition(tooltipCoord);
                        });
                    }, this);

                draw.on('drawend',
                    function () {
                        console.log("c")

                        measureTooltipElement.className = 'tooltip tooltip-static';
                        measureTooltip.setOffset([0, -7]);
                        // unset sketch
                        sketch = null;
                        // unset tooltip so that a new one can be created
                        measureTooltipElement = null;
                        callcreateMeasureTooltip;
                        unByKey(listener);
                    }, this);
            },
            createHelpTooltip() {
                if (helpTooltipElement) {
                    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
                }
                helpTooltipElement = document.createElement('div');
                helpTooltipElement.className = 'tooltip hidden';
                helpTooltip = new Overlay({
                    element: helpTooltipElement,
                    offset: [15, 0],
                    positioning: 'center-left'
                });
                this.mapLayer.addOverlay(helpTooltip);
            },
            createMeasureTooltip() {

                if (measureTooltipElement) {
                    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
                }
                measureTooltipElement = document.createElement('div');
                measureTooltipElement.className = 'tooltip tooltip-measure';
                measureTooltip = new Overlay({
                    element: measureTooltipElement,
                    offset: [0, -15],
                    positioning: 'bottom-center'
                });
                this.mapLayer.addOverlay(measureTooltip);
            },


            sort() {
                this.list = this.list.sort((a, b) => a.order - b.order);
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
<style>
    .tooltip {
        position: relative;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        color: white;
        padding: 4px 8px;
        opacity: 1 !important;
        white-space: nowrap;
    }

    .tooltip-measure {
        opacity: 1;
        font-weight: bold;
    }

    .tooltip-static {
        background-color: #ffcc33;
        color: black;
        border: 1px solid white;
    }

    .tooltip-measure:before,
    .tooltip-static:before {
        border-top: 6px solid rgba(0, 0, 0, 0.5);
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
        content: "";
        position: absolute;
        bottom: -6px;
        margin-left: -7px;
        left: 50%;
    }

    .tooltip-static:before {
        border-top-color: #ffcc33;
    }
</style>