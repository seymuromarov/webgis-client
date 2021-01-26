const serviceZIndexSettings = {
  dynamicZIndex: 2000,
  basemapZIndex: 1000,
  bunchZIndex: 3000,
};
const defaultZoomLevelSettings = {
  minZoomLevel: 0,
  maxZoomLevel: 20,
};
const defaultScaleSettings = {
  minResolution: 1, //100m
  maxResolution: 20000, //2000km
};
const arcgisImgExportSettings = {
  f: "image",
  format: "png",
  transparent: "true",
  size: "1024,1024",
  bbox: null,
  bboxsr: "4326",
  imagesr: "4326",
  dpi: "90",
};
const geowebcacheImgExportSettings = {
  SERVICE: "WMS",
  REQUEST: "GetMap",
  FORMAT: "image/png",
  TRANSPARENT: "true",
  // LAYERS: "Azersky2019_IVrub",
  TILED: "true",
  transparent: "true",
  format: "image/png",
  srs: "EPSG:3857",
  WIDTH: "256",
  HEIGHT: "256",
  CRS: "EPSG:3857",
};
const geoserverImgExportSettings = {
  SERVICE: "WMS",
  REQUEST: "GetMap",
  FORMAT: "image/png",
  TRANSPARENT: "true",
  // LAYERS: "Azersky2019_IVrub",
  TILED: "true",
  transparent: "true",
  format: "image/png",
  srs: "EPSG:3857",
  WIDTH: "256",
  HEIGHT: "256",
  CRS: "EPSG:3857",
};

export {
  serviceZIndexSettings,
  defaultZoomLevelSettings,
  defaultScaleSettings,
  arcgisImgExportSettings,
  geowebcacheImgExportSettings,
  geoserverImgExportSettings,
};
