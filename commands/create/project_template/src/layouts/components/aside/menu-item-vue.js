import { vueTemplate } from "../../../../../project_utils/index.js";
const script = (answers) => {
  return `import SvgIcon from "@/components/svgIcon/index.vue";
  const props = defineProps(["menuItem"]);
  const styleIcon = {
    width: "16px",
    height: "16px",
  };`;
};

const html = (answers) => {
  const { ui } = answers;
  const uiHtml = ui === "element" ? "el" : "a";
  return `  <div class="my-menu">
  <${uiHtml}-menu-item :index="props.menuItem.key" :key="props.menuItem.key">
    <SvgIcon :iconName="props.menuItem.icon" :styleIcon="styleIcon" />
    <span v-if="!systemStore.isCollapse"> {{ props.menuItem.label }}</span>
  </${uiHtml}-menu-item>
</div>`;
};

const css = (answers) => {
  const { ui } = answers;
  if (ui === "element") {
    return `.my-menu {
  box-sizing: border-box;
  .is-active {
    border-radius: 4px;
    background-color: #1677ff;
  }
  :deep(.el-menu-item) {
    &:hover {
      color: #fff;
    }
  }
}`;
  } else {
    return ``;
  }
};

const createAside = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (variant) => {
  return `menu-item.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createAside,
};
