class Play extends Phaser.Scene {
	constructor() {
		super({key: 'Play', active: false})
	}

	init() {
		this.CONFIG = this.sys.game.CONFIG;

		this.DEPTH = {
			floor:0
		}

		this.allow_input = false;
		this.is_pause = false;
		this.is_gameover = false;

	}

	create() {

	}

	update() {

	}

	updateCamera() {

	}

	setCamSpeed() {
		
	}
}