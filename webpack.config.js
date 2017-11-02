/*
 * Webpack development server configuration
 */

"use strict";

var webpack = require("webpack");

module.exports = {
  output: {
    filename: "main.js",
    publicPath: "/assets/",
    path: "assets/"
  },
  cache: false,
  debug: true,
  devtool: false,
  entry: [
    "react-hot-loader/patch",
    "webpack/hot/only-dev-server",
    "./src/index.js"
  ],
  stats: {
    colors: true,
    reasons: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.sass/,
        loader:
          "style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=8192"
      },
      {
        test: /\.svg/,
        loader: "svg-url-loader"
      }
    ]
  }
};
