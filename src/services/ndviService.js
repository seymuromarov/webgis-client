import request from "../utils/request";

import { NDVI_URLS, ARCGIS_URLS } from "@/config/urls";
import { urlHelper } from "@/helpers";
import { tokenService } from "@/services";

export default {
  getNdvis() {
    return request.get(NDVI_URLS.GET_ALL);
  },
  async getNdviValue(name, pointX, pointY) {
    let infoResponse = await this.getNdviInfo(name);
    let fullExtent = infoResponse.data.fullExtent;
    let extent = {
      xmin: fullExtent.xmin,
      ymin: fullExtent.ymin,
      xmax: fullExtent.xmax,
      ymax: fullExtent.ymax,
    };
    let params = {
      geometry: `{ x: ${pointX}, y: ${pointY} }`,
      geometryType: "esriGeometryPoint",
      mapExtent: JSON.stringify(extent),
      tolerance: 1,
      imageDisplay: 50,
      returnGeometry: true,
      returnCatalogItems: false,
      f: "pjson",
    };
    let url = `${
      ARCGIS_URLS.SERVICE_URl
    }/${name}/MapServer/Identify?${urlHelper.formatQueryString(params)}`;
    let response = await request.get(url);
    console.log("getNdviValue -> response", response);
    let value = response.data.results[0].attributes["Pixel Value"];
    return value;
  },
  getNdviInfo(name) {
    let params = {
      token: tokenService.getToken(),
      f: "json",
    };
    let url = `${
      ARCGIS_URLS.SERVICE_URl
    }/${name}/MapServer?${urlHelper.formatQueryString(params)}`;
    console.log("getNdviInfo -> url", url);
    return request.get(url);
  },
};
