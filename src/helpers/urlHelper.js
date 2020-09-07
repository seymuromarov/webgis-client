import { tileTypeEnum } from "@/enums";
import { serviceHelper, urlHelper } from "@/helpers";
import { tokenService } from "@/services";
import { URL, MAP_URLS, ARCGIS_URLS } from "@/config/urls";
import { arcgisImgExportSettings } from "@/config/settings";
import qs from "qs";
const functions = {
  formatQueryString(params) {
    return qs.stringify(params, {
      arrayFormat: "indices",
      allowDots: true,
    });
  },
  checkImageExists(imageUrl) {
    var http = new XMLHttpRequest();

    http.open("HEAD", imageUrl, false);
    http.send();

    return http.status != 404;
  },
  buildTileUrl(service, type) {
    let url = "";
    const token = tokenService.getToken();

    const {
      LOCAL_MVT,
      XYZ,
      TILE_ARCGIS_REST,
      IMAGE_ARCGIS_REST,
      WMS,
    } = tileTypeEnum;

    switch (type) {
      case LOCAL_MVT:
        if (serviceHelper.isLayer(service)) {
          let params = service.query;

          let queryString = urlHelper.formatQueryString(params);

          url = `${URL}/api/service/webgis/${service.name}/mvt/{z}/{x}/{y}/?${queryString}`;
        } else {
          var params = service.layers.map((item, index) => {
            let obj = { layerId: item.id };
            if (serviceHelper.isQueryExist(item)) obj.query = item.query;
            return obj;
          });

          let queryString = urlHelper.formatQueryString({
            queries: params,
          });

          url = `${URL}/api/service/webgis/${service.name}/intersect/mvt/{z}/{x}/{y}/?${queryString}`;
        }

        break;
      case XYZ:
        url = `${URL}/api/service/arcgis/${service.name}/{z}/{y}/{x}?token=${token}`;
        break;
      case TILE_ARCGIS_REST:
        url = `${URL}/api/service/arcgis/${service.name}/`;
        break;
      case IMAGE_ARCGIS_REST:
        url = `${URL}/api/service/arcgis/${service.name}/`;
        break;
      case WMS:
        if (serviceHelper.isGeoserverService(service)) {
          url = `${URL}/api/service/geoserver/${service.name}/`;
        } else if (serviceHelper.isGeoserverGwsService(service)) {
          url = `${URL}/api/service/geoserver/${service.name}/gwc/`;
        } else if (serviceHelper.isGeowebcacheService(service)) {
          url = `${URL}/api/service/geowebcache/${service.name}/`;
        }
        break;
    }

    return url;
  },
  getImageUrl(name, extent, type) {
    var params = arcgisImgExportSettings;
    params["token"] = tokenService.getToken();
    params["bbox"] = extent.toString();

    let arcgisImgUrl = ARCGIS_URLS.EXPORT_IMAGE_URL(name, params);
    return arcgisImgUrl;
  },
};
export default { ...functions };
