<template>
  <div>
    <CustomModal
      name="dataAddEditModal"
      :title="$t('form.dataForm.modalTitle')"
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
                  {{ $t("form.dataForm.isGeometryExist") }} :
                  <span v-if="isGeometryExist" class="badge badge-success">
                    {{ $t("general.true") }}
                  </span>
                  <span v-else class="badge badge-danger">
                    {{ $t("general.false") }}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12">
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
                        isGeometryExist &&
                        geometryBtnSelect == drawTypeEnum.POINT,
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
                        isGeometryExist &&
                        geometryBtnSelect == drawTypeEnum.SQUARE,
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
                        isGeometryExist &&
                        geometryBtnSelect == drawTypeEnum.BOX,
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
                        isGeometryExist &&
                        geometryBtnSelect == drawTypeEnum.POLYGON,
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
                        isGeometryExist &&
                        geometryBtnSelect == drawTypeEnum.CIRCLE,
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
              <div class="col-md-12 mt-1">
                <button
                  type="button"
                  class="btn btn-primary float-right"
                  @click="showGeometryModal"
                >
                  Geometry
                </button>
              </div>
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
                :value="isEdit ? item.value : null"
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
              {{ $t("button.apply") }}
            </button>
          </div>
        </div>
      </form>
    </CustomModal>
    <CustomModal
      name="geometryModal"
      title="Geometry Modal"
      width="70%"
      :minHeight="400"
      @afterHide="onGeometryModalClose"
    >
      <div class="row">
        <div class="col-md-6">
          <label>
            Geometry Type :

            <span class="badge badge-info">
              {{ geometryType }}
            </span>
          </label>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="label"></label>
            <button
              v-show="geometry && geometry.length > 0"
              type="button"
              class="btn btn-danger float-right"
              @click="resetCoordinates"
            >
              {{ $t("form.dataForm.resetCoordinate") }}
            </button>
          </div>
        </div>
        <div v-if="isGeometryExist" class="col-md-12">
          <div v-if="geometryType == 'point'" class="row">
            <div class="col-md-5">
              <div class="form-group">
                <label for="label">X</label>
                <input
                  type="number"
                  step=".00000000001"
                  class="form-control"
                  id="label"
                  v-model.number="geometry[0]"
                />
              </div>
            </div>
            <div class="col-md-5">
              <div class="form-group">
                <label for="label">Y</label>
                <input
                  type="number"
                  step=".00000000001"
                  class="form-control"
                  id="label"
                  v-model.number="geometry[1]"
                />
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <label for="label"></label>
                <button
                  type="button"
                  class="btn btn-danger d-block mt-2"
                  @click="deleteCoordinate"
                >
                  <i title="Edit Data" class="fas fa-trash-alt" />
                </button>
              </div>
            </div>
          </div>
          <div
            v-else
            v-for="(item, index) in geometry"
            class="row"
            :key="index"
          >
            <div class="col-md-5">
              <div class="form-group">
                <label for="label">X</label>
                <input
                  type="number"
                  step=".00000000001"
                  class="form-control"
                  id="label"
                  v-model.number="item[0]"
                />
              </div>
            </div>
            <div class="col-md-5">
              <div class="form-group">
                <label for="label">Y</label>
                <input
                  type="number"
                  step=".00000000001"
                  class="form-control"
                  id="label"
                  v-model.number="item[1]"
                />
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <label for="label"></label>
                <button
                  type="button"
                  class="btn btn-danger d-block mt-2"
                  @click="deleteCoordinate(index)"
                >
                  <i title="Edit Data" class="fas fa-trash-alt" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row ">
        <div class="col-md-12 form-group">
          <!-- Apply button -->

          <button
            type="button"
            class="btn btn-primary float-right"
            :disabled="!canAddCoordinate"
            @click="addCoordinate"
          >
            {{ $t("form.dataForm.addCoordinate") }}
          </button>
        </div>
      </div>
    </CustomModal>
  </div>
</template>

<script>
import {
  tableController,
  toolController,
  modalController,
  layerController,
} from "@/controllers";
import { icons } from "@/constants/assets";
import { drawTypeEnum } from "@/enums";
import datatable from "@/api/datatable";
import { notifyService } from "@/services";
import DynamicFormInput from "@/components/renders/DynamicFormInput";
export default {
  components: { DynamicFormInput },
  props: {
    layerId: {
      type: Number,
      required: true,
    },
    gid: {
      type: Number,
      required: false,
    },
  },

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
    canAddCoordinate() {
      var result =
        this.geometryType &&
        (this.geometryType !== "point" ||
          (this.geometryType === "point" && this.geometry == null) ||
          this.geometry.length == 0);
      return result;
    },
    isGeometryExist() {
      let result = this.geometry && this.geometry.length > 0;

      return result;
    },

    bbox() {
      return toolController.getBbox();
    },
    isEdit() {
      return this.gid && this.gid !== 0;
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
      this.isModalHidingForGeometrySelection = false;
      this.columns = [];
      this.geometryType = "";
      this.geometry = null;
      this.columnData = [];
    },
    resetCoordinates() {
      this.geometry = null;
    },
    deleteCoordinate(index) {
      this.geometryBtnSelect = drawTypeEnum.NONE;
      if (this.geometryType === "point") {
        this.geometry = null;
      } else {
        this.geometry.splice(index, 1);
      }
    },
    addCoordinate() {
      this.geometryBtnSelect = drawTypeEnum.NONE;
      let type = this.geometryType;
      if (type === "point") {
        if (!this.geometry) {
          this.geometry = [];
        }
        if (this.geometry.length == 0) this.geometry = [1, 1];
      } else {
        if (!this.geometry) {
          this.geometry = [];
        }
        var length = this.geometry.length;
        this.geometry.push([1, 1]);
      }
    },

    drawTypeOnChange(e) {
      let value = e.target.value;
      var service = layerController.getDynamicLayer(this.layerId);
      var serviceInfo = {
        id: service.id,
        type: service.type,
      };
      toolController.deleteServiceFeatures(this.layerId);
      if (this.geometryBtnSelect === value) {
        this.geometryBtnSelect = drawTypeEnum.NONE;
        this.geometry == null;
      } else {
        let featureOptions = {
          forService: serviceInfo,
        };
        this.isModalHidingForGeometrySelection = true;
        modalController.hideDataAddEditModal();
        tableController.setTableUnvisible();
        toolController.pickDrawType(
          value,
          () => {
            modalController.showDataAddEditModal();
            this.geometryBtnSelect = value;
            // this.isModalHidingForGeometrySelection = false;
            // let extentCoordinates = this.bbox;
            this.geometry = this.bbox;

            toolController.pickDrawType(this.drawTypeEnum.NONE);
            tableController.setTableVisible();
          },
          featureOptions
        );
      }
    },
    showGeometryModal() {
      modalController.showGeometryModal();
      this.isModalHidingForGeometrySelection = true;
      modalController.hideDataAddEditModal();
    },
    onGeometryModalClose() {
      modalController.showDataAddEditModal();
    },

    async onSubmit() {
      let params = {
        columns: this.columnData,
        layerId: this.layerId,
        geometryType: this.geometryType,
        geometry: this.geometry ? JSON.stringify(this.geometry) : null,
      };
      const isEdit = this.isEdit;
      if (isEdit) params.gid = this.gid;
      datatable.addOrEditData(params).then((response) => {
        if (isEdit) {
          notifyService.info(
            "The record will be updated after commit accepted "
          );
        } else {
          notifyService.info(
            "The record will be created after commit accepted "
          );
        }

        modalController.hideDataAddEditModal();
      });
    },
    async onModalOpen() {
      let data = null;
      const isEdit = this.isEdit;
      if (isEdit) {
        let response = await datatable.getItem(this.layerId, this.gid);
        data = response;
      }

      if (!this.isModalHidingForGeometrySelection) {
        var tableInfo = await datatable.getTableInfo(this.layerId);

        let { columns, geometryType } = tableInfo;

        //remove gid column
        columns = columns.filter((item) => item.columnName !== "gid");
        if (isEdit) {
          columns.forEach((element) => {
            var item = data.find((c) => c.columnName == element.columnName);
            var value = item.value;
            var valueType = element.valueType;
            if (value) {
              value = value.toString();
            }
            element["value"] = value;
          });
          var geometriesColmn = data.find((c) => c.columnName == "geometries");
          if (geometriesColmn) {
            let geom = JSON.parse(geometriesColmn.value);

            this.geometry = geometryType === "point" ? geom[0] : geom;

            this.geometryBtnSelect = geometryType;
          }
        }

        this.columns = columns;
        this.geometryType = geometryType;
      }

      this.isModalHidingForGeometrySelection = false;
    },
    onModalClose() {
      if (!this.isModalHidingForGeometrySelection) {
        this.resetData();
        toolController.deleteServiceFeatures(this.layerId);
      }
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
