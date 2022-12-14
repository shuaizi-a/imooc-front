import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { useREM } from "./utils/flexible";
import mLibs from './libs'
import "virtual:svg-icons-register";
import "./styles/index.scss";

useREM();
createApp(App).use(router).use(mLibs).mount("#app");
