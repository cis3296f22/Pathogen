import { Parameters } from "../components/CanvasStyles";

export class FONT_FAMILY {
	static readonly TITLE = `
		font-family: 'Arca', 'Catamaran', 'Helvetica', 'Arial', 'sans-serif';
		font-weight: 200;
		font-size: 50px;
		letter-spacing: 1px;
		line-height: 1.1;
	`
}

export default class Constants {
	static readonly BANNER_HEIGHT_RATIO = 0.15;
	static readonly ROW_RANGE         	= [7, 51];
	static readonly COL_RANGE         	= [7, 101];
	static readonly POPULATION_RANGE   	= [40, 400];
	static readonly SPEED_RANGE         = [1, 100];
	static readonly GENERATION_RANGE  	= [0, 100];
  static readonly ACC_RANGE 			    = [-1, 1];
	static readonly MUTATION_RANGE		  = [0.001, 1.0];
  static readonly DEFAULT_ROWS        = 7;
	static readonly DEFAULT_COLS        = 7;
	static readonly DEFAULT_POPULATION	= 100;
	static readonly DEFAULT_PAUSE		    = false;
	static readonly DEFAULT_SPEED		    = 1;
	static readonly DEFAULT_MUTATION	  = 0.05;

	static readonly PARAMS: Parameters = {
		gridRows: Constants.DEFAULT_ROWS,
		gridColumns: Constants.DEFAULT_COLS,
		pause: Constants.DEFAULT_PAUSE,
		apply: true,
		speed: Constants.DEFAULT_SPEED,
		generationSkip: 0,
		population: Constants.DEFAULT_POPULATION,
		mutation: Constants.DEFAULT_MUTATION
	}
}

export class Colors {
	static readonly PRIMARY   = '#222529';
	static readonly SECONDARY = '#808080';
	static readonly HOVER     = '#6c6b6b';
}

export type Vector = {
    x: number;
    y: number;
}
