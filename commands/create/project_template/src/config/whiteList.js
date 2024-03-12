import { getJavaScriptFileSuffix, isTs } from "../../../project_utils/index.js";

const createTsconfig = (params) => {
  const { answers } = params;
  return `const whiteList = ["/login", "/404"];
  const isWhiteListPage = (path${isTs(": string", answers.variant)})${isTs(
    ": string | undefined",
    answers.variant
  )} => {
    return whiteList.find((item) => item === path);
  };
  
  export default isWhiteListPage;`;
};
const createFileName = (answers) => {
  const { variant } = answers;
  return `white-list.${getJavaScriptFileSuffix(variant)}`;
};
const noWriteFile = (answers) => {
  return false;
};
export default {
  createFileName: createFileName,
  createTemplate: createTsconfig,
  noWriteFile: noWriteFile,
};
