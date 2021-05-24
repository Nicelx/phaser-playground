class Play extends Phaser.Scene {
	constructor() {
		super({key: 'Play', active: false})
	}

	init() {
		this.CONFIG = this.sys.game.CONFIG;

		this.DEPTH = {
			floor:0
		}

		this.generator = new Generator(this)

		this.allow_input = false;
		this.is_pause = false;
		this.is_gameover = false;

	}

	create() {
		this.generator.setup();
	}

	update() {
		this.updateCamera();

		this.generator.update();
	}

	updateCamera() {

	}

	setCamSpeed() {
		
	}
}