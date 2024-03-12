import { vueTemplate, isTs } from "../../../../../project_utils/index.js";

const uiScript = (answers) => {
  const { ui, variant } = answers;
  if (ui === "element") {
    return `const select = (v${isTs(": string", variant)}) => {
  router.push(v);
};`;
  } else {
    return `const openKeys = ref${isTs("<string[]>", variant)}([]);
const getOpenKeys = (path${isTs(": string", variant)}) => {
  if (systemStore.isCollapse) return;
  const key = path.split("").reverse().join("");
  const index = key.indexOf("/") + 1;
  openKeys.value = [path.slice(0, key.length - index)];
};
getOpenKeys(router.currentRoute.value.fullPath);

const select = (v${isTs(": any", variant)}) => {
  defaultActive.value = v.key;
  getOpenKeys(v.key);
  router.push(v.key);
};`;
  }
};
const script = (answers) => {
  const { ui } = answers;
  return `import { ref } from "vue";
import { useRouter } from "vue-router";
${
  ui === "element"
    ? ""
    : `import { useSystemStore } from "@/store/modules/system";
const systemStore = useSystemStore();`
}
const router = useRouter();
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const defaultActive = ref(router.currentRoute.value.fullPath);
${uiScript(answers)}
`;
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
    return `<a-menu
  :openKeys="openKeys"
  :selectedKeys="[defaultActive]"
  @select="select"
  mode="inline"
  theme="dark"
  :inline-collapsed="props.isCollapse"
>
  <slot />
</a-menu>`;
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
