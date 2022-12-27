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

let puzzle;
let magnet;
let Magnet;

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("thecanvas");

	engine = Engine.create();
	world = engine.world;

	// create some blocks
	// the blue box triggers a function on collisions
	blocks.push(
		new BlockCore(
			world,
			{
				x: 200,
				y: 200,
				w: 60,
				h: 60,
				color: "blue",
				trigger: (ball, block) => {
					// console.log("Trigger ", ball, block, puzzle);
					puzzle.attributes.color = "magenta";
				},
			},
			{ isStatic: false, density: 0.5 }
		)
	);

	const fixed1 = new Block(
		world,
		{
			x: 700,
			y: 200,
			w: 40,
			h: 40,
			color: "cyan",
		},
		{ isStatic: false }
	);
	fixed1.constrainTo(null, {
		pointB: { x: 900, y: 300 },
		length: 300,
		draw: true,
	});
	blocks.push(fixed1);

	const fixed2 = new Block(
		world,
		{
			x: 800,
			y: 200,
			w: 40,
			h: 40,
			color: "cyan",
		},
		{ isStatic: false }
	);
	fixed2.constrainTo(fixed1, { length: 150, stiffness: 0.1 });
	blocks.push(fixed2);

	blocks.push(
		new BlockCore(
			world,
			{
				x: windowWidth / 2,
				y: 800,
				w: windowWidth,
				h: 10,
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
				y: 300,
				r: 30,
				color: "magenta",
			},
			{ label: "Murmel" }
		)
	);

	// create a rotating block - propeller
	propeller = new Block(
		world,
		{
			x: 640,
			y: 440,
			w: 100,
			h: 5,
			color: "white",
		},
		{ isStatic: true }
	);

	// create a body from points

	let ball2 = new Ball(
		world,
		{
			x: 300,
			y: 300,
			r: 30,
			color: "white",
		},
		{ isSensor: true }
	);
	ball2.constrainTo(puzzle, {
		length: 20,
		stiffness: 0.1,
		draw: true,
		color: "green",
	});
	blocks.push(ball2);

	magnet = new Magnet(
		world,
		{
			x: 1000,
			y: 400,
			r: 30,
			color: "blue",
			attraction: 0.45e-5,
		},
		{ isStatic: true }
	);
	blocks.push(magnet);

	// create a group of identical bodies
	let stack = new Stack(
		world,
		{
			x: 550,
			y: 100,
			cols: 10,
			rows: 10,
			colGap: 5,
			rowGap: 5,
			color: "red",
			create: (bx, by) => Bodies.circle(bx, by, 10, { restitution: 0.9 }),
		},
		{}
	);
	blocks.push(stack);

	magnet.addAttracted(stack.body.bodies);

	// add box, ball, ramp and ground
	blocks.push(
		new Block(world, { x: 200, y: 0, w: 64, h: 64, image: boxImg })
	);
	blocks.push(new Ball(world, { x: 100, y: 50, r: 45, image: ballImg }));

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
	// animate attracted blocks
	magnet.attract();

	// animate angle property of propeller
	Matter.Body.setAngle(propeller.body, angle);
	Matter.Body.setAngularVelocity(propeller.body, 0.15);
	angle += 0.07;

	propeller.draw();

	blocks.forEach((block) => block.draw());
	mouse.draw();
}
