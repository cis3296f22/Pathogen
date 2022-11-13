// Third party
import React from 'react';
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
                
                <Styles.Skip/>
                <Styles.PlayPause icon={this.props.isPaused ? <FaPlay/> : <FaPause/>} onClick={() => this.props.pausePlay()} />
                <Styles.FastForward>
                    <FaFastForward/>
                    <Slider value={this.props.speed} 
                        max={Constants.SPEED_MAX} min={Constants.SPEED_MIN}
                        onChange={(e) => this.props.setSpeed(e.target.value)} step={1}/>
                </Styles.FastForward>
                { this.state.open ?
                    <Styles.DropdownIconUp onClick={() => this.setState({open: !this.state.open})}/> :
                    <Styles.DropdownIconDown onClick={() => this.setState({open: !this.state.open})}/> }
            </Styles.DropdownContainer>
		)
	}
}
