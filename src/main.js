import Vue from "vue";
import VueCookie from "vue-cookie";
import JsonExcel from "vue-json-excel";
import VModal from "vue-js-modal";
import Toasted from "vue-toasted";
import VueSweetalert2 from "vue-sweetalert2";
import Snotify, { SnotifyPosition } from "vue-snotify";
import VueQuillEditor from "vue-quill-editor";
import * as ol from "ol";
import underscore from "vue-underscore";
import "ol-geocoder/dist/ol-geocoder.js";
import router from "./router";
import store from "./store/store";

import App from "./App.vue";

/**
 * Styles
 */
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/style/globalStyle.scss";
import "@/assets/style/multiSelect.scss";
import "@/assets/style/modal.scss";
import "@/assets/style/font-awesome/css/all.css";
import "ol-geocoder/dist/ol-geocoder.min.css";
// Styles
import "ol/ol.css";
// Quill Text editor
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

// VueSweetalert2
import "sweetalert2/dist/sweetalert2.min.css";

// Vue Loading
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

//Vue MultiSelect
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

Vue.use(Snotify, {
  toast: {
    position: SnotifyPosition.leftBottom,
    timeout: 3000,
  },
});

Vue.use(Loading);
Vue.use(Multiselect);
Vue.use(Toasted); // TODO Remove Toasted
Vue.use(VModal); // TODO Remove VModal
Vue.component("downloadExcel", JsonExcel);
Vue.use(VueCookie);
Vue.use(underscore);

Vue.config.productionTip = false;
Vue.use(ol);
Vue.use(VueSweetalert2); // TODO Remove SweetAlert
Vue.use(VueQuillEditor);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
