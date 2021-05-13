import Phaser from 'phaser';

export const getStarted = () => {
	var config = {
		type: Phaser.AUTO,
		width: 800,
		height: 600,
		physics: {
			default: "arcade",
			arcade: {
				gravity: { y: 200 },
			},
		},
		scene: {
			preload: preload,
			create: create,
		},
	};
	
	var game = new Phaser.Game(config);
	
	function preload() {
		this.load.setBaseURL("http://labs.phaser.io");
	
		this.load.image("sky", "assets/skies/space3.png");
		this.load.image("logo", "assets/sprites/phaser3-logo.png");
		this.load.image("red", "assets/particles/green.png");
	}
	
	function create() {
		this.add.image(0, 0, "sky").setScale(0.2).refreshBody();;
	
	
		var particles = this.add.particles("red");
	
		var emitter = particles.createEmitter({
			speed: 200,
			scale: { start: 0.5, end: 0 },
			blendMode: "ADD",
		});
	
		var logo = this.physics.add.image(400, 100, "logo");
	
		logo.setVelocity(200, 200);
		logo.setBounce(1, 1);
		logo.setCollideWorldBounds(true);
	
		emitter.startFollow(logo);
	}
}
