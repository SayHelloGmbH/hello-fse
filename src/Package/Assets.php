<?php

namespace SayHello\Theme\Package;

/**
 * Assets (CSS, JavaScript etc)
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Assets
{

	public $theme_url = '';
	public $theme_path = '';

	public function run()
	{
		add_action('wp_enqueue_scripts', [$this, 'registerAssets']);
		add_action('admin_enqueue_scripts', [$this, 'registerAdminAssets']);
		add_action('after_setup_theme', [$this, 'editorStyle']);
		add_action('wp_head', [$this, 'loadFonts']);
	}

	public function registerAssets()
	{

		if (!is_user_logged_in()) {
			wp_deregister_style('dashicons');
		}

		$min = !sht_theme()->debug;

		/**
		 * CSS
		 */
		$deps = ['wp-block-library'];

		wp_enqueue_style('fancybox', get_template_directory_uri() . '/assets/plugins/fancybox/jquery.fancybox.min.css', [], '3.4.0');
		$deps[] = 'fancybox';

		wp_enqueue_style('sht-style', get_template_directory_uri() . '/assets/styles/ui' . ($min ? '.min' : '') . '.css', $deps, filemtime(get_template_directory() . '/assets/styles/ui' . ($min ? '.min' : '') . '.css'));

		// Javascript
		$deps = [];

		wp_enqueue_script('fancybox', get_template_directory_uri() . '/assets/plugins/fancybox/jquery.fancybox.min.js', ['jquery'], '3.4.0', true);
		$deps[] = 'fancybox';

		wp_enqueue_script('sht-script', get_template_directory_uri() . '/assets/scripts/ui' . ($min ? '.min' : '') . '.js', $deps, filemtime(get_template_directory() . '/assets/scripts/ui' . ($min ? '.min' : '') . '.js'), true);
		wp_localize_script('sht-script', 'sht_theme', [
			'directory_uri' => get_template_directory_uri(),
			'version' => wp_get_theme()->get('Version')
		]);
	}

	public function registerAdminAssets()
	{
		//wp_enqueue_style('sht-admin-editor-style', get_template_directory_uri() . '/assets/styles/admin-editor' . (sht_theme()->debug ? '' : '.min') . '.css', ['wp-edit-blocks'], filemtime(get_template_directory() . '/assets/styles/admin-editor' . (sht_theme()->debug ? '' : '.min') . '.css'));
		wp_enqueue_style('sht-admin-style', get_template_directory_uri() . '/assets/styles/admin' . (sht_theme()->debug ? '' : '.min') . '.css', ['sht-admin-editor-style', 'wp-edit-blocks'], filemtime(get_template_directory() . '/assets/styles/admin' . (sht_theme()->debug ? '' : '.min') . '.css'));
	}

	public function editorStyle()
	{
		add_theme_support('editor-styles');
		add_editor_style('assets/styles/admin-editor' . (sht_theme()->debug ? '' : '.min') . '.css');
		// if (file_exists(get_template_directory() . '/assets/styles/admin-editor' . (sht_theme()->debug ? '' : '.min') . '.css')) {
		// 	add_editor_style('assets/styles/admin-editor' . (sht_theme()->debug ? '' : '.min') . '.css');
		// }
	}

	public function loadFonts()
	{
		$theme_url = str_replace(get_home_url(), '', get_template_directory_uri());
		$theme_path = get_template_directory();
		$font_name = sanitize_title(sht_theme()->name) . '-font-' . sht_theme()->version;

		if (!file_exists("{$theme_path}/assets/fonts/woff2.css")) {
			return;
		}

		if (!file_exists("{$theme_path}/assets/fonts/woff.css")) {
			trigger_error(sprintf(_x('Font CSS file %s missing', 'PHP warning', 'sha'), '/assets/fonts/woff.css'), E_USER_WARNING);
		}

		$file = get_template_directory() . '/assets/scripts/loadfonts.min.js';
		if (!file_exists($file)) {
			echo 'loadfonts.min.js not found!';
			die;
		}

		echo '<script id="loadFonts">';
		echo file_get_contents($file);
		echo "loadFont('$font_name', '$theme_url/assets/fonts/woff.css', '$theme_url/assets/fonts/woff2.css');";
		echo '</script>';
		echo '<noscript>';
		echo "<link rel='stylesheet' id='font' href='$theme_url/assets/fonts/woff2.css' type='text/css' media='all'>";
		echo '</noscript>';
	}
}
