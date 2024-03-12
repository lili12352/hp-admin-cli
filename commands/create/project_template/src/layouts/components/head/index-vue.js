import { vueTemplate } from "../../../../../project_utils/index.js";

const script = () => {
  return `import SvgIcon from "@/components/svgIcon/index.vue";
import { useSystemStore } from "@/store/modules/system";
const systemStore = useSystemStore();
const iconName = "Expand";
const styleIcon = {
  width: "16px",
  height: "16px",
};
const clickIcon = () => {
  systemStore.switchCollapse();
};`;
};
const html = (answers) => {
  const { ui } = answers;
  let menuIcon = ``;
  if (ui === "element") {
    menuIcon = `<SvgIcon
    :iconName="systemStore.isCollapse ? 'Expand' : 'Fold'"
    :styleIcon="styleIcon"
  />`;
  } else {
    menuIcon = `<SvgIcon
    :iconName="
      systemStore.isCollapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'
    "
    :styleIcon="styleIcon"
  />`;
  }
  return `<div class="header">
  <div class="fold-icon" @click="clickIcon">
    ${menuIcon}
  </div>
</div>`;
};

const css = () => {
  return `.header {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .fold-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
  }
}`;
};

const createHead = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (variant) => {
  return `index.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createHead,
};
