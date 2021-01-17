import request from "@/utils/request";
import { ISSUE_CATEGORY_URLS } from "@/config/urls";

export default {
  getAll() {
    return request.get(ISSUE_CATEGORY_URLS.GET_ALL);
  },
};
