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
    <div class="user-profile" v-show="isProfileTabActive">
      <div class="user__name">{{ userName }}</div>
      <div class="logout" @click="logout">
        <i title="Log out" class="fas fa-power-off"></i>
      </div>
    </div>

    <!-- Layer Types -->
    <div class="layer-types" v-show="isBaseMapTypeTabActive">
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
    <div class="list layers" v-show="isDynamicLayerTabActive">
      <div class="list__header">Dynamic layers</div>
      <div class="list__tabs">
        <div
          class="tab"
          :class="{
            'tab--active': dynamicActiveTab === 'dynamicTab',
          }"
          @click="setDynamicActiveTab('dynamicTab')"
        >
          Standard
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
            v-model="dynamicLayersList"
            @start="isDragging = true"
            @end="
              () => {
                onDraggableMoveCallback(serviceTypeEnum.DYNAMIC_LAYER);
              }
            "
          >
            <transition-group type="transition" name="flip-list">
              <LayerTree
                v-for="(layer, index) in dynamicLayersList"
                :key="layer.name + index"
                :data="layer"
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
            @end="
              () => {
                onDraggableMoveCallback(serviceTypeEnum.BUNCH);
              }
            "
          >
            <transition-group type="transition" name="flip-list">
              <LayerTree
                v-for="(bunch, index) in bunchLayerList"
                :key="bunch.name + index"
                :data="bunch"
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
    <div class="list layers" v-show="isBaseLayerTabActive">
      <div class="list__header">Basemaps</div>

      <ul class="list__content list__content--parent custom-scrollbar">
        <transition name="slide-fade">
          <Draggable
            key="baseLayers"
            v-model="baselayerList"
            :v-bind="() => dragOptions('baseDragger')"
            @start="isDragging = true"
            @end="
              () => {
                onDraggableMoveCallback(serviceTypeEnum.BASE_LAYER);
              }
            "
          >
            <transition-group type="transition" name="flip-list">
              <LayerTree
                v-for="(layer, index) in baselayerList"
                :key="layer.name + index"
                :data="layer"
              />
            </transition-group>
          </Draggable>
        </transition>
      </ul>
    </div>

    <!-- Tools -->
    <div class="list tools" v-show="isToolTabActive">
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
import {
  toolController,
  menuController,
  mapController,
  serviceController,
} from "@/controllers";
import { drawTypeEnum, menuTabEnum, serviceTypeEnum } from "@/enums";
export default {
  name: "Sidebar",
  components: {
    LayerTree,
    Draggable,
  },

  data() {
    return {
      serviceTypeEnum: serviceTypeEnum,
      activeMenu: "",
      activeLayerType: "gray",
      layerTypesVisible: false,
      isDragging: false,
      dynamicActiveTab: "dynamicTab",
      baseMaps: [],
    };
  },
  mounted() {
    this.baseMaps = mapController.getBaseMaps();
  },
  computed: {
    userName() {
      return localStorage.getItem("username");
    },

    isProfileTabActive() {
      return this.activeMenuTab === menuTabEnum.PROFILE;
    },
    isToolTabActive() {
      return this.activeMenuTab === menuTabEnum.TOOL;
    },
    isDynamicLayerTabActive() {
      return this.activeMenuTab === menuTabEnum.DYNAMIC_LAYER;
    },
    isBaseLayerTabActive() {
      return this.activeMenuTab === menuTabEnum.BASE_LAYER;
    },
    isBaseMapTypeTabActive() {
      return this.activeMenuTab === menuTabEnum.BASE_MAP_TYPE;
    },

    activeMenuTab() {
      return menuController.getActiveMenuTab();
    },
    topMenu() {
      return menuController.getTopMenu();
    },
    bottomMenu() {
      return menuController.getBottomMenu();
    },

    toolList() {
      return menuController.getToolList();
    },

    dragOptions(group) {
      return {
        animation: 0,
        group: "baseDragger",
        disabled: false,
        ghostClass: "ghost",
      };
    },

    bunchLayerList: {
      get() {
        return this.$store.getters.bunchLayerList;
      },
      set(val) {
        this.$store.dispatch("saveBuncLayerList", val);
      },
    },

    dynamicLayersList: {
      get() {
        return this.$store.getters.dynamicLayerList;
      },
      set(val) {
        this.$store.dispatch("saveDynamicLayerList", val);
      },
    },
    baselayerList: {
      get() {
        return this.$store.getters.baseLayerList;
      },
      set(val) {
        this.$store.dispatch("saveBaseLayerList", val);
      },
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.$router.push("/login");
    },
    onDraggableMoveCallback(type) {
      serviceController.onDraggableMoveCallback(type);
    },

    setBaseLayout(key) {
      this.activeLayerType = key;
      mapController.setBaseLayout(key);
    },

    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    setDynamicActiveTab(tabLabel) {
      this.dynamicActiveTab = tabLabel;
    },
    openComputedLayerModal() {
      this.$moodal.computedLayerModal.show();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/sidebarStyle.scss";
</style>
