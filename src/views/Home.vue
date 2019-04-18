<template>
    <div class="row container-fluid padding-0">
        <div class="col-2 padding-0">

            <div class="profileDiv">
                <label class="userNameLabel">{{ username }}</label>
                <i @click="logout()" title='Log out' class="logOutIcon fas fa-power-off"></i>
            </div>
            <p>Dynamic Layers</p>

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
                        :key="element.order"
                        style="text-align: left"
                >
                    <div class="row">
                        <div class="col-2">
                            <div class="material-switch ">
                                <input :id="element.name" :name="element.name" type="checkbox"
                                       @click="selectService(element, element.order,true, $event)"/>
                                <label :for="element.name" class="label-primary"></label>
                            </div>

                        </div>
                        <div class="col-10">
                            {{ element.name }}
                            <span>
                                      <i v-if="element.collapseVisibility" @click="dynamicLayersReset(element, true)"
                                         class="fas fa-caret-left">
                                      </i>
                                </span>

                        </div>
                    </div>

                    <div style="background: whitesmoke;padding-top: 10px; " v-if="element.layersVisibility">
                        <div class="row layerDiv"
                             v-for="layer in element.layers"
                             :style="{paddingLeft: layer.margin * 30 + 'px'}">

                            <div class="col-2">
                                <div class="material-switch ">
                                    <input v-show="layer.geometryType"
                                           :id="element.name + layer.id"
                                           :value="element.name + layer.id"
                                           :name="element.name + layer.id"
                                           v-model="dynamicSubLayerList[element.name][layer.id]"
                                           type="checkbox"
                                           @click="selectSubService(element,element.order,layer.id, $event)"/>
                                    <label :for="element.name + layer.id" class="label-primary"></label>
                                </div>

                            </div>
                            <div class="col-10">
                                <label class="layerName" :for="layer.name"> {{ layer.name }}</label>
                                <i style="margin-left: 10px;" class="dataIcon fas fa-table"
                                   @click="getTableData(element,layer.id)"></i>

                            </div>
                            <!--                        <template >-->
                            <!--                            <div class="iconsDiv" v-if="layer.geometryType">-->
                            <!--                                <button class="colorIcon"-->
                            <!--                                        @click=""-->
                            <!--                                ></button>-->
                            <!--                            </div>-->
                            <!--                        </template>-->

                        </div>

                    </div>


                </li>
            </draggable>
            <p style="margin-top: 20px;">Basemaps</p>
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
                            :key="element.order"
                            style="text-align: left"
                    >
                        <div class="row">
                            <div class="col-2">
                                <div class="material-switch ">
                                    <input :id="element.name" :name="element.name" type="checkbox"
                                           @click="selectService(element, element.order,false, $event)"/>
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
                <button v-for="(item, index) in drawings" class="action-button-class btn btn-primary"
                        :style="{top : ((index+1)*7+15) + '%'}"
                        @click="setDrawType(item.name)">
                    <i :class="item.icon"></i>

                </button>
            </div>

        </div>

    </div>

</template>

<script>

    import 'ol/ol.css'
    import {Map, View, Overlay, Feature} from 'ol';
    import {getArea, getLength, getDistance} from 'ol/sphere.js';
    import {LineString, Polygon, Circle, Point} from 'ol/geom.js';
    import {unByKey} from 'ol/Observable.js';
    import Draw, {createRegularPolygon, createBox} from 'ol/interaction/Draw.js';
    import {Modify, defaults as defaultInteractions, DragRotateAndZoom} from 'ol/interaction';
    import {Circle as CircleStyle, Fill, Stroke, Style, Icon} from 'ol/style.js';
    import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
    import {TileArcGISRest, Vector as VectorSource} from 'ol/source.js';
    import {fromLonLat, METERS_PER_UNIT} from 'ol/proj';
    import XYZ from 'ol/source/XYZ.js';
    import draggable from "vuedraggable";
    import LayerService from '@/services/LayerService'
    import {ZoomSlider} from 'ol/control.js';


    export default {
        name: 'home',
        components: {
            draggable,
        },
        data() {
            return {
                mapLayer: null,
                value: [],
                drawings: [
                    {
                        name: "Point",
                        icon: 'fas fa-map-marker-alt'
                    },
                    {
                        name: "LineString",
                        icon: 'fas fa-long-arrow-alt-right'

                    },
                    {
                        name: "Polygon",
                        icon: 'fas fa-draw-polygon'

                    },
                    {
                        name: "Circle",
                        icon: 'far fa-circle'

                    },
                    {
                        name: "Box",
                        icon: 'far fa-calendar'

                    },
                    {
                        name: "Square",
                        icon: 'far fa-square'

                    },
                    {
                        name: "Star",
                        icon: 'far fa-star'

                    },
                    {
                        name: "None",
                        icon: 'fas fa-mouse-pointer'

                    },
                ],
                options: [],
                layers: [],
                gisLayers: [],
                token: null,
                username: null,
                source: null,
                vector: null,
                vectorSource: null,
                vectorLayer: null,
                sketch: null,
                typeSelect: null,
                draw: null,
                dynamicLayerList: [],
                baseLayerList: [],
                dynamicSubLayerList: [[]],
                helpmaptooltipElement: null,
                helpmaptooltip: null,
                measuremaptooltipElement: null,
                measuremaptooltip: null,
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
            this.token = this.$cookie.get('token');
            this.username = this.$cookie.get('username');
            if (this.token === null)
                this.$router.push('/login')

            console.log(this.token)


            this.source = new VectorSource({wrapX: false});

            this.vector = new VectorLayer({
                source: this.source,

            });
            this.vector.setZIndex(9999);
            this.layers = [
                this.baseMaps.gray,
                this.vector,
            ];
            this.LayerService();
            this.$nextTick(function () {
                this.mapLayer = new Map({
                    interactions: defaultInteractions().extend([
                        new DragRotateAndZoom()
                    ]),
                    target: 'map',
                    layers: this.layers,
                    view: new View({
                        center: fromLonLat([49.882858, 40.3598414]),
                        zoom: 6
                    })
                });
                let zoomslider = new ZoomSlider();
                this.mapLayer.addControl(zoomslider);
                let modify = new Modify({source: this.source});
                this.mapLayer.addInteraction(modify);

            });

        },
        methods: {
            logout() {
                this.$cookie.delete('token');
                this.$cookie.delete('username');
                this.$router.push('/login')

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
            }
            ,
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
            }
            ,
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
            }
            ,
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
                    return {name, order: index + 1};
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
                    return {name, order: index + 1, layersVisibility, collapseVisibility, layers};
                });
                this.setIndexes();
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
            async getTableData(service, layer_id) {
                let response = await LayerService.getTableData({
                    token: self.token,
                    name: service.name,
                    layer: layer_id,
                })
                console.log(response.data)

            },
            setIndexes() {
                this.baseLayerList = this.baseLayerList.map((item, index) => {
                    this.mapLayer.getLayers().forEach(function (layer) {
                        if (layer.get('name') != undefined && layer.get('name') === item.name) {
                            layer.setZIndex(500 - index)
                        }
                    });
                });
            }
            ,
            addLayers(service, index, dynamic = false) {
                let url = "http://10.222.32.50/arcgis/rest/services/" + service.name + "/MapServer";
                let new_layer;
                if (dynamic) {

                    let layers = this.dynamicSubLayerList[service.name];
                    let active_layers = ''
                    layers.forEach(function (layer, index) {
                        if (layer === true) {
                            active_layers += index + ','
                        }
                    })
                    active_layers = active_layers.slice(0, -1);
                    new_layer = new TileLayer({
                        source: new TileArcGISRest({
                            url: url,
                            params: {
                                "token": this.token,
                                "layers": "show:" + active_layers
                            }
                        })
                    });
                } else {
                    new_layer = new TileLayer({
                        source: new TileArcGISRest({
                            url: url,
                            params: {
                                "token": this.token,
                            }
                        })
                    });
                }
                this.mapLayer.addLayer(new_layer);
                new_layer.set('name', service.name);
                if (dynamic) {
                    new_layer.setZIndex(1000 - index);
                } else {
                    new_layer.setZIndex(500 - index);
                }
            }
            ,
            deleteLayers(service) {
                let layersToRemove = [];
                let self = this
                this.mapLayer.getLayers().forEach(function (layer) {
                    if (layer.get('name') != undefined && layer.get('name') === service.name) {
                        layersToRemove.push(layer);
                        self.dynamicLayersReset(service, false)
                    }
                });
                let len = layersToRemove.length;
                for (let i = 0; i < len; i++) {
                    this.mapLayer.removeLayer(layersToRemove[i]);
                }
            },
            dynamicLayersReset(service, status) {
                this.dynamicLayerList = this.dynamicLayerList.map((item, index) => {
                    let name = item.name
                    let layersVisibility = item.layersVisibility
                    let collapseVisibility = item.collapseVisibility
                    if (service.name === name) {
                        layersVisibility = status;
                    }
                    let layers = item.layers
                    let order = item.order
                    return {name, order: order, layersVisibility, collapseVisibility, layers};
                });
            },
            selectService(service, index, dynamic, e) {
                this.selectedServiceName = service.name
                if (e.target.checked) {
                    this.addLayers(service, index, dynamic)
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
                this.deleteLayers(service)
                for (let i in this.dynamicLayerList) {
                    if (this.dynamicLayerList[i].name === service.name) {
                        this.dynamicLayerList[i].layersVisibility = true;
                        break;
                    }
                }
                this.addLayers(service, index, true)

            },
            setDrawType(name) {
                this.typeSelect = name
                this.mapLayer.removeInteraction(this.draw);

                if (name !== 'None') {

                    this.addInteraction();
                }

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
            }
        }
        ,

    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
