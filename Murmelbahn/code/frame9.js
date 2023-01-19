function scene9() {
	sceneBack.style["background"] = 'url("./frame9/background.png") no-repeat';
	sceneFore.style["background"] = "";
	sceneEffect.style["background"] = "";
	//Gravitiy
	//engine.gravity.x = 0;
	engine.gravity.y = 0.4;

	eiX = 0.05;
	eiY = -0.01;

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
