// Küche mit Regalen und Abflussschacht

function scene6() {
	sceneBack.style["background"] = 'url("./frame6/background.png") no-repeat';
	sceneFore.style["background"] = "";
	//ei Bewegung
	eiX = 0.018;
	eiY = -0.062;
	//ei
	ei = new PolygonFromSVG(
		world,
		{
			x: ei.body.position.x,
			y: 0,
			image: crackedblack,
			fromFile: "./eggState/pathei.svg",
			scale: 1,
		},
		{ label: "Murmel", isStatic: false, friction: 0.1, density: 0.001 }
	);
	//Bretter oben
	brett2a = new PolygonFromSVG(
		world,
		{
			x: 797,
			y: 57,
			image: brett2aImage,
			fromFile: "./frame6/brett3.svg",
			scale: 1,
			trigger: () => {
				Matter.Body.setStatic(brett2a.body, false);
				Matter.Body.setStatic(brett2b.body, false);
				brechen.play();
			},
		},
		{ isStatic: true }
	);
	blocks.push(brett2a);
	brett2b = new PolygonFromSVG(
		world,
		{
			x: 933,
			y: 57,
			image: brett2bImage,
			fromFile: "./frame6/brett4.svg",
			scale: 1,
			trigger: () => {
				Matter.Body.setStatic(brett2a.body, false);
				Matter.Body.setStatic(brett2b.body, false);
				brechen.play();
			},
		},
		{ isStatic: true }
	);
	blocks.push(brett2b);
	//Bretter unten
	brett3a = new PolygonFromSVG(
		world,
		{
			x: 836,
			y: 178,
			image: brett3aImage,
			fromFile: "./frame6/brett5.svg",
			scale: 1,
			trigger: () => {
				Matter.Body.setStatic(brett3a.body, false);
				Matter.Body.setStatic(brett3b.body, false);
				brechen.play();
			},
		},
		{ isStatic: true }
	);
	blocks.push(brett3a);
	brett3b = new PolygonFromSVG(
		world,
		{
			x: 975,
			y: 175,
			image: brett3bImage,
			fromFile: "./frame6/brett6.svg",
			scale: 1,
			trigger: () => {
				Matter.Body.setStatic(brett3a.body, false);
				Matter.Body.setStatic(brett3b.body, false);
				brechen.play();
			},
		},
		{ isStatic: true }
	);
	blocks.push(brett3b);

	//Brett Halterung oben
	blocks.push(
		new BlockCore(
			world,
			{
				x: 795,
				y: 90,
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
				x: 1010,
				y: 90,
				w: 15,
				h: 40,
			},
			{ isStatic: true }
		)
	);

	//Brett Halterung unten
	blocks.push(
		new BlockCore(
			world,
			{
				x: 805,
				y: 208,
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
				x: 1018,
				y: 208,
				w: 15,
				h: 40,
			},
			{ isStatic: true }
		)
	);
	//Boden
	blocks.push(
		new BlockCore(
			world,
			{
				x: 500,
				y: 700,
				w: 1480,
				h: 40,
			},
			{ isStatic: true, restitution: 0.5, friction: 0.001 }
		)
	);
	//Blocker beim Besen
	blocks.push(
		new BlockCore(
			world,
			{
				x: 1280,
				y: 400,
				w: 40,
				h: 800,
			},
			{ isStatic: true, restitution: 0.5, friction: 0.001 }
		)
	);
	blocks.push(
		new BlockCore(
			world,
			{
				x: 1240,
				y: 550,
				w: 40,
				h: 400,
			},
			{
				isStatic: true,
				restitution: 0.5,
				friction: 0.001,
				angle: PI / 15,
			}
		)
	);
	//Automatischer Szenen wechsler
	blocks.push(
		new BlockCore(
			world,
			{
				x: 1150,
				y: 650,
				w: 140,
				h: 100,
				trigger: () => {
					switchScene(6);
					abwasser.play();
					abwasser.volume = 0.8;
				},
			},
			{ isSensor: true, isStatic: true }
		)
	);
}
