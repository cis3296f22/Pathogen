// Third party
import React from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { BsFillLightningChargeFill } from 'react-icons/bs';
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

                <Styles.HiddenSettings>
                    <Styles.MutationRate title='Mutation Rate' value={this.props.mutation}
                        max={Constants.MUTATION_RANGE[1]} min={Constants.MUTATION_RANGE[0]}
                        onChange={(e) => this.props.setMutation(e.target.value)} step={0.001}/>
                </Styles.HiddenSettings>
                
                <Styles.Skip icon={<BsFillLightningChargeFill/>}
                    onClick={() => this.props.skipVisual()} tooltip={'Skip Visualization'} />
                <Styles.PlayPause icon={this.props.isPaused ? <FaPlay/> : <FaPause/>}
                    onClick={() => this.props.pausePlay()} tooltip={this.props.isPaused ? 'play' : 'pause'} />
                <Styles.FastForward>
                    <FaFastForward/>
                    <Slider value={this.props.speed} 
                        max={Constants.SPEED_RANGE[1]} min={Constants.SPEED_RANGE[0]}
                        onChange={(_, value) => this.props.setSpeed(value)} step={1}/>
                </Styles.FastForward>
                <Styles.DropdownIcon icon={this.state.open ? <AiFillCaretUp/> : <AiFillCaretDown/>}
                    onClick={() => this.setState({open: !this.state.open})} tooltip={this.state.open ? 'close' : 'open'} />
            </Styles.DropdownContainer>
		)
	}
}
