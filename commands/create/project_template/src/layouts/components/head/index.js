const createHead = (params) => {
    const { answers } = params;
    return `<template>
  <div class="head">head</div>
</template>
<style scoped>
.head {
  width: 100%;
  height: 100%;
  background-color: aqua;
}
</style>
`;
};
const createFileName = (variant) => {
    return `index.vue`;
};
export default {
    createFileName: createFileName,
    createTemplate: createHead,
};
