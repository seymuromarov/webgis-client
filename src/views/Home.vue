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
        <Sidebar
          :baseMaps="baseMaps"
          @selectLayer="selectService"
          @selectSubLayer="selectSubService"
          @dynamicLayersReset="dynamicLayersReset"
          @getTableData="getTableData"
          @showInfoModal="showInfoModal = true"
          @exportPNG="pngExport"
          @exportData="exportData"
          @setBaseLayout="setBaseLayout"
          @setDrawType="setDrawType"
          @delete="deleteFeatureOn"
          @reset="resetFeatures"
          @pickColor="eyeDropper"
          @changeDetector="changeDetector"
          @addGraticule="addGraticule"
          @addPlace="setMarkerTrue"
          @saveColor="saveColor"
          @onMoveCallbackBaseLayerList="onMoveCallbackBaseLayerList"
          @onMoveCallbackDynamicLayerList="onMoveCallbackDynamicLayerList"
        />
      </div>
    </div>

    <!-- Data table -->
    <DataTable
      ref="dataTable"
      @showFilterModal="showFilterModal"
      @mapSetCenter="mapSetCenter"
    />

    <!-- Report -->
    <CustomModal ref="arithmetic-result-modal" :maxWidth="600">
      <Report :arithmeticDataResult="ArithmeticDataResult" />
    </CustomModal>

    <!-- Filter -->
    <CustomModal ref="filter-modal" title="Filter" :maxWidth="600">
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
    </CustomModal>

    <!-- Shape Color Picker -->
    <CustomModal ref="color-picker-modal" title="Color picker" :minWidth="300">
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
    <InfoModal :isOpen="showInfoModal" @close="showInfoModal = false" />
  </div>
</template>

<script>
// OpenLayers
import { Map, View, Overlay, Feature } from "ol";
import { LineString, Polygon, Circle, Point } from "ol/geom.js";
import {
  Modify,
  defaults as defaultInteractions,
  DragRotateAndZoom,
  DragAndDrop
} from "ol/interaction";
import TileDebug from "ol/source/TileDebug";
import {
  Circle as CircleStyle,
  Text,
  Fill,
  Stroke,
  Style,
  Icon
} from "ol/style.js";
import {
  Tile as TileLayer,
  Vector as VectorLayer,
  Image as ImageLayer
} from "ol/layer.js";
import VectorTileLayer from "ol/layer/VectorTile.js";
import VectorTileSource from "ol/source/VectorTile.js";
import MVT from "ol/format/MVT.js";
import { createXYZ } from "ol/tilegrid";
import {
  OSM,
  TileArcGISRest,
  Vector as VectorSource,
  ImageArcGISRest
} from "ol/source.js";
import {
  fromLonLat,
  METERS_PER_UNIT,
  transform,
  transformExtent,
  get as getProjection,
  getTransform
} from "ol/proj";
import XYZ from "ol/source/XYZ.js";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import {
  ZoomSlider,
  defaults as defaultControls,
  FullScreen
} from "ol/control.js";
import MousePosition from "ol/control/MousePosition.js";
import { createStringXY } from "ol/coordinate.js";
import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format.js";
import { register } from "ol/proj/proj4.js";
import { applyTransform } from "ol/extent";
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
  MapControls,
  InfoModal,
  Modal as CustomModal
} from "@/components/";
import DetectorModal from "@/components/modals/ChangeDetector";

// Utils
import { URL, MAP_URLS } from "@/config/urls";
import { layerSettings } from "@/config/settings";
import cities from "@/data/cities.json";
import LoginService from "@/services/LoginService";
import LayerService from "@/services/LayerService";
import { toggler, mapHelper, layerHelper } from "@/helpers";

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
    MapControls,
    CustomModal
  },
  data() {
    return {
      isDrawnShapeForDetection: false,
      mapHelper: null,
      toggler: null,
      latChange: null,
      longChange: null,
      filterQuery: "",
      ArithmeticDataResult: {},
      filterValues: [],
      mapLayer: null,
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

      hashResolveResult: [],

      stackedTableFeaturesHeader: [],
      tableFeaturesHeader: [],
      tableFeaturesData: [],
      tableNextRequest: [],
      citySearchOptions: [],
      citySearchInputShow: false,
      historyUpdate: true,
      nextHistoryEvent: false,
      previousHistoryEvent: false,
      historyEvents: [],
      historyEventsIndex: 0,
      graticule: false,
      tableHeader: null,
      isMetricCoordinateSystem: false,
      baseMaps: {
        none: new XYZ({
          crossOrigin: "Anonymous",
          url: ""
        }),
        satellite: new XYZ({
          name: "sat",
          url:
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        }),
        street: new XYZ({
          url:
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        }),
        gray: new XYZ({
          crossOrigin: "Anonymous",
          url:
            "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        })
      },
      showInfoModal: false,
      isHashLoaded: false
    };
  },
  created() {},
  mounted() {
    this.hashResolveResult = this.resolveHash(window.location.hash);
    this.token = this.$cookie.get("token");

    if (this.token === null) this.$router.push("/login");

    this.mapHelper = new mapHelper(this);
    this.toggler = new toggler(this);
    this.citySearchOptions = cities;

    this.source = new VectorSource({
      wrapX: false
    });

    this.vector = new VectorLayer({
      source: this.source,
      features: []
    });

    this.vector.setZIndex(9999);

    var debug = new TileLayer({
      source: new TileDebug({
        projection: "EPSG:3857",
        tileGrid: new OSM().getTileGrid()
      })
    });

    let gray = new TileLayer({
      source: new XYZ({
        crossOrigin: "Anonymous",
        url:
          "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
      })
    });

    var dynamics = this.dynamicLayerList;
    this.getLayers();
    this.$nextTick(function() {
      let dragAndDropInteraction = new DragAndDrop({
        formatConstructors: [GPX, GeoJSON, IGC, KML, TopoJSON]
      });
      this.layers = [gray, this.vector];
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
          dragAndDropInteraction
        ]),
        controls: [], // defaultControls(), //.extend([new FullScreen()]),
        target: "map",
        layers: this.layers,
        view: new View({
          center: center,
          zoom: zoom,
          rotation: rotation
        })
      });

      let modify = new Modify({
        source: this.source
      });
      this.mapLayer.addInteraction(modify);
      let self = this;

      dragAndDropInteraction.on("addfeatures", function(event) {
        self.source.addFeatures(event.features);
        self.mapLayer.getView().fit(self.source.getExtent());
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
            coord[0].toString().substring(0, 10)
          ];
        } else {
          coord = [
            coord[1].toString().substring(0, 7),
            coord[0].toString().substring(0, 7)
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
            id: "232"
          });
          iconFeature.setStyle(
            new Style({
              image: new Icon({
                anchor: [0.5, 46],
                size: [48, 48],
                anchorXUnits: "fraction",
                anchorYUnits: "pixels",
                src:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAD2ElEQVRogdWaQYgcRRSGv2724HER8eBBFhHJWSWB6ClEood+5pyzJ3P1Ih5EwjKERUQPopJDlICYg4R6IQQMXkxEPETwoBAWWYLIIrIsYQ9xWaY8TPdsbU3XdFV1z5j8UPSb1139/lf16vWr7imstTzOKIDy/ybRB4W1lqIoSmvteKr0fqdARI4BrwMngDVgFRgDO8AfwB3ghqr+1dhw7SXLZMyAtXZcFMWRflVVnQXeA16MvM0t4IKq3k6176LouwZE5BngS+B05i2+As4bY/ZyOh8JIfcIk5GG9ukriqKsquo4oMBTmeQb3APOqOp9107DwZfda7IXcVVVJ4HvgCd6km+wDbyiqlspnbJCSETWgF+YLNAhcQ94KSWcSjicLvfoLlJXFpEV4BuGJw/wAvC5z2GePBM+PvGWjm8BxzuI/A38BGwCe8ABsAtsAQ87+p4TkVdDfPyLV+BwsXblfhEpgXcjyD9dNxerHM7amPlr731r7WsddrDWjo+ETgROA8/OOX/ALPE2dNk7JSJrUSHUFjKhBrzZYXglgnwMSiZP82AINXJprR27ITSvAS8PRDAGJ7r4zISQf/S9BZ5bogPPJ4VQKJV6+ieX6MCqyyckl7HhU1+XVaFmopPPNIR8r0JTBjxYogO7XaMPEAyhgLy5YNIuthq78wa2jJkmJ4R61e6J+CE7C/k6R//1ksjvA9eSQsg9GXJIVe+ynFm4oqo7bXyCIQTRmejCgsmPgVFsWCeFUD0Lt4C7C3TgW2PMZoiPL7dmoa6MBIwWRh9GsXuBoijK7E29iPwOHBuKdY2bxpg3UjoEy2l/V+bqa3Eji+J8jGJHvpFnp8Qj3qavj1eAPwck/2Pzjigm9rNqIbcZY/YZdhbWUzkEa6GQruX8F8A/A5D/1RhzI6djMAt1rv5JSt0HPh7AgZFvN7Yl1UKBB9sn9KtSN4GrufajdmQu/JkwxjxgEkq52FDV6b2Ts1AbsTaiIcdq3YdMCrBUbAOX/XunyNO3CE028uHqQzKwLSKXgLcTHdios1k2knZkbc8IlwyT90Kx2AE+yx35Rk7dkU1l3ylVvQ9cTXDgU1V9GLpfrNw7C3kZaZ24jf8e8NEQNrNrobYRMcb8BlyPcOCSqu72Hf2+tRABeb2D/AGTrJWdeVx5xdqjn20GwM8i8j1wKnD+sjFmsCKwby0UwgcB/T5wMZpdBBb2obuqqovAO45qDJxX1T5P7Rn0/sw6DyJyEjgD/Atcqxf5sKgdKNuObc295lGQp9+JA87NfKP15TkD03nNEGj9r8TjhMFqoa5sNUTOb5P/A8dYOKnlHRBqAAAAAElFTkSuQmCC"
              })
            })
          );
          self.source.addFeature(iconFeature);
        }
        if (self.isRemove) {
          self.mapLayer.forEachFeatureAtPixel(evt.pixel, function(
            feature,
            layer
          ) {
            try {
              self.source.removeFeature(feature);
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

              feature.setStyle(newStyle);
            } catch (e) {}
          });
        }
        if (self.dataTableVisibility) {
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
      let updateHistoryMap = function() {
        if (self.historyUpdate) {
          let state = {
            zoom: view.getZoom(),
            center: view.getCenter(),
            rotation: view.getRotation()
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
    objectToQueryString(obj) {
      var str = [];
      for (var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      return "?" + str.join("&");
    },

    updateHash() {
      let view = this.mapLayer.getView();
      let state = {
        zoom: view.getZoom(),
        center: view.getCenter(),
        rotation: view.getRotation()
      };
      var selectedLayers = this.getSelectedLayers();
      var selectedLayerIds = selectedLayers.map(item => {
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
    getSelectedLayers() {
      var selectedLayers = [];
      var layers = [...this.dynamicLayerList, ...this.baseLayerList];
      layerHelper.recursiveLayerMapping(layers, function(layer) {
        if (layer.isSelected) {
          selectedLayers.push(layer);
        }
      });
      return selectedLayers;
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
      loc = loc.split(":").map(item => item.trim());
      let long = loc[2];
      let lat = loc[1].split(",").map(item => item.trim());
      lat = lat[0];
      this.longChange = long;
      this.latChange = lat;
      this.toggler.setLatLongShowForm();
    },
    setShapeColor() {
      document.body.style.cursor = "crosshair";
      this.$refs["color-picker-modal"].hide();
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
    nameWithCountry({ city, country }) {
      return `${city} , ${country}`;
    },
    exportData() {
      this.mapHelper.exportData(this);
    },
    async filterSelectedColumn(column) {
      this.filterValues = [];
      let params = {
        id: this.$store.state.dataTable.serviceInfo.id
      };
      if (this.selectedServiceInfo.resourceType === "local") {
        let getLayerColumnsDistinctData = await LayerService.getLayerColumnsDistinctData(
          params
        );
        let result = getLayerColumnsDistinctData.data.result;
        this.filterValues =
          result[
            Object.keys(result).find(
              key => key.toLowerCase() === column.toLowerCase()
            )
          ];
      } else {
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
        this.filterQuery == "" ? {} : { where: this.filterQuery }
      );
      this.$refs["filter-modal"].hide();
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
          duration: 3500
        }
      );
    },
    addGraticule() {
      this.mapHelper.addGraticule();
    },
    pngExport() {
      this.mapHelper.pngExport();
    },
    setMarkerTrue() {
      this.setDrawType("None");
      this.isMarker = true;
    },
    eyeDropper() {
      this.setDrawType("None");
      this.$refs["color-picker-modal"].show();
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
      this.mapHelper.resetFeatures();
    },
    selectColumns(alias, key, e) {
      if (e.target.checked) {
        this.checkedColumnsData.push(this.stackedTableFeaturesHeader[key]);
      } else {
        this.checkedColumnsData = this.checkedColumnsData.filter(
          data => data != alias
        );
      }
    },
    showColumnsChange() {
      this.toggler.showColumnsChange();
    },
    showSimpleFilterModal(layerId, layerName) {
      this.$store.dispatch("SAVE_DATATABLE_LAYER_ID", layerId);
      this.$store.dispatch("SAVE_DATATABLE_SERVICE_NAME", layerName);
      this.$refs.reportFilterModal.$modal.show(
        "simple-data-filter-modal",
        null,
        {
          name: "simple-data-filter-modal",
          resizable: false,
          adaptive: true,
          draggable: false
        }
      );
    },
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
          // console.log(ids);
          // console.log(this.dynamicLayerList);
          // var selecteds = layerHelper.recursiveLayerMapping(
          //   this.dynamicLayerList,
          //   function(layer) {
          //     console.log(ids.includes(layer.id));
          //     if (ids.includes(layer.id)) {
          //       console.log("setted true");
          //       layer.isSelected = true;
          //     }
          //   }
          // );
        }
      }

      return result;
    },
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
      this.$refs["filter-modal"].show();
    },
    addInteraction() {
      this.mapHelper.addInteraction();
    },
    onMoveCallbackDynamicLayerList(evt, originalEvent) {
      this.dynamicLayerList.map((item, index) => {
        this.setZIndex(item);
      });
    },
    onMoveCallbackBaseLayerList(evt, originalEvent) {
      this.baseLayerList.map((item, index) => {
        this.setZIndex(item);
      });
    },

    isItemCategory(item) {
      return layerHelper.isCategory(item);
    },

    async getTableData(service, layerId, layerName, query) {
      var layer = this.getLayer(service.id);

      let response;
      this.dataTableVisibility = true;
      // this.$store.dispatch("SAVE_DATATABLE_VISIBLE", true);
      this.$store.dispatch("SAVE_DATATABLE_LOADING", true);

      if (service.resourceType === "azcArcgis") {
        let params = {
          token: this.token,
          name: service.name,
          layer: layerId,
          ...query
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
        if (this.filterQueryIsSum && service.resourceType === "local") {
          params.isSum = this.filterQueryIsSum;
          params.ArithmeticColumnName = this.filterQueryArithmeticColumn;
          response = await LayerService.getLocalArithmeticData(params);
          this.ArithmeticDataResult = response.data.result;
          this.$refs["arithmetic-result-modal"].show();
          this.filterQueryIsSum = false;
        } else {
          response = await LayerService.getLocalTableData(params);
        }
        this.refreshLayer(service);
      }
      this.$store.dispatch("SAVE_DATATABLE_LOADING", false);

      if (response.data.error !== undefined) {
        return;
      }

      if (!this.filterQueryIsSum) {
        let self = this;
        this.tableNextRequest["service"] = service;
        this.tableNextRequest["layerId"] = layerId;
        this.tableNextRequest["layerName"] = layerName;

        let serviceName = service.name;
        let serviceInfo = {
          id: service.id,
          label: service.name,
          mapType: service.mapType,
          resourceType: service.resourceType,
          query: service.query,
          isDisabled: service.isDisabled
        };
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
          "Shape_Area"
        ];

        for (let alias in tableHeaders) {
          if (!defaultUnCheckedColumns.includes(tableHeaders[alias])) {
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
        this.dataTableVisibility = false;
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
          checkedColumns
        });
        this.dataTableVisibility = true;
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
          geometry: geometry
        };
        response = await LayerService.getGeometryData(params);
      } else {
        var params = {
          layerId: service.id,
          where: query,
          geometry: coords[0] + "," + coords[1]
        };
        response = await LayerService.getLocalTableData(params);
      }

      if (response.data.features !== undefined) {
        if (response.data.features.length !== 0) {
          this.$refs.dataTable.showDataModal(response.data.features[0]);
        }
      }
    },
    setDynamicIndexes() {
      this.dynamicLayerList.map((item, index) => {
        this.mapLayer.getLayers().forEach(function(layer) {
          if (
            layer.get("name") != undefined &&
            layer.get("name") === item.name
          ) {
            layer.setZIndex(9999 - index);
          }
        });
      });
    },
    async getLayers() {
      LayerService.getLayersWithFullDataFromServer({
        token: this.token
      }).then(response => {
        let layers = layerHelper.mapLayers(response.data);
        let e = { target: { checked: true } };

        this.baseLayerList = layers.baseLayers;
        this.dynamicLayerList = layers.dynamicLayers;

        var selectedIds =
          this.hashResolveResult.selectedLayers !== null
            ? this.hashResolveResult.selectedLayers
            : [];

        this.dynamicLayerList = layerHelper.recursiveLayerMapping(
          this.dynamicLayerList,
          layer => {
            if (selectedIds.includes(layer.id)) {
              layer.isSelected = true;
              this.selectService(
                layer,
                layer.order,
                layer.mapType === "dynamic",
                e,
                false
              );
            }
          }
        );
      });

      // let selectedLayersArr = Object.keys(
      //   this.$store.getters.selectedLayers
      // ).map(Number);
      // selectedLayersArr.forEach(value => {
      //   this.baseLayerList.forEach(item => {
      //     this.checkIfLayerNeedsToTurnOn(item, value);
      //   });
      //   this.dynamicLayerList.forEach(item => {
      //     this.checkIfLayerNeedsToTurnOn(item, value);
      //   });
      // });
    },
    checkIfLayerNeedsToTurnOn(layer, value) {
      let e = { target: { checked: true } };

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

    getVectorStyle(service) {
      var color = null;
      if (service.color !== null) {
        color = service.color;
      } else {
        color = this.defaultColorObject;
      }
      var style = new Style({
        fill: new Fill({
          color: color.fill.hex8
        }),
        stroke: new Stroke({
          color: color.border.hex8,
          width: 0.5
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: color.fill.hex8
          }),
          stroke: new Stroke({
            color: color.border.hex8,
            width: 0.5
          })
        })
      });
      return style;
    },

    getLayerZoomLevelOptions(service) {
      return {
        maxResolution: createXYZ().getResolution(service.minZoomLevel) * 1.01,
        minResolution: createXYZ().getResolution(service.maxZoomLevel)
      };
    },
    // getLayerVectorStyle(service) {
    //   return {
    //     fill: new Fill({
    //       color: [203, 194, 185, 1]
    //     }),
    //     stroke: new Stroke({
    //       color: [177, 163, 148, 0.5],
    //       width: 2,
    //       lineCap: "round"
    //     })
    //   };
    // },

    renderNewLayer(service) {
      var isDynamic = layerHelper.isDynamic(service);
      let zoomLevelProperties = this.getLayerZoomLevelOptions(service);
      let new_layer;
      let url = URL + "/api/map/service/" + service.name + "/MapServer/";
      if (isDynamic) {
        if (layerHelper.isLocalService(service)) {
          new_layer = new VectorTileLayer({
            id: service.id,
            ...zoomLevelProperties,
            source: new VectorTileSource({
              format: new MVT({
                geometryName: "geom"
              }),
              url:
                URL +
                "/" +
                MAP_URLS.MVT +
                `/${service.id}/{z}/{x}/{y}/` +
                (service.query.where != ""
                  ? this.objectToQueryString(service.query)
                  : "")
            }),
            style: this.getVectorStyle(service)
          });
        } else {
          new_layer = new ImageLayer({
            ...zoomLevelProperties,
            source: new ImageArcGISRest({
              url: url,
              crossOrigin: "Anonymous",
              params: {
                token: this.token,
                layers: layerHelper.renderArcgisSublayerConfig(service),
                dynamicLayers: layerHelper.renderSubLayersColorString(service)
              }
            })
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
              crossOrigin: "Anonymous"
            })
          });
        } else {
          new_layer = new TileLayer({
            ...zoomLevelProperties,
            source: new TileArcGISRest({
              url: url,
              crossOrigin: "Anonymous",
              params: {
                token: this.token,
                FORMAT: "png8"
              }
            })
          });
        }
      }
      return new_layer;
    },

    addLayers(service, index, dynamic = false) {
      // this.selectedLayersIdHolder(true, service);
      if (service.extent != null) {
        this.mapLayer
          .getView()
          .fit([
            service.extent.minX,
            service.extent.minY,
            service.extent.maxX,
            service.extent.maxY
          ]);
      }

      var new_layer = this.renderNewLayer(service);
      this.getOrderNumber(this.dynamicLayerList, service);

      new_layer.set("name", service.name);
      var zIndex = this.getZIndex(service);
      new_layer.setZIndex(zIndex);

      this.mapLayer.addLayer(new_layer);
    },

    getOrderNumber(array, service) {
      var index = 0;
      var result = 0;
      layerHelper.recursiveLayerMapping(array, function(layer) {
        index++;
        if (layer.name == service.name) {
          result = index;
        }
      });
      return result;
    },
    setZIndex(service) {
      this.mapLayer.getLayers().forEach(layer => {
        if (
          layer.get("name") != undefined &&
          layer.get("name") === service.name
        ) {
          layer.setZIndex(this.getZIndex(service));
        }
      });
    },
    getZIndex(service) {
      let zIndex = 0;
      let orderNo = 0;
      if (layerHelper.isDynamic(service)) {
        zIndex = layerSettings.dynamicZIndex;
        orderNo = this.getOrderNumber(this.dynamicLayerList, service);
      } else {
        zIndex = layerSettings.basemapZIndex;
        orderNo = this.getOrderNumber(this.baseLayerList, service);
      }
      return zIndex - orderNo;
    },

    refreshLayer(service) {
      this.deleteLayers(service);
      this.addLayers(service, service.order, true);
    },
    getLayer(id) {
      let layer = null;
      this.mapLayer.getLayers().forEach(function(lyr) {
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
      let layersToRemove = [];
      let self = this;

      this.mapLayer.getLayers().forEach(function(layer) {
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
      let baseLayerList = this.$store.getters.baseLayerList.map(
        (item, index) => {
          if (service.name === item.name) {
            item.layersVisibility = status;
          }
          return item;
        }
      );
      this.$store.dispatch("SET_BASE_LAYER_LIST", baseLayerList);
    },
    async isLayerColorEnabled(service) {
      let isColorEnabled = false;
      let response = await LayerService.getLayerDynamic({
        token: this.token,
        name: service.name
      });
      if (response.data.layers[0].drawingInfo !== undefined) {
        if (response.data.layers[0].drawingInfo.renderer.symbol !== undefined) {
          if (
            response.data.layers[0].drawingInfo.renderer.symbol.color !==
            undefined
          ) {
            isColorEnabled = true;
          }
        }
      }
      return isColorEnabled;
    },
    async dynamicLayersReset(service, status) {
      if (layerHelper.isDynamicFromArcgis(service)) {
        var isColorEnabled = await this.isLayerColorEnabled(service);
        this.dynamicLayerList = this.recursiveLayerFind(
          this.dynamicLayerList,
          service,
          function(layer) {
            if (layer.layers !== undefined && layer.layers !== null) {
              layer.layers = layer.layers.map((item, index) => {
                return {
                  ...item,
                  isColorEnabled
                };
              });
            }
          }
        );
      }
    },
    async getResponseDynamic(service) {
      let responseDynamic = null;
      if (layerHelper.isDynamicFromArcgis(service)) {
        responseDynamic = await LayerService.getDynamicLayers({
          token: this.token,
          name: service.name
        });
      }
      return responseDynamic;
    },
    recursiveLayerFind(layerArr, service, callback) {
      for (var i = 0; i < layerArr.length; i++) {
        var item = layerArr[i];

        var layer = this.recursiveFind(item, service.name);
        if (callback && typeof callback === "function") {
          if (layer !== undefined && layer !== null) {
            callback(layer);
            break;
          }
        }
      }
      return layerArr;
    },
    recursiveFind(item, name) {
      var isCategory = this.isItemCategory(item);
      if (isCategory) {
        //group
        if (item.layers.some(c => c.name === name)) {
          return item.layers.find(c => c.name === name);
        } else {
          if (item.children && item.children.length > 0) {
            item.children.map(item => this.recursiveFind(item));
          } else {
            return null;
          }
        }
      } //layer
      else {
        if (item.name == name) {
          {
            return item;
          }
        } else {
          return null;
        }
      }
    },

    async selectService(service, index, isDynamic, e, isHashLoaded = true) {
      var isChecked = e.target.checked;

      this.isHashLoaded = isHashLoaded;

      if (layerHelper.isDynamic(service)) {
        let subLayers = null;
        if (isChecked && layerHelper.isDynamicFromArcgis(service)) {
          let subLayerResponse;
          subLayerResponse = await this.getResponseDynamic(service);
          subLayers = subLayerResponse.data.layers;
        }

        this.dynamicLayerList = this.recursiveLayerFind(
          this.dynamicLayerList,
          service,
          async layer => {
            if (layer != null) {
              layer.isSelected = isChecked;

              if (isChecked && layerHelper.isDynamicFromArcgis(layer)) {
                layer.layers = subLayers.map(item =>
                  layerHelper.subLayerMapping(item, layer)
                );
              }
            }
          }
        );
      } else if (layerHelper.isBasemap(service)) {
        this.baseLayerList = this.recursiveLayerFind(
          this.baseLayerList,
          service,
          layer => {
            if (layer != null) {
              layer.isSelected = isChecked;
            }
          }
        );
      }

      if (isChecked) this.addLayers(service, index, isDynamic);
      else this.deleteLayers(service);
    },
    async selectSubService(service, index, id, e) {
      let isChecked = e.target.checked;

      this.dynamicLayerList = this.recursiveLayerFind(
        this.dynamicLayerList,
        service,
        async layer => {
          if (layer != null) {
            var subLayer = layer.layers.find(c => c.id == id);
            subLayer.isSelected = isChecked;
          }
        }
      );

      // let dynamicSubLayerList = this.$store.getters.dynamicSubLayerList;
      // dynamicSubLayerList[service.name][id] = !dynamicSubLayerList[
      //   service.name
      // ][id];
      // this.$store.dispatch("SET_DYNAMIC_SUBLAYER_LIST", dynamicSubLayerList);

      this.deleteLayers(service, false);

      // for (let i in this.dynamicLayerList) {
      //   if (this.dynamicLayerList[i].name === service.name) {
      //     let list = this.dynamicLayerList;
      //     list[i].layersVisibility = true;

      //     break;
      //   }
      // }
      this.dynamicLayersReset(service, isChecked);

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
    saveColor(service, colorObj) {
      const { fillColor, borderColor } = colorObj;
      var isSubLayer = layerHelper.isSublayer(service);
      var layer = isSubLayer ? service.parent : service;

      this.deleteLayers(layer);

      this.dynamicLayerList = this.recursiveLayerFind(
        this.dynamicLayerList,
        layer,
        layer => {
          var color = { fill: fillColor, border: borderColor };
          if (isSubLayer) {
            layer.layers = layer.layers.map((item, index) => {
              if (item.id == service.id) {
                item.color = color;
              }
              return item;
            });
          } else {
            layer.color = color;
          }
        }
      );

      this.addLayers(layer, layer, true);
    }
  },
  computed: {
    defaultColorObject() {
      var fill = this.$store.state.colorPicker.fill;
      var border = this.$store.state.colorPicker.border;
      return { fill, border };
    },
    dataTableVisibility: {
      get() {
        return this.$store.state.dataTable.isVisible;
      },
      set(value) {
        // this.filterQueryIsSum = false;
        this.$store.dispatch("SAVE_DATATABLE_VISIBLE", value);
      }
    },

    focusedPolygonVector: {
      get() {
        return this.$store.state.layers.focusedPolygonVector;
      },
      set(value) {
        this.$store.dispatch("SAVE_FOCUSED_POLYGON_VECTOR", value);
      }
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
    filterQueryIsSum: {
      get() {
        return this.$store.state.filter.filterQueryIsSum;
      },
      set(value) {
        this.$store.dispatch("SAVE_FILTER_QUERY_IS_SUM", value);
      }
    },

    filterQueryArithmeticColumn() {
      return this.$store.state.filter.filterQueryArithmeticColumn;
    },
    dynamicLayerList: {
      get() {
        return this.$store.getters.dynamicLayerList;
      },
      set(val) {
        this.$store.dispatch("SET_DYNAMIC_LAYER_LIST", val);
      }
    },
    baseLayerList: {
      get() {
        return this.$store.getters.baseLayerList;
      },
      set(val) {
        this.$store.dispatch("SET_BASE_LAYER_LIST", val);
      }
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
      return this.$store.state.dataTable.lastBBOXOfShape;
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
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
