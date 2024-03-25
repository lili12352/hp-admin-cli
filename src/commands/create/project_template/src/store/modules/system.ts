import { defineStore } from "pinia";
import { store } from "../index";
import router from "@/router";

interface State {
  themeValue: string;
  isCollapse: boolean;
  removeRouterList: any;
  routerList: any;
  tabBarList: any;
}
export const useSystemStore = defineStore({
  id: "system",
  state: (): State => ({
    themeValue: "normal",
    isCollapse: false,
    removeRouterList: [],
    routerList: [],
    tabBarList: [
      {
        path: "/home",
        name: "首页",
      },
    ],
  }),
  actions: {
    addTabBar(tab: any) {
      const find = this.tabBarList.find((item: any) => item.path === tab.path);
      if (find) return;
      this.tabBarList.push(tab);
    },
    delTabbar(path: string) {
      this.tabBarList = this.tabBarList.filter(
        (item: any) => item.path !== path,
      );
      if (
        path === window.location.hash.replace("#", "") &&
        this.tabBarList.length > 0
      ) {
        router.push(this.tabBarList[this.tabBarList.length - 1].path);
      }
    },
    switchCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    resetSystem() {
      this.removeRouterList.forEach((item: Function) => item());
      this.removeRouterList = [];
      this.tabBarList = [
        {
          path: "/home",
          name: "首页",
        },
      ];
    },
    setRouterList(routerList: any) {
      this.routerList = routerList;
    },
    addRemoveRouterList(router: Function) {
      this.removeRouterList.push(router);
    },
  },
  persist: {
    paths: ["isCollapse", "routerList", "tabBarList", "themeValue"],
  },
});

export const useSystemStoreWithOut = () => {
  return useSystemStore(store);
};
