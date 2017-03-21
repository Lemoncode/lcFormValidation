module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai-as-promised', 'chai', 'sinon'],
    files: [
      './test/test_index.js'
    ],
    exclude: [
    ],
    preprocessors: {
      './test/test_index.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'awesome-typescript-loader',
              options: {
                useBabel: true,
              }
            }
          },
        ],
        //Configuration required to import sinon on spec.ts files
        noParse: [
          /node_modules(\\|\/)sinon/,
        ]
      },
      resolve: {
        //Added .json extension required by cheerio (enzyme dependency)
        extensions: ['.js', '.ts'],
        //Configuration required to import sinon on spec.ts files
        // https://github.com/webpack/webpack/issues/304
        alias: {
          sinon: 'sinon/pkg/sinon'
        }
      },
    },
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
