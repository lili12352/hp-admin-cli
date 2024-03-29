#! /usr/bin/env node
import { program } from "commander/esm.mjs";
import "./helpers/log.js";
import { getFileList } from "./utils/index.js";
import { version } from "./const/index.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const start = async () => {
  program.version(version); // 设置版本
  const fileList = await getFileList(join(__dirname, "commands"));
  const filePromise = [];
  fileList.forEach((fileName) => {
    filePromise.push(
      new Promise((res, rej) => {
        import(`./commands/${fileName}/index.js`).then((data) => {
          res(data);
        });
      }),
    );
  });
  Promise.all(filePromise).then((res) => {
    res.forEach((data) => {
      const { command, description, action } = data.default;
      program.command(command).description(description).action(action);
    });
    program.parse();
  });
};
start();
