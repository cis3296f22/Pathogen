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
	static readonly ROW_MIN             = 7;
	static readonly ROW_MAX             = 51;
	static readonly COL_MIN             = 7;
	static readonly COL_MAX             = 101;
	static readonly POPULATION_MIN    	= 40;
	static readonly POPULATION_MAX     	= 400;
	static readonly SPEED_MIN        	= 1;
	static readonly SPEED_MAX         	= 10000;
	static readonly GENERATION_MIN   	= 0;
	static readonly GENERATION_MAX  	= 100;
	static readonly BANNER_HEIGHT_RATIO = 0.15;
    static readonly ACC_MIN = -1;
    static readonly ACC_MAX = 1;
    static readonly DEFAULT_ROWS        = 7;
	static readonly DEFAULT_COLS        = 7;
	static readonly DEFAULT_POPULATION	= 100;
	static readonly DEFAULT_PAUSE		= false;
	static readonly DEFAULT_SPEED		= 1;
	static readonly PARAMS: Parameters = {
		gridRows: Constants.DEFAULT_ROWS,
		gridColumns: Constants.DEFAULT_COLS,
		pause: Constants.DEFAULT_PAUSE,
		apply: true,
		speed: Constants.DEFAULT_SPEED,
		generationSkip: 0,
		population: Constants.DEFAULT_POPULATION
	}
}

export class Colors {
	static readonly PRIMARY   = '#222529';
	static readonly SECONDARY = '#808080';
	static readonly HOVER = '#6c6b6b';
}

export type Vector = {
    x: number;
    y: number;
}
