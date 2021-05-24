class Generator{
	constructor(ctx) {
		this.CONFIG = ctx.CONFIG;
		this.DEPTH = ctx.DEPTH;

		this.ctx = ctx;

		this.cols = 11;
		this.rows = 20;

		this.layers = {
			floor: [],
			walls:[],
			monsters: [],
			pickups: [],
			turrets: [],
			overlay: false
		}
	}
	setup() {
		this.createFloor();
	}

	update() {
		this.scrollFloor();
	}

	createFloor() {
		let x;
		let y;
		let spr;

		let cols = this.cols;
		let rows = this.rows + 1;

		let floor = [];

		for (let ty = 0; ty< rows; ty++) {
			floor[ty] = [];

			for (let tx = 0; tx < cols; tx++) {
				x = (tx * this.CONFIG.tile);
				y = (ty * this.CONFIG.tile);
				
				spr = this.ctx.add.sprite(x, y, 'tileset');
				// spr = this.ctx.add.sprite(250, y, 'tileset');
				spr.setOrigin(0);
				spr.setDepth(this.DEPTH.floor);

				floor[ty][tx] = spr;
			}
		}

		this.layers.floor = floor;
	}

	scrollFloor() {

	}

	destroyFloorRow() {

	}

	appendFloorRow() {

	}
}