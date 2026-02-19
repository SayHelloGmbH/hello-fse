<?php

namespace SayHello\Theme\Controller;

/**
 * Adjustments for the Block Editor
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class BlockEditor
{

	/**
	 * Whether to load minified assets or not.
	 *
	 * @var bool
	 */
	public bool $min = false;

	public function __construct()
	{
		$this->min = defined('WP_DEBUG') && WP_DEBUG === false;
	}

	/**
	 * Main initialisation code which adds hook methods
	 *
	 * @return void
	 */
	public function run(): void
	{
		if (!function_exists('register_block_type')) {
			return;
		}
		add_action('enqueue_block_editor_assets', [$this, 'enqueueBlockEditorAssets']);
		add_filter('block_editor_settings_all', [$this, 'editorSettings']);
		add_action('after_setup_theme', [$this, 'themeSupports']);
		add_action('init', [$this, 'setScriptTranslations']);
		add_action('after_setup_theme', [$this, 'enqueueBlockStyles']);
	}

	/**
	 * Add and remove theme supports definitions.
	 *
	 * @return void
	 */
	public function themeSupports(): void
	{
		// Since WordPress 5.5: disallow block patterns delivered by Core
		remove_theme_support('core-block-patterns');
	}

	/**
	 * Enqueues the main CSS and JS files for the Block and Site Editor
	 *
	 * @return void
	 */
	public function enqueueBlockEditorAssets(): void
	{

		// Enqueue theme-level CSS in the Block and Site Editors
		// Replaces add_editor_style which is for TinyMCE
		wp_enqueue_style(
			'sht-admin-editor-style',
			get_template_directory_uri() . '/assets/styles/admin-editor' . ($this->min ? '.min' : '') . '.css',
			[],
			filemtime(get_template_directory() . '/assets/styles/admin-editor' . ($this->min ? '.min' : '') . '.css')
		);

		/**
		 * Load block editor scripts, in which shared functionality
		 * for the Block Editor and the Site Editor is defined.
		 *
		 * Individual Block scripts and CSS files are loaded through
		 * their own, individual Block Package files.
		 */
		if (file_exists(get_template_directory() . '/assets/scripts/block-editor.js')) {

			$script_asset_path = get_template_directory() . '/assets/scripts/block-editor.asset.php';
			$script_asset = file_exists($script_asset_path) ? require($script_asset_path) : ['dependencies' => [], 'version' => wp_get_theme()->get('Version')];

			wp_enqueue_script(
				'sht-block-editor-script',
				get_template_directory_uri() . '/assets/scripts/block-editor.js',
				$script_asset['dependencies'],
				$script_asset['version']
			);
		}
	}

	/**
	 * This enqueues individual CSS files for each block.
	 * If you want to add an individual CSS file for a specific
	 * core block, which is only loaded if the block is present
	 * on the page, add it to the .build/assets/styles/blocks/core
	 * folder with a filename which matches the block: e.g. media-text.scss.
	 *
	 * If you're doing the same thing for non-core blocks, use a
	 * subfolder of .build/assets/styles/blocks which matches the block key
	 * prefix, e.g. sht or shp.
	 *
	 * @return void
	 */
	public function enqueueBlockStyles(): void
	{
		$root_folder = get_template_directory() . '/assets/styles/blocks';
		$min = $this->min ? '.min' : '';

		// Get all available block namespaces.
		$block_namespaces = glob("{$root_folder}/*/");
		$block_namespaces = array_map(
			function ($type_path) {
				return basename($type_path);
			},
			$block_namespaces
		);

		foreach ($block_namespaces as $block_namespace) {

			// Get all available block styles of the given block namespace.
			$block_styles = glob("{$root_folder}/{$block_namespace}/*{$min}.css");
			$block_styles = array_map(
				function ($styles_path) use ($min) {
					return basename($styles_path, "{$min}.css");
				},
				$block_styles
			);

			foreach ($block_styles as $block_style) {
				if (empty($min) && strpos($block_style, '.min')) {
					continue;
				}
				wp_enqueue_block_style(
					$block_namespace . '/' . str_replace('.min', '', $block_style),
					array(
						'handle' => "{$block_namespace}-{$block_style}-styles",
						'src'    => get_theme_file_uri("assets/styles/blocks/{$block_namespace}/{$block_style}{$min}.css"),
						// Add "path" to allow inlining of block styles when possible.
						'path'   => get_theme_file_path("assets/styles/blocks/{$block_namespace}/{$block_style}{$min}.css"),
						'ver' => filemtime(get_theme_file_path("assets/styles/blocks/{$block_namespace}/{$block_style}{$min}.css"))
					),
				);
			}
		}
	}

	/**
	 * https://github.com/SayHelloGmbH/hello-roots/wiki/Translation-in-JavaScript
	 *
	 * Make sure that the JSON files are at e.g.
	 * 'languages/sht-de_DE_formal-739d784e82179214dfd2a6c345374e30.json' or
	 * 'languages/sht-fr_FR-739d784e82179214dfd2a6c345374e30.json'
	 *
	 * mhm 28.1.2020
	 */
	public function setScriptTranslations(): void
	{
		wp_set_script_translations('sht-block-editor-script', 'sht', get_template_directory() . '/languages');
	}

	/**
	 * Modify some of the Block Editor settings
	 *
	 * @param array $settings
	 * @return array
	 */
	public function editorSettings(array $settings): array
	{
		// Since WordPress 6.5: disable the font library
		$settings['fontLibraryEnabled'] = false;

		return $settings;
	}

	/**
	 * Check if the Block Editor is in 'edit' context
	 *
	 * @return bool
	 */
	public function isContextEdit(): bool
	{
		return is_admin() || (defined('REST_REQUEST') && REST_REQUEST);
	}
}
