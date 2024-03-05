import { getJavaScriptFileSuffix } from "../../../utils/index.js";
const createLayouts = (params) => {
    const { answers } = params;
    return `<script setup lang="${getJavaScriptFileSuffix(answers.variant)}">
  import leftModel from './leftModel.vue';
  </script>

  <template>
    <div>
      <leftModel></leftModel>
    </div>
  </template>
  
  <style scoped></style>
   `;
};
const createFileName = (variant) => {
    return `index.vue`;
};
export default {
    createFileName: createFileName,
    createTemplate: createLayouts,
};
