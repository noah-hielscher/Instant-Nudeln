/**
Creates a new rigid body model with a circle hull.

@param {world} world - The Matter.js world object
@param {object} attributes - Visual properties e.g. position, radius and color
@param {object} [options] - Defines the behaviour e.g. mass, bouncyness or whether it can move
@extends Block

@example
const attributes = {
  x: 300,
  y: 300,
  r: 30,
  color: "magenta",
}

const options = {
  isStatic: true,
}

let magentaColoredBall = new Ball(world, attributes, options)

@tutorial
1 - Mouse Example
<a target="_blank" href="https://b-g.github.io/p5-matter-examples/1-mouse/">Open preview</a>
,
<a target="_blank" href="https://github.com/b-g/p5-matter-examples/blob/master/1-mouse/sketch.js">open code</a>

@tutorial
4 - Jumping Ball Example
<a target="_blank" href="https://b-g.github.io/p5-matter-examples/4-jumping-ball/">Open preview</a>
,
<a target="_blank" href="https://github.com/b-g/p5-matter-examples/blob/master/4-jumping-ball/sketch.js">open code</a>
*/

class Ball extends Block {
	constructor(world, attributes, options) {
		super(world, attributes, options);
	}

	addBody() {
		this.body = Matter.Bodies.circle(
			this.attributes.x,
			this.attributes.y,
			this.attributes.r,
			this.options
		);
		if (this.attributes.fromPath) {
			// use a path provided directly
			let vertices = Matter.Svg.pathToVertices(
				this.attributes.fromPath,
				10
			);
			this.addBodyVertices(vertices);
		} else {
			if (this.attributes.fromId) {
				// use a path of SVG embedded in current HTML page
				let path = document.getElementById(this.attributes.fromId);
				if (null != path) {
					let vertices = Matter.Svg.pathToVertices(path, 10);
					this.addBodyVertices(vertices);
				}
			} else {
				// use a path in separate SVG file
				let that = this;
				httpGet(
					this.attributes.fromFile,
					"text",
					false,
					function (response) {
						const parser = new DOMParser();
						const svgDoc = parser.parseFromString(
							response,
							"image/svg+xml"
						);
						const path = svgDoc.querySelector("path");
						let vertices = Matter.Svg.pathToVertices(path, 10);
						that.addBodyVertices(vertices);
						Matter.World.add(that.world, [that.body]);
					}
				);
			}
		}
	}
	addBodyVertices(vertices) {
		this.body = Matter.Bodies.fromVertices(
			0,
			0,
			Matter.Vertices.scale(
				vertices,
				this.attributes.scale,
				this.attributes.scale
			),
			this.options
		);
		if (this.attributes.x) {
			Matter.Body.setPosition(this.body, this.attributes);
		} else {
			Matter.Body.setPosition(this.body, this.getCenter(vertices));
		}
		if (this.attributes.image) {
			this.offset = {
				x:
					this.offset.x +
					(this.attributes.image.width / 2) * this.attributes.scale -
					(this.body.position.x - this.body.bounds.min.x),
				y:
					this.offset.y +
					(this.attributes.image.height / 2) * this.attributes.scale -
					(this.body.position.y - this.body.bounds.min.y),
			};
		}
	}

	getCenter(vertices) {
		let min = { x: 999999, y: 999999 };
		let max = { x: -999999, y: -999999 };
		vertices.forEach((v, i) => {
			min.x = min.x > v.x ? v.x : min.x;
			min.y = min.y > v.y ? v.y : min.y;
			max.x = max.x < v.x ? v.x : max.x;
			max.y = max.y < v.y ? v.y : max.y;
		});
		return {
			x: min.x + (this.body.position.x - this.body.bounds.min.x),
			y: min.y + (this.body.position.y - this.body.bounds.min.y),
		};
	}
}
