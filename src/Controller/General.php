<?php

namespace SayHello\Theme\Controller;

/**
 * Generic stuff which doesn't fit elsewhere
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class General
{
	public function run()
	{
		add_action('after_setup_theme', [$this, 'themeSupports']);
	}

	/**
	 * Allow the Theme to use additional core features
	 */
	public function themeSupports()
	{
		add_theme_support('automatic-feed-links');
		add_theme_support('html5', ['comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'style', 'script']);
		add_theme_support('post-thumbnails', ['post']);
		add_theme_support('title-tag');
	}
}
