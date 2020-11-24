import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from "buefy";
import VueMeta from 'vue-meta'
import "buefy/dist/buefy.css";
import axios from "axios";
import VueClipboard from 'vue-clipboard2'
import vueHeadful from 'vue-headful';
import VueLazyload from 'vue-lazyload'
import VueGtag from "vue-gtag";
import 'leaflet/dist/leaflet.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSyncAlt, faHandPointRight, faCartPlus, faChevronCircleUp, faUser, faPhoneAlt, faAt, faMailBulk, faTimesCircle, faUpload, faCookieBite, faTags, faBalanceScaleRight, faComments, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import infiniteScroll from 'vue-infinite-scroll'
import VueGeolocation from 'vue-browser-geolocation';
import { firestorePlugin } from 'vuefire'

library.add(faSyncAlt, faHandPointRight, faCartPlus, faChevronCircleUp, faUser, faPhoneAlt, faAt, faMailBulk, faTimesCircle, faUpload, faCookieBite, faTags, faBalanceScaleRight, faComments, faGlobe);

Vue.use(firestorePlugin)
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component('vue-headful', vueHeadful);

Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas',
});

Vue.use(VueGtag, {
  config: { id: "UA-170091620-1" }
}, router);
Vue.use(VueGeolocation);
Vue.use(infiniteScroll)
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})
Vue.use(VueClipboard)
Vue.use(VueLazyload)
Vue.config.productionTip = false

// Vue.prototype.$api = 'http://192.168.0.110/project/igtoko';
Vue.prototype.$api = 'https://app.igtoko.com/index.php';
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
