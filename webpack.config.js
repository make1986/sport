var path = require("path");
var webpack = require("webpack");
var nodeExternals = require("webpack-node-externals");

var clientConfig = {
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      { test: /\.(js)$/, use: "babel-loader" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ]
};

var adminConfig = {
  entry: "./src/admin/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "adminbundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ]
};

var serverConfig = {
  entry: "./src/server/index.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: "server.js",
    publicPath: "/"
  },
  module: {
    rules: [{ test: /\.(js)$/, use: "babel-loader" }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
};

module.exports = [clientConfig, serverConfig, adminConfig];
