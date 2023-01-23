// Küche Arbeitsplatte

function scene8() {
	sceneBack.style["background"] = 'url("./frame8/background.png") no-repeat';
	sceneFore.style["background"] = 'url("./frame8/Person.png") no-repeat';
	sceneEffect.style["background"] = "";

	//Ei Hüpfen & Physik auf normal
	eiX = 0.04;
	eiY = -0.04;
	engine.gravity.y = 0;

	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 260,
			y: 470,
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
			x: 720,
			y: 258,
			r: 20,
			attraction: 0.1e-7,
			//attraction: 0.2e-4,
			//0.1e-6,
			trigger: () => {
				blasesound.play();
				//Normaler Ei Status und EI Path
				ei.attributes.image = cracked;
				ei.attributes.fromFile = "./eggState/pathei.svg";
				//Magnet wird ausgeschgalten
				magnet.attributes.attraction = 0.0;
				//Gravity wird zurückgestellt
				engine.gravity.y = 1;
			},
		},
		{ isStatic: true }
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
					switchScene(8);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}
