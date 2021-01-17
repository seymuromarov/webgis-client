import request from "@/utils/request";
import { FAQ_URLS } from "@/config/urls";

export default {
  getAll() {
    return request.get(FAQ_URLS.GET_ALL);
  },
};
