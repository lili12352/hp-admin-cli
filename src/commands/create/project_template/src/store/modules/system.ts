import { defineStore } from "pinia";
import { store } from "../index";
interface State {
  isCollapse: boolean;
  removeRouterList: any;
  routerList: any;
  tabBarList: any;
}
export const useSystemStore = defineStore({
  id: "system",
  state: (): State => ({
    isCollapse: false,
    removeRouterList: [],
    routerList: [],
    tabBarList: [],
  }),
  actions: {
    addTabBar(tab: any) {
      const find = this.tabBarList.find((item: any) => item.path === tab.path);
      if (find) return;
      this.tabBarList.push(tab);
    },
    delTabbar(path: string) {
      console.log("删除", path);
    },
    switchCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    resetSystem() {
      this.removeRouterList.forEach((item: Function) => item());
      this.removeRouterList = [];
      this.tabBarList = [];
    },
    setRouterList(routerList: any) {
      this.routerList = routerList;
    },
    addRemoveRouterList(router: Function) {
      this.removeRouterList.push(router);
    },
  },
  persist: {
    paths: ["isCollapse", "routerList", "tabBarList"],
  },
});

export const useSystemStoreWithOut = () => {
  return useSystemStore(store);
};
