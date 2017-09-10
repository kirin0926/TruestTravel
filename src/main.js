// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
// import echarts from 'echarts'
// import 'echarts/map/js/china.js'
// import echarts from '@/js/echarts.min.js'
import axios from 'axios'
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  template: '<App/>',
  components: { App }
})

