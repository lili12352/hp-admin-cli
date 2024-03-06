const createTsconfig = () => {
  return `{
    "compilerOptions": {
      "composite": true,
      "module": "ESNext",
      "moduleResolution": "Node",
      "allowSyntheticDefaultImports": true
    },
    "include": ["vite.config.ts"]
  }`;
};
const createFileName = (answers) => {
  return `tsconfig.node.json`;
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
