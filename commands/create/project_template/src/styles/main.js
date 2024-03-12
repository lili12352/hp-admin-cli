const createMainCss = (params) => {
  const { answers } = params;
  const identifier = answers.css === "scss" ? "$" : "@";
  return `${identifier}Dark-blue-gb-aside: #081947;
${identifier}Dark-blue-gb: #021633;
${identifier}Dark-blue-color: #ffffff;
.dark-blue {
  color: ${identifier}Dark-blue-color;
  .aside {
    color: #fff;
    height: 100%;
    background-color: ${identifier}Dark-blue-gb;
  }
  .head-lay {
    box-sizing: border-box;
    .header {
      width: 100%;
      height: 50px;
      color: ${identifier}Dark-blue-color;
      background-color: ${identifier}Dark-blue-gb;
      border-bottom: 1px solid ${identifier}Dark-blue-gb-aside !important;
    }
  }
  .main {
    width: 100%;
    height: 100%;
    color: ${identifier}Dark-blue-color;
    background-color: ${identifier}Dark-blue-gb;
  }
}

${identifier}Dark-gb-aside: #1a1a1a;
${identifier}Dark-gb: #000000;
${identifier}Dark-color: #ffffff;
.dark {
  color: ${identifier}Dark-color;
  .aside {
    color: #fff;
    height: 100%;
    background-color: ${identifier}Dark-gb-aside;
  }
  .head-lay {
    box-sizing: border-box;
    .header {
      width: 100%;
      height: 50px;
      color: ${identifier}Dark-color;
      background-color: ${identifier}Dark-gb;
      border-bottom: 2px solid ${identifier}Dark-gb-aside !important;
      box-sizing: border-box;
    }
  }

  .main {
    width: 100%;
    height: 100%;
    color: ${identifier}Dark-color;
    background-color: ${identifier}Dark-gb;
  }
}

${identifier}light-gb-aside: #1a1a1a;
${identifier}light-gb: #ffffff;
${identifier}light-color: #000000;
.light {
  color: ${identifier}light-color;
  .aside {
    color: #fff;
    height: 100%;
    background-color: ${identifier}light-gb-aside;
  }
  .head-lay {
    box-sizing: border-box;
    .header {
      width: 100%;
      height: 50px;
      color: ${identifier}light-color;
      background-color: ${identifier}light-gb;
      border-bottom: 2px solid #eee !important;
      box-sizing: border-box;
    }
  }

  .main {
    width: 100%;
    height: 100%;
    color: ${identifier}light-color;
    background-color: ${identifier}light-gb;
  }
}
`;
};
const createFileName = (params) => {
  const { css } = params;
  return "main." + css;
};
export default {
  createFileName: createFileName,
  createTemplate: createMainCss,
};
