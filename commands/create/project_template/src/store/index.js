import { getJavaScriptFileSuffix, isTs } from "../../../project_utils/index.js";

export const storeIndex = (params) => {
  const { answers } = params;
  return `import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
${isTs(`import { App } from "vue";`, answers.variant)}
const store = createPinia();
store.use(piniaPluginPersistedstate);
const initStore = (app${isTs(`: App<Element>`, answers.variant)}) => {
  app.use(store);
};
export { store, initStore };`;
};
const createFileName = (answers) => {
  const { variant } = answers;
  return `index.${getJavaScriptFileSuffix(variant)}`;
};
export default {
  createFileName: createFileName,
  createTemplate: storeIndex,
};
