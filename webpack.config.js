const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const publicPath = 'http://localhost:8050/public/assets';
const devMod = process.env.NODE_ENV !== 'production' ;
const jsName = devMod ? 'bundle.js' : 'bundle-[hash].js';
const cssName = devMod ? 'styles.css' : 'styles-[hash].css';

const plugins = [
  new MiniCssExtractPlugin({
    filename: cssName
  })
]

if( !devMod ) {
  plugins.push(
    new CleanWebpackPlugin()
  )
}

module.exports = {
  mode: 'development',
  context: path.join(__dirname, 'src'),
  entry:  './client.js',
  output: {
    filename: jsName,
    path: path.join(__dirname, 'public/assets'),
    publicPath
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          /*options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ]
          }*/

        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMod,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          publicPath: "public/assets",
          name: '[path][name].[ext]'
        },
      },
    ]
  },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: 8050,
    contentBase: path.join(__dirname, 'public/assets'),
    hot: true,
    watchContentBase: true
  },
  devtool: devMod ? 'source-map': false
}