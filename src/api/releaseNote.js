import request from "@/utils/request";
import { RELEASE_NOTE_URLS } from "@/config/urls";

export default {
  getAll() {
    return request.get(RELEASE_NOTE_URLS.GET_ALL);
  },
};
