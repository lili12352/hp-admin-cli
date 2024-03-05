
const lang = (variant) => {
  let ts = "";
  if (variant === "TypeScript") {
    ts = `,
    "typescript": "^5.2.2",
    "vue-tsc": "^1.8.27"`;
  }
  return `"@vitejs/plugin-vue": "^5.0.4",
    "vite": "^5.1.4"${ts}`;
};

const ui = (type) => {
  let dependencies = ''
  let devDependencies = ''
  switch (type) {
    case "element":
      devDependencies = `,
      "unplugin-auto-import": "^0.17.5",
      "unplugin-vue-components": "^0.26.0"`
      dependencies = `"element-plus": "^2.6.0"`
      break
    case "antdv":
      dependencies = `"ant-design-vue": "^4.1.2"`
      break
    default:
      return
  }
  return {
    dependencies,
    devDependencies
  }
}

export const createPackage = (params) => {
  const { projectName, answers } = params;
  return `{
  "name": "${projectName}",
  "private": true,
  "version": "${answers.version}",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "path": "^0.12.7",
    "vue": "^3.4.19",
    "vue-router": "^4.3.0",
    ${ui(answers.ui).dependencies}
  },
  "devDependencies": {
    ${lang(answers.variant)}${ui(answers.ui).devDependencies} 
  }
}
`;
};
const createFileName = () => {
  return "package.json";
};
export default {
  createFileName: createFileName,
  createTemplate: createPackage,
};
