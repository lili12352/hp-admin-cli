export const questionsList = [
  {
    type: "input",
    name: "version",
    message: "please enter the project version",
    default: "0.0.0",
    validate: (value) => {
      const str = value.split(".");
      if (str.length !== 3)
        return "input format(0.0.0)";
      const flag = str.every((currentValue) => Number(currentValue) >= 0);
      if (!flag)
        return "please number";
      return flag;
    },
  },
  {
    type: "list",
    name: "variant", // key 名
    message: "Select a variant",
    choices: [
      {
        name: "TypeScript",
        value: "TypeScript",
      },
      {
        name: "javaScript",
        value: "javaScript",
      },
    ],
  },
  {
    type: "list",
    name: "ui", // key 名
    message: "Select a UI",
    choices: [
      {
        name: "element-plus",
        value: "element",
      },
      {
        name: "Ant Design Vue",
        value: "antdv",
      },
    ],
  },
  {
    type: "list",
    name: "css",
    message: "Select a css",
    choices: [
      {
        name: "scss",
        value: "scss",
      },
      {
        name: "less",
        value: "less",
      },
    ],
  },
];