const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/page/index.js',
  output: {
    path: path.resolve(__dirname, '../on-memory/'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, './src'),
    publicPath: '/',
    inline: true,
    hot: true,
    overlay: true,
    port: 8080,
    stats: 'errors-only',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: false,
      template: path.relative(__dirname, './src/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
    ],
  },
};
