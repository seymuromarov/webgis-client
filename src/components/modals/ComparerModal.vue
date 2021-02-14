<template>
  <CustomModal
    name="comparerModal"
    title="Swap Image"
    width="50%"
    :minHeight="500"
    @afterOpen="afterModalOpen"
    @afterHide="onModalClose"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <form>
            <div class="row">
              <div class="col-md-12">
                <v-select
                  v-model="selecteds"
                  multiple
                  placeholder="Choose up to 2 basemaps!"
                  :options="basemaps"
                  :selectable="() => selecteds.length < 2"
                  @input="onChange"
                ></v-select>
              </div>
            </div>
          </form>
        </div>
        <div v-show="isSwipeReady" class="col-md-12">
          <div id="swipeMap"></div>
          <input type="range" class="form-range w-100" v-model="swipeValue" />
        </div>
      </div>
    </div>
  </CustomModal>
</template>

<script>
import {
  Map,
  View,
  getRenderPixel,
  TileLayer,
} from "@/wrappers/openLayerImports";
import "juxtaposejs/build/js/juxtapose.min.js";
import VueCompareImage from "vue-compare-image";
import {
  mapController,
  layerController,
  toolController,
  modalController,
} from "@/controllers";
import { drawTypeEnum, resourceTypeEnum } from "@/enums";
import { icons } from "@/constants/assets";
import { urlHelper, mapHelper } from "@/helpers";
import { resourceTypeToEnum } from "@/utils/resourceTypeToEnum";
export default {
  name: "ComparerModal",
  components: { VueCompareImage },
  data() {
    return {
      swipeMap: null,

      drawTypeEnum,
      icons,
      extent: null,
      selecteds: [],
      leftImage: "",
      rightImage: "",
      isModalHideForExtent: false,
      juxtapose: null,
      isVertical: true,
      isSwipeReady: false,
      swipeValue: 50,
      juxtaposeOptions: {
        animate: true,
        showLabels: false,
        showCredits: false,
        makeResponsive: true,
        mode: "vertical",
      },
    };
  },
  watch: {
    swipeValue: {
      deep: true,
      handler(val) {
        this.swipeMap.render();
      },
    },
  },
  created() {},
  mounted() {},
  computed: {
    currentZoomLevel() {
      return mapController.getCurrentZoomLevel();
    },
    currentCenter() {
      return mapController.getCurrentCenter();
    },
    selectedBasemaps() {
      return basemaps;
    },
    basemaps() {
      var basemaps = layerController.getBaseLayersWithoutCategory().map((c) => {
        return {
          code: c.id,
          label: c.name,
          resourceType: c.resourceType,
        };
      });
      return basemaps;
    },
    bbox() {
      return toolController.getBbox();
    },
  },
  methods: {
    afterModalOpen() {},

    onModalClose() {},
    onChange(selecteds) {
      if (selecteds.length == 2) {
        this.isSwipeReady = true;
      } else {
        this.isSwipeReady = false;
      }

      if (this.isSwipeReady) {
        const swipeMapId = "swipeMap";
        document.getElementById(swipeMapId).innerHTML = "";

        this.swipeMap = new Map({
          maxResolution: 1000,
          view: new View({
            center: this.currentCenter,
            zoom: this.currentZoomLevel,
          }),
        });

        setTimeout(() => {
          this.swipeMap.setTarget(document.getElementById(swipeMapId));

          var leftService = layerController.getBaseLayer(selecteds[0].code);

          var rightService = layerController.getBaseLayer(selecteds[1].code);
          var leftLayer = mapController.buildLayer(leftService);

          var rightLayer = mapController.buildLayer(rightService);

          this.swipeMap.addLayer(leftLayer);
          this.swipeMap.addLayer(rightLayer);
          rightLayer.on("prerender", (event) => {
            var ctx = event.context;
            var mapSize = this.swipeMap.getSize();

            var width = mapSize[0] * (this.swipeValue / 100);
            var tl = getRenderPixel(event, [width, 0]);
            var tr = getRenderPixel(event, [mapSize[0], 0]);
            var bl = getRenderPixel(event, [width, mapSize[1]]);
            var br = getRenderPixel(event, mapSize);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(tl[0], tl[1]);
            ctx.lineTo(bl[0], bl[1]);
            ctx.lineTo(br[0], br[1]);
            ctx.lineTo(tr[0], tr[1]);
            ctx.closePath();
            ctx.clip();
          });

          rightLayer.on("postrender", function(event) {
            var ctx = event.context;
            ctx.restore();
          });
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#swipeMap {
  height: 70vh;
  width: 100%;
}

.juxtapose-container {
  background: rgba($color: #aaaaaa, $alpha: 0.3);
}
::v-deep .jx-knightlab {
  display: none !important;
}
</style>
