import styled, { css } from 'styled-components'
import Constants from '../../tools/Constants'
import { Colors } from '../../tools/Constants'
import IconButton from './IconButton'

export type SimContextProps = {
    generation: number,
    mutationRate: number,
    progress: number
}

export default class SimContextStyles {

    static readonly SimContextHeight = `calc(var(--vh) * .15 * 0.25)`;
    static readonly offsetHeight = `calc(var(--vh) * .15 * 0.75)`;

	static readonly SimContextContainer = styled.div<{open: boolean}>`
        z-index: 100;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        top: ${this.offsetHeight};
        height: ${this.SimContextHeight};

        background-color: rgba(34, 37, 41, 0.5);
        border-radius: 2% 2% 0 0;
        width: calc(var(--vh) * .35);

        display: grid;
        grid-template-columns: 33% 33% 33%;
        grid-template-rows: auto;
        justify-items: center;
        align-items: center;
	`

    static readonly GenerationCounter = styled.div`
    color: white;
    font-size: 1.25rem;
    `

    static readonly MutationRate = styled.div`
    color: White;
    font-size: 1.25rem;
    `

    static readonly progressbar = styled.div`
    color: white;
    font-size: 1.5rem;
    width: 100%;
    `

    static readonly DropdownIcon = styled(IconButton)`
        grid-row: 2;
        grid-column: 4;
        top: 0;
    `
}
