import { serviceTypeEnum } from "@/enums";
import { tokenService } from "@/services/";
import layer from "@/api/layer";
const checker = {
  isLocalService: (service) => {
    return service && service.resourceType === "local";
  },
  isArcgisService: (service) => {
    return service && service.resourceType === "azcArcgis";
  },

  isDynamic(service) {
    return service && service.mapType == "dynamic";
  },
  isBasemap(service) {
    return service && service.mapType == "basemap";
  },

  isDynamicFromArcgis(service) {
    return (
      service && checker.isArcgisService(service) && checker.isDynamic(service)
    );
  },
  isDynamicFromLocal(service) {
    return (
      service && checker.isLocalService(service) && checker.isDynamic(service)
    );
  },

  isCategory: (service) => {
    return service && service.type === serviceTypeEnum.CATEGORY;
  },
  isLayer: (service) => {
    return service && service.type === serviceTypeEnum.LAYER;
  },
  isSublayer: (service) => {
    return service && service.type === serviceTypeEnum.SUBLAYER;
  },
  isBunch: (service) => {
    return service && service.type === serviceTypeEnum.BUNCH;
  },
  isEqual(s1, s2) {
    return s1 && s2 && s1.id == s2.id && s1.type == s2.type;
  },
  isQueryExist(service) {
    if (checker.isLayer(service))
      return (
        service.query &&
        ((service.query.where &&
          service.query.where !== "" &&
          service.query.where.trim() !== "1=1") ||
          (service.query.extentCoordinates &&
            service.query.extentCoordinates !== "" &&
            service.query.extentCoordinates.trim() !== "1=1"))
      );
    else if (checker.isBunch(service)) {
      return service.layers.some((c) => checker.isQueryExist(c));
    } else return false;
  },

  async isLayerColorEnabled(service) {
    let isColorEnabled = false;

    if (checker.isDynamicFromArcgis()) {
      let response = await layer.getLayerDynamic({
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
