// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from'axios'

// 为什么叫router呢，因为插件中router,packjson中name名字就是router

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  //这个app 是app.vue模板中中tempalte模板
   components: { App }
  //  这个是路由师徒试图，用来放路由组件
})
