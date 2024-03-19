import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
import "@/router/protector";
import { initStore } from "@/store/index"
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
initStore(app);
app.use(router);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
router.isReady().then(() => {
  app.mount("#app");
});
 