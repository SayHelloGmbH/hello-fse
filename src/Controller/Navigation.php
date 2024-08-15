<?php

namespace SayHello\Theme\Controller;

/**
 * Registering menus
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Navigation
{

	private $menus;

	public function __construct()
	{
		$this->menus = [
			'primary' => _x('Primary', 'Menu navigation label', 'sha'),
			'mobile' => _x('Mobile', 'Menu navigation label', 'sha'),
		];
	}

	public function run()
	{
		add_action('after_setup_theme', [$this, 'themeSupport']);
	}

	public function themeSupport()
	{
		add_theme_support('menu');
		register_nav_menus($this->menus);
	}
}
