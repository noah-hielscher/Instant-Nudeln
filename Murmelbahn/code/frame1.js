function scene1() {
	sceneBack.style["background"] = 'url("./frame1/background.png") no-repeat';
	sceneFore.style["background"] = "";
	let wolken2, wolken3;

	//Erst wenn das Ei die Wolke berührt kann losgespielt werden
	blocks.push(
		new BlockCore(
			world,
			{
				x: 200,
				y: 100,
				w: 200,
				h: 40,
				trigger: () => {
					//Die Bewegung wird freigestellt
					eiX = 0.04;
					eiY = -0.02;
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);

	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 140,
			y: -880,
			image: statusNormal,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);

	//Vogel
	Vogeldraw = new PolygonFromSVG(
		world,
		{
			x: vogelX,
			y: 20,
			image: vogel,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: true }
	);
	//Path
	wolken2 = new PolygonFromSVG(
		world,
		{
			x: 160,
			y: 155,
			fromFile: "./frame2/Clouds-Test-Section2.svg",
			scale: 1.5,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken2);

	wolken2 = new PolygonFromSVG(
		world,
		{
			x: 410,
			y: 590,
			fromFile: "./frame2/Clouds-Test-Section2.svg",
			scale: 1.0,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken2);

	wolken3 = new PolygonFromSVG(
		world,
		{
			x: 780,
			y: 297,
			fromFile: "./frame1/wolken2.svg",
			scale: 1.0,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken3);

	wolken3 = new PolygonFromSVG(
		world,
		{
			x: 880,
			y: 510,
			fromFile: "./frame1/wolken2.svg",
			scale: 1.0,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken3);

	//Pusher
	blocks.push(
		new BlockCore(
			world,
			{
				x: 750,
				y: 305,
				w: 200,
				h: 40,
				force: { x: -0.096, y: -0.046 },
			},
			{ isSensor: true, isStatic: true, angle: PI / -8 }
		)
	);

	//Automatischer Szenen wechsler
	blocks.push(
		new BlockCore(
			world,
			{
				x: 640,
				y: 720,
				w: 1280,
				h: 40,
				trigger: () => {
					switchScene((scene + 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}
