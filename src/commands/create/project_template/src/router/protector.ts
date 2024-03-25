import router from "./index";
import { useUserInfoStoreWithOut } from "@/store/modules/user";
import { useSystemStore } from "@/store/modules/system";
import { useSystemStoreWithOut } from "@/store/modules/system";
import isWhiteListPage from "@/config/white-list";
import { type RouteRecordRaw } from "vue-router";
import { getUserInfoApi } from "@/api/user";

// 动态路由
const asyncRouter = (routerList: RouterRes[]): RouteRecordRaw[] => {
  if (!routerList || routerList.length === 0) return [];
  return routerList.map((r: RouterRes) => ({
    path: r.path,
    name: r.name,
    component: () => import(/* @vite-ignore */ r.component),
    children: asyncRouter(r.children),
  }));
};

router.beforeEach(async (to, _from, next) => {
  const userInfoStore = useUserInfoStoreWithOut();
  if (!userInfoStore.token) {
    // 判断是否在免登录的白名单内
    if (!isWhiteListPage(to.fullPath)) {
      console.log("没登录");

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
      console.log("获取信息", data);
      const systemStore = useSystemStore();
      const systemStoreWithOut = useSystemStoreWithOut();
      const routerRes = await userInfoStore.getUserInfo();
      systemStoreWithOut.setRouterList(routerRes);
      const routerList = asyncRouter(routerRes) as RouteRecordRaw[];
      routerList.forEach((item: RouteRecordRaw) => {
        // 注册动态路由
        const routerFn = router.addRoute("/", item);
        systemStore.addRemoveRouterList(routerFn);
      });
      return next(to.fullPath);
    }
    next();
  } catch {
    console.log("错误");

    next();
  }
});
