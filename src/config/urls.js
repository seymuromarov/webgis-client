import { urlHelper } from "@/helpers";
const apiUrl = process.env.VUE_APP_BASE_API;
const USER_URLS = {
  GET_INFO_URL: "/user/getinfo",
  GET_URL: "/user",
  CHANGE_PASSWORD_URL: "/user/changepassword",
};
const ACCOUNT_URL = {
  LOGIN_URL: "/gettoken",
};
const LANGUAGE_URL = {
  GET_LANGUAGE: "/language",
};
const BUNCH_URLS = {
  ADD: "/bunch",
  EDIT: "/bunch",
  DELETE: (id) => `/bunch/${id}`,
  GET: (id) => `/bunch/${id}`,
  GET_ALL: "/bunch",
};
const MAIL_URLS = {
  CONTACT_US: "/mail/contactus",
};
const FAVORITEQUERY_URLS = {
  ADD: "/favoritequery",
  EDIT: "/favoritequery",
  DELETE: (id) => `/favoritequery/${id}`,
  GET: (id) => `/favoritequery/${id}`,
  GET_ALL: "/favoritequery",
};
const ISSUE_URLS = {
  ADD: "/issue",
  EDIT: "/issue",
  DELETE: (id) => `/issue/${id}`,
  GET: (id) => `/issue/${id}`,
  CLOSE: (id) => `/issue/${id}/close`,
  GET_ALL: "/issue",
  GET_TOTAL_COUNTS: "/issue/counts",
};
const COMMENT_URLS = {
  ADD: "/comment",
  DELETE: (id) => `/comment/${id}`,
  GET: (id) => `/comment/${id}`,
};
const FAVORITELAYER_URLS = {
  SET: "/favoritelayer",
  GET_ALL: "/favoritelayer",
};
const WORKSPACE_URLS = {
  SET: "/workspace",
  GET: "/workspace",
  RESET: "/workspace",
};
const DEFAULTLAYER_URLS = {
  SET: "/defaultlayer",
  GET_ALL: "/defaultlayer",
};
const NOTIFICATION_URLS = {
  GET_ALL: "/notification",
  SET_READED: (id) => `/notification/${id}/setreaded`,
  GET_UNREAD_NOTIFICATION_COUNT: "/notification/GetUnreadNotificationCount",
};
const NDVI_URLS = {
  GET_ALL: "/ndviassessment",
};
const LAYER_URLS = {
  GET_ALL: "/layer/GetCategorizedLayers",
};
const FAQ_URLS = {
  GET_ALL: "/faq",
};
const ISSUE_CATEGORY_URLS = {
  GET_ALL: "/issueCategory",
};
const RELEASE_NOTE_URLS = {
  GET_ALL: "/ReleaseNote",
};
const DATATABLE_URLS = {
  GET_TABLE_INFO: (id) => `/datatable/${id}/GetTableInfo`,
  CREATE_OR_UPDATE: "/datatable/CreateOrUpdate",
  GET_ITEM: (layerId, gid) => `/datatable/${layerId}/${gid}/GetItem`,
  GET_DATA: (layerId) => `/datatable/${layerId}/GetData`,
  GET_INTERSECT_DATA: (bunchId) => `/datatable/${bunchId}/GetIntersectedData`,
  GET_ARITHMETIC_DATA: (layerId) => `/datatable/${layerId}/GetArithmeticData`,
  GET_DISTINCT_VALUES: (layerId) => `/datatable/${layerId}/GetDistinctValues`,
};

const LAYER_DATA_IMAGE_URLS = {
  GET: (id) => `/layerdataimage/${id}`,
  GET_ALL: (layerId, gid) => `/layerdataimage/${layerId}/${gid}`,
  ADD: "/layerdataimage",
  GET_BASE64_FILE: (id) => `/layerdataimage/${id}/GetBase64File`,
  DELETE: (layerId, id) => `/layerdataimage/${layerId}/${id}`,
};

const ARCGIS_URLS = {
  EXPORT_IMAGE_URL: (name, params) => {
    let url =
      apiUrl +
      "/service/arcgis/" +
      name +
      "/?" +
      urlHelper.formatQueryString(params);
    return url;
  },
  SERVICE_URl: "/service/arcgis",
};
const GEOWEBCACHE_URLS = {
  EXPORT_IMAGE_URL: (name, params) => {
    let url =
      apiUrl +
      "/service/geowebcache/" +
      name +
      "/?" +
      urlHelper.formatQueryString(params);
    return url;
  },
  SERVICE_URl: "/service/geowebcache",
};
const GEOSERVER_URLS = {
  EXPORT_IMAGE_URL: (name, params) => {
    let url =
      apiUrl +
      "/service/geoserver/" +
      name +
      "/?" +
      urlHelper.formatQueryString(params);
    return url;
  },
  SERVICE_URl: "/service/geoserver",
};

export {
  LAYER_DATA_IMAGE_URLS,
  USER_URLS,
  LANGUAGE_URL,
  FAVORITEQUERY_URLS,
  DEFAULTLAYER_URLS,
  FAVORITELAYER_URLS,
  NOTIFICATION_URLS,
  WORKSPACE_URLS,
  BUNCH_URLS,
  ACCOUNT_URL,
  LAYER_URLS,
  DATATABLE_URLS,
  FAQ_URLS,
  ISSUE_URLS,
  COMMENT_URLS,
  ISSUE_CATEGORY_URLS,
  RELEASE_NOTE_URLS,
  NDVI_URLS,
  ARCGIS_URLS,
  GEOWEBCACHE_URLS,
  GEOSERVER_URLS,
  MAIL_URLS,
};
