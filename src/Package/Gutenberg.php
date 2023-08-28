<?php

namespace SayHello\Theme\Package;

use WP_Block_Type_Registry;

/**
 * Adjustments for the Block Editor
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class BlockEditor
{
	public $min = false;

	public function __construct()
	{
		$this->min = !sht_theme()->debug;
	}

	/**
	 * Main initialisation code which adds hook methods
	 *
	 * @return void
	 */
	public function run()
	{
		if (!function_exists('register_block_type')) {
			return;
		}
		add_action('enqueue_block_assets', [$this, 'enqueueBlockAssets']);
		add_filter('block_categories_all', [$this, 'blockCategories']);
		add_filter('block_editor_settings_all', [$this, 'editorSettings']);
		add_filter('allowed_block_types_all', [$this, 'allowedBlockTypes'], 10, 2);
		add_action('after_setup_theme', [$this, 'themeSupports']);
		add_action('init', [$this, 'setScriptTranslations']);
		add_filter('admin_body_class', [$this, 'extendAdminBodyClass']);
		add_action('after_setup_theme', [$this, 'enqueueBlockStyles']);
	}

	/**
	 * Add and remove theme supports definitions.
	 *
	 * @return void
	 */
	public function themeSupports()
	{
		// Since WordPress 5.5: disallow block patterns delivered by Core
		remove_theme_support('core-block-patterns');
	}

	/**
	 * Enqueues the main CSS and JS files for the Block Editor views
	 *
	 * @return void
	 */
	public function enqueueBlockAssets()
	{

		if (!is_admin()) {
			return;
		}

		// Enqueue theme-level CSS in the Block and Site Editors
		// Replaces add_editor_style which is for TinyMCE
		wp_enqueue_style(
			'sht-admin-editor-style',
			get_template_directory_uri() . '/assets/styles/admin-editor' . ($this->min ? '.min' : '') . '.css',
			[],
			filemtime(get_template_directory() . '/assets/styles/admin-editor' . ($this->min ? '.min' : '') . '.css')
		);

		if (file_exists(get_template_directory() . '/assets/gutenberg/blocks' . ($this->min ? '.min' : '') . '.js')) {
			$script_asset_path = get_template_directory() . '/assets/gutenberg/blocks.asset.php';
			$script_asset = file_exists($script_asset_path) ? require($script_asset_path) : ['dependencies' => [], 'version' => sht_theme()->version];

			wp_enqueue_script(
				'sht-gutenberg-script',
				get_template_directory_uri() . '/assets/gutenberg/blocks' . ($this->min ? '.min' : '') . '.js',
				$script_asset['dependencies'],
				$script_asset['version']
			);
		}

		if (file_exists(get_template_directory() . '/assets/fonts/woff2.css')) {
			wp_enqueue_style('sht-gutenberg-font', get_template_directory_uri() . '/assets/fonts/woff2.css', [], filemtime(get_template_directory() . '/assets/fonts/woff2.css'));
		}
	}

	/**
	 * This enqueues individual CSS files for each block.
	 *
	 * @return void
	 */
	public function enqueueBlockStyles()
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
	public function setScriptTranslations()
	{
		wp_set_script_translations('sht-gutenberg-script', 'sht', get_template_directory() . '/languages');
	}

	/**
	 * Modify some of the Block Editor settings
	 *
	 * @param array $settings
	 * @return array
	 */
	public function editorSettings($settings)
	{
		$settings['enableOpenverseMediaCategory'] = false;
		return $settings;
	}

	/**
	 * Only add these blocks to the block inserter.
	 *
	 * @param array|boolean $blocks
	 * @return array
	 */
	public function allowedBlockTypes($allowed_blocks, $context)
	{

		// Allow everything in the site editor
		if ($context->name === 'core/edit-site') {
			return $allowed_blocks;
		}

		// Default value is a boolean. Make sure we have an array.
		if (!is_array($allowed_blocks)) {
			$allowed_blocks = [];
		}

		// Always allow any blocks provided by Say Hello
		$allowed_blocks = array_filter(
			WP_Block_Type_Registry::get_instance()->get_all_registered(),
			function ($block) {
				return strpos($block->name, 'sht/') !== false || strpos($block->name, 'shp/') !== false;
			}
		);

		// Add in the allowed core blocks for this project
		$allowed_blocks = array_merge(array_keys($allowed_blocks), ['core/group', 'core/column', 'core/columns', 'core/paragraph', 'core/heading', 'core/image', 'core/list', 'core/list-item']);

		return array_unique($allowed_blocks);
	}

	public function blockCategories($categories)
	{
		return array_merge($categories, [
			[
				'slug'  => 'sht/blocks',
				'title' => _x('Blöcke von Say Hello', 'Custom block category name', 'sha'),
			],
		]);
	}

	public function isContextEdit()
	{
		return array_key_exists('context', $_GET) && $_GET['context'] === 'edit';
	}

	/**
	 * Add a CSS class name to the admin body, containing current post
	 * name and post type.
	 * @param  string $classes The pre-existing body class name/s
	 * @return string
	 */
	public function extendAdminBodyClass($classes)
	{
		global $post;
		if ($post->post_type ?? false && $post->post_name ?? false) {
			global $post;
			$classes .= ' post-type-' . $post->post_type . ' post-type-' . $post->post_type . '--' . $post->post_name;
		}
		return $classes;
	}
}
