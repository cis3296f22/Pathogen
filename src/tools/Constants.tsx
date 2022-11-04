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
	static readonly ROW_MIN             = 21;
	static readonly ROW_MAX             = 51;
	static readonly COL_MIN             = 21;
	static readonly COL_MAX             = 101;
	static readonly SPEED_MIN        	= 1;
	static readonly SPEED_MAX         	= 100;
	static readonly GENERATION_MIN   	= 0;
	static readonly GENERATION_MAX  	= 100;
	static readonly BANNER_HEIGHT_RATIO = 0.15;

	static readonly DEFAULT_ROWS        = 21;
	static readonly DEFAULT_COLS        = 61;
	static readonly DEFAULT_PAUSE		= false;
	static readonly DEFAULT_SPEED		= 1;
	static readonly PARAMS: Parameters = {
		gridRows: Constants.DEFAULT_ROWS,
		gridColumns: Constants.DEFAULT_COLS,
		pause: Constants.DEFAULT_PAUSE,
		apply: true,
		speed: Constants.DEFAULT_SPEED,
		generationSkip: 0
	}
}

export class Colors {
	static readonly PRIMARY   = '#222529';
	static readonly SECONDARY = '#808080';
	static readonly HOVER = '#6c6b6b';
}

export enum Direction {
    NORTH,
    SOUTH,
    EAST,
    WEST,
}
