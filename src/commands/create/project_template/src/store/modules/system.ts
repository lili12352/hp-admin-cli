import { defineStore } from "pinia";
import { store } from "../index";
interface State {
  isCollapse: boolean;
  removeRouterList: any;
  routerList: any;
}
export const useSystemStore = defineStore({
  id: "system",
  state: (): State => ({
    isCollapse: false,
    removeRouterList: [],
    routerList: [],
  }),
  actions: {
    switchCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    resetSystem() {
      this.removeRouterList.forEach((item: Function) => item());
      this.removeRouterList = [];
    },
    setRouterList(routerList: any) {
      this.routerList = routerList;
    },
    addRemoveRouterList(router: Function) {
      this.removeRouterList.push(router);
    },
  },
  persist: true,
});

export const useSystemStoreWithOut = () => {
  return useSystemStore(store);
};
