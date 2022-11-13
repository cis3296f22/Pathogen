import styled, { css } from 'styled-components'
import { Colors } from '../../tools/Constants'
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai'
import IconButton from './IconButton'
import { BsFillLightningChargeFill } from 'react-icons/bs'

export type DropdownProps = {
	isPaused: boolean,
    pausePlay: Function,
    setSpeed: Function,
    speed: number
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

	static readonly DropdownContainer = styled.div<{open: boolean}>`
        z-index: 100;
        position: fixed;
        right: 0;
        background-color: ${Colors.PRIMARY};
        height: ${this.dropdownHeight};
        width: calc(var(--vh) * .25);
        display: grid;
        grid-template-columns: 10% 10% 70% 10%;
        grid-template-rows: 80% 20%;
        justify-items: center;
        align-items: center;

        ${props => props.open ? this.OpenDropdown : this.ClosedDropdown}
	`

    static readonly Skip = styled(BsFillLightningChargeFill)`
        grid-row: 2;
        grid-column: 1;
        color: white;
    `

    static readonly DropdownIcon = css`
        & {
            grid-row: 2;
            grid-column: 4;
            color: white;
        }

        :hover {
            cursor: pointer;
            color: ${Colors.SECONDARY};
        }
    `

    static readonly DropdownIconUp = styled(AiFillCaretUp)`${this.DropdownIcon}`
    static readonly DropdownIconDown = styled(AiFillCaretDown)`${this.DropdownIcon}`

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
}
