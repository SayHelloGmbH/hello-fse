import { src, dest } from 'gulp';
import rename from 'gulp-rename';
import svgmin from 'gulp-svgmin';

/**
 * assets/**\/*.svg → assets/**\/*.min.svg
 */
export const task = (config) => {
	return src([`${config.assetsDir}**/*.svg`, `!${config.assetsDir}**/*.min.svg`], { allowEmpty: true })
		.pipe(svgmin({ plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }] }))
		.on('error', config.errorLog)
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(config.assetsDir));
};
