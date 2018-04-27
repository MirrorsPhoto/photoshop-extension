import Vue from 'vue';
import ReconnectingWebSocket from 'reconnecting-websocket';
import App from './App.vue';
import axios from './axios';
import './findPolyfill';

const socket = new ReconnectingWebSocket("ws://localhost:8081", undefined, { maxReconnectionDelay: 4000 });

Vue.prototype.$socket = socket;

new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$http = axios(this);
  }
});
