import inquirer from "inquirer";
import fs from "fs-extra";
import chalk from "chalk";
import { join, dirname, basename, extname } from "path";
import { createFolder } from "../../utils/index.js";
import { questionsList } from "./utils/index.js";
import { ConvertVue } from "./utils/convertVue.js";
import { createViteConfig } from "./utils/viteConfig.js";
import { createPackage } from "./utils/packageConfig.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const userQuestions = (projectName: string) => {
  inquirer
    .prompt(questionsList)
    .then((answers: any) => {
      const { checkbox } = answers;
      const checkboxList = ["eslint", "i18n"];
      const checkboxObj = {};
      checkboxList.forEach((key) => {
        checkboxObj[key] = checkbox.includes(key);
      });
      createTemplates({ ...answers, ...checkboxObj, projectName });
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

const createTemplates = async (answers: any) => {
  const { variant, projectName } = answers;
  const templatePath =
    variant === "TypeScript" ? "project_template_ts" : "project_template";
  // 从模板复制项目
  projectCopy(templatePath, projectName, answers);
};

const projectCopy = async (
  templatePath: string,
  projectName: string,
  answers
) => {
  const { variant, eslint } = answers;
  const files = await fs.readdir(join(__dirname, templatePath), {
    withFileTypes: true,
  });
  const manualOperation = [
    "src",
    "package.json",
    ".prettierrc",
    ".eslintrc_js.cjs",
    ".eslintrc_ts.cjs",
    "tsconfig.json",
    "tsconfig.node.json",
    "env.d.ts",
  ];

  const model = {
    eslint: [".prettierrc"],
    ts: ["tsconfig.json", "tsconfig.node.json", "env.d.ts"],
  };

  files.forEach((item: any) => {
    const path = join(item.path, item.name);
    const targetPath = join(
      process.cwd(),
      projectName,
      path.split(templatePath)[1]
    );
    const fileName = item.name;
    // 处理src下文件
    if (fileName === "src") {
      fs.ensureDirSync(join(process.cwd(), projectName, "src"));
      readFileList(join(__dirname, templatePath, "src"), answers).then(
        (fileList: string[]) => {}
      );
    }
    // ts
    if (variant === "TypeScript" && model.ts.includes(fileName)) {
      fs.copy(path, targetPath, (err) => {
        if (err) throw err;
      });
    }
    // eslint
    if (eslint) {
      if (fileName === ".prettierrc") {
        fs.copy(path, targetPath, (err) => {
          if (err) throw err;
        });
      }
      if (variant === "TypeScript" && fileName === ".eslintrc_ts.cjs") {
        fs.copy(
          path,
          targetPath.replace(".eslintrc_ts", ".eslintrc"),
          (err) => {
            if (err) throw err;
          }
        );
      }
      if (variant !== "TypeScript" && fileName === ".eslintrc_js.cjs") {
        fs.copy(
          path,
          targetPath.replace(".eslintrc_js", ".eslintrc"),
          (err) => {
            if (err) throw err;
          }
        );
      }
    }

    // 其他文件自动复制
    if (manualOperation.includes(item.name)) return;
    fs.copy(path, targetPath, (err) => {
      if (err) throw err;
    });
  });
  // 追加写入viteConfig文件
  const viteConfigData = createViteConfig(answers);
  fs.outputFileSync(
    join(
      process.cwd(),
      projectName,
      `vite.config.${variant === "TypeScript" ? "ts" : "js"}`
    ),
    viteConfigData
  );
  // 追加写入package文件
  const createPackageData = createPackage(answers);
  fs.outputFileSync(
    join(process.cwd(), projectName, "package.json"),
    createPackageData
  );
};

const readFileList = async (path, answers) => {
  const { projectName, variant } = answers;
  const templatePath =
    variant === "TypeScript" ? "project_template_ts" : "project_template";
  const files = await fs.readdir(path, { withFileTypes: true });
  const fileList = [];
  // 将当前目录下文件写入
  fileWrite(path, files, projectName, templatePath, answers);
  // 获取目录
  for (const dirent of files) {
    const filedir = join(path, dirent.name);
    const targetPath = join(
      process.cwd(),
      projectName,
      filedir.split(templatePath)[1]
    );
    if (dirent.isFile()) {
      // 处理文件
      fileList.push(filedir);
    } else if (dirent.isDirectory()) {
      fs.ensureDirSync(targetPath);
      // 递归读取子目录中的文件
      const subDirFiles = await readFileList(filedir, answers);
      fileList.push(...subDirFiles);
    }
  }
  // 当所有文件都被读取后，返回文件列表
  return fileList;
};

const fileWrite = (path, files, projectName, templatePath, answers) => {
  const fileList = files.filter((dirent) => dirent.isFile());
  const vueFileNameList = fileList
    .filter((dirent) => extname(dirent.name) === ".vue")
    .map((item) => item.name.replace(extname(item.name), ""));

  fileList.forEach(() => {});
  if (vueFileNameList.length === 0) {
    // 目录下没有vue文件
    fileList.forEach((dirent) => {
      const filedir = join(path, dirent.name);
      const targetPath = join(
        process.cwd(),
        projectName,
        filedir.split(templatePath)[1]
      );
      fs.copyFile(filedir, targetPath);
    });
  } else {
    fileList.forEach(async (item) => {
      const filedir = join(path, item.name);
      const targetPath = join(
        process.cwd(),
        projectName,
        filedir.split(templatePath)[1]
      );
      const fileName = item.name.replace(extname(item.name), "");
      if (vueFileNameList.includes(fileName)) {
        // vue文件写入
        if (extname(item.name) === ".vue") {
          const convertVue = new ConvertVue({
            path,
            fileName,
            answers,
            model: ["hook_1"],
          });
          const vueFile = await convertVue.init();
          fs.outputFileSync(targetPath, vueFile);
        }
      } else {
        // 其他文件复制
        fs.copyFile(filedir, targetPath);
      }
    });
  }
};

const action = (projectName: string) => {
  const cwdUrl = process.cwd();
  createFolder(join(cwdUrl, projectName))
    .then(() => {
      userQuestions(projectName);
    })
    .catch(() => {
      console.log(
        chalk.red(`项目名可能已存在，请更换项目名或者删除文件夹${projectName}`)
      );
    });
};
export default {
  command: "create <registry-name> ",
  description: "create a new project",
  action: action,
};
