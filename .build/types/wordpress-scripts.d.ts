// @wordpress/scripts ships no type declarations for its default webpack configuration.
declare module '@wordpress/scripts/config/webpack.config.js' {
	import type { Configuration } from 'webpack';

	const config: Configuration;
	export default config;
}
