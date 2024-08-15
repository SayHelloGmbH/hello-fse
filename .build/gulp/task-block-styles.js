import { src, dest } from 'gulp';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import * as dartSass from 'sass';

const gulpSass = sass(dartSass);

export const task = (config) => {
	return (
		src([config.blockStylesSrc])
			.pipe(gulpSass().on('error', gulpSass.logError))
			.pipe(autoprefixer())
			.pipe(
				rename((path) => ({
					dirname: config.blockStylesDist.replace('./', '') + path.dirname.replace('/assets/src', '/assets/dist'),
					basename: path.basename,
					extname: path.extname,
				}))
			)
			.pipe(dest('./'))
			.on('error', config.errorLog)
			// Minify
			.pipe(cleanCSS())
			.on('error', config.errorLog)
			.pipe(rename({ suffix: '.min' }))
			.pipe(dest('./'))
	);
};
