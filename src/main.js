import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import { Message } from 'element-ui';
import Navi from "./components/Navi/Navi.vue";
import cytoscape from "cytoscape";
import "cytoscape/dist/cytoscape.js";
import "cytoscape/dist/cytoscape.min.js";
//import moment from "moment";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(cytoscape);
var cy=0;
//Vue.use(moment);
Vue.prototype.$axios=axios;
Vue.prototype.$message=ElementUI;
Vue.prototype.cy=cy;

new Vue({
  router,
  store,
  render: h => h(Navi)
}).$mount("#app");
