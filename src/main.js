import Vue from 'vue';

import App from './App.vue';
import router from './router';
import axios from './axios';

const socket = new WebSocket("ws://localhost:8081");

socket.onopen = function() {
  console.log("Соединение установлено.");
};

Vue.prototype.$socket = socket;

Vue.prototype.$http = axios;
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
