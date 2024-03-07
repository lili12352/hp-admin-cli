import { getJavaScriptFileSuffix } from "../../../project_utils/index.js";
import { i18nFileData } from "../../../project_utils/i18n.js";
const createRouter = (params) => {
  return `export default {
    ${i18nFileData("cn")}
};`;
};
const createFileName = (params) => {
  const { variant } = params;
  return `zh-CN.${getJavaScriptFileSuffix(variant)}`;
};
const noWriteFile = (answers) => {
  const { i18n } = answers;
  return !i18n;
};
export default {
  createFileName: createFileName,
  createTemplate: createRouter,
  noWriteFile: noWriteFile,
};
