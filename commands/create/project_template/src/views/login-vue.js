import { vueTemplate } from "../../../project_utils/index.js";

const script = () => {
  return `import { useUserInfoStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
const userInfoStore = useUserInfoStore();
const router = useRouter();
const login = async () => {
  await userInfoStore.login();
  router.push("/");
};`;
};
const html = (answers) => {
  return `<div @click="login">login</div>`;
};

const css = () => {
  return ``;
};
const createMain = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (variant) => {
  return `login.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createMain,
};
