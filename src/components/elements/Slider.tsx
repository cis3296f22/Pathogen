import React, { ChangeEvent } from 'react';
import Styles from './SliderStyles';
import RangeSlider from 'react-bootstrap-range-slider';

export interface InputSliderProps {
	value: number,
	onChange: (ev: ChangeEvent<HTMLInputElement>, value: number) => void,
	min?: number,
	max?: number,
	step?: number,
	disabled?: boolean,
	tooltip?: 'on' | 'auto' | 'off'
}

export interface SliderProps extends InputSliderProps {
    title?: string,
	className?: string
}

class Slider extends React.Component <SliderProps, {}> {

	constructor(props: SliderProps) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<Styles.SliderContainer className={this.props.className}>
				{this.props.title ? <p>{this.props.title}: {this.props.value}</p> : <></>}
				<RangeSlider size='sm' step={2} {...this.props} className=''/>
			</Styles.SliderContainer>
		);
	}
}

export default Slider;
