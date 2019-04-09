import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSort,
  faSortUp,
  faSortDown,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSearch);
library.add(faSort);
library.add(faSortUp);
library.add(faSortDown);
library.add(faGithub);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
