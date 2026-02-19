<?php

namespace SayHello\Theme\Controller;

/**
 * Assets (CSS, JavaScript etc)
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Assets
{

	/**
	 * Runs the controller
	 *
	 * @return void
	 */
	public function run(): void
	{
		add_action('enqueue_block_assets', [$this, 'registerFrontendAssets']);
	}

	/**
	 * Registers assets for the frontend only
	 *
	 * @return void
	 */
	public function registerFrontendAssets(): void
	{

		if (!is_user_logged_in()) {
			wp_deregister_style('dashicons');
		}

		if (is_admin()) {
			return;
		}

		$min = defined('WP_DEBUG') && WP_DEBUG === false;

		// CSS. Make sure that the block library CSS is loaded first.
		$deps = ['wp-block-library'];

		wp_enqueue_style('sht-style', get_template_directory_uri() . '/assets/styles/ui' . ($min ? '.min' : '') . '.css', $deps, filemtime(get_template_directory() . '/assets/styles/ui' . ($min ? '.min' : '') . '.css'));

		// Javascript
		$deps = [];

		// Javascript is always minified.
		wp_enqueue_script('sht-script', get_template_directory_uri() . '/assets/scripts/ui.js', $deps, filemtime(get_template_directory() . '/assets/scripts/ui.js'), true);
		wp_localize_script('sht-script', 'sht_theme', [
			'directory_uri' => get_template_directory_uri(),
			'version' => wp_get_theme()->get('Version'),
			'environment' => wp_get_environment_type(),
		]);
	}
}
