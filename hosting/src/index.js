import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyDY30PPVzuDZYx92ONHKdqL0zXopHizDxw",
    authDomain: "prickathon.firebaseapp.com",
    databaseURL: "https://prickathon.firebaseio.com",
    projectId: "prickathon",
    storageBucket: "prickathon.appspot.com",
    messagingSenderId: "854301723180"
};
var firebaseApp = firebase.initializeApp(config);

import Vue from 'vue'

Vue.config.devtools = true;

import VeeValidate from 'vee-validate';
import VueFire from 'vuefire';
import vSelect from 'vue-select'

var provider = new firebase.auth.TwitterAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
	//authInfo(user);
});

//authInfo();

function authInfo(user){
	if (user) {
		document.getElementById("auth_info").innerHTML = "ログイン中"
	} else {
		document.getElementById("auth_info").innerHTML = "ログインしていません"
	}
}

function auth(){
	firebase.auth().signInWithPopup(provider);
}

function signout(){
	firebase.auth().signOut();
}

Vue.use(VeeValidate);
Vue.use(VueFire);
Vue.component('v-select', vSelect);

import Main from "./main.vue"

new Vue({
    el: '#app',
    render: h => h(Main,{props:{firebaseApp:firebaseApp}})
})