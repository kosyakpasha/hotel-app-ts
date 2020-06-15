const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = configDirs => {
  return {
    devtool: "inline-source-map",
    entry: configDirs.APP_DIR + '/js/index.ts',
    output: {
      filename: 'bundle.[hash].js',
      path: path.resolve('dist'),
      chunkFilename: "vendor.min.jsvendor.min.js",
      publicPath: '/'
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '/dist',
                hmr: process.env.NODE_ENV === 'prod',
              },
            },
            'css-loader',
          ],
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'bundle.min.css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src', 'index.html'),
      }),
    ]
  }
};

module.exports = common;
