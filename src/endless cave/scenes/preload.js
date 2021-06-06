class Preload extends Phaser.Scene {
	constructor() {
		super({ key: "Preload", active: false });
	}

	init() {
		this.URL = this.sys.game.URL;
		this.CONFIG = this.sys.game.CONFIG;
	}

	preload() {

		this.bg = this.add.graphics({x:0, y:0})
		this.bg.fillStyle('0xF4CCA1', 1);
		this.bg.fillRect(0,0,this.CONFIG.width, this.CONFIG.height)

		this.createLoadingBar();
		// this.load.setPath("../assets/");
		this.load.setPath("assets/img/");
		
		this.load.spritesheet('tileset', 'sprites.png', {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 9,
			endFrame: 10
		});

		this.load.spritesheet('ui', 'ui.png', {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 1
		})
		
		this.load.spritesheet("spr-hero", "sprites.png", {
			start: 0,
			endFrame: 8,
			frameWidth: 32,
			frameHeight: 32
		});
		

		// this.load.spritesheet("spr-slime", "spritesheet.png", );
		// this.load.spritesheet("spr-spider", "spritesheet.png", );
	}

	create() {

		this.createAllAnims();

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
		let h = 36;

		this.progress.clear();
		this.progress.fillStyle('0xFFFFFF', 1);
		this.progress.fillRect(0,0,w * val, h);

		this.border.clear();
		this.border.lineStyle(4, '0x4D6592', 1);
		this.border.strokeRect(0,0,w*val, h )

		this.txt_progress.setText(Math.round(val*100) + '%');
	}

	createAllAnims() {
		this.anims.create({
			key: 'spr-hero-walk',
			frames : this.anims.generateFrameNames('spr-hero', { 
				frames: [0,1,2,3]	
			}),
			repeat: -1,
			frameRate : 12
		})
		// this.anims.create({
		// 	key: 'spr-hero-dead',
		// 	frames : this.anims.generateFrameNames('spr-hero', { 
		// 		// frames: [0,1,0,2]	
		// 		frames: [8,9,10]	
		// 	}),
		// 	repeat: -1,
		// 	frameRate : 12
		// })

		this.anims.create({
			key: 'spr-slime-walk',
			frames : this.anims.generateFrameNames('spr-slime', { 
				frames: [0,1,0,2]	
			}),
			repeat: -1,
			frameRate : 12
		})

		this.anims.create({
			key: 'spr-spider-walk',
			frames : this.anims.generateFrameNames('spr-spider', { 
				frames: [0,1,0,2]	
			}),
			repeat: -1,
			frameRate : 12
		})
	}

}
