// 获取css全局变量
export const getCssValue = (cssValueName: string): string => {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(
      cssValueName,
    );
  } catch {
    return "";
  }
};
// 设置css全局变量
export const setCssValue = (cssName: string, cssValue: string) => {
  try {
    document.documentElement.style.setProperty(cssName, cssValue);
  } catch (error) {
    console.error(error);
  }
};
// 切换主题
export const switchThemeColor = (themeName: string) => {
  window.document.documentElement.setAttribute("data-theme", themeName);
};
