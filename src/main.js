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
import '../src/styles/style-ali/iconfont.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './styles/style-ali/iconfont.css'




Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(mavonEditor)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})
//自动给同一个vue项目的所有请求添加请求头
axios.interceptors.request.use(function (config) {
  let userInfo = JSON.parse(localStorage.getItem('user'));
  if(userInfo != null){
    let token = userInfo.token;
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  }else{
    config.headers['Authorization'] = null;
    return config;
  }
  
})
//http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      if (error.response) {
          switch (error.response.status) {
              case 401:
                  // 这里写清除token的代码
                  localStorage.removeItem('token');
                  router.replace({
                      path: 'login',
                  })
          }
      }
      return Promise.reject(error.response.data) 
  });
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login' && to.path == '/register') {
    localStorage.removeItem('token');
  }
  let token = JSON.parse(localStorage.getItem('user'));
  console.log('token',!token)
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

