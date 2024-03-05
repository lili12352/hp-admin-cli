import { getJavaScriptFileSuffix } from "../../../utils/index.js";
const createRouter = (params) => {
    const { projectName, answers } = params;
    return `import { createRouter, createWebHashHistory } from "vue-router";

  const routes = [
    {
      path: "/",
      name: "/",
      component: () => import("@/layouts/index.vue"),
      children: [],
    },
  ];
  // 路由
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  // 导出
  export default router;
  `;
};
const createFileName = (variant) => {
    return `index.${getJavaScriptFileSuffix(variant)}`;
};
export default {
    createFileName: createFileName,
    createTemplate: createRouter,
};
