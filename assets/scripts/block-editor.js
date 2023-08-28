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

/***/ }),

/***/ 184:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


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

;// CONCATENATED MODULE: external ["wp","i18n"]
var external_wp_i18n_namespaceObject = window["wp"]["i18n"];
;// CONCATENATED MODULE: external ["wp","hooks"]
var external_wp_hooks_namespaceObject = window["wp"]["hooks"];
;// CONCATENATED MODULE: external ["wp","element"]
var external_wp_element_namespaceObject = window["wp"]["element"];
;// CONCATENATED MODULE: external ["wp","compose"]
var external_wp_compose_namespaceObject = window["wp"]["compose"];
;// CONCATENATED MODULE: external ["wp","components"]
var external_wp_components_namespaceObject = window["wp"]["components"];
;// CONCATENATED MODULE: external ["wp","blockEditor"]
var external_wp_blockEditor_namespaceObject = window["wp"]["blockEditor"];
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
;// CONCATENATED MODULE: ./.build/assets/scripts/block-editor/block-filter/visibility/index.js
/**
 * Add visibility toggle to Core Blocks, so that Blocks can be hidden per breakpoint
 * Thanks Jeffrey Carandang
 * https://jeffreycarandang.com/extending-gutenberg-core-blocks-with-custom-attributes-and-controls/
 *
 * Current version mark@sayhello.ch 16.3.2022
 */









/**
 * Restrict to specific blocks
 */
const allowedBlocks = ['core/group', 'core/columns', 'core/column', 'sht/menu-toggler'];

/**
 * Add custom attributes for mobile visibility.
 */
(0,external_wp_hooks_namespaceObject.addFilter)('blocks.registerBlockType', 'sht/custom-attributes', settings => {
  if (!allowedBlocks.includes(settings.name)) {
    return settings;
  }
  return lodash.assign({}, settings, {
    attributes: lodash.assign({}, settings.attributes, {
      hiddenForMobile: {
        type: 'boolean',
        default: false
      },
      hiddenForTablet: {
        type: 'boolean',
        default: false
      },
      hiddenForDesktop: {
        type: 'boolean',
        default: false
      }
    })
  });
});

/**
 * Add visibility controls as block panel.
 */
(0,external_wp_hooks_namespaceObject.addFilter)('editor.BlockEdit', 'sht/custom-advanced-control', (0,external_wp_compose_namespaceObject.createHigherOrderComponent)(BlockEdit => {
  return props => {
    const {
      name,
      attributes,
      setAttributes,
      isSelected
    } = props;
    const {
      hiddenForMobile,
      hiddenForTablet,
      hiddenForDesktop
    } = attributes;
    if (!isSelected || !allowedBlocks.includes(name)) {
      return /*#__PURE__*/React.createElement(BlockEdit, props);
    }
    return /*#__PURE__*/React.createElement(external_wp_element_namespaceObject.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), /*#__PURE__*/React.createElement(external_wp_blockEditor_namespaceObject.InspectorControls, null, /*#__PURE__*/React.createElement(external_wp_components_namespaceObject.PanelBody, {
      title: (0,external_wp_i18n_namespaceObject.__)('Sichtbarkeit', 'sht'),
      initialOpen: true
    }, /*#__PURE__*/React.createElement(external_wp_components_namespaceObject.ToggleControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Auf Mobilgeräte verstecken'),
      checked: !!hiddenForMobile,
      onChange: () => setAttributes({
        hiddenForMobile: !hiddenForMobile
      }),
      help: !!hiddenForMobile ? (0,external_wp_i18n_namespaceObject.__)('Dieser Block ist versteckt auf Mobilgeräte.', 'sha') : ''
    }), /*#__PURE__*/React.createElement(external_wp_components_namespaceObject.ToggleControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Auf Tabletts verstecken'),
      checked: !!hiddenForTablet,
      onChange: () => setAttributes({
        hiddenForTablet: !hiddenForTablet
      }),
      help: !!hiddenForTablet ? (0,external_wp_i18n_namespaceObject.__)('Dieser Block ist versteckt auf Tabletts.', 'sha') : ''
    }), /*#__PURE__*/React.createElement(external_wp_components_namespaceObject.ToggleControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Auf Desktopcomputer verstecken'),
      checked: !!hiddenForDesktop,
      onChange: () => setAttributes({
        hiddenForDesktop: !hiddenForDesktop
      }),
      help: !!hiddenForDesktop ? (0,external_wp_i18n_namespaceObject.__)('Dieser Block ist versteckt auf Desktopcomputer.', 'sha') : ''
    }))));
  };
}));

/**
 * Add custom element class in save context.
 */
(0,external_wp_hooks_namespaceObject.addFilter)('blocks.getSaveContent.extraProps', 'sht/applyExtraClass', (extraProps, blockType, attributes) => {
  const {
    hiddenForMobile,
    hiddenForTablet,
    hiddenForDesktop
  } = attributes;
  if (!allowedBlocks.includes(blockType.name)) {
    return extraProps;
  }
  if (!!hiddenForMobile) {
    extraProps.className = classnames_default()(extraProps.className, 'is-hidden-for--mobile');
  }
  if (!!hiddenForTablet) {
    extraProps.className = classnames_default()(extraProps.className, 'is-hidden-for--tablet');
  }
  if (!!hiddenForDesktop) {
    extraProps.className = classnames_default()(extraProps.className, 'is-hidden-for--desktop');
  }
  return extraProps;
});
;// CONCATENATED MODULE: ./.build/assets/scripts/block-editor/block-filter/index.js

;// CONCATENATED MODULE: external ["wp","domReady"]
var external_wp_domReady_namespaceObject = window["wp"]["domReady"];
var external_wp_domReady_default = /*#__PURE__*/__webpack_require__.n(external_wp_domReady_namespaceObject);
;// CONCATENATED MODULE: external ["wp","blocks"]
var external_wp_blocks_namespaceObject = window["wp"]["blocks"];
;// CONCATENATED MODULE: ./.build/assets/scripts/block-editor/block-styles/index.js


external_wp_domReady_default()(() => {
  (0,external_wp_blocks_namespaceObject.registerBlockStyle)('core/heading', {
    name: 'special',
    label: 'Special'
  });
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