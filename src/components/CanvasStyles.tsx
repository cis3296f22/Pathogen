import styled from 'styled-components'

export type Parameters = {
	gridRows: number,
	gridColumns: number,
	pause: boolean,
	apply: boolean,
	speed: number,
	generationSkip: number,
	population: number,
	mutation: number
}

export default class CanvasStyles {
	static readonly Canvas = styled.div`
		display: flex;
        justify-content: center;
        align-items: center;
	`
}
