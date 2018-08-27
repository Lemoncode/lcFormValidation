var path = require("path");
var webpack = require("webpack");
var libraryName = 'lc-form-validation';
var CopyWebpackPlugin = require('copy-webpack-plugin');

var basePath = __dirname;

var config = {
  context: path.join(basePath, "src"),

  resolve: {
    extensions: ['.js', '.ts']
  },

  entry: [
    'es6-promise',
    './index.ts',
  ],

  output: {
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use:
        {
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true
          }
        }
      }
    ]
  },

  plugins: [    
    new CopyWebpackPlugin([
      { from: '../../README.md', to: 'README.md' },
      { from: '../../ReadmeResources', to: 'ReadmeResources' }
    ])
  ]
};

module.exports = config;
