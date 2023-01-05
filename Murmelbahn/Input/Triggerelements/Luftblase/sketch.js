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

let magnet;

let liftMove = -1;

let normal;
let blase;

function preload() {
	normal = loadImage("./normal.png");
	blase = loadImage("./blase.png");
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
			{ angle: PI / 3, restitution: 2, isStatic: true }
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
			{ angle: -PI / 3, restitution: 2, isStatic: true }
		)
	);

	// the ball has a label and can react on collisions
	ball = new Ball(
		world,
		{
			x: 300,
			y: 80,
			image: normal,
			color: "white",
			r: 33,
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

	blocks.push(
		new BlockCore(
			world,
			{
				x: 800,
				y: 770,
				w: 100,
				h: 20,
				color: "red",
				trigger: () => {
					console.log("magnet an");
					ball.attributes.image = blase;
					//Magnet wird ausgeschgalten
					magnet.addAttracted(ball);
				},
			},
			{ isStatic: true }
		)
	);

	// add magnet
	magnet = new Magnet(
		world,
		{
			x: 800,
			y: 100,
			r: 100,
			color: "grey",
			attraction: 0.1e-4,
			trigger: () => {
				console.log("magnet aus");
				ball.attributes.image = normal;
				//Magnet wird ausgeschgalten
				magnet.attributes.attraction = 0.0;
			},
		},
		{ isStatic: true }
	);

	//magnet.addAttracted(ball);

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
	magnet.attract();
	magnet.draw();
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
					x: 0.007,
					y: -0.05,
				});
			}
			break;
		default:
			console.log(event.key);
	}
}
