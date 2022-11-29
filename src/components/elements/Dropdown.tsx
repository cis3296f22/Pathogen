// Third party
import React from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { FaFastForward, FaPause, FaPlay, FaUndo } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';
import Constants from '../../tools/Constants';
import { Parameters } from '../CanvasStyles';

// Custom
import Styles from './DropdownStyles'
import IconButton from './IconButton';
import Slider from './Slider';

type DropdownState = {
    open: boolean,
    location: number,
    dragging: boolean
}

type DropdownProps = {
    setParameters: Function,
    params: Parameters,
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

    pausePlay = (): void => {
		let inv_pause = !this.props.params.pause;
		this.props.setParameters({...this.props.params, pause: inv_pause})
	}

    setPopulation = (population: number): void => {
		this.props.setParameters({...this.props.params, population: population})
	}

    resetGeneration = (): void => {
		let inv_apply = !this.props.params.apply;
		this.props.setParameters({...this.props.params, apply: inv_apply})
	}

    skipVisual = (): void => {
		this.props.setParameters({...this.props.params, skipVisual: true})
	}

    setMutation = (mutation: number): void => {
		this.props.setParameters({...this.props.params, mutation: mutation})
	}

    setSpeed = (speed: number): void => {
		this.props.setParameters({...this.props.params, speed: speed})
	}

    handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
        let newLocation = this.props.params.windowSize.width - e.screenX;
        this.setState({location: newLocation});
    }

    onMouseMove = (e: MouseEvent): void => {
        if (!this.state.dragging) return;
        let newLocation = this.props.params.windowSize.width - e.screenX;
        this.setState({location: Math.min(newLocation, this.props.params.windowSize.width - 100)});
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
			<Styles.DropdownContainer open={this.state.open}
                location={this.state.location > this.props.params.windowSize.width ? 0 : this.state.location}>

                <Styles.HiddenSettings>
                    <Styles.HiddenSliders title='Mutation Rate' value={this.props.params.mutation}
                        max={Constants.MUTATION_RANGE[1]} min={Constants.MUTATION_RANGE[0]}
                        onChange={(e) => this.setMutation(parseFloat(e.target.value))} step={0.001}/>
                    <Styles.HiddenSliders title='Population' value={this.props.params.population} 
						max={Constants.POPULATION_RANGE[1]} min={Constants.POPULATION_RANGE[0]}
						onChange={(e) => this.setPopulation(parseInt(e.target.value))}/>
                    <IconButton icon={<FaUndo/>} onClick={() => this.resetGeneration()} tooltip={'Regenerate Maze'} />
                    {/* <IconButton icon={<FaFastBackward/>} onClick={() => {}} tooltip={'Reset Agents'} /> */}
                </Styles.HiddenSettings>
                
                <Styles.Skip icon={<BsFillLightningChargeFill/>}
                    onClick={() => this.skipVisual()} tooltip={'Skip Visualization'} />
                <Styles.PlayPause icon={this.props.params.pause ? <FaPlay/> : <FaPause/>}
                    onClick={() => this.pausePlay()} tooltip={this.props.params.pause ? 'play' : 'pause'} />
                <Styles.FastForward>
                    <FaFastForward/>
                    <Slider value={this.props.params.speed} title={'Fast Forward'} hideLabel={true}
                        max={Constants.SPEED_RANGE[1]} min={Constants.SPEED_RANGE[0]}
                        onChange={(_, value) => this.setSpeed(value)} step={1} exponential/>
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
