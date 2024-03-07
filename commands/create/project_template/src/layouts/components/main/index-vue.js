import { vueTemplate } from "../../../../../project_utils/index.js";
import { isI18n } from "../../../../../project_utils/i18n.js";
const script = () => {
  return ``;
};
const html = (answers) => {
  return `<div class="main">
    ${isI18n("请输入账号", answers.i18n, "html")}
  </div>`;
};

const css = () => {
  return `.main {
    width: 100%;
    height: 100%;
    background-color: bisque;
  }`;
};
const createMain = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (variant) => {
  return `index.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createMain,
};
