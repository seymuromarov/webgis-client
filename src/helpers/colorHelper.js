import $store from "@/store/store.js";
import { Style, Fill, Stroke, CircleStyle } from "@/wrappers/openLayerImports";
import { materialColors } from "@/constants/colors";
import { _ } from "vue-underscore";
import { operatorEnumTostring } from "@/utils/enumToString";
import { coreHelper } from "@/helpers";
const functions = {
  renderMvtStyle: (feature, service) => {
    var layerColor = service.layerColor;
    let borderColor = null;
    let fillColor = null;
    let isConditionExist = false;
    if (layerColor) {
      const column = layerColor.column;
      const currentFeatureColumnVal = feature.get(column);
      const conditions = layerColor.conditions;
      for (let i = 0; i < conditions.length; i++) {
        const item = conditions[i];
        var operator = operatorEnumTostring(item.operator);
        const val = coreHelper.parseByTypeString(
          layerColor.columnDataType,
          item.value
        );
        const result = coreHelper.checkStringArithmeticOperation(
          currentFeatureColumnVal,
          val,
          operator
        );
        if (result) {
          isConditionExist = true;
          borderColor = item.borderColor;
          fillColor = item.fillColor;
          break;
        }
      }
    }

    if (!layerColor || !isConditionExist) {
      borderColor = service.color.borderColor;
      fillColor = service.color.fillColor;
    }
    return functions.buildVectorStyle(borderColor, fillColor);
  },
  renderColor: (id, fillColor, borderColor) => {
    let colors = [];
    let outlines = [];
    colors[0] = fillColor.rgba.r;
    colors[1] = fillColor.rgba.g;
    colors[2] = fillColor.rgba.b;
    colors[3] = 255 * fillColor.rgba.a;

    outlines[0] = borderColor.rgba.r;
    outlines[1] = borderColor.rgba.g;
    outlines[2] = borderColor.rgba.b;
    outlines[3] = 255 * borderColor.rgba.a;
    let color =
      "[" +
      colors[0] +
      "," +
      colors[1] +
      "," +
      colors[2] +
      "," +
      colors[3] +
      "]";
    let outline =
      "[" +
      outlines[0] +
      "," +
      outlines[1] +
      "," +
      outlines[2] +
      "," +
      outlines[3] +
      "]";

    let layerDyn =
      '{"id":' +
      id +
      ',"name":"","source":{"type":"mapLayer","mapLayerId": ' +
      id +
      '},"drawingInfo":{"renderer":{"type":"simple","label":"","description":"","symbol":{"color":' +
      color +
      ',"outline":{"color":' +
      outline +
      ',"width":1.0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}}},"minScale":0,"maxScale":0}';
    return layerDyn;
  },
  buildVectorStyle(borderColor, fillColor) {
    if (_.isNull(borderColor) || _.isUndefined(borderColor)) {
      borderColor = getters.getDefaultColorObject().borderColor;
    }
    if (_.isNull(fillColor) || _.isUndefined(fillColor)) {
      fillColor = getters.getDefaultColorObject().fillColor;
    }

    var style = new Style({
      fill: new Fill({
        color: fillColor,
      }),
      stroke: new Stroke({
        color: borderColor,
        width: 0.5,
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: fillColor,
        }),
        stroke: new Stroke({
          color: borderColor,
          width: 0.5,
        }),
      }),
    });
    return style;
  },
  buildColorObject(borderColor, fillColor) {
    let defaultColor = getters.getDefaultColorObject();
    if (_.isUndefined(borderColor) || _.isNull(borderColor)) {
      borderColor = defaultColor.borderColor;
    }
    if (_.isUndefined(fillColor) || _.isNull(fillColor)) {
      fillColor = defaultColor.fillColor;
    }

    return { borderColor, fillColor };
  },
};
const getters = {
  getDefaultColorObject() {
    var fillColor = $store.state.colorPicker.defaultFillColor;
    var borderColor = $store.state.colorPicker.defaultBorderColor;
    return { fillColor, borderColor };
  },
  getColorByIndex(index) {
    let size = materialColors.length;
    if (size - 1 < index) return materialColors[0];

    return materialColors[index];
  },
};
export default { ...functions, ...getters };
