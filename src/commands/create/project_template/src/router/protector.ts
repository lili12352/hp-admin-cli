import router from "./index";
import { useUserInfoStoreWithOut } from "@/store/modules/user";
import { useSystemStore } from "@/store/modules/system";
import { useSystemStoreWithOut } from "@/store/modules/system";
import isWhiteListPage from "@/config/white-list";
import { type RouteRecordRaw } from "vue-router";
import { getUserInfoApi } from "@/api/user";

const layouts = import.meta.glob("../**/**.vue");
const pages = [...Object.keys(layouts)];

// 动态路由
const asyncRouter = (routerList: RouterRes[]): RouteRecordRaw[] => {
  if (!routerList || routerList.length === 0) return [];
  // 路由过滤
  const filterRouterList = routerList.filter((item) =>
    pages.find((path) => path === item.component),
  );
  return filterRouterList.map((r: RouterRes) => ({
    path: r.path,
    name: r.name,
    component: import(/* @vite-ignore */ r.component),
    children: asyncRouter(r.children),
    meta: JSON.parse(JSON.stringify(r.meta)),
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
      const { data }: any = await getUserInfoApi();
      userInfoStore.setUserInfo(data.role, data.routerList);
      const systemStore = useSystemStore();
      const systemStoreWithOut = useSystemStoreWithOut();
      const routerRes = await userInfoStore.getUserInfo();
      const routerList = asyncRouter(routerRes) as RouteRecordRaw[];
      systemStoreWithOut.setRouterList(routerList);
      routerList.forEach((item: RouteRecordRaw) => {
        // 注册动态路由
        const routerFn = router.addRoute("/", item);
        systemStore.addRemoveRouterList(routerFn);
      });
      return next(to.fullPath);
    }
  } catch (err) {
    throw new Error("路由错误" + err);
  } finally {
    next();
  }
});
