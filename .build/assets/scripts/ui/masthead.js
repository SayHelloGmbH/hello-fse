const masthead = document.querySelector('.c-masthead');

if (masthead) {
	const height = () => {
		document.documentElement.style.setProperty('--masthead--height', masthead.offsetHeight - 1 + 'px');
	};

	height();
	window.addEventListener('resize', height);
	window.addEventListener('orientationchange', height);
} else {
	console.warn('No .c-masthead available. This script is not needed.');
}
