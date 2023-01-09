Matter.use("matter-wrap");

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
let ball;
let isDrag = false;
// an array to contain all the blocks created
let blocks = [];
let trap;
let lift;

let kamin1;

let liftMove = -1;

let normal;

let ei;

function preload() {
	normal = loadImage("./normal.png");
}

function setup() {
	const canvas = createCanvas(1280, 720);

	engine = Engine.create();
	world = engine.world;

	ei = new PolygonFromSVG(
		world,
		{
			x: 480,
			y: 200,
			image: normal,
			fromFile: "./pathei.svg",
			scale: 1,
			color: "black",
		},
		{ label: "Murmel", isStatic: false, friction: 1.0, density: 0.01 }
	);

	// use svg file to create the corresponding polygon
	kamin1 = new PolygonFromSVG(
		world,
		{
			x: 640,
			y: 360,
			fromFile: "./kamin1.svg",
			scale: 1,
		},
		{ isStatic: true, friction: 0.0 }
	);

	// the ball has a label and can react on collisions
	ball = new Ball(
		world,
		{
			x: 200,
			y: 80,
			r: 10,
			color: "blue",
		},
		{
			label: "Murmel",
			isStatic: false,
			density: 0.001,
			restitution: 0.2,
			friction: 0.0,
			frictionAir: 0.0,
		}
	);
	blocks.push(ball);

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
	clear();
	blocks.forEach((block) => block.draw());
	mouse.draw();
	kamin1.draw();
	ei.draw();
}

//das "event" muss drinnen stehen, damit sich die Seite nicht durch Space bewegt

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
					x: 1.0,
					y: -0.5,
				});
			}
			break;
		default:
			console.log(event.key);
	}
}
