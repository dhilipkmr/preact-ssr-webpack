
const path = require("path");

module.exports = {
  entry: {
    app: "./client/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          plugins: ['transform-class-properties', "transform-es2015-arrow-functions"]
        }
      }
    ]
  },
  resolve: {
    alias: {
      react: 'preact/compat',
    }
  }
};