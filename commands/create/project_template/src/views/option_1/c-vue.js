import { vueTemplate } from "../../../../project_utils/index.js";

const script = () => {
  return ``;
};
const html = (answers) => {
  return `
  <div>c</div>

`;
};

const css = () => {
  return ``;
};
const createMain = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (variant) => {
  return `c.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createMain,
};
