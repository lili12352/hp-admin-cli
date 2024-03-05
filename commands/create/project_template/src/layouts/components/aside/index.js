const createAside = (params) => {
    const { answers } = params;
    return `<template>
  <div class="aside">aside</div>
</template>
<style scoped>
.aside {
  width: 100px;
  height: 100%;
  background-color: gold;
}
</style>
`;
};
const createFileName = (variant) => {
    return `index.vue`;
};
export default {
    createFileName: createFileName,
    createTemplate: createAside,
};
