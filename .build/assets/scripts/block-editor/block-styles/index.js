import domReady from '@wordpress/dom-ready';
import { registerBlockStyle, unregisterBlockStyle } from '@wordpress/blocks';

domReady(() => {
	// registerBlockStyle('core/heading', {
	// 	name: 'special',
	// 	label: 'Special',
	// });

	unregisterBlockStyle('core/image', 'default');
	unregisterBlockStyle('core/image', 'rounded');
	unregisterBlockStyle('core/separator', 'wide');
});
