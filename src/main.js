import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false
// set auth header
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
