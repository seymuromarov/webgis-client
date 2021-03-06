<template>
  <div class="row container-fluid padding-0">
    <!-- Main content -->
    <div class="padding-0 map-layout">
      <div id="map">
        <div v-if="isMapReady">
          <MapControls />
        </div>
      </div>
    </div>

    <div v-if="isMapReady">
      <Sidebar />
      <!-- Profile Modal -->
      <ProfileModal />
      <ChangePasswordModal />
      <!-- Data table -->
      <DataTable ref="dataTable" />

      <!-- Report -->
      <CustomModal name="sumResultModal" :maxWidth="600">
        <Report v-if="sumData" :result="sumData" />
      </CustomModal>

      <!-- Shape Color Picker -->
      <CustomModal name="colorPickerModal" title="Color picker" :minWidth="300">
        <ShapeColorPicker @setShapeColor="setShapeColor" />
      </CustomModal>

      <!-- Change Detection -->
      <ChangeDetectionModal />

      <NdviAssessment />
      <BlindSpotModal />
      <!-- Information Modal -->
      <InfoModal
        :isOpen="isInformationModalVisible"
        @close="isInformationModalVisible = false"
      />
      <ServiceSelectionModal />
      <!-- Information Modal -->
      <BunchLayerAddModal />

      <ComparerModal />
      <PrintModal />
      <MapText />
    </div>
  </div>
</template>

<script>
// OpenLayers

import {
  Map,
  View,
  Modify,
  defaultInteractions,
  DragRotateAndZoom,
  DragAndDrop,
  TileDebug,
  TileLayer,
  VectorLayer,
  VectorSource,
  fromLonLat,
  defaultControls,
  ScaleLine,
  GPX,
  GeoJSON,
  IGC,
  KML,
  TopoJSON,
  Icon,
  TileGrid,
  createXYZ,
  getProjection,
} from "@/wrappers/openLayerImports";

import {
  ShapeColorPicker,
  DataTable,
  Sidebar,
  FilterModal,
  Report,
  MapControls,
  InfoModal,
  BunchLayerAddModal,
  ChangeDetectionModal,
  NdviAssessment,
  ProfileModal,
  MapText,
  PrintModal,
  ServiceSelectionModal,
  BlindSpotModal,
  ComparerModal,
  ChangePasswordModal,
} from "@/components/";

import {
  toolController,
  mapController,
  serviceController,
  historyController,
} from "@/controllers";

// Services
import { hashService, notifyService } from "@/services";
export default {
  name: "Home",
  components: {
    ShapeColorPicker,
    DataTable,
    ChangeDetectionModal,
    InfoModal,
    Sidebar,
    FilterModal,
    Report,
    MapControls,
    MapText,
    BunchLayerAddModal,
    NdviAssessment,
    ProfileModal,
    ServiceSelectionModal,
    BlindSpotModal,
    ComparerModal,
    PrintModal,
    ChangePasswordModal,
  },
  data() {
    return {
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
      isMapReady: false,
    };
  },

  mounted() {
    let baseLayer = new TileLayer({
      source: mapController.getBaseLayouts()[3].layout,
    });
    var debugLayer = new TileLayer({
      source: new TileDebug({
        projection: "EPSG:3857",
        tileGrid: new TileGrid({
          extent: getProjection("EPSG:3857").getExtent(),
          resolutions: createXYZ()
            .getResolutions()
            .slice(1),
        }),
      }),
    });

    this.hashResolveResult = hashService.resolveHash();
    this.scaleOptions = new ScaleLine({
      units: "metric",
    });
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

      this.mapLayer = new Map({
        interactions: defaultInteractions().extend([
          new DragRotateAndZoom(),
          // new MouseWheelZoom({
          //   constrainResolution: true,
          // }),
          dragAndDropInteraction,
        ]),
        controls: defaultControls().extend([this.scaleOptions]), // defaultControls(), //.extend([new FullScreen()]),
        target: "map",
        layers: this.layers,
        view: new View({
          constrainResolution: true,
          center: center,
          zoom: zoom,
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

      this.mapLayer.on("singleclick", mapController.onMapClick);

      this.$store.dispatch("init").then(() => {
        if (this.hashResolveResult !== null)
          serviceController.setServicesStatusByIds(
            this.hashResolveResult.selectedLayers,
            true
          );
        const defaultLayers = [
          ...this.$store.getters.defaultDynamicLayerIds,
          ...this.$store.getters.defaultBaseLayerIds,
        ];
        ``;
        serviceController.setServicesStatusByIds(defaultLayers, true);
        self.mapLayer.on("moveend", () => {
          historyController.updateHistoryMap();
        });
      });
      window.addEventListener("popstate", (event) => {
        if (event.state === null) {
          return;
        }
        this.mapLayer.getView().setCenter(event.state.center);
        this.mapLayer.getView().setZoom(event.state.zoom);
        this.mapLayer.getView().setRotation(event.state.rotation);
      });

      this.isMapReady = true;
    });
  },
  methods: {
    setShapeColor() {
      document.body.style.cursor = "crosshair";
      this.$moodal.colorPickerModal.hide();
      toolController.setColorPickStatus(true);
    },

    dragAndDropToast() {
      notifyService.info(
        "Drag & drop GPX, GeoJSON, IGC, KML, TopoJSON files over map"
      );
    },
  },
  computed: {
    scaleOptions: {
      get() {
        return this.$store.getters.scaleOptions;
      },
      set(value) {
        this.$store.dispatch("saveScaleOptions", value);
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

    drawSource: {
      get() {
        return this.$store.getters.drawSource;
      },
      set(value) {
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

    sumData() {
      return this.$store.getters.sumData;
    },
    shapeBorderColor() {
      return this.$store.state.shapeBorderColor;
    },
    shapeFillColor() {
      return this.$store.state.shapeFillColor;
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
