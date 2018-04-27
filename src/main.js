import Vue from 'vue';
import ReconnectingWebSocket from 'reconnecting-websocket';

import App from './App.vue';
import router from './router';
import axios from './axios';

const socket = new ReconnectingWebSocket("ws://api.mirrors-photo.ru:8000", undefined, { maxReconnectionDelay: 4000 });

Vue.prototype.$socket = socket;

Vue.prototype.$http = axios;
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
