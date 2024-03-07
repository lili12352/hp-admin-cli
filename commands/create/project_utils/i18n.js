export const i18nList = [
  {
    key: "project",
    children: [
      {
        key: "login",
        children: [
          {
            key: "login",
            value: "登录",
            en: "login",
            cn: "登录",
          },
          {
            key: "PleaseEnterYourAccountNumber",
            value: "请输入账号",
            en: "Please enter your account number",
            cn: "请输入账号",
          },
        ],
      },
    ],
  },
];

const tabSpacing = (tab) => {
  let str = ``;
  for (let i = 0; i < tab; i++) {
    str += `  `;
  }
  return str;
};

const findKey = (key) => {
  let findPath = "";
  const find = (key, array, path) => {
    for (let i = 0; i < array.length; i++) {
      if (key === array[i].value) {
        findPath = `${path}.${array[i].key}`;
        return;
      } else {
        if (array[i].children) {
          find(
            key,
            array[i].children,
            `${path ? path + "." : ""}${array[i].key}`
          );
        }
      }
    }
  };
  find(key, i18nList, "");
  return findPath;
};

export const isI18n = (text, flag, type) => {
  if (!flag) return text;
  if (type === "html") {
    return `{{$t("${findKey(text)}")}}`;
  } else {
    return $t("${findKey(text)}");
  }
};

const getChildren = (lang, children, tab) => {
  let str = "";
  children.forEach((item, i) => {
    if (item.children && item.children.length > 0) {
      str += `
${tabSpacing(tab)}${item.key}:{
${tabSpacing(tab)}${getChildren(lang, item.children, tab + 1)}
${tabSpacing(tab)}},`;
    } else {
      if (i === 0) {
        str += `${tabSpacing(1)}${item.key}:"${item[lang]}",
      `;
      } else if (i < children.length - 1) {
        str += `${item.key}:"${item[lang]}",
      `;
      } else {
        str += `${item.key}:"${item[lang]}"`;
      }
    }
  });
  return str;
};

export const i18nFileData = (lang) => {
  return getChildren(lang, i18nList, 1);
};
