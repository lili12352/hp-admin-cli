import { vueTemplate } from "../../../../../project_utils/index.js";

const script = () => {
  return ``;
};
const html = () => {
  return `<div class="aside">aside</div>`;
};

const css = () => {
  return `.aside {
  width: 100px;
  height: 100%;
  background-color: gold;
}`;
};

const createAside = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (variant) => {
  return `index.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createAside,
};
