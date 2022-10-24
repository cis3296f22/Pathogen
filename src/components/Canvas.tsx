/*
 * For Tips and Advanced Usage read this Blog Post
 * https://levelup.gitconnected.com/integrating-p5-sketches-into-your-react-app-de44a8c74e91
 */
import React from 'react';
import Sketch from 'react-p5';
import p5Types from "p5";

class Canvas extends React.Component {
	y = 0;
    dir = 1;
    cx = 0;
    cy = 0;
    dx = 1;
    dy = 1;

	setup = (p5: p5Types, parentRef: Element) => {
		p5.createCanvas(200, 200).parent(parentRef);
        this.cx = p5.width / 2;
        this.cy = p5.height / 2;
	};

	draw = (p5: p5Types) => {
		p5.background(0); // fill the canvas background

        
        p5.push();                        // new drawing state
        p5.fill(255, this.y * 1.3, 0);    // fill next shape with (r, g, b)
        p5.noStroke();                    // no outline
		p5.ellipse(this.cx, this.cy, 50); // draw an ellipse on the canvas
        p5.pop();                         // restore original drawing state

        this.cx += 2 * this.dx; // increment x value of circle
        this.cy += 1 * this.dy; // increment y value of circle

        if(this.cx > p5.width - 25 || this.cx < 25) this.dx *= -1;  // bouncing effect
        if(this.cy > p5.height - 25 || this.cy < 25) this.dy *= -1; // bouncing effect
	};

	render() {
		return (
			<Sketch setup={ this.setup } draw={ this.draw } />
		);
	}
}

export default Canvas;
