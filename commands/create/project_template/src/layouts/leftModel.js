import { getJavaScriptFileSuffix } from "../../../utils/index.js";
const createLeftModel = (params) => {
    const { answers } = params;
    return `<template>
  <div class="left-model">
    <div class="aside">
      <asideLay></asideLay>
    </div>
    <div class="conter">
      <div class="head">
        <headLay></headLay>
      </div>
      <div class="main">
        <mainLay></mainLay>
      </div>
    </div>
  </div>
</template>
<script lang="${getJavaScriptFileSuffix(answers.variant)}" setup>
import headLay from "./components/head/index.vue"
import asideLay from "./components/aside/index.vue"
import mainLay from "./components/main/index.vue"
</script>

<style scoped>
.left-model {
  display: flex;
  width: 100vw;
  height: 100vh;
}
.aside {
  height: 100vh;
}
.conter {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.head {
  height: 50px;
}
.main {
  flex: 1;
}
</style>
`;
};
const createFileName = (variant) => {
    return `leftModel.vue`;
};
export default {
    createFileName: createFileName,
    createTemplate: createLeftModel,
};
