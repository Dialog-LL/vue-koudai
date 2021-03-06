import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vantConfig from './vant.config'
import axios from 'axios'


Vue.prototype.axios = axios

Vue.config.productionTip = false
Vue.use(vantConfig)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
