//Küche mit Regalen

function scene5() {
	sceneBack.style["background"] = 'url("./frame5/background.png") no-repeat';
	sceneFore.style["background"] = "";
	sceneEffect.style["background"] = "";
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
				brechen.play();
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
				ei.attributes.image = crackedblack;
				brechen.play();
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

	//Objekt Salzstreuer
	blocks.push(
		new Block(world, {
			x: 730,
			y: 230,
			w: 30,
			h: 35,
			image: SaltImage,
		})
	);
	//Objekt Pfeffer
	blocks.push(
		new Block(world, {
			x: 750,
			y: 230,
			w: 30,
			h: 35,
			image: PepperImage,
		})
	);
	//Objekt Oel
	blocks.push(
		new Block(world, {
			x: 950,
			y: 140,
			w: 30,
			h: 60,
			image: OilImage,
		})
	);
	//Objekt Oel
	blocks.push(
		new Block(
			world,
			{
				x: 575,
				y: 300,
				w: 40,
				h: 50,
				image: OilImage,
			},
			{ angle: PI / 12, isStatic: true }
		)
	);

	//Automatischer Resetter Bildschirmrand
	blocks.push(
		new BlockCore(
			world,
			{
				x: 1280,
				y: 350,
				w: 30,
				h: 800,
				trigger: () => {
					//Musik Stop
					audioPlayer.pause();
					restart.play();
					restart.volume = 1;
					//szenen Wechsel
					sceneFore.style["background"] = "";
					switchScene(0);
					//Bewegung einfrieren
					eiX = 0;
					eiY = 0;
					console.log("Bewegun eingefrohren");
					//Musik Start
					audioPlayer.play();
					audioPlayer.volume = 0.3;
					sky.play();
					audioPlayer.currentTime = 0;
					sky.volume = 1;
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
				y: 735,
				w: 1500,
				h: 40,
				trigger: () => {
					switchScene(5);
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}
