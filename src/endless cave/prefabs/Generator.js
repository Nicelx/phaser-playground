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
				x = (tx * this.CONFIG.tile )+ this.CONFIG.map_offset;
				y = (ty * this.CONFIG.tile);
				
				

				spr = this.ctx.add.sprite(x, y, 'tileset');

				spr.setOrigin(0);
				spr.setDepth(this.DEPTH.floor);

				floor[ty][tx] = spr;
			}
		}

		this.layers.floor = floor;
	}

	scrollFloor() {
		let offset = this.ctx.cameras.main.scrollY - this.layers.floor[0][0].y;

		if (offset >= this.CONFIG.tile) {
			this.destroyFloorRow()
			this.appendFloorRow();
		}
	}

	destroyFloorRow() {
		for (let tx = 0; tx < this.layers.floor[0].length; tx++) {
			this.layers.floor[0][tx].destroy();
		}

		this.layers.floor.splice(0,1);
	}

	appendFloorRow() {
		let x;
		let spr;

		let ty = this.layers.floor.length;
		let y = this.layers.floor[ty -1][0].y + this.CONFIG.tile;

		this.layers.floor.push([])

		for (let tx = 0; tx < this.cols; tx++) {
			x = (tx * this.CONFIG.tile) + this.CONFIG.map_offset;

			spr = this.ctx.add.sprite(x,y,'tileset');
			spr.setOrigin(0);
			spr.setDepth(this.DEPTH.floor);

			this.layers.floor[ty][tx] = spr;
		}		
	}
}