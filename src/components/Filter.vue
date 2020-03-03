<template>
    <div id="filterDiv" class="filterDiv">
        <!-- <div id="filterDivHeader" class="filterDivHeader"> -->
        <!-- <label class="filterLayerName">{{ tableHeader }}</label> -->
        <!-- <label class="filterLayerName">Filter</label> -->
        <!-- </div> -->

        <div class="tabs">
            <div class="tab tab--active">Riders</div>
            <div class="tab">On the</div>
            <div class="tab">Storm</div>
        </div>

        <!-- Columns -->
        <div class="filterFieldsListDiv">
            <ul class="filterFieldsList">
                <li
                    v-for="(alias, column) in tableFeaturesHeader"
                    :key="column"
                    @dblclick="
                        $emit(
                            'appendFilterQuery',
                            stackedTableFeaturesHeader[column] + ' '
                        )
                    "
                    @click="
                        $emit(
                            'filterSelectedColumn',
                            stackedTableFeaturesHeader[column]
                        )
                    "
                >
                    {{ alias }}
                </li>
            </ul>
        </div>

        <!-- Column Values -->
        <div class="filterValuesDiv">
            <ul class="filterValuesList">
                <li
                    @dblclick="addValueToQuery(value)"
                    class="filterValue"
                    v-for="(value, index) in filterValues"
                    :key="index"
                >
                    {{ value }}
                </li>
            </ul>
        </div>

        <!-- Actions -->
        <div class="filterCenterDiv">
            <div class="filterActionsDiv">
                <table>
                    <tbody>
                        <tr>
                            <td v-for="action in actionsList" :key="action">
                                <button
                                    @click="appendFilterQuery(action)"
                                    class="parameterButton btn btn-sm btn-outline-secondary"
                                >
                                    {{ action }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Textarea -->
        <div class="filterSelectDiv">
            <label class="query-start">SELECT * FROM table WHERE:</label>
            <textarea
                class="queryTextArea"
                ref="filterQueryTextarea"
                name="filterQuery"
                rows="4"
                cols="69"
                :value="filterQuery"
                @input="$emit('setFilterQuery', $event)"
            ></textarea>
            <div v-show="serviceInfo.resourceType === 'local'">
                <label>
                    <input
                        class="parentCheckbox"
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
            </div>
            <div>
                <button
                    class="btn btn-outline-info filterApplyButton"
                    @click="$emit('filterData')"
                >
                    Apply
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilterBox",
    props: {
        tableHeader: {
            type: String,
        },
        tableFeaturesHeader: {
            type: Array,
        },
        stackedTableFeaturesHeader: {
            type: Array,
        },
        filterQuery: {
            type: String,
        },
        filterValues: {
            type: Array,
        },
    },
    data() {
        return {
            actionsList: [
                "=",
                ">=",
                ">",
                "<=",
                "<",
                "LIKE",
                "<>",
                "AND",
                "OR",
                "IS NULL",
            ],
        };
    },
    computed: {
        serviceInfo() {
            return this.$store.state.dataTable.serviceInfo;
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
    methods: {
        addValueToQuery(value) {
            if (typeof value == "string") {
                value = "'" + value + "'";
            }
            this.$emit("appendFilterQuery", value + " ");
        },
        appendFilterQuery(value) {
            this.$emit("appendFilterQuery", value);
        },
    },
};
</script>

<style lang="scss">
.tabs {
    margin: 10px 0;
    display: flex;
    .tab {
        padding: 4px 8px;
        font-size: 14px;
        border: 1px solid #1a2537;
        border-radius: 4px;
        color: #1a2537;
        cursor: pointer;

        &:not(:last-child) {
            margin-right: 16px;
        }

        &--active,
        &:hover {
            background-color: #1a2537;
            color: #ffffff;
        }
    }
}
</style>
