class Player extends Entity {
	constructor(ctx, x, y, key) {
		super(ctx, x, y, key);

		this.speed = {
			base: 2,
			current: 2,
			max: 6,
		};
	}

	update(is_holding) {
		if (this.states.dead) return;

		this.setCurrentDirection(is_holding);

		if (this.states.walk) {
			this.updateSpriteDirection();
			this.moveSprite();
		}
	}

	startMoving() {
		this.setState("walk");
		this.startNewAnim("walk");
	}
	stopMoving() {
		this.setState("idle");
		this.startNewAnim("idle");
	}

	moveSprite() {
		switch (this.direction.current) {
			case "down":
				this.moveDown();
				break;
			case "left":
				this.moveLeft();
				break;
			case "right":
				this.moveRight();
				break;
		}
	}

	moveDown() {
		this.y += this.speed.current;

		this.handleCollision("down");

		this.setSpritePos();
	}
	moveLeft() {
		this.x -= this.speed.current;

		this.handleCollision("left");

		this.setSpritePos();
	}
	moveRight() {
		this.x += this.speed.current;

		this.handleCollision("right");

		this.setSpritePos();
	}

	handleCollision(direction) {
		let tile1, tile2, now, corr;

		switch (direction) {
			case "down":
				tile1 = this.getBottomLeftTile();
				tile2 = this.getBottomRightTile();
				now = this.helper.convertPxToTile(this.x, this.getBottomY(), this.TILE_SIZE);
				corr = {
					x: this.x,
					y: this.helper.getTileCenter(now.tx, now.ty - 1, this.TILE_SIZE).y,
				};
				break;

			case "left":
				tile1 = this.getTopLeftTile();
				tile2 = this.getBottomLeftTile();
				now = this.helper.convertPxToTile(this.getLeftX(), this.y, this.TILE_SIZE);
				corr = {
					x: this.helper.getTileCenter(now.tx + 1, now.ty, this.TILE_SIZE).x,
					y: this.y,
				};
				break;

			case "right":
				tile1 = this.getTopRightTile();
				tile2 = this.getBottomRightTile();
				now = this.helper.convertPxToTile(this.getRightX(), this.y, this.TILE_SIZE);
				corr = {
					x: this.helper.getTileCenter(now.tx - 1, now.ty, this.TILE_SIZE).x,
					y: this.y,
				};

				break;
		}
		let is_tile1_wall = this.ctx.generator.checkTileBlocked(tile1);
		let is_tile2_wall = this.ctx.generator.checkTileBlocked(tile2);

		if (is_tile1_wall || is_tile2_wall) {
			this.x = corr.x;
			this.y = corr.y;
		}
	}

	setCurrentDirection(is_holding) {
		if (is_holding) {
			this.direction.current = is_holding;
		} else {
			this.direction.current = "down";
		}
	}
}
