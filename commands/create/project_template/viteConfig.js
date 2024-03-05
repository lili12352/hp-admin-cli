import { getJavaScriptFileSuffix } from "../utils/index.js";
const replacement = () => {
    return '`${pathResolve("src")}/`';
};
const createViteConfig = () => {
    return `import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'

    import { resolve } from "path";
    const root = process.cwd();
    function pathResolve(dir) {
      return resolve(root, ".", dir);
    }
    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [vue()],
      resolve: {
        extensions: [
          ".mjs",
          ".js",
          ".ts",
          ".jsx",
          ".tsx",
          ".json",
          ".scss",
          ".css",
        ],
        alias: [
          {
            find: ${String.raw `/\@\//`} ,
            replacement: ${replacement()},
          },
        ],
      },
    })
    `;
};
const createFileName = (variant) => {
    return `vite.config.${getJavaScriptFileSuffix(variant)}`;
};
export default {
    createFileName: createFileName,
    createTemplate: createViteConfig,
};
