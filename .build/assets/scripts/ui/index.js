// import { c, color, theme, is_mobile } from './modules/settings.js';
// import './modules/settings';
import './_polyfill';
import './a11y';
import './aria-toggler';

console.log('%cDeveloped by', 'font-style: italic; font-size: 12px;');
console.log(
	'%cSay Hello GmbH',
	'font-weight: bold; color: #000; font-size: 16px;'
);
console.log('%chttps://sayhello.ch', 'color: #000; font-size: 12px;');

// Load script if svh is not supported natively
if (!CSS.supports || !CSS.supports('height', '1svh')) {
	let script = document.createElement('script');
	script.setAttribute(
		'src',
		`${sht_theme.directory_uri}/assets/scripts/svh.min.js?version=${sht_theme.version}`
	);
	document.head.appendChild(script);
}
