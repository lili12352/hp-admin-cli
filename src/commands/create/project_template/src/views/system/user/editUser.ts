import { ref } from "vue";
import userVModel from "@/hooks/userVModel";
import type { FormInstance } from "element-plus";
const emit = defineEmits(["update:form", "update:state"]);

interface Data {
  [key: string]: any;
}
const props = defineProps<{
  form: Data;
  state: {
    show: boolean;
    status: "edit" | "add";
  };
}>();

const form = userVModel(props, "form", emit);
const state = userVModel(props, "state", emit);

const loadingFlag = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  loadingFlag.value = true;
  if (!formEl) return (loadingFlag.value = false);
  formEl
    .validate()
    .then(async () => {
      ElMessage.error("演绎模式，无法操作");
    })
    .catch((fields) => {
      loadingFlag.value = false;
      console.log("error submit!", fields);
    });
};
const ruleFormRef = ref<FormInstance>();
