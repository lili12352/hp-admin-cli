export const getJavaScriptFileSuffix = (suffix) => {
  if (suffix === "TypeScript") {
    return "ts";
  } else {
    return "js";
  }
};

export const isTs = (text, variant) => {
  if (variant === "TypeScript") {
    return text;
  } else {
    return "";
  }
};

export const vueTemplate = (answers, script, html, style) => {
  return `${scriptTemplate(script(answers), answers.variant)}
${htmlTemplate(html(answers))}
${styleTemplate(style(answers), answers.css)}
`;
};

export const isI18n = (type, text) => {
  if (type) {
    return `{{$t()}}`;
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
  return `<style lang="${css}" scoped>
${cTemplate}
</style>`;
};
