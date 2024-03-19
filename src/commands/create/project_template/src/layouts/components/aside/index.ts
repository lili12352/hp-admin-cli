import { ref } from "vue";
import { useSystemStore } from "@/store/modules/system";
import { useUserInfoStore } from "@/store/modules/user";

import Menu from "./menu.vue";
import SubMenu from "./subMenu.vue";
import MenuItem from "./menu-item.vue";

const systemStore = useSystemStore();
const userInfoStore = useUserInfoStore();
interface MenuList {
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
const items = ref<MenuList[]>(getMenuList(userInfoStore.routerList));
//#end;
() => {
  console.log(Menu, SubMenu, MenuItem, systemStore);
};
return {
  slot: {},
  hook: {},
};
