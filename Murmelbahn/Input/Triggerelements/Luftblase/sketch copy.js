const Events = Matter.Events;

let magnet;
let boxes;
let blocks = [];

let polygon;
let ground;

function setup() {
	const canvas = createCanvas(1280, 720);
	// create an engine
	let engine = Matter.Engine.create();
	let world = engine.world;

	polygon = new PolygonFromSVG(
		world,
		{
			x: 200,
			y: 600,
			fromFile: "./path.svg",
			scale: 1,
			color: "white",
		},
		{ isStatic: true, friction: 0.0 }
	);

	ball = new Ball(
		world,
		{
			x: 300,
			y: 100,
			r: 30,
			stroke: "blue",
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
				//Magnet wird ausgeschgalten
				ball.attributes.stroke = "black";
			},
		},
		{ isStatic: true }
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 300,
				y: 600,
				w: 10,
				h: 20,
				color: "red",
				trigger: () => {
					console.log("magnet an");
					//Magnet wird ausgeschgalten
					magnet.addAttracted(ball);
				},
			},
			{ isStatic: true }
		)
	);

	// add a mouse to manipulate Matter objects
	mouse = new Mouse(engine, canvas, { stroke: "magenta", strokeWeight: 2 });

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
	Matter.Runner.run(engine);
}

function draw() {
	background(0);

	if (mouseIsPressed) {
		// smoothly move the attractor body towards the mouse
		Matter.Body.translate(magnet.body, {
			x: (mouseX - magnet.body.position.x) * 0.25,
			y: (mouseY - magnet.body.position.y) * 0.25,
		});
	}
	blocks.forEach((block) => block.draw());
	magnet.attract();
	magnet.draw();
	mouse.draw();
	polygon.draw();
}
