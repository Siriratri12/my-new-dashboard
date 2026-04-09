import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.config.productionTip = false

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

new Vue({
  vuetify,
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')