let magnet;
let boxes;
let blocks = [];

function setup() {
	const canvas = createCanvas(800, 600);

	// create an engine
	let engine = Matter.Engine.create();
	let world = engine.world;

	blocks.push(
		new BlockCore(
			world,
			{
				x: 300,
				y: 500,
				w: 900,
				h: 20,
				color: "red",
			},
			{ isStatic: true }
		)
	);

	ball = new Ball(
		world,
		{
			x: 300,
			y: 80,
			r: 30,
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

	// add magnet
	magnet = new Magnet(
		world,
		{
			x: width / 2,
			y: height / 2,
			r: 100,
			color: "grey",
			attraction: 0.45e-5,
		},
		{ isStatic: true }
	);

	magnet.addAttracted(ball);

	// add a mouse to manipulate Matter objects
	mouse = new Mouse(engine, canvas, { stroke: "magenta", strokeWeight: 2 });

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
}
