// Third party
import React from 'react'
import { FaFastForward, FaPause, FaPlay } from 'react-icons/fa';
import Constants from '../../tools/Constants';

// Custom styles
import Styles, { DropdownProps } from './DropdownStyles'
import Slider from './Slider';

export default class DropDown extends React.Component<DropdownProps, { open: boolean }> {

    constructor(props: DropdownProps) {
		super(props)
		this.state = { 
			open: false
		}
	}

	render (): React.ReactElement {
		return (
			<Styles.DropdownContainer open={this.state.open} className='dropdown-container'>
                <Styles.PlayPause icon={this.props.isPaused ? <FaPlay/> : <FaPause/>} onClick={() => this.props.pausePlay()} />
                <Styles.FastForward>
                    <FaFastForward/>
                    <Slider axis='x' x={this.props.speed} 
                        xmax={Constants.SPEED_MAX} xmin={Constants.SPEED_MIN}
                        onChange={({x}) => this.props.setSpeed(x)} xstep={1}/>
                </Styles.FastForward>
                { this.state.open ?
                    <Styles.DropdownIconUp onClick={() => this.setState({open: !this.state.open})}/> :
                    <Styles.DropdownIconDown onClick={() => this.setState({open: !this.state.open})}/> }
            </Styles.DropdownContainer>
		)
	}
}
