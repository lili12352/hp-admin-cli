import { vueTemplate } from "../../../project_utils/index.js";

const script = () => {
  return `import leftModel from './leftModel.vue';`;
};
const html = () => {
  return `<div>
    <leftModel />
  </div>`;
};

const css = () => {
  return ``;
};

const createLayouts = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (variant) => {
  return `index.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createLayouts,
};
