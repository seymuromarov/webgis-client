<template>
  <div class="padding-0 sup-bar-layout Sidebar">
    <!-- Logo -->
    <img src="@/assets/logo-en.png" alt="logo" class="azc-cosmos-logo" />

    <!-- User -->
    <div class="userNameLabel">
      <span class>{{ userName }}</span>
      <i
        @click="logout"
        title="Log out"
        class="logOutIcon fas fa-power-off"
        style="margin-left: 10px;"
      ></i>
    </div>

    <hr />

    <h5 class="text-left-layer" v-if="dynamicLayerList.length > 0">
      Dynamic Layers
      <span>
        <i
          @click="dynamicLayersShow = !dynamicLayersShow"
          class="fas makeMePoint"
          :class="dynamicLayersShow ? 'fa-caret-down' : 'fa-caret-left'"
        />
      </span>
    </h5>

    <LayerColorPicker @saveColor="$emit('saveColor')" />

        <transition name="slide-fade">
            <Draggable
                v-show="dynamicLayersShow"
                class="list-group"
                tag="ul"
                key="dynamicLayer"
                v-bind="dragOptionsDynamic"
                v-model="dynamicLayerListModel"
                @start="isDragging = true"
                @end="$emit('onMoveCallbackDynamicLayerList', $event)"
            >
                <transition-group type="transition" name="flip-list">
                    <li
                        class="list-group-item list-group-item--custom"
                        v-for="(element, index) in dynamicLayerList"
                        :key="index"
                        style="text-align: left"
                    >
                        <!-- Tree -->
                        <DynamicLayerTree
                            :item="element"
                            :selectedLayers="selectedLayers"
                            :dynamicSubLayerList="dynamicSubLayerList"
                            @selectService="selectService"
                            @selectSubService="selectSubService"
                            @getTableData="getTableData"
                            @showSimpleFilterModal="showSimpleFilterModal"
                            @dynamicLayersReset="dynamicLayersReset"
                            @dynamicSubLayerListOnChange="
                                dynamicSubLayerListOnChange
                            "
                        />
                    </li>
                </transition-group>
            </Draggable>
        </transition>

    <SimpleFilterModal ref="reportFilterModal" />

    <hr />

        <h5 class="text-left-layer" v-if="baseLayerList.length > 0">
            Basemaps
            <span>
                <i
                    @click="baseLayersShow = !baseLayersShow"
                    class="fas makeMePoint"
                    :class="baseLayersShow ? 'fa-caret-down' : 'fa-caret-left'"
                ></i>
            </span>
        </h5>

        <transition name="slide-fade">
            <Draggable
                class="list-group"
                v-show="baseLayersShow"
                tag="ul"
                key="baseLayers"
                v-model="baseLayerListModel"
                v-bind="dragOptions"
                @start="isDragging = true"
                @end="$emit('onMoveCallbackBaseLayerList', $event)"
            >
                <transition-group type="transition" name="flip-list">
                    <li
                        class="list-group-item list-group-item--custom"
                        v-for="(element, index) in baseLayerList"
                        :key="index"
                        style="text-align: left"
                    >
                        <BaseLayerTree
                            :item="element"
                            :selectedLayers="selectedLayers"
                            @selectService="selectService"
                            @getTableData="getTableData"
                            @showSimpleFilterModal="showSimpleFilterModal"
                            @basemapLayersReset="basemapLayersReset"
                        />
                    </li>
                </transition-group>
            </Draggable>
        </transition>
    </div>
</template>

<script>
import {
  LayerColorPicker,
  SimpleFilterModal,
  BaseLayerTree,
  DynamicLayerTree
} from "../index";
import Draggable from "vuedraggable";

export default {
    name: "Sidebar",
    components: {
        LayerColorPicker,
        SimpleFilterModal,
        Draggable,
        BaseLayerTree,
        DynamicLayerTree,
    },
    data() {
        return {
            dynamicLayersShow: true,
            isDragging: false,
            baseLayersShow: true,
        };
    },
    computed: {
        userName() {
            return this.$cookie.get("username");
        },
        dragOptions() {
            return {
                animation: 0,
                group: "baseDragger",
                disabled: false,
                ghostClass: "ghost",
            };
        },
        dragOptionsDynamic() {
            return {
                animation: 0,
                group: "dynamicDragger",
                disabled: false,
                ghostClass: "ghost",
            };
        },
        dynamicLayerListModel: {
            get() {
                return this.dynamicLayerList;
            },
            set(val) {
                this.$store.dispatch("SET_DYNAMIC_LAYER_LIST", val);
            },
        },
        baseLayerListModel: {
            get() {
                return this.$store.getters.baseLayerList;
            },
            set(val) {
                this.$store.dispatch("SET_BASE_LAYER_LIST", val);
            },
        },
        
        selectedLayers() {
            return this.$store.getters.selectedLayers;
        },
        dynamicLayerList() {
            return this.$store.getters.dynamicLayerList;
        },
        dynamicSubLayerList() {
            return this.$store.getters.dynamicSubLayerList;
        },
        baseLayerList() {
            return this.$store.getters.baseLayerList;
        },
    },
    methods: {
        logout() {
            this.$cookie.delete("token");
            this.$cookie.delete("username");
            this.$router.push("/login");
        },
        selectService(service, index, dynamic, e, isHashLoaded) {
            this.$emit(
                "selectService",
                service,
                index,
                dynamic,
                e,
                isHashLoaded
            );
        },
        selectSubService(service, index, id, e) {
            this.$emit("selectSubService", service, index, id, e);
        },
        getTableData(service, layerId, layerName, query) {
            this.$emit("getTableData", service, layerId, layerName, query);
        },
        showSimpleFilterModal(layerId, layerName) {
            this.$emit("showSimpleFilterModal", layerId, layerName);
        },
        basemapLayersReset(service, status) {
            this.$emit("basemapLayersReset", service, status);
        },
        dynamicLayersReset(service, status) {
            this.$emit("dynamicLayersReset", service, status);
        },
        dynamicSubLayerListOnChange(e, name, id) {
            let dynamicSubLayerList = this.dynamicSubLayerList;
            dynamicSubLayerList[name][id] = e.target.value;
            this.$store.dispatch(
                "SET_DYNAMIC_SUBLAYER_LIST",
                dynamicSubLayerList
            );
        },
    },
};
</script>
