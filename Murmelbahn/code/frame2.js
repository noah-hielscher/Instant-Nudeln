//Himmel mit Schornstein

function scene2() {
	sceneBack.style["background"] = 'url("./frame2/background.png") no-repeat';
	sceneFore.style["background"] = 'url("./frame2/Schornstein.png") no-repeat';
	let wolken2, wolken3;

	//Falls die Bewegung nicht im ersten Frame freigestellt wurde
	eiX = 0.04;
	eiY = -0.02;

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
	//Path Schornstein
	blocks.push(
		new BlockCore(
			world,
			{
				x: 470,
				y: 650,
				w: 20,
				h: 250,
			},
			{ isStatic: true }
		)
	);
	blocks.push(
		new BlockCore(
			world,
			{
				x: 760,
				y: 650,
				w: 20,
				h: 250,
			},
			{ isStatic: true }
		)
	);

	//Automatischer Resetter unten
	blocks.push(
		new BlockCore(
			world,
			{
				x: -50,
				y: 730,
				w: 1000,
				h: 40,
				trigger: () => {
					//Musik Stop
					sky.pause();
					audioPlayer.pause();
					restart.play();
					restart.volume = 1;
					//szenen Wechsel
					sceneFore.style["background"] = "";
					switchScene(Math.abs(scene - 1) % scenes.length);
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
	blocks.push(
		new BlockCore(
			world,
			{
				x: 1280,
				y: 730,
				w: 1000,
				h: 40,
				trigger: () => {
					//Musik Stop
					sky.pause();
					audioPlayer.pause();
					restart.play();
					restart.volume = 1;
					//szenen Wechsel
					sceneFore.style["background"] = "";
					switchScene(Math.abs(scene - 1) % scenes.length);
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

	//Automatischer Resetter Bildschirmrand
	blocks.push(
		new BlockCore(
			world,
			{
				x: 0,
				y: 350,
				w: 30,
				h: 800,
				trigger: () => {
					//Musik Stop
					sky.pause();
					audioPlayer.pause();
					restart.play();
					restart.volume = 1;
					//szenen Wechsel
					sceneFore.style["background"] = "";
					switchScene(Math.abs(scene - 1) % scenes.length);
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
					sky.pause();
					audioPlayer.pause();
					restart.play();
					restart.volume = 1;
					//szenen Wechsel
					sceneFore.style["background"] = "";
					switchScene(Math.abs(scene - 1) % scenes.length);
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
				y: 720,
				w: 330,
				h: 40,
				trigger: () => {
					switchScene(2);
					sky.pause();
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}
