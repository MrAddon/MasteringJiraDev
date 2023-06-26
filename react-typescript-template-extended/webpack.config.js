const globEntries = require('webpack-glob-entries')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const WRMPlugin = require('atlassian-webresource-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')

const PLUGIN_KEY = 'com.example.helloworld'
const WEBPACK_JSONP_FUNCTION_NAME = 'helloWorldJsonp'
const MAVEN_OUTPUT_DIRECTORY = path.join(__dirname, 'target', 'classes')
const WEBPACK_OUTPUT_SUBDIRECTORY = 'frontend'
const WEBPACK_FULL_OUTPUT_PATH = path.join(MAVEN_OUTPUT_DIRECTORY, WEBPACK_OUTPUT_SUBDIRECTORY)
const SRC_DIR = path.join(__dirname, 'src', 'main')
const FRONTEND_DIR = path.join(SRC_DIR, 'frontend')
const ENTRYPOINT_GLOB = path.join(FRONTEND_DIR, 'entries', '**', '*.{ts,tsx}')
const I18N_DIR = path.join(SRC_DIR, 'resources', 'i18n')
const i18nFiles = [path.join(I18N_DIR, 'hello-world.properties')] // ONLY WATCH MODE: Change with the I18n file you want to test

const exampleDataProvider = {
  key: 'hello-world-data-provider',
  class: 'com.example.helloworld.impl.providers.ExampleDataProvider'
}
const getWrmPlugin = (watch = false, watchPrepare = false) => {
  return new WRMPlugin({
    pluginKey: PLUGIN_KEY,
    xmlDescriptors: path.join(MAVEN_OUTPUT_DIRECTORY, 'META-INF', 'plugin-descriptors', 'wr-webpack-bundles.xml'),
    locationPrefix: WEBPACK_OUTPUT_SUBDIRECTORY,
    webresourceKeyMap: {
      'hello-world': 'entrypoint-helloWorld'
    },
    dataProvidersMap: {
      'hello-world': [exampleDataProvider]
    },
    providedDependencies: {
      jquery: providedAmdDep('jquery', 'com.atlassian.auiplugin:ajs')
    },
    watch,
    watchPrepare
  })
}

function providedAmdDep(importName, resource) {
  return {
    dependency: resource,
    import: {
      amd: importName,
      var: `require("${importName}")`
    }
  }
}

const getWebpackConfig = (isProductionEnv = false) => ({
  mode: 'development',
  entry: globEntries(path.resolve(__dirname, ENTRYPOINT_GLOB)),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@atlassian/i18n-properties-loader',
            options: {
              i18nFiles,
              disabled: isProductionEnv
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-class-properties',
                'react-hot-loader/babel',
                '@babel/plugin-transform-runtime'
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'images/[hash]-[name].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        use: [isProductionEnv ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  output: {
    path: WEBPACK_FULL_OUTPUT_PATH,
    filename: 'bundled.[name].js',
    chunkFilename: '[name].[chunkhash].js',
    jsonpFunction: WEBPACK_JSONP_FUNCTION_NAME
  },
  optimization: {
    splitChunks: false,
    runtimeChunk: false
  },
  stats: {
    colors: true,
    chunks: false,
    cachedAssets: false
  },
  devtool: false,
  resolve: {
    modules: ['node_modules', FRONTEND_DIR],
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(__dirname, 'target', 'jsBundles.html'),
      openAnalyzer: false
    })
  ]
})

const hostname = 'localhost'
const devServerPort = '5173'

const watchPrepareConfig = {
  output: {
    publicPath: `http://${hostname}:${devServerPort}/`,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [getWrmPlugin(true, true)]
}

const watchConfig = {
  devServer: {
    host: hostname,
    port: devServerPort,
    overlay: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  // In IDEA, to resolve "Unresolved type" errors you must mark directory "node_modules/webpack" as "Not Excluded"
  // See https://youtrack.jetbrains.com/issue/WEB-25867/ and https://youtrack.jetbrains.com/issue/WEB-52032
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin(), getWrmPlugin(true)]
}

const prodConfig = {
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    splitChunks: {
      minSize: 0,
      chunks: 'all',
      maxInitialRequests: Infinity
    },
    runtimeChunk: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          },
          mangle: {
            reserved: ['I18n', 'getText']
          }
        },
        extractComments: false
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    getWrmPlugin()
  ]
}

module.exports = env => {
  if (env === 'watch:prepare') {
    return merge([getWebpackConfig(), watchPrepareConfig])
  }

  if (env === 'watch') {
    return merge([getWebpackConfig(), watchConfig, watchPrepareConfig])
  }

  return merge([getWebpackConfig(true), prodConfig])
}
