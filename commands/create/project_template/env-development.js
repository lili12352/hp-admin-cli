const createTsconfig = () => {
  return `# 开发环境
VITE_APP_BASE_API = '/api'
VITE_BASE_API="http://192.168.1.32:3000"`;
};
const createFileName = (answers) => {
  return `.env.development`;
};
const noWriteFile = (answers) => {
  return false;
};
export default {
  createFileName: createFileName,
  createTemplate: createTsconfig,
  noWriteFile: noWriteFile,
};
