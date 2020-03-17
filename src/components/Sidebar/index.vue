<template>
  <div class="Sidebar">
    <!-- Menu -->
    <div class="menu">
      <div class="menu--top">
        <div class="menu__item" v-for="item in topMenu" :key="item.key">
          <button
            class="menu__item__button"
            @click="item.click"
            :title="item.label"
          >
            <img
              :src="require(`../../assets/images/icons/${item.image}`)"
              alt=""
              :class="{ active: activeMenu === item.key }"
            />
          </button>
        </div>
      </div>
      <div class="menu--bottom">
        <div class="menu__item" v-for="item in bottomMenu" :key="item.key">
          <button
            class="menu__item__button"
            @click="item.click"
            :title="item.label"
          >
            <img
              :src="require(`../../assets/images/icons/${item.image}`)"
              alt=""
              :class="{ active: activeMenu === item.key }"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- User Profile -->
    <div class="user-profile" v-show="activeMenu === 'profile'">
      <div class="user__name">{{ userName }}</div>
      <div class="logout" @click="logout">
        <i title="Log out" class="fas fa-power-off"></i>
      </div>
    </div>

    <!-- Layer Types -->
    <div class="layer-types" v-show="activeMenu === 'layerTypes'">
      <div
        v-for="(layer, key) in baseMaps"
        :key="key"
        class="layer-types__item"
        :class="{ active: activeLayerType === key }"
        @click="setBaseLayout(key)"
      >
        {{ capitalize(key) }}
      </div>
    </div>

    <!-- Dynamic Layers -->
    <div class="list layers" v-show="activeMenu === 'dynamicLayers'">
      <div class="list__header">Dynamic layers</div>
      <div class="list__tabs">
        <div
          class="tab"
          :class="{
            'tab--active': dynamicActiveTab === 'dynamicTab'
          }"
          @click="setDynamicActiveTab('dynamicTab')"
        >
          Standart
        </div>
        <div
          class="tab"
          :class="{ 'tab--active': dynamicActiveTab === 'bunchTab' }"
          @click="setDynamicActiveTab('bunchTab')"
        >
          Customized
        </div>
      </div>

      <ul
        v-if="dynamicActiveTab === 'dynamicTab'"
        class="list__content list__content--parent custom-scrollbar"
      >
        <transition name="slide-fade">
          <Draggable
            key="dynamicLayer"
            :v-bind="() => dragOptions('dynamicDragger')"
            v-model="dynamicLayerListModel"
            @start="isDragging = true"
            @end="$emit('onMoveCallbackDynamicLayerList', $event)"
          >
            <transition-group type="transition" name="flip-list">
              <LayerTree
                v-for="(layer, index) in dynamicLayersList"
                :key="layer.name + index"
                :data="layer"
                @dynamicLayersReset="dynamicLayersReset"
                @saveColor="saveColor"
                @selectService="selectService"
                @selectSubLayer="selectSubLayer"
                @getTableData="getTableData"
              />
            </transition-group>
          </Draggable>
        </transition>
      </ul>

      <ul
        v-show="dynamicActiveTab === 'bunchTab'"
        class="list__content list__content--parent custom-scrollbar"
      >
        <transition name="slide-fade">
          <Draggable
            key="dynamicLayer"
            :v-bind="() => dragOptions('bunchDragger')"
            v-model="bunchLayerList"
            @start="isDragging = true"
            @end="$emit('onMoveCallbackDynamicLayerList', $event)"
          >
            <transition-group type="transition" name="flip-list">
              <LayerTree
                v-for="(bunch, index) in bunchLayerList"
                :key="bunch.name + index"
                :data="bunch"
                @selectService="selectService"
                @saveColor="saveColor"
                @getTableData="getTableData"
              />
            </transition-group>
          </Draggable>
        </transition>
      </ul>

      <button
        v-show="dynamicActiveTab === 'bunchTab'"
        class="btn btn--add-new"
        @click="openComputedLayerModal"
      >
        <i class="fas fa-plus"></i>&nbsp;&nbsp;Add
      </button>
    </div>

    <!-- Basemaps -->
    <div class="list layers" v-show="activeMenu === 'baseMap'">
      <div class="list__header">Basemaps</div>

      <ul class="list__content list__content--parent custom-scrollbar">
        <transition name="slide-fade">
          <Draggable
            key="baseLayers"
            v-model="baseLayerListModel"
            :v-bind="() => dragOptions('baseDragger')"
            @start="isDragging = true"
            @end="$emit('onMoveCallbackBaseLayerList', $event)"
          >
            <transition-group type="transition" name="flip-list">
              <LayerTree
                v-for="(layer, index) in baselayerList"
                :key="layer.name + index"
                :data="layer"
                @selectService="selectService"
                @selectSubLayer="selectSubLayer"
                @getTableData="getTableData"
              />
            </transition-group>
          </Draggable>
        </transition>
      </ul>
    </div>

    <!-- Tools -->
    <div class="list tools" v-show="activeMenu === 'tools'">
      <div class="list__header">Tools</div>

      <ul class="list__content list__content--parent custom-scrollbar">
        <li class="list__item" v-for="tool in toolList" :key="tool.key">
          <div class="item__header" @click="tool.click">
            <span class="title">
              <img
                :src="require(`../../assets/images/icons/${tool.image}`)"
                alt=""
                class="pre"
              />
              {{ tool.label }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LayerTree from "./LayerTree";
import Draggable from "vuedraggable";

export default {
  name: "Sidebar",
  components: {
    LayerTree,
    Draggable
  },
  props: {
    baseMaps: { type: Object }
  },
  data() {
    return {
      activeMenu: "",
      activeLayerType: "gray",
      layerTypesVisible: false,
      isDragging: false,
      dynamicActiveTab: "dynamicTab"
    };
  },
  computed: {
    userName() {
      return localStorage.getItem("username");
    },
    topMenu() {
      return [
        {
          key: "profile",
          label: "Profile",
          image: "user.svg",
          click: () => {
            this.toggleActiveMenu("profile");
          }
        },
        {
          key: "tools",
          label: "Tools",
          image: "pencil.svg",
          click: () => {
            this.toggleActiveMenu("tools");
          }
        },
        {
          key: "dynamicLayers",
          label: "Dynamic Layers",
          image: "layer.svg",
          click: () => {
            this.toggleActiveMenu("dynamicLayers");
          }
        },
        {
          key: "baseMap",
          label: "Basemaps",
          image: "map.svg",
          click: () => {
            this.toggleActiveMenu("baseMap");
          }
        }
      ];
    },
    bottomMenu() {
      return [
        {
          key: "information",
          label: "Information",
          image: "information.svg",
          click: this.showInfoModal
        },
        {
          key: "layerTypes",
          label: "Layer Types",
          image: "hamburger.svg",
          click: () => {
            this.toggleActiveMenu("layerTypes");
          }
        },
        {
          key: "exportPNG",
          label: "Export PNG",
          image: "picture.svg",
          click: this.exportPNG
        },
        {
          key: "exportGeojson",
          label: "Export GeoJSON",
          image: "file_download.svg",
          click: this.exportData
        },
        {
          key: "fullscreen",
          label: "Full screen",
          image: "fullscreen.svg",
          click: this.fullScreen
        }
      ];
    },
    dynamicLayersList() {
      return this.$store.getters.dynamicLayerList;
    },
    bunchLayerList() {
      return this.$store.getters.bunchLayerList;
    },
    baselayerList() {
      return this.$store.getters.baseLayerList;
    },
    toolList() {
      return [
        {
          key: "mouse",
          label: "Mouse",
          image: "mouse.svg",
          click: () => {
            this.setDrawType("None");
          }
        },
        {
          key: "addPoint",
          label: "Add point",
          image: "point.svg",
          click: this.addPlace
        },
        {
          key: "rectangle",
          label: "Rectangle",
          image: "rectangle.svg",
          click: () => {
            this.setDrawType("Box");
          }
        },
        {
          key: "square",
          label: "Square",
          image: "square.svg",
          click: () => {
            this.setDrawType("Square");
          }
        },
        {
          key: "circle",
          label: "Circle",
          image: "circle.svg",
          click: () => {
            this.setDrawType("Circle");
          }
        },
        {
          key: "polygon",
          label: "Polygon",
          image: "polygon.svg",
          click: () => {
            this.setDrawType("Polygon");
          }
        },
        {
          key: "line",
          label: "Line",
          image: "line.svg",
          click: () => {
            this.setDrawType("LineString");
          }
        },
        {
          key: "addPlace",
          label: "Add place",
          image: "place.svg",
          click: () => {}
        },
        {
          key: "reset",
          label: "Reset",
          image: "reset.svg",
          click: this.reset
        },
        {
          key: "delete",
          label: "Delete",
          image: "delete.svg",
          click: this.delete
        },
        {
          key: "pickColor",
          label: "Pick color",
          image: "color_picker.svg",
          click: this.pickColor
        },
        {
          key: "changeDetection",
          label: "Change detection",
          image: "world.svg",
          click: this.changeDetector
        },
        {
          key: "graticule",
          label: "Graticule",
          image: "grid.svg",
          click: this.addGraticule
        }
      ];
    },

    dragOptions(group) {
      return {
        animation: 0,
        group: "baseDragger",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    dynamicLayerListModel: {
      get() {
        return this.dynamicLayerList;
      },
      set(val) {
        this.$store.dispatch("saveDynamicLayerList", val);
      }
    },
    baseLayerListModel: {
      get() {
        return this.$store.getters.baseLayerList;
      },
      set(val) {
        this.$store.dispatch("saveBaseLayerList", val);
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.$router.push("/login");
    },
    fullScreen() {
      if (
        window.innerWidth == screen.width &&
        window.innerHeight == screen.height
      ) {
        document.exitFullscreen();
      } else {
        document.querySelector("body").requestFullscreen();
      }
    },
    toggleActiveMenu(menu) {
      if (this.activeMenu === menu) {
        this.activeMenu = "";
      } else {
        this.activeMenu = menu;
      }
    },

    dynamicLayersReset(item, status) {
      this.$emit("dynamicLayersReset", item, status);
    },
    selectSubLayer(service, index, id, event) {
      this.$emit("selectSubLayer", service, index, id, event);
    },
    selectService(data, isChecked) {
      this.$emit("selectService", data, isChecked);
    },
    getTableData(service, itemId, itemName, query) {
      this.$store.dispatch("SAVE_DATATABLE_ACTIVE_SERVICE", service);
      this.$store.dispatch("RESET_DATATABLE", service);
      this.$emit("getTableData", service, itemId, itemName, query);
    },
    showInfoModal() {
      this.$emit("showInfoModal");
    },
    exportPNG() {
      this.$emit("exportPNG");
    },
    exportData() {
      this.$emit("exportData");
    },
    setBaseLayout(key) {
      this.activeLayerType = key;
      this.$emit("setBaseLayout", key);
    },
    saveColor(service, color) {
      this.$emit("saveColor", service, color);
    },
    setDrawType(key) {
      this.$emit("setDrawType", key);
    },
    pickColor() {
      this.$emit("pickColor");
    },
    changeDetector() {
      this.$emit("changeDetector");
    },
    addGraticule() {
      this.$emit("addGraticule");
    },
    addPlace() {
      this.$emit("addPlace");
    },
    delete() {
      this.$emit("delete");
    },
    reset() {
      this.$emit("reset");
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    setDynamicActiveTab(tabLabel) {
      this.dynamicActiveTab = tabLabel;
    },
    openComputedLayerModal() {
      this.$moodal.computedLayerModal.show();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/style/sidebarStyle.scss";
</style>
