class GameOver extends Phaser.Scene {
	constructor() {
		super({ key: "GameOver", active: false });
	}
	init(data) {
		this.score = data.score;

		this.CONFIG = this.sys.game.CONFIG;

		this.helper = new Helper();
	}
	create() {
		let x = this.CONFIG.tile;
		let w = this.CONFIG.width - 2 * x;

		let h = 296;
		let y = 148;

		this.background = this.add.graphics({ x, y });
		this.background.fillStyle("0x302C2E", 1);
		this.background.fillRoundedRect(0, 0, w, h, 15);

		this.title = new Text(this, x + 0.5 * w, 207, "Game Over", "title");
		this.txt_score = new Text(
			this,
			x + 0.5 * w,
			y + 0.5 * h,
			"Distance: " + this.score,
			"title"
		);
		this.createAllButtons(x, y, w, h);
	}

	createAllButtons(x, y, w, h) {
		this.btn_menu = this.createButton(x + 0.25 * w, y + 0.85 * h, this.clickMenu);
		this.lbl_menu = new Text(
			this,
			this.btn_menu.getData("centerX"),
			this.btn_menu.getData("centerY"),
			"Menu",
			"standart"
		);

		this.btn_again = this.createButton(x + 0.75 * w, y + 0.85 * h, this.clickTryAgain);
		this.lbl_again = new Text(
			this,
			this.btn_again.getData("centerX"),
			this.btn_again.getData("centerY"),
			"Try Again",
			"standart"
		);
	}

	createButton(centerX, centerY, callback) {
		let w = 4.5 * this.CONFIG.tile;
		let h = 2* this.CONFIG.tile;
		let r = 10;

		let x = centerX - 0.5*w;
		let y = centerY - 0.5 * h;

		let btn = this.add.graphics({x, y})

		btn.fillStyle('0x39314B', 1);
		btn.fillRoundedRect(0,0,w,h,r);

		btn.setDataEnabled();
		btn.setData('centerX', centerX);
		btn.setData('centerY', centerY);

		let hit_area = new Phaser.Geom.Rectangle(0,0,w,h);
		btn.setInteractive(hit_area, Phaser.Geom.Rectangle.Contains);

		btn.myDownCllbck = () => {
			btn.clear();
			btn.fillStyle('0x827094', 1);
			btn.fillRoundedRect(0,0,w,h,r);
		}
		btn.myOutCllbck = () => {
			btn.clear();
			btn.fillStyle('0x39314B', 1);
			btn.fillRoundedRect(0,0,w,h,r);
		}

		btn.on('pointerup' , callback, this)
		btn.on('pointerdown' , btn.myDownCllbck, this)
		btn.on('pointerout' , btn.myOutCllbck, this)

		return btn
	}

	clickMenu() {
		this.events.emit('clickMenu')
	}

	clickTryAgain() {
		this.events.emit('clickTryAgain')
	}
}
