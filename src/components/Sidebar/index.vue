<template>
  <div class="sidebar">
    <!-- Menu -->

    <div class="menu">
      <div class="menu--top">
        <div class="menu__item" v-for="item in topMenu" :key="item.key">
          <button
            class="menu__item__button"
            @click="item.click"
            :title="item.label"
          >
            <span
              v-if="item.key == menuTabEnum.PROFILE && notificationCount > 0"
              class="badge badge-notify"
              >{{ notificationCount }}</span
            >

            <img
              :src="item.image"
              alt=""
              :class="{ active: activeMenuTab === item.key }"
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
              :src="item.image"
              alt=""
              :class="{ active: activeMenuTab === item.key }"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- User Profile -->
    <div class="profile-popup" v-if="isProfileTabActive">
      <div
        class="profile-popup-item"
        style="cursor: pointer;"
        @click="showProfileModal"
      >
        <span>{{ $t("menu.profile.title") }}</span>
      </div>
      <div class="profile-popup-item" style="cursor: pointer;" @click="logout">
        <span>{{ $t("auth.logout") }}</span>
        <i title="Log out" class="fas fa-power-off ml-1"></i>
      </div>
    </div>

    <!-- Layer Types -->
    <div class="layer-types" v-if="isBaseMapTypeTabActive">
      <div
        v-for="(layer, index) in baseLayouts"
        :key="index"
        class="layer-types__item"
        :class="{ active: activeLayerType === layer.name }"
        @click="setBaseLayout(index)"
      >
        {{ layer.name }}
      </div>
    </div>

    <!-- Dynamic Layers -->
    <div class="list layers" v-if="isDynamicLayerTabActive">
      <div class="list__header">{{ $t("menu.dynamicLayers") }}</div>
      <div class="list__tabs">
        <div
          class="tab"
          :class="{
            'tab--active': dynamicActiveTab === 'dynamicTab',
          }"
          @click="setDynamicActiveTab('dynamicTab')"
        >
          {{ $t("menu.layerTabs.standard") }}
        </div>
        <div
          class="tab"
          :class="{ 'tab--active': dynamicActiveTab === 'bunchTab' }"
          @click="setDynamicActiveTab('bunchTab')"
        >
          {{ $t("menu.layerTabs.customized") }}
        </div>
        <div
          class="tab"
          :class="{ 'tab--active': dynamicActiveTab === 'favoriteTab' }"
          @click="setDynamicActiveTab('favoriteTab')"
        >
          {{ $t("menu.layerTabs.favorites") }}
        </div>
      </div>
      <div class="list__search">
        <input
          type="text"
          :placeholder="$t('general.search')"
          v-model="dynamicSearchInput"
        />
      </div>
      <ul
        v-if="dynamicActiveTab === 'dynamicTab'"
        class="list__content list__content--parent custom-scrollbar"
      >
        <LayerTree
          :list="dynamicLayersList"
          :dragOptions="{ disabled: false }"
          @updateList="
            (val) => {
              dynamicLayersList = val;
            }
          "
          :layerType="serviceTypeEnum.DYNAMIC_LAYER"
        />
      </ul>

      <ul
        v-if="dynamicActiveTab === 'bunchTab'"
        class="list__content list__content--parent custom-scrollbar"
      >
        <LayerTree
          :list="bunchLayerList"
          :dragOptions="{ disabled: false }"
          @updateList="
            (val) => {
              bunchLayerList = val;
            }
          "
          :layerType="serviceTypeEnum.BUNCH"
        />
      </ul>
      <ul
        v-if="dynamicActiveTab === 'favoriteTab'"
        class="list__content list__content--parent custom-scrollbar"
      >
        <LayerTree
          :list="favoriteDynamicLayerList"
          :dragOptions="{ disabled: true }"
          :layerType="serviceTypeEnum.DYNAMIC_LAYER"
        />
      </ul>

      <button
        v-if="dynamicActiveTab === 'bunchTab'"
        class="btn btn--add-new"
        @click="openComputedLayerModal"
      >
        <i class="fas fa-plus"></i>&nbsp;&nbsp; {{ $t("button.add") }}
      </button>
    </div>

    <!-- Basemaps -->
    <div class="list layers" v-if="isBaseLayerTabActive">
      <div class="list__header">{{ $t("menu.baseLayers") }}</div>
      <div class="list__tabs">
        <div
          class="tab"
          :class="{
            'tab--active': basemapActiveTab === 'baseTab',
          }"
          @click="setBasemapActiveTab('baseTab')"
        >
          {{ $t("menu.layerTabs.standard") }}
        </div>

        <div
          class="tab"
          :class="{ 'tab--active': basemapActiveTab === 'favoriteTab' }"
          @click="setBasemapActiveTab('favoriteTab')"
        >
          {{ $t("menu.layerTabs.favorites") }}
        </div>
      </div>
      <div class="list__search">
        <input
          type="text"
          :placeholder="$t('general.search')"
          v-model="baseSearchInput"
        />
      </div>
      <ul
        v-if="basemapActiveTab === 'baseTab'"
        class="list__content list__content--parent custom-scrollbar"
      >
        <LayerTree
          :list="baselayerList"
          :dragOptions="{ disabled: false }"
          @updateList="
            (val) => {
              baselayerList = val;
            }
          "
          :layerType="serviceTypeEnum.BASE_LAYER"
        />
      </ul>
      <ul
        v-if="basemapActiveTab === 'favoriteTab'"
        class="list__content list__content--parent custom-scrollbar"
      >
        <LayerTree
          :list="favoriteBaseLayerList"
          :dragOptions="{ disabled: true }"
          :layerType="serviceTypeEnum.BASE_LAYER"
        />
      </ul>
    </div>

    <!-- Tools -->
    <div class="list tools" v-if="isToolTabActive">
      <div class="list__header">{{ $t("menu.tool.title") }}</div>

      <ul class="list__content list__content--parent custom-scrollbar">
        <li class="list__item" v-for="item in toolList" :key="item.key">
          <div class="item__header" @click="item.click">
            <span class="title">
              <img :src="item.image" alt="" class="pre" />
              {{ item.label }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import Draggable from "vuedraggable";
import { guid, capitalize } from "@/utils";
import {
  menuController,
  mapController,
  bunchController,
  modalController,
  layerController,
} from "@/controllers";
import { tokenService, authService } from "@/services";
import { layerHelper } from "@/helpers";
import { drawTypeEnum, menuTabEnum, serviceTypeEnum } from "@/enums";
import LayerTree from "@/components/LayerTree/Index";
import { deepClone } from "@/utils";
export default {
  name: "Sidebar",

  components: {
    LayerTree,
  },

  data() {
    return {
      dynamicSearchInput: "",
      baseSearchInput: "",

      serviceTypeEnum: serviceTypeEnum,
      activeLayerType: "gray",
      dynamicActiveTab: "dynamicTab",
      basemapActiveTab: "baseTab",
      menuTabEnum,
    };
  },
  mounted() {},
  computed: {
    baseLayouts() {
      return mapController.getBaseLayouts();
    },
    isProfileTabActive() {
      return this.activeMenuTab === menuTabEnum.PROFILE;
    },
    notificationCount() {
      return menuController.getNotificationCount();
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
    bunchLayerList: {
      get() {
        const data = bunchController.getBunchLayerList();
        return this.filteredList(data, this.dynamicSearchInput);
      },
      set(val) {
        this.$store.dispatch("saveBuncLayerList", val);
      },
    },

    dynamicLayersList: {
      get() {
        const data = layerController.getDynamicLayerList();
        return this.filteredList(data, this.dynamicSearchInput);
      },
      set(val) {
        this.$store.dispatch("saveDynamicLayerList", val);
      },
    },
    baselayerList: {
      get() {
        const data = layerController.getBaseLayerList();
        return this.filteredList(data, this.baseSearchInput);
      },
      set(val) {
        this.$store.dispatch("saveBaseLayerList", val);
      },
    },
    favoriteBaseLayerList: {
      get() {
        var ids = layerController.getFavoriteBaseLayerIds();
        let baselayers = layerController.getBaseLayersWithoutCategory();
        var layers = baselayers.filter((c) => ids.includes(c.id));
        return this.filteredList(layers, this.baseSearchInput);
      },
      set(val) {
        this.$store.dispatch("saveBaseLayerList", val);
      },
    },
    favoriteDynamicLayerList: {
      get() {
        var ids = layerController.getFavoriteDynamicLayerIds();
        let dynamicLayers = layerController.getDynamicLayersWithoutCategory(
          false
        );
        var layers = dynamicLayers.filter((c) => ids.includes(c.id));
        return this.filteredList(layers, this.dynamicSearchInput);
      },
      set(val) {
        this.$store.dispatch("saveDynamicLayerList", val);
      },
    },
  },
  methods: {
    guid,
    capitalize,
    filteredList(list, input) {
      var data = deepClone(list);
      var list = layerHelper.treeFilter(data, input);
      return list;
    },
    logout() {
      // authService.logout();
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    showProfileModal() {
      modalController.showProfileModalModal();
    },

    setBaseLayout(key) {
      this.activeLayerType = key;
      mapController.setBaseLayout(key);
    },

    setDynamicActiveTab(tabLabel) {
      this.dynamicActiveTab = tabLabel;
    },
    setBasemapActiveTab(tabLabel) {
      this.basemapActiveTab = tabLabel;
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
