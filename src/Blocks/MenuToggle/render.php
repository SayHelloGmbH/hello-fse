<?php

$target_id = $attributes['target'] ?? '';
$classNameBase = wp_get_block_default_classname($block->name);
$color_class = $attributes['textColor'] ?? '';
$color_class = !empty($color_class) ? ' has-text-color has-' . $color_class . '-color' : '';

?>

<button class="<?php echo $classNameBase . $color_class; ?>" aria-controls="<?php echo $target_id; ?>" data-root-style="is--mobilemenu--open">
	<span class="<?php echo $classNameBase; ?>__line <?php echo $classNameBase; ?>__line--1"></span>
	<span class="<?php echo $classNameBase; ?>__line <?php echo $classNameBase; ?>__line--2"></span>
	<span class="<?php echo $classNameBase; ?>__line <?php echo $classNameBase; ?>__line--2"></span>
	<span class="<?php echo $classNameBase; ?>__text screen-reader-text"></span>
</button>
