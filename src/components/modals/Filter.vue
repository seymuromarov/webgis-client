<template>
  <Modal name="filterModal" title="Filter" :maxWidth="600">
    <div class="data-table__filter">
      <div class="row form-group">
        <div class="col-md-12">
          <!-- Tabs -->
          <div class="filter__tabs">
            <div
              v-for="tab in tabs"
              :key="tab.id"
              class="tab"
              :class="{ 'tab--active': activeTabId === tab.id }"
              @click="activeTabId = tab.id"
            >
              {{ tab.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-12">
          <div class="filter__fields">
            <!-- Columns -->
            <div class="filter__fields__columns">
              <h5>Columns</h5>
              <ul class="filter__fields__list custom-scrollbar">
                <li
                  v-for="(alias, column) in tableHeaders"
                  :key="column"
                  class="list__item"
                  @dblclick="appendFilterQuery(alias, false)"
                  @click="getFilterColumnValues(alias)"
                >
                  {{ alias }}
                </li>
              </ul>
            </div>

            <!-- Column Values -->
            <div class="filter__fields__values">
              <h5>Values</h5>
              <ul class="filter__fields__list custom-scrollbar">
                <li
                  @dblclick="appendFilterQuery(value, true)"
                  class="list__item"
                  v-for="(value, index) in filterValues"
                  :key="index"
                >
                  {{ value }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-12">
          <!-- Actions -->
          <div class="filter__actions">
            <div v-for="action in actionsList" :key="action">
              <button
                @click="appendFilterQuery(action, false)"
                class="btn btn-sm btn-outline-secondary"
              >
                {{ action }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-12">
          <!-- Textarea -->
          <div class="filter__query">
            <label class="title">SELECT * FROM table WHERE:</label>

            <textarea
              ref="filterQueryTextarea"
              name="filterQuery"
              rows="4"
              cols="69"
              :value="activeTabQuery"
              @input="handleQueryChange"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-6" v-show="extentOptionsVisibility">
          <label>
            Extent Options
            <span style="font-size:0.9rem">
              (Is Exist :
              <span v-if="isExtentAreaExist" class="badge badge-success">
                true
              </span>
              <span v-else class="badge badge-danger">
                false
              </span>
              )
            </span>
          </label>
          <div
            class="btn-group btn-group-toggle btn-group-sm"
            role="group"
            aria-label="Basic example"
          >
            <label
              class="btn  btn-info "
              v-bind:class="{
                active: isExtentAreaExist && extentType == drawTypeEnum.SQUARE,
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
              class="btn  btn-info "
              v-bind:class="{
                active: isExtentAreaExist && extentType == drawTypeEnum.BOX,
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
              class="btn  btn-info "
              v-bind:class="{
                active: isExtentAreaExist && extentType == drawTypeEnum.POLYGON,
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
              v-if="circleButtonVisibility"
              class="btn  btn-info "
              v-bind:class="{
                active: isExtentAreaExist && extentType == drawTypeEnum.CIRCLE,
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
        <div class="col-md-6" v-show="reportCheckboxVisibility">
          <label>Sum Report Options</label>

          <div>
            <input type="checkbox" id="isSum" v-model="isSumFilter" />

            <label class="ml-1">Is Sum</label>
            <!-- Sum -->

            <select class="ml-4" v-model="sumFilterColumn" v-if="isSumFilter">
              <option v-for="alias in tableHeaders" :value="alias" :key="alias">
                {{ alias }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="row form-group">
        <div class="col-md-12">
          <!-- Apply button -->

          <button
            class="btn filter__apply-btn float-right"
            @click="applyFilter"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import {
  layerController,
  bunchController,
  serviceController,
  toolController,
  tableController,
  filterController,
  modalController,
} from "@/controllers";
import { icons } from "@/constants/assets";
import { layerHelper, serviceHelper } from "@/helpers";
import { layerService } from "@/services";
import { drawTypeEnum } from "@/enums";
import { Modal } from "@/components";
import { _ } from "vue-underscore";
export default {
  name: "FilterBox",
  components: {
    Modal,
  },
  data() {
    return {
      actionsList: [
        "=",
        ">",
        ">=",
        "<",
        "<=",
        "<>",
        "AND",
        "OR",
        "LIKE",
        "IS NULL",
      ],
      filterValues: [],
      currentTabId: null,
      selectedColumn: "gid",
      icons: {},
      tableHeaders: [],
      extentType: null,
      drawTypeEnum: null,
    };
  },
  created() {
    this.icons = icons;
    this.drawTypeEnum = drawTypeEnum;
  },
  mounted() {
    this.extentType = this.drawTypeEnum.NONE;
  },
  methods: {
    drawTypeOnChange(e) {
      let value = e.target.value;

      var serviceInfo = {
        id: this.activeService.id,
        type: this.activeService.type,
      };
      toolController.deleteActiveServiceFeatures();
      if (this.extentType == value) {
        this.extentType = drawTypeEnum.NONE;
        serviceController.setExtentCoordinates(this.activeService, "");

        // layerController.setExtentCoordinates(this.activeService, "");
      } else {
        modalController.hideFilterModal();
        tableController.setTableUnvisible();

        let featureOptions = {
          forService: serviceInfo,
        };
        toolController.pickDrawType(
          value,
          () => {
            modalController.showFilterModal();
            this.extentType = value;

            let extentCoordinates = this.bbox;

            serviceController.setExtentCoordinates(
              this.activeService,
              JSON.stringify(extentCoordinates)
            );

            toolController.pickDrawType(this.drawTypeEnum.NONE);
            tableController.setTableVisible();
            filterController.setIsRequiredServiceRefresh(true);
          },
          featureOptions
        );
      }
    },
    handleQueryChange(e) {
      let value = e.target.value;

      if (value === "") {
        value = " ";
      }

      this.activeTabQuery = value;
    },

    isValString(value) {
      return typeof value == "string";
    },
    appendFilterQuery(value, typeCheck) {
      if (typeCheck && this.isValString(value)) value = `'${value}'`;
      this.activeTabQuery = this.activeTabQuery + value + " ";
      this.$refs.filterQueryTextarea.focus();
    },

    applyFilter() {
      tableController.getTable(this.activeService);
      this.$moodal.filterModal.hide();
    },
    async getFilterColumnValues(val) {
      this.filterValues = await filterController.getFilterColumnValues(
        this.activeTabId,
        val
      );
    },
  },
  computed: {
    isExtentAreaExist() {
      var activeService = this.activeService;
      let isBunch = serviceHelper.isBunch(activeService);
      let extentExist = false;
      if (activeService) {
        if (isBunch) {
          var extent = bunchController.getExtentCoordinates(activeService.id);
          extentExist = extent.some(function(item) {
            return item !== null && item !== "";
          });
          console.log("isExtentAreaExist -> extentExist", extentExist);
        } else {
          var extent = layerController.getExtentCoordinates(activeService.id);
          extentExist = extent !== null && extent !== "";
        }
      }

      return this.extentType !== drawTypeEnum.NONE && extentExist;
    },
    circleButtonVisibility() {
      return !serviceHelper.isBunch(this.activeService);
    },
    reportCheckboxVisibility() {
      return this.activeService && serviceHelper.isLayer(this.activeService);
    },
    extentOptionsVisibility() {
      return (
        this.activeService &&
        (serviceHelper.isLayer(this.activeService) ||
          serviceHelper.isBunch(this.activeService))
      );
    },

    tabs() {
      let tabs = [];
      if (this.activeService) {
        let isBunch = serviceHelper.isBunch(this.activeService);
        if (isBunch)
          tabs = this.activeService.layers.map((item) => {
            return { id: item.id, name: item.name };
          });
        else
          tabs = [{ id: this.activeService.id, name: this.activeService.name }];
      }

      return tabs;
    },
    activeTabId: {
      get() {
        return this.$store.state.dataTable.activeTabId;
      },
      set(id) {
        this.$store.dispatch("SAVE_DATATABLE_ACTIVE_TAB_ID", id);
      },
    },
    // activeTab: {
    //     get(){

    //     },
    //     set(val){

    //     }
    //   //   return tableController.getServiceData(this.activeTabId);
    // },
    activeService() {
      return this.$store.getters.tableActiveService;
    },

    activeTabService() {
      if (!this.activeService) return null;
      let isBunch = serviceHelper.isBunch(this.activeService);
      let service = null;

      if (this.activeTab) {
        if (isBunch)
          service = bunchController.getBunchLayer(
            this.activeService.id,
            this.activeTabId
          );
        else service = layerController.getDynamicLayer(this.activeTabId);
      }
      return service;
    },
    activeTabQuery: {
      get() {
        let where = "";
        let activeService = this.activeService;
        if (!activeService || !this.activeTabId) return where;

        // let isBunch = serviceHelper.isBunch(activeService);
        // if (isBunch) {
        //   let bunchLayer = bunchController.getBunchLayer(
        //     activeService.id, //bunch
        //     this.activeTabId //layer
        //   );

        // } else {
        //   let layer = layerController.getDynamicLayer(this.activeTabId);
        //   where = layer.query.where;
        // }

        let layer = serviceController.getDynamicService(
          activeService,
          this.activeTabId
        );
        where = layer ? layer.query.where : "";
        return where;
      },
      set(query) {
        if (query) {
          let activeService = this.$store.getters.tableActiveService;
          let isBunch = serviceHelper.isBunch(activeService);
          if (isBunch) {
            serviceController.setQuery(activeService, query, this.activeTabId);
          } else serviceController.setQuery(activeService, query);

          filterController.setIsRequiredServiceRefresh(true);
        }
      },
    },

    isSumFilter: {
      get() {
        return this.$store.getters.isSumFilter;
      },
      set(val) {
        if (val) {
          this.$store.dispatch("saveSumFilterColumn", this.tableHeaders[0]);
        }
        return this.$store.dispatch("saveIsSumFilter", val);
      },
    },
    sumFilterColumn: {
      get() {
        let val = this.$store.getters.sumFilterColumn;
        return val;
      },
      set(val) {
        return this.$store.dispatch("saveSumFilterColumn", val);
      },
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
  watch: {
    async activeTabId(val) {
      let layerId = 0;

      let response = await layerService.getTableHeaders(val);
      this.tableHeaders = response.data.headers;
    },
  },
};
</script>
