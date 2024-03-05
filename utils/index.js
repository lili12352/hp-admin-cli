import fs from "fs-extra";
import spawn from "cross-spawn";
import chalk from "chalk";
export const getFileList = (filesPath) => {
    return new Promise((res, rej) => {
        fs.readdir(filesPath, (err, fileList) => {
            if (err)
                rej(err);
            res(fileList);
        });
    });
};
export const createFolder = (path) => {
    return new Promise((res, rej) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                fs.mkdir(path, (err) => {
                    if (err) {
                        rej(err);
                    }
                    else {
                        res([]);
                    }
                });
            }
            else {
                rej(files);
            }
        });
    });
};
export const installDependencies = () => {
    const dependencies = ["vue", "vuex", "vue-router"];
    const child = spawn("npm", ["install", "-D"].concat(dependencies), {
        stdio: "inherit",
    });
    child.on("close", function (code) {
        // 执行失败
        if (code !== 0) {
            console.log(chalk.red("Error occurred while installing dependencies!"));
            process.exit(1);
        }
        // 执行成功
        else {
            console.log(chalk.cyan("Install finished"));
        }
    });
};
