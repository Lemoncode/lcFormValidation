var path = require("path");
var webpack = require("webpack");
var libraryName = 'lc-form-validation';
var outputFile = libraryName + '.js';
var CopyWebpackPlugin = require('copy-webpack-plugin');

var basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
      // .js is required for react imports.
      // .tsx is for our app entry point.
      // .ts is optional, in case you will be importing any regular ts files.
      extensions: ['', '.js', '.ts', '.tsx']
  },

  entry: [
    './index.ts'
  ],

  output: {
    path: path.join(basePath, "dist"),
    filename: 'lc-form-validation.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'inline-source-map',

  module: {
		loaders: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
		]
	},

  plugins:[
    new CopyWebpackPlugin([
      {from: '../package.json', to:'package.json'}
    ])
  ]

}
