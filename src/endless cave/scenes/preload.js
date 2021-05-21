class Preload extends Phaser.Scene {
	constructor() {
		super({ key: "Preload", active: false });
	}

	init() {
		this.URL = this.sys.game.URL;
		this.CONFIG = this.sys.game.CONFIG;
	}

	preload() {
		this.createLoadingBar();
		// this.load.setPath("../assets/");
		this.load.setPath("assets/img/");
		this.load.spritesheet("spr-hero", "hero.png", {
			frameWidth: 16,
			frameHeight: 16,
			endFrame: 4,
			margin: 1,
			spacing: 2,
		});

		// this.load.spritesheet("spr-slime", "spritesheet.png", );
		// this.load.spritesheet("spr-spider", "spritesheet.png", );
	}

	create() {
		this.time.addEvent({
			delay: 1000,
			callback: () => {this.scene.start("Menu");},
			callbackScope:this
		});
		
	}

	createLoadingBar() {
		this.title = new Text(
			this,
			this.CONFIG.centerX,
			75,
			'Loading Game',
			'preload',
			0.5
		);

		this.txt_progress = new Text(
			this,
			this.CONFIG.centerX,
			this.CONFIG.centerY - 5,
			'Loading...',
			'preload',
			{x:0.5, y:1}
		);

		let x = 10;
		let y = this.CONFIG.centerY + 5; 
		

		this.progress = this.add.graphics({x:x, y:y})
		this.border = this.add.graphics({x,y});
		

		this.load.on('progress', this.onProgress, this);
	}

	onProgress(val) {
		let w = this.CONFIG.width - 2*this.progress.x;
		let h = 18;

		this.progress.clear();
		this.progress.fillStyle('0xFFFFFF', 1);
		this.progress.fillRect(0,0,w * val, h);

		this.border.clear();
		this.border.lineStyle(2, '0x4D6592', 1);
		this.border.strokeRect(0,0,w*val, h )

		this.txt_progress.setText(Math.round(val*100) + '%');
	}
}
