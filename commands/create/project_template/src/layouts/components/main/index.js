const createMain = (params) => {
    const { answers } = params;
    return `<template>
  <div class="main">main</div>
</template>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: bisque;
}
</style>
`;
};
const createFileName = (variant) => {
    return `index.vue`;
};
export default {
    createFileName: createFileName,
    createTemplate: createMain,
};
