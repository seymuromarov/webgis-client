<template>
  <div class="table-wrapper">
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
      <div v-show="isVisible" class="tableDiv howMuchWidthHaveMap">
        <div class="tableHeader">
          <p class="table__title">
            {{ tableName }}
          </p>
          <div class="table__operations">
            <download-excel
              v-if="tableHeaders"
              :data="featuresToExcel()"
              :fields="checkedColumnsToExcel()"
              type="xls"
              :name="'test' + '_report.xls'"
            >
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
              class="fas fa-columns tableColumns makeMePointicon"
              @click="togglePopup"
            >
            </i>
            <i
              title="Close"
              class="fas fa-times tableClose makeMePoint icon"
              @click="toggleIsVisible"
            />
            <!-- 
                    <i
                            v-if="tableName.trim() == 'CropMap2019_vector'"
                            class="fas fa-filter tableSimpleFilter makeMePoint"
                            style="color:blue"
                            @click="showSimpleFilterModal"
                    /> -->

            <div class="tableShowColumns" v-if="isColumnPopupShowing">
              <div class="columnsDiv">
                <div v-for="(alias, index) in tableHeaders" :key="index">
                  <input
                    @click="selectColumns(alias, index, $event)"
                    type="checkbox"
                    :id="alias"
                    :value="alias"
                    v-model="checkedColumns"
                    checked="checked"
                  />
                  <label> {{ alias }} </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tableContent custom-scrollbar" id="dataTable">
          <!-- Loader -->
          <div class="loader" v-if="loading">
            <img src="@/assets/loading.svg" alt />
          </div>

          <!-- Table -->
          <table class="selfTable table" v-else>
            <thead>
              <tr>
                <th
                  v-show="checkedColumns.includes(alias)"
                  v-for="(alias, index) in tableHeaders"
                  :key="index"
                >
                  {{ alias }}
                </th>
              </tr>
            </thead>
            <tbody class="tableBody custom-scrollbar" id="dataTable">
              <tr v-for="(data, index) in tableData" :key="index">
                <td
                  class="makeMePoint"
                  @click="fitToPolygon(data)"
                  v-show="checkedColumnsData.includes(key)"
                  v-for="(attr, key) in data.attributes"
                  :key="key"
                >
                  {{ attr }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <modal
          name="data-modal"
          transition="nice-modal-fade"
          :min-width="200"
          :min-height="200"
          :delay="100"
          :draggable="true"
        >
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
                <tr v-for="(value, key) in selectedData.attributes" :key="key">
                  <td class="paddingLeft">
                    {{ tableHeadersWithAlias[key] }}
                  </td>
                  <td class="paddingRight">{{ value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </modal>
      </div>
    </Resizable>
  </div>
</template>

<script>
import { Toggler } from "../helpers";
import Multiselect from "vue-multiselect";
import LayerService from "../services/LayerService";
import Resizable from "vue-resizable";

export default {
  name: "DataTable",
  props: {},
  components: {
    Multiselect,
    Resizable
  },
  data() {
    return {
      Toggler: null,
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
        event: ""
      }
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
      handler(val) {
        this.resetScroll();
        this.resetPaging();
      },
      deep: true,
      immediate: false
    }
  },
  methods: {
    resetScroll() {
      const table = document.getElementById("dataTable");
      table.scrollTo(0, 0);
    },
    isEndOfData() {
      return this.paging.page * this.paging.limit > this.totalCount;
    },
    scrollHandler() {
      const table = document.getElementById("dataTable");
      table.addEventListener("scroll", e => {
        if (
          table.scrollTop + table.clientHeight >= table.scrollHeight &&
          !this.paging.isBusy &&
          !this.isEndOfData() &&
          this.serviceInfo.resourceType === "local"
        ) {
          var page = this.paging.page;
          page += 1;
          this.isPagingBusy(true);
          this.paging = {
            ...this.paging,
            page: page++
          };

          this.getDatas();
          this.isPagingBusy(false);
        }
      });
    },
    isPagingBusy(isBusy) {
      this.paging = {
        ...this.paging,
        isBusy
      };
    },
    async getDatas() {
      var params = {
        layerId: this.serviceInfo.id,
        ...this.serviceInfo.query,
        ...this.paging
      };
      var response = await LayerService.getLocalTableData(params);
      var data = response.data.features;
      this.tableData = [...this.tableData, ...data];
    },
    resetPaging() {
      this.paging = {
        isBusy: false,
        page: 1,
        limit: 25
      };
    },
    toggleIsVisible() {
      this.$store.dispatch("SAVE_DATATABLE_VISIBLE", !this.isVisible);
    },
    togglePopup() {
      this.isColumnPopupShowing = !this.isColumnPopupShowing;
    },
    showFilterModal() {
      this.$emit("showFilterModal");
    },
    showSimpleFilterModal() {
      this.$modal.show("simple-data-filter-modal", null, {
        name: "dynamic-filter-modal",
        resizable: false,
        adaptive: true,
        draggable: false
      });
    },
    fitToPolygon(data) {
      this.selectedData = data;
      this.$emit("mapSetCenter", data);
    },
    showDataModal(data) {
      this.$modal.show("data-modal", null, {
        name: "dynamic-modal",
        resizable: true,
        adaptive: true,
        draggable: true
      });
      this.fitToPolygon(data);
    },
    showColumnsChange() {
      this.Toggler.showColumnsChange();
    },
    featuresToExcel() {
      let features = [];
      for (let i = 0; i < this.tableData.length; i++) {
        features[i] = this.tableData[i].attributes;
      }
      return features;
    },
    checkedColumnsToExcel() {
      let columns = {};

      for (let column in this.tableHeaders) {
        if (this.checkedColumns.includes(this.tableHeaders[column])) {
          columns[this.tableHeaders[column]] = this.tableStackedHeaders[column];
        }
      }
      return columns;
    },
    selectColumns(alias, index, e) {
      if (e.target.checked) {
        this.checkedColumns.push(alias);
        var keys = Object.keys(this.tableHeadersWithAlias);
        var tempAlias = alias;
        for (let i = 0; i < keys.length; i++) {
          if (this.tableHeadersWithAlias[keys[i]] === alias) {
            tempAlias = keys[i];
            break;
          }
        }
        this.checkedColumnsData.push(tempAlias);
      } else {
        //  this.checkedColumnsData.splice(index, 1);
        //  this.checkedColumns.splice(index, 1);
        this.checkedColumnsData = this.checkedColumnsData.filter(
          data => data.toLowerCase() != alias.toLowerCase()
        );

        this.checkedColumns = this.checkedColumns.filter(
          data => data.toLowerCase() != alias.toLowerCase()
        );
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
    }
  },
  computed: {
    isVisible() {
      return this.$store.state.dataTable.isVisible;
    },
    loading() {
      return this.$store.getters.dataTableLoading;
    },
    totalCount() {
      return this.$store.state.dataTable.totalCount;
    },
    paging: {
      get() {
        return this.$store.state.dataTable.paging;
      },
      set(value) {
        this.$store.dispatch("SAVE_DATATABLE_PAGING", value);
      }
    },
    serviceInfo() {
      return this.$store.state.dataTable.serviceInfo;
    },
    tableName() {
      return this.$store.state.dataTable.tableName;
    },
    tableHeaders() {
      return this.$store.state.dataTable.tableHeaders;
    },
    tableStackedHeaders: {
      get() {
        return this.$store.state.dataTable.tableStackedHeaders;
      },
      set(value) {
        this.$store.dispatch("SAVE_DATATABLE_CHECKED_COLUMNS", value);
      }
    },
    tableHeadersWithAlias() {
      return this.$store.state.dataTable.tableHeadersWithAlias;
    },
    // tableData() {
    //   return this.$store.state.dataTable.tableData;
    // },
    tableData: {
      get() {
        return this.$store.state.dataTable.tableData;
      },
      set(value) {
        this.$store.dispatch("SAVE_DATATABLE_DATA", value);
      }
    },
    target() {
      return this.$store.state.dataTable.target;
    },
    checkedColumnsData: {
      get() {
        return this.$store.state.dataTable.checkedColumnsData;
      },
      set(value) {
        this.$store.dispatch("SAVE_DATATABLE_CHECKED_COLUMNS_DATA", value);
      }
    },
    checkedColumns: {
      get() {
        return this.$store.state.dataTable.checkedColumns;
      },
      set(value) {
        this.$store.dispatch("SAVE_DATATABLE_CHECKED_COLUMNS", value);
      }
    },
    // checkedColumns() {
    //     return this.$store.state.dataTable.checkedColumns;
    // },
    lastBBOXOfShape() {
      return this.$store.state.dataTable.lastBBOXOfShape;
    }
  },
  filters: {
    checkEmpty(value) {
      return typeof value !== "number" ? 0 : value;
    }
  }
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
    .table__title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }

    .table__operations {
      display: flex;
      align-items: center;
      color: #1b2537;
      & i {
        color: #ffffff;
      }

      & > *:not(:first-child) {
        margin-left: 1rem;
      }
    }
  }

  .tableContent {
    background-color: #2a354b;
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
      background-color: #586276;
      color: #ffffff;
      th {
        font-weight: 400;
        border: 0;
      }
    }

    tbody {
      background: #2a354b;
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
      border-color: #586276;
    }
  }
}
</style>
