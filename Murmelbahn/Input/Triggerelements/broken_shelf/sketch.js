
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
let halterung;

let trap1;
let trap2;




function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('thecanvas');

  engine = Engine.create();
  world = engine.world;

  trap1 = new BlockCore(
    world, {
    x: 200,
    y: 200,
    w: 200,
    h: 5,
    color: 'yellow'
  }, 
  {angle: radians(0), isStatic: true}
  );

  blocks.push(trap1);

  trap2 = new BlockCore(
    world, {
    x: 400,
    y: 200,
    w: 200,
    h: 5,
    color: 'yellow',
    trigger: (Murmel, block)=> {
        Matter.Body.setStatic (trap1.body,false);
        Matter.Body.setStatic (trap2.body, false);
       
    }
  }, 
  {angle: radians(5), isStatic: true}
  );

  blocks.push(trap2);


  halterung = new Ball(
    world, {
    x: 400,
    y: 220,
    r: 15,
    color: 'white'
  }, 
  {  isStatic: true }
  );

  blocks.push(halterung);

  halterung = new Ball(
    world, {
    x: 200,
    y: 220,
    r: 15,
    color: 'white'
  }, 
  {  isStatic: true }
  );

  blocks.push(halterung);

  

  // the ball has a label and can react on collisions
  blocks.push(new Ball(
    world, {
    x: 300,
    y: 80,
    r: 30,
    color: 'magenta'
  }, {  label: "Murmel", restitution: 0.5, density: 1.5, friction: 0.0, frictionAir: 0.0 }
  )); 

  // Bodys kann man benenen -> bodys identifiezieren, Murmel aktives Element 

  // add a mouse so that we can manipulate Matter objects
  mouse = new Mouse(engine, canvas, { stroke: 'blue', strokeWeight: 3 });


  // process collisions - check whether block "Murmel" hits another Block
  Events.on(engine, 'collisionStart', (event) => {
    var pairs = event.pairs;
    pairs.forEach((pair, i) => {
      if (pair.bodyA.label == 'Murmel') {
        pair.bodyA.plugin.block.collideWith(pair.bodyB.plugin.block)
      }
      if (pair.bodyB.label == 'Murmel') {
        pair.bodyB.plugin.block.collideWith(pair.bodyA.plugin.block)
      }
    })
  })
  // run the engine
  Runner.run(engine);
}

function draw() {
  background(0, 10);
  blocks.forEach(block => block.draw());
  mouse.draw();
}