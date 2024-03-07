import { getJavaScriptFileSuffix } from "../../../project_utils/index.js";
const createRouter = (params) => {
  return `import { createI18n } from "vue-i18n";
import en from "./en"; // 英文语言配置
import zhCN from "./zh-CN"; // 中文语言配置

const config = localStorage.getItem("lang");

let lang = "zhCN";
if (config) {
  lang = config;
}
export const i18n = createI18n({
  legacy: false, // componsition API需要设置为false
  locale: lang,
  globalInjection: true, // 可以在template模板中使用$t
  messages: {
    en,
    zhCN,
  },
});`;
};
const createFileName = (params) => {
  const { variant } = params;
  return `index.${getJavaScriptFileSuffix(variant)}`;
};
const noWriteFile = (answers) => {
  const { i18n } = answers;
  return !i18n;
};
export default {
  createFileName: createFileName,
  createTemplate: createRouter,
  noWriteFile: noWriteFile,
};
