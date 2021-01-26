import { resourceTypeEnum } from "@/enums";

export function resourceTypeToEnum(resourceType) {
  switch (resourceType) {
    case "arcgis":
      return resourceTypeEnum.ARCGIS;
    case "geoserver":
      return resourceTypeEnum.GEOSERVER;
    case "geoserverGws":
      return resourceTypeEnum.GEOSERVER_GWC;
    case "geowebcache":
      return resourceTypeEnum.GEOWEBCACHE;
    default:
      return resourceTypeEnum.ARCGIS;
  }
}
