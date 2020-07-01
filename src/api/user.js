import request from "@/utils/request";
import { USER_URLS } from "@/config/urls";
export default {
  getInfo() {
    return request({
      url: USER_URLS.GET_INFO_URL,
      method: "get",
    });
  },
};
