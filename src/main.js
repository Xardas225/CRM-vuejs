import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import messagePlugin from "./utils/message.plugin";
import Loader from '@/components/app/Loader';
import firebase from 'firebase/app';
import "materialize-css/dist/js/materialize";
import "firebase/auth";
import "firebase/database";

let app;

const firebaseConfig = {
  apiKey: "AIzaSyCYYAZVOUnGgsukk1d556_JaII6nL8dX-8",
  authDomain: "vue-crm-e6ca8.firebaseapp.com",
  projectId: "vue-crm-e6ca8",
  storageBucket: "vue-crm-e6ca8.appspot.com",
  messagingSenderId: "80482862103",
  appId: "1:80482862103:web:0530d593748a496aafc852",
  measurementId: "G-DE54T7TK3Y",
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(()=> {
    if(!app) {
        app =  createApp(App);
        app.config.globalProperties.$moment = moment;
        app.component('v-loader', Loader);
        app.use(messagePlugin).use(useVuelidate).use(store).use(router).mount("#app");
    }
})

