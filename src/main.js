import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/style/globalStyle.scss";
import "./assets/style/font-awesome/css/all.css";
import * as ol from "ol";
// import axios from 'axios';
import VueCookie from "vue-cookie";
import JsonExcel from "vue-json-excel";
import VModal from "vue-js-modal";
import Toasted from "vue-toasted";
import "ol-geocoder/dist/ol-geocoder.min.css";
import "ol-geocoder/dist/ol-geocoder.js";

Vue.use(Toasted);
Vue.use(VModal);
Vue.component("downloadExcel", JsonExcel);
Vue.use(VueCookie);

Vue.config.productionTip = false;
Vue.use(ol);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
