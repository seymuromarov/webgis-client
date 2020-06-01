<template>
  <CustomModal
    name="ndviAssessmentModal"
    title="NDVI Assessment"
    :width="1200"
    :minHeight="400"
    @afterHide="onModalClose"
  >
    <form>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="ndvis">Layers</label>
            <div class="d-block">
              <div class="row">
                <div class="col-md-11 p-0">
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
                <div class="col-md-1 p-0 ">
                  <div class="text-center">
                    <div class="btn-group-toggle" data-toggle="buttons">
                      <label
                        class="btn btn-info"
                        v-bind:class="{
                          active: isPointValueExist,
                        }"
                      >
                        <input
                          type="checkbox"
                          name="pointSelectionBtn"
                          :value="drawTypeEnum.POINT"
                          @click="onPointSelection"
                        />
                        <img :src="icons.point" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-md-12"
          v-for="(item, index) in selectedNdvis"
          :key="index"
        >
          <div class="row">
            <div class="col-md-12 center-block text-center my-2">
              <h3>{{ item.ndvi.name }}</h3>
            </div>
          </div>
          <div class="row">
            <div
              class="col-md-3 center-block text-center my-2"
              v-for="(basemap, index) in item.basemaps"
              :key="index"
            >
              <h6>{{ basemap.name }}</h6>
              <img class="img-responsive mw-100" :src="getImgUrl(basemap)" />
            </div>
          </div>

          <br />
        </div>
        <div class="col-md-12" v-if="chartData && chartData.labels.length > 0">
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
import { ndviService, tokenService, layerService } from "@/services";
import { layerHelper, mapHelper, urlHelper } from "@/helpers";
import { arcgisImgExportSettings } from "@/config/settings";
import { toolController, modalController } from "@/controllers";
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
          text: "My Data",
        },
      },
    };
  },
  mounted() {
    this.getNdvis();
  },
  methods: {
    resetData() {
      this.selectedNdvis = [];
      this.chartData = null;
    },
    async getNdvis() {
      let { data } = await ndviService.getNdvis();
      data = data.map((item) => {
        item.basemaps = item.basemaps.map((x) => layerHelper.basemapMapping(x));
        item.ndvi = layerHelper.basemapMapping(item.ndvi);
        return item;
      });

      this.options = data;
    },
    onPointSelection(e) {
      let value = e.target.value;
      console.log("onPointSelection -> value", value);
      let isChecked = e.target.checked;
      this.isPointValueExist = isChecked;
      modalController.hideNdviAssessmentModal();
      toolController.pickDrawType(value, () => {
        modalController.showNdviAssessmentModal();
        // this.extentType = value;

        let pointCoordinates = this.bbox;
        console.log("onPointSelection -> extentCoordinates", pointCoordinates);
        this.buildPointDataUrl(pointCoordinates);
        // serviceController.setExtentCoordinates(
        //   this.activeService,
        //   JSON.stringify(extentCoordinates)
        // );

        // toolController.pickDrawType(this.drawTypeEnum.NONE);
        // tableController.setTableVisible();
        // filterController.setIsRequiredServiceRefresh(true);
      });

      // modalController.hideFilterModal();
    },
    onChange(selecteds) {
      let labels = [];
      let values = [];

      selecteds.forEach((element) => {
        values.push(this.getRandomInt());
        labels.push(element.ndvi.name);
      });

      let dataset = {
        label: "NDVI Index Data",
        backgroundColor: "rgba(244,67,54 , 0.7)",
        borderColor: "rgb(244,67,54)",
        pointBackgroundColor: "rgb(229,115,115)",
        data: values,
      };
      this.chartData = { labels: labels, datasets: [dataset] };
    },
    ndviCustomLabel(item) {
      return item.ndvi.name;
    },
    getImgUrl(basemap) {
      var params = arcgisImgExportSettings;
      var extent = mapHelper.bboxToExtent(this.bbox);
      params["token"] = tokenService.getToken();
      params["bbox"] = extent.toString();
      var queryString = urlHelper.formatQueryString(params);

      let arcgisImgUrl = ARCGIS_URLS.EXPORT_IMAGE_URL(basemap.name, params);
      console.log("getImgUrl -> arcgisImgUrl", arcgisImgUrl);
      let defaultImgUrl = "https://i.picsum.photos/id/608/256/256.jpg";
      // let url = "";

      // var isImageExist = urlHelper.checkImageExists(arcgisImgUrl);
      // console.log("getImgUrl -> isImageExist", isImageExist);

      // return "https://i.picsum.photos/id/608/256/256.jpg";
      return arcgisImgUrl;
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },

    async buildPointDataUrl(coords) {
      let geometry = coords.toString();
      var params = {
        token: tokenService.getToken(),
        name: "ndvi0426",
        layer: "ndvi0426",
        where: "",
        geometry: geometry,
      };
      let response = await layerService.getGeometryData(params);
      console.log("buildPointDataUrl -> response", response);
    },

    onModalClose() {
      this.resetData();
      this.$emit("close");
    },
  },

  computed: {
    bbox() {
      return toolController.getBbox();
    },
  },
};
</script>
