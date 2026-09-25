import { src, dest } from 'gulp';
import cleanCSS from '@aptuitiv/gulp-clean-css';
import autoprefixer from 'autoprefixer';
import editorStyles from 'gulp-editor-styles';
import filter from 'gulp-filter';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';

const sass = gulpSass(dartSass);

/**
 * .build/assets/styles/**\/*.scss → assets/styles/**\/*.css + *.min.css
 * Partials (_*.scss) are skipped by gulp-sass.
 */
export const task = (config) => {
	const editorFilter = filter('**/admin-editor.css', { restore: true, dot: true });

	return (
		src(`${config.assetsBuild}styles/**/*.scss`)
			.pipe(sass({ loadPaths: ['./node_modules/'] }).on('error', sass.logError))
			.pipe(postcss([autoprefixer()]))
			// Scope the editor stylesheet to .editor-styles-wrapper
			.pipe(editorFilter)
			.pipe(editorStyles())
			.pipe(editorFilter.restore)
			.pipe(dest(`${config.assetsDir}styles/`))
			// Minify
			.pipe(cleanCSS())
			.on('error', config.errorLog)
			.pipe(rename({ suffix: '.min' }))
			.pipe(dest(`${config.assetsDir}styles/`))
	);
};
