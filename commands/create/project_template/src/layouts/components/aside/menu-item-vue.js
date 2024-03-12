import { vueTemplate } from "../../../../../project_utils/index.js";
const script = (answers) => {
  return `import SvgIcon from "@/components/svgIcon/index.vue";
import { useSystemStore } from "@/store/modules/system";
const systemStore = useSystemStore();
const props = defineProps(["menuItem"]);
const styleIcon = {
  width: "16px",
  height: "16px",
};`;
};

const uiHtml = (ui) => {
  if (ui === "element") {
    return `<SvgIcon :iconName="props.menuItem.icon" :styleIcon="styleIcon" />
<template #title>
  <span> {{ props.menuItem.label }}</span>
</template>`;
  } else {
    return `<SvgIcon :iconName="props.menuItem.icon" :styleIcon="styleIcon" />
<span v-if="!systemStore.isCollapse"> {{ props.menuItem.label }}</span>`;
  }
};
const html = (answers) => {
  const { ui } = answers;
  const uiHtml = ui === "element" ? "el" : "a";
  return `  <div class="my-menu">
  <${uiHtml}-menu-item :index="props.menuItem.key" :key="props.menuItem.key">
    ${uiHtml(ui)}
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
