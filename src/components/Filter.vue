<template>
    <div id="filterDiv" class="filterDiv">
        <div id="filterDivHeader" class="filterDivHeader">
            <label class="filterLayerName">{{ tableHeader }}</label>
        </div>
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
        <div class="filterCenterDiv">
            <div class="filterActionsDiv">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <button
                                    @click="$emit('appendFilterQuery', '= ')"
                                    class="parameterButton btn btn-sm btn-outline-secondary"
                                >
                                    =
                                </button>
                            </td>
                            <td>
                                <button
                                    @click="$emit('appendFilterQuery', '>= ')"
                                    class="parameterButton btn btn-sm btn-outline-secondary"
                                >
                                    >=
                                </button>
                            </td>
                            <td>
                                <button
                                    @click="$emit('appendFilterQuery', '> ')"
                                    class="parameterButton btn btn-sm btn-outline-secondary"
                                >
                                    >
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    @click="$emit('appendFilterQuery', '<= ')"
                                    class="parameterButton btn btn-sm btn-outline-secondary"
                                >
                                    &le;
                                </button>
                            </td>
                            <td>
                                <button
                                    @click="$emit('appendFilterQuery', '< ')"
                                    class="parameterButton btn btn-sm btn-outline-secondary"
                                >
                                    &lt;
                                </button>
                            </td>
                            <td>
                                <button
                                    @click="$emit('appendFilterQuery', 'LIKE ')"
                                    class="parameterButton btn btn-sm btn-outline-secondary"
                                >
                                    like
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    @click="$emit('appendFilterQuery', '<> ')"
                                    class="parameterButton btn btn-sm btn-outline-secondary"
                                >
                                    <span>&lt;&gt;</span>
                                </button>
                            </td>
                            <td>
                                <button
                                    @click="$emit('appendFilterQuery', 'AND ')"
                                    class="parameterButton btn btn-sm btn-outline-secondary"
                                >
                                    and
                                </button>
                            </td>
                            <td>
                                <button
                                    @click="$emit('appendFilterQuery', 'OR ')"
                                    class="parameterButton btn btn-sm btn-outline-secondary"
                                >
                                    or
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    @click="
                                        $emit('appendFilterQuery', 'IS NULL')
                                    "
                                    class="parameterButton btn btn-sm btn-outline-secondary"
                                >
                                    null
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
            <div class="clear"></div>
        </div>
        <div class="filterSelectDiv">
            <label class="query-start">SELECT * FROM table WHERE:</label>
            <textarea
                class="queryTextArea"
                name="filterQuery"
                rows="4"
                cols="69"
                :value="filterQuery"
                @input="$emit('setFilterQuery', $event)"
            ></textarea>
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
    name: "Filter",
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
    methods: {
        addValueToQuery(value) {
            if (typeof value == "string") value = "'" + value + "'";
            this.$emit("appendFilterQuery", value + " ");
        },
    },
};
</script>
