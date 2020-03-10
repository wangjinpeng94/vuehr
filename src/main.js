import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'


import {postKeyValueRequest} from "./utils/api";
import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {getRequest} from "./utils/api";

import store from './store'
import {initMenu} from "./utils/menus";

import 'font-awesome/css/font-awesome.min.css'

Vue.prototype.postRequest=postRequest;
Vue.prototype.postKeyValueRequest=postKeyValueRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.postRequest=putRequest;
Vue.prototype.getRequest=getRequest;


Vue.config.productionTip = false

Vue.use(ElementUI)
router.beforeEach((to,from,next)=>{
  if (to.path == '/') {
    next();
  }else{
    initMenu(router,store);
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)

}).$mount('#app')
