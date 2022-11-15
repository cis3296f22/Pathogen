import React from 'react';

import Styles from './BannerStyles';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CanvasStyles, { Parameters } from './CanvasStyles';
import Constants from '../tools/Constants';
import { GiHamburgerMenu } from 'react-icons/gi';
import DropDown from './elements/Dropdown';
import SimContext from './elements/SimContext';
import { param } from 'jquery';

class Banner extends React.Component <{setParameters: Function, params: Parameters}, { show: boolean }> {

	constructor(props: {setParameters: Function, params: Parameters}) {
		super(props)
		this.state = { show: false }
	}

	handleClose = (): void => {this.setState({ show: false })}
	handleShow = (): void => {this.setState({ show: true })}
	setRows = (rows: number): void => {
		this.props.setParameters({...this.props.params, gridRows: rows})
	}

	setCols = (cols: number): void => {
		this.props.setParameters({...this.props.params, gridColumns: cols})
	}

	setPopulation = (population: number): void => {
		this.props.setParameters({...this.props.params, population: population})
	}

	pausePlay = (): void => {
		let inv_pause = !this.props.params.pause;
		this.props.setParameters({...this.props.params, pause: inv_pause})
	}

	apply = (): void => {
		let inv_apply = !this.props.params.apply;
		this.props.setParameters({...this.props.params, apply: inv_apply})
	}

	setSpeed = (speed: number): void => {
		this.props.setParameters({...this.props.params, speed: speed})
	}

	setMutation = (mutation: number): void => {
		this.props.setParameters({...this.props.params, mutation: mutation})
	}

	// setGeneration = (e: FormEvent<HTMLInputElement>): void => {
	// 	this.setState({param: {...this.state.param, generationSkip: parseInt(e.currentTarget.value)}})
	// }

	// sendGeneration = (e: KeyboardEvent<HTMLInputElement>): void => {
	// 	if (e.key === 'Enter')
	// 		this.props.setParameters({...this.state.param, generationSkip: parseInt(e.currentTarget.value)})
	// }

	skipVisual = (): void => {
		this.props.setParameters({...this.props.params, skipVisual: true})
	}

	render() {
		return (
			<>
				<Styles.Banner>
					<Styles.Hamburger as={GiHamburgerMenu} onClick={this.handleShow}/>
					{/* <Styles.BannerSettings>
						<input type="number" min={Constants.GENERATION_RANGE[0]} max={Constants.GENERATION_RANGE[1]} onKeyDown={this.sendGeneration} value={this.state.param.generationSkip} size={4} onInput={this.setGeneration} />
					</Styles.BannerSettings> */}

					<SimContext generation={0} mutationRate={this.props.params.mutation} progress={50} />
					<DropDown pausePlay={this.pausePlay} isPaused={this.props.params.pause}
						speed={this.props.params.speed} setSpeed={this.setSpeed}
						mutation={this.props.params.mutation} setMutation={this.setMutation}
						skipVisual={this.skipVisual} />
				</Styles.Banner>

				{/* Start offcanvas stuff with menu */}
				<Styles.OffcanvasStyle show={this.state.show} onHide={this.handleClose}>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>Parameters</Offcanvas.Title>
					</Offcanvas.Header>

					<Styles.SliderStyle title='# of Rows'
						value={this.props.params.gridRows} 
						max={Constants.ROW_RANGE[1]} min={Constants.ROW_RANGE[0]}
						onChange={(e) => this.setRows(parseInt(e.target.value))}/>

					<Styles.SliderStyle title='# of Columns'
						value={this.props.params.gridColumns} 
						max={Constants.COL_RANGE[1]} min={Constants.COL_RANGE[0]}
						onChange={(e) => this.setCols(parseInt(e.target.value))}/>

					<Styles.SliderStyle title='Population'
						value={this.props.params.population} 
						max={Constants.POPULATION_RANGE[1]} min={Constants.POPULATION_RANGE[0]}
						onChange={(e) => this.setPopulation(parseInt(e.target.value))}/>

					<button type="button" className="btn btn-primary" onClick={this.apply}>Apply</button>
				</Styles.OffcanvasStyle>
			</>
		);
	}
}

export default Banner;
