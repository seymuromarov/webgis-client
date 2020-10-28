import $store from "@/store/store.js";
import $i18n from "@/lang";
import { toolController, modalController } from "@/controllers";
import { icons } from "@/constants/assets";
import { menuTabEnum, drawTypeEnum } from "@/enums";

const getters = {
  getToolList() {
    return [
      {
        key: "mouse",
        label: $i18n.t("menu.tool.mouse"),
        image: icons.mouse,
        click: () => toolController.pickDrawType(drawTypeEnum.NONE),
      },
      {
        key: "addText",
        // label: "Add Text",
        label: $i18n.t("menu.tool.addText"),
        image: icons.text,
        click: () => {
          const callback = (e) => {
            toolController.showMapTextInput(e);
          };

          toolController.pickDrawType(drawTypeEnum.TEXT, callback);
        },
      },
      {
        key: "addPoint",
        label: $i18n.t("menu.tool.addPoint"),
        image: icons.point,
        click: () => toolController.pickDrawType(drawTypeEnum.POINT),
      },
      {
        key: "rectangle",
        label: $i18n.t("menu.tool.rectangle"),
        image: icons.rectangle,
        click: () => toolController.pickDrawType(drawTypeEnum.BOX),
      },
      {
        key: "square",
        label: $i18n.t("menu.tool.square"),
        image: icons.square,
        click: () => toolController.pickDrawType(drawTypeEnum.SQUARE),
      },
      {
        key: "circle",
        label: $i18n.t("menu.tool.circle"),
        image: icons.circle,
        click: () => toolController.pickDrawType(drawTypeEnum.CIRCLE),
      },
      {
        key: "polygon",
        label: $i18n.t("menu.tool.polygon"),
        image: icons.polygon,
        click: () => toolController.pickDrawType(drawTypeEnum.POLYGON),
      },
      {
        key: "line",
        label: $i18n.t("menu.tool.line"),
        image: icons.line,
        click: () => toolController.pickDrawType(drawTypeEnum.LINESTRING),
      },
      {
        key: "addPlace",
        label: $i18n.t("menu.tool.addPlace"),
        image: icons.place,
        click: () => {},
      },
      {
        key: "reset",
        label: $i18n.t("menu.tool.reset"),
        image: icons.reset,
        click: toolController.resetFeatures,
      },
      {
        key: "delete",
        label: $i18n.t("menu.tool.delete"),
        image: icons.delete,
        click: toolController.deleteFeature,
      },
      {
        key: "pickColor",
        label: $i18n.t("menu.tool.pickColor"),
        image: icons.color_picker,
        click: toolController.eyeDropper,
      },
      {
        key: "changeDetection",
        label: $i18n.t("menu.tool.changeDetection"),
        image: icons.world,
        click: () => {
          let callback = () => {
            modalController.showChangeDetectionModal();
          };
          toolController.pickDrawType(drawTypeEnum.BOX, callback);
        },
      },

      {
        key: "graticule",
        label: $i18n.t("menu.tool.graticule"),
        image: icons.grid,
        click: toolController.addGraticule,
      },
      {
        key: "ndviAssessment",
        label: $i18n.t("menu.tool.ndviAssesment"),
        image: icons.ndvi,
        click: () => {
          let callback = () => {
            modalController.showNdviAssessmentModal();
          };
          toolController.pickDrawType(drawTypeEnum.BOX, callback);
        },
      },
      {
        key: "blindSpot",
        label: $i18n.t("menu.tool.blindSpotDetection"),
        image: icons.blindSpot,
        click: () => {
          let callback = () => {
            modalController.showBlindSpotModal();
          };
          toolController.pickDrawType(drawTypeEnum.LINESTRING, callback);
        },
      },
      {
        key: "swap",
        label: $i18n.t("menu.tool.swapImage"),
        image: icons.swap,
        click: () => {
          modalController.showComparerModal();
        },
      },
      {
        key: "print",
        label: $i18n.t("menu.tool.print"),
        image: icons.ndvi,
        click: () => {
          modalController.showPrintModal();
        },
      },
    ];
  },
  getBottomMenu() {
    return [
      {
        key: "information",
        label: $i18n.t("menu.information.title"),
        image: icons.information,
        click: setters.setInformationModalVisible,
      },
      {
        key: menuTabEnum.BASE_MAP_TYPE,
        label: $i18n.t("menu.baseLayouts.title"),
        image: icons.hamburger,
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.BASE_MAP_TYPE);
        },
      },
      {
        key: "exportPNG",
        label: $i18n.t("menu.exportPng"),
        image: icons.picture,
        click: toolController.pngExport,
      },
      {
        key: "exportGeojson",
        label: $i18n.t("menu.exportGeojson"),
        image: icons.file_download,
        click: toolController.exportData,
      },
      {
        key: "fullscreen",
        label: $i18n.t("menu.fullscreen"),
        image: icons.fullscreen,
        click: toolController.fullScreen,
      },
    ];
  },
  getTopMenu() {
    return [
      {
        key: menuTabEnum.PROFILE,
        label: $i18n.t("menu.profile.title"),
        image: icons.user,
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.PROFILE);
        },
      },
      {
        key: menuTabEnum.TOOL,
        label: $i18n.t("menu.tool.title"),
        image: icons.pencil,
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.TOOL);
        },
      },
      {
        key: menuTabEnum.DYNAMIC_LAYER,
        label: $i18n.t("menu.dynamicLayers"),
        image: icons.layer,
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.DYNAMIC_LAYER);
        },
      },
      {
        key: menuTabEnum.BASE_LAYER,
        label: $i18n.t("menu.baseLayers"),
        image: icons.map,
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.BASE_LAYER);
        },
      },
    ];
  },
  getActiveMenuTab() {
    return $store.getters.activeMenuTab;
  },
  getNotificationCount() {
    return $store.getters.notificationCount;
  },
};

const setters = {
  setActiveMenuTab(val) {
    if (val === getters.getActiveMenuTab()) val = "";
    $store.dispatch("saveActiveMenuTab", val);
  },
  setInformationModalVisible() {
    $store.dispatch("saveInformationModalVisibility", true);
  },
  setInformationModalUnvisible() {
    $store.dispatch("saveInformationModalVisibility", false);
  },
  setNotificationCount() {
    $store.dispatch("saveNotificationCount", false);
  },
};
export default { ...getters, ...setters };
