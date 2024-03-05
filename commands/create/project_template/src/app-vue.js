import { getJavaScriptFileSuffix } from "../../utils/index.js";
const createApp = (params) => {
  const { answers } = params;
  return `<script setup lang="${getJavaScriptFileSuffix(answers.variant)}"></script>

  <template>
    <router-view />
  </template>
  
  <style scoped></style>
   `;
};
const createFileName = (params) => {
  return `App.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createApp,
};
