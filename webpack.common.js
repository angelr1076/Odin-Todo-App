const path = require('path');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.png',
      template: './src/index.html',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[name][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
      // {
      //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   include: path.resolve(
      //     __dirname,
      //     './node_modules/bootstrap-icons/font/fonts',
      //   ),
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'webfonts',
      //       publicPath: '../webfonts',
      //     },
      //   },
      // },
    ],
  },
};
