import inquirer from "inquirer";
import fs from "fs-extra";
import chalk from "chalk";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createFolder } from "../../utils/index.js";
import { questionsList } from "./utils/questionList.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// type： input, number, confirm, list, checkbox ...

const userQuestions = (projectName) => {
    inquirer
        .prompt(questionsList)
        .then((answers) => {
            createTemplates(projectName, answers);
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            }
            else {
                // Something else went wrong
            }
        });
};
const projectWriteFile = (importFilePath, projectName, answers) => {
    const { } = answers;
    const cwdUrl = process.cwd();
    import(importFilePath).then((data) => {
        const { createFileName, createTemplate } = data.default;
        const path = join(cwdUrl, projectName);
        const writeFile = () => {
            fs.writeFile(join(cwdUrl, projectName, createFileName(answers.variant)), createTemplate({
                projectName,
                answers,
            }), "utf-8", (err) => {
                if (err) {
                    console.log("文件写入错误", err);
                }
            });
        };
        createFolder(path)
            .then(() => {
                writeFile();
            })
            .catch(() => {
                writeFile();
            });
    });
};
const readFile = (destUrl, importFilePath, projectName, answers) => {
    fs.readdir(destUrl, (err, files) => {
        if (err)
            throw err;
        files.forEach((file) => {
            var filedir = join(destUrl, file);
            fs.stat(filedir, function (eror, stats) {
                if (eror) {
                    console.warn("获取文件stats失败");
                }
                else {
                    var isFile = stats.isFile(); //是文件
                    var isDir = stats.isDirectory(); //是文件夹
                    if (isFile) {
                        projectWriteFile(`${importFilePath}/${file}`, `${projectName}`, answers);
                    }
                    if (isDir) {
                        const cwdUrl = process.cwd();
                        const path = join(cwdUrl, projectName);
                        // 文件夹如果不存在则创建
                        createFolder(path)
                            .then(() => {
                                //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                                readFile(join(destUrl, file), `${importFilePath}/${file}`, `${projectName}/${file}`, answers);
                            })
                            .catch(() => {
                                readFile(join(destUrl, file), `${importFilePath}/${file}`, `${projectName}/${file}`, answers);
                            });
                    }
                }
            });
        });
    });
};
const createTemplates = (projectName, answers) => {
    const destUrl = join(__dirname, "project_template");
    readFile(destUrl, `./project_template`, projectName, answers);
};
const action = (projectName) => {
    const cwdUrl = process.cwd();
    createFolder(join(cwdUrl, projectName))
        .then(() => {
            userQuestions(projectName);
        })
        .catch(() => {
            console.log(chalk.red(`项目名可能已存在，请更换项目名或者删除文件夹${projectName}`));
        });
};
export default {
    command: "create <registry-name> ",
    description: "create a new project",
    action: action,
};
