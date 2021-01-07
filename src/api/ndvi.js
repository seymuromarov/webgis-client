import request from "@/utils/request";

import { NDVI_URLS, ARCGIS_URLS } from "@/config/urls";
import { urlHelper } from "@/helpers";
import { tokenService } from "@/services";
import { _ } from "vue-underscore";

export default {
  getNdvis() {
    return request.get(NDVI_URLS.GET_ALL);
  },
  async getNdviValue(name, pointX, pointY) {
    let infoResponse = await this.getNdviInfo(name);
    let fullExtent = infoResponse.fullExtent;
    let extent = {
      xmin: fullExtent.xmin,
      ymin: fullExtent.ymin,
      xmax: fullExtent.xmax,
      ymax: fullExtent.ymax,
    };
    let params = {
      geometry: ` ${pointX}, ${pointY}`,
      geometryType: "esriGeometryPoint",
      mapExtent: JSON.stringify(extent),
      tolerance: 0,
      time: 4,
      geometryPrecision: 4,
      imageDisplay: 50,
      returnGeometry: false,
      returnCatalogItems: false,
      f: "pjson",
    };
    let url = `${
      ARCGIS_URLS.SERVICE_URl
    }/${name}/Identify?${urlHelper.formatQueryString(params)}`;
    let response = await request.get(url);
    let results = response.results;
    let attributes = results[0].attributes;
    let value = {
      red: _.isUndefined(attributes["Red"]) ? 0 : attributes["Red"],
      green: _.isUndefined(attributes["Green"]) ? 0 : attributes["Green"],
      blue: _.isUndefined(attributes["Blue"]) ? 0 : attributes["Blue"],
      alpha: _.isUndefined(attributes["Alpha"]) ? 0 : attributes["Alpha"],
    };
    // let value =
    //   results && results.length > 0 ? results[0].attributes["Pixel Value"] : 0;
    return value;
  },
  getNdviInfo(name) {
    let params = {
      token: tokenService.getToken(),
      f: "json",
    };
    let url = `${
      ARCGIS_URLS.SERVICE_URl
    }/${name}/info?${urlHelper.formatQueryString(params)}`;
    return request.get(url);
  },
};
