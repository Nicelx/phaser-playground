class Boot extends Phaser.Scene {
	constructor() {
		super({key: 'Boot', active: true})
	}

	init() {
		this.URL = this.sys.game.URL;
		this.CONFIG = this.sys.game.CONFIG;
	}

	preload() {
		this.load.setPath('assets/fonts')
		this.load.bitmapFont('ClickPixel', 'click-pixel.png', 'click-pixel.xml')
	}

	create() {
		this.scene.start('Preload')
	}
}