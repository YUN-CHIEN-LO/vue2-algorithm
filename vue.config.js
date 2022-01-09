"use strict";
// 生產環境旗標
const isProduction = ["production"].includes(process.env.NODE_ENV);
module.exports = {
  // 打包輸出的目錄名稱
  outputDir: "dist",
  // 是否開啟 ESlint 檢測
  lintOnSave: !isProduction,
  // 是否在打包時產出 Source Map
  productionSourceMap: !isProduction,
  devServer: {
    // 啟動後開啟瀏覽器
    open: true,
    // 設置主機地址
    host: process.env.VUE_APP_HOST,
    // 設置默認埠號
    port: process.env.VUE_APP_PORT,
    // 啟用 HTTPS 協定
    https: true,
    // 啟用 HTTP2 協定
    http2: true,
  },
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
