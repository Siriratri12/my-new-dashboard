// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: [
//     'vuetify'
//   ]
// })

module.exports = {
  devServer: {
    client: {
      webSocketURL: "ws://localhost:8080/ws",
    },
    allowedHosts: "all",
  },
};
