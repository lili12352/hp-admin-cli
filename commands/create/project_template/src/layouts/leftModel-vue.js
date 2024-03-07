// import { getJavaScriptFileSuffix } from "../../../utils/index.js";
import { vueTemplate } from "../../../project_utils/index.js";

const script = () => {
  return `import headLay from "./components/head/index.vue"
import asideLay from "./components/aside/index.vue"
import mainLay from "./components/main/index.vue"`;
};
const html = () => {
  return `<div class="left-model">
    <div class="aside">
      <asideLay />
    </div>
    <div class="conter">
      <div class="head-lay">
        <headLay />
      </div>
      <div class="main">
        <mainLay />
      </div>
    </div>
  </div>`;
};

const css = () => {
  return `.left-model {
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
.main {
  flex: 1;
}`;
};

const createLeftModel = (params) => {
  return vueTemplate(params.answers, script, html, css);
};
const createFileName = (variant) => {
  return `leftModel.vue`;
};
export default {
  createFileName: createFileName,
  createTemplate: createLeftModel,
};
