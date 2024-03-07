import { getJavaScriptFileSuffix } from "../../project_utils/index.js";
const ui = (type) => {
  let importStr = "";
  let use = "";
  switch (type) {
    case "antdv":
      importStr = `import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';`;
      use = `app.use(Antd)`;
      break;
    default:
      break;
  }
  return {
    importStr,
    use,
  };
};

const i18n = (type) => {
  let importStr = "";
  let use = "";
  if (type) {
    importStr = `
import { i18n } from "./lang/index";`;
    use = ".use(i18n)";
  }
  return {
    importStr,
    use,
  };
};
const createMain = (params) => {
  const { projectName, answers } = params;
  return `import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
${ui(answers.ui).importStr}${i18n(answers.i18n).importStr}

const app = createApp(App);
app.use(router)${i18n(answers.i18n).use};
${ui(answers.ui).use}
router.isReady().then(() => {
  app.mount("#app");
});
 `;
};
const createFileName = (params) => {
  const { variant } = params;
  return `main.${getJavaScriptFileSuffix(variant)}`;
};
export default {
  createFileName: createFileName,
  createTemplate: createMain,
};
