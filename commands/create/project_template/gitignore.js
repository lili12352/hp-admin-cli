export const gitignore = (params) => {
    return `# Logs
 logs
 *.log
 npm-debug.log*
 yarn-debug.log*
 yarn-error.log*
 pnpm-debug.log*
 lerna-debug.log*
 
 node_modules
 dist
 dist-ssr
 *.local
 
 # Editor directories and files
 .vscode/*
 !.vscode/extensions.json
 .idea
 .DS_Store
 *.suo
 *.ntvs*
 *.njsproj
 *.sln
 *.sw?
 `;
};
const createFileName = () => {
    return ".gitignore";
};
export default {
    createFileName: createFileName,
    createTemplate: gitignore,
};
