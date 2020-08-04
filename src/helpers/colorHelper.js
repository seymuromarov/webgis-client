import $store from "@/store/store.js";
import { Style, Fill, Stroke, CircleStyle } from "@/wrappers/openLayerImports";
import { materialColors } from "@/constants/colors";
import { _ } from "vue-underscore";

const functions = {
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
      borderColor = getters.getDefaultColorObject().border;
    }
    if (_.isNull(fillColor) || _.isUndefined(fillColor)) {
      fillColor = getters.getDefaultColorObject().fill;
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
  buildColorObject(borderHex8, fillHex8) {
    console.log(
      "buildColorObject -> borderHex8, fillHex8",
      borderHex8,
      fillHex8
    );
    let border = { hex8: borderHex8 };
    let fill = {};
    let isUndefined = _.isUndefined(fillHex8);
    if (isUndefined) {
      let defaultColor = getters.getDefaultColorObject();
      fill = defaultColor.fill;
    } else {
      fill = { hex8: fillHex8 };
    }

    return { fill, border };
  },
};
const getters = {
  getDefaultColorObject() {
    var fill = $store.state.colorPicker.fill;
    var border = $store.state.colorPicker.border;
    return { fill, border };
  },
  getColorByIndex(index) {
    let size = materialColors.length;
    if (size - 1 < index) return materialColors[0];

    return materialColors[index];
  },
};
export default { ...functions, ...getters };
