function resizeApp () {
	'use strict';

	let game_ratio = 360 / 640;

	let div = document.getElementById('phaser-app');
	div.style.width = (window.innerHeight * game_ratio) + 'px';
	div.style.height = window.innerHeight + 'px';

	let canvas = document.getElementsByTagName('canvas')[0];

	let dpi_w = (parseInt(div.style.width) / canvas.width)
	let dpi_h = (parseInt(div.style.height) / canvas.height)

	let height = window.innerHeight * (dpi_w / dpi_h);
	let width = height * game_ratio;

	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px'
}

function runApp() {
	'use strict';

	let app = new App();
	app.start();

	window.addEventListener('resize', resizeApp)
	resizeApp();
}

window.onload = function () {
	'use strict'

	try {
		eval('let i = 0;');
		eval('const _dev = true;');
	}
	catch(e) {
		alert('This browser is not supported.')
		return false
	}

	runApp();
}