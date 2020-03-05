import { serviceTypeEnum } from "@/constants/enums/serviceEnums";
const checker = {
  isLocalService: service => {
    return service.resourceType === "local";
  },
  isArcgisService: service => {
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

  isCategory: service => {
    return service.type === serviceTypeEnum.CATEGORY;
  },
  isLayer: service => {
    return service.type === serviceTypeEnum.LAYER;
  },
  isSublayer: service => {
    return service.type === serviceTypeEnum.SUBLAYER;
  },
  isBunch: service => {
    return service.type === serviceTypeEnum.BUNCH;
  }
};

export default {
  ...checker
};
