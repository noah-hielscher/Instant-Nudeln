// Im Schornstein mit Rußwolken

function scene3() {
	sceneBack.style["background"] = 'url("./frame3/background.png") no-repeat';
	sceneFore.style["background"] = 'url("./frame3/staub1.png") no-repeat';

	let kamin1;

	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 878,
			y: 0,
			image: statusNormal,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);

	//Path
	kamin1 = new PolygonFromSVG(
		world,
		{
			x: 640,
			y: 360,
			fromFile: "./frame3/kamin1.svg",
			scale: 1,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(kamin1);

	//Pusher
	blocks.push(
		new BlockCore(
			world,
			{
				x: 900,
				y: 140,
				w: 200,
				h: 40,
				force: { x: -0.046, y: -0.016 },
			},
			{ isSensor: true, isStatic: true, angle: PI / -6 }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 760,
				y: 185,
				w: 200,
				h: 40,
				force: { x: -0.036, y: -0.026 },
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
				w: 180,
				h: 40,
				force: { x: -0.058, y: -0.012 },
				trigger: () => {
					staub.play();
					ei.attributes.image = black;
					sceneEffect.style["background"] =
						'url("./frame3/staubeffect.png") no-repeat';
				},
			},
			{ isSensor: true, isStatic: true, angle: PI / -15 }
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

	//Automatischer Szenen wechsler
	blocks.push(
		new BlockCore(
			world,
			{
				x: 330,
				y: 720,
				w: 300,
				h: 40,
				trigger: () => {
					switchScene(3);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}
