import { vueTemplate, isTs } from "../../../../../project_utils/index.js";
const script = (answers) => {
  return `import SvgIcon from "@/components/svgIcon/index.vue";
import MenuItem from "./menu-item.vue";
const props = defineProps(["menu", "isCollapse"]);
const styleIcon = {
  width: "16px",
  height: "16px",
};`;
};

const html = (answers) => {
  const { ui } = answers;
  if (ui === "element") {
    return `<el-sub-menu
  :index="props.menu.key"
  v-if="menu.children && menu.children.length > 0"
>
  <template #title v-if="isCollapse">
    <SvgIcon :iconName="menu.icon" :styleIcon="styleIcon" />
  </template>
  <template #title v-else>
    <SvgIcon :iconName="menu.icon" :styleIcon="styleIcon" />
    <span>{{ menu.label }}</span>
  </template>
  <div class="my-menu">
    <MenuItem
      v-for="menuItem in menu.children"
      :key="menuItem.key"
      :menuItem="menuItem"
    />
  </div>
</el-sub-menu>`;
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
  return `subMenu.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createAside,
};
