import { getJavaScriptFileSuffix } from "../../../project_utils/index.js";
const createTsconfig = () => {
  return `import axios from "axios";
  import { useUserInfoStoreWithOut } from "@/store/modules/user";
  
  const userInfoStoreWithOut = useUserInfoStoreWithOut();
  const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000,
  });
  
  /**
   * "Content-Type"
   * "application/octet-stream", // 二进制流"
   * "application/msword", // Word文档格式
   * "application/json:charset=utf-8", // JSON数据格式
   * "multipart/form-data", //文件上传
   */
  
  service.interceptors.request.use(
    (request) => {
      const { token } = userInfoStoreWithOut;
      if (token) {
        request.headers.Authorization = token ? "Bearer " + token : undefined;
      }
      return request;
    },
    (err) => {
      return Promise.reject(err);
    },
  );
  
  // 响应拦截，根据业务文档自行调整
  service.interceptors.response.use(
    (response) => {
      const { status, data } = response;
      if (status !== 200) return {};
      // resultCode是与后端约定好的
      switch (data.resultCode) {
        case 200:
          return data;
        default:
      }
      return response.data;
    },
    (err) => {
      if (err.response) {
        const { status } = err.response;
        switch (status) {
          case 404:
            err.message = "请求地址出错";
            break;
          default:
            break;
        }
      }
      return Promise.reject(err);
    },
  );
  
  export default service;
  `;
};
const createFileName = (answers) => {
  const { variant } = answers;
  return `request.${getJavaScriptFileSuffix(variant)}`;
};
const noWriteFile = (answers) => {
  return false;
};
export default {
  createFileName: createFileName,
  createTemplate: createTsconfig,
  noWriteFile: noWriteFile,
};
