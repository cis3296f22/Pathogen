/*
 * For Tips and Advanced Usage read this Blog Post
 * https://levelup.gitconnected.com/integrating-p5-sketches-into-your-react-app-de44a8c74e91
 */
import React from 'react';
import Sketch from 'react-p5';
import p5Types from "p5";
import Grid from "./classes/Grid";

class Canvas extends React.Component {

    rows = 20;
    cols = 20;
    grid = new Grid(this.rows, this.cols);

	setup = (p5: p5Types, parentRef: Element) => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(parentRef);
	};

	draw = (p5: p5Types) => {
		p5.background(0);
        this.grid.show(p5);
	};

	render() {
		return (
			<Sketch setup={ this.setup } draw={ this.draw } />
		);
	}
}

export default Canvas;
