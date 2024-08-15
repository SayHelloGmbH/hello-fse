import { src, dest } from 'gulp';
import glob from 'glob';
import rename from 'gulp-rename';
import path from 'path';
import gulpWebpack from 'webpack-stream';

import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin';

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
					entries[`${folders[2]}_${folder_last}`] = `./${file}`; // MyBlock_editor.js || MyBlock_view.js
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
								use: ['style-loader', 'css-loader'],
							},
							{
								test: /\.scss$/i,
								use: ['style-loader', 'css-loader', 'sass-loader'],
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
				rename((path) => {
					const basenameParts = path.basename.split('_');
					const targetBasename = basenameParts[1];
					const targetBasefolder = basenameParts[0];
					return {
						dirname: `${config.blockScriptsDist}${targetBasefolder}/assets/dist/scripts/`,
						basename: targetBasename,
						extname: path.extname,
					};
				})
			)
			.pipe(dest('./'));
		resolve();
	});
};
