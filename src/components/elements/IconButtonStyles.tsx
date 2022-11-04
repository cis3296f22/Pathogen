import { MouseEventHandler, ReactElement } from 'react'
import styled from 'styled-components'
import { Colors } from '../../tools/Constants'

export type IconButtonProps = {
	icon: ReactElement,
	source?: string,
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

export default class IconButtonStyles {
	static readonly IconContainer = styled.a`
		display: flex;
        height: calc(var(--vh) * .07);
        width: calc(var(--vh) * .07);
        /* line-height: calc(var(--vh) * .07); */
        font-size: calc(var(--vh) * .035);
        border-radius: 100%;
        color: ${Colors.SECONDARY};
        align-items: center;
        justify-content: center;

        :hover {
            color: ${Colors.HOVER};
            cursor: pointer;
        }
	`
}
