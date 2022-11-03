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
	static readonly ROW_MAX             = 51;
	static readonly ROW_MIN             = 21;
	static readonly DEFAULT_ROWS        = 21;
	static readonly COL_MAX             = 101;
	static readonly COL_MIN             = 21;
	static readonly DEFAULT_COLS        = 61;
	static readonly BANNER_HEIGHT_RATIO = 0.15;
}

export class Colors {
	static readonly PRIMARY   = '#222529';
	static readonly SECONDARY = '#808080';
}

export enum Direction {
    NORTH,
    SOUTH,
    EAST,
    WEST,
}
