const serviceZIndexSettings = {
  dynamicZIndex: 2000,
  basemapZIndex: 1000,
  bunchZIndex: 3000,
};
const defaultZoomLevelSettings = {
  minZoomLevel: 0,
  maxZoomLevel: 20,
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

export {
  serviceZIndexSettings,
  defaultZoomLevelSettings,
  arcgisImgExportSettings,
};
