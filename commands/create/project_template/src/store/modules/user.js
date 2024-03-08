import { getJavaScriptFileSuffix } from "../../../../project_utils/index.js";
export const storeIndex = (params) => {
  const { answers } = params;
  return `import { defineStore } from "pinia";
import { store } from "../index";

export const useUserInfoStore = defineStore({
  id: "user",
  state: () => ({
    name: "hhh",
  }),
  actions: {},
});

export const useUserInfoStoreWithOut = () => {
  return useUserInfoStore(store);
};
`;
};
const createFileName = (answers) => {
  const { variant } = answers;
  return `user.${getJavaScriptFileSuffix(variant)}`;
};
export default {
  createFileName: createFileName,
  createTemplate: storeIndex,
};
