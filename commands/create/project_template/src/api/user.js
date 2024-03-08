import { getJavaScriptFileSuffix } from "../../../project_utils/index.js";
const createTsconfig = () => {
  return `import service from "@/utils/request";

/** 登录 */
export function userLoginApi(data) {
  return service({
    url: "user/login",
    method: "post",
    data,
  });
}
`;
};
const createFileName = (answers) => {
  const { variant } = answers;
  return `user.${getJavaScriptFileSuffix(variant)}`;
};
const noWriteFile = (answers) => {
  return false;
};
export default {
  createFileName: createFileName,
  createTemplate: createTsconfig,
  noWriteFile: noWriteFile,
};
