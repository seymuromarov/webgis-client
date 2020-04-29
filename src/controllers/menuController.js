import $store from "@/store/store.js";
import { toolController } from "@/controllers";
import { menuTabEnum, drawTypeEnum } from "@/enums";
const getters = {
  getToolList() {
    return [
      {
        key: "mouse",
        label: "Mouse",
        image: "mouse.svg",
        click: () => toolController.pickDrawType(drawTypeEnum.NONE),
      },
      {
        key: "addPoint",
        label: "Add point",
        image: "point.svg",
        click: toolController.addPlace,
      },
      {
        key: "rectangle",
        label: "Rectangle",
        image: "rectangle.svg",
        click: () => toolController.pickDrawType(drawTypeEnum.BOX),
      },
      {
        key: "square",
        label: "Square",
        image: "square.svg",
        click: () => toolController.pickDrawType(drawTypeEnum.SQUARE),
      },
      {
        key: "circle",
        label: "Circle",
        image: "circle.svg",
        click: () => toolController.pickDrawType(drawTypeEnum.CIRCLE),
      },
      {
        key: "polygon",
        label: "Polygon",
        image: "polygon.svg",
        click: () => toolController.pickDrawType(drawTypeEnum.POLYGON),
      },
      {
        key: "line",
        label: "Line",
        image: "line.svg",
        click: () => toolController.pickDrawType(drawTypeEnum.LINESTRING),
      },
      {
        key: "addPlace",
        label: "Add place",
        image: "place.svg",
        click: () => {},
      },
      {
        key: "reset",
        label: "Reset",
        image: "reset.svg",
        click: toolController.resetFeatures,
      },
      {
        key: "delete",
        label: "Delete",
        image: "delete.svg",
        click: toolController.deleteFeature,
      },
      {
        key: "pickColor",
        label: "Pick color",
        image: "color_picker.svg",
        click: toolController.eyeDropper,
      },
      {
        key: "changeDetection",
        label: "Change detection",
        image: "world.svg",
        click: toolController.changeDetector,
      },
      {
        key: "graticule",
        label: "Graticule",
        image: "grid.svg",
        click: toolController.addGraticule,
      },
    ];
  },
  getBottomMenu() {
    return [
      {
        key: "information",
        label: "Information",
        image: "information.svg",
        click: setters.setInformationModalVisible,
      },
      {
        key: menuTabEnum.BASE_MAP_TYPE,
        label: "Layer Types",
        image: "hamburger.svg",
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.BASE_MAP_TYPE);
        },
      },
      {
        key: "exportPNG",
        label: "Export PNG",
        image: "picture.svg",
        click: toolController.pngExport,
      },
      {
        key: "exportGeojson",
        label: "Export GeoJSON",
        image: "file_download.svg",
        click: toolController.exportData,
      },
      {
        key: "fullscreen",
        label: "Full screen",
        image: "fullscreen.svg",
        click: toolController.fullScreen,
      },
    ];
  },
  getTopMenu() {
    return [
      {
        key: menuTabEnum.PROFILE,
        label: "Profile",
        image: "user.svg",
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.PROFILE);
        },
      },
      {
        key: menuTabEnum.TOOL,
        label: "Tools",
        image: "pencil.svg",
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.TOOL);
        },
      },
      {
        key: menuTabEnum.DYNAMIC_LAYER,
        label: "Dynamic Layers",
        image: "layer.svg",
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.DYNAMIC_LAYER);
        },
      },
      {
        key: menuTabEnum.BASE_LAYER,
        label: "Basemaps",
        image: "map.svg",
        click: () => {
          setters.setActiveMenuTab(menuTabEnum.BASE_LAYER);
        },
      },
    ];
  },
  getActiveMenuTab() {
    return $store.getters.activeMenuTab;
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
};
export default { ...getters, ...setters };
