import React, { FormEvent, KeyboardEvent } from 'react';
import Slider from './elements/Slider';

import Styles from './BannerStyles';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Parameters } from './CanvasStyles';
import Constants from '../tools/Constants';

import { GiHamburgerMenu } from 'react-icons/gi';
import { FaFastForward, FaPause, FaPlay } from 'react-icons/fa';
import IconButton from './elements/IconButton';

class Banner extends React.Component <{setParameters: Function}, { show: boolean, param: Parameters }> {

	constructor(props: {setParameters: Function}) {
		super(props)
		this.state = { 
			show: false,
			param: Constants.PARAMS
		}
	}

	handleClose = (): void => {this.setState({ show: false })}
	handleShow = (): void => {this.setState({ show: true })}

	setRows = (rows: number): void => {
		this.setState({param: {...this.state.param, gridRows: rows}})
		this.props.setParameters({...this.state.param, gridRows: rows})
	}

	setCols = (cols: number): void => {
		this.setState({param: {...this.state.param, gridColumns: cols}})
		this.props.setParameters({...this.state.param, gridColumns: cols})
	}

	setPopulation = (population: number): void => {
		this.setState({param: {...this.state.param, population: population}})
		this.props.setParameters({...this.state.param, population: population})
	}

	pausePlay = (): void => {
		let inv_pause = !this.state.param.pause;
		this.setState({param: {...this.state.param, pause: inv_pause}})
		this.props.setParameters({...this.state.param, pause: inv_pause})
	}

	apply = (): void => {
		let inv_apply = !this.state.param.apply;
		this.setState({param: {...this.state.param, apply: inv_apply}})
		this.props.setParameters({...this.state.param, apply: inv_apply})
	}

	setSpeed = (speed: number): void => {
		this.setState({param: {...this.state.param, speed: speed}})
		this.props.setParameters({...this.state.param, speed: speed})
	}

	setGeneration = (e: FormEvent<HTMLInputElement>): void => {
		this.setState({param: {...this.state.param, generationSkip: parseInt(e.currentTarget.value)}})
	}

	sendGeneration = (e: KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === 'Enter')
			this.props.setParameters({...this.state.param, generationSkip: parseInt(e.currentTarget.value)})
	}

	render() {
		return (
			<>
				<Styles.Banner>
					<Styles.Hamburger as={GiHamburgerMenu} onClick={this.handleShow}/>
					<Styles.BannerSettings>
						<input type="number" min={Constants.GENERATION_MIN} max={Constants.GENERATION_MAX} onKeyDown={this.sendGeneration} value={this.state.param.generationSkip} size={4} onInput={this.setGeneration} />
						<IconButton icon={this.state.param.pause ? <FaPlay/> : <FaPause/>} onClick={this.pausePlay} />
						<input type="number" min={Constants.GENERATION_MIN} max={Constants.GENERATION_MAX} value={this.state.param.generationSkip} size={4} />

						{/* Fast forward slider */}
						<Styles.FastForward>
							<FaFastForward/>
							<Slider
								axis='x' x={this.state.param.speed} 
								xmax={Constants.SPEED_MAX} xmin={Constants.SPEED_MIN}
								onChange={({x}) => this.setSpeed(x)} xstep={1}/>
						</Styles.FastForward>
					</Styles.BannerSettings>
				</Styles.Banner>

				{/* Start offcanvas stuff with menu */}
				<Styles.OffcanvasStyle show={this.state.show} onHide={this.handleClose}>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>Parameters</Offcanvas.Title>
					</Offcanvas.Header>

					<Slider title='# of Rows'
						axis='x' x={this.state.param.gridRows} 
						xmax={Constants.ROW_MAX} xmin={Constants.ROW_MIN}
						onChange={({x}) => this.setRows(x)}/>

					<Slider title='# of Columns'
						axis='x' x={this.state.param.gridColumns} 
						xmax={Constants.ROW_MAX} xmin={Constants.ROW_MIN}
						onChange={({x}) => this.setCols(x)}/>

					<Slider title='Population'
						axis='x' x={this.state.param.population} 
						xmax={Constants.POPULATION_MAX} xmin={Constants.POPULATION_MIN}
						onChange={({x}) => this.setPopulation(x)}/>
					<button type="button" className="btn btn-primary" onClick={this.apply}>Apply</button>
				</Styles.OffcanvasStyle>
			</>
		);
	}
}

export default Banner;
