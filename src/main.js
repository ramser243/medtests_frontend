import Vue from 'vue';
import App from './App.vue';
import store from './store/index'
import router from "./router";

new Vue({
  router,
  el: '#app',
  store: store,
  render: h => h(App)
})
