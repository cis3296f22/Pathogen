import styled, { css } from 'styled-components'
import { Colors } from '../../tools/Constants'
import IconButton from './IconButton'
import Slider from './Slider'

export type DropdownProps = {
	isPaused: boolean,
    pausePlay: Function,
    setSpeed: Function,
    speed: number,
    mutation: number,
    setMutation: Function,
    skipVisual: Function,
    windowSize: {height: number, width: number}
}

export default class DropdownStyles {

    static readonly dropdownHeight = `calc(var(--vh) * .125)`;
    static readonly minimizedDropdownOffset = `calc(var(--vh) * .125 * 0.8 * -1)`;

    static readonly OpenDropdown = css`
        & { margin-top: 0px; }
    `;

    static readonly ClosedDropdown = css`
        & { margin-top: ${this.minimizedDropdownOffset}; }
    `;

	static readonly DropdownContainer = styled.div<{open: boolean, location: number}>`
        z-index: 100;
        overflow: hidden;
        position: fixed;
        right: ${props => props.location}px;
        background-color: ${Colors.PRIMARY_TRANSPARENT};
        border-radius: 0 0 5% 5%;
        height: ${this.dropdownHeight};
        width: calc(var(--vh) * .25);
        display: grid;
        grid-template-columns: 10% 10% 60% 10% 10%;
        grid-template-rows: 80% 20%;
        justify-items: center;
        align-items: center;

        ${props => props.open ? 'margin-top: 0px;' : this.ClosedDropdown}
	`

    static readonly HiddenSettings = styled.div`
        align-self: start;
        width: 100%;
        grid-row: 1;
        grid-column-start: 1;
        grid-column-end: 5;
    `

    static readonly MutationRate = styled(Slider)`
        width: 100%;
        color: white;
        display: flex;
		justify-content: space-around;
    `

    static readonly Skip = styled(IconButton)`
        grid-row: 2;
        grid-column: 1;
    `

    static readonly FastForward = styled.div`
        grid-column: 3;
        grid-row: 2;
        margin: 0;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: calc(var(--vh) * .01);
    `

    static readonly PlayPause = styled(IconButton)`
        grid-row: 2;
        grid-column: 2;
    `

    static readonly DropdownIcon = styled(IconButton)`
        grid-row: 2;
        grid-column: 4;
    `

    static readonly DragIconContainer = styled.div<{open: boolean}>`
        width: 100%;
        height: 100%;
        display: flex;
        color: white;
        grid-row-start: ${props => props.open ? 1 : 2};
        grid-row-end: 3;
        grid-column: 5;
        background-color: ${Colors.PRIMARY};
        justify-content: center;
        align-items: center;

        :hover {
            cursor: pointer;
        }
    `
}
