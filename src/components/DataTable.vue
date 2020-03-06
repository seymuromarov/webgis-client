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
                        <div
                            class="table__tab"
                            v-for="tab in tabs"
                            :key="tab.id"
                            :class="{
                                'table__tab--active': tab.id == activeTab,
                            }"
                            @click="setActiveTab(tab.id)"
                        >
                            {{ tab.name }}
                        </div>
                    </div>
                    <div class="table__operations">
                        <download-excel
                            v-if="tableHeaders"
                            :fetch="fetchFullData"
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
                            class="fas fa-columns tableColumns makeMePoint icon"
                            @click="togglePopup"
                        >
                        </i>
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
                                        @click="
                                            selectColumns(alias, index, $event)
                                        "
                                        type="checkbox"
                                        :id="alias"
                                        :value="alias"
                                        v-model="checkedColumns"
                                        checked="checked"
                                        class="column__checkbox"
                                    />
                                    <label class="column__name">
                                        {{ alias }}
                                    </label>
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
                                    v-show="checkedColumns.includes(alias)"
                                    v-for="(alias, index) in tableHeaders"
                                    :key="index"
                                >
                                    {{ alias }}
                                </th>
                            </tr>
                        </thead>
                        <tbody class="tableBody custom-scrollbar">
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
                        <tr
                            v-for="(value, key) in selectedData.attributes"
                            :key="key"
                        >
                            <td class="paddingLeft">
                                {{ tableHeadersWithAlias[key] }}
                            </td>
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
import LayerService from "../services/LayerService";
import Resizable from "vue-resizable";
import CustomModal from "./common/Modal";

export default {
    name: "DataTable",
    components: {
        Multiselect,
        Resizable,
        CustomModal,
    },
    data() {
        return {
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
            tabs: [],
            activeTab: null,
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
        dataTable: {
            handler(value) {
                const services = value.services;

                let tabs = [];
                for (const service in services) {
                    tabs.push({
                        id: service,
                        name: services[service].tableName,
                    });
                }
                this.tabs = tabs;

                if (tabs.length) {
                    this.activeTab = tabs[0].id;
                }
                console.log("loading", this.loading);
            },
            deep: true,
            immediate: false,
        },
    },
    methods: {
        resetScroll() {
            if (this.$refs.dataTableContent) {
                this.$refs.dataTableContent.scrollTo(0, 0);
            }
        },
        isEndOfData() {
            return this.paging.page * this.paging.limit > this.totalCount;
        },
        scrollHandler() {
            const table = document.getElementById("dataTable");
            table.addEventListener("scroll", e => {
                if (
                    table.scrollTop + table.clientHeight >=
                        table.scrollHeight &&
                    !this.paging.isBusy &&
                    !this.isEndOfData() &&
                    this.serviceInfo.resourceType === "local"
                ) {
                    var page = this.paging.page;
                    page += 1;
                    this.isPagingBusy(true);
                    this.paging = {
                        ...this.paging,
                        page: page++,
                    };

                    this.getDatas();
                    this.isPagingBusy(false);
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
            var params = {
                layerId: this.serviceInfo.id,
                ...this.serviceInfo.query,
                ...this.paging,
            };
            var response = await LayerService.getLocalTableData(params);
            var data = response.data.features;
            this.tableData = [...this.tableData, ...data];
        },
        resetPaging() {
            this.paging = {
                isBusy: false,
                page: 1,
                limit: 25,
            };
        },
        toggleIsVisible() {
            this.$store.dispatch("SAVE_DATATABLE_VISIBLE", !this.isVisible);
        },
        togglePopup(e) {
            this.isColumnPopupShowing = !this.isColumnPopupShowing;
        },
        showFilterModal() {
            this.$emit("showFilterModal");
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
            var response = await LayerService.getLocalTableData({
                layerId: this.serviceInfo.id,
                ...this.serviceInfo.query,
                isGeometryDataExist: false,
            });
            console.log("fetchFullData -> response", response);
            var attributes = response.data.features.map((item, index) => {
                console.log("fetchFullData -> attributes", attributes);
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
        checkedColumnsToExcel() {
            let columns = {};

            for (let column in this.tableHeaders) {
                if (this.checkedColumns.includes(this.tableHeaders[column])) {
                    columns[
                        this.tableHeaders[column]
                    ] = this.tableStackedHeaders[column];
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
        },
        setActiveTab(tab) {
            this.activeTab = tab;
        },
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
            },
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
            },
        },
        tableHeadersWithAlias() {
            return this.$store.state.dataTable.tableHeadersWithAlias;
        },
        dataTable: {
            get() {
                const data = this.$store.state.dataTable;

                // for (const service in data.services) {
                //     this.tabs.push({
                //         id: service,
                //         name: data.services[service].tableName,
                //     });
                // }

                return data;
            },
        },
        tableData: {
            get() {
                // return this.$store.state.dataTable.tableData;
                if (this.activeTab) {
                    return this.$store.state.dataTable.services[this.activeTab]
                        .tableData;
                } else {
                    return null;
                }
            },
            set(value) {
                this.$store.dispatch("SAVE_DATATABLE_DATA", value);
            },
        },
        target() {
            return this.$store.state.dataTable.target;
        },
        checkedColumnsData: {
            get() {
                return this.$store.state.dataTable.checkedColumnsData;
            },
            set(value) {
                this.$store.dispatch(
                    "SAVE_DATATABLE_CHECKED_COLUMNS_DATA",
                    value
                );
            },
        },
        checkedColumns: {
            get() {
                return this.$store.state.dataTable.checkedColumns;
            },
            set(value) {
                this.$store.dispatch("SAVE_DATATABLE_CHECKED_COLUMNS", value);
            },
        },
        // checkedColumns() {
        //     return this.$store.state.dataTable.checkedColumns;
        // },
        lastBBOXOfShape() {
            return this.$store.state.dataTable.lastBBOXOfShape;
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
