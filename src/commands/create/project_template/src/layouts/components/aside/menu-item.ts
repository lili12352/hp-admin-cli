import SvgIcon from "@/components/svgIcon/index.vue";
//#slot:ui_1
const props = defineProps(["menuItem"]);
const styleIcon = {
  width: "18px",
  height: "18px",
};
//#end;
() => {
  console.log(styleIcon, props, SvgIcon);
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
  },
  hook: {},
};
