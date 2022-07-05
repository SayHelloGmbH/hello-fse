const masthead = document.querySelector('.c-masthead'),
	height = () => {
		document.documentElement.style.setProperty(
			'--masthead--height',
			masthead.offsetHeight - 1 + 'px'
		);
	};

height();
window.addEventListener('resize', height);
window.addEventListener('orientationchange', height);
