import { vueTemplate } from "../../../../project_utils/index.js";

const script = () => {
  return `const props = defineProps({
  iconName: {
    type: String,
    default: "",
    required: true,
  },
  styleIcon: {
    type: Object,
  },
});`;
};
const html = () => {
  return `<component :is="props.iconName" :style="props.styleIcon" />`;
};

const css = () => {
  return ``;
};
const createVue = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (params) => {
  return `index.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createVue,
};
