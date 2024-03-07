import { getJavaScriptFileSuffix } from "../project_utils/index.js";
const createHtml = (params) => {
  const { projectName, answers } = params;
  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${projectName}</title>
      </head>
      <body>
        <div id="app" class="dark"></div>
        <script type="module" src="/src/main.${getJavaScriptFileSuffix(
          answers.variant
        )}"></script>
      </body>
    </html>`;
};
const createFileName = () => {
  return "index.html";
};
export default {
  createFileName: createFileName,
  createTemplate: createHtml,
};
