//#slot:ui_1

//#end;

return {
  slot: {
    ui_1: {
      element: function ui_1() {
        return `import { useAttrs, onUpdated } from "vue";
        const props = defineProps(["dataSource", "colums"]);
        let attrs = useAttrs();
        
        onUpdated(() => {
          attrs = useAttrs();
        });`;
      },
      antdv: function ui_1() {
        return ` const props = defineProps(["dataSource", "colums"]);`;
      },
    },
  },
  hook: {},
};
