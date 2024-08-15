import gulp from 'gulp';

import gulpWebpack from 'webpack-stream';
import fs from 'fs';

import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin';

const getDirectories = (path) => fs.readdirSync(path).filter((file) => fs.statSync(path + '/' + file).isDirectory());

export const task = (config) => {
	return new Promise((resolve) => {
		const bundles = getDirectories(`${config.assetsBuild}scripts/`);
		const entry = {};

		bundles.forEach((bundle) => {
			const filePath = `${config.assetsBuild}scripts/${bundle}/index.js`;
			if (fs.existsSync(filePath)) {
				entry[bundle] = './' + filePath;
			}
		});

		gulp.src([`${config.assetsBuild}scripts/*`])
			.pipe(
				gulpWebpack({
					entry,
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
								use: ['style-loader', 'css-loader', 'sass-loader'],
							},
						],
					},
					output: {
						filename: '[name].js',
					},
					plugins: [new DependencyExtractionWebpackPlugin()],
					externals: {
						jquery: 'jQuery',
					},
				})
			)
			.on('error', config.errorLog)
			.pipe(gulp.dest(config.assetsDir + 'scripts/'));
		resolve();
	});
};
