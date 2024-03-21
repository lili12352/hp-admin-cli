class Attribute {
  key: string;
  value: string;
  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }
}

export const mappingData = {
  sourceUILibrary: "elementUi",
  componentMappings: {
    "el-menu": {
      antdv: "a-menu",
    },
    "el-menu-item": {
      antdv: "a-menu-item",
    },
    "el-sub-menu": {
      antdv: "a-sub-menu",
    },
    "el-input": {
      antdv: "a-input",
    },
    "el-button": {
      antdv: "a-button",
    },
    "el-breadcrumb": {
      antdv: "a-breadcrumb",
    },
    "el-breadcrumb-item": {
      antdv: "a-breadcrumb-item",
    },
    "el-avatar": {
      antdv: "a-avatar",
    },
    "el-dropdown": {
      antdv: "a-dropdown",
    },
    "el-dropdown-menu": {
      antdv: "a-menu",
    },
    "el-dropdown-item": {
      antdv: "a-menu-item",
    },
    "el-tooltip": {
      antdv: "a-tooltip",
    },
  },
  attributeMappings: {
    "el-menu": {
      "collapse-transition": {
        antdv: (value) => new Attribute("", ""),
      },
      collapse: {
        antdv: (value) => new Attribute("inline-collapsed", ""),
      },
      "active-text-color": {
        antdv: (value) => new Attribute("", ""),
      },
      "default-active": {
        antdv: (value) =>
          new Attribute(
            "selectedKeys",
            `"[${value
              .replace(/\"/g, "")
              .replace(/\/n/g, "")}]" \n   :openKeys="openKeys" \n`,
          ),
      },
      "text-color": {
        antdv: (value) => new Attribute("", ""),
      },
      "background-color": {
        antdv: (value) => new Attribute("", ""),
      },
      class: {
        antdv: (value) => new Attribute("", ""),
      },
      "show-timeout": {
        antdv: (value) => new Attribute("", ""),
      },
      "hide-timeout": {
        antdv: (value) => new Attribute("", ""),
      },
      select: {
        antdv: (value) => new Attribute("select", ""),
      },
      supplement: {
        antdv: {
          mode: "inline",
          theme: "dark",
        },
      },
    },
    "el-menu-item": {},
    "el-tooltip": {
      content: {
        antdv: (value) => new Attribute("", ""),
      },
    },
  },
};
