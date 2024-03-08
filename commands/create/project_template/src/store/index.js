import { getJavaScriptFileSuffix } from "../../../project_utils/index.js";
const tsFnParamsSetupStore = (variant) => {
  if (variant === "TypeScript") {
    return ": App<Element>";
  } else {
    return "";
  }
};

export const storeIndex = (params) => {
  const { answers } = params;
  return `import { createPinia } from "pinia";
${answers.variant === "TypeScript" ? 'import type { App } from "vue"' : ""}
const store = createPinia();
export const setupStore = (app${tsFnParamsSetupStore(answers.variant)}) => {
  app.use(store);
};

export { store };
`;
};
const createFileName = (answers) => {
  const { variant } = answers;
  return `index.${getJavaScriptFileSuffix(variant)}`;
};
export default {
  createFileName: createFileName,
  createTemplate: storeIndex,
};
