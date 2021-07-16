import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mitt from "mitt";
import wavesEffect from "./helpers/wavesEffect";
import "bootstrap";

createApp(App)
    .use(store)
    .use(router)
    .use(wavesEffect)
    .provide("eventBus", mitt())
    .mount("#app");
