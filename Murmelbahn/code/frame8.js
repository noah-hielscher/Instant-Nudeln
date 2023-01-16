function scene8() {
	sceneBack.style["background"] = 'url("./frame8/background.png") no-repeat';
	sceneFore.style["background"] = 'url("./frame8/Person.png") no-repeat';
	//Ei Hüpfen & Physik auf normal
	eiX = 0.04;
	eiY = -0.04;
	engine.gravity.x = 0;
	engine.gravity.y = 1;

	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 250,
			y: 400,
			image: blase,
			fromFile: "./eggState/pathblase.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);
	//Boden
	blocks.push(
		new BlockCore(
			world,
			{
				x: 250,
				y: 600,
				w: 200,
				h: 20,
				color: "red",
				trigger: () => {
					console.log("magnet an");
					//Magnet wird ausgeschgalten
					//magnet.addAttracted(ei);
				},
			},
			{ isStatic: true }
		)
	);
	blocks.push(
		new BlockCore(
			world,
			{
				x: 850,
				y: 525,
				w: 800,
				h: 20,
			},
			{ isStatic: true, restitution: 0.5, friction: 0.001 }
		)
	);
	//Magnet
	magnet = new Magnet(
		world,
		{
			x: 600,
			y: 200,
			r: 20,
			color: "grey",
			attraction: 0.2e-4,
			trigger: () => {
				//Normaler Ei Status und EI Path
				ei.attributes.image = statusNormal;
				//Magnet wird ausgeschgalten
				magnet.attributes.attraction = 0.0;
			},
		},
		{ isStatic: true }
	);
	magnet.addAttracted(ei);

	blocks.push(
		new BlockCore(
			world,
			{
				x: 980,
				y: 0,
				w: 250,
				h: 15,
				trigger: () => {
					switchScene((scene + 1) % scenes.length);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}
