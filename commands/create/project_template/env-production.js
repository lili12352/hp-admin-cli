const createTsconfig = () => {
  return `# 生产环境
VITE_APP_BASE_API = '/api'
VITE_BASE_API="http://192.168.1.32:3000"`;
};
const createFileName = (answers) => {
  return `.env.production`;
};
const noWriteFile = (answers) => {
  return false;
};
export default {
  createFileName: createFileName,
  createTemplate: createTsconfig,
  noWriteFile: noWriteFile,
};