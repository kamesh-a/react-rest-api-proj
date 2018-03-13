'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = 'src/views';
module.exports = {
  devtool: 'eval-source-map',
  mode:'development',
  entry: {
    profile: path.join(__dirname, `${base}/profile.js`),
    login: path.join(__dirname, `${base}/login.js`),
    signUp: path.join(__dirname, `${base}/signUp.js`)
  },
  output: {
    path: path.join(__dirname, '/dist/views'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:`${base}/login.tpl.html`,
      inject: 'body',
      chunks:['login.js'],
      filename: 'login.html'
    }),
    new HtmlWebpackPlugin({
      template:`${base}/signUp.tpl.html`,
      inject: 'body',
      chunks:['signUp.js'],
      filename: 'signUp.html'
    }),
    new HtmlWebpackPlugin({
      template:`${base}/profile.tpl.html`,
      inject: 'body',
      chunks:['profile.js'],
      filename: 'profile.html'
    })],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        "presets": ["react", "env"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules'
    },
    {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
    }
    ]
  }
};

