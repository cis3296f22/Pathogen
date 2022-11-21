import React from 'react';

import Styles from './BannerStyles';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Parameters } from './CanvasStyles';
import Constants from '../tools/Constants';

import { GiHamburgerMenu } from 'react-icons/gi';
import DropDown from './elements/Dropdown';
import InfoModal from './elements/InfoModal';

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

	apply = (): void => {
		let inv_apply = !this.props.params.apply;
		this.props.setParameters({...this.props.params, apply: inv_apply})
	}

	render() {
		return (
			<>
				<Styles.Banner>
					<Styles.Hamburger as={GiHamburgerMenu} onClick={this.handleShow}/>
					<DropDown setParameters={this.props.setParameters} params={this.props.params}/>
					<InfoModal/>
				</Styles.Banner>

				{/* Start offcanvas stuff with menu */}
				<Styles.OffcanvasContainer show={this.state.show} onHide={this.handleClose}>
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

					<Styles.ApplyButton type="button" className="btn btn-primary" onClick={this.apply}>Apply</Styles.ApplyButton>
				</Styles.OffcanvasContainer>
			</>
		);
	}
}

export default Banner;
