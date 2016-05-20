var path = require("path");
var webpack = require("webpack");
var libraryName = 'lc-form-validation';
var CopyWebpackPlugin = require('copy-webpack-plugin');

var basePath = __dirname;

var env = process.env.NODE_ENV;
var production = 'production';

var config = {
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
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new CopyWebpackPlugin([
      {from: '../package.json', to:'dist/package.json'},
      {from: '../../README.md', to:'dist/README.md'}
    ])
  ]
};

if (env === production) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

module.exports = config;
