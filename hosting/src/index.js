import Vue from 'vue'
import { firebaseApp } from './firebaseApp.js';

Vue.config.devtools = true;

import VeeValidate from 'vee-validate';
import VueFire from 'vuefire';
import vSelect from 'vue-select'


Vue.use(VeeValidate);
Vue.use(VueFire);
Vue.component('v-select', vSelect);

import Main from "./main.vue"

new Vue({
    el: '#app',
    render: h => h(Main,{props:{firebaseApp:firebaseApp}})
})