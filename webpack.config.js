var path = require("path");
var CopyPlugin = require("copy-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    all: "./assets/all.js",
    application: "./assets/application.scss",
    "application-ie8": "./assets/application-ie8.scss",
  },
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false,
            }
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                quietDeps: true,
              }
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  output: {
    filename: "javascript/[name].js",
    path: path.resolve(__dirname, "_site/assets"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "node_modules/govuk-frontend/govuk/assets",
          to: path.resolve(__dirname, "_site/assets"),
        },
        {
          from: "node_modules/@ministryofjustice/frontend/moj/assets",
          to: path.resolve(__dirname, "_site/assets"),
          force: true,
        },
        {
          from: "node_modules/@ministryofjustice/frontend/moj/vendor",
          to: path.resolve(__dirname, "_site/assets/javascript"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "stylesheets/[name].css",
    }),
  ],
};
