import { getJavaScriptFileSuffix } from "../../utils/index.js";
const createMain = (params) => {
    return `import { createApp } from "vue";
  import "./style.css";
  import App from "./App.vue";
  import router from "@/router";
  
  const app = createApp(App);
  
  app.use(router);
  
  router.isReady().then(() => {
    app.mount("#app");
  });
   `;
};
const createFileName = (variant) => {
    return `main.${getJavaScriptFileSuffix(variant)}`;
};
export default {
    createFileName: createFileName,
    createTemplate: createMain,
};
