const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    proxy: 'http://localhost:5000',
    open: true,
    host: 'localhost',
    port: 8080
  }
})
