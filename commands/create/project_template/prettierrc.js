const createPrettierrc = (params) => {
  const { answers } = params;
  if (answers.variant === "TypeScript") {
    return "";
  } else {
    return `{
  "semi": false,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}`;
  }
};
const createFileName = (answers) => {
  return `.prettierrc`;
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
