import fs from 'fs';
import { src, dest } from 'gulp';
import cleanCSS from '@aptuitiv/gulp-clean-css';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';

const sass = gulpSass(dartSass);

/**
 * src/Blocks/{Block}/assets/src/styles/**\/*.scss → src/Blocks/{Block}/assets/dist/styles/**\/*.css + *.min.css
 */
export const task = (config) => {
	if (!fs.existsSync(config.blocksDir)) {
		return Promise.resolve();
	}

	const toDist = (file) => {
		file.dirname = file.dirname.replace(`${config.blockAssetsSrc}`, `${config.blockAssetsDist}`);
	};

	return (
		src(config.blockStylesSrc, { allowEmpty: true })
			.pipe(sass().on('error', sass.logError))
			.pipe(postcss([autoprefixer()]))
			.pipe(rename(toDist))
			.pipe(dest(config.blocksDir))
			// Minify
			.pipe(cleanCSS())
			.on('error', config.errorLog)
			.pipe(rename({ suffix: '.min' }))
			.pipe(dest(config.blocksDir))
	);
};
