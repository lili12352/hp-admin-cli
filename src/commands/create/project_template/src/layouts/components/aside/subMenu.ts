import SvgIcon from "@/components/svgIcon/index.vue";
import { useSystemStore } from "@/store/modules/system";
const systemStore = useSystemStore();
import MenuItem from "./menu-item.vue";
const props = defineProps(["menu", "isCollapse"]);
const styleIcon = {
  width: "16px",
  height: "16px",
};
//#end;
() => {
  console.log(SvgIcon, systemStore, MenuItem, props, styleIcon);
};
return {
  slot: {},
  hook: {},
};
