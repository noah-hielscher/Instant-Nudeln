function scene7() {
	sceneBack.style["background"] = 'url("./frame7/background.png") no-repeat';
	sceneFore.style["background"] = "";
	//Ei Hüpfen wir erstärkt
	eiX = 0.04;
	eiY = -0.04;

	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: 118,
			y: 0,
			image: crackedblack,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);
	//wasserspritzer
	blocks.push(
		new BlockCore(
			world,
			{
				x: 530,
				y: 570,
				w: 30,
				h: 100,
				trigger: () => {
					sceneEffect.style["background"] =
						'url("./Frame7/splash.png") no-repeat';
					watersplash.play();
					watersplash.volume = 0.7;
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
	//Bewegung & Physik ab Wasser
	blocks.push(
		new BlockCore(
			world,
			{
				x: 630,
				y: 570,
				w: 30,
				h: 100,
				trigger: () => {
					eiX = 0.04;
					eiY = 0.03;
					engine.gravity.x = 0;
					engine.gravity.y = -1;
					ei.attributes.image = cracked;
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
	//Pusher
	blocks.push(
		new BlockCore(
			world,
			{
				x: 1100,
				y: 300,
				w: 200,
				h: 40,
				force: { x: -0.056, y: 0.026 },
			},
			{ isSensor: true, isStatic: true }
		)
	);
	blocks.push(
		new BlockCore(
			world,
			{
				x: 800,
				y: 220,
				w: 250,
				h: 40,
				force: { x: -0.056, y: 0.026 },
			},
			{ isSensor: true, isStatic: true }
		)
	);

	//Path
	blocks.push(
		new BlockCore(
			world,
			{
				x: 55,
				y: 110,
				w: 20,
				h: 210,
			},
			{ isStatic: true }
		)
	);
	blocks.push(
		new PolygonFromSVG(
			world,
			{
				x: 810,
				y: 510,
				fromFile: "./frame7/kanal.svg",
				scale: 1,
			},
			{ isStatic: true, friction: 0.0 }
		)
	);
	blocks.push(
		new PolygonFromSVG(
			world,
			{
				x: 810,
				y: 360,
				fromFile: "./frame7/kanal2.svg",
				scale: 1,
			},
			{ isStatic: true, friction: 0.0 }
		)
	);
	//Automatischer Szenen wechsler
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
					abwasser.pause();
					kitchen.play();
					kitchen.volume = 0.7;
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}
