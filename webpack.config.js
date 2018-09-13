const { resolve } = require('path');
const webpack = require('webpack');
const PROD_ENV = 0;
module.exports = {
  context: resolve(__dirname, 'src'),

  entry: ['./index.js'],
  output: {
    filename: PROD_ENV ? 'bundle.min.js' : 'bundle.js',
    path: resolve(__dirname, 'dist'),

    publicPath: '/dist/'
  },
 
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      proptypes: 'proptypes/disabled',
    }
  },
  devServer: {
    hot: true,
	historyApiFallback: true,
    // enable HMR on the server
    contentBase: './'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader', ],
        exclude: /node_modules/
      },
      { test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 }},
          'postcss-loader'
        ]
      },
    ],
  },

  plugins:  [
    new webpack.DefinePlugin({
	  'process.env': {
		NODE_ENV: JSON.stringify( PROD_ENV ? 'production' : 'development' )
	  }
	}),
	new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ],
};