<?php

if (!function_exists('denkbar_2022_support')) :
	function denkbar_2022_support()
	{
		add_theme_support('wp-block-styles');
		add_editor_style('style.css');
	}
	add_action('after_setup_theme', 'denkbar_2022_support');
endif;

/**
 * Enqueue scripts and styles.
 */
function denkbar_2022_scripts()
{
	// Enqueue theme stylesheet.
	wp_enqueue_style('sht-denkbar-2022-style', get_template_directory_uri() . '/style.css', array(), wp_get_theme()->get('Version'));
}

add_action('wp_enqueue_scripts', 'denkbar_2022_scripts');
