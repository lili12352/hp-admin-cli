import { getJavaScriptFileSuffix } from "../../../project_utils/index.js";
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
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
    children: [],
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue"),
  },
  {
    path: "/:path(.*)",
    component: () => import("@/views/error/404.vue"),
  },
];

// 路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

// 导出
export default router;
`;
};
const createFileName = (params) => {
  const { variant } = params;
  return `index.${getJavaScriptFileSuffix(variant)}`;
};
export default {
  createFileName: createFileName,
  createTemplate: createRouter,
};
