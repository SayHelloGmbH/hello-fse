import gulp from 'gulp';

const config = {
	name: 'WordPress Theme by Say Hello',
	key: 'sht',
	themeDir: './',
	assetsDir: './assets/',
	gulpDir: './.build/gulp/',
	assetsBuild: './.build/assets/',
	blockScriptsSrc: './src/Blocks/**/assets/src/scripts',
	blockScriptsDist: './src/Blocks/',
	blockStylesSrc: './src/Blocks/**/assets/src/styles/**/*.{scss,js}',
	blockStylesDist: './src/Blocks/',
	errorLog: function (error) {
		console.log('\x1b[31m%s\x1b[0m', error);
		if (this.emit) {
			this.emit('end');
		}
	},
};

import { task as taskBlockScripts } from './.build/gulp/task-block-scripts';
import { task as taskBlockStyles } from './.build/gulp/task-block-styles';
import { task as taskScripts } from './.build/gulp/task-scripts';
import { task as taskStyles } from './.build/gulp/task-styles';
import { task as taskSvg } from './.build/gulp/task-svg';

export const block_scripts = () => taskBlockScripts(config);
export const block_styles = () => taskBlockStyles(config);
export const scripts = () => taskScripts(config);
export const styles = () => taskStyles(config);
export const svg = () => taskSvg(config);

export const watch = () => {
	const settings = { usePolling: true, interval: 100 };

	gulp.watch(config.blockStylesSrc, settings, gulp.series(block_styles));
	gulp.watch(`${config.blockScriptsSrc}/**/*.{scss,js}`, settings, gulp.series(block_scripts));
	gulp.watch(`${config.assetsBuild}styles/**/*.scss`, settings, gulp.series(styles));
	gulp.watch(`${config.assetsBuild}scripts/**/*.{scss,css,js}`, settings, gulp.series(scripts));
	gulp.watch(`${config.assetsDir}settings.json`, settings, gulp.series(scripts, styles));
	gulp.watch(`${config.themeDir}theme.json`, settings, gulp.series(scripts, styles));
	gulp.watch([`${config.assetsDir}**/*.svg`, `!${config.assetsDir}**/*.min.svg`], settings, gulp.series(svg));
};

export const taskDefault = gulp.series(watch);
export default taskDefault;
