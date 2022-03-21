const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");
const ip = require("internal-ip");
const portFinderSync = require("portfinder-sync");

const infoColor = (_message) => {
  return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`;
};

module.exports = merge(commonConfiguration, {
  mode: "development",
  devServer: {
    host: "local-ip",
    port: portFinderSync.getPort(8080),

    open: true,
    https: false,
    allowedHosts: "all",
    client: {
      overlay: true,
    },
    devMiddleware: {
      stats: "none",
    },
    hot: true,

    static: {
      publicPath: "../dist",
      watch: true,
    },

    onAfterSetupMiddleware: (devServer) => {
      const port = devServer.options.port;
      const https = devServer.options.https ? "s" : "";
      const localIp = ip.v4.sync();
      const domain1 = `http${https}://${localIp}:${port}`;
      const domain2 = `http${https}://localhost:${port}`;

      console.log(
        `Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(
          domain2
        )}`
      );
    },
  },
  infrastructureLogging: {
    level: "none",
  },
});