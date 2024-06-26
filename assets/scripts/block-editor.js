/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 817:
/***/ (function() {

/**
 * Takes the post type and slug from the editor BODY class
 * and adds a custom class name to the .block-editor-writing-flow element
 *
 * Don't forget to extend the admin BODY class with the
 * admin_body_class hook in PHP.

add_filter('admin_body_class', 'my_admin_body_class');
function my_admin_body_class($classes)
{
	global $post;
	if ($post->post_type === 'block_area') {
		$classes .= ' post-type-'.$post->post_type;
	}
	return $classes;
}
 *
 * mark@sayhello.ch since 17.4.2020
 */

window.addEventListener('load', () => {
  let body_classes = document.querySelector('body').classList;
  if (body_classes.contains('wp-admin') && body_classes.contains('block-editor-page')) {
    const matches = document.querySelector('body').getAttribute('class').match(/post-type-([a-zA-Z_]+)--([a-zA-Z_]+)/);
    const domElement = document.querySelector('.block-editor-block-list__layout');
    if (matches && !!domElement) {
      const post_type = matches[1];
      domElement.classList.add(`block-editor-block-list__layout--${post_type}`);
    }
  }
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

;// CONCATENATED MODULE: external ["wp","domReady"]
var external_wp_domReady_namespaceObject = window["wp"]["domReady"];
var external_wp_domReady_default = /*#__PURE__*/__webpack_require__.n(external_wp_domReady_namespaceObject);
;// CONCATENATED MODULE: external ["wp","blocks"]
var external_wp_blocks_namespaceObject = window["wp"]["blocks"];
;// CONCATENATED MODULE: ./.build/assets/scripts/block-editor/block-styles/index.js


external_wp_domReady_default()(() => {
  // registerBlockStyle('core/heading', {
  // 	name: 'special',
  // 	label: 'Special',
  // });

  (0,external_wp_blocks_namespaceObject.unregisterBlockStyle)('core/image', 'default');
  (0,external_wp_blocks_namespaceObject.unregisterBlockStyle)('core/image', 'rounded');
  (0,external_wp_blocks_namespaceObject.unregisterBlockStyle)('core/separator', 'wide');
});
// EXTERNAL MODULE: ./.build/assets/scripts/block-editor/extend-styles-wrapper-class/index.js
var extend_styles_wrapper_class = __webpack_require__(817);
;// CONCATENATED MODULE: ./.build/assets/scripts/block-editor/index.js


}();
/******/ })()
;