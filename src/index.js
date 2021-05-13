import Phaser from 'phaser';
// import { getStarted } from './getStarted';

// getStarted();

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: {
		preload: preload,
		create: create,
	},
};

var game = new Phaser.Game(config);

// const preload = () => {
// 	this.load.image('tiles', './assets/mossyCavern/tiles.png')
// }
// const create = () => {
// 	this.add.image(400, 300, "tiles");
// }
function preload() {
	this.load.image('tiles', 'src/assets/mossyCavern/tiles.png')
}
function create() {
	this.add.image(400, 300, "tiles");
}
