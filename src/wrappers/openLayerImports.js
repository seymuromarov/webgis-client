import { Map, View, Overlay, Feature } from "ol";
import { LineString, Polygon, Circle, Point } from "ol/geom.js";
import {
  Modify,
  defaults as defaultInteractions,
  DragRotateAndZoom,
  DragAndDrop,
} from "ol/interaction";
import TileDebug from "ol/source/TileDebug";
import {
  Circle as CircleStyle,
  Text,
  Fill,
  Stroke,
  Style,
  Icon,
} from "ol/style.js";
import {
  Tile as TileLayer,
  Vector as VectorLayer,
  Image as ImageLayer,
} from "ol/layer.js";
import VectorTileLayer from "ol/layer/VectorTile.js";
import VectorTileSource from "ol/source/VectorTile.js";
import MVT from "ol/format/MVT.js";
import { createXYZ } from "ol/tilegrid";
import {
  OSM,
  TileArcGISRest,
  Vector as VectorSource,
  ImageArcGISRest,
} from "ol/source.js";
import {
  fromLonLat,
  METERS_PER_UNIT,
  transform,
  transformExtent,
  get as getProjection,
  getTransform,
} from "ol/proj";
import XYZ from "ol/source/XYZ.js";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import {
  ZoomSlider,
  defaults as defaultControls,
  FullScreen,
} from "ol/control.js";
import MousePosition from "ol/control/MousePosition.js";
import { createStringXY } from "ol/coordinate.js";
import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format.js";
import { register } from "ol/proj/proj4.js";
import { applyTransform } from "ol/extent";
import * as format from "ol/format";
import Graticule from "ol/Graticule";
export {
  //"ol"
  Map,
  View,
  Overlay,
  Feature,
  //"ol/geom.js"
  LineString,
  Polygon,
  Circle,
  Point,
  //"ol/interaction"
  Modify,
  defaultInteractions,
  DragRotateAndZoom,
  DragAndDrop,
  //"ol/source/TileDebug"
  TileDebug,
  //"ol/style.js"
  CircleStyle,
  Text,
  Fill,
  Stroke,
  Style,
  Icon,
  //"ol/layer.js"
  TileLayer,
  VectorLayer,
  ImageLayer,
  //"ol/layer/VectorTile.js"
  VectorTileLayer,
  //"ol/source/VectorTile.js"
  VectorTileSource,
  //"ol/format/MVT.js"
  MVT,
  //"ol/tilegrid"
  createXYZ,
  //"ol/source.js"
  OSM,
  TileArcGISRest,
  VectorSource,
  ImageArcGISRest,
  //"ol/proj"
  fromLonLat,
  METERS_PER_UNIT,
  transform,
  transformExtent,
  getProjection,
  getTransform,
  //"ol/source/XYZ.js"
  XYZ,
  //"ol/loadingstrategy"
  bboxStrategy,
  //"ol/control.js"
  ZoomSlider,
  defaultControls,
  FullScreen,
  //"ol/control/MousePosition.js"
  MousePosition,
  //"ol/coordinate.js"
  createStringXY,
  //"ol/format.js"
  GPX,
  GeoJSON,
  IGC,
  KML,
  TopoJSON,
  //"ol/proj/proj4.js"
  register,
  //"ol/extent"
  applyTransform,
  //"ol/format"
  format,
  //ol/Graticule
  Graticule,
};
