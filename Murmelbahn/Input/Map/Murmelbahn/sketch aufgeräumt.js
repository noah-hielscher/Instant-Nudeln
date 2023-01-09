const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;

// the Matter engine to animate the world
let engine;
let world;
let mouse;
let ball;
let isDrag = false;

// an array to contain all the blocks created
let blocks = [];

// an array to contain all the scene functions
let scenes = [scene1, scene2];
let scene = 0;
let sceneBack, sceneFore;

function setup() {
	let canvas = createCanvas(1280, 720);
	canvas.parent("thecanvas");

	engine = Engine.create();
	world = engine.world;

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
	sceneBack = document.getElementById("scene-background");
	sceneFore = document.getElementById("scene-foreground");
	switchScene(0);
}

function scene1() {
	//sceneBack.style["background"] = 'url("./scene1_back.jpg") no-repeat';
}

function scene2() {
	//sceneBack.style["background"] = 'url("./scene2_back.jpg") no-repeat';
}

function switchScene(newScene) {
	console.log("Scene", newScene);
	// cleanup of all blocks in the old scene
	blocks.forEach((block) => Matter.World.remove(world, block.body));
	blocks = [];

	// activate the new scene
	scene = newScene;
	scenes[scene]();
}

function draw() {
	clear();
	blocks.forEach((block) => block.draw());
	mouse.draw();
}

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
					x: 0.04,
					y: -0.02,
				});
			}
			break;
		default:
			console.log(event.key);
	}
}
