// import './modules/settings';
import './_polyfill';
import './a11y';
import './masthead';

console.log('%cDeveloped by', 'font-style: italic; font-size: 12px;');
console.log(
	'%cSay Hello GmbH',
	'font-weight: bold; color: #000; font-size: 16px;'
);
console.log('%chttps://sayhello.ch', 'color: #000; font-size: 12px;');

const conditionalLoadScript = (filename, condition) => {
	if (!!condition) {
		const min = sht_theme.debug ? '' : '.min';
		let script = document.createElement('script');
		script.setAttribute(
			'src',
			`${sht_theme.directory_uri}/assets/scripts/${filename}${min}.js?version=${sht_theme.version}`
		);
		document.head.appendChild(script);
	}
};

conditionalLoadScript('svh', !CSS.supports || !CSS.supports('height', '1svh'));
conditionalLoadScript(
	'aria-toggler',
	!!document.querySelectorAll(
		'[aria-controls]:not([data-standalone-controller])'
	).length
);
