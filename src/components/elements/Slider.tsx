import React, { ChangeEvent } from 'react';
import Styles from './SliderStyles';
import RangeSlider from 'react-bootstrap-range-slider';
import './Slider.scss'

export interface InputSliderProps {
	value: number,
	onChange: (ev: ChangeEvent<HTMLInputElement>, value: number) => void,
	min: number,
	max: number,
	step?: number,
	disabled?: boolean,
	tooltip?: 'on' | 'auto' | 'off',
}

export interface SliderProps extends InputSliderProps {
    title?: string,
	className?: string,
	exponential?: boolean,
	hideLabel?: boolean
}

class Slider extends React.Component <SliderProps, {value: number}> {

	constructor(props: SliderProps) {
		super(props)
		this.state = {value: this.props.value}
	}

	// TODO: Implement exponential function
	exponential = (e: React.ChangeEvent<HTMLInputElement>, val: number): void => {
		this.setState({value: val});

		let max = this.props.max;
		let min = this.props.min;
		/**
		 * Solve for the constant. Found by plugging in max and min values
		 * Gives the bounds of [(min, min), (max, max)] in the conversion mapping
		 */
		let a = max / (min + Math.log(min * (max - min)));
		val = (1/min) * Math.exp((1/a)*val-min) + min;
		this.props.onChange(e, Math.floor(val));
	}

	render() {
		let {title, className, exponential, hideLabel, ...sliderProperties} = this.props;
		return (
			<Styles.SliderContainer labelName={this.props.title && !this.props.hideLabel ? true : false} className={this.props.className}>
				{this.props.title && !this.props.hideLabel ? <p>{this.props.title}: {this.props.value}</p> : <></>}
				<RangeSlider className='custom-slider' size='sm' tooltip={'off'} variant='info' step={2} {...sliderProperties}
					onChange={this.props.exponential ? this.exponential : this.props.onChange}
					value={this.props.exponential ? this.state.value : this.props.value}/>
			</Styles.SliderContainer>
		);
	}
}

export default Slider;
