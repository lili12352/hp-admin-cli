import chalk from "chalk";
const action = () => {
    console.log(chalk.blue("你可以通过以下方式联系我"));
    console.log(chalk.blue("email:"), chalk.bold("359664577@qq.com"));
};
export default {
    command: "contact",
    description: "获取作者的联系方式",
    action: action,
};
