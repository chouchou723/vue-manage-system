import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/iconfont.css'
import "babel-polyfill";

// import fullCalendar from 'vue-fullcalendar';
// Vue.component('full-calendar', fullCalendar);

import store from './vuex/store'
import Vuex from 'vuex'

import 'vue-event-calendar/dist/style.css' //^1.1.10, CSS has been extracted as one file, so you can easily update it.
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'zh',color:'#1fb5ad'}) //locale can be 'zh' or 'en'

// import './mock/index.js';
// import Mock from './mock'
// Mock.bootstrap();
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.$axios = axios;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');