import { vueTemplate } from "../../../../../project_utils/index.js";

const script = () => {
  return ``;
};
const html = () => {
  return `<div class="header">head</div>`;
};

const css = () => {
  return ``;
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
