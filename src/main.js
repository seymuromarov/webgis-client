import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/style/globalStyle.scss'
import * as ol from 'ol'
import axios from 'axios';
import VueCookie from 'vue-cookie'
Vue.use(VueCookie);


Vue.config.productionTip = false
Vue.use(ol)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = "http://webgis.azercosmos.az";

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
