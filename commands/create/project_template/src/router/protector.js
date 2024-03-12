import { getJavaScriptFileSuffix } from "../../../project_utils/index.js";

const ts = () => {
  return `import router from "./index";
  import { useUserInfoStoreWithOut } from "@/store/modules/user";
import isWhiteListPage from "@/config/white-list";
import { type RouteRecordRaw } from "vue-router";

// 动态路由
const asyncRouter = (routerList: RouterRes[]): RouteRecordRaw[] => {
  if (!routerList || routerList.length === 0) return [];
  return routerList.map((r: RouterRes) => ({
    path: r.path,
    name: r.name,
    component: () => import(r.component),
    children: asyncRouter(r.children),
  }));
};

router.beforeEach(async (to, _from, next) => {
  const userInfoStore = useUserInfoStoreWithOut();
  if (!userInfoStore.token) {
    // 判断是否在免登录的白名单内
    if (!isWhiteListPage(to.fullPath)) {
      return next("/login");
    } else {
      return next();
    }
  }
  if (to.path === "/login") {
    return next({ path: "/" });
  }
  try {
    if (!userInfoStore.role) {
      const routerRes = await userInfoStore.getUserInfo();
      const routerList = asyncRouter(routerRes) as RouteRecordRaw[];
      routerList.forEach((item: RouteRecordRaw) => {
        // 注册动态路由
        router.addRoute("/", item);
      });
      return next(to.fullPath);
    }
    next();
  } catch {
    next();
  }
});
`;
};

const js = () => {
  return `import router from "./index";
  import { useUserInfoStoreWithOut } from "@/store/modules/user";
import isWhiteListPage from "@/config/white-list";

// 动态路由
const asyncRouter = (routerList) => {
  if (!routerList || routerList.length === 0) return [];
  return routerList.map((r) => ({
    path: r.path,
    name: r.name,
    component: () => import(r.component),
    children: asyncRouter(r.children),
  }));
};

router.beforeEach(async (to, _from, next) => {
  const userInfoStore = useUserInfoStoreWithOut();
  if (!userInfoStore.token) {
    // 判断是否在免登录的白名单内
    if (!isWhiteListPage(to.fullPath)) {
      return next("/login");
    } else {
      return next();
    }
  }
  if (to.path === "/login") {
    return next({ path: "/" });
  }
  try {
    if (!userInfoStore.role) {
      const routerRes = await userInfoStore.getUserInfo();
      const routerList = asyncRouter(routerRes);
      routerList.forEach((item) => {
        // 注册动态路由
        router.addRoute("/", item);
      });
      return next(to.fullPath);
    }
    next();
  } catch {
    next();
  }
});
`;
};

const createRouter = (params) => {
  const { projectName, answers } = params;
  if (answers.variant === "TypeScript") {
    return ts();
  } else {
    return js();
  }
};
const createFileName = (params) => {
  const { variant } = params;
  return `protector.${getJavaScriptFileSuffix(variant)}`;
};
export default {
  createFileName: createFileName,
  createTemplate: createRouter,
};
