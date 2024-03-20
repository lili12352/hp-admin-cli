const props = defineProps({
  iconName: {
    type: String,
    default: "",
    required: true,
  },
  styleIcon: {
    type: Object,
    default: () => ({
      width: "12px",
      height: "12px",
      fontSize: "12px",
    }),
  },
});
//#end;
return {};
