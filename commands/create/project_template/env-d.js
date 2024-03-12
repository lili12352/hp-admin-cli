const createTsconfig = () => {
  return `/// <reference types="vite/client" />
interface key {
  [key: string]: any;
}
declare interface RouterRes {
  path: string;
  name: string;
  meta: key;
  component: string;
  children?: Router | undefined;
}`;
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
