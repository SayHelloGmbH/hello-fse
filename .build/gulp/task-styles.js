import { src, dest } from 'gulp';
import cleanCSS from '@aptuitiv/gulp-clean-css';
import filter from 'gulp-filter';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import sassImportJson from '@sayhellogmbh/gulp-sass-import-json';
import editorStyles from 'gulp-editor-styles';
import sass from 'gulp-sass';
import * as dartSass from 'sass';

const gulpSass = sass(dartSass);

export const task = (config) => {
	const blockFilter = filter(`${config.assetsBuild}styles/admin-editor.css`, { restore: true });

	return (
		src(`${config.assetsBuild}styles/**/*.scss`)
			.pipe(sassImportJson({ cache: false, isScss: true }))
			.pipe(
				gulpSass({
					includePaths: ['./node_modules/'],
				}).on('error', gulpSass.logError)
			)
			.pipe(autoprefixer())
			.pipe(blockFilter)
			.pipe(editorStyles())
			.pipe(blockFilter.restore)
			.pipe(dest(`${config.assetsDir}styles/`))
			.on('error', config.errorLog)
			// Minify
			.pipe(cleanCSS())
			.pipe(
				rename({
					suffix: '.min',
				})
			)
			.on('error', config.errorLog)
			.pipe(dest(`${config.assetsDir}styles/`))
			// Reload
			.pipe(filter('**/*.css'))
	);
};
