export const getJavaScriptFileSuffix = (suffix) => {
  if (suffix === "TypeScript") {
    return "ts";
  } else {
    return "js";
  }
};

const scriptTemplate = (sTemplate, variant) => {
  return `<script setup lang="${getJavaScriptFileSuffix(variant)}">
${sTemplate}
</script>`;
};

const htmlTemplate = (hTemplate) => {
  return `
<template>
  ${hTemplate}
</template>`;
};

const styleTemplate = (cTemplate, css) => {
  return `<style lang=${css} scoped>
${cTemplate}
</style>`;
};

export const vueTemplate = (answers, script, html, style) => {
  return `${scriptTemplate(script(), answers.variant)}
${htmlTemplate(html())}
${styleTemplate(style(), answers.css)}
`;
};
