function scene2() {
	sceneBack.style["background"] = 'url("./frame2/background.png") no-repeat';
	sceneFore.style["background"] = 'url("./frame2/Schornstein.png") no-repeat';
	let wolken2, wolken3;

	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: ei.body.position.x,
			y: 0,
			image: statusNormal,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);

	//Path
	wolken2 = new PolygonFromSVG(
		world,
		{
			x: 180,
			y: 100,
			fromFile: "./frame2/Clouds-Test-Section2.svg",
			scale: 1,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken2);

	wolken2 = new PolygonFromSVG(
		world,
		{
			x: 465,
			y: 310,
			fromFile: "./frame2/Clouds-Test-Section2.svg",
			scale: 0.8,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken2);

	wolken3 = new PolygonFromSVG(
		world,
		{
			x: 800,
			y: 160,
			fromFile: "./frame2/wolkeRechts.svg",
			scale: 1,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(wolken3);

	//Automatischer Resetter
	blocks.push(
		new BlockCore(
			world,
			{
				x: -50,
				y: 730,
				w: 1000,
				h: 40,
				force: { x: -0.022, y: -0.016 },
				trigger: () => {
					switchScene(Math.abs(scene - 1) % scenes.length);
					sceneFore.style["background"] = "";
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
	blocks.push(
		new BlockCore(
			world,
			{
				x: 1280,
				y: 730,
				w: 1000,
				h: 40,
				force: { x: -0.022, y: -0.016 },
				trigger: () => {
					sceneFore.style["background"] = "";
					switchScene(Math.abs(scene - 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);

	//Automatischer Szenen wechsler
	blocks.push(
		new BlockCore(
			world,
			{
				x: 620,
				y: 720,
				w: 330,
				h: 40,
				trigger: () => {
					switchScene((scene + 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}
