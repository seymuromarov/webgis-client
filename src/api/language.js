import request from "@/utils/request";
import { LANGUAGE_URL } from "@/config/urls";

export default {
  getLanguages() {
    return request.get(LANGUAGE_URL.GET_LANGUAGE, {
      params: {
        format: "i18n",
      },
    });
  },
};
