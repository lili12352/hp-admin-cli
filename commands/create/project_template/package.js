const devDependencies = (variant) => {
    let ts = "";
    if (variant === "TypeScript") {
        ts = `,
    "typescript": "^5.2.2",
    "vue-tsc": "^1.8.27"`;
    }
    return `"@vitejs/plugin-vue": "^5.0.4",
    "vite": "^5.1.4"${ts}`;
};
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
    "vue-router": "^4.3.0"
  },
  "devDependencies": {
    ${devDependencies(answers.variant)}
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
