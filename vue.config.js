const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  publicPath: "./",
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      echarts: 'echarts'
    }
  }

})
