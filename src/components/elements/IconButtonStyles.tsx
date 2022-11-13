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
        font-size: 100%;
        border-radius: 100%;
        color: white;
        align-items: center;
        justify-content: center;

        :hover {
            color: ${Colors.SECONDARY};
            cursor: pointer;
        }
	`

    static readonly Tooltip = styled.div<{hover: boolean}>`
        position: relative;
        top: -20%;
        left: 50%; // TODO: Figure out tooltip positioning
        margin: 10%;
        padding-left: 10%;
        padding-right: 10%;
        border-radius: 10%;
        background-color: ${Colors.PRIMARY};
        color: white;
        opacity: ${props => props.hover ? 0.8 : 0};
        transition: opacity 0.4s;
    `
}
