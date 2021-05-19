// the game itself
let game;

// game options
let gameOptions = {

	// number of boxes in the game
	boxes: 30,

	// size of each box
	sizeRange: {

		// min size, in pixels
		min: 50,

		// max size, in pixels
		max: 120
	}
}
window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        scale: {
            // mode: Phaser.Scale.FIT,
            // autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 640,
            height: 480
        },
       scene: playGame
    }
    game = new Phaser.Game(gameConfig);
}
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    create(){

		// graphic object used to draw walls
		this.wallGraphics = this.add.graphics();
		this.wallGraphics.lineStyle(1, 0x00ff00);

		// graphic object used to draw rays of light
		this.lightGraphics = this.add.graphics();

		// array with all polygons in game
		this.polygons = [];

		// add random boxes
		for(let i = 0; i < gameOptions.boxes; i ++){
			this.addRandomBox();
		}

		// walls around game perimeter
		this.polygons.push([[-1, -1], [game.config.width + 1, -1], [game.config.width + 1, game.config.height+1], [-1, game.config.height + 1]]);

		// listener for input movement
		this.input.on("pointermove", this.renderLight, this);
	}

	// method to add a random box
	addRandomBox(){

		// use a do...while statement because there can't be intersecting polygons
		do{

			// random x and y coordinates, width and height
			var startX = Phaser.Math.Between(10, game.config.width - 10 - gameOptions.sizeRange.max);
			var startY = Phaser.Math.Between(10, game.config.height - 10 - gameOptions.sizeRange.max);
			var width = Phaser.Math.Between(gameOptions.sizeRange.min, gameOptions.sizeRange.max);
			var height = Phaser.Math.Between(gameOptions.sizeRange.min, gameOptions.sizeRange.max);

			// check if current box intersects other boxes
		} while(this.boxesIntersect(startX, startY, width, height));

		// draw the box
		this.wallGraphics.strokeRect(startX, startY, width, height);

		// insert box vertices into polygons array
		this.polygons.push([[startX, startY], [startX + width, startY], [startX + width, startY + height], [startX, startY + height]]);
	}

	// method to check if the box intersects other boxes
	boxesIntersect(x, y, w, h){

		// loop through existing boxes
		for(let i = 0; i < this.polygons.length; i ++){

			// if the box intersects the existing i-th box...
			if(x < this.polygons[i][1][0] && x + w > this.polygons[i][0][0] && y < this.polygons[i][3][1] && y + h > this.polygons[i][0][1]){

				// return true
				return true;
			}
		}

		// if we reach the end of the loop, return false
		return false;
	}

	// method to render the light
	renderLight(pointer){

		// determine light polygon starting from pointer coordinates
		let visibility = this.createLightPolygon(pointer.x, pointer.y);

		// clear and prepare lightGraphics graphic object
		this.lightGraphics.clear();
		this.lightGraphics.lineStyle(2, 0xff8800);
		this.lightGraphics.fillStyle(0xffff00);

		// begin a drawing path
		this.lightGraphics.beginPath();

		// move the graphic pen to first vertex of light polygon
		this.lightGraphics.moveTo(visibility[0][0], visibility[0][1]);

		// loop through all light polygon vertices
     	for(let i = 1; i <= visibility.length; i ++){

			// draw a line to i-th light polygon vertex
			this.lightGraphics.lineTo(visibility[i % visibility.length][0], visibility[ i %visibility.length][1]);
		}

		// close, stroke and fill light polygon
		this.lightGraphics.closePath();
    	this.lightGraphics.fillPath();
    	this.lightGraphics.strokePath();
	}

	// method to create light polygon using visibility_polygon.js
	createLightPolygon(x, y){
		let segments = VisibilityPolygon.convertToSegments(this.polygons);
		segments = VisibilityPolygon.breakIntersections(segments);
		let position = [x, y];
		if (VisibilityPolygon.inPolygon(position, this.polygons[this.polygons.length - 1])) {
			return VisibilityPolygon.compute(position, segments);
		}
		return null;
	}
}
