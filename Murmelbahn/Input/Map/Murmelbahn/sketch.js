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
let scenes = [scene1, scene2, scene3, scene4, scene5];
let scene = 0;
let sceneBack, sceneFore;

//Ei Statusse
let normal;
let black;
let cracked;
let blase;
let crackedOpen;
let done;
let ei;

//Ei Images Load
function preload() {
	normal = loadImage("./eggState/normal.png");
	black = loadImage("./eggState/black.png");
	cracked = loadImage("./eggState/cracked.png");
	blase = loadImage("./eggState/blase.png");
	crackedOpen = loadImage("./eggState/crackedOpen.png");
	done = loadImage("./eggState/done.png");
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
	switchScene(0);
}

function scene1() {
	sceneBack.style["background"] = 'url("./frame1/background.png") no-repeat';
	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 880,
			y: 0,
			image: normal,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);
}

function scene2() {
	sceneBack.style["background"] = 'url("./frame2/background.png") no-repeat';
	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 880,
			y: 0,
			image: normal,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);
}

function scene3() {
	sceneBack.style["background"] = 'url("./Frame3/background.png") no-repeat';
	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 880,
			y: 0,
			image: black,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);

	//Path
	kamin1 = new PolygonFromSVG(
		world,
		{
			x: 640,
			y: 360,
			fromFile: "./frame3/kamin1.svg",
			scale: 1,
			color: "red",
		},
		{ isStatic: true, friction: 0.0 }
	);

	//Pusher
	blocks.push(
		new BlockCore(
			world,
			{
				x: 750,
				y: 170,
				w: 200,
				h: 40,
				force: { x: -0.047, y: -0.016 },
			},
			{ isSensor: true, isStatic: true }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 900,
				y: 390,
				w: 150,
				h: 40,
				force: { x: -0.047, y: -0.016 },
			},
			{ isSensor: true, isStatic: true, angle: PI / -9 }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 900,
				y: 610,
				w: 200,
				h: 40,
				force: { x: -0.047, y: -0.016 },
			},
			{ isSensor: true, isStatic: true, angle: PI / -9 }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 680,
				y: 648,
				w: 300,
				h: 40,
				force: { x: -0.022, y: -0.016 },
			},
			{ isSensor: true, isStatic: true }
		)
	);
}

function scene4() {
	sceneBack.style["background"] = 'url("./frame4/background.png") no-repeat';
	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 420,
			y: 0,
			image: black,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);

	//Path
	//kamin2 = new PolygonFromSVG(
	//	world,
	//	{
	//		x: 515,
	//		y: 225,
	//		fromFile: "./frame4/kamin2a.svg",
	//		scale: 1,
	//	},
	//	{ isStatic: true, friction: 0.0 }
	//);
}

function scene5() {
	//sceneBack.style["background"] = 'url("./frame4/background.png") no-repeat';
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
	mouse.draw();
	ei.draw();
}

function onKeyDown(event) {
	switch (event.key) {
		case " ":
			console.log("SPACE");

			if (ei.body.velocity.y < -3.96) {
				console.log("speed erreicht");
			}
			if (ei.body.velocity.y > -3.96) {
				console.log("speed wir derhöht");
				event.preventDefault();
				Matter.Body.applyForce(ei.body, ei.body.position, {
					x: 0.04,
					y: -0.02,
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
}
