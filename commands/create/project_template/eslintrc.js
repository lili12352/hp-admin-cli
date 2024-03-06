import { getJavaScriptFileSuffix } from "../utils/index.js";
const createPrettierrc = (params) => {
  const { answers } = params;
  if (answers.variant === "TypeScript") {
    return "";
  } else {
    return `module.exports = {
      root: true,
      extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier',
      ],
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      overrides: [
        {
          env: {
            node: true,
          },
          files: ['.eslintrc.{js,cjs}'],
          parserOptions: {
            sourceType: 'script',
          },
        },
      ],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
      },
      plugins: ['vue', 'prettier'],
      rules: {
        'vue/no-v-html': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-explicit-emits': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always',
              normal: 'always',
              component: 'always',
            },
            svg: 'always',
            math: 'always',
          },
        ],
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        'no-alert': 0, //禁止使用alert confirm prompt
        'default-case': 'warn', // 要求switch语句中有default分支
        eqeqeq: 'warn', // 要求使用 === 和 !==
      },
    }
    `;
  }
};
const createFileName = (answers) => {
  const { variant } = answers;
  return `.eslintrc.c${getJavaScriptFileSuffix(variant)}`;
};
const noWriteFile = (answers) => {
  const { eslint } = answers;
  return !eslint;
};
export default {
  createFileName: createFileName,
  createTemplate: createPrettierrc,
  noWriteFile: noWriteFile,
};
