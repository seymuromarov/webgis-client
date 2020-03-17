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
  },
  isEqual(s1, s2) {
    return s1.id == s2.id && s1.type == s2.type;
  },
  isQueryExist(service) {
    return (
      service.query &&
      service.query.where &&
      service.query.where !== "" &&
      service.query.where.trim() !== "1=1"
    );
  }
};

export default {
  ...checker
};
