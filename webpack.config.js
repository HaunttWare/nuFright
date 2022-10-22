const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './client/src/index.tsx', 
  output: {
    path: path.join(__dirname, 'client/public/build'),
    filename: 'bundle.js',
  },
    mode: process.env.NODE_ENV || "development",
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },  
  module: {
    rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
      },
      {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
      },
      {
          test: /\.(sc|sa|c)ss$/,
          use: ["style-loader", {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }],
      },
      {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ["file-loader"],
      },
    ],
  },
  stats: {
    loggingDebug:['sass-loader'],
    errorDetails: true
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
    new MiniCssExtractPlugin({
      filename:'[name].css',
    })
  ]
};