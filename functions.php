<?php

namespace SayHello\Theme;

if (!defined('DISALLOW_FILE_EDIT')) {
	define('DISALLOW_FILE_EDIT', true);
}

spl_autoload_register(function ($class) {
	$prefix = 'SayHello\\Theme\\';

	$base_dir = __DIR__ . '/src/';

	$len = strlen($prefix);
	if (strncmp($prefix, $class, $len) !== 0) {
		return;
	}

	$relative_class = substr($class, $len);

	$file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

	if (file_exists($file)) {
		require $file;
	}
});

$controller_assets = new Controller\Assets();
$controller_assets->run();

$controller_block_editor = new Controller\BlockEditor();
$controller_block_editor->run();

$controller_language = new Controller\Language();
$controller_language->run();
