import { MouseEventHandler, ReactElement } from 'react'
import styled from 'styled-components'
import { Colors } from '../../tools/Constants'

export type IconButtonProps = {
    tooltip?: string,
    className?: string,
	icon: ReactElement,
	source?: string,
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

export default class IconButtonStyles {
	static readonly IconContainer = styled.a`
		display: flex;
        color: white;
        align-items: center;
        justify-content: center;

        :hover {
            color: ${Colors.SECONDARY};
            cursor: pointer;
        }
	`

    // TODO: Figure out tooltip positioning
    static readonly Tooltip = styled.div<{hover: boolean, position: {left: number, top: number}}>`
        position: fixed;
        /* z-index: 110; */
        visibility: ${props => props.hover ? 'visible' : 'hidden'};
        top: ${props => props.position.top}px;
        left: ${props => props.position.left}px;
        font-size: calc(var(--vh) * .01);
        padding-left: calc(var(--vh) * .01);
        padding-right: calc(var(--vh) * .01);
        border-radius: 100px;
        background-color: ${Colors.PRIMARY};
        color: white;
        opacity: ${props => props.hover ? 0.7 : 0};
        transition: ${props => props.hover ? 'visibility 0s, opacity 0.4s' : 'visibility 0.4s, opacity 0.4s'};
    `
}
