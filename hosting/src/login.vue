<template>
    <div style="display: inline-block" class="text-right">
        <a v-on:click="login" class="square_btn">ログイン</a>
        <a v-on:click="logout" class="square_btn">サインアウト</a>
        <span>{{ (isAuth) ? "ログイン中" : "ログインしていません"}}</span>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

import { firebaseApp } from './firebaseApp.js';

export default {
    data:()=>({
        isAuth:false
    }),
    methods:{
        login(){
            let provider = new firebase.auth.TwitterAuthProvider();
	        firebaseApp.auth().signInWithPopup(provider);
        },
        logout(){
            firebaseApp.auth().signOut();
        }
    },
    created: function() {
        firebaseApp.auth().onAuthStateChanged((user)=>{
            this.$data.isAuth=!!user
        });
    }
}
</script>
