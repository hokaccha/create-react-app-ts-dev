const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  cache: true,
  devtool: "cheap-module-source-map",
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx", "css"]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({ filename: "bundle.css" })],
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 5000,
    overlay: {
      warnings: false,
      errors: true
    },
    stats: 'errors-only'
  }
};
