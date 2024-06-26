<?php

use SayHello\Theme\Package\BlockEditor as BlockEditorController;

if (!empty($attributes['textAlign'] ?? '')) {
	$text_align_class = esc_html("has-text-align-{$attributes['textAlign']}");
	if (!empty($attributes['className'] ?? '')) {
		$attributes['className'] = "{$attributes['className']} {$text_align_class}";
	} else {
		$attributes['className'] = $text_align_class;
	}
}

$block_editor_controller = new BlockEditorController();

if ($block_editor_controller->isContextEdit()) {
?>
	<h2>Archive title - search</h2>
<?php
} elseif (is_search()) {
	printf(
		'<h1 class="%s">%s</h1>',
		esc_html($attributes['className'] ?? ''),
		get_the_archive_title()
	);
}
