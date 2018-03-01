import Vue from 'vue';
import ReconnectingWebSocket from 'reconnecting-websocket';
import App from './App.vue';
import axios from './axios';
import './findPolyfill';

Vue.prototype.$socket = new ReconnectingWebSocket("ws://api.mirrors.local:8000", undefined, { maxReconnectionDelay: 4000 });

new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$http = axios(this);
  }
});
