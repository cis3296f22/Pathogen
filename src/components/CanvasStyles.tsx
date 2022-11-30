import styled from 'styled-components'

export type Parameters = {
	gridRows: number,
	gridColumns: number,
	pause: boolean,
	apply: boolean,
	speed: number,
	generationSkip: number,
	population: number,
	generationCount: number,
	mutation: number,
	skipVisual: boolean,
	windowSize: {height: number, width: number}
}

export default class CanvasStyles {
	static readonly Canvas = styled.div`
		display: flex;
        justify-content: center;
        align-items: center;
		position: relative;


		.GenerationCount {
			font-size: calc(var(--vh) * .015);
			position: fixed;
			bottom: 0;
			left: 0;
			margin: 10px;
			color: white;
		}

	`
}
