const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = configDirs => {
  const commonConfig = Object.assign({}, require('./common')(configDirs));
  const devConfig = {
    devServer: {
      contentBase: './src',
      hot: true,
      historyApiFallback: true,
      disableHostCheck: true,
      watchOptions: {
        poll: true
      },
      host: '0.0.0.0',
      port: 9999,
      proxy: {
        '/api': 'http://0.0.0.0:3001',
      },
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map[query]',
        exclude: ['vendor.js']
      }),
    ]
  };

  console.log('\x1b[36m%s\x1b[0m', 'Building for developing ...');

  return merge(commonConfig, devConfig);
};
