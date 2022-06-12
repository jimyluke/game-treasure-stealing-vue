import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store';
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Vue.use(Vuex)

Vue.config.productionTip = false

import { defaultLocale, languages } from './i18n'
const messages = Object.assign(languages)

Vue.config.productionTip = false

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
