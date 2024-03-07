import { vueTemplate } from "../../../../../project_utils/index.js";

const script = () => {
  return `import { ref } from "vue";
const items = ref([
  {
    key: "sub1",
    label: "Navigation One",
    title: "Navigation One",
    children: [
      {
        key: "5",
        label: "Option 5",
        title: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
        title: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
        title: "Option 7",
      },
      {
        key: "8",
        label: "Option 8",
        title: "Option 8",
      },
    ],
  },
]);`;
};

const elementMenu = () => {
  return `<el-menu
  popper-effect="light"
  active-text-color="#ffffff"
  text-color="#ffffffa6"
  background-color="transparent"
  class="el-menu-vertical-demo"
  default-active="2"
>
  <el-sub-menu
    :index="index"
    v-for="(menu, index) in items"
    :key="menu.key"
  >
    <template #title>
      <span>{{ menu.title }}</span>
    </template>
    <div class="my-menu">
      <el-menu-item
        v-for="menuItem in menu.children"
        :index="menuItem.key"
        :key="menuItem.key"
        >{{ menuItem.title }}</el-menu-item
      >
    </div>
  </el-sub-menu>
</el-menu>`;
};
const antMenu = () => {
  return `<a-menu mode="inline" theme="dark" :items="items" />`;
};
const html = (answers) => {
  const { ui } = answers;
  let uiMenu = ``;
  switch (ui) {
    case "element":
      uiMenu = elementMenu(answers);
      break;
    case "antdv":
      uiMenu = antMenu(answers);
      break;
  }
  return `<div class="aside">
  <div class="log">log</div>
  ${uiMenu}
</div>`;
};

const css = (answers) => {
  const { ui } = answers;
  let addCss = ``;
  if (ui === "element") {
    addCss = `:deep(.el-menu) {
  border: 0;
}
.my-menu {
  padding: 0 4px 0 8px;
  .is-active {
    border-radius: 4px;
    background-color: #1677ff;
  }
}`;
  } else {
    addCss = `:deep(.ant-menu-dark) {
  background-color: transparent;
}`;
  }

  return `.aside {
  .log {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 84px;
  }
  ${addCss}
}`;
};

const createAside = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (variant) => {
  return `index.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createAside,
};
