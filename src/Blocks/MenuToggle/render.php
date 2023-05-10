<?php

$target_id = $attributes['target'] ?? '';
$classNameBase = wp_get_block_default_classname($block->name);

?>

<button class="<?php echo $classNameBase; ?>" aria-controls="<?php echo $target_id; ?>" data-root-style="is--mobilemenu--open">
	<span class="<?php echo $classNameBase; ?>__line <?php echo $classNameBase; ?>__line--1"></span>
	<span class="<?php echo $classNameBase; ?>__line <?php echo $classNameBase; ?>__line--2"></span>
	<span class="<?php echo $classNameBase; ?>__line <?php echo $classNameBase; ?>__line--2"></span>
	<span class="<?php echo $classNameBase; ?>__text screen-reader-text"></span>
</button>
