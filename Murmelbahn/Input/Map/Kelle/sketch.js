//Matter.use("matter-wrap");

const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;
let colors;

// the Matter engine to animate the world
let engine;
let world;
let mouse;
let isDrag = false;

// an array to contain all the blocks created
let blocks = [];
let flipper;
let angle = 0;

function preload() {

}

function setup() {
	let canvas = createCanvas(1280, 720);
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
			{isStatic: true}
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
		(regal3 = new BlockCore(
			world,
			{
				x: 1080,
				y: 200,
				w: 200,
				h: 15,
				color: "yellow",
			},
			{ isStatic: true }
		))
	);

	blocks.push(
		(kelle = new Parts(
			world,
			{
				x: 1000,
				y: 290,
				color: "blue",
				offset: {x: 0,y: -20.0},
			},
			{
				parts: [
					Bodies.rectangle(30, 10, 250, 15, { angle: radians(110) }),
					Bodies.rectangle(-40, 120, 50, 15),
					Bodies.rectangle(-80, 100, 50, 15, {
						angle: radians(-110),
					}),
				],
				isStatic: false,
				friction: -0.3,
				frictionAir: -0.001,
			}
		))
	);

	kelle.constrainTo(regal3, {
		pointA: { x: 70, y: -130 },
		pointB: { x: -100, y: 20 },
		length: 0,
		stiffness: 0.5,
		draw: true,
		color: "green",
	});
	

	flipper = new Block(
		world,
		{
			x: 850,
			y: 360,
			w: 48,
			h: 10,
			color: "yellow"
		},
		{isStatic: false, restitution: 2, density: 0.01 }
	);
	blocks.push(flipper);

	flipper.constrainTo(kelle, {
		pointA: { x: 0, y: 0 },
		pointB: { x: -50, y: 65 },
		length: 0,
		stiffness: 0.3,
		draw: true,
		color: "green",
	});

	blocks.push(
		new BlockCore(
			world,
			{
				x: 1000,
				y: 720,
				w: 2000,
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
			{angle: PI / 6, isStatic: true }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 1380,
				y: 450,
				w: 800,
				h: 20,
				color: "gray",
			},
			{ angle: -PI / 3, isStatic: true }
		)
	);

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
				restitution : 0,
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
}

function draw() {
	background(0,20);
	blocks.forEach((block) => block.draw());
	mouse.draw();
}

//das "event" muss drinnen stehen, damit sich die Seite nicht durch Space bewegt

function onKeyDown(event) {
	switch (event.key) {
		case " ":
			console.log("SPACE");

			if (ball.body.velocity.y < -3.96) {
				console.log("speed erreicht");
			}
			if (ball.body.velocity.y > -3.96) {
				console.log("speed wir derhöht");
				event.preventDefault();
				Matter.Body.applyForce(ball.body, ball.body.position, {
					x: 0.0007,
					y: 0,
				});
			}
			break;
		default:
			console.log(event.key);
	}
}
