import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import moment from 'moment';
import useVuelidate from "@vuelidate/core";
import "materialize-css/dist/js/materialize";

let app = createApp(App);

app.config.globalProperties.$moment=moment;

app.use(useVuelidate).use(store).use(router).mount("#app");
