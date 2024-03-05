import { getJavaScriptFileSuffix } from "../../utils/index.js";
const ui = (type) => {
  let importStr = ''
  let use = ''
  switch (type) {
    case "antdv":
      importStr = `import Antd from 'ant-design-vue';
      import 'ant-design-vue/dist/reset.css';`
      use = `app.use(Antd)`
      break
    default:
      break
  }
  return {
    importStr,
    use
  }

}
const createMain = (params) => {
  const { projectName, answers } = params;
  return `import { createApp } from "vue";
  import "./style.css";
  import App from "./App.vue";
  import router from "@/router";
  ${ui(answers.ui).importStr}
  const app = createApp(App);
  
  app.use(router);
  ${ui(answers.ui).use}
  router.isReady().then(() => {
    app.mount("#app");
  });
   `;
};
const createFileName = (params) => {
  const { variant } = params
  return `main.${getJavaScriptFileSuffix(variant)}`;
};
export default {
  createFileName: createFileName,
  createTemplate: createMain,
};
