/// <reference path="./.build/types/wordpress-scripts.d.ts" />

/**
 * Webpack configuration for theme and block scripts.
 *
 * Extends the @wordpress/scripts default configuration, which includes
 * Babel, SCSS imports and the DependencyExtractionWebpackPlugin. The plugin
 * externalises WordPress packages and writes a {name}.asset.php file next
 * to each bundle, which the PHP enqueue logic uses for dependencies and version.
 */
import fs from 'fs';
import path from 'path';
import defaultConfig from '@wordpress/scripts/config/webpack.config.js';

const __dirname = import.meta.dirname;

const scriptsSrc = './.build/assets/scripts';
const scriptsDist = path.resolve(__dirname, 'assets/scripts');
const blocksDir = './src/Blocks';

const subfolders = (dir) =>
	fs.existsSync(dir)
		? fs
				.readdirSync(dir, { withFileTypes: true })
				.filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
				.map((entry) => entry.name)
		: [];

// .build/assets/scripts/{bundle}/index.js → assets/scripts/{bundle}.js
const themeEntries = {};
subfolders(scriptsSrc).forEach((bundle) => {
	const file = `${scriptsSrc}/${bundle}/index.js`;
	if (fs.existsSync(file)) {
		themeEntries[bundle] = file;
	}
});

// src/Blocks/{Block}/assets/src/scripts/{bundle}/index.js → src/Blocks/{Block}/assets/dist/scripts/{bundle}.js
const blockEntries = {};
subfolders(blocksDir).forEach((block) => {
	const blockScriptsSrc = `${blocksDir}/${block}/assets/src/scripts`;
	subfolders(blockScriptsSrc).forEach((bundle) => {
		const file = `${blockScriptsSrc}/${bundle}/index.js`;
		if (fs.existsSync(file)) {
			blockEntries[`${block}/assets/dist/scripts/${bundle}`] = file;
		}
	});
});

// The default config assumes a block plugin with sources in ./src. In this theme,
// ./src contains PHP classes, so the block.json/PHP copy plugins must not run.
const plugins = (defaultConfig.plugins ?? []).filter(
	(plugin) => plugin && !['CopyPlugin', 'PhpFilePathsPlugin'].includes(plugin.constructor.name)
);

const baseConfig = {
	...defaultConfig,
	plugins,
	// Polling is needed for reliable file watching on network volumes.
	watchOptions: { poll: 500, ignored: /node_modules/ },
};

/** @type {import('webpack').Configuration[]} */
const configs = [
	{
		...baseConfig,
		entry: themeEntries,
		output: {
			...defaultConfig.output,
			path: scriptsDist,
			// Never empty the output folder: it is committed to the repository.
			clean: false,
		},
	},
];

if (Object.keys(blockEntries).length) {
	configs.push({
		...baseConfig,
		entry: blockEntries,
		output: {
			...defaultConfig.output,
			path: path.resolve(__dirname, blocksDir),
			clean: false,
		},
	});
}

export default configs;
