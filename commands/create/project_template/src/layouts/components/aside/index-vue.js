import { vueTemplate } from "../../../../../project_utils/index.js";

const js = () => {
  return `const getMenuList = (routerList) => {
  if (!routerList || routerList.length === 0) return [];
  return routerList.map((router) => {
    return {
      key: router.path,
      label: router.name,
      title: router.path,
      icon: router.meta.icon,
      children: getMenuList(router.children),
    };
  });
};
const items = ref(getMenuList(userInfoStore.routerList));`;
};
const ts = () => {
  return `interface MenuList {
  key: string;
  label: string;
  title: string;
  icon?: string;
  children?: MenuList[] | undefined;
}
const getMenuList = (routerList: RouterRes[]): MenuList[] => {
  if (!routerList || routerList.length === 0) return [];
  return routerList.map((router: RouterRes): MenuList => {
    return {
      key: router.path,
      label: router.name,
      title: router.path,
      icon: router.meta.icon,
      children: getMenuList(router.children),
    };
  });
};
const items = ref<MenuList[]>(getMenuList(userInfoStore.routerList));`;
};

const script = (answers) => {
  const { variant } = answers;
  return `import { ref } from "vue";
import { useSystemStore } from "@/store/modules/system";
import { useUserInfoStore } from "@/store/modules/user";

import Menu from "./menu.vue";
import SubMenu from "./subMenu.vue";
import MenuItem from "./menu-item.vue";

const systemStore = useSystemStore();
const userInfoStore = useUserInfoStore();
${variant === "TypeScript" ? ts() : js()}
`;
};

const html = (answers) => {
  return `<div
  class="aside"
  :class="systemStore.isCollapse ? 'close-menu' : 'open-menu'"
>
  <div class="log">log</div>
  <Menu :isCollapse="systemStore.isCollapse">
    <div v-for="menu in items" :key="menu.key">
      <SubMenu
        :menu="menu"
        :isCollapse="systemStore.isCollapse"
        v-if="menu.children && menu.children.length > 0"
      />
      <MenuItem v-else :menuItem="menu" />
    </div>
  </Menu>
</div>`;
};

const css = (answers) => {
  const { ui } = answers;
  return `.aside {
  transition: width 0.35s;
  .close-menu {
    width: ${ui === "element" ? "64" : "80"}px;
  }
  .open-menu {
    width: 220px;
  }
  .log {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 84px;
  }
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
