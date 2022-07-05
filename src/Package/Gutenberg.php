<?php

namespace SayHello\Theme\Package;

/**
 * Adjustments for the Gutenberg Editor
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Gutenberg
{
	public $min = false;

	public function __construct()
	{
		$this->min = !sht_theme()->debug;
	}

	public function run()
	{
		if (!function_exists('register_block_type')) {
			return;
		}
		add_action('enqueue_block_editor_assets', [$this, 'enqueueBlockAssets']);
		add_filter('block_categories_all', [$this, 'blockCategories']);
		add_action('after_setup_theme', [$this, 'themeSupports']);
		add_action('init', [$this, 'setScriptTranslations']);
		add_filter('admin_body_class', [$this, 'extendAdminBodyClass']);
	}

	public function themeSupports()
	{
		// Since WordPress 5.5: disallow block patterns delivered by Core
		remove_theme_support('core-block-patterns');
	}

	public function enqueueBlockAssets()
	{
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
