import { getJavaScriptFileSuffix } from "../../project_utils/index.js";
const ui = (type) => {
  let importUi = "";
  let useUi = "";
  switch (type) {
    case "antdv":
      importUi = `import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';`;
      useUi = `app.use(Antd)`;
      break;
    default:
      break;
  }
  return {
    importUi,
    useUi,
  };
};

const i18n = (type) => {
  let importI18n = "";
  let useI18n = "";
  if (type) {
    importI18n = `
import { i18n } from "./lang/index";`;
    useI18n = ".use(i18n)";
  }
  return {
    importI18n,
    useI18n,
  };
};

const pinia = () => {
  let importPinia = `import { createPinia } from "pinia";`;
  let usePinia = `const pinia = createPinia();
app.use(pinia);`;
  return {
    importPinia,
    usePinia,
  };
};
const createMain = (params) => {
  const { projectName, answers } = params;
  const { importUi, useUi } = ui(answers.ui);
  const { importI18n, useI18n } = i18n(answers.i18n);
  const { importPinia, usePinia } = pinia();
  return `import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
${importPinia}
${importUi}${importI18n}

const app = createApp(App);
${usePinia}
app.use(router)${useI18n};
${useUi}
router.isReady().then(() => {
  app.mount("#app");
});
 `;
};
const createFileName = (answers) => {
  const { variant } = answers;
  return `main.${getJavaScriptFileSuffix(variant)}`;
};
export default {
  createFileName: createFileName,
  createTemplate: createMain,
};
