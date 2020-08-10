import $store from "@/store/store.js";
import { toolController, modalController } from "@/controllers";
import { icons } from "@/constants/assets";
import { menuTabEnum, drawTypeEnum } from "@/enums";
const getters = {
  getToolList() {
    return [
      {
        key: "mouse",
        label: "Mouse",
        image: icons.mouse,
        click: () => toolController.pickDrawType(drawTypeEnum.NONE),
      },
      {
        key: "addPoint",
        label: "Add point",
        image: icons.point,
        click: toolController.addPlace,
      },
      {
        key: "rectangle",
        label: "Rectangle",
        image: icons.rectangle,
        click: () => toolController.pickDrawType(drawTypeEnum.BOX),
      },
      {
        key: "square",
        label: "Square",
        image: icons.square,
        click: () => toolController.pickDrawType(drawTypeEnum.SQUARE),
      },
      {
        key: "circle",
        label: "Circle",
        image: icons.circle,
        click: () => toolController.pickDrawType(drawTypeEnum.CIRCLE),
      },
      {
        key: "polygon",
        label: "Polygon",
        image: icons.polygon,
        click: () => toolController.pickDrawType(drawTypeEnum.POLYGON),
      },
      {
        key: "line",
        label: "Line",
        image: icons.line,
        click: () => toolController.pickDrawType(drawTypeEnum.LINESTRING),
      },
      {
        key: "addPlace",
        label: "Add place",
        image: icons.place,
        click: () => {},
      },
      {
        key: "reset",
        label: "Reset",
        image: icons.reset,
        click: toolController.resetFeatures,
      },
      {
        key: "delete",
        label: "Delete",
        image: icons.delete,
        click: toolController.deleteFeature,
      },
      {
        key: "pickColor",
        label: "Pick color",
        image: icons.color_picker,
        click: toolController.eyeDropper,
      },
      {
        key: "changeDetection",
        label: "Change detection",
        image: icons.world,
        click: toolController.changeDetector,
      },

      {
        key: "graticule",
        label: "Graticule",
        image: icons.grid,
        click: toolController.addGraticule,
      },
      {
        key: "ndviAssessment",
        label: "NDVI Assessment",
        image: icons.ndvi,
        click: () => {
          let callback = () => {
            modalController.showNdviAssessmentModal();
          };

          toolController.ndviAssessment(callback);
        },
      },
      {
        key: "blindSpot",
        label: "Blind Spot Detection",
        image: icons.ndvi,
        click: () => {
          let callback = () => {
            modalController.showBlindSpotModal();
          };
          toolController.pickDrawType(drawTypeEnum.LINESTRING, callback);
        },
      },
    ];
  },
  getBottomMenu() {
    return [
      {
        key: "information",
        label: "Information",
        image: icons.information,
        click: setters.setInformationModalVisible,
      },
      {
        key: menuTabEnum.BASE_MAP_TYPE,
        label: "Layer Types",
        image: icons.hamburger,
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.BASE_MAP_TYPE);
        },
      },
      {
        key: "exportPNG",
        label: "Export PNG",
        image: icons.picture,
        click: toolController.pngExport,
      },
      {
        key: "exportGeojson",
        label: "Export GeoJSON",
        image: icons.file_download,
        click: toolController.exportData,
      },
      {
        key: "fullscreen",
        label: "Full screen",
        image: icons.fullscreen,
        click: toolController.fullScreen,
      },
    ];
  },
  getTopMenu() {
    return [
      {
        key: menuTabEnum.PROFILE,
        label: "Profile",
        image: icons.user,
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.PROFILE);
        },
      },
      {
        key: menuTabEnum.TOOL,
        label: "Tools",
        image: icons.pencil,
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.TOOL);
        },
      },
      {
        key: menuTabEnum.DYNAMIC_LAYER,
        label: "Dynamic Layers",
        image: icons.layer,
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.DYNAMIC_LAYER);
        },
      },
      {
        key: menuTabEnum.BASE_LAYER,
        label: "Basemaps",
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
