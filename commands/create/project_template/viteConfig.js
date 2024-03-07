import { getJavaScriptFileSuffix } from "../project_utils/index.js";
const replacement = () => {
  return '`${pathResolve("src")}/`';
};
const ui = (type) => {
  let plugins = "";
  let importStr = "";
  switch (type) {
    case "element":
      plugins = `
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })`;
      importStr = `import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'`;
      break;
    case "antdv":
      break;
    default:
      return;
  }
  return {
    importStr,
    plugins,
  };
};
const css = (type) => {
  if (type === "scss") {
    return `css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/styles/main.scss';"
        }
      }
    },`;
  } else {
    let resolve = '@import "${resolve(__dirname, `./src/styles/main.less`)}";';
    return `css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: ${"`" + resolve + "`"}
        }
      }
    },`;
  }
};
const createViteConfig = (params) => {
  const { projectName, answers } = params;
  return `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
${ui(answers.ui).importStr}
import { resolve } from "path";
const root = process.cwd();
function pathResolve(dir) {
  return resolve(root, ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ${ui(answers.ui).plugins}
  ],
  ${css(answers.css)}
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
        find: ${String.raw`/\@\//`} ,
        replacement: ${replacement()},
      },
    ],
  },
})
`;
};
const createFileName = (params) => {
  const { variant } = params;
  return `vite.config.${getJavaScriptFileSuffix(variant)}`;
};
const noWriteFile = () => {
  return false;
};
export default {
  createFileName: createFileName,
  createTemplate: createViteConfig,
  noWriteFile: noWriteFile,
};
