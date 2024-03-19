import { watch, ref } from "vue";
import SvgIcon from "@/components/svgIcon/index.vue";
import { useSystemStore } from "@/store/modules/system";
import { useUserInfoStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
import type { RouteRecordNormalized } from "vue-router";
const systemStore = useSystemStore();
const userInfoStore = useUserInfoStore();
const router = useRouter();
const styleIcon = {
  width: "22px",
  height: "22px",
};

const clickGoGithub = () => {
  window.open("https://github.com/lili12352/hp-admin-cli");
};
const dropLogin = () => {
  userInfoStore.dropLogin();
  router.push("/login");
};
const clickIcon = () => {
  systemStore.switchCollapse();
};

const breadcrumbList = ref<RouteRecordNormalized[]>([]);
const routerList = router.getRoutes();
watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    const breadcrumb = newValue.split("/");
    let path = "";
    breadcrumbList.value = [];
    for (let i = 0; i < breadcrumb.length; i++) {
      if (!breadcrumb[i]) continue;
      path = path + "/" + breadcrumb[i];
      const routerObj = routerList.find((item) => item.path === path);
      if (!routerObj) continue;
      breadcrumbList.value.push(routerObj);
    }
  },
  { immediate: true },
);
//#end;
() => {
  console.log(SvgIcon, iconName, styleIcon, clickIcon);
};
return {
  slot: {},
  hook: {},
};
