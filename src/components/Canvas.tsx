/*
 * For Tips and Advanced Usage read this Blog Post
 * https://levelup.gitconnected.com/integrating-p5-sketches-into-your-react-app-de44a8c74e91
 */
import React from 'react';
import Sketch from 'react-p5';
import p5Types from "p5";
import Grid from "./classes/Grid";
import CanvasStyles, { Parameters } from './CanvasStyles';

class Canvas extends React.Component <{params: Parameters}, {}>{
    grid = new Grid(this.props.params.gridRows, this.props.params.gridColumns);

	constructor(props: {params: Parameters}) {
		super(props)
		this.state = {}
	}

	setup = (p5: p5Types, parentRef: Element) => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(parentRef);
	};

	draw = (p5: p5Types) => {
		p5.background(255);
        this.grid.show(p5);
	};

	windowResized = (p5: p5Types) => {
		p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
	}

	/**
	 * Called when the component updates due to its props changing
	 */
	componentDidUpdate() {
		// TODO: If there are changes to the settings, then restart simulation.
		this.grid = new Grid(this.props.params.gridRows, this.props.params.gridColumns);
	}

	render() {
		return (
			<CanvasStyles.Canvas>
				<Sketch setup={ this.setup } draw={ this.draw } windowResized={ this.windowResized }/>
			</CanvasStyles.Canvas>
		);
	}
}

export default Canvas;
