import tile from "./assets/Wasteland_Sky.png";
import planeSprite from "./assets/plane/plane.png";
import planeJSON from "./assets/plane/plane.json";
import wizardSprite from "./assets/wizard/wizard.png";
import wizardJSON from "./assets/wizard/wizard.json";

export const movingTileset = () => {
	const phaserConfig = {
		type: Phaser.AUTO,
		parent: "game",
		width: 1280,
		height: 720,
		backgroundColor: "#5DACD8",
		scene: {
			init: initScene,
			preload: preloadScene,
			create: createScene,
			update: updateScene,
		},
	};

	const game = new Phaser.Game(phaserConfig);

	let sky, wizard, cursors, plane;

	function initScene() {}
	function preloadScene() {
		this.load.image("sky", tile);
		this.load.atlas("wizard", wizardSprite, wizardJSON);
		this.load.atlas("plane", planeSprite, planeJSON);
	}

	function createScene() {
		sky = this.add.tileSprite(512, 256, 512, 256, "sky");
		sky.setScale(2);

		this.anims.create({
			key: "fly",
			frameRate: 7,
			frames: this.anims.generateFrameNames("plane", {
				prefix: "plane",
				suffix: ".png",
				start: 1,
				end: 3,
				zeroPad: 1,
			}),
			repeat: -1,
		});

		this.anims.create({
			key: "explode",
			frameRate: 7,
			frames: this.anims.generateFrameNames("plane", {
				prefix: "explosion",
				suffix: ".png",
				start: 1,
				end: 3,
				zeroPad: 1,
			}),
			repeat: 2,
		});

		this.anims.create({
			key: 'idle',
			frameRate: 40,
			frames: this.anims.generateFrameNames('wizard', {
				prefix: 'Chara - BlueIdle',
				suffix : '.png',
				start : 1,
				end: 19,
				zeroPad: 5,
			}),
			repeat: -1,
		})

		console.log(this);
		plane = this.add.sprite(222, 222, "plane");
		plane.setScale(0.2);
		plane.play("fly");

		wizard = this.add.sprite(500, 360, "wizard");
		wizard.play('idle')
		
		// destroing by timer
		// this.time.addEvent({
		// 	delay: 3000,
		// 	callback: () => {
		// 		plane.play("explode");
		// 		plane.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
		// 			plane.destroy();
		// 		});
		// 	},
		// });

		cursors = this.input.keyboard.createCursorKeys();
	}
	function updateScene() {
		sky.tilePositionX += 0.3;

		if (cursors.left.isDown) {
			console.log(plane);
			plane.x -= 3;

			// plane.anims.play('fly', true);
		} else if (cursors.right.isDown) {
			plane.x += 3;
		} else if (cursors.up.isDown) {
			plane.y -= 3;
		} else if (cursors.down.isDown) {
			plane.y += 3;
		}
	}
};
