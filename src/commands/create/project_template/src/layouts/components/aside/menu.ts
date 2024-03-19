import { ref } from "vue";
import { useRouter } from "vue-router";
//#slot:ui_1
const router = useRouter();
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
    required: true,
  },
});
//#slot:ui_2
const defaultActive = ref(router.currentRoute.value.fullPath);
const select = (v: string) => {
  router.push(v);
};
//#end;
() => {
  console.log(select, defaultActive, props);
};
return {
  slot: {
    ui_1: {
      element: function ui_1() {
        return ``;
      },
      antdv: function ui_1() {
        return `import { useSystemStore } from "@/store/modules/system";
        const systemStore = useSystemStore();`;
      },
    },
    ui_2: {
      element: function ui_1() {
        return `const select = (v: string) => {
          router.push(v);
        };`;
      },
      antdv: function ui_1() {
        return `const openKeys = ref<string[]>([]);
        const getOpenKeys = (path: string) => {
          if (systemStore.isCollapse) return;
          const key = path.split("").reverse().join("");
          const index = key.indexOf("/") + 1;
          openKeys.value = [path.slice(0, key.length - index)];
        };
        getOpenKeys(router.currentRoute.value.fullPath);
        
        const select = (v: any) => {
          defaultActive.value = v.key;
          getOpenKeys(v.key);
          router.push(v.key);
        };`;
      },
    },
  },
  hook: {},
};
