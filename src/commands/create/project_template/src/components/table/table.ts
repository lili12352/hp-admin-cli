//#slot:ui_1
interface Data {
  [key: string]: any;
}
interface Colum {
  title: string;
  dataIndex: string;
  key: string;
}

const props = defineProps<{
  dataSource: Data[];
  colums: Colum[];
}>();
//#end;

return {
  slot: {
    ui_1: {
      element: function ui_1() {
        return `import { useAttrs, onUpdated } from "vue";
        let attrs = useAttrs();
        onUpdated(() => {
          attrs = useAttrs();
        });`;
      },
      antdv: function ui_1() {
        return ` `;
      },
    },
  },
  hook: {},
};
