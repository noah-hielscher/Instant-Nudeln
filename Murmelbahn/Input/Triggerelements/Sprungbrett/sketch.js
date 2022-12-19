const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;

let engine;
let world;
let mouse;
let isDrag = false;

let blocks = [];

let Parts;

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("thecanvas");

	engine = Engine.create();
	world = engine.world;

	//Flipper
	blocks.push(
		new BlockCore(
			world,
			{
				x: windowWidth / 2,
				y: 560,
				w: 100,
				h: 5,
				color: "yellow",
			},
			{ isStatic: true, restitution: 2, density: 0.5 }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: windowWidth / 2,
				y: 800,
				w: 1400,
				h: 50,
				color: "gray",
			},
			{ isStatic: true }
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
				restitution: 0,
				density: 0.01,
				friction: 0,
				mass: 5,
			}
		)
	);

	mouse = new Mouse(engine, canvas, { stroke: "blue", strokeWeight: 3 });

	mouse.on("startdrag", (evt) => {
		isDrag = true;
	});

	Runner.run(engine);
}

function draw() {
	background(0, 20);
	blocks.forEach((block) => block.draw());
	mouse.draw();
}
