import React from 'react';
import ReactSlider, {InputSliderProps} from 'react-input-slider';
import Styles from './SliderStyles';

export interface SliderProps extends InputSliderProps {
    title?: string;
}

class Slider extends React.Component <SliderProps, {}> {

	constructor(props: SliderProps) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<Styles.SliderContainer>
				{this.props.title ? <p>{this.props.title}: {this.props.x}</p> : <></>}
				<ReactSlider xstep={2} {...this.props}/>
			</Styles.SliderContainer>
		);
	}
}

export default Slider;
