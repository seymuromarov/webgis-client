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
    <DataTable ref="dataTable" />

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
    <BlindSpotModal />
    <!-- Information Modal -->
    <InfoModal
      :isOpen="isInformationModalVisible"
      @close="isInformationModalVisible = false"
    />
    <ServiceSelectionModal />
    <!-- Information Modal -->
    <ComputedLayersModal />

    <ComparerModal />

    <MapTextModal />
  </div>
</template>

<script>
// OpenLayers

import {
  Map,
  View,
  Feature,
  Polygon,
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
  OSM,
  VectorSource,
  fromLonLat,
  transform,
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
  ProfileModal,
  MapTextModal,
  ServiceSelectionModal,
  BlindSpotModal,
  ComparerModal,
} from "@/components/";

import { serviceHelper } from "@/helpers";
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
    MapTextModal,
    ComputedLayersModal,
    NdviAssessment,
    ProfileModal,
    ServiceSelectionModal,
    BlindSpotModal,
    ComparerModal,
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
      scaleLineOptions: new ScaleLine({
        units: "metric",
        // bar: true,
        // steps: 4,
        // text: true,
        // minWidth: 140,
      }),
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
        tileGrid: new TileGrid({
          extent: getProjection("EPSG:3857").getExtent(),
          resolutions: createXYZ()
            .getResolutions()
            .slice(1),
        }),
      }),
    });

    this.moodal = this.$moodal;

    this.hashResolveResult = hashService.resolveHash();

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
      this.layers = [baseLayer, this.vector, debugLayer];
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

        controls: defaultControls().extend([this.scaleLineOptions]), // defaultControls(), //.extend([new FullScreen()]),
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
      this.mapLayer.on("click", mapController.onMapClick);

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

    isDrawnShapeForDetection: {
      get() {
        return toolController.getDrawForChangeDetectionStatus();
      },
      set(value) {
        toolController.setDrawForChangeDetectionStatus(value);
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
