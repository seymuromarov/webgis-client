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
            <div class="table__tab table__tab--active">{{ tableName }}</div>
          </div>

          <div class="table__operations">
            <i
              v-if="isActiveServiceIsLocal && checkPermission(['data_add'])"
              title="Add Data"
              class="fas fa-plus tableFilter makeMePoint icon"
              @click="showDataAddEditModal(false)"
            />

            <download-excel
              v-if="tableHeaders"
              :fetch="fetchFullData"
              type="xls"
              :name="'test' + '_report.xls'"
            >
              <!-- :fields="checkedColumnsToExcel()" -->

              <i
                title="Export As Excel"
                class="fas fa-file-excel icon excelDataIcon excelIcon makeMePoint"
              ></i>
            </download-excel>

            <i
              title="Filter"
              class="fas fa-filter tableFilter makeMePoint icon"
              @click="showFilterModal"
            />
            <i
              title="Show/Hide Table Columns"
              class="fas fa-columns tableColumns makeMePoint icon"
              @click="togglePopup"
            ></i>
            <i
              title="Close"
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
        >
          <!-- Loader -->
          <div class="loader" v-if="loading">
            <img src="@/assets/loading.svg" alt />
          </div>

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
                  v-if="isActiveServiceIsLocal"
                  class="table__column--sticky"
                  style=" width: 80px;"
                >
                  #
                </th>
              </tr>
            </thead>
            <tbody class="tableBody custom-scrollbar">
              <tr v-for="(data, index) in tableData.features" :key="index">
                <td
                  class="makeMePoint"
                  @click="fitToPolygon(data)"
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
                  v-if="
                    isActiveServiceIsLocal && checkPermission(['data_edit'])
                  "
                  class="table__column--sticky"
                  style=" width: 80px;"
                >
                  <i
                    title="Edit Data"
                    class="far fa-edit 
                  makeMePoint mr-2"
                    @click="editData(data.attributes['gid'])"
                  />
                  <i
                    title="Edit Data"
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

    <CustomModal name="dataModal" :minWidth="200" :minHeight="200">
      <p class="tableModalHeader">{{ tableName }}</p>
      <div class="row" style="overflow: auto">
        <table class="table popupTable">
          <thead>
            <tr class="fields">
              <th class="paddingLeft">Field</th>
              <th class="paddingRight">Value</th>
            </tr>
          </thead>
          <tbody class="popupTableBody">
            <tr v-for="(value, key) in selectedData" :key="key">
              <td class="paddingLeft">{{ key }}</td>
              <td class="paddingRight">{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CustomModal>
  </div>
</template>

<script>
import { toggler } from "../helpers";
import Multiselect from "vue-multiselect";
import layer from "@/api/layer";
import Resizable from "vue-resizable";
import CustomModal from "@/components/common/Modal";
import {
  tableController,
  toolController,
  modalController,
} from "@/controllers";
import { serviceHelper } from "@/helpers";
import checkPermission from "@/utils/permission";

export default {
  name: "DataTable",
  components: {
    Multiselect,
    Resizable,
    CustomModal,
  },
  data() {
    return {
      currentTabId: null,
      toggler: null,
      isColumnPopupShowing: false,
      selectedData: [],
      resize: {
        handlers: ["t"],
        left: 0,
        top: window.innerHeight - 200,
        height: window.innerHeight,
        width: window.innerWidth,
        maxW: 10000,
        maxH: window.innerHeight,
        minW: 150,
        minH: 200,
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

    resetScroll() {
      if (this.$refs.dataTableContent) {
        this.$refs.dataTableContent.scrollTo(0, 0);
      }
    },
    isActiveServiceIsLocal() {
      return serviceHelper.isLocalService(this.activeService);
    },
    isEndOfData() {
      return this.paging.page * this.paging.limit > this.totalCount;
    },
    scrollHandler() {
      const table = document.getElementById("dataTable");
      table.addEventListener("scroll", (e) => {
        if (
          table.scrollTop + table.clientHeight >= table.scrollHeight &&
          !this.paging.isBusy &&
          !this.isEndOfData() &&
          (serviceHelper.isLocalService(this.activeService) ||
            serviceHelper.isBunch(this.activeService))
        ) {
          var page = this.paging.page;
          var page = this.paging.page;
          page += 1;
          this.isPagingBusy(true);
          tableController.setTableLoading(true);
          this.paging = {
            ...this.paging,
            page: page++,
          };

          this.getDatas();
          this.isPagingBusy(false);
          tableController.setTableLoading(false);
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
        response = await layer.getIntersectLocalTableData(service.id, {
          layerQueries: params,
          paging: paging,
        });
      } else {
        params = {
          layerId: service.id,
          ...service.query,
          paging: paging,
        };
        response = await layer.getLocalTableData(params);
      }

      var data = response.data.features;
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
      toolController.deleteActiveServiceFeatures();
      tableController.setTableUnvisible();
      // this.$store.dispatch("SAVE_DATATABLE_VISIBLE", !this.isVisible);
    },
    togglePopup(e) {
      this.isColumnPopupShowing = !this.isColumnPopupShowing;
    },
    showFilterModal() {
      modalController.showFilterModal();
    },
    editData(gid) {
      this.editDataGid = gid;
      this.showDataAddEditModal(true);
    },
    uploadImage(gid) {
      this.editDataGid = gid;
      modalController.showImageUploadModal();
    },
    showDataAddEditModal(isEdit) {
      this.isEditData = isEdit;
      modalController.showDataAddEditModal();
    },
    showSimpleFilterModal() {
      this.$moodal.dataModal.show();
    },
    fitToPolygon(data) {
      this.selectedData = data;
      this.$emit("mapSetCenter", data);
    },
    showDataModal(data) {
      this.selectedData = data;
      this.$moodal.dataModal.show();
    },
    showColumnsChange() {
      this.toggler.showColumnsChange();
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

        response = await layer.getIntersectLocalTableData(activeService.id, {
          layerQueries: params,
          paging: paginForFullData,
        });
      } else {
        params = {
          layerId: activeService.id,
          ...activeService.query,
          paging: paginForFullData,
          isGeometryDataExist: false,
        };
        response = await layer.getLocalTableData(params);
      }
      var attributes = response.data.features.map((item, index) => {
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
      if (data.eventName === "mount") {
        this.resize.height = 200;
      }
    },
    update() {
      this.resize.top = window.innerHeight - 200;
      this.resize.height = 200;
      this.resize.width = window.innerWidth;
      this.resize.maxH = window.innerHeight;

      this.$forceUpdate();
    },
    // setActiveTab(tab) {
    //   this.activeTabId = tab;
    // },
  },
  computed: {
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
        this.$store.dispatch("SAVE_DATATABLE_CHECKED_COLUMNS", value);
      },
    },
    tableHeadersWithAlias() {
      return this.tableData.tableHeadersWithAlias;
    },

    target() {
      return this.activeTableData.target;
    },
    checkedColumnsData: {
      get() {
        return this.tableData.checkedColumnsData;
      },
      set(value) {
        this.$store.dispatch("SAVE_DATATABLE_CHECKED_COLUMNS_DATA", value);
      },
    },

    checkedColumns: {
      get() {
        return this.tableData.checkedColumns;
      },
      set(value) {
        this.$store.dispatch("SAVE_DATATABLE_CHECKED_COLUMNS", value);
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
    isEditData: {
      get() {
        let data = tableController.getIsEditData();
        return data;
      },
      set(val) {
        tableController.setIsEditData(val);
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
  display: flex;
  align-items: flex-end;
  pointer-events: none;
  & > * {
    pointer-events: all;
  }
}

.resizable {
  position: absolute !important;
  .resizable-t {
    z-index: 10 !important;
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
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .table__tabs {
      display: flex;
      .table__tab {
        margin: 0 10px 0 0;
        padding: 0 10px;
        font-size: 16px;
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
        margin-left: 1rem;
      }
    }
  }

  .tableContent {
    background-color: var(--primary-color-lighten-100);
    .loader {
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      position: absolute;
      img {
        width: 60px;
      }
    }
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
      font-size: 14px;
      padding: 4px 20px;
      text-align: left;
      vertical-align: middle;
    }

    td {
      border-color: var(--primary-color-lighten-200);
    }
  }
}
</style>
