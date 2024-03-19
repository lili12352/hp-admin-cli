import { defineStore } from "pinia";
import { store } from "../index";
interface State {
  isCollapse: boolean;
}
export const useSystemStore = defineStore({
  id: "system",
  state: (): State => ({
    isCollapse: false,
  }),
  actions: {
    switchCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
  persist: true,
});

export const useSystemStoreWithOut = () => {
  return useSystemStore(store);
};
