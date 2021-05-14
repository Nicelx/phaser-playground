import tile from './assets/mossyCavern/tiles.png'

export const movingTileset = () => {
	const phaserConfig = {
		type: Phaser.AUTO,
		parent: "game",
		width: 12800,
		height: 7200,
		backgroundColor: "#5DACD8",
		scene: {
			init: initScene,
			preload: preloadScene,
			create: createScene,
			update: updateScene
		}
	};
	
	const game = new Phaser.Game(phaserConfig);
	
	var cloudsWhite, cloudsWhiteSmall;
	
	function initScene() { }
	function preloadScene() {
		this.load.image("clouds-white", tile);
		console.log(tile)
    	this.load.image("clouds-white-small", tile);
	}
	function createScene() {
		cloudsWhite = this.add.tileSprite(640, 200, 1280, 400, "clouds-white");
    	// cloudsWhiteSmall = this.add.tileSprite(640, 200, 1280, 400, "clouds-white-small");
	}
	function updateScene() {}
}

