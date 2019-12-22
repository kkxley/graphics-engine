const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/main.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ],
  },
};