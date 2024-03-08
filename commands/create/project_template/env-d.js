const createTsconfig = () => {
  return `/// <reference types="vite/client" />`;
};
const createFileName = (answers) => {
  return `env.d.ts`;
};
const noWriteFile = (answers) => {
  const { variant } = answers;
  return variant !== "TypeScript";
};
export default {
  createFileName: createFileName,
  createTemplate: createTsconfig,
  noWriteFile: noWriteFile,
};
