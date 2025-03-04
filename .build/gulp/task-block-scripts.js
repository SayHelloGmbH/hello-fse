import { src, dest } from 'gulp';
import { sync as globSync } from 'glob';
import rename from 'gulp-rename';
import path from 'path';
import gulpWebpack from 'webpack-stream';
import sass from 'sass';
import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin';

export const task = (config) => {
	return new Promise((resolve) => {
		const taskPath = `${config.blockScriptsSrc}/**/*.js`;
		const files = globSync(taskPath);
		const entries = {};

		files.forEach((file) => {
			if (!path.basename(file).startsWith('_')) {
				const folders = path.dirname(file).split(path.sep);
				const folder_last = folders[folders.length - 1];

				if (!folder_last.startsWith('_')) {
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
								test: /\.s?css$/i,
								use: [
									'style-loader',
									'css-loader',
									{
										loader: 'sass-loader',
										options: {
											implementation: sass,
										},
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
				rename((filePath) => {
					const basenameParts = filePath.basename.split('_');
					const targetBasename = basenameParts[1];
					const targetBasefolder = basenameParts[0];
					return {
						dirname: `${config.blockScriptsDist}${targetBasefolder}/assets/dist/scripts/`,
						basename: targetBasename,
						extname: filePath.extname,
					};
				})
			)
			.pipe(dest('./'));
		resolve();
	});
};
