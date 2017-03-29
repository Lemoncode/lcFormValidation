var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),

  entry: {
    app: './index.js',
    vendor: [
      "jquery",
      "core-js",
      "lc-form-validation",
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css'
    ]
  },

  output: {
    path: path.join(basePath, "dist"),
    filename: '[name].js'
  },

  //https://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli
  devServer: {
    contentBase: './dist', //Content base
    inline: true, //Enable watch and live reload
    host: 'localhost',
    noInfo: true,
    port: 8080
  },

  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      //Note: Doesn't exclude node_modules to load bootstrap
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      //Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
      //Using here url-loader and file-loader
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html' //Name of template in ./src
    }),
    //Generate bundle.css => https://github.com/webpack/extract-text-webpack-plugin
    new ExtractTextPlugin('[name].css'),
  ]
}
