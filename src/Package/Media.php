<?php

namespace SayHello\Theme\Package;

use WP_Theme_JSON_Resolver;

/**
 * Everything to do with images, videos etc
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Media
{

	private $wide_size;

	public function run()
	{

		$tree = WP_Theme_JSON_Resolver::get_merged_data();
		$data = _wp_array_get($tree->get_settings(), array('layout'));

		if (!empty($data['wideSize'] ?? [])) {
			$this->wide_size = (int) $data['wideSize'];
		}

		add_action('after_setup_theme', [$this, 'addImageSizes']);
		add_filter('image_size_names_choose', [$this, 'selectableImageSizes']);
	}

	/**
	 * Add image sizes which will be used when uploading images
	 * wideSize is read in from theme.json.
	 *
	 * @return void
	 */
	public function addImageSizes()
	{
		add_image_size('gutenberg_full', 2560, 9999);

		if ((int) $this->wide_size) {
			add_image_size('gutenberg_wide', $this->wide_size, 9999);
		}
	}

	/**
	 * Additional selectable image sizes for image size
	 * selector in e.g. image block
	 *
	 * @param array $sizes
	 * @return array
	 */
	public function selectableImageSizes($sizes)
	{
		$sizes['gutenberg_full'] = _x('Gutenberg voll', 'Custom selectable image size', 'sht');

		if ((int) $this->wide_size) {
			$sizes['gutenberg_wide'] = _x('Gutenberg breit', 'Custom selectable image size', 'sht');
		}

		return $sizes;
	}
}
