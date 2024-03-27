import fs from "fs-extra";
import { log } from "handlebars";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { mappingData } from "./uiReflection.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class ConvertVue {
  private readonly path: string;
  private readonly fileName: string;
  private readonly answers: any;
  private readonly model: string[];
  constructor(params) {
    const { path, fileName, answers, model } = params;
    this.path = path;
    this.fileName = fileName;
    this.answers = answers;
    this.model = model;
  }
  async init() {
    /**
     * //#end; 识别
     * #slot:ui_1 =》 slot插槽类型 ui_1插槽点
     * #hook:hook_1  =》 hook模块类型 hook_1模块点
     */
    const js = await this.readJsFile();

    /**
     * //#end; 识别
     * #scss_1 =》 类别 根据ui库插入
     */
    const css = await this.readScssFile();
    const html = await this.readHtmlFile();

    return js.replace(`"use strict";`, "") + html + css;
  }
  private async readJsFile() {
    const { variant, ui } = this.answers;
    const fileName =
      variant === "TypeScript" ? this.fileName + ".ts" : this.fileName + ".js";
    const { oldF, fn } = await this._readTemplate(fileName, this.path);
    let jsFile = oldF;
    const { slot, hook } = new Function(fn)() || {};
    // ui
    if (slot) {
      for (const [key, value] of Object.entries(slot)) {
        jsFile = jsFile.replace(
          `//#slot:${key}`,
          this.extractFunctionBody(value[ui]),
        );
      }
    }
    // 模块
    if (hook) {
      for (const [key, hookValue] of Object.entries(hook)) {
        for (const [paramsKey, value] of Object.entries(this.answers)) {
          if (paramsKey === key) {
            if (value) {
              try {
                console.log(`//#hook:${key}`);

                jsFile = jsFile.replace(`//#hook:${key}`, hookValue[ui]());
              } catch {
                console.log("异常");
              }
            }
          }
        }
        this.model.forEach((modelName: string) => {});
      }
    }
    if (!jsFile) return "";
    return `<script lang="${variant === "TypeScript" ? "ts" : "js"}" setup>
  ${jsFile}
</script>
`;
  }
  private async readScssFile() {
    const { ui, css } = this.answers;
    const { oldF, fn } = await this._readTemplate(
      this.fileName + ".scss",
      this.path,
    );
    let scssFile = oldF;
    const fnObj = new Function(fn)() || {};
    for (const [key, value] of Object.entries(fnObj)) {
      if (value[ui]) {
        scssFile = oldF.replace(`//#${key}`, value[ui]());
      }
    }
    const cssSymbol = css === "scss" ? "$" : "@";
    if (!scssFile) return "";
    return `<style lang="${css}" scoped>
  ${scssFile.replace(/\$/g, cssSymbol)}
  </style>`;
  }
  private async readHtmlFile() {
    // 加载组件映射
    // 根据映射进行转换
    /**注意
     * 1.z组件和属性兼容性，如果目标ui库没有这个属性时应该怎么做
     *      例如ant-design-vue和element 的menu组件，展开所选中菜单时
     *          ant需要绑定openKeys和selectedKeys 而element 只需要default-active就可以
     *
     */
    const { oldF, fn } = await this._readTemplate(
      this.fileName + ".vue",
      this.path,
    );
    let html = oldF;

    html = conditionalCompilation(fn, oldF, this.answers);

    return this.readHtml(html, mappingData);
  }

  private async _readTemplate(fileName: string, path: string) {
    try {
      const jsFilePath = join(path, fileName);
      const data = fs.readFileSync(jsFilePath, "utf-8");
      const endIndex = data.indexOf("//#end;");
      const end = "//#end;"; // 结束标签
      let oldF = data.slice(0, endIndex);
      let runF = "";
      if (endIndex === -1) {
        runF = "";
      } else {
        runF = data.slice(endIndex + end.length, data.length);
      }
      return {
        oldF,
        fn: runF,
      };
    } catch {
      return {
        oldF: "",
        fn: "",
      };
    }
  }
  private extractFunctionBody(func: Function | undefined) {
    if (typeof func !== "function" || !func) {
      return "";
    }
    let functionSource = func.toString();
    let functionBody = functionSource
      .replace(/^function\s.*?\s*\(/, "")
      .replace(/\)\s*{/, "{")
      .replace(/}\s*$/, "}");

    if (functionBody) {
      const fn = functionBody
        .trim()
        .slice(1, functionBody.length - 1)
        .split(";")
        .map((item) => item.trim())
        .join(";\n");
      return new Function(fn)() || "";
    } else {
      throw new Error("Unable to extract function body");
    }
  }
  private readHtml(str: string, mappingData: any) {
    const { variant, ui } = this.answers;
    if (ui !== "element") {
      return convertVue(str, mappingData, ui);
    } else {
      return str;
    }
  }
}

const conditionalCompilation = (fn: string, oldF: string, answers: any) => {
  const { ui } = answers;
  if (!fn) return oldF;
  let newF = oldF;
  let fnStr = fn;
  if (fn.includes("<script>")) {
    fnStr = fnStr.replace("<script>", "").replace("</script>", "");
  }
  try {
    const conditional = new Function(fnStr)();
    // 功能
    if (conditional && conditional.hook) {
      console.log("功能");
    }
    // ui不同
    if (conditional && conditional.slot) {
      for (const [key, value] of Object.entries(conditional.slot)) {
        newF = newF.replace(`//#${key}`, conditional.slot[key][ui]());
      }
    }
  } catch (err) {
    console.log("html文件错误", newF);
  }
  return newF;
};

const convertVue = (str: string, mappingData: any, ui: string) => {
  const sourceTabSet = new Set();
  let html = str;
  let i = 0;
  for (i; i < str.length; i++) {
    if (str[i] !== "<") continue;
    for (let j = i; j < str.length; j++) {
      if (str[j] === ">") {
        let label = str.slice(i + 1, j + 1);
        let newLabel = label;
        const sourceTab = getTab(label);
        if (label.includes("el-" && sourceTab)) {
          const attributeList = getTabAttribute(label);
          if (attributeList.length > 0) {
            attributeList.forEach((item) => {
              const [source, attributeValue] = item.split("=");
              let sourceKey = source.replace(":", "").replace("@", "");
              if (sourceTab && mappingData.attributeMappings[sourceTab]) {
                const attributeMappings =
                  mappingData.attributeMappings[sourceTab]?.[
                    source.replace(":", "")
                  ]?.[ui];

                if (attributeMappings) {
                  const { key, value } = attributeMappings(attributeValue);
                  //对应ui库没有该属性
                  if (key === "") {
                    newLabel = newLabel.replace(item, "");
                  } else if (!value) {
                    newLabel = newLabel.replace(sourceKey, key);
                  } else if (value && key) {
                    newLabel = newLabel.replace(
                      `${sourceKey}=${attributeValue}`,
                      `${key}=${value}`,
                    );
                  }
                }
              }
            });
          }
          newLabel = addSupplement(newLabel, sourceTab, ui);
          sourceTabSet.add(sourceTab);
          const sourceLabel = mappingData.componentMappings[sourceTab];
          if (sourceLabel && sourceLabel[ui]) {
            newLabel = newLabel.replace(sourceTab, sourceLabel[ui]);
          }
        }
        html = html.replace(label, newLabel);
        i = j + 1;
      }
    }
  }
  return html;
};

const addSupplement = (
  newLabel: string,
  sourceTab: string,
  ui: string,
): string => {
  const supplement = mappingData.attributeMappings[sourceTab]?.supplement;
  let add = "";
  if (newLabel && !newLabel.includes("/") && supplement) {
    const attribute = supplement[ui];
    // 补充属性 supplement
    for (const [key, value] of Object.entries(attribute)) {
      add += `\n ${key}="${value}"`;
    }
  }
  return newLabel.replace(">", add + ">");
};

const getTab = (tab: string) => {
  const index = tab.indexOf("el-") as number;
  let endIndex = tab.slice(index, tab.length).indexOf(" ");
  if (endIndex === -1) {
    endIndex = tab.slice(index, tab.length).indexOf(">");
  }
  return tab.slice(index, index + endIndex).trim();
};
const getTabAttribute = (tab: string) => {
  const index = tab.indexOf("el-") as number;
  let endIndex = tab.slice(index, tab.length).indexOf(">");
  const attribute = tab
    .slice(index, index + endIndex)
    .trim()
    .split(" ");
  const attributeList = [];
  attribute.forEach((item) => {
    if (!item.includes("el-")) {
      if (item.includes("=")) {
        attributeList.push(item);
      } else {
        attributeList[attributeList.length - 1] += ` ${item}`;
      }
    }
  });
  return attributeList;
};
