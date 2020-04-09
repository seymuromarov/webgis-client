import $store from "@/store/store.js";
import { Style, Fill, Stroke, CircleStyle } from "@/wrappers/openLayerImports";

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
  buildVectorStyle(color) {
    if (color === null) {
      color = getters.getDefaultColorObject();
    }

    var style = new Style({
      fill: new Fill({
        color: color.fill.hex8,
      }),
      stroke: new Stroke({
        color: color.border.hex8,
        width: 0.5,
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: color.fill.hex8,
        }),
        stroke: new Stroke({
          color: color.border.hex8,
          width: 0.5,
        }),
      }),
    });
    return style;
  },
};
const getters = {
  getDefaultColorObject() {
    var fill = $store.state.colorPicker.fill;
    var border = $store.state.colorPicker.border;
    return { fill, border };
  },
};
export default { ...functions, ...getters };
