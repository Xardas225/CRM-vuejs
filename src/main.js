import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize";
import moment from 'moment';

let app = createApp(App);

app.config.globalProperties.$moment=moment;

app.use(store).use(router).mount("#app");
