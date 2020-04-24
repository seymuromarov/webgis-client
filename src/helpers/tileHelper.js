import { tileTypeEnum } from "@/enums";
import { serviceHelper } from "@/helpers";
import $store from "@/store/store.js";
import { URL, MAP_URLS } from "@/config/urls";
import qs from "qs";
const functions = {
  buildTileUrl(service, type) {
    let url = "";
    const token = $store.getters.token;

    const {
      LOCAL_MVT,
      XYZ,
      TILE_ARCGIS_REST,
      IMAGE_ARCGIS_REST,
    } = tileTypeEnum;

    switch (type) {
      case LOCAL_MVT:
        if (serviceHelper.isLayer(service)) {
          let params = service.query;

          let queryString = qs.stringify(params, {
            arrayFormat: "indices",
            allowDots: true,
          });

          url = `${URL}/${MAP_URLS.MVT}/${service.id}/{z}/{x}/{y}/?${queryString}`;
        } else {
          var params = service.layers.map((item, index) => {
            return {
              layerId: item.id,
              query: item.query,
            };
          });

          let queryString = qs.stringify(
            { queries: params },
            {
              arrayFormat: "indices",
              allowDots: true,
            }
          );

          url = `${URL}/api/Tile/Intersect/VectorAsMvt/${service.id}/{z}/{x}/{y}/?${queryString}`;
        }

        break;
      case XYZ:
        url = `${URL}/api/map/service/${service.name}/MapServer/tile/{z}/{y}/{x}?token=${token}`;
        break;
      case TILE_ARCGIS_REST:
        url = `${URL}/api/map/service/${service.name}/MapServer/`;
        break;
      case IMAGE_ARCGIS_REST:
        url = `${URL}/api/map/service/${service.name}/MapServer/`;
        break;
    }

    return url;
  },
};
export default { ...functions };
