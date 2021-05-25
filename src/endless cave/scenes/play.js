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

		this.cam_speed = {
			base : 1,
			current: 1,
			max: 1
		}

	}

	create() {
		this.generator.setup();
	}

	update() {
		this.updateCamera();

		this.generator.update();
	}

	updateCamera() {
		this.cameras.main.setScroll(0, this.cameras.main.scrollY + this.cam_speed.current)
	}

	setCamSpeed(speed) {
		this.cam_speed.base = speed;
		this.cam_speed.current = speed;

		this.cam_speed.current = Math.min(
			this.cam_speed.current,
			this.cam_speed.max)

		this.cam_speed.current = Math.max(
			this.cam_speed.current,
			0
		)
	}

}