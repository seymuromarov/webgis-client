<template>
    <div class="row container-fluid padding-0">
        <div class="col-2 padding-0">

            <div class="profileDiv">
                <label class="userNameLabel">{{ username }}</label>
                <i @click="logout()" title='Log out' class="logOutIcon fas fa-power-off"></i>
            </div>
            <p>Dynamic Layers</p>

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
                                   @click="getTableData(element,layer.id,layer.name)"></i>
                                <i style="margin-left: 10px;" class="dataIcon fab fa-codiepie"
                                   @click="OpenColorPicker(element,layer.id,layer.name,element.index)"></i>
                            </div>

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
                            :key="element.name"
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
                        :style="{top : ((index+1)*6+5) + '%'}"
                        @click="setDrawType(item.name)">
                    <i :class="item.icon"></i>

                </button>
                <button class="action-button-class btn btn-primary"
                        style="bottom: 70px;left: 20px;"
                        @click="pngExport"
                        v-show="!showTable">
                    <i class="far fa-file-image"></i>
                </button>
                <button class="action-button-class btn btn-primary"
                        style="bottom: 20px;left: 20px;"
                        @click="pdfExport"
                        v-show="!showTable">
                    <i class="far fa-file-pdf"></i>
                </button>
            </div>

        </div>

        <div class="col-10 offset-md-2" v-if="showTable">
            <div class="tableDiv">
                <div class="tableHeader">
                    <div class="row">
                        <div class="col-2">
                            <span class="text-left">{{tableHeader}}</span>
                        </div>
                        <div class="col-10">
                            <download-excel
                                    v-if="tableFeaturesHeader"
                                    class="fas fa-file-excel icon excelDataIcon excelIcon"
                                    :data="featuresToExcel"
                                    :fields="checkedColumnsToExcel"
                                    type="xls"
                                    :name="'test' + '_report.xls'">

                                <i></i>

                            </download-excel>
                            <i class="fas  fa-columns tableColumns makeMePoint" @click="showColumnsChange">

                            </i>
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
                <!--                <div class="makeMePoint col-4">-->
                <!--                    <div class="modalText"-->
                <!--                         v-for="(attr, key) in this.tableFeaturesHeader"-->
                <!--                    ><span>{{ attr }}</span>-->
                <!--                    </div>-->
                <!--                </div>-->
                <!--                <div class="makeMePoint col-8">-->
                <!--                    <div class="modalText"-->
                <!--                         v-for="(attr, key) in this.tableFeatureData.attributes"-->
                <!--                    >-->
                <!--                        <span> {{ attr!==" "?attr :" &nbsp" }}</span>-->
                <!--                    </div>-->
                <!--                </div>-->
            </div>

        </modal>

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
    import {Chrome} from 'vue-color';


    export default {
        name: 'home',
        components: {
            draggable,
            colorPicker: Chrome,

        },
        data() {
            return {
                mapLayer: null,
                showColumnsBoolean: false,
                value: [],
                checkedColumns: [],
                checkedColumnsData: [],
                defaultUnCheckedColumns: ['OBJECTID', 'Shape_Length', 'Shape_Area'],
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
                showTable: false,
                draw: null,
                tableFeaturesData: [],
                tableFeatureData: [],
                tableFeaturesHeader: [],
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
                                crossOrigin: "Anonymous",
                                url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                            })
                        }),
                    none: new TileArcGISRest({
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

                this.mapLayer.once('rendercomplete', function (event) {
                    let canvas = event.context.canvas;
                    let data = canvas.toDataURL('image/jpeg');
                    let pdf = new jsPDF('landscape', undefined, format);
                    pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
                    pdf.save('map.pdf');
                    // Reset original map size
                    this.mapLayer.setSize(size);
                    this.mapLayer.getView().fit(extent, {size: size});
                });

                // Set print size
                let printSize = [width, height];
                this.mapLayer.setSize(printSize);
                this.mapLayer.getView().fit(extent, {size: printSize});

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
            hideDataModal() {
                this.$modal.hide('data-modal');
            },
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
                    return {name, order};
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
            async getTableData(service, layer_id, layer_name) {
                let response = await LayerService.getTableData({
                    token: this.token,
                    name: service.name,
                    layer: layer_id,
                })
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
                // this.tableFeaturesData = this.tableFeaturesData.map((item, index) => {
                //     let name = item
                //     for (let k in target) {
                //         if (typeof target[k] !== 'function') {
                //             if (item === k) {
                //                 name = target[k]
                //             }
                //         }
                //     }
                //     return name;
                // });


                console.log(this.checkedColumns)
                console.log(this.checkedColumnsData)
                // console.log(this.tableFeaturesData)

                this.showTable = true

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
                let url = "http://azcgisiis.gis.az/arcgis/rest/services/" + service.name + "/MapServer";
                let new_layer;
                if (dynamic) {

                    let layers = this.dynamicSubLayerList[service.name];
                    let active_layers = ''
                    let colors = ''
                    if (typeof this.dynamicForColors[service.name] !== 'undefined') {
                        colors = '[';
                        this.dynamicForColors[this.colorPicker.layer.name].forEach(function (colorLayer) {
                            colors += colorLayer;
                        })
                        colors += ']';

                    }
                    // let layerDyn = '{"id":' + this.colorPicker.sublayer + ',"name":"","source":{"type":"mapLayer","mapLayerId": ' + this.colorPicker.sublayer + '},"drawingInfo":{"renderer":{"type":"simple","label":"","description":"","symbol":{"color":' + color + ',"outline":{"color":' + outline + ',"width":1.0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}}},"minScale":0,"maxScale":0}]';
                    //
                    // this.dynamicForColors[this.colorPicker.layer.name][this.colorPicker.sublayer] = layerDyn;

                    layers.forEach(function (layer, index) {
                        if (layer === true) {
                            active_layers += index + ','
                        }
                    })

                    // let layerDyn = '[' +
                    //     '{"id":0,"name":"","source":{"type":"mapLayer","mapLayerId": 0},"drawingInfo":{"renderer":{"type":"simple","label":"","description":"","symbol":{"color":[212,71,71,255],"outline":{"color":[181,74,74,255],"width":1.0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}}},"minScale":0,"maxScale":0},' +
                    //     '{"id":1,"name":"","source":{"type":"mapLayer","mapLayerId": 1},"drawingInfo":{"renderer":{"type":"simple","label":"","description":"","symbol":{"color":[212,71,71,255],"outline":{"color":[181,74,74,255],"width":1.0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}}},"minScale":0,"maxScale":0}' +
                    //     ']';
                    active_layers = active_layers.slice(0, -1);
                    new_layer = new TileLayer({
                        source: new TileArcGISRest({
                            url: url,
                            crossOrigin: "Anonymous",
                            params: {
                                "token": this.token,
                                "layers": "show:" + active_layers,
                                "dynamicLayers": colors
                            }
                        })
                    });
                } else {
                    new_layer = new TileLayer({
                        source: new TileArcGISRest({
                            url: url,
                            crossOrigin: "Anonymous",
                            params: {
                                "token": this.token,
                            }
                        })
                    });
                }
                this.mapLayer.addLayer(new_layer);
                new_layer.set('name', service.name);
                if (dynamic) {
                    new_layer.setZIndex(9999 - index);
                } else {
                    new_layer.setZIndex(500 - index);
                }
            },
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
                // let responseColor = await LayerService.getLayerDynamic({token: this.token, name: service.name});
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
            layerBackground(layer) {
                if (layer.color) {
                    let color = layer.color;
                    return "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")"
                }
            },
            layerBorderColor(layer) {
                if (layer.outline) {
                    let borderColor = layer.outline;
                    return "rgba(" + borderColor[0] + "," + borderColor[1] + "," + borderColor[2] + "," + borderColor[3] + ")"
                }
            },
            iconVisibility(layer) {
                if (this.checkNested(layer, 'drawingInfo', 'renderer', 'symbol', 'outline', 'color')) {
                    return "visible";
                } else {
                    return "hidden";
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

                console.log(response.data)
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
                    if (this.checkedColumns.includes(column))
                        columns[this.aliases[column]] = column;
                }
                return columns;
            }

        }
        ,

    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
