export const gitignore = (params) => {
    return `node_modules`;
};
const createFileName = () => {
    return ".gitignore";
};
export default {
    createFileName: createFileName,
    createTemplate: gitignore,
};
