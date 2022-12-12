Homeworks.aufgabe = 7;

const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;

// the Matter engine to animate the world
let engine;
let world;
let mouse;
let isDrag = false;
// an array to contain all the blocks created
let blocks = [];

let propeller;
let angle = 0;

let poly, ballImg, blockImg;
let magnet;

function preload() {
	poly = loadImage("./img/poly.png");
	ballImg = loadImage("./img/ball.png");
	boxImg = loadImage("./img/box.png");
}

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("thecanvas");

	engine = Engine.create();
	world = engine.world;

	blocks.push(
		new BlockCore(
			world,
			{
				x: windowWidth / 2,
				y: 800,
				w: windowWidth,
				h: 40,
				color: "gray",
				force: { x: 0.01, y: -0.08 },
			},
			{ isStatic: true }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: -100,
				y: 450,
				w: 800,
				h: 10,
				color: "gray",
			},
			{ angle: PI / 3, isStatic: true }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: windowWidth + 100,
				y: 450,
				w: 800,
				h: 10,
				color: "gray",
			},
			{ angle: -PI / 3, isStatic: true }
		)
	);

	// the ball has a label and can react on collisions
	blocks.push(
		new Ball(
			world,
			{
				x: 300,
				y: 100,
				r: 30,
				color: "magenta",
			},
			{
				label: "Murmel",
				restitution: 0.5,
				density: 0.001,
				friction: 0.0,
				frictionAir: 0.0,
			}
		)
	);

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
				{ isStatic: false, restitution: 0.9, label: "Murmel" }
			);
			blocks.push(ball);
		}
		isDrag = false;
	});

	// process collisions - check whether block "Murmel" hits another Block
	Events.on(engine, "collisionStart", (event) => {
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
}

function draw() {
	background(0, 10);
	blocks.forEach((block) => block.draw());
	mouse.draw();
}
