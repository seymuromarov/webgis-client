import request from "@/utils/request";
import { NOTIFICATION_URLS } from "@/config/urls";

export default {
  getAll(params) {
    return request.get(NOTIFICATION_URLS.GET_ALL, { params });
  },
  setReaded(id) {
    return request.post(NOTIFICATION_URLS.SET_READED + "/" + id);
  },
  getUnradNotificationCount() {
    return request.get(NOTIFICATION_URLS.GET_UNREAD_NOTIFICATION_COUNT);
  },
};
