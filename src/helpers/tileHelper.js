import { tileTypeEnum } from "@/enums";
import { serviceHelper, queryStringHelper } from "@/helpers";
import { tokenService } from "@/services";
import $store from "@/store/store.js";
import { URL, MAP_URLS } from "@/config/urls";
import qs from "qs";
const functions = {
    buildTileUrl(service, type) {
        let url = "";
        const token = tokenService.getToken();

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

                    let queryString = queryStringHelper.formatQueryString(params);

                    url = `${URL}/${MAP_URLS.MVT}/${service.id}/{z}/{x}/{y}/?${queryString}`;
                } else {
                    var params = service.layers.map((item, index) => {
                        let obj = { layerId: item.id };
                        if (
                            item.query &&
                            item.query.where != "" &&
                            item.query.where != "1=1"
                        )
                            obj.query = item.query;
                        return obj;
                    });

                    let queryString = queryStringHelper.formatQueryString({ queries: params });

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
