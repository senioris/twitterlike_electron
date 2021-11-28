const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CopyFilePlugin = require('copy-webpack-plugin')

const CURRENT_WORKING_DIR = process.cwd()

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './src/render/index.html',
  filename: './index.html',
})

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: [path.join(CURRENT_WORKING_DIR, '/src/render/index.tsx')],
  },
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist/render'),
    filename: 'bundle.[chunkhash].js',
    // publicPath: "/dist/",
  },
  devServer: {
    port: 3355,
    hot: true,
    host: '0.0.0.0',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
    ],
  },
  plugins: [
    htmlWebpackPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
}

module.exports = config
