//Kamin

function scene4() {
	sceneBack.style["background"] = 'url("./frame4/background.png") no-repeat';
	sceneFore.style["background"] = 'url("./Frame4/staub2.png") no-repeat';
	sceneEffect.style["background"] =
		'url("./Frame3/staubeffect.png") no-repeat';

	let kamin2, kamin3;

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

	//Path
	kamin2 = new PolygonFromSVG(
		world,
		{
			x: 730,
			y: 270,
			fromFile: "./frame4/kamin2a.svg",
			scale: 1,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(kamin2);

	//Path
	kamin3 = new PolygonFromSVG(
		world,
		{
			x: 520,
			y: 225,
			fromFile: "./frame4/kamin2b.svg",
			scale: 1,
		},
		{ isStatic: true, friction: 0.0 }
	);
	blocks.push(kamin3);

	//Automatischer Szenen wechsler
	blocks.push(
		new BlockCore(
			world,
			{
				x: 620,
				y: 720,
				w: 600,
				h: 40,
				trigger: () => {
					switchScene((scene + 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}
