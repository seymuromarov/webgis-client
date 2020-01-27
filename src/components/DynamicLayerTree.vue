<template class="base-layer-tree">
    <div>
        <div style="text-align: left;">
            <div class="row">
                <div class="col-12 layerDiv">
                    <!-- Category -->
                    <span v-if="isCategory(item)" @click="toggle">
                        <i class="icon-unchecked fas fa-layer-group "></i>
                        <span class="serviceTitle layer-category-group">
                            {{ item.name }}
                        </span>
                        <i v-if="isOpen" class="icon-checked fas fa-minus"></i>
                        <i v-else class="icon-unchecked fas fa-plus"></i
                    ></span>

                    <!-- Layer -->
                    <span v-else>
                        <input
                            class="parentCheckbox"
                            :id="item.name"
                            :name="item.name"
                            type="checkbox"
                            v-model="selectedLayers[item.id]"
                            @click="
                                selectService(item, item.order, false, $event)
                            "
                        />
                        <i class="checkbox-icon far fa-check-circle"></i>
                        <label :for="item.name"></label>

                        <span class="serviceTitle">
                            {{ item.showingLabel }}
                        </span>

                        <!-- Caret icons -->
                        <span>
                            <i
                                v-if="
                                    item.collapseVisibility &&
                                        !item.layersVisibility
                                "
                                @click="dynamicLayersReset(item, true)"
                                class="fas fa-caret-left makeMePoint"
                            ></i>
                            <i
                                v-if="item.layersVisibility"
                                @click="item.layersVisibility = false"
                                class="fas fa-caret-down makeMePoint"
                            ></i>
                        </span>
                    </span>
                </div>
            </div>

            <!-- Sublist -->
            <div
                style="background: whitesmoke; padding: 5px 0; margin: 10px 0 0 10px"
                v-show="item.layersVisibility"
            >
                <div
                    class="row layerDiv"
                    v-for="(layer, index) in item.layers"
                    :key="index"
                >
                    <div class="col-12" style="white-space: nowrap">
                        <input
                            class="parentCheckbox"
                            v-show="layer.geometryType"
                            :id="item.name + layer.id"
                            :name="item.name + layer.id"
                            type="checkbox"
                            v-if="
                                dynamicSubLayerList != undefined &&
                                    dynamicSubLayerList[item.name] != undefined
                            "
                            @click="
                                selectSubService(
                                    item,
                                    item.order,
                                    layer.id,
                                    $event
                                )
                            "
                            v-model="dynamicSubLayerList[item.name][layer.id]"
                        />
                        <i class="checkbox-icon far fa-check-circle"></i>
                        <label :for="item.name + layer.id"></label>

                        <span class="serviceTitle" :for="layer.name">{{
                            layer.name
                        }}</span>

                        <i
                            class="dataIcon fas fa-table"
                            style="margin-left: 8px"
                            @click="
                                getTableData(item, layer.id, layer.name, {
                                    where: '1=1',
                                })
                            "
                        ></i>
                        <i
                            v-if="layer.name.trim() == 'CropMap2019_vector'"
                            class="fas fa-filter reportIcon"
                            style="color:blue;margin-left: 10px;"
                            @click="
                                showSimpleFilterModal(
                                    layer.id,
                                    item.unitedDynamicLayerName.name
                                )
                            "
                        ></i>
                    </div>
                </div>
            </div>
        </div>

        <ul v-show="isOpen" v-if="isCategory(item)">
            <li
                class="list-group-item"
                v-for="(element, index) in item.children"
                :key="index"
            >
                <treeItem
                    :item="element"
                    :selectedLayers="selectedLayers"
                    :dynamicSubLayerList="dynamicSubLayerList"
                ></treeItem>
            </li>
        </ul>
        <ul v-show="isOpen" v-if="isCategory(item)">
            <li
                class="list-group-item"
                v-for="(element, index) in item.layers"
                :key="index"
            >
                <treeItem
                    :item="element"
                    :selectedLayers="selectedLayers"
                    :dynamicSubLayerList="dynamicSubLayerList"
                    @selectService="selectService"
                    @selectSubService="selectSubService"
                    @dynamicLayersReset="dynamicLayersReset"
                    @getTableData="getTableData"
                />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "treeItem",
    props: ["item", "selectedLayers", "dynamicSubLayerList"],
    data: function() {
        return {
            isOpen: false,
        };
    },
    mounted() {
        console.log("TCL: this.dynamicSubLayerList", this.dynamicSubLayerList);
        console.log("TCL: this.asdasdas", this.item);
    },
    computed: {
        checkIfToggled(element, layer) {
            if (this.dynamicSubLayerList[element.name][layer.id]) {
                return true;
            } else {
                return false;
            }
        },
    },

    methods: {
        toggle: function() {
            if (this.isCategory) {
                this.isOpen = !this.isOpen;
            }
        },
        getTableData(service, layerId, layerName, query) {
            this.$emit("getTableData", service, layerId, layerName, query);
        },
        selectService(service, index, dynamic, e) {
            this.$emit("selectService", service, index, dynamic, e);
        },
        dynamicLayersReset(service, status) {
            this.$emit("dynamicLayersReset", service, status);
        },
        showSimpleFilterModal(layerId, layerName) {
            this.$emit("showSimpleFilterModal", layerId, layerName);
        },
        isCategory: function(item) {
            return item.children && item.layers;
        },
        selectSubService(service, index, id, e) {
            this.$emit("selectSubService", service, index, id, e);
        },
    },
};
</script>
<style>
.base-layer-tree.tree-item {
    cursor: pointer !important;
}

.base-layer-tree ul {
    text-align: left;
    list-style-type: none;
}

.icon-unchecked {
    color: #c6c6c6;
}

.icon-checked {
    color: #008422;
}
</style>
