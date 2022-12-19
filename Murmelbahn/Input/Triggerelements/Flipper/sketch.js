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
				x: 800,
				y: 200,
				w: 160,
				h: 15,
				color: "yellow",
			},
			{ isStatic: true }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 600,
				y: 100,
				w: 300,
				h: 15,
				color: "yellow",
			},
			{ angle: radians(10), isStatic: true }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 850,
				y: 360,
				w: 49,
				h: 5,
				color: "yellow",
			},
			{ isStatic: false, restitution: 1, density: 0.5 }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 1080,
				y: 200,
				w: 200,
				h: 15,
				color: "yellow",
			},
			{ isStatic: true }
		)
	);

	const kelle = blocks.push(
		new Parts(
			world,
			{
				x: 910,
				y: 290,
				ximage: boxImg,
				color: "blue",
				offset: { x: 0, y: -20.0 },
			},
			{
				parts: [
					Bodies.rectangle(30, 10, 250, 15, { angle: radians(120) }),
					Bodies.rectangle(-60, 120, 50, 15, { restitution: 1 }),
					Bodies.rectangle(-100, 100, 50, 15, {
						angle: radians(-120),
					}),
				],
				isStatic: true,
				friction: 0.0,
			}
		)
	);

	kelle.constrainTo(regal3, {
		length: 0,
		stiffness: 0.1,
		draw: true,
		color: "green",
	});

	/*for (let d = 0; d < 10; d++) {
		blocks.push(
			new BlockCore(
				world,
				{
					x: windowWidth / 2 - 200 + d * 30,
					y: 160,
					w: 10,
					h: 50,
					color: 80,
				},
				{ angle: radians(5), isStatic: false }
			)
		);
	}*/

	blocks.push(
		new BlockCore(
			world,
			{
				x: 100,
				y: 800,
				w: 800,
				h: 50,
				color: "gray",
			},
			{ isStatic: true }
		)
	);

	//für Flipper hohe restitution hinzufügen,

	blocks.push(
		new BlockCore(
			world,
			{
				x: 1400,
				y: 800,
				w: 1400,
				h: 50,
				color: "gray",
			},
			{ isStatic: true }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: -100,
				y: 600,
				w: 800,
				h: 20,
				color: "gray",
			},
			{ angle: PI / 6, isStatic: true }
		)
	);

	propeller = new Block(
		world,
		{
			x: 600,
			y: 800,
			w: 200,
			h: 20,
			color: "white",
		},
		{ isStatic: true }
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: windowWidth + 100,
				y: 450,
				w: 800,
				h: 20,
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
				x: 120,
				y: 100,
				r: 30,
				color: "red",
			},
			{
				label: "xMurmel",
				restitution: 0,
				density: 0.01,
				friction: 0,
				mass: 5,
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
}

function draw() {
	background(0, 20);
	blocks.forEach((block) => block.draw());
	mouse.draw();

	//Propeller animieren
	Matter.Body.setAngle(propeller.body, angle);
	Matter.Body.setAngularVelocity(propeller.body, 0.01);
	angle += 1;

	propeller.draw();
}
