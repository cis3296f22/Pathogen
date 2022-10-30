import React from 'react';
import Slider from './Slider';

import Styles from './BannerStyles';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Parameters } from './CanvasStyles';
import Constants from '../tools/Constants';

import { GiHamburgerMenu } from 'react-icons/gi';

class Banner extends React.Component <{setParameters: Function}, { show: boolean, param: Parameters }> {

	constructor(props: {setParameters: Function}) {
		super(props)
		this.state = { 
			show: false,
			param: {
				gridColumns: Constants.DEFAULT_COLS,
				gridRows: Constants.DEFAULT_ROWS
			}
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

	render() {
		return (
			<>
				<Styles.Banner>
					<Styles.Hamburger as={GiHamburgerMenu} onClick={this.handleShow}/>
				</Styles.Banner>

				<Offcanvas show={this.state.show} onHide={this.handleClose}>
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
				</Offcanvas>
			</>
		);
	}
}

export default Banner;
