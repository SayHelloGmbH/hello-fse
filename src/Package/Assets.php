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
}
