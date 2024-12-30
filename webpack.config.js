const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

let devMode = process.env.devMode || true;

module.exports = {
  entry: "./src/index.js",
  mode: devMode ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
    publicPath: "/",
    chunkFilename: "[name].js"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    open: true
  },
  devtool: false,
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 240000,
    }
  },
  watch: true,
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|.module.css)$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React App",
      templateContent: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React App</title>
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>
      `,
    }),
    new Dotenv(),
    new WebpackBundleAnalyzer(),
  ],
};
