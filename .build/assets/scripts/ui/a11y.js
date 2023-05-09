const check_class = 'c-body--no-outline';
const body = document.body;

body.classList.add(check_class);

window.addEventListener('keydown', (event) => {
	if (event.key.toLowerCase() === 'tab') {
		body.classList.remove(check_class);
	}
});

window.addEventListener('mousemove', () => {
	body.classList.add(check_class);
});
