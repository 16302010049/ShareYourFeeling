// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import VueCookies from 'vue-cookies'
import store from './stagestore'
import axios from 'axios'
import qs from 'qs.js'
import './assets/icon/iconfont.css'
import AMap from 'vue-amap'
Vue.use(AMap)

AMap.initAMapApiLoader({
  // 高德key
  key: '59f40ac34dca1b03b51a638a20ffcca4',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
})

Vue.prototype.$axios = axios
Vue.prototype.qs = qs

Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
