<?php

namespace SayHello\Theme\Package;

/**
 * Assets (CSS, JavaScript etc)
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Assets
{

	public $font_version = '1.0';
	public $theme_url = '';
	public $theme_path = '';

	public function __construct()
	{
		$this->font_version = sht_theme()->version;
		$this->theme_url    = get_template_directory_uri();
		$this->theme_path   = get_template_directory();
	}

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

		wp_enqueue_style('fancybox', $this->theme_url . '/assets/plugins/fancybox/jquery.fancybox.min.css', [], '3.4.0');
		$deps[] = 'fancybox';

		wp_enqueue_style('sht-style', $this->theme_url . '/assets/styles/ui' . ($min ? '.min' : '') . '.css', $deps, filemtime($this->theme_path . '/assets/styles/ui' . ($min ? '.min' : '') . '.css'));

		// Javascript
		$deps = [];

		wp_enqueue_script('fancybox', $this->theme_url . '/assets/plugins/fancybox/jquery.fancybox.min.js', ['jquery'], '3.4.0', true);
		$deps[] = 'fancybox';

		wp_enqueue_script('sht-script', $this->theme_url . '/assets/scripts/ui' . ($min ? '.min' : '') . '.js', $deps, filemtime($this->theme_path . '/assets/scripts/ui' . ($min ? '.min' : '') . '.js'), true);
	}

	public function registerAdminAssets()
	{
		//wp_enqueue_style('sht-admin-editor-style', $this->theme_url . '/assets/styles/admin-editor' . (sht_theme()->debug ? '' : '.min') . '.css', ['wp-edit-blocks'], filemtime($this->theme_path . '/assets/styles/admin-editor' . (sht_theme()->debug ? '' : '.min') . '.css'));
		wp_enqueue_style('sht-admin-style', $this->theme_url . '/assets/styles/admin' . (sht_theme()->debug ? '' : '.min') . '.css', ['sht-admin-editor-style', 'wp-edit-blocks'], filemtime($this->theme_path . '/assets/styles/admin' . (sht_theme()->debug ? '' : '.min') . '.css'));
	}

	public function editorStyle()
	{
		if (file_exists($this->theme_path . '/assets/styles/admin-editor' . (sht_theme()->debug ? '' : '.min') . '.css')) {
			add_editor_style($this->theme_url . '/assets/styles/admin-editor' . (sht_theme()->debug ? '' : '.min') . '.css');
		}
	}

	public function loadFonts()
	{
		$theme_url = str_replace(get_home_url(), '', get_template_directory_uri());
		$theme_path = get_template_directory();
		$font_name = sanitize_title(sht_theme()->name) . '-font-' . $this->font_version;

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