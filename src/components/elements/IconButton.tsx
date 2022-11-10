// Third party
import React from 'react'

// Custom styles
import Styles, { IconButtonProps } from './IconButtonStyles'

export default class IconButton extends React.Component<IconButtonProps, never> {
	render (): React.ReactElement {
		return (
			<Styles.IconContainer className={this.props.className} href={this.props?.source} onClick={this.props?.onClick} target='_blank' rel='noreferrer'>
				{this.props.icon}
			</Styles.IconContainer>
		)
	}
}
