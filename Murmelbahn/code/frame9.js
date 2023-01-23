// Herd mit Ei in der Pfanne

function scene9() {
	sceneBack.style["background"] = 'url("./frame9/background.png") no-repeat';
	sceneFore.style["background"] = "";
	sceneEffect.style["background"] = "";
	//Gravitiy
	//engine.gravity.x = 0;
	engine.gravity.y = 0.7;

	eiX = 0.05;
	eiY = -0.04;

	// Ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 20,
			y: 500,
			image: cracked,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);

	//zweites ei
	zweitesEi = new PolygonFromSVG(
		world,
		{
			x: 920,
			y: 300,
			image: cracked,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ isStatic: false, friction: 0.1, density: 0.001 }
	);
	blocks.push(zweitesEi);

	//Path
	blocks.push(
		new PolygonFromSVG(
			world,
			{
				x: 370,
				y: 550,
				fromFile: "./frame9/kochloeffel.svg",
				scale: 1,
			},
			{ isStatic: true, restitution: 0.5, friction: 0.001 }
		)
	);

	//Ei berührt Pfanne
	blocks.push(
		new BlockCore(
			world,
			{
				x: 670,
				y: 680,
				w: 250,
				h: 15,
				trigger: () => {
					//Sound
					eiPfanne.play();
					ziel.play();
					//Bildtausch Ei
					ei.attributes.image = done;
					ei.attributes.scale = 1.3;
					//Bewegung Spacebar wird ausgeschalten
					engine.gravity.y = 1;
					ei.options.isStatic = true;
					eiX = 0;
					eiY = 0;
					//Hintergrundmusik
					audioPlayer.pause();
					kitchen.pause();
				},
			},
			{ isSensor: false, isStatic: true }
		)
	);

	//Path fürs zweite Ei
	blocks.push(
		new BlockCore(
			world,
			{
				x: 950,
				y: 340,
				w: 800,
				h: 20,
			},
			{
				isStatic: true,
				isSensor: false,
				restitution: 0.5,
				friction: 0.001,
				angle: -PI / -20,
			}
		)
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
