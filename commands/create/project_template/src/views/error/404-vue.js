import { vueTemplate } from "../../../../project_utils/index.js";

const script = () => {
  return ``;
};
const html = (answers) => {
  return `<template>
  <div>404</div>
</template>
`;
};

const css = () => {
  return ``;
};
const createMain = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (variant) => {
  return `404.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createMain,
};
