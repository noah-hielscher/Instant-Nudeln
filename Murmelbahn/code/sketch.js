const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;

// the Matter engine to animate the world
let engine;
let world;
let mouse;
let ball;
let isDrag = false;

// an array to contain all the blocks created
let blocks = [];

//Szenenwechsel
let scenes = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
let scene = 0;
let sceneBack, sceneFore;

//Magnet
let magnet;

//Ei Statusse
let statusNormal, black, cracked, crackedblack, blase, crackedOpen, done;
let ei;
//Ei Bewegung
let eiX = 0.04;
let eiY = -0.02;

//Objects in the Kitchen
let brett1a, brett1b, brett2a, brett2b, brett3a, brett3b;

//Vogel
let vogel;
let vogelX = 1200;

//Musik an
let musikan = 0;

//Vogel
let VogelDraw;

function preload() {
	//preloading - Egg Images
	statusNormal = loadImage("./eggState/normal.png");
	black = loadImage("./eggState/black.png");
	cracked = loadImage("./eggState/cracked.png");
	crackedblack = loadImage("./eggState/crackedblack.png");
	blase = loadImage("./eggState/blase.png");
	crackedOpen = loadImage("./eggState/crackedOpen.png");
	done = loadImage("./eggState/done.png");
	//preloading - Objects in the Kitchen
	brett1aImage = loadImage("./frame5/brett1.png");
	brett1bImage = loadImage("./frame5/brett2.png");
	brett2aImage = loadImage("./frame6/brett3.png");
	brett2bImage = loadImage("./frame6/brett4.png");
	brett3aImage = loadImage("./frame6/brett5.png");
	brett3bImage = loadImage("./frame6/brett6.png");
	//Vogel
	vogel = loadImage("./frame1/Vogel.png");
}

function setup() {
	let canvas = createCanvas(1280, 720);
	canvas.parent("thecanvas");

	engine = Engine.create();
	world = engine.world;

	// add a mouse so that we can manipulate Matter objects
	mouse = new Mouse(engine, canvas, { stroke: "blue", strokeWeight: 3 });
	// const mouseScale = 1 + (1 / (scale / (1 - scale)))
	// Mouse.setScale(mouse, { x: mouseScale, y: mouseScale });

	// process mouseup events in order to drag objects or add more balls
	mouse.on("startdrag", (evt) => {
		isDrag = true;
	});
	mouse.on("mouseup", (evt) => {
		if (!isDrag) {
			let ball = new Ball(
				world,
				{
					x: evt.mouse.position.x,
					y: evt.mouse.position.y,
					r: 15,
					color: "yellow",
				},
				{
					isStatic: false,
					restitution: 0.9,
					label: "Murmel",
					density: 0.5,
				}
			);
			Matter.Body.applyForce(ball.body, ball.body.position, {
				x: 0.2,
				y: -2,
			});
			blocks.push(ball);
		}
		isDrag = false;
	});

	// process collisions - check whether block "Murmel" hits another Block
	Events.on(engine, "collisionStart", function (event) {
		var pairs = event.pairs;
		pairs.forEach((pair, i) => {
			if (pair.bodyA.label == "Murmel") {
				pair.bodyA.plugin.block.collideWith(pair.bodyB.plugin.block);
			}
			if (pair.bodyB.label == "Murmel") {
				pair.bodyB.plugin.block.collideWith(pair.bodyA.plugin.block);
			}
		});
	});
	// run the engine
	Runner.run(engine);
	document.addEventListener("keydown", onKeyDown);
	sceneBack = document.getElementById("scene-background");
	sceneFore = document.getElementById("scene-foreground");
	sceneEffect = document.getElementById("scene-foregroundeffect");
	switchScene(0);
}

function switchScene(newScene) {
	console.log("Scene", newScene);
	// cleanup of all blocks in the old scene
	blocks.forEach((block) => Matter.World.remove(world, block.body));
	blocks = [];

	// activate the new scene
	scene = newScene;
	scenes[scene]();
}

function draw() {
	clear();
	blocks.forEach((block) => block.draw());
	//Magnet
	if (scene == 7) {
		magnet.draw();
		magnet.attract();
	}
	ei.draw();
	//Vogelfliegen
	if (scene == 0) {
		for (let i = 12000; i >= -1; i--) {
			if (i % 1000 === 0) {
				if (Vogeldraw) {
					Vogeldraw.body.position.x = Vogeldraw.body.position.x - 1;
					Vogeldraw.draw();
				} else {
					console.log("VogelDraw existiert nicht");
				}
			}
		}
	}
}

function onKeyDown(event) {
	switch (event.key) {
		case " ":
			console.log("SPACE");
			jump.play();
			jump.volume = 0.5;
			if (ei.body.velocity.y < -3.96) {
			}
			if (ei.body.velocity.y > -3.96) {
				event.preventDefault();
				Matter.Body.applyForce(ei.body, ei.body.position, {
					x: eiX,
					y: eiY,
				});
			}
			break;
		case "n":
			switchScene((scene + 1) % scenes.length);
			break;
		case "p":
			switchScene(Math.abs(scene - 1) % scenes.length);
			break;
		default:
			console.log(event.key);
	}
	if (musikan == 0) {
		console.log("Musik wird abgespielt");
		audioPlayer.play();
		audioPlayer.volume = 0.3;
		sky.play();
		sky.volume = 1;
		musikan = 1;
	}
}
