/*
 * For Tips and Advanced Usage read this Blog Post
 * https://levelup.gitconnected.com/integrating-p5-sketches-into-your-react-app-de44a8c74e91
 */
// Third party imports
import React from 'react';
import Sketch from 'react-p5';
import p5Types from "p5";
import { isMobile } from 'react-device-detect'

// Custom imports
import Grid from "./classes/Grid";
import CanvasStyles, { Parameters } from './CanvasStyles';
import Constants from '../tools/Constants';
import {Colors} from '../tools/Constants';

class Canvas extends React.Component <{params: Parameters, windowWidth: number}, {}>{
    grid: Grid;

	constructor(props: {params: Parameters, windowWidth: number}) {
		super(props);
		this.state = {};
        this.grid = new Grid(this.props.params.gridRows, this.props.params.gridColumns);
	}

	setup = (p5: p5Types, parentRef: Element) => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight - this.props.windowWidth * Constants.BANNER_HEIGHT_RATIO).parent(parentRef);
	};

	draw = (p5: p5Types) => {
		p5.background(Colors.SECONDARY);
        this.grid.show(p5);
        this.grid.update(p5);
	};

	windowResized = (p5: p5Types) => {
		if (!isMobile) p5.createCanvas(p5.windowWidth, p5.windowHeight - this.props.windowWidth * Constants.BANNER_HEIGHT_RATIO);
	}

	/**
	 * Called when the component updates due to its props changing
	 */
	componentDidUpdate(prevProps: {params: Parameters, windowWidth: number}) {
		if (prevProps.params !== this.props.params)
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
