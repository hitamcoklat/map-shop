import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from "buefy";
import "buefy/dist/buefy.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSyncAlt, faHandPointRight, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSyncAlt, faHandPointRight, faCartPlus);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Buefy);
Vue.config.productionTip = false

Vue.prototype.$api = 'http://192.168.0.111:8080/demotoko';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
