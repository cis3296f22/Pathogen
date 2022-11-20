// Third party
import React from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { FaFastForward, FaPause, FaPlay } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';
import Constants from '../../tools/Constants';

// Custom styles
import Styles from './DropdownStyles'
import Slider from './Slider';

type DropdownState = {
    open: boolean,
    location: number,
    dragging: boolean
}

type DropdownProps = {
	isPaused: boolean,
    pausePlay: Function,
    setSpeed: Function,
    speed: number,
    mutation: number,
    setMutation: Function,
    skipVisual: Function,
    population: number,
    setPopulation: Function,
    windowSize: {height: number, width: number}
}

export default class DropDown extends React.Component<DropdownProps, DropdownState> {

    constructor(props: DropdownProps) {
		super(props)
		this.state = { 
			open: false,
            location: 0,
            dragging: false
		}
	}

    handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
        let newLocation = this.props.windowSize.width - e.screenX;
        this.setState({location: newLocation});
    }

    onMouseMove = (e: MouseEvent): void => {
        if (!this.state.dragging) return;
        let newLocation = this.props.windowSize.width - e.screenX;
        this.setState({location: Math.min(newLocation, this.props.windowSize.width - 100)});
        e.stopPropagation()
        e.preventDefault()
    }

    onMouseUp = (e: MouseEvent): void => {
        this.setState({dragging: false})
        e.stopPropagation()
        e.preventDefault()
    }

    componentDidUpdate = (props: DropdownProps, state: DropdownState): void => {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onMouseMove)
            document.addEventListener('mouseup', this.onMouseUp)
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove)
            document.removeEventListener('mouseup', this.onMouseUp)
        }
    }

	render (): React.ReactElement {
		return (
			<Styles.DropdownContainer open={this.state.open} location={this.state.location > this.props.windowSize.width ? 0 : this.state.location} className='dropdown-container'>

                <Styles.HiddenSettings>
                    <Styles.MutationRate title='Mutation Rate' value={this.props.mutation}
                        max={Constants.MUTATION_RANGE[1]} min={Constants.MUTATION_RANGE[0]}
                        onChange={(e) => this.props.setMutation(e.target.value)} step={0.001}/>
                    <Styles.MutationRate title='Population' value={this.props.population} 
						max={Constants.POPULATION_RANGE[1]} min={Constants.POPULATION_RANGE[0]}
						onChange={(e) => this.props.setPopulation(parseInt(e.target.value))}/>
                </Styles.HiddenSettings>
                
                <Styles.Skip icon={<BsFillLightningChargeFill/>}
                    onClick={() => this.props.skipVisual()} tooltip={'Skip Visualization'} />
                <Styles.PlayPause icon={this.props.isPaused ? <FaPlay/> : <FaPause/>}
                    onClick={() => this.props.pausePlay()} tooltip={this.props.isPaused ? 'play' : 'pause'} />
                <Styles.FastForward>
                    <FaFastForward/>
                    <Slider value={this.props.speed} title={'Fast Forward'} hideLabel={true}
                        max={Constants.SPEED_RANGE[1]} min={Constants.SPEED_RANGE[0]}
                        onChange={(_, value) => this.props.setSpeed(value)} step={1} exponential/>
                </Styles.FastForward>
                <Styles.DropdownIcon icon={this.state.open ? <AiFillCaretUp/> : <AiFillCaretDown/>}
                    onClick={() => this.setState({open: !this.state.open})} tooltip={this.state.open ? 'close' : 'open'} />

                <Styles.DragIconContainer open={this.state.open} onMouseDown={() => this.setState({dragging: true})}>
                    <MdDragIndicator/>
                </Styles.DragIconContainer>
            </Styles.DropdownContainer>
		)
	}
}
