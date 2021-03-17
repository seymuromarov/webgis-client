import request from "@/utils/request";
import { MAIL_URLS } from "@/config/urls";

export default {
  contactUs(data) {
    return request.post(MAIL_URLS.CONTACT_US, data);
  },
};
