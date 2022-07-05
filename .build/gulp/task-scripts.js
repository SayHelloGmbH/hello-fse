import gulp from 'gulp';

import gulpWebpack from 'webpack-stream';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import fs from 'fs';

const getDirectories = (path) =>
	fs
		.readdirSync(path)
		.filter((file) => fs.statSync(path + '/' + file).isDirectory());

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
					output: {
						filename: '[name].js',
					},
					externals: {
						jquery: 'jQuery',
					},
				})
			)
			.on('error', config.errorLog)
			.pipe(gulp.dest(config.assetsDir + 'scripts/'))

			// Minify
			.pipe(uglify())
			.pipe(
				rename({
					suffix: '.min',
				})
			)
			.on('error', config.errorLog)
			.pipe(gulp.dest(config.assetsDir + 'scripts/'));
		resolve();
	});
};
