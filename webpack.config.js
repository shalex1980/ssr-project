const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const publicPath = 'http://localhost:8050/public/assets';
const devMod = process.env.NODE_ENV !== 'production' ;
const jsName = 'bundle.js'; //devMod ? 'bundle.js' : 'bundle-[hash].js';
const cssName = 'styles.css'; //!devMod ? 'styles.css' : 'styles-[hash].css';
const DEPL = process.env.DEPL !== 'csr';
console.log(DEPL, '!!!!!');

const plugins = [
  new webpack.DefinePlugin({
    DEPL : JSON.stringify('ssr'),
  }),
  new MiniCssExtractPlugin({
    filename: cssName
  })
]

if( !devMod ) {
  plugins.push(
    new CleanWebpackPlugin()
  )
}
if( !DEPL) {
  plugins.push(
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  )
}

module.exports = {
  mode: 'development',
  entry:  './src/client.js',
  output: {
    filename: jsName,
    path: path.join(__dirname, "public/assets"),
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMod,
              publicPath: DEPL ? devMod ? 'http://localhost:8050': publicPath : './',
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
          //publicPath: "public/assets",
          //name: '[name].[ext]',
          outputPath: (url, srcPath, context) => {
            console.log(url, ' url');
            console.log(srcPath, ' srcPath');
            console.log(context, ' context');
            console.log(DEPL , ' !!!!');
            let path = srcPath.slice(srcPath.indexOf('src') + 3);
            console.log(path, ' path');
            return devMod ? `/public/assets${path}` : path;
          }
        },
      },
    ]
  },
  devtool: devMod ? 'source-map': false
}
if(DEPL) {
  module.exports.output.publicPath = publicPath;
  module.exports.devServer = {
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: 8050,
    //contentBase: path.join(__dirname, 'public/assets'),
    hot: true,
    watchContentBase: true
  }
  console.log('SSSSSSSR');
}
