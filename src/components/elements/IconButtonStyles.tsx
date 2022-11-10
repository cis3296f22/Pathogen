import { MouseEventHandler, ReactElement } from 'react'
import styled from 'styled-components'
import { Colors } from '../../tools/Constants'

export type IconButtonProps = {
    className?: string,
	icon: ReactElement,
	source?: string,
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

export default class IconButtonStyles {
	static readonly IconContainer = styled.a`
		display: flex;
        /* height: calc(var(--vh) * .07);
        width: calc(var(--vh) * .07); */
        /* line-height: calc(var(--vh) * .07); */
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
}
