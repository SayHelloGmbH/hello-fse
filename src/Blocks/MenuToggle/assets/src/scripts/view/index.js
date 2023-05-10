/**
 * This script sets the initial state for the menu toggle buttons.
 * The click handling is managed by the main aria-toggler script.
 */

document.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll('.wp-block-sht-menu-toggle');
	buttons.forEach((button) => {
		button.setAttribute('aria-expanded', 'false');
	});
});
