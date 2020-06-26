import auth from "@/api/auth";
import { tokenService } from "@/services";
import $store from "@/store/store.js";
import router from "@/router";
export default {
  async login(params) {
    let response = await auth.login(params);
    let data = response.data;
    console.log("login -> data", data);
    let token = data.token;
    let username = data.user.userName;
    tokenService.setToken(token);

    $store.dispatch("SAVE_AUTH_TOKEN", token);
    localStorage.setItem("username", username);

    router.push("/");

    return response;
  },
};
