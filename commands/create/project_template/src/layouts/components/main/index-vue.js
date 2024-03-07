import { vueTemplate } from "../../../../../project_utils/index.js";

const script = () => {
  return ``;
};
const html = () => {
  return `<div class="main">main</div>`;
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
