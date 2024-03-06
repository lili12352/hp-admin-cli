const createTsconfig = () => {
  return `{
    "compilerOptions": {
      "target": "ESNext",
      "useDefineForClassFields": true,
      "module": "ESNext",
      "moduleResolution": "Node",
      "strict": true,
      "jsx": "preserve",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "esModuleInterop": true,
      "ignoreDeprecations": "5.0",
      "suppressImplicitAnyIndexErrors": true,
      "lib": ["ESNext", "DOM"],
      "skipLibCheck": true,
      "noEmit": true,
      // 配置@别名
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    },
    "include": ["src/**/*.ts", "**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
    "references": [
      {
        "path": "./tsconfig.node.json"
      }
    ]
  }
  `;
};
const createFileName = (answers) => {
  return `tsconfig.json`;
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
