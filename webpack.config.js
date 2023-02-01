const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  devtool: 'inline-cheap-module-source-map',
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },

  target: 'web',
  devServer: {
    port: '3000',
    static: {
      directory: path.join(__dirname, 'public'),
    },
    // open: true,
    // hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'src/assets/images/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
}
