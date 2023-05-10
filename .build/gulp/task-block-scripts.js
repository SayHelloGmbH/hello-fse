import { src, dest } from 'gulp';
import glob from 'glob';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import path from 'path';
import gulpWebpack from 'webpack-stream';

const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

export const task = (config) => {
	return new Promise((resolve) => {
		const taskPath = `${config.blockScriptsSrc}/**/*.js`,
			files = glob.sync(taskPath),
			entries = {};

		files.forEach((file) => {
			if (!path.basename(file).match(/^_/)) {
				const folders = path.dirname(file).split('/');
				const folder_last = folders[folders.length - 1];
				if (!folder_last.match(/^_/)) {
					entries[`${folders[3]}_${folder_last}`] = file; // MyBlock_editor.js || MyBlock_view.js
				}
			}
		});

		src([taskPath])
			.pipe(
				gulpWebpack({
					entry: entries,
					mode: 'production',
					module: {
						rules: [
							{
								test: /\.js$/,
								exclude: /node_modules/,
								loader: 'babel-loader',
							},
							{
								test: /\.css$/i,
								exclude: /node_modules/,
								use: [
									{
										loader: 'style-loader',
									},
									{
										loader: 'css-loader',
									},
								],
							},
							{
								test: /\.scss$/i,
								exclude: /node_modules/,
								use: [
									{
										loader: 'style-loader',
									},
									{
										loader: 'css-loader',
									},
									{
										loader: 'sass-loader',
									},
								],
							},
						],
					},
					output: {
						filename: '[name].js',
					},
					externals: {
						jquery: 'jQuery',
					},
					plugins: [new DependencyExtractionWebpackPlugin()],
				})
			)
			.on('error', config.errorLog)
			.pipe(
				rename(function (path) {
					const basename_parts = path.basename.split('_'),
						target_basename = basename_parts[1],
						target_basefolder = basename_parts[0],
						path_new = {
							dirname:
								config.blockScriptsDist +
								`${target_basefolder}/assets/dist/scripts/`,
							basename: target_basename,
							extname: path.extname,
						};
					return path_new;
				})
			)
			.pipe(dest('./'));
		// .pipe(uglify())
		// .pipe(
		// 	rename({
		// 		suffix: '.min',
		// 	})
		// )
		// .on('error', config.errorLog)
		// .pipe(dest('./'));
		resolve();
	});
};
