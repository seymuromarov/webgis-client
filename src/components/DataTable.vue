<template>
  <div v-show="isVisible" class="table-wrapper">
    <Resizable
      class="resizable"
      ref="resizable"
      :active="resize.handlers"
      :fit-parent="resize.fit"
      :max-width="resize.maxW | checkEmpty"
      :max-height="resize.maxH | checkEmpty"
      :min-width="resize.minW | checkEmpty"
      :min-height="resize.minH | checkEmpty"
      :width="resize.width"
      :height="resize.height"
      :left="resize.left"
      :top="resize.top"
      @mount="resizeHandler"
      @resize:move="resizeHandler"
      @resize:start="resizeHandler"
      @resize:end="resizeHandler"
      @drag:move="resizeHandler"
      @drag:start="resizeHandler"
      @drag:end="resizeHandler"
    >
      <div class="tableDiv howMuchWidthHaveMap">
        <div class="tableHeader">
          <div class="table__tabs">
            <div class="table__tab table__tab--active">
              {{ tableName }}

              <i
                class="fas"
                :class="{
                  'fa-chevron-down': !isTableCollapsed,
                  'fa-chevron-up': isTableCollapsed,
                }"
                @click="toggleTableCollapse"
              ></i>
            </div>
          </div>

          <div class="table__operations">
            <i
              v-if="isActiveServiceLocal && checkPermission(['data_add'])"
              :title="$t('datatable.addData')"
              class="fas fa-plus tableFilter makeMePoint icon"
              @click="addData"
            />

            <download-excel
              v-if="tableHeaders"
              :fetch="fetchFullData"
              type="xls"
              :name="tableName + '_report'"
            >
              <i
                :title="$t('datatable.exportExcel')"
                class="fas fa-file-excel icon excelDataIcon excelIcon makeMePoint"
              ></i>
            </download-excel>

            <i
              :title="$t('datatable.filter')"
              class="fas fa-filter tableFilter makeMePoint icon"
              @click="showFilterModal"
            />
            <i
              :title="$t('datatable.showHideTableColumns')"
              class="fas fa-columns tableColumns makeMePoint icon"
              @click="togglePopup"
            ></i>
            <i
              :title="$t('button.close')"
              class="fas fa-times tableClose makeMePoint icon"
              @click="toggleIsVisible"
            />
            <div
              id="table-columns"
              class="tableShowColumns custom-scrollbar"
              v-show="isColumnPopupShowing"
            >
              <div class="columnsDiv">
                <div
                  v-for="(alias, index) in tableHeaders"
                  :key="index"
                  class="table__column"
                >
                  <input
                    @click="selectColumns(alias, index, $event)"
                    type="checkbox"
                    :id="alias"
                    :value="index"
                    v-model="checkedColumns"
                    checked="checked"
                    class="column__checkbox"
                  />
                  <label class="column__name">{{ alias }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tableContent custom-scrollbar"
          id="dataTable"
          ref="dataTableContent"
          v-show="!isTableCollapsed"
        >
          <!-- Loader -->
          <Loader v-if="loading" />

          <!-- Table -->
          <table class="selfTable table" v-else>
            <thead>
              <tr>
                <th
                  v-show="checkedColumns.includes(index)"
                  v-for="(alias, index) in tableHeaders"
                  :key="index"
                >
                  {{ alias }}
                </th>
                <th
                  v-if="isActiveServiceLocal"
                  class="table__column--sticky"
                  :style="{
                    width: checkPermission(['data_edit']) ? '8rem' : '4rem',
                  }"
                >
                  #
                </th>
              </tr>
            </thead>
            <tbody class="tableBody custom-scrollbar">
              <tr v-for="(data, index) in tableData.features" :key="index">
                <td
                  class="makeMePoint"
                  @click="focusToGeometry(data)"
                  v-show="
                    checkedColumns.includes(
                      Object.keys(data.attributes).indexOf(key)
                    )
                  "
                  v-for="(attr, key) in data.attributes"
                  :key="key"
                >
                  {{ attr }}
                </td>
                <td
                  v-if="isActiveServiceLocal"
                  class="table__column--sticky"
                  :style="{
                    width: checkPermission(['data_edit']) ? '8rem' : '4rem',
                  }"
                >
                  <i
                    v-if="checkPermission(['data_edit'])"
                    :title="$t('datatable.editData')"
                    class="far fa-edit 
                  makeMePoint mr-2"
                    @click="editData(data.attributes['gid'])"
                  />
                  <i
                    :title="$t('datatable.fileUpload')"
                    class="fas fa-file-upload 
                  makeMePoint "
                    @click="uploadImage(data.attributes['gid'])"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Resizable>
    <!-- Filter -->
    <FilterModal />
    <ImageUploadModal
      v-if="activeService && selectedGid && isActiveServiceLocal"
      :gid="selectedGid"
      :layerId="activeService.id"
    />
    <DataAddEditModal
      v-if="activeService && isActiveServiceLocal"
      :gid="selectedGid"
      :layerId="activeService.id"
    />
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import layer from "@/api/layer";
import datatable from "@/api/datatable";
import Resizable from "vue-resizable";
import ImageUploadModal from "@/components/modals/ImageUploadModal";
import FilterModal from "@/components/modals/FilterModal";
import DataAddEditModal from "@/components/modals/DataAddEditModal";
import {
  tableController,
  toolController,
  modalController,
  mapController,
} from "@/controllers";
import { serviceHelper } from "@/helpers";
import checkPermission from "@/utils/permission";
import { _ } from "vue-underscore";
export default {
  name: "DataTable",
  components: {
    Multiselect,
    Resizable,
    ImageUploadModal,
    DataAddEditModal,
    FilterModal,
  },
  data() {
    return {
      currentTabId: null,
      isColumnPopupShowing: false,
      selectedGid: 0,
      isTableCollapsed: true,
      resize: {
        handlers: ["t"],
        left: 0,
        top: window.innerHeight - this.height,
        height: 200,
        width: window.innerWidth,
        maxW: 10000,
        maxH: window.innerHeight,
        minW: 150,
        minH: 40,
        fit: true,
        event: "",
      },
    };
  },
  mounted() {
    this.scrollHandler();
  },
  created() {
    window.addEventListener("resize", this.update);
  },
  destroyed() {
    window.removeEventListener("resize", this.update);
  },
  watch: {
    resize: {
      handler(val) {
        console.log(val.height);
      },
      deep: true,
      immediate: false,
    },
    isVisible: {
      handler() {
        this.resetScroll();
        this.resetPaging();
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    checkPermission,
    toggleTableCollapse() {
      this.isTableCollapsed = !this.isTableCollapsed;

      if (this.isTableCollapsed) {
        this.resize.height = 40;
      } else {
        this.resize.height = 200;
      }
    },
    resetScroll() {
      if (this.$refs.dataTableContent) {
        this.$refs.dataTableContent.scrollTo(0, 0);
      }
    },

    isEndOfData() {
      return this.paging.page * this.paging.limit > this.totalCount;
    },

    async scrollHandler() {
      const table = document.getElementById("dataTable");
      const scrollHeightTolerance = 0.01;

      table.addEventListener("scroll", async (e) => {
        const isEndOfScroll =
          table.scrollTop + table.clientHeight >=
          table.scrollHeight - table.scrollHeight * scrollHeightTolerance;
        if (
          isEndOfScroll &&
          !this.paging.isBusy &&
          !this.isEndOfData() &&
          (serviceHelper.isLocalService(this.activeService) ||
            serviceHelper.isBunch(this.activeService))
        ) {
          var page = this.paging.page;
          page += 1;
          this.isPagingBusy(true);
          // tableController.setTableLoading(true);
          this.paging = {
            ...this.paging,
            page: page++,
          };
          await this.getDatas();
          this.isPagingBusy(false);
          // tableController.setTableLoading(false);
        }
      });
    },
    isPagingBusy(isBusy) {
      this.paging = {
        ...this.paging,
        isBusy,
      };
    },
    async getDatas() {
      let service = this.activeService;
      var isBunch = serviceHelper.isBunch(service);
      let params = {};
      let paging = this.paging;
      let response = null;
      if (isBunch) {
        params = service.layers.map((item, index) => {
          return {
            layerId: item.id,
            query: { ...item.query },
          };
        });
        response = await datatable.getIntersectedData(service.id, {
          layerQueries: params,
          paging: paging,
        });
      } else {
        params = {
          ...service.query,
          paging: paging,
        };
        response = await datatable.getData(service.id, params);
      }

      var data = response.features;
      this.tableData.features = [...this.tableData.features, ...data];
    },
    resetPaging() {
      this.paging = {
        isBusy: false,
        page: 1,
        limit: 25,
      };
    },
    toggleIsVisible() {
      toolController.deleteServiceFeatures(this.activeService.id);
      tableController.setTableUnvisible();
      // this.$store.dispatch("saveDatatableVisibility", !this.isVisible);
    },
    togglePopup(e) {
      this.isColumnPopupShowing = !this.isColumnPopupShowing;
    },
    showFilterModal() {
      modalController.showFilterModal();
    },
    addData() {
      new Promise((resolve, reject) => {
        this.selectedGid = 0;

        resolve();
      }).then((c) => {
        modalController.showDataAddEditModal();
      });
    },
    editData(gid) {
      new Promise((resolve, reject) => {
        this.selectedGid = gid;
        resolve();
      }).then((c) => {
        modalController.showDataAddEditModal();
      });
    },
    uploadImage(gid) {
      new Promise((resolve, reject) => {
        this.selectedGid = gid;
        resolve();
      }).then((c) => {
        modalController.showImageUploadModal();
      });
    },

    focusToGeometry(data) {
      mapController.focusToGeometry(data.geometry);
    },

    async fetchFullData() {
      let activeService = this.activeService;
      let isBunch = serviceHelper.isBunch(activeService);

      let params = null;
      let response = null;

      let paginForFullData = {
        page: 1,
        limit: this.totalCount,
      };
      if (isBunch) {
        params = activeService.layers.map((item, index) => {
          return {
            layerId: item.id,
            query: { ...item.query },
          };
        });
        response = await datatable.getIntersectedData(activeService.id, {
          layerQueries: params,
          paging: paginForFullData,
        });
      } else {
        params = {
          ...activeService.query,
          paging: paginForFullData,
          isGeometryDataExist: false,
        };
        response = await datatable.getData(activeService.id, params);
      }
      var attributes = response.features.map((item, index) => {
        return item.attributes;
      });

      return attributes;
    },
    featuresToExcel() {
      let features = [];
      for (let i = 0; i < this.tableData.length; i++) {
        features[i] = this.tableData[i].attributes;
      }
      return features;
    },

    selectColumns(alias, index, e) {
      var isChecked = e.target.checked;
      if (isChecked) {
        this.checkedColumns.push(index);
      } else {
        const checkedColumnsIndex = this.checkedColumns.findIndex(
          (x) => x === index
        );

        this.checkedColumns.splice(checkedColumnsIndex, 1);
      }
    },
    resizeHandler(data) {
      this.resize.width = data.width;
      this.resize.height = data.height;
      this.resize.left = data.left;
      this.resize.top = data.top;
      this.resize.event = data.eventName;

      this.isTableCollapsed = false;
      // if (data.eventName === "mount") {
      //   this.resize.height = 200;
      // }
    },
    update() {
      this.resize.top = window.innerHeight - 200;
      this.resize.height = 200;
      this.resize.width = window.innerWidth;
      this.resize.maxH = window.innerHeight;

      this.$forceUpdate();
    },
  },
  computed: {
    tableMinHeight() {},

    isActiveServiceLocal() {
      return serviceHelper.isLocalService(this.activeService);
    },
    isVisible() {
      return tableController.getTableVisibility();
    },
    loading() {
      return tableController.getTableLoadingStatus();
    },
    totalCount() {
      return this.tableData.totalCount;
    },
    paging: {
      get() {
        return tableController.getTablePaging();
      },
      set(value) {
        tableController.setTablePaging(value);
      },
    },

    tableName() {
      return this.tableData.tableName;
    },
    tableHeaders() {
      return this.tableData.tableHeaders;
    },
    tableStackedHeaders: {
      get() {
        return this.tableData.tableStackedHeaders;
      },
      set(value) {
        this.$store.dispatch("saveDatatableCheckedColumns", value);
      },
    },
    tableHeadersWithAlias() {
      return this.tableData.tableHeadersWithAlias;
    },

    checkedColumnsData: {
      get() {
        return this.tableData.checkedColumnsData;
      },
      set(value) {
        this.$store.dispatch("saveDatatableCheckedColumnsData", value);
      },
    },

    checkedColumns: {
      get() {
        return this.tableData.checkedColumns;
      },
      set(value) {
        this.$store.dispatch("saveDatatableCheckedColumns", value);
      },
    },

    tableData: {
      get() {
        let data = tableController.getTableData();
        return data;
      },
      set(val) {
        tableController.setTableData(val);
      },
    },

    editDataGid: {
      get() {
        let data = tableController.getEditDataGid();
        return data;
      },
      set(val) {
        tableController.setEditDataGid(val);
      },
    },

    activeService() {
      return tableController.getTableActiveService();
    },
  },
  filters: {
    checkEmpty(value) {
      return typeof value !== "number" ? 0 : value;
    },
  },
};
</script>

<style lang="scss">
.table-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  pointer-events: none;
  z-index: 11;
  & > * {
    pointer-events: all;
  }
}

.resizable {
  position: absolute !important;
  .resizable-t {
    z-index: 10 !important;
    width: calc(100% - 5.6rem) !important;
    &:hover {
      background-color: #2a354baa;
    }
  }
}

.tableDiv {
  top: 0;
  .tableHeader {
    background-color: #1b2537;
    color: #ffffff;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    .table__tabs {
      display: flex;
      .table__tab {
        margin: 0 1rem 0 0;
        padding: 0 1rem;
        font-size: 1.6rem;
        font-weight: 500;
        opacity: 0.6;
        &:hover {
          cursor: pointer;
        }

        &--active {
          opacity: 1;
        }
      }
    }

    .table__operations {
      display: flex;
      align-items: center;
      color: var(--primary-color);
      & i {
        color: var(--white);
      }

      & > *:not(:first-child) {
        margin-left: 1.6rem;
      }
    }
  }

  .tableContent {
    background-color: var(--primary-color-lighten-100);
  }

  .selfTable {
    thead {
      background-color: var(--primary-color-lighten-200);
      color: var(--white);
      th {
        font-weight: 400;
        border: 0;
      }
    }

    tbody {
      background: var(--primary-color-lighten-100);
      color: #fff;
    }

    th,
    td {
      font-size: 1.4rem;
      padding: 0.4rem 2rem;
      text-align: left;
      vertical-align: middle;
    }

    td {
      border-color: var(--primary-color-lighten-200);
    }
  }
}
</style>
