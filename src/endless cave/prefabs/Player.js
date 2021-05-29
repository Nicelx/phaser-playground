class Player extends Entity {
	constructor(ctx, x, y, key) {
		super(ctx, x, y, key);
	}

	update(is_holding) {
		if (this.states.dead) return;

		this.setCurrentDirection(is_holding);

		if (this.states.walk) {
			this.updateSpriteDirection();
			this.moveSprite();
		}
	}
	moveSprite() {
		switch(this.direction.current) {
			case 'down' :
				this.moveDown();
				break;
			case 'left' : 
				this.moveLeft();
				break;
			case 'right': 
				this.moveRight();
				break;
		}
	}

	moveDown() {
		this.y += this.speed.current;

		this.setSpritePos();
	}
	moveLeft() {
		this.x -= this.speed.current;

		this.setSpritePos();
	}
	moveRight() {
		this.x += this.speed.current;

		this.setSpritePos();
	}

	setCurrentDirection(is_holding) {
		if (is_holding) {
			this.direction.current = is_holding;
		}
		else {
			this.direction.current = 'down';	
		}
	}
}