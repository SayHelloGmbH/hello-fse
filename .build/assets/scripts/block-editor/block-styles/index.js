import domReady from '@wordpress/dom-ready';
import { unregisterBlockStyle } from '@wordpress/blocks';

import '@wordpress/edit-post';
import '@wordpress/edit-site';

domReady(() => {
	unregisterBlockStyle('core/image', 'default');
	unregisterBlockStyle('core/image', 'rounded');
	unregisterBlockStyle('core/separator', 'wide');
	unregisterBlockStyle('core/separator', 'dots');
});
