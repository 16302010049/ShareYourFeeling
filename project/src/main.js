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
import './assets/icon/iconfont.css'
import BaiduMap from 'vue-baidu-map'
import AMap from 'vue-amap'

Vue.use(AMap)

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '2QUXnAEENcLEiFoIguhN7GxQmus0XR6u'
})

AMap.initAMapApiLoader({

  // 高德的key

  key: '59f40ac34dca1b03b51a638a20ffcca4',

  // 插件集合

  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']

})

Vue.prototype.$axios = axios
Vue.prototype.$AMap = AMap

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
