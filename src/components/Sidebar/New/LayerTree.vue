<template>
    <li class="list__item">
        <span class="item__header" :style="`padding-left: ${paddingLeft}`">
            <span class="title">
                <ToggleSwitch
                    v-if="!isCategory"
                    class="pre"
                    v-model="switchModel"
                />
                <i class="far fa-folder pre" v-else></i>
                {{ data.name }}
            </span>

            <!-- Caret icons -->
            <span v-if="showCaretIcons">
                <i
                    class="fas fa-caret-down"
                    v-show="subListVisibility"
                    @click="toggleSubList"
                />
                <i
                    class="fas fa-caret-up"
                    v-show="!subListVisibility"
                    @click="toggleSubList"
                />
            </span>

            <!-- Color and Table icons -->
            <span v-if="showOperationIcons" class="icons">
                <!-- <img src="@/assets/images/icons/color_fill.svg" alt="" /> -->
                <img
                    src="@/assets/images/icons/list.svg"
                    alt=""
                    @click="
                        $emit('getTableData', parent, data.id, data.name, {
                            where: '1=1',
                        })
                    "
                />
            </span>
        </span>
        <ul v-if="data.layers && subListVisibility" class="list__content">
            <LayerTree
                v-for="(children, index) in data.children"
                :key="children.name + index"
                :data="children"
                :parent="data"
                :loop="loop + 1"
                @selectSubLayer="selectSubLayer"
                @selectLayer="selectLayer"
                @getTableData="getTableData"
            />

            <LayerTree
                v-for="(layer, index) in data.layers"
                :key="layer.name + index"
                :data="layer"
                :parent="data"
                :loop="loop + 1"
                @selectSubLayer="selectSubLayer"
                @selectLayer="selectLayer"
                @getTableData="getTableData"
            />
        </ul>
    </li>
</template>

<script>
import ToggleSwitch from "../../common/ToggleSwitch";

export default {
    name: "LayerTree",
    components: {
        ToggleSwitch,
    },
    props: {
        data: {
            type: Object,
        },
        parent: {
            type: Object,
        },
        loop: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            subListVisibility: false,
            layerIsSelected: false,
        };
    },
    computed: {
        switchModel: {
            get() {
                if (this.data.hasOwnProperty("collapseVisibility")) {
                    return this.data.collapseVisibility;
                } else {
                    return this.data.defaultVisibility;
                }
            },
            set(e) {
                if (e.target.checked === false) {
                    this.subListVisibility = false;
                }

                this.layerPicker(e);
            },
        },
        paddingLeft() {
            return this.loop * 16 + "px";
        },
        isCategory() {
            return this.data.hasOwnProperty("children");
        },
        showCaretIcons() {
            return (
                this.isCategory ||
                (this.data.layers && this.data.collapseVisibility)
            );
        },
        showOperationIcons() {
            return (
                this.data.mapType !== "basemap" &&
                this.loop > 1 &&
                !this.data.layers &&
                !this.isCategory
            );
        },
    },
    methods: {
        toggleSubList() {
            this.subListVisibility = !this.subListVisibility;
        },

        layerPicker(event) {
            if (!this.data.hasOwnProperty("parentLayerId")) {
                this.$emit(
                    "selectLayer",
                    this.data,
                    this.data.order,
                    this.data.mapType === "dynamic",
                    event
                );
            } else {
                this.$emit(
                    "selectSubLayer",
                    this.parent,
                    this.parent.order,
                    this.data.id,
                    event
                );
            }
        },
        selectLayer(item, order, itemId, event) {
            this.$emit("selectLayer", item, order, itemId, event);
        },
        selectSubLayer(parent, order, itemId, event) {
            this.$emit("selectSubLayer", parent, order, itemId, event);
        },
        getTableData(parent, layerId, layerName, query) {
            this.$emit("getTableData", parent, layerId, layerName, query);
        },
    },
};
</script>
