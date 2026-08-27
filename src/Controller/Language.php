<?php

namespace SayHello\Theme\Controller;

/**
 * Multilingual stuff and translations
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Language
{

	public function run():void
	{
		add_action('after_setup_theme', [$this, 'loadTranslations']);
		add_action('enqueue_block_assets', [$this, 'loadScriptTranslations']);
	}

	/**
	 * Load the translation files which are delivered with the Theme
	 * Other files - stored in wp-content/languages - are loaded automatically.
	 *
	 * @return void
	 */
	public function loadTranslations():void
	{
		load_theme_textdomain('sht', get_template_directory() . '/languages'); // Textdomain Frontend
		load_theme_textdomain('sha', get_template_directory() . '/languages'); // Textdomain Admin
	}

	/**
	 * Set the translations for the block editor script
	 *
	 * @return void
	 */
	public function setScriptTranslations():void
	{
		wp_set_script_translations('sht-block-editor-script', 'sht', get_template_directory() . '/languages');
	}
}
