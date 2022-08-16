import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store';
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload';
import '@/permission' // permission control
import 'animate.css';


Vue.use(VueI18n)
Vue.use(Vuex)

Vue.config.productionTip = false

import { defaultLocale, languages } from './i18n'
const messages = Object.assign(languages)

Vue.use(ElementUI);
Vue.use(VueLazyload);

Vue.config.productionTip = false;

var i18n = new VueI18n({
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages
})

new Vue({
  i18n,
  store: store,
  router,
  render: h => h(App)
}).$mount('#app')
