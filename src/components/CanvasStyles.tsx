import styled from 'styled-components'

export type Parameters = {
	gridRows: number,
	gridColumns: number
}

export default class CanvasStyles {
	static readonly Canvas = styled.div`
		display: flex;
        justify-content: center;
        align-items: center;
	`
}
