"use strict";
// 生產環境旗標
const isProduction = ["production"].includes(process.env.NODE_ENV);
module.exports = {
  // 打包輸出的目錄名稱
  outputDir: "dist",
  // 是否開啟 ESlint 檢測
  lintOnSave: !isProduction,
  // 全局 scss
  css: {
    // 是否將 components 中的 css 提取至獨立的 CSS 文件
    // (非動態注入到 JavaScript inline 代碼中)
    extract: isProduction,
    // 是否產出 CSS Source Map
    sourceMap: false,
    requireModuleExtension: true,
    loaderOptions: {
      // 全局引入
      scss: {
        prependData: `@import "~@/styles/index.scss";`,
      },
    },
  },
};
