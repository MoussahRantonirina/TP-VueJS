// main.js
import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

const authStore = useAuthStore();

const existingAuthData = JSON.parse(localStorage.getItem("authData"));
if (!existingAuthData) {
  localStorage.setItem(
    "authData",
    JSON.stringify({
      username: "bob",
      password: "bob",
      isConnected: false,
    })
  );
}

authStore.loadAuthData();

app.mount("#app");
