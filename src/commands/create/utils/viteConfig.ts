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
      importStr = `import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"`;
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
export const createViteConfig = (answers) => {
  return `import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import svgLoader from "vite-svg-loader";
${ui(answers.ui).importStr}
import { resolve } from "path";
const root = process.cwd();
function pathResolve(dir) {
  return resolve(root, '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig((configEnv)=>{
  const { VITE_BASE_API } = loadEnv(configEnv.mode, process.cwd());
  return {
    plugins: [
      vue(),
      svgLoader(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/icons/svg")],
        symbolId: "[name]",
      }),
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
    base: './',
    server: {
      host: true,
      port: 8888,
      open: true,
      cors: true,
      proxy: {
        "/api": {
          target: VITE_BASE_API, // 测试地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\\/api/, ""),
        },
      },
      warmup: {
        clientFiles: ["./src/layouts/**/*.vue"],
      },
    },
  }
})
`;
};
