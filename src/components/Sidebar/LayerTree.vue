<template>
    <li class="list__item">
        <span class="item__header" :style="`padding-left: ${paddingLeft}`">
            <span class="title">
                <!-- Switch -->
                <ToggleSwitch
                    v-if="!isCategory"
                    class="pre"
                    v-model="switchModel"
                />
                <i class="far fa-folder pre" v-else></i>
                {{ data.name }}
            </span>

            <!-- Caret icons -->
            <span v-if="caretIconsVisibility">
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
            <span v-if="operationsVisibility" class="icons">
                <img
                    v-if="colorIconVisibility"
                    src="@/assets/images/icons/color_fill.svg"
                    alt=""
                    @click="toggleColorPicker"
                />
                <img
                    v-if="tableIconVisibility"
                    src="@/assets/images/icons/list.svg"
                    alt=""
                    @click="
                        $emit('getTableData', parent, data.id, data.name, {
                            where: '1=1',
                        })
                    " />
            </span>
        </span>

        <!-- Color Picker -->
        <LayerColorPicker v-if="colorPickerVisibility" />

        <ul v-if="data.layers && subListVisibility" class="list__content">
            <LayerTree v-for="(children, index) in data.children"
                       :key="children.name + index"
                       :data="children"
                       :parent="data"
                       :loop="loop + 1"
                       @selectSubLayer="selectSubLayer"
                       @selectLayer="selectLayer"
                       @getTableData="getTableData" />

            <LayerTree v-for="(layer, index) in data.layers"
                       :key="layer.name + index"
                       :data="layer"
                       :parent="data"
                       :loop="loop + 1"
                       @selectSubLayer="selectSubLayer"
                       @selectLayer="selectLayer"
                       @getTableData="getTableData" />
        </ul>
    </li>
</template>

<script>
import ToggleSwitch from "../common/ToggleSwitch";
import LayerColorPicker from "../LayerColorPicker";

export default {
    name: "LayerTree",
    components: {
        ToggleSwitch,
        LayerColorPicker,
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
        caretIconsVisibility() {
            return (
                this.isCategory ||
                (this.data.layers && this.data.collapseVisibility)
            );
        },
        tableIconVisibility() {
            return (
                this.data.mapType !== "basemap" &&
                this.loop > 1 &&
                !this.data.layers &&
                !this.isCategory
            );
        },
        colorIconVisibility() {
            return this.data.resourceType === "azcArcgis"; // && this.color;
        },
        operationsVisibility() {
            return this.tableIconVisibility || this.colorIconVisibility;
        },
        colorPickerVisibility() {
            return this.activeColorPickerId === this.data.id;
        },
        activeColorPickerId: {
            get() {
                return this.$store.getters.activeColorPickerId;
            },
            set(value) {
                this.$store.dispatch("SAVE_ACTIVE_COLOR_PICKER_ID", value);
            },
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
        toggleColorPicker() {
            if (this.activeColorPickerId === this.data.id) {
                this.activeColorPickerId = null;
            } else {
                this.activeColorPickerId = this.data.id;
            }
        },
    },
};
</script>
