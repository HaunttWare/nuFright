const path = require('path');
const Dotenv = require('dotenv-webpack');


module.exports = {
  devtool: 'eval-source-map',
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
          test: /\.(css|scss)$/,
          use: ["style-loader", "css-loader"],
      },
      {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    })
  ]
};