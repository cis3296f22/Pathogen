import styled, { css } from 'styled-components'
import { Colors } from '../../tools/Constants'
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai'
import IconButton from './IconButton'

export type DropdownProps = {
	isPaused: boolean,
    pausePlay: Function,
    setSpeed: Function,
    speed: number
}

export default class DropdownStyles {
    static readonly OpenDropdown = css`
        & { margin-top: 0px; }
    `;

    static readonly ClosedDropdown = css`
        & { margin-top: -160px; }
    `;

    static readonly DropdownIcon = css`
        & {
            grid-row: 2;
            grid-column: 3;
            color: white;
        }

        :hover {
            cursor: pointer;
            color: ${Colors.SECONDARY};
        }
    `

	static readonly DropdownContainer = styled.div<{open: boolean}>`
        z-index: 100;
        position: fixed;
        right: 0;
        background-color: ${Colors.PRIMARY};
        height: 200px;
        width: 400px;
        display: grid;
        grid-template-columns: 20% 70% 10%;
        grid-template-rows: 80% 20%;
        justify-items: center;
        align-items: center;

        ${props => props.open ? this.OpenDropdown : this.ClosedDropdown}
	`

    static readonly DropdownIconUp = styled(AiFillCaretUp)`${this.DropdownIcon}`
    static readonly DropdownIconDown = styled(AiFillCaretDown)`${this.DropdownIcon}`

    static readonly FastForward = styled.div`
        width: 100%;
        grid-column: 2;
        grid-row: 2;
        margin: 0;
        color: white;
        display: flex;
        justify-content: center;
    `

    static readonly PlayPause = styled(IconButton)`
        grid-row: 2;
        grid-column: 1;
    `
}
