<template>
  <CustomModal
    name="comparerModal"
    title="Swap Image"
    width="50%"
    :minHeight="500"
    @beforeShow="onModalOpen"
    @afterHide="onModalClose"
  >
    <form>
      <div class="row">
        <div class="col-md-9">
          <v-select
            v-model="selecteds"
            multiple
            placeholder="Choose up to 2 basemaps!"
            :options="basemaps"
            :selectable="() => selecteds.length < 2"
            @input="onChange"
          ></v-select>
          <span class="text-muted form-text" style="font-size:0.7rem"
            >Extent Area : {{ JSON.stringify(extent) }}</span
          >
        </div>
        <div class="col-md-3">
          <button
            type="button"
            class="btn btn-info btn-sm mr-2"
            @click="onExtentClick"
          >
            <img :src="icons.square" />
          </button>
          <button
            type="button"
            class="btn btn-info btn-sm mr-2"
            @click="changeRotation"
          >
            <img :src="icons.swap" />
          </button>
        </div>
      </div>
      <div class="row juxtapose-container">
        <div class="col-md-12">
          <div v-if="juxtapose" class="juxtapose" id="juxtapose"></div>
          <!-- <div class="rotate-vci-container">
            <VueCompareImage :leftImage="leftImage" :rightImage="rightImage" />
          </div> -->
        </div>
      </div>
    </form>
  </CustomModal>
</template>

<script>
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
export default {
  name: "ComparerModal",
  components: { VueCompareImage },
  data() {
    return {
      drawTypeEnum,
      icons,
      extent: null,
      selecteds: [],
      leftImage: "",
      rightImage: "",
      isModalHideForExtent: false,
      juxtapose: null,
      isVertical: true,

      juxtaposeOptions: {
        animate: true,
        showLabels: false,
        showCredits: false,
        makeResponsive: true,
        mode: "vertical",
      },
    };
  },
  computed: {
    selectedBasemaps() {
      return basemaps;
    },
    basemaps() {
      var basemaps = layerController.getBaseLayersWithoutCategory().map((c) => {
        return {
          code: c.id,
          label: c.name,
        };
      });
      return basemaps;
    },
    bbox() {
      return toolController.getBbox();
    },
  },
  methods: {
    removeElementsByClass(className) {
      var elements = document.getElementsByClassName(className);
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    },

    renderJuxtapose() {
      this.juxtapose = false;
      this.removeElementsByClass("jx-slider");
      if (this.leftImage && this.rightImage) {
        if (this.isVertical) this.juxtaposeOptions["mode"] = "vertical";
        else this.juxtaposeOptions["mode"] = "horizontal";
        this.juxtapose = new juxtapose.JXSlider(
          "#juxtapose",
          [
            {
              src: this.leftImage,
            },
            {
              src: this.rightImage,
            },
          ],
          this.juxtaposeOptions
        );
      }
    },
    onExtentClick() {
      modalController.hideComparerModal();
      this.isModalHideForExtent = true;
      let options = {
        name: "comparermodal",
      };
      toolController.deleteFeatureByName("comparermodal");

      toolController.pickDrawType(
        drawTypeEnum.BOX,
        () => {
          modalController.showComparerModal();
          this.extent = mapHelper.bboxToExtent(this.bbox);
          this.isModalHideForExtent = false;
          this.reload();
        },
        options
      );
    },
    onModalOpen() {
      if (!this.isModalHideForExtent) {
        this.extent = mapController.getCurrentExtent();
        this.selecteds = layerController
          .getSelectedBasemaps()
          .map((c) => {
            return {
              code: c.id,
              label: c.name,
            };
          })
          .slice(0, 2);

        this.reload();
      }
    },
    reset() {
      this.leftImage = "";
      this.rightImage = "";
    },
    changeRotation() {
      this.juxtapose = false;
      this.isVertical = !this.isVertical;

      this.reload();
    },
    reload() {
      if (this.selecteds.length == 2) {
        this.leftImage = urlHelper.getImageUrl(
          this.selecteds[0].label,
          this.extent,
          resourceTypeEnum.ARCGIS
        );

        this.rightImage = urlHelper.getImageUrl(
          this.selecteds[1].label,
          this.extent,
          resourceTypeEnum.ARCGIS
        );
      } else this.reset();

      this.renderJuxtapose();
      this.$forceUpdate();
    },
    onModalClose() {},
    onChange(selecteds) {
      this.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.juxtapose-container {
  background: rgba($color: #aaaaaa, $alpha: 0.3);
}
::v-deep .jx-knightlab {
  display: none !important;
}
</style>
