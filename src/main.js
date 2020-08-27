import Vue from "vue";
import VueCookie from "vue-cookie";
import JsonExcel from "vue-json-excel";
import VModal from "vue-js-modal";

import VueQuillEditor from "vue-quill-editor";
import * as ol from "ol";
import underscore from "vue-underscore";
import "ol-geocoder/dist/ol-geocoder.js";
import router from "./router";
import { Modal as CustomModal } from "@/components";
import store from "./store/store";

import App from "./App.vue";

/**
 * Styles
 */
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/style/bootstrapCustom.scss";
import "juxtaposejs/build/css/juxtapose.css";

import "@/assets/style/globalStyle.scss";
import "@/assets/style/treeStyle.scss";
import "@/assets/style/multiSelect.scss";
import "@/assets/style/modal.scss";
import "@/assets/style/font-awesome/css/all.css";
import "@/assets/style/paginationStyle.scss";
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

// Vue Vue Toasted
import VueToasted from "vue-toasted";

// Vue SweetAlert
import VueSweetalert2 from "vue-sweetalert2";

// Vue Snotify
import Snotify, { SnotifyPosition } from "vue-snotify";

//Vue MultiSelect
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

//Vue VueSelect
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

//Vue DropZone
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

//Vue Viewer
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";

//Vue Paginate
import Paginate from "vuejs-paginate";
//Vue Vuelidate
import Vuelidate from "vuelidate";

import "./permission"; // permission control

Vue.use(Snotify, {
  toast: {
    position: SnotifyPosition.leftBottom,
    timeout: 3000,
  },
});
Vue.component("CustomModal", CustomModal);
Vue.component("paginate", Paginate);
Vue.component("v-select", vSelect);
Vue.use(Vuelidate);
Vue.use(Loading);
Vue.use(Multiselect);
Vue.use(VueToasted, {
  position: "bottom-left",
  duration: 3000,
  iconPack: "custom-class", // set your iconPack, defaults to material. material|fontawesome|custom-class
});
Vue.use(VModal); // TODO Remove VModal
Vue.component("downloadExcel", JsonExcel);
Vue.use(VueCookie);
Vue.use(underscore);
Vue.use(vue2Dropzone);
Vue.use(Viewer);

Vue.config.productionTip = false;
Vue.use(ol);
Vue.use(VueSweetalert2); // TODO Remove SweetAlert
Vue.use(VueQuillEditor);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
