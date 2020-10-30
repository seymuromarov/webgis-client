<template>
  <div>
    <CustomModal
      name="filterModal"
      :title="$t('form.filterForm.modalTitle')"
      :maxWidth="600"
    >
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
                <h5>{{ $t("form.filterForm.columns") }}</h5>
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
                <h5>{{ $t("form.filterForm.values") }}</h5>
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
              {{ activeTabQuery }}
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
          <div class="col-md-12">
            <button
              v-if="favoriteQueryModalVisibility"
              type="button"
              class="btn btn-success btn-sm float-right"
              :disabled="!(isQueryExist && activeTabId)"
              @click="showFavoriteQueryModal"
            >
              {{ $t("form.filterForm.addFavoriteQuery") }}
            </button>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6" v-show="extentOptionsVisibility">
            <b>
              {{ $t("form.filterForm.extentOptions") }}
              <span style="font-size:0.9rem">
                ( {{ $t("form.filterForm.isExist") }} :
                <span v-if="isExtentAreaExist" class="badge badge-success">
                  true
                </span>
                <span v-else class="badge badge-danger">
                  false
                </span>
                )
              </span>
            </b>
            <div
              class="btn-group btn-group-toggle btn-group-sm"
              role="group"
              aria-label="Basic example"
            >
              <label
                class="btn  btn-info "
                v-bind:class="{
                  active:
                    isExtentAreaExist && extentType == drawTypeEnum.SQUARE,
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
                  active:
                    isExtentAreaExist && extentType == drawTypeEnum.POLYGON,
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
                  active:
                    isExtentAreaExist && extentType == drawTypeEnum.CIRCLE,
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
            <b>{{ $t("form.filterForm.sumReportOptions") }}</b>

            <div>
              <div class="row">
                <div class="col-md-6">
                  <input type="checkbox" id="isSum" v-model="isSumFilter" />

                  <label class="ml-1">
                    {{ $t("form.filterForm.isSum") }}
                  </label>
                </div>
                <div class="col-md-6">
                  <select
                    class="form-control form-control-sm"
                    v-model="sumFilterColumn"
                    v-if="isSumFilter"
                  >
                    <option
                      v-for="alias in tableHeaders"
                      :value="alias"
                      :key="alias"
                    >
                      {{ alias }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Sum -->
            </div>
          </div>
        </div>

        <div class="row form-group">
          <div class="col-md-12">
            <!-- Apply button -->

            <button class="btn btn-primary float-right" @click="applyFilter">
              ( {{ $t("button.apply") }}
            </button>
          </div>
        </div>
      </div>
    </CustomModal>
    <FavoriteQueryModal
      v-if="favoriteQueryModalVisibility && isQueryExist && activeTabId"
      :query="activeTabQuery"
      :layerId="activeTabId"
    />
  </div>
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
import layer from "@/api/layer";

import { drawTypeEnum } from "@/enums";
import { _ } from "vue-underscore";
export default {
  name: "FilterModal",
  components: {
    FavoriteQueryModal: () =>
      import("@/components/modals/FavoriteQueryModal.vue"),
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
    showFavoriteQueryModal() {
      modalController.showFavoriteQueryModal();
    },
    async setTableHeaders(layerId) {
      let response = await layer.getTableHeaders(layerId);
      this.tableHeaders = response.data.columns.map((c) => c.columnName);
    },
    drawTypeOnChange(e) {
      let value = e.target.value;

      var serviceInfo = {
        id: this.activeService.id,
        type: this.activeService.type,
      };
      toolController.deleteServiceFeatures(this.activeService.id);
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
    favoriteQueryModalVisibility() {
      return serviceHelper.isDynamicFromLocal(this.activeService);
    },
    isQueryExist() {
      return (
        this.activeTabQuery &&
        this.activeTabQuery.trim() !== "" &&
        this.activeTabQuery.length > 0
      );
    },
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

    activeService() {
      return tableController.getTableActiveService();
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

        let layer = serviceController.getDynamicService(
          activeService,
          this.activeTabId
        );
        where = layer ? layer.query.where : "";
        return where;
      },
      set(query) {
        if (query) {
          let activeService = this.activeService;
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
      this.setTableHeaders(val);
    },
  },
};
</script>
m
