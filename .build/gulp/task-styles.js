import { src, dest } from 'gulp';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
//import filter from 'gulp-filter';
//import editorStyles from 'gulp-editor-styles';
const sass = require('gulp-sass')(require('sass'));

export const task = (config) => {
	//const filterAdminEditor = filter(`${config.assetsBuild}styles/admin-editor.css`, { restore: true });

	return (
		src(config.assetsBuild + 'styles/**/*.scss')
			// Process non-admin-editor CSS files
			// .pipe(filterAdminEditor.restore)
			.pipe(
				sass({
					includePaths: ['./node_modules/'], // Include node_modules folder
				}).on('error', sass.logError)
			)
			.pipe(dest(config.assetsDir + 'styles/'))
			// Process admin-editor CSS file
			// .pipe(filterAdminEditor)
			// .pipe(editorStyles())
			// .pipe(filterAdminEditor.restore)
			.pipe(dest(config.assetsDir + 'styles/'))
			// Process minified CSS files
			.pipe(cleanCSS())
			.pipe(rename({ suffix: '.min' }))
			.pipe(dest(config.assetsDir + 'styles/'))
	);
};
