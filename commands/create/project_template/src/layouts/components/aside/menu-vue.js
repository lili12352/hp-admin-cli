import { vueTemplate, isTs } from "../../../../../project_utils/index.js";
const script = (answers) => {
  return `import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const defaultActive = ref(router.currentRoute.value.fullPath);
const select = (v${isTs(": string", answers.variant)}) => {
  router.push(v);
};`;
};

const html = (answers) => {
  const { ui } = answers;
  if (ui === "element") {
    return `<el-menu
  :collapse-transition="false"
  :collapse="props.isCollapse"
  active-text-color="#ffffff"
  text-color="#ffffffa6"
  background-color="#1a1a1a"
  class="el-menu-vertical-demo"
  :default-active="defaultActive"
  :show-timeout="0"
  :hide-timeout="0"
  @select="select"
>
  <slot />
</el-menu>`;
  } else {
    return ``;
  }
};

const css = (answers) => {
  const { ui } = answers;
  if (ui === "element") {
    return `.el-menu-vertical-demo {
  border: 0 !important;
}`;
  } else {
    return ``;
  }
};

const createAside = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (variant) => {
  return `menu.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createAside,
};
