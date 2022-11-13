// Third party
import React from 'react'

// Custom styles
import Styles, { IconButtonProps } from './IconButtonStyles'

export default class IconButton extends React.Component<IconButtonProps, { hover: boolean }> {

	constructor(props: IconButtonProps) {
		super(props);
		this.state = { hover: false };
	}

	handleMouseIn = (): void => { this.setState({ hover: true }) }
	handleMouseOut = (): void => { this.setState({ hover: false }) }
	
	render (): React.ReactElement {
		return (
			<>
				<Styles.IconContainer className={this.props.className} href={this.props?.source}
					onClick={this.props?.onClick} target='_blank' rel='noreferrer' onMouseOver={this.handleMouseIn.bind(this)}
					onMouseOut={this.handleMouseOut.bind(this)}>
					{this.props.icon}
				</Styles.IconContainer>
				{this.props.tooltip ? <Styles.Tooltip hover={this.state.hover}>{this.props.tooltip}</Styles.Tooltip> : <></>}
			</>
		)
	}
}
