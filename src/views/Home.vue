<template>
  <div class="row container-fluid padding-0">
    <!-- Main content -->
    <div class="padding-0 map-layout">
      <div id="map">
        <MapControls />
        <!-- <Sidebar @setBaseLayout="setBaseLayout" /> -->
        <Sidebar />
      </div>
    </div>
    <!-- Profile Modal -->
    <ProfileModal />
    <!-- Data table -->
    <DataTable ref="dataTable" @mapSetCenter="mapSetCenter" />

    <!-- Report -->
    <CustomModal name="sumResultModal" :maxWidth="600">
      <Report :result="sumData" />
    </CustomModal>

    <!-- Filter -->
    <FilterModal />

    <!-- Shape Color Picker -->
    <CustomModal name="colorPickerModal" title="Color picker" :minWidth="300">
      <ShapeColorPicker @setShapeColor="setShapeColor" />
    </CustomModal>

    <!-- Change Detection -->
    <detector-modal
      :visible="bbox.length > 0 && isDrawnShapeForDetection"
      v-bind="{ bbox, token }"
      @close="(bbox = []) & (isDrawnShapeForDetection = false)"
    ></detector-modal>

    <NdviAssessment />
    <DataAddEditModal />
    <ImageUploadModal v-if="tableActiveService && tableActiveService.id" />
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
  Style,
  Stroke,
  Fill,
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
  Icon,
  Projection,
} from "@/wrappers/openLayerImports";

// Custom components
import {
  ShapeColorPicker,
  DataTable,
  Sidebar,
  FilterModal,
  Report,
  MapControls,
  InfoModal,
  ComputedLayersModal,
  ChangeDetector as DetectorModal,
  NdviAssessment,
  DataAddEditModal,
  ImageUploadModal,
  ProfileModal,
} from "@/components/";

import { toggler, serviceHelper } from "@/helpers";
import {
  layerController,
  tableController,
  toolController,
  mapController,
  serviceController,
  historyController,
} from "@/controllers";

// Services
import { tokenService, hashService } from "@/services";
import layer from "@/api/layer";
export default {
  name: "Home",
  components: {
    ShapeColorPicker,
    DataTable,
    DetectorModal,
    InfoModal,
    Sidebar,
    FilterModal,
    Report,
    MapControls,
    ComputedLayersModal,
    NdviAssessment,
    DataAddEditModal,
    ImageUploadModal,
    ProfileModal,
  },
  data() {
    return {
      toggler: null,
      latChange: null,
      longChange: null,

      layers: [],
      token: null,
      kmlInfo: null,
      vector: null,
      vectorSource: null,
      vectorLayer: null,
      hashResolveResult: {},

      isMetricCoordinateSystem: false,
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

    this.hashResolveResult = hashService.resolveHash();

    this.toggler = new toggler(this);

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
          : //: [47.82858, 40.3598414];
            fromLonLat([47.82858, 40.3598414]);
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
          //projection: "EPSG:4326",
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
      });

      this.mapLayer.on("click", (evt) => {
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
          self.mapLayer.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
            try {
              this.drawSource.removeFeature(feature);
              let elem = document.getElementsByClassName(
                `feature-${feature.get("id")}`
              );
              elem[0].remove();
            } catch (e) {}
          });
        }
        if (self.isColorPick) {
          self.mapLayer.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
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
          mapController.focusToServicePolygon(evt.pixel);
        }
      });

      this.$store.dispatch("init").then(() => {
        serviceController.setServicesStatusByIds(
          this.hashResolveResult.selectedLayers,
          true
        );
        const defaultLayers = [
          ...this.$store.getters.defaultDynamicLayerIds,
          ...this.$store.getters.defaultBaseLayerIds,
        ];
        serviceController.setServicesStatusByIds(defaultLayers, true);
        self.mapLayer.on("moveend", historyController.updateHistoryMap);
      });
      window.addEventListener("popstate", (event) => {
        if (event.state === null) {
          return;
        }
        this.mapLayer.getView().setCenter(event.state.center);
        this.mapLayer.getView().setZoom(event.state.zoom);
        this.mapLayer.getView().setRotation(event.state.rotation);
      });
    });
  },
  methods: {
    setShapeColor() {
      document.body.style.cursor = "crosshair";
      this.$moodal.colorPickerModal.hide();
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
      }
    },

    async getGeometryData(coords) {
      let response = null;
      let geometry = null;
      let service = this.tableActiveService;
      if (serviceHelper.isLayer(service)) {
        if (serviceHelper.isDynamicFromArcgis(service)) {
          geometry = coords[0] + "," + coords[1];
          var params = {
            token: tokenService.getToken(),
            name: service.name,
            layer: service.name,
            where: service.query.where,
            geometry: geometry,
          };
          response = await layer.getGeometryData(params);
        } else {
          var params = {
            layerId: service.id,
            where: service.query.where,
            geometry: coords[0] + "," + coords[1],
          };
          response = await layer.getLocalTableData(params);
        }
        if (response.data.totalCount > 0) {
          let features = response.data.features[0];
          this.$refs.dataTable.showDataModal(features.attributes);
          this.mapSetCenter(features);
        }
      }
    },
  },
  computed: {
    isMarker: {
      get() {
        return toolController.getMarkerStatus();
      },
      set(value) {
        toolController.setMarkerStatus(value);
      },
    },
    isRemove: {
      get() {
        return toolController.getRemoveStatus();
      },
      set(value) {
        toolController.setRemoveStatus(value);
      },
    },
    isColorpick: {
      get() {
        return toolController.getColorPickStatus();
      },
      set(value) {
        toolController.setColorPickStatus(value);
      },
    },
    moodal: {
      get() {
        return this.$store.getters.moodal;
      },
      set(value) {
        this.$store.dispatch("saveMoodal", value);
      },
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
    isDrawnShapeForDetection: {
      get() {
        return toolController.getDrawForChangeDetectionStatus();
      },
      set(value) {
        // this.filterQueryIsSum = false;
        toolController.setDrawForChangeDetectionStatus(value);
      },
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
    selectionLayer: {
      get() {
        return this.$store.getters.selectionLayer;
      },
      set(value) {
        // this.filterQueryIsSum = false;
        this.$store.dispatch("saveSelectionLayer", value);
      },
    },

    dataTableVisibility: {
      get() {
        return tableController.getTableVisibility();
      },
      set(value) {
        if (value) {
          tableController.setTableVisible();
        } else {
          tableController.setTableUnvisible();
        }
      },
    },

    sumData() {
      return this.$store.getters.sumData;
    },
    shapeBorderColor() {
      return this.$store.state.shapeBorderColor;
    },
    shapeFillColor() {
      return this.$store.state.shapeFillColor;
    },

    editDataGid() {
      let data = tableController.getEditDataGid();
      return data;
    },
    bbox: {
      get() {
        return toolController.getBbox();
      },
      set(value) {
        toolController.setBbox(value);
      },
    },
  },
};
</script>
