import { vueTemplate } from "../../../../project_utils/index.js";

const script = () => {
  return ``;
};
const html = (answers) => {
  return `
  <div>b</div>
`;
};

const css = () => {
  return ``;
};
const createMain = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (variant) => {
  return `b.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createMain,
};
