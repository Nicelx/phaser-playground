class Generator {
	constructor(ctx, helper) {
		this.CONFIG = ctx.CONFIG;
		this.DEPTH = ctx.DEPTH;

		this.ctx = ctx;

		this.helper = helper;

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

		this.frames = {
			floor : 12,
			walls: 11,
		}

		this.ty_offset = 0;
		this.px_offset = 0;

		this.height = 0;
	}
	setup() {
		this.createFloor();
		this.createRoomLayer();
	}

	update() {
		this.checkNewRoom();
		this.scrollFloor();
	}

	createRoomLayer() {
		let walls = this.generateWalls();

		walls = this.createWalls(walls);

		this.layers.walls = this.layers.walls.concat(walls);

		this.saveHeight();
	}

	checkNewRoom() {
		if (this.ctx.cameras.main.scrollY + this.ctx.cameras.main.height < this.height) {
			return
		}

		this.ty_offset =Math.floor(this.ctx.cameras.main.scrollY / this.CONFIG.tile);
		this.px_offset = this.ctx.cameras.main.scrollY;

		this.destroyPassedRows();

		this.createRoomLayer();
	}

	destroyPassedRows() {
		let row_num = Math.floor(this.px_offset / this.CONFIG.tile)

		for (let ty = 0; ty < row_num; ty++) {
			for (let tx = 0; tx<this.cols; tx++) {
				if (this.layers.walls[ty][tx].spr) {
					this.layers.walls[ty][tx].spr.destroy();
				}
			}
		}
	}

	saveHeight() {
		this.height = this.layers.walls.length * this.CONFIG.tile;
	}

	generateWalls() {
		let walls = [];

		for (let ty = 0; ty< 1.5 * this.rows; ty++){
			if (this.layers.walls.length + ty >= 5 &&  (ty+1) % 3 === 0) {
				walls.push(this.generateWallRow())
			}
			else {
				walls.push(this.generateEmptyRow(ty))
			}
		}
		return walls;
	}

	generateEmptyRow() {
		let row = [];

		for (let tx = 0; tx < this.cols; tx++) {
			row.push({
				tx: tx,
				is_wall: false
			})
		}
		return row;
	}

	generateWallRow() {
		let gaps = [];

		for (let i = 0; i< this.helper.getRandInt(1,2); i++) {
			gaps.push({
				idx: i,
				width: 2,
			})
		}

		let min = 1;
		let max = this.cols - gaps[0].width - 1;

		let tx = this.helper.getRandInt(min, max);

		gaps[0] = this.buildGap(tx, gaps[0].width);

		if (gaps[1]) {
			tx = this.helper.getRandInt(min, max);

			while (gaps[0].taken.indexOf(tx) >= 0) {
				tx = this.helper.getRandInt(min, max);
			}

			gaps[1] = this.buildGap(tx, gaps[1].width);
		}

		return this.buildRow(gaps);
	}

	buildGap(tx, width) {
		let gap = {
			tx: tx,
			width: width
		}

		gap.empty = []

		for (let i = 0; i< width; i++) {
			gap.empty.push(tx + i);
		}

		gap.taken = []

		for (let i = -2; i< width + 2; i++) {
			gap.taken.push(tx + i);
		}

		return gap;
	}

	buildRow(gaps) {
		let row = [];

		for (let tx = 0; tx< this.cols; tx++){
			row.push({
				tx : tx,
				frame :this.frames.walls,
				is_wall : true
			})
		}

		gaps.forEach( el => {
			for (let tx = el.tx; tx< el.tx + el.width; tx++) {
				if (row[tx]) {
					row[tx].is_wall = false;
				}
			}
		}, this)
		return row;
	}

	createWalls(walls) {
		let x,y,spr;

		for (let ty = 0; ty < walls.length; ty++) {
			for (let tx = 0; tx < walls[ty].length; tx++) {
				x = (tx * this.CONFIG.tile) + this.CONFIG.map_offset;
				y = (ty + this.layers.walls.length) * this.CONFIG.tile;

				if (walls[ty][tx].is_wall) {
					spr = this.ctx.add.sprite(x,y,'tileset' )
					spr.setOrigin(0);
					spr.setDepth(this.DEPTH.wall);
					spr.setFrame(walls[ty][tx].frame);

					walls[ty][tx].spr = spr;
				}				
			}
		}

		return walls;
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
				
				

				spr = this.ctx.add.sprite(x, y, 'tileset', 12);

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

			spr = this.ctx.add.sprite(x,y,'tileset', 12);
			spr.setOrigin(0);
			spr.setDepth(this.DEPTH.floor);

			this.layers.floor[ty][tx] = spr;
		}		
	}
}