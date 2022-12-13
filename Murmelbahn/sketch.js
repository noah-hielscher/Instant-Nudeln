let ground;

function setup() {
	const canvas = createCanvas(700, 600);

	// create an engine
	const engine = Matter.Engine.create();
	const world = engine.world;

	// add the ground
	ground = new Block(
		world,
		{ x: width / 2, y: 500, w: 600, h: 25, color: "grey" },
		{ isStatic: true }
	);

	// setup mouse
	mouse = new Mouse(engine, canvas, { stroke: "white", strokeWeight: 2 });

	// run the engine
	Matter.Runner.run(engine);
}

function draw() {
	background("black");

	mouse.draw();
	ground.draw();
}
