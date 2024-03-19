import SvgIcon from "@/components/svgIcon/index.vue";
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
  slot: {},
  hook: {},
};
