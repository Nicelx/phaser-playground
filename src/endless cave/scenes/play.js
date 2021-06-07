class Play extends Phaser.Scene {
	constructor() {
		super({ key: "Play", active: false });
	}

	init() {
		this.CONFIG = this.sys.game.CONFIG;

		this.DEPTH = {
			floor: 0,
			wall: 1,
			pickup: 2,
			monster: 3,

			player: 4,

			overlay: 5,
			ui: 6,
			menu: 7,
		};

		this.helper = new Helper();
		this.generator = new Generator(this, helper);

		this.allow_input = false;
		this.is_pause = false;
		this.is_gameover = false;

		this.is_holding = {
			left: false,
			right: false,
			direction: false,
		};

		this.cam_speed = {
			base: 1,
			current: 1,
			max: 1,
		};
	}

	create() {
		this.generator.setup();

		this.createPlayer();

		this.createControls();

		this.createUi();

		this.allow_input = true;
		this.is_pause = false;
		this.is_gameover = false;
	}

	update() {
		this.updateCamera();

		this.generator.update();

		this.player.update(this.is_holding.direction);

		this.score = this.player.ty;
		this.updateUi();

		if (this.player.states.dead) {
			this.triggerGameOver();
			return;
		}
	}

	createPlayer() {
		let center = this.helper.getTileCenter(5, 1, this.CONFIG.tile);

		this.player = new Player(this, center.x, center.y, "spr-hero");

		this.player.setDepth(this.DEPTH.player);

		this.player.startMoving();
	}

	triggerGameOver() {
		if (this.is_gameover) return;

		this.is_gameover = true;

		this.time.addEvent({
			delay: 1500,
			callback: this.goMenu,
			callbackScope: this,
		});
	}

	updateCamera() {
		this.cameras.main.setScroll(0, this.cameras.main.scrollY + this.cam_speed.current);

		let centerY = this.cameras.main.scrollY + 0.5 * this.cameras.main.height;

		if (this.player.y >= centerY) {
			this.cameras.main.setScroll(0, this.player.y - 0.5 * this.cameras.main.height);
		}
	}

	setCamSpeed(speed) {
		this.cam_speed.base = speed;
		this.cam_speed.current = speed;

		this.cam_speed.current = Math.min(this.cam_speed.current, this.cam_speed.max);

		this.cam_speed.current = Math.max(this.cam_speed.current, 0);
	}

	createControls() {
		let w = 0.45 * this.CONFIG.width;
		let h = this.CONFIG.height;

		this.zone_left = this.add.zone(0, 0, w, h);
		this.zone_left.setOrigin(0, 0);
		this.zone_left.setDepth(this.DEPTH.ui);
		this.zone_left.setScrollFactor(0);

		this.zone_right = this.add.zone(this.CONFIG.width, 0, w, h);
		this.zone_right.setOrigin(1, 0);
		this.zone_right.setDepth(this.DEPTH.ui);
		this.zone_right.setScrollFactor(0);

		// let debug = this.add.graphics({x:0, y: 0});
		// debug.fillStyle('0x000000', 0.5);
		// debug.fillRect(0,0,w,h);
		// debug.setScrollFactor(0);
		// debug.setDepth(this.DEPTH.ui);

		this.zone_left.setInteractive();
		this.zone_left.on("pointerdown", this.holdLeft, this);
		this.zone_left.on("pointerup", this.releaseLeft, this);
		this.zone_left.on("pointerout", this.releaseLeft, this);

		this.zone_right.setInteractive();
		this.zone_right.on("pointerdown", this.holdRight, this);
		this.zone_right.on("pointerup", this.releaseRight, this);
		this.zone_right.on("pointerout", this.releaseRight, this);
	}

	holdLeft() {
		if (!this.allow_input) return;
		if (this.is_pause || this.is_gameover) return;

		this.is_holding.left = true;
		this.is_holding.direction = "left";
	}

	holdRight() {
		if (!this.allow_input) return;
		if (this.is_pause || this.is_gameover) return;

		this.is_holding.right = true;
		this.is_holding.direction = "right";
	}

	releaseLeft() {
		this.is_holding.left = false;

		if (this.is_holding.right) {
			this.is_holding.direction = "right";
		} else {
			this.is_holding.direction = false;
		}
	}

	releaseRight() {
		this.is_holding.right = false;

		if (this.is_holding.left) {
			this.is_holding.direction = "left";
		} else {
			this.is_holding.direction = false;
		}
	}

	createUi() {
		this.bg_top = this.createUiBar(0, 0);
		this.bg_bot = this.createUiBar(0, this.CONFIG.height - this.CONFIG.tile);

		this.btn_pause = new Button(
			this, 32,32,'ui', this.clickPause
		)

		// this.btn_pause = this.add.sprite(32,32,'ui',1)
		this.btn_pause.setFrame(1);
		this.btn_pause.setDepth(this.DEPTH.menu);
		this.btn_pause.setScrollFactor(0);


		let icn;
		let x = Math.round(
			this.btn_pause.getTopRight().x + 2.5 * this.CONFIG.tile
		)
		let y = this.bg_top.getData('centerY');
		let step = Math.round(1.5 * this.CONFIG.tile);

		this.arr_hearts = [];

		for (let i = 0; i < this.player.health.total; i++ ) {
			icn = this.add.sprite(x + i*step, y, 'ui', 0);

			icn.setDepth(this.DEPTH.ui);
			icn.setScrollFactor(0);
			// icn.setFrame(0)

			this.arr_hearts.push(icn);
		}

		this.txt_score = new Text(
			this,
			this.bg_bot.getData('centerX'),
			this.bg_bot.getData('centerY'),
			'Distance: 0',
			'score'
		)

		this.txt_score.setDepth(this.DEPTH.ui);
		this.txt_score.setScrollFactor(0);

	}

	createUiBar(x, y) {
		let w = this.CONFIG.width;
		let h = this.CONFIG.tile;


		let bar = this.add.graphics({ x: x, y: y });

		bar.fillStyle("0x302C2E", 1);
		bar.fillRect(0, 0, w, h);
		bar.setDepth(this.DEPTH.ui);
		bar.setScrollFactor(0);

		bar.setDataEnabled();
		bar.setData("centerX", x + 0.5 * w);
		bar.setData("centerY", y + 0.5 * h);

		return bar;
	}

	updateUi() {
		if (!this.player) return;

		this.txt_score.setText('Distance: ' + this.score);

		let i = 0;
		this.arr_hearts.forEach(el => {
			i++

			if (i <= this.player.health.current) {
				el.setFrame(0);
			}
			else {
				el.setFrame(1);
			}
		})
	}


	clickPause() {

	}

	goMenu() {
		this.scene.start("Menu");
	}
}
