import tile from './assets/Wasteland_Sky.png'

export const movingTileset = () => {
	const phaserConfig = {
		type: Phaser.AUTO,
		parent: "game",
		width: 1280,
		height: 720,
		backgroundColor: "#5DACD8",
		scene: {
			init: initScene,
			preload: preloadScene,
			create: createScene,
			update: updateScene
		}
	};
	
	const game = new Phaser.Game(phaserConfig);
	
	var sky, cloudsWhiteSmall;
	
	function initScene() { }
	function preloadScene() {
		this.load.image("sky", tile);
    	this.load.image("clouds-white-small", tile);
	}
	function createScene() {
		sky = this.add.tileSprite(600,400, 512, 256, "sky");
    	// cloudsWhiteSmall = this.add.tileSprite(640, 200, 1280, 400, "clouds-white-small");
	}
	function updateScene() {
		sky.tilePositionX += 0.3;
	}
}

