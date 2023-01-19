function scene9() {
	sceneBack.style["background"] = "";
	sceneFore.style["background"] = "";
	sceneEffect.style["background"] = "";

	// Ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 0,
			y: ei.body.position.y,
			image: cracked,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);

	//Automatischer Szenenwechsler
	blocks.push(
		new BlockCore(
			world,
			{
				x: 1280,
				y: 400,
				w: 20,
				h: 900,
				trigger: () => {
					switchScene((scene + 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}
