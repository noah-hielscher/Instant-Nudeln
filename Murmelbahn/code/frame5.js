function scene5() {
	sceneBack.style["background"] = 'url("./frame5/background.png") no-repeat';
	sceneFore.style["background"] = "";
	//Ei Hüpfen wir erstärkt
	eiX = 0.018;
	eiY = -0.062;

	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 420,
			y: 0,
			image: black,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);
	//Path Bild
	blocks.push(
		new BlockCore(
			world,
			{
				x: 1290,
				y: 100,
				w: 200,
				h: 200,
			},
			{ isStatic: true }
		)
	);

	//Path
	blocks.push(
		new BlockCore(
			world,
			{
				x: 500,
				y: 330,
				w: 240,
				h: 20,
			},
			{ isStatic: true, angle: PI / 13 }
		)
	);
	blocks.push(
		new BlockCore(
			world,
			{
				x: 742,
				y: 255,
				w: 240,
				h: 20,
			},
			{ isStatic: true }
		)
	);
	blocks.push(
		new BlockCore(
			world,
			{
				x: 970,
				y: 170,
				w: 240,
				h: 20,
			},
			{ isStatic: true }
		)
	);
	blocks.push(
		new BlockCore(
			world,
			{
				x: 1130,
				y: 420,
				w: 240,
				h: 20,
			},
			{ isStatic: true, angle: PI / -7 }
		)
	);
	//zerbrechende Bretter
	brett1a = new PolygonFromSVG(
		world,
		{
			x: 820,
			y: 580,
			image: brett1aImage,
			fromFile: "./frame5/brett1.svg",
			scale: 1,
			trigger: () => {
				Matter.Body.setStatic(brett1a.body, false);
				Matter.Body.setStatic(brett1b.body, false);
				ei.attributes.image = crackedblack;
			},
		},
		{ isStatic: true }
	);

	blocks.push(brett1a);

	brett1b = new PolygonFromSVG(
		world,
		{
			x: 950,
			y: 577,
			image: brett1bImage,
			fromFile: "./frame5/brett1.svg",
			scale: 1,
			trigger: () => {
				Matter.Body.setStatic(brett1a.body, false);
				Matter.Body.setStatic(brett1b.body, false);
				ei.attributes.image = cracked;
			},
		},
		{ isStatic: true }
	);

	blocks.push(brett1b);

	//Brett Halterung
	blocks.push(
		new BlockCore(
			world,
			{
				x: 793,
				y: 614,
				w: 15,
				h: 40,
			},
			{ isStatic: true }
		)
	);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 1007,
				y: 614,
				w: 15,
				h: 40,
			},
			{ isStatic: true }
		)
	);

	//Automatischer Szenen wechsler
	blocks.push(
		new BlockCore(
			world,
			{
				x: 620,
				y: 735,
				w: 1500,
				h: 40,
				trigger: () => {
					switchScene((scene + 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}
