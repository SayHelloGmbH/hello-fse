<?php

namespace SayHello\Theme\Package;

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

		$theme_json = json_decode(file_get_contents(get_theme_file_path('theme.json')), true);

		if ((int) ($theme_json['settings']['layout']['wideSize'] ?? false)) {
			$this->wide_size = (int) $theme_json['settings']['layout']['wideSize'];
		}

		add_action('after_setup_theme', [$this, 'addImageSizes']);
		add_filter('image_size_names_choose', [$this, 'selectableImageSizes']);
		add_filter('post_thumbnail_size', [$this, 'fixPostThumbnailSize']);
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
		$sizes['gutenberg_full'] = _x('Gestamte breite', 'Custom selectable image size', 'sht');

		if ((int) $this->wide_size) {
			$sizes['gutenberg_wide'] = _x('Weite Breite', 'Custom selectable image size', 'sht');
		}

		return $sizes;
	}

	/**
	 * WordPress Core returns the wrong image size when using “post-thumbnail"
	 * as a keyword. This is a temporary workaround until the fix detailed in
	 * https://core.trac.wordpress.org/ticket/17262 lands.
	 *
	 * @param string $size
	 * @return string
	 */
	public function fixPostThumbnailSize(string $size)
	{
		if ($size === 'post-thumbnail') {
			return 'thumbnail';
		}

		return $size;
	}
}
