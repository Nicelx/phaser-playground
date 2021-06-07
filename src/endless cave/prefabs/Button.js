class Button {
	constructor(ctx, x, y, key, callback, string) {
		this.ctx = ctx;

		this.x = x;
		this.y = y;
		this.key = key;
		
		this.width;
		this.height;

		this.callback = callback;
		this.text = string;

		this.frames = {
			out : 0,
			over : 1,
			down : 2,
		}

		this.origin = this.initOrigin();
		this.obj = this.initObject();
	}	

	initOrigin(origin) {
		if (typeof origin === 'number') {
			return {
				x : origin,
				y : origin
			}
		}
		else if (typeof origin === 'object') {
			return origin;
		}
		else {
			return {
				x : 0.5,
				y : 0.5
			}
		}
	}

	initObject() {
		let btn = this.createSprite();

		this.width = btn.displayWidth;
		this.height = btn.displayHeight;

		let lbl = false;

		if (typeof this.text === 'string') {
			lbl = new Text(this.ctx, 
				btn.getCenter().x, 
				btn.getCenter().y,
				this.text,
				'standard')
		}

		return {
			btn : btn,
			lbl : lbl
		}
	}

	createSprite() {
		let spr = this.ctx.add.sprite(this.x, this.y, this.key);

		spr.setOrigin(this.origin.x, this.origin.y);
		spr.setInteractive();

		spr.on('pointerout' , this.handleOut, this);
		spr.on('pointerover', this.handleOver, this);
		spr.on('pointerdown', this.handleDown, this);
		spr.on('pointerup', this.handleUp, this);

		return spr;
	}

	destroy() {
		if (this.obj.btn) this.obj.btn.destroy();
		if (this.obj.lbl) this.obj.lbl.destroy();

		this.obj = {}
	}

	handleOut() {
		this.obj.btn.setFrame(this.frames.out)
	}
	handleOver() {
		this.obj.btn.setFrame(this.frames.over)
	}
	handleDown() {
		this.obj.btn.setFrame(this.frames.down)
	}
	handleUp() {
		this.obj.btn.setFrame(this.frames.out)

		this.callback.call(this.ctx)
	}


	setDepth(depth) {
		this.obj.btn.setDepth(depth);

		if (this.obj.lbl) {
			this.obj.lbl.setDepth(depth);
		}
	}

	setScrollFactor(scrollX, scrollY) {
		this.obj.btn.setScrollFactor(scrollX, scrollY);

		if (this.obj.lbl) {
			this.obj.lbl.setScrollFactor(scrollX, scrollY);
		}
	}

	setScale(scaleX, scaleY) {
		this.obj.btn.setScale(scaleX, scaleY);

		if (this.obj.lbl) {
			this.obj.lbl.setScale(scaleX, scaleY);
		}

		this.width = this.obj.btn.displayWidth;
		this.height = this.obj.btn.displayHeight;
	}

	setFrame(frame) {
		this.obj.btn.setFrame(frame)
	}

	setText(string) {
		if (this.obj.lbl) {
			this.text = string;
			this.obj.lbl.setText(string);
		}
	}

	setX(x) {
		this.x = x;
		this.obj.btn.setX(x);

		if (this.obj.lbl) {
			this.obj.lbl.setX(this.obj.btn.getCenter().x);
		}
	}

	setY(y) {
		this.y = y;
		this.obj.btn.setY(t);

		if (this.obj.lbl) {
			this.obj.lbl.setY(this.obj.btn.getCenter().y)
		}		
	}

	setWidth(width) {
		this.obj.btn.setDisplaySize(width, this.height);
		this.width = width;
	}
	setHeight(height) {
		this.obj.btn.setDisplaySize(this.width, height);
		this.height = height;
	}

	setAlpha(alpha) {
		this.obj.btn.setAlpha(alpha);

		if (this.obj.lbl) {
			this.obj.lbl.setAlpha(alpha);
		}
	}

	setVisible(is_visible) {
		this.obj.btn.setVisible(is_visible);

		if (this.obj.lbl) {
			this.obj.lbl.setVisible(is_visible)
		}
	}

	getCenter() {
		return this.obj.btn.getCenter();
	}
	getTopLeft() {
		return this.obj.btn.getTopLeft();
	}
	getTopRight() {
		return this.obj.btn.getTopRight();
	}
	getBottomLeft() {
		return this.obj.btn.getBottomLeft();
	}

	getBottomRight() {
		this.obj.btn.getBottomRight();
	}
}