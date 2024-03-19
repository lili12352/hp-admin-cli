import SvgIcon from "@/components/svgIcon/index.vue";
import { useSystemStore } from "@/store/modules/system";
const systemStore = useSystemStore();
const iconName = "Expand";
const styleIcon = {
  width: "16px",
  height: "16px",
};
const clickIcon = () => {
  systemStore.switchCollapse();
};
//#end;
() => {
  console.log(SvgIcon, iconName, styleIcon, clickIcon);
};
return {
  slot: {},
  hook: {},
};
