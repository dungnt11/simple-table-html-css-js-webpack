// Imports
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
require("babel-register");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: "./js/index.js",

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },

      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")],
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        js: {
          test: /\.js$/,
          name: "commons",
          chunks: "all",
          minChunks: 7
        },
        css: {
          test: /\.(css|sass|scss)$/,
          name: "commons",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  },

  plugins: [
    new htmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: "dist/[name].css"
    })
  ],
  devServer: {
    port: 3000
  }
};
module.exports = config;
