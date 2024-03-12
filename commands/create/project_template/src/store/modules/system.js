import {
  getJavaScriptFileSuffix,
  isTs,
} from "../../../../project_utils/index.js";
export const storeIndex = (params) => {
  const { answers } = params;
  const { variant } = answers;
  return `import { defineStore } from "pinia";
import { store } from "../index";
${isTs(
  `interface State {
  isCollapse: boolean;
}`,
  variant
)}
export const useSystemStore = defineStore({
  id: "system",
  state: ()${isTs(`: State`, variant)} => ({
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
`;
};
const createFileName = (answers) => {
  const { variant } = answers;
  return `system.${getJavaScriptFileSuffix(variant)}`;
};
export default {
  createFileName: createFileName,
  createTemplate: storeIndex,
};
