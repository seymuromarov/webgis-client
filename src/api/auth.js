import request from "@/utils/request";
import { ACCOUNT_URL } from "@/config/urls";
export default {
  login(params) {
    var response = request.post(ACCOUNT_URL.LOGIN_URL, params);

    return response;
  },
};
