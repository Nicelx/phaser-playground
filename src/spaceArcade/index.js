


let background;
class scene extends Phaser.Scene{
    constructor(){
        super("scene");
    }
	state = {
		
	}

	init() {

	}
	preload() {
		this.load.image('background', '../assets/Wasteland_Sky.png')

	}
	create() {
		background = this.add.tileSprite(0, 0, 512,256, 'background').setOrigin(0).setScale(2);
	}
	update() {

	}
}
window.onload = function() {
	const config = {
		width: 1024,
		height: 512,
		type: Phaser.AUTO,
		parent: 'game',
		physics: {
			default: 'arcade',
			arcade: {
				debug: true
			}
		},
		scene: scene
	};

	game = new Phaser.Game(config);
}
