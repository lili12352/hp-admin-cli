const createMainCss = (params) => {
  return ``;
};
const createFileName = (params) => {
  const { css } = params
  return `main.${css}`;
};
export default {
  createFileName: createFileName,
  createTemplate: createMainCss,
};
