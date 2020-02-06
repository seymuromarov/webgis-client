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
        :value="dynamicLayerList"
        @input="$emit('dynamicLayerListOnChange', $event)"
        v-bind="dragOptionsDynamic"
        @start="isDragging = true"
        @end="$emit('onMoveCallbackDynamicLayerList', $event)"
      >
        <transition-group type="transition" name="flip-list">
          <li
            class="list-group-item list-group-item--custom"
            v-for="element in dynamicLayerList"
            :key="element.name"
            style="text-align: left"
          >
            <!-- New Tree -->
            <DynamicLayerTree
              :item="element"
              :selectedLayers="selectedLayers"
              :dynamicSubLayerList="dynamicSubLayerList"
              @selectService="selectService"
              @selectSubService="selectSubService"
              @getTableData="getTableData"
              @dynamicLayersReset="dynamicLayersReset"
              @dynamicSubLayerListOnChange="
                $emit('dynamicSubLayerListOnChange')
              "
            />

            <!-- Old Tree -->
            <!-- <div class="row">
                            <div class="col-12 layerDiv">
                                <input
                                    class="parentCheckbox"
                                    :id="element.name"
                                    :name="element.name"
                                    type="checkbox"
                                    :value="selectedLayers[element.id]"
                                    @input="
                                        $emit(
                                            'selectedLayersOnChange',
                                            $event,
                                            element.id
                                        )
                                    "
                                    @click="
                                        $emit(
                                            'selectService',
                                            element,
                                            element.order,
                                            true,
                                            $event,
                                            false
                                        )
                                    "
                                />
                                <i
                                    class="checkbox-icon far fa-check-circle"
                                ></i>
                                <label :for="element.showingLabel"></label>
                                <span class="serviceTitle">{{
                                    element.showingLabel
                                }}</span>

                                <span>
                                    <i
                                        v-if="
                                            element.collapseVisibility &&
                                                !element.layersVisibility
                                        "
                                        @click="
                                            $emit(
                                                'dynamicLayersReset',
                                                element,
                                                true
                                            )
                                        "
                                        class="fas fa-caret-left makeMePoint"
                                    ></i>
                                    <i
                                        v-if="element.layersVisibility"
                                        @click="
                                            element.layersVisibility = false
                                        "
                                        class="fas fa-caret-down makeMePoint"
                                    ></i>
                                </span>
                            </div>
                        </div>

                        <div
                            style="background: whitesmoke;padding-top: 10px; "
                            v-show="element.layersVisibility"
                        >
                            <div
                                class="row layerDiv"
                                v-for="(layer, index) in element.layers"
                                :key="index"
                                :style="{
                                    paddingLeft: layer.margin * 30 + 'px',
                                }"
                            >
                                <div class="col-12" style="white-space: nowrap">
                                    <input
                                        class="parentCheckbox"
                                        v-show="layer.geometryType"
                                        :id="element.name + layer.id"
                                        :value="element.name + layer.id"
                                        :name="element.name + layer.id"
                                        @input="
                                            e =>
                                                $emit(
                                                    'dynamicSubLayerListOnChange',
                                                    e,
                                                    element.name,
                                                    layer.id
                                                )
                                        "
                                        type="checkbox"
                                        @click="
                                            $emit(
                                                'selectSubService',
                                                element,
                                                element.order,
                                                layer.id,
                                                $event
                                            )
                                        "
                                    />
                                    <i
                                        class="checkbox-icon far fa-check-circle"
                                    ></i>
                                    <label
                                        :for="element.name + layer.id"
                                    ></label>

                                    <span
                                        class="serviceTitle"
                                        :for="layer.name"
                                        >{{ layer.name }}</span
                                    >
                                    <div>
                                        <i
                                            class="dataIcon fas fa-table"
                                            @click="
                                                $emit(
                                                    'getTableData',
                                                    element,
                                                    layer.id,
                                                    layer.name,
                                                    { where: '1=1' }
                                                )
                                            "
                                        ></i>
                                        <i
                                            style="margin-left: 10px;"
                                            class="dataIcon fab fa-codiepie"
                                            v-if="element.color === true"
                                            @click="
                                                $emit(
                                                    'openColorPicker',
                                                    element,
                                                    layer.id,
                                                    layer.name,
                                                    element.order
                                                )
                                            "
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>-->
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
          @click="$emit('setBaseLayersShow', !baseLayersShow)"
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
        :value="baseLayerList"
        @input="$emit('setBaseLayerList', $event)"
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="$emit('onMoveCallbackBaseLayerList', $event)"
      >
        <transition-group type="transition" name="flip-list">
          <li
            class="list-group-item list-group-item--custom"
            v-for="element in baseLayerList"
            :key="element.name"
            style="text-align: left"
          >
            <BaseLayerTree
              :item="element"
              :selectedLayers="selectedLayers"
              @selectService="selectService"
              @getTableData="getTableData"
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
    DynamicLayerTree
  },
  props: {
    selectedLayers: {
      type: Object
    },
    baseLayerList: {
      type: Array
    },
    dynamicSubLayerList: {
      type: Array
    },
    baseLayersShow: {
      type: Boolean
    },
    dragOptions: {
      type: Object
    }
  },
  data() {
    return {
      dynamicLayersShow: true,
      isDragging: false
    };
  },
  computed: {
    userName() {
      return this.$cookie.get("username");
    },
    dynamicLayerList() {
      return this.$store.state.layers.dynamicLayerList;
    },
    dynamicLayerListModel: {
      get() {
        return this.dynamicLayerList;
      },
      set(val) {
        this.$emit("dynamicLayerListOnChange", val);
      }
    },
    dragOptionsDynamic() {
      return {
        animation: 0,
        group: "dynamicDragger",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    logout() {
      this.$cookie.delete("token");
      this.$cookie.delete("username");
      this.$router.push("/login");
    },
    selectService(service, index, dynamic, e, isHashLoaded) {
      this.$emit("selectService", service, index, dynamic, e, isHashLoaded);
    },
    selectSubService(service, index, id, e) {
      this.$emit("selectSubService", service, index, id, e);
    },

    getTableData(service, layerId, layerName, query) {
      this.$emit("getTableData", service, layerId, layerName, query);
    },
    // showSimpleFilterModal(layerId, layerName) {
    //     this.$emit("showSimpleFilterModal", layerId, layerName);
    // },
    basemapLayersReset(service, status) {
      this.$emit("basemapLayersReset", service, status);
    },
    dynamicLayersReset(service, status) {
      this.$emit("dynamicLayersReset", service, status);
    }
  }
};
</script>
