const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function(configDirs) {
  const commonConfig = Object.assign({}, require('./common')(configDirs));
  const prodConfig = {
    plugins: [
      new OptimizeCSSAssetsPlugin(),
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: 'src/index.html' }
        ],
      }),
    ]
  };

  console.log('\x1b[36m%s\x1b[0m', 'Building for production ...');

  return merge(commonConfig, prodConfig);
};
