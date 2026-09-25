/**
 * Gulp handles CSS and SVG. JavaScript is bundled by @wordpress/scripts
 * using webpack.config.js (see the npm scripts in package.json).
 */
import gulp from 'gulp';

import { task as taskBlockStyles } from './.build/gulp/task-block-styles.mjs';
import { task as taskStyles } from './.build/gulp/task-styles.mjs';
import { task as taskSvg } from './.build/gulp/task-svg.mjs';

const config = {
	assetsDir: './assets/',
	assetsBuild: './.build/assets/',
	blocksDir: './src/Blocks/',
	blockStylesSrc: './src/Blocks/*/assets/src/styles/**/*.scss',
	blockAssetsSrc: 'assets/src',
	blockAssetsDist: 'assets/dist',
	errorLog: function (error) {
		console.log('\x1b[31m%s\x1b[0m', error);
		if (this.emit) {
			this.emit('end');
		}
	},
};

export const block_styles = () => taskBlockStyles(config);
export const theme_styles = () => taskStyles(config);
export const styles = gulp.parallel(theme_styles, block_styles);
export const svg = () => taskSvg(config);

export const watch = () => {
	// Polling is needed for reliable file watching on network volumes.
	const settings = { usePolling: true, interval: 100 };

	gulp.watch(`${config.assetsBuild}styles/**/*.scss`, settings, gulp.series(theme_styles));
	gulp.watch(config.blockStylesSrc, settings, gulp.series(block_styles));
	gulp.watch([`${config.assetsDir}**/*.svg`, `!${config.assetsDir}**/*.min.svg`], settings, gulp.series(svg));
};

export default gulp.series(watch);
