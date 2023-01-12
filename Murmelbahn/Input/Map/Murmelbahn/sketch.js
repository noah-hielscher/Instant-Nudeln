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
let scenes = [scene1, scene2, scene3, scene4, scene5, scene6];
let scene = 0;
let sceneBack, sceneFore;

//Ei Statusse
let normal, black, cracked, blase, crackedOpen, done;
let ei;

//Objects in the Kitchen
let brett1a, brett1b, brettImage;

function preload() {
	//preloading - Egg Images
	normal = loadImage("./eggState/normal.png");
	black = loadImage("./eggState/black.png");
	cracked = loadImage("./eggState/cracked.png");
	blase = loadImage("./eggState/blase.png");
	crackedOpen = loadImage("./eggState/crackedOpen.png");
	done = loadImage("./eggState/done.png");
	//preloading - Objects in the Kitchen
	brett1aImage = loadImage("./frame5/brett1.png");
	brett1bImage = loadImage("./frame5/brett2.png");
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
	let wolken2, wolken3;
	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 120,
			y: 0,
			image: normal,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);

	//Path
	wolken2 = new PolygonFromSVG(
		world,
		{
			x: 160,
			y: 155,
			fromFile: "./frame2/Clouds-Test-Section2.svg",
			scale: 1.5,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken2);

	wolken2 = new PolygonFromSVG(
		world,
		{
			x: 410,
			y: 590,
			fromFile: "./frame2/Clouds-Test-Section2.svg",
			scale: 1.0,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken2);

	wolken3 = new PolygonFromSVG(
		world,
		{
			x: 780,
			y: 297,
			fromFile: "./frame1/wolken2.svg",
			scale: 1.0,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken3);

	wolken3 = new PolygonFromSVG(
		world,
		{
			x: 880,
			y: 510,
			fromFile: "./frame1/wolken2.svg",
			scale: 1.0,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken3);

	//Pusher
	blocks.push(
		new BlockCore(
			world,
			{
				x: 750,
				y: 305,
				w: 200,
				h: 40,
				force: { x: -0.096, y: -0.046 },
			},
			{ isSensor: true, isStatic: true, angle: PI / -8 }
		)
	);

	//Automatischer Szenen wechsler
	blocks.push(
		new BlockCore(
			world,
			{
				x: 640,
				y: 720,
				w: 1280,
				h: 40,
				trigger: () => {
					switchScene((scene + 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}

function scene2() {
	sceneBack.style["background"] = 'url("./frame2/background.png") no-repeat';
	sceneFore.style["foreground"] = 'url("./frame2/Schornstein.png") no-repeat';
	let wolken2, wolken3;

	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: ei.body.position.x,
			y: 0,
			image: normal,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);

	//Path
	wolken2 = new PolygonFromSVG(
		world,
		{
			x: 180,
			y: 100,
			fromFile: "./frame2/Clouds-Test-Section2.svg",
			scale: 1,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken2);

	wolken2 = new PolygonFromSVG(
		world,
		{
			x: 465,
			y: 310,
			fromFile: "./frame2/Clouds-Test-Section2.svg",
			scale: 0.8,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken2);

	wolken3 = new PolygonFromSVG(
		world,
		{
			x: 800,
			y: 160,
			fromFile: "./frame2/wolkeRechts.svg",
			scale: 1,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken3);

	//Automatischer Resetter
	blocks.push(
		new BlockCore(
			world,
			{
				x: -50,
				y: 730,
				w: 1000,
				h: 40,
				force: { x: -0.022, y: -0.016 },
				trigger: () => {
					switchScene(Math.abs(scene - 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
	blocks.push(
		new BlockCore(
			world,
			{
				x: 1280,
				y: 730,
				w: 1000,
				h: 40,
				force: { x: -0.022, y: -0.016 },
				trigger: () => {
					//ei.body.position.x = 200;
					//ei.body.position.y = 100;
					switchScene(Math.abs(scene - 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);

	//Automatischer Szenen wechsler
	blocks.push(
		new BlockCore(
			world,
			{
				x: 620,
				y: 720,
				w: 330,
				h: 40,
				trigger: () => {
					switchScene((scene + 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}

function scene3() {
	sceneBack.style["background"] = 'url("./Frame3/background.png") no-repeat';

	let kamin1;

	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 878,
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
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(kamin1);

	//Pusher
	blocks.push(
		new BlockCore(
			world,
			{
				x: 900,
				y: 140,
				w: 200,
				h: 40,
				force: { x: -0.046, y: -0.016 },
			},
			{ isSensor: true, isStatic: true, angle: PI / -6 }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 760,
				y: 185,
				w: 200,
				h: 40,
				force: { x: -0.036, y: -0.026 },
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
				w: 180,
				h: 40,
				force: { x: -0.058, y: -0.012 },
			},
			{ isSensor: true, isStatic: true, angle: PI / -15 }
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

	//Automatischer Szenen wechsler
	blocks.push(
		new BlockCore(
			world,
			{
				x: 330,
				y: 720,
				w: 300,
				h: 40,
				trigger: () => {
					switchScene((scene + 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}

function scene4() {
	sceneBack.style["background"] = 'url("./frame4/background.png") no-repeat';

	let kamin2, kamin3;

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
	kamin2 = new PolygonFromSVG(
		world,
		{
			x: 730,
			y: 270,
			fromFile: "./frame4/kamin2a.svg",
			scale: 1,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(kamin2);

	//Path
	kamin3 = new PolygonFromSVG(
		world,
		{
			x: 520,
			y: 225,
			fromFile: "./frame4/kamin2b.svg",
			scale: 1,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(kamin3);

	//Automatischer Szenen wechsler
	blocks.push(
		new BlockCore(
			world,
			{
				x: 620,
				y: 720,
				w: 600,
				h: 40,
				trigger: () => {
					switchScene((scene + 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}

function scene5() {
	sceneBack.style["background"] = 'url("./frame5/background.png") no-repeat';
	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 420,
			y: 0,
			image: normal,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);
	//Path
	blocks.push(
		new BlockCore(
			world,
			{
				x: 500,
				y: 330,
				w: 240,
				h: 20,
				color: "red",
			},
			{ isStatic: true, angle: PI / 13 }
		)
	);
	//zerbrechende Bretter
	brett1a = new PolygonFromSVG(
		world,
		{
			x: 820,
			y: 580,
			image: brett1aImage,
			fromFile: "./frame5/brett1.svg",
			scale: 1,
			trigger: () => {
				Matter.Body.setStatic(brett1a.body, false);
				Matter.Body.setStatic(brett1b.body, false);
				ei.attributes.image = cracked;
			},
		},
		{ isStatic: true }
	);

	blocks.push(brett1a);

	brett1b = new PolygonFromSVG(
		world,
		{
			x: 950,
			y: 577,
			image: brett1bImage,
			fromFile: "./frame5/brett1.svg",
			scale: 1,
			trigger: () => {
				Matter.Body.setStatic(brett1a.body, false);
				Matter.Body.setStatic(brett1b.body, false);
				ei.attributes.image = cracked;
			},
		},
		{ isStatic: true }
	);

	blocks.push(brett1b);

	//Brett Halterung
	blocks.push(
		new BlockCore(
			world,
			{
				x: 793,
				y: 614,
				w: 15,
				h: 40,
			},
			{ isStatic: true }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 1007,
				y: 614,
				w: 15,
				h: 40,
			},
			{ isStatic: true }
		)
	);

	//Automatischer Szenen wechsler
	blocks.push(
		new BlockCore(
			world,
			{
				x: 620,
				y: 735,
				w: 1500,
				h: 40,
				trigger: () => {
					switchScene((scene + 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}

function scene6() {
	sceneBack.style["background"] = 'url("./frame6/background.png") no-repeat';
	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: ei.body.position.x,
			y: 0,
			image: cracked,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);
	//Boden
	blocks.push(
		new BlockCore(
			world,
			{
				x: 500,
				y: 700,
				w: 1280,
				h: 40,
			},
			{ isStatic: true, restitution: 0.5, friction: 0.001 }
		)
	);
	//Automatischer Szenen wechsler
	blocks.push(
		new BlockCore(
			world,
			{
				x: 920,
				y: 650,
				w: 120,
				h: 100,
				trigger: () => {
					switchScene((scene + 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
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
			}
			if (ei.body.velocity.y > -3.96) {
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
