<template>
  <div class="row container-fluid padding-0">
    <!-- Main content -->
    <div class="padding-0 map-layout">
      <div id="map">
        <MapControls
          :map="mapLayer"
          :mapHelpers="mapHelper"
          :nextHistoryEvent="nextHistoryEvent"
          :previousHistoryEvent="previousHistoryEvent"
        />
        <!-- <Sidebar @setBaseLayout="setBaseLayout" /> -->
        <Sidebar />
      </div>
    </div>

    <!-- Data table -->
    <DataTable ref="dataTable" @mapSetCenter="mapSetCenter" />

    <!-- Report -->
    <CustomModal
      name="sumResultModal"
      :maxWidth="600"
      @onClose="sumFilterVisibility = false"
    >
      <Report :arithmeticDataResult="ArithmeticDataResult" />
    </CustomModal>

    <!-- Filter -->
    <FilterModal />
    <!-- <FilterModal
      @filterSelectedColumn="filterSelectedColumn"
      @filterData="filterData"
    /> -->

    <!-- Shape Color Picker -->
    <CustomModal name="colorPickerModal" title="Color picker" :minWidth="300">
      <ShapeColorPicker @setShapeColor="setShapeColor" />
    </CustomModal>

    <!-- Change Detection -->
    <detector-modal
      :visible="lastBBOXOfShape.length > 0 && isDrawnShapeForDetection"
      v-bind="{ lastBBOXOfShape, token }"
      @close="
        ($store.state.dataTable.lastBBOXOfShape = []) &
          (isDrawnShapeForDetection = false)
      "
    ></detector-modal>
    <!-- Information Modal -->
    <InfoModal
      :isOpen="isInformationModalVisible"
      @close="isInformationModalVisible = false"
    />

    <!-- Information Modal -->
    <ComputedLayersModal />
  </div>
</template>

<script>
// OpenLayers

import {
  Map,
  View,
  Feature,
  Polygon,
  Circle,
  Point,
  Modify,
  defaultInteractions,
  DragRotateAndZoom,
  DragAndDrop,
  TileDebug,
  TileLayer,
  VectorLayer,
  ImageLayer,
  VectorTileLayer,
  VectorTileSource,
  MVT,
  createXYZ,
  OSM,
  TileArcGISRest,
  VectorSource,
  ImageArcGISRest,
  fromLonLat,
  METERS_PER_UNIT,
  transform,
  transformExtent,
  getProjection,
  getTransform,
  XYZ,
  bboxStrategy,
  ZoomSlider,
  defaultControls,
  FullScreen,
  MousePosition,
  createStringXY,
  GPX,
  GeoJSON,
  IGC,
  KML,
  TopoJSON,
  register,
  applyTransform,
  format,
} from "@/wrappers/openLayerImports";

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
  MapControls,
  InfoModal,
  Modal as CustomModal,
  ComputedLayersModal,
  ChangeDetector as DetectorModal,
} from "@/components/";

// Utils
import { URL, MAP_URLS } from "@/config/urls";
import { layerSettings } from "@/config/settings";
import { materialColors } from "@/config/colors";
import cities from "@/data/cities.json";

import { toggler, mapHelper, layerHelper, serviceHelper } from "@/helpers";
import {
  layerController,
  bunchController,
  tableController,
  mapController,
  serviceController,
  modalController,
} from "@/controllers";

// Services
import { layerService, tileService } from "@/services";
import qs from "qs";
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
    FilterModal: Filter,
    Report,
    MapControls,
    CustomModal,
    ComputedLayersModal,
  },
  data() {
    return {
      isDrawnShapeForDetection: false,
      mapHelper: null,
      toggler: null,
      latChange: null,
      longChange: null,
      ArithmeticDataResult: {},
      // filterValues: [],
      value: [],
      checkedColumns: [],
      checkedColumnsData: [],
      options: [],
      layers: [],
      isMarker: false,
      isRemove: false,
      isColorPick: false,
      token: null,
      kmlInfo: null,
      source: null,
      vector: null,
      vectorSource: null,
      vectorLayer: null,
      featureIDSet: 0,
      typeSelect: null,
      draw: null,
      sketch: null,
      hashResolveResult: {},

      tableFeaturesData: [],
      stackedTableFeaturesHeader: [],
      tableFeaturesHeader: [],
      tableNextRequest: [],
      citySearchOptions: [],
      citySearchInputShow: false,
      historyUpdate: true,
      nextHistoryEvent: false,
      previousHistoryEvent: false,
      historyEvents: [],
      historyEventsIndex: 0,
      graticule: false,
      isMetricCoordinateSystem: false,

      modalIsVisible: true,

      isHashLoaded: false,
      dataTable: {
        activeTab: null,
      },
    };
  },
  created() {},
  mounted() {
    let baseLayer = new TileLayer({
      source: mapController.getBaseMaps()["gray"],
    });
    var debugLayer = new TileLayer({
      source: new TileDebug({
        projection: "EPSG:3857",
        tileGrid: new OSM().getTileGrid(),
      }),
    });

    this.moodal = this.$moodal;

    this.hashResolveResult = this.resolveHash(window.location.hash);

    this.token = localStorage.getItem("token");

    if (this.token === null) this.$router.push("/login");

    this.mapHelper = new mapHelper(this);
    this.toggler = new toggler(this);
    this.citySearchOptions = cities;

    this.drawSource = new VectorSource({
      wrapX: false,
    });

    this.vector = new VectorLayer({
      source: this.drawSource,
      features: [],
    });

    this.vector.setZIndex(9999);

    this.$nextTick(function() {
      let dragAndDropInteraction = new DragAndDrop({
        formatConstructors: [GPX, GeoJSON, IGC, KML, TopoJSON],
      });
      this.layers = [baseLayer, this.vector];
      let zoom =
        this.hashResolveResult !== null ? this.hashResolveResult.zoom : 8;
      let center =
        this.hashResolveResult !== null
          ? this.hashResolveResult.center
          : fromLonLat([47.82858, 40.3598414]);
      let rotation = 0;

      this.mapLayer = new Map({
        interactions: defaultInteractions().extend([
          new DragRotateAndZoom(),
          dragAndDropInteraction,
        ]),
        controls: [], // defaultControls(), //.extend([new FullScreen()]),
        target: "map",
        layers: this.layers,
        view: new View({
          center: center,
          zoom: zoom,
          rotation: rotation,
        }),
      });

      let modify = new Modify({
        source: this.drawSource,
      });
      this.mapLayer.addInteraction(modify);
      let self = this;

      dragAndDropInteraction.on("addfeatures", function(event) {
        this.drawSource.addFeatures(event.features);
        self.mapLayer.getView().fit(this.drawSource.getExtent());
      });

      let displayFeatureInfo = function(pixel) {
        let features = [];
        self.mapLayer.forEachFeatureAtPixel(pixel, function(feature) {
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

      this.mapLayer.on("pointermove", function(evt) {
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
        // document.getElementById("mouse-position").innerHTML =
        //     "Lat: " +
        //     coord[1].toString() +
        //     " , " +
        //     "Long: " +
        //     coord[0].toString();
      });

      this.mapLayer.on("click", function(evt) {
        //displayFeatureInfo(evt.pixel);
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
          this.drawSource.addFeature(iconFeature);
        }
        if (self.isRemove) {
          self.mapLayer.forEachFeatureAtPixel(evt.pixel, function(
            feature,
            layer
          ) {
            try {
              this.drawSource.removeFeature(feature);
              let elem = document.getElementsByClassName(feature.get("id"));

              elem[0].className = "hidden";
            } catch (e) {}
          });
        }
        if (self.isColorPick) {
          self.mapLayer.forEachFeatureAtPixel(evt.pixel, function(
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
            } catch (e) {}
          });
        }
        if (self.dataTableVisibility) {
          self.getGeometryData(coord);
          self.mapSetFocusedPolygon(evt.pixel);
        }
      });
      this.$store.dispatch("getLayers").then(() => {
        this.setHashSelectedServices();
        self.mapLayer.on("moveend", this.updateHistoryMap);
      });
      window.addEventListener("popstate", function(event) {
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
    updateHistoryMap() {
      if (this.historyUpdate) {
        let view = this.mapLayer.getView();

        let state = {
          zoom: view.getZoom(),
          center: view.getCenter(),
          rotation: view.getRotation(),
        };
        this.updateHash();
        this.historyEvents.push(state);
        this.historyEventsIndex = this.historyEvents.length;
        this.nextHistoryEvent = false;
        if (this.historyEventsIndex !== 1) {
          this.previousHistoryEvent = true;
        }
      } else {
        this.historyUpdate = true;
      }
    },
    // objectToQueryString(obj) {
    //   var str = [];
    //   for (var p in obj)
    //     if (obj.hasOwnProperty(p)) {
    //       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    //     }
    //   return "?" + str.join("&");
    // },
    setHashSelectedServices() {
      if (this.hashResolveResult !== null) {
        var serviceIds = this.hashResolveResult.selectedLayers;
        if (serviceIds)
          for (let i = 0; i < serviceIds.length; i++) {
            const item = serviceIds[i];
            var service = layerController.getLayer(item);
            if (service) serviceController.selectService(service, true);
          }
      }
    },
    updateHash() {
      let view = this.mapLayer.getView();
      let state = {
        zoom: view.getZoom(),
        center: view.getCenter(),
        rotation: view.getRotation(),
      };
      var selectedLayers = layerController.getSelectedLayers();
      var selectedLayerIds = selectedLayers.map((item) => {
        return item.id;
      });
      let hash =
        "#shareMap=" +
        view.getZoom() +
        "&" +
        Math.round(view.getCenter()[0] * 100) / 100 +
        "&" +
        Math.round(view.getCenter()[1] * 100) / 100 +
        "&" +
        selectedLayerIds;
      window.history.pushState(state, "map", hash);
    },
    changeLocation() {
      this.mapLayer
        .getView()
        .setCenter(
          fromLonLat([parseFloat(this.longChange), parseFloat(this.latChange)])
        );
    },
    LatLongFormToggle() {
      let loc = document.getElementById("mouse-position").innerHTML;
      loc = loc.split(":").map((item) => item.trim());
      let long = loc[2];
      let lat = loc[1].split(",").map((item) => item.trim());
      lat = lat[0];
      this.longChange = long;
      this.latChange = lat;
      this.toggler.setLatLongShowForm();
    },
    setShapeColor() {
      document.body.style.cursor = "crosshair";
      this.$moodal.colorPickerModal.hide();
    },
    cityInputToggle() {
      this.toggler.cityInputToggle(this);
    },
    onCitySelect(city) {
      this.mapLayer
        .getView()
        .setCenter(fromLonLat([parseFloat(city.lng), parseFloat(city.lat)]));
      this.mapLayer.getView().setZoom(11);
      this.citySearchInputShow = false;
    },
    // nameWithCountry({ city, country }) {
    //   return `${city} , ${country}`;
    // },
    exportData() {
      this.mapHelper.exportData(this);
    },
    async filterSelectedColumn(id, column) {
      const service = this.$store.getters.tableData.find(
        (x) => x.service.id === id
      ).service;

      const params = { id };
      this.filterValues = [];

      if (serviceHelper.isLocalService(service)) {
        const getLayerColumnsDistinctData = await layerService.getLayerColumnsDistinctData(
          params
        );
        const result = getLayerColumnsDistinctData.data.result;

        this.filterValues =
          result[
            Object.keys(result).find(
              (key) => key.toLowerCase() === column.toLowerCase()
            )
          ];
      } else {
        const keys = Object.keys(this.tableHeadersWithAlias);
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
    },
    // filterData(service, query) {
    //   // this.tableNextRequest["service"],
    //   this.getTableData(
    //     service,
    //     this.tableNextRequest["layerId"],
    //     this.tableNextRequest["layerName"],
    //     query == "" ? {} : { where: query }
    //   );
    // },
    // addValueToQuery(value) {
    //   if (typeof value == "string") value = "'" + value + "'";
    //   this.filterQuery += value + " ";
    // },
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
    // addGraticule() {
    //   this.mapHelper.addGraticule();
    // },
    // pngExport() {
    //   this.mapHelper.pngExport();
    // },
    // setMarkerTrue() {
    //   this.setDrawType("None");
    //   this.isMarker = true;
    // },
    // eyeDropper() {
    //   this.setDrawType("None");
    //   this.$moodal.colorPickerModal.show();
    //   this.isColorPick = true;
    // },
    // changeDetector() {
    //   this.$store.state.dataTable.lastBBOXOfShape = [];
    //   this.setDrawType("Box");
    //   this.isDrawnShapeForDetection = true;
    // },
    // deleteFeatureOn() {
    //   this.setDrawType("None");
    //   this.isRemove = true;
    // },
    // resetFeatures() {
    //   this.mapHelper.resetFeatures();
    // },
    // selectColumns(alias, key, e) {
    //   if (e.target.checked) {
    //     this.checkedColumnsData.push(this.stackedTableFeaturesHeader[key]);
    //   } else {
    //     this.checkedColumnsData = this.checkedColumnsData.filter(
    //       (data) => data != alias
    //     );
    //   }
    // },
    // showColumnsChange() {
    //   this.toggler.showColumnsChange();
    // },
    resolveHash(hash) {
      var result = null;
      if (hash !== "") {
        let hashString = window.location.hash.replace("#shareMap=", "");
        let parts = hashString.split("&");
        if (parts.length === 4) {
          let zoom = parseInt(parts[0], 10);
          let center = [parseFloat(parts[1]), parseFloat(parts[2])];
          let selectedLayers = parts[3].split(",").map(Number);
          return { zoom, center, selectedLayers };
        }
      }

      return result;
    },
    mapSetCenter(data) {
      let geometry = [];
      if (data.geometry.x !== undefined) {
        geometry = [data.geometry.x, data.geometry.y];
      } else if (data.geometry.rings !== undefined) {
        geometry = data.geometry.rings[0];
      }
      if (geometry.length > 0) {
        geometry = geometry.map((item, index) => fromLonLat(item));
        var extent = new Polygon([geometry]);
        this.mapLayer.getView().fit(extent, {
          padding: [-50, 50, 30, 150],
          size: [50, 100],
          maxZoom: 16,
        });
        // var vectorLayer = this.mapHelper.renderPolygonVector(geometry);
        // this.mapSetFocusedPolygon(vectorLayer);
      }
    },

    mapSetFocusedPolygon(pixel) {
      console.log("mapSetFocusedPolygon -> pixel", pixel);
      let activeService = this.tableActiveService;
      let layer = mapController.getLayer(activeService.id);
      console.log("mapSetFocusedPolygon -> layer", layer);
      console.log(
        "mapSetFocusedPolygon -> layer.getSource()",
        layer.getFeatures()
      );
      // layer.getFeatures();
      // layer.getFeatures(pixel).then(function(features) {
      //   console.log("mapSetFocusedPolygon -> features", features);
      // });
      // //if last vector exist
      // if (this.focusedPolygonVector != null)
      //   //reset
      //   this.mapLayer.removeLayer(this.focusedPolygonVector);
      // //set new vector
      // this.focusedPolygonVector = vectorLayer;
      // this.mapLayer.addLayer(vectorLayer);
    },
    // showFilterModal() {
    //   this.$moodal.filterModal.show();
    // },
    // addInteraction() {
    //   this.mapHelper.addInteraction();
    // },

    // onMoveCallbackDynamicLayerList(evt, originalEvent) {
    //   this.dynamicLayerList.map((item, index) => {
    //     this.setZIndex(item);
    //   });
    // },
    // onMoveCallbackBaseLayerList(evt, originalEvent) {
    //   this.baseLayerList.map((item, index) => {
    //     this.setZIndex(item);
    //   });
    // },

    // setTableData(dataArr) {
    //   var dataTableArr = [];
    //   for (let i = 0; i < dataArr.length; i++) {
    //     const item = dataArr[i];
    //     let target = item.fieldAliases;
    //     let tableHeadersWithAlias = item.fieldAliases;
    //     let tableHeaders = Object.keys(tableHeadersWithAlias);
    //     let checkedColumnsData = [];
    //     let checkedColumns = [];

    //     let defaultUnCheckedColumns = [
    //       "OBJECTID",
    //       "Shape_Length",
    //       "Shape_Area",
    //     ];

    //     for (let alias in tableHeaders) {
    //       if (!defaultUnCheckedColumns.includes(tableHeaders[alias])) {
    //         checkedColumnsData.push(tableHeaders[alias]);
    //         checkedColumns.push(tableHeaders[alias]);
    //       }
    //     }

    //     tableHeaders = tableHeaders.map((item, index) => {
    //       let name = item;
    //       for (let k in target) {
    //         if (typeof target[k] !== "function") {
    //           if (item === k) {
    //             name = target[k];
    //           }
    //         }
    //       }
    //       return name;
    //     });

    //     checkedColumns = checkedColumns.map((item, index) => {
    //       return tableHeadersWithAlias[item];
    //     });

    //     dataTableArr.push({
    //       service: item.service,
    //       data: {
    //         totalCount: item.totalCount,
    //         tableName: item.service.name,
    //         tableHeaders: tableHeaders,
    //         tableStackedHeaders: Object.keys(tableHeadersWithAlias),
    //         tableHeadersWithAlias,
    //         tableData: item.features,
    //         filterValues: [],
    //         target,
    //         checkedColumnsData,
    //         checkedColumns,
    //       },
    //       paging: {
    //         isBusy: false,
    //         page: 1,
    //         limit: 25,
    //       },
    //     });
    //   }
    //   let tableData = this.$store.getters.tableData;
    //   if (serviceHelper.isBunch(this.tableActiveService)) {
    //     for (let i = 0; i < dataTableArr.length; i++) {
    //       const item = dataTableArr[i];
    //       let isExist = tableData.some((c) => c.service.id === item.service.id);

    //       if (isExist) {
    //         tableData = tableData.map((val) => {
    //           const { service, data } = item;

    //           if (val.service.id === item.service.id) {
    //             val.service = service;
    //             val.data = data;
    //           }
    //           return val;
    //         });
    //       } else {
    //         tableData.push(item);
    //       }
    //     }
    //   } else {
    //     tableData = dataTableArr;
    //   }
    //   let tabs = tableData.map((item, index) => {
    //     return {
    //       id: item.service.id,
    //       name: item.service.name,
    //     };
    //   });
    //   this.$store.dispatch("SAVE_DATATABLE", tableData);
    //   this.$store.dispatch("SAVE_DATATABLE_TABS", tabs);
    // },

    // async getTableData(service, layerId, layerName, query) {
    //   // var layer = this.getLayer(service.id);
    //   let response;

    //   tableController.setVisible();
    //   tableController.setLoading();
    //   // this.dataTableVisibility = true;
    //   // this.$store.dispatch("SAVE_DATATABLE_LOADING", true);

    //   if (serviceHelper.isArcgisService(service)) {
    //     let params = {
    //       token: this.token,
    //       name: service.name,
    //       layer: service.id,
    //       ...service.query,
    //     };
    //     response = await layerService.getTableData(params);
    //   } else {
    //     let paging = tableController.getDefaultPagingOptions();
    //     // this.tablePaging = {
    //     //   page: 1,
    //     //   limit: 25,
    //     // };

    //     var isBunch = serviceHelper.isBunch(this.tableActiveService);
    //     if (isBunch) {
    //       var isSameService = this.tableActiveService.type === service.type;
    //       var queryParams;
    //       if (isSameService) {
    //         queryParams = service.layers.map((item, index) => {
    //           return {
    //             layerId: item.id,
    //             query: { ...item.query, paging: paging },
    //           };
    //         });
    //       } else {
    //         queryParams = [
    //           {
    //             layerId: service.id,
    //             query: { ...service.query, paging: paging },
    //           },
    //         ];
    //       }

    //       var params = { layerQueries: queryParams };
    //       response = await layerService.getIntersectLocalTableData(
    //         this.tableActiveService.id,
    //         params
    //       );

    //       response.data = response.data.map((item) => {
    //         item.service = layerHelper.dynamicMapping(item.service);
    //         return item;
    //       });
    //     } else {
    //       let params = {
    //         layerId: service.id,
    //         ...query,
    //         paging: this.tablePaging,
    //       };
    //       if (this.filterQueryIsSum && service.resourceType === "local") {
    //         params.isSum = this.filterQueryIsSum;
    //         params.ArithmeticColumnName = this.filterQueryArithmeticColumn;
    //         response = await layerService.getLocalArithmeticData(params);
    //         this.ArithmeticDataResult = response.data.result;
    //         this.$moodal.arithmeticResultModal.show();
    //       } else {
    //         response = await layerService.getLocalTableData(params);
    //       }
    //     }

    //     // if (!serviceHelper.isBunch(service)) {
    //     //     if (query.where !== service.query.where) {
    //     if (serviceHelper.isQueryExist(service))
    //       this.refreshService(this.tableActiveService);
    //   }

    //   let data = [];

    //   if (!Array.isArray(response.data)) {
    //     response.data["service"] = service;
    //     data = [response.data];
    //   } else {
    //     data = response.data;
    //   }

    //   this.$store.dispatch("SAVE_DATATABLE_LOADING", false);
    //   if (response.data.error !== undefined) {
    //     return;
    //   }

    //   if (!this.filterQueryIsSum) {
    //     let self = this;
    //     this.tableNextRequest["service"] = service;
    //     this.tableNextRequest["layerId"] = layerId;
    //     this.tableNextRequest["layerName"] = layerName;

    //     this.dataTableVisibility = false;

    //     this.setTableData(data);

    //     this.dataTableVisibility = true;
    //     this.tableFeaturesData = response.data.features;
    //     this.tableFeaturesHeader = response.data.tableHeaders;
    //     this.stackedTableFeaturesHeader = response.data.tableHeaders;
    //   }
    //   this.filterQuery = "";
    //   this.filterValues = [];
    //   this.filterQueryIsSum = false;
    //   // this.dynamicLayersReset(service, true);
    // },
    async getGeometryData(coords) {
      let response = null;
      let geometry = null;
      let service = this.tableActiveService;
      if (serviceHelper.isLayer(service)) {
        if (serviceHelper.isDynamicFromArcgis(service)) {
          geometry = coords[0] + "," + coords[1];
          var params = {
            token: this.token,
            name: service.name,
            layer: service.name,
            where: service.query.where,
            geometry: geometry,
          };
          response = await layerService.getGeometryData(params);
        } else {
          var params = {
            layerId: service.id,
            where: service.query.where,
            geometry: coords[0] + "," + coords[1],
          };
          response = await layerService.getLocalTableData(params);
        }

        if (response.data.totalCount > 0) {
          let features = response.data.features[0];
          this.$refs.dataTable.showDataModal(features.attributes);
          this.mapSetCenter(features);
        }
      }
    },

    // getVectorStyle(color) {
    //   if (color === null) {
    //     color = this.defaultColorObject;
    //   }

    //   var style = new Style({
    //     fill: new Fill({
    //       color: color.fill.hex8,
    //     }),
    //     stroke: new Stroke({
    //       color: color.border.hex8,
    //       width: 0.5,
    //     }),
    //     image: new CircleStyle({
    //       radius: 7,
    //       fill: new Fill({
    //         color: color.fill.hex8,
    //       }),
    //       stroke: new Stroke({
    //         color: color.border.hex8,
    //         width: 0.5,
    //       }),
    //     }),
    //   });
    //   return style;
    // },

    // async selectService(service, isChecked) {
    //   if (!isChecked) {
    //     this.mapLayer.getLayers().forEach(function(layer) {
    //       if (layer.get("type") === "draw") {
    //         mapController.removeLayer(layer);
    //       }
    //     });
    //   }
    //   var tableActiveService = this.tableActiveService;
    //   if (!isChecked && tableActiveService) {
    //     if (serviceHelper.isEqual(service, tableActiveService))
    //       this.dataTableVisibility = false;
    //   }

    //   if (serviceHelper.isLayer(service)) {
    //     if (serviceHelper.isDynamic(service)) {
    //       if (isChecked && serviceHelper.isDynamicFromArcgis(service)) {
    //         let subLayerResponse = await this.getResponseDynamic(service);
    //         service.layers = subLayerResponse.data.layers;
    //       }
    //     }
    //     layerController.setSelected(service, isChecked);
    //   } else {
    //     bunchController.setSelected(service, isChecked);
    //   }

    //   if (isChecked) this.addService(service);
    //   else mapController.deleteService(service);
    // },
    // addService(service) {
    //   if (service.extent != null) {
    //     this.mapLayer
    //       .getView()
    //       .fit([
    //         service.extent.minX,
    //         service.extent.minY,
    //         service.extent.maxX,
    //         service.extent.maxY
    //       ]);
    //   }

    //   var newService = this.renderNewService(service);
    //   this.getOrderNumber(this.dynamicLayerList, service);

    //   newService.set("name", service.name);
    //   var zIndex = this.getZIndex(service);
    //   newService.setZIndex(zIndex);

    //   this.mapLayer.addLayer(newService);
    // },

    // setZIndex(service) {
    //   this.mapLayer.getLayers().forEach(layer => {
    //     if (
    //       layer.get("name") != undefined &&
    //       layer.get("name") === service.name
    //     ) {
    //       layer.setZIndex(this.getZIndex(service));
    //     }
    //   });
    // },
    // getZIndex(service) {
    //   let zIndex = 0;
    //   let orderNo = 0;
    //   if (serviceHelper.isLayer(service)) {
    //     if (serviceHelper.isDynamic(service)) {
    //       zIndex = layerSettings.dynamicZIndex;
    //       orderNo = this.getOrderNumber(this.dynamicLayerList, service);
    //     } else {
    //       zIndex = layerSettings.basemapZIndex;
    //       orderNo = this.getOrderNumber(this.baseLayerList, service);
    //     }
    //   } else {
    //     zIndex = layerSettings.bunchZIndex;
    //     orderNo = this.getOrderNumber(this.bunchLayerList, service);
    //   }

    //   return zIndex - orderNo;
    // },

    // getOrderNumber(array, service) {
    //   var index = 0;
    //   var result = 0;
    //   layerHelper.recursiveLayerMapping(array, function(layer) {
    //     index++;
    //     if (layer.name == service.name) {
    //       result = index;
    //     }
    //   });
    //   return result;
    // },
    // getLayerZoomLevelOptions(service) {
    //   return {
    //     maxResolution: createXYZ().getResolution(service.minZoomLevel) * 1.01,
    //     minResolution: createXYZ().getResolution(service.maxZoomLevel)
    //   };
    // },

    // renderNewService(service) {
    //   var isLayer = serviceHelper.isLayer(service);
    //   let zoomLevelProperties = this.getLayerZoomLevelOptions(service);
    //   let new_layer;

    //   let defaultParams = {
    //     id: service.id,
    //     type: "layer"
    //   };
    //   let url = URL + "/api/map/service/" + service.name + "/MapServer/";
    //   if (isLayer) {
    //     var isDynamic = serviceHelper.isDynamic(service);
    //     if (isDynamic) {
    //       if (serviceHelper.isLocalService(service)) {
    //         new_layer = new VectorTileLayer({
    //           ...defaultParams,
    //           ...zoomLevelProperties,
    //           source: new VectorTileSource({
    //             format: new MVT({
    //               geometryName: "geom"
    //             }),
    //             url:
    //               URL +
    //               "/" +
    //               MAP_URLS.MVT +
    //               `/${service.id}/{z}/{x}/{y}/` +
    //               (service.query.where != ""
    //                 ? this.objectToQueryString(service.query)
    //                 : "")
    //           }),
    //           style: this.getVectorStyle(service.color)
    //         });
    //       } else {
    //         new_layer = new ImageLayer({
    //           ...defaultParams,
    //           ...zoomLevelProperties,
    //           source: new ImageArcGISRest({
    //             url: url,
    //             crossOrigin: "Anonymous",
    //             params: {
    //               token: this.token,
    //               layers: layerHelper.renderArcgisSublayerConfig(service),
    //               dynamicLayers: layerHelper.renderSubLayersColorString(service)
    //             }
    //           })
    //         });
    //       }
    //     } else {
    //       if (service.spatial === 3857) {
    //         url = url + "/tile/{z}/{y}/{x}?token=" + this.token;
    //         new_layer = new TileLayer({
    //           ...defaultParams,
    //           ...zoomLevelProperties,
    //           source: new XYZ({
    //             url: url,
    //             projection: "EPSG:3857",
    //             crossOrigin: "Anonymous"
    //           })
    //         });
    //       } else {
    //         new_layer = new TileLayer({
    //           ...defaultParams,
    //           ...zoomLevelProperties,
    //           source: new TileArcGISRest({
    //             url: url,
    //             crossOrigin: "Anonymous",
    //             params: {
    //               token: this.token,
    //               FORMAT: "png8"
    //             }
    //           })
    //         });
    //       }
    //     }
    //   } else {
    //     var queryParams = service.layers.map((item, index) => {
    //       return {
    //         layerId: item.id,
    //         query: item.query
    //       };
    //     });
    //     var params = { queries: queryParams };
    //     new_layer = new VectorTileLayer({
    //       ...defaultParams,
    //       source: new VectorTileSource({
    //         format: new MVT({
    //           geometryName: "geom"
    //         }),
    //         url:
    //           URL +
    //           "/api/Tile/Intersect/VectorAsMvt" +
    //           `/${service.id}/{z}/{x}/{y}/?` +
    //           qs.stringify(params, {
    //             arrayFormat: "indices",
    //             allowDots: true
    //           })
    //       }),
    //       style: feature => {
    //         var featureLayerId = feature.get("layerId");
    //         var layerIds = service.layers.map(item => {
    //           return item.id;
    //         });
    //         var index = layerIds.indexOf(featureLayerId);

    //         var color = materialColors[index];
    //         var colorObj = {
    //           border: {
    //             hex8: color
    //           },
    //           fill: {
    //             hex8: "#FFFFFF00"
    //           }
    //         };

    //         return this.getVectorStyle(colorObj);
    //       }
    //     });
    //   }

    //   return new_layer;
    // },

    // refreshService(service) {
    //   mapController.deleteService(service, false);
    //   this.addService(service);
    // },
    // getLayer(id) {
    //   let layer = null;
    //   this.mapLayer.getLayers().forEach(function(lyr) {
    //     var layerId = lyr.values_.id;
    //     if (layerId !== undefined && layerId === id) {
    //       layer = lyr;
    //     }
    //   });
    //   return layer;
    // },
    // setBaseLayout(index) {
    //   let layers = this.mapLayer.getLayers().getArray();
    //   layers[0].setSource(this.baseMaps[index]);
    // },
    // async isLayerColorEnabled(service) {
    //   let isColorEnabled = false;
    //   let response = await layerService.getLayerDynamic({
    //     token: this.token,
    //     name: service.name,
    //   });
    //   if (response.data.layers[0].drawingInfo !== undefined) {
    //     if (response.data.layers[0].drawingInfo.renderer.symbol !== undefined) {
    //       if (
    //         response.data.layers[0].drawingInfo.renderer.symbol.color !==
    //         undefined
    //       ) {
    //         isColorEnabled = true;
    //       }
    //     }
    //   }
    //   return isColorEnabled;
    // },
    // async dynamicLayersReset(service, status) {
    //   if (serviceHelper.isDynamicFromArcgis(service)) {
    //     var isColorEnabled = await this.isLayerColorEnabled(service);

    //     this.dynamicLayerList = layerHelper.recursiveLayerMapping(
    //       this.dynamicLayerList,
    //       async (layer) => {
    //         if (layer != null && layer.id == service.id) {
    //           if (layer.layers !== undefined && layer.layers !== null) {
    //             layer.layers = layer.layers.map((item, index) => {
    //               return {
    //                 ...item,
    //                 isColorEnabled,
    //               };
    //             });
    //           }
    //         }
    //       }
    //     );
    //   }
    // },
    // async getResponseDynamic(service) {
    //   let responseDynamic = null;
    //   if (serviceHelper.isDynamicFromArcgis(service)) {
    //     responseDynamic = await layerService.getDynamicLayers({
    //       token: this.token,
    //       name: service.name
    //     });
    //   }
    //   return responseDynamic;
    // },

    // async selectSubService(service, index, id, e) {
    //   let isChecked = e.target.checked;

    //   this.dynamicLayerList = layerHelper.recursiveLayerMapping(
    //     this.dynamicLayerList,
    //     async (layer) => {
    //       if (layer != null && layer.id == service.id) {
    //         var subLayer = layer.layers.find((c) => c.id == id);
    //         subLayer.isSelected = isChecked;
    //       }
    //     }
    //   );

    //   this.dynamicLayersReset(service, isChecked);
    //   this.refreshService(service);
    // },
    // setDrawType(name) {
    //   this.typeSelect = name;
    //   this.mapLayer.removeInteraction(this.draw);
    //   this.isColorPick = false;
    //   this.isMarker = false;
    //   this.isRemove = false;
    //   if (name !== "None") {
    //     this.addInteraction();
    //   }
    //   this.featureIDSet += 10;
    //   document.body.style.cursor = "default";
    // },
    //   saveColor(service, colorObj) {
    //     const { fillColor, borderColor } = colorObj;
    //     var isLayer = serviceHelper.isLayer(service);
    //     var isSubLayer = serviceHelper.isSublayer(service);
    //     var isBunch = serviceHelper.isBunch(service);

    //     var color = { fill: fillColor, border: borderColor };

    //     if (isLayer || isSubLayer) {
    //       var service = isSubLayer ? service.parent : service;

    //       layerController.setColor(service, color, isSubLayer);
    //     } else if (isBunch) {
    //       bunchController.setColor(service.id, color);
    //     }
    //     this.refreshService(service);
    //   },
    // },
  },
  computed: {
    moodal: {
      get() {
        return this.$store.getters.moodal;
      },
      set(value) {
        this.$store.dispatch("saveMoodal", value);
      },
    },
    defaultColorObject() {
      var fill = this.$store.state.colorPicker.fill;
      var border = this.$store.state.colorPicker.border;
      return { fill, border };
    },
    isInformationModalVisible: {
      get() {
        return this.$store.getters.isInformationModalVisible;
      },
      set(value) {
        // this.filterQueryIsSum = false;
        this.$store.dispatch("saveInformationModalVisibility", value);
      },
    },
    tableActiveService() {
      return this.$store.getters.tableActiveService;
    },
    selectedLayers() {
      return layerController.getSelectedLayers();
    },
    drawSource: {
      get() {
        return this.$store.getters.drawSource;
      },
      set(value) {
        // this.filterQueryIsSum = false;
        this.$store.dispatch("saveDrawSource", value);
      },
    },
    mapLayer: {
      get() {
        return this.$store.getters.mapLayer;
      },
      set(value) {
        // this.filterQueryIsSum = false;
        this.$store.dispatch("saveMap", value);
      },
    },
    sumFilterVisibility: {
      get() {
        var status = this.$store.getters.sumResultModalVisibility;
        console.log("get -> status", status);

        if (status) this.$moodal.sumResultModal.show();
        else this.$moodal.sumResultModal.hide();
        return status;
      },
      set(value) {
        modalController.setSumResultVisibility(value);
      },
    },
    dataTableVisibility: {
      get() {
        return this.$store.state.dataTable.isVisible;
      },
      set(value) {
        this.$store.dispatch("SAVE_DATATABLE_VISIBLE", value);
      },
    },

    focusedPolygonVector: {
      get() {
        return this.$store.state.layers.focusedPolygonVector;
      },
      set(value) {
        this.$store.dispatch("saveFocusePolygonVector", value);
      },
    },

    // This should not work
    // tablePaging: {
    //   get() {
    //     return this.$store.state.dataTable.paging;
    //   },
    //   set(value) {
    //     this.$store.dispatch("SAVE_DATATABLE_PAGING", value);
    //   },
    // },
    // selectedServiceInfo() {
    //   return this.$store.state.dataTable.serviceInfo;
    // },
    // filterQueryIsSum: {
    //   get() {
    //     return this.$store.state.filter.filterQueryIsSum;
    //   },
    //   set(value) {
    //     this.$store.dispatch("SAVE_FILTER_QUERY_IS_SUM", value);
    //   },
    // },

    // filterQueryArithmeticColumn() {
    //   return this.$store.state.filter.filterQueryArithmeticColumn;
    // },
    // dynamicLayerList: {
    //   get() {
    //     return this.$store.getters.dynamicLayerList;
    //   },
    //   set(val) {
    //     this.$store.dispatch("saveDynamicLayerList", val);
    //   },
    // },

    // bunchLayerList: {
    //   get() {
    //     return this.$store.getters.bunchLayerList;
    //   },
    //   set(val) {
    //     this.$store.dispatch("saveBunchLayerList", val);
    //   },
    // },
    // baseLayerList: {
    //   get() {
    //     return this.$store.getters.baseLayerList;
    //   },
    //   set(val) {
    //     this.$store.dispatch("saveBaseLayerList", val);
    //   },
    // },

    tableData(id) {
      return this.$store.dataTable.filter((x) => x.service.id === id);
    },

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
      return this.$store.getters.bbox;
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
          columns[
            this.tableFeaturesHeader[column]
          ] = this.stackedTableFeaturesHeader[column];
        }
      }
      return columns;
    },
    activeTabId() {
      return this.$store.state.dataTable.activeTabId;
    },
    filterValues: {
      get() {
        const data = this.$store.getters.activeTableData;
        return data ? data.filterValues : [];
      },
      set(value) {
        this.$store.dispatch("SAVE_DATATABLE_FILTER_VALUES", {
          id: this.activeTabId,
          value,
        });
      },
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
