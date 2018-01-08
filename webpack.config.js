const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, './frontend/index.jsx'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		alias: {
			views: path.resolve(__dirname, './frontend/views/'),
			core: path.resolve(__dirname, './frontend/core/'),
			assets: path.resolve(__dirname, './frontend/assets/'),
			store: path.resolve(__dirname, './frontend/store/'),
		},
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.*css$/,
				exclude: [/node_modules/],
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: true,
						}	
					},
					'sass-loader',
				],
			},
			{
				test: /\.js(x|$)/,
				exclude: [/node_modules/],
				loader: 'babel-loader',
				options: {
					presets: [
						'babel-preset-react',
						'babel-preset-es2015',
						'babel-preset-stage-0'
					]
				}
			},
			{
				test: /\.png$/,
				exclude: [/node_modules/],
				loader: 'url-loader',
			}
		]
	},
	plugins: [new HtmlWebpackPlugin({
		title: 'Q Jobs',
		inject: 'head',
		template: path.resolve(__dirname, 'frontend/index.ejs'),
	})],
};
