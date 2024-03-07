import { vueTemplate } from "../../../../../project_utils/index.js";

const script = () => {
  return ``;
};
const html = () => {
  return `<div class="head">head</div>`;
};

const css = () => {
  return `.head {
  width: 100%;
  height: 100%;
  background-color: aqua;
}`;
};

const createHead = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (variant) => {
  return `index.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createHead,
};
