import { src, dest } from 'gulp';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
const sass = require('gulp-sass')(require('sass'));

export const task = (config) => {
	return src([config.blockStylesSrc])
		.pipe(
			sass({
				includePaths: ['./node_modules/'],
			}).on('error', sass.logError)
		)
		.pipe(
			rename(function (path) {
				return {
					dirname: config.blockStylesDist.replace('./', '') + path.dirname.replace('/assets/src', '/assets/dist'),
					basename: path.basename,
					extname: path.extname,
				};
			})
		)
		.pipe(dest('./'))
		.on('error', config.errorLog)
		.pipe(cleanCSS())
		.on('error', config.errorLog)
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest('./'));
};
