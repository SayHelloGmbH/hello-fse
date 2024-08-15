<?php

namespace SayHello\Theme\Controller;

/**
 * Assets (CSS, JavaScript etc)
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Assets
{

	public function run()
	{
		add_action('wp_enqueue_scripts', [$this, 'registerAssets']);
	}

	/**
	 * Registers assets for the frontend only
	 *
	 * @return void
	 */
	public function registerAssets()
	{

		if (!is_user_logged_in()) {
			wp_deregister_style('dashicons');
		}

		$min = defined('WP_DEBUG') && WP_DEBUG === false;

		// CSS. Make sure that the block library CSS is loaded first.
		$deps = ['wp-block-library'];

		wp_enqueue_style('sht-style', get_template_directory_uri() . '/assets/styles/ui' . ($min ? '.min' : '') . '.css', $deps, filemtime(get_template_directory() . '/assets/styles/ui' . ($min ? '.min' : '') . '.css'));

		// Javascript
		$deps = [];

		wp_enqueue_script('sht-script', get_template_directory_uri() . '/assets/scripts/ui' . ($min ? '.min' : '') . '.js', $deps, filemtime(get_template_directory() . '/assets/scripts/ui' . ($min ? '.min' : '') . '.js'), true);
		wp_localize_script('sht-script', 'sht_theme', [
			'directory_uri' => get_template_directory_uri(),
			'version' => wp_get_theme()->get('Version')
		]);
	}
}
