import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import axios from 'axios';
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})
//自动给同一个vue项目的所有请求添加请求头
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('user');
  console.log('localStorage',localStorage)
  console.log('token',token)
	if (token) {
		config.headers['Authorization'] = token;
	}
	return config;
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login' && to.path == '/register') {
    localStorage.removeItem('user');
  }
  let token = localStorage.getItem('user');
  if (!token && to.path != '/login'&& to.path != '/register') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

