<?php

namespace SayHello\Theme\Controller;

/**
 * Registering menus
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Navigation
{

	public function run()
	{
		add_action('after_setup_theme', [$this, 'themeSupport']);
	}

	public function themeSupport()
	{
		// Translated here rather than in the constructor, which runs before after_setup_theme.
		register_nav_menus([
			'primary' => _x('Primary', 'Menu navigation label', 'sha'),
			'mobile' => _x('Mobile', 'Menu navigation label', 'sha'),
		]);
	}
}
