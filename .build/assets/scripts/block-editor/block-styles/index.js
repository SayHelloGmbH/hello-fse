import domReady from '@wordpress/dom-ready';
import { unregisterBlockStyle } from '@wordpress/blocks';

domReady(() => {
	unregisterBlockStyle('core/image', 'default');
	unregisterBlockStyle('core/image', 'rounded');
	unregisterBlockStyle('core/separator', 'wide');
	unregisterBlockStyle('core/separator', 'dots');
});
