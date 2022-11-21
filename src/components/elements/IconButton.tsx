// Third party
import React from 'react'
import { v4 as uuid } from 'uuid';

// Custom styles
import Styles, { IconButtonProps } from './IconButtonStyles'

export default class IconButton extends React.Component<IconButtonProps, { hover: boolean }> {
	iconId = uuid();

	constructor(props: IconButtonProps) {
		super(props);
		this.state = { hover: false };
	}

	handleMouseIn = (): void => { this.setState({ hover: true }) }
	handleMouseOut = (): void => { this.setState({ hover: false }) }

	// Sets the position for the tooltip
	getIconPosition = (): {left: number, top: number} => {
		let el = document.getElementById(this.iconId)?.getBoundingClientRect();
		let left = el?.left ?? -100;
		let top = (el?.top ?? -100) + (el?.height ?? -100) + 6;
		return {left: left, top: top}
	}
	
	render (): React.ReactElement {
		return (
			<>
				<Styles.IconContainer className={this.props.className} href={this.props?.source}
					onClick={this.props?.onClick} target='_blank' rel='noreferrer' onMouseOver={this.handleMouseIn.bind(this)}
					onMouseOut={this.handleMouseOut.bind(this)} onMouseDown={this.handleMouseOut.bind(this)}>
					{/* Create the icon with new 'id' for reference capabilities */}
					{React.cloneElement(this.props.icon, {id: this.iconId})}
				</Styles.IconContainer>
				{this.props.tooltip ? <Styles.Tooltip position={this.getIconPosition()} hover={this.state.hover}>{this.props.tooltip}</Styles.Tooltip> : <></>}
			</>
		)
	}
}
