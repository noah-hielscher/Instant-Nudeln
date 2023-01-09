let kamin1;
let normal;

let ei;

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

blocks.push(
	new BlockCore(
		world,
		{
			x: 750,
			y: 170,
			w: 200,
			h: 40,
			force: { x: -0.047, y: -0.016 },
		},
		{ isSensor: true, isStatic: true }
	)
);

blocks.push(
	new BlockCore(
		world,
		{
			x: 900,
			y: 390,
			w: 150,
			h: 40,
			force: { x: -0.047, y: -0.016 },
		},
		{ isSensor: true, isStatic: true, angle: PI / -9 }
	)
);

blocks.push(
	new BlockCore(
		world,
		{
			x: 900,
			y: 610,
			w: 200,
			h: 40,
			force: { x: -0.047, y: -0.016 },
		},
		{ isSensor: true, isStatic: true, angle: PI / -9 }
	)
);

blocks.push(
	new BlockCore(
		world,
		{
			x: 680,
			y: 648,
			w: 300,
			h: 40,
			force: { x: -0.022, y: -0.016 },
		},
		{ isSensor: true, isStatic: true }
	)
);
