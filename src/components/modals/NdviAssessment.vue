<template>
  <CustomModal
    name="ndviAssessmentModal"
    title="NDVI Assessment"
    width="95%"
    :minHeight="400"
    @beforeShow="onModalOpen"
    @afterHide="onModalClose"
  >
    <form>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="ndvis">Layers</label>
            <div class="d-block">
              <div class="row">
                <div class="col-md-9 p-0">
                  <Multiselect
                    id="ndvis"
                    style="display:inline-block;"
                    placeholder="Select Ndvis"
                    v-model="selectedNdvis"
                    :options="options"
                    :multiple="true"
                    :close-on-select="false"
                    :custom-label="ndviCustomLabel"
                    label="ndvi"
                    track-by="ndvi"
                    @input="onChange"
                  />
                </div>
                <div
                  class="col-md-3 p-0 "
                  v-bind:class="{
                    active: isPointExist,
                  }"
                >
                  <div class="text-center">
                    <div class="btn-group-toggle" data-toggle="buttons">
                      <label class="btn btn-info  mr-2">
                        <input
                          type="checkbox"
                          name="pointSelectionBtn"
                          :value="drawTypeEnum.POINT"
                          @click="onPointSelection"
                        />
                        <img :src="icons.point" />
                      </label>
                      <label
                        class="btn   mr-2"
                        v-bind:class="{
                          active: isPointExist,
                          'btn-success': !isBasemapsShowing,
                          'btn-danger': isBasemapsShowing,
                        }"
                      >
                        <input type="checkbox" v-model="isBasemapsShowing" />
                        {{
                          isBasemapsShowing ? "Hide Basemaps" : "Show Basemaps"
                        }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <small v-if="isPointExist" class="form-text text-muted">
                Point Location | x : {{ pointCoordinates[0] }} , y :
                {{ pointCoordinates[1] }}
              </small>
            </div>
          </div>
        </div>
      </div>

      <div
        style="
        display:flex;
        flex-direction:row;
        justify-content: space-around;
        align-items:baseline"
      >
        <div
          v-for="(item, index) in selectedNdvis"
          :key="index"
          style="margin:0px 10px;padding:10px;background-color:#cccccc33"
        >
          <div style="margin:5px 0px">
            <h5 class="text-center">{{ item.ndvi.name }}</h5>
            <img class="img-responsive mw-100" :src="getImgUrl(item.ndvi)" />
          </div>

          <div
            style="
        display:flex;
        flex-direction:column; "
            :class="{
              'd-none': !isBasemapsShowing,
            }"
          >
            <div v-for="(basemap, index) in item.basemaps" :key="index">
              <div style="margin:5px 0px">
                <h6 class="text-center">{{ basemap.name }}</h6>
                <img class="img-responsive mw-100" :src="getImgUrl(basemap)" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12" v-if="isChartVisible">
          <line-chart
            :chart-data="chartData"
            :options="chartOptions"
            :height="100"
          ></line-chart>
        </div>
      </div>
    </form>
  </CustomModal>
</template>

<script>
import { Modal as CustomModal } from "@/components";
import layer from "@/api/layer";
import ndvi from "@/api/ndvi";
import { layerHelper, mapHelper, urlHelper } from "@/helpers";
import { arcgisImgExportSettings } from "@/config/settings";
import { toolController, modalController, ndviController } from "@/controllers";
import { ARCGIS_URLS } from "@/config/urls";
import { icons } from "@/constants/assets";
import { drawTypeEnum } from "@/enums";
import Multiselect from "vue-multiselect";

import { LineChart } from "@/charts";

export default {
  components: {
    CustomModal,
    Multiselect,
    LineChart,
  },
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      icons,
      drawTypeEnum,
      options: [],
      selectedNdvis: [],
      chartData: null,
      isPointValueExist: false,
      chartOptions: {
        title: {
          display: true,
          text: "Ndvi Data",
        },
      },
      pointCoordinates: null,
      isModalHidingForPoint: false,
      isCalculating: false,
      isBasemapsShowing: true,
    };
  },
  mounted() {
    this.getNdvis();
  },

  methods: {
    resetData() {
      this.selectedNdvis = [];
      this.chartData = null;
      this.pointCoordinates = null;
      this.isModalHidingForPoint = false;
    },
    async getNdvis() {
      let { data } = await ndvi.getNdvis();
      data = data.map((item) => {
        item.basemaps = item.basemaps.map((x) => layerHelper.basemapMapping(x));
        item.ndvi = layerHelper.basemapMapping(item.ndvi);
        return item;
      });

      this.options = data;
    },
    onPointSelection(e) {
      let value = e.target.value;

      this.isModalHidingForPoint = true;
      modalController.hideNdviAssessmentModal();
      toolController.pickDrawType(value, () => {
        modalController.showNdviAssessmentModal();
        this.isModalHidingForPoint = false;

        this.pointCoordinates = this.bbox;
        this.buildGraph();
        toolController.pickDrawType(drawTypeEnum.NONE);
      });
    },
    async onChange() {
      if (this.isPointExist) await this.buildGraph();
    },

    calculateGraphData(selecteds) {
      let obj = [];
      let count = 0;
      return new Promise((resolve, reject) => {
        selecteds.forEach(async (element) => {
          let x = this.pointCoordinates[0];
          let y = this.pointCoordinates[1];
          let value = await ndvi.getNdviValue(element.ndvi.name, x, y);
          obj.push({ value, label: element.ndvi.name, service: element });

          count++;
          if (count === selecteds.length) {
            resolve(obj);
          }
        });
      });
    },
    calculateNdviValue(R, G, B, IR) {
      console.log("calculateNdviValue -> R, G, B, IR", R, G, B, IR);
      return (IR - R) / (IR + R);
    },
    orderGraphDataBySelecteds(selecteds, graphData) {
      let orderedList = [];
      selecteds.forEach((service) => {
        var item = graphData.find(
          (c) => c.service.ndvi.name == service.ndvi.name
        );
        if (item) orderedList.push(item);
      });
      return orderedList;
    },
    async buildGraph() {
      this.isCalculating = true;
      let selecteds = this.selectedNdvis;

      this.calculateGraphData(selecteds).then((res) => {
        let orderedList = this.orderGraphDataBySelecteds(selecteds, res);

        let values = [];
        let labels = [];

        orderedList.forEach((c) => {
          const { red, green, blue, alpha } = c.value;
          let ndviVal = this.calculateNdviValue(red, green, blue, alpha);
          console.log("buildGraph -> ndviVal", ndviVal);
          values.push(ndviVal);
          labels.push(c.label);
        });

        let dataset = {
          label: "NDVI Index Value",
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: "rgba(50, 115, 220, 0.1)",
          data: values,
        };

        this.chartData = {
          labels: labels,
          datasets: [dataset],
        };

        this.isCalculating = false;
      });
    },
    ndviCustomLabel(item) {
      return item.ndvi.name;
    },
    getImgUrl(basemap) {
      var params = arcgisImgExportSettings;
      var extent = mapHelper.bboxToExtent(ndviController.getNdviExtent());
      params["token"] = tokenService.getToken();
      params["bbox"] = extent.toString();
      var queryString = urlHelper.formatQueryString(params);

      let arcgisImgUrl = ARCGIS_URLS.EXPORT_IMAGE_URL(basemap.name, params);
      // let defaultImgUrl = "https://i.picsum.photos/id/608/256/256.jpg";
      return arcgisImgUrl;
    },
    getRandomInt() {
      let min = -1;
      let max = 1;
      return (Math.random() * (max - min) + min).toFixed(5);
      // return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    onModalOpen() {
      if (!this.isModalHidingForPoint) {
        let bbox = toolController.getBbox();
        ndviController.setNdviExtent(toolController.getBbox());
      }
    },
    onModalClose() {
      if (!this.isModalHidingForPoint) this.resetData();
      this.$emit("close");
    },
  },

  computed: {
    bbox() {
      return toolController.getBbox();
    },
    isChartVisible() {
      return (
        !this.isCalculating &&
        this.chartData &&
        this.chartData.labels.length > 0 &&
        this.isPointExist
      );
    },
    isPointExist() {
      return this.pointCoordinates && this.pointCoordinates.length > 0;
    },
  },
};
</script>
