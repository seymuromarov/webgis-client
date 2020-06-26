import request from "@/utils/request";
import { ACCOUNT_URL } from "@/config/urls";
import { tokenService } from "@/services";
import $store from "@/store/store.js";
import router from "@/router";
export default {
  login(params) {
    var response = request.post(ACCOUNT_URL.LOGIN_URL, params);

    return response;
  },
};
