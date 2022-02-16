const { merge } = require("webpack-merge");
const common = require("./webpack.common.ts");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    compress: true,
    hot: "only",
    port: 3000,
    static: process.cwd(),
  },
});
