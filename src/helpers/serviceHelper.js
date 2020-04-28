import { serviceTypeEnum } from "@/enums";
import { layerService, tokenService } from "@/services/";
const checker = {
  isLocalService: (service) => {
    return service.resourceType === "local";
  },
  isArcgisService: (service) => {
    return service.resourceType === "azcArcgis";
  },

  isDynamic(service) {
    return service.mapType == "dynamic";
  },
  isBasemap(service) {
    return service.mapType == "basemap";
  },

  isDynamicFromArcgis(service) {
    return checker.isArcgisService(service) && checker.isDynamic(service);
  },
  isDynamicFromLocal(service) {
    return checker.isLocalService(service) && checker.isDynamic(service);
  },

  isCategory: (service) => {
    return service.type === serviceTypeEnum.CATEGORY;
  },
  isLayer: (service) => {
    return service.type === serviceTypeEnum.LAYER;
  },
  isSublayer: (service) => {
    return service.type === serviceTypeEnum.SUBLAYER;
  },
  isBunch: (service) => {
    return service.type === serviceTypeEnum.BUNCH;
  },
  isEqual(s1, s2) {
    return s1 && s2 && s1.id == s2.id && s1.type == s2.type;
  },
  isQueryExist(service) {
    if (checker.isLayer(service))
      return (
        service.query &&
        service.query.where &&
        service.query.where !== "" &&
        service.query.where.trim() !== "1=1"
      );
    else if (checker.isBunch(service)) {
      return service.layers.some((c) => checker.isQueryExist(c));
    } else return false;
  },

  async isLayerColorEnabled(service) {
    let isColorEnabled = false;

    if (checker.isDynamicFromArcgis()) {
      let response = await layerService.getLayerDynamic({
        token: tokenService.getToken(),
        name: service.name,
      });
      if (response.data.layers[0].drawingInfo !== undefined) {
        if (response.data.layers[0].drawingInfo.renderer.symbol !== undefined) {
          if (
            response.data.layers[0].drawingInfo.renderer.symbol.color !==
            undefined
          ) {
            isColorEnabled = true;
          }
        }
      }
    } else if (checker.isDynamicFromLocal()) isColorEnabled = true;
    return isColorEnabled;
  },
};

export default {
  ...checker,
};
