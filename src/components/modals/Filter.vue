<template>
    <div class="data-table__filter">
        <!-- Tabs -->
        <div class="filter__tabs">
            <div v-for="tab in tabs"
                 :key="tab.id"
                 class="tab"
                 :class="{ 'tab--active': activeTabId === tab.id }"
                 @click="setActiveTabId(tab.id)">
                {{ tab.name }}
            </div>
        </div>

        <div class="filter__fields">
            <!-- Columns -->
            <div class="filter__fields__columns">
                <h5>Columns</h5>
                <ul class="filter__fields__list custom-scrollbar">
                    <li v-for="(alias, column) in tableFeaturesHeader"
                        :key="column"
                        class="list__item"
                        @dblclick="
                            appendFilterQuery(tableFeaturesTarget[alias])
                        "
                        @click="
                            $emit(
                                'filterSelectedColumn',
                                activeTabId,
                                tableFeaturesTarget[alias]
                            )
                        ">
                        {{ alias }}
                    </li>
                </ul>
            </div>

            <!-- Column Values -->
            <div class="filter__fields__values">
                <h5>Values</h5>
                <ul class="filter__fields__list custom-scrollbar">
                    <li @dblclick="appendFilterQuery(value)"
                        class="list__item"
                        v-for="(value, index) in filterValues"
                        :key="index">
                        {{ value }}
                    </li>
                </ul>
            </div>
        </div>

        <!-- Actions -->
        <div class="filter__actions">
            <div v-for="action in actionsList" :key="action">
                <button @click="appendFilterQuery(action)"
                        class="btn btn-sm btn-outline-secondary">
                    {{ action }}
                </button>
            </div>
        </div>

        <!-- Textarea -->
        <div class="filter__query">
            <label class="title">SELECT * FROM table WHERE:</label>

            <textarea ref="filterQueryTextarea"
                      name="filterQuery"
                      rows="4"
                      cols="69"
                      :value="activeTabQuery"
                      @input="activeTabQuery = $event.target.value"></textarea>
        </div>

        <!-- Sum -->
        <!-- <div v-show="serviceInfo.resourceType === 'local'">
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
                <i
                    class="far fa-check-circle"
                    v-else
                    style="cursor: pointer;"
                ></i>
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
        </div> -->
        <!-- Apply button -->
        <button class="btn filter__apply-btn" @click="apply">
            Apply
        </button>
    </div>
</template>

<script>
    import { layerController, bunchController } from "@/controllers";
    import { layerHelper, serviceHelper } from "@/helpers";
    export default {
        name: "FilterBox",
        props: {
            // tableFeaturesHeader: {
            //     type: Array,
            // },
            stackedTableFeaturesHeader: {
                type: Array,
            },
            filterValues: {
                type: Array,
            },
        },
        data() {
            return {
                activeTabId: null,
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
            };
        },
        methods: {
            appendFilterQuery(value) {
                // this.$emit("appendFilterQuery", value + " ");
                this.activeTabQuery = this.activeTabQuery + value + " ";
                this.$refs.filterQueryTextarea.focus();
            },
            setActiveTabId(tab) {
                this.activeTabId = tab;
            },
            apply() {
                this.$emit(
                    "filterData",
                    this.activeTabService,
                    this.activeTabQuery
                );
                this.$moodal.filterModal.hide();
            },
        },
        watch: {
            tabs() {
                if (!this.activeTabId) {
                    this.activeTabId = this.tabs[0].id;
                }
            },
        },
        computed: {
            activeTab() {
                return this.$store.state.dataTable.data.find(
                    x => x.service.id === this.activeTabId
                );
            },
            activeTabData() {
                return this.activeTab ? this.activeTab.data : null;
            },
            activeTabService() {
                return this.activeTab ? this.activeTab.service : null;
            },
            activeTabQuery: {
                get() {
                    let where = "";
                    let activeService = this.$store.getters.tableActiveService;
                    if (!activeService || !this.activeTabId) return where;
                    let isBunch = serviceHelper.isBunch(activeService);
                    if (isBunch) {
                        let bunchLayer = bunchController.getBunchLayer(
                            activeService.id,
                            this.activeTabId
                        );
                        where = bunchLayer.query.where;
                    } else {
                        let layer = layerController.getDynamicLayer(
                            this.activeTabId
                        );
                        where = layer.query.where;
                    }

                    return where;
                },
                set(query) {
                    if (query) {
                        let activeService = this.$store.getters.tableActiveService;
                        let isBunch = serviceHelper.isBunch(activeService);
                        if (isBunch) {
                            bunchController.setQuery(
                                activeService,
                                this.activeTabId,
                                query
                            );
                        } else layerController.setQuery(activeService, query);
                    }
                },
            },

            tabs() {
                return this.$store.state.dataTable.tabs;
            },
            tableFeaturesHeader() {
                if (this.activeTabData) {
                    return Object.keys(this.activeTabData.tableHeadersWithAlias);
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
    };
</script>
