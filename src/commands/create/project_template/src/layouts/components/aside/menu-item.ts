import SvgIcon from "@/components/svgIcon/index.vue";
import { useSystemStore } from "@/store/modules/system";
const systemStore = useSystemStore();
const props = defineProps(["menuItem"]);
const styleIcon = {
  width: "18px",
  height: "18px",
};
//#end;
() => {
  console.log(styleIcon, props, SvgIcon, systemStore);
};
return {
  slot: {},
  hook: {},
};
