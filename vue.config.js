module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "./src/styles/_variables.scss";
        `
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
