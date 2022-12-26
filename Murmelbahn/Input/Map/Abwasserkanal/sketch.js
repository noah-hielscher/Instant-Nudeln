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

let polygon;
let ground;

let liftMove = -1;

function setup() {
	colors = [
		"gray",
		"gray",
		"gray",
		"gray",
		color(Math.random() * 256, Math.random() * 256, Math.random() * 256),
	];
	let canvas = createCanvas(1280, 720);
	canvas.parent("thecanvas");

	engine = Engine.create();
	world = engine.world;

	// use svg file to create the corresponding polygon
	polygon = new PolygonFromSVG(
		world,
		{ x: 480, y: 200, fromFile: "./path.svg", scale: 0.8, color: "white" },
		{ isStatic: true, friction: 0.0 }
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 1220,
				y: 530,
				w: 50,
				h: 5,
				color: "red",
			},
			{ angle: -PI / 4, restitution: 3, isStatic: true }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 1220,
				y: 380,
				w: 50,
				h: 5,
				color: "red",
			},
			{ angle: -PI / 4, restitution: 3, isStatic: true }
		)
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
	background("black");
	blocks.forEach((block) => block.draw());
	mouse.draw();
	polygon.draw();
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
					y: -0.005,
				});
			}
			break;
		default:
			console.log(event.key);
	}
}
