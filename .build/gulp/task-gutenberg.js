const filter = require('gulp-filter');

import gulp from 'gulp';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

export const task = (config) => {
	return (
		gulp
			.src([`${config.assetsBuild}gutenberg/blocks.js`])
			.pipe(
				gulpWebpack(
					{
						mode: 'production',
						module: {
							rules: [
								{
									test: /\.(js|jsx)$/,
									exclude: /node_modules/,
									loader: 'babel-loader',
								},
								{
									test: /\.css$/i,
									exclude: /node_modules/,
									use: [
										{
											loader: 'style-loader',
											options: {
												sourceMap: false,
											},
										},
										{
											loader: 'css-loader',
											options: {
												sourceMap: false,
											},
										},
									],
								},
								{
									test: /\.scss$/i,
									exclude: /node_modules/,
									use: [
										{
											loader: 'style-loader',
											options: {
												sourceMap: false,
											},
										},
										{
											loader: 'css-loader',
											options: {
												sourceMap: false,
											},
										},
										{
											loader: 'sass-loader',
											options: {
												sourceMap: false,
											},
										},
									],
								},
							],
						},
						watchOptions: {
							poll: true,
							ignored: /node_modules/,
						},
						output: {
							filename: 'blocks.js',
						},
						plugins: [new DependencyExtractionWebpackPlugin()],
					},
					webpack
				)
			)
			.on('error', config.errorLog)
			.pipe(gulp.dest(config.assetsDir + 'gutenberg/'))

			// Minify
			.pipe(filter(['**/*.js']))
			.pipe(uglify())
			.pipe(
				rename({
					suffix: '.min',
				})
			)
			.on('error', config.errorLog)
			.pipe(gulp.dest(config.assetsDir + 'gutenberg/'))
	);
};
