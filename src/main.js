import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { createPinia } from "pinia";
// components are registerd globaly in `master-class-ftf/vite.config.js`

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
