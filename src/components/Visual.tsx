/*
 * For Tips and Advanced Usage read this Blog Post
 * https://levelup.gitconnected.com/integrating-p5-sketches-into-your-react-app-de44a8c74e91
 */
import React from 'react';
import Sketch from 'react-p5';
import p5Types from "p5";

class Visual extends React.Component {
	y = 0;
	direction = '^';

	setup = (p5: p5Types, parentRef: Element) => {
		p5.createCanvas(200, 200).parent(parentRef);
	};

	draw = (p5: p5Types) => {
		p5.background(0);
		p5.fill(255, this.y * 1.3, 0);
		p5.ellipse(p5.width / 2, this.y, 50);
		if (this.y > p5.height) this.direction = '';
		if (this.y < 0) {
			this.direction = '^';
		}
		if (this.direction === '^') this.y += 8;
		else this.y -= 4;
	};

	render() {
		return (
			<Sketch setup={ this.setup } draw={ this.draw } />
		);
	}
}

export default Visual;
