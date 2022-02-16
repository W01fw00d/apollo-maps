const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/env", "@babel/react"],
            },
          },
        ],
      },
      {
        test: /\.(woff2?|jpe?g|png|gif|ico)$/,
        use: "file-loader?name=./assets/images/[name].[ext]",
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".ts", ".jsx", ".tsx"] },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(process.cwd(), "dist/"),
    publicPath: "/dist/",
  },
};
