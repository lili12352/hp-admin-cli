import { useRouter } from "vue-router";
import { useSystemStore } from "@/store/modules/system";
//#slot:ui_1
const systemStore = useSystemStore();
const router = useRouter();
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const addTabBar = (path: string) => {
  const routerList = router.getRoutes();
  const tab = routerList.find((item: any) => item.path === path);
  if (!tab) return;
  systemStore.addTabBar({
    path: tab.path,
    name: tab.meta.title,
  });
};
//#slot:ui_2
const defaultActive = ref(router.currentRoute.value.fullPath);

//#end;
() => {
  console.log(select, defaultActive, props);
};
return {
  slot: {
    ui_1: {
      element: function ui_1() {
        return `import { ref, watch } from "vue";
        import { getCssValue } from "@/utils/index";`;
      },
      antdv: function ui_1() {
        return `import { ref } from "vue";`;
      },
    },
    ui_2: {
      element: function ui_1() {
        return `const select = (v: string) => {
          router.push(v);
          addTabBar(v);
        };
        const textColor = ref("");
        const backgroundColor = ref("");
        watch(
          () => systemStore.themeValue,
          () => {
            textColor.value = getCssValue("--them-menu-font-color");
            backgroundColor.value = getCssValue("--them-menu-bg-color");
          },
          { immediate: true },
        );
        `;
      },
      antdv: function ui_1() {
        return `const openKeys = ref<string[]>([]);
        const getOpenKeys = (path: string) => {
          if (systemStore.isCollapse) return;
          const key = path.split("").reverse().join("");
          const index = key.indexOf("/") + 1;
          const keyPath = path.slice(0, key.length - index);
          const array: string[] = [];
          if (!keyPath) {
            openKeys.value = ["/"];
            return;
          }
          keyPath
            .split("/")
            .filter((item) => item)
            .map((item) => "/" + item)
            .reduce((a, b) => {
              if (array.length === 0) {
                array.push(a);
              }
              array.push(a + b);
              return a + b;
            });
          openKeys.value = array;
        };
        getOpenKeys(router.currentRoute.value.fullPath);
        
        const select = (v: any) => {
          defaultActive.value = v.key;
          getOpenKeys(v.key);
          router.push(v.key);
          addTabBar(v.key);
        };`;
      },
    },
  },
  hook: {},
};
