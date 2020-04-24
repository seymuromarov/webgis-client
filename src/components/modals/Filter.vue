<template>
  <Modal name="filterModal" title="Filter" :maxWidth="600">
    <div class="data-table__filter">
      <!-- Tabs -->
      <div class="filter__tabs">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tab"
          :class="{ 'tab--active': activeTabId === tab.id }"
          @click="setActiveTabId(tab.id)"
        >
          {{ tab.name }}
        </div>
      </div>

      <div class="filter__fields">
        <!-- Columns -->
        <div class="filter__fields__columns">
          <h5>Columns</h5>
          <ul class="filter__fields__list custom-scrollbar">
            <li
              v-for="(alias, column) in tableFeaturesHeader"
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

      <!-- Sum -->
      <div v-show="reportCheckboxVisibility">
        <label>
          <input
            class="parent-checkbox"
            type="checkbox"
            id="isSum"
            :value="false"
            v-model="filterQueryIsSum"
            style="opacity:0;"
          />
          <i
            class="far fa-check-circle"
            v-if="filterQueryIsSum"
            style="cursor: pointer; color:#008422"
          ></i>
          <i class="far fa-check-circle" v-else style="cursor: pointer;"></i>
          Sum
        </label>

        <label class="ml-4" v-if="filterQueryIsSum">
          <select v-model="filterQueryArithmeticColumn">
            <option
              v-for="alias in tableFeaturesHeader"
              :value="alias"
              :key="alias"
            >
              {{ alias }}
            </option>
          </select>
          Sum Column
        </label>
      </div>
      <!-- Apply button -->
      <button class="btn filter__apply-btn" @click="applyFilter">
        Apply
      </button>
    </div>
  </Modal>
</template>

<script>
import {
  layerController,
  bunchController,
  tableController,
} from "@/controllers";
import { layerHelper, serviceHelper } from "@/helpers";
import { Modal } from "@/components";

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
      currentTabId: null,
    };
  },
  methods: {
    handleQueryChange(e) {
      let value = e.target.value;

      if (value === "") {
        value = " ";
      }

      this.activeTabQuery = value;
    },
    // getValueKey(alias) {
    //     return Object.keys(this.activeTabData.tableHeadersWithAlias).find(
    //         key => this.activeTabData.tableHeadersWithAlias[key] === alias
    //     );
    // },
    isValString(value) {
      return typeof value == "string";
    },
    appendFilterQuery(value, typeCheck) {
      if (typeCheck && this.isValString(value)) value = `'${value}'`;
      this.activeTabQuery = this.activeTabQuery + value + " ";
      this.$refs.filterQueryTextarea.focus();
    },
    setActiveTabId(tab) {
      this.activeTabId = tab;
    },
    applyFilter() {
      this.$emit("filterData", this.activeService, this.activeTabQuery.trim());
      this.$moodal.filterModal.hide();
    },
  },
  computed: {
    reportCheckboxVisibility() {
      return this.activeService && serviceHelper.isLayer(this.activeService);
    },
    getFilterColumnValues(alias) {
      return filterController.getFilterColumnValues(this.activeTabId, alias);
    },
    tabs() {
      return this.$store.state.dataTable.tabs;
    },
    activeTabId: {
      get() {
        return this.$store.state.dataTable.activeTabId;
      },
      set(id) {
        this.$store.dispatch("SAVE_DATATABLE_ACTIVE_TAB_ID", id);
      },
    },
    activeTab() {
      return tableController.getServiceData(this.activeTabId);
    },
    activeService() {
      return this.$store.getters.tableActiveService;
    },
    activeTabData() {
      return this.activeTab ? this.activeTab.data : null;
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
        let isBunch = serviceHelper.isBunch(activeService);
        if (isBunch) {
          let bunchLayer = bunchController.getBunchLayer(
            activeService.id,
            this.activeTabId
          );
          where = bunchLayer ? bunchLayer.query.where : "";
        } else {
          let layer = layerController.getDynamicLayer(this.activeTabId);
          where = layer.query.where;
        }

        return where;
      },
      set(query) {
        if (query) {
          let activeService = this.$store.getters.tableActiveService;
          let isBunch = serviceHelper.isBunch(activeService);
          if (isBunch) {
            bunchController.setQuery(activeService, this.activeTabId, query);
          } else layerController.setQuery(activeService, query);
        }
      },
    },
    tableFeaturesHeader() {
      if (this.activeTabData) {
        return Object.values(this.activeTabData.tableHeadersWithAlias);
      } else {
        return [];
      }
    },
    tableFeaturesTarget() {
      if (this.activeTabData) {
        return this.activeTabData.tableHeadersWithAlias;
      } else {
        return {};
      }
    },
    filterValues: {
      get() {
        const data = this.$store.getters.activeTableData;
        return data ? data.filterValues : [];
      },
    },
    filterQueryIsSum: {
      get() {
        return this.$store.state.filter.filterQueryIsSum;
      },
      set(filterQueryIsSum) {
        if (filterQueryIsSum) {
          this.$store.dispatch(
            "SAVE_FILTER_QUERY_ARITHMETIC_COLUMN",
            this.tableFeaturesHeader[0]
          );
        }
        return this.$store.dispatch(
          "SAVE_FILTER_QUERY_IS_SUM",
          filterQueryIsSum
        );
      },
    },
    filterQueryArithmeticColumn: {
      get() {
        return this.$store.state.filter.filterQueryArithmeticColumn;
      },
      set(filterQueryArithmeticColumn) {
        return this.$store.dispatch(
          "SAVE_FILTER_QUERY_ARITHMETIC_COLUMN",
          filterQueryArithmeticColumn
        );
      },
    },
  },
  watch: {
    activeTabId(val) {
      this.currentTabId = val;
    },
  },
};
</script>
