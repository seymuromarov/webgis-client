<template>
  <CustomModal
    name="dataModal"
    title="Data Modal"
    width="50%"
    :minHeight="400"
    @beforeShow="onModalOpen"
    @afterHide="onModalClose"
  >
    <form>
      <div class="row form-group">
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-12">
              <label>
                Is Geometry Exist :
                <span v-if="isGeometryExist" class="badge badge-success">
                  true
                </span>
                <span v-else class="badge badge-danger">
                  false
                </span>
              </label>
            </div>
            <!-- <div v-if="isGeometryExist" class="col-md-12">
              <label>
                Geometry (Stringfy):
                <span>
                  {{ stringfyedGeemtry }}
                </span>
              </label>
            </div> -->
          </div>
        </div>
        <div class="col-md-6">
          <div
            class="btn-group btn-group-toggle btn-group-sm float-right"
            role="group"
            aria-label="Basic example"
          >
            <label
              v-if="pointGeometryVisibility"
              class="btn  btn-info "
              v-bind:class="{
                active:
                  isGeometryExist && geometryBtnSelect == drawTypeEnum.POINT,
              }"
            >
              <input
                type="radio"
                name="options"
                :value="drawTypeEnum.POINT"
                @click="drawTypeOnChange"
              />
              <img :src="icons.point" />
            </label>
            <label
              v-if="lineGeometryVisibility"
              class="btn  btn-info "
              v-bind:class="{
                active:
                  isGeometryExist &&
                  geometryBtnSelect == drawTypeEnum.LINESTRING,
              }"
            >
              <input
                type="radio"
                name="options"
                :value="drawTypeEnum.LINESTRING"
                @click="drawTypeOnChange"
              />
              <img :src="icons.line" />
            </label>
            <label
              v-if="polygonGeometryVisibility"
              class="btn  btn-info "
              v-bind:class="{
                active:
                  isGeometryExist && geometryBtnSelect == drawTypeEnum.SQUARE,
              }"
            >
              <input
                type="radio"
                name="options"
                :value="drawTypeEnum.SQUARE"
                @click="drawTypeOnChange"
              />
              <img :src="icons.square" />
            </label>
            <label
              v-if="polygonGeometryVisibility"
              class="btn  btn-info "
              v-bind:class="{
                active:
                  isGeometryExist && geometryBtnSelect == drawTypeEnum.BOX,
              }"
            >
              <input
                type="radio"
                name="options"
                :value="drawTypeEnum.BOX"
                @click="drawTypeOnChange"
              />
              <img :src="icons.rectangle" />
            </label>
            <label
              v-if="polygonGeometryVisibility"
              class="btn  btn-info "
              v-bind:class="{
                active:
                  isGeometryExist && geometryBtnSelect == drawTypeEnum.POLYGON,
              }"
            >
              <input
                type="radio"
                name="options"
                :value="drawTypeEnum.POLYGON"
                @click="drawTypeOnChange"
              />
              <img :src="icons.polygon" />
            </label>
            <label
              v-if="polygonGeometryVisibility"
              class="btn  btn-info "
              v-bind:class="{
                active:
                  isGeometryExist && geometryBtnSelect == drawTypeEnum.CIRCLE,
              }"
            >
              <input
                type="radio"
                name="options"
                :value="drawTypeEnum.CIRCLE"
                @click="drawTypeOnChange"
              />
              <img :src="icons.circle" />
            </label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12" v-for="(item, index) in columns" :key="index">
          <div class="form-group">
            <label :for="item.columnName"> {{ item.columnName }}</label>
            <DynamicFormInput
              :type="item.valueType"
              :name="item.columnName"
              class="form-control"
              @onChange="onInputChange"
            />
          </div>
        </div>
      </div>
      <div class="row ">
        <div class="col-md-12 form-group">
          <!-- Apply button -->

          <button
            type="button"
            class="btn btn-primary float-right"
            @click="onSubmit"
          >
            Apply
          </button>
        </div>
      </div>
    </form>
  </CustomModal>
</template>

<script>
import { Modal as CustomModal } from "@/components";
import {
  tableController,
  toolController,
  modalController,
} from "@/controllers";
import { icons } from "@/constants/assets";
import { drawTypeEnum } from "@/enums";
import datatable from "@/api/datatable";
console.log("datatable", datatable);
import DynamicFormInput from "@/components/renders/DynamicFormInput";
export default {
  components: { CustomModal, DynamicFormInput },
  props: {},
  data() {
    return {
      isModalHidingForGeometrySelection: false,
      columns: [],
      geometryType: "",
      geometry: null,
      geometryBtnSelect: "",
      columnData: [],
      drawTypeEnum,
      icons,
    };
  },
  mounted() {},
  computed: {
    isGeometryExist() {
      return (
        this.geometry &&
        this.geometryBtnSelect &&
        this.geometry.length > 0 &&
        this.geometryBtnSelect !== "" &&
        this.geometryBtnSelect !== drawTypeEnum.NONE
      );
    },
    stringfyedGeemtry() {
      return this.isGeometryExist ? JSON.stringify(this.geometry) : "";
    },

    bbox() {
      return toolController.getBbox();
    },
    activeTableService() {
      return tableController.getTableActiveService();
    },
    pointGeometryVisibility() {
      return this.geometryType && this.geometryType === "point";
    },
    lineGeometryVisibility() {
      return (
        this.geometryType &&
        (this.geometryType === "linestring" ||
          this.geometryType === "multilinestring")
      );
    },
    polygonGeometryVisibility() {
      return (
        this.geometryType &&
        (this.geometryType === "polygon" ||
          this.geometryType === "multipolygon")
      );
    },
  },
  methods: {
    resetData() {
      this.isGeometryExist = false;
      this.isModalHidingForGeometrySelection = false;
      this.columns = [];
      this.geometryType = "";
      this.geometry = null;
      this.columnData = [];
    },
    drawTypeOnChange(e) {
      let value = e.target.value;
      var serviceInfo = {
        id: this.activeTableService.id,
        type: this.activeTableService.type,
      };
      toolController.deleteActiveServiceFeatures();
      if (this.geometryBtnSelect == value) {
        this.geometryBtnSelect = drawTypeEnum.NONE;
        this.geometry == null;

        // layerController.setExtntCoordinates(this.activeService, "");
      } else {
        let featureOptions = {
          forService: serviceInfo,
        };
        this.isModalHidingForGeometrySelection = true;
        modalController.hideDataModal();
        tableController.setTableUnvisible();
        toolController.pickDrawType(
          value,
          () => {
            modalController.showDataModal();
            this.geometryBtnSelect = value;
            this.isModalHidingForGeometrySelection = false;
            // let extentCoordinates = this.bbox;
            this.geometry = this.bbox;

            toolController.pickDrawType(this.drawTypeEnum.NONE);
            tableController.setTableVisible();
          },
          featureOptions
        );
      }
    },
    async onSubmit() {
      let params = {
        columns: this.columnData,
        layerId: this.activeTableService.id,
        geometryType: this.geometryType,
        geometry: this.geometry ? JSON.stringify(this.geometry) : null,
      };
      datatable.addData(params).then((response) => {
        console.log("onSubmit -> response", response);
        modalController.hideDataModal();
      });
    },
    async onModalOpen() {
      if (!this.isModalHidingForGeometrySelection) {
        var activeService = this.activeTableService;
        var tableInfo = await datatable.getTableInfo(activeService.id);
        const { columns, geometryType } = tableInfo.data;
        this.columns = columns;
        this.geometryType = geometryType;
      }
    },
    onModalClose() {
      if (!this.isModalHidingForGeometrySelection) this.resetData();
      this.$emit("close");
    },
    onInputChange(name, val) {
      var isExist = this.columnData.some(
        (c) => c.columnName && c.columnName === name
      );
      if (isExist)
        this.columnData.find((c) => c.columnName === name).value = val;
      else this.columnData.push({ columnName: name, value: val });
    },
  },
};
</script>
